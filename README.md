# 📘 Stacks WalletConnect Web Wallet

A **Stacks-only WalletConnect v2 web wallet** built using **React + Vite** and **Reown WalletKit**.

This project demonstrates how a WalletConnect-compatible Stacks wallet:
- Receives session proposals  
- Approves Stacks namespaces  
- Exposes a Stacks address  
- Routes signing requests to installed wallets (e.g. Leather)

> ⚠️ **Note:** This is a learning and demo wallet. It does **not** manage private keys or sign transactions internally.

---

## ✨ Features

- WalletConnect v2 integration  
- Stacks namespace support (`stacks:mainnet`)  
- Session proposal handling  
- Active session management (connect / disconnect)  
- Works with **AppKit Lab** and **Stacks dApps**  
- Clean separation of wallet logic and UI  

---

## 🧠 How It Works (Important)

- **WalletConnect** acts as the transport layer between your wallet and dApps  
- **Session approval** is implemented inside `walletKit.ts`  
- **Signing is delegated** to installed wallets like **Leather**  
- Your app functions as a WalletConnect-compatible **wallet shell**

---


Then open the app at:  
👉 [http://localhost:5174](http://localhost:5174)

---

## 🧪 Testing the Wallet

Use **AppKit Lab** for integration testing:  
👉 [https://lab.reown.com](https://lab.reown.com)

1. Choose **Custom Wallet**  
2. Paste your wallet URL (e.g. `http://localhost:5174`)  
3. Connect  
4. Approve the session automatically  
5. Perform a transaction in the dApp  
6. The installed wallet (e.g. **Leather**) will pop up for signing  

✅ This confirms the WalletConnect flow is functioning correctly.

---

## ❓ Why Does Leather Pop Up?

This wallet:
- Approves WalletConnect sessions  
- Exposes a Stacks address  
- Does **not** sign transactions  

Therefore, WalletConnect forwards signing requests to the wallet that **owns the private key (Leather)** for secure signing.

---

## 📚 References

- WalletConnect Docs: [https://docs.walletconnect.network](https://docs.walletconnect.network)  
- Reown WalletKit Docs: [https://docs.reown.com](https://docs.reown.com)  
- Stacks Documentation: [https://docs.stacks.co](https://docs.stacks.co)

---

## 🧑‍💻 Author

Built for learning **WalletConnect + Stacks integration**.  



