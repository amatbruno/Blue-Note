"use client";

import React from 'react';

export default function Draggable({ voiceName, voiceColor, handleDragStart }) {
  return (
    <article
      id='draggable'
      onDragStart={handleDragStart}
      draggable='true'
      className='border rounded-xl cursor-pointer 
        hover:border-black transition-all w-[120px] py-10 px-2 draggable'
      style={{ backgroundColor: voiceColor }}
    >
      <h1 className='text-center text-xl font-bold'>{voiceName}</h1>
    </article>
  );
}
