import { OrgCategory, Organization } from "@/lib/shared/types/organization";
import {
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from "@mui/material";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";

import CharacterCounter from "@/components/CharacterCounter";
import { Submission } from "@/lib/shared/types/submission";

interface SubmitOrganizationProps {
  onSubmit: (submission: Omit<Submission, "_id">) => void;
}

export default function SubmitOrganization({
  onSubmit,
}: SubmitOrganizationProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [joinInstructions, setJoinInstructions] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [linkToSocial, setLinkToSocial] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    const submission: Omit<Submission, "_id"> = {
      name,
      description,
      joinInstructions,
      city,
      state,
      country,
      linkToSocial,
    };

    onSubmit(submission);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "768px" }}>
        <Box sx={{ textAlign: "left", marginBottom: "16px" }}>
          <Typography variant="h6">Submit Organization</Typography>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <FormControl sx={{ width: "100%" }}>
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              What is the name of your organization?
            </FormHelperText>
            <TextField
              autoComplete="off"
              label="Organization Name"
              placeholder="Example: SAARPR"
              inputProps={{ maxLength: 80 }}
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
            />
            <br />
            <FormHelperText sx={{ margin: "0 0 8px 0" }}>
              What does this organization do? Please be comprehensive. Feel free
              to copy tidbits from the organization's website, the
              Instagram/Facebook pages, etc.
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
              How does one join this organization? When possible, please include
              links to things such as Google signup forms or a link to the
              organization's sign up form on their website. Please include
              regular meetings/meetups that your organization has as well.
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
            <FormControl sx={{ mb: "16px" }}>
              <FormHelperText sx={{ margin: "0 0 8px 0" }}>
                Please provide a link to a social media page for your
                organization.
              </FormHelperText>
              <TextField
                autoComplete="off"
                label="Link to Social Media"
                placeholder="Example: https://instagram.com/..."
                inputProps={{ maxLength: 1000 }}
                value={linkToSocial}
                onChange={(event) => setLinkToSocial(event.target.value)}
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
