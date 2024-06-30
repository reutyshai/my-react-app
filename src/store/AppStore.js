import { observable, makeObservable, action } from 'mobx';

class AppStore {

    isLogin = true;
    BussinessData=observable({

    });
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            checkLogin: action,
            BussinessData:observable,
            getBussinessData:action,
            updateBussinessData:action,

        })
    }

    checkLogin = async (name, password) => {
        const res = await fetch("http://localhost:8787/login", {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }

        })
        if (res.status === 200) {
            this.setIsLogin(true);
            console.log("sucsses")
        }
        else{ 
            this.setIsLogin(false);

            alert("name or password is not valid")
        }

    }

    setIsLogin = (val) => {
        this.isLogin = val;
    }

    getBussinessData = async () => {
        const response = await fetch("http://localhost:8787/businessData");
        if (response.status === 200) {

            this.BussinessData = await response.json();
            return 'success'
        }
        return 'failed'

    }

    updateBussinessData = async (data) => {
        const res = await fetch("http://localhost:8787/businessData", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }

        })
        if (res.status === 200) {
            this.BussinessData = data
            console.log("sucsses")
            return 'success'
        }
        return 'failed'
    }


}

export default new AppStore();