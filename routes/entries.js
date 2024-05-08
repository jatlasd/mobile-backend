const express = require("express");
const router = express.Router();

const Entry = require("../models/entry");
const Symptom = require("../models/symptom");
const Trigger = require("../models/trigger");

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    symptom: req.body.symptom,
    trigger: req.body.trigger,
    time: req.body.time,
    severity: req.body.severity,
    notes: req.body.notes,
    isQuickAdd: req.body.isQuickAdd,
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { symptom, trigger, severity, notes } = req.body;
  const entryId = req.params.id;

  try {
    const entry = await Entry.findByIdAndUpdate(
      entryId,
      { symptom, trigger, severity, notes },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Entry not found");
    }

    res.status(200).send("Entry updated successfully");
  } catch (error) {
    res.status(500).send(`Failed to update the entry ${entryId}`);
  }
});

router.delete("/:id", async (req, res) => {
  const entryId = req.params.id;

  try {
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).send("Entry not found");
    }

    const entriesWithSymptom = await Entry.find({ symptom: entry.symptom });

    if (entriesWithSymptom.length === 1) {
      await Symptom.deleteOne({ symptom: entry.symptom });
    }

    const entriesWithTrigger = await Entry.find({ trigger: entry.trigger });

    if (entriesWithTrigger.length === 1) {
      await Trigger.deleteOne({ trigger: entry.trigger });
    }

    await Entry.deleteOne({ _id: entryId });

    res.status(200).send("Entry deleted successfully");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send(`Failed to delete the entry ${entryId}`);
  }
});

module.exports = router;
