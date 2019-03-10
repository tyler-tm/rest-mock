import express = require('express');
import {NOT_FOUND_RESPONSE} from '../constants';
import {Definition} from "../model/Definition";
import {Response} from '../model/Response';

function buildResponse(req: express.Request, definition: Definition): Response {

    if (definition === undefined) {
        return NOT_FOUND_RESPONSE;
    }

    return {
        status: definition.status,
        headers: definition.headers,
        json: definition.responseBody,
    };
}

export default {
    buildResponse,
};
