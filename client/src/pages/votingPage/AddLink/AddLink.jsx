/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';

import './AddLink.css';


const AddLink = ({
  setUrl, sendUrl, url, input, handleSubmit, alSubmit,
}) => (
  <form className="AddLink" onSubmit={(e) => handleSubmit(e)}>

    <button className="alSubmit" type="submit" ref={alSubmit} onClick={(e) => sendUrl(e)}>
      <span className="material-icons">
        bookmark
      </span>
    </button>

    <input
      value={url}
      placeholder="Add Link"
      className="alInput"
      name="url"
      type="url"
      onChange={({ target: { value } }) => { setUrl(value); alSubmit.current.style.backgroundColor = '#FFD038'; }}
      onKeyPress={(event) => (event.key === 'Enter' ? sendUrl(event) : null)}
      ref={input}
    />
    <br />


  </form>
);

export default AddLink;
