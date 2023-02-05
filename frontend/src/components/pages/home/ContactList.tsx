import React, { useCallback, useMemo, useState } from 'react'
import SingleContact from './SingleContact'
import { useQuery } from 'react-query'
import axios from 'axios'
import { ENV } from 'lib/env'
import EditContactModal from './EditContactModal'
import { StaticImageData } from 'next/image'

interface ISelectedItem {
  id: string
  email: string
  photo: string | StaticImageData
  name: string
  phone: string
}

function ContactList() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] =
    useState<ISelectedItem | null>(null)

  const toggleEditModal = useCallback(
    () => setIsEditModalVisible((prev) => !prev),
    []
  )

  const handleSelectedItem = (item: ISelectedItem) => {
    setSelectedItem(item)
  }
  const query = useQuery('getContacts', () => {
    return axios.get(`${ENV.API_URL}/getContacts`)
  })

  const contactList: IContact[] = useMemo(() => {
    return query.data && query.data.data && query.data.data.data
  }, [query.data])

  return (
    <div>
      {contactList &&
        contactList.map((contact) => {
          return (
            <div key={contact._id} data-testid="contact-single">
              <SingleContact
                id={contact._id}
                photo={contact.photo}
                name={contact.name}
                phone={contact.phone}
                toggleEditModal={toggleEditModal}
                handleSelection={() =>
                  handleSelectedItem({
                    id: contact._id,
                    email: contact.email,
                    photo: contact.photo,
                    name: contact.name,
                    phone: contact.phone
                  })
                }
              />
            </div>
          )
        })}
      {selectedItem && (
        <EditContactModal
          isVisible={isEditModalVisible}
          toggleVisible={toggleEditModal}
          initialValues={selectedItem}
        />
      )}
    </div>
  )
}

export default ContactList
