import { observable, makeObservable, action } from 'mobx';
import axios from 'axios';

class AppStoreService {

    servicesList = observable([]);
    constructor() {


        makeObservable(this, {
            servicesList: observable,
            addService: action,
            getServices: action,
            modifyServicesList: action
        })
    }

    modifyServicesList = ((newServicesList) => {
        this.servicesList = newServicesList;
    })

    
    addService = async (service) => {
        try {
            const res = await axios.post('http://localhost:8787/service', service);
            if (res.status === 200) {
                this.servicesList = ([...this.servicesList, service])
                alert("Service successfully added!!");
                return 'success';
            }

        } catch (error) {
            console.log("res: ", error);
            if (error.status === 401)
                console.log(401)
            else {
                console.log(error.status)
                alert("Service already exists");

            }
            return 'failed';
        }
    }

    getServices = async () => {
        try {
            const res = await axios.get('http://localhost:8787/services');
            console.log(res.data);
            if (res.status === 200) {
                const services = res.data
                this.modifyServicesList(services);
                return 'success';
            }

        } catch (error) {
            console.log("res: ", error);
            if (error.status === 401)
                console.log(401)
            else {
                console.log(error.status)
            }
            return 'failed';
        }
    }
}
export default new AppStoreService