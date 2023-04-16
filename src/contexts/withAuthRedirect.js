import { useRouter } from 'next/router';
import { useAuthContext } from './auth-context';

export const withAuthRedirect = (WrappedComponent, redirectPath) => {
  const WithAuthRedirectWrapper = (props) => {
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();

    if (isAuthenticated) {
      router.push(redirectPath);
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectWrapper;
};
