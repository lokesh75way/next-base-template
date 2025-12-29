// app/page.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/signin");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <>
        <p>Welcome, {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    </main>
  );
}
