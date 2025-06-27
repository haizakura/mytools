// app.js
// Service Application

import express from 'express';
import log4js from 'log4js';
import history from 'connect-history-api-fallback';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3010;
const __dirname = dirname(fileURLToPath(import.meta.url));
const logger = log4js.getLogger();
logger.level = 'info';

app.use(log4js.connectLogger(
    logger, 
    {
        level: 'auto',
        format: ':remote-addr ":method :url" :status ":user-agent"',
    },
));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
});

export { logger };

/** Router Begin **/

/**
 * Code Define
 * 
 * 200: OK
 * 400: Bad Request
 * 502: Bad Gateway
 */

/** Rate Router **/
import { rateRouter } from './router/rate.js';
app.use('/api', rateRouter);

/** Router End **/

/**
 * robots.txt
 */
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

/**
 * service start
 */
app.use(history());
app.use(express.static(join(__dirname, 'public')));

app.listen(port, () => {
    logger.info('Service Starting...');
    logger.info(`The Service is listening on port ${port}.`);
});
