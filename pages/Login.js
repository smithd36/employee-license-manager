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
      <img className="welcome-image" src="https://m.media-amazon.com/images/I/91+hOm7pX7L._AC_UF894,1000_QL80_.jpg" alt="welcome-image" id="welcome-image" />
      Not signed in <br/>
    </div>
    <button className="session" id="toggle-signin" onClick={() => signIn()}>Sign in</button>
  </>
}