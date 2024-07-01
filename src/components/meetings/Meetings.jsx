import { useEffect } from "react";
import { observer } from "mobx-react"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import AppStoreMeeting from "../../store/AppStoreMeeting";
import './meetings.css'


const Meetings = (observer(() => {

  useEffect(() => { AppStoreMeeting.getMeetings(); }, []);
  let severity = "";

  const isDateInCurrentDay = (date) => {
    const today = new Date();
    const dateToCheck = new Date(String(date.split('T')[0]));
    if (dateToCheck.toDateString() === today.toDateString()) {
      severity = "error";
    }
  }


  const isDateInCurrentWeek = (date) => {
    const today = new Date();
    const dateToCheck = new Date(String(date.split('T')[0]));
    if (dateToCheck.getFullYear === today.getFullYear &&
      dateToCheck.getMonth === dateToCheck.getMonth &&
      dateToCheck.getDate() - today.getDate() + today.getDay() + 1 <= 7)
      severity = "warning"
  };

  const checkDate = (date) => {
    severity = "success"
    isDateInCurrentWeek(date)
    isDateInCurrentDay(date)
  }

  return (
    <>
      {AppStoreMeeting.meetingsList.length > 0 ? (
        <div className="flexed-items">

          {AppStoreMeeting.meetingsList.map((meeting) => (

            <Card sx={{ minWidth: 275 }} key={meeting.id}>
              <CardContent>
                {checkDate(meeting.dateTime)}

                <Alert severity={severity}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {meeting.dateTime}
                  </Typography>
                </Alert>

                <br />
                <Typography sx={{ fontSize: 17 }} gutterBottom>
                  {meeting.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                  customer name: {meeting.nameCust}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  customer id: {meeting.id}
                </Typography>

              </CardContent>
            </Card>
          ))}
        </div>) : (<div>No Meeting!</div>)
      }
    </>
  );
}))
export default Meetings