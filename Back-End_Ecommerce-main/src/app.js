import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { helmeter } from './shared/config/hel-met.js';
import { Limmiter } from './shared/config/rate-limit.js';
import { httpLogger, errorLogger } from './shared/middlewares/logger.middleware.js';

import error from './shared/middlewares/error.middleware.js';
import useragent from 'express-useragent'
import router from './modules/index.js';
import { handleMessage } from './modules/bot/telegram.controllers.js';
import { swaggerSetup } from '#src/shared/config/swagger.js';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmeter);
// app.use(cspHeaders);
app.use(Limmiter);
app.use(express.json());
app.use(useragent.express())
// app.use(sanitizeRequest);
// HTTP request logging
// app.use(httpLogger);

app.set('trust proxy', 1)

app.use('/api', router);

app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, handleMessage)


swaggerSetup(app)
app.use(error);
app.use(errorLogger);

export default app;
