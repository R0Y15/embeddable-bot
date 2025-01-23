import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    return await ctx.db.get(args.fileId);
  },
});

export const getFileUrl = mutation({
  args: { storageId: v.string() },
  async handler(ctx, args) {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  async handler(ctx) {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createFile = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    size: v.number(),
    storageId: v.string(),
  },
  async handler(ctx, args) {
    const file = await ctx.db.insert("files", {
      name: args.name,
      type: args.type,
      size: args.size,
      storageId: args.storageId,
      ownerId: "public",
      createdAt: Date.now(),
    });

    return file;
  },
});

export const listFiles = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("files").collect();
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    // Get the file to check if it exists
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new Error("File not found");
    }

    // Delete associated documents
    const documents = await ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("fileId"), args.fileId))
      .collect();

    for (const doc of documents) {
      // Delete embeddings for this document
      const embeddings = await ctx.db
        .query("embeddings")
        .filter(q => q.eq(q.field("documentId"), doc._id))
        .collect();

      // Delete each embedding
      for (const embedding of embeddings) {
        await ctx.db.delete(embedding._id);
      }

      // Delete the document
      await ctx.db.delete(doc._id);
    }

    // Delete the file record
    await ctx.db.delete(args.fileId);

    return true;
  },
}); 