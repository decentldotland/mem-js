import { useMEM } from "react-mem-js";
import Link from "next/link";
import { useRouter } from "next/router";

const functions = {
  function1: "yBgIzbc3lvwlBjw6V-G9Woy5Hx2uY37aDQIPoQ5kRRw",
  function2: "9vCmVRVClieRNymPm00oMJlmGzL5VZlqzcL3KCz6xS0",
  function3: "u-SCIA8l7ZKFiV-x9LFOvu9ZZXHoMyTI_xsGDQ47Jsc"
};

function Index() {
  const router = useRouter();
  const { name } = router.query;
  const functionId = functions[name as string];
  const MEM = useMEM(functionId);

  return (
    <div className="bg-white text-black h-screen flex flex-col items-center justify-center gap-y-2">
      <div className="border-2 border-black p-4 mb-2">
        <h1 className="text-2xl font-bold text-center">Contract State (example mock)</h1>
        <div className="border-2 border-black dark:border-white max-h-[400px] overflow-y-scroll p-2 max-w-[60vw]">
          <pre>
            <code> {JSON.stringify(MEM.state, null, 4)}</code>
          </pre>
        </div>
      </div>
      <div className="flex items-center flex-col gap-y-2 mt-2 text-center">
        <Link className="border-2 border-black px-2 py-1.5 w-48 shrink-0 break-all" href="/shop/nike">
          View Function1 State
        </Link>
        <Link className="border-2 border-black px-2 py-1.5 w-48 shrink-0 break-all" href="/shop/adidas">
          View Function2 State
        </Link>
        <Link className="border-2 border-black px-2 py-1.5 w-48 shrink-0 break-all" href="/shop/puma">
          Check Function3 Shop
        </Link>
      </div>
    </div>
  );
}

export default Index;
