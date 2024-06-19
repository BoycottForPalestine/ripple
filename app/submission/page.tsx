"use client";

import { Typography, Box, Button, Divider, Stack } from "@mui/material";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";

import PageContainer from "@/components/common/PageContainer";
import Link from "next/link";
import { buildLocation } from "@/lib/shared/organization";
import {
  deleteSubmission,
  getSubmissions,
} from "@/lib/frontend/api/submissions";
import { Submission } from "@/lib/shared/types/submission";
import Markdown from "react-markdown";

interface SubmissionQuickViewProps {
  submission: Submission;
  onView: (submission: Submission) => void;
  onDelete: (submissionId: string) => void;
}

function SubmissionQuickView({
  submission,
  onView,
  onDelete,
}: SubmissionQuickViewProps) {
  let url = "";

  try {
    url = new URL(submission.linkToSocial).hostname;
  } catch (e) {
    url = submission.linkToSocial;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "48px",
        alignItems: "center",
        marginLeft: "16px",
      }}
    >
      <Box sx={{ width: "25%" }}>{submission.name}</Box>
      <Typography sx={{ width: "25%" }}>
        <Link href={submission.linkToSocial}>{url}</Link>
      </Typography>
      <Typography sx={{ width: "25%" }}>{buildLocation(submission)}</Typography>

      <Box sx={{ width: "25%", display: "flex", justifyContent: "center" }}>
        <Button
          size="small"
          variant="outlined"
          sx={{ mr: "8px" }}
          onClick={() => onView(submission)}
        >
          View
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onDelete(submission._id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

function SubmissionView({
  submission,
  onBack,
}: {
  submission: Submission;
  onBack: () => void;
}) {
  const copyDescription = () => {
    navigator.clipboard.writeText(submission.description);
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(submission.joinInstructions);
  };

  return (
    <Box sx={{ p: "16px" }}>
      <Stack>
        <Box>
          <Button
            sx={{ marginLeft: "8px" }}
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        </Box>
        <Typography variant="h6">Organization Name</Typography>
        <Typography>{submission.name}</Typography>

        <Typography variant="h6">Description</Typography>
        <Markdown>{submission.description}</Markdown>
        <Box sx={{ mb: "8px" }}>
          <Button onClick={copyDescription} variant="outlined">
            Copy raw markdown
          </Button>
        </Box>

        <Typography variant="h6">Join Instructions</Typography>
        <Markdown>{submission.joinInstructions}</Markdown>
        <Box sx={{ mb: "8px" }}>
          <Button onClick={copyInstructions} variant="outlined">
            Copy raw markdown
          </Button>
        </Box>

        <Typography variant="h6">Link to social</Typography>
        <Typography>{submission.linkToSocial}</Typography>
        <Typography variant="h6">City</Typography>
        <Typography>{submission.city || "N/A"}</Typography>
        <Typography variant="h6">State</Typography>
        <Typography>{submission.state || "N/A"}</Typography>
        <Typography variant="h6">Country</Typography>
        <Typography>{submission.country || "N/A"}</Typography>
      </Stack>
    </Box>
  );
}

export default function SubmissionsView() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const refreshSubmissions = () => {
    getSubmissions().then((response) => {
      setSubmissions(response.data as Submission[]);
    });
  };

  useEffect(() => {
    refreshSubmissions();
  }, []);

  const handleDeleteSubmission = (submissionId: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this organization?",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Enter passkey",
    }).then((response) => {
      if (!response.dismiss) {
        deleteSubmission(submissionId, response.value)
          .then(() => {
            return Swal.fire({
              title: "Organization deleted successfully!",
              icon: "success",
            });
          })
          .then(() => {
            refreshSubmissions();
          })
          .catch((e) => {
            Swal.fire({
              title: "Error deleting organization",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <PageContainer>
      {selectedSubmission ? (
        <SubmissionView
          onBack={() => setSelectedSubmission(null)}
          submission={selectedSubmission}
        />
      ) : (
        <Box>
          <Box sx={{ display: "flex", marginLeft: "16px" }}>
            <Typography sx={{ width: "25%" }}>Name</Typography>
            <Typography sx={{ width: "25%" }}>Link to Social</Typography>
            <Typography sx={{ width: "25%" }}>Location</Typography>
          </Box>
          <Divider />
          {submissions.map((submission) => {
            return (
              <SubmissionQuickView
                key={submission._id}
                submission={submission}
                onView={() => setSelectedSubmission(submission)}
                onDelete={handleDeleteSubmission}
              />
            );
          })}
        </Box>
      )}
    </PageContainer>
  );
}
