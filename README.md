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
//App.js | index.js

import React from 'react';
import { ArconnectProvider, ArconnectContext } from 'react-arconnect';

//wrap the root component with <ArconnectProvider />
export default function Home() {
  const permissions = ["ACCESS_ADDRESS"]

  return (
    <ArconnectProvider permissions={permissions}>
      <Name />
    </ArconnectProvider>
  )
}


```

## Examples

To run the examples, switch to the respective directories. Run `npm install` or `yarn install`, Then run `npm start dev` or `yarn dev`.

Check out our example [app](./example/nextjs) and [components](./example/nextjs/components) to see how to use `react-arconnect` in your app.



## API

### &lt;ArconnectProvider />

This is the provider component. It should be placed above all components using `useArconnect()`.


## License
This project is licensed under the [MIT license](./LICENSE)

