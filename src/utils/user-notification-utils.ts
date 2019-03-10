import {PORT} from '../constants';

function notifyStartupPort() {
    console.log(`response server running on port ${PORT}`);
}

export default {
    notifyStartupPort,
};
