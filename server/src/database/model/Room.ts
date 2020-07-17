import { Schema, model, Document } from 'mongoose';

const DOCUMENT_NAME = 'Room';
const COLLECTION_NAME = 'rooms';

export default interface Room extends Document {
    name: String;
    pwd: String;
};

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    pwd: {
        type: Schema.Types.String,
        required: true
    }
});

export const RoomModel = model<Room>(DOCUMENT_NAME, schema, COLLECTION_NAME);