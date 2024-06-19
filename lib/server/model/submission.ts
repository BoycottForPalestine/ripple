import db from "@/lib/server/db/mongo";
import { slugifyString } from "@/lib/shared/slugs";
import { OrgCategory, Organization } from "@/lib/shared/types/organization";
import { Submission } from "@/lib/shared/types/submission";
import { ObjectId } from "mongodb";

async function createSubmission(submission: Omit<Submission, "_id">) {
  const submissionsCollection = db.collection("submissions");
  await submissionsCollection.insertOne(submission);
}

async function getAllSubmissions() {
  const submissionsCollection = db.collection("submissions");

  const results = (await submissionsCollection
    .find()
    .toArray()) as unknown as Submission[];

  return results;
}

async function getSubmissionById(submissionId: string) {
  const submissionsCollection = db.collection("submissions");

  const result = (await submissionsCollection.findOne({
    _id: new ObjectId(submissionId),
  })) as unknown as Submission | null;
  return result;
}

async function deleteSubmission(submissionId: string) {
  const submissionsCollection = db.collection("submissions");

  await submissionsCollection.deleteOne({ _id: new ObjectId(submissionId) });
}

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
};
