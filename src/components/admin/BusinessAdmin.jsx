
import BusinessData from "../business/BusinessData"
import { Outlet, Link } from "react-router-dom"


function BusinessAdmin() {

  return (
    <>
      <BusinessData />
      <br />
      <div>
        <Link to="./services"> services </Link>
        |
        <Link to="./meetings"> meetings </Link>
      </div> 
      <br />
      <Outlet />
    </>
  )
}

export default BusinessAdmin
