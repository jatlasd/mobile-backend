const { Schema, model, models } = require("mongoose");

const TriggerSchema = new Schema({
    trigger: {
        type: String,
        required: [true, "Trigger is required"],
    }
})

const Trigger = models.Trigger || model("Trigger", TriggerSchema);

module.exports = Trigger;