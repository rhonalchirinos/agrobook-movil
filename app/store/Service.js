import {AsyncStorage} from "react-native";
import axios from "axios";

export default class Service {

    static async configuration() {
        try {
            const user = await Service.user();
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            axios.defaults.headers.common['Accept'] = 'application/json';
            if (user) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async user() {
        try {
            return JSON.parse(await AsyncStorage.getItem('@book:user'),);
        } catch (error) {
            return null;
        }
    }
}