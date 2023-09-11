import dotenv from 'dotenv'
import appFactory from './presentation/factories/appFactory.js'
import dbFactory from './data/factories/dbFactory.js'
import { task } from './shared/cron/userCleanUp.js';
import cron from 'node-cron'
import userManager from './domain/manager/userManager.js';

dotenv.config()


void (async () => 
{
    const db = dbFactory.create(process.env.DB);
    db.connect(process.env.MONGO_DB_URI)

    const app = appFactory.create(process.env.APPLICATION);
    app.init();
    app.build();
    app.listen();
    app.swagger();
    app.handlebars();
})()
