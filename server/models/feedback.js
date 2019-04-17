import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: uuid,
    unique: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    // required: true,
    index: true,
    // unique: true
  },
  message: {
    type: Schema.Types.String,
  },
  transport: {
    type: Schema.Types.String,
  },
  like: {
    type: Schema.Types.String,
  },
  experience: {
    type: Schema.Types.String
  },
  improvements: {
    type: Schema.Types.String,
  },
  category: {
    type: Schema.Types.String,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Feedbacks", feedbackSchema);
