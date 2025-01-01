import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const inviteSchema = new Schema(
  {
    name: {
      type: String,
    },
    encodedName: {
      type: String,
    },
    accept: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    sunday: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    requirements: {
      type: String,
    },
    song: {
      type: String,
    },
  },
  { timestamps: true }
);

const Invite = models.Invite || model("Invite", inviteSchema);

export { Invite };
