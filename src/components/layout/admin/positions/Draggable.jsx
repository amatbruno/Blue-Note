import React from 'react';

export default function Draggable(props) {
  return (
    <article draggable='true' className='border rounded-xl cursor-pointer hover:border-black transition-all w-[120px] py-10 px-2'>
      <h1 className='text-center text-xl font-bold'>{props.voiceName}</h1>
      <p className='text-center'>{props.voiceColor}</p>
    </article>
  )
}
