import { observer } from "mobx-react"

import './meetings.css'
import AppStore from '../../store/AppStore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import AppStoreMeeting from "../../store/AppStoreMeeting";


const Meetings = (observer(() => {


  useEffect(() => {
    AppStoreMeeting.getMeetings();
  }, [])

  const isDateInCurrentDay = (date) => {
    const today = new Date();
    const dateToCheck = new Date(String(date.split('T')[0]));
    return dateToCheck.toDateString() === today.toDateString();
  }


  const isDateInCurrentWeek = (date) => {
    const today = new Date();
    const dateToCheck = new Date(String(date.split('T')[0]));
   
    return dateToCheck.getFullYear===today.getFullYear&&
    dateToCheck.getMonth===dateToCheck.getMonth&&
    dateToCheck.getDate()-today.getDate()+today.getDay()+1<=7


  };
  return (
    <>
      {AppStoreMeeting.meetingsList.length > 0 ? (
        <div className="flexed-items">
          {AppStoreMeeting.meetingsList.map((meeting) => (
            <Card sx={{ minWidth: 275 }} key={meeting.id}>
              <CardContent>
                {isDateInCurrentDay(meeting.dateTime) ? (
                  <Alert severity="error">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {meeting.dateTime}
                    </Typography>
                  </Alert>
                ) : isDateInCurrentWeek(meeting.dateTime) ? (
                  <Alert severity="warning">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {meeting.dateTime}
                    </Typography>
                  </Alert>
                ) : (
                  <Alert severity="success">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {meeting.dateTime}
                    </Typography>
                  </Alert>
                )}
                <br />
                <Typography sx={{ fontSize: 17 }} gutterBottom>
                  {meeting.name}
                </Typography>
                <Typography sx={{ fontSize: 17 }} >
                  customer name: {meeting.nameCust}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  customer id: {meeting.id}
                </Typography>

              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>No Meeting!</div>
      )}
    </>
  );
}))
export default Meetings