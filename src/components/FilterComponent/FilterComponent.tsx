import {memo, useState} from 'react'

import {Layout3} from '@/layout'
import {Constant, English, Utility} from '@/services'
import {DropDownObjectType} from '@/types/CommonTypes'
import {FilterComponentType} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'
import DateComponent from '../DateComponent/DateComponent'
import Dropdown from '../DropdownComponent/Dropdown'
import InputComponent from '../InputComponent/InputComponent'
import SearchComponent from '../SearchComponent/SearchComponent'

const FilterComponent = (props: FilterComponentType) => {
  const {
    isDateFilterType1 = false,
    isDateFilterType2 = false,
    isMobileNumberType = false,
    isStatus1Type = false,
    isUserEmailType = false,
    isUserIdType = false,
    isUserNameType = false,
    isSearchType = false,
    isWalletType = false,
    isUsercode = false,
    onPressSearch
  } = props

  const [selectedDate1, setSelectedDate1] = useState('')
  const [selectedDate2, setSelectedDate2] = useState('')
  const [selectedDate3, setSelectedDate3] = useState('')
  const [selectedDate4, setSelectedDate4] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userCode, setUserCode] = useState('')
  const [userWallet, setUserWallet] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [number, setNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedDropDown, setSelectedDropDown] = useState<DropDownObjectType>({
    title: 'All Users',
    content: '-1'
  })

  return (
    <div className="padded__container__utility space-y-2">
      {isDateFilterType1 ? (
        <Layout3
          className="[&>div]:bg-transparent! [&>div]:shadow-none! [&>div]:px-0! "
          singleLineContent="Registration Date "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DateComponent
              className="z-99!"
              labelText={English.E114}
              selectedDate={selectedDate1 as unknown as Date}
              onSelectDate={(data) => {
                setSelectedDate1(data.toString())
              }}
            />
            <DateComponent
              className="z-60!"
              labelText={English.E115}
              minDate={selectedDate1 as unknown as Date}
              selectedDate={selectedDate2 as unknown as Date}
              onSelectDate={(data) => {
                setSelectedDate2(data.toString())
              }}
            />
          </div>
        </Layout3>
      ) : null}
      {isDateFilterType2 ? (
        <Layout3
          className="[&>div]:bg-transparent! [&>div]:shadow-none! [&>div]:px-0! "
          singleLineContent="Activation Date"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            <DateComponent
              className="z-50!"
              labelText="Activation From Date"
              selectedDate={selectedDate3 as unknown as Date}
              onSelectDate={(data) => {
                setSelectedDate3(data.toString())
              }}
            />
            <DateComponent
              className="z-40!"
              labelText="Activation To Date"
              selectedDate={selectedDate4 as unknown as Date}
              onSelectDate={(data) => {
                setSelectedDate4(data.toString())
              }}
            />
          </div>
        </Layout3>
      ) : null}
      {isUserEmailType || isUserIdType || isUserNameType || isUsercode || isStatus1Type ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isUserIdType ? (
            <InputComponent
              labelText="User ID"
              name="userId"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value)
              }}
            />
          ) : null}
          {isUserNameType ? (
            <InputComponent
              labelText="UserName"
              name="userName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            />
          ) : null}
          {isUserEmailType ? (
            <InputComponent
              className=""
              error={error}
              labelText="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (!Utility.isValidEmail(e.target.value)) {
                  setError('Please Enter Valid Email')
                  return
                }
                setError('')
              }}
            />
          ) : null}
          {isUsercode ? (
            <InputComponent
              labelText="UserCode"
              name="usercode"
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value)
              }}
            />
          ) : null}
          {isStatus1Type ? (
            <Layout3
              className="[&>div]:bg-transparent! [&>div]:shadow-none! [&>div]:px-0!  [&>div]:py-0!"
              singleLineContent="User Status"
            >
              <Dropdown
                className=""
                dropDownData={Constant.UserStatus}
                onSelectValue={setSelectedDropDown}
                selectedValue={selectedDropDown}
                wrapperClassName="max-h-34!"
              />
            </Layout3>
          ) : null}
        </div>
      ) : null}

      {isMobileNumberType ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputComponent
            labelText="Mobile Number"
            maxLength={10}
            name="number"
            value={number}
            onChange={(e) => {
              setNumber(Utility.isValidNumber(e.target.value))
            }}
          />
        </div>
      ) : null}

      {isWalletType ? (
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-5">
          {isWalletType ? (
            <InputComponent
              labelText="Wallet"
              name="wallet"
              type="text"
              value={userWallet}
              onChange={(e) => {
                setUserWallet(e.target.value)
              }}
            />
          ) : null}
        </div>
      ) : null}

      {isSearchType ? (
        <SearchComponent
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          onPressImage={() => {
            setSearchValue('')
          }}
        />
      ) : null}

      <div className="flex flex-row mt-6 flex-wrap w-full gap-5">
        <CommonButton
          className="small__transparent__button w-fit!"
          singleLineContent="Submit"
          onClick={(e) => {
            e.stopPropagation()
            onPressSearch({
              date1: selectedDate1,
              date2: selectedDate2,
              date3: selectedDate3,
              date4: selectedDate4,
              email,
              mobileNo: number,
              userId,
              userName,
              userStatus: selectedDropDown.content ?? '',
              searchValue,
              userCode,
              userWallet
            })
          }}
        />
        <CommonButton
          className="small__transparent__button bg-primary-blue text-white w-fit!"
          singleLineContent="Clear Filters"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setSelectedDate1('')
            setSelectedDate2('')
            setSelectedDate3('')
            setSelectedDate4('')
            setUserId('')
            setEmail('')
            setUserName('')
            setNumber('')
            setSearchValue('')
            setUserCode('')
            setUserWallet('')
            setSelectedDropDown({
              title: 'All Users',
              content: '-1'
            })
            onPressSearch({
              date1: '',
              date2: '',
              date3: '',
              date4: '',
              email: '',
              mobileNo: '',
              userId: '',
              userName: '',
              userStatus: '',
              searchValue: '',
              userWallet: '',
              userCode: ''
            })
          }}
        />
      </div>
    </div>
  )
}

export default memo(FilterComponent)
