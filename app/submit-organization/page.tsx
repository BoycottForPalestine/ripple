"use client";

import PageContainer from "@/components/common/PageContainer";
import { successAlert } from "@/components/common/Swal";
import SubmitOrganization from "@/components/submit-organization";
import { createSubmission } from "@/lib/frontend/api/submissions";
import { Submission } from "@/lib/shared/types/submission";
import { useRouter } from "next/navigation";

export default function SubmitOrganizationView() {
  const router = useRouter();

  const handleSubmit = (submission: Omit<Submission, "_id">) => {
    createSubmission(submission)
      .then(() => {
        return successAlert("Thank you for submitting an organization!");
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        alert("Error creating organization");
      });
  };

  return (
    <PageContainer>
      <SubmitOrganization onSubmit={handleSubmit} />
    </PageContainer>
  );
}
