import React from 'react'
import iconLogo from "../assets/images/icons/Logo.svg";
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

interface Props {}

function SignUp(props: Props) {

    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      };

    //Login User
    const onClick = async () => {
        setShowLoading(true);
        //Get Users Input
        const mail = emailRef.current?.value;
        const password = passwordRef.current?.value;

        //Check inputs
        if (isValidEmail(mail ? mail : "null")) {
        if (password && mail) {
            //Login User
            const response = await fetch('/firebase/userSignup', {
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
                navigate('/');
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
        <div className='bg-gradient-to-b from-my_BG_dark to-my_BG_light w-screen h-screen flex place-content-center items-center'>
            <div
                id="login-container"
                className="w-1/4 glass flex flex-col place-content-center items-center justify-between pt-8 pb-4 "
            >
                <img
                alt="Logo"
                src={iconLogo}
                className="w-[75%]"
                />{" "}
                {/* Logo */}
                {errorMessage ? (
                <p className="text-red-600 pb-4">{errorMessage}</p>
                ) : (
                <></>
                )}
                <form
                onSubmit={(e) => {
                e.preventDefault();
                onClick()
                }}
                className="grid grid-cols-1 grid-rows-3 gap-3 h-fit justify-between place-items-center text-my_white my-4">
                <input
                    ref={emailRef}
                    className="resize-none placeholder:uppercase outline-none drop-shadow-md p-2 mb-1 rounded-md glass text-sm"
                    placeholder="E-Mail / Device ID"
                />
                <input
                    type="password"
                    ref={passwordRef}
                    className="resize-none placeholder:uppercase outline-none drop-shadow-md p-2 rounded-md glass text-sm"
                    placeholder="Password"
                />
                {
                    showLoading ? 
                    <motion.div className="w-[4vw] aspect-square bg-my_primary"
                    animate={{
                        rotate: [0, 90],
                        borderRadius: ['5%', '20%']
                    }}
                    transition={{repeat: Infinity, repeatType: 'mirror', repeatDelay: 0, duration: .5, type: 'spring', stiffness: 200}}
                    />
                    :
                    <button type="submit" className="bg-my_primary text-cyan-100 w-fit h-fit text-xl py-1 px-4 rounded-md cursor-default hover:scale-110 transition-all">Create</button>
                }
                </form>
                {/* Forgot Password? button */}
            </div>
        </div>
    )
}

export default SignUp
