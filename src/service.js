import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/EventsApp'
mongoose.connect(
    mongoUrl, 
    () => console.log('Connected to DB!')
)

const EventAssignmentSchema = new mongoose.Schema({
    date: Date,
    email: String,
    name: String,
    surname: String,
})
const EventAssignment = mongoose.model('eventAssignments', EventAssignmentSchema)

export const getEventsAssignment = () => EventAssignment.find()
export const getEventsAssignmentForMail = (email) => EventAssignment.find({email})
export const addEventAssignment = (data) => new EventAssignment(data).save()
