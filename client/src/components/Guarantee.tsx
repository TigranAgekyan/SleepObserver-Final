import React from 'react'

interface IGuarantee {
  type: string;
}

export default function Guarantee(props: IGuarantee) {
  const [icon,setIcon] = React.useState(process.env.PUBLIC_URL + '/assets/images/icons/vector_lock.png');
  const [header,setHeader] = React.useState("Header");
  const [content,setContent] = React.useState("Content");

  //See which guarantee was chosen and load it's corresponding content
  const decideType = () => {
    if(props.type === "approve"){ //One year guarantee
      setIcon(process.env.PUBLIC_URL + '/assets/images/icons/vector_approve.png');
      setHeader("One year guarantee");
      setContent("At SleepObserver,we stand behind our products and services with a one-year guarantee, demonstrating our confidence in their quality and performance. If you ever encounter issues, our dedicated support team is here to assist. Your trust and satisfaction are our top priorities, ensuring a worry-free experience.");
    }else if(props.type == "lock"){ //Data Privacy
      setIcon(process.env.PUBLIC_URL + '/assets/images/icons/vector_lock.png');
      setHeader("Your data is safe");
      setContent("At SleepObserver, your privacy is paramount. We're dedicated to protecting your data, employing industry-standard security measures to keep it confidential. Your trust is invaluable, and we're committed to upholding your privacy throughout your experience on our platform.");
    }else{ // 24/7 Support
      setIcon(process.env.PUBLIC_URL + '/assets/images/icons/vector_247.png');
      setHeader("We're here for you");
      setContent("At SleepObserver, we offer 24/7 support services for you. Our dedicated team is here to assist with any questions or issues, ensuring your peace of mind and satisfaction.");
    }
  }

  //Call functions on component load
  React.useEffect(() => {
    decideType();
  }, [])

  return (
    <div id='guarantee-container' className='w-[20%] h-[75%] flex flex-col place-content-top items-center mx-64'>
      <img alt='Icon' src={icon} className="w-[25%] aspect-square"/>
      <p id='header' className='header-text text-center mt-4 mb-8'>{header}</p>
      <p id='content' className='content-text text-center'>{content}</p>
    </div>
  )
}
