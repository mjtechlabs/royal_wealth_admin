import type {ReactNode} from 'react'
import React, {createContext, useContext, useMemo, useState} from 'react'

import type {ModalComponentprops} from '../ModalComponent'
import ModalComponent from '../ModalComponent'

const ModalContext = createContext<{
  childContent: ReactNode | null
  setChildContent: React.Dispatch<React.SetStateAction<ReactNode | null>>
  modalProps: Omit<ModalComponentprops, 'children'> | null
  setModalProps: React.Dispatch<React.SetStateAction<Omit<ModalComponentprops, 'children'> | null>>
}>({childContent: null, setChildContent: () => {}, modalProps: null, setModalProps: () => {}})

const ModalProvider = ({children}: {children: ReactNode}) => {
  const [childContent, setChildContent] = useState<ReactNode | null>(null)
  const [modalProps, setModalProps] = useState<Omit<ModalComponentprops, 'children'> | null>(null)
  const defaultValue = useMemo(
    () => ({
      childContent,
      setChildContent,
      modalProps,
      setModalProps
    }),
    [childContent, modalProps]
  )

  return (
    <ModalContext.Provider value={defaultValue}>
      {children}
      {childContent !== null && <ModalComponent {...modalProps}>{childContent}</ModalComponent>}
    </ModalContext.Provider>
  )
}

export default ModalProvider
export const useModalContext = () => useContext(ModalContext)
