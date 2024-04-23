import createApiClient from "./api.service";
class StaffService {
    constructor(baseUrl = "/api/staff") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new StaffService();