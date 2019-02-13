import rp from 'request-promise-native';
import config from './config';

const kooOptions = {
    uri: `${config.kooseUrl}/koo`,
    json: true
};

const koo = () => rp(kooOptions);

export default {
    koo
}

