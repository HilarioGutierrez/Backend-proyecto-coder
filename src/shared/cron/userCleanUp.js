import cron from 'node-cron'
import userManager from '../../domain/manager/userManager.js'
import cartManager from '../../domain/manager/cartManager.js';

export const task = cron.schedule('0 0 * * 0/2', () => { //Tarea que se ejecuta todos los dias del mes a las 0hs
try {
    const manager = new userManager();
    
    const query = {
        limit: +req.query.limit || 500,
        page: +req.query.page || 1,
    
    }
    const list = manager.paginate(query)

    const inactivityPeriod = 30;
    const currentDate = new Date();
    
    for (let i = 0; i < list.length; i++) {
        const userDate = list[i].lastLogin;
        const userId = list[i].id;

        const math = currentDate - userDate;

        if(math < inactivityPeriod) {
            const cart = new cartManager();
            const deleteOne = cart.deleteOne(userId)

            console.log(deleteOne);
        }
    }
    
} catch (error) {
    throw new Error(error.message)
}

})