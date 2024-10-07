import React, { useState } from 'react';

const Popups = ({ trigger, setTrigger, children }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner md:w-[600px] sm:[400px] w-[90%] h-[400px]">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          Close
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popups;
