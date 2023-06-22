import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

import addUser from './shared/commands/addUser.js';
import dbFactory from './data/factories/dbFactory.js';

void(async () =>
{
    try {
        const db = dbFactory.create(process.env.DB);
        db.connect(process.env.MONGO_DB_URI);

            program.addCommand(addUser);

            await program.parseAsync(process.argv);

            exit();

    } catch (error) {
        console.log(error);
        exit();
    }
})()