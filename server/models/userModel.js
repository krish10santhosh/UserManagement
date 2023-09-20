import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    createdDate: {
        type: Date
    },
}, {
    collection: 'users'
})

const userModel = mongoose.model('Users', UserSchema);

export default userModel;