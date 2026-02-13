const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 60
    }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
