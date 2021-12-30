import { ADD_REMINDER,
        ADD_REMINDER_OK,
        ADD_REMINDER_ERROR, 
        GET_REMINDERS,
        GET_REMINDERS_ERROR,
        GET_REMINDERS_OK
} from '../types';

const initialState = {
    reminders: [],
    error: null,
    loading: false,
    reminderDelete: null
}

export default function(state = initialState, action:any){
    switch (action.type) {
        case GET_REMINDERS :
        case ADD_REMINDER : 
            return {
                ...state,
                loading: true
            }
        case ADD_REMINDER_OK :
            return {
                ...state,
                loading:false,
                reminders: [...state.reminders, action.payload]
            }
        case GET_REMINDERS_ERROR :
        case ADD_REMINDER_ERROR :
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        case GET_REMINDERS_OK :
            return {
                ...state,
                loading: false,
                error: false,
                reminders: action.payload
            }
        default : 
            return state;
    }
}