import React from "react";
//* Components
import WatchDisplay from "../components/WatchDisplay";
import FButton from "../components/FButton";
import Login from "../components/Login";
import FHomeBTN from "../components/FHomeBTN";

//* Navigation
import { useNavigate } from "react-router-dom";

//* Framer-Motion
import { easeInOut, motion, AnimatePresence, easeOut } from "framer-motion";

//*RESEND
import {Resend} from 'resend';

//* Lottie Animations
import Lottie from "lottie-react";

//* Assets
import Logo from "../assets/images/icons/Logo.svg";
import WatchPreview from "../assets/images/watchSteps/Orbit__3.png";
import FPromise from "../components/FPromise";
import questionMark from "../assets/images/icons/q_mark.png";

export default function Home() {
  const [loginPop, setLoginPop] = React.useState<boolean>(false); //State of the login pop-up
  const [showHome, setShowHome] = React.useState<boolean>(false); //State of the the little arrow at the bottom
  const [show3D, setShow3D] = React.useState<boolean>(false); //State of the watch preview
  const [aboutOpen, setAboutOpen] = React.useState<boolean>(false);

  //References to Contact information input fields
  const contactNameRef = React.useRef<HTMLInputElement>(null);
  const contactMailRef = React.useRef<HTMLInputElement>(null);
  const contactMessageRef = React.useRef<HTMLTextAreaElement>(null);


  const aboutVariants = {
    open: { height: "50vh" },
    closed: { height: "15vh" },
  };

  const navigate = useNavigate();

  //Check if user is already logged in
  const checkLoginStatus = () => {
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("userId") !== "userNotFound"
    ) {
      navigate("/dashboard");
    } else {
      setLoginPop(true);
    }
  };

  //Function to scroll to specific elements on the page
  const scrollTo = (element_id: string) => {
    const element = document.getElementById(element_id); //Reference to the element
    element?.scrollIntoView({ behavior: "smooth" }); //Scrolling until the element is in users view
  };

  //Show/Hide the 'scroll to top' button
  React.useEffect(() => {
    //If the user scrolled below 400, show the button. Otherwise hide the button.
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setShowHome(true);
      } else {
        setShowHome(false);
      }
    };

    document.addEventListener("scroll", handleScroll); //Add a listener to the scrolling of the user

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }; //Clean up when the component unmounts
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const sendContactMessage = async () => {
    const mail = contactMailRef.current?.value
    const name = contactNameRef.current?.value
    const message = contactMessageRef.current?.value

    if(mail && name && message){ //Check if all fields exist
      if(isValidEmail(mail)){ //Check is email is valid
        //TODO Save Ticket Data to Firestore
      }
    }
  }

  return (
    <>
      {
        showHome ? (
          <FHomeBTN
            onClick={() => {
              scrollTo("landing");
            }}
          />
        ) : (
          <></>
        ) //Show/Hide the button
      }

      <div id="page-container" className="font-inter select-none">
        {/*Main Div*/}

        <AnimatePresence>
          {
            loginPop && (
              <Login closePop={() => setLoginPop(false)} />
            )
          }
        </AnimatePresence>

        <div
          id="landing&guarantee"
          className="w-screen bg-gradient-to-b from-my_BG_dark to-my_BG_light"
        >
          {/*Landing Page and Guarantee section*/}

          <div id="landing" className="w-screen h-[100vh]">
            {/*Guarantee Section*/}
            <div
              id="header"
              className="w-screen h-[8vh] p-2 flex flex-row items-center justify-between"
            >
              {" "}
              {/*Top Navigation Bar*/}
              <motion.img
                initial={{opacity: 0, translateY: -32}}
                animate={{opacity: 1, translateY: 0}}
                alt="Logo"
                src={Logo}
                className="h-full fill-my_white hover:drop-shadow-glow transition-all duration-100"
                id="logo"
              />{" "}
              {/* Logo */}
              <div
                id="header_buttons"
                className="h-full w-fit flex flex-row items-center z-10"
              >
                {" "}
                {/* Navigation bar buttons */}
                <motion.p
                  initial={{opacity: 0, translateY: -32}}
                  animate={{opacity: 1, translateY: 0}}
                  transition={{delay: .1}}
                  onClick={() => {
                    checkLoginStatus();
                  }}
                  className="dash-button"
                >
                  Dashboard
                </motion.p>
                <motion.p
                  initial={{opacity: 0, translateY: -32}}
                  animate={{opacity: 1, translateY: 0}}
                  transition={{delay: .2}}
                  onClick={() => {
                    scrollTo("about");
                  }}
                  className="dash-button"
                >
                  About
                </motion.p>
                <motion.p
                  initial={{opacity: 0, translateY: -32}}
                  animate={{opacity: 1, translateY: 0}}
                  transition={{delay: .3}}
                  onClick={() => {
                    scrollTo("products");
                  }}
                  className="dash-button"
                >
                  Products
                </motion.p>
                <motion.p
                  initial={{opacity: 0, translateY: -32}}
                  animate={{opacity: 1, translateY: 0}}
                  transition={{delay: .4}}
                  onClick={() => {
                    scrollTo("contact");
                  }}
                  className="dash-button"
                >
                  Contact
                </motion.p>
              </div>
            </div>

            <div
              id="main-content"
              className="w-screen h-full flex flex-row items-center p-16 justify-between"
            >
              {" "}
              {/*Texts, Button and Watch*/}
              <div id="text" className="flex flex-col">
                {" "}
                {/*Texts and the button*/}

                <motion.p 
                initial={{opacity: 0, translateY: -32}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 1}}
                className="header-text">
                  Getting to know yourself is important.
                  <br />
                  Why not start with your sleep?
                </motion.p>

                <motion.p
                initial={{opacity: 0, translateY: -32}}
                animate={{opacity: 1, translateY: 0}}
                transition={{duration: 1, delay: .25}}
                className="content-text my-4">
                  SleepObserver gathers different data about your body while you
                  sleep, giving you insightful information about your overall
                  sleep, and even your sleep cycles. That's more than any other
                  watch.
                </motion.p>

                <FButton
                  onClick={() => {
                    scrollTo("about");
                  }}
                />{" "}
                {/* Scrolls down to the 'about' section when clicked */}
              </div>

              <div
              id="watch-container"
              className="h-full aspect-square">
                {/*3D Canvas with the watch*/}
                <AnimatePresence>
                  {show3D && (<WatchDisplay/>)}
                  {!show3D && (
                  <motion.div
                  initial={{opacity: 0, translateY: -32}}
                  animate={{opacity: 1, translateY: 0}}
                  exit={{opacity: 0}}
                  transition={{duration: .5}}
                  key={'flat-watch-display'}
                  className="flex flex-col place-content-center items-center">
                    <img src={WatchPreview} className="w-[90%]" />
                    <div
                      className="text-white font-light hover:drop-shadow-glow transition-all duration-150"
                      onClick={() => setShow3D(true)}
                    >
                      Show in 3D
                    </div>
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div
            id="promises"
            className="w-screen grid grid-flow-col grid-rows-3 gap-8 py-16"
          >
            {" "}
            {/* Div for the Guarantee section */}
            <FPromise type="guarantee" />
            <FPromise type="support" reverse />
            <FPromise type="safety" />
          </div>
        </div>

        <motion.div
          animate={aboutOpen ? "open" : "closed"}
          variants={aboutVariants}
          transition={{ duration: 0.5, ease: easeInOut }}
          id="about"
          className="bg-gradient-to-r from-zinc-950 to-zinc-800 w-screen flex flex-col place-content-center items-center drop-shadow-self overflow-clip py-4"
        >
          {" "}
          {/* Div for the About section */}
          <motion.p
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 1}}
          viewport={{once: true}}
          className="header-text mb-4">About Us</motion.p>
          <AnimatePresence>
            {aboutOpen && (
              <div
                id="content"
                className="w-full h-full flex flex-row items-center place-content-center z-10"
              >
                {" "}
                {/* Content of the section */}
                <motion.iframe
                  initial={{ opacity: 0, translateY: -32 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -32 }}
                  transition={{ delay: 0.2 }}
                  key="iframeKey"
                  title="Video"
                  allowFullScreen
                  src="https://www.youtube.com/embed/RQDWlb15yyE"
                  className="aspect-video rounded-2xl drop-shadow-[0px_0px_16px_rgba(0,0,0,0.5)]"
                />{" "}
                {/* Embedded SleepObserver reveal trailer */}
                <div
                  id="text"
                  className="h-full w-[40%] flex flex-col place-content-center items-start ml-8"
                >
                  {" "}
                  {/* The text that's next to the video */}
                  <motion.p
                    initial={{ opacity: 0, translateY: -32 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -32 }}
                    transition={{ delay: 0.1 }}
                    className="content-text"
                  >
                    At SleepObserver, we're on a mission to improve your sleep.
                    We started with a simple yet powerful idea: a watch that
                    tracks your sleep patterns. Understanding your sleep is key
                    to better rest, and our innovative technology provides
                    valuable insights. We're dedicated to making your nights
                    restful and your days productive. Join us on this journey to
                    a brighter tomorrow
                  </motion.p>
                </div>
              </div>
            )}
          </AnimatePresence>
          <motion.div
            animate={aboutOpen ? "open" : "closed"}
            variants={{
              open: { borderRadius: 99, height: "32px", width: "32px" },
              closed: { borderRadius: 4, height: "16px", width: "64px" },
            }}
            onClick={() => setAboutOpen(!aboutOpen)}
            className="bg-white z-10"
          />
        </motion.div>

        <div id="products&contact" className="w-screen">
          {" "}
          {/* Div for the Products and Contact Us sections */}
          <div
            id="products"
            className="w-screen h-[75%] bg-gradient-to-b from-my_BG_light to-my_BG_dark pt-16 grid grid-flow-col grid-rows-2 gap-16"
          >
            {" "}
            {/* Products section div */}
            <div
              id="product_watch"
              className="w-full  flex flex-row items-center place-content-center justify-between px-16"
            >
              {" "}
              {/* About the Watch */}
              <div
                id="text"
                className="w-[50%] h-full flex flex-col items-start place-content-center"
              >
                {" "}
                {/* Text Container */}
                <motion.div
                initial={{opacity: 0, translateX: 64}}
                whileInView={{opacity: 1, translateX: 0}}
                transition={{delay: .25, duration: 1}}
                viewport={{once: true}}
                id="header">
                  {" "}
                  {/* Header Text */}
                  <p className="text-4xl text-my_white font font-medium">The</p>
                  <div className="flex flex-row">
                    <p className="text-4xl text-my_white font font-bold mr-2">
                      SleepObserver
                    </p>
                    <p className="text-4xl text-my_white font font-medium">
                      Watch
                    </p>
                  </div>
                </motion.div>
                <motion.div
                initial={{opacity: 0, translateX: 64}}
                whileInView={{opacity: 1, translateX: 0}}
                transition={{delay: .5, duration: 1}}
                viewport={{once: true}}
                id="content">
                  {" "}
                  {/* About the watch */}
                  <p className="content-text">
                    Introducing the SleepObserver watch, a sophisticated
                    wearable seamlessly merging style with advanced sleep
                    tracking technology. Beyond its elegant design, this
                    innovative timepiece employs state-of-the-art sensors to
                    meticulously monitor and analyze your sleep patterns,
                    offering precise insights into deep sleep, light sleep, REM
                    cycles, and overall sleep efficiency. With a user-friendly
                    interface and seamless app integration, the watch provides
                    real-time feedback and personalized recommendations,
                    empowering users to enhance their sleep hygiene. Lightweight
                    and durable, the SleepObserver watch is designed for comfort
                    throughout the day, ensuring you never compromise style for
                    functionality. Smart notifications and customizable alarms
                    add practicality, while the focus on holistic well-being
                    sets this watch apart, promising a restful and rejuvenating
                    sleep experience that seamlessly integrates into your daily
                    life. Elevate your awareness, embrace better sleep, and
                    awaken each day with renewed vitality—all at the touch of
                    your wrist.
                  </p>
                </motion.div>
                <FButton label="Buy" onClick={() => console.log("Clicked!")} />{" "}
                {/* Button to redirets the user to the page where they can start the purchase process for the watch */}
              </div>
              <div className="w-[50%] h-full flex place-content-center items-center">
                {" "}
                {/* Container for the image of the watch */}
                <motion.img
                initial={{opacity: 0, translateY: -64}}
                whileInView={{opacity: 1, translateY: 0}}
                transition={{duration: 1, delay: .25}}
                viewport={{once: true}}
                alt="Watch" src={WatchPreview} className="h-full" />{" "}
                {/* Image of the watch */}
              </div>
            </div>
            <div
              id="product_band"
              className="w-full  flex flex-row items-center place-content-center justify-between px-16"
            >
              {" "}
              {/* About the Band */}
              <div className="w-[50%] h-full flex place-content-center items-center">
                {" "}
                {/* Container for the image of the band */}
                <motion.img
                  initial={{opacity: 0, translateY: -64}}
                  whileInView={{opacity: 1, translateY: 0}}
                  transition={{duration: 1, delay: .25}}
                  viewport={{once: true}}
                  alt="Question Mark"
                  src={questionMark}
                  className="h-full"
                />{" "}
                {/* The image of the band (Haven't come up with the design yet, so it's a question mark for now)  */}
              </div>
              <div
                id="text"
                className="w-[50%] h-full flex flex-col items-start place-content-center"
              >
                {" "}
                {/* Text container */}
                <motion.div
                initial={{opacity: 0, translateX: 64}}
                whileInView={{opacity: 1, translateX: 0}}
                transition={{delay: .25, duration: 1}}
                viewport={{once: true}}
                id="header">
                  {" "}
                  {/* Header Text */}
                  <p className="text-4xl text-my_white font font-medium">The</p>
                  <div className="flex flex-row">
                    <p className="text-4xl text-my_white font font-bold mr-2">
                      SleepObserver
                    </p>
                    <p className="text-4xl text-my_white font font-medium">
                      Band
                    </p>
                  </div>
                </motion.div>
                <motion.div
                initial={{opacity: 0, translateX: 64}}
                whileInView={{opacity: 1, translateX: 0}}
                transition={{delay: .5, duration: 1}}
                viewport={{once: true}}
                id="content">
                  {" "}
                  {/* Text about the band */}
                  <p className="content-text">
                    Introducing the SleepObserver Band, a sleek and unobtrusive
                    companion designed to optimize your sleep and well-being.
                    This cutting-edge wearable effortlessly blends comfort and
                    functionality, featuring advanced sleep tracking technology
                    in a discreet wristband form. The SleepObserver Band employs
                    high-precision sensors to monitor and analyze your sleep
                    cycles, providing detailed insights into your deep sleep,
                    light sleep, REM cycles, and overall sleep efficiency.
                    Syncing seamlessly with a dedicated mobile app, the band
                    offers a user-friendly interface for real-time access to
                    your sleep metrics and personalized recommendations. Crafted
                    for comfort during extended wear, the SleepObserver Band
                    complements your lifestyle without sacrificing style. Stay
                    connected with smart notifications and wake up gently with
                    customizable alarms designed to align with your sleep
                    patterns. Prioritize your well-being with the SleepObserver
                    Band – a subtle yet powerful tool to enhance your sleep
                    quality and transform your daily life.
                  </p>
                </motion.div>
                <FButton label="Buy" onClick={() => console.log("Clicked!")} />{" "}
                {/* Buy button, same as for the watch */}
              </div>
            </div>
          </div>
          <div
            id="contact"
            className="w-screen h-[25%] flex flex-row items-center place-content-center bg-my_BG_dark py-32"
          >
            {" "}
            {/* Contact Us section */}
            <div
              id="text"
              className="w-[50%] h-full flex flex-col items-end place-content-center mx-4"
            >
              {" "}
              {/* Text container */}
              <div>
                <p className="header-text">Contact Us!</p>
                <p className="content-text">
                  We will answer you
                  <br />
                  shortly.
                </p>
              </div>
            </div>
            <div
              id="form"
              className="w-[50%] h-full flex flex-col items-start place-content-center mx-4"
            >
              {" "}
              {/* Container for the forms */}
              <form>
                <input placeholder="Name" className="input-field" ref={contactNameRef}/>{" "}
                {/* Name form */}
                <input placeholder="e-mail" className="input-field" ref={contactMailRef}/>{" "}
                {/* Mail form */}
                <textarea
                  placeholder="Message"
                  maxLength={256}
                  className="input-field w-[50%] h-[25%]"
                  ref={contactMessageRef}
                />{" "}
                {/* Content of the message */}
                <FButton label="Send!" onClick={() => sendContactMessage()} />{" "}
              </form>
              {/* Button that send the message to our support email when clicked */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
