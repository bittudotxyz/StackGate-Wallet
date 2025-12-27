import { useEffect } from "react";
import { walletKit } from "../wallet/walletKit";

export default function Connect() {
  useEffect(() => {
    const search = window.location.search;
    if (!search) return;

    // 🔥 Get FULL query without browser splitting
    // ?uri=wc:xxx@2?relay-protocol=irn&symKey=...
    const raw = search.slice(1);

    // Remove leading "uri=" only
    const fullUri = raw.startsWith("uri=") ? raw.slice(4) : raw;

    console.log("🔗 Pairing with FULL RAW URI:", fullUri);

    walletKit
      .pair({ uri: fullUri })
      .then(() => console.log("✅ Pair success"))
      .catch((err) => console.error("❌ Pair failed:", err));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>WalletConnect Web Wallet</h2>
      <p>🔗 Connecting to dApp…</p>
    </div>
  );
}
