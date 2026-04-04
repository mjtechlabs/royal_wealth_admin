interface DateInputProps {
  id: string
  labelText: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput = ({id, labelText, value, onChange}: DateInputProps) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-600" htmlFor={id}>
      {labelText}
    </label>

    <input
      id={id}
      onChange={onChange}
      type="date"
      value={value}
      className=" 
      h-10 px-2 rounded-lg
        border border-gray-300
        text-sm text-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)

export default DateInput
