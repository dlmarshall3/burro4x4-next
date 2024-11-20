"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error } = useUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div>
      <Link href="/api/auth/login">
        <button className="w-1/4 p-2 bg-green-500 hover:bg-green-300 mb-2 rounded-full shadow-lg">Login</button>
      </Link>
    </div>
  );
}
