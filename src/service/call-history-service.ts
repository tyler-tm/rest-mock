import {StringNumberMap} from "../model/StringNumberMap";

export class CallHistoryService {
    readonly callHistory: StringNumberMap;

    constructor() {
        this.callHistory = {};
    }


    public increment(method: string, path: string): number {
        const callKey: string = method + path;
        const callNumber: number = this.callHistory[callKey] || 0;
        this.callHistory[callKey] = callNumber + 1;

        return callNumber;
    }
}
