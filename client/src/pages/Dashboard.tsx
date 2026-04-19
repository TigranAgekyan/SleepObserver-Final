import React from "react";

//* Navigation
import { useNavigate } from "react-router-dom";

//* Framer-Motion
import { motion } from "framer-motion";

//* Custom components
import FButton from "../components/FButton";
import DashPie from "../components/DashPie";
import FDashTab from "../components/FDashTab";
import FCycleDashBarChart from "../components/FCycleDashBarChart";

//* Assets
import iconLogout from "../assets/images/icons/logout.svg";
import iconDashboard from "../assets/images/icons/dashboard.svg";
import iconSettings from "../assets/images/icons/settings.svg";
import iconLogo from "../assets/images/icons/Logo.svg";
import iconLogoEye from "../assets/images/icons/logo_eye.png"
import { JsonObjectExpression } from "typescript";
import FBPMDashBarChart from "../components/FBPMDashBarChart";

interface IDashboard {}

interface CalculatedDataInterface{
  bpm: number[],
  cycleData: {
    cycleTime: string[],
    cycleTotals: {
      n1: number,
      n2: number,
      n3: number,
      rem: number
    },
    cycles: string[]
  },
  duration: {
    hours: number,
    minutes: number
  },
  sleepQuality: number,
  timeStamps: string[]
}

function Dashboard(props: IDashboard) {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [showToolTip, setShowToolTip] = React.useState<boolean>(false);
  const [toolTipLabel, settoolTipLabel] = React.useState<string>("Tool Tip");
  const [fullName, setFullName] = React.useState<string>('...');
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const uid = localStorage.getItem("userId");
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [calculatedData, setCalculatedData] = React.useState<CalculatedDataInterface | undefined>(undefined); 

  //Call on page Load/Reload
  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    }
  }, []);

  const loadCalculatedData = async () => {
    await fetch('http://localhost:9000/firebase/getCalculatedData', {
      method: "POST",
      body: JSON.stringify({uid}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      response.text().then((data) => {
        const finalData = JSON.parse(data);
        console.log(finalData);
        setCalculatedData(finalData);
      })
    });
  }

  const handleMouseMove = (event: MouseEvent) => {
    const posX = event.clientX;
    const posY = event.clientY;
    setMousePosition({ x: posX, y: posY });
  };

  React.useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", handleMouseMove);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  //Logout User
  const logoutUser = async () => {
    await fetch('http://localhost:9000/firebase/userLogout', {
      method: "GET",
    }).then(() => {
      localStorage.removeItem('userId');
      navigate('/');
    }).catch((err) => {
      console.log(err);
    });
  }

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
        const response = await fetch('http://localhost:9000/firebase/userLogin', {
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
              window.location.reload();
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

  //Function to load the users name at the bottom left corner
  const loadName = async () => {
    if (uid) {
      await fetch("http://localhost:9000/firebase/getUserInfo",
      {
        method: "POST",
        body: JSON.stringify({uid}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        response.text().then((val) => {
          let data: {firstName: string, lastName: string} = JSON.parse(val);
          setFullName(data.firstName + " " + data.lastName);
        })
      });
    }
  };

  //Returns HTML of the dashboard page, in case the user is logged in
  const loadDashboard = () => {
    return (
      <>
        {showToolTip && (
          <span
            id="tool-tip"
            className={`z-[999] absolute text-white font-light -translate-x-1/2 -translate-y-[200%]`}
            style={{ left: mousePosition.x, top: mousePosition.y }}
          >
            {toolTipLabel}
          </span>
        )}
        <div
          id="container"
          className="select-none z-1 w-screen absolute h-screen flex flex-col items-center place-content-center"
        >
          <motion.div
            initial={{ opacity: 0, translateY: 64 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.5 }}
            onAnimationComplete={() => loadCalculatedData()}
            id="info-tabs"
            className=" w-screen h-[25vh] flex flex-row justify-between py-8 px-16"
          >
            <FDashTab title="Sleep Duration" value={
              calculatedData ? 
              calculatedData.duration.hours+' h '+calculatedData.duration.minutes+' m'
              :
              '...'} />
            <FDashTab title="Sleep Quality" value={
              calculatedData ? 
              calculatedData.sleepQuality+'/10'
              :
              '...'} />
            <FDashTab title="Total N1 Sleep" value={calculatedData ? 
              calculatedData.cycleData.cycleTotals.n1+' h'
              :
              '...'} />
            <FDashTab title="Total N2 Sleep" value={calculatedData ? 
              calculatedData.cycleData.cycleTotals.n2+' h'
              :
              '...'} />
            <FDashTab title="Total N3 Sleep" value={calculatedData ? 
              calculatedData.cycleData.cycleTotals.n3+' h'
              :
              '...'} />
            <FDashTab title="Total REM Sleep" value={calculatedData ? 
            calculatedData.cycleData.cycleTotals.rem+' h'
            :
            '...'} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, translateY: -64 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.5 }}
            id="info-graphs"
            className="w-screen h-[50vh] flex items-center place-content-center justify-between gap-8 px-32 overflow-x-scroll overflow-y-clip scrollbar-hide"
          >
            <DashPie data={calculatedData ? calculatedData.cycleData.cycleTotals:undefined}/>

            <FCycleDashBarChart data={calculatedData ? calculatedData.cycleData: {
              cycleTime: [''],
              cycleTotals: {
                n1: 1,
                n2: 1,
                n3: 1,
                rem: 1
              },
              cycles: ['']
            }}/>

            <FBPMDashBarChart data={calculatedData ? {bpm: calculatedData.bpm, timeStamp: calculatedData.timeStamps}: {bpm: [1,2], timeStamp: ['']}} />
          </motion.div>

          <div
            id="nav-bar"
            className=" w-[30%] h-[25vh] grid grid-rows-1 grid-cols-[1fr_5fr_1fr] gap-4 place-items-center items-end p-4"
          >

            <div
              id="welcome"
              className="text-my_white flex flex-col w-screen absolute px-4"
            >
              <motion.span
              initial={{opacity: 0, translateY: 64}}
              animate={{opacity: 1, translateY: 0}}
              transition={{delay: .5, duration: .75}}
              className="font-thin">{"Welcome Back, "}</motion.span>

              <motion.span
              initial={{opacity: 0, translateY: 64}}
              animate={{opacity: 1, translateY: 0}}
              transition={{delay: .75, duration: .75}}
              onAnimationComplete={() => loadName()}
              className="font-medium text-3xl capitalize">{fullName}</motion.span>
            </div>

            <motion.div
              initial={{ translateY: 128 }}
              animate={{ translateY: 0 }}
              transition={{ delay: 0.3 }}
              id="nav-logout"
              className="h-[35%] glass aspect-square flex items-center place-content-center p-1"
            >
              <img
                onClick={ async () => logoutUser()}
                src={iconLogout}
                alt="logout"
                className="h-full hover:drop-shadow-glow transition-all"
                onMouseEnter={() => {
                  setShowToolTip(true);
                  settoolTipLabel("Logout");
                }}
                onMouseLeave={() => {
                  setShowToolTip(false);
                }}
              />
            </motion.div>

            <motion.div
              initial={{ translateY: 128 }}
              animate={{ translateY: 0 }}
              transition={{ delay: 0.4 }}
              id="nav-tabs"
              className="h-[35%] w-full glass aspect-square flex items-center place-content-center p-2"
            >
              <img
                alt="dashboard-icon"
                src={iconDashboard}
                className="h-full hover:drop-shadow-glow transition-all"
                onMouseEnter={() => {
                  setShowToolTip(true);
                  settoolTipLabel("Dashboard");
                }}
                onMouseLeave={() => {
                  setShowToolTip(false);
                }}
              />
            </motion.div>

            <motion.div
              initial={{ translateY: 128 }}
              animate={{ translateY: 0 }}
              transition={{ delay: 0.5 }}
              id="nav-setting"
              className="h-[35%] glass aspect-square flex items-center place-content-center p-2"
            >
              <img
                src={iconSettings}
                alt="settings"
                className="h-full hover:drop-shadow-glow transition-all"
                onMouseEnter={() => {
                  setShowToolTip(true);
                  settoolTipLabel("Settings");
                }}
                onMouseLeave={() => {
                  setShowToolTip(false);
                }}
              />
            </motion.div>
          </div>
        </div>
      </>
    );
  };

  //Returns HTML of the login page, in case the user is not logged in yet
  const loadLogin = () => {
    return (
      <>
        <div
          id="container"
          className="w-screen h-screen absolute flex place-content-center items-center cursor-default"
        >
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
                <button type="submit" className="bg-my_primary text-cyan-100 w-fit h-fit text-xl py-1 px-4 rounded-md cursor-default hover:scale-110 transition-all">Login</button>
              }
            </form>
            <p className="text-my_white underline hover:drop-shadow-[0px_0px_8px_rgba(86,121,156,1)] transition">
              Forgot Password?
            </p>{" "}
            {/* Forgot Password? button */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="absolute w-screen h-screen flex items-center place-content-center z-0 bg-gradient-to-r from-my_BG_dark to-my_BG_light">
        <img
          alt="Logo"
          src={iconLogoEye}
          className="scale-[2] opacity-[.1] blur-sm"
        />
      </div>

      {loggedIn ? loadDashboard() : loadLogin()}
    </>
  );
}

export default Dashboard;
