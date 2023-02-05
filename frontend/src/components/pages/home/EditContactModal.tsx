import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Modal from 'components/Modal'
import AvatarLarge from 'assets/avatar-large.png'
import Image, { StaticImageData } from 'next/image'
import Button from 'components/Button'
import Input from 'components/Input'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { ENV } from 'lib/env'
import { toast } from 'react-toastify'

interface EditContactModalProps {
  isVisible: boolean
  toggleVisible: () => void
  initialValues: {
    id: string
    photo: string | StaticImageData
    name: string
    phone: string
    email: string
  }
}

function EditContactModal({
  isVisible,
  toggleVisible,
  initialValues
}: EditContactModalProps) {
  const queryClient = useQueryClient()
  const imageRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [initialImage, setInitialImage] = useState<
    string | StaticImageData | null
  >(null)
  const [image, setImage] = useState<File | null>(null)

  const clearImage = () => {
    setInitialImage(null)
    setImage(null)
  }

  const clearAll = useCallback(() => {
    clearImage()
    setName('')
    setPhone('')
    setEmail('')
  }, [])

  useEffect(() => {
    if (isVisible) {
      setName(initialValues.name)
      setPhone(initialValues.phone)
      setEmail(initialValues.email)
      setInitialImage(initialValues.photo)
    } else {
      clearAll()
    }
  }, [initialValues, isVisible, clearAll])

  const handleName = (value: string) => {
    setName(value)
  }
  const handlePhone = (value: string) => {
    setPhone(value)
  }
  const handleEmail = (value: string) => {
    setEmail(value)
  }

  const openImageUpload = () => {
    imageRef.current && imageRef.current.click()
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!e.target.files) return

    const tempImage = e.target.files[0]
    setImage(tempImage)
    setInitialImage(null)
  }

  const displayImage = useMemo(
    () =>
      initialImage
        ? initialImage
        : image
        ? URL.createObjectURL(image)
        : AvatarLarge,
    [image, initialImage]
  )

  const editContactQuery = useMutation(
    (data: FormData) => {
      return axios.post(
        `${ENV.API_URL}/editContact/${initialValues.id}`,
        data
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getContacts')
        toast.success('Successfully updated contact!')
        clearAll()
        toggleVisible()
      },
      onError: () => {
        toast.error('There was some error updating contact!')
      }
    }
  )

  const editContact = () => {
    if (!name || !email || !phone || (!image && !initialImage))
      return toast.error('Please fill all fields!')

    const formData = new FormData()

    if (image) {
      formData.append('photo', image)
    }
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    editContactQuery.mutate(formData)
  }

  return (
    <Modal isVisible={isVisible} toggleVisible={toggleVisible}>
      <div className="bg-custom-gray-100 w-[calc(100vw-3rem)] xs:w-[22.75rem] p-[1.5rem] max-h-screen overflow-scroll">
        <h2 className="text-white">Edit contact</h2>
        <div className="mt-6 flex flex-row items-center  flex-wrap xs:flex-nowrap gap-x-4 gap-y-2">
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={handleImageUpload}
            accept="image/png, image/gif, image/jpeg"
            data-testid="edit-file-input"
          />
          <div className="w-[5.5rem] h-[5.5rem] relative">
            <Image
              alt="default-avatar"
              className="rounded-full object-cover"
              src={displayImage}
              fill
            />
          </div>
          {image || initialImage ? (
            <div className="flex flex-row">
              <Button
                icon="reload"
                text="Change picture"
                type="primary"
                onClick={openImageUpload}
                iconHeight="21.3px"
                iconWidth="15.5px"
              />
              <Button
                icon="trash"
                type="primary"
                onClick={clearImage}
                className="ml-4"
                iconHeight="16.7px"
                iconWidth="12.75px"
                testId="edit-clear-photo"
              />
            </div>
          ) : (
            <Button
              icon="add"
              text="Add picture"
              type="primary"
              onClick={openImageUpload}
              className="ml-4"
              testId="edit-image-button"
            />
          )}
        </div>

        <Input
          label="Name"
          placeholder="Jamie Wright"
          value={name}
          onChange={handleName}
          type="text"
          containerClassName="mt-6"
          testId="edit-name-input"
        />
        <Input
          label="Phone number"
          placeholder="+01 234 5678"
          value={phone}
          onChange={handlePhone}
          type="text"
          containerClassName="mt-6"
          testId="edit-phone-input"
        />
        <Input
          label="Email address"
          placeholder="jamie.wright@mail.com"
          value={email}
          onChange={handleEmail}
          type="email"
          containerClassName="mt-6"
          testId="edit-email-input"
        />

        <div className="mt-12 flex flex-row justify-end items-center">
          <Button
            text="Cancel"
            type="secondary"
            onClick={toggleVisible}
            className="mr-2"
          />
          <Button
            text="Done"
            type="primary"
            onClick={editContact}
            testId="edit-contact-button"
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditContactModal
