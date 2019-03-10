import {Response} from './Response';

export interface Definition {
    path: string,
    method: string,
    status?: number,
    headers?: {
        [name: string]: string
    },
    responseBody?: object,
    sequentialResponses?: Array<Response>,
}
