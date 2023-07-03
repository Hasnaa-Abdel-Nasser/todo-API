import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "task title required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    list: {
      type: String,
      required: [true, "list type required"],
      lowercase: true,
    },
    timedate: {
      type: Date,
      default: Date.now(),
      required: [true, "task date required"],
    },
    subTask: [String],
    completed: {
      type: Boolean,
      default: false,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "user",
    }
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
