export const changeOnlyNum = (text) => {
    let regex = /[^0-9]/g
    return text.replace(regex, '')
}