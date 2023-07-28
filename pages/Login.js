import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  if(session) {
    return <>
    <div className="session" id="true">
      <img src="" alt="welcome-image" id="welcome-image" />
        Signed in as {session.user.email} <br/>
        </div>
        <button className="session" id="toggle-signin" onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
  <div className="session">
    <img src="" alt="welcome-image" id="welcome-image" />
      Not signed in <br/>
    </div>
    <button className="session" id="toggle-signin" onClick={() => signIn()}>Sign in</button>
  </>
}