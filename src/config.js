const port = process.env.PORT || 8081;
const kooseUrl = process.env.KOOSE_URL || 'http://localhost:8082';
const logLevel = process.env.LOG_LEVEL || 'info';

export default {
    port,
    kooseUrl,
    logLevel
}