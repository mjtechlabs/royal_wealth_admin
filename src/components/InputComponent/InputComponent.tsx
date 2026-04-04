import type {InputHTMLAttributes} from 'react'
import {forwardRef} from 'react'

import ImageComponent from '../ImageComponent/ImageComponent'

interface InputComponentprops extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  labelText?: string
  error?: string
  icon?: string
  // isImportant?: boolean
  onPressImage?: () => void
  layoutClassName?: string
  wrapperClassName?: string
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentprops>((props, ref) => {
  const {
    className = '',
    labelText = '',
    error = '',
    onPressImage,
    layoutClassName = '',
    wrapperClassName = '',
    icon = '',
    ...rest
  } = props

  return (
    <div
      className={`flex ${labelText !== '' ? 'flex-col gap-1' : ''} justify-end h-full w-full ${wrapperClassName}`}
    >
      {labelText !== '' ? <div className="flex items-start gap-1" /> : null}

      <div
        className={`flex  items-center gap-5 px-2.5 h-10 border border-solid border-palette-text-secondary/25 rounded-md relative ${layoutClassName}`}
      >
        <input
          id="floating_outlined"
          className={`block h-full  w-full   z-30 text-sm text-heading bg-transparent rounded-base  appearance-none focus:outline-none focus:ring-0 focus:border-brand peer regular__utility__small
             ${className}`}
          {...rest}
          ref={ref}
          placeholder=" "
        />

        <label
          className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 origin-left bg-primary-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-focus:z-40"
          htmlFor={labelText ?? 'floating_outlined'}
        >
          {labelText}
        </label>
        {icon !== '' && (
          <ImageComponent
            className="size-8! cursor-pointer [&>img]:gray__filter [&>img]:w-4!"
            imageUrl={icon}
            onPressImage={onPressImage}
          />
        )}
        {error !== '' && (
          <span className="absolute -bottom-6 left-0 text-primary-red text-xs/6 font-medium">
            {error}
          </span>
        )}
      </div>
    </div>
  )
})

export default InputComponent
