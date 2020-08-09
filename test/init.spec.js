import mongoUnit from 'mongo-unit'
import { disconnectDB } from '../src/service'

process.env.PORT = 5020
process.env.IS_TEST = true

mongoUnit.start().then(() => {
    console.log('Replacing mongo address by: ', mongoUnit.getUrl())
    process.env.MONGO_URL = mongoUnit.getUrl()
    run()
})

after(() => {
    disconnectDB()
    return mongoUnit.stop()
})