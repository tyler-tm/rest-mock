import express = require('express');

import DEFINITION_SET from '../definitions.json';
import {PORT} from './constants';
import {Definition} from './model/Definition';
import {Response} from './model/Response';
import {DefinitionService} from './service/definition-service';
import {CallHistoryService} from './service/call-history-service';
import UserNotificationUtils from './utils/user-notification-utils';
import ResponseUtils from './utils/response-utils';

class App {

    public app: express.Application;
    readonly callHistoryService: CallHistoryService;
    readonly definitionService: DefinitionService;

    constructor() {
        this.definitionService = new DefinitionService(DEFINITION_SET.definitions);
        this.callHistoryService = new CallHistoryService();
        this.app = express();
        this.config();
    }

    private static handleRequest(req: express.Request, res: express.Response,
                                 definition: Definition, callNumber: number): void {
        const response: Response = ResponseUtils.buildResponse(req, definition, callNumber);
        res.set(response.headers);
        res.status(response.status).send(response.responseBody);
    }

    private config(): void {
        this.app.all('/**', (req, res) => {
            const callNumber: number = this.callHistoryService.increment(req.method, req.path);
            const definition: Definition = this.definitionService.findDefinition(req.method, req.path);
            App.handleRequest(req, res, definition, callNumber);
        });
        UserNotificationUtils.notifyEndpoints(this.definitionService.getEndpoints());
        this.app.listen(PORT, UserNotificationUtils.notifyStartupPort);
    }

}

export default new App().app;
