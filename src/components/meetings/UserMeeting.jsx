import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

import {  TextField } from "@mui/material";
import MyDatePicker from '../MyDatePicker';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from 'react';
import AppStoreMeeting from "../../store/AppStoreMeeting";
import '../services/Services.css'

function UserMeeting({serviceName}) {

    const [meetingForm, setMeetingForm] = useState({
      nameCust: "",
      id: "",
      dateTime: "",
      name:serviceName
    })
  
  
    const handleChange = (event) => {
      const { name, value } = event.target
      setMeetingForm({ ...meetingForm, [name]: value })
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      AppStoreMeeting.addMeetings(meetingForm);
      setAnchor(anchor ? null : event.currentTarget);
  
      setMeetingForm({
        nameCust: "",
        id: "",
        dateTime: ""
      })
    }
    const handleDateTimeChange = (dateTime) => {
      const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss');
      setMeetingForm((prevData) => ({
        ...prevData,
        dateTime: formattedDateTime,
      }));
      handleChange({ target: { name: 'dateTime', value: formattedDateTime } });
    };
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
    
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick} id="form_meeting_button">
        {!open ? "Schedule a meeting" : "Close"}
      </Button>
      <BasePopup id={id} open={open} anchor={anchor} >
        <PopupBody id="popupBody">
      <form id="popup_form" onSubmit={handleSubmit} className="meetingForm">
        <TextField
        margin="normal"
        required
        fullWidth
        type='text'
        id="custName"
        label="Customer name"
        name="nameCust"
        autoComplete="nameCust"
        onChange={handleChange}
        value={meetingForm.nameCust}
        autoFocus
        className='meetingFields'
      />
        <TextField
          margin="normal"
          required
          fullWidth
          name="id"
          label="Id"
          type="text"
          id="id"
          onChange={handleChange}
          value={meetingForm.id}
          className='meetingFields'


          autoComplete="id"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker

            value={meetingForm.dateTime}
            onChange={handleDateTimeChange}
            disablePast
            required
          />
        </LocalizationProvider>
        <Button className="btn"
          type="submit"
          
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
        </form>
        </PopupBody>
      </BasePopup>
    </div>
  );
}export default UserMeeting

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const Button = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 127, 255, 0.5)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);