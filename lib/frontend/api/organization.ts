import { Organization } from "@/lib/shared/types/organization";
import axios from "./axios-instance";
import { apiUrl } from "@/lib/frontend/config/api";

export function createOrganization(
  organization: Organization,
  passkey: string
) {
  const body = {
    ...organization,
    passkey,
  };
  // @ts-ignore don't want to deal with creating another type specifically for new orgs
  delete body._id;
  return axios.post(`${apiUrl}/organization`, body);
}

export function getOrganizationById(orgId: string) {
  return axios.get(`${apiUrl}/organization/${orgId}`);
}

export function getOrganizationsByCity(city: string) {
  return axios.get(`${apiUrl}/organization?city=${city}`);
}

export function getOrganizationsByState(state: string) {
  return axios.get(`${apiUrl}/organization?state=${state}`);
}

export function getOrganizationsByCountry(country: string) {
  return axios.get(`${apiUrl}/organization?country=${country}`);
}

export function getAllOrganizations() {
  return axios.get(`${apiUrl}/organization`);
}

export function getAllUmbrellaOrganizations() {
  return axios.get(`${apiUrl}/organization?isUmbrella=true`);
}

export function editOrganization(organization: Organization, passkey: string) {
  const body = {
    ...organization,
    passkey,
  };
  return axios.patch(`${apiUrl}/organization/${organization._id}`, body);
}

export function deleteOrganization(orgId: string, passkey: string) {
  return axios.delete(`${apiUrl}/organization/${orgId}?passkey=${passkey}`);
}
