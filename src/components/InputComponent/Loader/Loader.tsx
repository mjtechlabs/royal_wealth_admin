import {forwardRef, useImperativeHandle} from 'react'

import {GeneralProps} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

const Loader = forwardRef<AppLoaderRef, Pick<GeneralProps, 'className'>>((props, ref) => {
  const {className = ''} = props

  useImperativeHandle(ref, () => ({
    showLoader(state) {
      const element = document.querySelector('.loader-container')
      if (state) {
        element?.classList.add('opacity-100', 'pointer-events-auto')
        element?.classList.remove('opacity-0', 'pointer-events-none')
      } else {
        element?.classList.add('opacity-0', 'pointer-events-none')
        element?.classList.remove('opacity-100', 'pointer-events-auto')
      }
    }
  }))
  return (
    <div
      className={`
          fixed inset-0
          loader-container
          backdrop-blur-md
          z-99999
          opacity-0
          pointer-events-none
          transition-opacity duration-200
          ${className}
        `}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="status">
        <div className="loader flex items-center justify-center">
          {/* <ImageComponent className="w-30 h-30" imageUrl={Images.logoImg} /> */}
        </div>
      </div>
    </div>
  )
})

export default Loader
