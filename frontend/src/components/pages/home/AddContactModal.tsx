import React, { useMemo, useRef, useState } from 'react'
import Modal from 'components/Modal'
import AvatarLarge from 'assets/avatar-large.png'
import Image from 'next/image'
import Button from 'components/Button'
import Input from 'components/Input'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { ENV } from 'lib/env'
import axios from 'axios'

interface AddContactModalProps {
  isVisible: boolean
  toggleVisible: () => void
}

function AddContactModal({
  isVisible,
  toggleVisible
}: AddContactModalProps) {
  const queryClient = useQueryClient()
  const imageRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState<File | null>(null)

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
  }

  const clearImage = () => {
    setImage(null)
  }

  const clearAll = () => {
    clearImage()
    setName('')
    setPhone('')
    setEmail('')
    toggleVisible()
  }

  const displayImage = useMemo(
    () => (image ? URL.createObjectURL(image) : AvatarLarge),
    [image]
  )

  const createContact = useMutation(
    (data: FormData) => {
      return axios.post(`${ENV.API_URL}/createContact`, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getContacts')
        toast.success('Successfully created contact!')
        clearAll()
      },
      onError: () => {
        toast.error('There was some error creating contact!')
      }
    }
  )

  const addContact = () => {
    if (!name || !email || !phone || !image)
      return toast.error('Please fill all fields!')

    const formData = new FormData()

    formData.append('photo', image)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    createContact.mutate(formData)
  }

  return (
    <Modal isVisible={isVisible} toggleVisible={toggleVisible}>
      <div className="bg-custom-gray-100 w-[calc(100vw-3rem)] xs:w-[22.75rem] p-[1.5rem] max-h-screen overflow-scroll">
        <h2 className="text-white">Add contact</h2>
        <div className="mt-6 flex flex-row items-center flex-wrap xs:flex-nowrap gap-x-4 gap-y-2">
          <input
            type="file"
            className="hidden"
            data-testid="add-file-input"
            ref={imageRef}
            onChange={handleImageUpload}
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="w-[5.5rem] h-[5.5rem] relative">
            <Image
              alt="default-avatar"
              className="rounded-full object-cover"
              src={displayImage}
              fill
            />
          </div>
          {image ? (
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
              />
            </div>
          ) : (
            <Button
              icon="add"
              text="Add picture"
              type="primary"
              onClick={openImageUpload}
              className="ml-4"
              testId="add-image-button"
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
          testId="name-input"
        />
        <Input
          label="Phone number"
          placeholder="+01 234 5678"
          value={phone}
          onChange={handlePhone}
          type="text"
          containerClassName="mt-6"
          testId="phone-input"
        />
        <Input
          label="Email address"
          placeholder="jamie.wright@mail.com"
          value={email}
          onChange={handleEmail}
          type="email"
          containerClassName="mt-6"
          testId="email-input"
        />

        <div className="mt-12 flex flex-row justify-end items-center">
          <Button
            text="Cancel"
            type="secondary"
            onClick={toggleVisible}
            className="mr-2"
          />
          <Button
            text={createContact.isLoading ? 'Loading...' : 'Done'}
            type="primary"
            onClick={addContact}
            disabled={createContact.isLoading}
            testId="add-contact-button"
          />
        </div>
      </div>
    </Modal>
  )
}

export default AddContactModal
