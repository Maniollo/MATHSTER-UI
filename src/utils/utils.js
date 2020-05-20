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

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))