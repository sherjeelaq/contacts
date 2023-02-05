const mongoose = require('mongoose')

export * from './contact.model'

export const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      return console.log(`Database connected successfully`)
    })
    .catch((error: Error) => {
      console.log('Error connecting to database: ', error.message)
      return process.exit(1)
    })
}
