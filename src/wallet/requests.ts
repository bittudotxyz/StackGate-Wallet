import { walletKit } from "./walletKit";

walletKit.on("session_request", async (event) => {
  const { topic, params, id } = event;
  const { request } = params;

  console.log("📨 Incoming request:", request.method, request.params);

  /* ---------------- GET ADDRESSES ---------------- */
  if (request.method === "stx_getAddresses") {
    await walletKit.respondSessionRequest({
      topic,
      response: {
        id,
        jsonrpc: "2.0",
        result: {
          addresses: [
            {
              symbol: "STX",
              address: "SPKS3DCP8441609AZ0REZ7VWTK5ECGXE8ADVXBM8",
            },
          ],
        },
      },
    });

    console.log("✅ Address sent to dApp");
  }

  /* ---------------- SIGN MESSAGE ---------------- */
  if (request.method === "stx_signMessage") {
    console.log("🖊️ Message signing requested");

    // Leather will pop up automatically
    // because it controls the private key
  }

  /* ---------------- TRANSFER ---------------- */
  if (request.method === "stx_transferStx") {
    console.log("💸 Transfer request received");

    // Leather UI popup is NORMAL
    // WalletConnect just relays the request
  }
});
