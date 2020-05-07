import React, {useState, useEffect} from 'react';
import './ResultContainer.css';

const ResultContainer = ({socket}) =>{

  /*Listen for events*/
  socket.on('queryResults', (results)=>{
  console.log(results);
  // After receiving matches, parse data in their own elements
  
});

  return(
    <div id='resultContainer'>
      
    </div>
  );  
};

export default ResultContainer;