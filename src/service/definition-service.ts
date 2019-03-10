import {Definition} from '../model/Definition';
import definitionUtils from '../utils/definition-utils';

class DefinitionService {

    readonly definitionSet: Array<Definition> = [];

    public constructor(definitions) {
        this.definitionSet = definitions;
    }

    public findDefinition(path: string, method: string): Definition {
        const match = this.definitionSet.find(item => item.path === path && item.method === method);
        return definitionUtils.clean(match);
    }
}

export default {
    DefinitionService,
}
