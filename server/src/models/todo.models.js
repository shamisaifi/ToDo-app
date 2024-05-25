import mongoose, { Schema } from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    text: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const ToDoModel = mongoose.model("ToDo", toDoSchema);
