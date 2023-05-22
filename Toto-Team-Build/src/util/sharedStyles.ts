const primaryButton = 'inline-flex h-fit items-center gap-x-1.5 rounded-md bg-cyan-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
const secondaryButton = ''
const disabledButton = 'inline-flex h-fit items-center gap-x-1.5 rounded-md bg-cyan-300 py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'

export const buttonStyles = {
    primary: primaryButton,
    secondary : secondaryButton,
    disabled: disabledButton
}


const primaryInput = 'w-80 font-sans font-normal text-base p-3 border rounded bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan-600'

const secondaryInput = ''

const errorInput = 'w-80 font-sans font-normal text-base p-3 border rounded bg-red-100 shadow-sm border-red-400 focus-visible:outline-red-400 '

const disabledInput = ''

export const inputStyles = {
    primary: primaryInput,
    secondary: secondaryInput,
    disabled: disabledInput,
    error: errorInput
}


const largeText = "text-lg font-medium"

const mediumText ="text-base font-medium"

const smallText ="text-sm font-medium"

export const fontStyles = {
    small : smallText,
    medium : mediumText,
    large : largeText
}



export const screenContainerClass = 'h-full w-full flex flex-col items-center justify-center'