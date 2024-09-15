import './globals.css'; // Import global styles
import Navbar from '../components/Navbar'; // Adjust path if necessary

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-16"> {/* Ensure content is not hidden behind the navbar */}
          <div className="pulse one"></div>
          <div className="pulse two"></div>
          <div className="pulse three"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
