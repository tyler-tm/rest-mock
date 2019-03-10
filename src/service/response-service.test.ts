import responseService from '../service/response-service';
import {Definition} from '../model/Definition';
import {NOT_FOUND_RESPONSE} from "../constants";

describe('responseService', () => {
    describe('buildResponse', () => {

        it('should return a valid response matching the definition passed in', () => {
            const definition: Definition = {
                path: "/content",
                method: "GET",
                status: 200,
                headers: {
                    "first-header-name": "first-header-body",
                    "second-header-name": "second-header-body",
                },
                responseBody: {
                    message: "Defined response for GET:/content",
                }
            };

            const request = {
                path: '/content',
                method: 'GET'
            };

            // @ts-ignore
            const result = responseService.buildResponse(request, definition);

            expect(result.status).toEqual(definition.status);
            expect(result.headers).toEqual(definition.headers);
            expect(result.json).toEqual(definition.responseBody);
        });

        it('should return NOT_FOUND_RESPONSE if definition is undefined', () => {
            const request = {
                path: '/not-there',
                method: 'GET'
            };

            // @ts-ignore
            const result = responseService.buildResponse(request, undefined);

            expect(result).toEqual(NOT_FOUND_RESPONSE);
        });
    });
});
