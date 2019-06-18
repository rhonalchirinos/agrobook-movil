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

    static async store(value) {
       return await axios.post(conf.api + 'contracts', value);
    }


    static async farmers() {
        try {
            const response = await axios.get(conf.api + 'farmers');
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: []};
    }


}