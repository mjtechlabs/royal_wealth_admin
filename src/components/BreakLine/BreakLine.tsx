import {GeneralProps} from '@/types/CommonTypes'

const BreakLine = (props: Pick<GeneralProps, 'className'>) => {
  const {className = ''} = props
  return <div className={`w-full h-[0.5px] bg-primary-gray ${className}`} />
}

export default BreakLine
