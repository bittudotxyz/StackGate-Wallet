import { useEffect, useState } from "react";
import { walletKit } from "../wallet/walletKit";
export default function Session() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loadingBalance, setLoadingBalance] = useState<Record<string, boolean>>(
    {}
  );

  const refreshSessions = () => {
    const active = walletKit.getActiveSessions();
    setSessions(Object.values(active));
  };

  const fetchBalance = async (address: string) => {
    try {
      setLoadingBalance((p) => ({ ...p, [address]: true }));

      const res = await fetch(
        `https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`
      );
      const data = await res.json();

      const microStx = data?.stx?.balance ?? "0";
      const stx = (Number(microStx) / 1_000_000).toFixed(6);

      setBalances((p) => ({ ...p, [address]: stx }));
    } catch {
      setBalances((p) => ({ ...p, [address]: "Error" }));
    } finally {
      setLoadingBalance((p) => ({ ...p, [address]: false }));
    }
  };

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    alert("Address copied");
  };

  useEffect(() => {
    refreshSessions();

    walletKit.on("session_connect" as any, refreshSessions);
    walletKit.on("session_delete" as any, refreshSessions);
    walletKit.on("session_update" as any, refreshSessions);

    window.addEventListener("walletconnect_session_updated", refreshSessions);

    return () => {
      walletKit.off("session_connect" as any, refreshSessions);
      walletKit.off("session_delete" as any, refreshSessions);
      walletKit.off("session_update" as any, refreshSessions);

      window.removeEventListener(
        "walletconnect_session_updated",
        refreshSessions
      );
    };
  }, []);

  const primaryAddress =
    sessions[0]?.namespaces?.stacks?.accounts?.[0]?.split(":")[2];

  const primaryBalance =
    (primaryAddress && balances[primaryAddress]) ||
    (primaryAddress ? "--" : "0.000000");

  const primaryLoading =
    (primaryAddress && loadingBalance[primaryAddress]) || false;

  // brand colors
  const ORANGE = "#F48024"; // Stack Overflow / Stacks-style orange [web:26]
  const ORANGE_LIGHT = "#FFE9D5";
  const ORANGE_SOFT = "#FFF5EB";
  const TEXT_DARK = "#1F2933";
  const TEXT_MUTED = "#6B7280";
  const BORDER_SOFT = "#E5E7EB";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F9FAFB",
        padding: "32px 16px 40px",
        display: "flex",
        justifyContent: "center",
        color: TEXT_DARK,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 0.3,
                margin: 0,
                color: TEXT_DARK,
              }}
            >
              Stacks Wallet
            </h1>
            <p
              style={{
                marginTop: 6,
                fontSize: 13,
                color: TEXT_MUTED,
              }}
            >
              Manage your STX balance and connected dApps
            </p>
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: `1px solid ${BORDER_SOFT}`,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(15,23,42,0.05)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "999px",
                background:
                  sessions.length > 0 ? "#16A34A" : "rgba(148, 163, 184, 0.6)",
              }}
            />
            <span>
              {sessions.length > 0 ? "Wallet connected" : "No active sessions"}
            </span>
          </div>
        </div>

        {/* Wallet card row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
            gap: 20,
            alignItems: "stretch",
            marginBottom: 26,
          }}
        >
          {/* Left: main wallet card */}
          <div
            style={{
              borderRadius: 24,
              padding: 20,
              background: `linear-gradient(135deg, ${ORANGE} 0%, #FFA94D 40%, #FFFFFF 100%)`,
              color: "#111827",
              boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top right, rgba(255,255,255,0.4) 0, transparent 55%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      opacity: 0.8,
                    }}
                  >
                    Total balance
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    {primaryLoading ? "Loading…" : `${primaryBalance} STX`}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 10px",
                    fontSize: 11,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.8)",
                    background: "rgba(255,255,255,0.9)",
                    color: TEXT_DARK,
                  }}
                >
                  Mainnet
                </div>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    maxWidth: "70%",
                  }}
                >
                  <div
                    style={{
                      opacity: 0.75,
                      marginBottom: 4,
                    }}
                  >
                    Primary address
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                      fontSize: 13,
                      wordBreak: "break-all",
                    }}
                  >
                    {primaryAddress
                      ? `${primaryAddress.slice(0, 6)}…${primaryAddress.slice(
                          -6
                        )}`
                      : "No address connected"}
                  </div>
                </div>

                {primaryAddress && (
                  <button
                    onClick={() => fetchBalance(primaryAddress)}
                    style={{
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontSize: 12,
                      fontWeight: 500,
                      background: "#111827",
                      color: "#F9FAFB",
                      boxShadow: "0 10px 25px rgba(15,23,42,0.25)",
                    }}
                  >
                    Refresh
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: small stats strip */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: 16,
                background: "#FFFFFF",
                border: `1px solid ${BORDER_SOFT}`,
                boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: TEXT_MUTED,
                  marginBottom: 4,
                }}
              >
                Connected dApps
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: TEXT_DARK,
                }}
              >
                {sessions.length}
              </div>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: TEXT_MUTED,
                }}
              >
                Active WalletConnect sessions
              </p>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 18,
                padding: 14,
                background: ORANGE_SOFT,
                border: `1px solid ${ORANGE_LIGHT}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 6,
                fontSize: 12,
                color: TEXT_DARK,
              }}
            >
              <div>
                Network:{" "}
                <span style={{ fontWeight: 500 }}>Stacks Mainnet</span>
              </div>
              <div>
                Status:{" "}
                <span
                  style={{
                    color: sessions.length ? "#16A34A" : "#EA580C",
                    fontWeight: 500,
                  }}
                >
                  {sessions.length ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div>
                Bridge: <span style={{ fontWeight: 500 }}>WalletConnect v2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions list */}
        <div
          style={{
            marginTop: 10,
            color: TEXT_DARK,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Connected dApps
            </h2>
            <span
              style={{
                fontSize: 12,
                color: TEXT_MUTED,
              }}
            >
              View all active sessions
            </span>
          </div>

          {sessions.length === 0 && (
            <div
              style={{
                marginTop: 18,
                padding: 26,
                textAlign: "center",
                borderRadius: 18,
                border: `1px dashed ${BORDER_SOFT}`,
                background: "#FFFFFF",
                color: TEXT_MUTED,
                fontSize: 13,
              }}
            >
              No active WalletConnect sessions
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 18,
              marginTop: 18,
            }}
          >
            {sessions.map((session) => {
              const address =
                session.namespaces?.stacks?.accounts?.[0]?.split(":")[2];

              if (!address) return null;

              return (
                <div
                  key={session.topic}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 18,
                    padding: 16,
                    border: `1px solid ${BORDER_SOFT}`,
                    boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {/* dApp header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: TEXT_DARK,
                        }}
                      >
                        {session.peer?.metadata?.name ?? "Unknown dApp"}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: TEXT_MUTED,
                          wordBreak: "break-all",
                        }}
                      >
                        {session.peer?.metadata?.url}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 11,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: ORANGE_SOFT,
                        color: ORANGE,
                        fontWeight: 600,
                      }}
                    >
                      Connected
                    </span>
                  </div>

                  {/* address row */}
                  <div
                    style={{
                      marginTop: 6,
                      padding: 10,
                      borderRadius: 12,
                      background: "#F9FAFB",
                      border: `1px solid ${BORDER_SOFT}`,
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: TEXT_MUTED,
                            marginBottom: 3,
                          }}
                        >
                          STX address
                        </div>
                        <div
                          style={{
                            fontFamily:
                              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                            fontSize: 13,
                          }}
                        >
                          {address.slice(0, 6)}…{address.slice(-6)}
                        </div>
                      </div>

                      <button
                        onClick={() => copyAddress(address)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 999,
                          border: `1px solid ${BORDER_SOFT}`,
                          background: "#FFFFFF",
                          color: TEXT_DARK,
                          cursor: "pointer",
                          fontSize: 11,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* balance + action */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: TEXT_MUTED,
                          marginBottom: 2,
                        }}
                      >
                        Balance
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: TEXT_DARK,
                        }}
                      >
                        {loadingBalance[address]
                          ? "Loading…"
                          : balances[address] ?? "--"}{" "}
                        STX
                      </div>
                    </div>

                    <button
                      onClick={() => fetchBalance(address)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: "none",
                        background: ORANGE,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 500,
                        boxShadow: "0 14px 30px rgba(248,113,22,0.4)",
                      }}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


