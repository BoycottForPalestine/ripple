import { OrgCategory, Organization } from "@/lib/shared/types/organization";
import {
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import MDEditor, { commands } from "@uiw/react-md-editor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";

import CharacterCounter from "@/components/CharacterCounter";
import { getAllUmbrellaOrganizations } from "@/lib/frontend/api/organization";

interface CreateEditOrganizationProps {
  // Can be null if creating a new organization
  organization: Organization | null;
  onBack: () => void;
  onSubmit: (organization: Organization, passkey: string) => void;
  isEditMode: boolean;
}

const NO_UMBRELLA_ORG = "none";

export default function CreateEditOrganization({
  organization,
  onBack,
  onSubmit,
  isEditMode,
}: CreateEditOrganizationProps) {
  const [name, setName] = useState(organization?.name ?? "");
  const [category, setCategory] = useState(
    organization?.category ?? OrgCategory.Organization
  );
  const [description, setDescription] = useState(
    organization?.description ?? ""
  );
  const [tagline, setTagline] = useState(organization?.tagline ?? "");
  const [umbrellaOrgId, setUmbrellaOrgId] = useState(
    organization?.umbrellaOrgId ?? NO_UMBRELLA_ORG
  );
  const [isUmbrella, setIsUmbrella] = useState(
    organization?.isUmbrella ?? false
  );
  const [joinInstructions, setJoinInstructions] = useState(
    organization?.joinInstructions ?? ""
  );
  const [logoUrl, setLogoUrl] = useState(organization?.logoUrl ?? "");
  const [city, setCity] = useState(organization?.city ?? "");
  const [state, setState] = useState(organization?.state ?? "");
  const [country, setCountry] = useState(organization?.country ?? "");
  const [passkey, setPassKey] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [umbrellaOrgs, setUmbrellaOrgs] = useState<Organization[]>([]);

  const title = isEditMode
    ? "Edit organization: " + organization?.name
    : "Create Organization";

  const handleSubmit = async () => {
    setSubmitting(true);

    const updatedUmbrellaOrgId =
      umbrellaOrgId === NO_UMBRELLA_ORG ? null : umbrellaOrgId;

    const updatedOrganization = {
      _id: organization?._id ?? "",
      name,
      tagline,
      description,
      category,
      umbrellaOrgId: updatedUmbrellaOrgId,
      isUmbrella,
      joinInstructions,
      logoUrl,
      city,
      state,
      country,
    };

    onSubmit(updatedOrganization, passkey);
    setSubmitting(false);
  };

  useEffect(() => {
    getAllUmbrellaOrganizations().then((response) => {
      setUmbrellaOrgs(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "768px" }}>
        <Button onClick={onBack} startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
        <Box sx={{ textAlign: "left", marginBottom: "16px" }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              autoComplete="off"
              label="Organization Name"
              placeholder="Example: SAARPR"
              inputProps={{ maxLength: 80 }}
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
            />
            <CharacterCounter currentLength={name.length} max={80} />
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              Give a brief tagline for the organization.
            </FormHelperText>
            <TextField
              autoComplete="off"
              label="Tagline"
              placeholder="Example: SAARPR's goals are to institute community control of the Seattle police, ending inhumane carceral practices, and creating a world without police."
              inputProps={{ maxLength: 280 }}
              value={tagline}
              onChange={(event) => setTagline(event.target.value)}
              variant="outlined"
            />
            <CharacterCounter currentLength={tagline.length} max={280} />
            <FormControl sx={{ mb: "16px" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as OrgCategory)
                }
                label="Category"
              >
                <MenuItem value={OrgCategory.Organization}>
                  {OrgCategory.Organization}
                </MenuItem>
                <MenuItem value={OrgCategory.Union}>
                  {OrgCategory.Union}
                </MenuItem>
                <MenuItem value={OrgCategory.MutualAid}>
                  {OrgCategory.MutualAid}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              What does this organization do? Please be comprehensive.
            </FormHelperText>
            <MDEditor
              data-color-mode="light"
              preview="edit"
              previewOptions={{}}
              commands={[
                commands.title,
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
                commands.divider,
                commands.bold,
                commands.italic,
                commands.divider,
                commands.orderedListCommand,
                commands.unorderedListCommand,
                commands.divider,
                commands.link,
                commands.quote,
              ]}
              value={description}
              textareaProps={{
                maxLength: 10000,
              }}
              onChange={(newString: string | undefined) =>
                setDescription(newString ?? "")
              }
            />
            <CharacterCounter currentLength={description.length} max={10000} />
            <br />
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              How does one join this organization? Please include links that
              users can click.
            </FormHelperText>
            <MDEditor
              data-color-mode="light"
              preview="edit"
              previewOptions={{}}
              commands={[
                commands.title,
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
                commands.divider,
                commands.bold,
                commands.italic,
                commands.divider,
                commands.orderedListCommand,
                commands.unorderedListCommand,
                commands.divider,
                commands.link,
                commands.quote,
              ]}
              value={joinInstructions}
              textareaProps={{
                maxLength: 10000,
              }}
              onChange={(newString: string | undefined) =>
                setJoinInstructions(newString ?? "")
              }
            />
            <CharacterCounter
              currentLength={joinInstructions.length}
              max={10000}
            />
            <br />
            <FormControl sx={{ mb: "16px" }}>
              <TextField
                autoComplete="off"
                label="Logo Url"
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                variant="outlined"
              />
            </FormControl>

            <FormControl sx={{ mb: "16px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isUmbrella}
                    onChange={(event) => setIsUmbrella(event.target.checked)}
                  />
                }
                label="Is this an umbrella organization?"
              />
            </FormControl>
            {!isUmbrella && (
              <FormControl sx={{ mb: "16px" }}>
                <InputLabel>Umbrella Organization</InputLabel>
                <Select
                  value={umbrellaOrgId}
                  onChange={(event) => {
                    setUmbrellaOrgId(event.target.value);
                  }}
                  label="Umbrella Organization"
                >
                  <MenuItem key={NO_UMBRELLA_ORG} value={NO_UMBRELLA_ORG}>
                    N/A
                  </MenuItem>
                  {umbrellaOrgs.map((org) => {
                    return (
                      <MenuItem key={org._id} value={org._id}>
                        {org.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}

            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              Where is the organization located?
            </FormHelperText>
            <FormControl sx={{ mb: "16px" }}>
              <TextField
                autoComplete="off"
                label="City (leave blank of not applicable)"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ mb: "16px" }}>
              <TextField
                autoComplete="off"
                label="State (leave blank of not applicable)"
                value={state}
                onChange={(event) => setState(event.target.value)}
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ mb: "16px" }}>
              <TextField
                autoComplete="off"
                label="Country (leave blank of not applicable)"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                variant="outlined"
              />
            </FormControl>
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              Authorization
            </FormHelperText>
            <FormControl sx={{ mb: "16px" }}>
              <TextField
                autoComplete="off"
                label="Admin Passkey"
                value={passkey}
                onChange={(event) => setPassKey(event.target.value)}
                variant="outlined"
              />
            </FormControl>
            <Button
              disabled={submitting}
              variant="contained"
              onClick={handleSubmit}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
