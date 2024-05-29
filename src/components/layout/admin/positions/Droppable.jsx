"use client";

import React from 'react';
import { useState } from 'react';

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
      id='droppable'
      className='bg-gray-300 py-5 px-3'
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      {droppedVoice ? <p className='border-2 border-black bg-white text-center rounded-xl cursor-pointer 
      transition-all w-[100px] py-12 px-1'>{droppedVoice}{sendVoiceData()}</p> : <p className='transition-all text-center w-[100px] py-9 px-1'>Suelta una voz aquí</p>}
    </div>
  )
}
