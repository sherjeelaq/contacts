import { StaticImageData } from 'next/image'

export interface StaticRequire {
  default: StaticImageData
}

const icons: { [key: string]: StaticRequire } = {
  add: require('assets/icons/add.png'),
  back: require('assets/icons/back.png'),
  headphones: require('assets/icons/headphones.png'),
  heart: require('assets/icons/heart.png'),
  'light-mode': require('assets/icons/light-mode.png'),
  more: require('assets/icons/more.png'),
  'mute-notifications': require('assets/icons/mute-notifications.png'),
  reload: require('assets/icons/reload.png'),
  search: require('assets/icons/search.png'),
  settings: require('assets/icons/settings.png'),
  trash: require('assets/icons/trash.png'),
  pfp: require('assets/icons/pfp.png')
}

export default icons
