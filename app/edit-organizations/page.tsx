"use client";

import {
  Typography,
  TextField,
  Box,
  Button,
  Divider,
  Select,
  MenuItem,
  Switch,
  IconButton,
  InputAdornment,
  Grid,
  FormLabel,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";

import PageContainer from "@/components/common/PageContainer";
import debounce from "debounce";
import { Organization } from "@/lib/shared/types/organization";
import Link from "next/link";
import { getAllOrganizations } from "@/lib/frontend/api/organization";
import { useOrganizations } from "@/lib/frontend/hooks/useOrganizations";
import { buildLocation } from "@/lib/shared/organization";
import CreateEditOrganization from "@/components/create-edit-organization";

interface OrganizationQuickViewProps {
  organization: Organization;
  parentOrg: Organization | undefined;
  onEdit: (organization: Organization) => void;
  onDelete: (organizationId: string) => void;
}

function OrganizationQuickView({
  organization,
  parentOrg,
  onEdit,
  onDelete,
}: OrganizationQuickViewProps) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "48px",
        alignItems: "center",
        marginLeft: "16px",
      }}
    >
      <Box sx={{ width: "25%" }}>
        <Link href={`/organization/${organization._id}`}>
          <Typography>{organization.name}</Typography>
        </Link>
      </Box>
      <Box sx={{ width: "25%" }}>
        {parentOrg ? (
          <Link href={`/organization/${parentOrg._id}`}>
            <Typography>{parentOrg.name}</Typography>
          </Link>
        ) : (
          <Typography>N/A</Typography>
        )}
      </Box>
      <Typography sx={{ width: "10%" }}>
        {organization.isUmbrella ? "Yes" : "No"}
      </Typography>
      <Typography sx={{ width: "15%" }}>
        {buildLocation(organization)}
      </Typography>

      <Box sx={{ width: "25%", display: "flex", justifyContent: "center" }}>
        <Button
          size="small"
          variant="outlined"
          sx={{ mr: "8px" }}
          onClick={() => onEdit(organization)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onDelete(organization._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default function EditOrganizationView() {
  const { organizations, organizationMap, editOrg, deleteOrg } =
    useOrganizations();
  const [selectedOrgForEdit, setSelectedOrgForEdit] =
    useState<Organization | null>(null);
  if (organizations.length === 0) {
    return "Loading...";
  }

  const handleDeleteOrganization = (organizationId: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this organization?",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Enter passkey",
    }).then((response) => {
      if (!response.dismiss) {
        deleteOrg(organizationId, response.value)
          .then(() => {
            Swal.fire({
              title: "Organization deleted successfully!",
              icon: "success",
            });
          })
          .catch((e) => {
            Swal.fire({
              title: "Error deleting organization",
              icon: "error",
            });
          });
      }
    });

    setSelectedOrgForEdit(null);
  };

  const handleEditOrganization = (
    organization: Organization,
    passkey: string
  ) => {
    editOrg(organization, passkey)
      .then((response) => {
        Swal.fire({
          title: "Organization updated successfully!",
          icon: "success",
        });
        setSelectedOrgForEdit(null);
      })
      .catch((e) => {
        Swal.fire({
          title: "Error updating organization",
          icon: "error",
        });
      });
  };

  return (
    <PageContainer>
      {selectedOrgForEdit ? (
        <CreateEditOrganization
          onBack={() => setSelectedOrgForEdit(null)}
          onSubmit={handleEditOrganization}
          isEditMode={true}
          organization={selectedOrgForEdit}
        />
      ) : (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "16px" }}>
            <Link href="/create-organization">
              <Button variant="contained">Create Organization</Button>
            </Link>
          </Box>
          <Box sx={{ display: "flex", marginLeft: "16px" }}>
            <Typography sx={{ width: "25%" }}>Name</Typography>
            <Typography sx={{ width: "25%" }}>Parent Org</Typography>
            <Typography sx={{ width: "10%" }}>Is Umbrella</Typography>
            <Typography sx={{ width: "15%" }}>Location</Typography>
            <Typography sx={{ width: "25%" }}></Typography>
          </Box>
          <Divider />
          {organizations.map((organization) => {
            return (
              <OrganizationQuickView
                key={organization._id}
                organization={organization}
                onEdit={() => setSelectedOrgForEdit(organization)}
                onDelete={handleDeleteOrganization}
                parentOrg={organizationMap[organization.umbrellaOrgId ?? ""]}
              />
            );
          })}
        </Box>
      )}
    </PageContainer>
  );
}
