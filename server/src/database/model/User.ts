import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
    name: string;
    noOfSyncs?: Number;
    createdAt?: String;
};

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    noOfSyncs: {
        type: Schema.Types.Number,
        required: true,
    },
    createdAt: {
        type: Schema.Types.String,
        required: true,
    }
});


export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

