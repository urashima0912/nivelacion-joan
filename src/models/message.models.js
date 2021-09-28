const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    
    userOne: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    
    userTwo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,       
    },

    text: {
        type: String,
        ref: 'User',
    },
},

{
    versionKey: false,
    timestamps: true,
});

module.exports = model('Message', messageSchema);