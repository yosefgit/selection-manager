import React from 'react';

export default function List({entities, selectHandler}){
    return(
        <div className="list">
            <h3>List</h3>
            {entities.map((e,i) => {
                 return <div onClick={selectHandler} 
                            key={i} 
                            data-key={i} 
                            className={e.isSelected ? 'selected' : ''}>{e.value}</div>
            })}
        </div>
    )
}