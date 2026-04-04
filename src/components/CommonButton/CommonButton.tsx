import {CommonButtonProps} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const CommonButton = (props: CommonButtonProps) => {
  const {singleLineContent, className = '', imageUrl = '', ...rest} = props

  return (
    <button
      className={`flex items-center bg-primary-black text-primary-white w-full p-2 px-3 rounded-lg justify-center gap-3  text-center cursor-pointer! active:scale-95 transition-all ${className}`}
      type="button"
      {...rest}
    >
      {imageUrl !== '' && <ImageComponent className="w-6 h-6" imageUrl={imageUrl} />}
      {singleLineContent}
    </button>
  )
}

export default CommonButton
