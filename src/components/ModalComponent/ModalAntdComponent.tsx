import {Modal} from 'antd'

import {AntdModelProps} from '@/types/ComponentTypes'

const ModalAntdComponent = (props: AntdModelProps) => {
  const {children, open = false, setOpen} = props
  return (
    <Modal
      footer={null}
      onCancel={() => setOpen(false)}
      open={open}
      style={{
        background: 'transparent'
      }}
    >
      {children}
    </Modal>
  )
}

export default ModalAntdComponent
