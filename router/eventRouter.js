const {eventCreate, getAllEvent, getEventId, deleteEventId} = require("../controller/eventController")
const express = require("express")
const eventRouter = express.Router()
const { protect} = require("../utility/factory")




eventRouter.post("/", protect, eventCreate)
eventRouter.get("/",protect, getAllEvent)
eventRouter.get("/:id", protect, getEventId)
eventRouter.delete("/:id", protect, deleteEventId)


module.exports = eventRouter