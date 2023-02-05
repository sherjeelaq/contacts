import { Request, Response } from 'express'
import { Contact, ContactInterface } from '../models/'
import { IResponse } from '../Types'
import { statusCodes } from '../constants/statusCodes'
import { unlink } from 'fs'
import path from 'path'

export const createContact = async (req: Request, res: IResponse) => {
  const { name, email, phone } = req.body

  const data: ContactInterface = {
    name,
    email,
    phone
  }

  if (req.file) {
    data['photo'] =
      req.protocol +
      '://' +
      req.headers.host +
      '/images/' +
      req.file.filename
  }

  const contact = new Contact(data)
  try {
    await contact.save()
    res.sendResponse(null, null, statusCodes.OK)
  } catch (error: any) {
    res.sendResponse(
      null,
      { message: error.message },
      statusCodes.BAD_REQUEST
    )
  }
}

export const getContacts = async (req: Request, res: IResponse) => {
  const contacts = await Contact.find({})
  try {
    res.sendResponse(contacts, null, statusCodes.OK)
  } catch (error: any) {
    res.sendResponse(
      null,
      { message: error.message },
      statusCodes.BAD_REQUEST
    )
  }
}

export const editContact = async (req: Request, res: IResponse) => {
  const { id } = req.params
  const { name, email, phone } = req.body

  const data: ContactInterface = {
    name,
    email,
    phone
  }

  if (req.files && req.files.length > 0 && Array.isArray(req.files)) {
    const foundContact = await Contact.findById(id)

    if (foundContact && foundContact.photo) {
      const photoUrl = foundContact.photo.split('/')
      const fullPath = path.resolve(
        __dirname +
          '/../../public/' +
          photoUrl[photoUrl.length - 2] +
          '/' +
          photoUrl[photoUrl.length - 1]
      )

      unlink(fullPath, error => {
        if (error) {
          console.log("Couldn't delete image")
        }
      })
    }

    data['photo'] =
      req.protocol +
      '://' +
      req.headers.host +
      '/images/' +
      req.files[0].filename
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, data, {
      new: true
    })
    res.sendResponse(null, null, statusCodes.OK)
  } catch (error: any) {
    res.sendResponse(
      null,
      { message: error.message },
      statusCodes.BAD_REQUEST
    )
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params
  const foundContact = await Contact.findById(id)

  if (foundContact && foundContact.photo) {
    const photoUrl = foundContact.photo.split('/')
    const fullPath = path.resolve(
      __dirname +
        '/../../public/' +
        photoUrl[photoUrl.length - 2] +
        '/' +
        photoUrl[photoUrl.length - 1]
    )

    unlink(fullPath, error => {
      if (error) {
        console.log("Couldn't delete image")
      }
    })
  }

  try {
    await Contact.findByIdAndDelete(id)
    res.sendResponse(null, null, statusCodes.OK)
  } catch (error: any) {
    res.sendResponse(
      null,
      { message: error.message },
      statusCodes.BAD_REQUEST
    )
  }
}
