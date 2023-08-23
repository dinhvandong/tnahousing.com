import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from 'next/router';
const ProtectedPage = ({children}) => {
    const isAuthenticated = useSelector((state) => state.persistedReducer.user.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
          Router.push("/")
        }
      }, []);
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedPage