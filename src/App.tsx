import { useEffect, useState } from "react";
import Connect from "./pages/Connect";
import Session from "./pages/Session";
import { walletKit } from "./wallet/walletKit";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const checkConnection = () => {
    const activeSessions = walletKit.getActiveSessions();
    setIsConnected(Object.keys(activeSessions).length > 0);
  };

  useEffect(() => {
    checkConnection();

    // Listen for session updates
    walletKit.on("session_connect" as any, checkConnection);
    walletKit.on("session_delete" as any, checkConnection);
    walletKit.on("session_update" as any, checkConnection);

    window.addEventListener("walletconnect_session_updated", checkConnection);

    return () => {
      walletKit.off("session_connect" as any, checkConnection);
      walletKit.off("session_delete" as any, checkConnection);
      walletKit.off("session_update" as any, checkConnection);

      window.removeEventListener("walletconnect_session_updated", checkConnection);
    };
  }, []);

  return (
    <div>
      {isConnected ? <Session /> : <Connect />}
    </div>
  );
}

export default App;
