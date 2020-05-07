import React from 'react';
import {Link} from 'react-router-dom';
import './Frontpage.css';
import io from 'socket.io-client';

/*Import components*/
import Searchbar from './Searchbar/Searchbar';
import ResultContainer from './ResultContainer/ResultContainer';

/*Socket initialization*/
const endpoint = 'http://localhost:5000';
const socket = io.connect(`${endpoint}`);

const Frontpage = () =>(
    <div className='container'>
        <h1>Airbnb Listing DB</h1>
        <Link to={'/manage'}>
            <button>Manage listings</button>
        </Link>
        <Searchbar socket={socket}/>
        <ResultContainer socket={socket} />
    </div>
);

export default Frontpage;