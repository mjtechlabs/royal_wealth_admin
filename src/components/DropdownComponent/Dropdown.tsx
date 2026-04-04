import {memo, useEffect, useRef, useState} from 'react'

import useClickOutside from '@/hooks/useClickOutside'
import {CommonDropDownProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const Dropdown = (props: CommonDropDownProps) => {
  const {
    dropDownData,
    onSelectValue,
    selectedValue,
    className = '',
    elementId = '',
    isCustomType = false,
    wrapperClassName = ''
  } = props
  const mainDivRef = useRef<HTMLDivElement | null>(null)
  const dropDownStatsRef = useRef<HTMLDivElement | null>(null)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  useEffect(() => {
    if (
      dropDownData?.length === 0 ||
      !mainDivRef.current ||
      !dropDownStatsRef.current ||
      !isDropDownOpen
    )
      return

    const {top, left, height, width} = mainDivRef.current.getBoundingClientRect()
    dropDownStatsRef.current.style.top = `${isCustomType ? top - (140 + height) : top + height}px`
    dropDownStatsRef.current.style.left = `${left}px`
    dropDownStatsRef.current.style.width = `${width}px`
  }, [dropDownData?.length, isCustomType, isDropDownOpen])

  useEffect(() => {
    if (!isDropDownOpen) return
    const element = document.getElementById(elementId) ?? window
    const handleScroll = () => {
      setIsDropDownOpen(false)
    }
    element.addEventListener('scroll', handleScroll)

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [elementId, isDropDownOpen])

  useClickOutside({
    refs: [mainDivRef],
    onClickOutside() {
      setIsDropDownOpen(false)
    }
  })

  return (
    <div
      ref={mainDivRef}
      className={`pl-4 h-10 flex items-center border border-solid border-primary-blue rounded-md cursor-pointer ${className}`}
      onClick={() => {
        setIsDropDownOpen((data) => !data)
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-primary-black text-sm font-normal  transition-all duration-500 ease-in-out">
          {selectedValue?.title}
        </span>

        {selectedValue?.img && selectedValue?.img !== '' ? (
          <ImageComponent className="w-5 h-5" imageUrl={selectedValue.img} />
        ) : null}
      </div>

      {isDropDownOpen ? (
        <div
          ref={dropDownStatsRef}
          className={`fixed bottom-0 bg-primary-blue/30 backdrop-blur-2xl  border border-solid border-primary-cyan  shadow-lg z-30 rounded-lg overflow-y-auto max-h-56 ${wrapperClassName}`}
        >
          {dropDownData?.map((data) => {
            const {title, img = ''} = data
            return (
              <div
                key={title}
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectValue(data)
                  setIsDropDownOpen((prev) => !prev)
                }}
              >
                <span className="text-black text-sm font-normal p-3 w-full hover:bg-primary-blue hover:text-primary-white transition-all duration-500 ease-in-out">
                  {title}
                </span>

                {img !== '' && <ImageComponent className="w-5 h-5" imageUrl={img} />}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default memo(Dropdown)
