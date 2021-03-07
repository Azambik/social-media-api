// importing needed mongoose elements to set up models
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//defining reaction model
const ReactionSchema = new Schema({
    //custome id to avoid condusion with the __id of the parent thought
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
});
//defining thought model
const ThoughtSchema = new Schema({
    thoughText: {
        type: String,
        required: true,
        min:1,
        max:280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
        
        
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;