import React, { useMemo } from 'react'
import Icon from './Icon'

interface ButtonProps {
  icon?: string
  text?: string
  type: 'primary' | 'secondary' | 'special'
  onClick: () => void
  className?: string
  disabled?: boolean
  iconWidth?: string
  iconHeight?: string
  testId?: string
}

function Button({
  type,
  icon,
  text,
  onClick,
  className,
  disabled,
  iconWidth,
  iconHeight,
  testId
}: ButtonProps) {
  const classes = useMemo(
    () =>
      type === 'primary'
        ? 'bg-custom-gray-60 hover:bg-custom-gray-50 active:bg-custom-gray-40 rounded-lg'
        : type === 'secondary'
        ? 'hover:bg-custom-gray-90 active:bg-custom-gray-80 rounded-lg'
        : 'bg-special-gradient rounded-full',
    [type]
  )

  return (
    <button
      className={`flex flex-row items-center gap-2 h-10 ${classes} ${
        text ? 'py-2 pr-3 pl-2' : 'p-[13.25px]'
      } ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {icon && (
        <div
          className={`relative ${text ? 'mr-[6px] ml-[6px]' : ''}`}
          style={{
            width: iconWidth ? iconWidth : '0.8438rem',
            height: iconHeight ? iconHeight : '0.8438rem'
          }}
        >
          <Icon
            type={icon}
            imageProps={{
              fill: true
            }}
            className="object-contain"
          />
        </div>
      )}
      {text && (
        <p className="text-white text-sm xs:whitespace-nowrap">
          {text}
        </p>
      )}
    </button>
  )
}

export default Button
