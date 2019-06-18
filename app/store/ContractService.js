import axios from "axios";
import conf from "../Configuration";

export default class ContractService {

    static async all() {
        try {
            const response = await axios.get(conf.api + 'contracts');
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: []};
    }
}