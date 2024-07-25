import ua, { useState as mr, useRef as Kn, useEffect as Fr, useMemo as Ua } from "react";
import fa from "plotly.js-basic-dist";
import { useQuery as ca } from "@tanstack/react-query";
var da = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _a(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Hn = { exports: {} }, jr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var na;
function Ba() {
  if (na) return jr;
  na = 1;
  var t = ua, e = Symbol.for("react.element"), i = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, h) {
    var u, f = {}, c = null, d = null;
    h !== void 0 && (c = "" + h), l.key !== void 0 && (c = "" + l.key), l.ref !== void 0 && (d = l.ref);
    for (u in l) r.call(l, u) && !a.hasOwnProperty(u) && (f[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) f[u] === void 0 && (f[u] = l[u]);
    return { $$typeof: e, type: s, key: c, ref: d, props: f, _owner: n.current };
  }
  return jr.Fragment = i, jr.jsx = o, jr.jsxs = o, jr;
}
var Zr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa;
function Wa() {
  return aa || (aa = 1, process.env.NODE_ENV !== "production" && function() {
    var t = ua, e = Symbol.for("react.element"), i = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), c = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), v = Symbol.iterator, m = "@@iterator";
    function p(T) {
      if (T === null || typeof T != "object")
        return null;
      var G = v && T[v] || T[m];
      return typeof G == "function" ? G : null;
    }
    var E = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(T) {
      {
        for (var G = arguments.length, Y = new Array(G > 1 ? G - 1 : 0), nt = 1; nt < G; nt++)
          Y[nt - 1] = arguments[nt];
        R("error", T, Y);
      }
    }
    function R(T, G, Y) {
      {
        var nt = E.ReactDebugCurrentFrame, Ot = nt.getStackAddendum();
        Ot !== "" && (G += "%s", Y = Y.concat([Ot]));
        var Wt = Y.map(function(_t) {
          return String(_t);
        });
        Wt.unshift("Warning: " + G), Function.prototype.apply.call(console[T], console, Wt);
      }
    }
    var I = !1, x = !1, C = !1, N = !1, w = !1, X;
    X = Symbol.for("react.module.reference");
    function U(T) {
      return !!(typeof T == "string" || typeof T == "function" || T === r || T === a || w || T === n || T === h || T === u || N || T === d || I || x || C || typeof T == "object" && T !== null && (T.$$typeof === c || T.$$typeof === f || T.$$typeof === o || T.$$typeof === s || T.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      T.$$typeof === X || T.getModuleId !== void 0));
    }
    function P(T, G, Y) {
      var nt = T.displayName;
      if (nt)
        return nt;
      var Ot = G.displayName || G.name || "";
      return Ot !== "" ? Y + "(" + Ot + ")" : Y;
    }
    function O(T) {
      return T.displayName || "Context";
    }
    function q(T) {
      if (T == null)
        return null;
      if (typeof T.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof T == "function")
        return T.displayName || T.name || null;
      if (typeof T == "string")
        return T;
      switch (T) {
        case r:
          return "Fragment";
        case i:
          return "Portal";
        case a:
          return "Profiler";
        case n:
          return "StrictMode";
        case h:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof T == "object")
        switch (T.$$typeof) {
          case s:
            var G = T;
            return O(G) + ".Consumer";
          case o:
            var Y = T;
            return O(Y._context) + ".Provider";
          case l:
            return P(T, T.render, "ForwardRef");
          case f:
            var nt = T.displayName || null;
            return nt !== null ? nt : q(T.type) || "Memo";
          case c: {
            var Ot = T, Wt = Ot._payload, _t = Ot._init;
            try {
              return q(_t(Wt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, b = 0, M, W, B, K, V, $, tt;
    function ft() {
    }
    ft.__reactDisabledLog = !0;
    function Et() {
      {
        if (b === 0) {
          M = console.log, W = console.info, B = console.warn, K = console.error, V = console.group, $ = console.groupCollapsed, tt = console.groupEnd;
          var T = {
            configurable: !0,
            enumerable: !0,
            value: ft,
            writable: !0
          };
          Object.defineProperties(console, {
            info: T,
            log: T,
            warn: T,
            error: T,
            group: T,
            groupCollapsed: T,
            groupEnd: T
          });
        }
        b++;
      }
    }
    function yt() {
      {
        if (b--, b === 0) {
          var T = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, T, {
              value: M
            }),
            info: F({}, T, {
              value: W
            }),
            warn: F({}, T, {
              value: B
            }),
            error: F({}, T, {
              value: K
            }),
            group: F({}, T, {
              value: V
            }),
            groupCollapsed: F({}, T, {
              value: $
            }),
            groupEnd: F({}, T, {
              value: tt
            })
          });
        }
        b < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ht = E.ReactCurrentDispatcher, Tt;
    function Qt(T, G, Y) {
      {
        if (Tt === void 0)
          try {
            throw Error();
          } catch (Ot) {
            var nt = Ot.stack.trim().match(/\n( *(at )?)/);
            Tt = nt && nt[1] || "";
          }
        return `
` + Tt + T;
      }
    }
    var ye = !1, bt;
    {
      var me = typeof WeakMap == "function" ? WeakMap : Map;
      bt = new me();
    }
    function be(T, G) {
      if (!T || ye)
        return "";
      {
        var Y = bt.get(T);
        if (Y !== void 0)
          return Y;
      }
      var nt;
      ye = !0;
      var Ot = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Wt;
      Wt = Ht.current, Ht.current = null, Et();
      try {
        if (G) {
          var _t = function() {
            throw Error();
          };
          if (Object.defineProperty(_t.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(_t, []);
            } catch (ei) {
              nt = ei;
            }
            Reflect.construct(T, [], _t);
          } else {
            try {
              _t.call();
            } catch (ei) {
              nt = ei;
            }
            T.call(_t.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ei) {
            nt = ei;
          }
          T();
        }
      } catch (ei) {
        if (ei && nt && typeof ei.stack == "string") {
          for (var ct = ei.stack.split(`
`), $e = nt.stack.split(`
`), ie = ct.length - 1, he = $e.length - 1; ie >= 1 && he >= 0 && ct[ie] !== $e[he]; )
            he--;
          for (; ie >= 1 && he >= 0; ie--, he--)
            if (ct[ie] !== $e[he]) {
              if (ie !== 1 || he !== 1)
                do
                  if (ie--, he--, he < 0 || ct[ie] !== $e[he]) {
                    var ci = `
` + ct[ie].replace(" at new ", " at ");
                    return T.displayName && ci.includes("<anonymous>") && (ci = ci.replace("<anonymous>", T.displayName)), typeof T == "function" && bt.set(T, ci), ci;
                  }
                while (ie >= 1 && he >= 0);
              break;
            }
        }
      } finally {
        ye = !1, Ht.current = Wt, yt(), Error.prepareStackTrace = Ot;
      }
      var Or = T ? T.displayName || T.name : "", gr = Or ? Qt(Or) : "";
      return typeof T == "function" && bt.set(T, gr), gr;
    }
    function Ce(T, G, Y) {
      return be(T, !1);
    }
    function oi(T) {
      var G = T.prototype;
      return !!(G && G.isReactComponent);
    }
    function er(T, G, Y) {
      if (T == null)
        return "";
      if (typeof T == "function")
        return be(T, oi(T));
      if (typeof T == "string")
        return Qt(T);
      switch (T) {
        case h:
          return Qt("Suspense");
        case u:
          return Qt("SuspenseList");
      }
      if (typeof T == "object")
        switch (T.$$typeof) {
          case l:
            return Ce(T.render);
          case f:
            return er(T.type, G, Y);
          case c: {
            var nt = T, Ot = nt._payload, Wt = nt._init;
            try {
              return er(Wt(Ot), G, Y);
            } catch {
            }
          }
        }
      return "";
    }
    var wi = Object.prototype.hasOwnProperty, Xi = {}, Oi = E.ReactDebugCurrentFrame;
    function fi(T) {
      if (T) {
        var G = T._owner, Y = er(T.type, T._source, G ? G.type : null);
        Oi.setExtraStackFrame(Y);
      } else
        Oi.setExtraStackFrame(null);
    }
    function an(T, G, Y, nt, Ot) {
      {
        var Wt = Function.call.bind(wi);
        for (var _t in T)
          if (Wt(T, _t)) {
            var ct = void 0;
            try {
              if (typeof T[_t] != "function") {
                var $e = Error((nt || "React class") + ": " + Y + " type `" + _t + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof T[_t] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              ct = T[_t](G, _t, nt, Y, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ie) {
              ct = ie;
            }
            ct && !(ct instanceof Error) && (fi(Ot), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", nt || "React class", Y, _t, typeof ct), fi(null)), ct instanceof Error && !(ct.message in Xi) && (Xi[ct.message] = !0, fi(Ot), y("Failed %s type: %s", Y, ct.message), fi(null));
          }
      }
    }
    var on = Array.isArray;
    function dr(T) {
      return on(T);
    }
    function Gn(T) {
      {
        var G = typeof Symbol == "function" && Symbol.toStringTag, Y = G && T[Symbol.toStringTag] || T.constructor.name || "Object";
        return Y;
      }
    }
    function sn(T) {
      try {
        return ln(T), !1;
      } catch {
        return !0;
      }
    }
    function ln(T) {
      return "" + T;
    }
    function Hr(T) {
      if (sn(T))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gn(T)), ln(T);
    }
    var ir = E.ReactCurrentOwner, hn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Kr, zr, _r;
    _r = {};
    function un(T) {
      if (wi.call(T, "ref")) {
        var G = Object.getOwnPropertyDescriptor(T, "ref").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return T.ref !== void 0;
    }
    function fn(T) {
      if (wi.call(T, "key")) {
        var G = Object.getOwnPropertyDescriptor(T, "key").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return T.key !== void 0;
    }
    function cn(T, G) {
      if (typeof T.ref == "string" && ir.current && G && ir.current.stateNode !== G) {
        var Y = q(ir.current.type);
        _r[Y] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(ir.current.type), T.ref), _r[Y] = !0);
      }
    }
    function Un(T, G) {
      {
        var Y = function() {
          Kr || (Kr = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        Y.isReactWarning = !0, Object.defineProperty(T, "key", {
          get: Y,
          configurable: !0
        });
      }
    }
    function Bn(T, G) {
      {
        var Y = function() {
          zr || (zr = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        Y.isReactWarning = !0, Object.defineProperty(T, "ref", {
          get: Y,
          configurable: !0
        });
      }
    }
    var vr = function(T, G, Y, nt, Ot, Wt, _t) {
      var ct = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: T,
        key: G,
        ref: Y,
        props: _t,
        // Record the component responsible for creating this element.
        _owner: Wt
      };
      return ct._store = {}, Object.defineProperty(ct._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ct, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: nt
      }), Object.defineProperty(ct, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ot
      }), Object.freeze && (Object.freeze(ct.props), Object.freeze(ct)), ct;
    };
    function Pi(T, G, Y, nt, Ot) {
      {
        var Wt, _t = {}, ct = null, $e = null;
        Y !== void 0 && (Hr(Y), ct = "" + Y), fn(G) && (Hr(G.key), ct = "" + G.key), un(G) && ($e = G.ref, cn(G, Ot));
        for (Wt in G)
          wi.call(G, Wt) && !hn.hasOwnProperty(Wt) && (_t[Wt] = G[Wt]);
        if (T && T.defaultProps) {
          var ie = T.defaultProps;
          for (Wt in ie)
            _t[Wt] === void 0 && (_t[Wt] = ie[Wt]);
        }
        if (ct || $e) {
          var he = typeof T == "function" ? T.displayName || T.name || "Unknown" : T;
          ct && Un(_t, he), $e && Bn(_t, he);
        }
        return vr(T, ct, $e, Ot, nt, ir.current, _t);
      }
    }
    var rr = E.ReactCurrentOwner, pr = E.ReactDebugCurrentFrame;
    function Ne(T) {
      if (T) {
        var G = T._owner, Y = er(T.type, T._source, G ? G.type : null);
        pr.setExtraStackFrame(Y);
      } else
        pr.setExtraStackFrame(null);
    }
    var Xe;
    Xe = !1;
    function wr(T) {
      return typeof T == "object" && T !== null && T.$$typeof === e;
    }
    function $n() {
      {
        if (rr.current) {
          var T = q(rr.current.type);
          if (T)
            return `

Check the render method of \`` + T + "`.";
        }
        return "";
      }
    }
    function Aa(T) {
      return "";
    }
    var Qn = {};
    function wa(T) {
      {
        var G = $n();
        if (!G) {
          var Y = typeof T == "string" ? T : T.displayName || T.name;
          Y && (G = `

Check the top-level render call using <` + Y + ">.");
        }
        return G;
      }
    }
    function ta(T, G) {
      {
        if (!T._store || T._store.validated || T.key != null)
          return;
        T._store.validated = !0;
        var Y = wa(G);
        if (Qn[Y])
          return;
        Qn[Y] = !0;
        var nt = "";
        T && T._owner && T._owner !== rr.current && (nt = " It was passed a child from " + q(T._owner.type) + "."), Ne(T), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Y, nt), Ne(null);
      }
    }
    function ea(T, G) {
      {
        if (typeof T != "object")
          return;
        if (dr(T))
          for (var Y = 0; Y < T.length; Y++) {
            var nt = T[Y];
            wr(nt) && ta(nt, G);
          }
        else if (wr(T))
          T._store && (T._store.validated = !0);
        else if (T) {
          var Ot = p(T);
          if (typeof Ot == "function" && Ot !== T.entries)
            for (var Wt = Ot.call(T), _t; !(_t = Wt.next()).done; )
              wr(_t.value) && ta(_t.value, G);
        }
      }
    }
    function Oa(T) {
      {
        var G = T.type;
        if (G == null || typeof G == "string")
          return;
        var Y;
        if (typeof G == "function")
          Y = G.propTypes;
        else if (typeof G == "object" && (G.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        G.$$typeof === f))
          Y = G.propTypes;
        else
          return;
        if (Y) {
          var nt = q(G);
          an(Y, T.props, "prop", nt, T);
        } else if (G.PropTypes !== void 0 && !Xe) {
          Xe = !0;
          var Ot = q(G);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ot || "Unknown");
        }
        typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Pa(T) {
      {
        for (var G = Object.keys(T.props), Y = 0; Y < G.length; Y++) {
          var nt = G[Y];
          if (nt !== "children" && nt !== "key") {
            Ne(T), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", nt), Ne(null);
            break;
          }
        }
        T.ref !== null && (Ne(T), y("Invalid attribute `ref` supplied to `React.Fragment`."), Ne(null));
      }
    }
    var ia = {};
    function ra(T, G, Y, nt, Ot, Wt) {
      {
        var _t = U(T);
        if (!_t) {
          var ct = "";
          (T === void 0 || typeof T == "object" && T !== null && Object.keys(T).length === 0) && (ct += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $e = Aa();
          $e ? ct += $e : ct += $n();
          var ie;
          T === null ? ie = "null" : dr(T) ? ie = "array" : T !== void 0 && T.$$typeof === e ? (ie = "<" + (q(T.type) || "Unknown") + " />", ct = " Did you accidentally export a JSX literal instead of a component?") : ie = typeof T, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ie, ct);
        }
        var he = Pi(T, G, Y, Ot, Wt);
        if (he == null)
          return he;
        if (_t) {
          var ci = G.children;
          if (ci !== void 0)
            if (nt)
              if (dr(ci)) {
                for (var Or = 0; Or < ci.length; Or++)
                  ea(ci[Or], T);
                Object.freeze && Object.freeze(ci);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ea(ci, T);
        }
        if (wi.call(G, "key")) {
          var gr = q(T), ei = Object.keys(G).filter(function(Ga) {
            return Ga !== "key";
          }), Wn = ei.length > 0 ? "{key: someKey, " + ei.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ia[gr + Wn]) {
            var Na = ei.length > 0 ? "{" + ei.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Wn, gr, Na, gr), ia[gr + Wn] = !0;
          }
        }
        return T === r ? Pa(he) : Oa(he), he;
      }
    }
    function Ma(T, G, Y) {
      return ra(T, G, Y, !0);
    }
    function Da(T, G, Y) {
      return ra(T, G, Y, !1);
    }
    var Fa = Da, ba = Ma;
    Zr.Fragment = r, Zr.jsx = Fa, Zr.jsxs = ba;
  }()), Zr;
}
process.env.NODE_ENV === "production" ? Hn.exports = Ba() : Hn.exports = Wa();
var vt = Hn.exports, Er = function(t, e, i, r) {
  function n(a) {
    return a instanceof i ? a : new i(function(o) {
      o(a);
    });
  }
  return new (i || (i = Promise))(function(a, o) {
    function s(u) {
      try {
        h(r.next(u));
      } catch (f) {
        o(f);
      }
    }
    function l(u) {
      try {
        h(r.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function h(u) {
      u.done ? a(u.value) : n(u.value).then(s, l);
    }
    h((r = r.apply(t, e || [])).next());
  });
};
const ka = "https://cwms-data.usace.army.mil/cwms-data".replace(/\/+$/, "");
class On {
  constructor(e = {}) {
    this.configuration = e;
  }
  set config(e) {
    this.configuration = e;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : ka;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || va;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const e = this.configuration.apiKey;
    if (e)
      return typeof e == "function" ? e : () => e;
  }
  get accessToken() {
    const e = this.configuration.accessToken;
    if (e)
      return typeof e == "function" ? e : () => Er(this, void 0, void 0, function* () {
        return e;
      });
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
const Xa = new On();
class Pn {
  constructor(e = Xa) {
    this.configuration = e, this.fetchApi = (i, r) => Er(this, void 0, void 0, function* () {
      let n = { url: i, init: r };
      for (const o of this.middleware)
        o.pre && (n = (yield o.pre(Object.assign({ fetch: this.fetchApi }, n))) || n);
      let a;
      try {
        a = yield (this.configuration.fetchApi || fetch)(n.url, n.init);
      } catch (o) {
        for (const s of this.middleware)
          s.onError && (a = (yield s.onError({
            fetch: this.fetchApi,
            url: n.url,
            init: n.init,
            error: o,
            response: a ? a.clone() : void 0
          })) || a);
        if (a === void 0)
          throw o instanceof Error ? new Ka(o, "The request failed and the interceptors did not return an alternative response") : o;
      }
      for (const o of this.middleware)
        o.post && (a = (yield o.post({
          fetch: this.fetchApi,
          url: n.url,
          init: n.init,
          response: a.clone()
        })) || a);
      return a;
    }), this.middleware = e.middleware;
  }
  withMiddleware(...e) {
    const i = this.clone();
    return i.middleware = i.middleware.concat(...e), i;
  }
  withPreMiddleware(...e) {
    const i = e.map((r) => ({ pre: r }));
    return this.withMiddleware(...i);
  }
  withPostMiddleware(...e) {
    const i = e.map((r) => ({ post: r }));
    return this.withMiddleware(...i);
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(e) {
    return e ? Pn.jsonRegex.test(e) : !1;
  }
  request(e, i) {
    return Er(this, void 0, void 0, function* () {
      const { url: r, init: n } = yield this.createFetchParams(e, i), a = yield this.fetchApi(r, n);
      if (a && a.status >= 200 && a.status < 300)
        return a;
      throw new Ha(a, "Response returned an error code");
    });
  }
  createFetchParams(e, i) {
    return Er(this, void 0, void 0, function* () {
      let r = this.configuration.basePath + e.path;
      e.query !== void 0 && Object.keys(e.query).length !== 0 && (r += "?" + this.configuration.queryParamsStringify(e.query));
      const n = Object.assign({}, this.configuration.headers, e.headers);
      Object.keys(n).forEach((u) => n[u] === void 0 ? delete n[u] : {});
      const a = typeof i == "function" ? i : () => Er(this, void 0, void 0, function* () {
        return i;
      }), o = {
        method: e.method,
        headers: n,
        body: e.body,
        credentials: this.configuration.credentials
      }, s = Object.assign(Object.assign({}, o), yield a({
        init: o,
        context: e
      }));
      let l;
      Va(s.body) || s.body instanceof URLSearchParams || Ya(s.body) ? l = s.body : this.isJsonMime(n["Content-Type"]) ? l = JSON.stringify(s.body) : l = s.body;
      const h = Object.assign(Object.assign({}, s), { body: l });
      return { url: r, init: h };
    });
  }
  /**
   * Create a shallow clone of `this` by constructing a new instance
   * and then shallow cloning data members.
   */
  clone() {
    const e = this.constructor, i = new e(this.configuration);
    return i.middleware = this.middleware.slice(), i;
  }
}
Pn.jsonRegex = new RegExp("^(:?application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(:?;.*)?$", "i");
function Ya(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function Va(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
class Ha extends Error {
  constructor(e, i) {
    super(i), this.response = e, this.name = "ResponseError";
  }
}
class Ka extends Error {
  constructor(e, i) {
    super(i), this.cause = e, this.name = "FetchError";
  }
}
class nr extends Error {
  constructor(e, i) {
    super(i), this.field = e, this.name = "RequiredError";
  }
}
function va(t, e = "") {
  return Object.keys(t).map((i) => pa(i, t[i], e)).filter((i) => i.length > 0).join("&");
}
function pa(t, e, i = "") {
  const r = i + (i.length ? `[${t}]` : t);
  if (e instanceof Array) {
    const n = e.map((a) => encodeURIComponent(String(a))).join(`&${encodeURIComponent(r)}=`);
    return `${encodeURIComponent(r)}=${n}`;
  }
  if (e instanceof Set) {
    const n = Array.from(e);
    return pa(t, n, i);
  }
  return e instanceof Date ? `${encodeURIComponent(r)}=${encodeURIComponent(e.toISOString())}` : e instanceof Object ? va(e, r) : `${encodeURIComponent(r)}=${encodeURIComponent(String(e))}`;
}
class za {
  constructor(e, i = (r) => r) {
    this.raw = e, this.transformer = i;
  }
  value() {
    return Er(this, void 0, void 0, function* () {
      return this.transformer(yield this.raw.json());
    });
  }
}
class kn {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return Er(this, void 0, void 0, function* () {
    });
  }
}
function ja(t) {
  return Za(t);
}
function Za(t, e) {
  return t == null ? t : {
    estimate: t.estimate == null ? void 0 : t.estimate,
    toDatum: t.toDatum == null ? void 0 : t.toDatum,
    value: t.value == null ? void 0 : t.value
  };
}
function Ja(t) {
  return t == null ? t : {
    estimate: t.estimate,
    toDatum: t.toDatum,
    value: t.value
  };
}
function qa(t) {
  return $a(t);
}
function $a(t, e) {
  return t == null ? t : {
    name: t.name == null ? void 0 : t.name,
    ordinal: t.ordinal == null ? void 0 : t.ordinal,
    datatype: t.datatype == null ? void 0 : t.datatype
  };
}
function Qa(t) {
  return to(t);
}
function to(t, e) {
  return t == null ? t : {
    seconds: t.seconds == null ? void 0 : t.seconds,
    nano: t.nano == null ? void 0 : t.nano,
    zero: t.zero == null ? void 0 : t.zero,
    negative: t.negative == null ? void 0 : t.negative
  };
}
function eo(t) {
  return t == null ? t : {
    seconds: t.seconds,
    nano: t.nano,
    zero: t.zero,
    negative: t.negative
  };
}
function io(t) {
  return ro(t);
}
function ro(t, e) {
  return t == null ? t : {
    duration: t.duration == null ? void 0 : Qa(t.duration),
    durationEstimated: t.durationEstimated == null ? void 0 : t.durationEstimated,
    dateBased: t.dateBased == null ? void 0 : t.dateBased,
    timeBased: t.timeBased == null ? void 0 : t.timeBased
  };
}
function no(t) {
  return t == null ? t : {
    duration: eo(t.duration),
    durationEstimated: t.durationEstimated,
    dateBased: t.dateBased,
    timeBased: t.timeBased
  };
}
function ao(t) {
  return oo(t);
}
function oo(t, e) {
  return t == null ? t : {
    seconds: t.seconds == null ? void 0 : t.seconds,
    nano: t.nano == null ? void 0 : t.nano,
    zero: t.zero == null ? void 0 : t.zero,
    units: t.units == null ? void 0 : t.units.map(io),
    negative: t.negative == null ? void 0 : t.negative
  };
}
function so(t) {
  return t == null ? t : {
    seconds: t.seconds,
    nano: t.nano,
    zero: t.zero,
    units: t.units == null ? void 0 : t.units.map(no),
    negative: t.negative
  };
}
function lo(t) {
  return ho(t);
}
function ho(t, e) {
  return t == null ? t : {
    office: t.office == null ? void 0 : t.office,
    unit: t.unit == null ? void 0 : t.unit,
    location: t.location == null ? void 0 : t.location,
    nativeDatum: t["native-datum"] == null ? void 0 : t["native-datum"],
    elevation: t.elevation == null ? void 0 : t.elevation,
    offsets: t.offsets == null ? void 0 : t.offsets.map(ja)
  };
}
function uo(t) {
  return t == null ? t : {
    office: t.office,
    unit: t.unit,
    location: t.location,
    "native-datum": t.nativeDatum,
    elevation: t.elevation,
    offsets: t.offsets == null ? void 0 : t.offsets.map(Ja)
  };
}
function fo(t) {
  return co(t);
}
function co(t, e) {
  return t == null ? t : {
    begin: t.begin == null ? void 0 : new Date(t.begin),
    end: t.end == null ? void 0 : new Date(t.end),
    interval: t.interval == null ? void 0 : ao(t.interval),
    intervalOffset: t["interval-offset"] == null ? void 0 : t["interval-offset"],
    name: t.name == null ? void 0 : t.name,
    nextPage: t["next-page"] == null ? void 0 : t["next-page"],
    officeId: t["office-id"] == null ? void 0 : t["office-id"],
    page: t.page == null ? void 0 : t.page,
    pageSize: t["page-size"] == null ? void 0 : t["page-size"],
    timeZone: t["time-zone"] == null ? void 0 : t["time-zone"],
    total: t.total == null ? void 0 : t.total,
    units: t.units,
    valueColumns: t["value-columns"] == null ? void 0 : t["value-columns"].map(qa),
    values: t.values == null ? void 0 : t.values,
    verticalDatumInfo: t["vertical-datum-info"] == null ? void 0 : lo(t["vertical-datum-info"])
  };
}
function oa(t) {
  return t == null ? t : {
    interval: so(t.interval),
    name: t.name,
    "office-id": t.officeId,
    units: t.units,
    values: t.values,
    "vertical-datum-info": uo(t.verticalDatumInfo)
  };
}
var ar = function(t, e, i, r) {
  function n(a) {
    return a instanceof i ? a : new i(function(o) {
      o(a);
    });
  }
  return new (i || (i = Promise))(function(a, o) {
    function s(u) {
      try {
        h(r.next(u));
      } catch (f) {
        o(f);
      }
    }
    function l(u) {
      try {
        h(r.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function h(u) {
      u.done ? a(u.value) : n(u.value).then(s, l);
    }
    h((r = r.apply(t, e || [])).next());
  });
};
class zn extends Pn {
  /**
   * Delete cwmsData timeseries with timeseries
   */
  deleteCwmsDataTimeseriesWithTimeseriesRaw(e, i) {
    return ar(this, void 0, void 0, function* () {
      if (e.timeseries == null)
        throw new nr("timeseries", 'Required parameter "timeseries" was null or undefined when calling deleteCwmsDataTimeseriesWithTimeseries().');
      if (e.office == null)
        throw new nr("office", 'Required parameter "office" was null or undefined when calling deleteCwmsDataTimeseriesWithTimeseries().');
      if (e.begin == null)
        throw new nr("begin", 'Required parameter "begin" was null or undefined when calling deleteCwmsDataTimeseriesWithTimeseries().');
      if (e.end == null)
        throw new nr("end", 'Required parameter "end" was null or undefined when calling deleteCwmsDataTimeseriesWithTimeseries().');
      const r = {};
      e.office != null && (r.office = e.office), e.begin != null && (r.begin = e.begin), e.end != null && (r.end = e.end), e.timezone != null && (r.timezone = e.timezone), e.versionDate != null && (r["version-date"] = e.versionDate), e.startTimeInclusive != null && (r["start-time-inclusive"] = e.startTimeInclusive), e.endTimeInclusive != null && (r["end-time-inclusive"] = e.endTimeInclusive), e.maxVersion != null && (r["max-version"] = e.maxVersion), e.overrideProtection != null && (r["override-protection"] = e.overrideProtection);
      const n = {};
      this.configuration && this.configuration.apiKey && (n.Authorization = yield this.configuration.apiKey("Authorization"));
      const a = yield this.request({
        path: "/timeseries/{timeseries}".replace("{timeseries}", encodeURIComponent(String(e.timeseries))),
        method: "DELETE",
        headers: n,
        query: r
      }, i);
      return new kn(a);
    });
  }
  /**
   * Delete cwmsData timeseries with timeseries
   */
  deleteCwmsDataTimeseriesWithTimeseries(e, i) {
    return ar(this, void 0, void 0, function* () {
      yield this.deleteCwmsDataTimeseriesWithTimeseriesRaw(e, i);
    });
  }
  /**
   * Get cwmsData timeseries
   */
  getCwmsDataTimeseriesRaw(e, i) {
    return ar(this, void 0, void 0, function* () {
      if (e.name == null)
        throw new nr("name", 'Required parameter "name" was null or undefined when calling getCwmsDataTimeseries().');
      const r = {};
      e.name != null && (r.name = e.name), e.office != null && (r.office = e.office), e.unit != null && (r.unit = e.unit), e.datum != null && (r.datum = e.datum), e.begin != null && (r.begin = e.begin), e.end != null && (r.end = e.end), e.timezone != null && (r.timezone = e.timezone), e.format != null && (r.format = e.format), e.page != null && (r.page = e.page), e.pageSize != null && (r["page-size"] = e.pageSize);
      const n = {}, a = yield this.request({
        path: "/timeseries",
        method: "GET",
        headers: n,
        query: r
      }, i);
      return new za(a, (o) => fo(o));
    });
  }
  /**
   * Get cwmsData timeseries
   */
  getCwmsDataTimeseries(e, i) {
    return ar(this, void 0, void 0, function* () {
      return yield (yield this.getCwmsDataTimeseriesRaw(e, i)).value();
    });
  }
  /**
   * Update a TimeSeries with provided values
   * Patch cwmsData timeseries with timeseries
   */
  patchCwmsDataTimeseriesWithTimeseriesRaw(e, i) {
    return ar(this, void 0, void 0, function* () {
      if (e.timeseries == null)
        throw new nr("timeseries", 'Required parameter "timeseries" was null or undefined when calling patchCwmsDataTimeseriesWithTimeseries().');
      if (e.timeSeries == null)
        throw new nr("timeSeries", 'Required parameter "timeSeries" was null or undefined when calling patchCwmsDataTimeseriesWithTimeseries().');
      const r = {};
      e.versionDate != null && (r["version-date"] = e.versionDate), e.timezone != null && (r.timezone = e.timezone), e.createAsLrts != null && (r["create-as-lrts"] = e.createAsLrts), e.storeRule != null && (r["store-rule"] = e.storeRule), e.overrideProtection != null && (r["override-protection"] = e.overrideProtection);
      const n = {};
      n["Content-Type"] = "application/json;version=2", this.configuration && this.configuration.apiKey && (n.Authorization = yield this.configuration.apiKey("Authorization"));
      const a = yield this.request({
        path: "/timeseries/{timeseries}".replace("{timeseries}", encodeURIComponent(String(e.timeseries))),
        method: "PATCH",
        headers: n,
        query: r,
        body: oa(e.timeSeries)
      }, i);
      return new kn(a);
    });
  }
  /**
   * Update a TimeSeries with provided values
   * Patch cwmsData timeseries with timeseries
   */
  patchCwmsDataTimeseriesWithTimeseries(e, i) {
    return ar(this, void 0, void 0, function* () {
      yield this.patchCwmsDataTimeseriesWithTimeseriesRaw(e, i);
    });
  }
  /**
   * Used to create and save time-series data. Data to be stored must have time stamps in UTC represented as epoch milliseconds
   * Post cwmsData timeseries
   */
  postCwmsDataTimeseriesRaw(e, i) {
    return ar(this, void 0, void 0, function* () {
      if (e.timeSeries == null)
        throw new nr("timeSeries", 'Required parameter "timeSeries" was null or undefined when calling postCwmsDataTimeseries().');
      const r = {};
      e.versionDate != null && (r["version-date"] = e.versionDate), e.timezone != null && (r.timezone = e.timezone), e.createAsLrts != null && (r["create-as-lrts"] = e.createAsLrts), e.storeRule != null && (r["store-rule"] = e.storeRule), e.overrideProtection != null && (r["override-protection"] = e.overrideProtection);
      const n = {};
      n["Content-Type"] = "application/json;version=2", this.configuration && this.configuration.apiKey && (n.Authorization = yield this.configuration.apiKey("Authorization"));
      const a = yield this.request({
        path: "/timeseries",
        method: "POST",
        headers: n,
        query: r,
        body: oa(e.timeSeries)
      }, i);
      return new kn(a);
    });
  }
  /**
   * Used to create and save time-series data. Data to be stored must have time stamps in UTC represented as epoch milliseconds
   * Post cwmsData timeseries
   */
  postCwmsDataTimeseries(e, i) {
    return ar(this, void 0, void 0, function* () {
      yield this.postCwmsDataTimeseriesRaw(e, i);
    });
  }
}
const _o = new On({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2"
  }
}), vo = new zn(_o), Xo = ({ queryParams: t, responsive: e = !0, ...i }) => {
  const [r, n] = mr(null), [a, o] = mr(null), s = Kn(null);
  if (Fr(() => {
    (async () => {
      const h = window.performance.now();
      try {
        vo.getCwmsDataTimeseriesRaw(t).then(async (u) => {
          let f = await u.raw.json();
          return f.url = u.raw.url, f;
        }).then((u) => {
          u.query_str = u.url, n(u), o(
            ((window.performance.now() - h) / 1e3).toFixed(2)
          );
        }).catch((u) => {
          console.error(u), n({ error: u.message });
        });
      } catch (u) {
        console.error("Failed to fetch: ", u), n({ error: u.message });
      }
    })();
  }, [t, o]), Fr(() => {
    if (r && r.values) {
      const l = [
        {
          x: r.values.map((u) => new Date(u[0])),
          y: r.values.map((u) => u[1]),
          type: "scatter",
          mode: "lines",
          marker: { color: "blue" }
        }
      ], h = {
        title: (t == null ? void 0 : t.name) || "Timeseries Plot",
        xaxis: { title: "Date" },
        yaxis: { title: t == null ? void 0 : t.name.split(".")[1] }
      };
      fa.newPlot(s.current, l, h, { responsive: e });
    }
  }, [r, t]), r) {
    if (r.error)
      return /* @__PURE__ */ vt.jsxs("div", { children: [
        "Error: ",
        r.error
      ] });
    if (r.values && r.values.length === 0)
      return /* @__PURE__ */ vt.jsxs("div", { children: [
        "No data found for the query ",
        r.url
      ] });
  } else return /* @__PURE__ */ vt.jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ vt.jsx(
    "div",
    {
      ref: s,
      title: `Loaded in ${a} seconds`,
      style: { width: "100%", height: "500px" },
      ...i
    }
  );
};
var ga = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(da, function() {
    var i = 1e3, r = 6e4, n = 36e5, a = "millisecond", o = "second", s = "minute", l = "hour", h = "day", u = "week", f = "month", c = "quarter", d = "year", v = "date", m = "Invalid Date", p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, E = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
      var b = ["th", "st", "nd", "rd"], M = F % 100;
      return "[" + F + (b[(M - 20) % 10] || b[M] || b[0]) + "]";
    } }, R = function(F, b, M) {
      var W = String(F);
      return !W || W.length >= b ? F : "" + Array(b + 1 - W.length).join(M) + F;
    }, I = { s: R, z: function(F) {
      var b = -F.utcOffset(), M = Math.abs(b), W = Math.floor(M / 60), B = M % 60;
      return (b <= 0 ? "+" : "-") + R(W, 2, "0") + ":" + R(B, 2, "0");
    }, m: function F(b, M) {
      if (b.date() < M.date()) return -F(M, b);
      var W = 12 * (M.year() - b.year()) + (M.month() - b.month()), B = b.clone().add(W, f), K = M - B < 0, V = b.clone().add(W + (K ? -1 : 1), f);
      return +(-(W + (M - B) / (K ? B - V : V - B)) || 0);
    }, a: function(F) {
      return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
    }, p: function(F) {
      return { M: f, y: d, w: u, d: h, D: v, h: l, m: s, s: o, ms: a, Q: c }[F] || String(F || "").toLowerCase().replace(/s$/, "");
    }, u: function(F) {
      return F === void 0;
    } }, x = "en", C = {};
    C[x] = y;
    var N = "$isDayjsObject", w = function(F) {
      return F instanceof O || !(!F || !F[N]);
    }, X = function F(b, M, W) {
      var B;
      if (!b) return x;
      if (typeof b == "string") {
        var K = b.toLowerCase();
        C[K] && (B = K), M && (C[K] = M, B = K);
        var V = b.split("-");
        if (!B && V.length > 1) return F(V[0]);
      } else {
        var $ = b.name;
        C[$] = b, B = $;
      }
      return !W && B && (x = B), B || !W && x;
    }, U = function(F, b) {
      if (w(F)) return F.clone();
      var M = typeof b == "object" ? b : {};
      return M.date = F, M.args = arguments, new O(M);
    }, P = I;
    P.l = X, P.i = w, P.w = function(F, b) {
      return U(F, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
    };
    var O = function() {
      function F(M) {
        this.$L = X(M.locale, null, !0), this.parse(M), this.$x = this.$x || M.x || {}, this[N] = !0;
      }
      var b = F.prototype;
      return b.parse = function(M) {
        this.$d = function(W) {
          var B = W.date, K = W.utc;
          if (B === null) return /* @__PURE__ */ new Date(NaN);
          if (P.u(B)) return /* @__PURE__ */ new Date();
          if (B instanceof Date) return new Date(B);
          if (typeof B == "string" && !/Z$/i.test(B)) {
            var V = B.match(p);
            if (V) {
              var $ = V[2] - 1 || 0, tt = (V[7] || "0").substring(0, 3);
              return K ? new Date(Date.UTC(V[1], $, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, tt)) : new Date(V[1], $, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, tt);
            }
          }
          return new Date(B);
        }(M), this.init();
      }, b.init = function() {
        var M = this.$d;
        this.$y = M.getFullYear(), this.$M = M.getMonth(), this.$D = M.getDate(), this.$W = M.getDay(), this.$H = M.getHours(), this.$m = M.getMinutes(), this.$s = M.getSeconds(), this.$ms = M.getMilliseconds();
      }, b.$utils = function() {
        return P;
      }, b.isValid = function() {
        return this.$d.toString() !== m;
      }, b.isSame = function(M, W) {
        var B = U(M);
        return this.startOf(W) <= B && B <= this.endOf(W);
      }, b.isAfter = function(M, W) {
        return U(M) < this.startOf(W);
      }, b.isBefore = function(M, W) {
        return this.endOf(W) < U(M);
      }, b.$g = function(M, W, B) {
        return P.u(M) ? this[W] : this.set(B, M);
      }, b.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, b.valueOf = function() {
        return this.$d.getTime();
      }, b.startOf = function(M, W) {
        var B = this, K = !!P.u(W) || W, V = P.p(M), $ = function(ye, bt) {
          var me = P.w(B.$u ? Date.UTC(B.$y, bt, ye) : new Date(B.$y, bt, ye), B);
          return K ? me : me.endOf(h);
        }, tt = function(ye, bt) {
          return P.w(B.toDate()[ye].apply(B.toDate("s"), (K ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(bt)), B);
        }, ft = this.$W, Et = this.$M, yt = this.$D, Ht = "set" + (this.$u ? "UTC" : "");
        switch (V) {
          case d:
            return K ? $(1, 0) : $(31, 11);
          case f:
            return K ? $(1, Et) : $(0, Et + 1);
          case u:
            var Tt = this.$locale().weekStart || 0, Qt = (ft < Tt ? ft + 7 : ft) - Tt;
            return $(K ? yt - Qt : yt + (6 - Qt), Et);
          case h:
          case v:
            return tt(Ht + "Hours", 0);
          case l:
            return tt(Ht + "Minutes", 1);
          case s:
            return tt(Ht + "Seconds", 2);
          case o:
            return tt(Ht + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, b.endOf = function(M) {
        return this.startOf(M, !1);
      }, b.$set = function(M, W) {
        var B, K = P.p(M), V = "set" + (this.$u ? "UTC" : ""), $ = (B = {}, B[h] = V + "Date", B[v] = V + "Date", B[f] = V + "Month", B[d] = V + "FullYear", B[l] = V + "Hours", B[s] = V + "Minutes", B[o] = V + "Seconds", B[a] = V + "Milliseconds", B)[K], tt = K === h ? this.$D + (W - this.$W) : W;
        if (K === f || K === d) {
          var ft = this.clone().set(v, 1);
          ft.$d[$](tt), ft.init(), this.$d = ft.set(v, Math.min(this.$D, ft.daysInMonth())).$d;
        } else $ && this.$d[$](tt);
        return this.init(), this;
      }, b.set = function(M, W) {
        return this.clone().$set(M, W);
      }, b.get = function(M) {
        return this[P.p(M)]();
      }, b.add = function(M, W) {
        var B, K = this;
        M = Number(M);
        var V = P.p(W), $ = function(Et) {
          var yt = U(K);
          return P.w(yt.date(yt.date() + Math.round(Et * M)), K);
        };
        if (V === f) return this.set(f, this.$M + M);
        if (V === d) return this.set(d, this.$y + M);
        if (V === h) return $(1);
        if (V === u) return $(7);
        var tt = (B = {}, B[s] = r, B[l] = n, B[o] = i, B)[V] || 1, ft = this.$d.getTime() + M * tt;
        return P.w(ft, this);
      }, b.subtract = function(M, W) {
        return this.add(-1 * M, W);
      }, b.format = function(M) {
        var W = this, B = this.$locale();
        if (!this.isValid()) return B.invalidDate || m;
        var K = M || "YYYY-MM-DDTHH:mm:ssZ", V = P.z(this), $ = this.$H, tt = this.$m, ft = this.$M, Et = B.weekdays, yt = B.months, Ht = B.meridiem, Tt = function(bt, me, be, Ce) {
          return bt && (bt[me] || bt(W, K)) || be[me].slice(0, Ce);
        }, Qt = function(bt) {
          return P.s($ % 12 || 12, bt, "0");
        }, ye = Ht || function(bt, me, be) {
          var Ce = bt < 12 ? "AM" : "PM";
          return be ? Ce.toLowerCase() : Ce;
        };
        return K.replace(E, function(bt, me) {
          return me || function(be) {
            switch (be) {
              case "YY":
                return String(W.$y).slice(-2);
              case "YYYY":
                return P.s(W.$y, 4, "0");
              case "M":
                return ft + 1;
              case "MM":
                return P.s(ft + 1, 2, "0");
              case "MMM":
                return Tt(B.monthsShort, ft, yt, 3);
              case "MMMM":
                return Tt(yt, ft);
              case "D":
                return W.$D;
              case "DD":
                return P.s(W.$D, 2, "0");
              case "d":
                return String(W.$W);
              case "dd":
                return Tt(B.weekdaysMin, W.$W, Et, 2);
              case "ddd":
                return Tt(B.weekdaysShort, W.$W, Et, 3);
              case "dddd":
                return Et[W.$W];
              case "H":
                return String($);
              case "HH":
                return P.s($, 2, "0");
              case "h":
                return Qt(1);
              case "hh":
                return Qt(2);
              case "a":
                return ye($, tt, !0);
              case "A":
                return ye($, tt, !1);
              case "m":
                return String(tt);
              case "mm":
                return P.s(tt, 2, "0");
              case "s":
                return String(W.$s);
              case "ss":
                return P.s(W.$s, 2, "0");
              case "SSS":
                return P.s(W.$ms, 3, "0");
              case "Z":
                return V;
            }
            return null;
          }(bt) || V.replace(":", "");
        });
      }, b.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, b.diff = function(M, W, B) {
        var K, V = this, $ = P.p(W), tt = U(M), ft = (tt.utcOffset() - this.utcOffset()) * r, Et = this - tt, yt = function() {
          return P.m(V, tt);
        };
        switch ($) {
          case d:
            K = yt() / 12;
            break;
          case f:
            K = yt();
            break;
          case c:
            K = yt() / 3;
            break;
          case u:
            K = (Et - ft) / 6048e5;
            break;
          case h:
            K = (Et - ft) / 864e5;
            break;
          case l:
            K = Et / n;
            break;
          case s:
            K = Et / r;
            break;
          case o:
            K = Et / i;
            break;
          default:
            K = Et;
        }
        return B ? K : P.a(K);
      }, b.daysInMonth = function() {
        return this.endOf(f).$D;
      }, b.$locale = function() {
        return C[this.$L];
      }, b.locale = function(M, W) {
        if (!M) return this.$L;
        var B = this.clone(), K = X(M, W, !0);
        return K && (B.$L = K), B;
      }, b.clone = function() {
        return P.w(this.$d, this);
      }, b.toDate = function() {
        return new Date(this.valueOf());
      }, b.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, b.toISOString = function() {
        return this.$d.toISOString();
      }, b.toString = function() {
        return this.$d.toUTCString();
      }, F;
    }(), q = O.prototype;
    return U.prototype = q, [["$ms", a], ["$s", o], ["$m", s], ["$H", l], ["$W", h], ["$M", f], ["$y", d], ["$D", v]].forEach(function(F) {
      q[F[1]] = function(b) {
        return this.$g(b, F[0], F[1]);
      };
    }), U.extend = function(F, b) {
      return F.$i || (F(b, O, U), F.$i = !0), U;
    }, U.locale = X, U.isDayjs = w, U.unix = function(F) {
      return U(1e3 * F);
    }, U.en = C[x], U.Ls = C, U.p = {}, U;
  });
})(ga);
var po = ga.exports;
const go = /* @__PURE__ */ _a(po);
function yo(t, e) {
  return Number(t).toFixed(e);
}
function mo({
  h1: t,
  subTitle: e,
  heading: i,
  content: r,
  order: n = "desc",
  precision: a = 4,
  dateFormat: o = "MM-DD-YYYY HH:mm",
  ...s
}) {
  const l = Ua(() => [...r].sort((h, u) => h[1] < u[1] ? n === "asc" ? -1 : 1 : h[1] > u[1] ? n === "asc" ? 1 : -1 : 0), [r, n]);
  return /* @__PURE__ */ vt.jsxs("div", { className: "gw-px-4 gw-sm:px-6 gw-lg:px-8", children: [
    /* @__PURE__ */ vt.jsx("div", { className: "gw-sm:flex gw-sm:items-center", children: /* @__PURE__ */ vt.jsxs("div", { className: "gw-sm:flex-auto", children: [
      t && /* @__PURE__ */ vt.jsx("h1", { className: "gw-text-base gw-font-semibold gw-leading-6 gw-text-gray-900", children: t }),
      e && /* @__PURE__ */ vt.jsx("p", { className: "gw-mt-2 gw-text-sm gw-text-gray-700", children: e })
    ] }) }),
    /* @__PURE__ */ vt.jsx("div", { className: "gw-mt-8 gw-flow-root", children: /* @__PURE__ */ vt.jsx("div", { className: "gw--mx-4 gw--my-2 gw-overflow-x-auto gw-sm:-mx-6 gw-lg:-mx-8", children: /* @__PURE__ */ vt.jsx("div", { className: "gw-inline-block gw-min-w-full gw-py-2 gw-align-middle gw-sm:px-6 gw-lg:px-8", children: /* @__PURE__ */ vt.jsxs("table", { className: "gw-min-w-full gw-divide-y gw-divide-gray-300", children: [
      /* @__PURE__ */ vt.jsx("thead", { children: /* @__PURE__ */ vt.jsx("tr", { children: i.map((h) => /* @__PURE__ */ vt.jsx("th", { scope: "col", className: "gw-py-3.5 gw-pl-4 gw-pr-3 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900 gw-sm:pl-3", children: h }, h)) }) }),
      /* @__PURE__ */ vt.jsx("tbody", { className: "gw-bg-white", children: l.map((h) => /* @__PURE__ */ vt.jsxs("tr", { className: "gw-even:bg-gray-50", children: [
        /* @__PURE__ */ vt.jsx("td", { className: "gw-whitespace-nowrap gw-py-4 gw-pl-4 gw-pr-3 gw-text-sm gw-font-medium gw-text-gray-900 gw-sm:pl-3", children: go(h[0]).format(o) }),
        /* @__PURE__ */ vt.jsx("td", { className: "gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500", children: yo(h[1], a) }),
        /* @__PURE__ */ vt.jsx("td", { className: "gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500", children: h[2] })
      ] }, h[0])) })
    ] }) }) }) })
  ] });
}
const Eo = new On({
  // basePath: "https://water.usace.army.mil/cwms-data",
  headers: {
    accept: "application/json;version=2"
  }
}), To = new zn(Eo), Ro = async ({ queryKey: t }) => {
  const [, e] = t, i = await To.getCwmsDataTimeseriesRaw(e), r = await i.raw.json();
  return r.url = i.raw.url, r;
}, Yo = ({ queryParams: t, precision: e, ...i }) => {
  const [r, n] = mr(null), { data: a, error: o, isLoading: s, isError: l } = ca({
    queryKey: ["timeseriesData", t],
    queryFn: Ro,
    onSuccess: () => {
      n(((window.performance.now() - startTime) / 1e3).toFixed(2));
    }
  });
  return Fr(() => {
    window.performance.now(), n(null);
  }, [t]), s ? /* @__PURE__ */ vt.jsx("div", { children: "Loading..." }) : l ? /* @__PURE__ */ vt.jsxs("div", { children: [
    "Error: ",
    o.message
  ] }) : (a == null ? void 0 : a.values.length) === 0 ? /* @__PURE__ */ vt.jsxs("div", { children: [
    "No data found for the query ",
    a == null ? void 0 : a.url
  ] }) : /* @__PURE__ */ vt.jsx(vt.Fragment, { children: /* @__PURE__ */ vt.jsx(
    mo,
    {
      h1: "Time Series Data",
      subTitle: `Loaded in ${r} seconds`,
      heading: ["Date-Time", "Value", "Quality Code"],
      precision: e,
      content: a == null ? void 0 : a.values
    }
  ) });
};
var _ = {};
_.ASSUME_TOUCH = !1;
_.DEFAULT_MAX_ZOOM = 42;
_.DEFAULT_MIN_ZOOM = 0;
_.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD = 0.5;
_.DEFAULT_TILE_SIZE = 256;
_.DEFAULT_WMS_VERSION = "1.3.0";
_.ENABLE_CANVAS = !0;
_.ENABLE_PROJ4JS = !0;
_.ENABLE_RASTER_REPROJECTION = !0;
_.ENABLE_WEBGL = !0;
_.DEBUG_WEBGL = !0;
_.INITIAL_ATLAS_SIZE = 256;
_.MAX_ATLAS_SIZE = -1;
_.MOUSEWHEELZOOM_MAXDELTA = 1;
_.OVERVIEWMAP_MAX_RATIO = 0.75;
_.OVERVIEWMAP_MIN_RATIO = 0.1;
_.RASTER_REPROJECTION_MAX_SOURCE_TILES = 100;
_.RASTER_REPROJECTION_MAX_SUBDIVISION = 10;
_.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH = 0.25;
_.SIMPLIFY_TOLERANCE = 0.5;
_.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK = 1024;
_.VERSION = "v4.6.5";
_.WEBGL_MAX_TEXTURE_SIZE;
_.WEBGL_EXTENSIONS;
_.inherits = function(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t;
};
_.nullFunction = function() {
};
_.getUid = function(t) {
  return t.ol_uid || (t.ol_uid = ++_.uidCounter_);
};
_.uidCounter_ = 0;
var Di = {
  IMAGE: "IMAGE",
  TILE: "TILE",
  VECTOR_TILE: "VECTOR_TILE",
  VECTOR: "VECTOR"
}, ut = {};
ut.assign = typeof Object.assign == "function" ? Object.assign : function(t, e) {
  if (t == null)
    throw new TypeError("Cannot convert undefined or null to object");
  for (var i = Object(t), r = 1, n = arguments.length; r < n; ++r) {
    var a = arguments[r];
    if (a != null)
      for (var o in a)
        a.hasOwnProperty(o) && (i[o] = a[o]);
  }
  return i;
};
ut.clear = function(t) {
  for (var e in t)
    delete t[e];
};
ut.getValues = function(t) {
  var e = [];
  for (var i in t)
    e.push(t[i]);
  return e;
};
ut.isEmpty = function(t) {
  var e;
  for (e in t)
    return !1;
  return !e;
};
var L = {};
L.bindListener_ = function(t) {
  var e = function(i) {
    var r = t.listener, n = t.bindTo || t.target;
    return t.callOnce && L.unlistenByKey(t), r.call(n, i);
  };
  return t.boundListener = e, e;
};
L.findListener_ = function(t, e, i, r) {
  for (var n, a = 0, o = t.length; a < o; ++a)
    if (n = t[a], n.listener === e && n.bindTo === i)
      return r && (n.deleteIndex = a), n;
};
L.getListeners = function(t, e) {
  var i = t.ol_lm;
  return i ? i[e] : void 0;
};
L.getListenerMap_ = function(t) {
  var e = t.ol_lm;
  return e || (e = t.ol_lm = {}), e;
};
L.removeListeners_ = function(t, e) {
  var i = L.getListeners(t, e);
  if (i) {
    for (var r = 0, n = i.length; r < n; ++r)
      t.removeEventListener(e, i[r].boundListener), ut.clear(i[r]);
    i.length = 0;
    var a = t.ol_lm;
    a && (delete a[e], Object.keys(a).length === 0 && delete t.ol_lm);
  }
};
L.listen = function(t, e, i, r, n) {
  var a = L.getListenerMap_(t), o = a[e];
  o || (o = a[e] = []);
  var s = L.findListener_(
    o,
    i,
    r,
    !1
  );
  return s ? n || (s.callOnce = !1) : (s = /** @type {ol.EventsKey} */
  {
    bindTo: r,
    callOnce: !!n,
    listener: i,
    target: t,
    type: e
  }, t.addEventListener(e, L.bindListener_(s)), o.push(s)), s;
};
L.listenOnce = function(t, e, i, r) {
  return L.listen(t, e, i, r, !0);
};
L.unlisten = function(t, e, i, r) {
  var n = L.getListeners(t, e);
  if (n) {
    var a = L.findListener_(
      n,
      i,
      r,
      !0
    );
    a && L.unlistenByKey(a);
  }
};
L.unlistenByKey = function(t) {
  if (t && t.target) {
    t.target.removeEventListener(t.type, t.boundListener);
    var e = L.getListeners(t.target, t.type);
    if (e) {
      var i = "deleteIndex" in t ? t.deleteIndex : e.indexOf(t);
      i !== -1 && e.splice(i, 1), e.length === 0 && L.removeListeners_(t.target, t.type);
    }
    ut.clear(t);
  }
};
L.unlistenAll = function(t) {
  var e = L.getListenerMap_(t);
  for (var i in e)
    L.removeListeners_(t, i);
};
var it = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event ol.events.Event#change
   * @api
   */
  CHANGE: "change",
  CLEAR: "clear",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  ERROR: "error",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  MOUSEDOWN: "mousedown",
  MOUSEMOVE: "mousemove",
  MOUSEOUT: "mouseout",
  MOUSEUP: "mouseup",
  MOUSEWHEEL: "mousewheel",
  MSPOINTERDOWN: "MSPointerDown",
  RESIZE: "resize",
  TOUCHSTART: "touchstart",
  TOUCHMOVE: "touchmove",
  TOUCHEND: "touchend",
  WHEEL: "wheel"
}, tn = {
  /**
   * Triggered when a property is changed.
   * @event ol.Object.Event#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
}, tr = function() {
};
tr.prototype.disposed_ = !1;
tr.prototype.dispose = function() {
  this.disposed_ || (this.disposed_ = !0, this.disposeInternal());
};
tr.prototype.disposeInternal = _.nullFunction;
var ve = function(t) {
  this.propagationStopped, this.type = t, this.target = null;
};
ve.prototype.preventDefault = /**
 * Stop event propagation.
 * @function
 * @override
 * @api
 */
ve.prototype.stopPropagation = function() {
  this.propagationStopped = !0;
};
ve.stopPropagation = function(t) {
  t.stopPropagation();
};
ve.preventDefault = function(t) {
  t.preventDefault();
};
var oe = function() {
  tr.call(this), this.pendingRemovals_ = {}, this.dispatching_ = {}, this.listeners_ = {};
};
_.inherits(oe, tr);
oe.prototype.addEventListener = function(t, e) {
  var i = this.listeners_[t];
  i || (i = this.listeners_[t] = []), i.indexOf(e) === -1 && i.push(e);
};
oe.prototype.dispatchEvent = function(t) {
  var e = typeof t == "string" ? new ve(t) : t, i = e.type;
  e.target = this;
  var r = this.listeners_[i], n;
  if (r) {
    i in this.dispatching_ || (this.dispatching_[i] = 0, this.pendingRemovals_[i] = 0), ++this.dispatching_[i];
    for (var a = 0, o = r.length; a < o; ++a)
      if (r[a].call(this, e) === !1 || e.propagationStopped) {
        n = !1;
        break;
      }
    if (--this.dispatching_[i], this.dispatching_[i] === 0) {
      var s = this.pendingRemovals_[i];
      for (delete this.pendingRemovals_[i]; s--; )
        this.removeEventListener(i, _.nullFunction);
      delete this.dispatching_[i];
    }
    return n;
  }
};
oe.prototype.disposeInternal = function() {
  L.unlistenAll(this);
};
oe.prototype.getListeners = function(t) {
  return this.listeners_[t];
};
oe.prototype.hasListener = function(t) {
  return t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0;
};
oe.prototype.removeEventListener = function(t, e) {
  var i = this.listeners_[t];
  if (i) {
    var r = i.indexOf(e);
    t in this.pendingRemovals_ ? (i[r] = _.nullFunction, ++this.pendingRemovals_[t]) : (i.splice(r, 1), i.length === 0 && delete this.listeners_[t]);
  }
};
var gi = function() {
  oe.call(this), this.revision_ = 0;
};
_.inherits(gi, oe);
gi.unByKey = function(t) {
  if (Array.isArray(t))
    for (var e = 0, i = t.length; e < i; ++e)
      L.unlistenByKey(t[e]);
  else
    L.unlistenByKey(
      /** @type {ol.EventsKey} */
      t
    );
};
gi.prototype.changed = function() {
  ++this.revision_, this.dispatchEvent(it.CHANGE);
};
gi.prototype.dispatchEvent;
gi.prototype.getRevision = function() {
  return this.revision_;
};
gi.prototype.on = function(t, e, i) {
  if (Array.isArray(t)) {
    for (var r = t.length, n = new Array(r), a = 0; a < r; ++a)
      n[a] = L.listen(this, t[a], e, i);
    return n;
  } else
    return L.listen(
      this,
      /** @type {string} */
      t,
      e,
      i
    );
};
gi.prototype.once = function(t, e, i) {
  if (Array.isArray(t)) {
    for (var r = t.length, n = new Array(r), a = 0; a < r; ++a)
      n[a] = L.listenOnce(this, t[a], e, i);
    return n;
  } else
    return L.listenOnce(
      this,
      /** @type {string} */
      t,
      e,
      i
    );
};
gi.prototype.un = function(t, e, i) {
  if (Array.isArray(t)) {
    for (var r = 0, n = t.length; r < n; ++r)
      L.unlisten(this, t[r], e, i);
    return;
  } else
    L.unlisten(
      this,
      /** @type {string} */
      t,
      e,
      i
    );
};
var rt = function(t) {
  gi.call(this), _.getUid(this), this.values_ = {}, t !== void 0 && this.setProperties(t);
};
_.inherits(rt, gi);
rt.changeEventTypeCache_ = {};
rt.getChangeEventType = function(t) {
  return rt.changeEventTypeCache_.hasOwnProperty(t) ? rt.changeEventTypeCache_[t] : rt.changeEventTypeCache_[t] = "change:" + t;
};
rt.prototype.get = function(t) {
  var e;
  return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
};
rt.prototype.getKeys = function() {
  return Object.keys(this.values_);
};
rt.prototype.getProperties = function() {
  return ut.assign({}, this.values_);
};
rt.prototype.notify = function(t, e) {
  var i;
  i = rt.getChangeEventType(t), this.dispatchEvent(new rt.Event(i, t, e)), i = tn.PROPERTYCHANGE, this.dispatchEvent(new rt.Event(i, t, e));
};
rt.prototype.set = function(t, e, i) {
  if (i)
    this.values_[t] = e;
  else {
    var r = this.values_[t];
    this.values_[t] = e, r !== e && this.notify(t, r);
  }
};
rt.prototype.setProperties = function(t, e) {
  var i;
  for (i in t)
    this.set(i, t[i], e);
};
rt.prototype.unset = function(t, e) {
  if (t in this.values_) {
    var i = this.values_[t];
    delete this.values_[t], e || this.notify(t, i);
  }
};
rt.Event = function(t, e, i) {
  ve.call(this, t), this.key = e, this.oldValue = i;
};
_.inherits(rt.Event, ve);
var fe = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  SOURCE: "source"
}, jn = function(t) {
  var e = _.VERSION ? _.VERSION.split("-")[0] : "latest";
  this.message = "Assertion failed. See https://openlayers.org/en/" + e + "/doc/errors/#" + t + " for details.", this.code = t, this.name = "AssertionError";
};
_.inherits(jn, Error);
var Pt = {};
Pt.assert = function(t, e) {
  if (!t)
    throw new jn(e);
};
var Z = {};
Z.clamp = function(t, e, i) {
  return Math.min(Math.max(t, e), i);
};
Z.cosh = function() {
  var t;
  return "cosh" in Math ? t = Math.cosh : t = function(e) {
    var i = Math.exp(e);
    return (i + 1 / i) / 2;
  }, t;
}();
Z.roundUpToPowerOfTwo = function(t) {
  return Pt.assert(0 < t, 29), Math.pow(2, Math.ceil(Math.log(t) / Math.LN2));
};
Z.squaredSegmentDistance = function(t, e, i, r, n, a) {
  var o = n - i, s = a - r;
  if (o !== 0 || s !== 0) {
    var l = ((t - i) * o + (e - r) * s) / (o * o + s * s);
    l > 1 ? (i = n, r = a) : l > 0 && (i += o * l, r += s * l);
  }
  return Z.squaredDistance(t, e, i, r);
};
Z.squaredDistance = function(t, e, i, r) {
  var n = i - t, a = r - e;
  return n * n + a * a;
};
Z.solveLinearSystem = function(t) {
  for (var e = t.length, i = 0; i < e; i++) {
    for (var r = i, n = Math.abs(t[i][i]), a = i + 1; a < e; a++) {
      var o = Math.abs(t[a][i]);
      o > n && (n = o, r = a);
    }
    if (n === 0)
      return null;
    var s = t[r];
    t[r] = t[i], t[i] = s;
    for (var l = i + 1; l < e; l++)
      for (var h = -t[l][i] / t[i][i], u = i; u < e + 1; u++)
        i == u ? t[l][u] = 0 : t[l][u] += h * t[i][u];
  }
  for (var f = new Array(e), c = e - 1; c >= 0; c--) {
    f[c] = t[c][e] / t[c][c];
    for (var d = c - 1; d >= 0; d--)
      t[d][e] -= t[d][c] * f[c];
  }
  return f;
};
Z.toDegrees = function(t) {
  return t * 180 / Math.PI;
};
Z.toRadians = function(t) {
  return t * Math.PI / 180;
};
Z.modulo = function(t, e) {
  var i = t % e;
  return i * e < 0 ? i + e : i;
};
Z.lerp = function(t, e, i) {
  return t + i * (e - t);
};
var ee = function(t) {
  rt.call(this);
  var e = ut.assign({}, t);
  e[fe.OPACITY] = t.opacity !== void 0 ? t.opacity : 1, e[fe.VISIBLE] = t.visible !== void 0 ? t.visible : !0, e[fe.Z_INDEX] = t.zIndex !== void 0 ? t.zIndex : 0, e[fe.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0, e[fe.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0, this.setProperties(e), this.state_ = /** @type {ol.LayerState} */
  {
    layer: (
      /** @type {ol.layer.Layer} */
      this
    ),
    managed: !0
  }, this.type;
};
_.inherits(ee, rt);
ee.prototype.getType = function() {
  return this.type;
};
ee.prototype.getLayerState = function() {
  return this.state_.opacity = Z.clamp(this.getOpacity(), 0, 1), this.state_.sourceState = this.getSourceState(), this.state_.visible = this.getVisible(), this.state_.extent = this.getExtent(), this.state_.zIndex = this.getZIndex(), this.state_.maxResolution = this.getMaxResolution(), this.state_.minResolution = Math.max(this.getMinResolution(), 0), this.state_;
};
ee.prototype.getLayersArray = function(t) {
};
ee.prototype.getLayerStatesArray = function(t) {
};
ee.prototype.getExtent = function() {
  return (
    /** @type {ol.Extent|undefined} */
    this.get(fe.EXTENT)
  );
};
ee.prototype.getMaxResolution = function() {
  return (
    /** @type {number} */
    this.get(fe.MAX_RESOLUTION)
  );
};
ee.prototype.getMinResolution = function() {
  return (
    /** @type {number} */
    this.get(fe.MIN_RESOLUTION)
  );
};
ee.prototype.getOpacity = function() {
  return (
    /** @type {number} */
    this.get(fe.OPACITY)
  );
};
ee.prototype.getSourceState = function() {
};
ee.prototype.getVisible = function() {
  return (
    /** @type {boolean} */
    this.get(fe.VISIBLE)
  );
};
ee.prototype.getZIndex = function() {
  return (
    /** @type {number} */
    this.get(fe.Z_INDEX)
  );
};
ee.prototype.setExtent = function(t) {
  this.set(fe.EXTENT, t);
};
ee.prototype.setMaxResolution = function(t) {
  this.set(fe.MAX_RESOLUTION, t);
};
ee.prototype.setMinResolution = function(t) {
  this.set(fe.MIN_RESOLUTION, t);
};
ee.prototype.setOpacity = function(t) {
  this.set(fe.OPACITY, t);
};
ee.prototype.setVisible = function(t) {
  this.set(fe.VISIBLE, t);
};
ee.prototype.setZIndex = function(t) {
  this.set(fe.Z_INDEX, t);
};
var Ci = {
  /**
   * @event ol.render.Event#postcompose
   * @api
   */
  POSTCOMPOSE: "postcompose",
  /**
   * @event ol.render.Event#precompose
   * @api
   */
  PRECOMPOSE: "precompose",
  /**
   * @event ol.render.Event#render
   * @api
   */
  RENDER: "render"
}, Ur = {
  UNDEFINED: "undefined",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error"
}, ge = function(t) {
  var e = ut.assign({}, t);
  delete e.source, ee.call(
    this,
    /** @type {olx.layer.BaseOptions} */
    e
  ), this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, t.map && this.setMap(t.map), L.listen(
    this,
    rt.getChangeEventType(fe.SOURCE),
    this.handleSourcePropertyChange_,
    this
  );
  var i = t.source ? t.source : null;
  this.setSource(i);
};
_.inherits(ge, ee);
ge.visibleAtResolution = function(t, e) {
  return t.visible && e >= t.minResolution && e < t.maxResolution;
};
ge.prototype.getLayersArray = function(t) {
  var e = t || [];
  return e.push(this), e;
};
ge.prototype.getLayerStatesArray = function(t) {
  var e = t || [];
  return e.push(this.getLayerState()), e;
};
ge.prototype.getSource = function() {
  var t = this.get(fe.SOURCE);
  return (
    /** @type {ol.source.Source} */
    t || null
  );
};
ge.prototype.getSourceState = function() {
  var t = this.getSource();
  return t ? t.getState() : Ur.UNDEFINED;
};
ge.prototype.handleSourceChange_ = function() {
  this.changed();
};
ge.prototype.handleSourcePropertyChange_ = function() {
  this.sourceChangeKey_ && (L.unlistenByKey(this.sourceChangeKey_), this.sourceChangeKey_ = null);
  var t = this.getSource();
  t && (this.sourceChangeKey_ = L.listen(
    t,
    it.CHANGE,
    this.handleSourceChange_,
    this
  )), this.changed();
};
ge.prototype.setMap = function(t) {
  this.mapPrecomposeKey_ && (L.unlistenByKey(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (L.unlistenByKey(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = L.listen(
    t,
    Ci.PRECOMPOSE,
    function(e) {
      var i = this.getLayerState();
      i.managed = !1, i.zIndex = 1 / 0, e.frameState.layerStatesArray.push(i), e.frameState.layerStates[_.getUid(this)] = i;
    },
    this
  ), this.mapRenderKey_ = L.listen(
    this,
    it.CHANGE,
    t.render,
    t
  ), this.changed());
};
ge.prototype.setSource = function(t) {
  this.set(fe.SOURCE, t);
};
var Mn = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
}, Cr = function(t) {
  var e = t || {}, i = ut.assign({}, e);
  delete i.preload, delete i.useInterimTilesOnError, ge.call(
    this,
    /** @type {olx.layer.LayerOptions} */
    i
  ), this.setPreload(e.preload !== void 0 ? e.preload : 0), this.setUseInterimTilesOnError(e.useInterimTilesOnError !== void 0 ? e.useInterimTilesOnError : !0), this.type = Di.TILE;
};
_.inherits(Cr, ge);
Cr.prototype.getPreload = function() {
  return (
    /** @type {number} */
    this.get(Mn.PRELOAD)
  );
};
Cr.prototype.getSource;
Cr.prototype.setPreload = function(t) {
  this.set(Mn.PRELOAD, t);
};
Cr.prototype.getUseInterimTilesOnError = function() {
  return (
    /** @type {boolean} */
    this.get(Mn.USE_INTERIM_TILES_ON_ERROR)
  );
};
Cr.prototype.setUseInterimTilesOnError = function(t) {
  this.set(
    Mn.USE_INTERIM_TILES_ON_ERROR,
    t
  );
};
var di = {
  /**
   * Triggered when an item is added to the collection.
   * @event ol.Collection.Event#add
   * @api
   */
  ADD: "add",
  /**
   * Triggered when an item is removed from the collection.
   * @event ol.Collection.Event#remove
   * @api
   */
  REMOVE: "remove"
}, ht = function(t, e) {
  rt.call(this);
  var i = e || {};
  if (this.unique_ = !!i.unique, this.array_ = t || [], this.unique_)
    for (var r = 0, n = this.array_.length; r < n; ++r)
      this.assertUnique_(this.array_[r], r);
  this.updateLength_();
};
_.inherits(ht, rt);
ht.prototype.clear = function() {
  for (; this.getLength() > 0; )
    this.pop();
};
ht.prototype.extend = function(t) {
  var e, i;
  for (e = 0, i = t.length; e < i; ++e)
    this.push(t[e]);
  return this;
};
ht.prototype.forEach = function(t, e) {
  for (var i = e ? t.bind(e) : t, r = this.array_, n = 0, a = r.length; n < a; ++n)
    i(r[n], n, r);
};
ht.prototype.getArray = function() {
  return this.array_;
};
ht.prototype.item = function(t) {
  return this.array_[t];
};
ht.prototype.getLength = function() {
  return (
    /** @type {number} */
    this.get(ht.Property_.LENGTH)
  );
};
ht.prototype.insertAt = function(t, e) {
  this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(
    new ht.Event(di.ADD, e)
  );
};
ht.prototype.pop = function() {
  return this.removeAt(this.getLength() - 1);
};
ht.prototype.push = function(t) {
  this.unique_ && this.assertUnique_(t);
  var e = this.getLength();
  return this.insertAt(e, t), this.getLength();
};
ht.prototype.remove = function(t) {
  var e = this.array_, i, r;
  for (i = 0, r = e.length; i < r; ++i)
    if (e[i] === t)
      return this.removeAt(i);
};
ht.prototype.removeAt = function(t) {
  var e = this.array_[t];
  return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(
    new ht.Event(di.REMOVE, e)
  ), e;
};
ht.prototype.setAt = function(t, e) {
  var i = this.getLength();
  if (t < i) {
    this.unique_ && this.assertUnique_(e, t);
    var r = this.array_[t];
    this.array_[t] = e, this.dispatchEvent(
      new ht.Event(di.REMOVE, r)
    ), this.dispatchEvent(
      new ht.Event(di.ADD, e)
    );
  } else {
    var n;
    for (n = i; n < t; ++n)
      this.insertAt(n, void 0);
    this.insertAt(t, e);
  }
};
ht.prototype.updateLength_ = function() {
  this.set(ht.Property_.LENGTH, this.array_.length);
};
ht.prototype.assertUnique_ = function(t, e) {
  for (var i = 0, r = this.array_.length; i < r; ++i)
    if (this.array_[i] === t && i !== e)
      throw new jn(58);
};
ht.Property_ = {
  LENGTH: "length"
};
ht.Event = function(t, e) {
  ve.call(this, t), this.element = e;
};
_.inherits(ht.Event, ve);
var sr = function(t, e, i) {
  ve.call(this, t), this.map = e, this.frameState = i !== void 0 ? i : null;
};
_.inherits(sr, ve);
var Br = function(t, e, i, r, n) {
  sr.call(this, t, e, n), this.originalEvent = i, this.pixel = e.getEventPixel(i), this.coordinate = e.getCoordinateFromPixel(this.pixel), this.dragging = r !== void 0 ? r : !1;
};
_.inherits(Br, sr);
Br.prototype.preventDefault = function() {
  sr.prototype.preventDefault.call(this), this.originalEvent.preventDefault();
};
Br.prototype.stopPropagation = function() {
  sr.prototype.stopPropagation.call(this), this.originalEvent.stopPropagation();
};
var S = {};
S.ONE = 1;
S.SRC_ALPHA = 770;
S.COLOR_ATTACHMENT0 = 36064;
S.COLOR_BUFFER_BIT = 16384;
S.TRIANGLES = 4;
S.TRIANGLE_STRIP = 5;
S.ONE_MINUS_SRC_ALPHA = 771;
S.ARRAY_BUFFER = 34962;
S.ELEMENT_ARRAY_BUFFER = 34963;
S.STREAM_DRAW = 35040;
S.STATIC_DRAW = 35044;
S.DYNAMIC_DRAW = 35048;
S.CULL_FACE = 2884;
S.BLEND = 3042;
S.STENCIL_TEST = 2960;
S.DEPTH_TEST = 2929;
S.SCISSOR_TEST = 3089;
S.UNSIGNED_BYTE = 5121;
S.UNSIGNED_SHORT = 5123;
S.UNSIGNED_INT = 5125;
S.FLOAT = 5126;
S.RGBA = 6408;
S.FRAGMENT_SHADER = 35632;
S.VERTEX_SHADER = 35633;
S.LINK_STATUS = 35714;
S.LINEAR = 9729;
S.TEXTURE_MAG_FILTER = 10240;
S.TEXTURE_MIN_FILTER = 10241;
S.TEXTURE_WRAP_S = 10242;
S.TEXTURE_WRAP_T = 10243;
S.TEXTURE_2D = 3553;
S.TEXTURE0 = 33984;
S.CLAMP_TO_EDGE = 33071;
S.COMPILE_STATUS = 35713;
S.FRAMEBUFFER = 36160;
S.CONTEXT_IDS_ = [
  "experimental-webgl",
  "webgl",
  "webkit-3d",
  "moz-webgl"
];
S.getContext = function(t, e) {
  var i, r, n = S.CONTEXT_IDS_.length;
  for (r = 0; r < n; ++r)
    try {
      if (i = t.getContext(S.CONTEXT_IDS_[r], e), i)
        return (
          /** @type {!WebGLRenderingContext} */
          i
        );
    } catch {
    }
  return null;
};
var pt = {}, br = typeof navigator < "u" ? navigator.userAgent.toLowerCase() : "";
pt.FIREFOX = br.indexOf("firefox") !== -1;
pt.SAFARI = br.indexOf("safari") !== -1 && br.indexOf("chrom") == -1;
pt.WEBKIT = br.indexOf("webkit") !== -1 && br.indexOf("edge") == -1;
pt.MAC = br.indexOf("macintosh") !== -1;
pt.DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
pt.CANVAS_LINE_DASH = !1;
pt.CANVAS = _.ENABLE_CANVAS && /**
 * @return {boolean} Canvas supported.
 */
function() {
  if (!("HTMLCanvasElement" in window))
    return !1;
  try {
    var t = document.createElement("CANVAS").getContext("2d");
    return t ? (t.setLineDash !== void 0 && (pt.CANVAS_LINE_DASH = !0), !0) : !1;
  } catch {
    return !1;
  }
}();
pt.DEVICE_ORIENTATION = "DeviceOrientationEvent" in window;
pt.GEOLOCATION = "geolocation" in navigator;
pt.TOUCH = _.ASSUME_TOUCH || "ontouchstart" in window;
pt.POINTER = "PointerEvent" in window;
pt.MSPOINTER = !!navigator.msPointerEnabled;
(function() {
  if (_.ENABLE_WEBGL) {
    var t = !1, e, i = [];
    if ("WebGLRenderingContext" in window)
      try {
        var r = (
          /** @type {HTMLCanvasElement} */
          document.createElement("CANVAS")
        ), n = S.getContext(r, {
          failIfMajorPerformanceCaveat: !0
        });
        n && (t = !0, e = /** @type {number} */
        n.getParameter(n.MAX_TEXTURE_SIZE), i = n.getSupportedExtensions());
      } catch {
      }
    pt.WEBGL = t, _.WEBGL_EXTENSIONS = i, _.WEBGL_MAX_TEXTURE_SIZE = e;
  }
})();
var Gt = {
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event ol.MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: "singleclick",
  /**
   * A click with no dragging. A double click will fire two of this.
   * @event ol.MapBrowserEvent#click
   * @api
   */
  CLICK: it.CLICK,
  /**
   * A true double click, with no dragging.
   * @event ol.MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: it.DBLCLICK,
  /**
   * Triggered when a pointer is dragged.
   * @event ol.MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: "pointerdrag",
  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event ol.MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, Yi = function(t, e, i, r, n) {
  Br.call(
    this,
    t,
    e,
    i.originalEvent,
    r,
    n
  ), this.pointerEvent = i;
};
_.inherits(Yi, Br);
var Fi = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, Bi = function(t, e) {
  this.dispatcher = t, this.mapping_ = e;
};
Bi.prototype.getEvents = function() {
  return Object.keys(this.mapping_);
};
Bi.prototype.getHandlerForEvent = function(t) {
  return this.mapping_[t];
};
var St = function(t) {
  var e = {
    mousedown: this.mousedown,
    mousemove: this.mousemove,
    mouseup: this.mouseup,
    mouseover: this.mouseover,
    mouseout: this.mouseout
  };
  Bi.call(this, t, e), this.pointerMap = t.pointerMap, this.lastTouches = [];
};
_.inherits(St, Bi);
St.POINTER_ID = 1;
St.POINTER_TYPE = "mouse";
St.DEDUP_DIST = 25;
St.prototype.isEventSimulatedFromTouch_ = function(t) {
  for (var e = this.lastTouches, i = t.clientX, r = t.clientY, n = 0, a = e.length, o; n < a && (o = e[n]); n++) {
    var s = Math.abs(i - o[0]), l = Math.abs(r - o[1]);
    if (s <= St.DEDUP_DIST && l <= St.DEDUP_DIST)
      return !0;
  }
  return !1;
};
St.prepareEvent = function(t, e) {
  var i = e.cloneEvent(t, t), r = i.preventDefault;
  return i.preventDefault = function() {
    t.preventDefault(), r();
  }, i.pointerId = St.POINTER_ID, i.isPrimary = !0, i.pointerType = St.POINTER_TYPE, i;
};
St.prototype.mousedown = function(t) {
  if (!this.isEventSimulatedFromTouch_(t)) {
    St.POINTER_ID.toString() in this.pointerMap && this.cancel(t);
    var e = St.prepareEvent(t, this.dispatcher);
    this.pointerMap[St.POINTER_ID.toString()] = t, this.dispatcher.down(e, t);
  }
};
St.prototype.mousemove = function(t) {
  if (!this.isEventSimulatedFromTouch_(t)) {
    var e = St.prepareEvent(t, this.dispatcher);
    this.dispatcher.move(e, t);
  }
};
St.prototype.mouseup = function(t) {
  if (!this.isEventSimulatedFromTouch_(t)) {
    var e = this.pointerMap[St.POINTER_ID.toString()];
    if (e && e.button === t.button) {
      var i = St.prepareEvent(t, this.dispatcher);
      this.dispatcher.up(i, t), this.cleanupMouse();
    }
  }
};
St.prototype.mouseover = function(t) {
  if (!this.isEventSimulatedFromTouch_(t)) {
    var e = St.prepareEvent(t, this.dispatcher);
    this.dispatcher.enterOver(e, t);
  }
};
St.prototype.mouseout = function(t) {
  if (!this.isEventSimulatedFromTouch_(t)) {
    var e = St.prepareEvent(t, this.dispatcher);
    this.dispatcher.leaveOut(e, t);
  }
};
St.prototype.cancel = function(t) {
  var e = St.prepareEvent(t, this.dispatcher);
  this.dispatcher.cancel(e, t), this.cleanupMouse();
};
St.prototype.cleanupMouse = function() {
  delete this.pointerMap[St.POINTER_ID.toString()];
};
var yi = function(t) {
  var e = {
    MSPointerDown: this.msPointerDown,
    MSPointerMove: this.msPointerMove,
    MSPointerUp: this.msPointerUp,
    MSPointerOut: this.msPointerOut,
    MSPointerOver: this.msPointerOver,
    MSPointerCancel: this.msPointerCancel,
    MSGotPointerCapture: this.msGotPointerCapture,
    MSLostPointerCapture: this.msLostPointerCapture
  };
  Bi.call(this, t, e), this.pointerMap = t.pointerMap, this.POINTER_TYPES = [
    "",
    "unavailable",
    "touch",
    "pen",
    "mouse"
  ];
};
_.inherits(yi, Bi);
yi.prototype.prepareEvent_ = function(t) {
  var e = t;
  return typeof t.pointerType == "number" && (e = this.dispatcher.cloneEvent(t, t), e.pointerType = this.POINTER_TYPES[t.pointerType]), e;
};
yi.prototype.cleanup = function(t) {
  delete this.pointerMap[t.toString()];
};
yi.prototype.msPointerDown = function(t) {
  this.pointerMap[t.pointerId.toString()] = t;
  var e = this.prepareEvent_(t);
  this.dispatcher.down(e, t);
};
yi.prototype.msPointerMove = function(t) {
  var e = this.prepareEvent_(t);
  this.dispatcher.move(e, t);
};
yi.prototype.msPointerUp = function(t) {
  var e = this.prepareEvent_(t);
  this.dispatcher.up(e, t), this.cleanup(t.pointerId);
};
yi.prototype.msPointerOut = function(t) {
  var e = this.prepareEvent_(t);
  this.dispatcher.leaveOut(e, t);
};
yi.prototype.msPointerOver = function(t) {
  var e = this.prepareEvent_(t);
  this.dispatcher.enterOver(e, t);
};
yi.prototype.msPointerCancel = function(t) {
  var e = this.prepareEvent_(t);
  this.dispatcher.cancel(e, t), this.cleanup(t.pointerId);
};
yi.prototype.msLostPointerCapture = function(t) {
  var e = this.dispatcher.makeEvent(
    "lostpointercapture",
    t,
    t
  );
  this.dispatcher.dispatchEvent(e);
};
yi.prototype.msGotPointerCapture = function(t) {
  var e = this.dispatcher.makeEvent(
    "gotpointercapture",
    t,
    t
  );
  this.dispatcher.dispatchEvent(e);
};
var Wi = function(t) {
  var e = {
    pointerdown: this.pointerDown,
    pointermove: this.pointerMove,
    pointerup: this.pointerUp,
    pointerout: this.pointerOut,
    pointerover: this.pointerOver,
    pointercancel: this.pointerCancel,
    gotpointercapture: this.gotPointerCapture,
    lostpointercapture: this.lostPointerCapture
  };
  Bi.call(this, t, e);
};
_.inherits(Wi, Bi);
Wi.prototype.pointerDown = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.pointerMove = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.pointerUp = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.pointerOut = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.pointerOver = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.pointerCancel = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.lostPointerCapture = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
Wi.prototype.gotPointerCapture = function(t) {
  this.dispatcher.fireNativeEvent(t);
};
var Tr = function(t, e, i) {
  ve.call(this, t), this.originalEvent = e;
  var r = i || {};
  this.buttons = this.getButtons_(r), this.pressure = this.getPressure_(r, this.buttons), this.bubbles = "bubbles" in r ? r.bubbles : !1, this.cancelable = "cancelable" in r ? r.cancelable : !1, this.view = "view" in r ? r.view : null, this.detail = "detail" in r ? r.detail : null, this.screenX = "screenX" in r ? r.screenX : 0, this.screenY = "screenY" in r ? r.screenY : 0, this.clientX = "clientX" in r ? r.clientX : 0, this.clientY = "clientY" in r ? r.clientY : 0, this.ctrlKey = "ctrlKey" in r ? r.ctrlKey : !1, this.altKey = "altKey" in r ? r.altKey : !1, this.shiftKey = "shiftKey" in r ? r.shiftKey : !1, this.metaKey = "metaKey" in r ? r.metaKey : !1, this.button = "button" in r ? r.button : 0, this.relatedTarget = "relatedTarget" in r ? r.relatedTarget : null, this.pointerId = "pointerId" in r ? r.pointerId : 0, this.width = "width" in r ? r.width : 0, this.height = "height" in r ? r.height : 0, this.tiltX = "tiltX" in r ? r.tiltX : 0, this.tiltY = "tiltY" in r ? r.tiltY : 0, this.pointerType = "pointerType" in r ? r.pointerType : "", this.hwTimestamp = "hwTimestamp" in r ? r.hwTimestamp : 0, this.isPrimary = "isPrimary" in r ? r.isPrimary : !1, e.preventDefault && (this.preventDefault = function() {
    e.preventDefault();
  });
};
_.inherits(Tr, ve);
Tr.prototype.getButtons_ = function(t) {
  var e;
  if (t.buttons || Tr.HAS_BUTTONS)
    e = t.buttons;
  else
    switch (t.which) {
      case 1:
        e = 1;
        break;
      case 2:
        e = 4;
        break;
      case 3:
        e = 2;
        break;
      default:
        e = 0;
    }
  return e;
};
Tr.prototype.getPressure_ = function(t, e) {
  var i = 0;
  return t.pressure ? i = t.pressure : i = e ? 0.5 : 0, i;
};
Tr.HAS_BUTTONS = !1;
(function() {
  try {
    var t = new MouseEvent("click", { buttons: 1 });
    Tr.HAS_BUTTONS = t.buttons === 1;
  } catch {
  }
})();
var st = {};
st.binarySearch = function(t, e, i) {
  for (var r, n, a = i || st.numberSafeCompareFunction, o = 0, s = t.length, l = !1; o < s; )
    r = o + (s - o >> 1), n = +a(t[r], e), n < 0 ? o = r + 1 : (s = r, l = !n);
  return l ? o : ~o;
};
st.numberSafeCompareFunction = function(t, e) {
  return t > e ? 1 : t < e ? -1 : 0;
};
st.includes = function(t, e) {
  return t.indexOf(e) >= 0;
};
st.linearFindNearest = function(t, e, i) {
  var r = t.length;
  if (t[0] <= e)
    return 0;
  if (e <= t[r - 1])
    return r - 1;
  var n;
  if (i > 0) {
    for (n = 1; n < r; ++n)
      if (t[n] < e)
        return n - 1;
  } else if (i < 0) {
    for (n = 1; n < r; ++n)
      if (t[n] <= e)
        return n;
  } else
    for (n = 1; n < r; ++n) {
      if (t[n] == e)
        return n;
      if (t[n] < e)
        return t[n - 1] - e < e - t[n] ? n - 1 : n;
    }
  return r - 1;
};
st.reverseSubArray = function(t, e, i) {
  for (; e < i; ) {
    var r = t[e];
    t[e] = t[i], t[i] = r, ++e, --i;
  }
};
st.extend = function(t, e) {
  var i, r = Array.isArray(e) ? e : [e], n = r.length;
  for (i = 0; i < n; i++)
    t[t.length] = r[i];
};
st.remove = function(t, e) {
  var i = t.indexOf(e), r = i > -1;
  return r && t.splice(i, 1), r;
};
st.find = function(t, e) {
  for (var i = t.length >>> 0, r, n = 0; n < i; n++)
    if (r = t[n], e(r, n, t))
      return r;
  return null;
};
st.equals = function(t, e) {
  var i = t.length;
  if (i !== e.length)
    return !1;
  for (var r = 0; r < i; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
};
st.stableSort = function(t, e) {
  var i = t.length, r = Array(t.length), n;
  for (n = 0; n < i; n++)
    r[n] = { index: n, value: t[n] };
  for (r.sort(function(a, o) {
    return e(a.value, o.value) || a.index - o.index;
  }), n = 0; n < t.length; n++)
    t[n] = r[n].value;
};
st.findIndex = function(t, e) {
  var i, r = !t.every(function(n, a) {
    return i = a, !e(n, a, t);
  });
  return r ? i : -1;
};
st.isSorted = function(t, e, i) {
  var r = e || st.numberSafeCompareFunction;
  return t.every(function(n, a) {
    if (a === 0)
      return !0;
    var o = r(t[a - 1], n);
    return !(o > 0 || i && o === 0);
  });
};
var Ut = function(t, e) {
  var i = {
    touchstart: this.touchstart,
    touchmove: this.touchmove,
    touchend: this.touchend,
    touchcancel: this.touchcancel
  };
  Bi.call(this, t, i), this.pointerMap = t.pointerMap, this.mouseSource = e, this.firstTouchId_ = void 0, this.clickCount_ = 0, this.resetId_ = void 0;
};
_.inherits(Ut, Bi);
Ut.DEDUP_TIMEOUT = 2500;
Ut.CLICK_COUNT_TIMEOUT = 200;
Ut.POINTER_TYPE = "touch";
Ut.prototype.isPrimaryTouch_ = function(t) {
  return this.firstTouchId_ === t.identifier;
};
Ut.prototype.setPrimaryTouch_ = function(t) {
  var e = Object.keys(this.pointerMap).length;
  (e === 0 || e === 1 && St.POINTER_ID.toString() in this.pointerMap) && (this.firstTouchId_ = t.identifier, this.cancelResetClickCount_());
};
Ut.prototype.removePrimaryPointer_ = function(t) {
  t.isPrimary && (this.firstTouchId_ = void 0, this.resetClickCount_());
};
Ut.prototype.resetClickCount_ = function() {
  this.resetId_ = setTimeout(
    this.resetClickCountHandler_.bind(this),
    Ut.CLICK_COUNT_TIMEOUT
  );
};
Ut.prototype.resetClickCountHandler_ = function() {
  this.clickCount_ = 0, this.resetId_ = void 0;
};
Ut.prototype.cancelResetClickCount_ = function() {
  this.resetId_ !== void 0 && clearTimeout(this.resetId_);
};
Ut.prototype.touchToPointer_ = function(t, e) {
  var i = this.dispatcher.cloneEvent(t, e);
  return i.pointerId = e.identifier + 2, i.bubbles = !0, i.cancelable = !0, i.detail = this.clickCount_, i.button = 0, i.buttons = 1, i.width = e.webkitRadiusX || e.radiusX || 0, i.height = e.webkitRadiusY || e.radiusY || 0, i.pressure = e.webkitForce || e.force || 0.5, i.isPrimary = this.isPrimaryTouch_(e), i.pointerType = Ut.POINTER_TYPE, i.clientX = e.clientX, i.clientY = e.clientY, i.screenX = e.screenX, i.screenY = e.screenY, i;
};
Ut.prototype.processTouches_ = function(t, e) {
  var i = Array.prototype.slice.call(
    t.changedTouches
  ), r = i.length;
  function n() {
    t.preventDefault();
  }
  var a, o;
  for (a = 0; a < r; ++a)
    o = this.touchToPointer_(t, i[a]), o.preventDefault = n, e.call(this, t, o);
};
Ut.prototype.findTouch_ = function(t, e) {
  for (var i = t.length, r, n = 0; n < i; n++)
    if (r = t[n], r.identifier === e)
      return !0;
  return !1;
};
Ut.prototype.vacuumTouches_ = function(t) {
  var e = t.touches, i = Object.keys(this.pointerMap), r = i.length;
  if (r >= e.length) {
    var n = [], a, o, s;
    for (a = 0; a < r; ++a)
      o = i[a], s = this.pointerMap[o], o != St.POINTER_ID && !this.findTouch_(e, o - 2) && n.push(s.out);
    for (a = 0; a < n.length; ++a)
      this.cancelOut_(t, n[a]);
  }
};
Ut.prototype.touchstart = function(t) {
  this.vacuumTouches_(t), this.setPrimaryTouch_(t.changedTouches[0]), this.dedupSynthMouse_(t), this.clickCount_++, this.processTouches_(t, this.overDown_);
};
Ut.prototype.overDown_ = function(t, e) {
  this.pointerMap[e.pointerId] = {
    target: e.target,
    out: e,
    outTarget: e.target
  }, this.dispatcher.over(e, t), this.dispatcher.enter(e, t), this.dispatcher.down(e, t);
};
Ut.prototype.touchmove = function(t) {
  t.preventDefault(), this.processTouches_(t, this.moveOverOut_);
};
Ut.prototype.moveOverOut_ = function(t, e) {
  var i = e, r = this.pointerMap[i.pointerId];
  if (r) {
    var n = r.out, a = r.outTarget;
    this.dispatcher.move(i, t), n && a !== i.target && (n.relatedTarget = i.target, i.relatedTarget = a, n.target = a, i.target ? (this.dispatcher.leaveOut(n, t), this.dispatcher.enterOver(i, t)) : (i.target = a, i.relatedTarget = null, this.cancelOut_(t, i))), r.out = i, r.outTarget = i.target;
  }
};
Ut.prototype.touchend = function(t) {
  this.dedupSynthMouse_(t), this.processTouches_(t, this.upOut_);
};
Ut.prototype.upOut_ = function(t, e) {
  this.dispatcher.up(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e);
};
Ut.prototype.touchcancel = function(t) {
  this.processTouches_(t, this.cancelOut_);
};
Ut.prototype.cancelOut_ = function(t, e) {
  this.dispatcher.cancel(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e);
};
Ut.prototype.cleanUpPointer_ = function(t) {
  delete this.pointerMap[t.pointerId], this.removePrimaryPointer_(t);
};
Ut.prototype.dedupSynthMouse_ = function(t) {
  var e = this.mouseSource.lastTouches, i = t.changedTouches[0];
  if (this.isPrimaryTouch_(i)) {
    var r = [i.clientX, i.clientY];
    e.push(r), setTimeout(function() {
      st.remove(e, r);
    }, Ut.DEDUP_TIMEOUT);
  }
};
var Lt = function(t) {
  oe.call(this), this.element_ = t, this.pointerMap = {}, this.eventMap_ = {}, this.eventSourceList_ = [], this.registerSources();
};
_.inherits(Lt, oe);
Lt.prototype.registerSources = function() {
  if (pt.POINTER)
    this.registerSource("native", new Wi(this));
  else if (pt.MSPOINTER)
    this.registerSource("ms", new yi(this));
  else {
    var t = new St(this);
    this.registerSource("mouse", t), pt.TOUCH && this.registerSource(
      "touch",
      new Ut(this, t)
    );
  }
  this.register_();
};
Lt.prototype.registerSource = function(t, e) {
  var i = e, r = i.getEvents();
  r && (r.forEach(function(n) {
    var a = i.getHandlerForEvent(n);
    a && (this.eventMap_[n] = a.bind(i));
  }, this), this.eventSourceList_.push(i));
};
Lt.prototype.register_ = function() {
  for (var t = this.eventSourceList_.length, e, i = 0; i < t; i++)
    e = this.eventSourceList_[i], this.addEvents_(e.getEvents());
};
Lt.prototype.unregister_ = function() {
  for (var t = this.eventSourceList_.length, e, i = 0; i < t; i++)
    e = this.eventSourceList_[i], this.removeEvents_(e.getEvents());
};
Lt.prototype.eventHandler_ = function(t) {
  var e = t.type, i = this.eventMap_[e];
  i && i(t);
};
Lt.prototype.addEvents_ = function(t) {
  t.forEach(function(e) {
    L.listen(this.element_, e, this.eventHandler_, this);
  }, this);
};
Lt.prototype.removeEvents_ = function(t) {
  t.forEach(function(e) {
    L.unlisten(this.element_, e, this.eventHandler_, this);
  }, this);
};
Lt.prototype.cloneEvent = function(t, e) {
  for (var i = {}, r, n = 0, a = Lt.CLONE_PROPS.length; n < a; n++)
    r = Lt.CLONE_PROPS[n][0], i[r] = t[r] || e[r] || Lt.CLONE_PROPS[n][1];
  return i;
};
Lt.prototype.down = function(t, e) {
  this.fireEvent(Fi.POINTERDOWN, t, e);
};
Lt.prototype.move = function(t, e) {
  this.fireEvent(Fi.POINTERMOVE, t, e);
};
Lt.prototype.up = function(t, e) {
  this.fireEvent(Fi.POINTERUP, t, e);
};
Lt.prototype.enter = function(t, e) {
  t.bubbles = !1, this.fireEvent(Fi.POINTERENTER, t, e);
};
Lt.prototype.leave = function(t, e) {
  t.bubbles = !1, this.fireEvent(Fi.POINTERLEAVE, t, e);
};
Lt.prototype.over = function(t, e) {
  t.bubbles = !0, this.fireEvent(Fi.POINTEROVER, t, e);
};
Lt.prototype.out = function(t, e) {
  t.bubbles = !0, this.fireEvent(Fi.POINTEROUT, t, e);
};
Lt.prototype.cancel = function(t, e) {
  this.fireEvent(Fi.POINTERCANCEL, t, e);
};
Lt.prototype.leaveOut = function(t, e) {
  this.out(t, e), this.contains_(t.target, t.relatedTarget) || this.leave(t, e);
};
Lt.prototype.enterOver = function(t, e) {
  this.over(t, e), this.contains_(t.target, t.relatedTarget) || this.enter(t, e);
};
Lt.prototype.contains_ = function(t, e) {
  return !t || !e ? !1 : t.contains(e);
};
Lt.prototype.makeEvent = function(t, e, i) {
  return new Tr(t, i, e);
};
Lt.prototype.fireEvent = function(t, e, i) {
  var r = this.makeEvent(t, e, i);
  this.dispatchEvent(r);
};
Lt.prototype.fireNativeEvent = function(t) {
  var e = this.makeEvent(t.type, t, t);
  this.dispatchEvent(e);
};
Lt.prototype.wrapMouseEvent = function(t, e) {
  var i = this.makeEvent(
    t,
    St.prepareEvent(e, this),
    e
  );
  return i;
};
Lt.prototype.disposeInternal = function() {
  this.unregister_(), oe.prototype.disposeInternal.call(this);
};
Lt.CLONE_PROPS = [
  // MouseEvent
  ["bubbles", !1],
  ["cancelable", !1],
  ["view", null],
  ["detail", null],
  ["screenX", 0],
  ["screenY", 0],
  ["clientX", 0],
  ["clientY", 0],
  ["ctrlKey", !1],
  ["altKey", !1],
  ["shiftKey", !1],
  ["metaKey", !1],
  ["button", 0],
  ["relatedTarget", null],
  // DOM Level 3
  ["buttons", 0],
  // PointerEvent
  ["pointerId", 0],
  ["width", 0],
  ["height", 0],
  ["pressure", 0],
  ["tiltX", 0],
  ["tiltY", 0],
  ["pointerType", ""],
  ["hwTimestamp", 0],
  ["isPrimary", !1],
  // event instance
  ["type", ""],
  ["target", null],
  ["currentTarget", null],
  ["which", 0]
];
var Si = function(t, e) {
  oe.call(this), this.map_ = t, this.clickTimeoutId_ = 0, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = e ? e * pt.DEVICE_PIXEL_RATIO : pt.DEVICE_PIXEL_RATIO, this.down_ = null;
  var i = this.map_.getViewport();
  this.activePointers_ = 0, this.trackedTouches_ = {}, this.pointerEventHandler_ = new Lt(i), this.documentPointerEventHandler_ = null, this.pointerdownListenerKey_ = L.listen(
    this.pointerEventHandler_,
    Fi.POINTERDOWN,
    this.handlePointerDown_,
    this
  ), this.relayedListenerKey_ = L.listen(
    this.pointerEventHandler_,
    Fi.POINTERMOVE,
    this.relayEvent_,
    this
  );
};
_.inherits(Si, oe);
Si.prototype.emulateClick_ = function(t) {
  var e = new Yi(
    Gt.CLICK,
    this.map_,
    t
  );
  this.dispatchEvent(e), this.clickTimeoutId_ !== 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = 0, e = new Yi(
    Gt.DBLCLICK,
    this.map_,
    t
  ), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout((function() {
    this.clickTimeoutId_ = 0;
    var i = new Yi(
      Gt.SINGLECLICK,
      this.map_,
      t
    );
    this.dispatchEvent(i);
  }).bind(this), 250);
};
Si.prototype.updateActivePointers_ = function(t) {
  var e = t;
  e.type == Gt.POINTERUP || e.type == Gt.POINTERCANCEL ? delete this.trackedTouches_[e.pointerId] : e.type == Gt.POINTERDOWN && (this.trackedTouches_[e.pointerId] = !0), this.activePointers_ = Object.keys(this.trackedTouches_).length;
};
Si.prototype.handlePointerUp_ = function(t) {
  this.updateActivePointers_(t);
  var e = new Yi(
    Gt.POINTERUP,
    this.map_,
    t
  );
  this.dispatchEvent(e), !e.propagationStopped && !this.dragging_ && this.isMouseActionButton_(t) && this.emulateClick_(this.down_), this.activePointers_ === 0 && (this.dragListenerKeys_.forEach(L.unlistenByKey), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null, this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null);
};
Si.prototype.isMouseActionButton_ = function(t) {
  return t.button === 0;
};
Si.prototype.handlePointerDown_ = function(t) {
  this.updateActivePointers_(t);
  var e = new Yi(
    Gt.POINTERDOWN,
    this.map_,
    t
  );
  this.dispatchEvent(e), this.down_ = t, this.dragListenerKeys_.length === 0 && (this.documentPointerEventHandler_ = new Lt(document), this.dragListenerKeys_.push(
    L.listen(
      this.documentPointerEventHandler_,
      Gt.POINTERMOVE,
      this.handlePointerMove_,
      this
    ),
    L.listen(
      this.documentPointerEventHandler_,
      Gt.POINTERUP,
      this.handlePointerUp_,
      this
    ),
    /* Note that the listener for `pointercancel is set up on
    * `pointerEventHandler_` and not `documentPointerEventHandler_` like
    * the `pointerup` and `pointermove` listeners.
    *
    * The reason for this is the following: `TouchSource.vacuumTouches_()`
    * issues `pointercancel` events, when there was no `touchend` for a
    * `touchstart`. Now, let's say a first `touchstart` is registered on
    * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
    * But `documentPointerEventHandler_` doesn't know about the first
    * `touchstart`. If there is no `touchend` for the `touchstart`, we can
    * only receive a `touchcancel` from `pointerEventHandler_`, because it is
    * only registered there.
    */
    L.listen(
      this.pointerEventHandler_,
      Gt.POINTERCANCEL,
      this.handlePointerUp_,
      this
    )
  ));
};
Si.prototype.handlePointerMove_ = function(t) {
  if (this.isMoving_(t)) {
    this.dragging_ = !0;
    var e = new Yi(
      Gt.POINTERDRAG,
      this.map_,
      t,
      this.dragging_
    );
    this.dispatchEvent(e);
  }
  t.preventDefault();
};
Si.prototype.relayEvent_ = function(t) {
  var e = !!(this.down_ && this.isMoving_(t));
  this.dispatchEvent(new Yi(
    t.type,
    this.map_,
    t,
    e
  ));
};
Si.prototype.isMoving_ = function(t) {
  return Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_;
};
Si.prototype.disposeInternal = function() {
  this.relayedListenerKey_ && (L.unlistenByKey(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.pointerdownListenerKey_ && (L.unlistenByKey(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(L.unlistenByKey), this.dragListenerKeys_.length = 0, this.documentPointerEventHandler_ && (this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null), this.pointerEventHandler_ && (this.pointerEventHandler_.dispose(), this.pointerEventHandler_ = null), oe.prototype.disposeInternal.call(this);
};
var Qr = {
  /**
   * Triggered after a map frame is rendered.
   * @event ol.MapEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered when the map starts moving.
   * @event ol.MapEvent#movestart
   * @api
   */
  MOVESTART: "movestart",
  /**
   * Triggered after the map is moved.
   * @event ol.MapEvent#moveend
   * @api
   */
  MOVEEND: "moveend"
}, Qe = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, H = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4,
  ABORT: 5
}, Zt = function(t, e) {
  this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
};
Zt.DROP = 1 / 0;
Zt.prototype.clear = function() {
  this.elements_.length = 0, this.priorities_.length = 0, ut.clear(this.queuedElements_);
};
Zt.prototype.dequeue = function() {
  var t = this.elements_, e = this.priorities_, i = t[0];
  t.length == 1 ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0));
  var r = this.keyFunction_(i);
  return delete this.queuedElements_[r], i;
};
Zt.prototype.enqueue = function(t) {
  Pt.assert(
    !(this.keyFunction_(t) in this.queuedElements_),
    31
  );
  var e = this.priorityFunction_(t);
  return e != Zt.DROP ? (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
};
Zt.prototype.getCount = function() {
  return this.elements_.length;
};
Zt.prototype.getLeftChildIndex_ = function(t) {
  return t * 2 + 1;
};
Zt.prototype.getRightChildIndex_ = function(t) {
  return t * 2 + 2;
};
Zt.prototype.getParentIndex_ = function(t) {
  return t - 1 >> 1;
};
Zt.prototype.heapify_ = function() {
  var t;
  for (t = (this.elements_.length >> 1) - 1; t >= 0; t--)
    this.siftUp_(t);
};
Zt.prototype.isEmpty = function() {
  return this.elements_.length === 0;
};
Zt.prototype.isKeyQueued = function(t) {
  return t in this.queuedElements_;
};
Zt.prototype.isQueued = function(t) {
  return this.isKeyQueued(this.keyFunction_(t));
};
Zt.prototype.siftUp_ = function(t) {
  for (var e = this.elements_, i = this.priorities_, r = e.length, n = e[t], a = i[t], o = t; t < r >> 1; ) {
    var s = this.getLeftChildIndex_(t), l = this.getRightChildIndex_(t), h = l < r && i[l] < i[s] ? l : s;
    e[t] = e[h], i[t] = i[h], t = h;
  }
  e[t] = n, i[t] = a, this.siftDown_(o, t);
};
Zt.prototype.siftDown_ = function(t, e) {
  for (var i = this.elements_, r = this.priorities_, n = i[e], a = r[e]; e > t; ) {
    var o = this.getParentIndex_(e);
    if (r[o] > a)
      i[e] = i[o], r[e] = r[o], e = o;
    else
      break;
  }
  i[e] = n, r[e] = a;
};
Zt.prototype.reprioritize = function() {
  var t = this.priorityFunction_, e = this.elements_, i = this.priorities_, r = 0, n = e.length, a, o, s;
  for (o = 0; o < n; ++o)
    a = e[o], s = t(a), s == Zt.DROP ? delete this.queuedElements_[this.keyFunction_(a)] : (i[r] = s, e[r++] = a);
  e.length = r, i.length = r, this.heapify_();
};
var Wr = function(t, e) {
  Zt.call(
    this,
    /**
     * @param {Array} element Element.
     * @return {number} Priority.
     */
    function(i) {
      return t.apply(null, i);
    },
    /**
     * @param {Array} element Element.
     * @return {string} Key.
     */
    function(i) {
      return (
        /** @type {ol.Tile} */
        i[0].getKey()
      );
    }
  ), this.tileChangeCallback_ = e, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
};
_.inherits(Wr, Zt);
Wr.prototype.enqueue = function(t) {
  var e = Zt.prototype.enqueue.call(this, t);
  if (e) {
    var i = t[0];
    L.listen(
      i,
      it.CHANGE,
      this.handleTileChange,
      this
    );
  }
  return e;
};
Wr.prototype.getTilesLoading = function() {
  return this.tilesLoading_;
};
Wr.prototype.handleTileChange = function(t) {
  var e = (
    /** @type {ol.Tile} */
    t.target
  ), i = e.getState();
  if (i === H.LOADED || i === H.ERROR || i === H.EMPTY || i === H.ABORT) {
    L.unlisten(
      e,
      it.CHANGE,
      this.handleTileChange,
      this
    );
    var r = e.getKey();
    r in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[r], --this.tilesLoading_), this.tileChangeCallback_();
  }
};
Wr.prototype.loadMoreTiles = function(t, e) {
  for (var i = 0, r = !1, n, a, o; this.tilesLoading_ < t && i < e && this.getCount() > 0; )
    a = /** @type {ol.Tile} */
    this.dequeue()[0], o = a.getKey(), n = a.getState(), n === H.ABORT ? r = !0 : n === H.IDLE && !(o in this.tilesLoadingKeys_) && (this.tilesLoadingKeys_[o] = !0, ++this.tilesLoading_, ++i, a.load());
  i === 0 && r && this.tileChangeCallback_();
};
var vn = {};
vn.createExtent = function(t) {
  return (
    /**
     * @param {ol.Coordinate|undefined} center Center.
     * @return {ol.Coordinate|undefined} Center.
     */
    function(e) {
      if (e)
        return [
          Z.clamp(e[0], t[0], t[2]),
          Z.clamp(e[1], t[1], t[3])
        ];
    }
  );
};
vn.none = function(t) {
  return t;
};
var pn = {};
pn.createSnapToResolutions = function(t) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} delta Delta.
     * @param {number} direction Direction.
     * @return {number|undefined} Resolution.
     */
    function(e, i, r) {
      if (e !== void 0) {
        var n = st.linearFindNearest(t, e, r);
        n = Z.clamp(n + i, 0, t.length - 1);
        var a = Math.floor(n);
        if (n != a && a < t.length - 1) {
          var o = t[a] / t[a + 1];
          return t[a] / Math.pow(o, n - a);
        } else
          return t[a];
      } else
        return;
    }
  );
};
pn.createSnapToPower = function(t, e, i) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} delta Delta.
     * @param {number} direction Direction.
     * @return {number|undefined} Resolution.
     */
    function(r, n, a) {
      if (r !== void 0) {
        var o = -a / 2 + 0.5, s = Math.floor(
          Math.log(e / r) / Math.log(t) + o
        ), l = Math.max(s + n, 0);
        return i !== void 0 && (l = Math.min(l, i)), e / Math.pow(t, l);
      } else
        return;
    }
  );
};
var Ei = {};
Ei.disable = function(t, e) {
  if (t !== void 0)
    return 0;
};
Ei.none = function(t, e) {
  if (t !== void 0)
    return t + e;
};
Ei.createSnapToN = function(t) {
  var e = 2 * Math.PI / t;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {number} delta Delta.
     * @return {number|undefined} Rotation.
     */
    function(i, r) {
      if (i !== void 0)
        return i = Math.floor((i + r) / e + 0.5) * e, i;
    }
  );
};
Ei.createSnapToZero = function(t) {
  var e = t || Z.toRadians(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {number} delta Delta.
     * @return {number|undefined} Rotation.
     */
    function(i, r) {
      if (i !== void 0)
        return Math.abs(i + r) <= e ? 0 : i + r;
    }
  );
};
var Dt = {
  ANIMATING: 0,
  INTERACTING: 1
}, Ge = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, gn = {};
gn.padNumber = function(t, e, i) {
  var r = i !== void 0 ? t.toFixed(i) : "" + t, n = r.indexOf(".");
  return n = n === -1 ? r.length : n, n > e ? r : new Array(1 + e - n).join("0") + r;
};
gn.compareVersions = function(t, e) {
  for (var i = ("" + t).split("."), r = ("" + e).split("."), n = 0; n < Math.max(i.length, r.length); n++) {
    var a = parseInt(i[n] || "0", 10), o = parseInt(r[n] || "0", 10);
    if (a > o)
      return 1;
    if (o > a)
      return -1;
  }
  return 0;
};
var Mt = {};
Mt.add = function(t, e) {
  return t[0] += e[0], t[1] += e[1], t;
};
Mt.closestOnCircle = function(t, e) {
  var i = e.getRadius(), r = e.getCenter(), n = r[0], a = r[1], o = t[0], s = t[1], l = o - n, h = s - a;
  l === 0 && h === 0 && (l = 1);
  var u = Math.sqrt(l * l + h * h), f, c;
  return f = n + i * l / u, c = a + i * h / u, [f, c];
};
Mt.closestOnSegment = function(t, e) {
  var i = t[0], r = t[1], n = e[0], a = e[1], o = n[0], s = n[1], l = a[0], h = a[1], u = l - o, f = h - s, c = u === 0 && f === 0 ? 0 : (u * (i - o) + f * (r - s)) / (u * u + f * f || 0), d, v;
  return c <= 0 ? (d = o, v = s) : c >= 1 ? (d = l, v = h) : (d = o + c * u, v = s + c * f), [d, v];
};
Mt.createStringXY = function(t) {
  return (
    /**
     * @param {ol.Coordinate|undefined} coordinate Coordinate.
     * @return {string} String XY.
     */
    function(e) {
      return Mt.toStringXY(e, t);
    }
  );
};
Mt.degreesToStringHDMS = function(t, e, i) {
  var r = Z.modulo(e + 180, 360) - 180, n = Math.abs(3600 * r), a = i || 0, o = Math.pow(10, a), s = Math.floor(n / 3600), l = Math.floor((n - s * 3600) / 60), h = n - s * 3600 - l * 60;
  return h = Math.ceil(h * o) / o, h >= 60 && (h = 0, l += 1), l >= 60 && (l = 0, s += 1), s + "° " + gn.padNumber(l, 2) + "′ " + gn.padNumber(h, 2, a) + "″" + (r == 0 ? "" : " " + t.charAt(r < 0 ? 1 : 0));
};
Mt.format = function(t, e, i) {
  return t ? e.replace("{x}", t[0].toFixed(i)).replace("{y}", t[1].toFixed(i)) : "";
};
Mt.equals = function(t, e) {
  for (var i = !0, r = t.length - 1; r >= 0; --r)
    if (t[r] != e[r]) {
      i = !1;
      break;
    }
  return i;
};
Mt.rotate = function(t, e) {
  var i = Math.cos(e), r = Math.sin(e), n = t[0] * i - t[1] * r, a = t[1] * i + t[0] * r;
  return t[0] = n, t[1] = a, t;
};
Mt.scale = function(t, e) {
  return t[0] *= e, t[1] *= e, t;
};
Mt.sub = function(t, e) {
  return t[0] -= e[0], t[1] -= e[1], t;
};
Mt.squaredDistance = function(t, e) {
  var i = t[0] - e[0], r = t[1] - e[1];
  return i * i + r * r;
};
Mt.distance = function(t, e) {
  return Math.sqrt(Mt.squaredDistance(t, e));
};
Mt.squaredDistanceToSegment = function(t, e) {
  return Mt.squaredDistance(
    t,
    Mt.closestOnSegment(t, e)
  );
};
Mt.toStringHDMS = function(t, e) {
  return t ? Mt.degreesToStringHDMS("NS", t[1], e) + " " + Mt.degreesToStringHDMS("EW", t[0], e) : "";
};
Mt.toStringXY = function(t, e) {
  return Mt.format(t, "{x}, {y}", e);
};
var ce = {};
ce.easeIn = function(t) {
  return Math.pow(t, 3);
};
ce.easeOut = function(t) {
  return 1 - ce.easeIn(1 - t);
};
ce.inAndOut = function(t) {
  return 3 * t * t - 2 * t * t * t;
};
ce.linear = function(t) {
  return t;
};
ce.upAndDown = function(t) {
  return t < 0.5 ? ce.inAndOut(2 * t) : 1 - ce.inAndOut(2 * (t - 0.5));
};
var Jr = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right"
}, Ie = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
}, g = {};
g.boundingExtent = function(t) {
  for (var e = g.createEmpty(), i = 0, r = t.length; i < r; ++i)
    g.extendCoordinate(e, t[i]);
  return e;
};
g.boundingExtentXYs_ = function(t, e, i) {
  var r = Math.min.apply(null, t), n = Math.min.apply(null, e), a = Math.max.apply(null, t), o = Math.max.apply(null, e);
  return g.createOrUpdate(r, n, a, o, i);
};
g.buffer = function(t, e, i) {
  return i ? (i[0] = t[0] - e, i[1] = t[1] - e, i[2] = t[2] + e, i[3] = t[3] + e, i) : [
    t[0] - e,
    t[1] - e,
    t[2] + e,
    t[3] + e
  ];
};
g.clone = function(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice();
};
g.closestSquaredDistanceXY = function(t, e, i) {
  var r, n;
  return e < t[0] ? r = t[0] - e : t[2] < e ? r = e - t[2] : r = 0, i < t[1] ? n = t[1] - i : t[3] < i ? n = i - t[3] : n = 0, r * r + n * n;
};
g.containsCoordinate = function(t, e) {
  return g.containsXY(t, e[0], e[1]);
};
g.containsExtent = function(t, e) {
  return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3];
};
g.containsXY = function(t, e, i) {
  return t[0] <= e && e <= t[2] && t[1] <= i && i <= t[3];
};
g.coordinateRelationship = function(t, e) {
  var i = t[0], r = t[1], n = t[2], a = t[3], o = e[0], s = e[1], l = Ie.UNKNOWN;
  return o < i ? l = l | Ie.LEFT : o > n && (l = l | Ie.RIGHT), s < r ? l = l | Ie.BELOW : s > a && (l = l | Ie.ABOVE), l === Ie.UNKNOWN && (l = Ie.INTERSECTING), l;
};
g.createEmpty = function() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
};
g.createOrUpdate = function(t, e, i, r, n) {
  return n ? (n[0] = t, n[1] = e, n[2] = i, n[3] = r, n) : [t, e, i, r];
};
g.createOrUpdateEmpty = function(t) {
  return g.createOrUpdate(
    1 / 0,
    1 / 0,
    -1 / 0,
    -1 / 0,
    t
  );
};
g.createOrUpdateFromCoordinate = function(t, e) {
  var i = t[0], r = t[1];
  return g.createOrUpdate(i, r, i, r, e);
};
g.createOrUpdateFromCoordinates = function(t, e) {
  var i = g.createOrUpdateEmpty(e);
  return g.extendCoordinates(i, t);
};
g.createOrUpdateFromFlatCoordinates = function(t, e, i, r, n) {
  var a = g.createOrUpdateEmpty(n);
  return g.extendFlatCoordinates(
    a,
    t,
    e,
    i,
    r
  );
};
g.createOrUpdateFromRings = function(t, e) {
  var i = g.createOrUpdateEmpty(e);
  return g.extendRings(i, t);
};
g.equals = function(t, e) {
  return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3];
};
g.extend = function(t, e) {
  return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t;
};
g.extendCoordinate = function(t, e) {
  e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]);
};
g.extendCoordinates = function(t, e) {
  var i, r;
  for (i = 0, r = e.length; i < r; ++i)
    g.extendCoordinate(t, e[i]);
  return t;
};
g.extendFlatCoordinates = function(t, e, i, r, n) {
  for (; i < r; i += n)
    g.extendXY(
      t,
      e[i],
      e[i + 1]
    );
  return t;
};
g.extendRings = function(t, e) {
  var i, r;
  for (i = 0, r = e.length; i < r; ++i)
    g.extendCoordinates(t, e[i]);
  return t;
};
g.extendXY = function(t, e, i) {
  t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], i), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], i);
};
g.forEachCorner = function(t, e, i) {
  var r;
  return r = e.call(i, g.getBottomLeft(t)), r || (r = e.call(i, g.getBottomRight(t)), r) || (r = e.call(i, g.getTopRight(t)), r) || (r = e.call(i, g.getTopLeft(t)), r) ? r : !1;
};
g.getArea = function(t) {
  var e = 0;
  return g.isEmpty(t) || (e = g.getWidth(t) * g.getHeight(t)), e;
};
g.getBottomLeft = function(t) {
  return [t[0], t[1]];
};
g.getBottomRight = function(t) {
  return [t[2], t[1]];
};
g.getCenter = function(t) {
  return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2];
};
g.getCorner = function(t, e) {
  var i;
  return e === Jr.BOTTOM_LEFT ? i = g.getBottomLeft(t) : e === Jr.BOTTOM_RIGHT ? i = g.getBottomRight(t) : e === Jr.TOP_LEFT ? i = g.getTopLeft(t) : e === Jr.TOP_RIGHT ? i = g.getTopRight(t) : Pt.assert(!1, 13), /** @type {!ol.Coordinate} */
  i;
};
g.getEnlargedArea = function(t, e) {
  var i = Math.min(t[0], e[0]), r = Math.min(t[1], e[1]), n = Math.max(t[2], e[2]), a = Math.max(t[3], e[3]);
  return (n - i) * (a - r);
};
g.getForViewAndSize = function(t, e, i, r, n) {
  var a = e * r[0] / 2, o = e * r[1] / 2, s = Math.cos(i), l = Math.sin(i), h = a * s, u = a * l, f = o * s, c = o * l, d = t[0], v = t[1], m = d - h + c, p = d - h - c, E = d + h - c, y = d + h + c, R = v - u - f, I = v - u + f, x = v + u + f, C = v + u - f;
  return g.createOrUpdate(
    Math.min(m, p, E, y),
    Math.min(R, I, x, C),
    Math.max(m, p, E, y),
    Math.max(R, I, x, C),
    n
  );
};
g.getHeight = function(t) {
  return t[3] - t[1];
};
g.getIntersectionArea = function(t, e) {
  var i = g.getIntersection(t, e);
  return g.getArea(i);
};
g.getIntersection = function(t, e, i) {
  var r = i || g.createEmpty();
  return g.intersects(t, e) && (t[0] > e[0] ? r[0] = t[0] : r[0] = e[0], t[1] > e[1] ? r[1] = t[1] : r[1] = e[1], t[2] < e[2] ? r[2] = t[2] : r[2] = e[2], t[3] < e[3] ? r[3] = t[3] : r[3] = e[3]), r;
};
g.getMargin = function(t) {
  return g.getWidth(t) + g.getHeight(t);
};
g.getSize = function(t) {
  return [t[2] - t[0], t[3] - t[1]];
};
g.getTopLeft = function(t) {
  return [t[0], t[3]];
};
g.getTopRight = function(t) {
  return [t[2], t[3]];
};
g.getWidth = function(t) {
  return t[2] - t[0];
};
g.intersects = function(t, e) {
  return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1];
};
g.isEmpty = function(t) {
  return t[2] < t[0] || t[3] < t[1];
};
g.returnOrUpdate = function(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t;
};
g.scaleFromCenter = function(t, e) {
  var i = (t[2] - t[0]) / 2 * (e - 1), r = (t[3] - t[1]) / 2 * (e - 1);
  t[0] -= i, t[2] += i, t[1] -= r, t[3] += r;
};
g.intersectsSegment = function(t, e, i) {
  var r = !1, n = g.coordinateRelationship(t, e), a = g.coordinateRelationship(t, i);
  if (n === Ie.INTERSECTING || a === Ie.INTERSECTING)
    r = !0;
  else {
    var o = t[0], s = t[1], l = t[2], h = t[3], u = e[0], f = e[1], c = i[0], d = i[1], v = (d - f) / (c - u), m, p;
    a & Ie.ABOVE && !(n & Ie.ABOVE) && (m = c - (d - h) / v, r = m >= o && m <= l), !r && a & Ie.RIGHT && !(n & Ie.RIGHT) && (p = d - (c - l) * v, r = p >= s && p <= h), !r && a & Ie.BELOW && !(n & Ie.BELOW) && (m = c - (d - s) / v, r = m >= o && m <= l), !r && a & Ie.LEFT && !(n & Ie.LEFT) && (p = d - (c - o) * v, r = p >= s && p <= h);
  }
  return r;
};
g.applyTransform = function(t, e, i) {
  var r = [
    t[0],
    t[1],
    t[0],
    t[3],
    t[2],
    t[1],
    t[2],
    t[3]
  ];
  e(r, r, 2);
  var n = [r[0], r[2], r[4], r[6]], a = [r[1], r[3], r[5], r[7]];
  return g.boundingExtentXYs_(n, a, i);
};
var j = {
  POINT: "Point",
  LINE_STRING: "LineString",
  LINEAR_RING: "LinearRing",
  POLYGON: "Polygon",
  MULTI_POINT: "MultiPoint",
  MULTI_LINE_STRING: "MultiLineString",
  MULTI_POLYGON: "MultiPolygon",
  GEOMETRY_COLLECTION: "GeometryCollection",
  CIRCLE: "Circle"
}, Ue = {
  XY: "XY",
  XYZ: "XYZ",
  XYM: "XYM",
  XYZM: "XYZM"
}, se = {};
se.TRUE = function() {
  return !0;
};
se.FALSE = function() {
  return !1;
};
var re = {};
re.transform2D = function(t, e, i, r, n, a) {
  var o = a || [], s = 0, l;
  for (l = e; l < i; l += r) {
    var h = t[l], u = t[l + 1];
    o[s++] = n[0] * h + n[2] * u + n[4], o[s++] = n[1] * h + n[3] * u + n[5];
  }
  return a && o.length != s && (o.length = s), o;
};
re.rotate = function(t, e, i, r, n, a, o) {
  for (var s = o || [], l = Math.cos(n), h = Math.sin(n), u = a[0], f = a[1], c = 0, d = e; d < i; d += r) {
    var v = t[d] - u, m = t[d + 1] - f;
    s[c++] = u + v * l - m * h, s[c++] = f + v * h + m * l;
    for (var p = d + 2; p < d + r; ++p)
      s[c++] = t[p];
  }
  return o && s.length != c && (s.length = c), s;
};
re.scale = function(t, e, i, r, n, a, o, s) {
  for (var l = s || [], h = o[0], u = o[1], f = 0, c = e; c < i; c += r) {
    var d = t[c] - h, v = t[c + 1] - u;
    l[f++] = h + n * d, l[f++] = u + a * v;
    for (var m = c + 2; m < c + r; ++m)
      l[f++] = t[m];
  }
  return s && l.length != f && (l.length = f), l;
};
re.translate = function(t, e, i, r, n, a, o) {
  var s = o || [], l = 0, h, u;
  for (h = e; h < i; h += r)
    for (s[l++] = t[h] + n, s[l++] = t[h + 1] + a, u = h + 2; u < h + r; ++u)
      s[l++] = t[u];
  return o && s.length != l && (s.length = l), s;
};
/**
 * @license
 * Latitude/longitude spherical geodesy formulae taken from
 * http://www.movable-type.co.uk/scripts/latlong.html
 * Licensed under CC-BY-3.0.
 */
var Vt = function(t) {
  this.radius = t;
};
Vt.prototype.geodesicArea = function(t) {
  return Vt.getArea_(t, this.radius);
};
Vt.prototype.haversineDistance = function(t, e) {
  return Vt.getDistance_(t, e, this.radius);
};
Vt.prototype.offset = function(t, e, i) {
  var r = Z.toRadians(t[1]), n = Z.toRadians(t[0]), a = e / this.radius, o = Math.asin(
    Math.sin(r) * Math.cos(a) + Math.cos(r) * Math.sin(a) * Math.cos(i)
  ), s = n + Math.atan2(
    Math.sin(i) * Math.sin(a) * Math.cos(r),
    Math.cos(a) - Math.sin(r) * Math.sin(o)
  );
  return [Z.toDegrees(s), Z.toDegrees(o)];
};
Vt.DEFAULT_RADIUS = 63710088e-1;
Vt.getLength = function(t, e) {
  var i = e || {}, r = i.radius || Vt.DEFAULT_RADIUS, n = i.projection || "EPSG:3857";
  t = t.clone().transform(n, "EPSG:4326");
  var a = t.getType(), o = 0, s, l, h, u, f, c;
  switch (a) {
    case j.POINT:
    case j.MULTI_POINT:
      break;
    case j.LINE_STRING:
    case j.LINEAR_RING: {
      s = /** @type {ol.geom.SimpleGeometry} */
      t.getCoordinates(), o = Vt.getLength_(s, r);
      break;
    }
    case j.MULTI_LINE_STRING:
    case j.POLYGON: {
      for (s = /** @type {ol.geom.SimpleGeometry} */
      t.getCoordinates(), h = 0, u = s.length; h < u; ++h)
        o += Vt.getLength_(s[h], r);
      break;
    }
    case j.MULTI_POLYGON: {
      for (s = /** @type {ol.geom.SimpleGeometry} */
      t.getCoordinates(), h = 0, u = s.length; h < u; ++h)
        for (l = s[h], f = 0, c = l.length; f < c; ++f)
          o += Vt.getLength_(l[f], r);
      break;
    }
    case j.GEOMETRY_COLLECTION: {
      var d = (
        /** @type {ol.geom.GeometryCollection} */
        t.getGeometries()
      );
      for (h = 0, u = d.length; h < u; ++h)
        o += Vt.getLength(d[h], e);
      break;
    }
    default:
      throw new Error("Unsupported geometry type: " + a);
  }
  return o;
};
Vt.getLength_ = function(t, e) {
  for (var i = 0, r = 0, n = t.length; r < n - 1; ++r)
    i += Vt.getDistance_(t[r], t[r + 1], e);
  return i;
};
Vt.getDistance_ = function(t, e, i) {
  var r = Z.toRadians(t[1]), n = Z.toRadians(e[1]), a = (n - r) / 2, o = Z.toRadians(e[0] - t[0]) / 2, s = Math.sin(a) * Math.sin(a) + Math.sin(o) * Math.sin(o) * Math.cos(r) * Math.cos(n);
  return 2 * i * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
};
Vt.getArea = function(t, e) {
  var i = e || {}, r = i.radius || Vt.DEFAULT_RADIUS, n = i.projection || "EPSG:3857";
  t = t.clone().transform(n, "EPSG:4326");
  var a = t.getType(), o = 0, s, l, h, u, f, c;
  switch (a) {
    case j.POINT:
    case j.MULTI_POINT:
    case j.LINE_STRING:
    case j.MULTI_LINE_STRING:
    case j.LINEAR_RING:
      break;
    case j.POLYGON: {
      for (s = /** @type {ol.geom.Polygon} */
      t.getCoordinates(), o = Math.abs(Vt.getArea_(s[0], r)), h = 1, u = s.length; h < u; ++h)
        o -= Math.abs(Vt.getArea_(s[h], r));
      break;
    }
    case j.MULTI_POLYGON: {
      for (s = /** @type {ol.geom.SimpleGeometry} */
      t.getCoordinates(), h = 0, u = s.length; h < u; ++h)
        for (l = s[h], o += Math.abs(Vt.getArea_(l[0], r)), f = 1, c = l.length; f < c; ++f)
          o -= Math.abs(Vt.getArea_(l[f], r));
      break;
    }
    case j.GEOMETRY_COLLECTION: {
      var d = (
        /** @type {ol.geom.GeometryCollection} */
        t.getGeometries()
      );
      for (h = 0, u = d.length; h < u; ++h)
        o += Vt.getArea(d[h], e);
      break;
    }
    default:
      throw new Error("Unsupported geometry type: " + a);
  }
  return o;
};
Vt.getArea_ = function(t, e) {
  for (var i = 0, r = t.length, n = t[r - 1][0], a = t[r - 1][1], o = 0; o < r; o++) {
    var s = t[o][0], l = t[o][1];
    i += Z.toRadians(s - n) * (2 + Math.sin(Z.toRadians(a)) + Math.sin(Z.toRadians(l))), n = s, a = l;
  }
  return i * e * e / 2;
};
var de = {
  DEGREES: "degrees",
  FEET: "ft",
  METERS: "m",
  PIXELS: "pixels",
  TILE_PIXELS: "tile-pixels",
  USFEET: "us-ft"
};
de.METERS_PER_UNIT = {};
de.METERS_PER_UNIT[de.DEGREES] = 2 * Math.PI * 6370997 / 360;
de.METERS_PER_UNIT[de.FEET] = 0.3048;
de.METERS_PER_UNIT[de.METERS] = 1;
de.METERS_PER_UNIT[de.USFEET] = 1200 / 3937;
var Zi = {};
Zi.cache_ = null;
Zi.set = function(t) {
  Zi.cache_ = t;
};
Zi.get = function() {
  return Zi.cache_ || window.proj4;
};
var ne = function(t) {
  this.code_ = t.code, this.units_ = /** @type {ol.proj.Units} */
  t.units, this.extent_ = t.extent !== void 0 ? t.extent : null, this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null, this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu", this.global_ = t.global !== void 0 ? t.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
  var e = t.code;
  if (_.ENABLE_PROJ4JS) {
    var i = Zi.get();
    if (typeof i == "function") {
      var r = i.defs(e);
      r !== void 0 && (r.axis !== void 0 && t.axisOrientation === void 0 && (this.axisOrientation_ = r.axis), t.metersPerUnit === void 0 && (this.metersPerUnit_ = r.to_meter), t.units === void 0 && (this.units_ = r.units));
    }
  }
};
ne.prototype.canWrapX = function() {
  return this.canWrapX_;
};
ne.prototype.getCode = function() {
  return this.code_;
};
ne.prototype.getExtent = function() {
  return this.extent_;
};
ne.prototype.getUnits = function() {
  return this.units_;
};
ne.prototype.getMetersPerUnit = function() {
  return this.metersPerUnit_ || de.METERS_PER_UNIT[this.units_];
};
ne.prototype.getWorldExtent = function() {
  return this.worldExtent_;
};
ne.prototype.getAxisOrientation = function() {
  return this.axisOrientation_;
};
ne.prototype.isGlobal = function() {
  return this.global_;
};
ne.prototype.setGlobal = function(t) {
  this.global_ = t, this.canWrapX_ = !!(t && this.extent_);
};
ne.prototype.getDefaultTileGrid = function() {
  return this.defaultTileGrid_;
};
ne.prototype.setDefaultTileGrid = function(t) {
  this.defaultTileGrid_ = t;
};
ne.prototype.setExtent = function(t) {
  this.extent_ = t, this.canWrapX_ = !!(this.global_ && t);
};
ne.prototype.setWorldExtent = function(t) {
  this.worldExtent_ = t;
};
ne.prototype.setGetPointResolution = function(t) {
  this.getPointResolutionFunc_ = t;
};
ne.prototype.getPointResolutionFunc = function() {
  return this.getPointResolutionFunc_;
};
var xt = {};
xt.Projection_ = function(t) {
  ne.call(this, {
    code: t,
    units: de.METERS,
    extent: xt.EXTENT,
    global: !0,
    worldExtent: xt.WORLD_EXTENT,
    getPointResolution: function(e, i) {
      return e / Z.cosh(i[1] / xt.RADIUS);
    }
  });
};
_.inherits(xt.Projection_, ne);
xt.RADIUS = 6378137;
xt.HALF_SIZE = Math.PI * xt.RADIUS;
xt.EXTENT = [
  -xt.HALF_SIZE,
  -xt.HALF_SIZE,
  xt.HALF_SIZE,
  xt.HALF_SIZE
];
xt.WORLD_EXTENT = [-180, -85, 180, 85];
xt.PROJECTIONS = [
  new xt.Projection_("EPSG:3857"),
  new xt.Projection_("EPSG:102100"),
  new xt.Projection_("EPSG:102113"),
  new xt.Projection_("EPSG:900913"),
  new xt.Projection_("urn:ogc:def:crs:EPSG:6.18:3:3857"),
  new xt.Projection_("urn:ogc:def:crs:EPSG::3857"),
  new xt.Projection_("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
xt.fromEPSG4326 = function(t, e, i) {
  var r = t.length, n = i > 1 ? i : 2, a = e;
  a === void 0 && (n > 2 ? a = t.slice() : a = new Array(r));
  for (var o = xt.HALF_SIZE, s = 0; s < r; s += n) {
    a[s] = o * t[s] / 180;
    var l = xt.RADIUS * Math.log(Math.tan(Math.PI * (t[s + 1] + 90) / 360));
    l > o ? l = o : l < -o && (l = -o), a[s + 1] = l;
  }
  return a;
};
xt.toEPSG4326 = function(t, e, i) {
  var r = t.length, n = i > 1 ? i : 2, a = e;
  a === void 0 && (n > 2 ? a = t.slice() : a = new Array(r));
  for (var o = 0; o < r; o += n)
    a[o] = 180 * t[o] / xt.HALF_SIZE, a[o + 1] = 360 * Math.atan(
      Math.exp(t[o + 1] / xt.RADIUS)
    ) / Math.PI - 90;
  return a;
};
var ue = {};
ue.Projection_ = function(t, e) {
  ne.call(this, {
    code: t,
    units: de.DEGREES,
    extent: ue.EXTENT,
    axisOrientation: e,
    global: !0,
    metersPerUnit: ue.METERS_PER_UNIT,
    worldExtent: ue.EXTENT
  });
};
_.inherits(ue.Projection_, ne);
ue.RADIUS = 6378137;
ue.EXTENT = [-180, -90, 180, 90];
ue.METERS_PER_UNIT = Math.PI * ue.RADIUS / 180;
ue.PROJECTIONS = [
  new ue.Projection_("CRS:84"),
  new ue.Projection_("EPSG:4326", "neu"),
  new ue.Projection_("urn:ogc:def:crs:EPSG::4326", "neu"),
  new ue.Projection_("urn:ogc:def:crs:EPSG:6.6:4326", "neu"),
  new ue.Projection_("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new ue.Projection_("urn:ogc:def:crs:OGC:2:84"),
  new ue.Projection_("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new ue.Projection_("urn:x-ogc:def:crs:EPSG:4326", "neu")
];
var bi = {};
bi.cache_ = {};
bi.clear = function() {
  bi.cache_ = {};
};
bi.get = function(t) {
  var e = bi.cache_;
  return e[t] || null;
};
bi.add = function(t, e) {
  var i = bi.cache_;
  i[t] = e;
};
var Le = {};
Le.cache_ = {};
Le.clear = function() {
  Le.cache_ = {};
};
Le.add = function(t, e, i) {
  var r = t.getCode(), n = e.getCode(), a = Le.cache_;
  r in a || (a[r] = {}), a[r][n] = i;
};
Le.remove = function(t, e) {
  var i = t.getCode(), r = e.getCode(), n = Le.cache_, a = n[i][r];
  return delete n[i][r], ut.isEmpty(n[i]) && delete n[i], a;
};
Le.get = function(t, e) {
  var i, r = Le.cache_;
  return t in r && e in r[t] && (i = r[t][e]), i;
};
var k = {};
k.METERS_PER_UNIT = de.METERS_PER_UNIT;
k.SPHERE_ = new Vt(Vt.DEFAULT_RADIUS);
_.ENABLE_PROJ4JS && (k.setProj4 = function(t) {
  Zi.set(t);
});
k.getPointResolution = function(t, e, i, r) {
  t = k.get(t);
  var n, a = t.getPointResolutionFunc();
  if (a)
    n = a(e, i);
  else {
    var o = t.getUnits();
    if (o == de.DEGREES && !r || r == de.DEGREES)
      n = e;
    else {
      var s = k.getTransformFromProjections(t, k.get("EPSG:4326")), l = [
        i[0] - e / 2,
        i[1],
        i[0] + e / 2,
        i[1],
        i[0],
        i[1] - e / 2,
        i[0],
        i[1] + e / 2
      ];
      l = s(l, l, 2);
      var h = k.SPHERE_.haversineDistance(
        l.slice(0, 2),
        l.slice(2, 4)
      ), u = k.SPHERE_.haversineDistance(
        l.slice(4, 6),
        l.slice(6, 8)
      );
      n = (h + u) / 2;
      var f = r ? de.METERS_PER_UNIT[r] : t.getMetersPerUnit();
      f !== void 0 && (n /= f);
    }
  }
  return n;
};
k.addEquivalentProjections = function(t) {
  k.addProjections(t), t.forEach(function(e) {
    t.forEach(function(i) {
      e !== i && Le.add(e, i, k.cloneTransform);
    });
  });
};
k.addEquivalentTransforms = function(t, e, i, r) {
  t.forEach(function(n) {
    e.forEach(function(a) {
      Le.add(n, a, i), Le.add(a, n, r);
    });
  });
};
k.addProjection = function(t) {
  bi.add(t.getCode(), t), Le.add(t, t, k.cloneTransform);
};
k.addProjections = function(t) {
  t.forEach(k.addProjection);
};
k.clearAllProjections = function() {
  bi.clear(), Le.clear();
};
k.createProjection = function(t, e) {
  return t ? typeof t == "string" ? k.get(t) : (
    /** @type {ol.proj.Projection} */
    t
  ) : k.get(e);
};
k.addCoordinateTransforms = function(t, e, i, r) {
  var n = k.get(t), a = k.get(e);
  Le.add(
    n,
    a,
    k.createTransformFromCoordinateTransform(i)
  ), Le.add(
    a,
    n,
    k.createTransformFromCoordinateTransform(r)
  );
};
k.createTransformFromCoordinateTransform = function(t) {
  return (
    /**
     * @param {Array.<number>} input Input.
     * @param {Array.<number>=} opt_output Output.
     * @param {number=} opt_dimension Dimension.
     * @return {Array.<number>} Output.
     */
    function(e, i, r) {
      var n = e.length, a = r !== void 0 ? r : 2, o = i !== void 0 ? i : new Array(n), s, l, h;
      for (l = 0; l < n; l += a)
        for (s = t([e[l], e[l + 1]]), o[l] = s[0], o[l + 1] = s[1], h = a - 1; h >= 2; --h)
          o[l + h] = e[l + h];
      return o;
    }
  );
};
k.fromLonLat = function(t, e) {
  return k.transform(
    t,
    "EPSG:4326",
    e !== void 0 ? e : "EPSG:3857"
  );
};
k.toLonLat = function(t, e) {
  var i = k.transform(
    t,
    e !== void 0 ? e : "EPSG:3857",
    "EPSG:4326"
  ), r = i[0];
  return (r < -180 || r > 180) && (i[0] = Z.modulo(r + 180, 360) - 180), i;
};
k.get = function(t) {
  var e = null;
  if (t instanceof ne)
    e = t;
  else if (typeof t == "string") {
    var i = t;
    if (e = bi.get(i), _.ENABLE_PROJ4JS && !e) {
      var r = Zi.get();
      typeof r == "function" && r.defs(i) !== void 0 && (e = new ne({ code: i }), k.addProjection(e));
    }
  }
  return e;
};
k.equivalent = function(t, e) {
  if (t === e)
    return !0;
  var i = t.getUnits() === e.getUnits();
  if (t.getCode() === e.getCode())
    return i;
  var r = k.getTransformFromProjections(
    t,
    e
  );
  return r === k.cloneTransform && i;
};
k.getTransform = function(t, e) {
  var i = k.get(t), r = k.get(e);
  return k.getTransformFromProjections(
    i,
    r
  );
};
k.getTransformFromProjections = function(t, e) {
  var i = t.getCode(), r = e.getCode(), n = Le.get(i, r);
  if (_.ENABLE_PROJ4JS && !n) {
    var a = Zi.get();
    if (typeof a == "function") {
      var o = a.defs(i), s = a.defs(r);
      if (o !== void 0 && s !== void 0) {
        if (o === s)
          k.addEquivalentProjections([e, t]);
        else {
          var l = a(r, i);
          k.addCoordinateTransforms(
            e,
            t,
            l.forward,
            l.inverse
          );
        }
        n = Le.get(i, r);
      }
    }
  }
  return n || (n = k.identityTransform), n;
};
k.identityTransform = function(t, e, i) {
  if (e !== void 0 && t !== e) {
    for (var r = 0, n = t.length; r < n; ++r)
      e[r] = t[r];
    t = e;
  }
  return t;
};
k.cloneTransform = function(t, e, i) {
  var r;
  if (e !== void 0) {
    for (var n = 0, a = t.length; n < a; ++n)
      e[n] = t[n];
    r = e;
  } else
    r = t.slice();
  return r;
};
k.transform = function(t, e, i) {
  var r = k.getTransform(e, i);
  return r(t, void 0, t.length);
};
k.transformExtent = function(t, e, i) {
  var r = k.getTransform(e, i);
  return g.applyTransform(t, r);
};
k.transformWithProjections = function(t, e, i) {
  var r = k.getTransformFromProjections(
    e,
    i
  );
  return r(t);
};
k.addCommon = function() {
  k.addEquivalentProjections(xt.PROJECTIONS), k.addEquivalentProjections(ue.PROJECTIONS), k.addEquivalentTransforms(
    ue.PROJECTIONS,
    xt.PROJECTIONS,
    xt.fromEPSG4326,
    xt.toEPSG4326
  );
};
k.addCommon();
var A = {};
A.tmp_ = new Array(6);
A.create = function() {
  return [1, 0, 0, 1, 0, 0];
};
A.reset = function(t) {
  return A.set(t, 1, 0, 0, 1, 0, 0);
};
A.multiply = function(t, e) {
  var i = t[0], r = t[1], n = t[2], a = t[3], o = t[4], s = t[5], l = e[0], h = e[1], u = e[2], f = e[3], c = e[4], d = e[5];
  return t[0] = i * l + n * h, t[1] = r * l + a * h, t[2] = i * u + n * f, t[3] = r * u + a * f, t[4] = i * c + n * d + o, t[5] = r * c + a * d + s, t;
};
A.set = function(t, e, i, r, n, a, o) {
  return t[0] = e, t[1] = i, t[2] = r, t[3] = n, t[4] = a, t[5] = o, t;
};
A.setFromArray = function(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
};
A.apply = function(t, e) {
  var i = e[0], r = e[1];
  return e[0] = t[0] * i + t[2] * r + t[4], e[1] = t[1] * i + t[3] * r + t[5], e;
};
A.rotate = function(t, e) {
  var i = Math.cos(e), r = Math.sin(e);
  return A.multiply(
    t,
    A.set(A.tmp_, i, r, -r, i, 0, 0)
  );
};
A.scale = function(t, e, i) {
  return A.multiply(
    t,
    A.set(A.tmp_, e, 0, 0, i, 0, 0)
  );
};
A.translate = function(t, e, i) {
  return A.multiply(
    t,
    A.set(A.tmp_, 1, 0, 0, 1, e, i)
  );
};
A.compose = function(t, e, i, r, n, a, o, s) {
  var l = Math.sin(a), h = Math.cos(a);
  return t[0] = r * h, t[1] = n * l, t[2] = -r * l, t[3] = n * h, t[4] = o * r * h - s * r * l + e, t[5] = o * n * l + s * n * h + i, t;
};
A.invert = function(t) {
  var e = A.determinant(t);
  Pt.assert(e !== 0, 32);
  var i = t[0], r = t[1], n = t[2], a = t[3], o = t[4], s = t[5];
  return t[0] = a / e, t[1] = -r / e, t[2] = -n / e, t[3] = i / e, t[4] = (n * s - a * o) / e, t[5] = -(i * s - r * o) / e, t;
};
A.determinant = function(t) {
  return t[0] * t[3] - t[1] * t[2];
};
var Te = function() {
  rt.call(this), this.extent_ = g.createEmpty(), this.extentRevision_ = -1, this.simplifiedGeometryCache = {}, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.tmpTransform_ = A.create();
};
_.inherits(Te, rt);
Te.prototype.clone = function() {
};
Te.prototype.closestPointXY = function(t, e, i, r) {
};
Te.prototype.getClosestPoint = function(t, e) {
  var i = e || [NaN, NaN];
  return this.closestPointXY(t[0], t[1], i, 1 / 0), i;
};
Te.prototype.intersectsCoordinate = function(t) {
  return this.containsXY(t[0], t[1]);
};
Te.prototype.computeExtent = function(t) {
};
Te.prototype.containsXY = se.FALSE;
Te.prototype.getExtent = function(t) {
  return this.extentRevision_ != this.getRevision() && (this.extent_ = this.computeExtent(this.extent_), this.extentRevision_ = this.getRevision()), g.returnOrUpdate(this.extent_, t);
};
Te.prototype.rotate = function(t, e) {
};
Te.prototype.scale = function(t, e, i) {
};
Te.prototype.simplify = function(t) {
  return this.getSimplifiedGeometry(t * t);
};
Te.prototype.getSimplifiedGeometry = function(t) {
};
Te.prototype.getType = function() {
};
Te.prototype.applyTransform = function(t) {
};
Te.prototype.intersectsExtent = function(t) {
};
Te.prototype.translate = function(t, e) {
};
Te.prototype.transform = function(t, e) {
  var i = this.tmpTransform_;
  t = k.get(t);
  var r = t.getUnits() == de.TILE_PIXELS ? function(n, a, o) {
    var s = t.getExtent(), l = t.getWorldExtent(), h = g.getHeight(l) / g.getHeight(s);
    return A.compose(
      i,
      l[0],
      l[3],
      h,
      -h,
      0,
      0,
      0
    ), re.transform2D(
      n,
      0,
      n.length,
      o,
      i,
      a
    ), k.getTransform(t, e)(n, a, o);
  } : k.getTransform(t, e);
  return this.applyTransform(r), this;
};
var Ct = function() {
  Te.call(this), this.layout = Ue.XY, this.stride = 2, this.flatCoordinates = null;
};
_.inherits(Ct, Te);
Ct.getLayoutForStride_ = function(t) {
  var e;
  return t == 2 ? e = Ue.XY : t == 3 ? e = Ue.XYZ : t == 4 && (e = Ue.XYZM), /** @type {ol.geom.GeometryLayout} */
  e;
};
Ct.getStrideForLayout = function(t) {
  var e;
  return t == Ue.XY ? e = 2 : t == Ue.XYZ || t == Ue.XYM ? e = 3 : t == Ue.XYZM && (e = 4), /** @type {number} */
  e;
};
Ct.prototype.containsXY = se.FALSE;
Ct.prototype.computeExtent = function(t) {
  return g.createOrUpdateFromFlatCoordinates(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride,
    t
  );
};
Ct.prototype.getCoordinates = function() {
};
Ct.prototype.getFirstCoordinate = function() {
  return this.flatCoordinates.slice(0, this.stride);
};
Ct.prototype.getFlatCoordinates = function() {
  return this.flatCoordinates;
};
Ct.prototype.getLastCoordinate = function() {
  return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
};
Ct.prototype.getLayout = function() {
  return this.layout;
};
Ct.prototype.getSimplifiedGeometry = function(t) {
  if (this.simplifiedGeometryRevision != this.getRevision() && (ut.clear(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
    return this;
  var e = t.toString();
  if (this.simplifiedGeometryCache.hasOwnProperty(e))
    return this.simplifiedGeometryCache[e];
  var i = this.getSimplifiedGeometryInternal(t), r = i.getFlatCoordinates();
  return r.length < this.flatCoordinates.length ? (this.simplifiedGeometryCache[e] = i, i) : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
};
Ct.prototype.getSimplifiedGeometryInternal = function(t) {
  return this;
};
Ct.prototype.getStride = function() {
  return this.stride;
};
Ct.prototype.setFlatCoordinatesInternal = function(t, e) {
  this.stride = Ct.getStrideForLayout(t), this.layout = t, this.flatCoordinates = e;
};
Ct.prototype.setCoordinates = function(t, e) {
};
Ct.prototype.setLayout = function(t, e, i) {
  var r;
  if (t)
    r = Ct.getStrideForLayout(t);
  else {
    var n;
    for (n = 0; n < i; ++n)
      if (e.length === 0) {
        this.layout = Ue.XY, this.stride = 2;
        return;
      } else
        e = /** @type {Array} */
        e[0];
    r = e.length, t = Ct.getLayoutForStride_(r);
  }
  this.layout = t, this.stride = r;
};
Ct.prototype.applyTransform = function(t) {
  this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
};
Ct.prototype.rotate = function(t, e) {
  var i = this.getFlatCoordinates();
  if (i) {
    var r = this.getStride();
    re.rotate(
      i,
      0,
      i.length,
      r,
      t,
      e,
      i
    ), this.changed();
  }
};
Ct.prototype.scale = function(t, e, i) {
  var r = e;
  r === void 0 && (r = t);
  var n = i;
  n || (n = g.getCenter(this.getExtent()));
  var a = this.getFlatCoordinates();
  if (a) {
    var o = this.getStride();
    re.scale(
      a,
      0,
      a.length,
      o,
      t,
      r,
      n,
      a
    ), this.changed();
  }
};
Ct.prototype.translate = function(t, e) {
  var i = this.getFlatCoordinates();
  if (i) {
    var r = this.getStride();
    re.translate(
      i,
      0,
      i.length,
      r,
      t,
      e,
      i
    ), this.changed();
  }
};
Ct.transform2D = function(t, e, i) {
  var r = t.getFlatCoordinates();
  if (r) {
    var n = t.getStride();
    return re.transform2D(
      r,
      0,
      r.length,
      n,
      e,
      i
    );
  } else
    return null;
};
var lr = {};
lr.linearRing = function(t, e, i, r) {
  for (var n = 0, a = t[i - r], o = t[i - r + 1]; e < i; e += r) {
    var s = t[e], l = t[e + 1];
    n += o * s - a * l, a = s, o = l;
  }
  return n / 2;
};
lr.linearRings = function(t, e, i, r) {
  var n = 0, a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    n += lr.linearRing(t, e, s, r), e = s;
  }
  return n;
};
lr.linearRingss = function(t, e, i, r) {
  var n = 0, a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    n += lr.linearRings(t, e, s, r), e = s[s.length - 1];
  }
  return n;
};
var Be = {};
Be.point = function(t, e, i, r, n, a, o) {
  var s = t[e], l = t[e + 1], h = t[i] - s, u = t[i + 1] - l, f, c;
  if (h === 0 && u === 0)
    c = e;
  else {
    var d = ((n - s) * h + (a - l) * u) / (h * h + u * u);
    if (d > 1)
      c = i;
    else if (d > 0) {
      for (f = 0; f < r; ++f)
        o[f] = Z.lerp(
          t[e + f],
          t[i + f],
          d
        );
      o.length = r;
      return;
    } else
      c = e;
  }
  for (f = 0; f < r; ++f)
    o[f] = t[c + f];
  o.length = r;
};
Be.getMaxSquaredDelta = function(t, e, i, r, n) {
  var a = t[e], o = t[e + 1];
  for (e += r; e < i; e += r) {
    var s = t[e], l = t[e + 1], h = Z.squaredDistance(a, o, s, l);
    h > n && (n = h), a = s, o = l;
  }
  return n;
};
Be.getsMaxSquaredDelta = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    n = Be.getMaxSquaredDelta(
      t,
      e,
      s,
      r,
      n
    ), e = s;
  }
  return n;
};
Be.getssMaxSquaredDelta = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    n = Be.getsMaxSquaredDelta(
      t,
      e,
      s,
      r,
      n
    ), e = s[s.length - 1];
  }
  return n;
};
Be.getClosestPoint = function(t, e, i, r, n, a, o, s, l, h, u) {
  if (e == i)
    return h;
  var f, c;
  if (n === 0)
    if (c = Z.squaredDistance(
      o,
      s,
      t[e],
      t[e + 1]
    ), c < h) {
      for (f = 0; f < r; ++f)
        l[f] = t[e + f];
      return l.length = r, c;
    } else
      return h;
  for (var d = u || [NaN, NaN], v = e + r; v < i; )
    if (Be.point(
      t,
      v - r,
      v,
      r,
      o,
      s,
      d
    ), c = Z.squaredDistance(o, s, d[0], d[1]), c < h) {
      for (h = c, f = 0; f < r; ++f)
        l[f] = d[f];
      l.length = r, v += r;
    } else
      v += r * Math.max(
        (Math.sqrt(c) - Math.sqrt(h)) / n | 0,
        1
      );
  if (a && (Be.point(
    t,
    i - r,
    e,
    r,
    o,
    s,
    d
  ), c = Z.squaredDistance(o, s, d[0], d[1]), c < h)) {
    for (h = c, f = 0; f < r; ++f)
      l[f] = d[f];
    l.length = r;
  }
  return h;
};
Be.getsClosestPoint = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f = u || [NaN, NaN], c, d;
  for (c = 0, d = i.length; c < d; ++c) {
    var v = i[c];
    h = Be.getClosestPoint(
      t,
      e,
      v,
      r,
      n,
      a,
      o,
      s,
      l,
      h,
      f
    ), e = v;
  }
  return h;
};
Be.getssClosestPoint = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f = u || [NaN, NaN], c, d;
  for (c = 0, d = i.length; c < d; ++c) {
    var v = i[c];
    h = Be.getsClosestPoint(
      t,
      e,
      v,
      r,
      n,
      a,
      o,
      s,
      l,
      h,
      f
    ), e = v[v.length - 1];
  }
  return h;
};
var Ji = {};
Ji.coordinate = function(t, e, i, r) {
  var n, a;
  for (n = 0, a = i.length; n < a; ++n)
    t[e++] = i[n];
  return e;
};
Ji.coordinates = function(t, e, i, r) {
  var n, a;
  for (n = 0, a = i.length; n < a; ++n) {
    var o = i[n], s;
    for (s = 0; s < r; ++s)
      t[e++] = o[s];
  }
  return e;
};
Ji.coordinatess = function(t, e, i, r, n) {
  var a = n || [], o = 0, s, l;
  for (s = 0, l = i.length; s < l; ++s) {
    var h = Ji.coordinates(
      t,
      e,
      i[s],
      r
    );
    a[o++] = h, e = h;
  }
  return a.length = o, a;
};
Ji.coordinatesss = function(t, e, i, r, n) {
  var a = n || [], o = 0, s, l;
  for (s = 0, l = i.length; s < l; ++s) {
    var h = Ji.coordinatess(
      t,
      e,
      i[s],
      r,
      a[o]
    );
    a[o++] = h, e = h[h.length - 1];
  }
  return a.length = o, a;
};
var Mi = {};
Mi.coordinates = function(t, e, i, r, n) {
  var a = n !== void 0 ? n : [], o = 0, s;
  for (s = e; s < i; s += r)
    a[o++] = t.slice(s, s + r);
  return a.length = o, a;
};
Mi.coordinatess = function(t, e, i, r, n) {
  var a = n !== void 0 ? n : [], o = 0, s, l;
  for (s = 0, l = i.length; s < l; ++s) {
    var h = i[s];
    a[o++] = Mi.coordinates(
      t,
      e,
      h,
      r,
      a[o]
    ), e = h;
  }
  return a.length = o, a;
};
Mi.coordinatesss = function(t, e, i, r, n) {
  var a = n !== void 0 ? n : [], o = 0, s, l;
  for (s = 0, l = i.length; s < l; ++s) {
    var h = i[s];
    a[o++] = Mi.coordinatess(
      t,
      e,
      h,
      r,
      a[o]
    ), e = h[h.length - 1];
  }
  return a.length = o, a;
};
var Kt = {};
Kt.lineString = function(t, e, i, r, n, a, o) {
  var s = o !== void 0 ? o : [];
  return a || (i = Kt.radialDistance(
    t,
    e,
    i,
    r,
    n,
    s,
    0
  ), t = s, e = 0, r = 2), s.length = Kt.douglasPeucker(
    t,
    e,
    i,
    r,
    n,
    s,
    0
  ), s;
};
Kt.douglasPeucker = function(t, e, i, r, n, a, o) {
  var s = (i - e) / r;
  if (s < 3) {
    for (; e < i; e += r)
      a[o++] = t[e], a[o++] = t[e + 1];
    return o;
  }
  var l = new Array(s);
  l[0] = 1, l[s - 1] = 1;
  for (var h = [e, i - r], u = 0, f; h.length > 0; ) {
    var c = h.pop(), d = h.pop(), v = 0, m = t[d], p = t[d + 1], E = t[c], y = t[c + 1];
    for (f = d + r; f < c; f += r) {
      var R = t[f], I = t[f + 1], x = Z.squaredSegmentDistance(
        R,
        I,
        m,
        p,
        E,
        y
      );
      x > v && (u = f, v = x);
    }
    v > n && (l[(u - e) / r] = 1, d + r < u && h.push(d, u), u + r < c && h.push(u, c));
  }
  for (f = 0; f < s; ++f)
    l[f] && (a[o++] = t[e + f * r], a[o++] = t[e + f * r + 1]);
  return o;
};
Kt.douglasPeuckers = function(t, e, i, r, n, a, o, s) {
  var l, h;
  for (l = 0, h = i.length; l < h; ++l) {
    var u = i[l];
    o = Kt.douglasPeucker(
      t,
      e,
      u,
      r,
      n,
      a,
      o
    ), s.push(o), e = u;
  }
  return o;
};
Kt.douglasPeuckerss = function(t, e, i, r, n, a, o, s) {
  var l, h;
  for (l = 0, h = i.length; l < h; ++l) {
    var u = i[l], f = [];
    o = Kt.douglasPeuckers(
      t,
      e,
      u,
      r,
      n,
      a,
      o,
      f
    ), s.push(f), e = u[u.length - 1];
  }
  return o;
};
Kt.radialDistance = function(t, e, i, r, n, a, o) {
  if (i <= e + r) {
    for (; e < i; e += r)
      a[o++] = t[e], a[o++] = t[e + 1];
    return o;
  }
  var s = t[e], l = t[e + 1];
  a[o++] = s, a[o++] = l;
  var h = s, u = l;
  for (e += r; e < i; e += r)
    h = t[e], u = t[e + 1], Z.squaredDistance(s, l, h, u) > n && (a[o++] = h, a[o++] = u, s = h, l = u);
  return (h != s || u != l) && (a[o++] = h, a[o++] = u), o;
};
Kt.snap = function(t, e) {
  return e * Math.round(t / e);
};
Kt.quantize = function(t, e, i, r, n, a, o) {
  if (e == i)
    return o;
  var s = Kt.snap(t[e], n), l = Kt.snap(t[e + 1], n);
  e += r, a[o++] = s, a[o++] = l;
  var h, u;
  do
    if (h = Kt.snap(t[e], n), u = Kt.snap(t[e + 1], n), e += r, e == i)
      return a[o++] = h, a[o++] = u, o;
  while (h == s && u == l);
  for (; e < i; ) {
    var f, c;
    if (f = Kt.snap(t[e], n), c = Kt.snap(t[e + 1], n), e += r, !(f == h && c == u)) {
      var d = h - s, v = u - l, m = f - s, p = c - l;
      if (d * p == v * m && (d < 0 && m < d || d == m || d > 0 && m > d) && (v < 0 && p < v || v == p || v > 0 && p > v)) {
        h = f, u = c;
        continue;
      }
      a[o++] = h, a[o++] = u, s = h, l = u, h = f, u = c;
    }
  }
  return a[o++] = h, a[o++] = u, o;
};
Kt.quantizes = function(t, e, i, r, n, a, o, s) {
  var l, h;
  for (l = 0, h = i.length; l < h; ++l) {
    var u = i[l];
    o = Kt.quantize(
      t,
      e,
      u,
      r,
      n,
      a,
      o
    ), s.push(o), e = u;
  }
  return o;
};
Kt.quantizess = function(t, e, i, r, n, a, o, s) {
  var l, h;
  for (l = 0, h = i.length; l < h; ++l) {
    var u = i[l], f = [];
    o = Kt.quantizes(
      t,
      e,
      u,
      r,
      n,
      a,
      o,
      f
    ), s.push(f), e = u[u.length - 1];
  }
  return o;
};
var ii = function(t, e) {
  Ct.call(this), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.setCoordinates(t, e);
};
_.inherits(ii, Ct);
ii.prototype.clone = function() {
  var t = new ii(null);
  return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t;
};
ii.prototype.closestPointXY = function(t, e, i, r) {
  return r < g.closestSquaredDistanceXY(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Be.getMaxSquaredDelta(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride,
    0
  )), this.maxDeltaRevision_ = this.getRevision()), Be.getClosestPoint(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride,
    this.maxDelta_,
    !0,
    t,
    e,
    i,
    r
  ));
};
ii.prototype.getArea = function() {
  return lr.linearRing(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride
  );
};
ii.prototype.getCoordinates = function() {
  return Mi.coordinates(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride
  );
};
ii.prototype.getSimplifiedGeometryInternal = function(t) {
  var e = [];
  e.length = Kt.douglasPeucker(
    this.flatCoordinates,
    0,
    this.flatCoordinates.length,
    this.stride,
    t,
    e,
    0
  );
  var i = new ii(null);
  return i.setFlatCoordinates(
    Ue.XY,
    e
  ), i;
};
ii.prototype.getType = function() {
  return j.LINEAR_RING;
};
ii.prototype.intersectsExtent = function(t) {
};
ii.prototype.setCoordinates = function(t, e) {
  t ? (this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ji.coordinates(
    this.flatCoordinates,
    0,
    t,
    this.stride
  ), this.changed()) : this.setFlatCoordinates(Ue.XY, null);
};
ii.prototype.setFlatCoordinates = function(t, e) {
  this.setFlatCoordinatesInternal(t, e), this.changed();
};
var Ii = function(t, e) {
  Ct.call(this), this.setCoordinates(t, e);
};
_.inherits(Ii, Ct);
Ii.prototype.clone = function() {
  var t = new Ii(null);
  return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t;
};
Ii.prototype.closestPointXY = function(t, e, i, r) {
  var n = this.flatCoordinates, a = Z.squaredDistance(
    t,
    e,
    n[0],
    n[1]
  );
  if (a < r) {
    var o = this.stride, s;
    for (s = 0; s < o; ++s)
      i[s] = n[s];
    return i.length = o, a;
  } else
    return r;
};
Ii.prototype.getCoordinates = function() {
  return this.flatCoordinates ? this.flatCoordinates.slice() : [];
};
Ii.prototype.computeExtent = function(t) {
  return g.createOrUpdateFromCoordinate(this.flatCoordinates, t);
};
Ii.prototype.getType = function() {
  return j.POINT;
};
Ii.prototype.intersectsExtent = function(t) {
  return g.containsXY(
    t,
    this.flatCoordinates[0],
    this.flatCoordinates[1]
  );
};
Ii.prototype.setCoordinates = function(t, e) {
  t ? (this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ji.coordinate(
    this.flatCoordinates,
    0,
    t,
    this.stride
  ), this.changed()) : this.setFlatCoordinates(Ue.XY, null);
};
Ii.prototype.setFlatCoordinates = function(t, e) {
  this.setFlatCoordinatesInternal(t, e), this.changed();
};
var Ye = {};
Ye.linearRingContainsExtent = function(t, e, i, r, n) {
  var a = g.forEachCorner(
    n,
    /**
     * @param {ol.Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !Ye.linearRingContainsXY(
        t,
        e,
        i,
        r,
        o[0],
        o[1]
      );
    }
  );
  return !a;
};
Ye.linearRingContainsXY = function(t, e, i, r, n, a) {
  for (var o = 0, s = t[i - r], l = t[i - r + 1]; e < i; e += r) {
    var h = t[e], u = t[e + 1];
    l <= a ? u > a && (h - s) * (a - l) - (n - s) * (u - l) > 0 && o++ : u <= a && (h - s) * (a - l) - (n - s) * (u - l) < 0 && o--, s = h, l = u;
  }
  return o !== 0;
};
Ye.linearRingsContainsXY = function(t, e, i, r, n, a) {
  if (i.length === 0 || !Ye.linearRingContainsXY(
    t,
    e,
    i[0],
    r,
    n,
    a
  ))
    return !1;
  var o, s;
  for (o = 1, s = i.length; o < s; ++o)
    if (Ye.linearRingContainsXY(
      t,
      i[o - 1],
      i[o],
      r,
      n,
      a
    ))
      return !1;
  return !0;
};
Ye.linearRingssContainsXY = function(t, e, i, r, n, a) {
  if (i.length === 0)
    return !1;
  var o, s;
  for (o = 0, s = i.length; o < s; ++o) {
    var l = i[o];
    if (Ye.linearRingsContainsXY(
      t,
      e,
      l,
      r,
      n,
      a
    ))
      return !0;
    e = l[l.length - 1];
  }
  return !1;
};
var yn = {};
yn.linearRings = function(t, e, i, r, n, a, o) {
  for (var s, l, h, u, f, c, d, v = n[a + 1], m = [], p = 0, E = i.length; p < E; ++p) {
    var y = i[p];
    for (u = t[y - r], c = t[y - r + 1], s = e; s < y; s += r)
      f = t[s], d = t[s + 1], (v <= c && d <= v || c <= v && v <= d) && (h = (v - c) / (d - c) * (f - u) + u, m.push(h)), u = f, c = d;
  }
  var R = NaN, I = -1 / 0;
  for (m.sort(st.numberSafeCompareFunction), u = m[0], s = 1, l = m.length; s < l; ++s) {
    f = m[s];
    var x = Math.abs(f - u);
    x > I && (h = (u + f) / 2, Ye.linearRingsContainsXY(
      t,
      e,
      i,
      r,
      h,
      v
    ) && (R = h, I = x)), u = f;
  }
  return isNaN(R) && (R = n[a]), o ? (o.push(R, v, I), o) : [R, v, I];
};
yn.linearRingss = function(t, e, i, r, n) {
  var a = [], o, s;
  for (o = 0, s = i.length; o < s; ++o) {
    var l = i[o];
    a = yn.linearRings(
      t,
      e,
      l,
      r,
      n,
      2 * o,
      a
    ), e = l[l.length - 1];
  }
  return a;
};
var ya = {};
ya.forEach = function(t, e, i, r, n, a) {
  for (var o = [t[e], t[e + 1]], s = [], l; e + r < i; e += r) {
    if (s[0] = t[e + r], s[1] = t[e + r + 1], l = n.call(a, o, s), l)
      return l;
    o[0] = s[0], o[1] = s[1];
  }
  return !1;
};
var Ni = {};
Ni.lineString = function(t, e, i, r, n) {
  var a = g.extendFlatCoordinates(
    g.createEmpty(),
    t,
    e,
    i,
    r
  );
  return g.intersects(n, a) ? g.containsExtent(n, a) || a[0] >= n[0] && a[2] <= n[2] || a[1] >= n[1] && a[3] <= n[3] ? !0 : ya.forEach(
    t,
    e,
    i,
    r,
    /**
     * @param {ol.Coordinate} point1 Start point.
     * @param {ol.Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, s) {
      return g.intersectsSegment(n, o, s);
    }
  ) : !1;
};
Ni.lineStrings = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    if (Ni.lineString(
      t,
      e,
      i[a],
      r,
      n
    ))
      return !0;
    e = i[a];
  }
  return !1;
};
Ni.linearRing = function(t, e, i, r, n) {
  return !!(Ni.lineString(
    t,
    e,
    i,
    r,
    n
  ) || Ye.linearRingContainsXY(
    t,
    e,
    i,
    r,
    n[0],
    n[1]
  ) || Ye.linearRingContainsXY(
    t,
    e,
    i,
    r,
    n[0],
    n[3]
  ) || Ye.linearRingContainsXY(
    t,
    e,
    i,
    r,
    n[2],
    n[1]
  ) || Ye.linearRingContainsXY(
    t,
    e,
    i,
    r,
    n[2],
    n[3]
  ));
};
Ni.linearRings = function(t, e, i, r, n) {
  if (!Ni.linearRing(
    t,
    e,
    i[0],
    r,
    n
  ))
    return !1;
  if (i.length === 1)
    return !0;
  var a, o;
  for (a = 1, o = i.length; a < o; ++a)
    if (Ye.linearRingContainsExtent(
      t,
      i[a - 1],
      i[a],
      r,
      n
    ))
      return !1;
  return !0;
};
Ni.linearRingss = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    if (Ni.linearRings(
      t,
      e,
      s,
      r,
      n
    ))
      return !0;
    e = s[s.length - 1];
  }
  return !1;
};
var ma = {};
ma.coordinates = function(t, e, i, r) {
  for (; e < i - r; ) {
    var n;
    for (n = 0; n < r; ++n) {
      var a = t[e + n];
      t[e + n] = t[i - r + n], t[i - r + n] = a;
    }
    e += r, i -= r;
  }
};
var He = {};
He.linearRingIsClockwise = function(t, e, i, r) {
  for (var n = 0, a = t[i - r], o = t[i - r + 1]; e < i; e += r) {
    var s = t[e], l = t[e + 1];
    n += (s - a) * (l + o), a = s, o = l;
  }
  return n > 0;
};
He.linearRingsAreOriented = function(t, e, i, r, n) {
  var a = n !== void 0 ? n : !1, o, s;
  for (o = 0, s = i.length; o < s; ++o) {
    var l = i[o], h = He.linearRingIsClockwise(
      t,
      e,
      l,
      r
    );
    if (o === 0) {
      if (a && h || !a && !h)
        return !1;
    } else if (a && !h || !a && h)
      return !1;
    e = l;
  }
  return !0;
};
He.linearRingssAreOriented = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a)
    if (!He.linearRingsAreOriented(
      t,
      e,
      i[a],
      r,
      n
    ))
      return !1;
  return !0;
};
He.orientLinearRings = function(t, e, i, r, n) {
  var a = n !== void 0 ? n : !1, o, s;
  for (o = 0, s = i.length; o < s; ++o) {
    var l = i[o], h = He.linearRingIsClockwise(
      t,
      e,
      l,
      r
    ), u = o === 0 ? a && h || !a && !h : a && !h || !a && h;
    u && ma.coordinates(t, e, l, r), e = l;
  }
  return e;
};
He.orientLinearRingss = function(t, e, i, r, n) {
  var a, o;
  for (a = 0, o = i.length; a < o; ++a)
    e = He.orientLinearRings(
      t,
      e,
      i[a],
      r,
      n
    );
  return e;
};
var It = function(t, e) {
  Ct.call(this), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, this.setCoordinates(t, e);
};
_.inherits(It, Ct);
It.prototype.appendLinearRing = function(t) {
  this.flatCoordinates ? st.extend(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
};
It.prototype.clone = function() {
  var t = new It(null);
  return t.setFlatCoordinates(
    this.layout,
    this.flatCoordinates.slice(),
    this.ends_.slice()
  ), t;
};
It.prototype.closestPointXY = function(t, e, i, r) {
  return r < g.closestSquaredDistanceXY(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Be.getsMaxSquaredDelta(
    this.flatCoordinates,
    0,
    this.ends_,
    this.stride,
    0
  )), this.maxDeltaRevision_ = this.getRevision()), Be.getsClosestPoint(
    this.flatCoordinates,
    0,
    this.ends_,
    this.stride,
    this.maxDelta_,
    !0,
    t,
    e,
    i,
    r
  ));
};
It.prototype.containsXY = function(t, e) {
  return Ye.linearRingsContainsXY(
    this.getOrientedFlatCoordinates(),
    0,
    this.ends_,
    this.stride,
    t,
    e
  );
};
It.prototype.getArea = function() {
  return lr.linearRings(
    this.getOrientedFlatCoordinates(),
    0,
    this.ends_,
    this.stride
  );
};
It.prototype.getCoordinates = function(t) {
  var e;
  return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), He.orientLinearRings(
    e,
    0,
    this.ends_,
    this.stride,
    t
  )) : e = this.flatCoordinates, Mi.coordinatess(
    e,
    0,
    this.ends_,
    this.stride
  );
};
It.prototype.getEnds = function() {
  return this.ends_;
};
It.prototype.getFlatInteriorPoint = function() {
  if (this.flatInteriorPointRevision_ != this.getRevision()) {
    var t = g.getCenter(this.getExtent());
    this.flatInteriorPoint_ = yn.linearRings(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      0
    ), this.flatInteriorPointRevision_ = this.getRevision();
  }
  return this.flatInteriorPoint_;
};
It.prototype.getInteriorPoint = function() {
  return new Ii(this.getFlatInteriorPoint(), Ue.XYM);
};
It.prototype.getLinearRingCount = function() {
  return this.ends_.length;
};
It.prototype.getLinearRing = function(t) {
  if (t < 0 || this.ends_.length <= t)
    return null;
  var e = new ii(null);
  return e.setFlatCoordinates(this.layout, this.flatCoordinates.slice(
    t === 0 ? 0 : this.ends_[t - 1],
    this.ends_[t]
  )), e;
};
It.prototype.getLinearRings = function() {
  var t = this.layout, e = this.flatCoordinates, i = this.ends_, r = [], n = 0, a, o;
  for (a = 0, o = i.length; a < o; ++a) {
    var s = i[a], l = new ii(null);
    l.setFlatCoordinates(t, e.slice(n, s)), r.push(l), n = s;
  }
  return r;
};
It.prototype.getOrientedFlatCoordinates = function() {
  if (this.orientedRevision_ != this.getRevision()) {
    var t = this.flatCoordinates;
    He.linearRingsAreOriented(
      t,
      0,
      this.ends_,
      this.stride
    ) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = He.orientLinearRings(
      this.orientedFlatCoordinates_,
      0,
      this.ends_,
      this.stride
    )), this.orientedRevision_ = this.getRevision();
  }
  return this.orientedFlatCoordinates_;
};
It.prototype.getSimplifiedGeometryInternal = function(t) {
  var e = [], i = [];
  e.length = Kt.quantizes(
    this.flatCoordinates,
    0,
    this.ends_,
    this.stride,
    Math.sqrt(t),
    e,
    0,
    i
  );
  var r = new It(null);
  return r.setFlatCoordinates(
    Ue.XY,
    e,
    i
  ), r;
};
It.prototype.getType = function() {
  return j.POLYGON;
};
It.prototype.intersectsExtent = function(t) {
  return Ni.linearRings(
    this.getOrientedFlatCoordinates(),
    0,
    this.ends_,
    this.stride,
    t
  );
};
It.prototype.setCoordinates = function(t, e) {
  if (!t)
    this.setFlatCoordinates(Ue.XY, null, this.ends_);
  else {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    var i = Ji.coordinatess(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1], this.changed();
  }
};
It.prototype.setFlatCoordinates = function(t, e, i) {
  this.setFlatCoordinatesInternal(t, e), this.ends_ = i, this.changed();
};
It.circular = function(t, e, i, r) {
  var n = r || 32, a = [], o;
  for (o = 0; o < n; ++o)
    st.extend(
      a,
      t.offset(e, i, 2 * Math.PI * o / n)
    );
  a.push(a[0], a[1]);
  var s = new It(null);
  return s.setFlatCoordinates(
    Ue.XY,
    a,
    [a.length]
  ), s;
};
It.fromExtent = function(t) {
  var e = t[0], i = t[1], r = t[2], n = t[3], a = [e, i, e, n, r, n, r, i, e, i], o = new It(null);
  return o.setFlatCoordinates(
    Ue.XY,
    a,
    [a.length]
  ), o;
};
It.fromCircle = function(t, e, i) {
  for (var r = e || 32, n = t.getStride(), a = t.getLayout(), o = new It(null, a), s = n * (r + 1), l = new Array(s), h = 0; h < s; h++)
    l[h] = 0;
  var u = [l.length];
  return o.setFlatCoordinates(a, l, u), It.makeRegular(
    o,
    t.getCenter(),
    t.getRadius(),
    i
  ), o;
};
It.makeRegular = function(t, e, i, r) {
  for (var n = t.getFlatCoordinates(), a = t.getLayout(), o = t.getStride(), s = t.getEnds(), l = n.length / o - 1, h = r || 0, u, f, c = 0; c <= l; ++c)
    f = c * o, u = h + Z.modulo(c, l) * 2 * Math.PI / l, n[f] = e[0] + i * Math.cos(u), n[f + 1] = e[1] + i * Math.sin(u);
  t.setFlatCoordinates(a, n, s);
};
var Q = function(t) {
  rt.call(this);
  var e = ut.assign({}, t);
  this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.updateAnimations_ = this.updateAnimations_.bind(this), this.projection_ = k.createProjection(e.projection, "EPSG:3857"), this.applyOptions_(e);
};
_.inherits(Q, rt);
Q.prototype.applyOptions_ = function(t) {
  var e = {};
  e[Ge.CENTER] = t.center !== void 0 ? t.center : null;
  var i = Q.createResolutionConstraint_(
    t
  );
  this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = t.resolutions, this.minZoom_ = i.minZoom;
  var r = Q.createCenterConstraint_(t), n = i.constraint, a = Q.createRotationConstraint_(t);
  this.constraints_ = {
    center: r,
    resolution: n,
    rotation: a
  }, t.resolution !== void 0 ? e[Ge.RESOLUTION] = t.resolution : t.zoom !== void 0 && (e[Ge.RESOLUTION] = this.constrainResolution(
    this.maxResolution_,
    t.zoom - this.minZoom_
  ), this.resolutions_ && (e[Ge.RESOLUTION] = Z.clamp(
    Number(this.getResolution() || e[Ge.RESOLUTION]),
    this.minResolution_,
    this.maxResolution_
  ))), e[Ge.ROTATION] = t.rotation !== void 0 ? t.rotation : 0, this.setProperties(e), this.options_ = t;
};
Q.prototype.getUpdatedOptions_ = function(t) {
  var e = ut.assign({}, this.options_);
  return e.resolution !== void 0 ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenter(), e.rotation = this.getRotation(), ut.assign({}, e, t);
};
Q.prototype.animate = function(t) {
  var e = arguments.length, i;
  if (e > 1 && typeof arguments[e - 1] == "function" && (i = arguments[e - 1], --e), !this.isDef()) {
    var r = arguments[e - 1];
    r.center && this.setCenter(r.center), r.zoom !== void 0 && this.setZoom(r.zoom), r.rotation !== void 0 && this.setRotation(r.rotation), i && i(!0);
    return;
  }
  for (var n = Date.now(), a = this.getCenter().slice(), o = this.getResolution(), s = this.getRotation(), l = [], h = 0; h < e; ++h) {
    var u = (
      /** @type {olx.AnimationOptions} */
      arguments[h]
    ), f = (
      /** @type {ol.ViewAnimation} */
      {
        start: n,
        complete: !1,
        anchor: u.anchor,
        duration: u.duration !== void 0 ? u.duration : 1e3,
        easing: u.easing || ce.inAndOut
      }
    );
    if (u.center && (f.sourceCenter = a, f.targetCenter = u.center, a = f.targetCenter), u.zoom !== void 0 ? (f.sourceResolution = o, f.targetResolution = this.constrainResolution(
      this.maxResolution_,
      u.zoom - this.minZoom_,
      0
    ), o = f.targetResolution) : u.resolution && (f.sourceResolution = o, f.targetResolution = u.resolution, o = f.targetResolution), u.rotation !== void 0) {
      f.sourceRotation = s;
      var c = Z.modulo(u.rotation - s + Math.PI, 2 * Math.PI) - Math.PI;
      f.targetRotation = s + c, s = f.targetRotation;
    }
    f.callback = i, Q.isNoopAnimation(f) ? f.complete = !0 : n += f.duration, l.push(f);
  }
  this.animations_.push(l), this.setHint(Dt.ANIMATING, 1), this.updateAnimations_();
};
Q.prototype.getAnimating = function() {
  return this.hints_[Dt.ANIMATING] > 0;
};
Q.prototype.getInteracting = function() {
  return this.hints_[Dt.INTERACTING] > 0;
};
Q.prototype.cancelAnimations = function() {
  this.setHint(Dt.ANIMATING, -this.hints_[Dt.ANIMATING]);
  for (var t = 0, e = this.animations_.length; t < e; ++t) {
    var i = this.animations_[t];
    i[0].callback && i[0].callback(!1);
  }
  this.animations_.length = 0;
};
Q.prototype.updateAnimations_ = function() {
  if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !!this.getAnimating()) {
    for (var t = Date.now(), e = !1, i = this.animations_.length - 1; i >= 0; --i) {
      for (var r = this.animations_[i], n = !0, a = 0, o = r.length; a < o; ++a) {
        var s = r[a];
        if (!s.complete) {
          var l = t - s.start, h = s.duration > 0 ? l / s.duration : 1;
          h >= 1 ? (s.complete = !0, h = 1) : n = !1;
          var u = s.easing(h);
          if (s.sourceCenter) {
            var f = s.sourceCenter[0], c = s.sourceCenter[1], d = s.targetCenter[0], v = s.targetCenter[1], m = f + u * (d - f), p = c + u * (v - c);
            this.set(Ge.CENTER, [m, p]);
          }
          if (s.sourceResolution && s.targetResolution) {
            var E = u === 1 ? s.targetResolution : s.sourceResolution + u * (s.targetResolution - s.sourceResolution);
            s.anchor && this.set(
              Ge.CENTER,
              this.calculateCenterZoom(E, s.anchor)
            ), this.set(Ge.RESOLUTION, E);
          }
          if (s.sourceRotation !== void 0 && s.targetRotation !== void 0) {
            var y = u === 1 ? Z.modulo(s.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : s.sourceRotation + u * (s.targetRotation - s.sourceRotation);
            s.anchor && this.set(
              Ge.CENTER,
              this.calculateCenterRotate(y, s.anchor)
            ), this.set(Ge.ROTATION, y);
          }
          if (e = !0, !s.complete)
            break;
        }
      }
      if (n) {
        this.animations_[i] = null, this.setHint(Dt.ANIMATING, -1);
        var R = r[0].callback;
        R && R(!0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), e && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_));
  }
};
Q.prototype.calculateCenterRotate = function(t, e) {
  var i, r = this.getCenter();
  return r !== void 0 && (i = [r[0] - e[0], r[1] - e[1]], Mt.rotate(i, t - this.getRotation()), Mt.add(i, e)), i;
};
Q.prototype.calculateCenterZoom = function(t, e) {
  var i, r = this.getCenter(), n = this.getResolution();
  if (r !== void 0 && n !== void 0) {
    var a = e[0] - t * (e[0] - r[0]) / n, o = e[1] - t * (e[1] - r[1]) / n;
    i = [a, o];
  }
  return i;
};
Q.prototype.getSizeFromViewport_ = function() {
  var t = [100, 100], e = '.ol-viewport[data-view="' + _.getUid(this) + '"]', i = document.querySelector(e);
  if (i) {
    var r = getComputedStyle(i);
    t[0] = parseInt(r.width, 10), t[1] = parseInt(r.height, 10);
  }
  return t;
};
Q.prototype.constrainCenter = function(t) {
  return this.constraints_.center(t);
};
Q.prototype.constrainResolution = function(t, e, i) {
  var r = e || 0, n = i || 0;
  return this.constraints_.resolution(t, r, n);
};
Q.prototype.constrainRotation = function(t, e) {
  var i = e || 0;
  return this.constraints_.rotation(t, i);
};
Q.prototype.getCenter = function() {
  return (
    /** @type {ol.Coordinate|undefined} */
    this.get(Ge.CENTER)
  );
};
Q.prototype.getConstraints = function() {
  return this.constraints_;
};
Q.prototype.getHints = function(t) {
  return t !== void 0 ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice();
};
Q.prototype.calculateExtent = function(t) {
  var e = t || this.getSizeFromViewport_(), i = (
    /** @type {!ol.Coordinate} */
    this.getCenter()
  );
  Pt.assert(i, 1);
  var r = (
    /** @type {!number} */
    this.getResolution()
  );
  Pt.assert(r !== void 0, 2);
  var n = (
    /** @type {!number} */
    this.getRotation()
  );
  return Pt.assert(n !== void 0, 3), g.getForViewAndSize(i, r, n, e);
};
Q.prototype.getMaxResolution = function() {
  return this.maxResolution_;
};
Q.prototype.getMinResolution = function() {
  return this.minResolution_;
};
Q.prototype.getMaxZoom = function() {
  return (
    /** @type {number} */
    this.getZoomForResolution(this.minResolution_)
  );
};
Q.prototype.setMaxZoom = function(t) {
  this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
};
Q.prototype.getMinZoom = function() {
  return (
    /** @type {number} */
    this.getZoomForResolution(this.maxResolution_)
  );
};
Q.prototype.setMinZoom = function(t) {
  this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
};
Q.prototype.getProjection = function() {
  return this.projection_;
};
Q.prototype.getResolution = function() {
  return (
    /** @type {number|undefined} */
    this.get(Ge.RESOLUTION)
  );
};
Q.prototype.getResolutions = function() {
  return this.resolutions_;
};
Q.prototype.getResolutionForExtent = function(t, e) {
  var i = e || this.getSizeFromViewport_(), r = g.getWidth(t) / i[0], n = g.getHeight(t) / i[1];
  return Math.max(r, n);
};
Q.prototype.getResolutionForValueFunction = function(t) {
  var e = t || 2, i = this.maxResolution_, r = this.minResolution_, n = Math.log(i / r) / Math.log(e);
  return (
    /**
     * @param {number} value Value.
     * @return {number} Resolution.
     */
    function(a) {
      var o = i / Math.pow(e, a * n);
      return o;
    }
  );
};
Q.prototype.getRotation = function() {
  return (
    /** @type {number} */
    this.get(Ge.ROTATION)
  );
};
Q.prototype.getValueForResolutionFunction = function(t) {
  var e = t || 2, i = this.maxResolution_, r = this.minResolution_, n = Math.log(i / r) / Math.log(e);
  return (
    /**
     * @param {number} resolution Resolution.
     * @return {number} Value.
     */
    function(a) {
      var o = Math.log(i / a) / Math.log(e) / n;
      return o;
    }
  );
};
Q.prototype.getState = function() {
  var t = (
    /** @type {ol.Coordinate} */
    this.getCenter()
  ), e = this.getProjection(), i = (
    /** @type {number} */
    this.getResolution()
  ), r = this.getRotation();
  return (
    /** @type {olx.ViewState} */
    {
      center: t.slice(),
      projection: e !== void 0 ? e : null,
      resolution: i,
      rotation: r,
      zoom: this.getZoom()
    }
  );
};
Q.prototype.getZoom = function() {
  var t, e = this.getResolution();
  return e !== void 0 && (t = this.getZoomForResolution(e)), t;
};
Q.prototype.getZoomForResolution = function(t) {
  var e = this.minZoom_ || 0, i, r;
  if (this.resolutions_) {
    var n = st.linearFindNearest(this.resolutions_, t, 1);
    e = n, i = this.resolutions_[n], n == this.resolutions_.length - 1 ? r = 2 : r = i / this.resolutions_[n + 1];
  } else
    i = this.maxResolution_, r = this.zoomFactor_;
  return e + Math.log(i / t) / Math.log(r);
};
Q.prototype.getResolutionForZoom = function(t) {
  return (
    /** @type {number} */
    this.constrainResolution(
      this.maxResolution_,
      t - this.minZoom_,
      0
    )
  );
};
Q.prototype.fit = function(t, e) {
  var i = e || {}, r = i.size;
  r || (r = this.getSizeFromViewport_());
  var n;
  t instanceof Ct ? t.getType() === j.CIRCLE ? (t = t.getExtent(), n = It.fromExtent(t), n.rotate(this.getRotation(), g.getCenter(t))) : n = t : (Pt.assert(
    Array.isArray(t),
    24
  ), Pt.assert(
    !g.isEmpty(t),
    25
  ), n = It.fromExtent(t));
  var a = i.padding !== void 0 ? i.padding : [0, 0, 0, 0], o = i.constrainResolution !== void 0 ? i.constrainResolution : !0, s = i.nearest !== void 0 ? i.nearest : !1, l;
  i.minResolution !== void 0 ? l = i.minResolution : i.maxZoom !== void 0 ? l = this.constrainResolution(
    this.maxResolution_,
    i.maxZoom - this.minZoom_,
    0
  ) : l = 0;
  for (var h = n.getFlatCoordinates(), u = this.getRotation(), f = Math.cos(-u), c = Math.sin(-u), d = 1 / 0, v = 1 / 0, m = -1 / 0, p = -1 / 0, E = n.getStride(), y = 0, R = h.length; y < R; y += E) {
    var I = h[y] * f - h[y + 1] * c, x = h[y] * c + h[y + 1] * f;
    d = Math.min(d, I), v = Math.min(v, x), m = Math.max(m, I), p = Math.max(p, x);
  }
  var C = this.getResolutionForExtent(
    [d, v, m, p],
    [r[0] - a[1] - a[3], r[1] - a[0] - a[2]]
  );
  if (C = isNaN(C) ? l : Math.max(C, l), o) {
    var N = this.constrainResolution(C, 0, 0);
    !s && N < C && (N = this.constrainResolution(
      N,
      -1,
      0
    )), C = N;
  }
  c = -c;
  var w = (d + m) / 2, X = (v + p) / 2;
  w += (a[1] - a[3]) / 2 * C, X += (a[0] - a[2]) / 2 * C;
  var U = w * f - X * c, P = X * f + w * c, O = [U, P], q = i.callback ? i.callback : _.nullFunction;
  i.duration !== void 0 ? this.animate({
    resolution: C,
    center: O,
    duration: i.duration,
    easing: i.easing
  }, q) : (this.setResolution(C), this.setCenter(O), setTimeout(q.bind(void 0, !0), 0));
};
Q.prototype.centerOn = function(t, e, i) {
  var r = this.getRotation(), n = Math.cos(-r), a = Math.sin(-r), o = t[0] * n - t[1] * a, s = t[1] * n + t[0] * a, l = this.getResolution();
  o += (e[0] / 2 - i[0]) * l, s += (i[1] - e[1] / 2) * l, a = -a;
  var h = o * n - s * a, u = s * n + o * a;
  this.setCenter([h, u]);
};
Q.prototype.isDef = function() {
  return !!this.getCenter() && this.getResolution() !== void 0;
};
Q.prototype.rotate = function(t, e) {
  if (e !== void 0) {
    var i = this.calculateCenterRotate(t, e);
    this.setCenter(i);
  }
  this.setRotation(t);
};
Q.prototype.setCenter = function(t) {
  this.set(Ge.CENTER, t), this.getAnimating() && this.cancelAnimations();
};
Q.prototype.setHint = function(t, e) {
  return this.hints_[t] += e, this.changed(), this.hints_[t];
};
Q.prototype.setResolution = function(t) {
  this.set(Ge.RESOLUTION, t), this.getAnimating() && this.cancelAnimations();
};
Q.prototype.setRotation = function(t) {
  this.set(Ge.ROTATION, t), this.getAnimating() && this.cancelAnimations();
};
Q.prototype.setZoom = function(t) {
  this.setResolution(this.getResolutionForZoom(t));
};
Q.createCenterConstraint_ = function(t) {
  return t.extent !== void 0 ? vn.createExtent(t.extent) : vn.none;
};
Q.createResolutionConstraint_ = function(t) {
  var e, i, r, n = 28, a = 2, o = t.minZoom !== void 0 ? t.minZoom : _.DEFAULT_MIN_ZOOM, s = t.maxZoom !== void 0 ? t.maxZoom : n, l = t.zoomFactor !== void 0 ? t.zoomFactor : a;
  if (t.resolutions !== void 0) {
    var h = t.resolutions;
    i = h[o], r = h[s] !== void 0 ? h[s] : h[h.length - 1], e = pn.createSnapToResolutions(
      h
    );
  } else {
    var u = k.createProjection(t.projection, "EPSG:3857"), f = u.getExtent(), c = f ? Math.max(g.getWidth(f), g.getHeight(f)) : (
      // use an extent that can fit the whole world if need be
      360 * k.METERS_PER_UNIT[de.DEGREES] / u.getMetersPerUnit()
    ), d = c / _.DEFAULT_TILE_SIZE / Math.pow(
      a,
      _.DEFAULT_MIN_ZOOM
    ), v = d / Math.pow(
      a,
      n - _.DEFAULT_MIN_ZOOM
    );
    i = t.maxResolution, i !== void 0 ? o = 0 : i = d / Math.pow(l, o), r = t.minResolution, r === void 0 && (t.maxZoom !== void 0 ? t.maxResolution !== void 0 ? r = i / Math.pow(l, s) : r = d / Math.pow(l, s) : r = v), s = o + Math.floor(
      Math.log(i / r) / Math.log(l)
    ), r = i / Math.pow(l, s - o), e = pn.createSnapToPower(
      l,
      i,
      s - o
    );
  }
  return {
    constraint: e,
    maxResolution: i,
    minResolution: r,
    minZoom: o,
    zoomFactor: l
  };
};
Q.createRotationConstraint_ = function(t) {
  var e = t.enableRotation !== void 0 ? t.enableRotation : !0;
  if (e) {
    var i = t.constrainRotation;
    return i === void 0 || i === !0 ? Ei.createSnapToZero() : i === !1 ? Ei.none : typeof i == "number" ? Ei.createSnapToN(i) : Ei.none;
  } else
    return Ei.disable;
};
Q.isNoopAnimation = function(t) {
  return !(t.sourceCenter && t.targetCenter && !Mt.equals(t.sourceCenter, t.targetCenter) || t.sourceResolution !== t.targetResolution || t.sourceRotation !== t.targetRotation);
};
var At = {};
At.createCanvasContext2D = function(t, e) {
  var i = document.createElement("CANVAS");
  return t && (i.width = t), e && (i.height = e), i.getContext("2d");
};
At.outerWidth = function(t) {
  var e = t.offsetWidth, i = getComputedStyle(t);
  return e += parseInt(i.marginLeft, 10) + parseInt(i.marginRight, 10), e;
};
At.outerHeight = function(t) {
  var e = t.offsetHeight, i = getComputedStyle(t);
  return e += parseInt(i.marginTop, 10) + parseInt(i.marginBottom, 10), e;
};
At.replaceNode = function(t, e) {
  var i = e.parentNode;
  i && i.replaceChild(t, e);
};
At.removeNode = function(t) {
  return t && t.parentNode ? t.parentNode.removeChild(t) : null;
};
At.removeChildren = function(t) {
  for (; t.lastChild; )
    t.removeChild(t.lastChild);
};
var Ke = function(t) {
  var e = t || {}, i = (
    /** @type {olx.layer.GroupOptions} */
    ut.assign({}, e)
  );
  delete i.layers;
  var r = e.layers;
  ee.call(this, i), this.layersListenerKeys_ = [], this.listenerKeys_ = {}, L.listen(
    this,
    rt.getChangeEventType(Ke.Property_.LAYERS),
    this.handleLayersChanged_,
    this
  ), r ? Array.isArray(r) ? r = new ht(r.slice(), { unique: !0 }) : (Pt.assert(
    r instanceof ht,
    43
  ), r = r) : r = new ht(void 0, { unique: !0 }), this.setLayers(r);
};
_.inherits(Ke, ee);
Ke.prototype.handleLayerChange_ = function() {
  this.changed();
};
Ke.prototype.handleLayersChanged_ = function(t) {
  this.layersListenerKeys_.forEach(L.unlistenByKey), this.layersListenerKeys_.length = 0;
  var e = this.getLayers();
  this.layersListenerKeys_.push(
    L.listen(
      e,
      di.ADD,
      this.handleLayersAdd_,
      this
    ),
    L.listen(
      e,
      di.REMOVE,
      this.handleLayersRemove_,
      this
    )
  );
  for (var i in this.listenerKeys_)
    this.listenerKeys_[i].forEach(L.unlistenByKey);
  ut.clear(this.listenerKeys_);
  var r = e.getArray(), n, a, o;
  for (n = 0, a = r.length; n < a; n++)
    o = r[n], this.listenerKeys_[_.getUid(o).toString()] = [
      L.listen(
        o,
        tn.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      L.listen(
        o,
        it.CHANGE,
        this.handleLayerChange_,
        this
      )
    ];
  this.changed();
};
Ke.prototype.handleLayersAdd_ = function(t) {
  var e = (
    /** @type {ol.layer.Base} */
    t.element
  ), i = _.getUid(e).toString();
  this.listenerKeys_[i] = [
    L.listen(
      e,
      tn.PROPERTYCHANGE,
      this.handleLayerChange_,
      this
    ),
    L.listen(
      e,
      it.CHANGE,
      this.handleLayerChange_,
      this
    )
  ], this.changed();
};
Ke.prototype.handleLayersRemove_ = function(t) {
  var e = (
    /** @type {ol.layer.Base} */
    t.element
  ), i = _.getUid(e).toString();
  this.listenerKeys_[i].forEach(L.unlistenByKey), delete this.listenerKeys_[i], this.changed();
};
Ke.prototype.getLayers = function() {
  return (
    /** @type {!ol.Collection.<ol.layer.Base>} */
    this.get(
      Ke.Property_.LAYERS
    )
  );
};
Ke.prototype.setLayers = function(t) {
  this.set(Ke.Property_.LAYERS, t);
};
Ke.prototype.getLayersArray = function(t) {
  var e = t !== void 0 ? t : [];
  return this.getLayers().forEach(function(i) {
    i.getLayersArray(e);
  }), e;
};
Ke.prototype.getLayerStatesArray = function(t) {
  var e = t !== void 0 ? t : [], i = e.length;
  this.getLayers().forEach(function(s) {
    s.getLayerStatesArray(e);
  });
  var r = this.getLayerState(), n, a, o;
  for (n = i, a = e.length; n < a; n++)
    o = e[n], o.opacity *= r.opacity, o.visible = o.visible && r.visible, o.maxResolution = Math.min(
      o.maxResolution,
      r.maxResolution
    ), o.minResolution = Math.max(
      o.minResolution,
      r.minResolution
    ), r.extent !== void 0 && (o.extent !== void 0 ? o.extent = g.getIntersection(
      o.extent,
      r.extent
    ) : o.extent = r.extent);
  return e;
};
Ke.prototype.getSourceState = function() {
  return Ur.READY;
};
Ke.Property_ = {
  LAYERS: "layers"
};
var Nr = {
  MAP_RENDERER: "MAP_RENDERER",
  LAYER_RENDERER: "LAYER_RENDERER"
}, Se = {};
Se.mapRendererPlugins_ = [];
Se.getMapRendererPlugins = function() {
  return Se.mapRendererPlugins_;
};
Se.layerRendererPlugins_ = [];
Se.getLayerRendererPlugins = function() {
  return Se.layerRendererPlugins_;
};
Se.register = function(t, e) {
  var i;
  switch (t) {
    case Nr.MAP_RENDERER: {
      i = Se.mapRendererPlugins_, i.push(
        /** @type {olx.MapRendererPlugin} */
        e
      );
      break;
    }
    case Nr.LAYER_RENDERER: {
      i = Se.layerRendererPlugins_, i.push(
        /** @type {olx.LayerRendererPlugin} */
        e
      );
      break;
    }
    default:
      throw new Error("Unsupported plugin type: " + t);
  }
};
Se.registerMultiple = function(t, e) {
  for (var i = 0, r = e.length; i < r; ++i)
    Se.register(t, e[i]);
};
var ri = {
  CANVAS: "canvas",
  WEBGL: "webgl"
}, ni = {};
ni.buffer = function(t, e, i) {
  return i === void 0 && (i = [0, 0]), i[0] = t[0] + 2 * e, i[1] = t[1] + 2 * e, i;
};
ni.hasArea = function(t) {
  return t[0] > 0 && t[1] > 0;
};
ni.scale = function(t, e, i) {
  return i === void 0 && (i = [0, 0]), i[0] = t[0] * e + 0.5 | 0, i[1] = t[1] * e + 0.5 | 0, i;
};
ni.toSize = function(t, e) {
  return Array.isArray(t) ? t : (e === void 0 ? e = [t, t] : e[0] = e[1] = /** @type {number} */
  t, e);
};
var z = function(t) {
  rt.call(this);
  var e = z.createOptionsInternal(t);
  this.loadTilesWhileAnimating_ = t.loadTilesWhileAnimating !== void 0 ? t.loadTilesWhileAnimating : !1, this.loadTilesWhileInteracting_ = t.loadTilesWhileInteracting !== void 0 ? t.loadTilesWhileInteracting : !1, this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : pt.DEVICE_PIXEL_RATIO, this.logos_ = e.logos, this.animationDelayKey_, this.animationDelay_ = (function() {
    this.animationDelayKey_ = void 0, this.renderFrame_.call(this, Date.now());
  }).bind(this), this.coordinateToPixelTransform_ = A.create(), this.pixelToCoordinateTransform_ = A.create(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("DIV"), this.viewport_.className = "ol-viewport" + (pt.TOUCH ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.viewport_.style.msTouchAction = "none", this.viewport_.style.touchAction = "none", this.overlayContainer_ = document.createElement("DIV"), this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("DIV"), this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
  for (var i = [
    it.CLICK,
    it.DBLCLICK,
    it.MOUSEDOWN,
    it.TOUCHSTART,
    it.MSPOINTERDOWN,
    Gt.POINTERDOWN,
    it.MOUSEWHEEL,
    it.WHEEL
  ], r = 0, n = i.length; r < n; ++r)
    L.listen(
      this.overlayContainerStopEvent_,
      i[r],
      ve.stopPropagation
    );
  this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = new Si(this, t.moveTolerance);
  for (var a in Gt)
    L.listen(
      this.mapBrowserEventHandler_,
      Gt[a],
      this.handleMapBrowserEvent,
      this
    );
  this.keyboardEventTarget_ = e.keyboardEventTarget, this.keyHandlerKeys_ = null, L.listen(
    this.viewport_,
    it.WHEEL,
    this.handleBrowserEvent,
    this
  ), L.listen(
    this.viewport_,
    it.MOUSEWHEEL,
    this.handleBrowserEvent,
    this
  ), this.controls = e.controls || new ht(), this.interactions = e.interactions || new ht(), this.overlays_ = e.overlays, this.overlayIdIndex_ = {}, this.renderer_ = e.mapRendererPlugin.create(this.viewport_, this), this.handleResize_, this.focus_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new Wr(
    this.getTilePriority.bind(this),
    this.handleTileChange_.bind(this)
  ), this.skippedFeatureUids_ = {}, L.listen(
    this,
    rt.getChangeEventType(Qe.LAYERGROUP),
    this.handleLayerGroupChanged_,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(Qe.VIEW),
    this.handleViewChanged_,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(Qe.SIZE),
    this.handleSizeChanged_,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(Qe.TARGET),
    this.handleTargetChanged_,
    this
  ), this.setProperties(e.values), this.controls.forEach(
    /**
     * @param {ol.control.Control} control Control.
     * @this {ol.PluggableMap}
     */
    function(o) {
      o.setMap(this);
    },
    this
  ), L.listen(
    this.controls,
    di.ADD,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      o.element.setMap(this);
    },
    this
  ), L.listen(
    this.controls,
    di.REMOVE,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      o.element.setMap(null);
    },
    this
  ), this.interactions.forEach(
    /**
     * @param {ol.interaction.Interaction} interaction Interaction.
     * @this {ol.PluggableMap}
     */
    function(o) {
      o.setMap(this);
    },
    this
  ), L.listen(
    this.interactions,
    di.ADD,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      o.element.setMap(this);
    },
    this
  ), L.listen(
    this.interactions,
    di.REMOVE,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      o.element.setMap(null);
    },
    this
  ), this.overlays_.forEach(this.addOverlayInternal_, this), L.listen(
    this.overlays_,
    di.ADD,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      this.addOverlayInternal_(
        /** @type {ol.Overlay} */
        o.element
      );
    },
    this
  ), L.listen(
    this.overlays_,
    di.REMOVE,
    /**
     * @param {ol.Collection.Event} event Collection event.
     */
    function(o) {
      var s = (
        /** @type {ol.Overlay} */
        o.element
      ), l = s.getId();
      l !== void 0 && delete this.overlayIdIndex_[l.toString()], o.element.setMap(null);
    },
    this
  );
};
_.inherits(z, rt);
z.prototype.addControl = function(t) {
  this.getControls().push(t);
};
z.prototype.addInteraction = function(t) {
  this.getInteractions().push(t);
};
z.prototype.addLayer = function(t) {
  var e = this.getLayerGroup().getLayers();
  e.push(t);
};
z.prototype.addOverlay = function(t) {
  this.getOverlays().push(t);
};
z.prototype.addOverlayInternal_ = function(t) {
  var e = t.getId();
  e !== void 0 && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this);
};
z.prototype.disposeInternal = function() {
  this.mapBrowserEventHandler_.dispose(), L.unlisten(
    this.viewport_,
    it.WHEEL,
    this.handleBrowserEvent,
    this
  ), L.unlisten(
    this.viewport_,
    it.MOUSEWHEEL,
    this.handleBrowserEvent,
    this
  ), this.handleResize_ !== void 0 && (window.removeEventListener(
    it.RESIZE,
    this.handleResize_,
    !1
  ), this.handleResize_ = void 0), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0), this.setTarget(null), rt.prototype.disposeInternal.call(this);
};
z.prototype.forEachFeatureAtPixel = function(t, e, i) {
  if (this.frameState_) {
    var r = this.getCoordinateFromPixel(t);
    i = i !== void 0 ? i : {};
    var n = i.hitTolerance !== void 0 ? i.hitTolerance * this.frameState_.pixelRatio : 0, a = i.layerFilter !== void 0 ? i.layerFilter : se.TRUE;
    return this.renderer_.forEachFeatureAtCoordinate(
      r,
      this.frameState_,
      n,
      e,
      null,
      a,
      null
    );
  }
};
z.prototype.getFeaturesAtPixel = function(t, e) {
  var i = null;
  return this.forEachFeatureAtPixel(t, function(r) {
    i || (i = []), i.push(r);
  }, e), i;
};
z.prototype.forEachLayerAtPixel = function(t, e, i, r, n) {
  if (this.frameState_) {
    var a = i !== void 0 ? i : null, o = r !== void 0 ? r : se.TRUE, s = n !== void 0 ? n : null;
    return this.renderer_.forEachLayerAtPixel(
      t,
      this.frameState_,
      e,
      a,
      o,
      s
    );
  }
};
z.prototype.hasFeatureAtPixel = function(t, e) {
  if (!this.frameState_)
    return !1;
  var i = this.getCoordinateFromPixel(t);
  e = e !== void 0 ? e : {};
  var r = e.layerFilter !== void 0 ? e.layerFilter : se.TRUE, n = e.hitTolerance !== void 0 ? e.hitTolerance * this.frameState_.pixelRatio : 0;
  return this.renderer_.hasFeatureAtCoordinate(
    i,
    this.frameState_,
    n,
    r,
    null
  );
};
z.prototype.getEventCoordinate = function(t) {
  return this.getCoordinateFromPixel(this.getEventPixel(t));
};
z.prototype.getEventPixel = function(t) {
  var e = this.viewport_.getBoundingClientRect(), i = t.changedTouches ? t.changedTouches[0] : t;
  return [
    i.clientX - e.left,
    i.clientY - e.top
  ];
};
z.prototype.getTarget = function() {
  return (
    /** @type {Element|string|undefined} */
    this.get(Qe.TARGET)
  );
};
z.prototype.getTargetElement = function() {
  var t = this.getTarget();
  return t !== void 0 ? typeof t == "string" ? document.getElementById(t) : t : null;
};
z.prototype.getCoordinateFromPixel = function(t) {
  var e = this.frameState_;
  return e ? A.apply(e.pixelToCoordinateTransform, t.slice()) : null;
};
z.prototype.getControls = function() {
  return this.controls;
};
z.prototype.getOverlays = function() {
  return this.overlays_;
};
z.prototype.getOverlayById = function(t) {
  var e = this.overlayIdIndex_[t.toString()];
  return e !== void 0 ? e : null;
};
z.prototype.getInteractions = function() {
  return this.interactions;
};
z.prototype.getLayerGroup = function() {
  return (
    /** @type {ol.layer.Group} */
    this.get(Qe.LAYERGROUP)
  );
};
z.prototype.getLayers = function() {
  var t = this.getLayerGroup().getLayers();
  return t;
};
z.prototype.getPixelFromCoordinate = function(t) {
  var e = this.frameState_;
  return e ? A.apply(
    e.coordinateToPixelTransform,
    t.slice(0, 2)
  ) : null;
};
z.prototype.getRenderer = function() {
  return this.renderer_;
};
z.prototype.getSize = function() {
  return (
    /** @type {ol.Size|undefined} */
    this.get(Qe.SIZE)
  );
};
z.prototype.getView = function() {
  return (
    /** @type {ol.View} */
    this.get(Qe.VIEW)
  );
};
z.prototype.getViewport = function() {
  return this.viewport_;
};
z.prototype.getOverlayContainer = function() {
  return this.overlayContainer_;
};
z.prototype.getOverlayContainerStopEvent = function() {
  return this.overlayContainerStopEvent_;
};
z.prototype.getTilePriority = function(t, e, i, r) {
  var n = this.frameState_;
  if (!n || !(e in n.wantedTiles) || !n.wantedTiles[e][t.getKey()])
    return Zt.DROP;
  var a = i[0] - n.focus[0], o = i[1] - n.focus[1];
  return 65536 * Math.log(r) + Math.sqrt(a * a + o * o) / r;
};
z.prototype.handleBrowserEvent = function(t, e) {
  var i = e || t.type, r = new Br(i, this, t);
  this.handleMapBrowserEvent(r);
};
z.prototype.handleMapBrowserEvent = function(t) {
  if (this.frameState_) {
    this.focus_ = t.coordinate, t.frameState = this.frameState_;
    var e = this.getInteractions().getArray(), i;
    if (this.dispatchEvent(t) !== !1)
      for (i = e.length - 1; i >= 0; i--) {
        var r = e[i];
        if (r.getActive()) {
          var n = r.handleEvent(t);
          if (!n)
            break;
        }
      }
  }
};
z.prototype.handlePostRender = function() {
  var t = this.frameState_, e = this.tileQueue_;
  if (!e.isEmpty()) {
    var i = 16, r = i;
    if (t) {
      var n = t.viewHints;
      n[Dt.ANIMATING] && (i = this.loadTilesWhileAnimating_ ? 8 : 0, r = 2), n[Dt.INTERACTING] && (i = this.loadTilesWhileInteracting_ ? 8 : 0, r = 2);
    }
    e.getTilesLoading() < i && (e.reprioritize(), e.loadMoreTiles(i, r));
  }
  var a = this.postRenderFunctions_, o, s;
  for (o = 0, s = a.length; o < s; ++o)
    a[o](this, t);
  a.length = 0;
};
z.prototype.handleSizeChanged_ = function() {
  this.render();
};
z.prototype.handleTargetChanged_ = function() {
  var t;
  if (this.getTarget() && (t = this.getTargetElement()), this.keyHandlerKeys_) {
    for (var e = 0, i = this.keyHandlerKeys_.length; e < i; ++e)
      L.unlistenByKey(this.keyHandlerKeys_[e]);
    this.keyHandlerKeys_ = null;
  }
  if (!t)
    this.renderer_.removeLayerRenderers(), At.removeNode(this.viewport_), this.handleResize_ !== void 0 && (window.removeEventListener(
      it.RESIZE,
      this.handleResize_,
      !1
    ), this.handleResize_ = void 0);
  else {
    t.appendChild(this.viewport_);
    var r = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
    this.keyHandlerKeys_ = [
      L.listen(
        r,
        it.KEYDOWN,
        this.handleBrowserEvent,
        this
      ),
      L.listen(
        r,
        it.KEYPRESS,
        this.handleBrowserEvent,
        this
      )
    ], this.handleResize_ || (this.handleResize_ = this.updateSize.bind(this), window.addEventListener(
      it.RESIZE,
      this.handleResize_,
      !1
    ));
  }
  this.updateSize();
};
z.prototype.handleTileChange_ = function() {
  this.render();
};
z.prototype.handleViewPropertyChanged_ = function() {
  this.render();
};
z.prototype.handleViewChanged_ = function() {
  this.viewPropertyListenerKey_ && (L.unlistenByKey(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (L.unlistenByKey(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
  var t = this.getView();
  t && (this.viewport_.setAttribute("data-view", _.getUid(t)), this.viewPropertyListenerKey_ = L.listen(
    t,
    tn.PROPERTYCHANGE,
    this.handleViewPropertyChanged_,
    this
  ), this.viewChangeListenerKey_ = L.listen(
    t,
    it.CHANGE,
    this.handleViewPropertyChanged_,
    this
  )), this.render();
};
z.prototype.handleLayerGroupChanged_ = function() {
  this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(L.unlistenByKey), this.layerGroupPropertyListenerKeys_ = null);
  var t = this.getLayerGroup();
  t && (this.layerGroupPropertyListenerKeys_ = [
    L.listen(
      t,
      tn.PROPERTYCHANGE,
      this.render,
      this
    ),
    L.listen(
      t,
      it.CHANGE,
      this.render,
      this
    )
  ]), this.render();
};
z.prototype.isRendered = function() {
  return !!this.frameState_;
};
z.prototype.renderSync = function() {
  this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
};
z.prototype.render = function() {
  this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(
    this.animationDelay_
  ));
};
z.prototype.removeControl = function(t) {
  return this.getControls().remove(t);
};
z.prototype.removeInteraction = function(t) {
  return this.getInteractions().remove(t);
};
z.prototype.removeLayer = function(t) {
  var e = this.getLayerGroup().getLayers();
  return e.remove(t);
};
z.prototype.removeOverlay = function(t) {
  return this.getOverlays().remove(t);
};
z.prototype.renderFrame_ = function(t) {
  var e, i, r, n = this.getSize(), a = this.getView(), o = g.createEmpty(), s = this.frameState_, l = null;
  if (n !== void 0 && ni.hasArea(n) && a && a.isDef()) {
    var h = a.getHints(this.frameState_ ? this.frameState_.viewHints : void 0), u = this.getLayerGroup().getLayerStatesArray(), f = {};
    for (e = 0, i = u.length; e < i; ++e)
      f[_.getUid(u[e].layer)] = u[e];
    r = a.getState();
    var c = r.center, d = r.resolution / this.pixelRatio_;
    c[0] = Math.round(c[0] / d) * d, c[1] = Math.round(c[1] / d) * d, l = /** @type {olx.FrameState} */
    {
      animate: !1,
      coordinateToPixelTransform: this.coordinateToPixelTransform_,
      extent: o,
      focus: this.focus_ ? this.focus_ : c,
      index: this.frameIndex_++,
      layerStates: f,
      layerStatesArray: u,
      logos: ut.assign({}, this.logos_),
      pixelRatio: this.pixelRatio_,
      pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
      postRenderFunctions: [],
      size: n,
      skippedFeatureUids: this.skippedFeatureUids_,
      tileQueue: this.tileQueue_,
      time: t,
      usedTiles: {},
      viewState: r,
      viewHints: h,
      wantedTiles: {}
    };
  }
  if (l && (l.extent = g.getForViewAndSize(
    r.center,
    r.resolution,
    r.rotation,
    l.size,
    o
  )), this.frameState_ = l, this.renderer_.renderFrame(l), l) {
    if (l.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      l.postRenderFunctions
    ), s) {
      var v = !this.previousExtent_ || !g.isEmpty(this.previousExtent_) && !g.equals(l.extent, this.previousExtent_);
      v && (this.dispatchEvent(
        new sr(Qr.MOVESTART, this, s)
      ), this.previousExtent_ = g.createOrUpdateEmpty(this.previousExtent_));
    }
    var m = this.previousExtent_ && !l.viewHints[Dt.ANIMATING] && !l.viewHints[Dt.INTERACTING] && !g.equals(l.extent, this.previousExtent_);
    m && (this.dispatchEvent(
      new sr(Qr.MOVEEND, this, l)
    ), g.clone(l.extent, this.previousExtent_));
  }
  this.dispatchEvent(
    new sr(Qr.POSTRENDER, this, l)
  ), setTimeout(this.handlePostRender.bind(this), 0);
};
z.prototype.setLayerGroup = function(t) {
  this.set(Qe.LAYERGROUP, t);
};
z.prototype.setSize = function(t) {
  this.set(Qe.SIZE, t);
};
z.prototype.setTarget = function(t) {
  this.set(Qe.TARGET, t);
};
z.prototype.setView = function(t) {
  this.set(Qe.VIEW, t);
};
z.prototype.skipFeature = function(t) {
  var e = _.getUid(t).toString();
  this.skippedFeatureUids_[e] = !0, this.render();
};
z.prototype.updateSize = function() {
  var t = this.getTargetElement();
  if (!t)
    this.setSize(void 0);
  else {
    var e = getComputedStyle(t);
    this.setSize([
      t.offsetWidth - parseFloat(e.borderLeftWidth) - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight) - parseFloat(e.borderRightWidth),
      t.offsetHeight - parseFloat(e.borderTopWidth) - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom) - parseFloat(e.borderBottomWidth)
    ]);
  }
};
z.prototype.unskipFeature = function(t) {
  var e = _.getUid(t).toString();
  delete this.skippedFeatureUids_[e], this.render();
};
z.DEFAULT_RENDERER_TYPES = [
  ri.CANVAS,
  ri.WEBGL
];
z.LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC";
z.createOptionsInternal = function(t) {
  var e = null;
  t.keyboardEventTarget !== void 0 && (e = typeof t.keyboardEventTarget == "string" ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget);
  var i = {}, r = {};
  if (t.logo === void 0 || typeof t.logo == "boolean" && t.logo)
    r[z.LOGO_URL] = "https://openlayers.org/";
  else {
    var n = t.logo;
    typeof n == "string" ? r[n] = "" : n instanceof HTMLElement ? r[_.getUid(n).toString()] = n : n && (Pt.assert(typeof n.href == "string", 44), Pt.assert(typeof n.src == "string", 45), r[n.src] = n.href);
  }
  var a = t.layers instanceof Ke ? t.layers : new Ke({ layers: t.layers });
  i[Qe.LAYERGROUP] = a, i[Qe.TARGET] = t.target, i[Qe.VIEW] = t.view !== void 0 ? t.view : new Q();
  var o;
  t.renderer !== void 0 ? (Array.isArray(t.renderer) ? o = t.renderer : typeof t.renderer == "string" ? o = [t.renderer] : Pt.assert(!1, 46), o.indexOf(
    /** @type {ol.renderer.Type} */
    "dom"
  ) >= 0 && (o = o.concat(z.DEFAULT_RENDERER_TYPES))) : o = z.DEFAULT_RENDERER_TYPES;
  var s, l = Se.getMapRendererPlugins();
  t: for (var h = 0, u = o.length; h < u; ++h)
    for (var f = o[h], c = 0, d = l.length; c < d; ++c) {
      var v = l[c];
      if (v.handles(f)) {
        s = v;
        break t;
      }
    }
  if (!s)
    throw new Error("Unable to create a map renderer for types: " + o.join(", "));
  var m;
  t.controls !== void 0 && (Array.isArray(t.controls) ? m = new ht(t.controls.slice()) : (Pt.assert(
    t.controls instanceof ht,
    47
  ), m = t.controls));
  var p;
  t.interactions !== void 0 && (Array.isArray(t.interactions) ? p = new ht(t.interactions.slice()) : (Pt.assert(
    t.interactions instanceof ht,
    48
  ), p = t.interactions));
  var E;
  return t.overlays !== void 0 ? Array.isArray(t.overlays) ? E = new ht(t.overlays.slice()) : (Pt.assert(
    t.overlays instanceof ht,
    49
  ), E = t.overlays) : E = new ht(), {
    controls: m,
    interactions: p,
    keyboardEventTarget: e,
    logos: r,
    overlays: E,
    mapRendererPlugin: s,
    values: i
  };
};
var Li = function(t) {
  rt.call(this), this.element = t.element ? t.element : null, this.target_ = null, this.map_ = null, this.listenerKeys = [], this.render = t.render ? t.render : _.nullFunction, t.target && this.setTarget(t.target);
};
_.inherits(Li, rt);
Li.prototype.disposeInternal = function() {
  At.removeNode(this.element), rt.prototype.disposeInternal.call(this);
};
Li.prototype.getMap = function() {
  return this.map_;
};
Li.prototype.setMap = function(t) {
  this.map_ && At.removeNode(this.element);
  for (var e = 0, i = this.listenerKeys.length; e < i; ++e)
    L.unlistenByKey(this.listenerKeys[e]);
  if (this.listenerKeys.length = 0, this.map_ = t, this.map_) {
    var r = this.target_ ? this.target_ : t.getOverlayContainerStopEvent();
    r.appendChild(this.element), this.render !== _.nullFunction && this.listenerKeys.push(L.listen(
      t,
      Qr.POSTRENDER,
      this.render,
      this
    )), t.render();
  }
};
Li.prototype.setTarget = function(t) {
  this.target_ = typeof t == "string" ? document.getElementById(t) : t;
};
var _e = {};
_e.CLASS_HIDDEN = "ol-hidden";
_e.CLASS_SELECTABLE = "ol-selectable";
_e.CLASS_UNSELECTABLE = "ol-unselectable";
_e.CLASS_UNSUPPORTED = "ol-unsupported";
_e.CLASS_CONTROL = "ol-control";
_e.getFontFamilies = /* @__PURE__ */ function() {
  var t, e = {};
  return function(i) {
    if (t || (t = document.createElement("div").style), !(i in e)) {
      t.font = i;
      var r = t.fontFamily;
      if (t.font = "", !r)
        return null;
      e[i] = r.split(/,\s?/);
    }
    return e[i];
  };
}();
var ui = function(t) {
  var e = t || {};
  this.ulElement_ = document.createElement("UL"), this.logoLi_ = document.createElement("LI"), this.ulElement_.appendChild(this.logoLi_), this.logoLi_.style.display = "none", this.collapsed_ = e.collapsed !== void 0 ? e.collapsed : !0, this.collapsible_ = e.collapsible !== void 0 ? e.collapsible : !0, this.collapsible_ || (this.collapsed_ = !1);
  var i = e.className !== void 0 ? e.className : "ol-attribution", r = e.tipLabel !== void 0 ? e.tipLabel : "Attributions", n = e.collapseLabel !== void 0 ? e.collapseLabel : "»";
  typeof n == "string" ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = n) : this.collapseLabel_ = n;
  var a = e.label !== void 0 ? e.label : "i";
  typeof a == "string" ? (this.label_ = document.createElement("span"), this.label_.textContent = a) : this.label_ = a;
  var o = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_, s = document.createElement("button");
  s.setAttribute("type", "button"), s.title = r, s.appendChild(o), L.listen(s, it.CLICK, this.handleClick_, this);
  var l = i + " " + _e.CLASS_UNSELECTABLE + " " + _e.CLASS_CONTROL + (this.collapsed_ && this.collapsible_ ? " ol-collapsed" : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), h = document.createElement("div");
  h.className = l, h.appendChild(this.ulElement_), h.appendChild(s);
  var u = e.render ? e.render : ui.render;
  Li.call(this, {
    element: h,
    render: u,
    target: e.target
  }), this.renderedAttributions_ = [], this.renderedVisible_ = !0, this.logoElements_ = {};
};
_.inherits(ui, Li);
ui.prototype.getSourceAttributions_ = function(t) {
  for (var e = {}, i = [], r = t.layerStatesArray, n = t.viewState.resolution, a = 0, o = r.length; a < o; ++a) {
    var s = r[a];
    if (ge.visibleAtResolution(s, n)) {
      var l = s.layer.getSource();
      if (l) {
        var h = l.getAttributions2();
        if (h) {
          var u = h(t);
          if (u)
            if (Array.isArray(u))
              for (var f = 0, c = u.length; f < c; ++f)
                u[f] in e || (i.push(u[f]), e[u[f]] = !0);
            else
              u in e || (i.push(u), e[u] = !0);
        }
      }
    }
  }
  return i;
};
ui.render = function(t) {
  this.updateElement_(t.frameState);
};
ui.prototype.updateElement_ = function(t) {
  if (!t) {
    this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
    return;
  }
  var e = this.getSourceAttributions_(t);
  if (!st.equals(e, this.renderedAttributions_)) {
    for (; this.ulElement_.lastChild !== this.logoLi_; )
      this.ulElement_.removeChild(this.ulElement_.lastChild);
    for (var i = 0, r = e.length; i < r; ++i) {
      var n = document.createElement("LI");
      n.innerHTML = e[i], this.ulElement_.appendChild(n);
    }
    e.length === 0 && this.renderedAttributions_.length > 0 ? this.element.classList.add("ol-logo-only") : this.renderedAttributions_.length === 0 && e.length > 0 && this.element.classList.remove("ol-logo-only");
    var a = e.length > 0 || !ut.isEmpty(t.logos);
    this.renderedVisible_ != a && (this.element.style.display = a ? "" : "none", this.renderedVisible_ = a), this.renderedAttributions_ = e, this.insertLogos_(t);
  }
};
ui.prototype.insertLogos_ = function(t) {
  var e, i = t.logos, r = this.logoElements_;
  for (e in r)
    e in i || (At.removeNode(r[e]), delete r[e]);
  var n, a, o;
  for (o in i) {
    var s = i[o];
    s instanceof HTMLElement && (this.logoLi_.appendChild(s), r[o] = s), o in r || (n = new Image(), n.src = o, s === "" ? a = n : (a = document.createElement("a"), a.href = s, a.appendChild(n)), this.logoLi_.appendChild(a), r[o] = a);
  }
  this.logoLi_.style.display = ut.isEmpty(i) ? "none" : "";
};
ui.prototype.handleClick_ = function(t) {
  t.preventDefault(), this.handleToggle_();
};
ui.prototype.handleToggle_ = function() {
  this.element.classList.toggle("ol-collapsed"), this.collapsed_ ? At.replaceNode(this.collapseLabel_, this.label_) : At.replaceNode(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_;
};
ui.prototype.getCollapsible = function() {
  return this.collapsible_;
};
ui.prototype.setCollapsible = function(t) {
  this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_());
};
ui.prototype.setCollapsed = function(t) {
  !this.collapsible_ || this.collapsed_ === t || this.handleToggle_();
};
ui.prototype.getCollapsed = function() {
  return this.collapsed_;
};
var Rr = function(t) {
  var e = t || {}, i = e.className !== void 0 ? e.className : "ol-rotate", r = e.label !== void 0 ? e.label : "⇧";
  this.label_ = null, typeof r == "string" ? (this.label_ = document.createElement("span"), this.label_.className = "ol-compass", this.label_.textContent = r) : (this.label_ = r, this.label_.classList.add("ol-compass"));
  var n = e.tipLabel ? e.tipLabel : "Reset rotation", a = document.createElement("button");
  a.className = i + "-reset", a.setAttribute("type", "button"), a.title = n, a.appendChild(this.label_), L.listen(
    a,
    it.CLICK,
    Rr.prototype.handleClick_,
    this
  );
  var o = i + " " + _e.CLASS_UNSELECTABLE + " " + _e.CLASS_CONTROL, s = document.createElement("div");
  s.className = o, s.appendChild(a);
  var l = e.render ? e.render : Rr.render;
  this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, Li.call(this, {
    element: s,
    render: l,
    target: e.target
  }), this.duration_ = e.duration !== void 0 ? e.duration : 250, this.autoHide_ = e.autoHide !== void 0 ? e.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(_e.CLASS_HIDDEN);
};
_.inherits(Rr, Li);
Rr.prototype.handleClick_ = function(t) {
  t.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
};
Rr.prototype.resetNorth_ = function() {
  var t = this.getMap(), e = t.getView();
  e && e.getRotation() !== void 0 && (this.duration_ > 0 ? e.animate({
    rotation: 0,
    duration: this.duration_,
    easing: ce.easeOut
  }) : e.setRotation(0));
};
Rr.render = function(t) {
  var e = t.frameState;
  if (e) {
    var i = e.viewState.rotation;
    if (i != this.rotation_) {
      var r = "rotate(" + i + "rad)";
      if (this.autoHide_) {
        var n = this.element.classList.contains(_e.CLASS_HIDDEN);
        !n && i === 0 ? this.element.classList.add(_e.CLASS_HIDDEN) : n && i !== 0 && this.element.classList.remove(_e.CLASS_HIDDEN);
      }
      this.label_.style.msTransform = r, this.label_.style.webkitTransform = r, this.label_.style.transform = r;
    }
    this.rotation_ = i;
  }
};
var Gr = function(t) {
  var e = t || {}, i = e.className !== void 0 ? e.className : "ol-zoom", r = e.delta !== void 0 ? e.delta : 1, n = e.zoomInLabel !== void 0 ? e.zoomInLabel : "+", a = e.zoomOutLabel !== void 0 ? e.zoomOutLabel : "−", o = e.zoomInTipLabel !== void 0 ? e.zoomInTipLabel : "Zoom in", s = e.zoomOutTipLabel !== void 0 ? e.zoomOutTipLabel : "Zoom out", l = document.createElement("button");
  l.className = i + "-in", l.setAttribute("type", "button"), l.title = o, l.appendChild(
    typeof n == "string" ? document.createTextNode(n) : n
  ), L.listen(
    l,
    it.CLICK,
    Gr.prototype.handleClick_.bind(this, r)
  );
  var h = document.createElement("button");
  h.className = i + "-out", h.setAttribute("type", "button"), h.title = s, h.appendChild(
    typeof a == "string" ? document.createTextNode(a) : a
  ), L.listen(
    h,
    it.CLICK,
    Gr.prototype.handleClick_.bind(this, -r)
  );
  var u = i + " " + _e.CLASS_UNSELECTABLE + " " + _e.CLASS_CONTROL, f = document.createElement("div");
  f.className = u, f.appendChild(l), f.appendChild(h), Li.call(this, {
    element: f,
    target: e.target
  }), this.duration_ = e.duration !== void 0 ? e.duration : 250;
};
_.inherits(Gr, Li);
Gr.prototype.handleClick_ = function(t, e) {
  e.preventDefault(), this.zoomByDelta_(t);
};
Gr.prototype.zoomByDelta_ = function(t) {
  var e = this.getMap(), i = e.getView();
  if (i) {
    var r = i.getResolution();
    if (r) {
      var n = i.constrainResolution(r, t);
      this.duration_ > 0 ? (i.getAnimating() && i.cancelAnimations(), i.animate({
        resolution: n,
        duration: this.duration_,
        easing: ce.easeOut
      })) : i.setResolution(n);
    }
  }
};
var Ea = {};
Ea.defaults = function(t) {
  var e = t || {}, i = new ht(), r = e.zoom !== void 0 ? e.zoom : !0;
  r && i.push(new Gr(e.zoomOptions));
  var n = e.rotate !== void 0 ? e.rotate : !0;
  n && i.push(new Rr(e.rotateOptions));
  var a = e.attribution !== void 0 ? e.attribution : !0;
  return a && i.push(new ui(e.attributionOptions)), i;
};
var kr = function(t, e, i) {
  this.decay_ = t, this.minVelocity_ = e, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
};
kr.prototype.begin = function() {
  this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
};
kr.prototype.update = function(t, e) {
  this.points_.push(t, e, Date.now());
};
kr.prototype.end = function() {
  if (this.points_.length < 6)
    return !1;
  var t = Date.now() - this.delay_, e = this.points_.length - 3;
  if (this.points_[e + 2] < t)
    return !1;
  for (var i = e - 3; i > 0 && this.points_[i + 2] > t; )
    i -= 3;
  var r = this.points_[e + 2] - this.points_[i + 2];
  if (r < 1e3 / 60)
    return !1;
  var n = this.points_[e] - this.points_[i], a = this.points_[e + 1] - this.points_[i + 1];
  return this.angle_ = Math.atan2(a, n), this.initialVelocity_ = Math.sqrt(n * n + a * a) / r, this.initialVelocity_ > this.minVelocity_;
};
kr.prototype.getDistance = function() {
  return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
};
kr.prototype.getAngle = function() {
  return this.angle_;
};
var Ta = {
  ACTIVE: "active"
}, gt = function(t) {
  rt.call(this), this.map_ = null, this.setActive(!0), this.handleEvent = t.handleEvent;
};
_.inherits(gt, rt);
gt.prototype.getActive = function() {
  return (
    /** @type {boolean} */
    this.get(Ta.ACTIVE)
  );
};
gt.prototype.getMap = function() {
  return this.map_;
};
gt.prototype.setActive = function(t) {
  this.set(Ta.ACTIVE, t);
};
gt.prototype.setMap = function(t) {
  this.map_ = t;
};
gt.pan = function(t, e, i) {
  var r = t.getCenter();
  if (r) {
    var n = t.constrainCenter(
      [r[0] + e[0], r[1] + e[1]]
    );
    i ? t.animate({
      duration: i,
      easing: ce.linear,
      center: n
    }) : t.setCenter(n);
  }
};
gt.rotate = function(t, e, i, r) {
  e = t.constrainRotation(e, 0), gt.rotateWithoutConstraints(
    t,
    e,
    i,
    r
  );
};
gt.rotateWithoutConstraints = function(t, e, i, r) {
  if (e !== void 0) {
    var n = t.getRotation(), a = t.getCenter();
    n !== void 0 && a && r > 0 ? t.animate({
      rotation: e,
      anchor: i,
      duration: r,
      easing: ce.easeOut
    }) : t.rotate(e, i);
  }
};
gt.zoom = function(t, e, i, r, n) {
  e = t.constrainResolution(e, 0, n), gt.zoomWithoutConstraints(
    t,
    e,
    i,
    r
  );
};
gt.zoomByDelta = function(t, e, i, r) {
  var n = t.getResolution(), a = t.constrainResolution(n, e, 0);
  if (a !== void 0) {
    var o = t.getResolutions();
    a = Z.clamp(
      a,
      t.getMinResolution() || o[o.length - 1],
      t.getMaxResolution() || o[0]
    );
  }
  if (i && a !== void 0 && a !== n) {
    var s = t.getCenter(), l = t.calculateCenterZoom(a, i);
    l = t.constrainCenter(l), i = [
      (a * s[0] - n * l[0]) / (a - n),
      (a * s[1] - n * l[1]) / (a - n)
    ];
  }
  gt.zoomWithoutConstraints(
    t,
    a,
    i,
    r
  );
};
gt.zoomWithoutConstraints = function(t, e, i, r) {
  if (e) {
    var n = t.getResolution(), a = t.getCenter();
    if (n !== void 0 && a && e !== n && r)
      t.animate({
        resolution: e,
        anchor: i,
        duration: r,
        easing: ce.easeOut
      });
    else {
      if (i) {
        var o = t.calculateCenterZoom(e, i);
        t.setCenter(o);
      }
      t.setResolution(e);
    }
  }
};
var Dn = function(t) {
  var e = t || {};
  this.delta_ = e.delta ? e.delta : 1, gt.call(this, {
    handleEvent: Dn.handleEvent
  }), this.duration_ = e.duration !== void 0 ? e.duration : 250;
};
_.inherits(Dn, gt);
Dn.handleEvent = function(t) {
  var e = !1, i = t.originalEvent;
  if (t.type == Gt.DBLCLICK) {
    var r = t.map, n = t.coordinate, a = i.shiftKey ? -this.delta_ : this.delta_, o = r.getView();
    gt.zoomByDelta(
      o,
      a,
      n,
      this.duration_
    ), t.preventDefault(), e = !0;
  }
  return !e;
};
var Ft = {};
Ft.altKeyOnly = function(t) {
  var e = t.originalEvent;
  return e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
};
Ft.altShiftKeysOnly = function(t) {
  var e = t.originalEvent;
  return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
};
Ft.always = se.TRUE;
Ft.click = function(t) {
  return t.type == Gt.CLICK;
};
Ft.mouseActionButton = function(t) {
  var e = t.originalEvent;
  return e.button == 0 && !(pt.WEBKIT && pt.MAC && e.ctrlKey);
};
Ft.never = se.FALSE;
Ft.pointerMove = function(t) {
  return t.type == "pointermove";
};
Ft.singleClick = function(t) {
  return t.type == Gt.SINGLECLICK;
};
Ft.doubleClick = function(t) {
  return t.type == Gt.DBLCLICK;
};
Ft.noModifierKeys = function(t) {
  var e = t.originalEvent;
  return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
};
Ft.platformModifierKeyOnly = function(t) {
  var e = t.originalEvent;
  return !e.altKey && (pt.MAC ? e.metaKey : e.ctrlKey) && !e.shiftKey;
};
Ft.shiftKeyOnly = function(t) {
  var e = t.originalEvent;
  return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
};
Ft.targetNotEditable = function(t) {
  var e = t.originalEvent.target, i = e.tagName;
  return i !== "INPUT" && i !== "SELECT" && i !== "TEXTAREA";
};
Ft.mouseOnly = function(t) {
  return Pt.assert(t.pointerEvent, 56), /** @type {ol.MapBrowserEvent} */
  t.pointerEvent.pointerType == "mouse";
};
Ft.primaryAction = function(t) {
  var e = t.pointerEvent;
  return e.isPrimary && e.button === 0;
};
var Nt = function(t) {
  var e = t || {}, i = e.handleEvent ? e.handleEvent : Nt.handleEvent;
  gt.call(this, {
    handleEvent: i
  }), this.handleDownEvent_ = e.handleDownEvent ? e.handleDownEvent : Nt.handleDownEvent, this.handleDragEvent_ = e.handleDragEvent ? e.handleDragEvent : Nt.handleDragEvent, this.handleMoveEvent_ = e.handleMoveEvent ? e.handleMoveEvent : Nt.handleMoveEvent, this.handleUpEvent_ = e.handleUpEvent ? e.handleUpEvent : Nt.handleUpEvent, this.handlingDownUpSequence = !1, this.trackedPointers_ = {}, this.targetPointers = [];
};
_.inherits(Nt, gt);
Nt.centroid = function(t) {
  for (var e = t.length, i = 0, r = 0, n = 0; n < e; n++)
    i += t[n].clientX, r += t[n].clientY;
  return [i / e, r / e];
};
Nt.prototype.isPointerDraggingEvent_ = function(t) {
  var e = t.type;
  return e === Gt.POINTERDOWN || e === Gt.POINTERDRAG || e === Gt.POINTERUP;
};
Nt.prototype.updateTrackedPointers_ = function(t) {
  if (this.isPointerDraggingEvent_(t)) {
    var e = t.pointerEvent, i = e.pointerId.toString();
    t.type == Gt.POINTERUP ? delete this.trackedPointers_[i] : t.type == Gt.POINTERDOWN ? this.trackedPointers_[i] = e : i in this.trackedPointers_ && (this.trackedPointers_[i] = e), this.targetPointers = ut.getValues(this.trackedPointers_);
  }
};
Nt.handleDragEvent = _.nullFunction;
Nt.handleUpEvent = se.FALSE;
Nt.handleDownEvent = se.FALSE;
Nt.handleMoveEvent = _.nullFunction;
Nt.handleEvent = function(t) {
  if (!(t instanceof Yi))
    return !0;
  var e = !1;
  if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
    if (t.type == Gt.POINTERDRAG)
      this.handleDragEvent_(t);
    else if (t.type == Gt.POINTERUP) {
      var i = this.handleUpEvent_(t);
      this.handlingDownUpSequence = i && this.targetPointers.length > 0;
    }
  } else if (t.type == Gt.POINTERDOWN) {
    var r = this.handleDownEvent_(t);
    this.handlingDownUpSequence = r, e = this.shouldStopEvent(r);
  } else t.type == Gt.POINTERMOVE && this.handleMoveEvent_(t);
  return !e;
};
Nt.prototype.shouldStopEvent = function(t) {
  return t;
};
var Vi = function(t) {
  Nt.call(this, {
    handleDownEvent: Vi.handleDownEvent_,
    handleDragEvent: Vi.handleDragEvent_,
    handleUpEvent: Vi.handleUpEvent_
  });
  var e = t || {};
  this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.condition_ = e.condition ? e.condition : Ft.noModifierKeys, this.noKinetic_ = !1;
};
_.inherits(Vi, Nt);
Vi.handleDragEvent_ = function(t) {
  var e = this.targetPointers, i = Nt.centroid(e);
  if (e.length == this.lastPointersCount_) {
    if (this.kinetic_ && this.kinetic_.update(i[0], i[1]), this.lastCentroid) {
      var r = this.lastCentroid[0] - i[0], n = i[1] - this.lastCentroid[1], a = t.map, o = a.getView(), s = o.getState(), l = [r, n];
      Mt.scale(l, s.resolution), Mt.rotate(l, s.rotation), Mt.add(l, s.center), l = o.constrainCenter(l), o.setCenter(l);
    }
  } else this.kinetic_ && this.kinetic_.begin();
  this.lastCentroid = i, this.lastPointersCount_ = e.length;
};
Vi.handleUpEvent_ = function(t) {
  var e = t.map, i = e.getView();
  if (this.targetPointers.length === 0) {
    if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
      var r = this.kinetic_.getDistance(), n = this.kinetic_.getAngle(), a = (
        /** @type {!ol.Coordinate} */
        i.getCenter()
      ), o = e.getPixelFromCoordinate(a), s = e.getCoordinateFromPixel([
        o[0] - r * Math.cos(n),
        o[1] - r * Math.sin(n)
      ]);
      i.animate({
        center: i.constrainCenter(s),
        duration: 500,
        easing: ce.easeOut
      });
    }
    return i.setHint(Dt.INTERACTING, -1), !1;
  } else
    return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
};
Vi.handleDownEvent_ = function(t) {
  if (this.targetPointers.length > 0 && this.condition_(t)) {
    var e = t.map, i = e.getView();
    return this.lastCentroid = null, this.handlingDownUpSequence || i.setHint(Dt.INTERACTING, 1), i.getAnimating() && i.setCenter(t.frameState.viewState.center), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
  } else
    return !1;
};
Vi.prototype.shouldStopEvent = se.FALSE;
var Hi = function(t) {
  var e = t || {};
  Nt.call(this, {
    handleDownEvent: Hi.handleDownEvent_,
    handleDragEvent: Hi.handleDragEvent_,
    handleUpEvent: Hi.handleUpEvent_
  }), this.condition_ = e.condition ? e.condition : Ft.altShiftKeysOnly, this.lastAngle_ = void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250;
};
_.inherits(Hi, Nt);
Hi.handleDragEvent_ = function(t) {
  if (Ft.mouseOnly(t)) {
    var e = t.map, i = e.getView();
    if (i.getConstraints().rotation !== Ei.disable) {
      var r = e.getSize(), n = t.pixel, a = Math.atan2(r[1] / 2 - n[1], n[0] - r[0] / 2);
      if (this.lastAngle_ !== void 0) {
        var o = a - this.lastAngle_, s = i.getRotation();
        gt.rotateWithoutConstraints(
          i,
          s - o
        );
      }
      this.lastAngle_ = a;
    }
  }
};
Hi.handleUpEvent_ = function(t) {
  if (!Ft.mouseOnly(t))
    return !0;
  var e = t.map, i = e.getView();
  i.setHint(Dt.INTERACTING, -1);
  var r = i.getRotation();
  return gt.rotate(
    i,
    r,
    void 0,
    this.duration_
  ), !1;
};
Hi.handleDownEvent_ = function(t) {
  if (!Ft.mouseOnly(t))
    return !1;
  if (Ft.mouseActionButton(t) && this.condition_(t)) {
    var e = t.map;
    return e.getView().setHint(Dt.INTERACTING, 1), this.lastAngle_ = void 0, !0;
  } else
    return !1;
};
Hi.prototype.shouldStopEvent = se.FALSE;
var hr = function(t) {
  this.geometry_ = null, this.element_ = /** @type {HTMLDivElement} */
  document.createElement("div"), this.element_.style.position = "absolute", this.element_.className = "ol-box " + t, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
};
_.inherits(hr, tr);
hr.prototype.disposeInternal = function() {
  this.setMap(null);
};
hr.prototype.render_ = function() {
  var t = this.startPixel_, e = this.endPixel_, i = "px", r = this.element_.style;
  r.left = Math.min(t[0], e[0]) + i, r.top = Math.min(t[1], e[1]) + i, r.width = Math.abs(e[0] - t[0]) + i, r.height = Math.abs(e[1] - t[1]) + i;
};
hr.prototype.setMap = function(t) {
  if (this.map_) {
    this.map_.getOverlayContainer().removeChild(this.element_);
    var e = this.element_.style;
    e.left = e.top = e.width = e.height = "inherit";
  }
  this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
};
hr.prototype.setPixels = function(t, e) {
  this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_();
};
hr.prototype.createOrUpdateGeometry = function() {
  var t = this.startPixel_, e = this.endPixel_, i = [
    t,
    [t[0], e[1]],
    e,
    [e[0], t[1]]
  ], r = i.map(this.map_.getCoordinateFromPixel, this.map_);
  r[4] = r[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([r]) : this.geometry_ = new It([r]);
};
hr.prototype.getGeometry = function() {
  return this.geometry_;
};
var te = function(t) {
  Nt.call(this, {
    handleDownEvent: te.handleDownEvent_,
    handleDragEvent: te.handleDragEvent_,
    handleUpEvent: te.handleUpEvent_
  });
  var e = t || {};
  this.box_ = new hr(e.className || "ol-dragbox"), this.minArea_ = e.minArea !== void 0 ? e.minArea : 64, this.startPixel_ = null, this.condition_ = e.condition ? e.condition : Ft.always, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : te.defaultBoxEndCondition;
};
_.inherits(te, Nt);
te.defaultBoxEndCondition = function(t, e, i) {
  var r = i[0] - e[0], n = i[1] - e[1];
  return r * r + n * n >= this.minArea_;
};
te.handleDragEvent_ = function(t) {
  Ft.mouseOnly(t) && (this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new te.Event(
    te.EventType_.BOXDRAG,
    t.coordinate,
    t
  )));
};
te.prototype.getGeometry = function() {
  return this.box_.getGeometry();
};
te.prototype.onBoxEnd = _.nullFunction;
te.handleUpEvent_ = function(t) {
  return Ft.mouseOnly(t) ? (this.box_.setMap(null), this.boxEndCondition_(
    t,
    this.startPixel_,
    t.pixel
  ) && (this.onBoxEnd(t), this.dispatchEvent(new te.Event(
    te.EventType_.BOXEND,
    t.coordinate,
    t
  ))), !1) : !0;
};
te.handleDownEvent_ = function(t) {
  return Ft.mouseOnly(t) && Ft.mouseActionButton(t) && this.condition_(t) ? (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new te.Event(
    te.EventType_.BOXSTART,
    t.coordinate,
    t
  )), !0) : !1;
};
te.EventType_ = {
  /**
   * Triggered upon drag box start.
   * @event ol.interaction.DragBox.Event#boxstart
   * @api
   */
  BOXSTART: "boxstart",
  /**
   * Triggered on drag when box is active.
   * @event ol.interaction.DragBox.Event#boxdrag
   * @api
   */
  BOXDRAG: "boxdrag",
  /**
   * Triggered upon drag box end.
   * @event ol.interaction.DragBox.Event#boxend
   * @api
   */
  BOXEND: "boxend"
};
te.Event = function(t, e, i) {
  ve.call(this, t), this.coordinate = e, this.mapBrowserEvent = i;
};
_.inherits(te.Event, ve);
var Zn = function(t) {
  var e = t || {}, i = e.condition ? e.condition : Ft.shiftKeyOnly;
  this.duration_ = e.duration !== void 0 ? e.duration : 200, this.out_ = e.out !== void 0 ? e.out : !1, te.call(this, {
    condition: i,
    className: e.className || "ol-dragzoom"
  });
};
_.inherits(Zn, te);
Zn.prototype.onBoxEnd = function() {
  var t = this.getMap(), e = (
    /** @type {!ol.View} */
    t.getView()
  ), i = (
    /** @type {!ol.Size} */
    t.getSize()
  ), r = this.getGeometry().getExtent();
  if (this.out_) {
    var n = e.calculateExtent(i), a = g.createOrUpdateFromCoordinates([
      t.getPixelFromCoordinate(g.getBottomLeft(r)),
      t.getPixelFromCoordinate(g.getTopRight(r))
    ]), o = e.getResolutionForExtent(a, i);
    g.scaleFromCenter(n, 1 / o), r = n;
  }
  var s = e.constrainResolution(
    e.getResolutionForExtent(r, i)
  ), l = g.getCenter(r);
  l = e.constrainCenter(l), e.animate({
    resolution: s,
    center: l,
    duration: this.duration_,
    easing: ce.easeOut
  });
};
var yr = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}, Fn = function(t) {
  gt.call(this, {
    handleEvent: Fn.handleEvent
  });
  var e = t || {};
  this.defaultCondition_ = function(i) {
    return Ft.noModifierKeys(i) && Ft.targetNotEditable(i);
  }, this.condition_ = e.condition !== void 0 ? e.condition : this.defaultCondition_, this.duration_ = e.duration !== void 0 ? e.duration : 100, this.pixelDelta_ = e.pixelDelta !== void 0 ? e.pixelDelta : 128;
};
_.inherits(Fn, gt);
Fn.handleEvent = function(t) {
  var e = !1;
  if (t.type == it.KEYDOWN) {
    var i = t.originalEvent, r = i.keyCode;
    if (this.condition_(t) && (r == yr.DOWN || r == yr.LEFT || r == yr.RIGHT || r == yr.UP)) {
      var n = t.map, a = n.getView(), o = a.getResolution() * this.pixelDelta_, s = 0, l = 0;
      r == yr.DOWN ? l = -o : r == yr.LEFT ? s = -o : r == yr.RIGHT ? s = o : l = o;
      var h = [s, l];
      Mt.rotate(h, a.getRotation()), gt.pan(a, h, this.duration_), t.preventDefault(), e = !0;
    }
  }
  return !e;
};
var bn = function(t) {
  gt.call(this, {
    handleEvent: bn.handleEvent
  });
  var e = t || {};
  this.condition_ = e.condition ? e.condition : Ft.targetNotEditable, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 100;
};
_.inherits(bn, gt);
bn.handleEvent = function(t) {
  var e = !1;
  if (t.type == it.KEYDOWN || t.type == it.KEYPRESS) {
    var i = t.originalEvent, r = i.charCode;
    if (this.condition_(t) && (r == 43 || r == 45)) {
      var n = t.map, a = r == 43 ? this.delta_ : -this.delta_, o = n.getView();
      gt.zoomByDelta(
        o,
        a,
        void 0,
        this.duration_
      ), t.preventDefault(), e = !0;
    }
  }
  return !e;
};
var Ti = function(t) {
  gt.call(this, {
    handleEvent: Ti.handleEvent
  });
  var e = t || {};
  this.delta_ = 0, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.timeout_ = e.timeout !== void 0 ? e.timeout : 80, this.useAnchor_ = e.useAnchor !== void 0 ? e.useAnchor : !0, this.constrainResolution_ = e.constrainResolution || !1, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_ = void 0, this.trackpadDeltaPerZoom_ = 300, this.trackpadZoomBuffer_ = 1.5;
};
_.inherits(Ti, gt);
Ti.handleEvent = function(t) {
  var e = t.type;
  if (e !== it.WHEEL && e !== it.MOUSEWHEEL)
    return !0;
  t.preventDefault();
  var i = t.map, r = (
    /** @type {WheelEvent} */
    t.originalEvent
  );
  this.useAnchor_ && (this.lastAnchor_ = t.coordinate);
  var n;
  if (t.type == it.WHEEL ? (n = r.deltaY, pt.FIREFOX && r.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (n /= pt.DEVICE_PIXEL_RATIO), r.deltaMode === WheelEvent.DOM_DELTA_LINE && (n *= 40)) : t.type == it.MOUSEWHEEL && (n = -r.wheelDeltaY, pt.SAFARI && (n /= 3)), n === 0)
    return !1;
  var a = Date.now();
  if (this.startTime_ === void 0 && (this.startTime_ = a), (!this.mode_ || a - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(n) < 4 ? Ti.Mode_.TRACKPAD : Ti.Mode_.WHEEL), this.mode_ === Ti.Mode_.TRACKPAD) {
    var o = i.getView();
    this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : o.setHint(Dt.INTERACTING, 1), this.trackpadTimeoutId_ = setTimeout(this.decrementInteractingHint_.bind(this), this.trackpadEventGap_);
    var s = o.getResolution() * Math.pow(2, n / this.trackpadDeltaPerZoom_), l = o.getMinResolution(), h = o.getMaxResolution(), u = 0;
    if (s < l ? (s = Math.max(s, l / this.trackpadZoomBuffer_), u = 1) : s > h && (s = Math.min(s, h * this.trackpadZoomBuffer_), u = -1), this.lastAnchor_) {
      var f = o.calculateCenterZoom(s, this.lastAnchor_);
      o.setCenter(o.constrainCenter(f));
    }
    return o.setResolution(s), u === 0 && this.constrainResolution_ && o.animate({
      resolution: o.constrainResolution(s, n > 0 ? -1 : 1),
      easing: ce.easeOut,
      anchor: this.lastAnchor_,
      duration: this.duration_
    }), u > 0 ? o.animate({
      resolution: l,
      easing: ce.easeOut,
      anchor: this.lastAnchor_,
      duration: 500
    }) : u < 0 && o.animate({
      resolution: h,
      easing: ce.easeOut,
      anchor: this.lastAnchor_,
      duration: 500
    }), this.startTime_ = a, !1;
  }
  this.delta_ += n;
  var c = Math.max(this.timeout_ - (a - this.startTime_), 0);
  return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, i), c), !1;
};
Ti.prototype.decrementInteractingHint_ = function() {
  this.trackpadTimeoutId_ = void 0;
  var t = this.getMap().getView();
  t.setHint(Dt.INTERACTING, -1);
};
Ti.prototype.handleWheelZoom_ = function(t) {
  var e = t.getView();
  e.getAnimating() && e.cancelAnimations();
  var i = _.MOUSEWHEELZOOM_MAXDELTA, r = Z.clamp(this.delta_, -i, i);
  gt.zoomByDelta(
    e,
    -r,
    this.lastAnchor_,
    this.duration_
  ), this.mode_ = void 0, this.delta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
};
Ti.prototype.setMouseAnchor = function(t) {
  this.useAnchor_ = t, t || (this.lastAnchor_ = null);
};
Ti.Mode_ = {
  TRACKPAD: "trackpad",
  WHEEL: "wheel"
};
var Ki = function(t) {
  Nt.call(this, {
    handleDownEvent: Ki.handleDownEvent_,
    handleDragEvent: Ki.handleDragEvent_,
    handleUpEvent: Ki.handleUpEvent_
  });
  var e = t || {};
  this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = e.threshold !== void 0 ? e.threshold : 0.3, this.duration_ = e.duration !== void 0 ? e.duration : 250;
};
_.inherits(Ki, Nt);
Ki.handleDragEvent_ = function(t) {
  var e = 0, i = this.targetPointers[0], r = this.targetPointers[1], n = Math.atan2(
    r.clientY - i.clientY,
    r.clientX - i.clientX
  );
  if (this.lastAngle_ !== void 0) {
    var a = n - this.lastAngle_;
    this.rotationDelta_ += a, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = a;
  }
  this.lastAngle_ = n;
  var o = t.map, s = o.getView();
  if (s.getConstraints().rotation !== Ei.disable) {
    var l = o.getViewport().getBoundingClientRect(), h = Nt.centroid(this.targetPointers);
    if (h[0] -= l.left, h[1] -= l.top, this.anchor_ = o.getCoordinateFromPixel(h), this.rotating_) {
      var u = s.getRotation();
      o.render(), gt.rotateWithoutConstraints(
        s,
        u + e,
        this.anchor_
      );
    }
  }
};
Ki.handleUpEvent_ = function(t) {
  if (this.targetPointers.length < 2) {
    var e = t.map, i = e.getView();
    if (i.setHint(Dt.INTERACTING, -1), this.rotating_) {
      var r = i.getRotation();
      gt.rotate(
        i,
        r,
        this.anchor_,
        this.duration_
      );
    }
    return !1;
  } else
    return !0;
};
Ki.handleDownEvent_ = function(t) {
  if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().setHint(Dt.INTERACTING, 1), !0;
  } else
    return !1;
};
Ki.prototype.shouldStopEvent = se.FALSE;
var zi = function(t) {
  Nt.call(this, {
    handleDownEvent: zi.handleDownEvent_,
    handleDragEvent: zi.handleDragEvent_,
    handleUpEvent: zi.handleUpEvent_
  });
  var e = t || {};
  this.constrainResolution_ = e.constrainResolution || !1, this.anchor_ = null, this.duration_ = e.duration !== void 0 ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
};
_.inherits(zi, Nt);
zi.handleDragEvent_ = function(t) {
  var e = 1, i = this.targetPointers[0], r = this.targetPointers[1], n = i.clientX - r.clientX, a = i.clientY - r.clientY, o = Math.sqrt(n * n + a * a);
  this.lastDistance_ !== void 0 && (e = this.lastDistance_ / o), this.lastDistance_ = o;
  var s = t.map, l = s.getView(), h = l.getResolution(), u = l.getMaxResolution(), f = l.getMinResolution(), c = h * e;
  c > u ? (e = u / h, c = u) : c < f && (e = f / h, c = f), e != 1 && (this.lastScaleDelta_ = e);
  var d = s.getViewport().getBoundingClientRect(), v = Nt.centroid(this.targetPointers);
  v[0] -= d.left, v[1] -= d.top, this.anchor_ = s.getCoordinateFromPixel(v), s.render(), gt.zoomWithoutConstraints(l, c, this.anchor_);
};
zi.handleUpEvent_ = function(t) {
  if (this.targetPointers.length < 2) {
    var e = t.map, i = e.getView();
    i.setHint(Dt.INTERACTING, -1);
    var r = i.getResolution();
    if (this.constrainResolution_ || r < i.getMinResolution() || r > i.getMaxResolution()) {
      var n = this.lastScaleDelta_ - 1;
      gt.zoom(
        i,
        r,
        this.anchor_,
        this.duration_,
        n
      );
    }
    return !1;
  } else
    return !0;
};
zi.handleDownEvent_ = function(t) {
  if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().setHint(Dt.INTERACTING, 1), !0;
  } else
    return !1;
};
zi.prototype.shouldStopEvent = se.FALSE;
var Ra = {};
Ra.defaults = function(t) {
  var e = t || {}, i = new ht(), r = new kr(-5e-3, 0.05, 100), n = e.altShiftDragRotate !== void 0 ? e.altShiftDragRotate : !0;
  n && i.push(new Hi());
  var a = e.doubleClickZoom !== void 0 ? e.doubleClickZoom : !0;
  a && i.push(new Dn({
    delta: e.zoomDelta,
    duration: e.zoomDuration
  }));
  var o = e.dragPan !== void 0 ? e.dragPan : !0;
  o && i.push(new Vi({
    kinetic: r
  }));
  var s = e.pinchRotate !== void 0 ? e.pinchRotate : !0;
  s && i.push(new Ki());
  var l = e.pinchZoom !== void 0 ? e.pinchZoom : !0;
  l && i.push(new zi({
    constrainResolution: e.constrainResolution,
    duration: e.zoomDuration
  }));
  var h = e.keyboard !== void 0 ? e.keyboard : !0;
  h && (i.push(new Fn()), i.push(new bn({
    delta: e.zoomDelta,
    duration: e.zoomDuration
  })));
  var u = e.mouseWheelZoom !== void 0 ? e.mouseWheelZoom : !0;
  u && i.push(new Ti({
    constrainResolution: e.constrainResolution,
    duration: e.zoomDuration
  }));
  var f = e.shiftDragZoom !== void 0 ? e.shiftDragZoom : !0;
  return f && i.push(new Zn({
    duration: e.zoomDuration
  })), i;
};
var ki = function(t, e, i, r) {
  oe.call(this), this.extent = t, this.pixelRatio_ = i, this.resolution = e, this.state = r;
};
_.inherits(ki, oe);
ki.prototype.changed = function() {
  this.dispatchEvent(it.CHANGE);
};
ki.prototype.getExtent = function() {
  return this.extent;
};
ki.prototype.getImage = function() {
};
ki.prototype.getPixelRatio = function() {
  return this.pixelRatio_;
};
ki.prototype.getResolution = function() {
  return (
    /** @type {number} */
    this.resolution
  );
};
ki.prototype.getState = function() {
  return this.state;
};
ki.prototype.load = function() {
};
var Ve = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3
}, Xr = function(t, e, i, r, n) {
  this.loader_ = n !== void 0 ? n : null;
  var a = n !== void 0 ? Ve.IDLE : Ve.LOADED;
  ki.call(this, t, e, i, a), this.canvas_ = r, this.error_ = null;
};
_.inherits(Xr, ki);
Xr.prototype.getError = function() {
  return this.error_;
};
Xr.prototype.handleLoad_ = function(t) {
  t ? (this.error_ = t, this.state = Ve.ERROR) : this.state = Ve.LOADED, this.changed();
};
Xr.prototype.load = function() {
  this.state == Ve.IDLE && (this.state = Ve.LOADING, this.changed(), this.loader_(this.handleLoad_.bind(this)));
};
Xr.prototype.getImage = function() {
  return this.canvas_;
};
var xo = {
  IMAGE: "image",
  VECTOR: "vector"
}, en = function(t, e, i, r, n) {
  ve.call(this, t), this.vectorContext = e, this.frameState = i, this.context = r, this.glContext = n;
};
_.inherits(en, ve);
var le = function(t) {
  oe.call(this), this.highWaterMark = t !== void 0 ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
};
_.inherits(le, oe);
le.prototype.canExpireCache = function() {
  return this.getCount() > this.highWaterMark;
};
le.prototype.clear = function() {
  this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null, this.dispatchEvent(it.CLEAR);
};
le.prototype.containsKey = function(t) {
  return this.entries_.hasOwnProperty(t);
};
le.prototype.forEach = function(t, e) {
  for (var i = this.oldest_; i; )
    t.call(e, i.value_, i.key_, this), i = i.newer;
};
le.prototype.get = function(t) {
  var e = this.entries_[t];
  return Pt.assert(
    e !== void 0,
    15
  ), e === this.newest_ || (e === this.oldest_ ? (this.oldest_ = /** @type {ol.LRUCacheEntry} */
  this.oldest_.newer, this.oldest_.older = null) : (e.newer.older = e.older, e.older.newer = e.newer), e.newer = null, e.older = this.newest_, this.newest_.newer = e, this.newest_ = e), e.value_;
};
le.prototype.remove = function(t) {
  var e = this.entries_[t];
  return Pt.assert(e !== void 0, 15), e === this.newest_ ? (this.newest_ = /** @type {ol.LRUCacheEntry} */
  e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = /** @type {ol.LRUCacheEntry} */
  e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
};
le.prototype.getCount = function() {
  return this.count_;
};
le.prototype.getKeys = function() {
  var t = new Array(this.count_), e = 0, i;
  for (i = this.newest_; i; i = i.older)
    t[e++] = i.key_;
  return t;
};
le.prototype.getValues = function() {
  var t = new Array(this.count_), e = 0, i;
  for (i = this.newest_; i; i = i.older)
    t[e++] = i.value_;
  return t;
};
le.prototype.peekLast = function() {
  return this.oldest_.value_;
};
le.prototype.peekLastKey = function() {
  return this.oldest_.key_;
};
le.prototype.peekFirstKey = function() {
  return this.newest_.key_;
};
le.prototype.pop = function() {
  var t = this.oldest_;
  return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = /** @type {ol.LRUCacheEntry} */
  t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
};
le.prototype.replace = function(t, e) {
  this.get(t), this.entries_[t].value_ = e;
};
le.prototype.set = function(t, e) {
  Pt.assert(
    !(t in this.entries_),
    16
  );
  var i = (
    /** @type {ol.LRUCacheEntry} */
    {
      key_: t,
      newer: null,
      older: this.newest_,
      value_: e
    }
  );
  this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[t] = i, ++this.count_;
};
le.prototype.prune = function() {
  for (; this.canExpireCache(); )
    this.pop();
};
var D = {};
D.defaultFont = "10px sans-serif";
D.defaultFillStyle = [0, 0, 0, 1];
D.defaultLineCap = "round";
D.defaultLineDash = [];
D.defaultLineDashOffset = 0;
D.defaultLineJoin = "round";
D.defaultMiterLimit = 10;
D.defaultStrokeStyle = [0, 0, 0, 1];
D.defaultTextAlign = "center";
D.defaultTextBaseline = "middle";
D.defaultPadding = [0, 0, 0, 0];
D.defaultLineWidth = 1;
D.labelCache = new le();
D.checkedFonts_ = {};
D.measureContext_ = null;
D.textHeights_ = {};
D.checkFont = function() {
  var t = 60, e = D.checkedFonts_, i = D.labelCache, r = "32px monospace", n = "wmytzilWMYTZIL@#/&?$%10", a, o;
  function s(h) {
    var u = D.getMeasureContext();
    u.font = r, o = u.measureText(n).width;
    var f = !0;
    if (h != "monospace") {
      u.font = "32px " + h + ",monospace";
      var c = u.measureText(n).width;
      f = c != o;
    }
    return f;
  }
  function l() {
    var h = !0;
    for (var u in e)
      e[u] < t && (s(u) ? (e[u] = t, ut.clear(D.textHeights_), D.measureContext_ = null, i.clear()) : (++e[u], h = !1));
    h && (window.clearInterval(a), a = void 0);
  }
  return function(h) {
    var u = _e.getFontFamilies(h);
    if (u)
      for (var f = 0, c = u.length; f < c; ++f) {
        var d = u[f];
        d in e || (e[d] = t, s(d) || (e[d] = 0, a === void 0 && (a = window.setInterval(l, 32))));
      }
  };
}();
D.getMeasureContext = function() {
  var t = D.measureContext_;
  return t || (t = D.measureContext_ = At.createCanvasContext2D(1, 1)), t;
};
D.measureTextHeight = function() {
  var t, e = D.textHeights_;
  return function(i) {
    var r = e[i];
    return r == null && (t || (t = document.createElement("span"), t.textContent = "M", t.style.margin = t.style.padding = "0 !important", t.style.position = "absolute !important", t.style.left = "-99999px !important"), t.style.font = i, document.body.appendChild(t), r = e[i] = t.offsetHeight, document.body.removeChild(t)), r;
  };
}();
D.measureTextWidth = function(t, e) {
  var i = D.getMeasureContext();
  return t != i.font && (i.font = t), i.measureText(e).width;
};
D.rotateAtOffset = function(t, e, i, r) {
  e !== 0 && (t.translate(i, r), t.rotate(e), t.translate(-i, -r));
};
D.resetTransform_ = A.create();
D.drawImage = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f;
  i != 1 && (f = t.globalAlpha, t.globalAlpha = f * i), e && t.setTransform.apply(t, e), t.drawImage(r, n, a, o, s, l, h, o * u, s * u), f && (t.globalAlpha = f), e && t.setTransform.apply(t, D.resetTransform_);
};
var Xt = {};
Xt.HEX_COLOR_RE_ = /^#(?:[0-9a-f]{3,4}){1,2}$/i;
Xt.NAMED_COLOR_RE_ = /^([a-z]*)$/i;
Xt.asArray = function(t) {
  return Array.isArray(t) ? t : Xt.fromString(
    /** @type {string} */
    t
  );
};
Xt.asString = function(t) {
  return typeof t == "string" ? t : Xt.toString(t);
};
Xt.fromNamed = function(t) {
  var e = document.createElement("div");
  e.style.color = t, document.body.appendChild(e);
  var i = getComputedStyle(e).color;
  return document.body.removeChild(e), i;
};
Xt.fromString = /* @__PURE__ */ function() {
  var t = 1024, e = {}, i = 0;
  return (
    /**
     * @param {string} s String.
     * @return {ol.Color} Color.
     */
    function(r) {
      var n;
      if (e.hasOwnProperty(r))
        n = e[r];
      else {
        if (i >= t) {
          var a = 0, o;
          for (o in e)
            a++ & 3 || (delete e[o], --i);
        }
        n = Xt.fromStringInternal_(r), e[r] = n, ++i;
      }
      return n;
    }
  );
}();
Xt.fromStringInternal_ = function(t) {
  var e, i, r, n, a, o;
  if (Xt.NAMED_COLOR_RE_.exec(t) && (t = Xt.fromNamed(t)), Xt.HEX_COLOR_RE_.exec(t)) {
    var s = t.length - 1, l;
    s <= 4 ? l = 1 : l = 2;
    var h = s === 4 || s === 8;
    e = parseInt(t.substr(1 + 0 * l, l), 16), i = parseInt(t.substr(1 + 1 * l, l), 16), r = parseInt(t.substr(1 + 2 * l, l), 16), h ? n = parseInt(t.substr(1 + 3 * l, l), 16) : n = 255, l == 1 && (e = (e << 4) + e, i = (i << 4) + i, r = (r << 4) + r, h && (n = (n << 4) + n)), a = [e, i, r, n / 255];
  } else t.indexOf("rgba(") == 0 ? (o = t.slice(5, -1).split(",").map(Number), a = Xt.normalize(o)) : t.indexOf("rgb(") == 0 ? (o = t.slice(4, -1).split(",").map(Number), o.push(1), a = Xt.normalize(o)) : Pt.assert(!1, 14);
  return (
    /** @type {ol.Color} */
    a
  );
};
Xt.normalize = function(t, e) {
  var i = e || [];
  return i[0] = Z.clamp(t[0] + 0.5 | 0, 0, 255), i[1] = Z.clamp(t[1] + 0.5 | 0, 0, 255), i[2] = Z.clamp(t[2] + 0.5 | 0, 0, 255), i[3] = Z.clamp(t[3], 0, 1), i;
};
Xt.toString = function(t) {
  var e = t[0];
  e != (e | 0) && (e = e + 0.5 | 0);
  var i = t[1];
  i != (i | 0) && (i = i + 0.5 | 0);
  var r = t[2];
  r != (r | 0) && (r = r + 0.5 | 0);
  var n = t[3] === void 0 ? 1 : t[3];
  return "rgba(" + e + "," + i + "," + r + "," + n + ")";
};
var li = {};
li.asColorLike = function(t) {
  return li.isColorLike(t) ? (
    /** @type {string|CanvasPattern|CanvasGradient} */
    t
  ) : Xt.asString(
    /** @type {ol.Color} */
    t
  );
};
li.isColorLike = function(t) {
  return typeof t == "string" || t instanceof CanvasPattern || t instanceof CanvasGradient;
};
var zt = function() {
};
zt.prototype.drawCustom = function(t, e, i) {
};
zt.prototype.drawGeometry = function(t) {
};
zt.prototype.setStyle = function(t) {
};
zt.prototype.drawCircle = function(t, e) {
};
zt.prototype.drawFeature = function(t, e) {
};
zt.prototype.drawGeometryCollection = function(t, e) {
};
zt.prototype.drawLineString = function(t, e) {
};
zt.prototype.drawMultiLineString = function(t, e) {
};
zt.prototype.drawMultiPoint = function(t, e) {
};
zt.prototype.drawMultiPolygon = function(t, e) {
};
zt.prototype.drawPoint = function(t, e) {
};
zt.prototype.drawPolygon = function(t, e) {
};
zt.prototype.drawText = function(t, e) {
};
zt.prototype.setFillStrokeStyle = function(t, e) {
};
zt.prototype.setImageStyle = function(t, e) {
};
zt.prototype.setTextStyle = function(t, e) {
};
var jt = function(t, e, i, r, n) {
  zt.call(this), this.context_ = t, this.pixelRatio_ = e, this.extent_ = i, this.transform_ = r, this.viewRotation_ = n, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = 0, this.imageSnapToPixel_ = !1, this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = 0, this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = A.create();
};
_.inherits(jt, zt);
jt.prototype.drawImages_ = function(t, e, i, r) {
  if (this.image_) {
    var n = re.transform2D(
      t,
      e,
      i,
      2,
      this.transform_,
      this.pixelCoordinates_
    ), a = this.context_, o = this.tmpLocalTransform_, s = a.globalAlpha;
    this.imageOpacity_ != 1 && (a.globalAlpha = s * this.imageOpacity_);
    var l = this.imageRotation_;
    this.imageRotateWithView_ && (l += this.viewRotation_);
    var h, u;
    for (h = 0, u = n.length; h < u; h += 2) {
      var f = n[h] - this.imageAnchorX_, c = n[h + 1] - this.imageAnchorY_;
      if (this.imageSnapToPixel_ && (f = Math.round(f), c = Math.round(c)), l !== 0 || this.imageScale_ != 1) {
        var d = f + this.imageAnchorX_, v = c + this.imageAnchorY_;
        A.compose(
          o,
          d,
          v,
          this.imageScale_,
          this.imageScale_,
          l,
          -d,
          -v
        ), a.setTransform.apply(a, o);
      }
      a.drawImage(
        this.image_,
        this.imageOriginX_,
        this.imageOriginY_,
        this.imageWidth_,
        this.imageHeight_,
        f,
        c,
        this.imageWidth_,
        this.imageHeight_
      );
    }
    (l !== 0 || this.imageScale_ != 1) && a.setTransform(1, 0, 0, 1, 0, 0), this.imageOpacity_ != 1 && (a.globalAlpha = s);
  }
};
jt.prototype.drawText_ = function(t, e, i, r) {
  if (!(!this.textState_ || this.text_ === "")) {
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    var n = re.transform2D(
      t,
      e,
      i,
      r,
      this.transform_,
      this.pixelCoordinates_
    ), a = this.context_, o = this.textRotation_;
    for (this.textRotateWithView_ && (o += this.viewRotation_); e < i; e += r) {
      var s = n[e] + this.textOffsetX_, l = n[e + 1] + this.textOffsetY_;
      if (o !== 0 || this.textScale_ != 1) {
        var h = A.compose(
          this.tmpLocalTransform_,
          s,
          l,
          this.textScale_,
          this.textScale_,
          o,
          -s,
          -l
        );
        a.setTransform.apply(a, h);
      }
      this.textStrokeState_ && a.strokeText(this.text_, s, l), this.textFillState_ && a.fillText(this.text_, s, l);
    }
    (o !== 0 || this.textScale_ != 1) && a.setTransform(1, 0, 0, 1, 0, 0);
  }
};
jt.prototype.moveToLineTo_ = function(t, e, i, r, n) {
  var a = this.context_, o = re.transform2D(
    t,
    e,
    i,
    r,
    this.transform_,
    this.pixelCoordinates_
  );
  a.moveTo(o[0], o[1]);
  var s = o.length;
  n && (s -= 2);
  for (var l = 2; l < s; l += 2)
    a.lineTo(o[l], o[l + 1]);
  return n && a.closePath(), i;
};
jt.prototype.drawRings_ = function(t, e, i, r) {
  var n, a;
  for (n = 0, a = i.length; n < a; ++n)
    e = this.moveToLineTo_(
      t,
      e,
      i[n],
      r,
      !0
    );
  return e;
};
jt.prototype.drawCircle = function(t) {
  if (g.intersects(this.extent_, t.getExtent())) {
    if (this.fillState_ || this.strokeState_) {
      this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
      var e = Ct.transform2D(
        t,
        this.transform_,
        this.pixelCoordinates_
      ), i = e[2] - e[0], r = e[3] - e[1], n = Math.sqrt(i * i + r * r), a = this.context_;
      a.beginPath(), a.arc(
        e[0],
        e[1],
        n,
        0,
        2 * Math.PI
      ), this.fillState_ && a.fill(), this.strokeState_ && a.stroke();
    }
    this.text_ !== "" && this.drawText_(t.getCenter(), 0, 2, 2);
  }
};
jt.prototype.setStyle = function(t) {
  this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText());
};
jt.prototype.drawGeometry = function(t) {
  var e = t.getType();
  switch (e) {
    case j.POINT:
      this.drawPoint(
        /** @type {ol.geom.Point} */
        t
      );
      break;
    case j.LINE_STRING:
      this.drawLineString(
        /** @type {ol.geom.LineString} */
        t
      );
      break;
    case j.POLYGON:
      this.drawPolygon(
        /** @type {ol.geom.Polygon} */
        t
      );
      break;
    case j.MULTI_POINT:
      this.drawMultiPoint(
        /** @type {ol.geom.MultiPoint} */
        t
      );
      break;
    case j.MULTI_LINE_STRING:
      this.drawMultiLineString(
        /** @type {ol.geom.MultiLineString} */
        t
      );
      break;
    case j.MULTI_POLYGON:
      this.drawMultiPolygon(
        /** @type {ol.geom.MultiPolygon} */
        t
      );
      break;
    case j.GEOMETRY_COLLECTION:
      this.drawGeometryCollection(
        /** @type {ol.geom.GeometryCollection} */
        t
      );
      break;
    case j.CIRCLE:
      this.drawCircle(
        /** @type {ol.geom.Circle} */
        t
      );
      break;
  }
};
jt.prototype.drawFeature = function(t, e) {
  var i = e.getGeometryFunction()(t);
  !i || !g.intersects(this.extent_, i.getExtent()) || (this.setStyle(e), this.drawGeometry(i));
};
jt.prototype.drawGeometryCollection = function(t) {
  var e = t.getGeometriesArray(), i, r;
  for (i = 0, r = e.length; i < r; ++i)
    this.drawGeometry(e[i]);
};
jt.prototype.drawPoint = function(t) {
  var e = t.getFlatCoordinates(), i = t.getStride();
  this.image_ && this.drawImages_(e, 0, e.length, i), this.text_ !== "" && this.drawText_(e, 0, e.length, i);
};
jt.prototype.drawMultiPoint = function(t) {
  var e = t.getFlatCoordinates(), i = t.getStride();
  this.image_ && this.drawImages_(e, 0, e.length, i), this.text_ !== "" && this.drawText_(e, 0, e.length, i);
};
jt.prototype.drawLineString = function(t) {
  if (g.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var e = this.context_, i = t.getFlatCoordinates();
      e.beginPath(), this.moveToLineTo_(
        i,
        0,
        i.length,
        t.getStride(),
        !1
      ), e.stroke();
    }
    if (this.text_ !== "") {
      var r = t.getFlatMidpoint();
      this.drawText_(r, 0, 2, 2);
    }
  }
};
jt.prototype.drawMultiLineString = function(t) {
  var e = t.getExtent();
  if (g.intersects(this.extent_, e)) {
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      var i = this.context_, r = t.getFlatCoordinates(), n = 0, a = t.getEnds(), o = t.getStride();
      i.beginPath();
      var s, l;
      for (s = 0, l = a.length; s < l; ++s)
        n = this.moveToLineTo_(
          r,
          n,
          a[s],
          o,
          !1
        );
      i.stroke();
    }
    if (this.text_ !== "") {
      var h = t.getFlatMidpoints();
      this.drawText_(h, 0, h.length, 2);
    }
  }
};
jt.prototype.drawPolygon = function(t) {
  if (g.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
      this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
      var e = this.context_;
      e.beginPath(), this.drawRings_(
        t.getOrientedFlatCoordinates(),
        0,
        t.getEnds(),
        t.getStride()
      ), this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
    }
    if (this.text_ !== "") {
      var i = t.getFlatInteriorPoint();
      this.drawText_(i, 0, 2, 2);
    }
  }
};
jt.prototype.drawMultiPolygon = function(t) {
  if (g.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
      this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
      var e = this.context_, i = t.getOrientedFlatCoordinates(), r = 0, n = t.getEndss(), a = t.getStride(), o, s;
      for (e.beginPath(), o = 0, s = n.length; o < s; ++o) {
        var l = n[o];
        r = this.drawRings_(i, r, l, a);
      }
      this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
    }
    if (this.text_ !== "") {
      var h = t.getFlatInteriorPoints();
      this.drawText_(h, 0, h.length, 2);
    }
  }
};
jt.prototype.setContextFillState_ = function(t) {
  var e = this.context_, i = this.contextFillState_;
  i ? i.fillStyle != t.fillStyle && (i.fillStyle = e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = {
    fillStyle: t.fillStyle
  });
};
jt.prototype.setContextStrokeState_ = function(t) {
  var e = this.context_, i = this.contextStrokeState_;
  i ? (i.lineCap != t.lineCap && (i.lineCap = e.lineCap = t.lineCap), pt.CANVAS_LINE_DASH && (st.equals(
    i.lineDash,
    t.lineDash
  ) || e.setLineDash(i.lineDash = t.lineDash), i.lineDashOffset != t.lineDashOffset && (i.lineDashOffset = e.lineDashOffset = t.lineDashOffset)), i.lineJoin != t.lineJoin && (i.lineJoin = e.lineJoin = t.lineJoin), i.lineWidth != t.lineWidth && (i.lineWidth = e.lineWidth = t.lineWidth), i.miterLimit != t.miterLimit && (i.miterLimit = e.miterLimit = t.miterLimit), i.strokeStyle != t.strokeStyle && (i.strokeStyle = e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, pt.CANVAS_LINE_DASH && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = {
    lineCap: t.lineCap,
    lineDash: t.lineDash,
    lineDashOffset: t.lineDashOffset,
    lineJoin: t.lineJoin,
    lineWidth: t.lineWidth,
    miterLimit: t.miterLimit,
    strokeStyle: t.strokeStyle
  });
};
jt.prototype.setContextTextState_ = function(t) {
  var e = this.context_, i = this.contextTextState_, r = t.textAlign ? t.textAlign : D.defaultTextAlign;
  i ? (i.font != t.font && (i.font = e.font = t.font), i.textAlign != r && (i.textAlign = r), i.textBaseline != t.textBaseline && (i.textBaseline = e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = r, e.textBaseline = t.textBaseline, this.contextTextState_ = {
    font: t.font,
    textAlign: r,
    textBaseline: t.textBaseline
  });
};
jt.prototype.setFillStrokeStyle = function(t, e) {
  if (!t)
    this.fillState_ = null;
  else {
    var i = t.getColor();
    this.fillState_ = {
      fillStyle: li.asColorLike(i || D.defaultFillStyle)
    };
  }
  if (!e)
    this.strokeState_ = null;
  else {
    var r = e.getColor(), n = e.getLineCap(), a = e.getLineDash(), o = e.getLineDashOffset(), s = e.getLineJoin(), l = e.getWidth(), h = e.getMiterLimit();
    this.strokeState_ = {
      lineCap: n !== void 0 ? n : D.defaultLineCap,
      lineDash: a || D.defaultLineDash,
      lineDashOffset: o || D.defaultLineDashOffset,
      lineJoin: s !== void 0 ? s : D.defaultLineJoin,
      lineWidth: this.pixelRatio_ * (l !== void 0 ? l : D.defaultLineWidth),
      miterLimit: h !== void 0 ? h : D.defaultMiterLimit,
      strokeStyle: li.asColorLike(r || D.defaultStrokeStyle)
    };
  }
};
jt.prototype.setImageStyle = function(t) {
  if (!t)
    this.image_ = null;
  else {
    var e = t.getAnchor(), i = t.getImage(1), r = t.getOrigin(), n = t.getSize();
    this.imageAnchorX_ = e[0], this.imageAnchorY_ = e[1], this.imageHeight_ = n[1], this.image_ = i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = r[0], this.imageOriginY_ = r[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation(), this.imageScale_ = t.getScale() * this.pixelRatio_, this.imageSnapToPixel_ = t.getSnapToPixel(), this.imageWidth_ = n[0];
  }
};
jt.prototype.setTextStyle = function(t) {
  if (!t)
    this.text_ = "";
  else {
    var e = t.getFill();
    if (!e)
      this.textFillState_ = null;
    else {
      var i = e.getColor();
      this.textFillState_ = {
        fillStyle: li.asColorLike(i || D.defaultFillStyle)
      };
    }
    var r = t.getStroke();
    if (!r)
      this.textStrokeState_ = null;
    else {
      var n = r.getColor(), a = r.getLineCap(), o = r.getLineDash(), s = r.getLineDashOffset(), l = r.getLineJoin(), h = r.getWidth(), u = r.getMiterLimit();
      this.textStrokeState_ = {
        lineCap: a !== void 0 ? a : D.defaultLineCap,
        lineDash: o || D.defaultLineDash,
        lineDashOffset: s || D.defaultLineDashOffset,
        lineJoin: l !== void 0 ? l : D.defaultLineJoin,
        lineWidth: h !== void 0 ? h : D.defaultLineWidth,
        miterLimit: u !== void 0 ? u : D.defaultMiterLimit,
        strokeStyle: li.asColorLike(n || D.defaultStrokeStyle)
      };
    }
    var f = t.getFont(), c = t.getOffsetX(), d = t.getOffsetY(), v = t.getRotateWithView(), m = t.getRotation(), p = t.getScale(), E = t.getText(), y = t.getTextAlign(), R = t.getTextBaseline();
    this.textState_ = {
      font: f !== void 0 ? f : D.defaultFont,
      textAlign: y !== void 0 ? y : D.defaultTextAlign,
      textBaseline: R !== void 0 ? R : D.defaultTextBaseline
    }, this.text_ = E !== void 0 ? E : "", this.textOffsetX_ = c !== void 0 ? this.pixelRatio_ * c : 0, this.textOffsetY_ = d !== void 0 ? this.pixelRatio_ * d : 0, this.textRotateWithView_ = v !== void 0 ? v : !1, this.textRotation_ = m !== void 0 ? m : 0, this.textScale_ = this.pixelRatio_ * (p !== void 0 ? p : 1);
  }
};
var Ze = function(t) {
  gi.call(this), this.layer_ = t;
};
_.inherits(Ze, gi);
Ze.prototype.forEachFeatureAtCoordinate = _.nullFunction;
Ze.prototype.hasFeatureAtCoordinate = se.FALSE;
Ze.prototype.createLoadedTileFinder = function(t, e, i) {
  return (
    /**
     * @param {number} zoom Zoom level.
     * @param {ol.TileRange} tileRange Tile range.
     * @return {boolean} The tile range is fully loaded.
     */
    function(r, n) {
      function a(o) {
        i[r] || (i[r] = {}), i[r][o.tileCoord.toString()] = o;
      }
      return t.forEachLoadedTile(e, r, n, a);
    }
  );
};
Ze.prototype.getLayer = function() {
  return this.layer_;
};
Ze.prototype.handleImageChange_ = function(t) {
  var e = (
    /** @type {ol.Image} */
    t.target
  );
  e.getState() === Ve.LOADED && this.renderIfReadyAndVisible();
};
Ze.prototype.loadImage = function(t) {
  var e = t.getState();
  return e != Ve.LOADED && e != Ve.ERROR && L.listen(
    t,
    it.CHANGE,
    this.handleImageChange_,
    this
  ), e == Ve.IDLE && (t.load(), e = t.getState()), e == Ve.LOADED;
};
Ze.prototype.renderIfReadyAndVisible = function() {
  var t = this.getLayer();
  t.getVisible() && t.getSourceState() == Ur.READY && this.changed();
};
Ze.prototype.scheduleExpireCache = function(t, e) {
  if (e.canExpireCache()) {
    var i = (function(r, n, a) {
      var o = _.getUid(r).toString();
      o in a.usedTiles && r.expireCache(
        a.viewState.projection,
        a.usedTiles[o]
      );
    }).bind(null, e);
    t.postRenderFunctions.push(
      /** @type {ol.PostRenderFunction} */
      i
    );
  }
};
Ze.prototype.updateLogos = function(t, e) {
  var i = e.getLogo();
  i !== void 0 && (typeof i == "string" ? t.logos[i] = "" : i && (Pt.assert(typeof i.href == "string", 44), Pt.assert(typeof i.src == "string", 45), t.logos[i.src] = i.href));
};
Ze.prototype.updateUsedTiles = function(t, e, i, r) {
  var n = _.getUid(e).toString(), a = i.toString();
  n in t ? a in t[n] ? t[n][a].extend(r) : t[n][a] = r : (t[n] = {}, t[n][a] = r);
};
Ze.prototype.manageTilePyramid = function(t, e, i, r, n, a, o, s, l, h) {
  var u = _.getUid(e).toString();
  u in t.wantedTiles || (t.wantedTiles[u] = {});
  var f = t.wantedTiles[u], c = t.tileQueue, d = i.getMinZoom(), v, m, p, E, y, R;
  for (R = d; R <= o; ++R)
    for (m = i.getTileRangeForExtentAndZ(a, R, m), p = i.getResolution(R), E = m.minX; E <= m.maxX; ++E)
      for (y = m.minY; y <= m.maxY; ++y)
        o - R <= s ? (v = e.getTile(R, E, y, r, n), v.getState() == H.IDLE && (f[v.getKey()] = !0, c.isKeyQueued(v.getKey()) || c.enqueue([
          v,
          u,
          i.getTileCoordCenter(v.tileCoord),
          p
        ])), l !== void 0 && l.call(h, v)) : e.useTile(R, E, y, n);
};
var Je = function(t) {
  Ze.call(this, t), this.renderedResolution, this.transform_ = A.create();
};
_.inherits(Je, Ze);
Je.prototype.clip = function(t, e, i) {
  var r = e.pixelRatio, n = e.size[0] * r, a = e.size[1] * r, o = e.viewState.rotation, s = g.getTopLeft(
    /** @type {ol.Extent} */
    i
  ), l = g.getTopRight(
    /** @type {ol.Extent} */
    i
  ), h = g.getBottomRight(
    /** @type {ol.Extent} */
    i
  ), u = g.getBottomLeft(
    /** @type {ol.Extent} */
    i
  );
  A.apply(e.coordinateToPixelTransform, s), A.apply(e.coordinateToPixelTransform, l), A.apply(e.coordinateToPixelTransform, h), A.apply(e.coordinateToPixelTransform, u), t.save(), D.rotateAtOffset(t, -o, n / 2, a / 2), t.beginPath(), t.moveTo(s[0] * r, s[1] * r), t.lineTo(l[0] * r, l[1] * r), t.lineTo(h[0] * r, h[1] * r), t.lineTo(u[0] * r, u[1] * r), t.clip(), D.rotateAtOffset(t, o, n / 2, a / 2);
};
Je.prototype.dispatchComposeEvent_ = function(t, e, i, r) {
  var n = this.getLayer();
  if (n.hasListener(t)) {
    var a = i.size[0] * i.pixelRatio, o = i.size[1] * i.pixelRatio, s = i.viewState.rotation;
    D.rotateAtOffset(e, -s, a / 2, o / 2);
    var l = r !== void 0 ? r : this.getTransform(i, 0), h = new jt(
      e,
      i.pixelRatio,
      i.extent,
      l,
      i.viewState.rotation
    ), u = new en(
      t,
      h,
      i,
      e,
      null
    );
    n.dispatchEvent(u), D.rotateAtOffset(e, s, a / 2, o / 2);
  }
};
Je.prototype.forEachLayerAtCoordinate = function(t, e, i, r) {
  var n = this.forEachFeatureAtCoordinate(
    t,
    e,
    0,
    se.TRUE,
    this
  );
  if (n)
    return i.call(r, this.getLayer(), null);
};
Je.prototype.postCompose = function(t, e, i, r) {
  this.dispatchComposeEvent_(
    Ci.POSTCOMPOSE,
    t,
    e,
    r
  );
};
Je.prototype.preCompose = function(t, e, i) {
  this.dispatchComposeEvent_(
    Ci.PRECOMPOSE,
    t,
    e,
    i
  );
};
Je.prototype.dispatchRenderEvent = function(t, e, i) {
  this.dispatchComposeEvent_(
    Ci.RENDER,
    t,
    e,
    i
  );
};
Je.prototype.getTransform = function(t, e) {
  var i = t.viewState, r = t.pixelRatio, n = r * t.size[0] / 2, a = r * t.size[1] / 2, o = r / i.resolution, s = -o, l = -i.rotation, h = -i.center[0] + e, u = -i.center[1];
  return A.compose(this.transform_, n, a, o, s, l, h, u);
};
Je.prototype.composeFrame = function(t, e, i) {
};
Je.prototype.prepareFrame = function(t, e) {
};
var Ai = function(t) {
  Je.call(this, t), this.coordinateToCanvasPixelTransform = A.create(), this.hitCanvasContext_ = null;
};
_.inherits(Ai, Je);
Ai.prototype.composeFrame = function(t, e, i) {
  this.preCompose(i, t);
  var r = this.getImage();
  if (r) {
    var n = e.extent, a = n !== void 0 && !g.containsExtent(n, t.extent) && g.intersects(n, t.extent);
    a && this.clip(
      i,
      t,
      /** @type {ol.Extent} */
      n
    );
    var o = this.getImageTransform(), s = i.globalAlpha;
    i.globalAlpha = e.opacity;
    var l = o[4], h = o[5], u = r.width * o[0], f = r.height * o[3];
    i.drawImage(
      r,
      0,
      0,
      +r.width,
      +r.height,
      Math.round(l),
      Math.round(h),
      Math.round(u),
      Math.round(f)
    ), i.globalAlpha = s, a && i.restore();
  }
  this.postCompose(i, t, e);
};
Ai.prototype.getImage = function() {
};
Ai.prototype.getImageTransform = function() {
};
Ai.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  var a = this.getLayer(), o = a.getSource(), s = e.viewState.resolution, l = e.viewState.rotation, h = e.skippedFeatureUids;
  return o.forEachFeatureAtCoordinate(
    t,
    s,
    l,
    i,
    h,
    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @return {?} Callback result.
     */
    function(u) {
      return r.call(n, u, a);
    }
  );
};
Ai.prototype.forEachLayerAtCoordinate = function(t, e, i, r) {
  if (this.getImage()) {
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== _.nullFunction)
      return Je.prototype.forEachLayerAtCoordinate.apply(this, arguments);
    var n = A.apply(this.coordinateToCanvasPixelTransform, t.slice());
    Mt.scale(n, e.viewState.resolution / this.renderedResolution), this.hitCanvasContext_ || (this.hitCanvasContext_ = At.createCanvasContext2D(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.getImage(), n[0], n[1], 1, 1, 0, 0, 1, 1);
    var a = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
    return a[3] > 0 ? i.call(r, this.getLayer(), a) : void 0;
  }
};
var Ri = function(t) {
  Ai.call(this, t), this.image_ = null, this.imageTransform_ = A.create(), this.skippedFeatures_ = [], this.vectorRenderer_ = null;
};
_.inherits(Ri, Ai);
Ri.handles = function(t, e) {
  return t === ri.CANVAS && (e.getType() === Di.IMAGE || e.getType() === Di.VECTOR && /** @type {ol.layer.Vector} */
  e.getRenderMode() === xo.IMAGE);
};
Ri.create = function(t, e) {
  var i = new Ri(
    /** @type {ol.layer.Image} */
    e
  );
  if (e.getType() === Di.VECTOR)
    for (var r = Se.getLayerRendererPlugins(), n = 0, a = r.length; n < a; ++n) {
      var o = (
        /** @type {Object.<string, Function>} */
        r[n]
      );
      o !== Ri && o.handles(ri.CANVAS, e) && i.setVectorRenderer(o.create(t, e));
    }
  return i;
};
Ri.prototype.getImage = function() {
  return this.image_ ? this.image_.getImage() : null;
};
Ri.prototype.getImageTransform = function() {
  return this.imageTransform_;
};
Ri.prototype.prepareFrame = function(t, e) {
  var i = t.pixelRatio, r = t.size, n = t.viewState, a = n.center, o = n.resolution, s, l = (
    /** @type {ol.layer.Image} */
    this.getLayer()
  ), h = l.getSource(), u = t.viewHints, f = t.extent;
  if (e.extent !== void 0 && (f = g.getIntersection(
    f,
    e.extent
  )), !u[Dt.ANIMATING] && !u[Dt.INTERACTING] && !g.isEmpty(f)) {
    var c = n.projection;
    if (!_.ENABLE_RASTER_REPROJECTION) {
      var d = h.getProjection();
      d && (c = d);
    }
    var v = this.vectorRenderer_;
    if (v) {
      var m = v.context, p = (
        /** @type {olx.FrameState} */
        ut.assign({}, t, {
          size: [
            g.getWidth(f) / o,
            g.getHeight(f) / o
          ],
          viewState: (
            /** @type {olx.ViewState} */
            ut.assign({}, t.viewState, {
              rotation: 0
            })
          )
        })
      ), E = Object.keys(p.skippedFeatureUids).sort();
      v.prepareFrame(p, e) && (v.replayGroupChanged || !st.equals(E, this.skippedFeatures_)) && (m.canvas.width = p.size[0] * i, m.canvas.height = p.size[1] * i, v.composeFrame(p, e, m), this.image_ = new Xr(f, o, i, m.canvas), this.skippedFeatures_ = E);
    } else if (s = h.getImage(
      f,
      o,
      i,
      c
    ), s) {
      var y = this.loadImage(s);
      y && (this.image_ = s);
    }
  }
  if (this.image_) {
    s = this.image_;
    var R = s.getExtent(), I = s.getResolution(), x = s.getPixelRatio(), C = i * I / (o * x), N = A.compose(
      this.imageTransform_,
      i * r[0] / 2,
      i * r[1] / 2,
      C,
      C,
      0,
      x * (R[0] - a[0]) / I,
      x * (a[1] - R[3]) / I
    );
    A.compose(
      this.coordinateToCanvasPixelTransform,
      i * r[0] / 2 - N[4],
      i * r[1] / 2 - N[5],
      i / o,
      -i / o,
      0,
      -a[0],
      -a[1]
    ), this.updateLogos(t, h), this.renderedResolution = I * i / x;
  }
  return !!this.image_;
};
Ri.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  return this.vectorRenderer_ ? this.vectorRenderer_.forEachFeatureAtCoordinate(t, e, i, r, n) : Ai.prototype.forEachFeatureAtCoordinate.call(this, t, e, i, r, n);
};
Ri.prototype.setVectorRenderer = function(t) {
  this.vectorRenderer_ = t;
};
var qi = function() {
  this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32;
};
qi.getKey = function(t, e, i) {
  var r = i ? Xt.asString(i) : "null";
  return e + ":" + t + ":" + r;
};
qi.prototype.clear = function() {
  this.cache_ = {}, this.cacheSize_ = 0;
};
qi.prototype.expire = function() {
  if (this.cacheSize_ > this.maxCacheSize_) {
    var t = 0, e, i;
    for (e in this.cache_)
      i = this.cache_[e], !(t++ & 3) && !i.hasListener() && (delete this.cache_[e], --this.cacheSize_);
  }
};
qi.prototype.get = function(t, e, i) {
  var r = qi.getKey(t, e, i);
  return r in this.cache_ ? this.cache_[r] : null;
};
qi.prototype.set = function(t, e, i, r) {
  var n = qi.getKey(t, e, i);
  this.cache_[n] = r, ++this.cacheSize_;
};
qi.prototype.setSize = function(t) {
  this.maxCacheSize_ = t, this.expire();
};
var xa = {};
xa.iconImageCache = new qi();
var kt = function(t, e) {
  tr.call(this), this.map_ = e, this.layerRenderers_ = {}, this.layerRendererListeners_ = {};
};
_.inherits(kt, tr);
kt.prototype.calculateMatrices2D = function(t) {
  var e = t.viewState, i = t.coordinateToPixelTransform, r = t.pixelToCoordinateTransform;
  A.compose(
    i,
    t.size[0] / 2,
    t.size[1] / 2,
    1 / e.resolution,
    -1 / e.resolution,
    -e.rotation,
    -e.center[0],
    -e.center[1]
  ), A.invert(
    A.setFromArray(r, i)
  );
};
kt.prototype.removeLayerRenderers = function() {
  for (var t in this.layerRenderers_)
    this.removeLayerRendererByKey_(t).dispose();
};
kt.expireIconCache_ = function(t, e) {
  var i = xa.iconImageCache;
  i.expire();
};
kt.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n, a, o) {
  var s, l = e.viewState, h = l.resolution;
  function u(N, w) {
    var X = _.getUid(N).toString(), U = e.layerStates[_.getUid(w)].managed;
    if (!(X in e.skippedFeatureUids && !U))
      return r.call(n, N, U ? w : null);
  }
  var f = l.projection, c = t;
  if (f.canWrapX()) {
    var d = f.getExtent(), v = g.getWidth(d), m = t[0];
    if (m < d[0] || m > d[2]) {
      var p = Math.ceil((d[0] - m) / v);
      c = [m + v * p, t[1]];
    }
  }
  var E = e.layerStatesArray, y = E.length, R;
  for (R = y - 1; R >= 0; --R) {
    var I = E[R], x = I.layer;
    if (ge.visibleAtResolution(I, h) && a.call(o, x)) {
      var C = this.getLayerRenderer(x);
      if (x.getSource() && (s = C.forEachFeatureAtCoordinate(
        x.getSource().getWrapX() ? c : t,
        e,
        i,
        u,
        n
      )), s)
        return s;
    }
  }
};
kt.prototype.forEachLayerAtPixel = function(t, e, i, r, n, a) {
};
kt.prototype.hasFeatureAtCoordinate = function(t, e, i, r, n) {
  var a = this.forEachFeatureAtCoordinate(
    t,
    e,
    i,
    se.TRUE,
    this,
    r,
    n
  );
  return a !== void 0;
};
kt.prototype.getLayerRenderer = function(t) {
  var e = _.getUid(t).toString();
  if (e in this.layerRenderers_)
    return this.layerRenderers_[e];
  for (var i = Se.getLayerRendererPlugins(), r, n = this.getType(), a = 0, o = i.length; a < o; ++a) {
    var s = i[a];
    if (s.handles(n, t)) {
      r = s.create(this, t);
      break;
    }
  }
  if (r)
    this.layerRenderers_[e] = r, this.layerRendererListeners_[e] = L.listen(
      r,
      it.CHANGE,
      this.handleLayerRendererChange_,
      this
    );
  else
    throw new Error("Unable to create renderer for layer: " + t.getType());
  return r;
};
kt.prototype.getLayerRendererByKey = function(t) {
  return this.layerRenderers_[t];
};
kt.prototype.getLayerRenderers = function() {
  return this.layerRenderers_;
};
kt.prototype.getMap = function() {
  return this.map_;
};
kt.prototype.getType = function() {
};
kt.prototype.handleLayerRendererChange_ = function() {
  this.map_.render();
};
kt.prototype.removeLayerRendererByKey_ = function(t) {
  var e = this.layerRenderers_[t];
  return delete this.layerRenderers_[t], L.unlistenByKey(this.layerRendererListeners_[t]), delete this.layerRendererListeners_[t], e;
};
kt.prototype.renderFrame = _.nullFunction;
kt.prototype.removeUnusedLayerRenderers_ = function(t, e) {
  var i;
  for (i in this.layerRenderers_)
    (!e || !(i in e.layerStates)) && this.removeLayerRendererByKey_(i).dispose();
};
kt.prototype.scheduleExpireIconCache = function(t) {
  t.postRenderFunctions.push(
    /** @type {ol.PostRenderFunction} */
    kt.expireIconCache_
  );
};
kt.prototype.scheduleRemoveUnusedLayerRenderers = function(t) {
  var e;
  for (e in this.layerRenderers_)
    if (!(e in t.layerStates)) {
      t.postRenderFunctions.push(
        /** @type {ol.PostRenderFunction} */
        this.removeUnusedLayerRenderers_.bind(this)
      );
      return;
    }
};
kt.sortByZIndex = function(t, e) {
  return t.zIndex - e.zIndex;
};
var Gi = function(t, e) {
  kt.call(this, t, e), this.context_ = At.createCanvasContext2D(), this.canvas_ = this.context_.canvas, this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = _e.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.renderedVisible_ = !0, this.transform_ = A.create();
};
_.inherits(Gi, kt);
Gi.handles = function(t) {
  return t === ri.CANVAS;
};
Gi.create = function(t, e) {
  return new Gi(t, e);
};
Gi.prototype.dispatchComposeEvent_ = function(t, e) {
  var i = this.getMap(), r = this.context_;
  if (i.hasListener(t)) {
    var n = e.extent, a = e.pixelRatio, o = e.viewState, s = o.rotation, l = this.getTransform(e), h = new jt(
      r,
      a,
      n,
      l,
      s
    ), u = new en(
      t,
      h,
      e,
      r,
      null
    );
    i.dispatchEvent(u);
  }
};
Gi.prototype.getTransform = function(t) {
  var e = t.viewState, i = this.canvas_.width / 2, r = this.canvas_.height / 2, n = t.pixelRatio / e.resolution, a = -n, o = -e.rotation, s = -e.center[0], l = -e.center[1];
  return A.compose(this.transform_, i, r, n, a, o, s, l);
};
Gi.prototype.getType = function() {
  return ri.CANVAS;
};
Gi.prototype.renderFrame = function(t) {
  if (!t) {
    this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1);
    return;
  }
  var e = this.context_, i = t.pixelRatio, r = Math.round(t.size[0] * i), n = Math.round(t.size[1] * i);
  this.canvas_.width != r || this.canvas_.height != n ? (this.canvas_.width = r, this.canvas_.height = n) : e.clearRect(0, 0, r, n);
  var a = t.viewState.rotation;
  this.calculateMatrices2D(t), this.dispatchComposeEvent_(Ci.PRECOMPOSE, t);
  var o = t.layerStatesArray;
  st.stableSort(o, kt.sortByZIndex), a && (e.save(), D.rotateAtOffset(e, a, r / 2, n / 2));
  var s = t.viewState.resolution, l, h, u, f, c;
  for (l = 0, h = o.length; l < h; ++l)
    c = o[l], u = c.layer, f = /** @type {ol.renderer.canvas.Layer} */
    this.getLayerRenderer(u), !(!ge.visibleAtResolution(c, s) || c.sourceState != Ur.READY) && f.prepareFrame(t, c) && f.composeFrame(t, c, e);
  a && e.restore(), this.dispatchComposeEvent_(
    Ci.POSTCOMPOSE,
    t
  ), this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t);
};
Gi.prototype.forEachLayerAtPixel = function(t, e, i, r, n, a) {
  var o, s = e.viewState, l = s.resolution, h = e.layerStatesArray, u = h.length, f = A.apply(
    e.pixelToCoordinateTransform,
    t.slice()
  ), c;
  for (c = u - 1; c >= 0; --c) {
    var d = h[c], v = d.layer;
    if (ge.visibleAtResolution(d, l) && n.call(a, v)) {
      var m = (
        /** @type {ol.renderer.canvas.Layer} */
        this.getLayerRenderer(v)
      );
      if (o = m.forEachLayerAtCoordinate(
        f,
        e,
        i,
        r
      ), o)
        return o;
    }
  }
};
var Ae = function(t, e, i, r) {
  this.minX = t, this.maxX = e, this.minY = i, this.maxY = r;
};
Ae.createOrUpdate = function(t, e, i, r, n) {
  return n !== void 0 ? (n.minX = t, n.maxX = e, n.minY = i, n.maxY = r, n) : new Ae(t, e, i, r);
};
Ae.prototype.contains = function(t) {
  return this.containsXY(t[1], t[2]);
};
Ae.prototype.containsTileRange = function(t) {
  return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
};
Ae.prototype.containsXY = function(t, e) {
  return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
};
Ae.prototype.equals = function(t) {
  return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
};
Ae.prototype.extend = function(t) {
  t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
};
Ae.prototype.getHeight = function() {
  return this.maxY - this.minY + 1;
};
Ae.prototype.getSize = function() {
  return [this.getWidth(), this.getHeight()];
};
Ae.prototype.getWidth = function() {
  return this.maxX - this.minX + 1;
};
Ae.prototype.intersects = function(t) {
  return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
};
var We = function(t) {
  Ai.call(this, t), this.context = this.context === null ? null : At.createCanvasContext2D(), this.oversampling_, this.renderedExtent_ = null, this.renderedRevision, this.renderedTiles = [], this.tmpExtent = g.createEmpty(), this.tmpTileRange_ = new Ae(0, 0, 0, 0), this.imageTransform_ = A.create(), this.zDirection = 0;
};
_.inherits(We, Ai);
We.handles = function(t, e) {
  return t === ri.CANVAS && e.getType() === Di.TILE;
};
We.create = function(t, e) {
  return new We(
    /** @type {ol.layer.Tile} */
    e
  );
};
We.prototype.isDrawableTile_ = function(t) {
  var e = t.getState(), i = this.getLayer().getUseInterimTilesOnError();
  return e == H.LOADED || e == H.EMPTY || e == H.ERROR && !i;
};
We.prototype.prepareFrame = function(t, e) {
  var i = t.pixelRatio, r = t.size, n = t.viewState, a = n.projection, o = n.resolution, s = n.center, l = this.getLayer(), h = (
    /** @type {ol.source.Tile} */
    l.getSource()
  ), u = h.getRevision(), f = h.getTileGridForProjection(a), c = f.getZForResolution(o, this.zDirection), d = f.getResolution(c), v = Math.round(o / d) || 1, m = t.extent;
  if (e.extent !== void 0 && (m = g.getIntersection(m, e.extent)), g.isEmpty(m))
    return !1;
  var p = f.getTileRangeForExtentAndZ(m, c), E = f.getTileRangeExtent(c, p), y = h.getTilePixelRatio(i), R = {};
  R[c] = {};
  var I = this.createLoadedTileFinder(
    h,
    a,
    R
  ), x = this.tmpExtent, C = this.tmpTileRange_, N = !1, w, X, U;
  for (X = p.minX; X <= p.maxX; ++X)
    for (U = p.minY; U <= p.maxY; ++U) {
      if (w = h.getTile(c, X, U, i, a), w.getState() == H.ERROR && (l.getUseInterimTilesOnError() ? l.getPreload() > 0 && (N = !0) : w.setState(H.LOADED)), this.isDrawableTile_(w) || (w = w.getInterimTile()), this.isDrawableTile_(w)) {
        var P = _.getUid(this);
        if (w.getState() == H.LOADED) {
          R[c][w.tileCoord.toString()] = w;
          var O = w.inTransition(P);
          !N && (O || this.renderedTiles.indexOf(w) === -1) && (N = !0);
        }
        if (w.getAlpha(P, t.time) === 1)
          continue;
      }
      var q = f.getTileCoordChildTileRange(
        w.tileCoord,
        C,
        x
      ), F = !1;
      q && (F = I(c + 1, q)), F || f.forEachTileCoordParentTileRange(
        w.tileCoord,
        I,
        null,
        C,
        x
      );
    }
  var b = d * i / y * v, M = t.viewHints, W = M[Dt.ANIMATING] || M[Dt.INTERACTING];
  if (!(this.renderedResolution && Date.now() - t.time > 16 && W) && (N || !(this.renderedExtent_ && g.containsExtent(this.renderedExtent_, m)) || this.renderedRevision != u || v != this.oversampling_ || !W && b != this.renderedResolution)) {
    var B = this.context;
    if (B) {
      var K = h.getTilePixelSize(c, i, a), V = Math.round(p.getWidth() * K[0] / v), $ = Math.round(p.getHeight() * K[1] / v), tt = B.canvas;
      tt.width != V || tt.height != $ ? (this.oversampling_ = v, tt.width = V, tt.height = $) : (this.renderedExtent_ && !g.equals(E, this.renderedExtent_) && B.clearRect(0, 0, V, $), v = this.oversampling_);
    }
    this.renderedTiles.length = 0;
    var ft = Object.keys(R).map(Number);
    ft.sort(function(Oi, fi) {
      return Oi === c ? 1 : fi === c ? -1 : Oi > fi ? 1 : Oi < fi ? -1 : 0;
    });
    var Et, yt, Ht, Tt, Qt, ye, bt, me, be, Ce, oi;
    for (Qt = 0, ye = ft.length; Qt < ye; ++Qt) {
      Tt = ft[Qt], Ht = h.getTilePixelSize(Tt, i, a), Et = f.getResolution(Tt), yt = Et / d, me = y * h.getGutter(a), be = R[Tt];
      for (var er in be)
        w = be[er], bt = f.getTileCoordExtent(w.getTileCoord(), x), X = (bt[0] - E[0]) / d * y / v, U = (E[3] - bt[3]) / d * y / v, Ce = Ht[0] * yt / v, oi = Ht[1] * yt / v, this.drawTileImage(w, t, e, X, U, Ce, oi, me, c === Tt), this.renderedTiles.push(w);
    }
    this.renderedRevision = u, this.renderedResolution = d * i / y * v, this.renderedExtent_ = E;
  }
  var wi = this.renderedResolution / o, Xi = A.compose(
    this.imageTransform_,
    i * r[0] / 2,
    i * r[1] / 2,
    wi,
    wi,
    0,
    (this.renderedExtent_[0] - s[0]) / this.renderedResolution * i,
    (s[1] - this.renderedExtent_[3]) / this.renderedResolution * i
  );
  return A.compose(
    this.coordinateToCanvasPixelTransform,
    i * r[0] / 2 - Xi[4],
    i * r[1] / 2 - Xi[5],
    i / o,
    -i / o,
    0,
    -s[0],
    -s[1]
  ), this.updateUsedTiles(t.usedTiles, h, c, p), this.manageTilePyramid(
    t,
    h,
    f,
    i,
    a,
    m,
    c,
    l.getPreload()
  ), this.scheduleExpireCache(t, h), this.updateLogos(t, h), this.renderedTiles.length > 0;
};
We.prototype.drawTileImage = function(t, e, i, r, n, a, o, s, l) {
  var h = t.getImage(this.getLayer());
  if (h) {
    var u = _.getUid(this), f = l ? t.getAlpha(u, e.time) : 1;
    f === 1 && !this.getLayer().getSource().getOpaque(e.viewState.projection) && this.context.clearRect(r, n, a, o);
    var c = f !== this.context.globalAlpha;
    c && (this.context.save(), this.context.globalAlpha = f), this.context.drawImage(
      h,
      s,
      s,
      h.width - 2 * s,
      h.height - 2 * s,
      r,
      n,
      a,
      o
    ), c && this.context.restore(), f !== 1 ? e.animate = !0 : l && t.endTransition(u);
  }
};
We.prototype.getImage = function() {
  var t = this.context;
  return t ? t.canvas : null;
};
We.prototype.getLayer;
We.prototype.getImageTransform = function() {
  return this.imageTransform_;
};
var Ca = { exports: {} };
(function(t, e) {
  (function(i, r) {
    t.exports = r();
  })(da, function() {
    function i(o, s, l, h, u) {
      r(o, s, l || 0, h || o.length - 1, u || a);
    }
    function r(o, s, l, h, u) {
      for (; h > l; ) {
        if (h - l > 600) {
          var f = h - l + 1, c = s - l + 1, d = Math.log(f), v = 0.5 * Math.exp(2 * d / 3), m = 0.5 * Math.sqrt(d * v * (f - v) / f) * (c - f / 2 < 0 ? -1 : 1), p = Math.max(l, Math.floor(s - c * v / f + m)), E = Math.min(h, Math.floor(s + (f - c) * v / f + m));
          r(o, s, p, E, u);
        }
        var y = o[s], R = l, I = h;
        for (n(o, l, s), u(o[h], y) > 0 && n(o, l, h); R < I; ) {
          for (n(o, R, I), R++, I--; u(o[R], y) < 0; ) R++;
          for (; u(o[I], y) > 0; ) I--;
        }
        u(o[l], y) === 0 ? n(o, l, I) : (I++, n(o, I, h)), I <= s && (l = I + 1), s <= I && (h = I - 1);
      }
    }
    function n(o, s, l) {
      var h = o[s];
      o[s] = o[l], o[l] = h;
    }
    function a(o, s) {
      return o < s ? -1 : o > s ? 1 : 0;
    }
    return i;
  });
})(Ca);
var Co = Ca.exports, Io = mn, So = Co;
function mn(t, e) {
  if (!(this instanceof mn)) return new mn(t, e);
  this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), e && this._initFormat(e), this.clear();
}
mn.prototype = {
  all: function() {
    return this._all(this.data, []);
  },
  search: function(t) {
    var e = this.data, i = [], r = this.toBBox;
    if (!_n(t, e)) return i;
    for (var n = [], a, o, s, l; e; ) {
      for (a = 0, o = e.children.length; a < o; a++)
        s = e.children[a], l = e.leaf ? r(s) : s, _n(t, l) && (e.leaf ? i.push(s) : Yn(t, l) ? this._all(s, i) : n.push(s));
      e = n.pop();
    }
    return i;
  },
  collides: function(t) {
    var e = this.data, i = this.toBBox;
    if (!_n(t, e)) return !1;
    for (var r = [], n, a, o, s; e; ) {
      for (n = 0, a = e.children.length; n < a; n++)
        if (o = e.children[n], s = e.leaf ? i(o) : o, _n(t, s)) {
          if (e.leaf || Yn(t, s)) return !0;
          r.push(o);
        }
      e = r.pop();
    }
    return !1;
  },
  load: function(t) {
    if (!(t && t.length)) return this;
    if (t.length < this._minEntries) {
      for (var e = 0, i = t.length; e < i; e++)
        this.insert(t[e]);
      return this;
    }
    var r = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = r;
    else if (this.data.height === r.height)
      this._splitRoot(this.data, r);
    else {
      if (this.data.height < r.height) {
        var n = this.data;
        this.data = r, r = n;
      }
      this._insert(r, this.data.height - r.height - 1, !0);
    }
    return this;
  },
  insert: function(t) {
    return t && this._insert(t, this.data.height - 1), this;
  },
  clear: function() {
    return this.data = Mr([]), this;
  },
  remove: function(t, e) {
    if (!t) return this;
    for (var i = this.data, r = this.toBBox(t), n = [], a = [], o, s, l, h; i || n.length; ) {
      if (i || (i = n.pop(), s = n[n.length - 1], o = a.pop(), h = !0), i.leaf && (l = Lo(t, i.children, e), l !== -1))
        return i.children.splice(l, 1), n.push(i), this._condense(n), this;
      !h && !i.leaf && Yn(i, r) ? (n.push(i), a.push(o), o = 0, s = i, i = i.children[0]) : s ? (o++, i = s.children[o], h = !1) : i = null;
    }
    return this;
  },
  toBBox: function(t) {
    return t;
  },
  compareMinX: sa,
  compareMinY: la,
  toJSON: function() {
    return this.data;
  },
  fromJSON: function(t) {
    return this.data = t, this;
  },
  _all: function(t, e) {
    for (var i = []; t; )
      t.leaf ? e.push.apply(e, t.children) : i.push.apply(i, t.children), t = i.pop();
    return e;
  },
  _build: function(t, e, i, r) {
    var n = i - e + 1, a = this._maxEntries, o;
    if (n <= a)
      return o = Mr(t.slice(e, i + 1)), Pr(o, this.toBBox), o;
    r || (r = Math.ceil(Math.log(n) / Math.log(a)), a = Math.ceil(n / Math.pow(a, r - 1))), o = Mr([]), o.leaf = !1, o.height = r;
    var s = Math.ceil(n / a), l = s * Math.ceil(Math.sqrt(a)), h, u, f, c;
    for (ha(t, e, i, l, this.compareMinX), h = e; h <= i; h += l)
      for (f = Math.min(h + l - 1, i), ha(t, h, f, s, this.compareMinY), u = h; u <= f; u += s)
        c = Math.min(u + s - 1, f), o.children.push(this._build(t, u, c, r - 1));
    return Pr(o, this.toBBox), o;
  },
  _chooseSubtree: function(t, e, i, r) {
    for (var n, a, o, s, l, h, u, f; r.push(e), !(e.leaf || r.length - 1 === i); ) {
      for (u = f = 1 / 0, n = 0, a = e.children.length; n < a; n++)
        o = e.children[n], l = Xn(o), h = Ao(t, o) - l, h < f ? (f = h, u = l < u ? l : u, s = o) : h === f && l < u && (u = l, s = o);
      e = s || e.children[0];
    }
    return e;
  },
  _insert: function(t, e, i) {
    var r = this.toBBox, n = i ? t : r(t), a = [], o = this._chooseSubtree(n, this.data, e, a);
    for (o.children.push(t), $r(o, n); e >= 0 && a[e].children.length > this._maxEntries; )
      this._split(a, e), e--;
    this._adjustParentBBoxes(n, a, e);
  },
  // split overflowed node into two
  _split: function(t, e) {
    var i = t[e], r = i.children.length, n = this._minEntries;
    this._chooseSplitAxis(i, n, r);
    var a = this._chooseSplitIndex(i, n, r), o = Mr(i.children.splice(a, i.children.length - a));
    o.height = i.height, o.leaf = i.leaf, Pr(i, this.toBBox), Pr(o, this.toBBox), e ? t[e - 1].children.push(o) : this._splitRoot(i, o);
  },
  _splitRoot: function(t, e) {
    this.data = Mr([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, Pr(this.data, this.toBBox);
  },
  _chooseSplitIndex: function(t, e, i) {
    var r, n, a, o, s, l, h, u;
    for (l = h = 1 / 0, r = e; r <= i - e; r++)
      n = qr(t, 0, r, this.toBBox), a = qr(t, r, i, this.toBBox), o = wo(n, a), s = Xn(n) + Xn(a), o < l ? (l = o, u = r, h = s < h ? s : h) : o === l && s < h && (h = s, u = r);
    return u;
  },
  // sorts node children by the best axis for split
  _chooseSplitAxis: function(t, e, i) {
    var r = t.leaf ? this.compareMinX : sa, n = t.leaf ? this.compareMinY : la, a = this._allDistMargin(t, e, i, r), o = this._allDistMargin(t, e, i, n);
    a < o && t.children.sort(r);
  },
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin: function(t, e, i, r) {
    t.children.sort(r);
    var n = this.toBBox, a = qr(t, 0, e, n), o = qr(t, i - e, i, n), s = dn(a) + dn(o), l, h;
    for (l = e; l < i - e; l++)
      h = t.children[l], $r(a, t.leaf ? n(h) : h), s += dn(a);
    for (l = i - e - 1; l >= e; l--)
      h = t.children[l], $r(o, t.leaf ? n(h) : h), s += dn(o);
    return s;
  },
  _adjustParentBBoxes: function(t, e, i) {
    for (var r = i; r >= 0; r--)
      $r(e[r], t);
  },
  _condense: function(t) {
    for (var e = t.length - 1, i; e >= 0; e--)
      t[e].children.length === 0 ? e > 0 ? (i = t[e - 1].children, i.splice(i.indexOf(t[e]), 1)) : this.clear() : Pr(t[e], this.toBBox);
  },
  _initFormat: function(t) {
    var e = ["return a", " - b", ";"];
    this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function(
      "a",
      "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};"
    );
  }
};
function Lo(t, e, i) {
  if (!i) return e.indexOf(t);
  for (var r = 0; r < e.length; r++)
    if (i(t, e[r])) return r;
  return -1;
}
function Pr(t, e) {
  qr(t, 0, t.children.length, e, t);
}
function qr(t, e, i, r, n) {
  n || (n = Mr(null)), n.minX = 1 / 0, n.minY = 1 / 0, n.maxX = -1 / 0, n.maxY = -1 / 0;
  for (var a = e, o; a < i; a++)
    o = t.children[a], $r(n, t.leaf ? r(o) : o);
  return n;
}
function $r(t, e) {
  return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t;
}
function sa(t, e) {
  return t.minX - e.minX;
}
function la(t, e) {
  return t.minY - e.minY;
}
function Xn(t) {
  return (t.maxX - t.minX) * (t.maxY - t.minY);
}
function dn(t) {
  return t.maxX - t.minX + (t.maxY - t.minY);
}
function Ao(t, e) {
  return (Math.max(e.maxX, t.maxX) - Math.min(e.minX, t.minX)) * (Math.max(e.maxY, t.maxY) - Math.min(e.minY, t.minY));
}
function wo(t, e) {
  var i = Math.max(t.minX, e.minX), r = Math.max(t.minY, e.minY), n = Math.min(t.maxX, e.maxX), a = Math.min(t.maxY, e.maxY);
  return Math.max(0, n - i) * Math.max(0, a - r);
}
function Yn(t, e) {
  return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY;
}
function _n(t, e) {
  return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY;
}
function Mr(t) {
  return {
    children: t,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function ha(t, e, i, r, n) {
  for (var a = [e, i], o; a.length; )
    i = a.pop(), e = a.pop(), !(i - e <= r) && (o = e + Math.ceil((i - e) / r / 2) * r, So(t, o, e, i, n), a.push(e, o, o, i));
}
const Jn = /* @__PURE__ */ _a(Io);
var Yr = function() {
};
Yr.prototype.getReplay = function(t, e) {
};
Yr.prototype.isEmpty = function() {
};
var at = {
  CIRCLE: "Circle",
  DEFAULT: "Default",
  IMAGE: "Image",
  LINE_STRING: "LineString",
  POLYGON: "Polygon",
  TEXT: "Text"
}, En = {};
En.lineString = function(t, e, i, r) {
  var n = t[e], a = t[e + 1], o = 0, s;
  for (s = e + r; s < i; s += r) {
    var l = t[s], h = t[s + 1];
    o += Math.sqrt((l - n) * (l - n) + (h - a) * (h - a)), n = l, a = h;
  }
  return o;
};
En.linearRing = function(t, e, i, r) {
  var n = En.lineString(t, e, i, r), a = t[i - r] - t[e], o = t[i - r + 1] - t[e + 1];
  return n += Math.sqrt(a * a + o * o), n;
};
var Ia = {};
Ia.lineString = function(t, e, i, r, n, a, o, s) {
  var l = [], h = t[e] > t[i - r], u = n.length, f = t[e], c = t[e + 1];
  e += r;
  for (var d = t[e], v = t[e + 1], m = 0, p = Math.sqrt(Math.pow(d - f, 2) + Math.pow(v - c, 2)), E = "", y = 0, R, I, x, C = 0; C < u; ++C) {
    I = h ? u - C - 1 : C;
    var N = n.charAt(I);
    E = h ? N + E : E + N;
    var w = a(E) - y;
    y += w;
    for (var X = o + w / 2; e < i - r && m + p < X; )
      f = d, c = v, e += r, d = t[e], v = t[e + 1], m += p, p = Math.sqrt(Math.pow(d - f, 2) + Math.pow(v - c, 2));
    var U = X - m, P = Math.atan2(v - c, d - f);
    if (h && (P += P > 0 ? -Math.PI : Math.PI), x !== void 0) {
      var O = P - x;
      if (O += O > Math.PI ? -2 * Math.PI : O < -Math.PI ? 2 * Math.PI : 0, Math.abs(O) > s)
        return null;
    }
    var q = U / p, F = Z.lerp(f, d, q), b = Z.lerp(c, v, q);
    x == P ? (h && (R[0] = F, R[1] = b, R[2] = w / 2), R[4] = E) : (E = N, y = w, R = [F, b, w / 2, P, E], h ? l.unshift(R) : l.push(R), x = P), o += w;
  }
  return l;
};
var J = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
}, Bt = {};
Bt.ORDER = [
  at.POLYGON,
  at.CIRCLE,
  at.LINE_STRING,
  at.IMAGE,
  at.TEXT,
  at.DEFAULT
];
Bt.TEXT_ALIGN = {};
Bt.TEXT_ALIGN.left = 0;
Bt.TEXT_ALIGN.end = 0;
Bt.TEXT_ALIGN.center = 0.5;
Bt.TEXT_ALIGN.right = 1;
Bt.TEXT_ALIGN.start = 1;
Bt.TEXT_ALIGN.top = 0;
Bt.TEXT_ALIGN.middle = 0.5;
Bt.TEXT_ALIGN.hanging = 0.2;
Bt.TEXT_ALIGN.alphabetic = 0.8;
Bt.TEXT_ALIGN.ideographic = 0.8;
Bt.TEXT_ALIGN.bottom = 1;
var mt = function(t, e, i, r, n, a) {
  zt.call(this), this.declutterTree = a, this.tmpExtent_ = g.createEmpty(), this.tolerance = t, this.maxExtent = e, this.overlaps = n, this.pixelRatio = r, this.maxLineWidth = 0, this.resolution = i, this.fillOrigin_, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.coordinateCache_ = {}, this.renderedTransform_ = A.create(), this.hitDetectionInstructions = [], this.pixelCoordinates_ = null, this.state = /** @type {ol.CanvasFillStrokeState} */
  {}, this.viewRotation_ = 0, this.tmpLocalTransform_ = A.create(), this.resetTransform_ = A.create();
};
_.inherits(mt, zt);
mt.prototype.replayTextBackground_ = function(t, e, i, r, n, a, o) {
  t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, r), t.lineTo.apply(t, n), t.lineTo.apply(t, e), a && (this.fillOrigin_ = /** @type {Array.<number>} */
  a[2], this.fill_(t)), o && (this.setStrokeStyle_(
    t,
    /** @type {Array.<*>} */
    o
  ), t.stroke());
};
mt.prototype.replayImage_ = function(t, e, i, r, n, a, o, s, l, h, u, f, c, d, v, m, p, E) {
  var y = p || E, R = this.tmpLocalTransform_;
  n *= c, a *= c, e -= n, i -= a, d && (e = Math.round(e), i = Math.round(i));
  var I = v + h > r.width ? r.width - h : v, x = s + u > r.height ? r.height - u : s, C = this.tmpExtent_, N = m[3] + I * c + m[1], w = m[0] + x * c + m[2], X = e - m[3], U = i - m[0], P, O, q, F;
  (y || f !== 0) && (P = [X, U], O = [X + N, U], q = [X + N, U + w], F = [X, U + w]);
  var b = null;
  if (f !== 0) {
    var M = e + n, W = i + a;
    b = A.compose(
      R,
      M,
      W,
      1,
      1,
      f,
      -M,
      -W
    ), g.createOrUpdateEmpty(C), g.extendCoordinate(C, A.apply(R, P)), g.extendCoordinate(C, A.apply(R, O)), g.extendCoordinate(C, A.apply(R, q)), g.extendCoordinate(C, A.apply(R, F));
  } else
    g.createOrUpdate(X, U, X + N, U + w, C);
  var B = t.canvas, K = C[0] <= B.width && C[2] >= 0 && C[1] <= B.height && C[3] >= 0;
  if (o) {
    if (!K && o[4] == 1)
      return;
    g.extend(o, C);
    var V = K ? [t, b ? b.slice(0) : null, l, r, h, u, I, x, e, i, c] : null;
    V && y && V.push(p, E, P, O, q, F), o.push(V);
  } else K && (y && this.replayTextBackground_(
    t,
    P,
    O,
    q,
    F,
    /** @type {Array.<*>} */
    p,
    /** @type {Array.<*>} */
    E
  ), D.drawImage(t, b, l, r, h, u, I, x, e, i, c));
};
mt.prototype.applyPixelRatio = function(t) {
  var e = this.pixelRatio;
  return e == 1 ? t : t.map(function(i) {
    return i * e;
  });
};
mt.prototype.appendFlatCoordinates = function(t, e, i, r, n, a) {
  var o = this.coordinates.length, s = this.getBufferedMaxExtent();
  a && (e += r);
  var l = [t[e], t[e + 1]], h = [NaN, NaN], u = !0, f, c, d;
  for (f = e + r; f < i; f += r)
    h[0] = t[f], h[1] = t[f + 1], d = g.coordinateRelationship(s, h), d !== c ? (u && (this.coordinates[o++] = l[0], this.coordinates[o++] = l[1]), this.coordinates[o++] = h[0], this.coordinates[o++] = h[1], u = !1) : d === Ie.INTERSECTING ? (this.coordinates[o++] = h[0], this.coordinates[o++] = h[1], u = !1) : u = !0, l[0] = h[0], l[1] = h[1], c = d;
  return (n && u || f === e + r) && (this.coordinates[o++] = l[0], this.coordinates[o++] = l[1]), o;
};
mt.prototype.drawCustomCoordinates_ = function(t, e, i, r, n) {
  for (var a = 0, o = i.length; a < o; ++a) {
    var s = i[a], l = this.appendFlatCoordinates(t, e, s, r, !1, !1);
    n.push(l), e = s;
  }
  return e;
};
mt.prototype.drawCustom = function(t, e, i) {
  this.beginGeometry(t, e);
  var r = t.getType(), n = t.getStride(), a = this.coordinates.length, o, s, l, h, u;
  if (r == j.MULTI_POLYGON) {
    t = /** @type {ol.geom.MultiPolygon} */
    t, o = t.getOrientedFlatCoordinates(), h = [];
    var f = t.getEndss();
    u = 0;
    for (var c = 0, d = f.length; c < d; ++c) {
      var v = [];
      u = this.drawCustomCoordinates_(o, u, f[c], n, v), h.push(v);
    }
    this.instructions.push([
      J.CUSTOM,
      a,
      h,
      t,
      i,
      Mi.coordinatesss
    ]);
  } else r == j.POLYGON || r == j.MULTI_LINE_STRING ? (l = [], o = r == j.POLYGON ? (
    /** @type {ol.geom.Polygon} */
    t.getOrientedFlatCoordinates()
  ) : t.getFlatCoordinates(), u = this.drawCustomCoordinates_(
    o,
    0,
    /** @type {ol.geom.Polygon|ol.geom.MultiLineString} */
    t.getEnds(),
    n,
    l
  ), this.instructions.push([
    J.CUSTOM,
    a,
    l,
    t,
    i,
    Mi.coordinatess
  ])) : r == j.LINE_STRING || r == j.MULTI_POINT ? (o = t.getFlatCoordinates(), s = this.appendFlatCoordinates(
    o,
    0,
    o.length,
    n,
    !1,
    !1
  ), this.instructions.push([
    J.CUSTOM,
    a,
    s,
    t,
    i,
    Mi.coordinates
  ])) : r == j.POINT && (o = t.getFlatCoordinates(), this.coordinates.push(o[0], o[1]), s = this.coordinates.length, this.instructions.push([
    J.CUSTOM,
    a,
    s,
    t,
    i
  ]));
  this.endGeometry(t, e);
};
mt.prototype.beginGeometry = function(t, e) {
  this.beginGeometryInstruction1_ = [J.BEGIN_GEOMETRY, e, 0], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [J.BEGIN_GEOMETRY, e, 0], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
};
mt.prototype.fill_ = function(t) {
  if (this.fillOrigin_) {
    var e = A.apply(this.renderedTransform_, this.fillOrigin_.slice());
    t.translate(e[0], e[1]), t.rotate(this.viewRotation_);
  }
  t.fill(), this.fillOrigin_ && t.setTransform.apply(t, D.resetTransform_);
};
mt.prototype.setStrokeStyle_ = function(t, e) {
  t.strokeStyle = /** @type {ol.ColorLike} */
  e[1], t.lineWidth = /** @type {number} */
  e[2], t.lineCap = /** @type {string} */
  e[3], t.lineJoin = /** @type {string} */
  e[4], t.miterLimit = /** @type {number} */
  e[5], pt.CANVAS_LINE_DASH && (t.lineDashOffset = /** @type {number} */
  e[7], t.setLineDash(
    /** @type {Array.<number>} */
    e[6]
  ));
};
mt.prototype.renderDeclutter_ = function(t, e) {
  if (t && t.length > 5) {
    var i = t[4];
    if (i == 1 || i == t.length - 5) {
      var r = {
        minX: (
          /** @type {number} */
          t[0]
        ),
        minY: (
          /** @type {number} */
          t[1]
        ),
        maxX: (
          /** @type {number} */
          t[2]
        ),
        maxY: (
          /** @type {number} */
          t[3]
        ),
        value: e
      };
      if (!this.declutterTree.collides(r)) {
        this.declutterTree.insert(r);
        for (var n = D.drawImage, a = 5, o = t.length; a < o; ++a) {
          var s = (
            /** @type {Array} */
            t[a]
          );
          s && (s.length > 11 && this.replayTextBackground_(
            s[0],
            s[13],
            s[14],
            s[15],
            s[16],
            s[11],
            s[12]
          ), n.apply(void 0, s));
        }
      }
      t.length = 5, g.createOrUpdateEmpty(t);
    }
  }
};
mt.prototype.replay_ = function(t, e, i, r, n, a) {
  var o;
  this.pixelCoordinates_ && st.equals(e, this.renderedTransform_) ? o = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), o = re.transform2D(
    this.coordinates,
    0,
    this.coordinates.length,
    2,
    e,
    this.pixelCoordinates_
  ), A.setFromArray(this.renderedTransform_, e));
  for (var s = !ut.isEmpty(i), l = 0, h = r.length, u = 0, f, c, d, v, m, p, E, y, R, I = 0, x = 0, C = null, N = null, w = this.coordinateCache_, X = this.viewRotation_, U = (
    /** @type {olx.render.State} */
    {
      context: t,
      pixelRatio: this.pixelRatio,
      resolution: this.resolution,
      rotation: X
    }
  ), P = this.instructions != r || this.overlaps ? 0 : 200; l < h; ) {
    var O = r[l], q = (
      /** @type {ol.render.canvas.Instruction} */
      O[0]
    ), F, b, M;
    switch (q) {
      case J.BEGIN_GEOMETRY:
        F = /** @type {ol.Feature|ol.render.Feature} */
        O[1], s && i[_.getUid(F).toString()] || !F.getGeometry() ? l = /** @type {number} */
        O[2] : a !== void 0 && !g.intersects(
          a,
          F.getGeometry().getExtent()
        ) ? l = /** @type {number} */
        O[2] + 1 : ++l;
        break;
      case J.BEGIN_PATH:
        I > P && (this.fill_(t), I = 0), x > P && (t.stroke(), x = 0), !I && !x && (t.beginPath(), v = m = NaN), ++l;
        break;
      case J.CIRCLE:
        u = /** @type {number} */
        O[1];
        var W = o[u], B = o[u + 1], K = o[u + 2], V = o[u + 3], $ = K - W, tt = V - B, ft = Math.sqrt($ * $ + tt * tt);
        t.moveTo(W + ft, B), t.arc(W, B, ft, 0, 2 * Math.PI, !0), ++l;
        break;
      case J.CLOSE_PATH:
        t.closePath(), ++l;
        break;
      case J.CUSTOM:
        u = /** @type {number} */
        O[1], f = O[2];
        var Et = (
          /** @type {ol.geom.SimpleGeometry} */
          O[3]
        ), yt = O[4], Ht = O.length == 6 ? O[5] : void 0;
        U.geometry = Et, U.feature = F, l in w || (w[l] = []);
        var Tt = w[l];
        Ht ? Ht(o, u, f, 2, Tt) : (Tt[0] = o[u], Tt[1] = o[u + 1], Tt.length = 2), yt(Tt, U), ++l;
        break;
      case J.DRAW_IMAGE:
        u = /** @type {number} */
        O[1], f = /** @type {number} */
        O[2], R = /** @type {HTMLCanvasElement|HTMLVideoElement|Image} */
        O[3], c = /** @type {number} */
        O[4], d = /** @type {number} */
        O[5], y = n ? null : (
          /** @type {ol.DeclutterGroup} */
          O[6]
        );
        var Qt = (
          /** @type {number} */
          O[7]
        ), ye = (
          /** @type {number} */
          O[8]
        ), bt = (
          /** @type {number} */
          O[9]
        ), me = (
          /** @type {number} */
          O[10]
        ), be = (
          /** @type {boolean} */
          O[11]
        ), Ce = (
          /** @type {number} */
          O[12]
        ), oi = (
          /** @type {number} */
          O[13]
        ), er = (
          /** @type {boolean} */
          O[14]
        ), wi = (
          /** @type {number} */
          O[15]
        ), Xi, Oi, fi;
        for (O.length > 16 ? (Xi = /** @type {Array.<number>} */
        O[16], Oi = /** @type {boolean} */
        O[17], fi = /** @type {boolean} */
        O[18]) : (Xi = D.defaultPadding, Oi = fi = !1), be && (Ce += X); u < f; u += 2)
          this.replayImage_(
            t,
            o[u],
            o[u + 1],
            R,
            c,
            d,
            y,
            Qt,
            ye,
            bt,
            me,
            Ce,
            oi,
            er,
            wi,
            Xi,
            Oi ? (
              /** @type {Array.<*>} */
              C
            ) : null,
            fi ? (
              /** @type {Array.<*>} */
              N
            ) : null
          );
        this.renderDeclutter_(y, F), ++l;
        break;
      case J.DRAW_CHARS:
        var an = (
          /** @type {number} */
          O[1]
        ), on = (
          /** @type {number} */
          O[2]
        ), dr = (
          /** @type {number} */
          O[3]
        );
        y = n ? null : (
          /** @type {ol.DeclutterGroup} */
          O[4]
        );
        var Gn = (
          /** @type {number} */
          O[5]
        ), sn = (
          /** @type {string} */
          O[6]
        ), ln = (
          /** @type {number} */
          O[7]
        ), Hr = (
          /** @type {function(string):number} */
          O[8]
        ), ir = (
          /** @type {number} */
          O[9]
        ), hn = (
          /** @type {string} */
          O[10]
        ), Kr = (
          /** @type {number} */
          O[11]
        ), zr = (
          /** @type {string} */
          O[12]
        ), _r = (
          /** @type {string} */
          O[13]
        ), un = (
          /** @type {number} */
          O[14]
        ), fn = En.lineString(o, an, on, 2), cn = Hr(zr);
        if (Gn || cn <= fn) {
          var Un = (
            /** @type {ol.render.canvas.TextReplay} */
            this.textStates[_r].textAlign
          ), Bn = (fn - cn) * Bt.TEXT_ALIGN[Un], vr = Ia.lineString(
            o,
            an,
            on,
            2,
            zr,
            Hr,
            Bn,
            ln
          );
          if (vr) {
            var Pi, rr, pr, Ne, Xe;
            if (hn)
              for (Pi = 0, rr = vr.length; Pi < rr; ++Pi)
                Xe = vr[Pi], pr = /** @type {string} */
                Xe[4], Ne = /** @type {ol.render.canvas.TextReplay} */
                this.getImage(pr, _r, "", hn), c = /** @type {number} */
                Xe[2] + Kr, d = dr * Ne.height + (0.5 - dr) * 2 * Kr - ir, this.replayImage_(
                  t,
                  /** @type {number} */
                  Xe[0],
                  /** @type {number} */
                  Xe[1],
                  Ne,
                  c,
                  d,
                  y,
                  Ne.height,
                  1,
                  0,
                  0,
                  /** @type {number} */
                  Xe[3],
                  un,
                  !1,
                  Ne.width,
                  D.defaultPadding,
                  null,
                  null
                );
            if (sn)
              for (Pi = 0, rr = vr.length; Pi < rr; ++Pi)
                Xe = vr[Pi], pr = /** @type {string} */
                Xe[4], Ne = /** @type {ol.render.canvas.TextReplay} */
                this.getImage(pr, _r, sn, ""), c = /** @type {number} */
                Xe[2], d = dr * Ne.height - ir, this.replayImage_(
                  t,
                  /** @type {number} */
                  Xe[0],
                  /** @type {number} */
                  Xe[1],
                  Ne,
                  c,
                  d,
                  y,
                  Ne.height,
                  1,
                  0,
                  0,
                  /** @type {number} */
                  Xe[3],
                  un,
                  !1,
                  Ne.width,
                  D.defaultPadding,
                  null,
                  null
                );
          }
        }
        this.renderDeclutter_(y, F), ++l;
        break;
      case J.END_GEOMETRY:
        if (n !== void 0) {
          F = /** @type {ol.Feature|ol.render.Feature} */
          O[1];
          var wr = n(F);
          if (wr)
            return wr;
        }
        ++l;
        break;
      case J.FILL:
        P ? I++ : this.fill_(t), ++l;
        break;
      case J.MOVE_TO_LINE_TO:
        for (u = /** @type {number} */
        O[1], f = /** @type {number} */
        O[2], b = o[u], M = o[u + 1], p = b + 0.5 | 0, E = M + 0.5 | 0, (p !== v || E !== m) && (t.moveTo(b, M), v = p, m = E), u += 2; u < f; u += 2)
          b = o[u], M = o[u + 1], p = b + 0.5 | 0, E = M + 0.5 | 0, (u == f - 2 || p !== v || E !== m) && (t.lineTo(b, M), v = p, m = E);
        ++l;
        break;
      case J.SET_FILL_STYLE:
        C = O, this.fillOrigin_ = O[2], I && (this.fill_(t), I = 0, x && (t.stroke(), x = 0)), t.fillStyle = /** @type {ol.ColorLike} */
        O[1], ++l;
        break;
      case J.SET_STROKE_STYLE:
        N = O, x && (t.stroke(), x = 0), this.setStrokeStyle_(
          t,
          /** @type {Array.<*>} */
          O
        ), ++l;
        break;
      case J.STROKE:
        P ? x++ : t.stroke(), ++l;
        break;
      default:
        ++l;
        break;
    }
  }
  I && this.fill_(t), x && t.stroke();
};
mt.prototype.replay = function(t, e, i, r) {
  this.viewRotation_ = i, this.replay_(
    t,
    e,
    r,
    this.instructions,
    void 0,
    void 0
  );
};
mt.prototype.replayHitDetection = function(t, e, i, r, n, a) {
  return this.viewRotation_ = i, this.replay_(
    t,
    e,
    r,
    this.hitDetectionInstructions,
    n,
    a
  );
};
mt.prototype.reverseHitDetectionInstructions = function() {
  var t = this.hitDetectionInstructions;
  t.reverse();
  var e, i = t.length, r, n, a = -1;
  for (e = 0; e < i; ++e)
    r = t[e], n = /** @type {ol.render.canvas.Instruction} */
    r[0], n == J.END_GEOMETRY ? a = e : n == J.BEGIN_GEOMETRY && (r[2] = e, st.reverseSubArray(this.hitDetectionInstructions, a, e), a = -1);
};
mt.prototype.setFillStrokeStyle = function(t, e) {
  var i = this.state;
  if (t) {
    var r = t.getColor();
    i.fillStyle = li.asColorLike(r || D.defaultFillStyle);
  } else
    i.fillStyle = void 0;
  if (e) {
    var n = e.getColor();
    i.strokeStyle = li.asColorLike(n || D.defaultStrokeStyle);
    var a = e.getLineCap();
    i.lineCap = a !== void 0 ? a : D.defaultLineCap;
    var o = e.getLineDash();
    i.lineDash = o ? o.slice() : D.defaultLineDash;
    var s = e.getLineDashOffset();
    i.lineDashOffset = s || D.defaultLineDashOffset;
    var l = e.getLineJoin();
    i.lineJoin = l !== void 0 ? l : D.defaultLineJoin;
    var h = e.getWidth();
    i.lineWidth = h !== void 0 ? h : D.defaultLineWidth;
    var u = e.getMiterLimit();
    i.miterLimit = u !== void 0 ? u : D.defaultMiterLimit, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null);
  } else
    i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0;
};
mt.prototype.applyFill = function(t, e) {
  var i = t.fillStyle, r = [J.SET_FILL_STYLE, i];
  if (typeof i != "string") {
    var n = e.getExtent();
    r.push([n[0], n[3]]);
  }
  this.instructions.push(r);
};
mt.prototype.applyStroke = function(t) {
  this.instructions.push([
    J.SET_STROKE_STYLE,
    t.strokeStyle,
    t.lineWidth * this.pixelRatio,
    t.lineCap,
    t.lineJoin,
    t.miterLimit,
    this.applyPixelRatio(t.lineDash),
    t.lineDashOffset * this.pixelRatio
  ]);
};
mt.prototype.updateFillStyle = function(t, e, i) {
  var r = t.fillStyle;
  (typeof r != "string" || t.currentFillStyle != r) && (e.call(this, t, i), t.currentFillStyle = r);
};
mt.prototype.updateStrokeStyle = function(t, e) {
  var i = t.strokeStyle, r = t.lineCap, n = t.lineDash, a = t.lineDashOffset, o = t.lineJoin, s = t.lineWidth, l = t.miterLimit;
  (t.currentStrokeStyle != i || t.currentLineCap != r || n != t.currentLineDash && !st.equals(t.currentLineDash, n) || t.currentLineDashOffset != a || t.currentLineJoin != o || t.currentLineWidth != s || t.currentMiterLimit != l) && (e.call(this, t), t.currentStrokeStyle = i, t.currentLineCap = r, t.currentLineDash = n, t.currentLineDashOffset = a, t.currentLineJoin = o, t.currentLineWidth = s, t.currentMiterLimit = l);
};
mt.prototype.endGeometry = function(t, e) {
  this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
  var i = [J.END_GEOMETRY, e];
  this.instructions.push(i), this.hitDetectionInstructions.push(i);
};
mt.prototype.finish = _.nullFunction;
mt.prototype.getBufferedMaxExtent = function() {
  if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = g.clone(this.maxExtent), this.maxLineWidth > 0)) {
    var t = this.resolution * (this.maxLineWidth + 1) / 2;
    g.buffer(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
  }
  return this.bufferedMaxExtent_;
};
var Ir = function(t, e, i, r, n, a) {
  mt.call(
    this,
    t,
    e,
    i,
    r,
    n,
    a
  ), this.declutterGroup_ = null, this.hitDetectionImage_ = null, this.image_ = null, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0;
};
_.inherits(Ir, mt);
Ir.prototype.drawCoordinates_ = function(t, e, i, r) {
  return this.appendFlatCoordinates(
    t,
    e,
    i,
    r,
    !1,
    !1
  );
};
Ir.prototype.drawPoint = function(t, e) {
  if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), r = t.getStride(), n = this.coordinates.length, a = this.drawCoordinates_(
      i,
      0,
      i.length,
      r
    );
    this.instructions.push([
      J.DRAW_IMAGE,
      n,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.declutterGroup_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_ * this.pixelRatio,
      this.snapToPixel_,
      this.width_
    ]), this.hitDetectionInstructions.push([
      J.DRAW_IMAGE,
      n,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.declutterGroup_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.snapToPixel_,
      this.width_
    ]), this.endGeometry(t, e);
  }
};
Ir.prototype.drawMultiPoint = function(t, e) {
  if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), r = t.getStride(), n = this.coordinates.length, a = this.drawCoordinates_(
      i,
      0,
      i.length,
      r
    );
    this.instructions.push([
      J.DRAW_IMAGE,
      n,
      a,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.declutterGroup_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_ * this.pixelRatio,
      this.snapToPixel_,
      this.width_
    ]), this.hitDetectionInstructions.push([
      J.DRAW_IMAGE,
      n,
      a,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.declutterGroup_,
      this.height_,
      this.opacity_,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.snapToPixel_,
      this.width_
    ]), this.endGeometry(t, e);
  }
};
Ir.prototype.finish = function() {
  this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0;
};
Ir.prototype.setImageStyle = function(t, e) {
  var i = t.getAnchor(), r = t.getSize(), n = t.getHitDetectionImage(1), a = t.getImage(1), o = t.getOrigin();
  this.anchorX_ = i[0], this.anchorY_ = i[1], this.declutterGroup_ = /** @type {ol.DeclutterGroup} */
  e, this.hitDetectionImage_ = n, this.image_ = a, this.height_ = r[1], this.opacity_ = t.getOpacity(), this.originX_ = o[0], this.originY_ = o[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScale(), this.snapToPixel_ = t.getSnapToPixel(), this.width_ = r[0];
};
var Sr = function(t, e, i, r, n, a) {
  mt.call(
    this,
    t,
    e,
    i,
    r,
    n,
    a
  );
};
_.inherits(Sr, mt);
Sr.prototype.drawFlatCoordinates_ = function(t, e, i, r) {
  var n = this.coordinates.length, a = this.appendFlatCoordinates(
    t,
    e,
    i,
    r,
    !1,
    !1
  ), o = [J.MOVE_TO_LINE_TO, n, a];
  return this.instructions.push(o), this.hitDetectionInstructions.push(o), i;
};
Sr.prototype.drawLineString = function(t, e) {
  var i = this.state, r = i.strokeStyle, n = i.lineWidth;
  if (!(r === void 0 || n === void 0)) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([
      J.SET_STROKE_STYLE,
      i.strokeStyle,
      i.lineWidth,
      i.lineCap,
      i.lineJoin,
      i.miterLimit,
      i.lineDash,
      i.lineDashOffset
    ], [
      J.BEGIN_PATH
    ]);
    var a = t.getFlatCoordinates(), o = t.getStride();
    this.drawFlatCoordinates_(a, 0, a.length, o), this.hitDetectionInstructions.push([J.STROKE]), this.endGeometry(t, e);
  }
};
Sr.prototype.drawMultiLineString = function(t, e) {
  var i = this.state, r = i.strokeStyle, n = i.lineWidth;
  if (!(r === void 0 || n === void 0)) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([
      J.SET_STROKE_STYLE,
      i.strokeStyle,
      i.lineWidth,
      i.lineCap,
      i.lineJoin,
      i.miterLimit,
      i.lineDash,
      i.lineDashOffset
    ], [
      J.BEGIN_PATH
    ]);
    var a = t.getEnds(), o = t.getFlatCoordinates(), s = t.getStride(), l = 0, h, u;
    for (h = 0, u = a.length; h < u; ++h)
      l = this.drawFlatCoordinates_(
        o,
        l,
        a[h],
        s
      );
    this.hitDetectionInstructions.push([J.STROKE]), this.endGeometry(t, e);
  }
};
Sr.prototype.finish = function() {
  var t = this.state;
  t.lastStroke != null && t.lastStroke != this.coordinates.length && this.instructions.push([J.STROKE]), this.reverseHitDetectionInstructions(), this.state = null;
};
Sr.prototype.applyStroke = function(t) {
  t.lastStroke != null && t.lastStroke != this.coordinates.length && (this.instructions.push([J.STROKE]), t.lastStroke = this.coordinates.length), t.lastStroke = 0, mt.prototype.applyStroke.call(this, t), this.instructions.push([J.BEGIN_PATH]);
};
var $i = function(t, e, i, r, n, a) {
  mt.call(
    this,
    t,
    e,
    i,
    r,
    n,
    a
  );
};
_.inherits($i, mt);
$i.prototype.drawFlatCoordinatess_ = function(t, e, i, r) {
  var n = this.state, a = n.fillStyle !== void 0, o = n.strokeStyle != null, s = i.length, l = [J.BEGIN_PATH];
  this.instructions.push(l), this.hitDetectionInstructions.push(l);
  for (var h = 0; h < s; ++h) {
    var u = i[h], f = this.coordinates.length, c = this.appendFlatCoordinates(
      t,
      e,
      u,
      r,
      !0,
      !o
    ), d = [J.MOVE_TO_LINE_TO, f, c];
    if (this.instructions.push(d), this.hitDetectionInstructions.push(d), o) {
      var v = [J.CLOSE_PATH];
      this.instructions.push(v), this.hitDetectionInstructions.push(v);
    }
    e = u;
  }
  var m = [J.FILL];
  if (this.hitDetectionInstructions.push(m), a && this.instructions.push(m), o) {
    var p = [J.STROKE];
    this.instructions.push(p), this.hitDetectionInstructions.push(p);
  }
  return e;
};
$i.prototype.drawCircle = function(t, e) {
  var i = this.state, r = i.fillStyle, n = i.strokeStyle;
  if (!(r === void 0 && n === void 0)) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push([
      J.SET_FILL_STYLE,
      Xt.asString(D.defaultFillStyle)
    ]), i.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      J.SET_STROKE_STYLE,
      i.strokeStyle,
      i.lineWidth,
      i.lineCap,
      i.lineJoin,
      i.miterLimit,
      i.lineDash,
      i.lineDashOffset
    ]);
    var a = t.getFlatCoordinates(), o = t.getStride(), s = this.coordinates.length;
    this.appendFlatCoordinates(
      a,
      0,
      a.length,
      o,
      !1,
      !1
    );
    var l = [J.BEGIN_PATH], h = [J.CIRCLE, s];
    this.instructions.push(l, h), this.hitDetectionInstructions.push(l, h);
    var u = [J.FILL];
    if (this.hitDetectionInstructions.push(u), i.fillStyle !== void 0 && this.instructions.push(u), i.strokeStyle !== void 0) {
      var f = [J.STROKE];
      this.instructions.push(f), this.hitDetectionInstructions.push(f);
    }
    this.endGeometry(t, e);
  }
};
$i.prototype.drawPolygon = function(t, e) {
  var i = this.state;
  this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push(
    [
      J.SET_FILL_STYLE,
      Xt.asString(D.defaultFillStyle)
    ]
  ), i.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
    J.SET_STROKE_STYLE,
    i.strokeStyle,
    i.lineWidth,
    i.lineCap,
    i.lineJoin,
    i.miterLimit,
    i.lineDash,
    i.lineDashOffset
  ]);
  var r = t.getEnds(), n = t.getOrientedFlatCoordinates(), a = t.getStride();
  this.drawFlatCoordinatess_(n, 0, r, a), this.endGeometry(t, e);
};
$i.prototype.drawMultiPolygon = function(t, e) {
  var i = this.state, r = i.fillStyle, n = i.strokeStyle;
  if (!(r === void 0 && n === void 0)) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push([
      J.SET_FILL_STYLE,
      Xt.asString(D.defaultFillStyle)
    ]), i.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      J.SET_STROKE_STYLE,
      i.strokeStyle,
      i.lineWidth,
      i.lineCap,
      i.lineJoin,
      i.miterLimit,
      i.lineDash,
      i.lineDashOffset
    ]);
    var a = t.getEndss(), o = t.getOrientedFlatCoordinates(), s = t.getStride(), l = 0, h, u;
    for (h = 0, u = a.length; h < u; ++h)
      l = this.drawFlatCoordinatess_(
        o,
        l,
        a[h],
        s
      );
    this.endGeometry(t, e);
  }
};
$i.prototype.finish = function() {
  this.reverseHitDetectionInstructions(), this.state = null;
  var t = this.tolerance;
  if (t !== 0) {
    var e = this.coordinates, i, r;
    for (i = 0, r = e.length; i < r; ++i)
      e[i] = Kt.snap(e[i], t);
  }
};
$i.prototype.setFillStrokeStyles_ = function(t) {
  var e = this.state, i = e.fillStyle;
  i !== void 0 && this.updateFillStyle(e, this.applyFill, t), e.strokeStyle !== void 0 && this.updateStrokeStyle(e, this.applyStroke);
};
var Sa = {};
Sa.lineString = function(t, e, i, r, n) {
  var a = i, o = i, s = 0, l = 0, h = i, u, f, c, d, v, m, p, E, y, R;
  for (f = i; f < r; f += n) {
    var I = e[f], x = e[f + 1];
    v !== void 0 && (y = I - v, R = x - m, d = Math.sqrt(y * y + R * R), p !== void 0 && (l += c, u = Math.acos((p * y + E * R) / (c * d)), u > t && (l > s && (s = l, a = h, o = f), l = 0, h = f - n)), c = d, p = y, E = R), v = I, m = x;
  }
  return l += d, l > s ? [h, f] : [a, o];
};
var Oo = {
  POINT: "point",
  LINE: "line"
}, Qi = function(t, e, i, r, n, a) {
  mt.call(
    this,
    t,
    e,
    i,
    r,
    n,
    a
  ), this.declutterGroup_, this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = /** @type {ol.CanvasTextState} */
  {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.widths_ = {};
  var o = D.labelCache;
  o.prune();
};
_.inherits(Qi, mt);
Qi.measureTextWidths = function(t, e, i) {
  var r = e.length, n = 0, a, o;
  for (o = 0; o < r; ++o)
    a = D.measureTextWidth(t, e[o]), n = Math.max(n, a), i.push(a);
  return n;
};
Qi.prototype.drawText = function(t, e) {
  var i = this.textFillState_, r = this.textStrokeState_, n = this.textState_;
  if (!(this.text_ === "" || !n || !i && !r)) {
    var a = this.coordinates.length, o = t.getType(), s = null, l = 2, h = 2, u, f;
    if (n.placement === Oo.LINE) {
      if (!g.intersects(this.getBufferedMaxExtent(), t.getExtent()))
        return;
      var c;
      if (s = t.getFlatCoordinates(), h = t.getStride(), o == j.LINE_STRING)
        c = [s.length];
      else if (o == j.MULTI_LINE_STRING)
        c = t.getEnds();
      else if (o == j.POLYGON)
        c = t.getEnds().slice(0, 1);
      else if (o == j.MULTI_POLYGON) {
        var d = t.getEndss();
        for (c = [], u = 0, f = d.length; u < f; ++u)
          c.push(d[u][0]);
      }
      this.beginGeometry(t, e);
      for (var v = n.textAlign, m = 0, p, E = 0, y = c.length; E < y; ++E) {
        if (v == null) {
          var R = Sa.lineString(
            n.maxAngle,
            s,
            m,
            c[E],
            h
          );
          m = R[0], p = R[1];
        } else
          p = c[E];
        for (u = m; u < p; u += h)
          this.coordinates.push(s[u], s[u + 1]);
        l = this.coordinates.length, m = c[E], this.drawChars_(a, l, this.declutterGroup_), a = l;
      }
      this.endGeometry(t, e);
    } else {
      var I = this.getImage(this.text_, this.textKey_, this.fillKey_, this.strokeKey_), x = I.width / this.pixelRatio;
      switch (o) {
        case j.POINT:
        case j.MULTI_POINT:
          s = t.getFlatCoordinates(), l = s.length;
          break;
        case j.LINE_STRING:
          s = /** @type {ol.geom.LineString} */
          t.getFlatMidpoint();
          break;
        case j.CIRCLE:
          s = /** @type {ol.geom.Circle} */
          t.getCenter();
          break;
        case j.MULTI_LINE_STRING:
          s = /** @type {ol.geom.MultiLineString} */
          t.getFlatMidpoints(), l = s.length;
          break;
        case j.POLYGON:
          if (s = /** @type {ol.geom.Polygon} */
          t.getFlatInteriorPoint(), !n.overflow && s[2] / this.resolution < x)
            return;
          h = 3;
          break;
        case j.MULTI_POLYGON:
          var C = (
            /** @type {ol.geom.MultiPolygon} */
            t.getFlatInteriorPoints()
          );
          for (s = [], u = 0, f = C.length; u < f; u += 3)
            (n.overflow || C[u + 2] / this.resolution >= x) && s.push(C[u], C[u + 1]);
          if (l = s.length, l == 0)
            return;
          break;
      }
      l = this.appendFlatCoordinates(s, 0, l, h, !1, !1), this.beginGeometry(t, e), (n.backgroundFill || n.backgroundStroke) && (this.setFillStrokeStyle(n.backgroundFill, n.backgroundStroke), this.updateFillStyle(this.state, this.applyFill, t), this.updateStrokeStyle(this.state, this.applyStroke)), this.drawTextImage_(I, a, l), this.endGeometry(t, e);
    }
  }
};
Qi.prototype.getImage = function(t, e, i, r) {
  var n, a = r + e + t + i + this.pixelRatio, o = D.labelCache;
  if (!o.containsKey(a)) {
    var s = r ? this.strokeStates[r] || this.textStrokeState_ : null, l = i ? this.fillStates[i] || this.textFillState_ : null, h = this.textStates[e] || this.textState_, u = this.pixelRatio, f = h.scale * u, c = Bt.TEXT_ALIGN[h.textAlign || D.defaultTextAlign], d = r && s.lineWidth ? s.lineWidth : 0, v = t.split(`
`), m = v.length, p = [], E = Qi.measureTextWidths(h.font, v, p), y = D.measureTextHeight(h.font), R = y * m, I = E + d, x = At.createCanvasContext2D(
      Math.ceil(I * f),
      Math.ceil((R + d) * f)
    );
    n = x.canvas, o.set(a, n), f != 1 && x.scale(f, f), x.font = h.font, r && (x.strokeStyle = s.strokeStyle, x.lineWidth = d * (pt.SAFARI ? f : 1), x.lineCap = s.lineCap, x.lineJoin = s.lineJoin, x.miterLimit = s.miterLimit, pt.CANVAS_LINE_DASH && s.lineDash.length && (x.setLineDash(s.lineDash), x.lineDashOffset = s.lineDashOffset)), i && (x.fillStyle = l.fillStyle), x.textBaseline = "middle", x.textAlign = "center";
    var C = 0.5 - c, N = c * n.width / f + C * d, w;
    if (r)
      for (w = 0; w < m; ++w)
        x.strokeText(v[w], N + C * p[w], 0.5 * (d + y) + w * y);
    if (i)
      for (w = 0; w < m; ++w)
        x.fillText(v[w], N + C * p[w], 0.5 * (d + y) + w * y);
  }
  return o.get(a);
};
Qi.prototype.drawTextImage_ = function(t, e, i) {
  var r = this.textState_, n = this.textStrokeState_, a = this.pixelRatio, o = Bt.TEXT_ALIGN[r.textAlign || D.defaultTextAlign], s = Bt.TEXT_ALIGN[r.textBaseline], l = n && n.lineWidth ? n.lineWidth : 0, h = o * t.width / a + 2 * (0.5 - o) * l, u = s * t.height / a + 2 * (0.5 - s) * l;
  this.instructions.push([
    J.DRAW_IMAGE,
    e,
    i,
    t,
    (h - this.textOffsetX_) * a,
    (u - this.textOffsetY_) * a,
    this.declutterGroup_,
    t.height,
    1,
    0,
    0,
    this.textRotateWithView_,
    this.textRotation_,
    1,
    !0,
    t.width,
    r.padding == D.defaultPadding ? D.defaultPadding : r.padding.map(function(f) {
      return f * a;
    }),
    !!r.backgroundFill,
    !!r.backgroundStroke
  ]), this.hitDetectionInstructions.push([
    J.DRAW_IMAGE,
    e,
    i,
    t,
    (h - this.textOffsetX_) * a,
    (u - this.textOffsetY_) * a,
    this.declutterGroup_,
    t.height,
    1,
    0,
    0,
    this.textRotateWithView_,
    this.textRotation_,
    1 / a,
    !0,
    t.width,
    r.padding,
    !!r.backgroundFill,
    !!r.backgroundStroke
  ]);
};
Qi.prototype.drawChars_ = function(t, e, i) {
  var r = this.textStrokeState_, n = this.textState_, a = this.textFillState_, o = this.strokeKey_;
  r && (o in this.strokeStates || (this.strokeStates[o] = /** @type {ol.CanvasStrokeState} */
  {
    strokeStyle: r.strokeStyle,
    lineCap: r.lineCap,
    lineDashOffset: r.lineDashOffset,
    lineWidth: r.lineWidth,
    lineJoin: r.lineJoin,
    miterLimit: r.miterLimit,
    lineDash: r.lineDash
  }));
  var s = this.textKey_;
  this.textKey_ in this.textStates || (this.textStates[this.textKey_] = /** @type {ol.CanvasTextState} */
  {
    font: n.font,
    textAlign: n.textAlign || D.defaultTextAlign,
    scale: n.scale
  });
  var l = this.fillKey_;
  a && (l in this.fillStates || (this.fillStates[l] = /** @type {ol.CanvasFillState} */
  {
    fillStyle: a.fillStyle
  }));
  var h = this.pixelRatio, u = Bt.TEXT_ALIGN[n.textBaseline], f = this.textOffsetY_ * h, c = this.text_, d = n.font, v = n.scale, m = r ? r.lineWidth * v / 2 : 0, p = this.widths_[d];
  p || (this.widths_[d] = p = {}), this.instructions.push([
    J.DRAW_CHARS,
    t,
    e,
    u,
    i,
    n.overflow,
    l,
    n.maxAngle,
    function(E) {
      var y = p[E];
      return y || (y = p[E] = D.measureTextWidth(d, E)), y * v * h;
    },
    f,
    o,
    m * h,
    c,
    s,
    1
  ]), this.hitDetectionInstructions.push([
    J.DRAW_CHARS,
    t,
    e,
    u,
    i,
    n.overflow,
    l,
    n.maxAngle,
    function(E) {
      var y = p[E];
      return y || (y = p[E] = D.measureTextWidth(d, E)), y * v;
    },
    f,
    o,
    m,
    c,
    s,
    1 / h
  ]);
};
Qi.prototype.setTextStyle = function(t, e) {
  var i, r, n;
  if (!t)
    this.text_ = "";
  else {
    this.declutterGroup_ = /** @type {ol.DeclutterGroup} */
    e;
    var a = t.getFill();
    a ? (r = this.textFillState_, r || (r = this.textFillState_ = /** @type {ol.CanvasFillState} */
    {}), r.fillStyle = li.asColorLike(
      a.getColor() || D.defaultFillStyle
    )) : r = this.textFillState_ = null;
    var o = t.getStroke();
    if (!o)
      n = this.textStrokeState_ = null;
    else {
      n = this.textStrokeState_, n || (n = this.textStrokeState_ = /** @type {ol.CanvasStrokeState} */
      {});
      var s = o.getLineDash(), l = o.getLineDashOffset(), h = o.getWidth(), u = o.getMiterLimit();
      n.lineCap = o.getLineCap() || D.defaultLineCap, n.lineDash = s ? s.slice() : D.defaultLineDash, n.lineDashOffset = l === void 0 ? D.defaultLineDashOffset : l, n.lineJoin = o.getLineJoin() || D.defaultLineJoin, n.lineWidth = h === void 0 ? D.defaultLineWidth : h, n.miterLimit = u === void 0 ? D.defaultMiterLimit : u, n.strokeStyle = li.asColorLike(
        o.getColor() || D.defaultStrokeStyle
      );
    }
    i = this.textState_;
    var f = t.getFont() || D.defaultFont;
    D.checkFont(f);
    var c = t.getScale();
    i.overflow = t.getOverflow(), i.font = f, i.maxAngle = t.getMaxAngle(), i.placement = t.getPlacement(), i.textAlign = t.getTextAlign(), i.textBaseline = t.getTextBaseline() || D.defaultTextBaseline, i.backgroundFill = t.getBackgroundFill(), i.backgroundStroke = t.getBackgroundStroke(), i.padding = t.getPadding() || D.defaultPadding, i.scale = c === void 0 ? 1 : c;
    var d = t.getOffsetX(), v = t.getOffsetY(), m = t.getRotateWithView(), p = t.getRotation();
    this.text_ = t.getText() || "", this.textOffsetX_ = d === void 0 ? 0 : d, this.textOffsetY_ = v === void 0 ? 0 : v, this.textRotateWithView_ = m === void 0 ? !1 : m, this.textRotation_ = p === void 0 ? 0 : p, this.strokeKey_ = n ? (typeof n.strokeStyle == "string" ? n.strokeStyle : _.getUid(n.strokeStyle)) + n.lineCap + n.lineDashOffset + "|" + n.lineWidth + n.lineJoin + n.miterLimit + "[" + n.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?"), this.fillKey_ = r ? typeof r.fillStyle == "string" ? r.fillStyle : "|" + _.getUid(r.fillStyle) : "";
  }
};
var Rt = function(t, e, i, r, n, a, o) {
  Yr.call(this), this.declutterTree_ = a, this.declutterGroup_ = null, this.tolerance_ = t, this.maxExtent_ = e, this.overlaps_ = n, this.pixelRatio_ = r, this.resolution_ = i, this.renderBuffer_ = o, this.replaysByZIndex_ = {}, this.hitDetectionContext_ = At.createCanvasContext2D(1, 1), this.hitDetectionTransform_ = A.create();
};
_.inherits(Rt, Yr);
Rt.circleArrayCache_ = {
  0: [[!0]]
};
Rt.fillCircleArrayRowToMiddle_ = function(t, e, i) {
  var r, n = Math.floor(t.length / 2);
  if (e >= n)
    for (r = n; r < e; r++)
      t[r][i] = !0;
  else if (e < n)
    for (r = e + 1; r < n; r++)
      t[r][i] = !0;
};
Rt.getCircleArray_ = function(t) {
  if (Rt.circleArrayCache_[t] !== void 0)
    return Rt.circleArrayCache_[t];
  for (var e = t * 2 + 1, i = new Array(e), r = 0; r < e; r++)
    i[r] = new Array(e);
  for (var n = t, a = 0, o = 0; n >= a; )
    Rt.fillCircleArrayRowToMiddle_(i, t + n, t + a), Rt.fillCircleArrayRowToMiddle_(i, t + a, t + n), Rt.fillCircleArrayRowToMiddle_(i, t - a, t + n), Rt.fillCircleArrayRowToMiddle_(i, t - n, t + a), Rt.fillCircleArrayRowToMiddle_(i, t - n, t - a), Rt.fillCircleArrayRowToMiddle_(i, t - a, t - n), Rt.fillCircleArrayRowToMiddle_(i, t + a, t - n), Rt.fillCircleArrayRowToMiddle_(i, t + n, t - a), a++, o += 1 + 2 * a, 2 * (o - n) + 1 > 0 && (n -= 1, o += 1 - 2 * n);
  return Rt.circleArrayCache_[t] = i, i;
};
Rt.replayDeclutter = function(t, e, i) {
  for (var r = Object.keys(t).map(Number).sort(st.numberSafeCompareFunction), n = {}, a = 0, o = r.length; a < o; ++a)
    for (var s = t[r[a].toString()], l = 0, h = s.length; l < h; ) {
      var u = s[l++], f = s[l++];
      u.replay(e, f, i, n);
    }
};
Rt.prototype.addDeclutter = function(t) {
  var e = null;
  return this.declutterTree_ && (t ? (e = this.declutterGroup_, e[4]++) : (e = this.declutterGroup_ = g.createEmpty(), e.push(1))), e;
};
Rt.prototype.clip = function(t, e) {
  var i = this.getClipCoords(e);
  t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip();
};
Rt.prototype.hasReplays = function(t) {
  for (var e in this.replaysByZIndex_)
    for (var i = this.replaysByZIndex_[e], r = 0, n = t.length; r < n; ++r)
      if (t[r] in i)
        return !0;
  return !1;
};
Rt.prototype.finish = function() {
  var t;
  for (t in this.replaysByZIndex_) {
    var e = this.replaysByZIndex_[t], i;
    for (i in e)
      e[i].finish();
  }
};
Rt.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n, a, o) {
  r = Math.round(r);
  var s = r * 2 + 1, l = A.compose(
    this.hitDetectionTransform_,
    r + 0.5,
    r + 0.5,
    1 / e,
    -1 / e,
    -i,
    -t[0],
    -t[1]
  ), h = this.hitDetectionContext_;
  h.canvas.width !== s || h.canvas.height !== s ? (h.canvas.width = s, h.canvas.height = s) : h.clearRect(0, 0, s, s);
  var u;
  this.renderBuffer_ !== void 0 && (u = g.createEmpty(), g.extendCoordinate(u, t), g.buffer(u, e * (this.renderBuffer_ + r), u));
  var f = Rt.getCircleArray_(r), c;
  this.declutterTree_ && (c = this.declutterTree_.all().map(function(N) {
    return N.value;
  }));
  var d;
  function v(N) {
    for (var w = h.getImageData(0, 0, s, s).data, X = 0; X < s; X++)
      for (var U = 0; U < s; U++)
        if (f[X][U] && w[(U * s + X) * 4 + 3] > 0) {
          var P;
          if ((!(c && (d == at.IMAGE || d == at.TEXT)) || c.indexOf(N) !== -1) && (P = a(N)), P)
            return P;
          h.clearRect(0, 0, s, s);
          return;
        }
  }
  var m = Object.keys(this.replaysByZIndex_).map(Number);
  m.sort(st.numberSafeCompareFunction);
  var p, E, y, R, I;
  for (p = m.length - 1; p >= 0; --p) {
    var x = m[p].toString();
    for (y = this.replaysByZIndex_[x], E = Bt.ORDER.length - 1; E >= 0; --E)
      if (d = Bt.ORDER[E], R = y[d], R !== void 0) {
        if (o && (d == at.IMAGE || d == at.TEXT)) {
          var C = o[x];
          C ? C.push(R, l.slice(0)) : o[x] = [R, l.slice(0)];
        } else if (I = R.replayHitDetection(
          h,
          l,
          i,
          n,
          v,
          u
        ), I)
          return I;
      }
  }
};
Rt.prototype.getClipCoords = function(t) {
  var e = this.maxExtent_, i = e[0], r = e[1], n = e[2], a = e[3], o = [i, r, i, a, n, a, n, r];
  return re.transform2D(
    o,
    0,
    8,
    2,
    t,
    o
  ), o;
};
Rt.prototype.getReplay = function(t, e) {
  var i = t !== void 0 ? t.toString() : "0", r = this.replaysByZIndex_[i];
  r === void 0 && (r = {}, this.replaysByZIndex_[i] = r);
  var n = r[e];
  if (n === void 0) {
    var a = Rt.BATCH_CONSTRUCTORS_[e];
    n = new a(
      this.tolerance_,
      this.maxExtent_,
      this.resolution_,
      this.pixelRatio_,
      this.overlaps_,
      this.declutterTree_
    ), r[e] = n;
  }
  return n;
};
Rt.prototype.getReplays = function() {
  return this.replaysByZIndex_;
};
Rt.prototype.isEmpty = function() {
  return ut.isEmpty(this.replaysByZIndex_);
};
Rt.prototype.replay = function(t, e, i, r, n, a) {
  var o = Object.keys(this.replaysByZIndex_).map(Number);
  o.sort(st.numberSafeCompareFunction), t.save(), this.clip(t, e);
  var s = n || Bt.ORDER, l, h, u, f, c, d;
  for (l = 0, h = o.length; l < h; ++l) {
    var v = o[l].toString();
    for (c = this.replaysByZIndex_[v], u = 0, f = s.length; u < f; ++u) {
      var m = s[u];
      if (d = c[m], d !== void 0)
        if (a && (m == at.IMAGE || m == at.TEXT)) {
          var p = a[v];
          p ? p.push(d, e.slice(0)) : a[v] = [d, e.slice(0)];
        } else
          d.replay(t, e, i, r);
    }
  }
  t.restore();
};
Rt.BATCH_CONSTRUCTORS_ = {
  Circle: $i,
  Default: mt,
  Image: Ir,
  LineString: Sr,
  Polygon: $i,
  Text: Qi
};
var ot = {};
ot.defaultOrder = function(t, e) {
  return _.getUid(t) - _.getUid(e);
};
ot.getSquaredTolerance = function(t, e) {
  var i = ot.getTolerance(t, e);
  return i * i;
};
ot.getTolerance = function(t, e) {
  return _.SIMPLIFY_TOLERANCE * t / e;
};
ot.renderCircleGeometry_ = function(t, e, i, r) {
  var n = i.getFill(), a = i.getStroke();
  if (n || a) {
    var o = t.getReplay(
      i.getZIndex(),
      at.CIRCLE
    );
    o.setFillStrokeStyle(n, a), o.drawCircle(e, r);
  }
  var s = i.getText();
  if (s) {
    var l = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    l.setTextStyle(s, t.addDeclutter(!1)), l.drawText(e, r);
  }
};
ot.renderFeature = function(t, e, i, r, n, a) {
  var o = !1, s, l;
  return s = i.getImage(), s && (l = s.getImageState(), l == Ve.LOADED || l == Ve.ERROR ? s.unlistenImageChange(n, a) : (l == Ve.IDLE && s.load(), l = s.getImageState(), s.listenImageChange(n, a), o = !0)), ot.renderFeature_(
    t,
    e,
    i,
    r
  ), o;
};
ot.renderFeature_ = function(t, e, i, r) {
  var n = i.getGeometryFunction()(e);
  if (n) {
    var a = n.getSimplifiedGeometry(r), o = i.getRenderer();
    if (o)
      ot.renderGeometry_(t, a, i, e);
    else {
      var s = ot.GEOMETRY_RENDERERS_[a.getType()];
      s(t, a, i, e);
    }
  }
};
ot.renderGeometry_ = function(t, e, i, r) {
  if (e.getType() == j.GEOMETRY_COLLECTION) {
    for (var n = (
      /** @type {ol.geom.GeometryCollection} */
      e.getGeometries()
    ), a = 0, o = n.length; a < o; ++a)
      ot.renderGeometry_(t, n[a], i, r);
    return;
  }
  var s = t.getReplay(i.getZIndex(), at.DEFAULT);
  s.drawCustom(
    /** @type {ol.geom.SimpleGeometry} */
    e,
    r,
    i.getRenderer()
  );
};
ot.renderGeometryCollectionGeometry_ = function(t, e, i, r) {
  var n = e.getGeometriesArray(), a, o;
  for (a = 0, o = n.length; a < o; ++a) {
    var s = ot.GEOMETRY_RENDERERS_[n[a].getType()];
    s(t, n[a], i, r);
  }
};
ot.renderLineStringGeometry_ = function(t, e, i, r) {
  var n = i.getStroke();
  if (n) {
    var a = t.getReplay(
      i.getZIndex(),
      at.LINE_STRING
    );
    a.setFillStrokeStyle(null, n), a.drawLineString(e, r);
  }
  var o = i.getText();
  if (o) {
    var s = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    s.setTextStyle(o, t.addDeclutter(!1)), s.drawText(e, r);
  }
};
ot.renderMultiLineStringGeometry_ = function(t, e, i, r) {
  var n = i.getStroke();
  if (n) {
    var a = t.getReplay(
      i.getZIndex(),
      at.LINE_STRING
    );
    a.setFillStrokeStyle(null, n), a.drawMultiLineString(e, r);
  }
  var o = i.getText();
  if (o) {
    var s = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    s.setTextStyle(o, t.addDeclutter(!1)), s.drawText(e, r);
  }
};
ot.renderMultiPolygonGeometry_ = function(t, e, i, r) {
  var n = i.getFill(), a = i.getStroke();
  if (a || n) {
    var o = t.getReplay(
      i.getZIndex(),
      at.POLYGON
    );
    o.setFillStrokeStyle(n, a), o.drawMultiPolygon(e, r);
  }
  var s = i.getText();
  if (s) {
    var l = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    l.setTextStyle(s, t.addDeclutter(!1)), l.drawText(e, r);
  }
};
ot.renderPointGeometry_ = function(t, e, i, r) {
  var n = i.getImage();
  if (n) {
    if (n.getImageState() != Ve.LOADED)
      return;
    var a = t.getReplay(
      i.getZIndex(),
      at.IMAGE
    );
    a.setImageStyle(n, t.addDeclutter(!1)), a.drawPoint(e, r);
  }
  var o = i.getText();
  if (o) {
    var s = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    s.setTextStyle(o, t.addDeclutter(!!n)), s.drawText(e, r);
  }
};
ot.renderMultiPointGeometry_ = function(t, e, i, r) {
  var n = i.getImage();
  if (n) {
    if (n.getImageState() != Ve.LOADED)
      return;
    var a = t.getReplay(
      i.getZIndex(),
      at.IMAGE
    );
    a.setImageStyle(n, t.addDeclutter(!1)), a.drawMultiPoint(e, r);
  }
  var o = i.getText();
  if (o) {
    var s = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    s.setTextStyle(o, t.addDeclutter(!!n)), s.drawText(e, r);
  }
};
ot.renderPolygonGeometry_ = function(t, e, i, r) {
  var n = i.getFill(), a = i.getStroke();
  if (n || a) {
    var o = t.getReplay(
      i.getZIndex(),
      at.POLYGON
    );
    o.setFillStrokeStyle(n, a), o.drawPolygon(e, r);
  }
  var s = i.getText();
  if (s) {
    var l = t.getReplay(
      i.getZIndex(),
      at.TEXT
    );
    l.setTextStyle(s, t.addDeclutter(!1)), l.drawText(e, r);
  }
};
ot.GEOMETRY_RENDERERS_ = {
  Point: ot.renderPointGeometry_,
  LineString: ot.renderLineStringGeometry_,
  Polygon: ot.renderPolygonGeometry_,
  MultiPoint: ot.renderMultiPointGeometry_,
  MultiLineString: ot.renderMultiLineStringGeometry_,
  MultiPolygon: ot.renderMultiPolygonGeometry_,
  GeometryCollection: ot.renderGeometryCollectionGeometry_,
  Circle: ot.renderCircleGeometry_
};
var _i = function(t) {
  Je.call(this, t), this.declutterTree_ = t.getDeclutter() ? Jn(9) : null, this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = g.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.context = At.createCanvasContext2D(), L.listen(D.labelCache, it.CLEAR, this.handleFontsChanged_, this);
};
_.inherits(_i, Je);
_i.handles = function(t, e) {
  return t === ri.CANVAS && e.getType() === Di.VECTOR;
};
_i.create = function(t, e) {
  return new _i(
    /** @type {ol.layer.Vector} */
    e
  );
};
_i.prototype.disposeInternal = function() {
  L.unlisten(D.labelCache, it.CLEAR, this.handleFontsChanged_, this), Je.prototype.disposeInternal.call(this);
};
_i.prototype.composeFrame = function(t, e, i) {
  var r = t.extent, n = t.pixelRatio, a = e.managed ? t.skippedFeatureUids : {}, o = t.viewState, s = o.projection, l = o.rotation, h = s.getExtent(), u = (
    /** @type {ol.source.Vector} */
    this.getLayer().getSource()
  ), f = this.getTransform(t, 0);
  this.preCompose(i, t, f);
  var c = e.extent, d = c !== void 0;
  d && this.clip(
    i,
    t,
    /** @type {ol.Extent} */
    c
  );
  var v = this.replayGroup_;
  if (v && !v.isEmpty()) {
    this.declutterTree_ && this.declutterTree_.clear();
    var m = (
      /** @type {ol.layer.Vector} */
      this.getLayer()
    ), p = 0, E = 0, y, R = e.opacity !== 1, I = m.hasListener(Ci.RENDER);
    if (R || I) {
      var x = i.canvas.width, C = i.canvas.height;
      if (l) {
        var N = Math.round(Math.sqrt(x * x + C * C));
        p = (N - x) / 2, E = (N - C) / 2, x = C = N;
      }
      this.context.canvas.width = x, this.context.canvas.height = C, y = this.context;
    } else
      y = i;
    var w = y.globalAlpha;
    R || (y.globalAlpha = e.opacity), y != i && y.translate(p, E);
    var X = t.size[0] * n, U = t.size[1] * n;
    if (D.rotateAtOffset(
      y,
      -l,
      X / 2,
      U / 2
    ), v.replay(y, f, l, a), u.getWrapX() && s.canWrapX() && !g.containsExtent(h, r)) {
      for (var P = r[0], O = g.getWidth(h), q = 0, F; P < h[0]; )
        --q, F = O * q, f = this.getTransform(t, F), v.replay(y, f, l, a), P += O;
      for (q = 0, P = r[2]; P > h[2]; )
        ++q, F = O * q, f = this.getTransform(t, F), v.replay(y, f, l, a), P -= O;
      f = this.getTransform(t, 0);
    }
    if (D.rotateAtOffset(
      y,
      l,
      X / 2,
      U / 2
    ), y != i) {
      if (I && this.dispatchRenderEvent(y, t, f), R) {
        var b = i.globalAlpha;
        i.globalAlpha = e.opacity, i.drawImage(y.canvas, -p, -E), i.globalAlpha = b;
      } else
        i.drawImage(y.canvas, -p, -E);
      y.translate(-p, -E);
    }
    R || (y.globalAlpha = w);
  }
  d && i.restore(), this.postCompose(i, t, e, f);
};
_i.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  if (this.replayGroup_) {
    var a = e.viewState.resolution, o = e.viewState.rotation, s = (
      /** @type {ol.layer.Vector} */
      this.getLayer()
    ), l = {}, h = this.replayGroup_.forEachFeatureAtCoordinate(
      t,
      a,
      o,
      i,
      {},
      /**
       * @param {ol.Feature|ol.render.Feature} feature Feature.
       * @return {?} Callback result.
       */
      function(u) {
        var f = _.getUid(u).toString();
        if (!(f in l))
          return l[f] = !0, r.call(n, u, s);
      },
      null
    );
    return h;
  } else
    return;
};
_i.prototype.handleFontsChanged_ = function(t) {
  var e = this.getLayer();
  e.getVisible() && this.replayGroup_ && e.changed();
};
_i.prototype.handleStyleImageChange_ = function(t) {
  this.renderIfReadyAndVisible();
};
_i.prototype.prepareFrame = function(t, e) {
  var i = (
    /** @type {ol.layer.Vector} */
    this.getLayer()
  ), r = i.getSource();
  this.updateLogos(t, r);
  var n = t.viewHints[Dt.ANIMATING], a = t.viewHints[Dt.INTERACTING], o = i.getUpdateWhileAnimating(), s = i.getUpdateWhileInteracting();
  if (!this.dirty_ && !o && n || !s && a)
    return !0;
  var l = t.extent, h = t.viewState, u = h.projection, f = h.resolution, c = t.pixelRatio, d = i.getRevision(), v = i.getRenderBuffer(), m = i.getRenderOrder();
  m === void 0 && (m = ot.defaultOrder);
  var p = g.buffer(
    l,
    v * f
  ), E = h.projection.getExtent();
  if (r.getWrapX() && h.projection.canWrapX() && !g.containsExtent(E, t.extent)) {
    var y = g.getWidth(E), R = Math.max(g.getWidth(p) / 2, y);
    p[0] = E[0] - R, p[2] = E[2] + R;
  }
  if (!this.dirty_ && this.renderedResolution_ == f && this.renderedRevision_ == d && this.renderedRenderOrder_ == m && g.containsExtent(this.renderedExtent_, p))
    return this.replayGroupChanged = !1, !0;
  this.replayGroup_ = null, this.dirty_ = !1;
  var I = new Rt(
    ot.getTolerance(f, c),
    p,
    f,
    c,
    r.getOverlaps(),
    this.declutterTree_,
    i.getRenderBuffer()
  );
  r.loadFeatures(p, f, u);
  var x = (function(X) {
    var U, P = X.getStyleFunction();
    if (P ? U = P.call(X, f) : (P = i.getStyleFunction(), P && (U = P(X, f))), U) {
      var O = this.renderFeature(
        X,
        f,
        c,
        U,
        I
      );
      this.dirty_ = this.dirty_ || O;
    }
  }).bind(this);
  if (m) {
    var C = [];
    r.forEachFeatureInExtent(
      p,
      /**
       * @param {ol.Feature} feature Feature.
       */
      function(X) {
        C.push(X);
      },
      this
    ), C.sort(m);
    for (var N = 0, w = C.length; N < w; ++N)
      x(C[N]);
  } else
    r.forEachFeatureInExtent(p, x, this);
  return I.finish(), this.renderedResolution_ = f, this.renderedRevision_ = d, this.renderedRenderOrder_ = m, this.renderedExtent_ = p, this.replayGroup_ = I, this.replayGroupChanged = !0, !0;
};
_i.prototype.renderFeature = function(t, e, i, r, n) {
  if (!r)
    return !1;
  var a = !1;
  if (Array.isArray(r))
    for (var o = 0, s = r.length; o < s; ++o)
      a = ot.renderFeature(
        n,
        t,
        r[o],
        ot.getSquaredTolerance(e, i),
        this.handleStyleImageChange_,
        this
      ) || a;
  else
    a = ot.renderFeature(
      n,
      t,
      r,
      ot.getSquaredTolerance(e, i),
      this.handleStyleImageChange_,
      this
    );
  return a;
};
var Tn = {
  IMAGE: "image",
  HYBRID: "hybrid",
  VECTOR: "vector"
}, pe = function(t) {
  this.context = null, We.call(this, t), this.declutterTree_ = t.getDeclutter() ? Jn(9) : null, this.dirty_ = !1, this.renderedLayerRevision_, this.tmpTransform_ = A.create(), this.zDirection = t.getRenderMode() == Tn.VECTOR ? 1 : 0, L.listen(D.labelCache, it.CLEAR, this.handleFontsChanged_, this);
};
_.inherits(pe, We);
pe.handles = function(t, e) {
  return t === ri.CANVAS && e.getType() === Di.VECTOR_TILE;
};
pe.create = function(t, e) {
  return new pe(
    /** @type {ol.layer.VectorTile} */
    e
  );
};
pe.IMAGE_REPLAYS = {
  image: [
    at.POLYGON,
    at.CIRCLE,
    at.LINE_STRING,
    at.IMAGE,
    at.TEXT
  ],
  hybrid: [at.POLYGON, at.LINE_STRING]
};
pe.VECTOR_REPLAYS = {
  image: [at.DEFAULT],
  hybrid: [at.IMAGE, at.TEXT, at.DEFAULT],
  vector: Bt.ORDER
};
pe.prototype.disposeInternal = function() {
  L.unlisten(D.labelCache, it.CLEAR, this.handleFontsChanged_, this), We.prototype.disposeInternal.call(this);
};
pe.prototype.prepareFrame = function(t, e) {
  var i = this.getLayer(), r = i.getRevision();
  if (this.renderedLayerRevision_ != r) {
    this.renderedTiles.length = 0;
    var n = i.getRenderMode();
    !this.context && n != Tn.VECTOR && (this.context = At.createCanvasContext2D()), this.context && n == Tn.VECTOR && (this.context = null);
  }
  return this.renderedLayerRevision_ = r, We.prototype.prepareFrame.apply(this, arguments);
};
pe.prototype.createReplayGroup_ = function(t, e) {
  var i = this.getLayer(), r = e.pixelRatio, n = e.viewState.projection, a = i.getRevision(), o = (
    /** @type {ol.RenderOrderFunction} */
    i.getRenderOrder() || null
  ), s = t.getReplayState(i);
  if (!(!s.dirty && s.renderedRevision == a && s.renderedRenderOrder == o)) {
    for (var l = (
      /** @type {ol.source.VectorTile} */
      i.getSource()
    ), h = l.getTileGrid(), u = l.getTileGridForProjection(n), f = u.getResolution(t.tileCoord[0]), c = u.getTileCoordExtent(t.wrappedTileCoord), d = 0, v = t.tileKeys.length; d < v; ++d) {
      var m = t.getTile(t.tileKeys[d]);
      if (m.getState() != H.ERROR) {
        var p = m.tileCoord, E = h.getTileCoordExtent(p), y = g.getIntersection(c, E), R = g.equals(E, y) ? null : g.buffer(y, i.getRenderBuffer() * f), I = m.getProjection(), x = !1;
        k.equivalent(n, I) || (x = !0, m.setProjection(n)), s.dirty = !1;
        var C = new Rt(
          0,
          y,
          f,
          r,
          l.getOverlaps(),
          this.declutterTree_,
          i.getRenderBuffer()
        ), N = ot.getSquaredTolerance(
          f,
          r
        ), w = function(F) {
          var b, M = F.getStyleFunction();
          if (M ? b = M.call(
            /** @type {ol.Feature} */
            F,
            f
          ) : (M = i.getStyleFunction(), M && (b = M(F, f))), b) {
            var W = this.renderFeature(
              F,
              N,
              b,
              C
            );
            this.dirty_ = this.dirty_ || W, s.dirty = s.dirty || W;
          }
        }, X = m.getFeatures();
        o && o !== s.renderedRenderOrder && X.sort(o);
        for (var U, P = 0, O = X.length; P < O; ++P)
          U = X[P], x && (I.getUnits() == de.TILE_PIXELS && (I.setWorldExtent(E), I.setExtent(m.getExtent())), U.getGeometry().transform(I, n)), (!R || g.intersects(R, U.getGeometry().getExtent())) && w.call(this, U);
        C.finish();
        for (var q in C.getReplays())
          ;
        m.setReplayGroup(i, t.tileCoord.toString(), C);
      }
    }
    s.renderedRevision = a, s.renderedRenderOrder = o;
  }
};
pe.prototype.drawTileImage = function(t, e, i, r, n, a, o, s, l) {
  var h = (
    /** @type {ol.VectorImageTile} */
    t
  );
  this.createReplayGroup_(h, e), this.context && (this.renderTileImage_(h, e, i), We.prototype.drawTileImage.apply(this, arguments));
};
pe.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  var a = e.viewState.resolution, o = e.viewState.rotation;
  i = i ?? 0;
  var s = this.getLayer(), l = {}, h = this.renderedTiles, u = (
    /** @type {ol.source.VectorTile} */
    s.getSource()
  ), f = u.getTileGridForProjection(e.viewState.projection), c, d, v, m, p, E, y, R;
  for (v = 0, m = h.length; v < m; ++v)
    if (E = h[v], y = E.wrappedTileCoord, R = f.getTileCoordExtent(y, this.tmpExtent), c = g.buffer(R, i * a, c), !!g.containsCoordinate(c, t))
      for (var I = 0, x = E.tileKeys.length; I < x; ++I) {
        var C = E.getTile(E.tileKeys[I]);
        C.getState() != H.ERROR && (p = C.getReplayGroup(s, E.tileCoord.toString()), d = d || p.forEachFeatureAtCoordinate(
          t,
          a,
          o,
          i,
          {},
          /**
           * @param {ol.Feature|ol.render.Feature} feature Feature.
           * @return {?} Callback result.
           */
          function(N) {
            var w = _.getUid(N).toString();
            if (!(w in l))
              return l[w] = !0, r.call(n, N, s);
          },
          null
        ));
      }
  return d;
};
pe.prototype.getReplayTransform_ = function(t, e) {
  var i = this.getLayer(), r = (
    /** @type {ol.source.VectorTile} */
    i.getSource()
  ), n = r.getTileGrid(), a = t.tileCoord, o = n.getResolution(a[0]), s = e.viewState, l = e.pixelRatio, h = s.resolution / l, u = n.getTileCoordExtent(a, this.tmpExtent), f = s.center, c = g.getTopLeft(u), d = e.size, v = Math.round(l * d[0] / 2), m = Math.round(l * d[1] / 2);
  return A.compose(
    this.tmpTransform_,
    v,
    m,
    o / h,
    o / h,
    s.rotation,
    (c[0] - f[0]) / o,
    (f[1] - c[1]) / o
  );
};
pe.prototype.handleFontsChanged_ = function(t) {
  var e = this.getLayer();
  e.getVisible() && this.renderedLayerRevision_ !== void 0 && e.changed();
};
pe.prototype.handleStyleImageChange_ = function(t) {
  this.renderIfReadyAndVisible();
};
pe.prototype.postCompose = function(t, e, i) {
  var r = this.getLayer(), n = r.getDeclutter() ? {} : null, a = (
    /** @type {ol.source.VectorTile} */
    r.getSource()
  ), o = r.getRenderMode(), s = pe.VECTOR_REPLAYS[o], l = e.pixelRatio, h = e.viewState.rotation, u = e.size, f, c;
  h && (f = Math.round(l * u[0] / 2), c = Math.round(l * u[1] / 2), D.rotateAtOffset(t, -h, f, c)), n && this.declutterTree_.clear();
  for (var d = this.renderedTiles, v = a.getTileGridForProjection(e.viewState.projection), m = [], p = [], E = d.length - 1; E >= 0; --E) {
    var y = (
      /** @type {ol.VectorImageTile} */
      d[E]
    );
    if (y.getState() != H.ABORT)
      for (var R = y.tileCoord, I = v.getTileCoordExtent(R)[0] - v.getTileCoordExtent(y.wrappedTileCoord)[0], x = void 0, C = 0, N = y.tileKeys.length; C < N; ++C) {
        var w = y.getTile(y.tileKeys[C]);
        if (w.getState() != H.ERROR) {
          var X = w.getReplayGroup(r, R.toString());
          if (!(o != Tn.VECTOR && !X.hasReplays(s))) {
            x || (x = this.getTransform(e, I));
            var U = w.tileCoord[0], P = X.getClipCoords(x);
            t.save(), t.globalAlpha = i.opacity;
            for (var O = 0, q = m.length; O < q; ++O) {
              var F = m[O];
              U < p[O] && (t.beginPath(), t.moveTo(P[0], P[1]), t.lineTo(P[2], P[3]), t.lineTo(P[4], P[5]), t.lineTo(P[6], P[7]), t.moveTo(F[6], F[7]), t.lineTo(F[4], F[5]), t.lineTo(F[2], F[3]), t.lineTo(F[0], F[1]), t.clip());
            }
            X.replay(t, x, h, {}, s, n), t.restore(), m.push(P), p.push(U);
          }
        }
      }
  }
  n && Rt.replayDeclutter(n, t, h), h && D.rotateAtOffset(
    t,
    h,
    /** @type {number} */
    f,
    /** @type {number} */
    c
  ), We.prototype.postCompose.apply(this, arguments);
};
pe.prototype.renderFeature = function(t, e, i, r) {
  if (!i)
    return !1;
  var n = !1;
  if (Array.isArray(i))
    for (var a = 0, o = i.length; a < o; ++a)
      n = ot.renderFeature(
        r,
        t,
        i[a],
        e,
        this.handleStyleImageChange_,
        this
      ) || n;
  else
    n = ot.renderFeature(
      r,
      t,
      i,
      e,
      this.handleStyleImageChange_,
      this
    );
  return n;
};
pe.prototype.renderTileImage_ = function(t, e, i) {
  var r = this.getLayer(), n = t.getReplayState(r), a = r.getRevision(), o = pe.IMAGE_REPLAYS[r.getRenderMode()];
  if (o && n.renderedTileRevision !== a) {
    n.renderedTileRevision = a;
    var s = t.wrappedTileCoord, l = s[0], h = e.pixelRatio, u = (
      /** @type {ol.source.VectorTile} */
      r.getSource()
    ), f = u.getTileGridForProjection(e.viewState.projection), c = f.getResolution(l), d = t.getContext(r), v = u.getTilePixelSize(l, h, e.viewState.projection);
    d.canvas.width = v[0], d.canvas.height = v[1];
    for (var m = f.getTileCoordExtent(s), p = 0, E = t.tileKeys.length; p < E; ++p) {
      var y = t.getTile(t.tileKeys[p]);
      if (y.getState() != H.ERROR) {
        var R = h / c, I = A.reset(this.tmpTransform_);
        A.scale(I, R, -R), A.translate(I, -m[0], -m[3]);
        var x = y.getReplayGroup(r, t.tileCoord.toString());
        x.replay(d, I, 0, {}, o);
      }
    }
  }
};
var Lr = function(t) {
  this.source_ = t;
};
Lr.prototype.getType = function() {
};
Lr.prototype.getSource = function() {
  return this.source_;
};
Lr.prototype.isAnimated = se.FALSE;
var ur = function(t) {
  Lr.call(this, t);
};
_.inherits(ur, Lr);
ur.prototype.getType = function() {
  return S.FRAGMENT_SHADER;
};
var fr = function(t) {
  Lr.call(this, t);
};
_.inherits(fr, Lr);
fr.prototype.getType = function() {
  return S.VERTEX_SHADER;
};
var Rn = {};
Rn.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;
varying vec2 v_center;
varying vec2 v_offset;
varying float v_halfWidth;
varying float v_pixelRatio;



uniform float u_opacity;
uniform vec4 u_fillColor;
uniform vec4 u_strokeColor;
uniform vec2 u_size;

void main(void) {
  vec2 windowCenter = vec2((v_center.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,
      (v_center.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);
  vec2 windowOffset = vec2((v_offset.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,
      (v_offset.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);
  float radius = length(windowCenter - windowOffset);
  float dist = length(windowCenter - gl_FragCoord.xy);
  if (dist > radius + v_halfWidth) {
    if (u_strokeColor.a == 0.0) {
      gl_FragColor = u_fillColor;
    } else {
      gl_FragColor = u_strokeColor;
    }
    gl_FragColor.a = gl_FragColor.a - (dist - (radius + v_halfWidth));
  } else if (u_fillColor.a == 0.0) {
    // Hooray, no fill, just stroke. We can use real antialiasing.
    gl_FragColor = u_strokeColor;
    if (dist < radius - v_halfWidth) {
      gl_FragColor.a = gl_FragColor.a - (radius - v_halfWidth - dist);
    }
  } else {
    gl_FragColor = u_fillColor;
    float strokeDist = radius - v_halfWidth;
    float antialias = 2.0 * v_pixelRatio;
    if (dist > strokeDist) {
      gl_FragColor = u_strokeColor;
    } else if (dist >= strokeDist - antialias) {
      float step = smoothstep(strokeDist - antialias, strokeDist, dist);
      gl_FragColor = mix(u_fillColor, u_strokeColor, step);
    }
  }
  gl_FragColor.a = gl_FragColor.a * u_opacity;
  if (gl_FragColor.a <= 0.0) {
    discard;
  }
}
` : "precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}");
Rn.vertex = new fr(_.DEBUG_WEBGL ? `varying vec2 v_center;
varying vec2 v_offset;
varying float v_halfWidth;
varying float v_pixelRatio;


attribute vec2 a_position;
attribute float a_instruction;
attribute float a_radius;

uniform mat4 u_projectionMatrix;
uniform mat4 u_offsetScaleMatrix;
uniform mat4 u_offsetRotateMatrix;
uniform float u_lineWidth;
uniform float u_pixelRatio;

void main(void) {
  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;
  v_center = vec4(u_projectionMatrix * vec4(a_position, 0.0, 1.0)).xy;
  v_pixelRatio = u_pixelRatio;
  float lineWidth = u_lineWidth * u_pixelRatio;
  v_halfWidth = lineWidth / 2.0;
  if (lineWidth == 0.0) {
    lineWidth = 2.0 * u_pixelRatio;
  }
  vec2 offset;
  // Radius with anitaliasing (roughly).
  float radius = a_radius + 3.0 * u_pixelRatio;
  // Until we get gl_VertexID in WebGL, we store an instruction.
  if (a_instruction == 0.0) {
    // Offsetting the edges of the triangle by lineWidth / 2 is necessary, however
    // we should also leave some space for the antialiasing, thus we offset by lineWidth.
    offset = vec2(-1.0, 1.0);
  } else if (a_instruction == 1.0) {
    offset = vec2(-1.0, -1.0);
  } else if (a_instruction == 2.0) {
    offset = vec2(1.0, -1.0);
  } else {
    offset = vec2(1.0, 1.0);
  }

  gl_Position = u_projectionMatrix * vec4(a_position + offset * radius, 0.0, 1.0) +
      offsetMatrix * vec4(offset * lineWidth, 0.0, 0.0);
  v_offset = vec4(u_projectionMatrix * vec4(a_position.x + a_radius, a_position.y,
      0.0, 1.0)).xy;

  if (distance(v_center, v_offset) > 20000.0) {
    gl_Position = vec4(v_center, 0.0, 1.0);
  }
}


` : "varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;//Until we get gl_VertexID in WebGL,we store an instruction.if(f==0.0){//Offsetting the edges of the triangle by lineWidth/2 is necessary,however//we should also leave some space for the antialiasing,thus we offset by lineWidth.offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}");
var Po = function(t, e) {
  this.u_projectionMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_projectionMatrix" : "h"
  ), this.u_offsetScaleMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"
  ), this.u_offsetRotateMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"
  ), this.u_lineWidth = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_lineWidth" : "k"
  ), this.u_pixelRatio = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_pixelRatio" : "l"
  ), this.u_opacity = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_opacity" : "m"
  ), this.u_fillColor = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_fillColor" : "n"
  ), this.u_strokeColor = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_strokeColor" : "o"
  ), this.u_size = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_size" : "p"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "e"
  ), this.a_instruction = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_instruction" : "f"
  ), this.a_radius = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_radius" : "g"
  );
}, ji = {};
ji.create = function() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};
ji.fromTransform = function(t, e) {
  return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t;
};
var Re = function(t, e) {
  zt.call(this), this.tolerance = t, this.maxExtent = e, this.origin = g.getCenter(e), this.projectionMatrix_ = A.create(), this.offsetRotateMatrix_ = A.create(), this.offsetScaleMatrix_ = A.create(), this.tmpMat4_ = ji.create(), this.indices = [], this.indicesBuffer = null, this.startIndices = [], this.startIndicesFeature = [], this.vertices = [], this.verticesBuffer = null, this.lineStringReplay = void 0;
};
_.inherits(Re, zt);
Re.prototype.getDeleteResourcesFunction = function(t) {
};
Re.prototype.finish = function(t) {
};
Re.prototype.setUpProgram = function(t, e, i, r) {
};
Re.prototype.shutDownProgram = function(t, e) {
};
Re.prototype.drawReplay = function(t, e, i, r) {
};
Re.prototype.drawHitDetectionReplayOneByOne = function(t, e, i, r, n) {
};
Re.prototype.drawHitDetectionReplay = function(t, e, i, r, n, a) {
  return n ? this.drawHitDetectionReplayOneByOne(
    t,
    e,
    i,
    r,
    a
  ) : this.drawHitDetectionReplayAll(
    t,
    e,
    i,
    r
  );
};
Re.prototype.drawHitDetectionReplayAll = function(t, e, i, r) {
  t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawReplay(t, e, i, !0);
  var n = r(null);
  if (n)
    return n;
};
Re.prototype.replay = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f = t.getGL(), c, d, v, m, p, E, y, R;
  this.lineStringReplay && (c = f.isEnabled(f.STENCIL_TEST), d = f.getParameter(f.STENCIL_FUNC), v = f.getParameter(f.STENCIL_VALUE_MASK), m = f.getParameter(f.STENCIL_REF), p = f.getParameter(f.STENCIL_WRITEMASK), E = f.getParameter(f.STENCIL_FAIL), y = f.getParameter(f.STENCIL_PASS_DEPTH_PASS), R = f.getParameter(f.STENCIL_PASS_DEPTH_FAIL), f.enable(f.STENCIL_TEST), f.clear(f.STENCIL_BUFFER_BIT), f.stencilMask(255), f.stencilFunc(f.ALWAYS, 1, 255), f.stencilOp(f.KEEP, f.KEEP, f.REPLACE), this.lineStringReplay.replay(
    t,
    e,
    i,
    r,
    n,
    a,
    o,
    s,
    l,
    h,
    u
  ), f.stencilMask(0), f.stencilFunc(f.NOTEQUAL, 1, 255)), t.bindBuffer(S.ARRAY_BUFFER, this.verticesBuffer), t.bindBuffer(S.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
  var I = this.setUpProgram(f, t, n, a), x = A.reset(this.projectionMatrix_);
  A.scale(x, 2 / (i * n[0]), 2 / (i * n[1])), A.rotate(x, -r), A.translate(x, -(e[0] - this.origin[0]), -(e[1] - this.origin[1]));
  var C = A.reset(this.offsetScaleMatrix_);
  A.scale(C, 2 / n[0], 2 / n[1]);
  var N = A.reset(this.offsetRotateMatrix_);
  r !== 0 && A.rotate(N, -r), f.uniformMatrix4fv(
    I.u_projectionMatrix,
    !1,
    ji.fromTransform(this.tmpMat4_, x)
  ), f.uniformMatrix4fv(
    I.u_offsetScaleMatrix,
    !1,
    ji.fromTransform(this.tmpMat4_, C)
  ), f.uniformMatrix4fv(
    I.u_offsetRotateMatrix,
    !1,
    ji.fromTransform(this.tmpMat4_, N)
  ), f.uniform1f(I.u_opacity, o);
  var w;
  return l === void 0 ? this.drawReplay(f, t, s, !1) : w = this.drawHitDetectionReplay(
    f,
    t,
    s,
    l,
    h,
    u
  ), this.shutDownProgram(f, I), this.lineStringReplay && (c || f.disable(f.STENCIL_TEST), f.clear(f.STENCIL_BUFFER_BIT), f.stencilFunc(
    /** @type {number} */
    d,
    /** @type {number} */
    m,
    /** @type {number} */
    v
  ), f.stencilMask(
    /** @type {number} */
    p
  ), f.stencilOp(
    /** @type {number} */
    E,
    /** @type {number} */
    R,
    /** @type {number} */
    y
  )), w;
};
Re.prototype.drawElements = function(t, e, i, r) {
  var n = e.hasOESElementIndexUint ? S.UNSIGNED_INT : S.UNSIGNED_SHORT, a = e.hasOESElementIndexUint ? 4 : 2, o = r - i, s = i * a;
  t.drawElements(S.TRIANGLES, o, n, s);
};
var et = {};
et.defaultFont = "10px sans-serif";
et.defaultFillStyle = [0, 0, 0, 1];
et.defaultLineCap = "round";
et.defaultLineDash = [];
et.defaultLineDashOffset = 0;
et.defaultLineJoin = "round";
et.defaultMiterLimit = 10;
et.defaultStrokeStyle = [0, 0, 0, 1];
et.defaultTextAlign = 0.5;
et.defaultTextBaseline = 0.5;
et.defaultLineWidth = 1;
et.triangleIsCounterClockwise = function(t, e, i, r, n, a) {
  var o = (i - t) * (a - e) - (n - t) * (r - e);
  return o <= et.EPSILON && o >= -et.EPSILON ? void 0 : o > 0;
};
et.EPSILON = Number.EPSILON || 2220446049250313e-31;
var ze = function(t, e) {
  this.arr_ = t !== void 0 ? t : [], this.usage_ = e !== void 0 ? e : ze.Usage_.STATIC_DRAW;
};
ze.prototype.getArray = function() {
  return this.arr_;
};
ze.prototype.getUsage = function() {
  return this.usage_;
};
ze.Usage_ = {
  STATIC_DRAW: S.STATIC_DRAW,
  STREAM_DRAW: S.STREAM_DRAW,
  DYNAMIC_DRAW: S.DYNAMIC_DRAW
};
var ai = function(t, e) {
  Re.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.radius_ = 0, this.state_ = {
    fillColor: null,
    strokeColor: null,
    lineDash: null,
    lineDashOffset: void 0,
    lineWidth: void 0,
    changed: !1
  };
};
_.inherits(ai, Re);
ai.prototype.drawCoordinates_ = function(t, e, i, r) {
  var n = this.vertices.length, a = this.indices.length, o = n / 4, s, l;
  for (s = e, l = i; s < l; s += r)
    this.vertices[n++] = t[s], this.vertices[n++] = t[s + 1], this.vertices[n++] = 0, this.vertices[n++] = this.radius_, this.vertices[n++] = t[s], this.vertices[n++] = t[s + 1], this.vertices[n++] = 1, this.vertices[n++] = this.radius_, this.vertices[n++] = t[s], this.vertices[n++] = t[s + 1], this.vertices[n++] = 2, this.vertices[n++] = this.radius_, this.vertices[n++] = t[s], this.vertices[n++] = t[s + 1], this.vertices[n++] = 3, this.vertices[n++] = this.radius_, this.indices[a++] = o, this.indices[a++] = o + 1, this.indices[a++] = o + 2, this.indices[a++] = o + 2, this.indices[a++] = o + 3, this.indices[a++] = o, o += 4;
};
ai.prototype.drawCircle = function(t, e) {
  var i = t.getRadius(), r = t.getStride();
  if (i) {
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.radius_ = i;
    var n = t.getFlatCoordinates();
    n = re.translate(
      n,
      0,
      2,
      r,
      -this.origin[0],
      -this.origin[1]
    ), this.drawCoordinates_(n, 0, 2, r);
  } else if (this.state_.changed && (this.styles_.pop(), this.styles_.length)) {
    var a = this.styles_[this.styles_.length - 1];
    this.state_.fillColor = /** @type {Array.<number>} */
    a[0], this.state_.strokeColor = /** @type {Array.<number>} */
    a[1], this.state_.lineWidth = /** @type {number} */
    a[2], this.state_.changed = !1;
  }
};
ai.prototype.finish = function(t) {
  this.verticesBuffer = new ze(this.vertices), this.indicesBuffer = new ze(this.indices), this.startIndices.push(this.indices.length), this.styleIndices_.length === 0 && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null;
};
ai.prototype.getDeleteResourcesFunction = function(t) {
  var e = this.verticesBuffer, i = this.indicesBuffer;
  return function() {
    t.deleteBuffer(e), t.deleteBuffer(i);
  };
};
ai.prototype.setUpProgram = function(t, e, i, r) {
  var n, a;
  n = Rn.fragment, a = Rn.vertex;
  var o = e.getProgram(n, a), s;
  return this.defaultLocations_ ? s = this.defaultLocations_ : (s = new Po(t, o), this.defaultLocations_ = s), e.useProgram(o), t.enableVertexAttribArray(s.a_position), t.vertexAttribPointer(
    s.a_position,
    2,
    S.FLOAT,
    !1,
    16,
    0
  ), t.enableVertexAttribArray(s.a_instruction), t.vertexAttribPointer(
    s.a_instruction,
    1,
    S.FLOAT,
    !1,
    16,
    8
  ), t.enableVertexAttribArray(s.a_radius), t.vertexAttribPointer(
    s.a_radius,
    1,
    S.FLOAT,
    !1,
    16,
    12
  ), t.uniform2fv(s.u_size, i), t.uniform1f(s.u_pixelRatio, r), s;
};
ai.prototype.shutDownProgram = function(t, e) {
  t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_instruction), t.disableVertexAttribArray(e.a_radius);
};
ai.prototype.drawReplay = function(t, e, i, r) {
  if (!ut.isEmpty(i))
    this.drawReplaySkipping_(t, e, i);
  else {
    var n, a, o, s;
    for (o = this.startIndices[this.startIndices.length - 1], n = this.styleIndices_.length - 1; n >= 0; --n)
      a = this.styleIndices_[n], s = this.styles_[n], this.setFillStyle_(
        t,
        /** @type {Array.<number>} */
        s[0]
      ), this.setStrokeStyle_(
        t,
        /** @type {Array.<number>} */
        s[1],
        /** @type {number} */
        s[2]
      ), this.drawElements(t, e, a, o), o = a;
  }
};
ai.prototype.drawHitDetectionReplayOneByOne = function(t, e, i, r, n) {
  var a, o, s, l, h, u, f, c;
  for (c = this.startIndices.length - 2, s = this.startIndices[c + 1], a = this.styleIndices_.length - 1; a >= 0; --a)
    for (l = this.styles_[a], this.setFillStyle_(
      t,
      /** @type {Array.<number>} */
      l[0]
    ), this.setStrokeStyle_(
      t,
      /** @type {Array.<number>} */
      l[1],
      /** @type {number} */
      l[2]
    ), h = this.styleIndices_[a]; c >= 0 && this.startIndices[c] >= h; ) {
      if (o = this.startIndices[c], u = this.startIndicesFeature[c], f = _.getUid(u).toString(), i[f] === void 0 && u.getGeometry() && (n === void 0 || g.intersects(
        /** @type {Array<number>} */
        n,
        u.getGeometry().getExtent()
      ))) {
        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, o, s);
        var d = r(u);
        if (d)
          return d;
      }
      c--, s = o;
    }
};
ai.prototype.drawReplaySkipping_ = function(t, e, i) {
  var r, n, a, o, s, l, h, u, f;
  for (u = this.startIndices.length - 2, a = n = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (o = this.styles_[r], this.setFillStyle_(
      t,
      /** @type {Array.<number>} */
      o[0]
    ), this.setStrokeStyle_(
      t,
      /** @type {Array.<number>} */
      o[1],
      /** @type {number} */
      o[2]
    ), s = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= s; )
      f = this.startIndices[u], l = this.startIndicesFeature[u], h = _.getUid(l).toString(), i[h] && (n !== a && this.drawElements(t, e, n, a), a = f), u--, n = f;
    n !== a && this.drawElements(t, e, n, a), n = a = s;
  }
};
ai.prototype.setFillStyle_ = function(t, e) {
  t.uniform4fv(this.defaultLocations_.u_fillColor, e);
};
ai.prototype.setStrokeStyle_ = function(t, e, i) {
  t.uniform4fv(this.defaultLocations_.u_strokeColor, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i);
};
ai.prototype.setFillStrokeStyle = function(t, e) {
  var i, r;
  if (e) {
    var n = e.getLineDash();
    this.state_.lineDash = n || et.defaultLineDash;
    var a = e.getLineDashOffset();
    this.state_.lineDashOffset = a || et.defaultLineDashOffset, i = e.getColor(), !(i instanceof CanvasGradient) && !(i instanceof CanvasPattern) ? i = Xt.asArray(i).map(function(s, l) {
      return l != 3 ? s / 255 : s;
    }) || et.defaultStrokeStyle : i = et.defaultStrokeStyle, r = e.getWidth(), r = r !== void 0 ? r : et.defaultLineWidth;
  } else
    i = [0, 0, 0, 0], r = 0;
  var o = t ? t.getColor() : [0, 0, 0, 0];
  !(o instanceof CanvasGradient) && !(o instanceof CanvasPattern) ? o = Xt.asArray(o).map(function(s, l) {
    return l != 3 ? s / 255 : s;
  }) || et.defaultFillStyle : o = et.defaultFillStyle, (!this.state_.strokeColor || !st.equals(this.state_.strokeColor, i) || !this.state_.fillColor || !st.equals(this.state_.fillColor, o) || this.state_.lineWidth !== r) && (this.state_.changed = !0, this.state_.fillColor = o, this.state_.strokeColor = i, this.state_.lineWidth = r, this.styles_.push([o, i, r]));
};
var xn = {};
xn.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;
varying vec2 v_texCoord;
varying float v_opacity;

uniform float u_opacity;
uniform sampler2D u_image;

void main(void) {
  vec4 texColor = texture2D(u_image, v_texCoord);
  gl_FragColor.rgb = texColor.rgb;
  float alpha = texColor.a * v_opacity * u_opacity;
  if (alpha == 0.0) {
    discard;
  }
  gl_FragColor.a = alpha;
}
` : "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}");
xn.vertex = new fr(_.DEBUG_WEBGL ? `varying vec2 v_texCoord;
varying float v_opacity;

attribute vec2 a_position;
attribute vec2 a_texCoord;
attribute vec2 a_offsets;
attribute float a_opacity;
attribute float a_rotateWithView;

uniform mat4 u_projectionMatrix;
uniform mat4 u_offsetScaleMatrix;
uniform mat4 u_offsetRotateMatrix;

void main(void) {
  mat4 offsetMatrix = u_offsetScaleMatrix;
  if (a_rotateWithView == 1.0) {
    offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;
  }
  vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);
  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;
  v_texCoord = a_texCoord;
  v_opacity = a_opacity;
}


` : "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}");
var Mo = function(t, e) {
  this.u_projectionMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_projectionMatrix" : "h"
  ), this.u_offsetScaleMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"
  ), this.u_offsetRotateMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"
  ), this.u_opacity = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_opacity" : "k"
  ), this.u_image = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_image" : "l"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "c"
  ), this.a_texCoord = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_texCoord" : "d"
  ), this.a_offsets = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_offsets" : "e"
  ), this.a_opacity = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_opacity" : "f"
  ), this.a_rotateWithView = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_rotateWithView" : "g"
  );
}, Cn = {
  LOST: "webglcontextlost",
  RESTORED: "webglcontextrestored"
}, Jt = function(t, e) {
  this.canvas_ = t, this.gl_ = e, this.bufferCache_ = {}, this.shaderCache_ = {}, this.programCache_ = {}, this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null, this.hasOESElementIndexUint = st.includes(
    _.WEBGL_EXTENSIONS,
    "OES_element_index_uint"
  ), this.hasOESElementIndexUint && e.getExtension("OES_element_index_uint"), L.listen(
    this.canvas_,
    Cn.LOST,
    this.handleWebGLContextLost,
    this
  ), L.listen(
    this.canvas_,
    Cn.RESTORED,
    this.handleWebGLContextRestored,
    this
  );
};
_.inherits(Jt, tr);
Jt.prototype.bindBuffer = function(t, e) {
  var i = this.getGL(), r = e.getArray(), n = String(_.getUid(e));
  if (n in this.bufferCache_) {
    var a = this.bufferCache_[n];
    i.bindBuffer(t, a.buffer);
  } else {
    var o = i.createBuffer();
    i.bindBuffer(t, o);
    var s;
    t == S.ARRAY_BUFFER ? s = new Float32Array(r) : t == S.ELEMENT_ARRAY_BUFFER && (s = this.hasOESElementIndexUint ? new Uint32Array(r) : new Uint16Array(r)), i.bufferData(t, s, e.getUsage()), this.bufferCache_[n] = {
      buf: e,
      buffer: o
    };
  }
};
Jt.prototype.deleteBuffer = function(t) {
  var e = this.getGL(), i = String(_.getUid(t)), r = this.bufferCache_[i];
  e.isContextLost() || e.deleteBuffer(r.buffer), delete this.bufferCache_[i];
};
Jt.prototype.disposeInternal = function() {
  L.unlistenAll(this.canvas_);
  var t = this.getGL();
  if (!t.isContextLost()) {
    var e;
    for (e in this.bufferCache_)
      t.deleteBuffer(this.bufferCache_[e].buffer);
    for (e in this.programCache_)
      t.deleteProgram(this.programCache_[e]);
    for (e in this.shaderCache_)
      t.deleteShader(this.shaderCache_[e]);
    t.deleteFramebuffer(this.hitDetectionFramebuffer_), t.deleteRenderbuffer(this.hitDetectionRenderbuffer_), t.deleteTexture(this.hitDetectionTexture_);
  }
};
Jt.prototype.getCanvas = function() {
  return this.canvas_;
};
Jt.prototype.getGL = function() {
  return this.gl_;
};
Jt.prototype.getHitDetectionFramebuffer = function() {
  return this.hitDetectionFramebuffer_ || this.initHitDetectionFramebuffer_(), this.hitDetectionFramebuffer_;
};
Jt.prototype.getShader = function(t) {
  var e = String(_.getUid(t));
  if (e in this.shaderCache_)
    return this.shaderCache_[e];
  var i = this.getGL(), r = i.createShader(t.getType());
  return i.shaderSource(r, t.getSource()), i.compileShader(r), this.shaderCache_[e] = r, r;
};
Jt.prototype.getProgram = function(t, e) {
  var i = _.getUid(t) + "/" + _.getUid(e);
  if (i in this.programCache_)
    return this.programCache_[i];
  var r = this.getGL(), n = r.createProgram();
  return r.attachShader(n, this.getShader(t)), r.attachShader(n, this.getShader(e)), r.linkProgram(n), this.programCache_[i] = n, n;
};
Jt.prototype.handleWebGLContextLost = function() {
  ut.clear(this.bufferCache_), ut.clear(this.shaderCache_), ut.clear(this.programCache_), this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null;
};
Jt.prototype.handleWebGLContextRestored = function() {
};
Jt.prototype.initHitDetectionFramebuffer_ = function() {
  var t = this.gl_, e = t.createFramebuffer();
  t.bindFramebuffer(t.FRAMEBUFFER, e);
  var i = Jt.createEmptyTexture(t, 1, 1), r = t.createRenderbuffer();
  t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, 1, 1), t.framebufferTexture2D(
    t.FRAMEBUFFER,
    t.COLOR_ATTACHMENT0,
    t.TEXTURE_2D,
    i,
    0
  ), t.framebufferRenderbuffer(
    t.FRAMEBUFFER,
    t.DEPTH_ATTACHMENT,
    t.RENDERBUFFER,
    r
  ), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.hitDetectionFramebuffer_ = e, this.hitDetectionTexture_ = i, this.hitDetectionRenderbuffer_ = r;
};
Jt.prototype.useProgram = function(t) {
  if (t == this.currentProgram_)
    return !1;
  var e = this.getGL();
  return e.useProgram(t), this.currentProgram_ = t, !0;
};
Jt.createTexture_ = function(t, e, i) {
  var r = t.createTexture();
  return t.bindTexture(t.TEXTURE_2D, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), e !== void 0 && t.texParameteri(
    S.TEXTURE_2D,
    S.TEXTURE_WRAP_S,
    e
  ), i !== void 0 && t.texParameteri(
    S.TEXTURE_2D,
    S.TEXTURE_WRAP_T,
    i
  ), r;
};
Jt.createEmptyTexture = function(t, e, i, r, n) {
  var a = Jt.createTexture_(t, r, n);
  return t.texImage2D(
    t.TEXTURE_2D,
    0,
    t.RGBA,
    e,
    i,
    0,
    t.RGBA,
    t.UNSIGNED_BYTE,
    null
  ), a;
};
Jt.createTexture = function(t, e, i, r) {
  var n = Jt.createTexture_(t, i, r);
  return t.texImage2D(
    t.TEXTURE_2D,
    0,
    t.RGBA,
    t.RGBA,
    t.UNSIGNED_BYTE,
    e
  ), n;
};
var Pe = function(t, e) {
  Re.call(this, t, e), this.anchorX = void 0, this.anchorY = void 0, this.groupIndices = [], this.hitDetectionGroupIndices = [], this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.defaultLocations = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.width = void 0;
};
_.inherits(Pe, Re);
Pe.prototype.getDeleteResourcesFunction = function(t) {
  var e = this.verticesBuffer, i = this.indicesBuffer, r = this.getTextures(!0), n = t.getGL();
  return function() {
    if (!n.isContextLost()) {
      var a, o;
      for (a = 0, o = r.length; a < o; ++a)
        n.deleteTexture(r[a]);
    }
    t.deleteBuffer(e), t.deleteBuffer(i);
  };
};
Pe.prototype.drawCoordinates = function(t, e, i, r) {
  var n = (
    /** @type {number} */
    this.anchorX
  ), a = (
    /** @type {number} */
    this.anchorY
  ), o = (
    /** @type {number} */
    this.height
  ), s = (
    /** @type {number} */
    this.imageHeight
  ), l = (
    /** @type {number} */
    this.imageWidth
  ), h = (
    /** @type {number} */
    this.opacity
  ), u = (
    /** @type {number} */
    this.originX
  ), f = (
    /** @type {number} */
    this.originY
  ), c = this.rotateWithView ? 1 : 0, d = (
    /** @type {number} */
    -this.rotation
  ), v = (
    /** @type {number} */
    this.scale
  ), m = (
    /** @type {number} */
    this.width
  ), p = Math.cos(d), E = Math.sin(d), y = this.indices.length, R = this.vertices.length, I, x, C, N, w, X;
  for (I = e; I < i; I += r)
    w = t[I] - this.origin[0], X = t[I + 1] - this.origin[1], x = R / 8, C = -v * n, N = -v * (o - a), this.vertices[R++] = w, this.vertices[R++] = X, this.vertices[R++] = C * p - N * E, this.vertices[R++] = C * E + N * p, this.vertices[R++] = u / l, this.vertices[R++] = (f + o) / s, this.vertices[R++] = h, this.vertices[R++] = c, C = v * (m - n), N = -v * (o - a), this.vertices[R++] = w, this.vertices[R++] = X, this.vertices[R++] = C * p - N * E, this.vertices[R++] = C * E + N * p, this.vertices[R++] = (u + m) / l, this.vertices[R++] = (f + o) / s, this.vertices[R++] = h, this.vertices[R++] = c, C = v * (m - n), N = v * a, this.vertices[R++] = w, this.vertices[R++] = X, this.vertices[R++] = C * p - N * E, this.vertices[R++] = C * E + N * p, this.vertices[R++] = (u + m) / l, this.vertices[R++] = f / s, this.vertices[R++] = h, this.vertices[R++] = c, C = -v * n, N = v * a, this.vertices[R++] = w, this.vertices[R++] = X, this.vertices[R++] = C * p - N * E, this.vertices[R++] = C * E + N * p, this.vertices[R++] = u / l, this.vertices[R++] = f / s, this.vertices[R++] = h, this.vertices[R++] = c, this.indices[y++] = x, this.indices[y++] = x + 1, this.indices[y++] = x + 2, this.indices[y++] = x, this.indices[y++] = x + 2, this.indices[y++] = x + 3;
  return R;
};
Pe.prototype.createTextures = function(t, e, i, r) {
  var n, a, o, s, l = e.length;
  for (s = 0; s < l; ++s)
    a = e[s], o = _.getUid(a).toString(), o in i ? n = i[o] : (n = Jt.createTexture(
      r,
      a,
      S.CLAMP_TO_EDGE,
      S.CLAMP_TO_EDGE
    ), i[o] = n), t[s] = n;
};
Pe.prototype.setUpProgram = function(t, e, i, r) {
  var n = xn.fragment, a = xn.vertex, o = e.getProgram(n, a), s;
  return this.defaultLocations ? s = this.defaultLocations : (s = new Mo(t, o), this.defaultLocations = s), e.useProgram(o), t.enableVertexAttribArray(s.a_position), t.vertexAttribPointer(
    s.a_position,
    2,
    S.FLOAT,
    !1,
    32,
    0
  ), t.enableVertexAttribArray(s.a_offsets), t.vertexAttribPointer(
    s.a_offsets,
    2,
    S.FLOAT,
    !1,
    32,
    8
  ), t.enableVertexAttribArray(s.a_texCoord), t.vertexAttribPointer(
    s.a_texCoord,
    2,
    S.FLOAT,
    !1,
    32,
    16
  ), t.enableVertexAttribArray(s.a_opacity), t.vertexAttribPointer(
    s.a_opacity,
    1,
    S.FLOAT,
    !1,
    32,
    24
  ), t.enableVertexAttribArray(s.a_rotateWithView), t.vertexAttribPointer(
    s.a_rotateWithView,
    1,
    S.FLOAT,
    !1,
    32,
    28
  ), s;
};
Pe.prototype.shutDownProgram = function(t, e) {
  t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_offsets), t.disableVertexAttribArray(e.a_texCoord), t.disableVertexAttribArray(e.a_opacity), t.disableVertexAttribArray(e.a_rotateWithView);
};
Pe.prototype.drawReplay = function(t, e, i, r) {
  var n = r ? this.getHitDetectionTextures() : this.getTextures(), a = r ? this.hitDetectionGroupIndices : this.groupIndices;
  if (!ut.isEmpty(i))
    this.drawReplaySkipping(
      t,
      e,
      i,
      n,
      a
    );
  else {
    var o, s, l;
    for (o = 0, s = n.length, l = 0; o < s; ++o) {
      t.bindTexture(S.TEXTURE_2D, n[o]);
      var h = a[o];
      this.drawElements(t, e, l, h), l = h;
    }
  }
};
Pe.prototype.drawReplaySkipping = function(t, e, i, r, n) {
  var a = 0, o, s;
  for (o = 0, s = r.length; o < s; ++o) {
    t.bindTexture(S.TEXTURE_2D, r[o]);
    for (var l = o > 0 ? n[o - 1] : 0, h = n[o], u = l, f = l; a < this.startIndices.length && this.startIndices[a] <= h; ) {
      var c = this.startIndicesFeature[a], d = _.getUid(c).toString();
      i[d] !== void 0 ? (u !== f && this.drawElements(t, e, u, f), u = a === this.startIndices.length - 1 ? h : this.startIndices[a + 1], f = u) : f = a === this.startIndices.length - 1 ? h : this.startIndices[a + 1], a++;
    }
    u !== f && this.drawElements(t, e, u, f);
  }
};
Pe.prototype.drawHitDetectionReplayOneByOne = function(t, e, i, r, n) {
  var a, o, s, l, h, u, f = this.startIndices.length - 1, c = this.getHitDetectionTextures();
  for (a = c.length - 1; a >= 0; --a)
    for (t.bindTexture(S.TEXTURE_2D, c[a]), o = a > 0 ? this.hitDetectionGroupIndices[a - 1] : 0, l = this.hitDetectionGroupIndices[a]; f >= 0 && this.startIndices[f] >= o; ) {
      if (s = this.startIndices[f], h = this.startIndicesFeature[f], u = _.getUid(h).toString(), i[u] === void 0 && h.getGeometry() && (n === void 0 || g.intersects(
        /** @type {Array<number>} */
        n,
        h.getGeometry().getExtent()
      ))) {
        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, s, l);
        var d = r(h);
        if (d)
          return d;
      }
      l = s, f--;
    }
};
Pe.prototype.finish = function(t) {
  this.anchorX = void 0, this.anchorY = void 0, this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.indices = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.vertices = null, this.width = void 0;
};
Pe.prototype.getTextures = function(t) {
};
Pe.prototype.getHitDetectionTextures = function() {
};
var cr = function(t, e) {
  Pe.call(this, t, e), this.images_ = [], this.hitDetectionImages_ = [], this.textures_ = [], this.hitDetectionTextures_ = [];
};
_.inherits(cr, Pe);
cr.prototype.drawMultiPoint = function(t, e) {
  this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
  var i = t.getFlatCoordinates(), r = t.getStride();
  this.drawCoordinates(
    i,
    0,
    i.length,
    r
  );
};
cr.prototype.drawPoint = function(t, e) {
  this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
  var i = t.getFlatCoordinates(), r = t.getStride();
  this.drawCoordinates(
    i,
    0,
    i.length,
    r
  );
};
cr.prototype.finish = function(t) {
  var e = t.getGL();
  this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices.push(this.indices.length), this.verticesBuffer = new ze(this.vertices);
  var i = this.indices;
  this.indicesBuffer = new ze(i);
  var r = {};
  this.createTextures(this.textures_, this.images_, r, e), this.createTextures(
    this.hitDetectionTextures_,
    this.hitDetectionImages_,
    r,
    e
  ), this.images_ = null, this.hitDetectionImages_ = null, Pe.prototype.finish.call(this, t);
};
cr.prototype.setImageStyle = function(t) {
  var e = t.getAnchor(), i = t.getImage(1), r = t.getImageSize(), n = t.getHitDetectionImage(1), a = t.getOpacity(), o = t.getOrigin(), s = t.getRotateWithView(), l = t.getRotation(), h = t.getSize(), u = t.getScale(), f;
  this.images_.length === 0 ? this.images_.push(i) : (f = this.images_[this.images_.length - 1], _.getUid(f) != _.getUid(i) && (this.groupIndices.push(this.indices.length), this.images_.push(i))), this.hitDetectionImages_.length === 0 ? this.hitDetectionImages_.push(n) : (f = this.hitDetectionImages_[this.hitDetectionImages_.length - 1], _.getUid(f) != _.getUid(n) && (this.hitDetectionGroupIndices.push(this.indices.length), this.hitDetectionImages_.push(n))), this.anchorX = e[0], this.anchorY = e[1], this.height = h[1], this.imageHeight = r[1], this.imageWidth = r[0], this.opacity = a, this.originX = o[0], this.originY = o[1], this.rotation = l, this.rotateWithView = s, this.scale = u, this.width = h[0];
};
cr.prototype.getTextures = function(t) {
  return t ? this.textures_.concat(this.hitDetectionTextures_) : this.textures_;
};
cr.prototype.getHitDetectionTextures = function() {
  return this.hitDetectionTextures_;
};
var In = {};
In.lineStringIsClosed = function(t, e, i, r) {
  var n = i - r;
  return t[e] === t[n] && t[e + 1] === t[n + 1] && (i - e) / r > 3 ? !!lr.linearRing(t, e, i, r) : !1;
};
var Sn = {};
Sn.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;
varying float v_round;
varying vec2 v_roundVertex;
varying float v_halfWidth;



uniform float u_opacity;
uniform vec4 u_color;
uniform vec2 u_size;
uniform float u_pixelRatio;

void main(void) {
  if (v_round > 0.0) {
    vec2 windowCoords = vec2((v_roundVertex.x + 1.0) / 2.0 * u_size.x * u_pixelRatio,
        (v_roundVertex.y + 1.0) / 2.0 * u_size.y * u_pixelRatio);
    if (length(windowCoords - gl_FragCoord.xy) > v_halfWidth * u_pixelRatio) {
      discard;
    }
  }
  gl_FragColor = u_color;
  float alpha = u_color.a * u_opacity;
  if (alpha == 0.0) {
    discard;
  }
  gl_FragColor.a = alpha;
}
` : "precision mediump float;varying float a;varying vec2 aVertex;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((aVertex.x+1.0)/2.0*o.x*p,(aVertex.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}");
Sn.vertex = new fr(_.DEBUG_WEBGL ? `varying float v_round;
varying vec2 v_roundVertex;
varying float v_halfWidth;


attribute vec2 a_lastPos;
attribute vec2 a_position;
attribute vec2 a_nextPos;
attribute float a_direction;

uniform mat4 u_projectionMatrix;
uniform mat4 u_offsetScaleMatrix;
uniform mat4 u_offsetRotateMatrix;
uniform float u_lineWidth;
uniform float u_miterLimit;

bool nearlyEquals(in float value, in float ref) {
  float epsilon = 0.000000000001;
  return value >= ref - epsilon && value <= ref + epsilon;
}

void alongNormal(out vec2 offset, in vec2 nextP, in float turnDir, in float direction) {
  vec2 dirVect = nextP - a_position;
  vec2 normal = normalize(vec2(-turnDir * dirVect.y, turnDir * dirVect.x));
  offset = u_lineWidth / 2.0 * normal * direction;
}

void miterUp(out vec2 offset, out float round, in bool isRound, in float direction) {
  float halfWidth = u_lineWidth / 2.0;
  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 dirVect = a_nextPos - a_position;
  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));
  float miterLength = abs(halfWidth / dot(normal, tmpNormal));
  offset = normal * direction * miterLength;
  round = 0.0;
  if (isRound) {
    round = 1.0;
  } else if (miterLength > u_miterLimit + u_lineWidth) {
    offset = halfWidth * tmpNormal * direction;
  }
}

bool miterDown(out vec2 offset, in vec4 projPos, in mat4 offsetMatrix, in float direction) {
  bool degenerate = false;
  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 dirVect = a_lastPos - a_position;
  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));
  vec2 longOffset, shortOffset, longVertex;
  vec4 shortProjVertex;
  float halfWidth = u_lineWidth / 2.0;
  if (length(a_nextPos - a_position) > length(a_lastPos - a_position)) {
    longOffset = tmpNormal * direction * halfWidth;
    shortOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;
    longVertex = a_nextPos;
    shortProjVertex = u_projectionMatrix * vec4(a_lastPos, 0.0, 1.0);
  } else {
    shortOffset = tmpNormal * direction * halfWidth;
    longOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;
    longVertex = a_lastPos;
    shortProjVertex = u_projectionMatrix * vec4(a_nextPos, 0.0, 1.0);
  }
  //Intersection algorithm based on theory by Paul Bourke (http://paulbourke.net/geometry/pointlineplane/).
  vec4 p1 = u_projectionMatrix * vec4(longVertex, 0.0, 1.0) + offsetMatrix * vec4(longOffset, 0.0, 0.0);
  vec4 p2 = projPos + offsetMatrix * vec4(longOffset, 0.0, 0.0);
  vec4 p3 = shortProjVertex + offsetMatrix * vec4(-shortOffset, 0.0, 0.0);
  vec4 p4 = shortProjVertex + offsetMatrix * vec4(shortOffset, 0.0, 0.0);
  float denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  float firstU = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
  float secondU = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;
  float epsilon = 0.000000000001;
  if (firstU > epsilon && firstU < 1.0 - epsilon && secondU > epsilon && secondU < 1.0 - epsilon) {
    shortProjVertex.x = p1.x + firstU * (p2.x - p1.x);
    shortProjVertex.y = p1.y + firstU * (p2.y - p1.y);
    offset = shortProjVertex.xy;
    degenerate = true;
  } else {
    float miterLength = abs(halfWidth / dot(normal, tmpNormal));
    offset = normal * direction * miterLength;
  }
  return degenerate;
}

void squareCap(out vec2 offset, out float round, in bool isRound, in vec2 nextP,
    in float turnDir, in float direction) {
  round = 0.0;
  vec2 dirVect = a_position - nextP;
  vec2 firstNormal = normalize(dirVect);
  vec2 secondNormal = vec2(turnDir * firstNormal.y * direction, -turnDir * firstNormal.x * direction);
  vec2 hypotenuse = normalize(firstNormal - secondNormal);
  vec2 normal = vec2(turnDir * hypotenuse.y * direction, -turnDir * hypotenuse.x * direction);
  float length = sqrt(v_halfWidth * v_halfWidth * 2.0);
  offset = normal * length;
  if (isRound) {
    round = 1.0;
  }
}

void main(void) {
  bool degenerate = false;
  float direction = float(sign(a_direction));
  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;
  vec2 offset;
  vec4 projPos = u_projectionMatrix * vec4(a_position, 0.0, 1.0);
  bool round = nearlyEquals(mod(a_direction, 2.0), 0.0);

  v_round = 0.0;
  v_halfWidth = u_lineWidth / 2.0;
  v_roundVertex = projPos.xy;

  if (nearlyEquals(mod(a_direction, 3.0), 0.0) || nearlyEquals(mod(a_direction, 17.0), 0.0)) {
    alongNormal(offset, a_nextPos, 1.0, direction);
  } else if (nearlyEquals(mod(a_direction, 5.0), 0.0) || nearlyEquals(mod(a_direction, 13.0), 0.0)) {
    alongNormal(offset, a_lastPos, -1.0, direction);
  } else if (nearlyEquals(mod(a_direction, 23.0), 0.0)) {
    miterUp(offset, v_round, round, direction);
  } else if (nearlyEquals(mod(a_direction, 19.0), 0.0)) {
    degenerate = miterDown(offset, projPos, offsetMatrix, direction);
  } else if (nearlyEquals(mod(a_direction, 7.0), 0.0)) {
    squareCap(offset, v_round, round, a_nextPos, 1.0, direction);
  } else if (nearlyEquals(mod(a_direction, 11.0), 0.0)) {
    squareCap(offset, v_round, round, a_lastPos, -1.0, direction);
  }
  if (!degenerate) {
    vec4 offsets = offsetMatrix * vec4(offset, 0.0, 0.0);
    gl_Position = projPos + offsets;
  } else {
    gl_Position = vec4(offset, 0.0, 1.0);
  }
}


` : "varying float a;varying vec2 aVertex;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;aVertex=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}");
var Do = function(t, e) {
  this.u_projectionMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_projectionMatrix" : "h"
  ), this.u_offsetScaleMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"
  ), this.u_offsetRotateMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"
  ), this.u_lineWidth = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_lineWidth" : "k"
  ), this.u_miterLimit = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_miterLimit" : "l"
  ), this.u_opacity = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_opacity" : "m"
  ), this.u_color = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_color" : "n"
  ), this.u_size = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_size" : "o"
  ), this.u_pixelRatio = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_pixelRatio" : "p"
  ), this.a_lastPos = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_lastPos" : "d"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "e"
  ), this.a_nextPos = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_nextPos" : "f"
  ), this.a_direction = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_direction" : "g"
  );
}, dt = function(t, e) {
  Re.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = {
    strokeColor: null,
    lineCap: void 0,
    lineDash: null,
    lineDashOffset: void 0,
    lineJoin: void 0,
    lineWidth: void 0,
    miterLimit: void 0,
    changed: !1
  };
};
_.inherits(dt, Re);
dt.prototype.drawCoordinates_ = function(t, e, i, r) {
  var n, a, o = this.vertices.length, s = this.indices.length, l = this.state_.lineJoin === "bevel" ? 0 : this.state_.lineJoin === "miter" ? 1 : 2, h = this.state_.lineCap === "butt" ? 0 : this.state_.lineCap === "square" ? 1 : 2, u = In.lineStringIsClosed(t, e, i, r), f, c, d, v = s, m = 1, p, E, y;
  for (n = e, a = i; n < a; n += r) {
    if (d = o / 7, p = E, E = y || [t[n], t[n + 1]], n === e) {
      if (y = [t[n + r], t[n + r + 1]], i - e === r * 2 && st.equals(E, y))
        break;
      if (u)
        p = [
          t[i - r * 2],
          t[i - r * 2 + 1]
        ], f = y;
      else {
        h && (o = this.addVertices_(
          [0, 0],
          E,
          y,
          m * dt.Instruction_.BEGIN_LINE_CAP * h,
          o
        ), o = this.addVertices_(
          [0, 0],
          E,
          y,
          -m * dt.Instruction_.BEGIN_LINE_CAP * h,
          o
        ), this.indices[s++] = d + 2, this.indices[s++] = d, this.indices[s++] = d + 1, this.indices[s++] = d + 1, this.indices[s++] = d + 3, this.indices[s++] = d + 2), o = this.addVertices_(
          [0, 0],
          E,
          y,
          m * dt.Instruction_.BEGIN_LINE * (h || 1),
          o
        ), o = this.addVertices_(
          [0, 0],
          E,
          y,
          -m * dt.Instruction_.BEGIN_LINE * (h || 1),
          o
        ), v = o / 7 - 1;
        continue;
      }
    } else if (n === i - r)
      if (u) {
        y = f;
        break;
      } else {
        p = p || [0, 0], o = this.addVertices_(
          p,
          E,
          [0, 0],
          m * dt.Instruction_.END_LINE * (h || 1),
          o
        ), o = this.addVertices_(
          p,
          E,
          [0, 0],
          -m * dt.Instruction_.END_LINE * (h || 1),
          o
        ), this.indices[s++] = d, this.indices[s++] = v - 1, this.indices[s++] = v, this.indices[s++] = v, this.indices[s++] = d + 1, this.indices[s++] = d, h && (o = this.addVertices_(
          p,
          E,
          [0, 0],
          m * dt.Instruction_.END_LINE_CAP * h,
          o
        ), o = this.addVertices_(
          p,
          E,
          [0, 0],
          -m * dt.Instruction_.END_LINE_CAP * h,
          o
        ), this.indices[s++] = d + 2, this.indices[s++] = d, this.indices[s++] = d + 1, this.indices[s++] = d + 1, this.indices[s++] = d + 3, this.indices[s++] = d + 2);
        break;
      }
    else
      y = [t[n + r], t[n + r + 1]];
    c = et.triangleIsCounterClockwise(p[0], p[1], E[0], E[1], y[0], y[1]) ? -1 : 1, o = this.addVertices_(
      p,
      E,
      y,
      c * dt.Instruction_.BEVEL_FIRST * (l || 1),
      o
    ), o = this.addVertices_(
      p,
      E,
      y,
      c * dt.Instruction_.BEVEL_SECOND * (l || 1),
      o
    ), o = this.addVertices_(
      p,
      E,
      y,
      -c * dt.Instruction_.MITER_BOTTOM * (l || 1),
      o
    ), n > e && (this.indices[s++] = d, this.indices[s++] = v - 1, this.indices[s++] = v, this.indices[s++] = d + 2, this.indices[s++] = d, this.indices[s++] = m * c > 0 ? v : v - 1), this.indices[s++] = d, this.indices[s++] = d + 2, this.indices[s++] = d + 1, v = d + 2, m = c, l && (o = this.addVertices_(
      p,
      E,
      y,
      c * dt.Instruction_.MITER_TOP * l,
      o
    ), this.indices[s++] = d + 1, this.indices[s++] = d + 3, this.indices[s++] = d);
  }
  u && (d = d || o / 7, c = He.linearRingIsClockwise([p[0], p[1], E[0], E[1], y[0], y[1]], 0, 6, 2) ? 1 : -1, o = this.addVertices_(
    p,
    E,
    y,
    c * dt.Instruction_.BEVEL_FIRST * (l || 1),
    o
  ), o = this.addVertices_(
    p,
    E,
    y,
    -c * dt.Instruction_.MITER_BOTTOM * (l || 1),
    o
  ), this.indices[s++] = d, this.indices[s++] = v - 1, this.indices[s++] = v, this.indices[s++] = d + 1, this.indices[s++] = d, this.indices[s++] = m * c > 0 ? v : v - 1);
};
dt.prototype.addVertices_ = function(t, e, i, r, n) {
  return this.vertices[n++] = t[0], this.vertices[n++] = t[1], this.vertices[n++] = e[0], this.vertices[n++] = e[1], this.vertices[n++] = i[0], this.vertices[n++] = i[1], this.vertices[n++] = r, n;
};
dt.prototype.isValid_ = function(t, e, i, r) {
  var n = i - e;
  if (n < r * 2)
    return !1;
  if (n === r * 2) {
    var a = [t[e], t[e + 1]], o = [t[e + r], t[e + r + 1]];
    return !st.equals(a, o);
  }
  return !0;
};
dt.prototype.drawLineString = function(t, e) {
  var i = t.getFlatCoordinates(), r = t.getStride();
  this.isValid_(i, 0, i.length, r) && (i = re.translate(
    i,
    0,
    i.length,
    r,
    -this.origin[0],
    -this.origin[1]
  ), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.drawCoordinates_(
    i,
    0,
    i.length,
    r
  ));
};
dt.prototype.drawMultiLineString = function(t, e) {
  var i = this.indices.length, r = t.getEnds();
  r.unshift(0);
  var n = t.getFlatCoordinates(), a = t.getStride(), o, s;
  if (r.length > 1) {
    for (o = 1, s = r.length; o < s; ++o)
      if (this.isValid_(n, r[o - 1], r[o], a)) {
        var l = re.translate(
          n,
          r[o - 1],
          r[o],
          a,
          -this.origin[0],
          -this.origin[1]
        );
        this.drawCoordinates_(
          l,
          0,
          l.length,
          a
        );
      }
  }
  this.indices.length > i && (this.startIndices.push(i), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1));
};
dt.prototype.drawPolygonCoordinates = function(t, e, i) {
  if (In.lineStringIsClosed(
    t,
    0,
    t.length,
    i
  ) || (t.push(t[0]), t.push(t[1])), this.drawCoordinates_(t, 0, t.length, i), e.length) {
    var r, n;
    for (r = 0, n = e.length; r < n; ++r)
      In.lineStringIsClosed(
        e[r],
        0,
        e[r].length,
        i
      ) || (e[r].push(e[r][0]), e[r].push(e[r][1])), this.drawCoordinates_(
        e[r],
        0,
        e[r].length,
        i
      );
  }
};
dt.prototype.setPolygonStyle = function(t, e) {
  var i = e === void 0 ? this.indices.length : e;
  this.startIndices.push(i), this.startIndicesFeature.push(t), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1);
};
dt.prototype.getCurrentIndex = function() {
  return this.indices.length;
};
dt.prototype.finish = function(t) {
  this.verticesBuffer = new ze(this.vertices), this.indicesBuffer = new ze(this.indices), this.startIndices.push(this.indices.length), this.styleIndices_.length === 0 && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null;
};
dt.prototype.getDeleteResourcesFunction = function(t) {
  var e = this.verticesBuffer, i = this.indicesBuffer;
  return function() {
    t.deleteBuffer(e), t.deleteBuffer(i);
  };
};
dt.prototype.setUpProgram = function(t, e, i, r) {
  var n, a;
  n = Sn.fragment, a = Sn.vertex;
  var o = e.getProgram(n, a), s;
  return this.defaultLocations_ ? s = this.defaultLocations_ : (s = new Do(t, o), this.defaultLocations_ = s), e.useProgram(o), t.enableVertexAttribArray(s.a_lastPos), t.vertexAttribPointer(
    s.a_lastPos,
    2,
    S.FLOAT,
    !1,
    28,
    0
  ), t.enableVertexAttribArray(s.a_position), t.vertexAttribPointer(
    s.a_position,
    2,
    S.FLOAT,
    !1,
    28,
    8
  ), t.enableVertexAttribArray(s.a_nextPos), t.vertexAttribPointer(
    s.a_nextPos,
    2,
    S.FLOAT,
    !1,
    28,
    16
  ), t.enableVertexAttribArray(s.a_direction), t.vertexAttribPointer(
    s.a_direction,
    1,
    S.FLOAT,
    !1,
    28,
    24
  ), t.uniform2fv(s.u_size, i), t.uniform1f(s.u_pixelRatio, r), s;
};
dt.prototype.shutDownProgram = function(t, e) {
  t.disableVertexAttribArray(e.a_lastPos), t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_nextPos), t.disableVertexAttribArray(e.a_direction);
};
dt.prototype.drawReplay = function(t, e, i, r) {
  var n = (
    /** @type {number} */
    t.getParameter(t.DEPTH_FUNC)
  ), a = (
    /** @type {boolean} */
    t.getParameter(t.DEPTH_WRITEMASK)
  );
  if (r || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), !ut.isEmpty(i))
    this.drawReplaySkipping_(t, e, i);
  else {
    var o, s, l, h;
    for (l = this.startIndices[this.startIndices.length - 1], o = this.styleIndices_.length - 1; o >= 0; --o)
      s = this.styleIndices_[o], h = this.styles_[o], this.setStrokeStyle_(t, h[0], h[1], h[2]), this.drawElements(t, e, s, l), t.clear(t.DEPTH_BUFFER_BIT), l = s;
  }
  r || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(a), t.depthFunc(n));
};
dt.prototype.drawReplaySkipping_ = function(t, e, i) {
  var r, n, a, o, s, l, h, u, f;
  for (u = this.startIndices.length - 2, a = n = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (o = this.styles_[r], this.setStrokeStyle_(t, o[0], o[1], o[2]), s = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= s; )
      f = this.startIndices[u], l = this.startIndicesFeature[u], h = _.getUid(l).toString(), i[h] && (n !== a && (this.drawElements(t, e, n, a), t.clear(t.DEPTH_BUFFER_BIT)), a = f), u--, n = f;
    n !== a && (this.drawElements(t, e, n, a), t.clear(t.DEPTH_BUFFER_BIT)), n = a = s;
  }
};
dt.prototype.drawHitDetectionReplayOneByOne = function(t, e, i, r, n) {
  var a, o, s, l, h, u, f, c;
  for (c = this.startIndices.length - 2, s = this.startIndices[c + 1], a = this.styleIndices_.length - 1; a >= 0; --a)
    for (l = this.styles_[a], this.setStrokeStyle_(t, l[0], l[1], l[2]), h = this.styleIndices_[a]; c >= 0 && this.startIndices[c] >= h; ) {
      if (o = this.startIndices[c], u = this.startIndicesFeature[c], f = _.getUid(u).toString(), i[f] === void 0 && u.getGeometry() && (n === void 0 || g.intersects(
        /** @type {Array<number>} */
        n,
        u.getGeometry().getExtent()
      ))) {
        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, o, s);
        var d = r(u);
        if (d)
          return d;
      }
      c--, s = o;
    }
};
dt.prototype.setStrokeStyle_ = function(t, e, i, r) {
  t.uniform4fv(this.defaultLocations_.u_color, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i), t.uniform1f(this.defaultLocations_.u_miterLimit, r);
};
dt.prototype.setFillStrokeStyle = function(t, e) {
  var i = e.getLineCap();
  this.state_.lineCap = i !== void 0 ? i : et.defaultLineCap;
  var r = e.getLineDash();
  this.state_.lineDash = r || et.defaultLineDash;
  var n = e.getLineDashOffset();
  this.state_.lineDashOffset = n || et.defaultLineDashOffset;
  var a = e.getLineJoin();
  this.state_.lineJoin = a !== void 0 ? a : et.defaultLineJoin;
  var o = e.getColor();
  !(o instanceof CanvasGradient) && !(o instanceof CanvasPattern) ? o = Xt.asArray(o).map(function(h, u) {
    return u != 3 ? h / 255 : h;
  }) || et.defaultStrokeStyle : o = et.defaultStrokeStyle;
  var s = e.getWidth();
  s = s !== void 0 ? s : et.defaultLineWidth;
  var l = e.getMiterLimit();
  l = l !== void 0 ? l : et.defaultMiterLimit, (!this.state_.strokeColor || !st.equals(this.state_.strokeColor, o) || this.state_.lineWidth !== s || this.state_.miterLimit !== l) && (this.state_.changed = !0, this.state_.strokeColor = o, this.state_.lineWidth = s, this.state_.miterLimit = l, this.styles_.push([o, s, l]));
};
dt.Instruction_ = {
  ROUND: 2,
  BEGIN_LINE: 3,
  END_LINE: 5,
  BEGIN_LINE_CAP: 7,
  END_LINE_CAP: 11,
  BEVEL_FIRST: 13,
  BEVEL_SECOND: 17,
  MITER_BOTTOM: 19,
  MITER_TOP: 23
};
var Ln = {};
Ln.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;



uniform vec4 u_color;
uniform float u_opacity;

void main(void) {
  gl_FragColor = u_color;
  float alpha = u_color.a * u_opacity;
  if (alpha == 0.0) {
    discard;
  }
  gl_FragColor.a = alpha;
}
` : "precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}");
Ln.vertex = new fr(_.DEBUG_WEBGL ? `

attribute vec2 a_position;

uniform mat4 u_projectionMatrix;
uniform mat4 u_offsetScaleMatrix;
uniform mat4 u_offsetRotateMatrix;

void main(void) {
  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);
}


` : "attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}");
var Fo = function(t, e) {
  this.u_projectionMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_projectionMatrix" : "b"
  ), this.u_offsetScaleMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "c"
  ), this.u_offsetRotateMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "d"
  ), this.u_color = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_color" : "e"
  ), this.u_opacity = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_opacity" : "f"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "a"
  );
}, we = function(t) {
  var e = t || {};
  this.color_ = e.color !== void 0 ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = e.lineDash !== void 0 ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width, this.checksum_ = void 0;
};
we.prototype.clone = function() {
  var t = this.getColor();
  return new we({
    color: t && t.slice ? t.slice() : t || void 0,
    lineCap: this.getLineCap(),
    lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
    lineDashOffset: this.getLineDashOffset(),
    lineJoin: this.getLineJoin(),
    miterLimit: this.getMiterLimit(),
    width: this.getWidth()
  });
};
we.prototype.getColor = function() {
  return this.color_;
};
we.prototype.getLineCap = function() {
  return this.lineCap_;
};
we.prototype.getLineDash = function() {
  return this.lineDash_;
};
we.prototype.getLineDashOffset = function() {
  return this.lineDashOffset_;
};
we.prototype.getLineJoin = function() {
  return this.lineJoin_;
};
we.prototype.getMiterLimit = function() {
  return this.miterLimit_;
};
we.prototype.getWidth = function() {
  return this.width_;
};
we.prototype.setColor = function(t) {
  this.color_ = t, this.checksum_ = void 0;
};
we.prototype.setLineCap = function(t) {
  this.lineCap_ = t, this.checksum_ = void 0;
};
we.prototype.setLineDash = function(t) {
  this.lineDash_ = t, this.checksum_ = void 0;
};
we.prototype.setLineDashOffset = function(t) {
  this.lineDashOffset_ = t, this.checksum_ = void 0;
};
we.prototype.setLineJoin = function(t) {
  this.lineJoin_ = t, this.checksum_ = void 0;
};
we.prototype.setMiterLimit = function(t) {
  this.miterLimit_ = t, this.checksum_ = void 0;
};
we.prototype.setWidth = function(t) {
  this.width_ = t, this.checksum_ = void 0;
};
we.prototype.getChecksum = function() {
  return this.checksum_ === void 0 && (this.checksum_ = "s", this.color_ ? typeof this.color_ == "string" ? this.checksum_ += this.color_ : this.checksum_ += _.getUid(this.color_).toString() : this.checksum_ += "-", this.checksum_ += "," + (this.lineCap_ !== void 0 ? this.lineCap_.toString() : "-") + "," + (this.lineDash_ ? this.lineDash_.toString() : "-") + "," + (this.lineDashOffset_ !== void 0 ? this.lineDashOffset_ : "-") + "," + (this.lineJoin_ !== void 0 ? this.lineJoin_ : "-") + "," + (this.miterLimit_ !== void 0 ? this.miterLimit_.toString() : "-") + "," + (this.width_ !== void 0 ? this.width_.toString() : "-")), this.checksum_;
};
var ti = function(t) {
  this.first_ = void 0, this.last_ = void 0, this.head_ = void 0, this.circular_ = t === void 0 ? !0 : t, this.length_ = 0;
};
ti.prototype.insertItem = function(t) {
  var e = {
    prev: void 0,
    next: void 0,
    data: t
  }, i = this.head_;
  if (!i)
    this.first_ = e, this.last_ = e, this.circular_ && (e.next = e, e.prev = e);
  else {
    var r = i.next;
    e.prev = i, e.next = r, i.next = e, r && (r.prev = e), i === this.last_ && (this.last_ = e);
  }
  this.head_ = e, this.length_++;
};
ti.prototype.removeItem = function() {
  var t = this.head_;
  if (t) {
    var e = t.next, i = t.prev;
    e && (e.prev = i), i && (i.next = e), this.head_ = e || i, this.first_ === this.last_ ? (this.head_ = void 0, this.first_ = void 0, this.last_ = void 0) : this.first_ === t ? this.first_ = this.head_ : this.last_ === t && (this.last_ = i ? this.head_.prev : this.head_), this.length_--;
  }
};
ti.prototype.firstItem = function() {
  if (this.head_ = this.first_, this.head_)
    return this.head_.data;
};
ti.prototype.lastItem = function() {
  if (this.head_ = this.last_, this.head_)
    return this.head_.data;
};
ti.prototype.nextItem = function() {
  if (this.head_ && this.head_.next)
    return this.head_ = this.head_.next, this.head_.data;
};
ti.prototype.getNextItem = function() {
  if (this.head_ && this.head_.next)
    return this.head_.next.data;
};
ti.prototype.prevItem = function() {
  if (this.head_ && this.head_.prev)
    return this.head_ = this.head_.prev, this.head_.data;
};
ti.prototype.getPrevItem = function() {
  if (this.head_ && this.head_.prev)
    return this.head_.prev.data;
};
ti.prototype.getCurrItem = function() {
  if (this.head_)
    return this.head_.data;
};
ti.prototype.setFirstItem = function() {
  this.circular_ && this.head_ && (this.first_ = this.head_, this.last_ = this.head_.prev);
};
ti.prototype.concat = function(t) {
  if (t.head_) {
    if (this.head_) {
      var e = this.head_.next;
      this.head_.next = t.first_, t.first_.prev = this.head_, e.prev = t.last_, t.last_.next = e, this.length_ += t.length_;
    } else
      this.head_ = t.head_, this.first_ = t.first_, this.last_ = t.last_, this.length_ = t.length_;
    t.head_ = void 0, t.first_ = void 0, t.last_ = void 0, t.length_ = 0;
  }
};
ti.prototype.getLength = function() {
  return this.length_;
};
var je = function(t) {
  this.rbush_ = Jn(t), this.items_ = {};
};
je.prototype.insert = function(t, e) {
  var i = {
    minX: t[0],
    minY: t[1],
    maxX: t[2],
    maxY: t[3],
    value: e
  };
  this.rbush_.insert(i), this.items_[_.getUid(e)] = i;
};
je.prototype.load = function(t, e) {
  for (var i = new Array(e.length), r = 0, n = e.length; r < n; r++) {
    var a = t[r], o = e[r], s = {
      minX: a[0],
      minY: a[1],
      maxX: a[2],
      maxY: a[3],
      value: o
    };
    i[r] = s, this.items_[_.getUid(o)] = s;
  }
  this.rbush_.load(i);
};
je.prototype.remove = function(t) {
  var e = _.getUid(t), i = this.items_[e];
  return delete this.items_[e], this.rbush_.remove(i) !== null;
};
je.prototype.update = function(t, e) {
  var i = this.items_[_.getUid(e)], r = [i.minX, i.minY, i.maxX, i.maxY];
  g.equals(r, t) || (this.remove(e), this.insert(t, e));
};
je.prototype.getAll = function() {
  var t = this.rbush_.all();
  return t.map(function(e) {
    return e.value;
  });
};
je.prototype.getInExtent = function(t) {
  var e = {
    minX: t[0],
    minY: t[1],
    maxX: t[2],
    maxY: t[3]
  }, i = this.rbush_.search(e);
  return i.map(function(r) {
    return r.value;
  });
};
je.prototype.forEach = function(t, e) {
  return this.forEach_(this.getAll(), t, e);
};
je.prototype.forEachInExtent = function(t, e, i) {
  return this.forEach_(this.getInExtent(t), e, i);
};
je.prototype.forEach_ = function(t, e, i) {
  for (var r, n = 0, a = t.length; n < a; n++)
    if (r = e.call(i, t[n]), r)
      return r;
  return r;
};
je.prototype.isEmpty = function() {
  return ut.isEmpty(this.items_);
};
je.prototype.clear = function() {
  this.rbush_.clear(), this.items_ = {};
};
je.prototype.getExtent = function(t) {
  var e = this.rbush_.data;
  return g.createOrUpdate(e.minX, e.minY, e.maxX, e.maxY, t);
};
je.prototype.concat = function(t) {
  this.rbush_.load(t.rbush_.all());
  for (var e in t.items_)
    this.items_[e | 0] = t.items_[e | 0];
};
var wt = function(t, e) {
  Re.call(this, t, e), this.lineStringReplay = new dt(
    t,
    e
  ), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = {
    fillColor: null,
    changed: !1
  };
};
_.inherits(wt, Re);
wt.prototype.drawCoordinates_ = function(t, e, i) {
  var r = new ti(), n = new je();
  this.processFlatCoordinates_(t, i, r, n, !0);
  var a = this.getMaxCoords_(r);
  if (e.length) {
    var o, s, l = [];
    for (o = 0, s = e.length; o < s; ++o) {
      var h = {
        list: new ti(),
        maxCoords: void 0,
        rtree: new je()
      };
      l.push(h), this.processFlatCoordinates_(
        e[o],
        i,
        h.list,
        h.rtree,
        !1
      ), this.classifyPoints_(h.list, h.rtree, !0), h.maxCoords = this.getMaxCoords_(h.list);
    }
    for (l.sort(function(v, m) {
      return m.maxCoords[0] === v.maxCoords[0] ? v.maxCoords[1] - m.maxCoords[1] : m.maxCoords[0] - v.maxCoords[0];
    }), o = 0; o < l.length; ++o) {
      var u = l[o].list, f = u.firstItem(), c = f, d;
      do {
        if (this.getIntersections_(c, n).length) {
          d = !0;
          break;
        }
        c = u.nextItem();
      } while (f !== c);
      d || this.bridgeHole_(u, l[o].maxCoords[0], r, a[0], n) && (n.concat(l[o].rtree), this.classifyPoints_(r, n, !1));
    }
  } else
    this.classifyPoints_(r, n, !1);
  this.triangulate_(r, n);
};
wt.prototype.processFlatCoordinates_ = function(t, e, i, r, n) {
  var a = He.linearRingIsClockwise(
    t,
    0,
    t.length,
    e
  ), o, s, l = this.vertices.length / 2, h, u, f, c = [], d = [];
  if (n === a) {
    for (h = this.createPoint_(t[0], t[1], l++), u = h, o = e, s = t.length; o < s; o += e)
      f = this.createPoint_(t[o], t[o + 1], l++), d.push(this.insertItem_(u, f, i)), c.push([
        Math.min(u.x, f.x),
        Math.min(u.y, f.y),
        Math.max(u.x, f.x),
        Math.max(u.y, f.y)
      ]), u = f;
    d.push(this.insertItem_(f, h, i)), c.push([
      Math.min(u.x, f.x),
      Math.min(u.y, f.y),
      Math.max(u.x, f.x),
      Math.max(u.y, f.y)
    ]);
  } else {
    var v = t.length - e;
    for (h = this.createPoint_(t[v], t[v + 1], l++), u = h, o = v - e, s = 0; o >= s; o -= e)
      f = this.createPoint_(t[o], t[o + 1], l++), d.push(this.insertItem_(u, f, i)), c.push([
        Math.min(u.x, f.x),
        Math.min(u.y, f.y),
        Math.max(u.x, f.x),
        Math.max(u.y, f.y)
      ]), u = f;
    d.push(this.insertItem_(f, h, i)), c.push([
      Math.min(u.x, f.x),
      Math.min(u.y, f.y),
      Math.max(u.x, f.x),
      Math.max(u.y, f.y)
    ]);
  }
  r.load(c, d);
};
wt.prototype.getMaxCoords_ = function(t) {
  var e = t.firstItem(), i = e, r = [i.p0.x, i.p0.y];
  do
    i = t.nextItem(), i.p0.x > r[0] && (r = [i.p0.x, i.p0.y]);
  while (i !== e);
  return r;
};
wt.prototype.classifyPoints_ = function(t, e, i) {
  var r = t.firstItem(), n = r, a = t.nextItem(), o = !1;
  do {
    var s = i ? et.triangleIsCounterClockwise(
      a.p1.x,
      a.p1.y,
      n.p1.x,
      n.p1.y,
      n.p0.x,
      n.p0.y
    ) : et.triangleIsCounterClockwise(
      n.p0.x,
      n.p0.y,
      n.p1.x,
      n.p1.y,
      a.p1.x,
      a.p1.y
    );
    s === void 0 ? (this.removeItem_(n, a, t, e), o = !0, a === r && (r = t.getNextItem()), a = n, t.prevItem()) : n.p1.reflex !== s && (n.p1.reflex = s, o = !0), n = a, a = t.nextItem();
  } while (n !== r);
  return o;
};
wt.prototype.bridgeHole_ = function(t, e, i, r, n) {
  for (var a = t.firstItem(); a.p1.x !== e; )
    a = t.nextItem();
  var o = a.p1, s = { x: r, y: o.y, i: -1 }, l = 1 / 0, h, u, f, c, d = this.getIntersections_({ p0: o, p1: s }, n, !0);
  for (h = 0, u = d.length; h < u; ++h) {
    var v = d[h], m = this.calculateIntersection_(
      o,
      s,
      v.p0,
      v.p1,
      !0
    ), p = Math.abs(o.x - m[0]);
    p < l && et.triangleIsCounterClockwise(
      o.x,
      o.y,
      v.p0.x,
      v.p0.y,
      v.p1.x,
      v.p1.y
    ) !== void 0 && (l = p, c = { x: m[0], y: m[1], i: -1 }, a = v);
  }
  if (l === 1 / 0)
    return !1;
  if (f = a.p1, l > 0) {
    var E = this.getPointsInTriangle_(o, c, a.p1, n);
    if (E.length) {
      var y = 1 / 0;
      for (h = 0, u = E.length; h < u; ++h) {
        var R = E[h], I = Math.atan2(o.y - R.y, s.x - R.x);
        (I < y || I === y && R.x < f.x) && (y = I, f = R);
      }
    }
  }
  for (a = i.firstItem(); a.p1.x !== f.x || a.p1.y !== f.y; )
    a = i.nextItem();
  var x = { x: o.x, y: o.y, i: o.i, reflex: void 0 }, C = { x: a.p1.x, y: a.p1.y, i: a.p1.i, reflex: void 0 };
  return t.getNextItem().p0 = x, this.insertItem_(o, a.p1, t, n), this.insertItem_(C, x, t, n), a.p1 = C, t.setFirstItem(), i.concat(t), !0;
};
wt.prototype.triangulate_ = function(t, e) {
  for (var i = !1, r = this.isSimple_(t, e); t.getLength() > 3; )
    if (r) {
      if (!this.clipEars_(t, e, r, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e, !0))
        break;
    } else if (!this.clipEars_(t, e, r, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e))
      if (r = this.isSimple_(t, e), r)
        i = !this.isClockwise_(t), this.classifyPoints_(t, e, i);
      else {
        this.splitPolygon_(t, e);
        break;
      }
  if (t.getLength() === 3) {
    var n = this.indices.length;
    this.indices[n++] = t.getPrevItem().p0.i, this.indices[n++] = t.getCurrItem().p0.i, this.indices[n++] = t.getNextItem().p0.i;
  }
};
wt.prototype.clipEars_ = function(t, e, i, r) {
  var n = this.indices.length, a = t.firstItem(), o = t.getPrevItem(), s = a, l = t.nextItem(), h = t.getNextItem(), u, f, c, d = !1;
  do {
    if (u = s.p0, f = s.p1, c = l.p1, f.reflex === !1) {
      var v;
      i ? v = this.getPointsInTriangle_(u, f, c, e, !0).length === 0 : v = r ? this.diagonalIsInside_(
        h.p1,
        c,
        f,
        u,
        o.p0
      ) : this.diagonalIsInside_(o.p0, u, f, c, h.p1), (i || this.getIntersections_({ p0: u, p1: c }, e).length === 0) && v && (i || u.reflex === !1 || c.reflex === !1 || He.linearRingIsClockwise([
        o.p0.x,
        o.p0.y,
        u.x,
        u.y,
        f.x,
        f.y,
        c.x,
        c.y,
        h.p1.x,
        h.p1.y
      ], 0, 10, 2) === !r) && (this.indices[n++] = u.i, this.indices[n++] = f.i, this.indices[n++] = c.i, this.removeItem_(s, l, t, e), l === a && (a = h), d = !0);
    }
    o = t.getPrevItem(), s = t.getCurrItem(), l = t.nextItem(), h = t.getNextItem();
  } while (s !== a && t.getLength() > 3);
  return d;
};
wt.prototype.resolveSelfIntersections_ = function(t, e, i) {
  var r = t.firstItem();
  t.nextItem();
  var n = r, a = t.nextItem(), o = !1;
  do {
    var s = this.calculateIntersection_(
      n.p0,
      n.p1,
      a.p0,
      a.p1,
      i
    );
    if (s) {
      var l = !1, h = this.vertices.length, u = this.indices.length, f = h / 2, c = t.prevItem();
      t.removeItem(), e.remove(c), l = c === r;
      var d;
      if (i ? (s[0] === n.p0.x && s[1] === n.p0.y ? (t.prevItem(), d = n.p0, a.p0 = d, e.remove(n), l = l || n === r) : (d = a.p1, n.p1 = d, e.remove(a), l = l || a === r), t.removeItem()) : (d = this.createPoint_(s[0], s[1], f), n.p1 = d, a.p0 = d, e.update([
        Math.min(n.p0.x, n.p1.x),
        Math.min(n.p0.y, n.p1.y),
        Math.max(n.p0.x, n.p1.x),
        Math.max(n.p0.y, n.p1.y)
      ], n), e.update([
        Math.min(a.p0.x, a.p1.x),
        Math.min(a.p0.y, a.p1.y),
        Math.max(a.p0.x, a.p1.x),
        Math.max(a.p0.y, a.p1.y)
      ], a)), this.indices[u++] = c.p0.i, this.indices[u++] = c.p1.i, this.indices[u++] = d.i, o = !0, l)
        break;
    }
    n = t.getPrevItem(), a = t.nextItem();
  } while (n !== r);
  return o;
};
wt.prototype.isSimple_ = function(t, e) {
  var i = t.firstItem(), r = i;
  do {
    if (this.getIntersections_(r, e).length)
      return !1;
    r = t.nextItem();
  } while (r !== i);
  return !0;
};
wt.prototype.isClockwise_ = function(t) {
  var e = t.getLength() * 2, i = new Array(e), r = t.firstItem(), n = r, a = 0;
  do
    i[a++] = n.p0.x, i[a++] = n.p0.y, n = t.nextItem();
  while (n !== r);
  return He.linearRingIsClockwise(i, 0, e, 2);
};
wt.prototype.splitPolygon_ = function(t, e) {
  var i = t.firstItem(), r = i;
  do {
    var n = this.getIntersections_(r, e);
    if (n.length) {
      var a = n[0], o = this.vertices.length / 2, s = this.calculateIntersection_(
        r.p0,
        r.p1,
        a.p0,
        a.p1
      ), l = this.createPoint_(s[0], s[1], o), h = new ti(), u = new je();
      this.insertItem_(l, r.p1, h, u), r.p1 = l, e.update([
        Math.min(r.p0.x, l.x),
        Math.min(r.p0.y, l.y),
        Math.max(r.p0.x, l.x),
        Math.max(r.p0.y, l.y)
      ], r);
      for (var f = t.nextItem(); f !== a; )
        this.insertItem_(f.p0, f.p1, h, u), e.remove(f), t.removeItem(), f = t.getCurrItem();
      this.insertItem_(a.p0, l, h, u), a.p0 = l, e.update([
        Math.min(a.p1.x, l.x),
        Math.min(a.p1.y, l.y),
        Math.max(a.p1.x, l.x),
        Math.max(a.p1.y, l.y)
      ], a), this.classifyPoints_(t, e, !1), this.triangulate_(t, e), this.classifyPoints_(h, u, !1), this.triangulate_(h, u);
      break;
    }
    r = t.nextItem();
  } while (r !== i);
};
wt.prototype.createPoint_ = function(t, e, i) {
  var r = this.vertices.length;
  this.vertices[r++] = t, this.vertices[r++] = e;
  var n = {
    x: t,
    y: e,
    i,
    reflex: void 0
  };
  return n;
};
wt.prototype.insertItem_ = function(t, e, i, r) {
  var n = {
    p0: t,
    p1: e
  };
  return i.insertItem(n), r && r.insert([
    Math.min(t.x, e.x),
    Math.min(t.y, e.y),
    Math.max(t.x, e.x),
    Math.max(t.y, e.y)
  ], n), n;
};
wt.prototype.removeItem_ = function(t, e, i, r) {
  i.getCurrItem() === e && (i.removeItem(), t.p1 = e.p1, r.remove(e), r.update([
    Math.min(t.p0.x, t.p1.x),
    Math.min(t.p0.y, t.p1.y),
    Math.max(t.p0.x, t.p1.x),
    Math.max(t.p0.y, t.p1.y)
  ], t));
};
wt.prototype.getPointsInTriangle_ = function(t, e, i, r, n) {
  var a, o, s, l, h = [], u = r.getInExtent([
    Math.min(t.x, e.x, i.x),
    Math.min(t.y, e.y, i.y),
    Math.max(t.x, e.x, i.x),
    Math.max(
      t.y,
      e.y,
      i.y
    )
  ]);
  for (a = 0, o = u.length; a < o; ++a)
    for (s in u[a])
      l = u[a][s], typeof l == "object" && (!n || l.reflex) && (l.x !== t.x || l.y !== t.y) && (l.x !== e.x || l.y !== e.y) && (l.x !== i.x || l.y !== i.y) && h.indexOf(l) === -1 && Ye.linearRingContainsXY([
        t.x,
        t.y,
        e.x,
        e.y,
        i.x,
        i.y
      ], 0, 6, 2, l.x, l.y) && h.push(l);
  return h;
};
wt.prototype.getIntersections_ = function(t, e, i) {
  var r = t.p0, n = t.p1, a = e.getInExtent([
    Math.min(r.x, n.x),
    Math.min(r.y, n.y),
    Math.max(r.x, n.x),
    Math.max(r.y, n.y)
  ]), o = [], s, l;
  for (s = 0, l = a.length; s < l; ++s) {
    var h = a[s];
    t !== h && (i || h.p0 !== n || h.p1 !== r) && this.calculateIntersection_(r, n, h.p0, h.p1, i) && o.push(h);
  }
  return o;
};
wt.prototype.calculateIntersection_ = function(t, e, i, r, n) {
  var a = (r.y - i.y) * (e.x - t.x) - (r.x - i.x) * (e.y - t.y);
  if (a !== 0) {
    var o = ((r.x - i.x) * (t.y - i.y) - (r.y - i.y) * (t.x - i.x)) / a, s = ((e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x)) / a;
    if (!n && o > et.EPSILON && o < 1 - et.EPSILON && s > et.EPSILON && s < 1 - et.EPSILON || n && o >= 0 && o <= 1 && s >= 0 && s <= 1)
      return [t.x + o * (e.x - t.x), t.y + o * (e.y - t.y)];
  }
};
wt.prototype.diagonalIsInside_ = function(t, e, i, r, n) {
  if (e.reflex === void 0 || r.reflex === void 0)
    return !1;
  var a = (i.x - r.x) * (e.y - r.y) > (i.y - r.y) * (e.x - r.x), o = (n.x - r.x) * (e.y - r.y) < (n.y - r.y) * (e.x - r.x), s = (t.x - e.x) * (r.y - e.y) > (t.y - e.y) * (r.x - e.x), l = (i.x - e.x) * (r.y - e.y) < (i.y - e.y) * (r.x - e.x), h = r.reflex ? o || a : o && a, u = e.reflex ? l || s : l && s;
  return h && u;
};
wt.prototype.drawMultiPolygon = function(t, e) {
  var i = t.getEndss(), r = t.getStride(), n = this.indices.length, a = this.lineStringReplay.getCurrentIndex(), o = t.getFlatCoordinates(), s, l, h, u, f = 0;
  for (s = 0, l = i.length; s < l; ++s) {
    var c = i[s];
    if (c.length > 0) {
      var d = re.translate(
        o,
        f,
        c[0],
        r,
        -this.origin[0],
        -this.origin[1]
      );
      if (d.length) {
        var v = [], m;
        for (h = 1, u = c.length; h < u; ++h)
          c[h] !== c[h - 1] && (m = re.translate(
            o,
            c[h - 1],
            c[h],
            r,
            -this.origin[0],
            -this.origin[1]
          ), v.push(m));
        this.lineStringReplay.drawPolygonCoordinates(d, v, r), this.drawCoordinates_(d, v, r);
      }
    }
    f = c[c.length - 1];
  }
  this.indices.length > n && (this.startIndices.push(n), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(n), this.state_.changed = !1)), this.lineStringReplay.getCurrentIndex() > a && this.lineStringReplay.setPolygonStyle(e, a);
};
wt.prototype.drawPolygon = function(t, e) {
  var i = t.getEnds(), r = t.getStride();
  if (i.length > 0) {
    var n = t.getFlatCoordinates().map(Number), a = re.translate(
      n,
      0,
      i[0],
      r,
      -this.origin[0],
      -this.origin[1]
    );
    if (a.length) {
      var o = [], s, l, h;
      for (s = 1, l = i.length; s < l; ++s)
        i[s] !== i[s - 1] && (h = re.translate(
          n,
          i[s - 1],
          i[s],
          r,
          -this.origin[0],
          -this.origin[1]
        ), o.push(h));
      this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.lineStringReplay.setPolygonStyle(e), this.lineStringReplay.drawPolygonCoordinates(a, o, r), this.drawCoordinates_(a, o, r);
    }
  }
};
wt.prototype.finish = function(t) {
  this.verticesBuffer = new ze(this.vertices), this.indicesBuffer = new ze(this.indices), this.startIndices.push(this.indices.length), this.lineStringReplay.finish(t), this.styleIndices_.length === 0 && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null;
};
wt.prototype.getDeleteResourcesFunction = function(t) {
  var e = this.verticesBuffer, i = this.indicesBuffer, r = this.lineStringReplay.getDeleteResourcesFunction(t);
  return function() {
    t.deleteBuffer(e), t.deleteBuffer(i), r();
  };
};
wt.prototype.setUpProgram = function(t, e, i, r) {
  var n, a;
  n = Ln.fragment, a = Ln.vertex;
  var o = e.getProgram(n, a), s;
  return this.defaultLocations_ ? s = this.defaultLocations_ : (s = new Fo(t, o), this.defaultLocations_ = s), e.useProgram(o), t.enableVertexAttribArray(s.a_position), t.vertexAttribPointer(
    s.a_position,
    2,
    S.FLOAT,
    !1,
    8,
    0
  ), s;
};
wt.prototype.shutDownProgram = function(t, e) {
  t.disableVertexAttribArray(e.a_position);
};
wt.prototype.drawReplay = function(t, e, i, r) {
  var n = (
    /** @type {number} */
    t.getParameter(t.DEPTH_FUNC)
  ), a = (
    /** @type {boolean} */
    t.getParameter(t.DEPTH_WRITEMASK)
  );
  if (r || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), !ut.isEmpty(i))
    this.drawReplaySkipping_(t, e, i);
  else {
    var o, s, l, h;
    for (l = this.startIndices[this.startIndices.length - 1], o = this.styleIndices_.length - 1; o >= 0; --o)
      s = this.styleIndices_[o], h = this.styles_[o], this.setFillStyle_(t, h), this.drawElements(t, e, s, l), l = s;
  }
  r || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(a), t.depthFunc(n));
};
wt.prototype.drawHitDetectionReplayOneByOne = function(t, e, i, r, n) {
  var a, o, s, l, h, u, f, c;
  for (c = this.startIndices.length - 2, s = this.startIndices[c + 1], a = this.styleIndices_.length - 1; a >= 0; --a)
    for (l = this.styles_[a], this.setFillStyle_(t, l), h = this.styleIndices_[a]; c >= 0 && this.startIndices[c] >= h; ) {
      if (o = this.startIndices[c], u = this.startIndicesFeature[c], f = _.getUid(u).toString(), i[f] === void 0 && u.getGeometry() && (n === void 0 || g.intersects(
        /** @type {Array<number>} */
        n,
        u.getGeometry().getExtent()
      ))) {
        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, o, s);
        var d = r(u);
        if (d)
          return d;
      }
      c--, s = o;
    }
};
wt.prototype.drawReplaySkipping_ = function(t, e, i) {
  var r, n, a, o, s, l, h, u, f;
  for (u = this.startIndices.length - 2, a = n = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (o = this.styles_[r], this.setFillStyle_(t, o), s = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= s; )
      f = this.startIndices[u], l = this.startIndicesFeature[u], h = _.getUid(l).toString(), i[h] && (n !== a && (this.drawElements(t, e, n, a), t.clear(t.DEPTH_BUFFER_BIT)), a = f), u--, n = f;
    n !== a && (this.drawElements(t, e, n, a), t.clear(t.DEPTH_BUFFER_BIT)), n = a = s;
  }
};
wt.prototype.setFillStyle_ = function(t, e) {
  t.uniform4fv(this.defaultLocations_.u_color, e);
};
wt.prototype.setFillStrokeStyle = function(t, e) {
  var i = t ? t.getColor() : [0, 0, 0, 0];
  if (!(i instanceof CanvasGradient) && !(i instanceof CanvasPattern) ? i = Xt.asArray(i).map(function(n, a) {
    return a != 3 ? n / 255 : n;
  }) || et.defaultFillStyle : i = et.defaultFillStyle, (!this.state_.fillColor || !st.equals(i, this.state_.fillColor)) && (this.state_.fillColor = i, this.state_.changed = !0, this.styles_.push(i)), e)
    this.lineStringReplay.setFillStrokeStyle(null, e);
  else {
    var r = new we({
      color: [0, 0, 0, 0],
      lineWidth: 0
    });
    this.lineStringReplay.setFillStrokeStyle(null, r);
  }
};
var xr = function(t, e) {
  this.space_ = e, this.emptyBlocks_ = [{ x: 0, y: 0, width: t, height: t }], this.entries_ = {}, this.context_ = At.createCanvasContext2D(t, t), this.canvas_ = this.context_.canvas;
};
xr.prototype.get = function(t) {
  return this.entries_[t] || null;
};
xr.prototype.add = function(t, e, i, r, n) {
  var a, o, s;
  for (o = 0, s = this.emptyBlocks_.length; o < s; ++o)
    if (a = this.emptyBlocks_[o], a.width >= e + this.space_ && a.height >= i + this.space_) {
      var l = {
        offsetX: a.x + this.space_,
        offsetY: a.y + this.space_,
        image: this.canvas_
      };
      return this.entries_[t] = l, r.call(
        n,
        this.context_,
        a.x + this.space_,
        a.y + this.space_
      ), this.split_(o, a, e + this.space_, i + this.space_), l;
    }
  return null;
};
xr.prototype.split_ = function(t, e, i, r) {
  var n = e.width - i, a = e.height - r, o, s;
  n > a ? (o = {
    x: e.x + i,
    y: e.y,
    width: e.width - i,
    height: e.height
  }, s = {
    x: e.x,
    y: e.y + r,
    width: i,
    height: e.height - r
  }, this.updateBlocks_(t, o, s)) : (o = {
    x: e.x + i,
    y: e.y,
    width: e.width - i,
    height: r
  }, s = {
    x: e.x,
    y: e.y + r,
    width: e.width,
    height: e.height - r
  }, this.updateBlocks_(t, o, s));
};
xr.prototype.updateBlocks_ = function(t, e, i) {
  var r = [t, 1];
  e.width > 0 && e.height > 0 && r.push(e), i.width > 0 && i.height > 0 && r.push(i), this.emptyBlocks_.splice.apply(this.emptyBlocks_, r);
};
var Vr = function(t) {
  var e = t || {};
  this.currentSize_ = e.initialSize !== void 0 ? e.initialSize : _.INITIAL_ATLAS_SIZE, this.maxSize_ = e.maxSize !== void 0 ? e.maxSize : _.MAX_ATLAS_SIZE != -1 ? _.MAX_ATLAS_SIZE : _.WEBGL_MAX_TEXTURE_SIZE !== void 0 ? _.WEBGL_MAX_TEXTURE_SIZE : 2048, this.space_ = e.space !== void 0 ? e.space : 1, this.atlases_ = [new xr(this.currentSize_, this.space_)], this.currentHitSize_ = this.currentSize_, this.hitAtlases_ = [new xr(this.currentHitSize_, this.space_)];
};
Vr.prototype.getInfo = function(t) {
  var e = this.getInfo_(this.atlases_, t);
  if (!e)
    return null;
  var i = (
    /** @type {ol.AtlasInfo} */
    this.getInfo_(this.hitAtlases_, t)
  );
  return this.mergeInfos_(e, i);
};
Vr.prototype.getInfo_ = function(t, e) {
  var i, r, n, a;
  for (n = 0, a = t.length; n < a; ++n)
    if (i = t[n], r = i.get(e), r)
      return r;
  return null;
};
Vr.prototype.mergeInfos_ = function(t, e) {
  return (
    /** @type {ol.AtlasManagerInfo} */
    {
      offsetX: t.offsetX,
      offsetY: t.offsetY,
      image: t.image,
      hitImage: e.image
    }
  );
};
Vr.prototype.add = function(t, e, i, r, n, a) {
  if (e + this.space_ > this.maxSize_ || i + this.space_ > this.maxSize_)
    return null;
  var o = this.add_(
    !1,
    t,
    e,
    i,
    r,
    a
  );
  if (!o)
    return null;
  var s = n !== void 0 ? n : _.nullFunction, l = (
    /** @type {ol.AtlasInfo} */
    this.add_(
      !0,
      t,
      e,
      i,
      s,
      a
    )
  );
  return this.mergeInfos_(o, l);
};
Vr.prototype.add_ = function(t, e, i, r, n, a) {
  var o = t ? this.hitAtlases_ : this.atlases_, s, l, h, u;
  for (h = 0, u = o.length; h < u; ++h) {
    if (s = o[h], l = s.add(e, i, r, n, a), l)
      return l;
    if (!l && h === u - 1) {
      var f;
      t ? (f = Math.min(this.currentHitSize_ * 2, this.maxSize_), this.currentHitSize_ = f) : (f = Math.min(this.currentSize_ * 2, this.maxSize_), this.currentSize_ = f), s = new xr(f, this.space_), o.push(s), ++u;
    }
  }
  return null;
};
var mi = function(t, e) {
  Pe.call(this, t, e), this.images_ = [], this.textures_ = [], this.measureCanvas_ = At.createCanvasContext2D(0, 0).canvas, this.state_ = {
    strokeColor: null,
    lineCap: void 0,
    lineDash: null,
    lineDashOffset: void 0,
    lineJoin: void 0,
    lineWidth: 0,
    miterLimit: void 0,
    fillColor: null,
    font: void 0,
    scale: void 0
  }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.atlases_ = {}, this.currAtlas_ = void 0, this.scale = 1, this.opacity = 1;
};
_.inherits(mi, Pe);
mi.prototype.drawText = function(t, e) {
  if (this.text_) {
    var i = null, r = 0, n = 2, a = 2;
    switch (t.getType()) {
      case j.POINT:
      case j.MULTI_POINT:
        i = t.getFlatCoordinates(), n = i.length, a = t.getStride();
        break;
      case j.CIRCLE:
        i = /** @type {ol.geom.Circle} */
        t.getCenter();
        break;
      case j.LINE_STRING:
        i = /** @type {ol.geom.LineString} */
        t.getFlatMidpoint();
        break;
      case j.MULTI_LINE_STRING:
        i = /** @type {ol.geom.MultiLineString} */
        t.getFlatMidpoints(), n = i.length;
        break;
      case j.POLYGON:
        i = /** @type {ol.geom.Polygon} */
        t.getFlatInteriorPoint();
        break;
      case j.MULTI_POLYGON:
        i = /** @type {ol.geom.MultiPolygon} */
        t.getFlatInteriorPoints(), n = i.length;
        break;
    }
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
    var o = this.currAtlas_, s = this.text_.split(`
`), l = this.getTextSize_(s), h, u, f, c, d, v, m, p, E = Math.round(l[0] * this.textAlign_ - this.offsetX_), y = Math.round(l[1] * this.textBaseline_ - this.offsetY_), R = this.state_.lineWidth / 2 * this.state_.scale;
    for (h = 0, u = s.length; h < u; ++h)
      for (d = 0, v = o.height * h, m = s[h].split(""), f = 0, c = m.length; f < c; ++f) {
        if (p = o.atlas.getInfo(m[f]), p) {
          var I = p.image;
          this.anchorX = E - d, this.anchorY = y - v, this.originX = f === 0 ? p.offsetX - R : p.offsetX, this.originY = p.offsetY, this.height = o.height, this.width = f === 0 || f === m.length - 1 ? o.width[m[f]] + R : o.width[m[f]], this.imageHeight = I.height, this.imageWidth = I.width;
          var x;
          this.images_.length === 0 ? this.images_.push(I) : (x = this.images_[this.images_.length - 1], _.getUid(x) != _.getUid(I) && (this.groupIndices.push(this.indices.length), this.images_.push(I))), this.drawText_(i, r, n, a);
        }
        d += this.width;
      }
  }
};
mi.prototype.getTextSize_ = function(t) {
  var e = this, i = this.currAtlas_, r = t.length * i.height, n = t.map(function(a) {
    var o = 0, s, l;
    for (s = 0, l = a.length; s < l; ++s) {
      var h = a[s];
      i.width[h] || e.addCharToAtlas_(h), o += i.width[h] ? i.width[h] : 0;
    }
    return o;
  }).reduce(function(a, o) {
    return Math.max(a, o);
  });
  return [n, r];
};
mi.prototype.drawText_ = function(t, e, i, r) {
  var n, a;
  for (n = e, a = i; n < a; n += r)
    this.drawCoordinates(t, e, i, r);
};
mi.prototype.addCharToAtlas_ = function(t) {
  if (t.length === 1) {
    var e = this.currAtlas_, i = this.state_, r = this.measureCanvas_.getContext("2d");
    r.font = i.font;
    var n = Math.ceil(r.measureText(t).width * i.scale), a = e.atlas.add(
      t,
      n,
      e.height,
      function(o, s, l) {
        o.font = /** @type {string} */
        i.font, o.fillStyle = i.fillColor, o.strokeStyle = i.strokeColor, o.lineWidth = i.lineWidth, o.lineCap = /*** @type {string} */
        i.lineCap, o.lineJoin = /** @type {string} */
        i.lineJoin, o.miterLimit = /** @type {number} */
        i.miterLimit, o.textAlign = "left", o.textBaseline = "top", pt.CANVAS_LINE_DASH && i.lineDash && (o.setLineDash(i.lineDash), o.lineDashOffset = /** @type {number} */
        i.lineDashOffset), i.scale !== 1 && o.setTransform(
          /** @type {number} */
          i.scale,
          0,
          0,
          /** @type {number} */
          i.scale,
          0,
          0
        ), i.strokeColor && o.strokeText(t, s, l), i.fillColor && o.fillText(t, s, l);
      }
    );
    a && (e.width[t] = n);
  }
};
mi.prototype.finish = function(t) {
  var e = t.getGL();
  this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices = this.groupIndices, this.verticesBuffer = new ze(this.vertices), this.indicesBuffer = new ze(this.indices);
  var i = {};
  this.createTextures(this.textures_, this.images_, i, e), this.state_ = {
    strokeColor: null,
    lineCap: void 0,
    lineDash: null,
    lineDashOffset: void 0,
    lineJoin: void 0,
    lineWidth: 0,
    miterLimit: void 0,
    fillColor: null,
    font: void 0,
    scale: void 0
  }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.images_ = null, this.atlases_ = {}, this.currAtlas_ = void 0, Pe.prototype.finish.call(this, t);
};
mi.prototype.setTextStyle = function(t) {
  var e = this.state_, i = t.getFill(), r = t.getStroke();
  if (!t || !t.getText() || !i && !r)
    this.text_ = "";
  else {
    if (!i)
      e.fillColor = null;
    else {
      var n = i.getColor();
      e.fillColor = li.asColorLike(n || et.defaultFillStyle);
    }
    if (!r)
      e.strokeColor = null, e.lineWidth = 0;
    else {
      var a = r.getColor();
      e.strokeColor = li.asColorLike(a || et.defaultStrokeStyle), e.lineWidth = r.getWidth() || et.defaultLineWidth, e.lineCap = r.getLineCap() || et.defaultLineCap, e.lineDashOffset = r.getLineDashOffset() || et.defaultLineDashOffset, e.lineJoin = r.getLineJoin() || et.defaultLineJoin, e.miterLimit = r.getMiterLimit() || et.defaultMiterLimit;
      var o = r.getLineDash();
      e.lineDash = o ? o.slice() : et.defaultLineDash;
    }
    e.font = t.getFont() || et.defaultFont, e.scale = t.getScale() || 1, this.text_ = /** @type {string} */
    t.getText();
    var s = Bt.TEXT_ALIGN[t.getTextAlign()], l = Bt.TEXT_ALIGN[t.getTextBaseline()];
    this.textAlign_ = s === void 0 ? et.defaultTextAlign : s, this.textBaseline_ = l === void 0 ? et.defaultTextBaseline : l, this.offsetX_ = t.getOffsetX() || 0, this.offsetY_ = t.getOffsetY() || 0, this.rotateWithView = !!t.getRotateWithView(), this.rotation = t.getRotation() || 0, this.currAtlas_ = this.getAtlas_(e);
  }
};
mi.prototype.getAtlas_ = function(t) {
  var e = [], i;
  for (i in t)
    (t[i] || t[i] === 0) && (Array.isArray(t[i]) ? e = e.concat(t[i]) : e.push(t[i]));
  var r = this.calculateHash_(e);
  if (!this.atlases_[r]) {
    var n = this.measureCanvas_.getContext("2d");
    n.font = t.font;
    var a = Math.ceil((n.measureText("M").width * 1.5 + t.lineWidth / 2) * t.scale);
    this.atlases_[r] = {
      atlas: new Vr({
        space: t.lineWidth + 1
      }),
      width: {},
      height: a
    };
  }
  return this.atlases_[r];
};
mi.prototype.calculateHash_ = function(t) {
  var e, i, r = "";
  for (e = 0, i = t.length; e < i; ++e)
    r += t[e];
  return r;
};
mi.prototype.getTextures = function(t) {
  return this.textures_;
};
mi.prototype.getHitDetectionTextures = function() {
  return this.textures_;
};
var qt = function(t, e, i) {
  Yr.call(this), this.maxExtent_ = e, this.tolerance_ = t, this.renderBuffer_ = i, this.replaysByZIndex_ = {};
};
_.inherits(qt, Yr);
qt.prototype.addDeclutter = function(t, e) {
};
qt.prototype.getDeleteResourcesFunction = function(t) {
  var e = [], i;
  for (i in this.replaysByZIndex_) {
    var r = this.replaysByZIndex_[i], n;
    for (n in r)
      e.push(
        r[n].getDeleteResourcesFunction(t)
      );
  }
  return function() {
    for (var a = e.length, o, s = 0; s < a; s++)
      o = e[s].apply(this, arguments);
    return o;
  };
};
qt.prototype.finish = function(t) {
  var e;
  for (e in this.replaysByZIndex_) {
    var i = this.replaysByZIndex_[e], r;
    for (r in i)
      i[r].finish(t);
  }
};
qt.prototype.getReplay = function(t, e) {
  var i = t !== void 0 ? t.toString() : "0", r = this.replaysByZIndex_[i];
  r === void 0 && (r = {}, this.replaysByZIndex_[i] = r);
  var n = r[e];
  if (n === void 0) {
    var a = qt.BATCH_CONSTRUCTORS_[e];
    n = new a(this.tolerance_, this.maxExtent_), r[e] = n;
  }
  return n;
};
qt.prototype.isEmpty = function() {
  return ut.isEmpty(this.replaysByZIndex_);
};
qt.prototype.replay = function(t, e, i, r, n, a, o, s) {
  var l = Object.keys(this.replaysByZIndex_).map(Number);
  l.sort(st.numberSafeCompareFunction);
  var h, u, f, c, d, v;
  for (h = 0, u = l.length; h < u; ++h)
    for (d = this.replaysByZIndex_[l[h].toString()], f = 0, c = Bt.ORDER.length; f < c; ++f)
      v = d[Bt.ORDER[f]], v !== void 0 && v.replay(
        t,
        e,
        i,
        r,
        n,
        a,
        o,
        s,
        void 0,
        !1
      );
};
qt.prototype.replayHitDetection_ = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f = Object.keys(this.replaysByZIndex_).map(Number);
  f.sort(function(y, R) {
    return R - y;
  });
  var c, d, v, m, p, E;
  for (c = 0, d = f.length; c < d; ++c)
    for (m = this.replaysByZIndex_[f[c].toString()], v = Bt.ORDER.length - 1; v >= 0; --v)
      if (p = m[Bt.ORDER[v]], p !== void 0 && (E = p.replay(
        t,
        e,
        i,
        r,
        n,
        a,
        o,
        s,
        l,
        h,
        u
      ), E))
        return E;
};
qt.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n, a, o, s, l, h) {
  var u = e.getGL();
  u.bindFramebuffer(
    u.FRAMEBUFFER,
    e.getHitDetectionFramebuffer()
  );
  var f;
  return this.renderBuffer_ !== void 0 && (f = g.buffer(
    g.createOrUpdateFromCoordinate(t),
    r * this.renderBuffer_
  )), this.replayHitDetection_(
    e,
    t,
    r,
    n,
    qt.HIT_DETECTION_SIZE_,
    o,
    s,
    l,
    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @return {?} Callback result.
     */
    function(c) {
      var d = new Uint8Array(4);
      if (u.readPixels(0, 0, 1, 1, u.RGBA, u.UNSIGNED_BYTE, d), d[3] > 0) {
        var v = h(c);
        if (v)
          return v;
      }
    },
    !0,
    f
  );
};
qt.prototype.hasFeatureAtCoordinate = function(t, e, i, r, n, a, o, s, l) {
  var h = e.getGL();
  h.bindFramebuffer(
    h.FRAMEBUFFER,
    e.getHitDetectionFramebuffer()
  );
  var u = this.replayHitDetection_(
    e,
    t,
    r,
    n,
    qt.HIT_DETECTION_SIZE_,
    o,
    s,
    l,
    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @return {boolean} Is there a feature?
     */
    function(f) {
      var c = new Uint8Array(4);
      return h.readPixels(0, 0, 1, 1, h.RGBA, h.UNSIGNED_BYTE, c), c[3] > 0;
    },
    !1
  );
  return u !== void 0;
};
qt.HIT_DETECTION_SIZE_ = [1, 1];
qt.BATCH_CONSTRUCTORS_ = {
  Circle: ai,
  Image: cr,
  LineString: dt,
  Polygon: wt,
  Text: mi
};
var Me = function(t, e, i, r, n, a, o) {
  zt.call(this), this.context_ = t, this.center_ = e, this.extent_ = a, this.pixelRatio_ = o, this.size_ = n, this.rotation_ = r, this.resolution_ = i, this.imageStyle_ = null, this.fillStyle_ = null, this.strokeStyle_ = null, this.textStyle_ = null;
};
_.inherits(Me, zt);
Me.prototype.drawText_ = function(t, e) {
  var i = this.context_, r = (
    /** @type {ol.render.webgl.TextReplay} */
    t.getReplay(0, at.TEXT)
  );
  r.setTextStyle(this.textStyle_), r.drawText(e, null), r.finish(i);
  var n = 1, a = {}, o, s = !1;
  r.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    n,
    a,
    o,
    s
  ), r.getDeleteResourcesFunction(i)();
};
Me.prototype.setStyle = function(t) {
  this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText());
};
Me.prototype.drawGeometry = function(t) {
  var e = t.getType();
  switch (e) {
    case j.POINT:
      this.drawPoint(
        /** @type {ol.geom.Point} */
        t,
        null
      );
      break;
    case j.LINE_STRING:
      this.drawLineString(
        /** @type {ol.geom.LineString} */
        t,
        null
      );
      break;
    case j.POLYGON:
      this.drawPolygon(
        /** @type {ol.geom.Polygon} */
        t,
        null
      );
      break;
    case j.MULTI_POINT:
      this.drawMultiPoint(
        /** @type {ol.geom.MultiPoint} */
        t,
        null
      );
      break;
    case j.MULTI_LINE_STRING:
      this.drawMultiLineString(
        /** @type {ol.geom.MultiLineString} */
        t,
        null
      );
      break;
    case j.MULTI_POLYGON:
      this.drawMultiPolygon(
        /** @type {ol.geom.MultiPolygon} */
        t,
        null
      );
      break;
    case j.GEOMETRY_COLLECTION:
      this.drawGeometryCollection(
        /** @type {ol.geom.GeometryCollection} */
        t,
        null
      );
      break;
    case j.CIRCLE:
      this.drawCircle(
        /** @type {ol.geom.Circle} */
        t,
        null
      );
      break;
  }
};
Me.prototype.drawFeature = function(t, e) {
  var i = e.getGeometryFunction()(t);
  !i || !g.intersects(this.extent_, i.getExtent()) || (this.setStyle(e), this.drawGeometry(i));
};
Me.prototype.drawGeometryCollection = function(t, e) {
  var i = t.getGeometriesArray(), r, n;
  for (r = 0, n = i.length; r < n; ++r)
    this.drawGeometry(i[r]);
};
Me.prototype.drawPoint = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.ImageReplay} */
    r.getReplay(0, at.IMAGE)
  );
  n.setImageStyle(this.imageStyle_), n.drawPoint(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawMultiPoint = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.ImageReplay} */
    r.getReplay(0, at.IMAGE)
  );
  n.setImageStyle(this.imageStyle_), n.drawMultiPoint(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawLineString = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.LineStringReplay} */
    r.getReplay(0, at.LINE_STRING)
  );
  n.setFillStrokeStyle(null, this.strokeStyle_), n.drawLineString(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawMultiLineString = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.LineStringReplay} */
    r.getReplay(0, at.LINE_STRING)
  );
  n.setFillStrokeStyle(null, this.strokeStyle_), n.drawMultiLineString(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawPolygon = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.PolygonReplay} */
    r.getReplay(0, at.POLYGON)
  );
  n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawPolygon(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawMultiPolygon = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.PolygonReplay} */
    r.getReplay(0, at.POLYGON)
  );
  n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawMultiPolygon(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.drawCircle = function(t, e) {
  var i = this.context_, r = new qt(1, this.extent_), n = (
    /** @type {ol.render.webgl.CircleReplay} */
    r.getReplay(0, at.CIRCLE)
  );
  n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawCircle(t, e), n.finish(i);
  var a = 1, o = {}, s, l = !1;
  n.replay(
    this.context_,
    this.center_,
    this.resolution_,
    this.rotation_,
    this.size_,
    this.pixelRatio_,
    a,
    o,
    s,
    l
  ), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t);
};
Me.prototype.setImageStyle = function(t) {
  this.imageStyle_ = t;
};
Me.prototype.setFillStrokeStyle = function(t, e) {
  this.fillStyle_ = t, this.strokeStyle_ = e;
};
Me.prototype.setTextStyle = function(t) {
  this.textStyle_ = t;
};
var An = {};
An.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;
varying vec2 v_texCoord;


uniform float u_opacity;
uniform sampler2D u_texture;

void main(void) {
  vec4 texColor = texture2D(u_texture, v_texCoord);
  gl_FragColor.rgb = texColor.rgb;
  gl_FragColor.a = texColor.a * u_opacity;
}
` : "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}");
An.vertex = new fr(_.DEBUG_WEBGL ? `varying vec2 v_texCoord;


attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform mat4 u_texCoordMatrix;
uniform mat4 u_projectionMatrix;

void main(void) {
  gl_Position = u_projectionMatrix * vec4(a_position, 0., 1.);
  v_texCoord = (u_texCoordMatrix * vec4(a_texCoord, 0., 1.)).st;
}


` : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}");
var bo = function(t, e) {
  this.u_texCoordMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_texCoordMatrix" : "d"
  ), this.u_projectionMatrix = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_projectionMatrix" : "e"
  ), this.u_opacity = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_opacity" : "f"
  ), this.u_texture = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_texture" : "g"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "b"
  ), this.a_texCoord = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_texCoord" : "c"
  );
}, xe = function(t, e) {
  Ze.call(this, e), this.mapRenderer = t, this.arrayBuffer_ = new ze([
    -1,
    -1,
    0,
    0,
    1,
    -1,
    1,
    0,
    -1,
    1,
    0,
    1,
    1,
    1,
    1,
    1
  ]), this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0, this.texCoordMatrix = A.create(), this.projectionMatrix = A.create(), this.tmpMat4_ = ji.create(), this.defaultLocations_ = null;
};
_.inherits(xe, Ze);
xe.prototype.bindFramebuffer = function(t, e) {
  var i = this.mapRenderer.getGL();
  if (this.framebufferDimension === void 0 || this.framebufferDimension != e) {
    var r = (function(o, s, l) {
      o.isContextLost() || (o.deleteFramebuffer(s), o.deleteTexture(l));
    }).bind(null, i, this.framebuffer, this.texture);
    t.postRenderFunctions.push(
      /** @type {ol.PostRenderFunction} */
      r
    );
    var n = Jt.createEmptyTexture(
      i,
      e,
      e
    ), a = i.createFramebuffer();
    i.bindFramebuffer(S.FRAMEBUFFER, a), i.framebufferTexture2D(
      S.FRAMEBUFFER,
      S.COLOR_ATTACHMENT0,
      S.TEXTURE_2D,
      n,
      0
    ), this.texture = n, this.framebuffer = a, this.framebufferDimension = e;
  } else
    i.bindFramebuffer(S.FRAMEBUFFER, this.framebuffer);
};
xe.prototype.composeFrame = function(t, e, i) {
  this.dispatchComposeEvent_(
    Ci.PRECOMPOSE,
    i,
    t
  ), i.bindBuffer(S.ARRAY_BUFFER, this.arrayBuffer_);
  var r = i.getGL(), n = An.fragment, a = An.vertex, o = i.getProgram(n, a), s;
  this.defaultLocations_ ? s = this.defaultLocations_ : (s = new bo(r, o), this.defaultLocations_ = s), i.useProgram(o) && (r.enableVertexAttribArray(s.a_position), r.vertexAttribPointer(
    s.a_position,
    2,
    S.FLOAT,
    !1,
    16,
    0
  ), r.enableVertexAttribArray(s.a_texCoord), r.vertexAttribPointer(
    s.a_texCoord,
    2,
    S.FLOAT,
    !1,
    16,
    8
  ), r.uniform1i(s.u_texture, 0)), r.uniformMatrix4fv(
    s.u_texCoordMatrix,
    !1,
    ji.fromTransform(this.tmpMat4_, this.getTexCoordMatrix())
  ), r.uniformMatrix4fv(
    s.u_projectionMatrix,
    !1,
    ji.fromTransform(this.tmpMat4_, this.getProjectionMatrix())
  ), r.uniform1f(s.u_opacity, e.opacity), r.bindTexture(S.TEXTURE_2D, this.getTexture()), r.drawArrays(S.TRIANGLE_STRIP, 0, 4), this.dispatchComposeEvent_(
    Ci.POSTCOMPOSE,
    i,
    t
  );
};
xe.prototype.dispatchComposeEvent_ = function(t, e, i) {
  var r = this.getLayer();
  if (r.hasListener(t)) {
    var n = i.viewState, a = n.resolution, o = i.pixelRatio, s = i.extent, l = n.center, h = n.rotation, u = i.size, f = new Me(
      e,
      l,
      a,
      h,
      u,
      s,
      o
    ), c = new en(
      t,
      f,
      i,
      null,
      e
    );
    r.dispatchEvent(c);
  }
};
xe.prototype.getTexCoordMatrix = function() {
  return this.texCoordMatrix;
};
xe.prototype.getTexture = function() {
  return this.texture;
};
xe.prototype.getProjectionMatrix = function() {
  return this.projectionMatrix;
};
xe.prototype.handleWebGLContextLost = function() {
  this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0;
};
xe.prototype.prepareFrame = function(t, e, i) {
};
xe.prototype.forEachLayerAtPixel = function(t, e, i, r) {
};
var vi = function(t, e) {
  xe.call(this, t, e), this.image_ = null, this.hitCanvasContext_ = null, this.hitTransformationMatrix_ = null;
};
_.inherits(vi, xe);
vi.handles = function(t, e) {
  return t === ri.WEBGL && e.getType() === Di.IMAGE;
};
vi.create = function(t, e) {
  return new vi(
    /** @type {ol.renderer.webgl.Map} */
    t,
    /** @type {ol.layer.Image} */
    e
  );
};
vi.prototype.createTexture_ = function(t) {
  var e = t.getImage(), i = this.mapRenderer.getGL();
  return Jt.createTexture(
    i,
    e,
    S.CLAMP_TO_EDGE,
    S.CLAMP_TO_EDGE
  );
};
vi.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  var a = this.getLayer(), o = a.getSource(), s = e.viewState.resolution, l = e.viewState.rotation, h = e.skippedFeatureUids;
  return o.forEachFeatureAtCoordinate(
    t,
    s,
    l,
    i,
    h,
    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @return {?} Callback result.
     */
    function(u) {
      return r.call(n, u, a);
    }
  );
};
vi.prototype.prepareFrame = function(t, e, i) {
  var r = this.mapRenderer.getGL(), n = t.pixelRatio, a = t.viewState, o = a.center, s = a.resolution, l = a.rotation, h = this.image_, u = this.texture, f = (
    /** @type {ol.layer.Image} */
    this.getLayer()
  ), c = f.getSource(), d = t.viewHints, v = t.extent;
  if (e.extent !== void 0 && (v = g.getIntersection(
    v,
    e.extent
  )), !d[Dt.ANIMATING] && !d[Dt.INTERACTING] && !g.isEmpty(v)) {
    var m = a.projection;
    if (!_.ENABLE_RASTER_REPROJECTION) {
      var p = c.getProjection();
      p && (m = p);
    }
    var E = c.getImage(
      v,
      s,
      n,
      m
    );
    if (E) {
      var y = this.loadImage(E);
      if (y && (h = E, u = this.createTexture_(E), this.texture)) {
        var R = (function(C, N) {
          C.isContextLost() || C.deleteTexture(N);
        }).bind(null, r, this.texture);
        t.postRenderFunctions.push(
          /** @type {ol.PostRenderFunction} */
          R
        );
      }
    }
  }
  if (h) {
    var I = this.mapRenderer.getContext().getCanvas();
    this.updateProjectionMatrix_(
      I.width,
      I.height,
      n,
      o,
      s,
      l,
      h.getExtent()
    ), this.hitTransformationMatrix_ = null;
    var x = this.texCoordMatrix;
    A.reset(x), A.scale(x, 1, -1), A.translate(x, 0, -1), this.image_ = h, this.texture = u, this.updateLogos(t, c);
  }
  return !!h;
};
vi.prototype.updateProjectionMatrix_ = function(t, e, i, r, n, a, o) {
  var s = t * n, l = e * n, h = this.projectionMatrix;
  A.reset(h), A.scale(
    h,
    i * 2 / s,
    i * 2 / l
  ), A.rotate(h, -a), A.translate(
    h,
    o[0] - r[0],
    o[1] - r[1]
  ), A.scale(
    h,
    (o[2] - o[0]) / 2,
    (o[3] - o[1]) / 2
  ), A.translate(h, 1, 1);
};
vi.prototype.hasFeatureAtCoordinate = function(t, e) {
  var i = this.forEachFeatureAtCoordinate(
    t,
    e,
    0,
    se.TRUE,
    this
  );
  return i !== void 0;
};
vi.prototype.forEachLayerAtPixel = function(t, e, i, r) {
  if (!(!this.image_ || !this.image_.getImage()))
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== _.nullFunction) {
      var n = A.apply(
        e.pixelToCoordinateTransform,
        t.slice()
      ), a = this.forEachFeatureAtCoordinate(
        n,
        e,
        0,
        se.TRUE,
        this
      );
      return a ? i.call(r, this.getLayer(), null) : void 0;
    } else {
      var o = [this.image_.getImage().width, this.image_.getImage().height];
      this.hitTransformationMatrix_ || (this.hitTransformationMatrix_ = this.getHitTransformationMatrix_(
        e.size,
        o
      ));
      var s = A.apply(
        this.hitTransformationMatrix_,
        t.slice()
      );
      if (s[0] < 0 || s[0] > o[0] || s[1] < 0 || s[1] > o[1])
        return;
      this.hitCanvasContext_ || (this.hitCanvasContext_ = At.createCanvasContext2D(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(
        this.image_.getImage(),
        s[0],
        s[1],
        1,
        1,
        0,
        0,
        1,
        1
      );
      var l = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
      return l[3] > 0 ? i.call(r, this.getLayer(), l) : void 0;
    }
};
vi.prototype.getHitTransformationMatrix_ = function(t, e) {
  var i = A.create();
  A.translate(i, -1, -1), A.scale(i, 2 / t[0], 2 / t[1]), A.translate(i, 0, t[1]), A.scale(i, 1, -1);
  var r = A.invert(this.projectionMatrix.slice()), n = A.create();
  return A.translate(n, 0, e[1]), A.scale(n, 1, -1), A.scale(n, e[0] / 2, e[1] / 2), A.translate(n, 1, 1), A.multiply(n, r), A.multiply(n, i), n;
};
var ae = function(t, e) {
  kt.call(this, t, e), this.canvas_ = /** @type {HTMLCanvasElement} */
  document.createElement("CANVAS"), this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = _e.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.clipTileCanvasWidth_ = 0, this.clipTileCanvasHeight_ = 0, this.clipTileContext_ = At.createCanvasContext2D(), this.renderedVisible_ = !0, this.gl_ = S.getContext(this.canvas_, {
    antialias: !0,
    depth: !0,
    failIfMajorPerformanceCaveat: !0,
    preserveDrawingBuffer: !1,
    stencil: !0
  }), this.context_ = new Jt(this.canvas_, this.gl_), L.listen(
    this.canvas_,
    Cn.LOST,
    this.handleWebGLContextLost,
    this
  ), L.listen(
    this.canvas_,
    Cn.RESTORED,
    this.handleWebGLContextRestored,
    this
  ), this.textureCache_ = new le(), this.focus_ = null, this.tileTextureQueue_ = new Zt(
    /**
     * @param {Array.<*>} element Element.
     * @return {number} Priority.
     * @this {ol.renderer.webgl.Map}
     */
    (function(i) {
      var r = (
        /** @type {ol.Coordinate} */
        i[1]
      ), n = (
        /** @type {number} */
        i[2]
      ), a = r[0] - this.focus_[0], o = r[1] - this.focus_[1];
      return 65536 * Math.log(n) + Math.sqrt(a * a + o * o) / n;
    }).bind(this),
    /**
     * @param {Array.<*>} element Element.
     * @return {string} Key.
     */
    function(i) {
      return (
        /** @type {ol.Tile} */
        i[0].getKey()
      );
    }
  ), this.loadNextTileTexture_ = (function(i, r) {
    if (!this.tileTextureQueue_.isEmpty()) {
      this.tileTextureQueue_.reprioritize();
      var n = this.tileTextureQueue_.dequeue(), a = (
        /** @type {ol.Tile} */
        n[0]
      ), o = (
        /** @type {ol.Size} */
        n[3]
      ), s = (
        /** @type {number} */
        n[4]
      );
      this.bindTileTexture(
        a,
        o,
        s,
        S.LINEAR,
        S.LINEAR
      );
    }
    return !1;
  }).bind(this), this.textureCacheFrameMarkerCount_ = 0, this.initializeGL_();
};
_.inherits(ae, kt);
ae.handles = function(t) {
  return pt.WEBGL && t === ri.WEBGL;
};
ae.create = function(t, e) {
  return new ae(t, e);
};
ae.prototype.bindTileTexture = function(t, e, i, r, n) {
  var a = this.getGL(), o = t.getKey();
  if (this.textureCache_.containsKey(o)) {
    var s = this.textureCache_.get(o);
    a.bindTexture(S.TEXTURE_2D, s.texture), s.magFilter != r && (a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_MAG_FILTER,
      r
    ), s.magFilter = r), s.minFilter != n && (a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_MIN_FILTER,
      n
    ), s.minFilter = n);
  } else {
    var l = a.createTexture();
    if (a.bindTexture(S.TEXTURE_2D, l), i > 0) {
      var h = this.clipTileContext_.canvas, u = this.clipTileContext_;
      this.clipTileCanvasWidth_ !== e[0] || this.clipTileCanvasHeight_ !== e[1] ? (h.width = e[0], h.height = e[1], this.clipTileCanvasWidth_ = e[0], this.clipTileCanvasHeight_ = e[1]) : u.clearRect(0, 0, e[0], e[1]), u.drawImage(
        t.getImage(),
        i,
        i,
        e[0],
        e[1],
        0,
        0,
        e[0],
        e[1]
      ), a.texImage2D(
        S.TEXTURE_2D,
        0,
        S.RGBA,
        S.RGBA,
        S.UNSIGNED_BYTE,
        h
      );
    } else
      a.texImage2D(
        S.TEXTURE_2D,
        0,
        S.RGBA,
        S.RGBA,
        S.UNSIGNED_BYTE,
        t.getImage()
      );
    a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_MAG_FILTER,
      r
    ), a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_MIN_FILTER,
      n
    ), a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_WRAP_S,
      S.CLAMP_TO_EDGE
    ), a.texParameteri(
      S.TEXTURE_2D,
      S.TEXTURE_WRAP_T,
      S.CLAMP_TO_EDGE
    ), this.textureCache_.set(o, {
      texture: l,
      magFilter: r,
      minFilter: n
    });
  }
};
ae.prototype.dispatchComposeEvent_ = function(t, e) {
  var i = this.getMap();
  if (i.hasListener(t)) {
    var r = this.context_, n = e.extent, a = e.size, o = e.viewState, s = e.pixelRatio, l = o.resolution, h = o.center, u = o.rotation, f = new Me(
      r,
      h,
      l,
      u,
      a,
      n,
      s
    ), c = new en(
      t,
      f,
      e,
      null,
      r
    );
    i.dispatchEvent(c);
  }
};
ae.prototype.disposeInternal = function() {
  var t = this.getGL();
  t.isContextLost() || this.textureCache_.forEach(
    /**
     * @param {?ol.WebglTextureCacheEntry} textureCacheEntry
     *     Texture cache entry.
     */
    function(e) {
      e && t.deleteTexture(e.texture);
    }
  ), this.context_.dispose(), kt.prototype.disposeInternal.call(this);
};
ae.prototype.expireCache_ = function(t, e) {
  for (var i = this.getGL(), r; this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > _.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK; ) {
    if (r = this.textureCache_.peekLast(), r)
      i.deleteTexture(r.texture);
    else {
      if (+this.textureCache_.peekLastKey() == e.index)
        break;
      --this.textureCacheFrameMarkerCount_;
    }
    this.textureCache_.pop();
  }
};
ae.prototype.getContext = function() {
  return this.context_;
};
ae.prototype.getGL = function() {
  return this.gl_;
};
ae.prototype.getTileTextureQueue = function() {
  return this.tileTextureQueue_;
};
ae.prototype.getType = function() {
  return ri.WEBGL;
};
ae.prototype.handleWebGLContextLost = function(t) {
  t.preventDefault(), this.textureCache_.clear(), this.textureCacheFrameMarkerCount_ = 0;
  var e = this.getLayerRenderers();
  for (var i in e) {
    var r = (
      /** @type {ol.renderer.webgl.Layer} */
      e[i]
    );
    r.handleWebGLContextLost();
  }
};
ae.prototype.handleWebGLContextRestored = function() {
  this.initializeGL_(), this.getMap().render();
};
ae.prototype.initializeGL_ = function() {
  var t = this.gl_;
  t.activeTexture(S.TEXTURE0), t.blendFuncSeparate(
    S.SRC_ALPHA,
    S.ONE_MINUS_SRC_ALPHA,
    S.ONE,
    S.ONE_MINUS_SRC_ALPHA
  ), t.disable(S.CULL_FACE), t.disable(S.DEPTH_TEST), t.disable(S.SCISSOR_TEST), t.disable(S.STENCIL_TEST);
};
ae.prototype.isTileTextureLoaded = function(t) {
  return this.textureCache_.containsKey(t.getKey());
};
ae.prototype.renderFrame = function(t) {
  var e = this.getContext(), i = this.getGL();
  if (i.isContextLost())
    return !1;
  if (!t)
    return this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1), !1;
  this.focus_ = t.focus, this.textureCache_.set((-t.index).toString(), null), ++this.textureCacheFrameMarkerCount_, this.dispatchComposeEvent_(Ci.PRECOMPOSE, t);
  var r = [], n = t.layerStatesArray;
  st.stableSort(n, kt.sortByZIndex);
  var a = t.viewState.resolution, o, s, l, h;
  for (o = 0, s = n.length; o < s; ++o)
    h = n[o], ge.visibleAtResolution(h, a) && h.sourceState == Ur.READY && (l = /** @type {ol.renderer.webgl.Layer} */
    this.getLayerRenderer(h.layer), l.prepareFrame(t, h, e) && r.push(h));
  var u = t.size[0] * t.pixelRatio, f = t.size[1] * t.pixelRatio;
  for ((this.canvas_.width != u || this.canvas_.height != f) && (this.canvas_.width = u, this.canvas_.height = f), i.bindFramebuffer(S.FRAMEBUFFER, null), i.clearColor(0, 0, 0, 0), i.clear(S.COLOR_BUFFER_BIT), i.enable(S.BLEND), i.viewport(0, 0, this.canvas_.width, this.canvas_.height), o = 0, s = r.length; o < s; ++o)
    h = r[o], l = /** @type {ol.renderer.webgl.Layer} */
    this.getLayerRenderer(h.layer), l.composeFrame(t, h, e);
  this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.calculateMatrices2D(t), this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > _.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK && t.postRenderFunctions.push(
    /** @type {ol.PostRenderFunction} */
    this.expireCache_.bind(this)
  ), this.tileTextureQueue_.isEmpty() || (t.postRenderFunctions.push(this.loadNextTileTexture_), t.animate = !0), this.dispatchComposeEvent_(Ci.POSTCOMPOSE, t), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t);
};
ae.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n, a, o) {
  var s;
  if (this.getGL().isContextLost())
    return !1;
  var l = e.viewState, h = e.layerStatesArray, u = h.length, f;
  for (f = u - 1; f >= 0; --f) {
    var c = h[f], d = c.layer;
    if (ge.visibleAtResolution(c, l.resolution) && a.call(o, d)) {
      var v = this.getLayerRenderer(d);
      if (s = v.forEachFeatureAtCoordinate(
        t,
        e,
        i,
        r,
        n
      ), s)
        return s;
    }
  }
};
ae.prototype.hasFeatureAtCoordinate = function(t, e, i, r, n) {
  var a = !1;
  if (this.getGL().isContextLost())
    return !1;
  var o = e.viewState, s = e.layerStatesArray, l = s.length, h;
  for (h = l - 1; h >= 0; --h) {
    var u = s[h], f = u.layer;
    if (ge.visibleAtResolution(u, o.resolution) && r.call(n, f)) {
      var c = this.getLayerRenderer(f);
      if (a = c.hasFeatureAtCoordinate(t, e), a)
        return !0;
    }
  }
  return a;
};
ae.prototype.forEachLayerAtPixel = function(t, e, i, r, n, a) {
  if (this.getGL().isContextLost())
    return !1;
  var o = e.viewState, s, l = e.layerStatesArray, h = l.length, u;
  for (u = h - 1; u >= 0; --u) {
    var f = l[u], c = f.layer;
    if (ge.visibleAtResolution(f, o.resolution) && n.call(r, c)) {
      var d = (
        /** @type {ol.renderer.webgl.Layer} */
        this.getLayerRenderer(c)
      );
      if (s = d.forEachLayerAtPixel(
        t,
        e,
        i,
        r
      ), s)
        return s;
    }
  }
};
var wn = {};
wn.fragment = new ur(_.DEBUG_WEBGL ? `precision mediump float;
varying vec2 v_texCoord;


uniform sampler2D u_texture;

void main(void) {
  gl_FragColor = texture2D(u_texture, v_texCoord);
}
` : "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}");
wn.vertex = new fr(_.DEBUG_WEBGL ? `varying vec2 v_texCoord;


attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec4 u_tileOffset;

void main(void) {
  gl_Position = vec4(a_position * u_tileOffset.xy + u_tileOffset.zw, 0., 1.);
  v_texCoord = a_texCoord;
}


` : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}");
var No = function(t, e) {
  this.u_tileOffset = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_tileOffset" : "d"
  ), this.u_texture = t.getUniformLocation(
    e,
    _.DEBUG_WEBGL ? "u_texture" : "e"
  ), this.a_position = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_position" : "b"
  ), this.a_texCoord = t.getAttribLocation(
    e,
    _.DEBUG_WEBGL ? "a_texCoord" : "c"
  );
}, Ui = function(t, e) {
  xe.call(this, t, e), this.fragmentShader_ = wn.fragment, this.vertexShader_ = wn.vertex, this.locations_ = null, this.renderArrayBuffer_ = new ze([
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  ]), this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, this.tmpSize_ = [0, 0];
};
_.inherits(Ui, xe);
Ui.handles = function(t, e) {
  return t === ri.WEBGL && e.getType() === Di.TILE;
};
Ui.create = function(t, e) {
  return new Ui(
    /** @type {ol.renderer.webgl.Map} */
    t,
    /** @type {ol.layer.Tile} */
    e
  );
};
Ui.prototype.disposeInternal = function() {
  var t = this.mapRenderer.getContext();
  t.deleteBuffer(this.renderArrayBuffer_), xe.prototype.disposeInternal.call(this);
};
Ui.prototype.createLoadedTileFinder = function(t, e, i) {
  var r = this.mapRenderer;
  return (
    /**
     * @param {number} zoom Zoom level.
     * @param {ol.TileRange} tileRange Tile range.
     * @return {boolean} The tile range is fully loaded.
     */
    function(n, a) {
      function o(s) {
        var l = r.isTileTextureLoaded(s);
        return l && (i[n] || (i[n] = {}), i[n][s.tileCoord.toString()] = s), l;
      }
      return t.forEachLoadedTile(e, n, a, o);
    }
  );
};
Ui.prototype.handleWebGLContextLost = function() {
  xe.prototype.handleWebGLContextLost.call(this), this.locations_ = null;
};
Ui.prototype.prepareFrame = function(t, e, i) {
  var r = this.mapRenderer, n = i.getGL(), a = t.viewState, o = a.projection, s = (
    /** @type {ol.layer.Tile} */
    this.getLayer()
  ), l = s.getSource(), h = l.getTileGridForProjection(o), u = h.getZForResolution(a.resolution), f = h.getResolution(u), c = l.getTilePixelSize(u, t.pixelRatio, o), d = c[0] / ni.toSize(h.getTileSize(u), this.tmpSize_)[0], v = f / d, m = l.getTilePixelRatio(d) * l.getGutter(o), p = a.center, E = t.extent, y = h.getTileRangeForExtentAndZ(E, u), R;
  if (this.renderedTileRange_ && this.renderedTileRange_.equals(y) && this.renderedRevision_ == l.getRevision())
    R = this.renderedFramebufferExtent_;
  else {
    var I = y.getSize(), x = Math.max(
      I[0] * c[0],
      I[1] * c[1]
    ), C = Z.roundUpToPowerOfTwo(x), N = v * C, w = h.getOrigin(u), X = w[0] + y.minX * c[0] * v, U = w[1] + y.minY * c[1] * v;
    R = [
      X,
      U,
      X + N,
      U + N
    ], this.bindFramebuffer(t, C), n.viewport(0, 0, C, C), n.clearColor(0, 0, 0, 0), n.clear(S.COLOR_BUFFER_BIT), n.disable(S.BLEND);
    var P = i.getProgram(this.fragmentShader_, this.vertexShader_);
    i.useProgram(P), this.locations_ || (this.locations_ = new No(n, P)), i.bindBuffer(S.ARRAY_BUFFER, this.renderArrayBuffer_), n.enableVertexAttribArray(this.locations_.a_position), n.vertexAttribPointer(
      this.locations_.a_position,
      2,
      S.FLOAT,
      !1,
      16,
      0
    ), n.enableVertexAttribArray(this.locations_.a_texCoord), n.vertexAttribPointer(
      this.locations_.a_texCoord,
      2,
      S.FLOAT,
      !1,
      16,
      8
    ), n.uniform1i(this.locations_.u_texture, 0);
    var O = {};
    O[u] = {};
    var q = this.createLoadedTileFinder(
      l,
      o,
      O
    ), F = s.getUseInterimTilesOnError(), b = !0, M = g.createEmpty(), W = new Ae(0, 0, 0, 0), B, K, V, $, tt, ft, Et, yt;
    for (ft = y.minX; ft <= y.maxX; ++ft)
      for (Et = y.minY; Et <= y.maxY; ++Et)
        if ($ = l.getTile(u, ft, Et, d, o), !(e.extent !== void 0 && (yt = h.getTileCoordExtent($.tileCoord, M), !g.intersects(yt, e.extent)))) {
          if (tt = $.getState(), K = tt == H.LOADED || tt == H.EMPTY || tt == H.ERROR && !F, K || ($ = $.getInterimTile()), tt = $.getState(), tt == H.LOADED) {
            if (r.isTileTextureLoaded($)) {
              O[u][$.tileCoord.toString()] = $;
              continue;
            }
          } else if (tt == H.EMPTY || tt == H.ERROR && !F)
            continue;
          b = !1, V = h.forEachTileCoordParentTileRange(
            $.tileCoord,
            q,
            null,
            W,
            M
          ), V || (B = h.getTileCoordChildTileRange(
            $.tileCoord,
            W,
            M
          ), B && q(u + 1, B));
        }
    var Ht = Object.keys(O).map(Number);
    Ht.sort(st.numberSafeCompareFunction);
    var Tt = new Float32Array(4), Qt, ye, bt, me;
    for (Qt = 0, ye = Ht.length; Qt < ye; ++Qt) {
      me = O[Ht[Qt]];
      for (bt in me)
        $ = me[bt], yt = h.getTileCoordExtent($.tileCoord, M), Tt[0] = 2 * (yt[2] - yt[0]) / N, Tt[1] = 2 * (yt[3] - yt[1]) / N, Tt[2] = 2 * (yt[0] - R[0]) / N - 1, Tt[3] = 2 * (yt[1] - R[1]) / N - 1, n.uniform4fv(this.locations_.u_tileOffset, Tt), r.bindTileTexture(
          $,
          c,
          m * d,
          S.LINEAR,
          S.LINEAR
        ), n.drawArrays(S.TRIANGLE_STRIP, 0, 4);
    }
    b ? (this.renderedTileRange_ = y, this.renderedFramebufferExtent_ = R, this.renderedRevision_ = l.getRevision()) : (this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, t.animate = !0);
  }
  this.updateUsedTiles(t.usedTiles, l, u, y);
  var be = r.getTileTextureQueue();
  this.manageTilePyramid(
    t,
    l,
    h,
    d,
    o,
    E,
    u,
    s.getPreload(),
    /**
     * @param {ol.Tile} tile Tile.
     */
    function(oi) {
      oi.getState() == H.LOADED && !r.isTileTextureLoaded(oi) && !be.isKeyQueued(oi.getKey()) && be.enqueue([
        oi,
        h.getTileCoordCenter(oi.tileCoord),
        h.getResolution(oi.tileCoord[0]),
        c,
        m * d
      ]);
    },
    this
  ), this.scheduleExpireCache(t, l), this.updateLogos(t, l);
  var Ce = this.texCoordMatrix;
  return A.reset(Ce), A.translate(
    Ce,
    (Math.round(p[0] / f) * f - R[0]) / (R[2] - R[0]),
    (Math.round(p[1] / f) * f - R[1]) / (R[3] - R[1])
  ), a.rotation !== 0 && A.rotate(Ce, a.rotation), A.scale(
    Ce,
    t.size[0] * a.resolution / (R[2] - R[0]),
    t.size[1] * a.resolution / (R[3] - R[1])
  ), A.translate(Ce, -0.5, -0.5), !0;
};
Ui.prototype.forEachLayerAtPixel = function(t, e, i, r) {
  if (this.framebuffer) {
    var n = [
      t[0] / e.size[0],
      (e.size[1] - t[1]) / e.size[1]
    ], a = A.apply(
      this.texCoordMatrix,
      n.slice()
    ), o = [
      a[0] * this.framebufferDimension,
      a[1] * this.framebufferDimension
    ], s = this.mapRenderer.getContext().getGL();
    s.bindFramebuffer(s.FRAMEBUFFER, this.framebuffer);
    var l = new Uint8Array(4);
    if (s.readPixels(
      o[0],
      o[1],
      1,
      1,
      s.RGBA,
      s.UNSIGNED_BYTE,
      l
    ), l[3] > 0)
      return i.call(r, this.getLayer(), l);
  }
};
var hi = function(t, e) {
  xe.call(this, t, e), this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = g.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.layerState_ = null;
};
_.inherits(hi, xe);
hi.handles = function(t, e) {
  return t === ri.WEBGL && e.getType() === Di.VECTOR;
};
hi.create = function(t, e) {
  return new hi(
    /** @type {ol.renderer.webgl.Map} */
    t,
    /** @type {ol.layer.Vector} */
    e
  );
};
hi.prototype.composeFrame = function(t, e, i) {
  this.layerState_ = e;
  var r = t.viewState, n = this.replayGroup_, a = t.size, o = t.pixelRatio, s = this.mapRenderer.getGL();
  n && !n.isEmpty() && (s.enable(s.SCISSOR_TEST), s.scissor(0, 0, a[0] * o, a[1] * o), n.replay(
    i,
    r.center,
    r.resolution,
    r.rotation,
    a,
    o,
    e.opacity,
    e.managed ? t.skippedFeatureUids : {}
  ), s.disable(s.SCISSOR_TEST));
};
hi.prototype.disposeInternal = function() {
  var t = this.replayGroup_;
  if (t) {
    var e = this.mapRenderer.getContext();
    t.getDeleteResourcesFunction(e)(), this.replayGroup_ = null;
  }
  xe.prototype.disposeInternal.call(this);
};
hi.prototype.forEachFeatureAtCoordinate = function(t, e, i, r, n) {
  if (!(!this.replayGroup_ || !this.layerState_)) {
    var a = this.mapRenderer.getContext(), o = e.viewState, s = this.getLayer(), l = this.layerState_, h = {};
    return this.replayGroup_.forEachFeatureAtCoordinate(
      t,
      a,
      o.center,
      o.resolution,
      o.rotation,
      e.size,
      e.pixelRatio,
      l.opacity,
      {},
      /**
       * @param {ol.Feature|ol.render.Feature} feature Feature.
       * @return {?} Callback result.
       */
      function(u) {
        var f = _.getUid(u).toString();
        if (!(f in h))
          return h[f] = !0, r.call(n, u, s);
      }
    );
  }
};
hi.prototype.hasFeatureAtCoordinate = function(t, e) {
  if (!this.replayGroup_ || !this.layerState_)
    return !1;
  var i = this.mapRenderer.getContext(), r = e.viewState, n = this.layerState_;
  return this.replayGroup_.hasFeatureAtCoordinate(
    t,
    i,
    r.center,
    r.resolution,
    r.rotation,
    e.size,
    e.pixelRatio,
    n.opacity,
    e.skippedFeatureUids
  );
};
hi.prototype.forEachLayerAtPixel = function(t, e, i, r) {
  var n = A.apply(
    e.pixelToCoordinateTransform,
    t.slice()
  ), a = this.hasFeatureAtCoordinate(n, e);
  if (a)
    return i.call(r, this.getLayer(), null);
};
hi.prototype.handleStyleImageChange_ = function(t) {
  this.renderIfReadyAndVisible();
};
hi.prototype.prepareFrame = function(t, e, i) {
  var r = (
    /** @type {ol.layer.Vector} */
    this.getLayer()
  ), n = r.getSource();
  this.updateLogos(t, n);
  var a = t.viewHints[Dt.ANIMATING], o = t.viewHints[Dt.INTERACTING], s = r.getUpdateWhileAnimating(), l = r.getUpdateWhileInteracting();
  if (!this.dirty_ && !s && a || !l && o)
    return !0;
  var h = t.extent, u = t.viewState, f = u.projection, c = u.resolution, d = t.pixelRatio, v = r.getRevision(), m = r.getRenderBuffer(), p = r.getRenderOrder();
  p === void 0 && (p = ot.defaultOrder);
  var E = g.buffer(
    h,
    m * c
  );
  if (!this.dirty_ && this.renderedResolution_ == c && this.renderedRevision_ == v && this.renderedRenderOrder_ == p && g.containsExtent(this.renderedExtent_, E))
    return !0;
  this.replayGroup_ && t.postRenderFunctions.push(
    this.replayGroup_.getDeleteResourcesFunction(i)
  ), this.dirty_ = !1;
  var y = new qt(
    ot.getTolerance(c, d),
    E,
    r.getRenderBuffer()
  );
  n.loadFeatures(E, c, f);
  var R = function(x) {
    var C, N = x.getStyleFunction();
    if (N ? C = N.call(x, c) : (N = r.getStyleFunction(), N && (C = N(x, c))), C) {
      var w = this.renderFeature(
        x,
        c,
        d,
        C,
        y
      );
      this.dirty_ = this.dirty_ || w;
    }
  };
  if (p) {
    var I = [];
    n.forEachFeatureInExtent(
      E,
      /**
       * @param {ol.Feature} feature Feature.
       */
      function(x) {
        I.push(x);
      },
      this
    ), I.sort(p), I.forEach(R, this);
  } else
    n.forEachFeatureInExtent(E, R, this);
  return y.finish(i), this.renderedResolution_ = c, this.renderedRevision_ = v, this.renderedRenderOrder_ = p, this.renderedExtent_ = E, this.replayGroup_ = y, !0;
};
hi.prototype.renderFeature = function(t, e, i, r, n) {
  if (!r)
    return !1;
  var a = !1;
  if (Array.isArray(r))
    for (var o = r.length - 1, s = 0; o >= s; --o)
      a = ot.renderFeature(
        n,
        t,
        r[o],
        ot.getSquaredTolerance(e, i),
        this.handleStyleImageChange_,
        this
      ) || a;
  else
    a = ot.renderFeature(
      n,
      t,
      r,
      ot.getSquaredTolerance(e, i),
      this.handleStyleImageChange_,
      this
    ) || a;
  return a;
};
_.ENABLE_CANVAS && (Se.register(Nr.MAP_RENDERER, Gi), Se.registerMultiple(Nr.LAYER_RENDERER, [
  Ri,
  We,
  _i,
  pe
]));
_.ENABLE_WEBGL && (Se.register(Nr.MAP_RENDERER, ae), Se.registerMultiple(Nr.LAYER_RENDERER, [
  vi,
  Ui,
  hi
]));
var La = function(t) {
  t = ut.assign({}, t), t.controls || (t.controls = Ea.defaults()), t.interactions || (t.interactions = Ra.defaults()), z.call(this, t);
};
_.inherits(La, z);
var si = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
  CENTER_LEFT: "center-left",
  CENTER_CENTER: "center-center",
  CENTER_RIGHT: "center-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right"
}, lt = function(t) {
  rt.call(this), this.options = t, this.id = t.id, this.insertFirst = t.insertFirst !== void 0 ? t.insertFirst : !0, this.stopEvent = t.stopEvent !== void 0 ? t.stopEvent : !0, this.element = document.createElement("DIV"), this.element.className = t.className !== void 0 ? t.className : "ol-overlay-container " + _e.CLASS_SELECTABLE, this.element.style.position = "absolute", this.autoPan = t.autoPan !== void 0 ? t.autoPan : !1, this.autoPanAnimation = t.autoPanAnimation || /** @type {olx.OverlayPanOptions} */
  {}, this.autoPanMargin = t.autoPanMargin !== void 0 ? t.autoPanMargin : 20, this.rendered = {
    bottom_: "",
    left_: "",
    right_: "",
    top_: "",
    visible: !0
  }, this.mapPostrenderListenerKey = null, L.listen(
    this,
    rt.getChangeEventType(lt.Property.ELEMENT),
    this.handleElementChanged,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(lt.Property.MAP),
    this.handleMapChanged,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(lt.Property.OFFSET),
    this.handleOffsetChanged,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(lt.Property.POSITION),
    this.handlePositionChanged,
    this
  ), L.listen(
    this,
    rt.getChangeEventType(lt.Property.POSITIONING),
    this.handlePositioningChanged,
    this
  ), t.element !== void 0 && this.setElement(t.element), this.setOffset(t.offset !== void 0 ? t.offset : [0, 0]), this.setPositioning(t.positioning !== void 0 ? (
    /** @type {ol.OverlayPositioning} */
    t.positioning
  ) : si.TOP_LEFT), t.position !== void 0 && this.setPosition(t.position);
};
_.inherits(lt, rt);
lt.prototype.getElement = function() {
  return (
    /** @type {Element|undefined} */
    this.get(lt.Property.ELEMENT)
  );
};
lt.prototype.getId = function() {
  return this.id;
};
lt.prototype.getMap = function() {
  return (
    /** @type {ol.PluggableMap|undefined} */
    this.get(lt.Property.MAP)
  );
};
lt.prototype.getOffset = function() {
  return (
    /** @type {Array.<number>} */
    this.get(lt.Property.OFFSET)
  );
};
lt.prototype.getPosition = function() {
  return (
    /** @type {ol.Coordinate|undefined} */
    this.get(lt.Property.POSITION)
  );
};
lt.prototype.getPositioning = function() {
  return (
    /** @type {ol.OverlayPositioning} */
    this.get(lt.Property.POSITIONING)
  );
};
lt.prototype.handleElementChanged = function() {
  At.removeChildren(this.element);
  var t = this.getElement();
  t && this.element.appendChild(t);
};
lt.prototype.handleMapChanged = function() {
  this.mapPostrenderListenerKey && (At.removeNode(this.element), L.unlistenByKey(this.mapPostrenderListenerKey), this.mapPostrenderListenerKey = null);
  var t = this.getMap();
  if (t) {
    this.mapPostrenderListenerKey = L.listen(
      t,
      Qr.POSTRENDER,
      this.render,
      this
    ), this.updatePixelPosition();
    var e = this.stopEvent ? t.getOverlayContainerStopEvent() : t.getOverlayContainer();
    this.insertFirst ? e.insertBefore(this.element, e.childNodes[0] || null) : e.appendChild(this.element);
  }
};
lt.prototype.render = function() {
  this.updatePixelPosition();
};
lt.prototype.handleOffsetChanged = function() {
  this.updatePixelPosition();
};
lt.prototype.handlePositionChanged = function() {
  this.updatePixelPosition(), this.get(lt.Property.POSITION) && this.autoPan && this.panIntoView();
};
lt.prototype.handlePositioningChanged = function() {
  this.updatePixelPosition();
};
lt.prototype.setElement = function(t) {
  this.set(lt.Property.ELEMENT, t);
};
lt.prototype.setMap = function(t) {
  this.set(lt.Property.MAP, t);
};
lt.prototype.setOffset = function(t) {
  this.set(lt.Property.OFFSET, t);
};
lt.prototype.setPosition = function(t) {
  this.set(lt.Property.POSITION, t);
};
lt.prototype.panIntoView = function() {
  var t = this.getMap();
  if (!(!t || !t.getTargetElement())) {
    var e = this.getRect(t.getTargetElement(), t.getSize()), i = (
      /** @type {!Element} */
      this.getElement()
    ), r = this.getRect(
      i,
      [At.outerWidth(i), At.outerHeight(i)]
    ), n = this.autoPanMargin;
    if (!g.containsExtent(e, r)) {
      var a = r[0] - e[0], o = e[2] - r[2], s = r[1] - e[1], l = e[3] - r[3], h = [0, 0];
      if (a < 0 ? h[0] = a - n : o < 0 && (h[0] = Math.abs(o) + n), s < 0 ? h[1] = s - n : l < 0 && (h[1] = Math.abs(l) + n), h[0] !== 0 || h[1] !== 0) {
        var u = (
          /** @type {ol.Coordinate} */
          t.getView().getCenter()
        ), f = t.getPixelFromCoordinate(u), c = [
          f[0] + h[0],
          f[1] + h[1]
        ];
        t.getView().animate({
          center: t.getCoordinateFromPixel(c),
          duration: this.autoPanAnimation.duration,
          easing: this.autoPanAnimation.easing
        });
      }
    }
  }
};
lt.prototype.getRect = function(t, e) {
  var i = t.getBoundingClientRect(), r = i.left + window.pageXOffset, n = i.top + window.pageYOffset;
  return [
    r,
    n,
    r + e[0],
    n + e[1]
  ];
};
lt.prototype.setPositioning = function(t) {
  this.set(lt.Property.POSITIONING, t);
};
lt.prototype.setVisible = function(t) {
  this.rendered.visible !== t && (this.element.style.display = t ? "" : "none", this.rendered.visible = t);
};
lt.prototype.updatePixelPosition = function() {
  var t = this.getMap(), e = this.getPosition();
  if (!t || !t.isRendered() || !e) {
    this.setVisible(!1);
    return;
  }
  var i = t.getPixelFromCoordinate(e), r = t.getSize();
  this.updateRenderedPosition(i, r);
};
lt.prototype.updateRenderedPosition = function(t, e) {
  var i = this.element.style, r = this.getOffset(), n = this.getPositioning();
  this.setVisible(!0);
  var a = r[0], o = r[1];
  if (n == si.BOTTOM_RIGHT || n == si.CENTER_RIGHT || n == si.TOP_RIGHT) {
    this.rendered.left_ !== "" && (this.rendered.left_ = i.left = "");
    var s = Math.round(e[0] - t[0] - a) + "px";
    this.rendered.right_ != s && (this.rendered.right_ = i.right = s);
  } else {
    this.rendered.right_ !== "" && (this.rendered.right_ = i.right = ""), (n == si.BOTTOM_CENTER || n == si.CENTER_CENTER || n == si.TOP_CENTER) && (a -= this.element.offsetWidth / 2);
    var l = Math.round(t[0] + a) + "px";
    this.rendered.left_ != l && (this.rendered.left_ = i.left = l);
  }
  if (n == si.BOTTOM_LEFT || n == si.BOTTOM_CENTER || n == si.BOTTOM_RIGHT) {
    this.rendered.top_ !== "" && (this.rendered.top_ = i.top = "");
    var h = Math.round(e[1] - t[1] - o) + "px";
    this.rendered.bottom_ != h && (this.rendered.bottom_ = i.bottom = h);
  } else {
    this.rendered.bottom_ !== "" && (this.rendered.bottom_ = i.bottom = ""), (n == si.CENTER_LEFT || n == si.CENTER_CENTER || n == si.CENTER_RIGHT) && (o -= this.element.offsetHeight / 2);
    var u = Math.round(t[1] + o) + "px";
    this.rendered.top_ != u && (this.rendered.top_ = i.top = u);
  }
};
lt.prototype.getOptions = function() {
  return this.options;
};
lt.Property = {
  ELEMENT: "element",
  MAP: "map",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning"
};
var De = function(t, e, i) {
  oe.call(this);
  var r = i || {};
  this.tileCoord = t, this.state = e, this.interimTile = null, this.key = "", this.transition_ = r.transition === void 0 ? 250 : r.transition, this.transitionStarts_ = {};
};
_.inherits(De, oe);
De.prototype.changed = function() {
  this.dispatchEvent(it.CHANGE);
};
De.prototype.getKey = function() {
  return this.key + "/" + this.tileCoord;
};
De.prototype.getInterimTile = function() {
  if (!this.interimTile)
    return this;
  var t = this.interimTile;
  do {
    if (t.getState() == H.LOADED)
      return t;
    t = t.interimTile;
  } while (t);
  return this;
};
De.prototype.refreshInterimChain = function() {
  if (this.interimTile) {
    var t = this.interimTile, e = this;
    do {
      if (t.getState() == H.LOADED) {
        t.interimTile = null;
        break;
      } else t.getState() == H.LOADING ? e = t : t.getState() == H.IDLE ? e.interimTile = t.interimTile : e = t;
      t = e.interimTile;
    } while (t);
  }
};
De.prototype.getTileCoord = function() {
  return this.tileCoord;
};
De.prototype.getState = function() {
  return this.state;
};
De.prototype.setState = function(t) {
  this.state = t, this.changed();
};
De.prototype.load = function() {
};
De.prototype.getAlpha = function(t, e) {
  if (!this.transition_)
    return 1;
  var i = this.transitionStarts_[t];
  if (!i)
    i = e, this.transitionStarts_[t] = i;
  else if (i === -1)
    return 1;
  var r = e - i + 1e3 / 60;
  return r >= this.transition_ ? 1 : ce.easeIn(r / this.transition_);
};
De.prototype.inTransition = function(t) {
  return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
};
De.prototype.endTransition = function(t) {
  this.transition_ && (this.transitionStarts_[t] = -1);
};
var pi = function(t, e, i, r, n, a) {
  De.call(this, t, e, a), this.crossOrigin_ = r, this.src_ = i, this.image_ = new Image(), r !== null && (this.image_.crossOrigin = r), this.imageListenerKeys_ = null, this.tileLoadFunction_ = n;
};
_.inherits(pi, De);
pi.prototype.disposeInternal = function() {
  this.state == H.LOADING && (this.unlistenImage_(), this.image_ = pi.getBlankImage()), this.interimTile && this.interimTile.dispose(), this.state = H.ABORT, this.changed(), De.prototype.disposeInternal.call(this);
};
pi.prototype.getImage = function() {
  return this.image_;
};
pi.prototype.getKey = function() {
  return this.src_;
};
pi.prototype.handleImageError_ = function() {
  this.state = H.ERROR, this.unlistenImage_(), this.image_ = pi.getBlankImage(), this.changed();
};
pi.prototype.handleImageLoad_ = function() {
  this.image_.naturalWidth && this.image_.naturalHeight ? this.state = H.LOADED : this.state = H.EMPTY, this.unlistenImage_(), this.changed();
};
pi.prototype.load = function() {
  this.state == H.ERROR && (this.state = H.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == H.IDLE && (this.state = H.LOADING, this.changed(), this.imageListenerKeys_ = [
    L.listenOnce(
      this.image_,
      it.ERROR,
      this.handleImageError_,
      this
    ),
    L.listenOnce(
      this.image_,
      it.LOAD,
      this.handleImageLoad_,
      this
    )
  ], this.tileLoadFunction_(this, this.src_));
};
pi.prototype.unlistenImage_ = function() {
  this.imageListenerKeys_.forEach(L.unlistenByKey), this.imageListenerKeys_ = null;
};
pi.getBlankImage = function() {
  var t = At.createCanvasContext2D(1, 1);
  return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas;
};
var Oe = {};
Oe.createOrUpdate = function(t, e, i, r) {
  return r !== void 0 ? (r[0] = t, r[1] = e, r[2] = i, r) : [t, e, i];
};
Oe.getKeyZXY = function(t, e, i) {
  return t + "/" + e + "/" + i;
};
Oe.getKey = function(t) {
  return Oe.getKeyZXY(t[0], t[1], t[2]);
};
Oe.fromKey = function(t) {
  return t.split("/").map(Number);
};
Oe.hash = function(t) {
  return (t[1] << t[0]) + t[2];
};
Oe.quadKey = function(t) {
  var e = t[0], i = new Array(e), r = 1 << e - 1, n, a;
  for (n = 0; n < e; ++n)
    a = 48, t[1] & r && (a += 1), t[2] & r && (a += 2), i[n] = String.fromCharCode(a), r >>= 1;
  return i.join("");
};
Oe.withinExtentAndZ = function(t, e) {
  var i = t[0], r = t[1], n = t[2];
  if (e.getMinZoom() > i || i > e.getMaxZoom())
    return !1;
  var a = e.getExtent(), o;
  return a ? o = e.getTileRangeForExtentAndZ(a, i) : o = e.getFullTileRange(i), o ? o.containsXY(r, n) : !0;
};
var rn = function(t) {
  le.call(this, t);
};
_.inherits(rn, le);
rn.prototype.expireCache = function(t) {
  for (var e, i; this.canExpireCache() && (e = this.peekLast(), i = e.tileCoord[0].toString(), !(i in t && t[i].contains(e.tileCoord))); )
    this.pop().dispose();
};
rn.prototype.pruneExceptNewestZ = function() {
  if (this.getCount() !== 0) {
    var t = this.peekFirstKey(), e = Oe.fromKey(t), i = e[0];
    this.forEach(function(r) {
      r.tileCoord[0] !== i && (this.remove(Oe.getKey(r.tileCoord)), r.dispose());
    }, this);
  }
};
var or = {};
or.calculateSourceResolution = function(t, e, i, r) {
  var n = k.transform(i, e, t), a = k.getPointResolution(e, r, i), o = e.getMetersPerUnit();
  o !== void 0 && (a *= o);
  var s = t.getMetersPerUnit();
  s !== void 0 && (a /= s);
  var l = t.getExtent();
  if (!l || g.containsCoordinate(l, n)) {
    var h = k.getPointResolution(t, a, n) / a;
    isFinite(h) && h > 0 && (a /= h);
  }
  return a;
};
or.enlargeClipPoint_ = function(t, e, i, r) {
  var n = i - t, a = r - e, o = Math.sqrt(n * n + a * a);
  return [Math.round(i + n / o), Math.round(r + a / o)];
};
or.render = function(t, e, i, r, n, a, o, s, l, h, u) {
  var f = At.createCanvasContext2D(
    Math.round(i * t),
    Math.round(i * e)
  );
  if (l.length === 0)
    return f.canvas;
  f.scale(i, i);
  var c = g.createEmpty();
  l.forEach(function(y, R, I) {
    g.extend(c, y.extent);
  });
  var d = g.getWidth(c), v = g.getHeight(c), m = At.createCanvasContext2D(
    Math.round(i * d / r),
    Math.round(i * v / r)
  ), p = i / r;
  l.forEach(function(y, R, I) {
    var x = y.extent[0] - c[0], C = -(y.extent[3] - c[3]), N = g.getWidth(y.extent), w = g.getHeight(y.extent);
    m.drawImage(
      y.image,
      h,
      h,
      y.image.width - 2 * h,
      y.image.height - 2 * h,
      x * p,
      C * p,
      N * p,
      w * p
    );
  });
  var E = g.getTopLeft(o);
  return s.getTriangles().forEach(function(y, R, I) {
    var x = y.source, C = y.target, N = x[0][0], w = x[0][1], X = x[1][0], U = x[1][1], P = x[2][0], O = x[2][1], q = (C[0][0] - E[0]) / a, F = -(C[0][1] - E[1]) / a, b = (C[1][0] - E[0]) / a, M = -(C[1][1] - E[1]) / a, W = (C[2][0] - E[0]) / a, B = -(C[2][1] - E[1]) / a, K = N, V = w;
    N = 0, w = 0, X -= K, U -= V, P -= K, O -= V;
    var $ = [
      [X, U, 0, 0, b - q],
      [P, O, 0, 0, W - q],
      [0, 0, X, U, M - F],
      [0, 0, P, O, B - F]
    ], tt = Z.solveLinearSystem($);
    if (tt) {
      f.save(), f.beginPath();
      var ft = (q + b + W) / 3, Et = (F + M + B) / 3, yt = or.enlargeClipPoint_(ft, Et, q, F), Ht = or.enlargeClipPoint_(ft, Et, b, M), Tt = or.enlargeClipPoint_(ft, Et, W, B);
      f.moveTo(Ht[0], Ht[1]), f.lineTo(yt[0], yt[1]), f.lineTo(Tt[0], Tt[1]), f.clip(), f.transform(
        tt[0],
        tt[2],
        tt[1],
        tt[3],
        q,
        F
      ), f.translate(
        c[0] - K,
        c[3] - V
      ), f.scale(
        r / i,
        -r / i
      ), f.drawImage(m.canvas, 0, 0), f.restore();
    }
  }), u && (f.save(), f.strokeStyle = "black", f.lineWidth = 1, s.getTriangles().forEach(function(y, R, I) {
    var x = y.target, C = (x[0][0] - E[0]) / a, N = -(x[0][1] - E[1]) / a, w = (x[1][0] - E[0]) / a, X = -(x[1][1] - E[1]) / a, U = (x[2][0] - E[0]) / a, P = -(x[2][1] - E[1]) / a;
    f.beginPath(), f.moveTo(w, X), f.lineTo(C, N), f.lineTo(U, P), f.closePath(), f.stroke();
  }), f.restore()), f.canvas;
};
var nn = function(t, e, i, r, n) {
  this.sourceProj_ = t, this.targetProj_ = e;
  var a = {}, o = k.getTransform(this.targetProj_, this.sourceProj_);
  this.transformInv_ = function(p) {
    var E = p[0] + "/" + p[1];
    return a[E] || (a[E] = o(p)), a[E];
  }, this.maxSourceExtent_ = r, this.errorThresholdSquared_ = n * n, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!r && !!this.sourceProj_.getExtent() && g.getWidth(r) == g.getWidth(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? g.getWidth(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? g.getWidth(this.targetProj_.getExtent()) : null;
  var s = g.getTopLeft(i), l = g.getTopRight(i), h = g.getBottomRight(i), u = g.getBottomLeft(i), f = this.transformInv_(s), c = this.transformInv_(l), d = this.transformInv_(h), v = this.transformInv_(u);
  if (this.addQuad_(
    s,
    l,
    h,
    u,
    f,
    c,
    d,
    v,
    _.RASTER_REPROJECTION_MAX_SUBDIVISION
  ), this.wrapsXInSource_) {
    var m = 1 / 0;
    this.triangles_.forEach(function(p, E, y) {
      m = Math.min(
        m,
        p.source[0][0],
        p.source[1][0],
        p.source[2][0]
      );
    }), this.triangles_.forEach(function(p) {
      if (Math.max(
        p.source[0][0],
        p.source[1][0],
        p.source[2][0]
      ) - m > this.sourceWorldWidth_ / 2) {
        var E = [
          [p.source[0][0], p.source[0][1]],
          [p.source[1][0], p.source[1][1]],
          [p.source[2][0], p.source[2][1]]
        ];
        E[0][0] - m > this.sourceWorldWidth_ / 2 && (E[0][0] -= this.sourceWorldWidth_), E[1][0] - m > this.sourceWorldWidth_ / 2 && (E[1][0] -= this.sourceWorldWidth_), E[2][0] - m > this.sourceWorldWidth_ / 2 && (E[2][0] -= this.sourceWorldWidth_);
        var y = Math.min(
          E[0][0],
          E[1][0],
          E[2][0]
        ), R = Math.max(
          E[0][0],
          E[1][0],
          E[2][0]
        );
        R - y < this.sourceWorldWidth_ / 2 && (p.source = E);
      }
    }, this);
  }
  a = {};
};
nn.prototype.addTriangle_ = function(t, e, i, r, n, a) {
  this.triangles_.push({
    source: [r, n, a],
    target: [t, e, i]
  });
};
nn.prototype.addQuad_ = function(t, e, i, r, n, a, o, s, l) {
  var h = g.boundingExtent([n, a, o, s]), u = this.sourceWorldWidth_ ? g.getWidth(h) / this.sourceWorldWidth_ : null, f = (
    /** @type {number} */
    this.sourceWorldWidth_
  ), c = this.sourceProj_.canWrapX() && u > 0.5 && u < 1, d = !1;
  if (l > 0) {
    if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
      var v = g.boundingExtent([t, e, i, r]), m = g.getWidth(v) / this.targetWorldWidth_;
      d |= m > _.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH;
    }
    !c && this.sourceProj_.isGlobal() && u && (d |= u > _.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH);
  }
  if (!(!d && this.maxSourceExtent_ && !g.intersects(h, this.maxSourceExtent_))) {
    if (!d && (!isFinite(n[0]) || !isFinite(n[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(s[0]) || !isFinite(s[1])))
      if (l > 0)
        d = !0;
      else
        return;
    if (l > 0) {
      if (!d) {
        var p = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], E = this.transformInv_(p), y;
        if (c) {
          var R = (Z.modulo(n[0], f) + Z.modulo(o[0], f)) / 2;
          y = R - Z.modulo(E[0], f);
        } else
          y = (n[0] + o[0]) / 2 - E[0];
        var I = (n[1] + o[1]) / 2 - E[1], x = y * y + I * I;
        d = x > this.errorThresholdSquared_;
      }
      if (d) {
        if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
          var C = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2], N = this.transformInv_(C), w = [(r[0] + t[0]) / 2, (r[1] + t[1]) / 2], X = this.transformInv_(w);
          this.addQuad_(
            t,
            e,
            C,
            w,
            n,
            a,
            N,
            X,
            l - 1
          ), this.addQuad_(
            w,
            C,
            i,
            r,
            X,
            N,
            o,
            s,
            l - 1
          );
        } else {
          var U = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], P = this.transformInv_(U), O = [(i[0] + r[0]) / 2, (i[1] + r[1]) / 2], q = this.transformInv_(O);
          this.addQuad_(
            t,
            U,
            O,
            r,
            n,
            P,
            q,
            s,
            l - 1
          ), this.addQuad_(
            U,
            e,
            i,
            O,
            P,
            a,
            o,
            q,
            l - 1
          );
        }
        return;
      }
    }
    if (c) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    this.addTriangle_(t, i, r, n, o, s), this.addTriangle_(t, e, i, n, a, o);
  }
};
nn.prototype.calculateSourceExtent = function() {
  var t = g.createEmpty();
  return this.triangles_.forEach(function(e, i, r) {
    var n = e.source;
    g.extendCoordinate(t, n[0]), g.extendCoordinate(t, n[1]), g.extendCoordinate(t, n[2]);
  }), t;
};
nn.prototype.getTriangles = function() {
  return this.triangles_;
};
var Ar = function(t, e, i, r, n, a, o, s, l, h, u) {
  De.call(this, n, H.IDLE), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = o, this.gutter_ = s, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = r, this.wrappedTileCoord_ = a || n, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
  var f = r.getTileCoordExtent(this.wrappedTileCoord_), c = this.targetTileGrid_.getExtent(), d = this.sourceTileGrid_.getExtent(), v = c ? g.getIntersection(f, c) : f;
  if (g.getArea(v) === 0) {
    this.state = H.EMPTY;
    return;
  }
  var m = t.getExtent();
  m && (d ? d = g.getIntersection(
    d,
    m
  ) : d = m);
  var p = r.getResolution(
    this.wrappedTileCoord_[0]
  ), E = g.getCenter(v), y = or.calculateSourceResolution(
    t,
    i,
    E,
    p
  );
  if (!isFinite(y) || y <= 0) {
    this.state = H.EMPTY;
    return;
  }
  var R = h !== void 0 ? h : _.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD;
  if (this.triangulation_ = new nn(
    t,
    i,
    v,
    d,
    y * R
  ), this.triangulation_.getTriangles().length === 0) {
    this.state = H.EMPTY;
    return;
  }
  this.sourceZ_ = e.getZForResolution(y);
  var I = this.triangulation_.calculateSourceExtent();
  if (d && (t.canWrapX() ? (I[1] = Z.clamp(
    I[1],
    d[1],
    d[3]
  ), I[3] = Z.clamp(
    I[3],
    d[1],
    d[3]
  )) : I = g.getIntersection(I, d)), !g.getArea(I))
    this.state = H.EMPTY;
  else {
    for (var x = e.getTileRangeForExtentAndZ(
      I,
      this.sourceZ_
    ), C = x.minX; C <= x.maxX; C++)
      for (var N = x.minY; N <= x.maxY; N++) {
        var w = l(this.sourceZ_, C, N, o);
        w && this.sourceTiles_.push(w);
      }
    this.sourceTiles_.length === 0 && (this.state = H.EMPTY);
  }
};
_.inherits(Ar, De);
Ar.prototype.disposeInternal = function() {
  this.state == H.LOADING && this.unlistenSources_(), De.prototype.disposeInternal.call(this);
};
Ar.prototype.getImage = function() {
  return this.canvas_;
};
Ar.prototype.reproject_ = function() {
  var t = [];
  if (this.sourceTiles_.forEach(function(l, h, u) {
    l && l.getState() == H.LOADED && t.push({
      extent: this.sourceTileGrid_.getTileCoordExtent(l.tileCoord),
      image: l.getImage()
    });
  }, this), this.sourceTiles_.length = 0, t.length === 0)
    this.state = H.ERROR;
  else {
    var e = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(e), r = typeof i == "number" ? i : i[0], n = typeof i == "number" ? i : i[1], a = this.targetTileGrid_.getResolution(e), o = this.sourceTileGrid_.getResolution(this.sourceZ_), s = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    );
    this.canvas_ = or.render(
      r,
      n,
      this.pixelRatio_,
      o,
      this.sourceTileGrid_.getExtent(),
      a,
      s,
      this.triangulation_,
      t,
      this.gutter_,
      this.renderEdges_
    ), this.state = H.LOADED;
  }
  this.changed();
};
Ar.prototype.load = function() {
  if (this.state == H.IDLE) {
    this.state = H.LOADING, this.changed();
    var t = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(function(e, i, r) {
      var n = e.getState();
      if (n == H.IDLE || n == H.LOADING) {
        t++;
        var a;
        a = L.listen(
          e,
          it.CHANGE,
          function(o) {
            var s = e.getState();
            (s == H.LOADED || s == H.ERROR || s == H.EMPTY) && (L.unlistenByKey(a), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
          },
          this
        ), this.sourcesListenerKeys_.push(a);
      }
    }, this), this.sourceTiles_.forEach(function(e, i, r) {
      var n = e.getState();
      n == H.IDLE && e.load();
    }), t === 0 && setTimeout(this.reproject_.bind(this), 0);
  }
};
Ar.prototype.unlistenSources_ = function() {
  this.sourcesListenerKeys_.forEach(L.unlistenByKey), this.sourcesListenerKeys_ = null;
};
var xi = {};
xi.createFromTemplate = function(t, e) {
  var i = /\{z\}/g, r = /\{x\}/g, n = /\{y\}/g, a = /\{-y\}/g;
  return (
    /**
     * @param {ol.TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {ol.proj.Projection} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(o, s, l) {
      if (o)
        return t.replace(i, o[0].toString()).replace(r, o[1].toString()).replace(n, function() {
          var h = -o[2] - 1;
          return h.toString();
        }).replace(a, function() {
          var h = o[0], u = e.getFullTileRange(h);
          Pt.assert(u, 55);
          var f = u.getHeight() + o[2];
          return f.toString();
        });
    }
  );
};
xi.createFromTemplates = function(t, e) {
  for (var i = t.length, r = new Array(i), n = 0; n < i; ++n)
    r[n] = xi.createFromTemplate(
      t[n],
      e
    );
  return xi.createFromTileUrlFunctions(r);
};
xi.createFromTileUrlFunctions = function(t) {
  return t.length === 1 ? t[0] : (
    /**
     * @param {ol.TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {ol.proj.Projection} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(e, i, r) {
      if (e) {
        var n = Oe.hash(e), a = Z.modulo(n, t.length);
        return t[a](e, i, r);
      } else
        return;
    }
  );
};
xi.nullTileUrlFunction = function(t, e, i) {
};
xi.expandUrl = function(t) {
  var e = [], i = /\{([a-z])-([a-z])\}/.exec(t);
  if (i) {
    var r = i[1].charCodeAt(0), n = i[2].charCodeAt(0), a;
    for (a = r; a <= n; ++a)
      e.push(t.replace(i[0], String.fromCharCode(a)));
    return e;
  }
  if (i = i = /\{(\d+)-(\d+)\}/.exec(t), i) {
    for (var o = parseInt(i[2], 10), s = parseInt(i[1], 10); s <= o; s++)
      e.push(t.replace(i[0], s.toString()));
    return e;
  }
  return e.push(t), e;
};
var Yt = function(t) {
  this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0, this.resolutions_ = t.resolutions, Pt.assert(st.isSorted(this.resolutions_, function(a, o) {
    return o - a;
  }, !0), 17);
  var e;
  if (!t.origins) {
    for (var i = 0, r = this.resolutions_.length - 1; i < r; ++i)
      if (!e)
        e = this.resolutions_[i] / this.resolutions_[i + 1];
      else if (this.resolutions_[i] / this.resolutions_[i + 1] !== e) {
        e = void 0;
        break;
      }
  }
  this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = t.origin !== void 0 ? t.origin : null, this.origins_ = null, t.origins !== void 0 && (this.origins_ = t.origins, Pt.assert(
    this.origins_.length == this.resolutions_.length,
    20
  ));
  var n = t.extent;
  n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = g.getTopLeft(n)), Pt.assert(
    !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
    18
  ), this.tileSizes_ = null, t.tileSizes !== void 0 && (this.tileSizes_ = t.tileSizes, Pt.assert(
    this.tileSizes_.length == this.resolutions_.length,
    19
  )), this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : _.DEFAULT_TILE_SIZE, Pt.assert(
    !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
    22
  ), this.extent_ = n !== void 0 ? n : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], t.sizes !== void 0 ? this.fullTileRanges_ = t.sizes.map(function(a, o) {
    var s = new Ae(
      Math.min(0, a[0]),
      Math.max(a[0] - 1, -1),
      Math.min(0, a[1]),
      Math.max(a[1] - 1, -1)
    );
    return s;
  }, this) : n && this.calculateTileRanges_(n);
};
Yt.tmpTileCoord_ = [0, 0, 0];
Yt.prototype.forEachTileCoord = function(t, e, i) {
  for (var r = this.getTileRangeForExtentAndZ(t, e), n = r.minX, a = r.maxX; n <= a; ++n)
    for (var o = r.minY, s = r.maxY; o <= s; ++o)
      i([e, n, o]);
};
Yt.prototype.forEachTileCoordParentTileRange = function(t, e, i, r, n) {
  var a, o, s, l = null, h = t[0] - 1;
  for (this.zoomFactor_ === 2 ? (o = t[1], s = t[2]) : l = this.getTileCoordExtent(t, n); h >= this.minZoom; ) {
    if (this.zoomFactor_ === 2 ? (o = Math.floor(o / 2), s = Math.floor(s / 2), a = Ae.createOrUpdate(o, o, s, s, r)) : a = this.getTileRangeForExtentAndZ(l, h, r), e.call(i, h, a))
      return !0;
    --h;
  }
  return !1;
};
Yt.prototype.getExtent = function() {
  return this.extent_;
};
Yt.prototype.getMaxZoom = function() {
  return this.maxZoom;
};
Yt.prototype.getMinZoom = function() {
  return this.minZoom;
};
Yt.prototype.getOrigin = function(t) {
  return this.origin_ ? this.origin_ : this.origins_[t];
};
Yt.prototype.getResolution = function(t) {
  return this.resolutions_[t];
};
Yt.prototype.getResolutions = function() {
  return this.resolutions_;
};
Yt.prototype.getTileCoordChildTileRange = function(t, e, i) {
  if (t[0] < this.maxZoom) {
    if (this.zoomFactor_ === 2) {
      var r = t[1] * 2, n = t[2] * 2;
      return Ae.createOrUpdate(r, r + 1, n, n + 1, e);
    }
    var a = this.getTileCoordExtent(t, i);
    return this.getTileRangeForExtentAndZ(
      a,
      t[0] + 1,
      e
    );
  }
  return null;
};
Yt.prototype.getTileRangeExtent = function(t, e, i) {
  var r = this.getOrigin(t), n = this.getResolution(t), a = ni.toSize(this.getTileSize(t), this.tmpSize_), o = r[0] + e.minX * a[0] * n, s = r[0] + (e.maxX + 1) * a[0] * n, l = r[1] + e.minY * a[1] * n, h = r[1] + (e.maxY + 1) * a[1] * n;
  return g.createOrUpdate(o, l, s, h, i);
};
Yt.prototype.getTileRangeForExtentAndZ = function(t, e, i) {
  var r = Yt.tmpTileCoord_;
  this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, r);
  var n = r[1], a = r[2];
  return this.getTileCoordForXYAndZ_(t[2], t[3], e, !0, r), Ae.createOrUpdate(
    n,
    r[1],
    a,
    r[2],
    i
  );
};
Yt.prototype.getTileCoordCenter = function(t) {
  var e = this.getOrigin(t[0]), i = this.getResolution(t[0]), r = ni.toSize(this.getTileSize(t[0]), this.tmpSize_);
  return [
    e[0] + (t[1] + 0.5) * r[0] * i,
    e[1] + (t[2] + 0.5) * r[1] * i
  ];
};
Yt.prototype.getTileCoordExtent = function(t, e) {
  var i = this.getOrigin(t[0]), r = this.getResolution(t[0]), n = ni.toSize(this.getTileSize(t[0]), this.tmpSize_), a = i[0] + t[1] * n[0] * r, o = i[1] + t[2] * n[1] * r, s = a + n[0] * r, l = o + n[1] * r;
  return g.createOrUpdate(a, o, s, l, e);
};
Yt.prototype.getTileCoordForCoordAndResolution = function(t, e, i) {
  return this.getTileCoordForXYAndResolution_(
    t[0],
    t[1],
    e,
    !1,
    i
  );
};
Yt.prototype.getTileCoordForXYAndResolution_ = function(t, e, i, r, n) {
  var a = this.getZForResolution(i), o = i / this.getResolution(a), s = this.getOrigin(a), l = ni.toSize(this.getTileSize(a), this.tmpSize_), h = r ? 0.5 : 0, u = r ? 0 : 0.5, f = Math.floor((t - s[0]) / i + h), c = Math.floor((e - s[1]) / i + u), d = o * f / l[0], v = o * c / l[1];
  return r ? (d = Math.ceil(d) - 1, v = Math.ceil(v) - 1) : (d = Math.floor(d), v = Math.floor(v)), Oe.createOrUpdate(a, d, v, n);
};
Yt.prototype.getTileCoordForXYAndZ_ = function(t, e, i, r, n) {
  var a = this.getOrigin(i), o = this.getResolution(i), s = ni.toSize(this.getTileSize(i), this.tmpSize_), l = r ? 0.5 : 0, h = r ? 0 : 0.5, u = Math.floor((t - a[0]) / o + l), f = Math.floor((e - a[1]) / o + h), c = u / s[0], d = f / s[1];
  return r ? (c = Math.ceil(c) - 1, d = Math.ceil(d) - 1) : (c = Math.floor(c), d = Math.floor(d)), Oe.createOrUpdate(i, c, d, n);
};
Yt.prototype.getTileCoordForCoordAndZ = function(t, e, i) {
  return this.getTileCoordForXYAndZ_(
    t[0],
    t[1],
    e,
    !1,
    i
  );
};
Yt.prototype.getTileCoordResolution = function(t) {
  return this.resolutions_[t[0]];
};
Yt.prototype.getTileSize = function(t) {
  return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
};
Yt.prototype.getFullTileRange = function(t) {
  return this.fullTileRanges_ ? this.fullTileRanges_[t] : null;
};
Yt.prototype.getZForResolution = function(t, e) {
  var i = st.linearFindNearest(
    this.resolutions_,
    t,
    e || 0
  );
  return Z.clamp(i, this.minZoom, this.maxZoom);
};
Yt.prototype.calculateTileRanges_ = function(t) {
  for (var e = this.resolutions_.length, i = new Array(e), r = this.minZoom; r < e; ++r)
    i[r] = this.getTileRangeForExtentAndZ(t, r);
  this.fullTileRanges_ = i;
};
var Ee = {};
Ee.getForProjection = function(t) {
  var e = t.getDefaultTileGrid();
  return e || (e = Ee.createForProjection(t), t.setDefaultTileGrid(e)), e;
};
Ee.wrapX = function(t, e, i) {
  var r = e[0], n = t.getTileCoordCenter(e), a = Ee.extentFromProjection(i);
  if (g.containsCoordinate(a, n))
    return e;
  var o = g.getWidth(a), s = Math.ceil((a[0] - n[0]) / o);
  return n[0] += o * s, t.getTileCoordForCoordAndZ(n, r);
};
Ee.createForExtent = function(t, e, i, r) {
  var n = r !== void 0 ? r : Jr.TOP_LEFT, a = Ee.resolutionsFromExtent(
    t,
    e,
    i
  );
  return new Yt({
    extent: t,
    origin: g.getCorner(t, n),
    resolutions: a,
    tileSize: i
  });
};
Ee.createXYZ = function(t) {
  var e = (
    /** @type {olx.tilegrid.TileGridOptions} */
    {}
  );
  return ut.assign(e, t !== void 0 ? t : (
    /** @type {olx.tilegrid.XYZOptions} */
    {}
  )), e.extent === void 0 && (e.extent = k.get("EPSG:3857").getExtent()), e.resolutions = Ee.resolutionsFromExtent(
    e.extent,
    e.maxZoom,
    e.tileSize
  ), delete e.maxZoom, new Yt(e);
};
Ee.resolutionsFromExtent = function(t, e, i) {
  for (var r = e !== void 0 ? e : _.DEFAULT_MAX_ZOOM, n = g.getHeight(t), a = g.getWidth(t), o = ni.toSize(i !== void 0 ? i : _.DEFAULT_TILE_SIZE), s = Math.max(
    a / o[0],
    n / o[1]
  ), l = r + 1, h = new Array(l), u = 0; u < l; ++u)
    h[u] = s / Math.pow(2, u);
  return h;
};
Ee.createForProjection = function(t, e, i, r) {
  var n = Ee.extentFromProjection(t);
  return Ee.createForExtent(
    n,
    e,
    i,
    r
  );
};
Ee.extentFromProjection = function(t) {
  t = k.get(t);
  var e = t.getExtent();
  if (!e) {
    var i = 180 * k.METERS_PER_UNIT[de.DEGREES] / t.getMetersPerUnit();
    e = g.createOrUpdate(-i, -i, i, i);
  }
  return e;
};
var Dr = function(t) {
  this.html_ = t.html, this.tileRanges_ = t.tileRanges ? t.tileRanges : null;
};
Dr.prototype.getHTML = function() {
  return this.html_;
};
Dr.prototype.intersectsAnyTileRange = function(t, e, i) {
  if (!this.tileRanges_)
    return !0;
  var r, n, a, o;
  for (o in t)
    if (o in this.tileRanges_) {
      a = t[o];
      var s;
      for (r = 0, n = this.tileRanges_[o].length; r < n; ++r) {
        if (s = this.tileRanges_[o][r], s.intersects(a))
          return !0;
        var l = e.getTileRangeForExtentAndZ(
          Ee.extentFromProjection(i),
          parseInt(o, 10)
        ), h = l.getWidth();
        if ((a.minX < l.minX || a.maxX > l.maxX) && (s.intersects(new Ae(
          Z.modulo(a.minX, h),
          Z.modulo(a.maxX, h),
          a.minY,
          a.maxY
        )) || a.getWidth() > h && s.intersects(l)))
          return !0;
      }
    }
  return !1;
};
var qe = function(t) {
  rt.call(this), this.projection_ = k.get(t.projection), this.attributions_ = null, this.attributions2_ = this.adaptAttributions_(t.attributions), this.logo_ = t.logo, this.state_ = t.state !== void 0 ? t.state : Ur.READY, this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1;
};
_.inherits(qe, rt);
qe.prototype.adaptAttributions_ = function(t) {
  if (!t)
    return null;
  if (t instanceof Dr)
    return this.attributions_ = [t], function(i) {
      return [t.getHTML()];
    };
  if (Array.isArray(t)) {
    if (t[0] instanceof Dr) {
      this.attributions_ = t;
      var e = t.map(function(i) {
        return i.getHTML();
      });
      return function(i) {
        return e;
      };
    }
    return this.attributions_ = t.map(function(i) {
      return new Dr({ html: i });
    }), function(i) {
      return t;
    };
  }
  return typeof t == "function" ? t : (this.attributions_ = [
    new Dr({ html: t })
  ], function(i) {
    return [t];
  });
};
qe.prototype.forEachFeatureAtCoordinate = _.nullFunction;
qe.prototype.getAttributions = function() {
  return this.attributions_;
};
qe.prototype.getAttributions2 = function() {
  return this.attributions2_;
};
qe.prototype.getLogo = function() {
  return this.logo_;
};
qe.prototype.getProjection = function() {
  return this.projection_;
};
qe.prototype.getResolutions = function() {
};
qe.prototype.getState = function() {
  return this.state_;
};
qe.prototype.getWrapX = function() {
  return this.wrapX_;
};
qe.prototype.refresh = function() {
  this.changed();
};
qe.prototype.setAttributions = function(t) {
  this.attributions2_ = this.adaptAttributions_(t), this.changed();
};
qe.prototype.setLogo = function(t) {
  this.logo_ = t;
};
qe.prototype.setState = function(t) {
  this.state_ = t, this.changed();
};
var $t = function(t) {
  qe.call(this, {
    attributions: t.attributions,
    extent: t.extent,
    logo: t.logo,
    projection: t.projection,
    state: t.state,
    wrapX: t.wrapX
  }), this.opaque_ = t.opaque !== void 0 ? t.opaque : !1, this.tilePixelRatio_ = t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1, this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null, this.tileCache = new rn(t.cacheSize), this.tmpSize = [0, 0], this.key_ = "", this.tileOptions = { transition: t.transition };
};
_.inherits($t, qe);
$t.prototype.canExpireCache = function() {
  return this.tileCache.canExpireCache();
};
$t.prototype.expireCache = function(t, e) {
  var i = this.getTileCacheForProjection(t);
  i && i.expireCache(e);
};
$t.prototype.forEachLoadedTile = function(t, e, i, r) {
  var n = this.getTileCacheForProjection(t);
  if (!n)
    return !1;
  for (var a = !0, o, s, l, h = i.minX; h <= i.maxX; ++h)
    for (var u = i.minY; u <= i.maxY; ++u)
      s = Oe.getKeyZXY(e, h, u), l = !1, n.containsKey(s) && (o = /** @type {!ol.Tile} */
      n.get(s), l = o.getState() === H.LOADED, l && (l = r(o) !== !1)), l || (a = !1);
  return a;
};
$t.prototype.getGutter = function(t) {
  return 0;
};
$t.prototype.getKey = function() {
  return this.key_;
};
$t.prototype.setKey = function(t) {
  this.key_ !== t && (this.key_ = t, this.changed());
};
$t.prototype.getOpaque = function(t) {
  return this.opaque_;
};
$t.prototype.getResolutions = function() {
  return this.tileGrid.getResolutions();
};
$t.prototype.getTile = function(t, e, i, r, n) {
};
$t.prototype.getTileGrid = function() {
  return this.tileGrid;
};
$t.prototype.getTileGridForProjection = function(t) {
  return this.tileGrid ? this.tileGrid : Ee.getForProjection(t);
};
$t.prototype.getTileCacheForProjection = function(t) {
  var e = this.getProjection();
  return e && !k.equivalent(e, t) ? null : this.tileCache;
};
$t.prototype.getTilePixelRatio = function(t) {
  return this.tilePixelRatio_;
};
$t.prototype.getTilePixelSize = function(t, e, i) {
  var r = this.getTileGridForProjection(i), n = this.getTilePixelRatio(e), a = ni.toSize(r.getTileSize(t), this.tmpSize);
  return n == 1 ? a : ni.scale(a, n, this.tmpSize);
};
$t.prototype.getTileCoordForTileUrlFunction = function(t, e) {
  var i = e !== void 0 ? e : this.getProjection(), r = this.getTileGridForProjection(i);
  return this.getWrapX() && i.isGlobal() && (t = Ee.wrapX(r, t, i)), Oe.withinExtentAndZ(t, r) ? t : null;
};
$t.prototype.refresh = function() {
  this.tileCache.clear(), this.changed();
};
$t.prototype.useTile = _.nullFunction;
$t.Event = function(t, e) {
  ve.call(this, t), this.tile = e;
};
_.inherits($t.Event, ve);
var Vn = {
  /**
   * Triggered when a tile starts loading.
   * @event ol.source.Tile.Event#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event ol.source.Tile.Event#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error.
   * @event ol.source.Tile.Event#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
}, Fe = function(t) {
  $t.call(this, {
    attributions: t.attributions,
    cacheSize: t.cacheSize,
    extent: t.extent,
    logo: t.logo,
    opaque: t.opaque,
    projection: t.projection,
    state: t.state,
    tileGrid: t.tileGrid,
    tilePixelRatio: t.tilePixelRatio,
    wrapX: t.wrapX,
    transition: t.transition
  }), this.tileLoadFunction = t.tileLoadFunction, this.tileUrlFunction = this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : xi.nullTileUrlFunction, this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), t.tileUrlFunction && this.setTileUrlFunction(t.tileUrlFunction), this.tileLoadingKeys_ = {};
};
_.inherits(Fe, $t);
Fe.prototype.fixedTileUrlFunction;
Fe.prototype.getTileLoadFunction = function() {
  return this.tileLoadFunction;
};
Fe.prototype.getTileUrlFunction = function() {
  return this.tileUrlFunction;
};
Fe.prototype.getUrls = function() {
  return this.urls;
};
Fe.prototype.handleTileChange = function(t) {
  var e = (
    /** @type {ol.Tile} */
    t.target
  ), i = _.getUid(e), r = e.getState(), n;
  r == H.LOADING ? (this.tileLoadingKeys_[i] = !0, n = Vn.TILELOADSTART) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], n = r == H.ERROR ? Vn.TILELOADERROR : r == H.LOADED || r == H.ABORT ? Vn.TILELOADEND : void 0), n != null && this.dispatchEvent(new $t.Event(n, e));
};
Fe.prototype.setTileLoadFunction = function(t) {
  this.tileCache.clear(), this.tileLoadFunction = t, this.changed();
};
Fe.prototype.setTileUrlFunction = function(t, e) {
  this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), typeof e < "u" ? this.setKey(e) : this.changed();
};
Fe.prototype.setUrl = function(t) {
  var e = this.urls = xi.expandUrl(t);
  this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : xi.createFromTemplates(e, this.tileGrid), t);
};
Fe.prototype.setUrls = function(t) {
  this.urls = t;
  var e = t.join(`
`);
  this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : xi.createFromTemplates(t, this.tileGrid), e);
};
Fe.prototype.useTile = function(t, e, i) {
  var r = Oe.getKeyZXY(t, e, i);
  this.tileCache.containsKey(r) && this.tileCache.get(r);
};
var ke = function(t) {
  Fe.call(this, {
    attributions: t.attributions,
    cacheSize: t.cacheSize,
    extent: t.extent,
    logo: t.logo,
    opaque: t.opaque,
    projection: t.projection,
    state: t.state,
    tileGrid: t.tileGrid,
    tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : ke.defaultTileLoadFunction,
    tilePixelRatio: t.tilePixelRatio,
    tileUrlFunction: t.tileUrlFunction,
    url: t.url,
    urls: t.urls,
    wrapX: t.wrapX,
    transition: t.transition
  }), this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null, this.tileClass = t.tileClass !== void 0 ? t.tileClass : pi, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
};
_.inherits(ke, Fe);
ke.prototype.canExpireCache = function() {
  if (!_.ENABLE_RASTER_REPROJECTION)
    return Fe.prototype.canExpireCache.call(this);
  if (this.tileCache.canExpireCache())
    return !0;
  for (var t in this.tileCacheForProjection)
    if (this.tileCacheForProjection[t].canExpireCache())
      return !0;
  return !1;
};
ke.prototype.expireCache = function(t, e) {
  if (!_.ENABLE_RASTER_REPROJECTION) {
    Fe.prototype.expireCache.call(this, t, e);
    return;
  }
  var i = this.getTileCacheForProjection(t);
  this.tileCache.expireCache(this.tileCache == i ? e : {});
  for (var r in this.tileCacheForProjection) {
    var n = this.tileCacheForProjection[r];
    n.expireCache(n == i ? e : {});
  }
};
ke.prototype.getGutter = function(t) {
  return _.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !k.equivalent(this.getProjection(), t) ? 0 : this.getGutterInternal();
};
ke.prototype.getGutterInternal = function() {
  return 0;
};
ke.prototype.getOpaque = function(t) {
  return _.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !k.equivalent(this.getProjection(), t) ? !1 : Fe.prototype.getOpaque.call(this, t);
};
ke.prototype.getTileGridForProjection = function(t) {
  if (!_.ENABLE_RASTER_REPROJECTION)
    return Fe.prototype.getTileGridForProjection.call(this, t);
  var e = this.getProjection();
  if (this.tileGrid && (!e || k.equivalent(e, t)))
    return this.tileGrid;
  var i = _.getUid(t).toString();
  return i in this.tileGridForProjection || (this.tileGridForProjection[i] = Ee.getForProjection(t)), /** @type {!ol.tilegrid.TileGrid} */
  this.tileGridForProjection[i];
};
ke.prototype.getTileCacheForProjection = function(t) {
  if (!_.ENABLE_RASTER_REPROJECTION)
    return Fe.prototype.getTileCacheForProjection.call(this, t);
  var e = this.getProjection();
  if (!e || k.equivalent(e, t))
    return this.tileCache;
  var i = _.getUid(t).toString();
  return i in this.tileCacheForProjection || (this.tileCacheForProjection[i] = new rn(this.tileCache.highWaterMark)), this.tileCacheForProjection[i];
};
ke.prototype.createTile_ = function(t, e, i, r, n, a) {
  var o = [t, e, i], s = this.getTileCoordForTileUrlFunction(
    o,
    n
  ), l = s ? this.tileUrlFunction(s, r, n) : void 0, h = new this.tileClass(
    o,
    l !== void 0 ? H.IDLE : H.EMPTY,
    l !== void 0 ? l : "",
    this.crossOrigin,
    this.tileLoadFunction,
    this.tileOptions
  );
  return h.key = a, L.listen(
    h,
    it.CHANGE,
    this.handleTileChange,
    this
  ), h;
};
ke.prototype.getTile = function(t, e, i, r, n) {
  var a = (
    /** @type {!ol.proj.Projection} */
    this.getProjection()
  );
  if (!_.ENABLE_RASTER_REPROJECTION || !a || !n || k.equivalent(a, n))
    return this.getTileInternal(t, e, i, r, a || n);
  var o = this.getTileCacheForProjection(n), s = [t, e, i], l, h = Oe.getKey(s);
  o.containsKey(h) && (l = /** @type {!ol.Tile} */
  o.get(h));
  var u = this.getKey();
  if (l && l.key == u)
    return l;
  var f = this.getTileGridForProjection(a), c = this.getTileGridForProjection(n), d = this.getTileCoordForTileUrlFunction(s, n), v = new Ar(
    a,
    f,
    n,
    c,
    s,
    d,
    this.getTilePixelRatio(r),
    this.getGutterInternal(),
    (function(m, p, E, y) {
      return this.getTileInternal(m, p, E, y, a);
    }).bind(this),
    this.reprojectionErrorThreshold_,
    this.renderReprojectionEdges_
  );
  return v.key = u, l ? (v.interimTile = l, v.refreshInterimChain(), o.replace(h, v)) : o.set(h, v), v;
};
ke.prototype.getTileInternal = function(t, e, i, r, n) {
  var a = null, o = Oe.getKeyZXY(t, e, i), s = this.getKey();
  if (!this.tileCache.containsKey(o))
    a = this.createTile_(t, e, i, r, n, s), this.tileCache.set(o, a);
  else if (a = this.tileCache.get(o), a.key != s) {
    var l = a;
    a = this.createTile_(t, e, i, r, n, s), l.getState() == H.IDLE ? a.interimTile = l.interimTile : a.interimTile = l, a.refreshInterimChain(), this.tileCache.replace(o, a);
  }
  return a;
};
ke.prototype.setRenderReprojectionEdges = function(t) {
  if (!(!_.ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == t)) {
    this.renderReprojectionEdges_ = t;
    for (var e in this.tileCacheForProjection)
      this.tileCacheForProjection[e].clear();
    this.changed();
  }
};
ke.prototype.setTileGridForProjection = function(t, e) {
  if (_.ENABLE_RASTER_REPROJECTION) {
    var i = k.get(t);
    if (i) {
      var r = _.getUid(i).toString();
      r in this.tileGridForProjection || (this.tileGridForProjection[r] = e);
    }
  }
};
ke.defaultTileLoadFunction = function(t, e) {
  t.getImage().src = e;
};
var qn = function(t) {
  var e = t || {}, i = e.projection !== void 0 ? e.projection : "EPSG:3857", r = e.tileGrid !== void 0 ? e.tileGrid : Ee.createXYZ({
    extent: Ee.extentFromProjection(i),
    maxZoom: e.maxZoom,
    minZoom: e.minZoom,
    tileSize: e.tileSize
  });
  ke.call(this, {
    attributions: e.attributions,
    cacheSize: e.cacheSize,
    crossOrigin: e.crossOrigin,
    logo: e.logo,
    opaque: e.opaque,
    projection: i,
    reprojectionErrorThreshold: e.reprojectionErrorThreshold,
    tileGrid: r,
    tileLoadFunction: e.tileLoadFunction,
    tilePixelRatio: e.tilePixelRatio,
    tileUrlFunction: e.tileUrlFunction,
    url: e.url,
    urls: e.urls,
    wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
    transition: e.transition
  });
};
_.inherits(qn, ke);
var Nn = function(t) {
  var e = t || {}, i;
  e.attributions !== void 0 ? i = e.attributions : i = [Nn.ATTRIBUTION];
  var r = e.crossOrigin !== void 0 ? e.crossOrigin : "anonymous", n = e.url !== void 0 ? e.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  qn.call(this, {
    attributions: i,
    cacheSize: e.cacheSize,
    crossOrigin: r,
    opaque: e.opaque !== void 0 ? e.opaque : !0,
    maxZoom: e.maxZoom !== void 0 ? e.maxZoom : 19,
    reprojectionErrorThreshold: e.reprojectionErrorThreshold,
    tileLoadFunction: e.tileLoadFunction,
    url: n,
    wrapX: e.wrapX
  });
};
_.inherits(Nn, qn);
Nn.ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.';
function Vo({ className: t }) {
  const e = Kn();
  return Fr(() => {
    const i = new Cr({
      preload: 1 / 0,
      source: new Nn()
    }), r = new La({
      target: e.current,
      layers: [i],
      view: new Q({
        center: [0, 0],
        zoom: 0
      })
    });
    return () => r.setTarget(null);
  }, []), /* @__PURE__ */ vt.jsx("div", { id: "map", className: `map-container w-full ${t}`, ref: e });
}
const Go = new On({
  headers: {
    accept: "application/json;version=2"
  }
}), Uo = new zn(Go);
function Ho({
  tsids: t,
  office: e,
  begin: i,
  end: r,
  title: n,
  fontSize: a,
  unit: o = "EN",
  className: s = "",
  plotHeight: l = 550,
  autoSize: h = !0,
  shapes: u = [],
  annotations: f = [],
  responsive: c = !0
}) {
  const d = Kn(null);
  mr(null);
  const [v, m] = mr(null), [p, E] = mr(null), [y, R] = mr(a);
  Fr(() => {
    if (n || m((Array.isArray(t) ? t[0] : t).split(".")[0]), !t.length) throw Error("You must specify one or more Timeseries IDs to plot.");
    if (!e) throw Error("You must specify a 3 letter ID for the office");
    typeof t == "string" && (t = [t]), E(t);
  }, [n, t, e]);
  const I = async () => {
    let w = p.map(async (P) => {
      var O;
      try {
        return await Uo.getCwmsDataTimeseries({ name: P, end: r, unit: o, begin: i, office: e });
      } catch (q) {
        if (((O = q.response) == null ? void 0 : O.status) === 404)
          return console.warn(`Data for ${P} not found: 404`), null;
        throw q;
      }
    }), X = await Promise.all(w), U = { ts: {}, dates: [] };
    return X.forEach((P) => {
      P && P.units ? (U.ts[P.units] || (U.ts[P.units] = []), U.ts[P.units].push(P)) : console.warn(P === null ? "Skipping as no data was found." : `No unit found for ${P == null ? void 0 : P.name}`);
    }), U;
  }, { data: x, error: C, isLoading: N } = ca({
    queryKey: ["timeseries", p, i, r, o, e],
    queryFn: I,
    enabled: !!d.current
    // Only run the query when plotElement is available
  });
  return console.log(C), Fr(() => {
    if (!d.current || !x)
      return;
    let w = Object.keys(x.ts), X = w.length, U = {
      autosize: h,
      shapes: u,
      annotations: f,
      title: {
        text: `${v}<br>Units: ${w.join(", ")}`,
        font: {
          family: "DejaVuSansMono, monospace"
        }
      },
      grid: {
        rows: X,
        columns: 1,
        pattern: "independent"
      }
    }, P = [], O = 1, q = 0, F = 1 / w.length, b = F;
    y ? U.font = { size: y } : w.length > 4 && (U.font = { size: 8 });
    let M;
    for (let W = 0; W < w.length; W++) {
      const B = w[W];
      for (let V = 0; V < x.ts[B].length; V++) {
        M = x.ts[B][V];
        const $ = {
          x: M.values.map((tt) => new Date(tt[0])),
          y: M.values.map((tt) => tt[1]),
          yaxis: "y" + O,
          type: "scatter",
          mode: "lines",
          showlegend: !0,
          legend: { x: 1, xanchor: "right", y: 1 },
          name: `${M.name.split(".")[1]}<br>${M.name.split(".")[5]}`
        };
        P.push($);
      }
      let K = `${M.name.split(".")[1]}<br>(${B})`;
      w.length > 3 && (K = B), U["yaxis" + O] = {
        domain: [
          Math.round(q * 100) / 100,
          Math.round(b * 100) / 100
        ],
        title: { text: K }
      }, w.length > 4 && (U["yaxis" + O].nticks = 1, U["yaxis" + O].tickvals = [
        M.values[M.values.length / 2]
      ], U["yaxis" + O].dtick = 1, U["yaxis" + O].tick0 = 0.5), q += F, b += F, O++;
    }
    fa.newPlot(d.current, P, U, { responsive: c });
  }, [x, n]), /* @__PURE__ */ vt.jsx("div", { className: `h-full w-full ${s}`, style: { height: l }, children: /* @__PURE__ */ vt.jsx("div", { ref: d, id: "plot", className: "h-full w-full", style: { height: l }, children: N ? /* @__PURE__ */ vt.jsx("div", { children: "Loading..." }) : C ? /* @__PURE__ */ vt.jsxs("div", { children: [
    "Error: ",
    C.message
  ] }) : /* @__PURE__ */ vt.jsx(vt.Fragment, {}) }) });
}
export {
  Ho as CWMSPlot,
  Vo as GageMap,
  Xo as TSPlot,
  Yo as TSTable
};
