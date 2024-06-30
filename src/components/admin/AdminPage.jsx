import { observer } from "mobx-react"
import { useEffect } from "react";

import Login from "../Login"
import AppStore from "../../store/AppStore"
import BusinessAdmin from "./BusinessAdmin"


const Admin = (observer(() => {

    useEffect(() => {
        const nameAdmin = sessionStorage.getItem("name");
        const password = sessionStorage.getItem("password");
        if (!nameAdmin)
            AppStore.setIsLogin(false)
        else
            AppStore.checkLogin(nameAdmin, password)
    }, [])

    return (
        <>
            {AppStore.isLogin ?
                <BusinessAdmin /> : <Login />
            }
        </>
    )
}))



export default Admin