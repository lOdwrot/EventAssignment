import mongoose from 'mongoose'

const EventAssignmentSchema = new mongoose.Schema({
    date: Date,
    email: String,
    name: String,
    surname: String,
})
const EventAssignment = mongoose.model('eventAssignments', EventAssignmentSchema)

export const connectDB = () => mongoose.connect(
    process.env.MONGO_URL, 
    () => console.log('Connected to DB!')
)

export const disconnectDB = () => mongoose.disconnect()

export const getEventsAssignments = () => EventAssignment.find()
export const getEventsAssignmentForMail = (email) => EventAssignment.find({email})
export const addEventAssignment = (data) => new EventAssignment(data).save()
