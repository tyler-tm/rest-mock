import express = require('express');

import DEFINITION_SET from '../definitions.json';
import {PORT} from './constants';
import {Definition} from './model/Definition';
import {Response} from './model/Response';
import responseService from './service/response-service';
import definitionService from './service/definition-service'
import cliService from './service/cli-service';

class App {

    public app: express.Application;
    readonly definitionService;

    constructor() {
        this.definitionService = new definitionService.DefinitionService(DEFINITION_SET);
        this.app = express();
        this.config();
    }

    private static handleRequest(req: express.Request,
                                 res: express.Response,
                                 definition: Definition): void {
        const response: Response = responseService.buildResponse(req, definition);
        res.set(response.headers);
        res.status(response.status).send(response.json);
    }

    private config(): void {
        this.app.all('/**', (req, res) => {
            const definition = this.definitionService.findDefinition(req.path, req.method);
            App.handleRequest(req, res, definition);
        });
        this.app.listen(PORT, cliService.notifyStartupPort);
    }

}

export default new App().app;
