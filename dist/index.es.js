var L = Object.defineProperty;
var S = (o, t, e) => t in o ? L(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var f = (o, t, e) => (S(o, typeof t != "symbol" ? t + "" : t, e), e);
import { createContext as _, useContext as F, useState as m, useEffect as w } from "react";
const M = "https://mem-api.com/state/", g = "https://mem-api.com/transactions/", v = "https://mem-testnet-bfdc8ff3530f.herokuapp.com/", R = 1024 * 1024, d = {
  async get(o, t = {}) {
    try {
      const e = await fetch(o, {
        method: "GET",
        headers: (t == null ? void 0 : t.headers) || {}
        // add any other configurations if needed
      });
      return { data: await e.json(), status: e.status, statusText: e.statusText, headers: e.headers, config: t };
    } catch (e) {
      throw e;
    }
  },
  async post(o, t = {}, e = {}) {
    try {
      const s = await fetch(o, {
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
      const s = (await d.get(M + e)).data;
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
      const i = {
        functionId: s,
        inputs: t
      }, c = (await d.post(g, i)).data, p = c.data.execution.state;
      return this.state = p, c;
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
  async testnet(t = 0, e, s, i) {
    try {
      return (await d.post(v, {
        contractType: t,
        initState: e,
        input: s,
        contractSrc: i
      })).data;
    } catch (c) {
      console.log(c);
      return;
    }
  }
}
const N = _({});
function z(o) {
  var E;
  const t = F(N), [e, s] = m(o || ""), [i, c] = m({}), p = (E = t[e]) == null ? void 0 : E.MEM;
  if (!t[e]) {
    const a = new C(e);
    t[e] = {
      MEM: a,
      loaders: {
        isReadLoading: null,
        isWriteLoading: null
      }
    };
  }
  function h(a, r, n) {
    if (!t[n])
      return;
    t[n].loaders[a] = r;
    const u = new CustomEvent("loaderChanged", {
      detail: { loaders: t[n].loaders, functionId: n }
    });
    window.dispatchEvent(u);
  }
  w(() => {
    e ? I(e) : console.warn("No functionId provided, set it via setFunctionId");
  }, [e]), w(() => {
    JSON.stringify(i).length >= 750 * R && console.warn("State size over 750 KB");
  }, [i]), w(() => {
    Object.keys(t).length >= 10 && console.warn("Instantiated 10 functions -- might decrease performance");
  }, [t]);
  const y = () => {
    if (!e)
      throw new Error("functionId is not initialized.");
  }, x = async (a) => {
    delete t[a];
  }, I = async (a) => {
    try {
      let r = a || e;
      a || y(), h("isReadLoading", !0, r);
      const n = (await d.get(M + r)).data;
      return h("isReadLoading", !1, r), c(n), n;
    } catch (r) {
      console.log(r);
      return;
    }
  };
  return {
    currentFunction: p,
    setFunctionId: s,
    destroyFunctionId: x,
    allFunctions: t,
    state: i,
    read: I,
    write: async (a, r) => {
      try {
        let n = r || e;
        r || y();
        const u = {
          functionId: n,
          inputs: a
        };
        h("isWriteLoading", !0, n);
        const l = (await d.post(g, u)).data;
        h("isWriteLoading", !1, n);
        const T = l.data.execution.state;
        return c(T), l;
      } catch (n) {
        console.log(n);
        return;
      }
    },
    testnet: async (a = 0, r, n, u) => {
      try {
        return (await d.post(v, {
          contractType: a,
          initState: r,
          input: n,
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
  N as MEMContext,
  M as MEM_URL_READ,
  v as MEM_URL_TESTNET,
  g as MEM_URL_WRITE,
  d as axios,
  C as default,
  z as useMEM
};
