import createApiClient from "./api.service";

class GuestService {
    constructor(baseUrl = "/api/guest") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

}

export default new GuestService();
