import React, { Fragment, useEffect, useState } from 'react';
import '../assets/dialog.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';
import axios from 'axios';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReminderDialog = (props:any) => {
    const [open, setOpen] = useState(false);
    
    const [popAlert, setPopAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [fromTime, setFromTime] = useState("07:30");
    const [toTime, setToTime] = useState("08:00");

    const [weatherIcon, setWeatherIcon] = useState("");
    const [forecast, setForecast] = useState("");

    const handleClose = () => {
        setPopAlert(false);
        setAlertText("");
        setTitle("");
        setCity("");
        setFromTime("07:30");
        setToTime("08:00");
        setWeatherIcon("");
        setForecast("");
        
        props.handleClose();
    }

    const handleCloseAlert = (e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertText("");
        setPopAlert(false);
    };

    const handleChangeFromTime = (e:any) => {
        setFromTime(e.target.value);
    }

    const handleChangeToTime = (e:any) => {
        setToTime(e.target.value);
    }

    const handleUnfocus = (e:any) => {
        let city:any = e.target.value;

        let hour = moment(fromTime, 'HH:mm').format('HH:mm:ss');

        if(city.trim() === "" || fromTime === ""){
            setAlertText("City and From Time must not be empty");
            setPopAlert(true);
            return;
        }

        let url = process.env.REACT_APP_WEATHER_API_URL + `/${city}` + `/${moment(date).format('YYYY-MM-DD')}T${hour}?key=` + process.env.REACT_APP_WEATHER_API_KEY;

        axios.get(url)
        .then((res:any) => {
            let data = res.data.days[0];

            setForecast(data.description);
            setWeatherIcon(data.icon);
        })
        .catch((err:any) => {
            setPopAlert(true);
            setAlertText("Must enter a valid city");
        })
    }

    const handleAddReminder = () => {
        if(title.trim() === ""){
            setAlertText("Title is required");
            setPopAlert(true);
        } else if(city.trim() === ""){
            setAlertText("City is required");
            setPopAlert(true);
        } else if(fromTime === "" || toTime === ""){
            setAlertText("From Time and To Time is required");
            setPopAlert(true);
        }

        console.log(weatherIcon);
    }

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    useEffect(() => {
        setDate(props.date);
    }, [props.date])

    return(
        <Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {`Reminder for ${moment(date).format('DD-MM-YYYY')}`}
                </DialogTitle>
                <DialogContent>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            value={title}
                            onChange={(e:any) => setTitle(e.target.value)}
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            margin="dense"
                            id="name"
                            label="City"
                            type="text"
                            value={city}
                            onChange={(e:any) => setCity(e.target.value)}
                            onBlur={(e:any) => handleUnfocus(e)}
                            fullWidth
                            variant="standard"
                        />

                        <div>
                            <TextField
                                id="time"
                                label="From"
                                type="time"
                                defaultValue={fromTime}
                                InputLabelProps={{
                                shrink: true
                                }}
                                inputProps={{
                                step: 300 // 5 min
                                }}
                                sx={{ width: 150 }}
                                onChange={handleChangeFromTime}
                            />

                            <TextField
                                id="time"
                                label="To"
                                type="time"
                                defaultValue={toTime}
                                InputLabelProps={{
                                shrink: true
                                }}
                                style={{ marginLeft: "10px" }}
                                inputProps={{
                                step: 300 // 5 min
                                }}
                                sx={{ width: 150 }}
                                onChange={handleChangeToTime}
                            />
                        </div>

                        { forecast !== "" && weatherIcon !== "" ? (
                            <div>
                                <p>{forecast}</p>
                                { weatherIcon !== "" ? (<img src={require(`../assets/icons/${weatherIcon}.svg`)} key={weatherIcon} width="50" height="50" />) : "" }
                            </div>
                            )  : ""
                        }
                    </Stack>        
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddReminder}>Add</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={popAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default ReminderDialog;