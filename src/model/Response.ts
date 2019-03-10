export interface Response {
    status: number,
    headers: {
        [name: string]: any
    },
    responseBody: object,
}
