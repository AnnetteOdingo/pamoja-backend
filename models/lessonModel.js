const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    topic:{
        type: String,
        required: [true, 'Please add a title']
    },
    course:{
        type: String,
        required: [true, 'Please add a course']
    },
    comments:{
        type: [String],
        default: []
    },
    isTaught:{
        type: Boolean,
        default: false
    }


}, {timestamps: true})

module.exports = mongoose.model('Lesson', lessonSchema)
