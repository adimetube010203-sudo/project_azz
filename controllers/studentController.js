const Student = require("../models/Student");

// Create
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read
exports.getStudents = async (req, res) => {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
};

// Update
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete
exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
};
