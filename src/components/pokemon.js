import React from 'react';

const Pokemon = ({data, onChange }) => {
  if (!data) {
    return (<span></span>);
  }
  return (
    <div className="p-card" key={data.number}>
      <input className="p-hidden-checkbox" type="checkbox" id={ data._id } onChange={(e)=>onChange(e.target.checked, data._id)}/>
      <label className="p-active-checkbox" htmlFor={ data._id }></label>
      <img className="p-icon" src={ data.thumbnailImage } alt={data.thumbnailAltTex} />
      <label className="p-name" htmlFor={ data._id }>{data.name}</label>
    </div>
  )
};


export default Pokemon;