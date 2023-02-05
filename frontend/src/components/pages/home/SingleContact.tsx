import axios from 'axios'
import Icon from 'components/Icon'
import { ENV } from 'lib/env'
import Image, { StaticImageData } from 'next/image'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

interface SingleContactProps {
  id: string
  photo: string | StaticImageData
  name: string
  phone: string
  toggleEditModal: () => void
  handleSelection: () => void
}

function SingleContact({
  id,
  photo,
  name,
  phone,
  toggleEditModal,
  handleSelection
}: SingleContactProps) {
  const queryClient = useQueryClient()
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const toggleMenuOpened = () => setIsMenuOpened((prev) => !prev)

  const deleteContactQuery = useMutation(
    () => {
      return axios.delete(`${ENV.API_URL}/deleteContact/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getContacts')
        toast.success('Successfully deleted contact!')
      },
      onError: () => {
        toast.error('There was some error updating contact!')
      }
    }
  )

  const removeContact = useCallback(
    (contactId: string) => {
      if (!contactId) return
      deleteContactQuery.mutate()
    },
    [deleteContactQuery]
  )

  //listener to close menu if clicked outside
  function handleClickOutside(e: MouseEvent) {
    if (!menuRef.current || !e.target) return

    const target = e.target as Node
    if (menuRef.current?.contains(target)) return

    setIsMenuOpened(false)
  }

  useEffect(() => {
    if (!isMenuOpened) {
      document.removeEventListener('mousedown', handleClickOutside)
      return
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpened])

  const menuItems = useMemo(
    () => [
      {
        iconType: 'settings',
        name: 'Edit',
        testId: 'edit-contact-option',
        onClick: () => {
          handleSelection()
          toggleEditModal()
        }
      },
      {
        iconType: 'heart',
        name: 'Favourite',
        testId: 'like-contact-option'
      },
      {
        iconType: 'trash',
        name: 'Remove',
        testId: 'remove-contact-option',
        onClick: removeContact
      }
    ],
    [removeContact, toggleEditModal, handleSelection]
  )

  return (
    <div className="group px-4 h-16 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 relative">
          <Image
            src={photo}
            alt={`${name}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="ml-4 mr- flex flex-col justify-center">
          <h3
            className="text-white"
            data-testid="contact-single-name"
          >
            {name}
          </h3>
          <p
            className="text-xs text-custom-white-56"
            data-testid="contact-single-phone"
          >
            {phone}
          </p>
        </div>
      </div>
      <div
        className={`group-hover:flex ${
          isMenuOpened ? 'flex' : 'hidden'
        } flex-row items-center`}
      >
        <Icon
          type="mute-notifications"
          imageProps={{
            width: 18.9,
            height: 19.68
          }}
          containerClassNames="mr-6 cursor-pointer"
        />
        <Icon
          type="headphones"
          imageProps={{
            width: 17,
            height: 17
          }}
          containerClassNames="mr-3 cursor-pointer"
        />
        <div className="relative" ref={menuRef}>
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
              isMenuOpened ? 'bg-custom-gray-80' : ''
            }`}
            onClick={toggleMenuOpened}
            data-testid="contact-single-more"
          >
            <Icon
              type="more"
              imageProps={{
                width: 14.55,
                height: 14.55
              }}
              containerClassNames="cursor-pointer"
            />
          </div>
          {isMenuOpened && (
            <div className="absolute top-11 right-0 md:right-auto z-10">
              <div className="bg-custom-gray-80 w-56 rounded-lg overflow-hidden">
                {menuItems.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="relative flex flex-row items-center p-3 hover:bg-custom-gray-70 cursor-pointer"
                      onClick={() => item.onClick && item.onClick(id)}
                      data-testid={item.testId}
                    >
                      <div className="relative w-5 h-5 mr-4">
                        <Icon
                          type={item.iconType}
                          className="object-contain"
                          imageProps={{
                            fill: true
                          }}
                        />
                      </div>
                      <p className="text-white">{item.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleContact
