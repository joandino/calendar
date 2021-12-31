import axios from 'axios';
import { GET_REMINDERS,
    GET_REMINDERS_OK,
    GET_REMINDERS_ERROR,
    ADD_REMINDER,
    ADD_REMINDER_OK,
    ADD_REMINDER_ERROR,
    GET_REMINDER_EDIT,
    EDIT_REMINDER,
    EDIT_REMINDER_OK,
    EDIT_REMINDER_ERROR
} from '../types';

//Add reminder functions
export function addReminderAction(reminder:any) {
    return async (dispatch:any) => {
        dispatch(addReminder());

        try {
            var res = await axios.post(`${process.env.REACT_APP_API_URL}/reminders`, reminder);
            reminder.id = res.data.identifiers[0].id;
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

//Get reminder to edit
export function getReminderEditAction(reminder:any) {
    return (dispatch:any) => {
        dispatch(getReminderEdit(reminder));
    }
}

const getReminderEdit = (reminder:any) => ({
    type: GET_REMINDER_EDIT,
    payload: reminder
})

//Edit reminder functions
export function editReminderAction(reminder:any) {
    return async (dispatch:any) => {
        dispatch(editReminder());

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/reminders/${reminder.id}`, reminder);
            dispatch(editReminderOk(reminder));
        } catch (error) {
            console.log(error);
            dispatch(editReminderError(true));
        }
    }
}

const editReminder = () => ({
    type: EDIT_REMINDER
})

const editReminderError = (state:any) => ({
    type: EDIT_REMINDER_ERROR,
    payload: state
});

const editReminderOk = (reminder:any) => ({
    type: EDIT_REMINDER_OK,
    payload: reminder
})