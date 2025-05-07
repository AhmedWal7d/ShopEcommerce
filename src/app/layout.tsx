import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientLayout from "./ClientLayout";
import GlobalLoader from "./__AllCommponent/GlobalLoader/GlobalLoader";
import Provider from "./Provider";
import { ThemeToggle } from "./ThemeToggle";
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = params.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={params.locale} dir={dir} suppressHydrationWarning>
      <head>
        <title>Online Store</title>
      </head>
      <body>
        <Provider>
          <ClientLayout>
            <ThemeToggle />
            <GlobalLoader />
            {children}
          </ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
