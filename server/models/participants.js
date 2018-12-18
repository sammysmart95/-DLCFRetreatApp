import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const participantsSchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: uuid,
    unique: true
  },
  fullName: {
    type: Schema.Types.String,
    required: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
    index: true,
    unique: true
  },
  whatsAppNumber: {
    type: Schema.Types.String,
    required: true,
    index: true,
    unique: true
  },
  gender: {
    type: Schema.Types.String,
    required: true
  },
  address: {
    type: Schema.Types.String,
    required: true
  },
  group: {
    type: Schema.Types.String
  },
  email: {
    type: Schema.Types.String,
    // required: true,
    unique: true
  },
  status: {
    type: Schema.Types.String,
    required: true
  },
  denomination: {
    type: Schema.Types.String,
    required: true
  },
  institution: {
    type: Schema.Types.String
  },
  course: {
    type: Schema.Types.String
  },
  ageGroup: {
    type: Schema.Types.String,
    required: true
  },
  category: {
    type: Schema.Types.String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Participants", participantsSchema);
