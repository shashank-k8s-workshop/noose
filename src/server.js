import "@babel/polyfill";
import restify from 'restify';
import AWSXRay from 'aws-xray-sdk';
import AWSXRayRestify from 'aws-xray-sdk-restify';
import koose from './kooseFacade';
import log from './logger';
import pjson from '../package.json'
import config from './config';
import path from 'path';

const service = pjson.name;
const version = pjson.version;

AWSXRay.config([AWSXRay.plugins.ECSPlugin]);
const xraySampleFilePath = path.join(__dirname, '..', 'aws-xray-sampling-rules.json');
console.log(xraySampleFilePath)
AWSXRay.middleware.setSamplingRules(xraySampleFilePath);

const noo = async (req, res, next) => {
    log.info({ resource: 'noo' }, 'api invoked')
    try {
        // const kooRes = await xrayCaptureAsync('koose/koo', koose.koo);
        const kooRes = await koose.koo();
        res.send({
            service,
            version,
            res: [kooRes]
        })

    } catch (err) {
        log.error({ resource: 'noo', error: err.message }, 'error happened while calling koo')
        res.send(500, { message: 'koose returned error', code: 'kooseError' })
    }
    next();
}

const healthCheck = async (req, res, next) => {
    res.send("healthy")
    next();
}

const xrayCaptureAsync = (segName, func, args) => {
    return new Promise((resolve, reject) => {
        AWSXRay.captureAsyncFunc(segName, (seg) => {
            // The seg is `undefined` here
            func.apply(this, args)
                .then((result) => {
                    seg.close();
                    resolve(result);
                })
                .catch((error) => {
                    seg.close(error);
                    reject(error);
                });
        });
    });
}

const server = restify.createServer();
server.get('/noo', noo);
server.get('/health-check', healthCheck);
server.listen(config.port, () => { });

AWSXRayRestify.enable(server, 'Noose-' + version);
