import userMongooseRepository from '../../data/repositories/userMongooseRepository.js'

class userManager {

    constructor() {
        this.userRepository = new userMongooseRepository();
    }

    async getOne(email) {
        return this.userRepository.getOne(email);
    }

    async getOneByEmail(email) {
        return this.userRepository.getOneByEmail(email);
    }

    async create(user) {
        return this.userRepository.create(user);
    }

    async paginate(criteria) {
        return this.userRepository.paginate(criteria);
    }

    async deleteOne(email) {
        return this.userRepository.deleteOne(email);
    }

    async updateOne(email, user) {
        return this.userRepository.updateOne(email, user);
    }

    async updateDate(email, date) {
        return this.userRepository.updateDate(email, date);
    }

    async updatePassword(email, password) {
        return this.userRepository.updatePassword(email, password);
    }
}

export default userManager;