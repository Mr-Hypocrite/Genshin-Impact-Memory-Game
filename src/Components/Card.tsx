import React from 'react'

export default function Card(props:any) {

  const handleClick = () => {
    props.handleClick(props.char, props.index);
  }
  
  return (
    <div id={props.char + props.index} className={props.flipped ? 'img-bg flipped' : 'img-bg'}>

        <img
          className='char-imgs'
          src={`./images/chars/` + props.char + `.png`}
          alt={props.char}
        />

        <img
          onClick={handleClick} 
          className='card-back'
          src={`./images/easy/Genshin-Impact-Logo.jpg`}
          alt="card-back"
        />
    </div>
  )
}
