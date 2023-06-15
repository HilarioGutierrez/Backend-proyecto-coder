import { Command } from "commander";
import userManager from "../../domain/manager/userManager.js";

const addUser = new Command('addUser');

addUser
.version('0.0.1')
.description('Add a new user')
.option('-fn, --firstName <firstName>', 'First name')
.option('-ln, --lastName <lastName>', 'Last name')
.option('-e, --email <email>', 'Email')
.option('-a, --age <age>', 'Age')
.option('-p, --password <password>', 'Password')
.option('-ia, --isAdmin <isAdmin>', 'Is admin')
.action(async (env) =>
{
    const payload = {
        ...env,
        age: +env.age,
        isAdmin: env.isAdmin === 'true'
    };

    const manager = new userManager();
    const user = await manager.create(payload);

    if(user)
    {
        console.log('User created');
    }

}
)

export default addUser;