import express = require('express');

import {DEFAULT_STATUS, NOT_FOUND_RESPONSE} from '../constants';
import {Definition} from "../model/Definition";
import {Response} from '../model/Response';

function toCleanResponse(input: any): Response {
    input = input || {};

    return {
        status: input.status || DEFAULT_STATUS,
        headers: input.headers || {},
        responseBody: input.responseBody || {},
    };
}

function getSequentialResponseDefinition(definition: Definition, callNumber: number): Response {
    const numberOfResponses: number = definition.sequentialResponses.length;
    const responseNumber: number = (callNumber < numberOfResponses - 1)
        ? callNumber : numberOfResponses - 1;
    const partialResponse: any = definition.sequentialResponses[responseNumber];

    return toCleanResponse(partialResponse);
}

function buildResponse(req: express.Request,
                       definition: Definition,
                       callNumber: number): Response {

    if (definition === undefined) {
        return NOT_FOUND_RESPONSE;
    }

    if (definition.sequentialResponses) {
        return getSequentialResponseDefinition(definition, callNumber);
    }

    return toCleanResponse(definition);
}

export default {
    toCleanResponse,
    buildResponse,
};
