import { Schema, model } from 'mongoose'

export interface ContactInterface {
  name: string
  email: string
  phone: string
  photo?: string
}

const ContactSchema = new Schema<ContactInterface>({
  name: String,
  email: String,
  phone: String,
  photo: String
})

const Contact = model<ContactInterface>('Contacts', ContactSchema)

export { Contact }
