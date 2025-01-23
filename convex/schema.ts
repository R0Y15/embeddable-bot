import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    name: v.string(),
    type: v.string(),
    size: v.number(),
    storageId: v.string(),
    ownerId: v.string(),
    createdAt: v.number(),
  }),
  documents: defineTable({
    name: v.string(),
    type: v.string(),
    content: v.string(),
    fileId: v.id("files"),
    ownerId: v.string(),
    createdAt: v.number(),
  }),
  embeddings: defineTable({
    documentId: v.id("documents"),
    embedding: v.array(v.number()),
    chunk: v.string(),
    createdAt: v.number(),
  }).searchIndex("by_document", {
    searchField: "documentId",
  }),
}); 