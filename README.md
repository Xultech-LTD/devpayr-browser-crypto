# DevPayr Crypto (Browser SDK)

Secure, Laravel-compatible AES-256-CBC encryption & decryption for browser-based JavaScript apps.  
This SDK is designed to match the encryption scheme used by the [DevPayr](https://devpayr.com) platform, making it ideal for use in web-based clients.

---

## ✨ Features

- 🔐 AES-256-CBC encryption with 16-byte random IV
- 🔑 Accepts any string key and normalizes to 32-byte via SHA-256
- 📦 Output format is `base64(iv::cipherText)` — fully compatible with Laravel
- 💻 Runs in modern browsers using the Web Crypto API
- 📜 TypeScript support included

---

## 📦 Installation

### Via CDN (for browser use)

```html
<script src="https://cdn.jsdelivr.net/npm/devpayr-browser-crypto-sdk/dist/devpayr-crypto.umd.js"></script>
```

## Via ESM (for Vite, React, etc.)

```bash
npm install devpayr-browser-crypto
```

## 🚀 Usage

### ✅ In the Browser (CDN)

```html
<script src="devpayr-crypto.umd.js"></script>
<script>
  (async () => {
    const encrypted = await DevPayrCrypto.encryptSecure("Hello, DevPayr!", "sk_test_123");
    const decrypted = await DevPayrCrypto.decryptSecure(encrypted, "sk_test_123");
    console.log({ encrypted, decrypted });
  })();
</script>
```

### ✅ In a Modern JS/TS Project

```ts
import { encryptSecure, decryptSecure } from 'devpayr-browser-crypto';

const encrypted = await encryptSecure("Hello, DevPayr!", "sk_test_123");
const decrypted = await decryptSecure(encrypted, "sk_test_123");

console.log({ encrypted, decrypted });
```

### 🛠️ How It Works

Uses the Web Crypto API under the hood (`AES-CBC` and `SHA-256`)

#### 🔐 `encryptSecure()`

- Generates a 16-byte IV  
- Hashes the key to 32 bytes  
- Encrypts the plaintext  
- Returns base64 of `iv::cipherText`

#### 🔓 `decryptSecure()`

- Splits and decodes IV + ciphertext  
- Reconstructs the key  
- Decrypts to the original plainText