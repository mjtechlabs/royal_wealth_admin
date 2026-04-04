import type {ReactNode} from 'react'
import {useRef} from 'react'

import useClickOutside from '../../hooks/useClickOutside'
import Images from '../../services/Images'
import ImageComponent from '../ImageComponent/ImageComponent'

export interface ModalComponentprops {
  children: ReactNode
  className?: string
  onPressClose?: () => void
  isClosableType?: boolean
  showCross?: boolean
}

const ModalComponent = (props: ModalComponentprops) => {
  const {children, className, onPressClose, isClosableType = true, showCross = true} = props

  const containerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    refs: [containerRef],
    onClickOutside: () => {
      if (isClosableType) {
        onPressClose?.()
      }
    }
  })

  return (
    <div className="fixed inset-0 bg-dark-color2/50 backdrop-blur-lg z-999">
      <div
        ref={containerRef}
        className={`absolute top-1/2 bg-primary-white/10 -translate-y-1/2  left-1/2 -translate-x-1/2 bg-primary-color p-5 rounded-3xl max-h-[90vh] max-w-[90vw]  ${className}`}
      >
        {showCross ? (
          <ImageComponent
            className="size-10 flex justify-end w-full cursor-pointer [&>img]:w-fit!"
            imageUrl={Images.crossIcon}
            onPressImage={onPressClose}
          />
        ) : null}
        {children}
      </div>
    </div>
  )
}

export default ModalComponent
