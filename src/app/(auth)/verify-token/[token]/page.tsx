"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerifyTokenPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const run = async () => {
      try {
        const res = await fetch(`/api/auth/verify-token/${token}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        router.replace(`/reset-password?token=${token}`);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [token, router]);

  if (loading) return <p className="text-center mt-10">Verifying token...</p>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return null;
}
