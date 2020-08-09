import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './src/service'
import eventAssignmentRouter from './src/routes/eventAssignemnt/eventAssignment.routes'

dotenv.config()

const PORT = process.env.PORT || 5000
const IS_TEST = process.env.IS_TEST
const BUILD_LOCATION = 'front/build'

const app = express()
    .use(bodyParser.json())
    .use(morgan('tiny'))

const server = http
    .createServer(app)
    .listen(PORT)


app.use(express.static(path.join(__dirname, BUILD_LOCATION)))
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, `${BUILD_LOCATION}/index.html`));
})

app.use('/eventAssignment', eventAssignmentRouter)

if(!IS_TEST) {
    connectDB()
}

console.log('LISTENING ON HTTP ' + PORT)

export default app