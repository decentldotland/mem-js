# Arweave wallet signature guide

Arweave blockchain offers several ways to generate a signature via the private key, however, not every wallet offers the ability to sign messages in a standardized way.

As of 2023, the following methods can be used by these specific wallets to sign and verify user signatures:

| Supported Methods | Arconnect    | Arconnect <v1   | Arweave.app |
|-------------------|--------------|-----------------|-------------|
| `signTransaction` | Yes (`sign`) | Yes (`sign`)    | Yes         |
| `signDataItem`    | Yes          | No              | Yes         |
| `signMessage`     | Yes          | No              | Yes         |
| `signature`       | No           | Yes             | No          |
| `dispatch`        | Yes          | Yes             | Yes         |

For this guide, we will be using the most up-to-date and recognized method to verify user's signature, `signMessage`.

## react-arconnect

You can use [react-arconnect](https://github.com/decentldotland/react-arconnect) library which wraps `signMessage` into a single function call, depending on the currently connected wallet.

### React Example

```tsx
import { defaultSignatureParams, useArconnect } from "react-arconnect";

function Buttons() {
  const { createSignature } = useArconnect();

  const signatureWrapper = async () => {
    const message = `Hello world!`;
    // turn into uint8array
    const encodedMessage = new TextEncoder().encode(message);
    // params: message, signature settings, return value, type old/new (old = signature)
    const signature = await createSignature(encodedMessage, defaultSignatureParams, "Uint8Array", "new") as Uint8Array;
    console.log(signature);
    // post the signature to your local API for verification
    fetch('/api/mem/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
  };
  
  return (
    <div>
      <button onClick={signatureWrapper}>
        Sign Message
      </button>
    </div>
  )
}

```

### Backend API Verification

If you are using `signMessage` method, verification could be done as follows:

```ts

function verify(publicKey: string, encodedMessage: Uint8Array, signature: Uint8Array) {
  const hash = await webcrypto.subtle.digest("SHA-256", encodedMessage);

  const publicJWK = {
    e: "AQAB",
    ext: true,
    kty: "RSA",
    n: publicKey,
  };

  // import public jwk for verification
  const verificationKey = await webcrypto.subtle.importKey(
    "jwk",
    publicJWK,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    false,
    ["verify"],
  );
  
  // decrypt uint8array signature
  const decryptedSig = Buffer.from(signature, "base64");
  const encryptedSig = new Uint8Array(decryptedSig);
  console.log(encryptedSig);

  // verify the signature by matching it with the hash
  const isValidSignature = await webcrypto.subtle.verify(
    { name: "RSA-PSS", saltLength: 32 },
    verificationKey,
    encryptedSig,
    hash,
  );

  return isValidSignature;
```

Alternatively, you can use molecule.sh API for an easier development experience:

```
const url = "https://ar.molecule.sh/ar-auth/"
fetch(url + pubkey + "/" message + "/" + signature")

```