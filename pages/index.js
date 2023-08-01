import Login from "./Login"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  function handleRedirect() {
    if (session) {
      router.push("/Dashboard");
    }
    if(!session){
      router.push("/Login");
    }
  }
  
  handleRedirect();
  return (
    <div className="container-home">
      <Login />
    </div>
  )
}
