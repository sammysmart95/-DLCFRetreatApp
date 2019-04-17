import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const testimonySchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: uuid,
    unique: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
    // unique: true
  },
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  testimony: {
    type: Schema.Types.String,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Testimonies", testimonySchema);
