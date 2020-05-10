import React from 'react';
import {Link} from 'react-router-dom';
import './Frontpage.css';
import io from 'socket.io-client';

/*Import components*/
import Searchbar from './Searchbar/Searchbar';
import ResultContainer from './ResultContainer/ResultContainer';

/*Socket initialization*/
const endpoint = 'https://vj-airbnb-reactgui.herokuapp.com/';
const socket = io.connect(`${endpoint}`);

const Frontpage = () =>(
    <div id='rootFpCont'>
        <div className='sidebarContainer'></div>
        <div className='fpContainer'>
            <h1 className='pageTitle'>Airbnb Listing DB</h1>
            <h3 className='pageSubtitle'>Search the Airbnb Listing Database efficiently with real-time searches</h3>
            <p className='fpParagraph'>Search through Airbnb listings and see the results of your searches as you type, no refreshing or submitting required. Manage the database by adding, updating and deleting listings in the Manage-page.</p>
            <Link to={'/manage'}>
                <button className='fpButton'>Manage listings</button>
            </Link>
            <Searchbar socket={socket}/>
            <ResultContainer socket={socket} />
        </div>
        <div className='sidebarContainer'></div>
    </div>
);

export default Frontpage;