const immutablePush = (arr, value) => {
    return [...arr, value]
}

const immutableShift = (arr) => {
    return arr.slice(1)
}

export {
    immutablePush,
    immutableShift
}
