const express = require("express");
const router = express.Router();
const Trigger = require("../models/trigger");

router.get("/", async (req, res) => {
  try {
    const triggers = await Trigger.find();
    res.json(triggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
    const { trigger } = req.body;
  
    try {
      let existingTrigger = await Trigger.findOne({ trigger });
  
      if (!existingTrigger) {
        const newTrigger = new Trigger({
          trigger,
        });
        existingTrigger = await newTrigger.save();
      }
  
      res.status(201).json(existingTrigger);
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).send('Failed to add new trigger');
    }
  });

  module.exports = router;