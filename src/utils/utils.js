export const operationSign = (operationType) => {
    switch (operationType) {
        case 'ADDITION':
            return '+';
        case "SUBTRACTION":
            return '-'
        default:
            return '?'
    }
}
