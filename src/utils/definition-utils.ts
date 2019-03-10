import {Definition} from '../model/Definition';
import {DEFAULT_STATUS} from '../constants';

const defineObject = object => (object === undefined ? {} : object);

function clean(input: Definition): Definition {
    if (!input) {
        return undefined;
    }

    return {
        ...input,
        status: (input.status === undefined)
            ? DEFAULT_STATUS : input.status,
        headers: defineObject(input.headers),
        responseBody: defineObject(input.responseBody),
    };
}

export default {
    clean,
};
