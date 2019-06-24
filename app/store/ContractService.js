import axios from "axios";
import conf from "../Configuration";
import moment from "moment";

/**
 * @description class to connect api
 * conf.api --> url api
 * */
export default class ContractService {

    /**
     * @description get all my contracts if I`m administrator return all
     * @params value{ null, F , N } Finalized, New
     * @return List<contract>
     * */
    static async all(status) {
        try {
            const response = await axios.get(conf.api + 'contracts', {
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

    /**
     * @description create a contract
     * @params value{ address seed farmer_id planting_date }
     * @return contract
     * */
    static async store(value) {
        return await axios.post(conf.api + 'contracts', value);
    }

    /**
     * @description completed data contract
     * @param id contract
     * @params value{ floor_power planting_date }
     * @return contract
     * */
    static async view(id, value) {
        console.log('send', value, '<----');
        return await axios.post(`${conf.api}contracts/${id}/view`, value);
    }

    /**
     * @description finalized a contract
     * @param id contract
     * @params value{ description } description to close the contract
     * @return contract
     * */
    static async close(id, value) {
        return await axios.post(`${conf.api}contracts/${id}/close`, value);
    }

    /**
     * @description Show contract
     * @param id contract
     * @return contract
     * */
    static async show(id) {
        try {
            const response = await axios.get(conf.api + 'contracts/' + id);
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: null};
    }

    /**
     * @description List user to create contract
     * @return list user
     * */
    static async farmers() {
        try {
            const response = await axios.get(conf.api + 'farmers');
            return response;
        } catch (error) {
            console.log('error', error);
        }
        return {data: []};
    }

    /**
     * @description format date to contracts
     * @param date contract
     * @return date String DD/MM/YYYY
     * */
    static formatDate(data) {
        if (!data) {
            return '';
        }
        return moment(data).format('DD/MM/YYYY');
    }

    /**
     * @description search
     * @param date contract
     * @return date String DD/MM/YYYY
     * */
    static async search(lon, lat) {
        return await axios.get(" https://api.openrouteservice.org/geocode/reverse", {
            params: {
                'api_key': '5b3ce3597851110001cf62488ffaa685ebe14737960484fa06f31c80',
                'point.lon': lon,
                'point.lat': lat
            }
        });
    }
}