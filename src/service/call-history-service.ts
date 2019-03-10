import {StringMap} from "../model/StringMap";

export class CallHistoryService {
    readonly callHistory: StringMap<number>;

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
