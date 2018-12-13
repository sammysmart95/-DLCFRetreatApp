import mongoose from "mongoose";
import uuid from "uuid/v4";

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: uuid
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
});

export default mongoose.model("File", fileSchema);
