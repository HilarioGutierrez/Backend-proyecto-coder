import container from '../../shared/container.js';

class roleManager {

    constructor() {
        this.rolesRepository = container.resolve('roleRepository');
    }

    async getOne(id) {
        return this.rolesRepository.getOne(id);
    }

    async create(role) {
        return this.rolesRepository.create(role);
    }

    async paginate(criteria) {
        return this.rolesRepository.paginate(criteria);
    }

    async deleteOne(id) {
        return this.rolesRepository.deleteOne(id);
    }

    async updateOne(id, data) {
        return this.rolesRepository.updateOne(id, data);
    }
}

export default roleManager;