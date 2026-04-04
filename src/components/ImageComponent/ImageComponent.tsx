import {forwardRef, useEffect, useState} from 'react'

import {ImageComponentProps} from '@/types/ComponentTypes'

const ImageComponent = forwardRef<HTMLDivElement, ImageComponentProps>((props, ref) => {
  const {className = '', imageUrl = '', onPressImage} = props

  const [imageContent, setImageContent] = useState('')
  useEffect(() => {
    const newImage = new Image()
    newImage.src = imageUrl
    newImage.onload = () => {
      setImageContent(imageUrl)
    }
  }, [imageUrl])
  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onClick={() => {
        if (onPressImage) {
          onPressImage()
        }
      }}
    >
      {imageContent === '' ? null : (
        <img
          alt="error-icon"
          className="w-full h-full object-contain transition-all duration-500 ease-in "
          src={imageContent}
        />
      )}
    </div>
  )
})

export default ImageComponent
