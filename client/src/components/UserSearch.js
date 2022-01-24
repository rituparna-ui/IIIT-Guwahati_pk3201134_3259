import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './userSearch.css';

const UserSearch = () => {
  const [location, setLocation] = useState('');
  const [resource, setResource] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [qty, setQty] = useState(0);

  const [buttonClick, setButtonClick] = useState(0);
  const getLocation = (location) => {
    var string = location;
    string = string.replace(/ /g, '+');
    console.log(string);
    axios
      .get(`https://geocode.xyz/${string}?json=1`)
      .then((res) => {
        console.log(res.data['latt']);
        setLatitude(res.data['latt']);
        setLongitude(res.data['longt']);
        setButtonClick(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = () => {
    console.log(resource, location, qty);

    getLocation(location);
  };
  const sendData = async () => {
    console.log(resource, qty);
    const res = await fetch('http://localhost:5000/userSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource,
        qty,
        latitude,
        longitude,
      }),
    });

    const response = await res.json();

    if (response.status(200)) {
      console.log(response);
    }
  };
  useEffect(() => {
    let data = {
      search: resource,
      quantity: qty,
      lat: latitude,
      long: longitude,
    };
    sendData();

    console.log(data, buttonClick);
  }, [buttonClick]);

  return (
    <>
      <Navbar></Navbar>
      <h1 className="heading">Heading</h1>
      <hr
        style={{
          width: '20%',
          backgroundColor: ' #F49F0A',
          borderWidth: '3px',
        }}
      ></hr>
      <div class="searchBar pt-3 d-flex flex-row justify-content-center align-items-center">
        <select
          className="inputBox"
          placeholder="search"
          onChange={(e) => setResource(e.target.value)}
        >
          <option>search resources</option>
          <option>blood</option>
          <option>oxygen cylinders</option>
          <option>beds</option>
        </select>
        <input
          onChange={(e) => setQty(e.target.value)}
          type="number"
          className="inputBox"
          placeholder="quantity"
        ></input>
        <input
          onChange={(e) => setLocation(e.target.value)}
          className="inputBox"
          placeholder="location"
        ></input>
        <button
          onClick={handleClick}
          className="inputBox buttonClass"
          type="submit"
        >
          submit{' '}
        </button>
      </div>
      <div>
        <div className="searchResult">
          <div
            className=" searchCard d-flex flex-row"
            style={{
              borderBottom: 'solid',
              borderBottomWidth: '1px',
              borderBottomColor: '#7D7B7B',
              width: '70%',
            }}
          >
            <div className="iconResult"></div>
            <div className="d-flex flex-column sectionDivide">
              <h3 className="searchName">AIR FORCE STATION MEDICARE CENTER</h3>
              <p className="textSearch">
                sahkaj aksdhkasd jasdlkjsad SMQ 812/4 NP area, AFS
                Lohegaon,Pune, Maharashtra
              </p>
            </div>
            <div class="sectionDivide ">
              <p className="textSearch " style={{ textAlign: 'center' }}>
                {' '}
                Quantity : 50
              </p>
            </div>
            <div class="sectionDivide ">
              <p className="textSearch " style={{ textAlign: 'right' }}>
                Contact no. : 9732492372
              </p>
            </div>
          </div>
          <div
            className=" searchCard d-flex flex-row"
            style={{
              borderBottom: 'solid',
              borderBottomWidth: '1px',
              borderBottomColor: '#7D7B7B',
              paddingTop: '20px',
              width: '70%',
            }}
          >
            <div className="iconResult"></div>
            <div className="d-flex flex-column sectionDivide">
              <h3 className="searchName">AIR FORCE STATION MEDICARE CENTER</h3>
              <p className="textSearch">
                SMQ 812/4 NP area, AFS Lohegaon,Pune, Maharashtra
              </p>
            </div>
            <div class="sectionDivide ">
              <p className="textSearch " style={{ textAlign: 'center' }}>
                {' '}
                Quantity : 50
              </p>
            </div>
            <div class="sectionDivide ">
              <p className="textSearch " style={{ textAlign: 'right' }}>
                Contact no. : 9732492372
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*<h1 class='pt-5 text-center'>User Search</h1>
        <input onChange={e=>setLocation(e.target.value)}></input>
    <button onClick={handleClick}>submit</button>*/}
    </>
  );
};

export default UserSearch;
