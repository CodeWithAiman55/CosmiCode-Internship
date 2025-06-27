const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");

const router = express.Router();

router.get("/getall", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
