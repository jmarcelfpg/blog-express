import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        set: function (value: string) {
            return value.trim().toLowerCase()
        },
        validate: [
            function (email) {
                return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)
            },
            'Invalid email'
        ]
    },
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

export const User: mongoose.UserModel = mongoose.model<mongoose.UserDocument, mongoose.UserModel>('User', userSchema);