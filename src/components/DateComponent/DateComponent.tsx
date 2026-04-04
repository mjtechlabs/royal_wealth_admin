import 'react-datepicker/dist/react-datepicker.css'

import {memo} from 'react'
import DatePicker from 'react-datepicker'

import {DateComponentProps} from '@/types/ComponentTypes'

const DateComponent = (props: DateComponentProps) => {
  const {onSelectDate, selectedDate, className = '', minDate, labelText = ''} = props
  return (
    <div className="space-y-1 w-full relative">
      {labelText !== '' ? (
        <span className="text-sm font-medium text-gray-600">{labelText}</span>
      ) : null}
      <div
        className={`${className}  h-10 px-2 rounded-lg
        border border-gray-300
        text-sm text-gray-700
        focus:outline-none focus:ring-2! focus:ring-blue-500! flex-1 `}
      >
        <DatePicker
          closeOnScroll
          className="placeholder:text-dark-color1/50 text-primary-black w-full"
          minDate={minDate ?? undefined}
          placeholderText="MM-DD-YYYY"
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (!date) return
            onSelectDate(date)
          }}
        />
      </div>
    </div>
  )
}

export default memo(DateComponent)
