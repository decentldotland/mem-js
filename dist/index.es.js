var T = Object.defineProperty;
var v = (n, e, t) => e in n ? T(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var f = (n, e, t) => (v(n, typeof e != "symbol" ? e + "" : e, t), t);
import { createContext as _, useContext as S, useState as w, useEffect as F } from "react";
const y = "https://mem-api.com/state/", I = "https://mem-api.com/transactions/", m = "https://mem-testnet-bfdc8ff3530f.herokuapp.com/", d = {
  async get(n, e = {}) {
    try {
      const t = await fetch(n, {
        method: "GET",
        headers: (e == null ? void 0 : e.headers) || {}
        // add any other configurations if needed
      });
      return { data: await t.json(), status: t.status, statusText: t.statusText, headers: t.headers, config: e };
    } catch (t) {
      throw t;
    }
  },
  async post(n, e = {}, t = {}) {
    try {
      const s = await fetch(n, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...t.headers
        },
        body: JSON.stringify(e)
        // add any other configurations if needed
      });
      return {
        data: await s.json(),
        status: s.status,
        statusText: s.statusText,
        headers: s.headers,
        config: t
      };
    } catch (s) {
      throw s;
    }
  }
  // You can also add other methods like put, delete, etc., in a similar fashion
};
class R {
  constructor(e) {
    f(this, "functionId", "");
    f(this, "state", {});
    e ? (this.functionId = e, this.read(e)) : console.warn("No functionId provided, set it via setFunctionId");
  }
  setFunctionId(e) {
    this.functionId = e;
  }
  _isFunctionId() {
    if (!this.functionId)
      throw new Error("functionId is not initialized.");
  }
  async read(e) {
    try {
      let t = e || this.functionId;
      e || this._isFunctionId();
      const s = (await d.get(y + t)).data;
      return this.state = s, s;
    } catch (t) {
      console.log(t);
      return;
    }
  }
  async write(e, t) {
    try {
      let s = t || this.functionId;
      t || this._isFunctionId();
      const c = {
        functionId: s,
        inputs: e
      }, o = (await d.post(I, c)).data, h = o.data.execution.state;
      return this.state = h, o;
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
  async testnet(e = 0, t, s, c) {
    try {
      return (await d.post(m, {
        contractType: e,
        initState: t,
        input: s,
        contractSrc: c
      })).data;
    } catch (o) {
      console.log(o);
      return;
    }
  }
}
const g = _({});
function j(n) {
  const e = S(g), [t, s] = w(n || ""), [c, o] = w({});
  e[t] || (e[t] = new R(t)), F(() => {
    t ? l(t) : console.warn("No functionId provided, set it via setFunctionId");
  }, [t]);
  const h = () => {
    if (!t)
      throw new Error("functionId is not initialized.");
  }, l = async (i) => {
    try {
      let a = i || t;
      i || h();
      const r = (await d.get(y + a)).data;
      return o(r), r;
    } catch (a) {
      console.log(a);
      return;
    }
  }, E = async (i, a) => {
    try {
      let r = a || t;
      a || h();
      const p = {
        functionId: r,
        inputs: i
      }, u = (await d.post(I, p)).data, x = u.data.execution.state;
      return o(x), u;
    } catch (r) {
      console.log(r);
      return;
    }
  }, M = async (i = 0, a, r, p) => {
    try {
      return (await d.post(m, {
        contractType: i,
        initState: a,
        input: r,
        contractSrc: p
      })).data;
    } catch (u) {
      console.log(u);
      return;
    }
  };
  return {
    memInstance: e[t],
    state: c,
    setFunctionId: s,
    read: l,
    write: E,
    testnet: M
  };
}
export {
  g as MEMContext,
  j as useMEM
};
