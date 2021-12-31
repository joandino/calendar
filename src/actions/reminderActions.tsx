import axios from 'axios';
import { GET_REMINDERS,
    GET_REMINDERS_OK,
    GET_REMINDERS_ERROR,
    ADD_REMINDER,
    ADD_REMINDER_OK,
    ADD_REMINDER_ERROR 
} from '../types';

//Add reminder functions
export function addReminderAction(reminder:any) {
    return (dispatch:any) => {
        dispatch(addReminder());

        try {
            axios.post(`${process.env.REACT_APP_API_URL}/reminders`, reminder);
            dispatch(addReminderOk(reminder));
        } catch (error) {
            console.log(error);
            dispatch(addReminderError(true));
        }
    }
}

const addReminder = () => ({
    type: ADD_REMINDER
});

const addReminderOk = (reminder:any) => ({
    type: ADD_REMINDER_OK,
    payload: reminder
});

const addReminderError = (state:any) => ({
    type: ADD_REMINDER_ERROR,
    payload: state
});

//Get reminder functions
export function getMonthlyReminders(startDateCode:any, endDateCode:any, ip:any) {
    return async(dispatch:any) => {
        dispatch(getReminders());

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/reminders/${startDateCode}/${endDateCode}/${ip}`);
            dispatch(getRemindersOk(res.data));
        } catch (error) {
            console.log(error);
            dispatch(getRemindersError(true));
        }
    }
}

const getReminders = () => ({
    type: GET_REMINDERS,
    payload: true
})

const getRemindersOk = (reminders:any) => ({
    type: GET_REMINDERS_OK,
    payload: reminders
})

const getRemindersError = (state:any) => ({
    type: GET_REMINDERS_ERROR,
    payload: state
})
