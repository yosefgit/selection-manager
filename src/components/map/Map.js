import React from 'react';

export default function Map({entities, selectHandler}){
    return(
        <div className="map">
            <h3>Map</h3>
            {entities.map((entity,i) => {
                return <button onClick={(e) => selectHandler(e)} 
                               key={i} 
                               data-key={i} 
                               className={entity.isSelected ? 'selected' : ''}>{entity.value}</button>
            })}
        </div>
    )
}   