import { useEffect } from "react"

import BusinessData from "../business/BusinessData"
import Services from "../services/Services"
import AppStore from "../../store/AppStore"


function User() {

    useEffect(() => { AppStore.setIsLogin(false) }, [])

    return <>
        <BusinessData />
        <Services />
    </>
}
export default User