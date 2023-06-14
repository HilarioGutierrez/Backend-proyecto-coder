import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

import addUser from './shared/commands/addUser.js';

void(async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            program.addCommand(addUser);

            await program.parseAsync(process.argv);

            exit();

    } catch (error) {
        console.log(error);
        exit();
    }
})()