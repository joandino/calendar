import React, { Fragment, useEffect, useState } from 'react';
import './assets/app.scss';
import Calendar from './components/Calendar';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [ip, setIp] = useState("");

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIp(res.data.IPv4)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider store={store}>
      {ip !== "" ? <Calendar clientIp={ip} /> : <></>}
    </Provider>
  );
}

export default App;
