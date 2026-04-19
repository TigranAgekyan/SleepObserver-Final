import React from "react";
import FButton from "./FButton";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/icons/logo_dark.png";

//* Framer-Motion
import { AnimatePresence, motion, spring, useSpring } from "framer-motion";

interface ILogin {
  closePop: () => void;
}

export default function Login(props: ILogin) {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const onClick = async () => {
    //Get Users Input
    const mail = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //Check inputs
    if (isValidEmail(mail ? mail : "null")) {
      if (password && mail) {
        //Login User
        setShowLoading(true);
        const response = await fetch('/firebase/userLogin', {
          method: "POST",
          body: JSON.stringify({mail, password}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          response.text().then((val) => {
            if(val == 'auth/too-many-requests'){
              setErrorMessage("Too Many Requests. Please wait a few minutes before trying again.");
            }else if(val == 'auth/invalid-credential'){
              setErrorMessage("Invalid Credentials");
            }else{
              localStorage.setItem('userId', val);
              navigate('/dashboard');
            }
          })
        });
      } else {
        setErrorMessage("Please Enter Password");
      }
    } else {
      setErrorMessage("Invalid Email");
    }
    setShowLoading(false);
  };

  return (
    <motion.div
      initial={{opacity: 0, translateY: -128}}
      animate={{opacity: 1, translateY: 0}}
      exit={{opacity: 0}}
      key="modal"
      className="w-screen h-screen fixed flex items-center place-content-center bg-black bg-opacity-25 backdrop-blur-sm z-20">
        <div className="w-[25%] h-fit bg-my_white rounded-t-xl flex flex-col items-center z-30 drop-shadow-self_small">
          <div className="w-full h-full flex flex-col items-center place-content-center">
            <img alt="Logo" src={Logo} className="w-[75%]" /> {/* Logo */}
            {errorMessage ? (
              <p className="text-red-600 pb-4">{errorMessage}</p>
            ) : (
              <></>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClick();
              }}
              className="flex flex-col h-[16%] justify-between place-content-center items-center"
            >
              {" "}
              {/* Input fields container */}
              <input
                ref={emailRef}
                className="resize-none placeholder:uppercase outline-none drop-shadow-md p-1 mb-1 rounded-md"
                placeholder="E-Mail / Device ID"
              />
              <input
                type="password"
                ref={passwordRef}
                className="resize-none placeholder:uppercase outline-none drop-shadow-md p-1 mt-1 rounded-md"
                placeholder="Password"
              />
              {
                showLoading ? 
                <motion.div className="mt-6 w-[4vw] aspect-square bg-my_primary"
                  animate={{
                    rotate: [0, 90],
                    borderRadius: ['5%', '20%']
                  }}
                  transition={{repeat: Infinity, repeatType: 'mirror', repeatDelay: 0, duration: .5, type: 'spring', stiffness: 200}}
                />
                :
                <button
                  type="submit"
                  className="text-my_white text-xl font-light uppercase min-w-[84px] text-center bg-my_primary w-fit p-2 rounded-md my-6 select-none transition duration-100 hover:scale-110 hover:drop-shadow-self_small"
                >Login</button>
              }
            </form>
            {/* <FButton onClick={onClick} label='Log-in' dark shadow/> Log-In button */}
            <p>Don't have an account?</p>
            <p className="text-my_primary hover:drop-shadow hover:scale-110 transition" onClick={() => navigate('/signup')}>Create an account</p>
            {/* Forgot Password? button */}
          </div>
          <div
            onClick={props.closePop}
            className="uppercase transition hover:bg-my_primary hover:text-white w-full p-2 flex items-center place-content-center bg-white rounded-b-xl drop-shadow-[0px_0px_8px_rgba(0,0,0,0.25)] translate-y-4"
          >
            Close
          </div>{" "}
          {/* Button to close the pop-up */}
        </div>
      </motion.div>
  );
}
