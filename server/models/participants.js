import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const participantsSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: uuid
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  denomination: {
    type: String,
    required: true
  },
  institution: {
    type: String
  },
  course: {
    type: String
  },
  ageGroup : {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
});

export default mongoose.model("Participants", participantsSchema);
