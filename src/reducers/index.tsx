import { combineReducers } from "redux";
import remindersReducer from "./remindersReducer";

// export default combineReducers({
//     reminders: remindersReducer
// });

export const rootReducer = combineReducers({
    reminders: remindersReducer
})

export type RootState = ReturnType<typeof rootReducer>