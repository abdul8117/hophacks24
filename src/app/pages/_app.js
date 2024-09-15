import { UserProvider } from '@auth0/nextjs-auth0';
import auth0 from '../auth0-config'; // Adjust path as needed

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
