import React from 'react'
import {motion} from 'framer-motion'
import Lottie from 'lottie-react'
import LottieGuarantee from '../assets/animations/guarantee.json'
import LottieSafety from '../assets/animations/safety.json'
import LottieSupport from '../assets/animations/support.json'
interface Props {
    type: "support" | "guarantee" | "safety",
    reverse?: boolean
}

function FPromise(props: Props) {
    
    let lottieAnimation;
    let contentText;
    let headerText;

    const headerDuration = 1.5;
    const contentDuration = 1.5;
    const headerDelay = .25;
    const contentDelay = .5;

    if(props.type == "support"){
        lottieAnimation = LottieSupport
        headerText = "We’re here for you"
        contentText = "At SleepObserver, we offer 24/7 support services for you. Our dedicated team is here to assist with any questions or issues, ensuring your peace of mind and satisfaction."

    }else if(props.type == "guarantee"){
        lottieAnimation = LottieGuarantee
        headerText = "One year guarantee"
        contentText = "At SleepObserver, we stand behind our products and services with a one-year guarantee, demonstrating our confidence in their quality and performance. If you ever encounter issues, our dedicated support team is here to assist. Your trust and satisfaction are our top priorities, ensuring a worry-free experience."

    }else{
        lottieAnimation = LottieSafety
        headerText = "Your data is safe"
        contentText = "At SleepObserver, your privacy is paramount. We're dedicated to protecting your data, employing industry-standard security measures to keep it confidential. Your trust is invaluable, and we're committed to upholding your privacy throughout your experience on our platform."

    }

    return (
        props.reverse ? 
        <div className='w-screen h-full items-center px-16 py-8 grid grid-cols-2 justify-items-center'>
            <motion.div initial={{opacity: 0, translateY: -32}} whileInView={{opacity: 1, translateY: 0}} viewport={{once: true}} transition={{delay: .5, duration: 1}} className='w-full h-full flex place-content-center'>
                <Lottie animationData={lottieAnimation} className='w-[50%]'/>
            </motion.div>
            <div className='w-full'>
                <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: headerDuration, delay: headerDelay}} className='header-text'>{headerText}</motion.span><br/>
                <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: contentDuration, delay: contentDelay}} className='content-text'>{contentText}</motion.span>
            </div>
        </div>
        :
        <div className='w-screen h-full items-center px-16 py-8 grid grid-cols-2 justify-items-center'>
            <div className='w-full'>
                <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: headerDuration, delay: headerDelay}} className='header-text'>{headerText}</motion.span><br/>
                <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: contentDuration, delay: contentDelay}} className='content-text'>{contentText}</motion.span>
            </div>
            <motion.div initial={{opacity: 0, translateY: -32}} whileInView={{opacity: 1, translateY: 0}} viewport={{once: true}} transition={{delay: contentDelay, duration: contentDuration}} className='w-full h-full flex place-content-center'>
                <Lottie animationData={lottieAnimation} className='w-[50%]'/>
            </motion.div>
        </div>
    )
}

export default FPromise
