import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientLayout from "./ClientLayout";
import GlobalLoader from "./__AllCommponent/GlobalLoader/GlobalLoader";
// import img from "../../public/slider1.webp"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title> Online Store </title>
      </head>
      <body>
        <ClientLayout>
          <GlobalLoader />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
