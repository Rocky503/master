import createApiClient from "./api.service";

class StaffService {
    constructor(baseUrl = "/api/guest") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

}

export default new StaffService();