import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Manage.css';
import io from 'socket.io-client';

/* Socket initialization */
const endpoint = 'https://vj-airbnb-react-app.herokuapp.com/';
const socket = io.connect(`${endpoint}`);

const Manage = () =>{

    // State variables
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [beds, setBeds] = useState('');
    const [url, setUrl] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    // Input object
    let inputs = {
        id: id,
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
            window.location.reload();
        };
    };

    function updateListing(){
        if(inputs.id === '' || inputs.id === undefined){
            alert("Id field is empty! Add Id of the listing to update it.");
        }else{
        socket.emit('updateListing', inputs);
        alert("Update submitted!");
        window.location.reload();
        }
    };

    function deleteListing(){
        if(id){
            if (window.confirm(`Are you sure you wan't to delete listing ${id}?`)){
                socket.emit('deleteListing', inputs);
                alert("Delete request sent to database.");
                window.location.reload();
            };
        };
    };

return(
    <div id='rootManageCont'>
        <div className='sidebarContainer' />
        <div className='manageContainer'>
            <h1>Manage Listings</h1>
            <Link to={'/'}>
                <button className='formButton'>Back to Homepage</button>
            </Link>

            <div className='formInfoCont'>
                <p className='formParagraph'><b>Add listing:</b> Fill all fields to submit an entry to database. Price and nro of beds should be written in numbers.</p>
                <p className='formParagraph'><b>Update listing:</b> Identify the field you want to update with Id. Fill the fields you want to update in order to update a listing. Leave other fields empty.</p>
                <p className='formParagraph'><b>Delete listing:</b> To delete a listing, write the Id of the listing.</p>
            </div>

            <input className='formInput' name='name' placeholder='Id...' onChange={(event) => setId(event.target.value)}/>
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