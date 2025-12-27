import { walletKit } from "./walletKit";

walletKit.on("session_request", async (event) => {
  const { topic, params, id } = event;
  const { request } = params;

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
  }
});
