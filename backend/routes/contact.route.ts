import express from 'express'
import {
  createContact,
  deleteContact,
  editContact,
  getContacts
} from '../controllers/contact.controller'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/images`)
  },
  filename: (req, file, cb) => {
    const regexMatch = file.originalname.match(/\..*$/)
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        (regexMatch && regexMatch.length > 0 ? regexMatch[0] : '.jpg')
    )
  }
})

const upload = multer({
  storage,
  limits: { fieldSize: 25 * 1024 * 1024 }
})

const router = express.Router()

router
  .route('/createContact')
  .post(upload.single('photo'), createContact)

router.route('/getContacts').get(getContacts)

router.route('/editContact/:id').post(upload.any(), editContact)

router.route('/deleteContact/:id').delete(deleteContact)

export default router
