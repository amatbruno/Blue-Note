import React from 'react'

function userCard(props) {
  return (
    <article>
      <img src={props.img} alt={props.name} />
      <h1>{props.name}</h1>
      <h2>{props.type}</h2>
      <h3>{props.role}</h3>
    </article>
  )
}

export default userCard