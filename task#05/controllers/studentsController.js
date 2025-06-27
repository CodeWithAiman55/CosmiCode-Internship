const db = require("../config/db");

// ==============================
// GET ALL STUDENTS
// ==============================
const getStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM students");
    if (!rows || rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Records Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Record",
      totalStudents: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get Students Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error In Get All Student API",
      error: error.message,
    });
  }
};

// ==============================
// GET STUDENT BY ID
// ==============================
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [
      studentId,
    ]);

    if (rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      studentDetails: rows[0],
    });
  } catch (error) {
    console.error("Get Student By ID Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error In Get Student By ID API",
      error: error.message,
    });
  }
};

// ==============================
// CREATE STUDENT
// ==============================
const createStudents = async (req, res) => {
  try {
    const { name, roll_no, fees, medium } = req.body;

    if (!name || !roll_no || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields (name, roll_no, fees, medium)",
      });
    }

    const [result] = await db.query(
      "INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)",
      [name, roll_no, fees, medium]
    );

    res.status(201).send({
      success: true,
      message: "New Student Record Created",
      studentId: result.insertId,
    });
  } catch (error) {
    console.error("Create Student Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error In Create Student API",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE STUDENT
// ==============================
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, roll_no, fees, medium } = req.body;

    if (!name || !roll_no || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields to update (name, roll_no, fees, medium)",
      });
    }

    const [result] = await db.query(
      "UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?",
      [name, roll_no, fees, medium, studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student Updated Successfully",
    });
  } catch (error) {
    console.error("Update Student Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error In Update Student API",
      error: error.message,
    });
  }
};

// ==============================
// DELETE STUDENT
// ==============================
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const [result] = await db.query("DELETE FROM students WHERE id = ?", [
      studentId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error In Delete Student API",
      error: error.message,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudents,
  updateStudent,
  deleteStudent,
};


