import express from 'express'
import { addEventAssignment, getEventsAssignment } from '../../service'
import { validationResult } from 'express-validator'
import { postValidations } from './eventAssignment.validator'
const router = express.Router()

router.get('/', async (req, res) => {
    const eventAsignments = await getEventsAssignment()
    res.json(eventAsignments)
})

router.post('/', postValidations, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(({msg, param}) => `${param} | ${msg}`) })
    }

    const nextAsignment = await addEventAssignment(req.body)
    res.json(nextAsignment)
})

export default router