"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function FooterComponent() {
  const router = useRouter();
  const { user } = useUser();

  function handleBackClick() {
    router.back();
  }

  return (
    <>
      {user && (
        <div className="mt-24 underline" onClick={handleBackClick}>
          Back
        </div>
      )}
    </>
  );
}
