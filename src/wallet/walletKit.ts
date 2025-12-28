import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";

const core = new Core({
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

export const walletKit = await WalletKit.init({
  core,
  metadata: {
    name: "StackGate Wallet",
    description: "Stacks WalletConnect Web Wallet",
    url: window.location.origin,
    icons: [],
  },
});

/* ---------------- SESSION PROPOSAL ---------------- */

walletKit.on("session_proposal", async (proposal) => {
  console.log("📩 Session proposal received", proposal);

  const { id } = proposal;

  await walletKit.approveSession({
    id,
    namespaces: {
      stacks: {
        chains: ["stacks:mainnet"],
        methods: [
          "stx_getAddresses",
          "stx_signMessage",
          "stx_transferStx",
        ],
        events: [],
        accounts: [
          "stacks:mainnet:SPKS3DCP8441609AZ0REZ7VWTK5ECGXE8ADVXBM8",
        ],
      },
    },
  });

  console.log("✅ Stacks session approved");

  // 🔔 ADD THIS (UI refresh trigger)
  window.dispatchEvent(
    new Event("walletconnect_session_updated")
  );
});
