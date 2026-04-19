import React from 'react'

//* Framer-Motion
import {motion} from 'framer-motion'

interface IFButton{
  onClick: () => void; //Function to call when button is clicked
  label?: string; //Text inside the button
  dark?: Boolean; //Theme of the button
  shadow?: Boolean; //Show/Hide Shadow behind the button
}


export default function FButton(props: IFButton) {
  return (
    <motion.div
    initial={{scale: 0}}
    whileInView={{scale: 1}}
    viewport={{once: true}}
    transition={{delay: 1}}
    className="bg-cyan-800 p-2 rounded-md text-cyan-100 font-light w-fit h-fit"
    onClick={props.onClick}
    >
      <motion.p
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true}}
      transition={{delay: .75}}
      id="learnMore-button"
      className=' '
      >
        {
          props.label ? props.label:'Learn More!' //If a label is provided, set it as the label of the button. If not, default to "Learn More!"
        }
      </motion.p>
    </motion.div>
  )
}
