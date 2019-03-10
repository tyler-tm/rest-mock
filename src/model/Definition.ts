import {Response} from './Response';
import {StringMap} from "./StringMap";

export interface Definition {
    path: string,
    method: string,
    status?: number,
    headers?: StringMap<string | number>,
    responseBody?: object,
    sequentialResponses?: Array<Response>,
}
