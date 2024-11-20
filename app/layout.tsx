"use client";

import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { useRouter, usePathname } from "next/navigation";

import "./globals.css";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="bg-white p-8 bg-opacity-50 rounded-b-lg">Loading...</div>
    );
  }

  if (!user && pathname !== "/") {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="bg-[#dddad4] m-8 rounded-b-lg w-3/4">
          <HeaderComponent />
          <AuthWrapper>
            <div className="bg-white p-8 bg-opacity-50 rounded-b-lg">
              {children}
              <FooterComponent />
            </div>
          </AuthWrapper>
        </body>
      </UserProvider>
    </html>
  );
}
