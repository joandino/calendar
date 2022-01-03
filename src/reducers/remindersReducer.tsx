import { ADD_REMINDER,
        ADD_REMINDER_OK,
        ADD_REMINDER_ERROR, 
        GET_REMINDERS,
        GET_REMINDERS_ERROR,
        GET_REMINDERS_OK,
        GET_REMINDER_EDIT,
        EDIT_REMINDER,
        EDIT_REMINDER_OK,
        EDIT_REMINDER_ERROR,
        GET_DELETE_REMINDER,
        DELETE_REMINDER_OK,
        DELETE_REMINDER_ERROR
} from '../types';

const initialState = {
    reminders: [],
    error: null,
    loading: false,
    reminderDelete: null,
    reminderEdit: null
}

export default function(state = initialState, action:any){
    switch (action.type) {
        case GET_REMINDERS :
        case ADD_REMINDER : 
        case EDIT_REMINDER :
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
        case EDIT_REMINDER_ERROR :
            case DELETE_REMINDER_ERROR :
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
        case GET_REMINDER_EDIT :
            return {
                ...state,
                reminderEdit: action.payload
            }
        case EDIT_REMINDER_OK :
            return {
                ...state,
                reminderEdit: null,
                reminders: state.reminders.map((reminder:any) => 
                reminder.id === action.payload.id ? reminder = action.payload : reminder)
            }
        case GET_DELETE_REMINDER :
            return {
                ...state,
                reminderDelete: action.payload
            }
        case DELETE_REMINDER_OK : 
            return {
                ...state,
                reminders: state.reminders.filter((reminder:any) => reminder.id !== state.reminderDelete),
                reminderDelete: null
            }
        default : 
            return state;
    }
}