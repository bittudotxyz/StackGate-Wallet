import { walletKit } from "../wallet/walletKit";
import { getSdkError } from "@walletconnect/utils";

export default function Session() {
  const sessions = walletKit.getActiveSessions();
  const sessionList = Object.values(sessions);

  return (
    <div style={{ padding: "16px" }}>
      <h2>🔐 Active Sessions</h2>

      {sessionList.length === 0 && (
        <p>No active WalletConnect sessions</p>
      )}

      {sessionList.map((session: any) => {
        // Extract stacks account if present
        const stacksAccounts =
          session.namespaces?.stacks?.accounts ?? [];

        return (
          <div
            key={session.topic}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <p>
              <strong>DApp:</strong>{" "}
              {session.peer?.metadata?.name ?? "Unknown"}
            </p>

            <p>
              <strong>URL:</strong>{" "}
              {session.peer?.metadata?.url ?? "-"}
            </p>

            {stacksAccounts.length > 0 && (
              <p>
                <strong>Stacks Account:</strong>
                <br />
                {stacksAccounts[0]}
              </p>
            )}

            <button
              onClick={() =>
                walletKit.disconnectSession({
                  topic: session.topic,
                  reason: getSdkError("USER_DISCONNECTED"),
                })
              }
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </div>
        );
      })}
    </div>
  );
}
