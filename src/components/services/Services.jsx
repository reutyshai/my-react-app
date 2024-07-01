import { useEffect } from "react";
import { observer } from "mobx-react"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import './services.css'
// import '../../index.css'
import AppStore from '../../store/AppStore';
import UserMeeting from '../meetings/UserMeeting.jsx'
import AppStoreService from "../../store/AppStoreService.js";



const Services = (observer(() => {

   useEffect(() => {
      AppStoreService.getServices();
   }, [])


   return <>

      {AppStoreService.servicesList.length > 0 ? (

         <div className="flexed-items" >

            {AppStoreService.servicesList.map((service) => (

               <Card className="card" key={service.id} sx={{ maxWidth: 345 }}>

                  <CardMedia
                     sx={{ height: 140 }}
                     image={service.pathImage}
                     title="green iguana"
                  />

                  <CardContent>
                     <Typography gutterBottom component="div">
                        {service.name}
                     </Typography>

                     <Typography gutterBottom component="div">
                        {service.price} $
                     </Typography>

                     <Typography variant="body2" color="text.secondary">
                        {service.description}
                     </Typography>
                  </CardContent>

                  {!AppStore.isLogin && <UserMeeting serviceName={service.name} />}
               </Card>

            ))}
         </div>) : (<div>No Services!</div>)
      }
   </>
}))
export default Services