import { useEffect } from "react";
import { walletKit } from "../wallet/walletKit";

export default function Connect() {
  useEffect(() => {
    const search = window.location.search;
    if (!search) return;

    const raw = search.slice(1);
    const fullUri = raw.startsWith("uri=") ? raw.slice(4) : raw;

    console.log("🔗 Pairing with FULL RAW URI:", fullUri);

    walletKit
      .pair({ uri: fullUri })
      .then(() => console.log("✅ Pair success"))
      .catch((err) => console.error("❌ Pair failed:", err));
  }, []);

  const ORANGE = "#F48024"; // Stack-style orange [web:25][web:54]
  const ORANGE_SOFT = "#FFF5EB";
  const ORANGE_LIGHT = "#FFE1C2";
  const TEXT_DARK = "#222426";
  const TEXT_MUTED = "#6B7280";
  const BORDER_SOFT = "#E5E7EB";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, #FFF7ED 0, #F9FAFB 45%, #F3F4F6 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
        }}
      >
        {/* Header strip */}
        <div
          style={{
            marginBottom: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 22,
                margin: 0,
                fontWeight: 700,
                color: TEXT_DARK,
              }}
            >
              Connect your wallet
            </h1>
            <p
              style={{
                marginTop: 6,
                fontSize: 13,
                color: TEXT_MUTED,
              }}
            >
              Securely pairing with your dApp via WalletConnect
            </p>
          </div>

          <div
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: ORANGE_SOFT,
              border: `1px solid ${ORANGE_LIGHT}`,
              fontSize: 11,
              fontWeight: 600,
              color: ORANGE,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "999px",
                background: ORANGE,
              }}
            />
            <span>Connecting</span>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "28px 24px 24px",
            width: "100%",
            boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
            border: `1px solid ${BORDER_SOFT}`,
          }}
        >
          {/* Wallet badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 999,
              background: ORANGE_SOFT,
              color: ORANGE,
              fontSize: 11,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            <span>🔗</span>
            <span>WalletConnect Web Wallet</span>
          </div>

          <h2
            style={{
              fontSize: 20,
              margin: 0,
              marginBottom: 8,
              color: TEXT_DARK,
            }}
          >
            Connecting to dApp…
          </h2>

          <p
            style={{
              fontSize: 14,
              color: TEXT_MUTED,
              marginBottom: 24,
            }}
          >
            Keep this tab open while the connection request is sent to your
            wallet.
          </p>

          {/* Progress card */}
          <div
            style={{
              borderRadius: 16,
              padding: 16,
              background: "#F9FAFB",
              border: `1px solid ${BORDER_SOFT}`,
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Loading indicator */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "999px",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(15,23,42,0.08)",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  border: "3px solid #E5E7EB",
                  borderTop: `3px solid ${ORANGE}`,
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: TEXT_DARK,
                  marginBottom: 4,
                }}
              >
                Waiting for approval
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: TEXT_MUTED,
                }}
              >
                Confirm the connection in your wallet app to finish pairing.
              </div>
            </div>
          </div>

          {/* Helper text */}
          <p
            style={{
              fontSize: 12,
              color: TEXT_MUTED,
              margin: 0,
            }}
          >
            If nothing appears, check that:
          </p>
          <ul
            style={{
              marginTop: 8,
              paddingLeft: 18,
              fontSize: 12,
              color: TEXT_MUTED,
              lineHeight: 1.5,
            }}
          >
            <li>Your wallet app is installed and unlocked.</li>
            <li>You are on the correct device or browser profile.</li>
          </ul>
        </div>
      </div>

      {/* Inline spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

