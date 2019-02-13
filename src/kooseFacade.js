import rp from 'request-promise-native';
import config from './config';
import log from './logger';

log.debug('koose url: ' + config.kooseUrl);

const kooOptions = {
    uri: `${config.kooseUrl}/koo`,
    json: true
};

const koo = () => rp(kooOptions);

export default {
    koo
}

