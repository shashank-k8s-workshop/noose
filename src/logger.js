import Roarr from 'roarr';

export default Roarr.child({
    service: 'ninky',
    release: process.env.npm_package_version,
    logLevel: 'info'
});