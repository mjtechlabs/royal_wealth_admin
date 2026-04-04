import {ButtonHTMLAttributes, ReactNode, TextareaHTMLAttributes} from 'react'
import {TableColumn} from 'react-data-table-component'

import {DropDownObjectType, GeneralProps} from './CommonTypes'
import {HeadingComponentType} from './UnionTypes'

export type ImageComponentProps = Pick<GeneralProps, 'className' | 'imageUrl'> & {
  onPressImage?: () => void
}
export interface AppLoaderRef {
  showLoader: (state: boolean) => void
}

export type DashboardCardsProps = Pick<DashboardCardType, 'title'> &
  Pick<GeneralProps, 'className' | 'imageUrl'> & {
    spanContent: string
  }

export type HeadingComponentProps = Pick<GeneralProps, 'className'> &
  Required<Pick<GeneralProps, 'singleLineContent'>> & {
    type?: HeadingComponentType
    isUnderline?: boolean
  }

export interface FilterPayload {
  date1: string
  date2: string
  date3: string
  date4: string
  userId: string
  userName: string
  email: string
  mobileNo: string
  userStatus: string
  searchValue: string
  userCode: string
  userWallet: string
}

export interface FilterComponentType {
  isDateFilterType1?: boolean
  isDateFilterType2?: boolean
  isUserIdType?: boolean
  isUserEmailType?: boolean
  isUserNameType?: boolean
  isMobileNumberType?: boolean
  isStatus1Type?: boolean
  isSearchType?: boolean
  isWalletType?: boolean
  isUsercode?: boolean
  onPressSearch: (payload: FilterPayload) => void
}

export interface DateComponentProps extends Pick<GeneralProps, 'className'> {
  selectedDate: Date
  onSelectDate: (value: Date) => void
  minDate?: Date
  labelText?: string
}

export interface TextAreaComponentProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Pick<GeneralProps, 'className' | 'layoutClassName'> {
  labelName: string
}

export type CommonDropDownProps = Pick<GeneralProps, 'className'> & {
  dropDownData: DropDownObjectType[]
  selectedValue: DropDownObjectType
  onSelectValue: (data: DropDownObjectType) => void
  elementId?: string
  isCustomType?: boolean
  wrapperClassName?: string
}

export interface TableComponentProps {
  columns: TableColumn<unknown>[]
  data: unknown[]
  setRowClickValue?: (value: any) => void
}
export interface GeneralTableProps {
  tableHeading: {content: string; showArrow: boolean}[]
  className?: string
  layoutClassName?: string
  children: ReactNode
}

export interface AntdModelProps extends Pick<GeneralTableProps, 'children'> {
  open: boolean
  setOpen: (value: boolean) => void
}

export type CommonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Required<Pick<GeneralProps, 'singleLineContent'>> &
  Pick<GeneralProps, 'className' | 'imageUrl'>

export interface SearchComponentProps
  extends Pick<GeneralProps, 'className'>,
    Pick<ImageComponentProps, 'onPressImage'> {
  searchValue: string
  onSearchChange: (value: string) => void
}

export type EmptyComponentProps = Pick<GeneralProps, 'singleLineContent'> & {isTableType?: boolean}

export interface CustomFilterProps {
  isDate1Type?: boolean
  isDate2Type?: boolean
  dropDownData1?: DropDownObjectType[]
  dropDownData2?: DropDownObjectType[]
  isEmail?: string
  isUserCode?: string
  onPressSearch: (
    date1st: string,
    date1end: string,
    date2st: string,
    date2end: string,
    dropDownData1: DropDownObjectType,
    dropDownData2: DropDownObjectType,
    emailText: string,
    userCode: string
  ) => void
  labelText1?: string
  labelText2?: string
  placeHolder1?: string
  placeHolder2?: string
}
