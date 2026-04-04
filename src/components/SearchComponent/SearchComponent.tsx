import {memo, useRef} from 'react'

import {Images} from '@/services'
import {SearchComponentProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'
import InputComponent from '../InputComponent/InputComponent'

const SearchComponent = (props: SearchComponentProps) => {
  const {onSearchChange, searchValue, className = '', onPressImage} = props
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className={`rounded-md border border-solid border-primary-gray  bg-transparent text-dark-color1 h-10 px-2.5 flex items-center w-full flex-1 ${className}`}
    >
      <div className="w-full flex items-center gap-4 h-full *:h-full">
        <ImageComponent className="w-6 h-6 [&>img]:red__filter" imageUrl={Images.searchIcon} />
        <InputComponent
          ref={inputRef}
          className="h-full!"
          layoutClassName="border-none! p-0! h-full! w-full flex items-center"
          value={searchValue}
          onChange={(e) => {
            onSearchChange(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchChange(inputRef.current?.value ?? '')
            }
          }}
        />
        {searchValue !== '' && (
          <ImageComponent
            className="w-8 h-8 cursor-pointer [&>img]:red__filter"
            imageUrl={Images.crossIcon}
            onPressImage={() => {
              if (onPressImage) {
                onPressImage()
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default memo(SearchComponent)
