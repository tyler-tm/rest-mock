import definitionUtils from './definition-utils';
import {Definition} from "../model/Definition";

describe('definitionUtils', () => {
    describe('clean', () => {
        it('should not modify a valid definition', () => {
            const validDefinition: Definition = {
                path: '/form',
                method: 'POST',
                status: 400,
                headers: {
                    headerName: 'headerValue'
                },
                responseBody: {
                    name: 'value'
                },
            };

            const result: Definition = definitionUtils.clean(validDefinition);

            expect(result).toEqual(validDefinition);
        });

        it('should set the status to 200 for a definition without one', () => {
            const definitionWithoutStatus: Definition = {
                path: '/form',
                method: 'POST',
                headers: {
                    headerName: 'headerValue'
                },
                responseBody: {
                    name: 'value'
                },
            };

            const result: Definition = definitionUtils.clean(definitionWithoutStatus);

            const expected: Definition = {
                ...definitionWithoutStatus,
                status: 200
            };
            expect(result).toEqual(expected);
        });

        it('should set the headers to empty object for a definition without one', () => {
            const definitionWithoutHeaders: Definition = {
                path: '/user',
                method: 'PUT',
                status: 201,
                responseBody: {
                    name: 'value'
                },
            };

            const result: Definition = definitionUtils.clean(definitionWithoutHeaders);

            const expected: Definition = {
                ...definitionWithoutHeaders,
                headers: {},
            };
            expect(result).toEqual(expected);
        });

        it('should set the body to empty object for a definition without one', () => {
            const definitionWithoutBody: Definition = {
                path: '/user',
                method: 'PUT',
                status: 201,
                headers: {
                    headerName: 'headerValue'
                },
            };

            const result: Definition = definitionUtils.clean(definitionWithoutBody);

            const expected: Definition = {
                ...definitionWithoutBody,
                responseBody: {},
            };
            expect(result).toEqual(expected);
        });
    });
});
