import {body} from 'express-validator'
import { getEventsAssignmentForMail } from '../../service'

export const postValidations = [
    body('name').isLength({ min: 2}),
    body('surname').isLength({ min: 2}),
    body('email').isEmail(),
    body('email').custom(value => {
        return getEventsAssignmentForMail(value).then(result => {
            if(result.length) return Promise.reject('This email is already used')
        })
    }),
    body('date').isISO8601().toDate(),
]