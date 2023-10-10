<p align="center">
  <a href="https://decent.land">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-js</code></h3>
  <div align="center">Your easiest foray into Web3. <a href="https://mem.tech">Molecular Execution Machine APIs</a> for React Devs 👷‍♂️ Web3 batteries included.</div>
</p>


## Usage: 
Add it to your project:

```console
# npm
npm install mem-js

# yarn
yarn add mem-js

# pnpm
pnpm add mem-js

# bun
bun add mem-js
```

### How to get started with mem-js in your React app:

```tsx 
// First, let's wrap the APP with our MEM provider:

// If you're using next.js, this should be your _app.tsx file
import React from 'react';

import { MEMContext } from "mem-js";
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

Then, within your app, use it as follows:

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

To run the examples, switch to the respective directories. Run `npm install` or `yarn install`, Then run `npm start dev` or `yarn dev`.

Check out our example [app](./example/nextjs) and [components](./example/nextjs/components) to see how to use `react-arconnect` in your app.



## API

### `MEMContext`

This is the central state of MEM API. You can interact with instantiated functionId's from here by calling them directly:

```tsx
import Link from "next/link";
import { useEffect } from "react";

const storeSelector = {
  "nike": "o2wY...c_de",
  "adidas": "faW4...gRcQ",
  "puma": "n4og...RJ_0"
}

interface IndexProps {
  storeNumber: number;
}

function Index({ storeNumber }: IndexProps) {
  const functionId = storeSelector[storeNumber];
  const clothingStoreFunction = useMEM(functionId);
  const { write, read, allFunctions, setFunctionId, allFunctions } = clothingStoreFunction();

  return (
    <div>

    </div>
  )
}



```





## License
This project is licensed under the [MIT license](./LICENSE)

