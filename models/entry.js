const { Schema, model, models } = require("mongoose");

const EntrySchema = new Schema({
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  symptom: {
    type: String,
    required: [true, "Symptom is required"],
  },
  trigger: {
    type: String,
    required: function() { return !this.isQuickAdd; },
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  severity: {
    type: Number,
    required: function() { return !this.isQuickAdd; },
  },
  notes: {
    type: String,
    required: false,
  },
  isQuickAdd: {
    type: Boolean,
    default: false,
  },
});

const Entry = models.Entry || model("Entry", EntrySchema);

module.exports = Entry