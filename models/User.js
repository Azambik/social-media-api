// importing needed mongoose elements to set up models
const { Schema, model} = require('mongoose');
//defining user model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});
// get total count of friends
UserSchema.virtual('FriendCount').get(function() {
    return this.friends.length;
});

//calling an instance of the user model
const User = model('User',UserSchema);
// exporting user to the rest of the project
module.exports = User;