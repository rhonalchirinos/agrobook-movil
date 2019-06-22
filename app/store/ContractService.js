import axios from "axios";
import conf from "../Configuration";
import moment from "moment";

export default class ContractService {

    static async all(status) {
        try {
            const response = await axios.get(conf.api + 'contracts',{
                params: {
                    status
                }
            });
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: []};
    }

    static async store(value) {
        return await axios.post(conf.api + 'contracts', value);
    }

    static async view(id,value) {
        return await axios.post(`${conf.api}contracts/${id}/view`, value);
    }

    static async close(id, value) {
        return await axios.post(`${conf.api}contracts/${id}/close`, value);
    }

    static async show(id) {
        try {
            const response = await axios.get(conf.api + 'contracts/' + id);
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: null};
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

    static formatDate(data) {
        if (!data) {
            return '';
        }
        return moment(data).format('DD/MM/YYYY');
    }


}
