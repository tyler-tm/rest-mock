import {Definition} from '../model/Definition';
import {DefinitionService} from './definition-service'

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
                status: 201,
                headers: {
                    headerName: "headerBody",
                },
                responseBody: {
                    message: "Defined response for PUT:/user",
                },
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
                .findDefinition('PUT', '/user');

            const expected: Definition = {
                path: "/user",
                method: "PUT",
                status: 201,
                headers: {
                    headerName: "headerBody",
                },
                responseBody: {
                    message: "Defined response for PUT:/user",
                },
            };

            expect(result).toEqual(expected);
        });
    });
});
