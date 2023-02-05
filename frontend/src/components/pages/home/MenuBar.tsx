import React from 'react'
import Icon from 'components/Icon'

interface MenuBarProps {
  iconType: string
  imageProps: {
    width?: number | `${number}` | undefined
    height?: number | `${number}` | undefined
    fill?: boolean
  }
  containerClassNames?: string
  noBorder?: boolean
}

function MenuBar({
  iconType,
  imageProps,
  containerClassNames,
  noBorder
}: MenuBarProps) {
  return (
    <div
      className={`${
        !noBorder
          ? 'md:border-y-[0.0625rem] md:border-custom-gray-60'
          : ''
      } min-h-[96px] flex items-center ${
        containerClassNames ? containerClassNames : ''
      }`}
    >
      <Icon
        type={iconType}
        containerClassNames="cursor-pointer"
        imageProps={imageProps}
      />
    </div>
  )
}

export default MenuBar
