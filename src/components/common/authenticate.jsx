import { useSelector } from 'react-redux';
import Router from 'next/router';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      // User is not authenticated, redirect to login page
      Router.push('/');
      return null;
    }
  };
  return AuthenticatedComponent;
};

export default withAuth;