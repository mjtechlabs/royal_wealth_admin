import {memo, useState} from 'react'

import {English} from '@/services'
import {DropDownObjectType} from '@/types/CommonTypes'
import {CustomFilterProps} from '@/types/ComponentTypes'

import Layout3 from '../../layout/Layout3'
import CommonButton from '../CommonButton/CommonButton'
import DateComponent from '../DateComponent/DateComponent'
import Dropdown from '../DropdownComponent/Dropdown'
import InputComponent from '../InputComponent/InputComponent'

const CustomFilter = (props: CustomFilterProps) => {
  const {
    onPressSearch,
    dropDownData1 = [],
    dropDownData2 = [],
    isDate1Type = true,
    isDate2Type = true,
    isEmail = true,
    isUserCode = true,
    labelText1 = '',
    labelText2 = '',
    placeHolder1 = '',
    placeHolder2 = ''
  } = props

  const [startDate1, setStartDate1] = useState({stDate: '', endDate: ''})
  const [startDate2, setStartDate2] = useState({stDate: '', endDate: ''})
  const [dropDown1, setDropDown1] = useState<DropDownObjectType>({title: 'Status'})
  const [dropDown2, setDropDown2] = useState<DropDownObjectType>({title: 'Status'})
  const [emailText, setEmailText] = useState('')
  const [userCode, setUserCode] = useState('')

  return (
    <Layout3 className="h-fit!" singleLineContent="">
      {isDate1Type ? (
        <div className="flex flex-row gap-3">
          <DateComponent
            labelText={English.E85}
            selectedDate={startDate1.stDate as unknown as Date}
            onSelectDate={(date) => {
              setStartDate1((prev) => ({...prev, stDate: date.toString() ?? ''}))
            }}
          />
          <DateComponent
            labelText={English.E86}
            minDate={startDate1?.stDate as unknown as Date}
            selectedDate={startDate1.endDate as unknown as Date}
            onSelectDate={(date) => {
              setStartDate1((prev) => ({...prev, endDate: date.toString() ?? ''}))
            }}
          />
        </div>
      ) : null}
      {isDate2Type ? (
        <div className="flex flex-row gap-3">
          <DateComponent
            labelText={English.E87}
            selectedDate={startDate2.stDate as unknown as Date}
            onSelectDate={(date) => {
              setStartDate2((prev) => ({...prev, stDate: date.toString() ?? ''}))
            }}
          />
          <DateComponent
            labelText={English.E88}
            minDate={startDate2?.stDate as unknown as Date}
            selectedDate={startDate2.endDate as unknown as Date}
            onSelectDate={(date) => {
              setStartDate2((prev) => ({...prev, endDate: date.toString() ?? ''}))
            }}
          />
        </div>
      ) : null}

      {isEmail || isUserCode ? (
        <div className="flex flex-row gap-3 items-center">
          {isEmail ? <InputComponent labelText={labelText1} placeholder={placeHolder1} /> : null}
          {isUserCode ? <InputComponent labelText={labelText2} placeholder={placeHolder2} /> : null}
        </div>
      ) : null}
      {dropDownData1?.length !== 0 || dropDownData2?.length !== 0 ? (
        <div className="flex flex-row gap-3 items-center">
          {dropDownData1.length !== 0 ? (
            <Dropdown
              className="max-w-52! flex-1"
              dropDownData={dropDownData1}
              onSelectValue={setDropDown1}
              selectedValue={dropDown1}
            />
          ) : null}
          {dropDownData2?.length !== 0 && (
            <Dropdown
              className="max-w-52! flex-1"
              dropDownData={dropDownData2}
              onSelectValue={setDropDown2}
              selectedValue={dropDown2}
            />
          )}
        </div>
      ) : null}
      <div className="flex flex-row items-center gap-3 w-40">
        <CommonButton
          className=""
          singleLineContent="Submit"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onPressSearch(
              startDate1.stDate,
              startDate1.endDate,
              startDate2.stDate,
              startDate2.endDate,
              dropDown1,
              dropDown2,
              emailText,
              userCode
            )
          }}
        />
        <CommonButton
          className="bg-primary-blue/80"
          singleLineContent="Clear"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onPressSearch('', '', '', '', {title: ''}, {title: ''}, '', '')
            setDropDown1({title: ''})
            setDropDown2({title: ''})
            setStartDate1({endDate: '', stDate: ''})
            setStartDate2({endDate: '', stDate: ''})
            setEmailText('')
            setUserCode('')
          }}
        />
      </div>
    </Layout3>
  )
}

export default memo(CustomFilter)
