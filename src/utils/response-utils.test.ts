import {NOT_FOUND_RESPONSE} from "../constants";
import {Response} from "../model/Response";
import {Definition} from "../model/Definition";
import ResponseUtils from './response-utils';

describe('ResponseUtils', () => {
    describe('clean', () => {
        it('should not modify a valid response', () => {
            const validDefinition: Response = {
                status: 400,
                headers: {
                    headerName: 'headerValue'
                },
                responseBody: {
                    name: 'value'
                }
            };

            const result: Response = ResponseUtils.toCleanResponse(validDefinition);

            expect(result).toEqual(validDefinition);
        });

        it('should set the status to 200 for a definition without one', () => {
            const responseWithoutStatus: any = {
                headers: {
                    headerName: 'headerValue'
                },
                responseBody: {
                    name: 'value'
                },
            };

            const result: Response = ResponseUtils.toCleanResponse(responseWithoutStatus);

            const expected: Response = {
                ...responseWithoutStatus,
                status: 200
            };
            expect(result).toEqual(expected);
        });

        it('should set the headers to empty object for a definition without one', () => {
            const responseWithoutHeaders: any = {
                status: 201,
                responseBody: {
                    name: 'value'
                },
            };

            const result: Response = ResponseUtils.toCleanResponse(responseWithoutHeaders);

            const expected: Response = {
                ...responseWithoutHeaders,
                headers: {},
            };
            expect(result).toEqual(expected);
        });

        it('should set the body to empty object for a definition without one', () => {
            const responseWithoutBody: any = {
                status: 201,
                headers: {
                    headerName: 'headerValue'
                },
            };

            const result: Response = ResponseUtils.toCleanResponse(responseWithoutBody);

            const expected: Response = {
                ...responseWithoutBody,
                responseBody: {},
            };
            expect(result).toEqual(expected);
        });
    });

    describe('buildResponse', () => {

        const getContentRequest = {
            path: '/content',
            method: 'GET'
        };

        describe('definition without sequential responses passed in', () => {
            it('should return a response matching the definition passed in', () => {
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

                // @ts-ignore
                const result = ResponseUtils.buildResponse(getContentRequest, definition);

                expect(result.status).toEqual(definition.status);
                expect(result.headers).toEqual(definition.headers);
                expect(result.responseBody).toEqual(definition.responseBody);
            });

            it('should return NOT_FOUND_RESPONSE if definition is undefined', () => {
                const getNotThereRequest = {
                    path: '/not-there',
                    method: 'GET'
                };

                // @ts-ignore
                const result = ResponseUtils.buildResponse(getNotThereRequest, undefined);

                expect(result).toEqual(NOT_FOUND_RESPONSE);
            });
        });

        describe('definition with sequential responses passed in', () => {
            const sequentialDefinition: Definition = {
                path: "/content",
                method: "GET",
                sequentialResponses: [
                    {
                        status: 200,
                        headers: {
                            'sequence': 0,
                            'header-name': 'header-body',
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, first call",
                        }
                    },
                    {
                        status: 200,
                        headers: {
                            "sequence": 1,
                            "header-name": "header-body",
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, second call",
                        }
                    },
                    {
                        status: 200,
                        headers: {
                            "sequence": 2,
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, third call",
                        }
                    },
                ],
            };

            it('returns the first response from sequence when call number is 0', () => {
                // @ts-ignore
                const result: Response = ResponseUtils.buildResponse(getContentRequest,
                    sequentialDefinition, 0);

                const expected = sequentialDefinition.sequentialResponses[0];

                expect(result).toEqual(expected);
            });

            it('returns last response when call number greater than number of responses', () => {
                // @ts-ignore
                const result: Response = ResponseUtils.buildResponse(getContentRequest,
                    sequentialDefinition, 9001);
                const numberOfResponses = sequentialDefinition.sequentialResponses.length;
                const expected = sequentialDefinition.sequentialResponses[numberOfResponses - 1];

                expect(result).toEqual(expected);
            });
        });

        describe('definition with sequential responses and responseBody object passed in', () => {
            const sequentialDefinition: Definition = {
                path: "/content",
                method: "GET",
                responseBody: {
                    headers: {
                        "header-name": "header-body",
                    },
                    status: 300,
                    message: "Defined response for GET:/content",
                },
                sequentialResponses: [
                    {
                        status: 200,
                        headers: {
                            'sequence': '0',
                            'header-name': 'header-body',
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, first call",
                        }
                    },
                    {
                        status: 200,
                        headers: {
                            "sequence": "1",
                            "header-name": "header-body",
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, second call",
                        }
                    },
                    {
                        status: 200,
                        headers: {
                            "sequence": "2",
                        },
                        responseBody: {
                            message: "Defined response for GET:/content, third call",
                        }
                    },
                ],
            };

            it('returns the sequential response matching the call number', () => {
                const callNumber = 1;
                // @ts-ignore
                const result: Response = ResponseUtils.buildResponse(getContentRequest,
                    sequentialDefinition, callNumber);

                const expected = sequentialDefinition.sequentialResponses[callNumber];

                expect(result).toEqual(expected);
            });
        });
    });
});
