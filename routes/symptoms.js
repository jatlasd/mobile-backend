const express = require("express");
const router = express.Router();
const Symptom = require("../models/symptom");

router.get("/", async (req, res) => {
    try {
      const symptoms = await Symptom.find();
      res.json(symptoms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/', async (req, res) => {
      const { symptom } = req.body;
    
      try {
        let existingSymptom = await Symptom.findOne({ symptom });
    
        if (!existingSymptom) {
          const newSymptom = new Symptom({
            symptom,
          });
          existingSymptom = await newSymptom.save();
        }
    
        res.status(201).json(existingSymptom);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).send('Failed to add new Symptom');
      }
    });

module.exports = router;