export function formateDate(time) {
    if (!time) return ""
    let date = new Date(time)
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
        "  " + formateDigit(date.getHours()) + ":" + formateDigit(date.getMinutes()) + ":" + formateDigit(date.getSeconds())
}

function formateDigit(number){
    return number<10 ? "0"+number:number
}