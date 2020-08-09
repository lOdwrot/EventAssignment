import chai from 'chai'
import {expect} from 'chai'
import chaiHttp from 'chai-http'
import mongoUnit from 'mongo-unit'
import data from './fixtures/data.json'
import { connectDB } from '../src/service'
import app from '../index.js'
import { eventAssignmentTemplate } from './fixtures/dataTamplates'

const EVENT_ASSIGNMENT_URL = '/eventAssignment'

chai.use(chaiHttp)
chai.should()

describe('service', () => {
    before(() => connectDB())
    beforeEach(() => mongoUnit.load(data))
    afterEach(() => mongoUnit.drop())
    
    describe('GET /eventAssignment', () => {
        it('should return all assignments', (done) => {
            chai.request(app)
                .get(EVENT_ASSIGNMENT_URL)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.length).to.equal(1)
                    done()
                })
        })
    })

    describe('POST /eventAssignment', () => {
        it('should insert record for correct data', (done) => {
            const assignmentInvalidEmail = {
                ...eventAssignmentTemplate,
            }

            chai.request(app)
                .post(EVENT_ASSIGNMENT_URL)
                .send(assignmentInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body._id).to.be.a('string')
                    done()
                })
        })

        it('should return error for not valid email', (done) => {
            const assignmentInvalidEmail = {
                ...eventAssignmentTemplate,
                email: 'someText'
            }

            chai.request(app)
                .post(EVENT_ASSIGNMENT_URL)
                .send(assignmentInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.errors.length).to.equal(1)
                    expect(res.body.errors[0]).to.contain('email')
                    done()
                })
        })

        it('should return error for not duplicated email', (done) => {
            const assignmentInvalidEmail = {
                ...eventAssignmentTemplate,
                email: 'asmith@x.com'
            }

            chai.request(app)
                .post(EVENT_ASSIGNMENT_URL)
                .send(assignmentInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.errors.length).to.equal(1)
                    expect(res.body.errors[0]).to.contain('This email is already used')
                    done()
                })
        })

        it('should return error for not valid date format', (done) => {
            const assignmentInvalidEmail = {
                ...eventAssignmentTemplate,
                date: '11.12.2020'
            }

            chai.request(app)
                .post(EVENT_ASSIGNMENT_URL)
                .send(assignmentInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.errors.length).to.equal(1)
                    expect(res.body.errors[0]).to.contain('date')
                    done()
                })
        })
    })
    
})