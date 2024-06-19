// import db from "@/lib/server/db/mongo";
// import { ObjectId } from "mongodb";

// async function createTag(name: string, color: string) {
//   const tagsCollection = await db.collection("tags");
//   tagsCollection.insertOne({ name, color });
// }

// async function getTag(tagId: string) {
//   const tagsCollection = await db.collection("tags");

//   return tagsCollection.findOne({ _id: new ObjectId(tagId) });
// }

// async function getAllTags() {
//   const tagsCollection = await db.collection("tags");

//   return tagsCollection.find().toArray();
// }

// async function updateTag(tagId: string, name: string, color: string) {
//   const tagsCollection = await db.collection("tags");

//   tagsCollection.updateOne(
//     { _id: new ObjectId(tagId) },
//     { $set: { name, color } }
//   );
// }

// async function deleteTag(tagId: string) {
//   const tagsCollection = await db.collection("tags");
//   const orgsTagsCollection = await db.collection("orgsTags");

//   // This is kind of destructive, but maybe we should add some safeguards here
//   orgsTagsCollection.deleteMany({ tagId: new ObjectId(tagId) });
//   tagsCollection.deleteOne({ _id: new ObjectId(tagId) });
// }

// export { createTag, updateTag, deleteTag, getTag, getAllTags };
