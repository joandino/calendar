import React, { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addReminderAction, editReminderAction, deleteReminderAction } from '../actions/reminderActions';
import { RootState } from '../reducers';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReminderDialog = (props:any) => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    
    const [popAlert, setPopAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const [date, setDate] = useState(props.data.date);
    const [title, setTitle] = useState(props.data.title);
    const [city, setCity] = useState(props.data.city);
    const [fromTime, setFromTime] = useState(props.data.fromTime);
    const [toTime, setToTime] = useState(props.data.toTime);

    const [weatherIcon, setWeatherIcon] = useState("");
    const [forecast, setForecast] = useState("");

    const dispatch = useDispatch();
    const addReminder = (reminder:any) => dispatch(addReminderAction(reminder));
    const editReminder = (reminder:any) => dispatch(editReminderAction(reminder));
    const deleteReminder = (id:any) => dispatch(deleteReminderAction(id));

    const reminderState:any = useSelector((state: RootState) => {
        return state.reminders;
    });

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

    const handleCloseConfirmation = () => {
        setConfirmOpen(false);
    }

    const handleDelete = () => {
        let id = props.data.id;

        deleteReminder(id);
        setOpen(false);
        setConfirmOpen(false);
        props.handleClose();
    }

    const handleCheckWeather = () => {
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
            setWeatherIcon("");
            setForecast("");
        })
    }

    const handleSaveReminder = () => {
        if(title.trim() === ""){
            setAlertText("Title is required");
            setPopAlert(true);
            return;
        } else if(city.trim() === ""){
            setAlertText("City is required");
            setPopAlert(true);
            return;
        } else if(fromTime === "" || toTime === ""){
            setAlertText("From Time and To Time is required");
            setPopAlert(true);
            return;
        }

        let id = 0;
        let day = moment(date).startOf("day").format('D');
        let monthNumber = moment(date).startOf("month").format('M');
        let year = moment(date).startOf("year").format('YYYY');

        let dateCode = Number(`${year}${monthNumber}${day}`);
        let ipAddress = props.data.ipAddress;

        if(props.data.action === "ADD"){
            addReminder({
                id,
                dateCode,
                title,
                fromTime,
                toTime,
                city,
                ipAddress
            })

            setWeatherIcon("");
            setForecast("");

            props.handleAddReminder();
        }else {
            const edit = reminderState.reminderEdit;
            editReminder({
                id: edit.id,
                dateCode: edit.dateCode,
                title,
                fromTime,
                toTime,
                city,
                ipAddress
            })

            setWeatherIcon("");
            setForecast("");

            props.handleAddReminder();
        }
    }

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    useEffect(() => {
        setTitle(props.data.title);
        setCity(props.data.city);
        setFromTime(props.data.fromTime);
        setToTime(props.data.toTime);

        setDate(props.data.date);
        setWeatherIcon("");
        setForecast("");
    }, [props.data]);

    return(
        <Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {`Reminder for ${moment(date).format('DD-MM-YYYY')}`}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} columns={10}>
                        <Grid item xs={10}>
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
                        </Grid>

                        {/* <Grid container spacing={2}> */}
                        <Grid item xs={4}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="City"
                                type="text"
                                value={city}
                                onChange={(e:any) => setCity(e.target.value)}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" onClick={handleCheckWeather}>Check weather for city</Button>
                        </Grid>
                        {/* </Grid> */}

                        <Grid item xs={5}>
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
                                sx={{ width: "100%" }}
                                onChange={handleChangeFromTime}
                            />
                        </Grid>

                        <Grid item xs={5}>
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
                                sx={{ width: "100%" }}
                                onChange={handleChangeToTime}
                            />
                        </Grid>

                        { forecast !== "" && weatherIcon !== "" ? (
                            <Grid item xs={10} style={{ textAlign: 'center' }}>
                                <p>{forecast}</p>
                                { weatherIcon !== "" ? (<img src={require(`../assets/icons/${weatherIcon}.svg`)} alt={weatherIcon} key={weatherIcon} width="50" height="50" />) : "" }
                            </Grid>
                            )  : ""
                        }
                    </Grid>        
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {props.data.action === "EDIT" ? <Button onClick={() => setConfirmOpen(true)}>Delete</Button> : ""}
                <Button onClick={handleSaveReminder}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={popAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>

            <Dialog open={confirmOpen} onClose={handleCloseConfirmation} maxWidth="xs" fullWidth>
            {/* <DialogTitle>Delete reminder</DialogTitle> */}
            <DialogContent>
                <Typography>Are you sure you want to delete this reminder?</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={() => setConfirmOpen(false)}>
                Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleDelete}>
                Confirm
                </Button>
            </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ReminderDialog;
