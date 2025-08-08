import { model, models, Schema } from "mongoose";

const notificationSchema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["invite", "task"],
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref:"Project",
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

export default models.Notification || model("Notification", notificationSchema);
