import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "user";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  name: string;
  noOfSyncs?: Number;
  createdAt?: String;
  updatedAt?: String;
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxLength: 100,
    minlength: 1,
  },
  noOfSyncs: {
    type: Schema.Types.Number,
    default: 0,
  },
  createdAt: {
    type: Schema.Types.String,
    required: true,
  },
  updatedAt: {
    type: Schema.Types.String,
    required: true,
  },
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
