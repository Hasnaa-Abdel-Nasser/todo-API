import mongoose from "mongoose";

const stickySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "sticky well title required"],
      trim: true,
    },
    note: String,
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "user",
    }
  },
  { timestamps: true }
);

const stickyModel = mongoose.model("sticky", stickySchema);
export default stickyModel;