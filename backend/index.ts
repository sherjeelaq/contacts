import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { customResponse } from './middlewares/customResponse'
import mongoose from 'mongoose'
import { connectDatabase } from './models'
import routes from './routes'
import path from 'path'

dotenv.config()

mongoose.set('strictQuery', false)
connectDatabase()

const app: Express = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(customResponse)

app.use('/api/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server up and running!')
})

const publicPath = path.resolve(__dirname + '/../public')
app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`
  )
})
