import ajax from "./ajax"

export const reqLoading = data => ajax("/login", data, "POST")

