const {Schema, model} = require('mongoose');

const todoSchema = new Schema ({
    todo: {type: String, required: true},
    isDone: Boolean
})

module.exports = model('Todo', todoSchema);