const mongoose = require("mongoose")




const eventSchemaRules = {
  title: {
    type: String,
    required: [true, "Event title is required"],
    minlength: [3, "Title must be at least 3 characters"]
  },
  description: {
    type: String,
    required: [true, "Please provide an event description"]
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
    min: [Date.now, "Event date cannot be in the past"]
  },
  location: {
    type: String,
    default: "Online",
    enum: {
      values: ["In-Person", "Online", "Hybrid"],
      message: "{VALUE} is not a supported location type"
    }
  },
  capacity: {
    type: Number,
    min: [1, "Capacity must be at least 1 person"],
    max: [10000, "For events over 10k, please contact enterprise support"]
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  organizerEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },
  isPublished: {
    type: Boolean,
    default: false
  }
};


const eventSchema = new mongoose.Schema(eventSchemaRules)

const EventModel = mongoose.model("event", eventSchema)

module.exports = EventModel





