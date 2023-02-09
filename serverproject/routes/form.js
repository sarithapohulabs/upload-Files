const express = require("express");
const router = express.Router();

const {
  createForm,
  getAllForms,
  updateForm,
  deleteForm,
} = require("../controllers/form");

router.post("/form/create", createForm);
router.put("/form/update/:id", updateForm);

router.delete("/form/delete/:id", deleteForm);

router.get("/form/all", getAllForms);

module.exports = 
{
    routes: router
}
