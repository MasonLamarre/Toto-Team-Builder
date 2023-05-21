export function joinTailwindClasses(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}