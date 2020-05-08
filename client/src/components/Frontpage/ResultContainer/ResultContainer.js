import React, {useState, useEffect} from 'react';
import './ResultContainer.css';

const ResultContainer = ({socket}) =>{

  const [resultData, setResultData] = useState([]);

  /*Listen for events*/
  socket.on('queryResults', (results)=>{
    setResultData(results);
  });

  return(
    <div id='resultContainer'>
      {resultData.map((resultData)=>(
        <div className='listing'>
          <h2 className='listingTitle'>{resultData.name}</h2>
          <h4 className='listingSubtitle'>{resultData.city} - {resultData.country}</h4>
          <img className='listingImg' src={resultData.picture_url} alt='Image not found.'></img>
          <h4 className='listingSubtitle'>Beds: {resultData.beds} - Price: {resultData.price}$/night</h4>
          <p><b>Summary:</b> {resultData.summary}</p>
          <form action={resultData.url}>
            <input type='submit' value='Check listing' />
          </form>
        </div>
      ))}
    </div>
  );  
};

export default ResultContainer;