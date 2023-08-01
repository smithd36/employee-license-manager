import { ro } from "date-fns/locale";
import { useSession, user, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"


export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()
  if(session) {
    router.push("/Dashboard");
  }


  return <>
  <div className="session-container">
    <div className="session">
        <img className="welcome-image" alt="welcome-image" id="welcome-image" />
        <h1>Not signed in</h1> <br/>
        <button className="session" id="toggle-signin" onClick={() => signIn()}>Sign in</button>
      </div>
      <div className="page-color">
      </div>
    </div>
  </>
}