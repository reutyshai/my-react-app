
import { observable, makeObservable, action } from 'mobx';
import axios from 'axios';

class AppStoreMeeting {

    meetingsList = observable([

    ]);

    constructor() {


        makeObservable(this, {
            meetingsList: observable,
            getMeetings: action,
            addMeetings: action
        })
    }


    addMeetings = async (meeting) => {

        try {
            const res = await axios.post('http://localhost:8787/appointment', meeting);

            if (res.status === 200) {

                this.meetingsList = ([...this.meetingsList, meeting]);
                this.meetingsList=this.meetingsList.sort((m1,m2)=>m1.dateTime-m2.dateTime)

                alert("Meeting successfully added!!");

                return 'success';
            }

        } catch (error) {

            console.log("res: ", error);

            if (error.status === 401)
                console.log(401)

            else {
                alert("Date taken, choose another date");
            }

            return 'failed';
        }
    }
    getMeetings = async () => {
        try {
            const res = await axios.get('http://localhost:8787/appointments');

            console.log(res.data);

            if (res.status === 200) {

                const meetings = res.data
                this.meetingsList=meetings.sort((m1,m2)=>new Date(m1.dateTime)-new Date(m2.dateTime));

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
export default new AppStoreMeeting();