import { ro } from "date-fns/locale";
import { useSession, user, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"


export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()
  if(session) {
    router.push("/Dashboard");
  }


  return (
    <div className="session-container">
      <button className="session" id="toggle-signin" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}