import React, { Fragment, useEffect, useState } from 'react';
import '../assets/calendar.scss';
import moment from 'moment';

const Calendar = () => {
    const [date, setDate] = useState(moment().toDate());
    const todayDate = moment().toDate();

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

    const onClickDay = (d:any) => {
        console.log(d);
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
                <caption>{title}</caption>
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
        </Fragment>
    );
}

export default Calendar;