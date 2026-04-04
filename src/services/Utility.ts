import Images from './Images'

const isValidEmail = (content: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(content)
}
const isValidNumber = (content: string) => {
  const newContent = content.replace(/\D/g, '')
  return newContent
}
const numberConversion = (content: number) => {
  const hasDecimal = content % 1 !== 0

  if (!hasDecimal) {
    return `${new Intl.NumberFormat('en-US').format(content)}.00`
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(content)
}

const renderImage = (content: string) =>
  content === '1'
    ? Images.activeUser
    : content === '2'
      ? Images.blockedUser
      : content === '0'
        ? Images.inActiveUser
        : Images.OpenUser

const Utility = {isValidEmail, isValidNumber, numberConversion, renderImage}

export default Utility
