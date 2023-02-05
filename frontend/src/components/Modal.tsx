import React, { ReactNode, useEffect } from 'react'

interface ModalProps {
  isVisible: boolean
  toggleVisible: () => void
  children: ReactNode
}
function Modal({ isVisible, toggleVisible, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : ''
  }, [isVisible])

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen items-center justify-center z-20"
      style={{
        display: isVisible ? 'flex' : 'none'
      }}
    >
      <div
        className="bg-[rgba(0,0,0,0.4)] w-screen h-screen z-20 fixed top-0 left-0"
        onClick={toggleVisible}
      />
      <div className="rounded-lg z-30">
        <div className="relative rounded-md">{children}</div>
      </div>
    </div>
  )
}

export default Modal
