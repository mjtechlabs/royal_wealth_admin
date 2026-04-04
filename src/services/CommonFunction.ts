import CryptoJS from 'crypto-js'

import {Store} from '../store/Store'
import {addToken, removeToken} from '../store/UserSlice/UserSlice'

type SliceType = 'addUserDetails' | 'logout'

const addSliceData = (type: SliceType, data: any) => {
  if (type === 'addUserDetails') {
    Store.dispatch(addToken(data))
    return
  }
  Store.dispatch(removeToken())
}

export function encryptData(text: any) {
  const key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_ENCRYPTION_KEY)
  const iv = CryptoJS.lib.WordArray.random(16)

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  const cipherText = CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  const ivBase64 = CryptoJS.enc.Base64.stringify(iv)

  return btoa(`${cipherText}::${ivBase64}`)
}

export function decryptData(encryptedText: any) {
  const key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_ENCRYPTION_KEY)

  const decoded = atob(encryptedText)
  const [cipherText, iv] = decoded.split('::')
  const newData = {ciphertext: CryptoJS.enc.Base64.parse(cipherText)}
  const decrypted = CryptoJS.AES.decrypt(newData as unknown as string, key, {
    iv: CryptoJS.enc.Base64.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return decrypted.toString(CryptoJS.enc.Utf8)
}

const CommonFunction = {addSliceData, decryptData, encryptData}

export default CommonFunction
