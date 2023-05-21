const primaryButton = 'inline-flex h-fit items-center gap-x-1.5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
const secondaryButton = ''
const disabledButton = 'inline-flex h-fit items-center gap-x-1.5 rounded-md bg-indigo-200 py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

export const buttonStyles = {
    primary: primaryButton,
    secondary : secondaryButton,
    disabled: disabledButton
}


const primaryInput = 'w-80 font-sans font-normal text-base p-3 border rounded bg-gray-100 shadow-sm'

const secondaryInput = ''

const errorInput = 'w-80 font-sans font-normal text-base p-3 border rounded bg-red-100 shadow-sm border-red-400 focus-visible:outline-red-400 '

const disabledInput = ''

export const inputStyles = {
    primary: primaryInput,
    secondary: secondaryInput,
    disabled: disabledInput,
    error: errorInput
}