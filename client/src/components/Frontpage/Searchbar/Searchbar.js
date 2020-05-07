import React, {useState, useEffect} from 'react';
import './Searchbar.css';

const Searchbar = ({socket}) =>{

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [nroOfBeds, setNroOfBeds] = useState('');
    const [price, setPrice] = useState('');

    // Using Effect hook to continuously update and query results when search field values are changed
    useEffect(()=>{
        sendQueryData();
    });

    /*Functions*/

    // Function for sending query variables to server
    function sendQueryData(){
        let data = {
            name: name,
            city: city,
            country: country,
            nroOfBeds: nroOfBeds,
            price: price
        };

        socket.emit('queryData', data);
        console.log(socket.id);
    };

    return(
        <div className='sbContainer'>
            <input placeholder='Name...' id='inputName' onChange={(event) => setName(event.target.value)} />
            <input placeholder='City...' id='inputCity' onChange={(event) => setCity(event.target.value)} />
            <input placeholder='Country...' id='inputCountry' onChange={(event) => setCountry(event.target.value)} />
            <input placeholder='Nro of beds...' type ='number' id='inputBeds' onChange={(event) => setNroOfBeds(event.target.value)} />
            <input placeholder='Price cap ($)...' type ='number' id='inputPrice' onChange={(event) => setPrice(event.target.value)} />
        </div>
    );
};

export default Searchbar;
