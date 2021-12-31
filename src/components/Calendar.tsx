import React, { Fragment, useEffect, useState } from 'react';
import '../assets/calendar.scss';
import moment from 'moment';
import ReminderDialog from './ReminderDialog';

import { useSelector, useDispatch } from 'react-redux';
import { getMonthlyReminders, getReminderEditAction } from '../actions/reminderActions';
import { RootState } from '../reducers';

const Calendar = (props:any) => {
    const dispatch = useDispatch();

    const getReminders = () => dispatch(getMonthlyReminders(`${year}${monthNumber}${firstDayOfMonth}`, `${year}${monthNumber}${lastDayOfMonth}`, props.clientIp));

    const reminders:any = useSelector((state: RootState) => {
        return state.reminders;
    });

    const [date, setDate] = useState(moment().toDate());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(Number(moment(date).startOf("month").format("DD")));
    const [lastDayOfMonth, setLastDayOfMonth] = useState(Number(moment(date).endOf("month").format("DD")));
    const [monthNumber, setMonthNumber] = useState(moment(date).startOf("month").format('M'));
    const [year, setYear] = useState(moment(date).startOf("year").format('YYYY'));

    const todayDate = moment().toDate();
    
    const [monthTitle, setMonthTitle] = useState("");
    const [monthDays, setMonthDays] = useState(null);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const weekDaysShortName = () => {
        let weekDaysShort = moment.weekdaysShort().map(day => {
            return(
                <th key={day}>
                    {day}
                </th>
            )
        });

        return weekDaysShort;
    }

    const clickPrev = () => {
        setDate(moment(date).subtract(1, 'M').toDate());
    }

    const clickNext = () => {
        setDate(moment(date).add(1, 'M').toDate());
    }

    const onClickDay = (d:any) => {
        let month = moment(date).startOf("month").format('M');
        let year = moment(date).startOf("year").format('YYYY');

        setData({
            id: "",
            dateCode: "",
            title: "",
            fromTime: "07:30",
            toTime: "08:00",
            city: "",
            ipAddress: props.clientIp,
            date: moment(`${year}-${month}-${d}`).toDate(),
            action: "ADD"
        })

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddedReminder = () => {
        setOpen(false);
    }

    const handleDoubleClickEvent = (e:any) => {
        e.stopPropagation();

        let eventId = e.target.id;

        var event = reminders.reminders.find((item:any) => item.id === Number(eventId));

        setData({
            id: event.id,
            dateCode: event.dateCode,
            title: event.title,
            fromTime: event.fromTime,
            toTime: event.toTime,
            city: event.city,
            ipAddress: props.clientIp,
            date: moment(`${event.dateCode}`).toDate(),
            action: "EDIT"
        });

        dispatch(getReminderEditAction({
            id: event.id,
            dateCode: event.dateCode,
            title: event.title,
            fromTime: event.fromTime,
            toTime: event.toTime,
            city: event.city,
            ipAddress: props.clientIp,
        }));

        setOpen(true);
    }

    const getMonthCalendar = async () => {
        let firstDay = Number(moment(date).startOf("month").format("d"));
        let blanks = [];
        let actualMonth = moment(todayDate).startOf("month").format('MMMM');
        let month = moment(date).startOf("month").format('MMMM');
        let monthNumber = moment(date).startOf("month").format('M');
        let year = moment(date).startOf("year").format('YYYY');
        let title = month + ' ' + year;

        setMonthTitle(title);

        for(let i=0; i < firstDay; i++){
            blanks.push(
                <td key={i} className="day other-month">{""}</td>
            )
        }

        let daysInMonth = [];
        let today = moment().date();

        for(let j=1, len = moment().daysInMonth(); j <= len; j++){ 
            let eventsDay:any = [];
            if(reminders.reminders.length > 0){
                eventsDay = reminders.reminders.filter((item:any) => item.dateCode === Number(`${year}${monthNumber}${j}`));
            }

            daysInMonth.push(
                <td key={`${month}${j}`} className="day" onDoubleClick={() => onClickDay(j)}>
                    <div className={j===today && actualMonth===month ? "today" : "date"}>
                        {j}
                    </div>

                    { eventsDay.length > 0 ? eventsDay.map((event:any) => {
                        return <div className="event" 
                                    key={`${event.id}`}
                                    id={`${event.id}`}
                                    onDoubleClick={(e:any) => handleDoubleClickEvent(e)}
                                >
                                    <div className="event-desc" id={`${event.id}`}>
                                        {event.title}
                                    </div>
                                    <div className="event-time" id={`${event.id}`}>
                                        {event.fromTime} to {event.toTime}
                                    </div>
                                </div>
                    }) : ""}
                </td>
            )
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows:any = [];
        let cells:any = [];

        totalSlots.forEach((row, i) => {
            if(i%7 !== 0){
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }

            if(i===totalSlots.length - 1){
                rows.push(cells);
            }
        });

        let rowsDaysInMonth = rows.map((d:any, i:any) => {
            return <tr key={`${d}${i}`} className="days">{d}</tr>;
        });

        setMonthDays(rowsDaysInMonth);
    }

    useEffect(() => {
        setFirstDayOfMonth(Number(moment(date).startOf("month").format("DD")));
        setLastDayOfMonth(Number(moment(date).endOf("month").format("DD")));
        setMonthNumber(moment(date).startOf("month").format('M'));
        setYear(moment(date).startOf("year").format('YYYY'));
    }, [date]);

    useEffect(() => {
        getReminders();
    }, [monthNumber]);

    useEffect(() => {
        getMonthCalendar();
    }, [reminders.reminders]);

    return(
        <Fragment>
            <table id="calendar">
                <caption>
                    <div className="arrow left" onClick={clickPrev}></div>
                    {monthTitle}
                    <div className="arrow right" onClick={clickNext}></div>
                </caption>
                <thead className="weekdays">
                    {weekDaysShortName()}
                </thead>
                <tbody className="days">
                    {monthDays}
                </tbody>
            </table>
            <ReminderDialog open={open} data={data} handleClose={handleClose} handleAddReminder={handleAddedReminder} />
        </Fragment>
    );
}

export default Calendar;
