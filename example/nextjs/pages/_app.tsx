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
