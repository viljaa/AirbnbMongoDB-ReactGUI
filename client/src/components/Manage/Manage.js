import React, {useState} from 'react';
import './Manage.css';
import io from 'socket.io-client';

/* Socket initialization */
const endpoint = 'https://vj-airbnb-reactgui.herokuapp.com/';
const socket = io.connect(`${endpoint}`);

const Manage = () =>{

    // State variables
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [beds, setBeds] = useState('');
    const [url, setUrl] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    let inputs = {
        name: name,
        city: city,
        country: country,
        price: price,
        beds: beds,
        url: url,
        picture_url: pictureUrl
    }

    // Functions

    /* Function for adding a listing to database */
    function addListing(){
        let valid = false;
        // Check empty fields
        for(let i in inputs){
            if(inputs[i] === ''){
                alert("Error, can't submit empty fields. Check the inputs of the fields!");
                valid = false;
                break;
            };
            valid = true;
        };
        // Emit event if all fields are valid
        if(valid==true){
            socket.emit('addListing', inputs);
            alert("Listing submitted.");
            window.location.reload(false);
        };
    };

    function updateListing(){
    };

    function deleteListing(){
    };

return(
    <div id='rootManageCont'>
        <div className='sidebarContainer' />
        <div className='manageContainer'>
            <h1>Manage Listings</h1>
                <input className='formInput' name='name' placeholder='Name...' onChange={(event) => setName(event.target.value)}/>
                <input className='formInput' name='city' placeholder='City...' onChange={(event) => setCity(event.target.value)}/>
                <input className='formInput' name='country' placeholder='Country...' onChange={(event) => setCountry(event.target.value)}/>
                <input className='formInput' name='price' placeholder='Price ($)...' onChange={(event) => setPrice(event.target.value)}/>
                <input className='formInput' name='beds' placeholder='Nro of beds...' onChange={(event) => setBeds(event.target.value)}/>
                <input className='formInput' name='url' placeholder='Listing url...' onChange={(event) => setUrl(event.target.value)}/>
                <input className='formInput' name='picture_url' placeholder='Picture url...' onChange={(event) => setPictureUrl(event.target.value)}/>
                <div id='formBtnCont'>
                    <button className='formButton' onClick={addListing}>Add listing</button>
                    <button className='formButton' onClick={updateListing}>Update listing</button>
                    <button className='formButton' onClick={deleteListing}>Delete listing</button>
                </div>
        </div>
        <div className='sidebarContainer' />
    </div>
)};

export default Manage;