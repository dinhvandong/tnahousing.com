import { useState } from "react";
import { useGetAdminQuery } from "../../../features/upload/uploadApi";
import { useEffect } from "react";

const Social = () => {
  const { data, isLoading, isError, isSuccess } = useGetAdminQuery()
  const [socialContent, setSocialContent] = useState([
    { id: 1, liveLink: "https://www.facebook.com/", icon: "fa-facebook" },
    { id: 2, liveLink: "https://www.twitter.com/", icon: "fa-twitter" },
    { id: 3, liveLink: "https://www.instagram.com/", icon: "fa-instagram" },
    { id: 4, liveLink: "https://www.pinterest.com/", icon: "fa-youtube" },
    { id: 5, liveLink: "https://www.dribbble.com/", icon: "fa-skype" },
  ])
  useEffect(()=>{
    if(isSuccess){
      setSocialContent([
        { id: 1, liveLink: data.data.facebook, icon: "fa-facebook" },
        { id: 2, liveLink: data.data.twitter, icon: "fa-twitter" },
        { id: 3, liveLink: data.data.instagram, icon: "fa-instagram" },
        { id: 4, liveLink: data.data.youtube, icon: "fa-youtube" },
        { id: 5, liveLink: data.data.skype, icon: "fa-skype" },
      ])
    }

  },[isSuccess, data])



  return (
    <>
      {socialContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
            <i className={`fa ${item.icon}`}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
