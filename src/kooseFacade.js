import http from 'http'
import https from 'https'
import AWSXRay from 'aws-xray-sdk';

AWSXRay.captureHTTPsGlobal(http);
AWSXRay.captureHTTPsGlobal(https);
AWSXRay.capturePromise();

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

