import React from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'

interface IFHomeBTN{
  onClick: ()=>void; //Function to call when button is clicked
}

export default function FHomeBTN(props: IFHomeBTN) {
  return (
    <div onClick={props.onClick} className="animate-fade-in transition hover:scale-125 hover:bg-my_white drop-shadow-self_small fixed top-[93vh] left-[96vw] z-[99] text-my_white bg-my_primary w-[5vh] aspect-square flex items-center place-content-center rounded-full group">
      <AiOutlineArrowUp className='w-full h-full scale-50 group-hover:fill-my_primary'/>
    </div>
  )
}
