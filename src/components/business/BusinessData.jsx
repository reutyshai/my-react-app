import { forwardRef, useEffect, useState } from "react"
import { observer } from "mobx-react";

import AppStore from "../../store/AppStore"
import UpdateBussinessDataForm from "./UpdateBussinessDataForm";

const BusinessData = (observer(() => {

    useEffect(() => {
        AppStore.getBussinessData();
    }, [])


    return (
        <>
            <div>
                <div>
                    <img src={AppStore.BussinessData.image} alt="Business Logo" />
                    <p>{AppStore.BussinessData.name} | {AppStore.BussinessData.email} | {AppStore.BussinessData.phone}</p>
                    <hr />
                </ div>
                <br />
                {AppStore.isLogin && <UpdateBussinessDataForm />}
            </div>
        </>
    )
}))

export default BusinessData

