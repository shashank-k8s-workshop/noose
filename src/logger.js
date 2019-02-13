import Roarr from 'roarr';
import pjson from '../package.json';
import config from './config';

export default Roarr.child({
    service: pjson.name,
    release: pjson.version,
    logLevel: config.logLevel
});