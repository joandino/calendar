import React, { Fragment, useEffect, useState } from 'react';
import '../assets/calendar.scss';
import moment from 'moment';
import ReminderDialog from './ReminderDialog';

const Calendar = () => {
    const [date, setDate] = useState(moment().toDate());
    const todayDate = moment().toDate();

    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment().toDate());

    const weekDaysShortName = () => {
        // const weekDaysShort = moment.weekdaysShort();

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

        setSelectedDate(moment(`${year}-${month}-${d}`).toDate());
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getMonthCalendar = () => {
        let firstDay = Number(moment(date).startOf("month").format("d"));
        let blanks = [];
        let actualMonth = moment(todayDate).startOf("month").format('MMMM');
        let month = moment(date).startOf("month").format('MMMM');
        let year = moment(date).startOf("year").format('YYYY');
        let title = month + ' ' + year;

        for(let i=0; i < firstDay; i++){
            blanks.push(
                <td className="day other-month">{""}</td>
            )
        }

        let daysInMonth = [];
        let today = moment().date();

        for(let j=1; j <= moment().daysInMonth(); j++){
            daysInMonth.push(
                <td key={j} className="day" onDoubleClick={() => onClickDay(j)}>
                    <div className={j===today && actualMonth===month ? "today" : "date"}>
                        {j}
                    </div>
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
            return <tr className="days">{d}</tr>;
        });

        return(
            <table id="calendar">
                <caption>
                    <div className="arrow left" onClick={clickPrev}></div>
                    {title}
                    <div className="arrow right" onClick={clickNext}></div>
                </caption>
                <thead className="weekdays">
                    {weekDaysShortName()}
                </thead>
                <tbody className="days">
                    {rowsDaysInMonth}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        getMonthCalendar();
    }, [date]);

    return(
        <Fragment>
            {getMonthCalendar()}
            <ReminderDialog open={open} date={selectedDate}  handleClose={handleClose} />
        </Fragment>
    );
}

export default Calendar;