import userMongooseDao from '../../data/daos/userMongooseDao.js'

class userManager {

    constructor() {
        this.userDao = new userMongooseDao();
    }

    async getOne(email) {
        return this.userDao.getOne(email);
    }

    async getOneByEmail(email) {
        return this.userDao.getOneByEmail(email);
    }

    async create(user) {
        return this.userDao.create(user);
    }

    async paginate(criteria) {
        return this.userDao.paginate(criteria);
    }

    async deleteOne(email) {
        return this.userDao.deleteOne(email);
    }

    async updateOne(email, user) {
        return this.userDao.updateOne(email, user);
    }
}

export default userManager;