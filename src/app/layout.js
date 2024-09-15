import './globals.css';
import Navbar from '../components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div className="pt-16">
            <div className="pulse one"></div>
            <div className="pulse two"></div>
            <div className="pulse three"></div>
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
