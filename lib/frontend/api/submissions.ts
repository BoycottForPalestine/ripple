import { Submission } from "@/lib/shared/types/submission";
import axios from "./axios-instance";
import { apiUrl } from "@/lib/frontend/config/api";

export function createSubmission(
  organizationToSubmit: Omit<Submission, "_id">
) {
  return axios.post(`${apiUrl}/submission`, organizationToSubmit);
}

export function getSubmissions() {
  return axios.get(`${apiUrl}/submission/`);
}

export function deleteSubmission(submissionId: string, passkey: string) {
  return axios.delete(
    `${apiUrl}/submission/${submissionId}?passkey=${passkey}`
  );
}
