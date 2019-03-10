import {Definition} from '../model/Definition';

export class DefinitionService {

    readonly definitions: Array<Definition>;

    public constructor(definitions: Array<Definition>) {
        this.definitions = definitions;
    }

    public findDefinition(method: string, path: string): Definition {
        const match = this.definitions.find(item => item.path === path && item.method === method);
        return match;
    }
}
