import "@babel/polyfill";
import restify from 'restify';
import log from './logger';

const service = 'ninky';
const version = process.env.npm_package_version;
const port = process.env.PORT || 8080;

const ping = async (req, res, next) => {
    log({resource: 'ping'}, 'invoked')
    await doSomething(500);
    res.send({
        service,
        version,
        res: 'pong'
    })
    next()
}

const doSomething = (ms) => {
    return new Promise(res => {
        setTimeout(res, ms)
    })
}

const server = restify.createServer();
server.get('/ping', ping);
server.listen(port, () => {});
