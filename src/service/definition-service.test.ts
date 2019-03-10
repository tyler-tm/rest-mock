import {Definition} from '../model/Definition';
import {DefinitionService} from './definition-service'
import {Endpoint} from "../model/Endpoint";

describe('DefinitionService', () => {
    const definitions: Array<Definition> = [
            {
                path: "/content",
                method: "GET",
                status: 200,
                headers: {
                    "first-header-name": "first-header-body",
                    "second-header-name": "second-header-body",
                },
                responseBody: {
                    message: "Defined response for GET:/content",
                },
            },
            {
                path: "/feedback",
                method: "POST",
                status: 400,
                headers: {
                    headerName: "headerBody",
                },
                responseBody: {
                    message: "Defined response for POST:/feedback",
                },
            },
            {
                path: "/user",
                method: "PUT",
                "sequentialResponses": [
                    {
                        "status": 201,
                        "headers": {
                            "sequence": 0,
                            "header-name": "header-body"
                        },
                        "responseBody": {
                            "message": "Created first user"
                        }
                    },
                    {
                        "status": 201,
                        "headers": {
                            "sequence": 1,
                            "header-name": "header-body"
                        },
                        "responseBody": {
                            "message": "Created second user"
                        }
                    },
                    {
                        "status": 201,
                        "headers": {
                            "sequence": 2,
                            "header-name": "header-body"
                        },
                        "responseBody": {
                            "message": "Created third user"
                        }
                    }
                ],
            },
        ];
    const subject: DefinitionService = new DefinitionService(definitions);

    describe('findDefinition', () => {
        it('should return undefined if a definition with path and method is not in list', () => {
            const result: Definition = subject
                .findDefinition('GET', '/user');

            expect(result).toBeUndefined();
        });

        it('should return definition if a definition with path and method is in list', () => {
            const result: Definition = subject
                .findDefinition('POST', '/feedback');

            const expected: Definition = {
                path: "/feedback",
                method: "POST",
                status: 400,
                headers: {
                    headerName: "headerBody",
                },
                responseBody: {
                    message: "Defined response for POST:/feedback",
                },
            };

            expect(result).toEqual(expected);
        });
    });

    describe('getEndpoints', () => {
        it('should return an array of endpoint identifier strings', () => {
            const result: Array<Endpoint> = subject.getEndpoints();

            const expected: Array<Endpoint> = [
                {
                    method: 'GET',
                    path: '/content',
                    sequential: false,
                },
                {
                    method: 'POST',
                    path: '/feedback',
                    sequential: false,
                },
                {
                    method: 'PUT',
                    path: '/user',
                    sequential: true,
                },
            ];

            expect(result).toEqual(expected);
        });
    });
});
