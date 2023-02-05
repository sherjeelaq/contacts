import Button from 'components/Button'
import Icon from 'components/Icon'
import React, { useState } from 'react'
import AddContactModal from './AddContactModal'
import ContactList from './ContactList'

function Main() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const toggleIsAddModalVisible = () => {
    setIsAddModalVisible((prev) => !prev)
  }

  return (
    <React.Fragment>
      <div className="border-y-[0.0625rem] border-custom-gray-60 min-h-[96px] px-[1.5rem] py-2 flex items-center justify-between flex-wrap gap-y-2">
        <h1 className="text-white mr-2">Contacts</h1>
        <div className="flex flex-1 flex-row items-center justify-end flex-wrap gap-x-7 gap-y-3">
          <Icon
            type="settings"
            imageProps={{
              width: 21.5,
              height: 21.5
            }}
            containerClassNames="cursor-pointer"
          />
          <Icon
            type="pfp"
            imageProps={{
              width: 21.5,
              height: 21.5
            }}
            containerClassNames="cursor-pointer"
          />
          <Button
            icon="add"
            text="Add new"
            type="special"
            onClick={toggleIsAddModalVisible}
            testId="add-contact-modal-button"
          />
        </div>
      </div>
      <div>
        <ContactList />
      </div>
      <AddContactModal
        isVisible={isAddModalVisible}
        toggleVisible={toggleIsAddModalVisible}
      />
    </React.Fragment>
  )
}

export default Main
