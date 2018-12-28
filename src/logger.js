import Roarr from 'roarr';
import pjson from '../package.json'

export default Roarr.child({
    service: 'ninky',
    release: pjson.version,
    logLevel: 'info'
});