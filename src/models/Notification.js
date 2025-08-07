import { model, models, Schema } from "mongoose";

const notifictionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["invite", "task"],
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{
    timestamps:true
});

export default models.Notification || model("Notification", notifictionSchema);
