var S = Object.defineProperty;
var T = (n, t, e) => t in n ? S(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var f = (n, t, e) => (T(n, typeof t != "symbol" ? t + "" : t, e), e);
import { createContext as _, useRef as F, useEffect as w, useContext as L, useState as E } from "react";
const m = "https://mem-api.com/state/", g = "https://mem-api.com/transactions/", v = "https://mem-testnet-bfdc8ff3530f.herokuapp.com/", R = 1024 * 1024, d = {
  async get(n, t = {}) {
    try {
      const e = await fetch(n, {
        method: "GET",
        headers: (t == null ? void 0 : t.headers) || {}
        // add any other configurations if needed
      });
      return { data: await e.json(), status: e.status, statusText: e.statusText, headers: e.headers, config: t };
    } catch (e) {
      throw e;
    }
  },
  async post(n, t = {}, e = {}) {
    try {
      const s = await fetch(n, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...e.headers
        },
        body: JSON.stringify(t)
        // add any other configurations if needed
      });
      return {
        data: await s.json(),
        status: s.status,
        statusText: s.statusText,
        headers: s.headers,
        config: e
      };
    } catch (s) {
      throw s;
    }
  }
  // You can also add other methods like put, delete, etc., in a similar fashion
};
class C {
  constructor(t) {
    f(this, "functionId", "");
    f(this, "state", {});
    f(this, "loaders", {
      isReadLoading: null,
      isWriteLoading: null
    });
    t ? (this.functionId = t, this.read(t)) : console.warn("No functionId provided, set it via setFunctionId");
  }
  setFunctionId(t) {
    this.functionId = t;
  }
  _isFunctionId() {
    if (!this.functionId)
      throw new Error("functionId is not initialized.");
  }
  async read(t) {
    try {
      let e = t || this.functionId;
      t || this._isFunctionId();
      const s = (await d.get(m + e)).data;
      return this.state = s, s;
    } catch (e) {
      console.log(e);
      return;
    }
  }
  async write(t, e) {
    try {
      let s = e || this.functionId;
      e || this._isFunctionId();
      const c = {
        functionId: s,
        inputs: t
      }, i = (await d.post(g, c)).data, h = i.data.execution.state;
      return this.state = h, i;
    } catch (s) {
      console.log(s);
      return;
    }
  }
  /**
   * @param contractType 0 - JavaScript, 1-9 other languages !TODO
   * @param initState JSON.stringify(state)
   * @param input @interface input JSON.stringified too
   * @param contractSrc Stringified contract source code
   */
  async testnet(t = 0, e, s, c) {
    try {
      return (await d.post(v, {
        contractType: t,
        initState: e,
        input: s,
        contractSrc: c
      })).data;
    } catch (i) {
      console.log(i);
      return;
    }
  }
}
const N = _({});
function j(n) {
  const t = F();
  return w(() => {
    t.current = n;
  }, [n]), t.current;
}
function U(n) {
  const t = L(N), [e, s] = E(n || ""), c = j(n || e), [i, h] = E({}), M = t[e];
  if (!t[e]) {
    const a = new C(e);
    t[e] = a;
  }
  w(() => {
    e && c !== e ? I(e) : console.warn("No functionId provided, set it via setFunctionId");
  }, [e]), w(() => {
    console.log(i), JSON.stringify(i).length >= 750 * R && console.warn("State size over 750 KB");
  }, [i]), w(() => {
    Object.keys(t).length >= 10 && console.warn("Instantiated 10 functions -- might decrease performance");
  }, [t]);
  function p(a, r, o) {
    if (!t[o])
      return;
    t[o].loaders[a] = r;
    const u = new CustomEvent("loadStatus", {
      detail: { functionId: o, loaders: t[o].loaders }
    });
    window.dispatchEvent(u);
  }
  const y = () => {
    if (!e)
      throw new Error("functionId is not initialized.");
  }, I = async (a) => {
    try {
      let r = a || e;
      a || y(), p("isReadLoading", !0, r);
      const o = (await d.get(m + r)).data;
      return p("isReadLoading", !1, r), h(o), o;
    } catch (r) {
      console.log(r);
      return;
    }
  };
  return {
    currentFunction: M,
    setFunctionId: s,
    destroyFunctionId: async (a) => {
      delete t[a];
    },
    allFunctions: t,
    state: i,
    read: I,
    write: async (a, r) => {
      try {
        let o = r || e;
        r || y();
        const u = {
          functionId: o,
          inputs: a
        };
        p("isWriteLoading", !0, o);
        const l = (await d.post(g, u)).data;
        p("isWriteLoading", !1, o);
        const x = l.data.execution.state;
        return h(x), l;
      } catch (o) {
        console.log(o);
        return;
      }
    },
    testnet: async (a = 0, r, o, u) => {
      try {
        return (await d.post(v, {
          contractType: a,
          initState: r,
          input: o,
          contractSrc: u
        })).data;
      } catch (l) {
        console.log(l);
        return;
      }
    }
  };
}
export {
  R as KB,
  C as MEM,
  N as MEMContext,
  m as MEM_URL_READ,
  v as MEM_URL_TESTNET,
  g as MEM_URL_WRITE,
  d as axios,
  U as useMEM
};
