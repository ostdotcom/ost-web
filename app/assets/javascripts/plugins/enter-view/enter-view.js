"use strict";
! function(e) {
  "function" == typeof define && define.amd ? define(e) : "undefined" != typeof module && module.exports ? module.exports = e() : window.enterView = e.call(this)
}(function() {
  var e = function(e) {
    function n() {
      g = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        return setTimeout(e, 1e3 / 60)
      }
    }

    function t() {
      if (h && "number" == typeof h) {
        var e = Math.min(Math.max(0, h), 1);
        return q - e * q
      }
      return q
    }

    function i() {
      var e = document.documentElement.clientHeight,
        n = window.innerHeight || 0;
      q = Math.max(e, n)
    }

    function o() {
      y = !1;
      var e = t();
      A = A.filter(function(n) {
        var t = n.getBoundingClientRect(),
          i = t.top,
          o = i < e;
        if (o && !n.__enter_view) {
          if (m(n), _) return !1
        } else !o && n.__enter_view && w && w(n);
        return n.__enter_view = o, !0
      }), A.length || window.removeEventListener("scroll", r, !0)
    }

    function r() {
      y || (y = !0, g(o))
    }

    function u() {
      i(), o()
    }

    function f(e) {
      for (var n = e.length, t = [], i = 0; i < n; i += 1) t.push(e[i]);
      return t
    }

    function c(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
      return "string" == typeof e ? f(n.querySelectorAll(e)) : e instanceof NodeList ? f(e) : e instanceof Array ? e : void 0
    }

    function d() {
      A = c(l)
    }

    function a() {
      window.addEventListener("resize", u, !0), window.addEventListener("scroll", r, !0), u()
    }

    function s() {
      var e = l && m;
      e || console.error("must set selector and enter options"), n(), d(), a(), o()
    }
    var l = e.selector,
      m = e.enter,
      w = e.exit,
      v = e.offset,
      h = void 0 === v ? 0 : v,
      p = e.once,
      _ = void 0 !== p && p,
      g = null,
      y = !1,
      A = [],
      q = 0;
    s()
  };
  return e
});