import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    members:[
      {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default models.Project || model("Project", ProjectSchema);

