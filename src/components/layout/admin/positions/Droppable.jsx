"use client";

import React, { useState } from 'react';

export default function Droppable() {

  const [droppedVoice, setDroppedVoice] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const voiceName = e.dataTransfer.getData('text/plain');
    setDroppedVoice(voiceName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const sendVoiceData = () => {
    //console.log(droppedVoice);
  }

  return (
    <div
      id={id}
      className='bg-gray-300 py-5 px-3 droppable'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children || <p className='transition-all text-center w-[100px] py-9 px-1'>Suelta una voz aquí</p>}
    </div>
  );
}
