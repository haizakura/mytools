// rate.js
// Rate Router

import express from 'express';
import axios from 'axios';
import { logger } from '../app.js';

const router = express.Router();

/**
 * Code Define
 * 
 * 200: OK
 * 400: Bad Request
 * 502: Bad Gateway
 */

/** Rate Router Begin **/

/**
 * get rate
 * request.query = year, month, day, transCur, baseCur
 * response.body = { 'data': '' }
 */
router.get('/rate', (req, res, next) => {
    try {
        const today = new Date();
        const year = req.query?.year ?? today.getFullYear();
        const month = req.query?.month ?? (today.getMonth() + 1).toString().padStart(2, '0');
        const day = req.query?.day ?? today.getDate().toString().padStart(2, '0');
        const transCur = req.query?.transCur ?? 'JPY';
        const baseCur = req.query?.baseCur ?? 'CNY';
        axios.get('https://www.unionpayintl.com/upload/jfimg/' + year + month + day + '.json')
            .then(data => {
                const exchangeRateJson = data.data?.exchangeRateJson;
                exchangeRateJson.forEach(element => {
                    if (element.transCur === transCur & element.baseCur === baseCur) {
                        res.status(200).json({
                            data: element,
                        });
                    }
                });
            })
            .catch(error => {
                logger.error(error);
                res.sendStatus(400);
            });
    } catch (error) {
        logger.error(error);
        res.sendStatus(502);
    }
});

/** Rate Router End **/

export { router as rateRouter };
