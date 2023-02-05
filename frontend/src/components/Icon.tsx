import React, { useEffect, useState } from 'react'
import { StaticRequire } from 'lib/icons'
import Image from 'next/image'

interface IconProps {
  type: string
  containerClassNames?: string
  className?: string
  imageProps: {
    width?: number | `${number}` | undefined
    height?: number | `${number}` | undefined
    fill?: boolean
  }
}

function Icon(props: IconProps) {
  const { type, className, containerClassNames, imageProps } = props

  const [icon, setIcon] = useState<StaticRequire | null>(null)

  //lazy loading
  useEffect(() => {
    async function loadIcons() {
      const icons = await (await import('lib/icons')).default
      setIcon(icons[type])
    }
    loadIcons()
  }, [type])

  if (!icon) return <React.Fragment />
  return (
    <div
      className={`${containerClassNames ? containerClassNames : ''}`}
    >
      <Image
        {...imageProps}
        className={className}
        src={icon}
        alt={type}
      />
    </div>
  )
}

export default Icon
