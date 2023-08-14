import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import lottie from 'lottie-web';
import animationData from '../public/welcome_animation.json';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    const container = document.getElementById('lottie-container');
    if (container) {
      const anim = lottie.loadAnimation({
        container,
        animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });
    }
  }, []);

  function handleRedirect() {
    if (session) {
      router.push("/Dashboard");
    }
  }
  
  handleRedirect();

  return (
    <div className="welcome-half-a">
      <div className="welcome">
    </div>
      <div className="welcome-half-b">
        <div className="welcome">
          <span id="lottie-container" />
          <img src="https://github.com/smithd36/Python-SQLite-CLI-DBMS/assets/90289165/60773abc-c36b-4a95-8912-f3b2f87114f1" alt="logo" />
          <button className="session" id="toggle-signin" onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
    </div>
  )
}