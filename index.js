import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getEventsAssignment, addEventAssignment } from './src/service'
import eventAssignmentRouter from './src/routes/eventAssignemnt/eventAssignment.routes'

const PORT = process.env.PORT || 5000

const app = express()
    .use(bodyParser.json())
    .use(morgan('tiny'))

const server = http
    .createServer(app)
    .listen(PORT)

app.use('/eventAssignment', eventAssignmentRouter)

app.get('*', (req, res) => {
    res.send('Hello')
})

console.log('LISTENING ON HTTP ' + PORT)