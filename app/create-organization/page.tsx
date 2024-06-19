"use client";

import PageContainer from "@/components/common/PageContainer";
import CreateEditOrganization from "@/components/create-edit-organization";
import { createOrganization } from "@/lib/frontend/api/organization";
import { Organization } from "@/lib/shared/types/organization";
import { useRouter } from "next/navigation";

export default function AddOrganizationView() {
  const router = useRouter();

  const organizationProps = {
    organization: null,
    onBack: () => {
      router.push("/edit-organizations");
    },
    onSubmit: (organization: Organization, passkey: string) => {
      createOrganization(organization, passkey)
        .then((response) => {
          router.push("/edit-organizations");
        })
        .catch((e) => {
          alert("Error creating organization");
        });
    },
    isEditMode: false,
  };

  return (
    <PageContainer>
      <CreateEditOrganization {...organizationProps} />
    </PageContainer>
  );
}
