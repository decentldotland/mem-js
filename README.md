<p align="center">
  <a href="https://decent.land">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/react-mem-api</code></h3>
  <div align="center">Your easiest foray into Web3. <a href="https://mem.tech">Molecular Execution Machine</a> APIs for React Devs 👷‍♂️ Web3 batteries included.</div>
</p>


## Overview

- Lightweight

We've made sure unecessary bloat is kept at bay. Check out the package size:

<div>
  <div>dist/index.es.js  <strong style="color: green; ">4.97 kB</strong> │ gzip: 1.78 kB</div>
  <div>dist/index.umd.js  <strong style="color: green; ">3.41 kB</strong> │ gzip: 1.48 kB</div>
</div>

- Fast setup

All you need to get started with is within the `useMEM` hook:

```tsx
export default function Homepage() {
  const shop = useMEM("xyz1...1yzq");

  const buyItem = async (item) => {
    const result = await shop.write([{ input: { function: "buy", item } }]);
    const errors = Object.keys(result.data.execution.errors);
    if (!errors.length) console.log("Successfully purchased " + item)
    else console.error("Couldn't buy " + item)
  }

  return (
    <div>
      <div>
        <p>Hockey Puck</p>
        <button onClick={() => buyItem("Hockey Puck")}>Buy</button>
      </div>
      <div>
        <p>Helmet</p>
        <button onClick={() => buyItem("Helmet")}>Buy</button>
      </div>
    </div>
  )
}
```

- 

## Install
Add it to your project:

```console
# npm
npm install react-mem-js

# yarn
yarn add react-mem-js

# pnpm
pnpm add react-mem-js

# bun
bun add react-mem-js
```

### Setup

First, let's wrap the app with our provider:

```tsx 


// If you're using next.js, this should be your _app.tsx file
import React from 'react';

import { MEMContext } from "react-mem-js";
import "../styles/globals.css";

function ExampleApp({ Component, pageProps }) {
  return (
    <MEMContext.Provider value={{}}>
      <Component {...pageProps} />
    </MEMContext.Provider>
  );
}

export default ExampleApp;

```

Then, within your app, call useMEM:

```tsx
export default function Home() {
  const library = useMEM("yBgIzbc3lvwlBjw6V-G9Woy5Hx2uY37aDQIPoQ5kRRw");

  const [books, setBooks] = useState([]);
  
  return (
    <div>
      {books?.length > 0 && (
        books.map(bookName => <div>{bookName}</div>)
      )}
    </div>
  )
}

```

## Examples

Check out the example [Next.js app](./example/nextjs).

## API

### `MEMContext`

A wrapper around `useContext` that manages the store of MEM instances. Doesn't accept any arguments.

```tsx
// Next.js
<MEMContext.Provider value={{}}>
  <Component {...pageProps} />
</MEMContext.Provider>
```

### currentFunction

Returns the current function being used in mem-js

### setFunctionId

Swaps the functionID used in MEM

### destroyFunctionId

Delete the functionId inside the MEM store.

### allFunctions

Returns all currently tracked MEM instances. Each one is accessible via the `functionId` as the key and implement `MEMInstance` interface.

### state

Return latest state of a function as parsed JSON object.

### read

Query a function. Accept another functionId as argument:

```js
const { read, state } = useMEM("241-...djKK");
// reads and saves to local state
console.log(await read());
// reading other function ID, won't be saved in local state
console.log(await read("AI-F...La2T"));
```

### write

Write to function. Accepts `input` and `otherFunctionId` Params.

```js
const { write } = useMEM("241-...djKK");
const result = await write([{ input: { function: "save", bookName } }]);
console.log(result);
```

### testnet

Test functions and their parameters in a MEM-sandbox environment. Example:

```tsx
const { testnet } = useMEM();

const contractType = 0; // Language, 0 is JavaScript
const initState = JSON.stringify({ name: "Carl", publicFunctions: { changeName: ["newName"] } })
const input = JSON.stringify({ function: "changeName", newName: "Lukas (Computer)" })
const contractSrc = `
export async function handle(state, action) {
  const input = action.input;
  if (input.function === "save") {
    const { newName } = input;
    const nameLength = newName.trim().length;
    ContractAssert(!!nameLength, "Error: No newName provided");
    state.name = newName;
    // this is important: without it, function invokation won't return the state
    return { state };
  }
}
`

const options = {
  contractType,
  initState,
  input,
  contractSrc,
};
const result = await testnet(options);
// will output new state object, have to manually compare changes
```

## Roadmap

Step 1: Core API built ✅
Step 2: Add `everpay.js` and `arseed` file uploading helpers for `MEM` ⏳
Step 3: Wallet APIs like ETH, SOL, and more 🔜

## License
This project is licensed under the [MIT license](./LICENSE)

