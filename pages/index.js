import Login from "./Login"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    handleRedirect();
  }, []);

  function handleRedirect() {
    if (session) {
      router.push("/Dashboard");
    }
  }

  return (
    <div className="container-home">
      <Login />
    </div>
  )
}