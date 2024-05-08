const { Schema, model, models } = require("mongoose");

const SymptomSchema = new Schema({
    symptom: {
        type: String,
        required: [true, "Symptom is required"],
    }
})

const Symptom = models.Symptom || model("Symptom", SymptomSchema);

module.exports = Symptom;