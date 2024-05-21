"use client";

import React, { useState } from 'react';

export default function Droppable({ id, handleDrop, handleDragOver, children }) {
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
