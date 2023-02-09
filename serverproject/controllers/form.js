const Form = require("../models/form");

const createForm = async (req, res) => {
    let field = req.body;
  
    const { 
        title,
        description,
        school,
        department,
        AssignedTo
    } = field;
    const newForm = new Form(field);
  
    try {
      await newForm.save();
      res.status(201).json({ form: newForm });
    } catch (err) {
      console.log(err);
    }
};

const deleteForm = (req, res) => {
    let formId = req.params.id;

    Form.findByIdAndRemove(formId).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Form not found.`
          });
        } else {
          res.send({
            message: "Form deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
}

const updateForm =  (req, res) => {
    let formId = req.params.id;
    const { 
        title,
        description,
        school,
        department,
        AssignedTo
        } = req.body;

    if (!title || 
        !description || 
        !school ||
        !department ||
        !AssignedTo
    ) {      
      return res.status(400).json({
        error: "Please include all fields",
      });
    } 
    
    Form.findByIdAndUpdate(
          formId, 
          req.body
      ).then(data => {
          if (!data) {
              res.status(404).send({
                  message: `Form not found.`
              });
          }
          res.send(data)
         
      }).catch(err => {
          res.status(500).send({
              message: err.message
          });
      });
    
}

const getAllForms = async (req, res) => {
    try {
        const formList = await Form.find();
        res.status(200).json(formList);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

module.exports = {
    createForm,
    getAllForms,
    updateForm,
    deleteForm
};