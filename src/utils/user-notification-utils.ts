import {PORT} from '../constants';
import {Endpoint} from "../model/Endpoint";

function notifyStartupPort() {
    console.log(`REST mock running on port ${PORT}`);
}

function notifyEndpoints(endpoints: Array<Endpoint>) {
    let output: string = '';
    for(let endpoint of endpoints) {
        output += `${padStringRight(endpoint.method, 8)
        + endpoint.path + (endpoint.sequential ? '\t[Seq]' : '')}\n`
    }
    console.log(output ? `Endpoints (dist/definitions.json):\n${output}`
        : 'No endpoints registered');
}

function padStringRight(input: string, length: number): string {
    return (input + '     ').substring(0, length);
}

export default {
    notifyStartupPort,
    notifyEndpoints,
};
