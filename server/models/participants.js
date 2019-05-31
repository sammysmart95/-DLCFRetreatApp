import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: uuid,
    unique: true,
    index: true,
  },
  fullName: {
    type: Schema.Types.String,
    // required: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    // required: true,
  },
  whatsAppNumber: {
    type: Schema.Types.String,
  },
  gender: {
    type: Schema.Types.String,
    // required: true
  },
  address: {
    type: Schema.Types.String,
    // required: true
  },
  group: {
    type: Schema.Types.String
  },
  email: {
    type: Schema.Types.String,
  },
  status: {
    type: Schema.Types.String,
    // required: true
  },
  denomination: {
    type: Schema.Types.String,
    // required: true
  },
  institution: {
    type: Schema.Types.String
  },
  course: {
    type: Schema.Types.String
  },
  ageGroup: {
    type: Schema.Types.String,
    // required: true
  },
  category: {
    type: Schema.Types.String,
    // required: true
  },
  region: {
    type: Schema.Types.String
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});


const Participant = mongoose.model("Participant", participantSchema);

Participant.syncIndexes()

export default Participant