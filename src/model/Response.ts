import {StringMap} from "./StringMap";

export interface Response {
    status: number,
    headers: StringMap<string | number>,
    responseBody: object,
}
