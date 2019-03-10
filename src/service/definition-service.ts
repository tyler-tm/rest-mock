import {Definition} from '../model/Definition';
import {Endpoint} from "../model/Endpoint";

export class DefinitionService {

    readonly definitions: Array<Definition>;

    public constructor(definitions: Array<Definition>) {
        this.definitions = definitions;
    }

    public findDefinition(method: string, path: string): Definition {
        const match = this.definitions.find(item => item.path === path && item.method === method);
        return match;
    }

    public getEndpoints(): Array<Endpoint> {
        let result: Array<Endpoint> = [];
        for(let definition of this.definitions) {
            const endpoint: Endpoint = {
                method: definition.method,
                path: definition.path,
                sequential: Boolean(definition.sequentialResponses),
            };
            result.push(endpoint);
        }
        return result;
    }
}
