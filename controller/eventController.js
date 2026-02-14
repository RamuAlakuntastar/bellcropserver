const EventModel = require("../models/eventModel")
const {factoryCreate, getAllFactory,getFactoryId, deleteFactoryId } = require("../utility/factory")



const eventCreate = factoryCreate(EventModel)
const getAllEvent = getAllFactory(EventModel)
const getEventId = getFactoryId(EventModel)
const deleteEventId = deleteFactoryId(EventModel)


module.exports = {eventCreate,getAllEvent, getEventId, deleteEventId}