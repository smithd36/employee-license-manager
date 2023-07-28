import Login from "./Login"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  function handleSuccess() {
    if(session){
      router.push("/Dashboard");
    }
  }
  handleSuccess();

  return (
    <div className="container-home">
      <Login />
    </div>
  )
}