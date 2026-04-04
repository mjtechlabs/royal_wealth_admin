import {GeneralProps} from '@/types/CommonTypes'

const Layout3 = (
  props: Required<Pick<GeneralProps, 'singleLineContent'>> &
    Pick<GeneralProps, 'className' | 'children'>
) => {
  const {children, className = ''} = props
  return (
    <div className={`h-fit ${className}`}>
      <div className="bg-primary-white shadow-2xl px-5 space-y-3 py-3 rounded-2xl h-fit ">
        {children}
      </div>
    </div>
  )
}

export default Layout3
