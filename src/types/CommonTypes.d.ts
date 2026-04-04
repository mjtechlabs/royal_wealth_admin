import {UserSliceInitialType} from '@/store'

export interface GeneralProps {
  className?: string
  imageUrl?: string
  singleLineContent?: string
  layoutClassName?: string
  children?: ReactNode
  multilineContent?: string[]
  closeIconClassName: string
}
export interface DropDownObjectType {
  img?: string
  title: string
  content?: string
}

export interface StorageProps {
  userData: UserSliceInitialType
}

export interface UserObjectType {
  name: string
  email: string
  profilePic: null | string
  reg_date: string
}
