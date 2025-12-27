import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";

const STACKS_ADDRESS =
  "SPKS3DCP8441609AZ0REZ7VWTK5ECGXE8ADVXBM8";

const core = new Core({
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

export const walletKit = await WalletKit.init({
  core,
  metadata: {
    name: "My Stacks Web Wallet",
    description: "Stacks-only WalletConnect Web Wallet",
    url: window.location.origin,
    icons: [],
  },
});


walletKit.on("session_proposal", async (proposal) => {
  console.log("📩 Session proposal received", proposal);

  try {
    const namespaces = {
      stacks: {
        chains: ["stacks:mainnet"],
        methods: [
          "stx_getAddresses",
          "stx_signMessage",
          "stx_transferStx",
        ],
        events: [],
        accounts: [
          `stacks:mainnet:${STACKS_ADDRESS}`,
        ],
      },
    };

    await walletKit.approveSession({
      id: proposal.id,
      namespaces,
    });

    console.log("✅ Stacks session approved");
  } catch (err) {
    console.error("❌ Session approval failed", err);

    await walletKit.rejectSession({
      id: proposal.id,
      reason: {
        code: 5000,
        message: "User rejected",
      },
    });
  }
});
