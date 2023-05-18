import userMongooseDao from "../daos/userMongooseDao";

class userManager {

    constroctor() {
        this.userDao = new userMongooseDao();
    }

    async getOne(email) {
        return await this.userDao.getOne(email);
    }

    async addOne(user) {
        return await this.userDao.addOne(user);
    }

    async getAll() {
        return await this.userDao.getAll();
    }

    async deleteOne(email) {
        return await this.userDao.deleteOne(email);
    }

    async updateOne(email, user) {
        return await this.userDao.updateOne(email, user);
    }
}

export default userManager;