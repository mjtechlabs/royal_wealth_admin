import {TextAreaComponentProps} from '@/types/ComponentTypes'

const TextAreaComponent = (props: TextAreaComponentProps) => {
  const {labelName = '', className = '', layoutClassName = '', ...rest} = props
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex relative ">
        <textarea
          className={`border rounded-md  border-solid border-palette-text-secondary/25  w-full px-4 resize-none text-primary-black  peer py-2 outline-none   ${layoutClassName} `}
          id={labelName}
          {...rest}
        />
        <label
          htmlFor={labelName}
          className="absolute peer-focus:-translate-y-5 px-2 transition-all duration-300 ease-in left-2.5
           bg-primary-white top-2 peer-focus:bg-primary-white peer-focus:top-2 "
        >
          {labelName}
        </label>
      </div>
    </div>
  )
}

export default TextAreaComponent
