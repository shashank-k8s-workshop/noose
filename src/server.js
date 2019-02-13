import "@babel/polyfill";
import restify from 'restify';
import koose from './kooseFacade';
import log from './logger';
import pjson from '../package.json'
import config from './config';

const service = pjson.name;
const version = pjson.version;

const noo = async (req, res, next) => {
    log({ resource: 'noo' }, 'api invoked')
    try {
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

const server = restify.createServer();
server.get('/noo', noo);
server.listen(config.port, () => { });
