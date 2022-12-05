var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, r, p) {
    if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[r] = p.value)
};
$jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.arrayIterator = function (e) {
    var r = 0;
    return $jscomp.iteratorPrototype(function () {
        return r < e.length ? {
            done: !1,
            value: e[r++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (e) {
    $jscomp.initSymbolIterator();
    e = {
        next: e
    };
    e[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return e
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (e, r) {
    $jscomp.initSymbolIterator();
    e instanceof String && (e += "");
    var p = 0,
        m = {
            next: function () {
                if (p < e.length) {
                    var u = p++;
                    return {
                        value: r(u, e[u]),
                        done: !1
                    }
                }
                m.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return m.next()
            }
        };
    m[Symbol.iterator] = function () {
        return m
    };
    return m
};
$jscomp.polyfill = function (e, r, p, m) {
    if (r) {
        p = $jscomp.global;
        e = e.split(".");
        for (m = 0; m < e.length - 1; m++) {
            var u = e[m];
            u in p || (p[u] = {});
            p = p[u]
        }
        e = e[e.length - 1];
        m = p[e];
        r = r(m);
        r != m && null != r && $jscomp.defineProperty(p, e, {
            configurable: !0,
            writable: !0,
            value: r
        })
    }
};
$jscomp.polyfill("Array.prototype.keys", function (e) {
    return e ? e : function () {
        return $jscomp.iteratorFromArray(this, function (e) {
            return e
        })
    }
}, "es6-impl", "es3");
var $jscomp$this = this;
(function (e, r) {
    "function" === typeof define && define.amd ? define([], r) : "object" === typeof module && module.exports ? module.exports = r() : e.anime = r()
})(this, function () {
    function e(a) {
        if (!h.col(a)) try {
            return document.querySelectorAll(a)
        } catch (c) {}
    }

    function r(a, c) {
        for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++)
            if (n in a) {
                var k = a[n];
                c.call(b, k, n, a) && f.push(k)
            } return f
    }

    function p(a) {
        return a.reduce(function (a, d) {
            return a.concat(h.arr(d) ? p(d) : d)
        }, [])
    }

    function m(a) {
        if (h.arr(a)) return a;
        h.str(a) && (a = e(a) || a);
        return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a]
    }

    function u(a, c) {
        return a.some(function (a) {
            return a === c
        })
    }

    function C(a) {
        var c = {},
            d;
        for (d in a) c[d] = a[d];
        return c
    }

    function D(a, c) {
        var d = C(a),
            b;
        for (b in a) d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
        return d
    }

    function z(a, c) {
        var d = C(a),
            b;
        for (b in c) d[b] = h.und(a[b]) ? c[b] : a[b];
        return d
    }

    function T(a) {
        a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, k) {
            return c + c + d + d + k + k
        });
        var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        a = parseInt(c[1], 16);
        var d = parseInt(c[2], 16),
            c = parseInt(c[3], 16);
        return "rgba(" + a + "," + d + "," + c + ",1)"
    }

    function U(a) {
        function c(a, c, b) {
            0 > b && (b += 1);
            1 < b && --b;
            return b < 1 / 6 ? a + 6 * (c - a) * b : .5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a
        }
        var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);
        a = parseInt(d[1]) / 360;
        var b = parseInt(d[2]) / 100,
            f = parseInt(d[3]) / 100,
            d = d[4] || 1;
        if (0 == b) f = b = a = f;
        else {
            var n = .5 > f ? f * (1 + b) : f + b - f * b,
                k = 2 * f - n,
                f = c(k, n, a + 1 / 3),
                b = c(k, n, a);
            a = c(k, n, a - 1 / 3)
        }
        return "rgba(" +
            255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")"
    }

    function y(a) {
        if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a)) return a[2]
    }

    function V(a) {
        if (-1 < a.indexOf("translate") || "perspective" === a) return "px";
        if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg"
    }

    function I(a, c) {
        return h.fnc(a) ? a(c.target, c.id, c.total) : a
    }

    function E(a, c) {
        if (c in a.style) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
    }

    function J(a, c) {
        if (h.dom(a) && u(W, c)) return "transform";
        if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";
        if (h.dom(a) && "transform" !== c && E(a, c)) return "css";
        if (null != a[c]) return "object"
    }

    function X(a, c) {
        var d = V(c),
            d = -1 < c.indexOf("scale") ? 1 : 0 + d;
        a = a.style.transform;
        if (!a) return d;
        for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a);) f.push(b[1]), n.push(b[2]);
        a = r(n, function (a, b) {
            return f[b] === c
        });
        return a.length ? a[0] : d
    }

    function K(a, c) {
        switch (J(a, c)) {
            case "transform":
                return X(a, c);
            case "css":
                return E(a, c);
            case "attribute":
                return a.getAttribute(c)
        }
        return a[c] || 0
    }

    function L(a, c) {
        var d = /^(\*=|\+=|-=)/.exec(a);
        if (!d) return a;
        var b = y(a) || 0;
        c = parseFloat(c);
        a = parseFloat(a.replace(d[0], ""));
        switch (d[0][0]) {
            case "+":
                return c + a + b;
            case "-":
                return c - a + b;
            case "*":
                return c * a + b
        }
    }

    function F(a, c) {
        return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2))
    }

    function M(a) {
        a = a.points;
        for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
            var f = a.getItem(b);
            0 < b && (c += F(d, f));
            d = f
        }
        return c
    }

    function N(a) {
        if (a.getTotalLength) return a.getTotalLength();
        switch (a.tagName.toLowerCase()) {
            case "circle":
                return 2 * Math.PI * a.getAttribute("r");
            case "rect":
                return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
            case "line":
                return F({
                    x: a.getAttribute("x1"),
                    y: a.getAttribute("y1")
                }, {
                    x: a.getAttribute("x2"),
                    y: a.getAttribute("y2")
                });
            case "polyline":
                return M(a);
            case "polygon":
                var c = a.points;
                return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0))
        }
    }

    function Y(a, c) {
        function d(b) {
            b = void 0 === b ? 0 : b;
            return a.el.getPointAtLength(1 <= c + b ? c + b : 0)
        }
        var b = d(),
            f = d(-1),
            n = d(1);
        switch (a.property) {
            case "x":
                return b.x;
            case "y":
                return b.y;
            case "angle":
                return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI
        }
    }

    function O(a, c) {
        var d = /-?\d*\.?\d+/g,
            b;
        b = h.pth(a) ? a.totalLength : a;
        if (h.col(b))
            if (h.rgb(b)) {
                var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);
                b = f ? "rgba(" + f[1] + ",1)" : b
            } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
        else f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !/\s/g.test(b) ? f + c : f;
        b += "";
        return {
            original: b,
            numbers: b.match(d) ? b.match(d).map(Number) : [0],
            strings: h.str(a) || c ? b.split(d) : []
        }
    }

    function P(a) {
        a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
        return r(a, function (a, d, b) {
            return b.indexOf(a) === d
        })
    }

    function Z(a) {
        var c = P(a);
        return c.map(function (a, b) {
            return {
                target: a,
                id: b,
                total: c.length
            }
        })
    }

    function aa(a, c) {
        var d = C(c);
        if (h.arr(a)) {
            var b = a.length;
            2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = {
                value: a
            }
        }
        return m(a).map(function (a, b) {
            b = b ? 0 : c.delay;
            a = h.obj(a) && !h.pth(a) ? a : {
                value: a
            };
            h.und(a.delay) && (a.delay = b);
            return a
        }).map(function (a) {
            return z(a, d)
        })
    }

    function ba(a, c) {
        var d = {},
            b;
        for (b in a) {
            var f = I(a[b], c);
            h.arr(f) && (f = f.map(function (a) {
                return I(a, c)
            }), 1 === f.length && (f = f[0]));
            d[b] = f
        }
        d.duration = parseFloat(d.duration);
        d.delay = parseFloat(d.delay);
        return d
    }

    function ca(a) {
        return h.arr(a) ? A.apply(this, a) : Q[a]
    }

    function da(a, c) {
        var d;
        return a.tweens.map(function (b) {
            b = ba(b, c);
            var f = b.value,
                e = K(c.target, a.name),
                k = d ? d.to.original : e,
                k = h.arr(f) ? f[0] : k,
                w = L(h.arr(f) ? f[1] : f, k),
                e = y(w) || y(k) || y(e);
            b.from = O(k, e);
            b.to = O(w, e);
            b.start = d ? d.end : a.offset;
            b.end = b.start + b.delay + b.duration;
            b.easing = ca(b.easing);
            b.elasticity = (1E3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1E3;
            b.isPath = h.pth(f);
            b.isColor = h.col(b.from.original);
            b.isColor && (b.round = 1);
            return d = b
        })
    }

    function ea(a, c) {
        return r(p(a.map(function (a) {
            return c.map(function (b) {
                var c = J(a.target, b.name);
                if (c) {
                    var d = da(b, a);
                    b = {
                        type: c,
                        property: b.name,
                        animatable: a,
                        tweens: d,
                        duration: d[d.length - 1].end,
                        delay: d[0].delay
                    }
                } else b = void 0;
                return b
            })
        })), function (a) {
            return !h.und(a)
        })
    }

    function R(a, c, d, b) {
        var f = "delay" === a;
        return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function (b) {
                return b[a]
            })) : f ? b.delay : d.offset + b.delay +
            b.duration
    }

    function fa(a) {
        var c = D(ga, a),
            d = D(S, a),
            b = Z(a.targets),
            f = [],
            e = z(c, d),
            k;
        for (k in a) e.hasOwnProperty(k) || "targets" === k || f.push({
            name: k,
            offset: e.offset,
            tweens: aa(a[k], d)
        });
        a = ea(b, f);
        return z(c, {
            children: [],
            animatables: b,
            animations: a,
            duration: R("duration", a, c, d),
            delay: R("delay", a, c, d)
        })
    }

    function q(a) {
        function c() {
            return window.Promise && new Promise(function (a) {
                return p = a
            })
        }

        function d(a) {
            return g.reversed ? g.duration - a : a
        }

        function b(a) {
            for (var b = 0, c = {}, d = g.animations, f = d.length; b < f;) {
                var e = d[b],
                    k = e.animatable,
                    h = e.tweens,
                    n = h.length - 1,
                    l = h[n];
                n && (l = r(h, function (b) {
                    return a < b.end
                })[0] || l);
                for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
                    var x = void 0,
                        x = l.to.numbers[t],
                        q = l.from.numbers[t],
                        x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);
                    p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));
                    n.push(x)
                }
                if (l = h.length)
                    for (m = h[0], w = 0; w < l; w++) p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " "));
                else m = n[0];
                ha[e.type](k.target, e.property, m, c, k.id);
                e.currentValue = m;
                b++
            }
            if (b = Object.keys(c).length)
                for (d = 0; d < b; d++) H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" ");
            g.currentTime = a;
            g.progress = a / g.duration * 100
        }

        function f(a) {
            if (g[a]) g[a](g)
        }

        function e() {
            g.remaining && !0 !== g.remaining && g.remaining--
        }

        function k(a) {
            var k = g.duration,
                n = g.offset,
                w = n + g.delay,
                r = g.currentTime,
                x = g.reversed,
                q = d(a);
            if (g.children.length) {
                var u = g.children,
                    v = u.length;
                if (q >= g.currentTime)
                    for (var G = 0; G < v; G++) u[G].seek(q);
                else
                    for (; v--;) u[v].seek(q)
            }
            if (q >= w || !k) g.began || (g.began = !0, f("begin")), f("run");
            if (q > n && q < k) b(q);
            else if (q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k) b(k), x || e();
            f("update");
            a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), "Promise" in window && (p(), m = c()))), l = 0)
        }
        a = void 0 === a ? {} : a;
        var h, t, l = 0,
            p = null,
            m = c(),
            g = fa(a);
        g.reset = function () {
            var a = g.direction,
                c = g.loop;
            g.currentTime = 0;
            g.progress = 0;
            g.paused = !0;
            g.began = !1;
            g.completed = !1;
            g.reversed = "reverse" === a;
            g.remaining = "alternate" === a && 1 === c ? 2 : c;
            b(0);
            for (a = g.children.length; a--;) g.children[a].reset()
        };
        g.tick = function (a) {
            h = a;
            t || (t = h);
            k((l + h - t) * q.speed)
        };
        g.seek = function (a) {
            k(d(a))
        };
        g.pause = function () {
            var a = v.indexOf(g); - 1 < a && v.splice(a, 1);
            g.paused = !0
        };
        g.play = function () {
            g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia())
        };
        g.reverse = function () {
            g.reversed = !g.reversed;
            t = 0;
            l = d(g.currentTime)
        };
        g.restart = function () {
            g.pause();
            g.reset();
            g.play()
        };
        g.finished = m;
        g.reset();
        g.autoplay && g.play();
        return g
    }
    var ga = {
            update: void 0,
            begin: void 0,
            run: void 0,
            complete: void 0,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            offset: 0
        },
        S = {
            duration: 1E3,
            delay: 0,
            easing: "easeOutElastic",
            elasticity: 500,
            round: 0
        },
        W = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
        H, h = {
            arr: function (a) {
                return Array.isArray(a)
            },
            obj: function (a) {
                return -1 < Object.prototype.toString.call(a).indexOf("Object")
            },
            pth: function (a) {
                return h.obj(a) && a.hasOwnProperty("totalLength")
            },
            svg: function (a) {
                return a instanceof SVGElement
            },
            dom: function (a) {
                return a.nodeType || h.svg(a)
            },
            str: function (a) {
                return "string" === typeof a
            },
            fnc: function (a) {
                return "function" === typeof a
            },
            und: function (a) {
                return "undefined" === typeof a
            },
            hex: function (a) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
            },
            rgb: function (a) {
                return /^rgb/.test(a)
            },
            hsl: function (a) {
                return /^hsl/.test(a)
            },
            col: function (a) {
                return h.hex(a) || h.rgb(a) || h.hsl(a)
            }
        },
        A = function () {
            function a(a, d, b) {
                return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a
            }
            return function (c, d, b, f) {
                if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
                    var e = new Float32Array(11);
                    if (c !== d || b !== f)
                        for (var k = 0; 11 > k; ++k) e[k] = a(.1 * k, c, b);
                    return function (k) {
                        if (c === d && b === f) return k;
                        if (0 === k) return 0;
                        if (1 === k) return 1;
                        for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) h += .1;
                        --l;
                        var l = h + (k - e[l]) / (e[l + 1] - e[l]) * .1,
                            n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
                        if (.001 <= n) {
                            for (h = 0; 4 > h; ++h) {
                                n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
                                if (0 === n) break;
                                var m = a(l, c, b) - k,
                                    l = l - m / n
                            }
                            k = l
                        } else if (0 === n) k = l;
                        else {
                            var l = h,
                                h = h + .1,
                                g = 0;
                            do m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m; while (1e-7 < Math.abs(n) && 10 > ++g);
                            k = m
                        }
                        return a(k, d, f)
                    }
                }
            }
        }(),
        Q = function () {
            function a(a, b) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b)
            }
            var c = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
                d = {
                    In: [
                        [.55, .085, .68, .53],
                        [.55, .055, .675, .19],
                        [.895, .03, .685, .22],
                        [.755, .05, .855, .06],
                        [.47, 0, .745, .715],
                        [.95, .05, .795, .035],
                        [.6, .04, .98, .335],
                        [.6, -.28, .735, .045], a
                    ],
                    Out: [
                        [.25, .46, .45, .94],
                        [.215, .61, .355, 1],
                        [.165, .84, .44, 1],
                        [.23, 1, .32, 1],
                        [.39, .575, .565, 1],
                        [.19, 1, .22, 1],
                        [.075, .82, .165, 1],
                        [.175, .885, .32, 1.275],
                        function (b, c) {
                            return 1 - a(1 - b, c)
                        }
                    ],
                    InOut: [
                        [.455, .03, .515, .955],
                        [.645, .045, .355, 1],
                        [.77, 0, .175, 1],
                        [.86, 0, .07, 1],
                        [.445, .05, .55, .95],
                        [1, 0, 0, 1],
                        [.785, .135, .15, .86],
                        [.68, -.55, .265, 1.55],
                        function (b, c) {
                            return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2
                        }
                    ]
                },
                b = {
                    linear: A(.25, .25, .75, .75)
                },
                f = {},
                e;
            for (e in d) f.type = e, d[f.type].forEach(function (a) {
                return function (d, f) {
                    b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply($jscomp$this, d)
                }
            }(f)), f = {
                type: f.type
            };
            return b
        }(),
        ha = {
            css: function (a, c, d) {
                return a.style[c] = d
            },
            attribute: function (a, c, d) {
                return a.setAttribute(c, d)
            },
            object: function (a, c, d) {
                return a[c] = d
            },
            transform: function (a, c, d, b, f) {
                b[f] || (b[f] = []);
                b[f].push(c + "(" + d + ")")
            }
        },
        v = [],
        B = 0,
        ia = function () {
            function a() {
                B = requestAnimationFrame(c)
            }

            function c(c) {
                var b = v.length;
                if (b) {
                    for (var d = 0; d < b;) v[d] && v[d].tick(c), d++;
                    a()
                } else cancelAnimationFrame(B), B = 0
            }
            return a
        }();
    q.version = "2.2.0";
    q.speed = 1;
    q.running = v;
    q.remove = function (a) {
        a = P(a);
        for (var c = v.length; c--;)
            for (var d = v[c], b = d.animations, f = b.length; f--;) u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause())
    };
    q.getValue = K;
    q.path = function (a, c) {
        var d = h.str(a) ? e(a)[0] : a,
            b = c || 100;
        return function (a) {
            return {
                el: d,
                property: a,
                totalLength: N(d) * (b / 100)
            }
        }
    };
    q.setDashoffset = function (a) {
        var c = N(a);
        a.setAttribute("stroke-dasharray", c);
        return c
    };
    q.bezier = A;
    q.easings = Q;
    q.timeline = function (a) {
        var c = q(a);
        c.pause();
        c.duration = 0;
        c.add = function (d) {
            c.children.forEach(function (a) {
                a.began = !0;
                a.completed = !0
            });
            m(d).forEach(function (b) {
                var d = z(b, D(S, a || {}));
                d.targets = d.targets || a.targets;
                b = c.duration;
                var e = d.offset;
                d.autoplay = !1;
                d.direction = c.direction;
                d.offset = h.und(e) ? b : L(e, b);
                c.began = !0;
                c.completed = !0;
                c.seek(d.offset);
                d = q(d);
                d.began = !0;
                d.completed = !0;
                d.duration > b && (c.duration = d.duration);
                c.children.push(d)
            });
            c.seek(0);
            c.reset();
            c.autoplay && c.restart();
            return c
        };
        return c
    };
    q.random = function (a, c) {
        return Math.floor(Math.random() * (c - a + 1)) + a
    };
    return q
});
! function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).LazyLoad = n()
}(this, (function () {
    "use strict";

    function t() {
        return (t = Object.assign || function (t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        }).apply(this, arguments)
    }
    var n = "undefined" != typeof window,
        e = n && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        i = n && "IntersectionObserver" in window,
        a = n && "classList" in document.createElement("p"),
        o = n && window.devicePixelRatio > 1,
        r = {
            elements_selector: "IMG",
            container: e || n ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            data_bg_hidpi: "bg-hidpi",
            data_bg_multi: "bg-multi",
            data_bg_multi_hidpi: "bg-multi-hidpi",
            data_poster: "poster",
            class_applied: "applied",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            unobserve_completed: !0,
            unobserve_entered: !1,
            cancel_on_exit: !1,
            callback_enter: null,
            callback_exit: null,
            callback_applied: null,
            callback_loading: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            callback_cancel: null,
            use_native: !1
        },
        c = function (n) {
            return t({}, r, n)
        },
        l = function (t, n) {
            var e, i = new t(n);
            try {
                e = new CustomEvent("LazyLoad::Initialized", {
                    detail: {
                        instance: i
                    }
                })
            } catch (t) {
                (e = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, {
                    instance: i
                })
            }
            window.dispatchEvent(e)
        },
        s = function (t, n) {
            return t.getAttribute("data-" + n)
        },
        u = function (t, n, e) {
            var i = "data-" + n;
            null !== e ? t.setAttribute(i, e) : t.removeAttribute(i)
        },
        d = function (t) {
            return s(t, "ll-status")
        },
        f = function (t, n) {
            return u(t, "ll-status", n)
        },
        _ = function (t) {
            return f(t, null)
        },
        g = function (t) {
            return null === d(t)
        },
        v = function (t) {
            return "native" === d(t)
        },
        b = function (t, n, e, i) {
            t && (void 0 === i ? void 0 === e ? t(n) : t(n, e) : t(n, e, i))
        },
        p = function (t, n) {
            a ? t.classList.add(n) : t.className += (t.className ? " " : "") + n
        },
        h = function (t, n) {
            a ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
        },
        m = function (t) {
            return t.llTempImage
        },
        E = function (t, n) {
            if (n) {
                var e = n._observer;
                e && e.unobserve(t)
            }
        },
        I = function (t, n) {
            t && (t.loadingCount += n)
        },
        A = function (t, n) {
            t && (t.toLoadCount = n)
        },
        L = function (t) {
            for (var n, e = [], i = 0; n = t.children[i]; i += 1) "SOURCE" === n.tagName && e.push(n);
            return e
        },
        y = function (t, n, e) {
            e && t.setAttribute(n, e)
        },
        w = function (t, n) {
            t.removeAttribute(n)
        },
        k = function (t) {
            return !!t.llOriginalAttrs
        },
        z = function (t) {
            if (!k(t)) {
                var n = {};
                n.src = t.getAttribute("src"), n.srcset = t.getAttribute("srcset"), n.sizes = t.getAttribute("sizes"), t.llOriginalAttrs = n
            }
        },
        O = function (t) {
            if (k(t)) {
                var n = t.llOriginalAttrs;
                y(t, "src", n.src), y(t, "srcset", n.srcset), y(t, "sizes", n.sizes)
            }
        },
        C = function (t, n) {
            y(t, "sizes", s(t, n.data_sizes)), y(t, "srcset", s(t, n.data_srcset)), y(t, "src", s(t, n.data_src))
        },
        M = function (t) {
            w(t, "src"), w(t, "srcset"), w(t, "sizes")
        },
        N = function (t, n) {
            var e = t.parentNode;
            e && "PICTURE" === e.tagName && L(e).forEach(n)
        },
        x = function (t, n) {
            L(t).forEach(n)
        },
        R = {
            IMG: function (t, n) {
                N(t, (function (t) {
                    z(t), C(t, n)
                })), z(t), C(t, n)
            },
            IFRAME: function (t, n) {
                y(t, "src", s(t, n.data_src))
            },
            VIDEO: function (t, n) {
                x(t, (function (t) {
                    y(t, "src", s(t, n.data_src))
                })), y(t, "poster", s(t, n.data_poster)), y(t, "src", s(t, n.data_src)), t.load()
            }
        },
        G = function (t, n) {
            var e = R[t.tagName];
            e && e(t, n)
        },
        T = function (t, n, e) {
            I(e, 1), p(t, n.class_loading), f(t, "loading"), b(n.callback_loading, t, e)
        },
        D = {
            IMG: function (t, n) {
                u(t, n.data_src, null), u(t, n.data_srcset, null), u(t, n.data_sizes, null), N(t, (function (t) {
                    u(t, n.data_srcset, null), u(t, n.data_sizes, null)
                }))
            },
            IFRAME: function (t, n) {
                u(t, n.data_src, null)
            },
            VIDEO: function (t, n) {
                u(t, n.data_src, null), u(t, n.data_poster, null), x(t, (function (t) {
                    u(t, n.data_src, null)
                }))
            }
        },
        F = function (t, n) {
            u(t, n.data_bg_multi, null), u(t, n.data_bg_multi_hidpi, null)
        },
        V = function (t, n) {
            var e = D[t.tagName];
            e ? e(t, n) : function (t, n) {
                u(t, n.data_bg, null), u(t, n.data_bg_hidpi, null)
            }(t, n)
        },
        j = ["IMG", "IFRAME", "VIDEO"],
        P = function (t, n) {
            !n || function (t) {
                return t.loadingCount > 0
            }(n) || function (t) {
                return t.toLoadCount > 0
            }(n) || b(t.callback_finish, n)
        },
        S = function (t, n, e) {
            t.addEventListener(n, e), t.llEvLisnrs[n] = e
        },
        U = function (t, n, e) {
            t.removeEventListener(n, e)
        },
        $ = function (t) {
            return !!t.llEvLisnrs
        },
        q = function (t) {
            if ($(t)) {
                var n = t.llEvLisnrs;
                for (var e in n) {
                    var i = n[e];
                    U(t, e, i)
                }
                delete t.llEvLisnrs
            }
        },
        H = function (t, n, e) {
            ! function (t) {
                delete t.llTempImage
            }(t), I(e, -1),
                function (t) {
                    t && (t.toLoadCount -= 1)
                }(e), h(t, n.class_loading), n.unobserve_completed && E(t, e)
        },
        B = function (t, n, e) {
            var i = m(t) || t;
            $(i) || function (t, n, e) {
                $(t) || (t.llEvLisnrs = {});
                var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                S(t, i, n), S(t, "error", e)
            }(i, (function (a) {
                ! function (t, n, e, i) {
                    var a = v(n);
                    H(n, e, i), p(n, e.class_loaded), f(n, "loaded"), V(n, e), b(e.callback_loaded, n, i), a || P(e, i)
                }(0, t, n, e), q(i)
            }), (function (a) {
                ! function (t, n, e, i) {
                    var a = v(n);
                    H(n, e, i), p(n, e.class_error), f(n, "error"), b(e.callback_error, n, i), a || P(e, i)
                }(0, t, n, e), q(i)
            }))
        },
        J = function (t, n, e) {
            ! function (t) {
                t.llTempImage = document.createElement("IMG")
            }(t), B(t, n, e),
                function (t, n, e) {
                    var i = s(t, n.data_bg),
                        a = s(t, n.data_bg_hidpi),
                        r = o && a ? a : i;
                    r && (t.style.backgroundImage = 'url("'.concat(r, '")'), m(t).setAttribute("src", r), T(t, n, e))
                }(t, n, e),
                function (t, n, e) {
                    var i = s(t, n.data_bg_multi),
                        a = s(t, n.data_bg_multi_hidpi),
                        r = o && a ? a : i;
                    r && (t.style.backgroundImage = r, function (t, n, e) {
                        p(t, n.class_applied), f(t, "applied"), F(t, n), n.unobserve_completed && E(t, n), b(n.callback_applied, t, e)
                    }(t, n, e))
                }(t, n, e)
        },
        K = function (t, n, e) {
            ! function (t) {
                return j.indexOf(t.tagName) > -1
            }(t) ? J(t, n, e): function (t, n, e) {
                B(t, n, e), G(t, n), T(t, n, e)
            }(t, n, e)
        },
        Q = ["IMG", "IFRAME"],
        W = function (t) {
            return t.use_native && "loading" in HTMLImageElement.prototype
        },
        X = function (t, n, e) {
            t.forEach((function (t) {
                return function (t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                }(t) ? function (t, n, e, i) {
                    b(e.callback_enter, t, n, i),
                        function (t, n, e) {
                            n.unobserve_entered && E(t, e)
                        }(t, e, i),
                        function (t) {
                            return !g(t)
                        }(t) || K(t, e, i)
                }(t.target, t, n, e) : function (t, n, e, i) {
                    g(t) || (function (t, n, e, i) {
                        e.cancel_on_exit && function (t) {
                            return "loading" === d(t)
                        }(t) && "IMG" === t.tagName && (q(t), function (t) {
                            N(t, (function (t) {
                                M(t)
                            })), M(t)
                        }(t), function (t) {
                            N(t, (function (t) {
                                O(t)
                            })), O(t)
                        }(t), h(t, e.class_loading), I(i, -1), _(t), b(e.callback_cancel, t, n, i))
                    }(t, n, e, i), b(e.callback_exit, t, n, i))
                }(t.target, t, n, e)
            }))
        },
        Y = function (t) {
            return Array.prototype.slice.call(t)
        },
        Z = function (t) {
            return t.container.querySelectorAll(t.elements_selector)
        },
        tt = function (t) {
            return function (t) {
                return "error" === d(t)
            }(t)
        },
        nt = function (t, n) {
            return function (t) {
                return Y(t).filter(g)
            }(t || Z(n))
        },
        et = function (t, e) {
            var a = c(t);
            this._settings = a, this.loadingCount = 0,
                function (t, n) {
                    i && !W(t) && (n._observer = new IntersectionObserver((function (e) {
                        X(e, t, n)
                    }), function (t) {
                        return {
                            root: t.container === document ? null : t.container,
                            rootMargin: t.thresholds || t.threshold + "px"
                        }
                    }(t)))
                }(a, this),
                function (t, e) {
                    n && window.addEventListener("online", (function () {
                        ! function (t, n) {
                            var e;
                            (e = Z(t), Y(e).filter(tt)).forEach((function (n) {
                                h(n, t.class_error), _(n)
                            })), n.update()
                        }(t, e)
                    }))
                }(a, this), this.update(e)
        };
    return et.prototype = {
        update: function (t) {
            var n, a, o = this._settings,
                r = nt(t, o);
            A(this, r.length), !e && i ? W(o) ? function (t, n, e) {
                t.forEach((function (t) {
                    -1 !== Q.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function (t, n, e) {
                        B(t, n, e), G(t, n), V(t, n), f(t, "native")
                    }(t, n, e))
                })), A(e, 0)
            }(r, o, this) : (a = r, function (t) {
                t.disconnect()
            }(n = this._observer), function (t, n) {
                n.forEach((function (n) {
                    t.observe(n)
                }))
            }(n, a)) : this.loadAll(r)
        },
        destroy: function () {
            this._observer && this._observer.disconnect(), Z(this._settings).forEach((function (t) {
                delete t.llOriginalAttrs
            })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount
        },
        loadAll: function (t) {
            var n = this,
                e = this._settings;
            nt(t, e).forEach((function (t) {
                K(t, e, n)
            }))
        }
    }, et.load = function (t, n) {
        var e = c(n);
        K(t, e)
    }, et.resetStatus = function (t) {
        _(t)
    }, n && function (t, n) {
        if (n)
            if (n.length)
                for (var e, i = 0; e = n[i]; i += 1) l(t, e);
            else l(t, n)
    }(et, window.lazyLoadOptions), et
}));
! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.Countdown = e()
    }
}(function () {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    }({
        1: [function (require, module, exports) {
            var defaultOptions = {
                date: "June 7, 2087 15:03:25",
                refresh: 1e3,
                offset: 0,
                onEnd: function () {
                    return
                },
                render: function (date) {
                    this.el.innerHTML = date.years + " years, " + date.days + " days, " + this.leadingZeros(date.hours) + " hours, " + this.leadingZeros(date.min) + " min and " + this.leadingZeros(date.sec) + " sec"
                }
            };
            var Countdown = function (el, options) {
                this.el = el;
                this.options = {};
                this.interval = false;
                this.mergeOptions = function (options) {
                    for (var i in defaultOptions) {
                        if (defaultOptions.hasOwnProperty(i)) {
                            this.options[i] = typeof options[i] !== "undefined" ? options[i] : defaultOptions[i];
                            if (i === "date" && typeof this.options.date !== "object") {
                                this.options.date = new Date(this.options.date)
                            }
                            if (typeof this.options[i] === "function") {
                                this.options[i] = this.options[i].bind(this)
                            }
                        }
                    }
                    if (typeof this.options.date !== "object") {
                        this.options.date = new Date(this.options.date)
                    }
                }.bind(this);
                this.mergeOptions(options);
                this.getDiffDate = function () {
                    var diff = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3;
                    var dateData = {
                        years: 0,
                        days: 0,
                        hours: 0,
                        min: 0,
                        sec: 0,
                        millisec: 0
                    };
                    if (diff <= 0) {
                        if (this.interval) {
                            this.stop();
                            this.options.onEnd()
                        }
                        return dateData
                    }
                    if (diff >= 365.25 * 86400) {
                        dateData.years = Math.floor(diff / (365.25 * 86400));
                        diff -= dateData.years * 365.25 * 86400
                    }
                    if (diff >= 86400) {
                        dateData.days = Math.floor(diff / 86400);
                        diff -= dateData.days * 86400
                    }
                    if (diff >= 3600) {
                        dateData.hours = Math.floor(diff / 3600);
                        diff -= dateData.hours * 3600
                    }
                    if (diff >= 60) {
                        dateData.min = Math.floor(diff / 60);
                        diff -= dateData.min * 60
                    }
                    dateData.sec = Math.round(diff);
                    dateData.millisec = diff % 1 * 1e3;
                    return dateData
                }.bind(this);
                this.leadingZeros = function (num, length) {
                    length = length || 2;
                    num = String(num);
                    if (num.length > length) {
                        return num
                    }
                    return (Array(length + 1).join("0") + num).substr(-length)
                };
                this.update = function (newDate) {
                    if (typeof newDate !== "object") {
                        newDate = new Date(newDate)
                    }
                    this.options.date = newDate;
                    this.render();
                    return this
                }.bind(this);
                this.stop = function () {
                    if (this.interval) {
                        clearInterval(this.interval);
                        this.interval = false
                    }
                    return this
                }.bind(this);
                this.render = function () {
                    this.options.render(this.getDiffDate());
                    return this
                }.bind(this);
                this.start = function () {
                    if (this.interval) {
                        return
                    }
                    this.render();
                    if (this.options.refresh) {
                        this.interval = setInterval(this.render, this.options.refresh)
                    }
                    return this
                }.bind(this);
                this.updateOffset = function (offset) {
                    this.options.offset = offset;
                    return this
                }.bind(this);
                this.restart = function (options) {
                    this.mergeOptions(options);
                    this.interval = false;
                    this.start();
                    return this
                }.bind(this);
                this.start()
            };
            module.exports = Countdown
        }, {}],
        2: [function (require, module, exports) {
            var Countdown = require("./countdown.js");
            var NAME = "countdown";
            var DATA_ATTR = "date";
            jQuery.fn.countdown = function (options) {
                return $.each(this, function (i, el) {
                    var $el = $(el);
                    if (!$el.data(NAME)) {
                        if ($el.data(DATA_ATTR)) {
                            options.date = $el.data(DATA_ATTR)
                        }
                        $el.data(NAME, new Countdown(el, options))
                    }
                })
            };
            module.exports = Countdown
        }, {
            "./countdown.js": 1
        }]
    }, {}, [2])(2)
});
! function (a, b) {
    "function" == typeof define && define.amd ? define("typeahead.js", ["jquery"], function (a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function (a) {
    var b = function () {
            "use strict";
            return {
                isMsie: function () {
                    return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
                },
                isBlankString: function (a) {
                    return !a || /^\s*$/.test(a)
                },
                escapeRegExChars: function (a) {
                    return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function (a) {
                    return "string" == typeof a
                },
                isNumber: function (a) {
                    return "number" == typeof a
                },
                isArray: a.isArray,
                isFunction: a.isFunction,
                isObject: a.isPlainObject,
                isUndefined: function (a) {
                    return "undefined" == typeof a
                },
                isElement: function (a) {
                    return !(!a || 1 !== a.nodeType)
                },
                isJQuery: function (b) {
                    return b instanceof a
                },
                toStr: function (a) {
                    return b.isUndefined(a) || null === a ? "" : a + ""
                },
                bind: a.proxy,
                each: function (b, c) {
                    function d(a, b) {
                        return c(b, a)
                    }
                    a.each(b, d)
                },
                map: a.map,
                filter: a.grep,
                every: function (b, c) {
                    var d = !0;
                    return b ? (a.each(b, function (a, e) {
                        return (d = c.call(null, e, a, b)) ? void 0 : !1
                    }), !!d) : d
                },
                some: function (b, c) {
                    var d = !1;
                    return b ? (a.each(b, function (a, e) {
                        return (d = c.call(null, e, a, b)) ? !1 : void 0
                    }), !!d) : d
                },
                mixin: a.extend,
                identity: function (a) {
                    return a
                },
                clone: function (b) {
                    return a.extend(!0, {}, b)
                },
                getIdGenerator: function () {
                    var a = 0;
                    return function () {
                        return a++
                    }
                },
                templatify: function (b) {
                    function c() {
                        return String(b)
                    }
                    return a.isFunction(b) ? b : c
                },
                defer: function (a) {
                    setTimeout(a, 0)
                },
                debounce: function (a, b, c) {
                    var d, e;
                    return function () {
                        var f, g, h = this,
                            i = arguments;
                        return f = function () {
                            d = null, c || (e = a.apply(h, i))
                        }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
                    }
                },
                throttle: function (a, b) {
                    var c, d, e, f, g, h;
                    return g = 0, h = function () {
                            g = new Date, e = null, f = a.apply(c, d)
                        },
                        function () {
                            var i = new Date,
                                j = b - (i - g);
                            return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                        }
                },
                stringify: function (a) {
                    return b.isString(a) ? a : JSON.stringify(a)
                },
                noop: function () {}
            }
        }(),
        c = function () {
            "use strict";

            function a(a) {
                var g, h;
                return h = b.mixin({}, f, a), g = {
                    css: e(),
                    classes: h,
                    html: c(h),
                    selectors: d(h)
                }, {
                    css: g.css,
                    html: g.html,
                    classes: g.classes,
                    selectors: g.selectors,
                    mixin: function (a) {
                        b.mixin(a, g)
                    }
                }
            }

            function c(a) {
                return {
                    wrapper: '<span class="' + a.wrapper + '"></span>',
                    menu: '<div class="' + a.menu + '"></div>'
                }
            }

            function d(a) {
                var c = {};
                return b.each(a, function (a, b) {
                    c[b] = "." + a
                }), c
            }

            function e() {
                var a = {
                    wrapper: {
                        position: "relative",
                        display: "inline-block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    menu: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return b.isMsie() && b.mixin(a.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), a
            }
            var f = {
                wrapper: "twitter-typeahead",
                input: "tt-input",
                hint: "tt-hint",
                menu: "tt-menu",
                dataset: "tt-dataset",
                suggestion: "tt-suggestion",
                selectable: "tt-selectable",
                empty: "tt-empty",
                open: "tt-open",
                cursor: "tt-cursor",
                highlight: "tt-highlight"
            };
            return a
        }(),
        d = function () {
            "use strict";

            function c(b) {
                b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
            }
            var d, e;
            return d = "typeahead:", e = {
                render: "rendered",
                cursorchange: "cursorchanged",
                select: "selected",
                autocomplete: "autocompleted"
            }, b.mixin(c.prototype, {
                _trigger: function (b, c) {
                    var e;
                    return e = a.Event(d + b), (c = c || []).unshift(e), this.$el.trigger.apply(this.$el, c), e
                },
                before: function (a) {
                    var b, c;
                    return b = [].slice.call(arguments, 1), c = this._trigger("before" + a, b), c.isDefaultPrevented()
                },
                trigger: function (a) {
                    var b;
                    this._trigger(a, [].slice.call(arguments, 1)), (b = e[a]) && this._trigger(b, [].slice.call(arguments, 1))
                }
            }), c
        }(),
        e = function () {
            "use strict";

            function a(a, b, c, d) {
                var e;
                if (!c) return this;
                for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) this._callbacks[e] = this._callbacks[e] || {
                    sync: [],
                    async: []
                }, this._callbacks[e][a].push(c);
                return this
            }

            function b(b, c, d) {
                return a.call(this, "async", b, c, d)
            }

            function c(b, c, d) {
                return a.call(this, "sync", b, c, d)
            }

            function d(a) {
                var b;
                if (!this._callbacks) return this;
                for (a = a.split(i); b = a.shift();) delete this._callbacks[b];
                return this
            }

            function e(a) {
                var b, c, d, e, g;
                if (!this._callbacks) return this;
                for (a = a.split(i), d = [].slice.call(arguments, 1);
                    (b = a.shift()) && (c = this._callbacks[b]);) e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g);
                return this
            }

            function f(a, b, c) {
                function d() {
                    for (var d, e = 0, f = a.length; !d && f > e; e += 1) d = a[e].apply(b, c) === !1;
                    return !d
                }
                return d
            }

            function g() {
                var a;
                return a = window.setImmediate ? function (a) {
                    setImmediate(function () {
                        a()
                    })
                } : function (a) {
                    setTimeout(function () {
                        a()
                    }, 0)
                }
            }

            function h(a, b) {
                return a.bind ? a.bind(b) : function () {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var i = /\s+/,
                j = g();
            return {
                onSync: c,
                onAsync: b,
                off: d,
                trigger: e
            }
        }(),
        f = function (a) {
            "use strict";

            function c(a, c, d) {
                for (var e, f = [], g = 0, h = a.length; h > g; g++) f.push(b.escapeRegExChars(a[g]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function (e) {
                function f(b) {
                    var c, d, f;
                    return (c = h.exec(b.data)) && (f = a.createElement(e.tagName), e.className && (f.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), f.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(f, d)), !!c
                }

                function g(a, b) {
                    for (var c, d = 3, e = 0; e < a.childNodes.length; e++) c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
                var h;
                e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
            }
        }(window.document),
        g = function () {
            "use strict";

            function c(c, e) {
                c = c || {}, c.input || a.error("input is missing"), e.mixin(this), this.$hint = a(c.hint), this.$input = a(c.input), this.query = this.$input.val(), this.queryWhenFocused = this.hasFocus() ? this.query : null, this.$overflowHelper = d(this.$input), this._checkLanguageDirection(), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop)
            }

            function d(b) {
                return a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: b.css("font-family"),
                    fontSize: b.css("font-size"),
                    fontStyle: b.css("font-style"),
                    fontVariant: b.css("font-variant"),
                    fontWeight: b.css("font-weight"),
                    wordSpacing: b.css("word-spacing"),
                    letterSpacing: b.css("letter-spacing"),
                    textIndent: b.css("text-indent"),
                    textRendering: b.css("text-rendering"),
                    textTransform: b.css("text-transform")
                }).insertAfter(b)
            }

            function f(a, b) {
                return c.normalizeQuery(a) === c.normalizeQuery(b)
            }

            function g(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var h;
            return h = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function (a) {
                return b.toStr(a).replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, e, {
                _onBlur: function () {
                    this.resetInputValue(), this.trigger("blurred")
                },
                _onFocus: function () {
                    this.queryWhenFocused = this.query, this.trigger("focused")
                },
                _onKeydown: function (a) {
                    var b = h[a.which || a.keyCode];
                    this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function () {
                    this._setQuery(this.getInputValue()), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                _managePreventDefault: function (a, b) {
                    var c;
                    switch (a) {
                        case "up":
                        case "down":
                            c = !g(b);
                            break;
                        default:
                            c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function (a, b) {
                    var c;
                    switch (a) {
                        case "tab":
                            c = !g(b);
                            break;
                        default:
                            c = !0
                    }
                    return c
                },
                _checkLanguageDirection: function () {
                    var a = (this.$input.css("direction") || "ltr").toLowerCase();
                    this.dir !== a && (this.dir = a, this.$hint.attr("dir", a), this.trigger("langDirChanged", a))
                },
                _setQuery: function (a, b) {
                    var c, d;
                    c = f(a, this.query), d = c ? this.query.length !== a.length : !1, this.query = a, b || c ? !b && d && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                },
                bind: function () {
                    var a, c, d, e, f = this;
                    return a = b.bind(this._onBlur, this), c = b.bind(this._onFocus, this), d = b.bind(this._onKeydown, this), e = b.bind(this._onInput, this), this.$input.on("blur.tt", a).on("focus.tt", c).on("keydown.tt", d), !b.isMsie() || b.isMsie() > 9 ? this.$input.on("input.tt", e) : this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function (a) {
                        h[a.which || a.keyCode] || b.defer(b.bind(f._onInput, f, a))
                    }), this
                },
                focus: function () {
                    this.$input.focus()
                },
                blur: function () {
                    this.$input.blur()
                },
                getLangDir: function () {
                    return this.dir
                },
                getQuery: function () {
                    return this.query || ""
                },
                setQuery: function (a, b) {
                    this.setInputValue(a), this._setQuery(a, b)
                },
                hasQueryChangedSinceLastFocus: function () {
                    return this.query !== this.queryWhenFocused
                },
                getInputValue: function () {
                    return this.$input.val()
                },
                setInputValue: function (a) {
                    this.$input.val(a), this.clearHintIfInvalid(), this._checkLanguageDirection()
                },
                resetInputValue: function () {
                    this.setInputValue(this.query)
                },
                getHint: function () {
                    return this.$hint.val()
                },
                setHint: function (a) {
                    this.$hint.val(a)
                },
                clearHint: function () {
                    this.setHint("")
                },
                clearHintIfInvalid: function () {
                    var a, b, c, d;
                    a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
                },
                hasFocus: function () {
                    return this.$input.is(":focus")
                },
                hasOverflow: function () {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function () {
                    var a, c, d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function () {
                    this.$hint.off(".tt"), this.$input.off(".tt"), this.$overflowHelper.remove(), this.$hint = this.$input = this.$overflowHelper = a("<div>")
                }
            }), c
        }(),
        h = function () {
            "use strict";

            function c(c, e) {
                c = c || {}, c.templates = c.templates || {}, c.templates.notFound = c.templates.notFound || c.templates.empty, c.source || a.error("missing source"), c.node || a.error("missing node"), c.name && !h(c.name) && a.error("invalid dataset name: " + c.name), e.mixin(this), this.highlight = !!c.highlight, this.name = c.name || j(), this.limit = c.limit || 5, this.displayFn = d(c.display || c.displayKey), this.templates = g(c.templates, this.displayFn), this.source = c.source.__ttAdapter ? c.source.__ttAdapter() : c.source, this.async = b.isUndefined(c.async) ? this.source.length > 2 : !!c.async, this._resetLastSuggestion(), this.$el = a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name)
            }

            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || b.stringify, b.isFunction(a) ? a : c
            }

            function g(c, d) {
                function e(b) {
                    return a("<div>").text(d(b))
                }
                return {
                    notFound: c.notFound && b.templatify(c.notFound),
                    pending: c.pending && b.templatify(c.pending),
                    header: c.header && b.templatify(c.header),
                    footer: c.footer && b.templatify(c.footer),
                    suggestion: c.suggestion || e
                }
            }

            function h(a) {
                return /^[_a-zA-Z0-9-]+$/.test(a)
            }
            var i, j;
            return i = {
                val: "tt-selectable-display",
                obj: "tt-selectable-object"
            }, j = b.getIdGenerator(), c.extractData = function (b) {
                var c = a(b);
                return c.data(i.obj) ? {
                    val: c.data(i.val) || "",
                    obj: c.data(i.obj) || null
                } : null
            }, b.mixin(c.prototype, e, {
                _overwrite: function (a, b) {
                    b = b || [], b.length ? this._renderSuggestions(a, b) : this.async && this.templates.pending ? this._renderPending(a) : !this.async && this.templates.notFound ? this._renderNotFound(a) : this._empty(), this.trigger("rendered", this.name, b, !1)
                },
                _append: function (a, b) {
                    b = b || [], b.length && this.$lastSuggestion.length ? this._appendSuggestions(a, b) : b.length ? this._renderSuggestions(a, b) : !this.$lastSuggestion.length && this.templates.notFound && this._renderNotFound(a), this.trigger("rendered", this.name, b, !0)
                },
                _renderSuggestions: function (a, b) {
                    var c;
                    c = this._getSuggestionsFragment(a, b), this.$lastSuggestion = c.children().last(), this.$el.html(c).prepend(this._getHeader(a, b)).append(this._getFooter(a, b))
                },
                _appendSuggestions: function (a, b) {
                    var c, d;
                    c = this._getSuggestionsFragment(a, b), d = c.children().last(), this.$lastSuggestion.after(c), this.$lastSuggestion = d
                },
                _renderPending: function (a) {
                    var b = this.templates.pending;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _renderNotFound: function (a) {
                    var b = this.templates.notFound;
                    this._resetLastSuggestion(), b && this.$el.html(b({
                        query: a,
                        dataset: this.name
                    }))
                },
                _empty: function () {
                    this.$el.empty(), this._resetLastSuggestion()
                },
                _getSuggestionsFragment: function (c, d) {
                    var e, g = this;
                    return e = document.createDocumentFragment(), b.each(d, function (b) {
                        var d, f;
                        f = g._injectQuery(c, b), d = a(g.templates.suggestion(f)).data(i.obj, b).data(i.val, g.displayFn(b)).addClass(g.classes.suggestion + " " + g.classes.selectable), e.appendChild(d[0])
                    }), this.highlight && f({
                        className: this.classes.highlight,
                        node: e,
                        pattern: c
                    }), a(e)
                },
                _getFooter: function (a, b) {
                    return this.templates.footer ? this.templates.footer({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _getHeader: function (a, b) {
                    return this.templates.header ? this.templates.header({
                        query: a,
                        suggestions: b,
                        dataset: this.name
                    }) : null
                },
                _resetLastSuggestion: function () {
                    this.$lastSuggestion = a()
                },
                _injectQuery: function (a, c) {
                    return b.isObject(c) ? b.mixin({
                        _query: a
                    }, c) : c
                },
                update: function (b) {
                    function c(a) {
                        g || (g = !0, a = (a || []).slice(0, e.limit), h = a.length, e._overwrite(b, a), h < e.limit && e.async && e.trigger("asyncRequested", b))
                    }

                    function d(c) {
                        c = c || [], !f && h < e.limit && (e.cancel = a.noop, h += c.length, e._append(b, c.slice(0, e.limit - h)), e.async && e.trigger("asyncReceived", b))
                    }
                    var e = this,
                        f = !1,
                        g = !1,
                        h = 0;
                    this.cancel(), this.cancel = function () {
                        f = !0, e.cancel = a.noop, e.async && e.trigger("asyncCanceled", b)
                    }, this.source(b, c, d), !g && c([])
                },
                cancel: a.noop,
                clear: function () {
                    this._empty(), this.cancel(), this.trigger("cleared")
                },
                isEmpty: function () {
                    return this.$el.is(":empty")
                },
                destroy: function () {
                    this.$el = a("<div>")
                }
            }), c
        }(),
        i = function () {
            "use strict";

            function c(c, d) {
                function e(b) {
                    var c = f.$node.find(b.node).first();
                    return b.node = c.length ? c : a("<div>").appendTo(f.$node), new h(b, d)
                }
                var f = this;
                c = c || {}, c.node || a.error("node is required"), d.mixin(this), this.$node = a(c.node), this.query = null, this.datasets = b.map(c.datasets, e)
            }
            return b.mixin(c.prototype, e, {
                _onSelectableClick: function (b) {
                    this.trigger("selectableClicked", a(b.currentTarget))
                },
                _onRendered: function (a, b, c, d) {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetRendered", b, c, d)
                },
                _onCleared: function () {
                    this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty()), this.trigger("datasetCleared")
                },
                _propagate: function () {
                    this.trigger.apply(this, arguments)
                },
                _allDatasetsEmpty: function () {
                    function a(a) {
                        return a.isEmpty()
                    }
                    return b.every(this.datasets, a)
                },
                _getSelectables: function () {
                    return this.$node.find(this.selectors.selectable)
                },
                _removeCursor: function () {
                    var a = this.getActiveSelectable();
                    a && a.removeClass(this.classes.cursor)
                },
                _ensureVisible: function (a) {
                    var b, c, d, e;
                    b = a.position().top, c = b + a.outerHeight(!0), d = this.$node.scrollTop(), e = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10), 0 > b ? this.$node.scrollTop(d + b) : c > e && this.$node.scrollTop(d + (c - e))
                },
                bind: function () {
                    var a, c = this;
                    return a = b.bind(this._onSelectableClick, this), this.$node.on("click.tt", this.selectors.selectable, a), b.each(this.datasets, function (a) {
                        a.onSync("asyncRequested", c._propagate, c).onSync("asyncCanceled", c._propagate, c).onSync("asyncReceived", c._propagate, c).onSync("rendered", c._onRendered, c).onSync("cleared", c._onCleared, c)
                    }), this
                },
                isOpen: function () {
                    return this.$node.hasClass(this.classes.open)
                },
                open: function () {
                    this.$node.addClass(this.classes.open)
                },
                close: function () {
                    this.$node.removeClass(this.classes.open), this._removeCursor()
                },
                setLanguageDirection: function (a) {
                    this.$node.attr("dir", a)
                },
                selectableRelativeToCursor: function (a) {
                    var b, c, d, e;
                    return c = this.getActiveSelectable(), b = this._getSelectables(), d = c ? b.index(c) : -1, e = d + a, e = (e + 1) % (b.length + 1) - 1, e = -1 > e ? b.length - 1 : e, -1 === e ? null : b.eq(e)
                },
                setCursor: function (a) {
                    this._removeCursor(), (a = a && a.first()) && (a.addClass(this.classes.cursor), this._ensureVisible(a))
                },
                getSelectableData: function (a) {
                    return a && a.length ? h.extractData(a) : null
                },
                getActiveSelectable: function () {
                    var a = this._getSelectables().filter(this.selectors.cursor).first();
                    return a.length ? a : null
                },
                getTopSelectable: function () {
                    var a = this._getSelectables().first();
                    return a.length ? a : null
                },
                update: function (a) {
                    function c(b) {
                        b.update(a)
                    }
                    var d = a !== this.query;
                    return d && (this.query = a, b.each(this.datasets, c)), d
                },
                empty: function () {
                    function a(a) {
                        a.clear()
                    }
                    b.each(this.datasets, a), this.query = null, this.$node.addClass(this.classes.empty)
                },
                destroy: function () {
                    function c(a) {
                        a.destroy()
                    }
                    this.$node.off(".tt"), this.$node = a("<div>"), b.each(this.datasets, c)
                }
            }), c
        }(),
        j = function () {
            "use strict";

            function a() {
                i.apply(this, [].slice.call(arguments, 0))
            }
            var c = i.prototype;
            return b.mixin(a.prototype, i.prototype, {
                open: function () {
                    return !this._allDatasetsEmpty() && this._show(), c.open.apply(this, [].slice.call(arguments, 0))
                },
                close: function () {
                    return this._hide(), c.close.apply(this, [].slice.call(arguments, 0))
                },
                _onRendered: function () {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onRendered.apply(this, [].slice.call(arguments, 0))
                },
                _onCleared: function () {
                    return this._allDatasetsEmpty() ? this._hide() : this.isOpen() && this._show(), c._onCleared.apply(this, [].slice.call(arguments, 0))
                },
                setLanguageDirection: function (a) {
                    return this.$node.css("ltr" === a ? this.css.ltr : this.css.rtl), c.setLanguageDirection.apply(this, [].slice.call(arguments, 0))
                },
                _hide: function () {
                    this.$node.hide()
                },
                _show: function () {
                    this.$node.css("display", "block")
                }
            }), a
        }(),
        k = function () {
            "use strict";

            function c(c, e) {
                var f, g, h, i, j, k, l, m, n, o, p;
                c = c || {}, c.input || a.error("missing input"), c.menu || a.error("missing menu"), c.eventBus || a.error("missing event bus"), e.mixin(this), this.eventBus = c.eventBus, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.input = c.input, this.menu = c.menu, this.enabled = !0, this.active = !1, this.input.hasFocus() && this.activate(), this.dir = this.input.getLangDir(), this._hacks(), this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this), f = d(this, "activate", "open", "_onFocused"), g = d(this, "deactivate", "_onBlurred"), h = d(this, "isActive", "isOpen", "_onEnterKeyed"), i = d(this, "isActive", "isOpen", "_onTabKeyed"), j = d(this, "isActive", "_onEscKeyed"), k = d(this, "isActive", "open", "_onUpKeyed"), l = d(this, "isActive", "open", "_onDownKeyed"), m = d(this, "isActive", "isOpen", "_onLeftKeyed"), n = d(this, "isActive", "isOpen", "_onRightKeyed"), o = d(this, "_openIfActive", "_onQueryChanged"), p = d(this, "_openIfActive", "_onWhitespaceChanged"), this.input.bind().onSync("focused", f, this).onSync("blurred", g, this).onSync("enterKeyed", h, this).onSync("tabKeyed", i, this).onSync("escKeyed", j, this).onSync("upKeyed", k, this).onSync("downKeyed", l, this).onSync("leftKeyed", m, this).onSync("rightKeyed", n, this).onSync("queryChanged", o, this).onSync("whitespaceChanged", p, this).onSync("langDirChanged", this._onLangDirChanged, this)
            }

            function d(a) {
                var c = [].slice.call(arguments, 1);
                return function () {
                    var d = [].slice.call(arguments);
                    b.each(c, function (b) {
                        return a[b].apply(a, d)
                    })
                }
            }
            return b.mixin(c.prototype, {
                _hacks: function () {
                    var c, d;
                    c = this.input.$input || a("<div>"), d = this.menu.$node || a("<div>"), c.on("blur.tt", function (a) {
                        var e, f, g;
                        e = document.activeElement, f = d.is(e), g = d.has(e).length > 0, b.isMsie() && (f || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function () {
                            c.focus()
                        }))
                    }), d.on("mousedown.tt", function (a) {
                        a.preventDefault()
                    })
                },
                _onSelectableClicked: function (a, b) {
                    this.select(b)
                },
                _onDatasetCleared: function () {
                    this._updateHint()
                },
                _onDatasetRendered: function (a, b, c, d) {
                    this._updateHint(), this.eventBus.trigger("render", c, d, b)
                },
                _onAsyncRequested: function (a, b, c) {
                    this.eventBus.trigger("asyncrequest", c, b)
                },
                _onAsyncCanceled: function (a, b, c) {
                    this.eventBus.trigger("asynccancel", c, b)
                },
                _onAsyncReceived: function (a, b, c) {
                    this.eventBus.trigger("asyncreceive", c, b)
                },
                _onFocused: function () {
                    this._minLengthMet() && this.menu.update(this.input.getQuery())
                },
                _onBlurred: function () {
                    this.input.hasQueryChangedSinceLastFocus() && this.eventBus.trigger("change", this.input.getQuery())
                },
                _onEnterKeyed: function (a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) && this.select(c) && b.preventDefault()
                },
                _onTabKeyed: function (a, b) {
                    var c;
                    (c = this.menu.getActiveSelectable()) ? this.select(c) && b.preventDefault(): (c = this.menu.getTopSelectable()) && this.autocomplete(c) && b.preventDefault()
                },
                _onEscKeyed: function () {
                    this.close()
                },
                _onUpKeyed: function () {
                    this.moveCursor(-1)
                },
                _onDownKeyed: function () {
                    this.moveCursor(1)
                },
                _onLeftKeyed: function () {
                    "rtl" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onRightKeyed: function () {
                    "ltr" === this.dir && this.input.isCursorAtEnd() && this.autocomplete(this.menu.getTopSelectable())
                },
                _onQueryChanged: function (a, b) {
                    this._minLengthMet(b) ? this.menu.update(b) : this.menu.empty()
                },
                _onWhitespaceChanged: function () {
                    this._updateHint()
                },
                _onLangDirChanged: function (a, b) {
                    this.dir !== b && (this.dir = b, this.menu.setLanguageDirection(b))
                },
                _openIfActive: function () {
                    this.isActive() && this.open()
                },
                _minLengthMet: function (a) {
                    return a = b.isString(a) ? a : this.input.getQuery() || "", a.length >= this.minLength
                },
                _updateHint: function () {
                    var a, c, d, e, f, h, i;
                    a = this.menu.getTopSelectable(), c = this.menu.getSelectableData(a), d = this.input.getInputValue(), !c || b.isBlankString(d) || this.input.hasOverflow() ? this.input.clearHint() : (e = g.normalizeQuery(d), f = b.escapeRegExChars(e), h = new RegExp("^(?:" + f + ")(.+$)", "i"), i = h.exec(c.val), i && this.input.setHint(d + i[1]))
                },
                isEnabled: function () {
                    return this.enabled
                },
                enable: function () {
                    this.enabled = !0
                },
                disable: function () {
                    this.enabled = !1
                },
                isActive: function () {
                    return this.active
                },
                activate: function () {
                    return this.isActive() ? !0 : !this.isEnabled() || this.eventBus.before("active") ? !1 : (this.active = !0, this.eventBus.trigger("active"), !0)
                },
                deactivate: function () {
                    return this.isActive() ? this.eventBus.before("idle") ? !1 : (this.active = !1, this.close(), this.eventBus.trigger("idle"), !0) : !0
                },
                isOpen: function () {
                    return this.menu.isOpen()
                },
                open: function () {
                    return this.isOpen() || this.eventBus.before("open") || (this.menu.open(), this._updateHint(), this.eventBus.trigger("open")), this.isOpen()
                },
                close: function () {
                    return this.isOpen() && !this.eventBus.before("close") && (this.menu.close(), this.input.clearHint(), this.input.resetInputValue(), this.eventBus.trigger("close")), !this.isOpen()
                },
                setVal: function (a) {
                    this.input.setQuery(b.toStr(a))
                },
                getVal: function () {
                    return this.input.getQuery()
                },
                select: function (a) {
                    var b = this.menu.getSelectableData(a);
                    return b && !this.eventBus.before("select", b.obj) ? (this.input.setQuery(b.val, !0), this.eventBus.trigger("select", b.obj), this.close(), !0) : !1
                },
                autocomplete: function (a) {
                    var b, c, d;
                    return b = this.input.getQuery(), c = this.menu.getSelectableData(a), d = c && b !== c.val, d && !this.eventBus.before("autocomplete", c.obj) ? (this.input.setQuery(c.val), this.eventBus.trigger("autocomplete", c.obj), !0) : !1
                },
                moveCursor: function (a) {
                    var b, c, d, e, f;
                    return b = this.input.getQuery(), c = this.menu.selectableRelativeToCursor(a), d = this.menu.getSelectableData(c), e = d ? d.obj : null, f = this._minLengthMet() && this.menu.update(b), f || this.eventBus.before("cursorchange", e) ? !1 : (this.menu.setCursor(c), d ? this.input.setInputValue(d.val) : (this.input.resetInputValue(), this._updateHint()), this.eventBus.trigger("cursorchange", e), !0)
                },
                destroy: function () {
                    this.input.destroy(), this.menu.destroy()
                }
            }), c
        }();
    ! function () {
        "use strict";

        function e(b, c) {
            b.each(function () {
                var b, d = a(this);
                (b = d.data(p.typeahead)) && c(b, d)
            })
        }

        function f(a, b) {
            return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly", !0).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            })
        }

        function h(a, b) {
            a.data(p.attrs, {
                dir: a.attr("dir"),
                autocomplete: a.attr("autocomplete"),
                spellcheck: a.attr("spellcheck"),
                style: a.attr("style")
            }), a.addClass(b.classes.input).attr({
                autocomplete: "off",
                spellcheck: !1
            });
            try {
                !a.attr("dir") && a.attr("dir", "auto")
            } catch (c) {}
            return a
        }

        function l(a) {
            return {
                backgroundAttachment: a.css("background-attachment"),
                backgroundClip: a.css("background-clip"),
                backgroundColor: a.css("background-color"),
                backgroundImage: a.css("background-image"),
                backgroundOrigin: a.css("background-origin"),
                backgroundPosition: a.css("background-position"),
                backgroundRepeat: a.css("background-repeat"),
                backgroundSize: a.css("background-size")
            }
        }

        function m(a) {
            var c, d;
            c = a.data(p.www), d = a.parent().filter(c.selectors.wrapper), b.each(a.data(p.attrs), function (c, d) {
                b.isUndefined(c) ? a.removeAttr(d) : a.attr(d, c)
            }), a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input), d.length && (a.detach().insertAfter(d), d.remove())
        }

        function n(c) {
            var d, e;
            return d = b.isJQuery(c) || b.isElement(c), e = d ? a(c).first() : [], e.length ? e : null
        }
        var o, p, q;
        o = a.fn.typeahead, p = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        }, q = {
            initialize: function (e, l) {
                function m() {
                    var c, m, q, r, s, t, u, v, w, x, y;
                    b.each(l, function (a) {
                        a.highlight = !!e.highlight
                    }), c = a(this), m = a(o.html.wrapper), q = n(e.hint), r = n(e.menu), s = e.hint !== !1 && !q, t = e.menu !== !1 && !r, s && (q = f(c, o)), t && (r = a(o.html.menu).css(o.css.menu)), q && q.val(""), c = h(c, o), (s || t) && (m.css(o.css.wrapper), c.css(s ? o.css.input : o.css.inputWithNoHint), c.wrap(m).parent().prepend(s ? q : null).append(t ? r : null)), y = t ? j : i, u = new d({
                        el: c
                    }), v = new g({
                        hint: q,
                        input: c
                    }, o), w = new y({
                        node: r,
                        datasets: l
                    }, o), x = new k({
                        input: v,
                        menu: w,
                        eventBus: u,
                        minLength: e.minLength
                    }, o), c.data(p.www, o), c.data(p.typeahead, x)
                }
                var o;
                return l = b.isArray(l) ? l : [].slice.call(arguments, 1), e = e || {}, o = c(e.classNames), this.each(m)
            },
            isEnabled: function () {
                var a;
                return e(this.first(), function (b) {
                    a = b.isEnabled()
                }), a
            },
            enable: function () {
                return e(this, function (a) {
                    a.enable()
                }), this
            },
            disable: function () {
                return e(this, function (a) {
                    a.disable()
                }), this
            },
            isActive: function () {
                var a;
                return e(this.first(), function (b) {
                    a = b.isActive()
                }), a
            },
            activate: function () {
                return e(this, function (a) {
                    a.activate()
                }), this
            },
            deactivate: function () {
                return e(this, function (a) {
                    a.deactivate()
                }), this
            },
            isOpen: function () {
                var a;
                return e(this.first(), function (b) {
                    a = b.isOpen()
                }), a
            },
            open: function () {
                return e(this, function (a) {
                    a.open()
                }), this
            },
            close: function () {
                return e(this, function (a) {
                    a.close()
                }), this
            },
            select: function (b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function (a) {
                    c = a.select(d)
                }), c
            },
            autocomplete: function (b) {
                var c = !1,
                    d = a(b);
                return e(this.first(), function (a) {
                    c = a.autocomplete(d)
                }), c
            },
            moveCursor: function (a) {
                var b = !1;
                return e(this.first(), function (c) {
                    b = c.moveCursor(a)
                }), b
            },
            val: function (a) {
                var b;
                return arguments.length ? (e(this, function (b) {
                    b.setVal(a)
                }), this) : (e(this.first(), function (a) {
                    b = a.getVal()
                }), b)
            },
            destroy: function () {
                return e(this, function (a, b) {
                    m(b), a.destroy()
                }), this
            }
        }, a.fn.typeahead = function (a) {
            return q[a] ? q[a].apply(this, [].slice.call(arguments, 1)) : q.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function () {
            return a.fn.typeahead = o, this
        }
    }()
});
! function (factory) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], factory) : jQuery && !jQuery.fn.hoverIntent && factory(jQuery)
}(function ($) {
    "use strict";
    var cX, cY, _cfg = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        },
        INSTANCE_COUNT = 0,
        track = function (ev) {
            cX = ev.pageX, cY = ev.pageY
        },
        compare = function (ev, $el, s, cfg) {
            if (Math.sqrt((s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY)) < cfg.sensitivity) return $el.off(s.event, track), delete s.timeoutId, s.isActive = !0, ev.pageX = cX, ev.pageY = cY, delete s.pX, delete s.pY, cfg.over.apply($el[0], [ev]);
            s.pX = cX, s.pY = cY, s.timeoutId = setTimeout(function () {
                compare(ev, $el, s, cfg)
            }, cfg.interval)
        },
        delay = function (ev, $el, s, out) {
            return delete $el.data("hoverIntent")[s.id], out.apply($el[0], [ev])
        };
    $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
        var instanceId = INSTANCE_COUNT++,
            cfg = $.extend({}, _cfg);
        $.isPlainObject(handlerIn) ? (cfg = $.extend(cfg, handlerIn), $.isFunction(cfg.out) || (cfg.out = cfg.over)) : cfg = $.isFunction(handlerOut) ? $.extend(cfg, {
            over: handlerIn,
            out: handlerOut,
            selector: selector
        }) : $.extend(cfg, {
            over: handlerIn,
            out: handlerIn,
            selector: handlerOut
        });
        var handleHover = function (e) {
            var ev = $.extend({}, e),
                $el = $(this),
                hoverIntentData = $el.data("hoverIntent");
            hoverIntentData || $el.data("hoverIntent", hoverIntentData = {});
            var state = hoverIntentData[instanceId];
            state || (hoverIntentData[instanceId] = state = {
                id: instanceId
            }), state.timeoutId && (state.timeoutId = clearTimeout(state.timeoutId));
            var mousemove = state.event = "mousemove.hoverIntent.hoverIntent" + instanceId;
            if ("mouseenter" === e.type) {
                if (state.isActive) return;
                state.pX = ev.pageX, state.pY = ev.pageY, $el.off(mousemove, track).on(mousemove, track), state.timeoutId = setTimeout(function () {
                    compare(ev, $el, state, cfg)
                }, cfg.interval)
            } else {
                if (!state.isActive) return;
                $el.off(mousemove, track), state.timeoutId = setTimeout(function () {
                    delay(ev, $el, state, cfg.out)
                }, cfg.timeout)
            }
        };
        return this.on({
            "mouseenter.hoverIntent": handleHover,
            "mouseleave.hoverIntent": handleHover
        }, cfg.selector)
    }
});
var IASCallbacks = function (t) {
    return this.list = [], this.fireStack = [], this.isFiring = !1, this.isDisabled = !1, this.Deferred = t.Deferred, this.fire = function (t) {
        var i = t[0],
            e = t[1],
            n = t[2];
        this.isFiring = !0;
        for (var r = 0, s = this.list.length; s > r; r++)
            if (null != this.list[r] && !1 === this.list[r].fn.apply(i, n)) {
                e.reject();
                break
            } this.isFiring = !1, e.resolve(), this.fireStack.length && this.fire(this.fireStack.shift())
    }, this.inList = function (t, i) {
        for (var e = i = i || 0, n = this.list.length; n > e; e++)
            if (this.list[e].fn === t || t.guid && this.list[e].fn.guid && t.guid === this.list[e].fn.guid) return e;
        return -1
    }, this
};
IASCallbacks.prototype = {
        add: function (t, i) {
            var e = {
                fn: t,
                priority: i
            };
            i = i || 0;
            for (var n = 0, r = this.list.length; r > n; n++)
                if (i > this.list[n].priority) return this.list.splice(n, 0, e), this;
            return this.list.push(e), this
        },
        remove: function (t) {
            for (var i = 0;
                (i = this.inList(t, i)) > -1;) this.list.splice(i, 1);
            return this
        },
        has: function (t) {
            return this.inList(t) > -1
        },
        fireWith: function (t, i) {
            var e = this.Deferred();
            return this.isDisabled ? e.reject() : (i = [t, e, (i = i || []).slice ? i.slice() : i], this.isFiring ? this.fireStack.push(i) : this.fire(i), e)
        },
        disable: function () {
            this.isDisabled = !0
        },
        enable: function () {
            this.isDisabled = !1
        }
    },
    function (t) {
        "use strict";
        var i = function (i, e) {
            return this.itemsContainerSelector = e.container, this.itemSelector = e.item, this.nextSelector = e.next, this.paginationSelector = e.pagination, this.$scrollContainer = i, this.$container = window === i.get(0) ? t(document) : i, this.defaultDelay = e.delay, this.negativeMargin = e.negativeMargin, this.nextUrl = null, this.isBound = !1, this.isPaused = !1, this.isInitialized = !1, this.jsXhr = !1, this.listeners = {
                next: new IASCallbacks(t),
                load: new IASCallbacks(t),
                loaded: new IASCallbacks(t),
                render: new IASCallbacks(t),
                rendered: new IASCallbacks(t),
                scroll: new IASCallbacks(t),
                noneLeft: new IASCallbacks(t),
                ready: new IASCallbacks(t)
            }, this.extensions = [], this.scrollHandler = function () {
                if (this.isBound && !this.isPaused) {
                    var t = this.getCurrentScrollOffset(this.$scrollContainer),
                        i = this.getScrollThreshold(); - 1 != i && (this.fire("scroll", [t, i]), t >= i && this.next())
                }
            }, this.getItemsContainer = function () {
                return t(this.itemsContainerSelector, this.$container)
            }, this.getLastItem = function () {
                return t(this.itemSelector, this.getItemsContainer().get(0)).last()
            }, this.getFirstItem = function () {
                return t(this.itemSelector, this.getItemsContainer().get(0)).first()
            }, this.getScrollThreshold = function (t) {
                var i;
                return t = (t = t || this.negativeMargin) >= 0 ? -1 * t : t, 0 === (i = this.getLastItem()).length ? -1 : i.offset().top + i.height() + t
            }, this.getCurrentScrollOffset = function (t) {
                var i, e = t.height();
                return i = window === t.get(0) ? t.scrollTop() : t.offset().top, (-1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod")) && (e += 80), i + e
            }, this.getNextUrl = function (i) {
                return i = i || this.$container, t(this.nextSelector, i).last().attr("href")
            }, this.load = function (i, e, n) {
                var r, s, o = this,
                    h = [],
                    a = +new Date;
                n = n || this.defaultDelay;
                var A = {
                    url: i,
                    ajaxOptions: {
                        dataType: "html"
                    }
                };
                return o.fire("load", [A]), this.jsXhr = t.ajax(A.url, A.ajaxOptions).done(t.proxy(function (i) {
                    0 === (r = t(this.itemsContainerSelector, i).eq(0)).length && (r = t(i).filter(this.itemsContainerSelector).eq(0)), r && r.find(this.itemSelector).each(function () {
                        h.push(this)
                    }), o.fire("loaded", [i, h]), e && (s = +new Date - a, n > s ? setTimeout(function () {
                        e.call(o, i, h)
                    }, n - s) : e.call(o, i, h))
                }, o)), this.jsXhr
            }, this.render = function (i, e) {
                var n = this,
                    r = this.getLastItem(),
                    s = 0,
                    o = this.fire("render", [i]);
                o.done(function () {
                    t(i).hide(), r.after(i), t(i).fadeIn(400, function () {
                        ++s < i.length || (n.fire("rendered", [i]), e && e())
                    })
                }), o.fail(function () {
                    e && e()
                })
            }, this.hidePagination = function () {
                this.paginationSelector && t(this.paginationSelector, this.$container).hide()
            }, this.restorePagination = function () {
                this.paginationSelector && t(this.paginationSelector, this.$container).show()
            }, this.throttle = function (i, e) {
                var n, r, s = 0;
                return n = function () {
                    function t() {
                        s = +new Date, i.apply(n, o)
                    }
                    var n = this,
                        o = arguments,
                        h = +new Date - s;
                    r ? clearTimeout(r) : t(), h > e ? t() : r = setTimeout(t, e)
                }, t.guid && (n.guid = i.guid = i.guid || t.guid++), n
            }, this.fire = function (t, i) {
                return this.listeners[t].fireWith(this, i)
            }, this.pause = function () {
                this.isPaused = !0
            }, this.resume = function () {
                this.isPaused = !1
            }, this
        };
        i.prototype.initialize = function () {
            if (this.isInitialized) return !1;
            var t = !!("onscroll" in this.$scrollContainer.get(0)),
                i = this.getCurrentScrollOffset(this.$scrollContainer),
                e = this.getScrollThreshold();
            return !!t && (this.hidePagination(), this.bind(), this.nextUrl = this.getNextUrl(), this.nextUrl || this.fire("noneLeft", [this.getLastItem()]), this.nextUrl && i >= e ? (this.next(), this.one("rendered", function () {
                this.isInitialized = !0, this.fire("ready")
            })) : (this.isInitialized = !0, this.fire("ready")), this)
        }, i.prototype.reinitialize = function () {
            this.isInitialized = !1, this.unbind(), this.initialize()
        }, i.prototype.bind = function () {
            if (!this.isBound) {
                this.$scrollContainer.on("scroll", t.proxy(this.throttle(this.scrollHandler, 150), this));
                for (var i = 0, e = this.extensions.length; e > i; i++) this.extensions[i].bind(this);
                this.isBound = !0, this.resume()
            }
        }, i.prototype.unbind = function () {
            if (this.isBound) {
                this.$scrollContainer.off("scroll", this.scrollHandler);
                for (var t = 0, i = this.extensions.length; i > t; t++) void 0 !== this.extensions[t].unbind && this.extensions[t].unbind(this);
                this.isBound = !1
            }
        }, i.prototype.destroy = function () {
            try {
                this.jsXhr.abort()
            } catch (t) {}
            this.unbind(), this.$scrollContainer.data("ias", null)
        }, i.prototype.on = function (i, e, n) {
            if (void 0 === this.listeners[i]) throw new Error('There is no event called "' + i + '"');
            return n = n || 0, this.listeners[i].add(t.proxy(e, this), n), this.isInitialized && ("ready" === i ? t.proxy(e, this)() : "noneLeft" !== i || this.nextUrl || t.proxy(e, this)()), this
        }, i.prototype.one = function (t, i) {
            var e = this,
                n = function () {
                    e.off(t, i), e.off(t, n)
                };
            return this.on(t, i), this.on(t, n), this
        }, i.prototype.off = function (t, i) {
            if (void 0 === this.listeners[t]) throw new Error('There is no event called "' + t + '"');
            return this.listeners[t].remove(i), this
        }, i.prototype.next = function () {
            var t = this.nextUrl,
                i = this;
            if (!t) return !1;
            this.pause();
            var e = this.fire("next", [t]);
            return e.done(function () {
                i.load(t, function (t, e) {
                    i.render(e, function () {
                        i.nextUrl = i.getNextUrl(t), i.nextUrl || i.fire("noneLeft", [i.getLastItem()]), i.resume()
                    })
                })
            }), e.fail(function () {
                i.resume()
            }), !0
        }, i.prototype.extension = function (t) {
            if (void 0 === t.bind) throw new Error('Extension doesn\'t have required method "bind"');
            return void 0 !== t.initialize && t.initialize(this), this.extensions.push(t), this.isBound && this.reinitialize(), this
        }, t.ias = function (i) {
            var e = t(window);
            return e.ias.apply(e, arguments)
        }, t.fn.ias = function (e) {
            var n = Array.prototype.slice.call(arguments),
                r = this;
            return this.each(function () {
                var s = t(this),
                    o = s.data("ias"),
                    h = t.extend({}, t.fn.ias.defaults, s.data(), "object" == typeof e && e);
                if (o || (s.data("ias", o = new i(s, h)), h.initialize && t(document).ready(t.proxy(o.initialize, o))), "string" == typeof e) {
                    if ("function" != typeof o[e]) throw new Error('There is no method called "' + e + '"');
                    n.shift(), o[e].apply(o, n)
                }
                r = o
            }), r
        }, t.fn.ias.defaults = {
            item: ".item",
            container: ".listing",
            next: ".next",
            pagination: !1,
            delay: 600,
            negativeMargin: 10,
            initialize: !0
        }
    }(jQuery);
var IASHistoryExtension = function (t) {
    return t = jQuery.extend({}, this.defaults, t), this.ias = null, this.prevSelector = t.prev, this.prevUrl = null, this.listeners = {
        prev: new IASCallbacks(jQuery)
    }, this.onPageChange = function (t, i, e) {
        if (window.history && window.history.replaceState) {
            var n = history.state;
            try {
                var u = new URL(e);
                u.host = window.location.host, u.hostname = window.location.hostname, u.protocol = window.location.protocol, e = u.toString()
            } catch (o) {};
            history.replaceState(n, document.title, e)
        }
    }, this.onScroll = function (t, i) {
        var e = this.getScrollThresholdFirstItem();
        this.prevUrl && (e >= (t -= this.ias.$scrollContainer.height()) && this.prev())
    }, this.onReady = function () {
        var t = this.ias.getCurrentScrollOffset(this.ias.$scrollContainer);
        this.getScrollThresholdFirstItem() >= (t -= this.ias.$scrollContainer.height()) && this.prev()
    }, this.getPrevUrl = function (t) {
        return t || (t = this.ias.$container), jQuery(this.prevSelector, t).last().attr("href")
    }, this.getScrollThresholdFirstItem = function () {
        var t;
        return 0 === (t = this.ias.getFirstItem()).length ? -1 : t.offset().top
    }, this.renderBefore = function (t, i) {
        var e = this.ias,
            n = e.getFirstItem(),
            r = 0;
        e.fire("render", [t]), jQuery(t).hide(), n.before(t), jQuery(t).fadeIn(400, function () {
            ++r < t.length || (e.fire("rendered", [t]), i && i())
        })
    }, this
};
IASHistoryExtension.prototype.initialize = function (t) {
    var i = this;
    this.ias = t, jQuery.extend(t.listeners, this.listeners), t.prev = function () {
        return i.prev()
    }, this.prevUrl = this.getPrevUrl()
}, IASHistoryExtension.prototype.bind = function (t) {
    t.on("pageChange", jQuery.proxy(this.onPageChange, this)), t.on("scroll", jQuery.proxy(this.onScroll, this)), t.on("ready", jQuery.proxy(this.onReady, this))
}, IASHistoryExtension.prototype.unbind = function (t) {
    t.off("pageChange", this.onPageChange), t.off("scroll", this.onScroll), t.off("ready", this.onReady)
}, IASHistoryExtension.prototype.prev = function () {
    var t = this.prevUrl,
        i = this,
        e = this.ias;
    if (!t) return !1;
    e.pause();
    var n = e.fire("prev", [t]);
    return n.done(function () {
        e.load(t, function (t, n) {
            i.renderBefore(n, function () {
                i.prevUrl = i.getPrevUrl(t), e.resume(), i.prevUrl && i.prev()
            })
        })
    }), n.fail(function () {
        e.resume()
    }), !0
}, IASHistoryExtension.prototype.defaults = {
    prev: ".prev"
};
var IASNoneLeftExtension = function (t) {
    return t = jQuery.extend({}, this.defaults, t), this.ias = null, this.uid = (new Date).getTime(), this.html = t.html.replace("{text}", t.text), this.showNoneLeft = function () {
        var t = jQuery(this.html).attr("id", "ias_noneleft_" + this.uid);
        this.ias.getLastItem().after(t), t.fadeIn()
    }, this
};
IASNoneLeftExtension.prototype.bind = function (t) {
    this.ias = t, t.on("noneLeft", jQuery.proxy(this.showNoneLeft, this))
}, IASNoneLeftExtension.prototype.unbind = function (t) {
    t.off("noneLeft", this.showNoneLeft)
}, IASNoneLeftExtension.prototype.defaults = {
    // text: "You reached the end.",
    html: '<div class="ias-noneleft" style="text-align: center;"></div>'
};
var IASPagingExtension = function () {
    return this.ias = null, this.pagebreaks = [
        [0, document.location.toString()]
    ], this.lastPageNum = 1, this.enabled = !0, this.listeners = {
        pageChange: new IASCallbacks(jQuery)
    }, this.onScroll = function (t, i) {
        if (this.enabled) {
            var e, n = this.ias,
                r = this.getCurrentPageNum(t),
                s = this.getCurrentPagebreak(t);
            this.lastPageNum !== r && (e = s[1], n.fire("pageChange", [r, t, e])), this.lastPageNum = r
        }
    }, this.onNext = function (t) {
        var i = this.ias.getCurrentScrollOffset(this.ias.$scrollContainer);
        this.pagebreaks.push([i, t]);
        var e = this.getCurrentPageNum(i) + 1;
        this.ias.fire("pageChange", [e, i, t]), this.lastPageNum = e
    }, this.onPrev = function (t) {
        var i = this,
            e = i.ias,
            n = e.getCurrentScrollOffset(e.$scrollContainer) - e.$scrollContainer.height(),
            r = e.getFirstItem();
        this.enabled = !1, this.pagebreaks.unshift([0, t]), e.one("rendered", function () {
            for (var s = 1, o = i.pagebreaks.length; o > s; s++) i.pagebreaks[s][0] = i.pagebreaks[s][0] + r.offset().top;
            var h = i.getCurrentPageNum(n) + 1;
            e.fire("pageChange", [h, n, t]), i.lastPageNum = h, i.enabled = !0
        })
    }, this
};
IASPagingExtension.prototype.initialize = function (t) {
    this.ias = t, jQuery.extend(t.listeners, this.listeners)
}, IASPagingExtension.prototype.bind = function (t) {
    try {
        t.on("prev", jQuery.proxy(this.onPrev, this), this.priority)
    } catch (t) {}
    t.on("next", jQuery.proxy(this.onNext, this), this.priority), t.on("scroll", jQuery.proxy(this.onScroll, this), this.priority)
}, IASPagingExtension.prototype.unbind = function (t) {
    try {
        t.off("prev", this.onPrev)
    } catch (t) {}
    t.off("next", this.onNext), t.off("scroll", this.onScroll)
}, IASPagingExtension.prototype.getCurrentPageNum = function (t) {
    for (var i = this.pagebreaks.length - 1; i > 0; i--)
        if (t > this.pagebreaks[i][0]) return i + 1;
    return 1
}, IASPagingExtension.prototype.getCurrentPagebreak = function (t) {
    for (var i = this.pagebreaks.length - 1; i >= 0; i--)
        if (t > this.pagebreaks[i][0]) return this.pagebreaks[i];
    return null
}, IASPagingExtension.prototype.priority = 500;
var IASSpinnerExtension = function (t) {
    return t = jQuery.extend({}, this.defaults, t), this.ias = null, this.uid = (new Date).getTime(), this.src = t.src, this.html = t.html.replace("{src}", this.src), this.showSpinner = function () {
        var t = this.getSpinner() || this.createSpinner();
        this.ias.getLastItem().after(t), t.fadeIn()
    }, this.showSpinnerBefore = function () {
        var t = this.getSpinner() || this.createSpinner();
        this.ias.getFirstItem().before(t), t.fadeIn()
    }, this.removeSpinner = function () {
        this.hasSpinner() && this.getSpinner().remove()
    }, this.getSpinner = function () {
        var t = jQuery("#ias_spinner_" + this.uid);
        return t.length > 0 && t
    }, this.hasSpinner = function () {
        return jQuery("#ias_spinner_" + this.uid).length > 0
    }, this.createSpinner = function () {
        var t = jQuery(this.html).attr("id", "ias_spinner_" + this.uid);
        return t.hide(), t
    }, this
};
IASSpinnerExtension.prototype.bind = function (t) {
    this.ias = t, t.on("next", jQuery.proxy(this.showSpinner, this)), t.on("render", jQuery.proxy(this.removeSpinner, this));
    try {
        t.on("prev", jQuery.proxy(this.showSpinnerBefore, this))
    } catch (t) {}
}, IASSpinnerExtension.prototype.unbind = function (t) {
    t.off("next", this.showSpinner), t.off("render", this.removeSpinner);
    try {
        t.off("prev", this.showSpinnerBefore)
    } catch (t) {}
}, IASSpinnerExtension.prototype.defaults = {
    src: "data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==",
    html: '<div class="ias-spinner" style="text-align: center;"><img src="{src}"/></div>'
};
var IASTriggerExtension = function (t) {
    return t = jQuery.extend({}, this.defaults, t), this.ias = null, this.html = t.html.replace("{text}", t.text), this.htmlPrev = t.htmlPrev.replace("{text}", t.textPrev), this.enabled = !0, this.count = 0, this.offset = t.offset, this.$triggerNext = null, this.$triggerPrev = null, this.showTriggerNext = function () {
        if (!this.enabled) return !0;
        if (!1 === this.offset || ++this.count < this.offset) return !0;
        var t = this.$triggerNext || (this.$triggerNext = this.createTrigger(this.next, this.html));
        return this.ias.getLastItem().after(t), t.fadeIn(), !1
    }, this.showTriggerPrev = function () {
        if (!this.enabled) return !0;
        var t = this.$triggerPrev || (this.$triggerPrev = this.createTrigger(this.prev, this.htmlPrev));
        return this.ias.getFirstItem().before(t), t.fadeIn(), !1
    }, this.onRendered = function () {
        this.enabled = !0
    }, this.createTrigger = function (t, i) {
        var e, n = (new Date).getTime();
        return i = i || this.html, (e = jQuery(i).attr("id", "ias_trigger_" + n)).hide(), e.on("click", jQuery.proxy(t, this)), e
    }, this
};
IASTriggerExtension.prototype.bind = function (t) {
    this.ias = t, t.on("next", jQuery.proxy(this.showTriggerNext, this), this.priority), t.on("rendered", jQuery.proxy(this.onRendered, this), this.priority);
    try {
        t.on("prev", jQuery.proxy(this.showTriggerPrev, this), this.priority)
    } catch (t) {}
}, IASTriggerExtension.prototype.unbind = function (t) {
    this.$triggerNext = null, this.$triggerPrev = null, this.count = 0, t.off("next", this.showTriggerNext), t.off("rendered", this.onRendered);
    try {
        t.off("prev", this.showTriggerPrev)
    } catch (t) {}
}, IASTriggerExtension.prototype.next = function () {
    this.enabled = !1, this.ias.pause(), this.$triggerNext && (this.$triggerNext.remove(), this.$triggerNext = null), this.ias.next()
}, IASTriggerExtension.prototype.prev = function () {
    this.enabled = !1, this.ias.pause(), this.$triggerPrev && (this.$triggerPrev.remove(), this.$triggerPrev = null), this.ias.prev()
}, IASTriggerExtension.prototype.defaults = {
    text: "Load more items",
    html: '<div class="ias-trigger ias-trigger-next" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',
    textPrev: "Load previous items",
    htmlPrev: '<div class="ias-trigger ias-trigger-prev" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',
    offset: 0
}, IASTriggerExtension.prototype.priority = 1e3;;
(function (factory) {
    var registeredInModuleLoader;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            if (typeof document === 'undefined') {
                return;
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
                }
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                try {
                    var result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var stringifiedAttributes = '';
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }
            var jar = {};
            var decode = function (s) {
                return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
            };
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');
                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    var name = decode(parts[0]);
                    cookie = (converter.read || converter)(cookie, name) || decode(cookie);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }
                    jar[name] = cookie;
                    if (key === name) {
                        break;
                    }
                } catch (e) {}
            }
            return key ? jar[key] : jar;
        }
        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, arguments);
        };
        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };
        api.defaults = {};
        api.withConverter = init;
        return api;
    }
    return init(function () {});
}));
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function () {
    "use strict";
    var f = "undefined" == typeof document ? {
            body: {},
            addEventListener: function () {},
            removeEventListener: function () {},
            activeElement: {
                blur: function () {},
                nodeName: ""
            },
            querySelector: function () {
                return null
            },
            querySelectorAll: function () {
                return []
            },
            getElementById: function () {
                return null
            },
            createEvent: function () {
                return {
                    initEvent: function () {}
                }
            },
            createElement: function () {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function () {},
                    getElementsByTagName: function () {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        B = "undefined" == typeof window ? {
            document: f,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function () {
                return this
            },
            addEventListener: function () {},
            removeEventListener: function () {},
            getComputedStyle: function () {
                return {
                    getPropertyValue: function () {
                        return ""
                    }
                }
            },
            Image: function () {},
            Date: function () {},
            screen: {},
            setTimeout: function () {},
            clearTimeout: function () {}
        } : window,
        l = function (e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return this.length = e.length, this
        };

    function L(e, t) {
        var a = [],
            i = 0;
        if (e && !t && e instanceof l) return e;
        if (e)
            if ("string" == typeof e) {
                var s, r, n = e.trim();
                if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
                    var o = "div";
                    for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i])
                } else
                    for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i])
            } else if (e.nodeType || e === B || e === f) a.push(e);
        else if (0 < e.length && e[0].nodeType)
            for (i = 0; i < e.length; i += 1) a.push(e[i]);
        return new l(a)
    }

    function r(e) {
        for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
        return t
    }
    L.fn = l.prototype, L.Class = l, L.Dom7 = l;
    var t = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
            return this
        },
        removeClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
            return this
        },
        hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1)
                for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
            return this
        },
        attr: function (e, t) {
            var a = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === a.length) this[i].setAttribute(e, t);
                else
                    for (var s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
            return this
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function (e, t) {
            var a;
            if (void 0 !== t) {
                for (var i = 0; i < this.length; i += 1)(a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
                return this
            }
            if (a = this[0]) {
                if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
                var s = a.getAttribute("data-" + e);
                return s || void 0
            }
        },
        transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransform = e, a.transform = e
            }
            return this
        },
        transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransitionDuration = e, a.transitionDuration = e
            }
            return this
        },
        on: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0],
                r = t[1],
                n = t[2],
                s = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a);
                    else
                        for (var i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
            }
            "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1);
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
                            listener: n,
                            proxyListener: o
                        }), u.addEventListener(h, o, s)
                    } else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
                                listener: n,
                                proxyListener: l
                            }), u.addEventListener(v, l, s)
                        }
            }
            return this
        },
        off: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var c = this[p],
                        u = void 0;
                    if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
                        for (var h = u.length - 1; 0 <= h; h -= 1) {
                            var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1)
                for (var r = a[s], n = 0; n < this.length; n += 1) {
                    var o = this[n],
                        l = void 0;
                    try {
                        l = new B.CustomEvent(r, {
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i
                    }
                    o.dom7EventData = e.filter(function (e, t) {
                        return 0 < t
                    }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
                }
            return this
        },
        transitionEnd: function (t) {
            var a, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function r(e) {
                if (e.target === this)
                    for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r)
            }
            if (t)
                for (a = 0; a < i.length; a += 1) s.on(i[a], r);
            return this
        },
        outerWidth: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function () {
            if (0 < this.length) {
                var e = this[0],
                    t = e.getBoundingClientRect(),
                    a = f.body,
                    i = e.clientTop || a.clientTop || 0,
                    s = e.clientLeft || a.clientLeft || 0,
                    r = e === B ? B.scrollY : e.scrollTop,
                    n = e === B ? B.scrollX : e.scrollLeft;
                return {
                    top: t.top + r - i,
                    left: t.left + n - s
                }
            }
            return null
        },
        css: function (e, t) {
            var a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var i in e) this[a].style[i] = e[i];
                    return this
                }
                if (this[0]) return B.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function (e) {
            var t, a, i = this[0];
            if (!i || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (i.matches) return i.matches(e);
                if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector) return i.msMatchesSelector(e);
                for (t = L(e), a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1
            }
            if (e === f) return i === f;
            if (e === B) return i === B;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                    if (t[a] === i) return !0;
                return !1
            }
            return !1
        },
        index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            var t, a = this.length;
            return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            for (var i = 0; i < t.length; i += 1) {
                e = t[i];
                for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        var r = f.createElement("div");
                        for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild)
                    } else if (e instanceof l)
                    for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
                else this[s].appendChild(e)
            }
            return this
        },
        prepend: function (e) {
            var t, a, i = this;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = f.createElement("div");
                    for (s.innerHTML = e, a = s.childNodes.length - 1; 0 <= a; a -= 1) i[t].insertBefore(s.childNodes[a], i[t].childNodes[0])
                } else if (e instanceof l)
                for (a = 0; a < e.length; a += 1) i[t].insertBefore(e[a], i[t].childNodes[0]);
            else i[t].insertBefore(e, i[t].childNodes[0]);
            return this
        },
        next: function (e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        },
        nextAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new l([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        },
        prev: function (e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        },
        prevAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new l([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        },
        parent: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return L(r(t))
        },
        parents: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
            return L(r(t))
        },
        closest: function (e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
            return new l(t)
        },
        children: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
            return new l(r(t))
        },
        remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var a, i;
            for (a = 0; a < e.length; a += 1) {
                var s = L(e[a]);
                for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1
            }
            return this
        },
        styles: function () {
            return this[0] ? B.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function (e) {
        L.fn[e] = t[e]
    });
    var e, a, i, X = {
            deleteProps: function (e) {
                var t = e;
                Object.keys(t).forEach(function (e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: function (e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function () {
                return Date.now()
            },
            getTranslate: function (e, t) {
                var a, i, s;
                void 0 === t && (t = "x");
                var r = B.getComputedStyle(e, null);
                return B.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function (e) {
                    return e.replace(",", ".")
                }).join(", ")), s = new B.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = B.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = B.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
            },
            parseUrlQuery: function (e) {
                var t, a, i, s, r = {},
                    n = e || B.location.href;
                if ("string" == typeof n && n.length)
                    for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                            return "" !== e
                        })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
                return r
            },
            isObject: function (e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function () {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                    var s = e[i];
                    if (null != s)
                        for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                            var l = r[n],
                                d = Object.getOwnPropertyDescriptor(s, l);
                            void 0 !== d && d.enumerable && (X.isObject(a[l]) && X.isObject(s[l]) ? X.extend(a[l], s[l]) : !X.isObject(a[l]) && X.isObject(s[l]) ? (a[l] = {}, X.extend(a[l], s[l])) : a[l] = s[l])
                        }
                }
                return a
            }
        },
        Y = (i = f.createElement("div"), {
            touch: B.Modernizr && !0 === B.Modernizr.touch || !!("ontouchstart" in B || B.DocumentTouch && f instanceof B.DocumentTouch),
            pointerEvents: !(!B.navigator.pointerEnabled && !B.PointerEvent),
            prefixedPointerEvents: !!B.navigator.msPointerEnabled,
            transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a),
            transforms3d: B.Modernizr && !0 === B.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
            flexbox: function () {
                for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                    if (t[a] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in B || "WebkitMutationObserver" in B,
            passiveListener: function () {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0
                        }
                    });
                    B.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in B
        }),
        s = function (e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
                t.on(e, t.params.on[e])
            })
        },
        n = {
            components: {
                configurable: !0
            }
        };
    s.prototype.on = function (e, t, a) {
        var i = this;
        if ("function" != typeof t) return i;
        var s = a ? "unshift" : "push";
        return e.split(" ").forEach(function (e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
        }), i
    }, s.prototype.once = function (i, s, e) {
        var r = this;
        if ("function" != typeof s) return r;
        return r.on(i, function e() {
            for (var t = [], a = arguments.length; a--;) t[a] = arguments[a];
            s.apply(r, t), r.off(i, e)
        }, e)
    }, s.prototype.off = function (e, i) {
        var s = this;
        return s.eventsListeners && e.split(" ").forEach(function (a) {
            void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a].forEach(function (e, t) {
                e === i && s.eventsListeners[a].splice(t, 1)
            })
        }), s
    }, s.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var a, i, s, r = this;
        return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), s = r) : (a = e[0].events, i = e[0].data, s = e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function (e) {
                    t.push(e)
                }), t.forEach(function (e) {
                    e.apply(s, i)
                })
            }
        })), r
    }, s.prototype.useModulesParams = function (a) {
        var i = this;
        i.modules && Object.keys(i.modules).forEach(function (e) {
            var t = i.modules[e];
            t.params && X.extend(a, t.params)
        })
    }, s.prototype.useModules = function (i) {
        void 0 === i && (i = {});
        var s = this;
        s.modules && Object.keys(s.modules).forEach(function (e) {
            var a = s.modules[e],
                t = i[e] || {};
            a.instance && Object.keys(a.instance).forEach(function (e) {
                var t = a.instance[e];
                s[e] = "function" == typeof t ? t.bind(s) : t
            }), a.on && s.on && Object.keys(a.on).forEach(function (e) {
                s.on(e, a.on[e])
            }), a.create && a.create.bind(s)(t)
        })
    }, n.components.set = function (e) {
        this.use && this.use(e)
    }, s.installModule = function (t) {
        for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1];
        var i = this;
        i.prototype.modules || (i.prototype.modules = {});
        var s = t.name || Object.keys(i.prototype.modules).length + "_" + X.now();
        return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function (e) {
            i.prototype[e] = t.proto[e]
        }), t.static && Object.keys(t.static).forEach(function (e) {
            i[e] = t.static[e]
        }), t.install && t.install.apply(i, e), i
    }, s.use = function (e) {
        for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1];
        var i = this;
        return Array.isArray(e) ? (e.forEach(function (e) {
            return i.installModule(e)
        }), i) : i.installModule.apply(i, [e].concat(t))
    }, Object.defineProperties(s, n);
    var o = {
        updateSize: function () {
            var e, t, a = this,
                i = a.$el;
            e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), X.extend(a, {
                width: e,
                height: t,
                size: a.isHorizontal() ? e : t
            }))
        },
        updateSlides: function () {
            var e = this,
                t = e.params,
                a = e.$wrapperEl,
                i = e.size,
                s = e.rtlTranslate,
                r = e.wrongRTL,
                n = e.virtual && t.virtual.enabled,
                o = n ? e.virtual.slides.length : e.slides.length,
                l = a.children("." + e.params.slideClass),
                d = n ? e.virtual.slides.length : l.length,
                p = [],
                c = [],
                u = [],
                h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length,
                m = e.snapGrid.length,
                g = t.spaceBetween,
                b = -h,
                w = 0,
                y = 0;
            if (void 0 !== i) {
                var x, E;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var T, S = t.slidesPerColumn, C = x / S, M = C - (t.slidesPerColumn * C - d), z = 0; z < d; z += 1) {
                    E = 0;
                    var k = l.eq(z);
                    if (1 < t.slidesPerColumn) {
                        var P = void 0,
                            $ = void 0,
                            L = void 0;
                        "column" === t.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), P = $ + L * x / S, k.css({
                            "-webkit-box-ordinal-group": P,
                            "-moz-box-ordinal-group": P,
                            "-ms-flex-order": P,
                            "-webkit-order": P,
                            order: P
                        })) : $ = z - (L = Math.floor(z / C)) * C, k.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
                    }
                    if ("none" !== k.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var I = B.getComputedStyle(k[0], null),
                                D = k[0].style.transform,
                                O = k[0].style.webkitTransform;
                            D && (k[0].style.transform = "none"), O && (k[0].style.webkitTransform = "none"), E = e.isHorizontal() ? k[0].getBoundingClientRect().width + parseFloat(I.getPropertyValue("margin-left")) + parseFloat(I.getPropertyValue("margin-right")) : k[0].getBoundingClientRect().height + parseFloat(I.getPropertyValue("margin-top")) + parseFloat(I.getPropertyValue("margin-bottom")), D && (k[0].style.transform = D), O && (k[0].style.webkitTransform = O), t.roundLengths && (E = Math.floor(E))
                        } else E = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (E = Math.floor(E)), l[z] && (e.isHorizontal() ? l[z].style.width = E + "px" : l[z].style.height = E + "px");
                        l[z] && (l[z].swiperSlideSize = E), u.push(E), t.centeredSlides ? (b = b + E / 2 + w / 2 + g, 0 === w && 0 !== z && (b = b - i / 2 - g), 0 === z && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + E + g), e.virtualSize += E + g, w = E, y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }), Y.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : a.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    })), 1 < t.slidesPerColumn && (e.virtualSize = (E + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : a.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    }), t.centeredSlides)) {
                    T = [];
                    for (var A = 0; A < p.length; A += 1) {
                        var H = p[A];
                        t.roundLengths && (H = Math.floor(H)), p[A] < e.virtualSize + p[0] && T.push(H)
                    }
                    p = T
                }
                if (!t.centeredSlides) {
                    T = [];
                    for (var G = 0; G < p.length; G += 1) {
                        var N = p[G];
                        t.roundLengths && (N = Math.floor(N)), p[G] <= e.virtualSize - i && T.push(N)
                    }
                    p = T, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
                }
                0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
                    marginLeft: g + "px"
                }) : l.css({
                    marginRight: g + "px"
                }) : l.css({
                    marginBottom: g + "px"
                })), X.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function (e) {
            var t, a = this,
                i = [],
                s = 0;
            if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView)
                for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                    var r = a.activeIndex + t;
                    if (r > a.slides.length) break;
                    i.push(a.slides.eq(r)[0])
                } else i.push(a.slides.eq(a.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var n = i[t].offsetHeight;
                    s = s < n ? n : s
                } s && a.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                a = t.params,
                i = t.slides,
                s = t.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                s && (r = e), i.removeClass(a.slideVisibleClass);
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                    if (a.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset),
                            p = d + t.slidesSizesGrid[n];
                        (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && i.eq(n).addClass(a.slideVisibleClass)
                    }
                    o.progress = s ? -l : l
                }
            }
        },
        updateProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                a = t.params,
                i = t.maxTranslate() - t.minTranslate(),
                s = t.progress,
                r = t.isBeginning,
                n = t.isEnd,
                o = r,
                l = n;
            0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, n = 1 <= s), X.extend(t, {
                progress: s,
                isBeginning: r,
                isEnd: n
            }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s)
        },
        updateSlidesClasses: function () {
            var e, t = this,
                a = t.slides,
                i = t.params,
                s = t.$wrapperEl,
                r = t.activeIndex,
                n = t.realIndex,
                o = t.virtual && i.virtual.enabled;
            a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
            var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
            var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function (e) {
            var t, a = this,
                i = a.rtlTranslate ? a.translate : -a.translate,
                s = a.slidesGrid,
                r = a.snapGrid,
                n = a.params,
                o = a.activeIndex,
                l = a.realIndex,
                d = a.snapIndex,
                p = e;
            if (void 0 === p) {
                for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
                var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                X.extend(a, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: p
                }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), a.emit("slideChange")
            } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
        },
        updateClickedSlide: function (e) {
            var t = this,
                a = t.params,
                i = L(e.target).closest("." + a.slideClass)[0],
                s = !1;
            if (i)
                for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
            if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
            t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var d = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                a = this.rtlTranslate,
                i = this.translate,
                s = this.$wrapperEl;
            if (t.virtualTranslate) return a ? -i : i;
            var r = X.getTranslate(s[0], e);
            return a && (r = -r), r || 0
        },
        setTranslate: function (e, t) {
            var a = this,
                i = a.rtlTranslate,
                s = a.params,
                r = a.$wrapperEl,
                n = a.progress,
                o = 0,
                l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (Y.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
            var d = a.maxTranslate() - a.minTranslate();
            (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
        },
        minTranslate: function () {
            return -this.snapGrid[0]
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var p = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var a = this,
                i = a.activeIndex,
                s = a.params,
                r = a.previousIndex;
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
                if ("reset" === n) return void a.emit("slideResetTransitionStart");
                a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var a = this,
                i = a.activeIndex,
                s = a.previousIndex;
            a.animating = !1, a.setTransition(0);
            var r = t;
            if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
                if ("reset" === r) return void a.emit("slideResetTransitionEnd");
                a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
            }
        }
    };
    var c = {
        slideTo: function (e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = this,
                r = e;
            r < 0 && (r = 0);
            var n = s.params,
                o = s.snapGrid,
                l = s.slidesGrid,
                d = s.previousIndex,
                p = s.activeIndex,
                c = s.rtlTranslate;
            if (s.animating && n.preventInteractionOnTransition) return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
            var h, v = -o[u];
            if (s.updateProgress(v), n.normalizeSlideIndex)
                for (var f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
            if (s.initialized && r !== p) {
                if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
                if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1
            }
            return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && Y.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h))
            }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0)
        },
        slideToLoop: function (e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
        },
        slideNext: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.params,
                r = i.animating;
            return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
        },
        slidePrev: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.params,
                r = i.animating,
                n = i.snapGrid,
                o = i.slidesGrid,
                l = i.rtlTranslate;
            if (s.loop) {
                if (r) return !1;
                i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
            }

            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var p, c = d(l ? i.translate : -i.translate),
                u = n.map(function (e) {
                    return d(e)
                }),
                h = (o.map(function (e) {
                    return d(e)
                }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a)
        },
        slideReset: function (e, t, a) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
        },
        slideToClosest: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this,
                s = i.activeIndex,
                r = Math.floor(s / i.params.slidesPerGroup);
            if (r < i.snapGrid.length - 1) {
                var n = i.rtlTranslate ? i.translate : -i.translate,
                    o = i.snapGrid[r];
                (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
            }
            return i.slideTo(s, e, t, a)
        },
        slideToClickedSlide: function () {
            var e, t = this,
                a = t.params,
                i = t.$wrapperEl,
                s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
                r = t.clickedIndex;
            if (a.loop) {
                if (t.animating) return;
                e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), X.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), X.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r)
            } else t.slideTo(r)
        }
    };
    var u = {
        loopCreate: function () {
            var i = this,
                e = i.params,
                t = i.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var s = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
                if (a !== e.slidesPerGroup) {
                    for (var r = 0; r < a; r += 1) {
                        var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(n)
                    }
                    s = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
            var o = [],
                l = [];
            s.each(function (e, t) {
                var a = L(t);
                e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function () {
            var e, t = this,
                a = t.params,
                i = t.activeIndex,
                s = t.slides,
                r = t.loopedSlides,
                n = t.allowSlidePrev,
                o = t.allowSlideNext,
                l = t.snapGrid,
                d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var p = -l[i] - t.getTranslate();
            i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = n, t.allowSlideNext = o
        },
        loopDestroy: function () {
            var e = this.$wrapperEl,
                t = this.params,
                a = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), a.removeAttr("data-swiper-slide-index")
        }
    };
    var h = {
        setGrabCursor: function (e) {
            if (!(Y.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function () {
            Y.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var v = {
            appendSlide: function (e) {
                var t = this,
                    a = t.$wrapperEl,
                    i = t.params;
                if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
                else a.append(e);
                i.loop && t.loopCreate(), i.observer && Y.observer || t.update()
            },
            prependSlide: function (e) {
                var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && t.loopDestroy();
                var r = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                    r = s + e.length
                } else i.prepend(e);
                a.loop && t.loopCreate(), a.observer && Y.observer || t.update(), t.slideTo(r, 0, !1)
            },
            addSlide: function (e, t) {
                var a = this,
                    i = a.$wrapperEl,
                    s = a.params,
                    r = a.activeIndex;
                s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
                var n = a.slides.length;
                if (e <= 0) a.prependSlide(t);
                else if (n <= e) a.appendSlide(t);
                else {
                    for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
                        var p = a.slides.eq(d);
                        p.remove(), l.unshift(p)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                        o = e < r ? r + t.length : r
                    } else i.append(t);
                    for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                    s.loop && a.loopCreate(), s.observer && Y.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
                }
            },
            removeSlide: function (e) {
                var t = this,
                    a = t.params,
                    i = t.$wrapperEl,
                    s = t.activeIndex;
                a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
                var r, n = s;
                if ("object" == typeof e && "length" in e) {
                    for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                    n = Math.max(n, 0)
                } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
                a.loop && t.loopCreate(), a.observer && Y.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
            },
            removeAllSlides: function () {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        m = function () {
            var e = B.navigator.userAgent,
                t = {
                    ios: !1,
                    android: !1,
                    androidChrome: !1,
                    desktop: !1,
                    windows: !1,
                    iphone: !1,
                    ipod: !1,
                    ipad: !1,
                    cordova: B.cordova || B.phonegap,
                    phonegap: B.cordova || B.phonegap
                },
                a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                s = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
                var o = t.osVersion.split("."),
                    l = f.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
            }
            return t.pixelRatio = B.devicePixelRatio || 1, t
        }();

    function g() {
        var e = this,
            t = e.params,
            a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    var b = {
        attachEvents: function () {
            var e = this,
                t = e.params,
                a = e.touchEvents,
                i = e.el,
                s = e.wrapperEl;
            e.onTouchStart = function (e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches;
                if (!t.animating || !i.preventInteractionOnTransition) {
                    var r = e;
                    if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && (!a.isTouched || !a.isMoved))
                        if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;
                        else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
                        s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                        var n = s.currentX,
                            o = s.currentY,
                            l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                            d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                        if (!l || !(n <= d || n >= B.screen.width - d)) {
                            if (X.extend(a, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }), s.startX = n, s.startY = o, a.touchStartTime = X.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                                var p = !0;
                                L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur(), p && t.allowTouchMove && r.preventDefault()
                            }
                            t.emit("touchStart", r)
                        }
                    }
                }
            }.bind(e), e.onTouchMove = function (e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches,
                    r = t.rtlTranslate,
                    n = e;
                if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
                    if (!a.isTouchEvent || "mousemove" !== n.type) {
                        var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                            l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                        if (n.preventedByNestedSwiper) return s.startX = o, void(s.startY = l);
                        if (!t.allowTouchMove) return t.allowClick = !1, void(a.isTouched && (X.extend(s, {
                            startX: o,
                            startY: l,
                            currentX: o,
                            currentY: l
                        }), a.touchStartTime = X.now()));
                        if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                            if (t.isVertical()) {
                                if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1)
                            } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
                        if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void(t.allowClick = !1);
                        if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                            s.currentX = o, s.currentY = l;
                            var d, p = s.currentX - s.startX,
                                c = s.currentY - s.startY;
                            if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                                if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                                else if (a.startMoving) {
                                t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                                var u = t.isHorizontal() ? p : c;
                                s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                                var h = !0,
                                    v = i.resistanceRatio;
                                if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                                    if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate);
                                    if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                }
                                i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                    position: s[t.isHorizontal() ? "startX" : "startY"],
                                    time: a.touchStartTime
                                }), a.velocities.push({
                                    position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                    time: X.now()
                                })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate))
                            }
                        }
                    }
                } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
            }.bind(e), e.onTouchEnd = function (e) {
                var t = this,
                    a = t.touchEventsData,
                    i = t.params,
                    s = t.touches,
                    r = t.rtlTranslate,
                    n = t.$wrapperEl,
                    o = t.slidesGrid,
                    l = t.snapGrid,
                    d = e;
                if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
                i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                var p, c = X.now(),
                    u = c - a.touchStartTime;
                if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = X.nextTick(function () {
                        t && !t.destroyed && t.emit("click", d)
                    }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = X.now(), X.nextTick(function () {
                        t.destroyed || (t.allowClick = !0)
                    }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
                if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
                    if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                    if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                    if (i.freeModeMomentum) {
                        if (1 < a.velocities.length) {
                            var h = a.velocities.pop(),
                                v = a.velocities.pop(),
                                f = h.position - v.position,
                                m = h.time - v.time;
                            t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < X.now() - h.time) && (t.velocity = 0)
                        } else t.velocity = 0;
                        t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                        var g = 1e3 * i.freeModeMomentumRatio,
                            b = t.velocity * g,
                            w = t.translate + b;
                        r && (w = -w);
                        var y, x, E = !1,
                            T = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                        if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -T && (w = t.maxTranslate() - T), y = t.maxTranslate(), E = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);
                        else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > T && (w = t.minTranslate() + T), y = t.minTranslate(), E = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);
                        else if (i.freeModeSticky) {
                            for (var S, C = 0; C < l.length; C += 1)
                                if (l[C] > -w) {
                                    S = C;
                                    break
                                } w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                        }
                        if (x && t.once("transitionEnd", function () {
                                t.loopFix()
                            }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                        else if (i.freeModeSticky) return void t.slideToClosest();
                        i.freeModeMomentumBounce && E ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
                            t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function () {
                                t && !t.destroyed && t.transitionEnd()
                            }))
                        })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
                            t && !t.destroyed && t.transitionEnd()
                        }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                    } else if (i.freeModeSticky) return void t.slideToClosest();
                    (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                } else {
                    for (var M = 0, z = t.slidesSizesGrid[0], k = 0; k < o.length; k += i.slidesPerGroup) void 0 !== o[k + i.slidesPerGroup] ? p >= o[k] && p < o[k + i.slidesPerGroup] && (z = o[(M = k) + i.slidesPerGroup] - o[k]) : p >= o[k] && (M = k, z = o[o.length - 1] - o[o.length - 2]);
                    var P = (p - o[M]) / z;
                    if (u > i.longSwipesMs) {
                        if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (P >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (P > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                    } else {
                        if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
                    }
                }
            }.bind(e), e.onClick = function (e) {
                this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }.bind(e);
            var r = "container" === t.touchEventsTarget ? i : s,
                n = !!t.nested;
            if (Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents) {
                if (Y.touch) {
                    var o = !("touchstart" !== a.start || !Y.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, Y.passiveListener ? {
                        passive: !1,
                        capture: n
                    } : n), r.addEventListener(a.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !Y.touch && m.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1))
            } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g, !0)
        },
        detachEvents: function () {
            var e = this,
                t = e.params,
                a = e.touchEvents,
                i = e.el,
                s = e.wrapperEl,
                r = "container" === t.touchEventsTarget ? i : s,
                n = !!t.nested;
            if (Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents) {
                if (Y.touch) {
                    var o = !("onTouchStart" !== a.start || !Y.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !Y.touch && m.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1))
            } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g)
        }
    };
    var w, y = {
            setBreakpoint: function () {
                var e = this,
                    t = e.activeIndex,
                    a = e.initialized,
                    i = e.loopedSlides;
                void 0 === i && (i = 0);
                var s = e.params,
                    r = s.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var n = e.getBreakpoint(r);
                    if (n && e.currentBreakpoint !== n) {
                        var o = n in r ? r[n] : e.originalParams,
                            l = s.loop && o.slidesPerView !== s.slidesPerView;
                        X.extend(e.params, o), X.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = n, l && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
                    }
                }
            },
            getBreakpoint: function (e) {
                if (e) {
                    var t = !1,
                        a = [];
                    Object.keys(e).forEach(function (e) {
                        a.push(e)
                    }), a.sort(function (e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    });
                    for (var i = 0; i < a.length; i += 1) {
                        var s = a[i];
                        s >= B.innerWidth && !t && (t = s)
                    }
                    return t || "max"
                }
            }
        },
        I = {
            isIE: !!B.navigator.userAgent.match(/Trident/g) || !!B.navigator.userAgent.match(/MSIE/g),
            isSafari: (w = B.navigator.userAgent.toLowerCase(), 0 <= w.indexOf("safari") && w.indexOf("chrome") < 0 && w.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(B.navigator.userAgent)
        };
    var x = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        },
        E = {
            update: o,
            translate: d,
            transition: p,
            slide: c,
            loop: u,
            grabCursor: h,
            manipulation: v,
            events: b,
            breakpoints: y,
            checkOverflow: {
                checkOverflow: function () {
                    var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function () {
                    var t = this.classNames,
                        a = this.params,
                        e = this.rtl,
                        i = this.$el,
                        s = [];
                    s.push(a.direction), a.freeMode && s.push("free-mode"), Y.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), m.android && s.push("android"), m.ios && s.push("ios"), I.isIE && (Y.pointerEvents || Y.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function (e) {
                        t.push(a.containerModifierClass + e)
                    }), i.addClass(t.join(" "))
                },
                removeClasses: function () {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function (e, t, a, i, s, r) {
                    var n;

                    function o() {
                        r && r()
                    }
                    e.complete && s ? o() : t ? ((n = new B.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o()
                },
                preloadImages: function () {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        T = {},
        S = function (u) {
            function h() {
                for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0], s = e[1]), s || (s = {}), s = X.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(E).forEach(function (t) {
                    Object.keys(E[t]).forEach(function (e) {
                        h.prototype[e] || (h.prototype[e] = E[t][e])
                    })
                });
                var r = this;
                void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function (e) {
                    var t = r.modules[e];
                    if (t.params) {
                        var a = Object.keys(t.params)[0],
                            i = t.params[a];
                        if ("object" != typeof i) return;
                        if (!(a in s && "enabled" in i)) return;
                        !0 === s[a] && (s[a] = {
                            enabled: !0
                        }), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {
                            enabled: !1
                        })
                    }
                });
                var n = X.extend({}, x);
                r.useModulesParams(n), r.params = X.extend({}, n, T, s), r.originalParams = X.extend({}, r.params), r.passedParams = X.extend({}, s);
                var o = (r.$ = L)(r.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function (e, t) {
                            var a = X.extend({}, s, {
                                el: t
                            });
                            l.push(new h(a))
                        }), l
                    }
                    t.swiper = r, o.data("swiper", r);
                    var d, p, c = o.children("." + r.params.wrapperClass);
                    return X.extend(r, {
                        $el: o,
                        el: t,
                        $wrapperEl: c,
                        wrapperEl: c[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === r.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === r.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === c.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: r.params.allowSlideNext,
                        allowSlidePrev: r.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], Y.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : Y.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, r.touchEventsDesktop = {
                            start: p[0],
                            move: p[1],
                            end: p[2]
                        }, Y.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: X.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: r.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), r.useModules(), r.params.init && r.init(), r
                }
            }
            u && (h.__proto__ = u);
            var e = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function () {
                var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
                    for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0))
                } else
                    for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
                return n
            }, h.prototype.update = function () {
                var a = this;
                if (a && !a.destroyed) {
                    var e = a.snapGrid,
                        t = a.params;
                    t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update")
                }

                function i() {
                    var e = a.rtlTranslate ? -1 * a.translate : a.translate,
                        t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                    a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses()
                }
            }, h.prototype.init = function () {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, h.prototype.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a = this,
                    i = a.params,
                    s = a.$el,
                    r = a.$wrapperEl,
                    n = a.slides;
                return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function (e) {
                    a.off(e)
                }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), X.deleteProps(a)), a.destroyed = !0), null
            }, h.extendDefaults = function (e) {
                X.extend(T, e)
            }, e.extendedDefaults.get = function () {
                return T
            }, e.defaults.get = function () {
                return x
            }, e.Class.get = function () {
                return u
            }, e.$.get = function () {
                return L
            }, Object.defineProperties(h, e), h
        }(s),
        C = {
            name: "device",
            proto: {
                device: m
            },
            static: {
                device: m
            }
        },
        M = {
            name: "support",
            proto: {
                support: Y
            },
            static: {
                support: Y
            }
        },
        z = {
            name: "browser",
            proto: {
                browser: I
            },
            static: {
                browser: I
            }
        },
        k = {
            name: "resize",
            create: function () {
                var e = this;
                X.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function () {
                    B.addEventListener("resize", this.resize.resizeHandler), B.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function () {
                    B.removeEventListener("resize", this.resize.resizeHandler), B.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        },
        P = {
            func: B.MutationObserver || B.WebkitMutationObserver,
            attach: function (e, t) {
                void 0 === t && (t = {});
                var a = this,
                    i = new P.func(function (e) {
                        if (1 !== e.length) {
                            var t = function () {
                                a.emit("observerUpdate", e[0])
                            };
                            B.requestAnimationFrame ? B.requestAnimationFrame(t) : B.setTimeout(t, 0)
                        } else a.emit("observerUpdate", e[0])
                    });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.observer.observers.push(i)
            },
            init: function () {
                var e = this;
                if (Y.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: !1
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        },
        $ = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1
            },
            create: function () {
                X.extend(this, {
                    observer: {
                        init: P.init.bind(this),
                        attach: P.attach.bind(this),
                        destroy: P.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                },
                destroy: function () {
                    this.observer.destroy()
                }
            }
        },
        D = {
            update: function (e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.virtual,
                    o = n.from,
                    l = n.to,
                    d = n.slides,
                    p = n.slidesGrid,
                    c = n.renderSlide,
                    u = n.offset;
                t.updateActiveIndex();
                var h, v, f, m = t.activeIndex || 0;
                h = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (v = Math.floor(i / 2) + s, f = Math.floor(i / 2) + s) : (v = i + (s - 1), f = s);
                var g = Math.max((m || 0) - f, 0),
                    b = Math.min((m || 0) + v, d.length - 1),
                    w = (t.slidesGrid[g] || 0) - (t.slidesGrid[0] || 0);

                function y() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (X.extend(t.virtual, {
                        from: g,
                        to: b,
                        offset: w,
                        slidesGrid: t.slidesGrid
                    }), o === g && l === b && !e) return t.slidesGrid !== p && w !== u && t.slides.css(h, w + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: w,
                    from: g,
                    to: b,
                    slides: function () {
                        for (var e = [], t = g; t <= b; t += 1) e.push(d[t]);
                        return e
                    }()
                }), void y();
                var x = [],
                    E = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var T = o; T <= l; T += 1)(T < g || b < T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + T + '"]').remove();
                for (var S = 0; S < d.length; S += 1) g <= S && S <= b && (void 0 === l || e ? E.push(S) : (l < S && E.push(S), S < o && x.push(S)));
                E.forEach(function (e) {
                    t.$wrapperEl.append(c(d[e], e))
                }), x.sort(function (e, t) {
                    return e < t
                }).forEach(function (e) {
                    t.$wrapperEl.prepend(c(d[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(h, w + "px"), y()
            },
            renderSlide: function (e, t) {
                var a = this,
                    i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            },
            appendSlide: function (e) {
                this.virtual.slides.push(e), this.virtual.update(!0)
            },
            prependSlide: function (e) {
                var t = this;
                if (t.virtual.slides.unshift(e), t.params.virtual.cache) {
                    var a = t.virtual.cache,
                        i = {};
                    Object.keys(a).forEach(function (e) {
                        i[e + 1] = a[e]
                    }), t.virtual.cache = i
                }
                t.virtual.update(!0), t.slideNext(0)
            }
        },
        O = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    virtual: {
                        update: D.update.bind(e),
                        appendSlide: D.appendSlide.bind(e),
                        prependSlide: D.prependSlide.bind(e),
                        renderSlide: D.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t), e.virtual.update()
                    }
                },
                setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        },
        A = {
            handle: function (e) {
                var t = this,
                    a = t.rtlTranslate,
                    i = e;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var n = B.innerWidth,
                            o = B.innerHeight,
                            l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], p = 0; p < d.length; p += 1) {
                            var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                        }
                        if (!r) return
                    }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s)
                }
            },
            enable: function () {
                this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function () {
                this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        H = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function () {
                X.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: A.enable.bind(this),
                        disable: A.disable.bind(this),
                        handle: A.handle.bind(this)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var G = {
            lastScrollTime: X.now(),
            event: -1 < B.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
                var e = "onwheel",
                    t = e in f;
                if (!t) {
                    var a = f.createElement("div");
                    a.setAttribute(e, "return;"), t = "function" == typeof a[e]
                }
                return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t
            }() ? "wheel" : "mousewheel",
            normalize: function (e) {
                var t = 0,
                    a = 0,
                    i = 0,
                    s = 0;
                return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: a,
                    pixelX: i,
                    pixelY: s
                }
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1
            },
            handle: function (e) {
                var t = e,
                    a = this,
                    i = a.params.mousewheel;
                if (!a.mouseEntered && !i.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var s = 0,
                    r = a.rtlTranslate ? -1 : 1,
                    n = G.normalize(t);
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
                        s = n.pixelX * r
                    } else {
                        if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
                        s = n.pixelY
                    }
                else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
                if (0 === s) return !0;
                if (i.invert && (s = -s), a.params.freeMode) {
                    a.params.loop && a.loopFix();
                    var o = a.getTranslate() + s * i.sensitivity,
                        l = a.isBeginning,
                        d = a.isEnd;
                    if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = X.nextTick(function () {
                            a.slideToClosest()
                        }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0
                } else {
                    if (60 < X.now() - a.mousewheel.lastScrollTime)
                        if (s < 0)
                            if (a.isEnd && !a.params.loop || a.animating) {
                                if (i.releaseOnEdges) return !0
                            } else a.slideNext(), a.emit("scroll", t);
                    else if (a.isBeginning && !a.params.loop || a.animating) {
                        if (i.releaseOnEdges) return !0
                    } else a.slidePrev(), a.emit("scroll", t);
                    a.mousewheel.lastScrollTime = (new B.Date).getTime()
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            enable: function () {
                var e = this;
                if (!G.event) return !1;
                if (e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(G.event, e.mousewheel.handle), e.mousewheel.enabled = !0
            },
            disable: function () {
                var e = this;
                if (!G.event) return !1;
                if (!e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(G.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
            }
        },
        N = {
            update: function () {
                var e = this,
                    t = e.params.navigation;
                if (!e.params.loop) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            init: function () {
                var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", function (e) {
                    e.preventDefault(), a.isEnd && !a.params.loop || a.slideNext()
                }), t && 0 < t.length && t.on("click", function (e) {
                    e.preventDefault(), a.isBeginning && !a.params.loop || a.slidePrev()
                }), X.extend(a.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function () {
                var e = this.navigation,
                    t = e.$nextEl,
                    a = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), a && a.length && (a.off("click"), a.removeClass(this.params.navigation.disabledClass))
            }
        },
        V = {
            update: function () {
                var e = this,
                    t = e.rtl,
                    s = e.params.pagination;
                if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var o, l, d, p = e.pagination.bullets;
                        if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function (e, t) {
                            var a = L(t),
                                i = a.index();
                            i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                        });
                        else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
                            for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
                            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                        }
                        if (s.dynamicBullets) {
                            var v = Math.min(p.length, s.dynamicMainBullets + 4),
                                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
                        var g;
                        g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var b = (r + 1) / n,
                            w = 1,
                            y = 1;
                        "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                    }
                    "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
                }
            },
            render: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = "";
                    if ("bullets" === t.type) {
                        for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function () {
                var a = this,
                    e = a.params.pagination;
                if (e.el) {
                    var t = L(e.el);
                    0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function (e) {
                        e.preventDefault();
                        var t = L(this).index() * a.params.slidesPerGroup;
                        a.params.loop && (t += a.loopedSlides), a.slideTo(t)
                    }), X.extend(a.pagination, {
                        $el: t,
                        el: t[0]
                    }))
                }
            },
            destroy: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass)
                }
            }
        },
        R = {
            setTranslate: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (Y.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (Y.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function () {
                        o[0].style.opacity = 0, o.transition(400)
                    }, 1e3))
                }
            },
            setTransition: function (e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbarHide && (i[0].style.opacity = 0), X.extend(t, {
                        trackSize: r,
                        divider: n,
                        moveDivider: o,
                        dragSize: s
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            setDragPosition: function (e) {
                var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    o = i.trackSize;
                t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
            },
            onDragStart: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function (e) {
                var t = this.scrollbar,
                    a = this.$wrapperEl,
                    i = t.$el,
                    s = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = X.nextTick(function () {
                    i.css("opacity", 0), i.transition(400)
                }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents ? (Y.touch && (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !Y.touch && m.ios) && (r.addEventListener("mousedown", e.scrollbar.onDragStart, n), f.addEventListener("mousemove", e.scrollbar.onDragMove, n), f.addEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEvents,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!Y.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    Y.touch || !Y.pointerEvents && !Y.prefixedPointerEvents ? (Y.touch && (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)), (s.simulateTouch && !m.ios && !m.android || s.simulateTouch && !Y.touch && m.ios) && (r.removeEventListener("mousedown", e.scrollbar.onDragStart, n), f.removeEventListener("mousemove", e.scrollbar.onDragMove, n), f.removeEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            init: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = L(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), X.extend(t, {
                        $el: s,
                        el: s[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && t.enableDraggable()
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable()
            }
        },
        F = {
            setTransform: function (e, t) {
                var a = this.rtl,
                    i = L(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    o = i.attr("data-swiper-parallax-y"),
                    l = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity");
                if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else {
                    var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function () {
                var i = this,
                    e = i.$el,
                    t = i.slides,
                    s = i.progress,
                    r = i.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                    i.parallax.setTransform(t, s)
                }), t.each(function (e, t) {
                    var a = t.progress;
                    1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                        i.parallax.setTransform(t, a)
                    })
                })
            },
            setTransition: function (s) {
                void 0 === s && (s = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                    var a = L(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                    0 === s && (i = 0), a.transition(i)
                })
            }
        },
        W = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function (e) {
                var t = this,
                    a = t.params.zoom,
                    i = t.zoom,
                    s = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !Y.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, s.scaleStart = W.getDistanceBetweenTouches(e)
                }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0
            },
            onGestureChange: function (e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!Y.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    a.fakeGestureMoved = !0, i.scaleMove = W.getDistanceBetweenTouches(e)
                }
                i.$imageEl && 0 !== i.$imageEl.length && (Y.gestures ? this.zoom.scale = e.scale * a.currentScale : a.scale = i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
            },
            onGestureEnd: function (e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!Y.gestures) {
                    if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !m.android) return;
                    a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0))
            },
            onTouchStart: function (e) {
                var t = this.zoom,
                    a = t.gesture,
                    i = t.image;
                a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (m.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function (e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = X.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = X.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var n = s.width * a.scale,
                        o = s.height * a.scale;
                    if (!(n < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1;
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        o = a.currentX + n,
                        l = i.y * r,
                        d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = o, a.currentY = d;
                    var c = a.width * e.scale,
                        u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function () {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1)
            },
            toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function (e) {
                var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this,
                    b = g.zoom,
                    w = g.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, a = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function () {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function () {
                var e = this,
                    t = e.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var a = !("touchstart" !== e.touchEvents.start || !Y.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    Y.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            },
            disable: function () {
                var e = this,
                    t = e.zoom;
                if (t.enabled) {
                    e.zoom.enabled = !1;
                    var a = !("touchstart" !== e.touchEvents.start || !Y.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    Y.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }
        },
        q = {
            loadInSlide: function (e, l) {
                void 0 === l && (l = !0);
                var d = this,
                    p = d.params.lazy;
                if (void 0 !== e && 0 !== d.slides.length) {
                    var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                        t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                    !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function (e, t) {
                        var i = L(t);
                        i.addClass(p.loadingClass);
                        var s = i.attr("data-background"),
                            r = i.attr("data-src"),
                            n = i.attr("data-srcset"),
                            o = i.attr("data-sizes");
                        d.loadImage(i[0], r || s, n, o, !1, function () {
                            if (null != d && d && (!d || d.params) && !d.destroyed) {
                                if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                                    var e = c.attr("data-swiper-slide-index");
                                    if (c.hasClass(d.params.slideDuplicateClass)) {
                                        var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                        d.lazy.loadInSlide(t.index(), !1)
                                    } else {
                                        var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        d.lazy.loadInSlide(a.index(), !1)
                                    }
                                }
                                d.emit("lazyImageReady", c[0], i[0])
                            }
                        }), d.emit("lazyImageLoad", c[0], i[0])
                    })
                }
            },
            load: function () {
                var i = this,
                    t = i.$wrapperEl,
                    a = i.params,
                    s = i.slides,
                    e = i.activeIndex,
                    r = i.virtual && a.virtual.enabled,
                    n = a.lazy,
                    o = a.slidesPerView;

                function l(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (s[e]) return !0;
                    return !1
                }

                function d(e) {
                    return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
                }
                if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function (e, t) {
                    var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                    i.lazy.loadInSlide(a)
                });
                else if (1 < o)
                    for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
                else i.lazy.loadInSlide(e);
                if (n.loadPrevNext)
                    if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f);
                        for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m)
                    } else {
                        var g = t.children("." + a.slideNextClass);
                        0 < g.length && i.lazy.loadInSlide(d(g));
                        var b = t.children("." + a.slidePrevClass);
                        0 < b.length && i.lazy.loadInSlide(d(b))
                    }
            }
        },
        j = {
            LinearSpline: function (e, t) {
                var a, i, s, r, n, o = function (e, t) {
                    for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                    return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function (e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new j.LinearSpline(t.slidesGrid, e.slidesGrid) : new j.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function (e, t) {
                var a, i, s = this,
                    r = s.controller.control;

                function n(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof S && n(r[o]);
                else r instanceof S && t !== r && n(r)
            },
            setTransition: function (t, e) {
                var a, i = this,
                    s = i.controller.control;

                function r(e) {
                    e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && X.nextTick(function () {
                        e.updateAutoHeight()
                    }), e.$wrapperEl.transitionEnd(function () {
                        s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd())
                    }))
                }
                if (Array.isArray(s))
                    for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof S && r(s[a]);
                else s instanceof S && e !== s && r(s)
            }
        },
        K = {
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function (e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function (e) {
                var t = this,
                    a = t.params.a11y;
                if (13 === e.keyCode) {
                    var i = L(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function () {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
                }
            },
            updatePagination: function () {
                var i = this,
                    s = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function (e, t) {
                    var a = L(t);
                    i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                })
            },
            init: function () {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, a, i = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function () {
                var e, t, a = this;
                a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
            }
        },
        U = {
            init: function () {
                var e = this;
                if (e.params.history) {
                    if (!B.history || !B.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var t = e.history;
                    t.initialized = !0, t.paths = U.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || B.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function () {
                this.params.history.replaceState || B.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function () {
                this.history.paths = U.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function () {
                var e = B.location.pathname.slice(1).split("/").filter(function (e) {
                        return "" !== e
                    }),
                    t = e.length;
                return {
                    key: e[t - 2],
                    value: e[t - 1]
                }
            },
            setHistory: function (e, t) {
                if (this.history.initialized && this.params.history.enabled) {
                    var a = this.slides.eq(t),
                        i = U.slugify(a.attr("data-history"));
                    B.location.pathname.includes(e) || (i = e + "/" + i);
                    var s = B.history.state;
                    s && s.value === i || (this.params.history.replaceState ? B.history.replaceState({
                        value: i
                    }, null, i) : B.history.pushState({
                        value: i
                    }, null, i))
                }
            },
            slugify: function (e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function (e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (U.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var o = n.index();
                            i.slideTo(o, e, a)
                        }
                    } else i.slideTo(0, e, a)
            }
        },
        _ = {
            onHashCange: function () {
                var e = this,
                    t = f.location.hash.replace("#", "");
                t !== e.slides.eq(e.activeIndex).attr("data-hash") && e.slideTo(e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index())
            },
            setHash: function () {
                var e = this;
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && B.history && B.history.replaceState) B.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else {
                        var t = e.slides.eq(e.activeIndex),
                            a = t.attr("data-hash") || t.attr("data-history");
                        f.location.hash = a || ""
                    }
            },
            init: function () {
                var e = this;
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var t = f.location.hash.replace("#", "");
                    if (t)
                        for (var a = 0, i = e.slides.length; a < i; a += 1) {
                            var s = e.slides.eq(a);
                            if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                                var r = s.index();
                                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && L(B).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function () {
                this.params.hashNavigation.watchState && L(B).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        Z = {
            run: function () {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = X.nextTick(function () {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }, a)
            },
            start: function () {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function () {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function (e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        },
        Q = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s, s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function (e) {
                var a = this,
                    t = a.slides,
                    i = a.$wrapperEl;
                if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    t.transitionEnd(function () {
                        if (!s && a && !a.destroyed) {
                            s = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t])
                        }
                    })
                }
            }
        },
        J = {
            setTranslate: function () {
                var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.params.cubeEffect,
                    p = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e)));
                for (var h = 0; h < s.length; h += 1) {
                    var v = s.eq(h),
                        f = h;
                    c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && (m = -m, g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
                    var E = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(E), d.slideShadows) {
                        var T = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), d.shadow)
                    if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            z = d.shadowScale,
                            k = d.shadowScale / M,
                            P = d.shadowOffset;
                        e.transform("scale3d(" + z + ", 1, " + k + ") translate3d(0px, " + (n / 2 + P) + "px, " + -n / 2 / k + "px) rotateX(-90deg)")
                    } var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function (e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        ee = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function (e) {
                var a = this,
                    t = a.slides,
                    i = a.activeIndex,
                    s = a.$wrapperEl;
                if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    t.eq(i).transitionEnd(function () {
                        if (!r && a && !a.destroyed) {
                            r = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t])
                        }
                    })
                }
            }
        },
        te = {
            setTranslate: function () {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                    var v = i.eq(u),
                        f = r[u],
                        m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
                        g = o ? p * m : 0,
                        b = o ? 0 : p * m,
                        w = -c * Math.abs(m),
                        y = o ? 0 : n.stretch * m,
                        x = o ? n.stretch * m : 0;
                    Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
                    var E = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                    if (v.transform(E), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
                        var T = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === T.length && (T = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(T)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), T.length && (T[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                    }
                }(Y.pointerEvents || Y.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
            },
            setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ae = [C, M, z, k, $, O, H, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    mousewheel: {
                        enabled: !1,
                        enable: G.enable.bind(e),
                        disable: G.disable.bind(e),
                        handle: G.handle.bind(e),
                        handleMouseEnter: G.handleMouseEnter.bind(e),
                        handleMouseLeave: G.handleMouseLeave.bind(e),
                        lastScrollTime: X.now()
                    }
                })
            },
            on: {
                init: function () {
                    this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function () {
                    this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function () {
                X.extend(this, {
                    navigation: {
                        init: N.init.bind(this),
                        update: N.update.bind(this),
                        destroy: N.destroy.bind(this)
                    }
                })
            },
            on: {
                init: function () {
                    this.navigation.init(), this.navigation.update()
                },
                toEdge: function () {
                    this.navigation.update()
                },
                fromEdge: function () {
                    this.navigation.update()
                },
                destroy: function () {
                    this.navigation.destroy()
                },
                click: function (e) {
                    var t = this.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    !this.params.navigation.hideOnClick || L(e.target).is(i) || L(e.target).is(a) || (a && a.toggleClass(this.params.navigation.hiddenClass), i && i.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function (e) {
                        return e
                    },
                    formatFractionTotal: function (e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    pagination: {
                        init: V.init.bind(e),
                        render: V.render.bind(e),
                        update: V.update.bind(e),
                        destroy: V.destroy.bind(e),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function () {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                },
                activeIndexChange: function () {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                },
                snapIndexChange: function () {
                    this.params.loop || this.pagination.update()
                },
                slidesLengthChange: function () {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                },
                snapGridLengthChange: function () {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                },
                destroy: function () {
                    this.pagination.destroy()
                },
                click: function (e) {
                    var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    scrollbar: {
                        init: R.init.bind(e),
                        destroy: R.destroy.bind(e),
                        updateSize: R.updateSize.bind(e),
                        setTranslate: R.setTranslate.bind(e),
                        setTransition: R.setTransition.bind(e),
                        enableDraggable: R.enableDraggable.bind(e),
                        disableDraggable: R.disableDraggable.bind(e),
                        setDragPosition: R.setDragPosition.bind(e),
                        onDragStart: R.onDragStart.bind(e),
                        onDragMove: R.onDragMove.bind(e),
                        onDragEnd: R.onDragEnd.bind(e),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function () {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                },
                update: function () {
                    this.scrollbar.updateSize()
                },
                resize: function () {
                    this.scrollbar.updateSize()
                },
                observerUpdate: function () {
                    this.scrollbar.updateSize()
                },
                setTranslate: function () {
                    this.scrollbar.setTranslate()
                },
                setTransition: function (e) {
                    this.scrollbar.setTransition(e)
                },
                destroy: function () {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function () {
                X.extend(this, {
                    parallax: {
                        setTransform: F.setTransform.bind(this),
                        setTranslate: F.setTranslate.bind(this),
                        setTransition: F.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0)
                },
                init: function () {
                    this.params.parallax && this.parallax.setTranslate()
                },
                setTranslate: function () {
                    this.params.parallax && this.parallax.setTranslate()
                },
                setTransition: function (e) {
                    this.params.parallax && this.parallax.setTransition(e)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function () {
                var t = this,
                    a = {
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (e) {
                    a[e] = W[e].bind(t)
                }), X.extend(t, {
                    zoom: a
                })
            },
            on: {
                init: function () {
                    this.params.zoom.enabled && this.zoom.enable()
                },
                destroy: function () {
                    this.zoom.disable()
                },
                touchStart: function (e) {
                    this.zoom.enabled && this.zoom.onTouchStart(e)
                },
                touchEnd: function (e) {
                    this.zoom.enabled && this.zoom.onTouchEnd(e)
                },
                doubleTap: function (e) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                },
                transitionEnd: function () {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function () {
                X.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: q.load.bind(this),
                        loadInSlide: q.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                },
                init: function () {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                },
                scroll: function () {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                },
                resize: function () {
                    this.params.lazy.enabled && this.lazy.load()
                },
                scrollbarDragMove: function () {
                    this.params.lazy.enabled && this.lazy.load()
                },
                transitionStart: function () {
                    var e = this;
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                },
                transitionEnd: function () {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    controller: {
                        control: e.params.controller.control,
                        getInterpolateFunction: j.getInterpolateFunction.bind(e),
                        setTranslate: j.setTranslate.bind(e),
                        setTransition: j.setTransition.bind(e)
                    }
                })
            },
            on: {
                update: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                resize: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                observerUpdate: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                setTranslate: function (e, t) {
                    this.controller.control && this.controller.setTranslate(e, t)
                },
                setTransition: function (e, t) {
                    this.controller.control && this.controller.setTransition(e, t)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function () {
                var t = this;
                X.extend(t, {
                    a11y: {
                        liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    }
                }), Object.keys(K).forEach(function (e) {
                    t.a11y[e] = K[e].bind(t)
                })
            },
            on: {
                init: function () {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                },
                toEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                fromEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                paginationUpdate: function () {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                },
                destroy: function () {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    history: {
                        init: U.init.bind(e),
                        setHistory: U.setHistory.bind(e),
                        setHistoryPopState: U.setHistoryPopState.bind(e),
                        scrollToSlide: U.scrollToSlide.bind(e),
                        destroy: U.destroy.bind(e)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.history.enabled && this.history.init()
                },
                destroy: function () {
                    this.params.history.enabled && this.history.destroy()
                },
                transitionEnd: function () {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function () {
                var e = this;
                X.extend(e, {
                    hashNavigation: {
                        initialized: !1,
                        init: _.init.bind(e),
                        destroy: _.destroy.bind(e),
                        setHash: _.setHash.bind(e),
                        onHashCange: _.onHashCange.bind(e)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                },
                destroy: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                },
                transitionEnd: function () {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function () {
                var t = this;
                X.extend(t, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: Z.run.bind(t),
                        start: Z.start.bind(t),
                        stop: Z.stop.bind(t),
                        pause: Z.pause.bind(t),
                        onTransitionEnd: function (e) {
                            t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function () {
                    this.params.autoplay.enabled && this.autoplay.start()
                },
                beforeTransitionStart: function (e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                },
                sliderFirstMove: function () {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                },
                destroy: function () {
                    this.autoplay.running && this.autoplay.stop()
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function () {
                X.extend(this, {
                    fadeEffect: {
                        setTranslate: Q.setTranslate.bind(this),
                        setTransition: Q.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if ("fade" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function () {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                },
                setTransition: function (e) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function () {
                X.extend(this, {
                    cubeEffect: {
                        setTranslate: J.setTranslate.bind(this),
                        setTransition: J.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if ("cube" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function () {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                },
                setTransition: function (e) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function () {
                X.extend(this, {
                    flipEffect: {
                        setTranslate: ee.setTranslate.bind(this),
                        setTransition: ee.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if ("flip" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        X.extend(e.params, t), X.extend(e.originalParams, t)
                    }
                },
                setTranslate: function () {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                },
                setTransition: function (e) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function () {
                X.extend(this, {
                    coverflowEffect: {
                        setTranslate: te.setTranslate.bind(this),
                        setTransition: te.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function () {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                },
                setTransition: function (e) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                }
            }
        }];
    return void 0 === S.use && (S.use = S.Class.use, S.installModule = S.Class.installModule), S.use(ae), S
});;
(function (f) {
    "function" === typeof define && define.amd ? define(["jquery"], function (n) {
        return f(n, document, window, navigator)
    }) : "object" === typeof exports ? f(require("jquery"), document, window, navigator) : f(jQuery, document, window, navigator)
})(function (f, n, k, r, p) {
    var t = 0,
        m = function () {
            var a = r.userAgent,
                b = /msie\s\d+/i;
            return 0 < a.search(b) && (a = b.exec(a).toString(), a = a.split(" ")[1], 9 > a) ? (f("html").addClass("lt-ie9"), !0) : !1
        }();
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this,
            d = [].slice;
        if ("function" != typeof b) throw new TypeError;
        var c = d.call(arguments, 1),
            e = function () {
                if (this instanceof e) {
                    var g = function () {};
                    g.prototype = b.prototype;
                    var g = new g,
                        l = b.apply(g, c.concat(d.call(arguments)));
                    return Object(l) === l ? l : g
                }
                return b.apply(a, c.concat(d.call(arguments)))
            };
        return e
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var d = Object(this),
            c = d.length >>> 0;
        if (0 === c) return -1;
        var e = +b || 0;
        Infinity === Math.abs(e) && (e = 0);
        if (e >= c) return -1;
        for (e = Math.max(0 <= e ? e : c - Math.abs(e), 0); e < c;) {
            if (e in d && d[e] === a) return e;
            e++
        }
        return -1
    });
    var q = function (a, b, d) {
        this.VERSION = "2.2.0";
        this.input = a;
        this.plugin_count = d;
        this.old_to = this.old_from = this.update_tm = this.calc_count = this.current_plugin = 0;
        this.raf_id = this.old_min_interval = null;
        this.no_diapason = this.force_redraw = this.dragging = !1;
        this.has_tab_index = !0;
        this.is_update = this.is_key = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = this.is_finish = !1;
        b = b || {};
        this.$cache = {
            win: f(k),
            body: f(n.body),
            input: f(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };
        var c = this.$cache.input;
        a = c.prop("value");
        var e;
        d = {
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !0,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            input_values_separator: ";",
            disable: !1,
            block: !1,
            extra_classes: "",
            scope: null,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        };
        "INPUT" !== c[0].nodeName && console && console.warn && console.warn("Base element should be <input>!", c[0]);
        c = {
            type: c.data("type"),
            min: c.data("min"),
            max: c.data("max"),
            from: c.data("from"),
            to: c.data("to"),
            step: c.data("step"),
            min_interval: c.data("minInterval"),
            max_interval: c.data("maxInterval"),
            drag_interval: c.data("dragInterval"),
            values: c.data("values"),
            from_fixed: c.data("fromFixed"),
            from_min: c.data("fromMin"),
            from_max: c.data("fromMax"),
            from_shadow: c.data("fromShadow"),
            to_fixed: c.data("toFixed"),
            to_min: c.data("toMin"),
            to_max: c.data("toMax"),
            to_shadow: c.data("toShadow"),
            prettify_enabled: c.data("prettifyEnabled"),
            prettify_separator: c.data("prettifySeparator"),
            force_edges: c.data("forceEdges"),
            keyboard: c.data("keyboard"),
            grid: c.data("grid"),
            grid_margin: c.data("gridMargin"),
            grid_num: c.data("gridNum"),
            grid_snap: c.data("gridSnap"),
            hide_min_max: c.data("hideMinMax"),
            hide_from_to: c.data("hideFromTo"),
            prefix: c.data("prefix"),
            postfix: c.data("postfix"),
            max_postfix: c.data("maxPostfix"),
            decorate_both: c.data("decorateBoth"),
            values_separator: c.data("valuesSeparator"),
            input_values_separator: c.data("inputValuesSeparator"),
            disable: c.data("disable"),
            block: c.data("block"),
            extra_classes: c.data("extraClasses")
        };
        c.values = c.values && c.values.split(",");
        for (e in c) c.hasOwnProperty(e) && (c[e] !== p && "" !== c[e] || delete c[e]);
        a !== p && "" !== a && (a = a.split(c.input_values_separator || b.input_values_separator || ";"), a[0] && a[0] == +a[0] && (a[0] = +a[0]), a[1] && a[1] == +a[1] && (a[1] = +a[1]), b && b.values && b.values.length ? (d.from = a[0] && b.values.indexOf(a[0]), d.to = a[1] && b.values.indexOf(a[1])) : (d.from = a[0] && +a[0], d.to = a[1] && +a[1]));
        f.extend(d, b);
        f.extend(d, c);
        this.options = d;
        this.update_check = {};
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.init()
    };
    q.prototype = {
        init: function (a) {
            this.no_diapason = !1;
            this.coords.p_step = this.convertToPercent(this.options.step, !0);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            a ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart());
            this.updateScene()
        },
        append: function () {
            this.$cache.input.before('<span class="irs js-irs-' +
                this.plugin_count + " " + this.options.extra_classes + '"></span>');
            this.$cache.input.prop("readonly", !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="0"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
            this.$cache.rs = this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler());
            this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none");
            this.appendGrid();
            this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.input[0].disabled = !1, this.removeDisableMask(), this.bindEvents());
            this.options.disable || (this.options.block ? this.appendDisableMask() : this.removeDisableMask());
            this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
        },
        setTopHandler: function () {
            var a = this.options.max,
                b = this.options.to;
            this.options.from > this.options.min && b === a ? this.$cache.s_from.addClass("type_last") : b < a && this.$cache.s_to.addClass("type_last")
        },
        changeLevel: function (a) {
            switch (a) {
                case "single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    this.$cache.s_single.addClass("state_hover");
                    break;
                case "from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.$cache.s_from.addClass("state_hover");
                    this.$cache.s_from.addClass("type_last");
                    this.$cache.s_to.removeClass("type_last");
                    break;
                case "to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                    this.$cache.s_to.addClass("state_hover");
                    this.$cache.s_to.addClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
                case "both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer -
                        this.coords.p_from_fake), this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"), this.$cache.s_from.removeClass("type_last")
            }
        },
        appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled")
        },
        removeDisableMask: function () {
            this.$cache.cont.remove(".irs-disable-mask");
            this.$cache.cont.removeClass("irs-disabled")
        },
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);
            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);
            m && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count));
            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id)
        },
        bindEvents: function () {
            if (!this.no_diapason) {
                this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this));
                this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")));
                "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" +
                    this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" +
                    this.plugin_count, this.pointerClick.bind(this, "click")));
                if (this.options.keyboard) this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
                m && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)))
            }
        },
        pointerFocus: function (a) {
            if (!this.target) {
                var b = "single" === this.options.type ? this.$cache.single : this.$cache.from;
                a = b.offset().left;
                a += b.width() / 2 - 1;
                this.pointerClick("single", {
                    preventDefault: function () {},
                    pageX: a
                })
            }
        },
        pointerMove: function (a) {
            this.dragging && (this.coords.x_pointer = (a.pageX || a.originalEvent.touches && a.originalEvent.touches[0].pageX) - this.coords.x_gap, this.calc())
        },
        pointerUp: function (a) {
            this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, m && f("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (f.contains(this.$cache.cont[0], a.target) || this.dragging) && this.callOnFinish(), this.dragging = !1)
        },
        pointerDown: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && ("both" === a && this.setTempMinInterval(), a || (a = this.target || "from"), this.current_plugin = this.plugin_count, this.target = a, this.dragging = this.is_active = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = d - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(a), m && f("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene())
        },
        pointerClick: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && (this.current_plugin = this.plugin_count, this.target = a, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(d - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
        },
        key: function (a, b) {
            if (!(this.current_plugin !== this.plugin_count || b.altKey || b.ctrlKey || b.shiftKey || b.metaKey)) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault();
                        this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        },
        moveByKey: function (a) {
            var b = this.coords.p_pointer,
                d = (this.options.max - this.options.min) / 100,
                d = this.options.step / d;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * (a ? b + d : b - d));
            this.is_key = !0;
            this.calc()
        },
        setMinMax: function () {
            if (this.options)
                if (this.options.hide_min_max) this.$cache.min[0].style.display = "none", this.$cache.max[0].style.display = "none";
                else {
                    if (this.options.values.length) this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
                    else {
                        var a = this._prettify(this.options.min),
                            b = this._prettify(this.options.max);
                        this.result.min_pretty = a;
                        this.result.max_pretty = b;
                        this.$cache.min.html(this.decorate(a, this.options.min));
                        this.$cache.max.html(this.decorate(b, this.options.max))
                    }
                    this.labels.w_min = this.$cache.min.outerWidth(!1);
                    this.labels.w_max = this.$cache.max.outerWidth(!1)
                }
        },
        setTempMinInterval: function () {
            var a = this.result.to - this.result.from;
            null === this.old_min_interval && (this.old_min_interval = this.options.min_interval);
            this.options.min_interval = a
        },
        restoreOriginalMinInterval: function () {
            null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null)
        },
        calc: function (a) {
            if (this.options) {
                this.calc_count++;
                if (10 === this.calc_count || a) this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent();
                if (this.coords.w_rs) {
                    this.calcPointerPercent();
                    a = this.getHandleX();
                    "both" === this.target && (this.coords.p_gap = 0, a = this.getHandleX());
                    "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, a = this.getHandleX(), this.target = this.options.drag_interval ? "both_one" : this.chooseHandle(a));
                    switch (this.target) {
                        case "base":
                            var b = (this.options.max - this.options.min) / 100;
                            a = (this.result.from - this.options.min) / b;
                            b = (this.result.to - this.options.min) / b;
                            this.coords.p_single_real = this.toFixed(a);
                            this.coords.p_from_real = this.toFixed(a);
                            this.coords.p_to_real = this.toFixed(b);
                            this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            this.target = null;
                            break;
                        case "single":
                            if (this.options.from_fixed) break;
                            this.coords.p_single_real = this.convertToRealPercent(a);
                            this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                            this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                            this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                            break;
                        case "from":
                            if (this.options.from_fixed) break;
                            this.coords.p_from_real = this.convertToRealPercent(a);
                            this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                            this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            break;
                        case "to":
                            if (this.options.to_fixed) break;
                            this.coords.p_to_real = this.convertToRealPercent(a);
                            this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                            this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both":
                            if (this.options.from_fixed || this.options.to_fixed) break;
                            a = this.toFixed(a + .001 * this.coords.p_handle);
                            this.coords.p_from_real = this.convertToRealPercent(a) - this.coords.p_gap_left;
                            this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            this.coords.p_to_real = this.convertToRealPercent(a) + this.coords.p_gap_right;
                            this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both_one":
                            if (!this.options.from_fixed && !this.options.to_fixed) {
                                var d = this.convertToRealPercent(a);
                                a = this.result.to_percent - this.result.from_percent;
                                var c = a / 2,
                                    b = d - c,
                                    d = d + c;
                                0 > b && (b = 0, d = b + a);
                                100 < d && (d = 100, b = d - a);
                                this.coords.p_from_real = this.calcWithStep(b);
                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                                this.coords.p_to_real = this.calcWithStep(d);
                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                            }
                    }
                    "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.result.from_pretty = this._prettify(this.result.from), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.from_pretty = this._prettify(this.result.from), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.result.to_pretty = this._prettify(this.result.to), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to]));
                    this.calcMinMax();
                    this.calcLabels()
                }
            }
        },
        calcPointerPercent: function () {
            this.coords.w_rs ? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0
        },
        convertToRealPercent: function (a) {
            return a / (100 - this.coords.p_handle) * 100
        },
        convertToFakePercent: function (a) {
            return a / 100 * (100 - this.coords.p_handle)
        },
        getHandleX: function () {
            var a = 100 - this.coords.p_handle,
                b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            0 > b ? b = 0 : b > a && (b = a);
            return b
        },
        calcHandlePercent: function () {
            this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1);
            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
        },
        chooseHandle: function (a) {
            return "single" === this.options.type ? "single" : a >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
        },
        calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        },
        calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake))
        },
        updateScene: function () {
            this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null);
            clearTimeout(this.update_tm);
            this.update_tm = null;
            this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
        },
        drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            if (this.coords.w_rs) {
                this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0);
                if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow();
                if (this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key)) {
                    if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
                        this.drawLabels();
                        this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                        this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";
                        if ("single" === this.options.type) this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";
                        else {
                            this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                            this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";
                            if (this.old_from !== this.result.from || this.force_redraw) this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                            if (this.old_to !== this.result.to || this.force_redraw) this.$cache.to[0].style.left = this.labels.p_to_left + "%"
                        }
                        this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                        this.writeToInput();
                        this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || (this.$cache.input.trigger("change"), this.$cache.input.trigger("input"));
                        this.old_from = this.result.from;
                        this.old_to = this.result.to;
                        this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange();
                        if (this.is_key || this.is_click) this.is_click = this.is_key = !1, this.callOnFinish();
                        this.is_finish = this.is_resize = this.is_update = !1
                    }
                    this.force_redraw = this.is_click = this.is_key = this.is_start = !1
                }
            }
        },
        drawLabels: function () {
            if (this.options) {
                var a = this.options.values.length,
                    b = this.options.p_values;
                if (!this.options.hide_from_to)
                    if ("single" === this.options.type) {
                        if (a) a = this.decorate(b[this.result.from]);
                        else {
                            var d = this._prettify(this.result.from);
                            a = this.decorate(d, this.result.from)
                        }
                        this.$cache.single.html(a);
                        this.calcLabels();
                        this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility = this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                    } else {
                        a ? (this.options.decorate_both ? (a = this.decorate(b[this.result.from]), a += this.options.values_separator, a += this.decorate(b[this.result.to])) : a = this.decorate(b[this.result.from] + this.options.values_separator + b[this.result.to]), d = this.decorate(b[this.result.from]), b = this.decorate(b[this.result.to])) : (d = this._prettify(this.result.from), b = this._prettify(this.result.to), this.options.decorate_both ? (a = this.decorate(d, this.result.from), a += this.options.values_separator, a += this.decorate(b, this.result.to)) : a = this.decorate(d + this.options.values_separator +
                            b, this.result.to), d = this.decorate(d, this.result.from), b = this.decorate(b, this.result.to));
                        this.$cache.single.html(a);
                        this.$cache.from.html(d);
                        this.$cache.to.html(b);
                        this.calcLabels();
                        a = Math.min(this.labels.p_single_left, this.labels.p_from_left);
                        d = this.labels.p_single_left + this.labels.p_single_fake;
                        var b = this.labels.p_to_left + this.labels.p_to_fake,
                            c = Math.max(d, b);
                        this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", c = b) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", c = Math.max(d, b))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden");
                        this.$cache.min[0].style.visibility = a < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility = c > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                    }
            }
        },
        drawShadow: function () {
            var a = this.options,
                b = this.$cache,
                d = "number" === typeof a.from_min && !isNaN(a.from_min),
                c = "number" === typeof a.from_max && !isNaN(a.from_max),
                e = "number" === typeof a.to_min && !isNaN(a.to_min),
                g = "number" === typeof a.to_max && !isNaN(a.to_max);
            "single" === a.type ? a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min), c = this.convertToPercent(c ? a.from_max : a.max) - d, d = this.toFixed(d - this.coords.p_handle / 100 * d), c = this.toFixed(c - this.coords.p_handle / 100 * c), d += this.coords.p_handle / 2, b.shad_single[0].style.display = "block", b.shad_single[0].style.left = d + "%", b.shad_single[0].style.width = c + "%") : b.shad_single[0].style.display = "none" : (a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min), c = this.convertToPercent(c ? a.from_max : a.max) -
                d, d = this.toFixed(d - this.coords.p_handle / 100 * d), c = this.toFixed(c - this.coords.p_handle / 100 * c), d += this.coords.p_handle / 2, b.shad_from[0].style.display = "block", b.shad_from[0].style.left = d + "%", b.shad_from[0].style.width = c + "%") : b.shad_from[0].style.display = "none", a.to_shadow && (e || g) ? (e = this.convertToPercent(e ? a.to_min : a.min), a = this.convertToPercent(g ? a.to_max : a.max) - e, e = this.toFixed(e - this.coords.p_handle / 100 * e), a = this.toFixed(a - this.coords.p_handle / 100 * a), e += this.coords.p_handle / 2, b.shad_to[0].style.display = "block", b.shad_to[0].style.left = e + "%", b.shad_to[0].style.width = a + "%") : b.shad_to[0].style.display = "none")
        },
        writeToInput: function () {
            "single" === this.options.type ? (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to))
        },
        callOnStart: function () {
            this.writeToInput();
            if (this.options.onStart && "function" === typeof this.options.onStart)
                if (this.options.scope) this.options.onStart.call(this.options.scope, this.result);
                else this.options.onStart(this.result)
        },
        callOnChange: function () {
            this.writeToInput();
            if (this.options.onChange && "function" === typeof this.options.onChange)
                if (this.options.scope) this.options.onChange.call(this.options.scope, this.result);
                else this.options.onChange(this.result)
        },
        callOnFinish: function () {
            this.writeToInput();
            if (this.options.onFinish && "function" === typeof this.options.onFinish)
                if (this.options.scope) this.options.onFinish.call(this.options.scope, this.result);
                else this.options.onFinish(this.result)
        },
        callOnUpdate: function () {
            this.writeToInput();
            if (this.options.onUpdate && "function" === typeof this.options.onUpdate)
                if (this.options.scope) this.options.onUpdate.call(this.options.scope, this.result);
                else this.options.onUpdate(this.result)
        },
        toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input");
            this.has_tab_index ? this.$cache.input.prop("tabindex", -1) : this.$cache.input.removeProp("tabindex");
            this.has_tab_index = !this.has_tab_index
        },
        convertToPercent: function (a, b) {
            var d = this.options.max - this.options.min;
            return d ? this.toFixed((b ? a : a - this.options.min) / (d / 100)) : (this.no_diapason = !0, 0)
        },
        convertToValue: function (a) {
            var b = this.options.min,
                d = this.options.max,
                c = b.toString().split(".")[1],
                e = d.toString().split(".")[1],
                g, l, f = 0,
                h = 0;
            if (0 === a) return this.options.min;
            if (100 === a) return this.options.max;
            c && (f = g = c.length);
            e && (f = l = e.length);
            g && l && (f = g >= l ? g : l);
            0 > b && (h = Math.abs(b), b = +(b + h).toFixed(f), d = +(d + h).toFixed(f));
            a = (d - b) / 100 * a + b;
            (b = this.options.step.toString().split(".")[1]) ? a = +a.toFixed(b.length): (a /= this.options.step, a *= this.options.step, a = +a.toFixed(0));
            h && (a -= h);
            h = b ? +a.toFixed(b.length) : this.toFixed(a);
            h < this.options.min ? h = this.options.min : h > this.options.max && (h = this.options.max);
            return h
        },
        calcWithStep: function (a) {
            var b = Math.round(a / this.coords.p_step) * this.coords.p_step;
            100 < b && (b = 100);
            100 === a && (b = 100);
            return this.toFixed(b)
        },
        checkMinInterval: function (a, b, d) {
            var c = this.options;
            if (!c.min_interval) return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d ? b - a < c.min_interval && (a = b - c.min_interval) : a - b < c.min_interval && (a = b + c.min_interval);
            return this.convertToPercent(a)
        },
        checkMaxInterval: function (a, b, d) {
            var c = this.options;
            if (!c.max_interval) return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d ? b - a > c.max_interval && (a = b - c.max_interval) : a - b > c.max_interval && (a = b + c.max_interval);
            return this.convertToPercent(a)
        },
        checkDiapason: function (a, b, d) {
            a = this.convertToValue(a);
            var c = this.options;
            "number" !== typeof b && (b = c.min);
            "number" !== typeof d && (d = c.max);
            a < b && (a = b);
            a > d && (a = d);
            return this.convertToPercent(a)
        },
        toFixed: function (a) {
            a = a.toFixed(20);
            return +a
        },
        _prettify: function (a) {
            return this.options.prettify_enabled ? this.options.prettify && "function" === typeof this.options.prettify ? this.options.prettify(a) : this.prettify(a) : a
        },
        prettify: function (a) {
            return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
        },
        checkEdges: function (a, b) {
            if (!this.options.force_edges) return this.toFixed(a);
            0 > a ? a = 0 : a > 100 - b && (a = 100 - b);
            return this.toFixed(a)
        },
        validate: function () {
            var a = this.options,
                b = this.result,
                d = a.values,
                c = d.length,
                e;
            "string" === typeof a.min && (a.min = +a.min);
            "string" === typeof a.max && (a.max = +a.max);
            "string" === typeof a.from && (a.from = +a.from);
            "string" === typeof a.to && (a.to = +a.to);
            "string" === typeof a.step && (a.step = +a.step);
            "string" === typeof a.from_min && (a.from_min = +a.from_min);
            "string" === typeof a.from_max && (a.from_max = +a.from_max);
            "string" === typeof a.to_min && (a.to_min = +a.to_min);
            "string" === typeof a.to_max && (a.to_max = +a.to_max);
            "string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
            a.max < a.min && (a.max = a.min);
            if (c)
                for (a.p_values = [], a.min = 0, a.max = c - 1, a.step = 1, a.grid_num = a.max, a.grid_snap = !0, e = 0; e < c; e++) {
                    var g = +d[e];
                    isNaN(g) ? g = d[e] : (d[e] = g, g = this._prettify(g));
                    a.p_values.push(g)
                }
            if ("number" !== typeof a.from || isNaN(a.from)) a.from = a.min;
            if ("number" !== typeof a.to || isNaN(a.to)) a.to = a.max;
            "single" === a.type ? (a.from < a.min && (a.from = a.min), a.from > a.max && (a.from = a.max)) : (a.from < a.min && (a.from = a.min), a.from > a.max && (a.from = a.max), a.to < a.min && (a.to = a.min), a.to > a.max && (a.to = a.max), this.update_check.from && (this.update_check.from !== a.from && a.from > a.to && (a.from = a.to), this.update_check.to !== a.to && a.to < a.from && (a.to = a.from)), a.from > a.to && (a.from = a.to), a.to < a.from && (a.to = a.from));
            if ("number" !== typeof a.step || isNaN(a.step) || !a.step || 0 > a.step) a.step = 1;
            "number" === typeof a.from_min && a.from < a.from_min && (a.from = a.from_min);
            "number" === typeof a.from_max && a.from > a.from_max && (a.from = a.from_max);
            "number" === typeof a.to_min && a.to < a.to_min && (a.to = a.to_min);
            "number" === typeof a.to_max && a.from > a.to_max && (a.to = a.to_max);
            if (b) {
                b.min !== a.min && (b.min = a.min);
                b.max !== a.max && (b.max = a.max);
                if (b.from < b.min || b.from > b.max) b.from = a.from;
                if (b.to < b.min || b.to > b.max) b.to = a.to
            }
            if ("number" !== typeof a.min_interval || isNaN(a.min_interval) || !a.min_interval || 0 > a.min_interval) a.min_interval = 0;
            if ("number" !== typeof a.max_interval || isNaN(a.max_interval) || !a.max_interval || 0 > a.max_interval) a.max_interval = 0;
            a.min_interval && a.min_interval > a.max - a.min && (a.min_interval = a.max - a.min);
            a.max_interval && a.max_interval > a.max - a.min && (a.max_interval = a.max - a.min)
        },
        decorate: function (a, b) {
            var d = "",
                c = this.options;
            c.prefix && (d += c.prefix);
            d += a;
            c.max_postfix && (c.values.length && a === c.p_values[c.max] ? (d += c.max_postfix, c.postfix && (d += " ")) : b === c.max && (d += c.max_postfix, c.postfix && (d += " ")));
            c.postfix && (d += c.postfix);
            return d
        },
        updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            this.result.from_pretty = this._prettify(this.result.from);
            this.options.values && (this.result.from_value = this.options.values[this.result.from])
        },
        updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            this.result.to_pretty = this._prettify(this.result.to);
            this.options.values && (this.result.to_value = this.options.values[this.result.to])
        },
        updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo()
        },
        appendGrid: function () {
            if (this.options.grid) {
                var a = this.options,
                    b;
                var d = a.max - a.min;
                var c = a.grid_num,
                    e = 4,
                    g = "";
                this.calcGridMargin();
                if (a.grid_snap)
                    if (50 < d) {
                        c = 50 / a.step;
                        var f = this.toFixed(a.step / .5)
                    } else c = d / a.step, f = this.toFixed(a.step / (d / 100));
                else f = this.toFixed(100 / c);
                4 < c && (e = 3);
                7 < c && (e = 2);
                14 < c && (e = 1);
                28 < c && (e = 0);
                for (d = 0; d < c + 1; d++) {
                    var k = e;
                    var h = this.toFixed(f * d);
                    100 < h && (h = 100);
                    this.coords.big[d] = h;
                    var m = (h - f * (d - 1)) / (k + 1);
                    for (b = 1; b <= k && 0 !== h; b++) {
                        var n = this.toFixed(h - m * b);
                        g += '<span class="irs-grid-pol small" style="left: ' + n + '%"></span>'
                    }
                    g += '<span class="irs-grid-pol" style="left: ' + h + '%"></span>';
                    b = this.convertToValue(h);
                    b = a.values.length ? a.p_values[b] : this._prettify(b);
                    g += '<span class="irs-grid-text js-grid-text-' + d + '" style="left: ' + h + '%">' + b + "</span>"
                }
                this.coords.big_num = Math.ceil(c + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(g);
                this.cacheGridLabels()
            }
        },
        cacheGridLabels: function () {
            var a, b = this.coords.big_num;
            for (a = 0; a < b; a++) {
                var d = this.$cache.grid.find(".js-grid-text-" + a);
                this.$cache.grid_labels.push(d)
            }
            this.calcGridLabels()
        },
        calcGridLabels: function () {
            var a;
            var b = [];
            var d = [],
                c = this.coords.big_num;
            for (a = 0; a < c; a++) this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(!1), this.coords.big_p[a] = this.toFixed(this.coords.big_w[a] / this.coords.w_rs * 100), this.coords.big_x[a] = this.toFixed(this.coords.big_p[a] / 2), b[a] = this.toFixed(this.coords.big[a] - this.coords.big_x[a]), d[a] = this.toFixed(b[a] + this.coords.big_p[a]);
            this.options.force_edges && (b[0] < -this.coords.grid_gap && (b[0] = -this.coords.grid_gap, d[0] = this.toFixed(b[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), d[c - 1] > 100 + this.coords.grid_gap && (d[c - 1] = 100 + this.coords.grid_gap, b[c - 1] = this.toFixed(d[c - 1] - this.coords.big_p[c - 1]), this.coords.big_x[c - 1] = this.toFixed(this.coords.big_p[c - 1] - this.coords.grid_gap)));
            this.calcGridCollision(2, b, d);
            this.calcGridCollision(4, b, d);
            for (a = 0; a < c; a++) b = this.$cache.grid_labels[a][0], this.coords.big_x[a] !== Number.POSITIVE_INFINITY && (b.style.marginLeft = -this.coords.big_x[a] + "%")
        },
        calcGridCollision: function (a, b, d) {
            var c, e = this.coords.big_num;
            for (c = 0; c < e; c += a) {
                var g = c + a / 2;
                if (g >= e) break;
                var f = this.$cache.grid_labels[g][0];
                f.style.visibility = d[c] <= b[g] ? "visible" : "hidden"
            }
        },
        calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        },
        update: function (a) {
            this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.update_check.from = this.result.from, this.update_check.to = this.result.to, this.options = f.extend(this.options, a), this.validate(), this.updateResult(a), this.toggleInput(), this.remove(), this.init(!0))
        },
        reset: function () {
            this.input && (this.updateResult(), this.update())
        },
        destroy: function () {
            this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), f.data(this.input, "ionRangeSlider", null), this.remove(), this.options = this.input = null)
        }
    };
    f.fn.ionRangeSlider = function (a) {
        return this.each(function () {
            f.data(this, "ionRangeSlider") || f.data(this, "ionRangeSlider", new q(this, a, t++))
        })
    };
    (function () {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !k.requestAnimationFrame; ++d) k.requestAnimationFrame = k[b[d] + "RequestAnimationFrame"], k.cancelAnimationFrame = k[b[d] + "CancelAnimationFrame"] || k[b[d] + "CancelRequestAnimationFrame"];
        k.requestAnimationFrame || (k.requestAnimationFrame = function (b, d) {
            var c = (new Date).getTime(),
                e = Math.max(0, 16 - (c - a)),
                f = k.setTimeout(function () {
                    b(c + e)
                }, e);
            a = c + e;
            return f
        });
        k.cancelAnimationFrame || (k.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        })
    })()
});
(function (p, z) {
    function q(a) {
        return !!("" === a || a && a.charCodeAt && a.substr)
    }

    function m(a) {
        return u ? u(a) : "[object Array]" === v.call(a)
    }

    function r(a) {
        return "[object Object]" === v.call(a)
    }

    function s(a, b) {
        var d, a = a || {},
            b = b || {};
        for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]);
        return a
    }

    function j(a, b, d) {
        var c = [],
            e, h;
        if (!a) return c;
        if (w && a.map === w) return a.map(b, d);
        for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a);
        return c
    }

    function n(a, b) {
        a = Math.round(Math.abs(a));
        return isNaN(a) ? b : a
    }

    function x(a) {
        var b = c.settings.currency.format;
        "function" === typeof a && (a = a());
        return q(a) && a.match("%v") ? {
            pos: a,
            neg: a.replace("-", "").replace("%v", "-%v"),
            zero: a
        } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = {
            pos: b,
            neg: b.replace("%v", "-%v"),
            zero: b
        } : a
    }
    var c = {
            version: "0.4.1",
            settings: {
                currency: {
                    symbol: "$",
                    format: "%s%v",
                    decimal: ".",
                    thousand: ",",
                    precision: 2,
                    grouping: 3
                },
                number: {
                    precision: 0,
                    grouping: 3,
                    thousand: ",",
                    decimal: "."
                }
            }
        },
        w = Array.prototype.map,
        u = Array.isArray,
        v = Object.prototype.toString,
        o = c.unformat = c.parse = function (a, b) {
            if (m(a)) return j(a, function (a) {
                return o(a, b)
            });
            a = a || 0;
            if ("number" === typeof a) return a;
            var b = b || ".",
                c = RegExp("[^0-9-" + b + "]", ["g"]),
                c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, "."));
            return !isNaN(c) ? c : 0
        },
        y = c.toFixed = function (a, b) {
            var b = n(b, c.settings.number.precision),
                d = Math.pow(10, b);
            return (Math.round(c.unformat(a) * d) / d).toFixed(b)
        },
        t = c.formatNumber = c.format = function (a, b, d, i) {
            if (m(a)) return j(a, function (a) {
                return t(a, b, d, i)
            });
            var a = o(a),
                e = s(r(b) ? b : {
                    precision: b,
                    thousand: d,
                    decimal: i
                }, c.settings.number),
                h = n(e.precision),
                f = 0 > a ? "-" : "",
                g = parseInt(y(Math.abs(a || 0), h), 10) + "",
                l = 3 < g.length ? g.length % 3 : 0;
            return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "")
        },
        A = c.formatMoney = function (a, b, d, i, e, h) {
            if (m(a)) return j(a, function (a) {
                return A(a, b, d, i, e, h)
            });
            var a = o(a),
                f = s(r(b) ? b : {
                    symbol: b,
                    precision: d,
                    thousand: i,
                    decimal: e,
                    format: h
                }, c.settings.currency),
                g = x(f.format);
            return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal))
        };
    c.formatColumn = function (a, b, d, i, e, h) {
        if (!a) return [];
        var f = s(r(b) ? b : {
                symbol: b,
                precision: d,
                thousand: i,
                decimal: e,
                format: h
            }, c.settings.currency),
            g = x(f.format),
            l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1,
            k = 0,
            a = j(a, function (a) {
                if (m(a)) return c.formatColumn(a, f);
                a = o(a);
                a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal));
                if (a.length > k) k = a.length;
                return a
            });
        return j(a, function (a) {
            return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a
        })
    };
    if ("undefined" !== typeof exports) {
        if ("undefined" !== typeof module && module.exports) exports = module.exports = c;
        exports.accounting = c
    } else "function" === typeof define && define.amd ? define([], function () {
        return c
    }) : (c.noConflict = function (a) {
        return function () {
            p.accounting = a;
            c.noConflict = z;
            return c
        }
    }(p.accounting), p.accounting = c)
})(this);

function journal_filter_url() {
    var f = {};
    $('input[data-filter-trigger]:checked, select[data-filter-trigger]').each(function () {
        var $this = $(this);
        var name = 'f' + $this.attr('name');
        var value = $this.val().trim();
        f[name] = f[name] || [];
        f[name].push(value);
    });
    if ($('.filter-price').length) {
        var min = $('.filter-price-min').data('min');
        var max = $('.filter-price-max').data('max');
        var from = parseInt($('.filter-price-min').val(), 10);
        var to = parseInt($('.filter-price-max').val(), 10);
        if (((from !== '') && (from !== min)) || ((to !== '') && (to !== max))) {
            f['fmin'] = [from];
            f['fmax'] = [to];
        }
    }
    var url = [];
    $.each(f, function (k, v) {
        url.push(k + '=' + v.join(Journal['filterUrlValuesSeparator'] || ','));
    });
    url = url.join('&');
    if (!url) {
        return Journal['filterBase'];
    }
    if (Journal['filterBase'].indexOf('?') === -1) {
        return Journal['filterBase'] + '?' + url;
    }
    return Journal['filterBase'] + '&' + url;
}

function journal_filter_price_slider() {
    $('.filter-price .range-slider input').ionRangeSlider({
        type: 'double',
        min: $('.filter-price-min').data('min'),
        max: $('.filter-price-max').data('max'),
        from: $('.filter-price-min').val(),
        to: $('.filter-price-max').val(),
        onFinish: function (data) {
            $('.filter-price-min').val(data.from);
            $('.filter-price-max').val(data.to).trigger('blur');
        },
        prettify: function (value) {
            if (Journal['currency_left']) {
                return accounting.formatMoney(value, Journal['currency_left'], 0, Journal['currency_thousand'], Journal['currency_decimal'], '%s%v');
            }
            return accounting.formatMoney(value, Journal['currency_right'], 0, Journal['currency_thousand'], Journal['currency_decimal'], '%v%s');
        }
    });
}

function journal_filter(url, opts) {
    opts = opts || {};
    var source = opts.source;
    var updateHistory = opts.updateHistory;
    try {
        var u = new URL(url);
        u.host = window.location.host;
        u.hostname = window.location.hostname;
        u.protocol = window.location.protocol;
        url = u.toString();
    } catch (e) {}
    if (updateHistory !== false && window.history && window.history.pushState) {
        var state = {
            Title: document.title,
            Url: url
        };
        window.history.pushState(state, state.Title, state.Url);
    }
    if (Journal.infiniteScrollInstance) {
        Journal.infiniteScrollInstance.destroy();
    }
    $.ajax({
        url: url,
        dataType: 'html',
        beforeSend: function () {
            var $slider = $('.filter-price .range-slider input');
            if ($slider.length && $slider.data('ionRangeSlider')) {
                $slider.data('ionRangeSlider').destroy();
            }
            $('[data-toggle="tooltip"]').tooltip('hide');
            loader('.container > .row', true);
        },
        complete: function () {
            loader('.container > .row', false);
            if (Journal['filterScrollTop'] || (source === 'pagination')) {
                $('html, body').animate({
                    scrollTop: 0
                }, 700);
            }
        },
        success: function (response) {
            var $response = $(response);
            Journal['filterCollapsed'] = {};
            $('.module-filter .module-item .panel-heading a').each(function () {
                var $this = $(this);
                Journal['filterCollapsed'][$this.data('filter')] = $this.hasClass('collapsed');
            });
            $('.module-filter').replaceWith($response.find('.module-filter'));
            $('.main-products-wrapper').replaceWith($response.find('.main-products-wrapper'));
            $('#input-sort, #input-limit').removeAttr('onchange');
            var $panel_group = $('.panel-group');
            $panel_group.on('show.bs.collapse', function (e) {
                $(e.target).parent().addClass('panel-active');
                $(e.target).parent().removeClass('panel-collapsed');
            });
            $panel_group.on('hide.bs.collapse', function (e) {
                $(e.target).parent().removeClass('panel-active');
                $(e.target).parent().addClass('panel-collapsing');
            });
            $panel_group.on('hidden.bs.collapse', function (e) {
                $(e.target).parent().removeClass('panel-collapsing');
                $(e.target).parent().addClass('panel-collapsed');
            });
            Object.keys(Journal['filterCollapsed']).forEach(function (key) {
                var $collapse = $($('.module-filter .module-item .panel-heading a[data-filter="' + key + '"]').attr('href'));
                if (Journal['filterCollapsed'][key] === true) {
                    $collapse.collapse('hide');
                }
                if (Journal['filterCollapsed'][key] === false) {
                    $collapse.collapse('show');
                }
            });
            Journal.lazyLoadInstance && Journal.lazyLoadInstance.update();
            journal_filter_price_slider();
            journal_enable_stepper();
            journal_enable_countdown();
            if (Journal.infiniteScrollInstance) {
                $('.ias-trigger').remove();
                setTimeout(function () {
                    Journal.infiniteScrollInstance.reinitialize();
                }, 100);
            }
        }
    });
}
jQuery(function ($) {
    journal_filter_price_slider();
    var old;
    $(document).delegate('.filter-price-min, .filter-price-max', 'focus', function (e) {
        old = e.target.value;
    });
    $(document).delegate('.filter-price-min, .filter-price-max', 'blur keydown', function (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || (e.type === 'focusout')) {
            var value = e.target.value.trim();
            if ($.isNumeric(value) && (old !== value)) {
                journal_filter(journal_filter_url());
                return false;
            }
        }
    });
    $(document).delegate('[data-filter-trigger]', 'change', function () {
        journal_filter(journal_filter_url());
        return false;
    });
    $(document).delegate('.pagination a', 'click', function () {
        journal_filter($(this).attr('href'), {
            source: 'pagination'
        });
        return false;
    });
    $('#input-sort, #input-limit').removeAttr('onchange');
    $(document).delegate('#input-sort, #input-limit', 'change', function () {
        journal_filter($(this).val());
        return false;
    });
    $(window).on('popstate', function (e) {
        window.location.reload();
    });
    $(document).delegate('.reset-filter', 'click', function () {
        journal_filter(Journal['filterBase']);
    });
});
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}
$(function () {
    $('#form-currency .currency-select').unbind().on('click', function (e) {
        e.preventDefault();
        $('#form-currency input[name=\'code\']').val($(this).data('name'));
        $('#form-currency').submit();
    });
    $('#form-language .language-select').unbind().on('click', function (e) {
        e.preventDefault();
        $('#form-language input[name=\'code\']').val($(this).data('name'));
        $('#form-language').submit();
    });
});
window['cart'] = window['cart'] || {};
window['cart'].add = function (product_id, quantity, quick_buy) {
    quantity = quantity || 1;
    $.ajax({
        url: 'index.php?route=checkout/cart/add',
        type: 'post',
        data: 'product_id=' + product_id + '&quantity=' + quantity,
        dataType: 'json',
        beforeSend: function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
            $('[onclick*="cart.add(\'' + product_id + '\'"]').button('loading');
        },
        complete: function () {
            $('[onclick*="cart.add(\'' + product_id + '\'"]').button('reset');
        },
        success: function (json) {
            $('.alert, .text-danger').remove();
            if (json['redirect']) {
                if (json['options_popup']) {
                    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
                        iNoBounce.enable();
                    }
                    var html = '';
                    html += '<div class="popup-wrapper popup-options">';
                    html += ' <div class="popup-container">';
                    html += '  <button class="btn popup-close"></button>';
                    html += '  <div class="popup-body">';
                    html += '  <div class="popup-inner-body">';
                    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
                    html += '   <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&product_quantity=' + quantity + '&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
                    html += '  </div>';
                    html += '  </div>';
                    html += ' </div>';
                    html += ' <div class="popup-bg popup-bg-closable"></div>';
                    html += '</div>';
                    $('.popup-wrapper').remove();
                    $('body').append(html);
                    setTimeout(function () {
                        $('html').addClass('popup-open popup-center');
                    }, 10);
                } else {
                    location = json['redirect'];
                }
            }
            if (json['success']) {
                if (json['options_popup']) {
                    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
                        iNoBounce.enable();
                    }
                    var html = '';
                    html += '<div class="popup-wrapper popup-options">';
                    html += ' <div class="popup-container">';
                    html += '  <button class="btn popup-close"></button>';
                    html += '  <div class="popup-body">';
                    html += '  <div class="popup-inner-body">';
                    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
                    html += '   <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=options&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
                    html += '  </div>';
                    html += '  </div>';
                    html += ' </div>';
                    html += ' <div class="popup-bg popup-bg-closable"></div>';
                    html += '</div>';
                    $('.popup-wrapper').remove();
                    $('body').append(html);
                    setTimeout(function () {
                        $('html').addClass('popup-open popup-center');
                    }, 10);
                } else {
                    if (json['notification']) {
                        show_notification(json['notification']);
                        if (quick_buy) {
                            location = Journal['checkoutUrl'];
                        }
                    } else {
                        $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    }
                }
                setTimeout(function () {
                    $('#cart-total').html(json['total']);
                    $('#cart-items,.cart-badge').html(json['items_count']);
                    if (json['items_count']) {
                        $('#cart-items,.cart-badge').removeClass('count-zero');
                    } else {
                        $('#cart-items,.cart-badge').addClass('count-zero');
                    }
                }, 100);
                if (Journal['scrollToTop']) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
                if (parent.window['_QuickCheckout']) {
                    parent.window['_QuickCheckout'].save();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['cart'].remove = function (key) {
    $.ajax({
        url: 'index.php?route=checkout/cart/remove',
        type: 'post',
        data: 'key=' + key,
        dataType: 'json',
        beforeSend: function () {
            $('#cart > button').button('loading');
        },
        complete: function () {
            $('#cart > button').button('reset');
        },
        success: function (json) {
            setTimeout(function () {
                $('#cart-total').html(json['total']);
                $('#cart-items,.cart-badge').html(json['items_count']);
                if (json['items_count']) {
                    $('#cart-items,.cart-badge').removeClass('count-zero');
                } else {
                    $('#cart-items,.cart-badge').addClass('count-zero');
                }
            }, 100);
            if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
                location = 'index.php?route=checkout/cart';
            } else {
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['cart'].update = function (key, quantity) {
    $.ajax({
        url: 'index.php?route=checkout/cart/edit',
        type: 'post',
        data: 'key=' + key + '&quantity=' + (typeof (quantity) != 'undefined' ? quantity : 1),
        dataType: 'json',
        beforeSend: function () {
            $('#cart > button').button('loading');
        },
        complete: function () {
            $('#cart > button').button('reset');
        },
        success: function (json) {
            setTimeout(function () {
                $('#cart-total').html(json['total']);
                $('#cart-items,.cart-badge').html(json['items_count']);
                if (json['items_count']) {
                    $('#cart-items,.cart-badge').removeClass('count-zero');
                } else {
                    $('#cart-items,.cart-badge').addClass('count-zero');
                }
            }, 100);
            if ($('html').hasClass('route-checkout-cart') || $('html').hasClass('route-checkout-checkout')) {
                location = 'index.php?route=checkout/cart';
            } else {
                $('.cart-content ul').load('index.php?route=common/cart/info ul li');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['wishlist'] = window['wishlist'] || {};
window['wishlist'].add = function (product_id) {
    $.ajax({
        url: 'index.php?route=account/wishlist/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function (json) {
            $('.alert').remove();
            if (json['redirect']) {
                location = json['redirect'];
            }
            if (json['success']) {
                $('[data-toggle="tooltip"]').tooltip('hide');
                if (json['notification']) {
                    show_notification(json['notification']);
                } else {
                    $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
            }
            $('#wishlist-total span').html(json['total']);
            $('#wishlist-total').attr('title', json['total']);
            $('.wishlist-badge').text(json['count']);
            if (json['count']) {
                $('.wishlist-badge').removeClass('count-zero');
            } else {
                $('.wishlist-badge').addClass('count-zero');
            }
            if (Journal['scrollToTop']) {
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['compare'] = window['compare'] || {};
window['compare'].add = function (product_id) {
    $.ajax({
        url: 'index.php?route=product/compare/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function (json) {
            $('.alert').remove();
            if (json['success']) {
                $('[data-toggle="tooltip"]').tooltip('hide');
                if (json['notification']) {
                    show_notification(json['notification']);
                } else {
                    $('header').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
                $('#compare-total').html(json['total']);
                $('.compare-badge').text(json['count']);
                if (json['count']) {
                    $('.compare-badge').removeClass('count-zero');
                } else {
                    $('.compare-badge').addClass('count-zero');
                }
                if (Journal['scrollToTop']) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['quickview'] = function (product_id) {
    product_id = parseInt(product_id, 10);
    $('[data-toggle="tooltip"]').tooltip('hide');
    var html = '';
    html += '<div class="popup-wrapper popup-quickview">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '   <div class="popup-inner-body">';
    html += '    <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '    <iframe src="index.php?route=journal3/product&product_id=' + product_id + '&popup=quickview" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').hide();"></iframe>';
    html += '   </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function () {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['open_popup'] = function (module_id) {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    module_id = parseInt(module_id, 10);
    var html = '';
    html += '<div class="popup-wrapper popup-module">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function () {
        $('html').addClass('popup-open popup-center');
    }, 10);
    $('.popup-container').css('visibility', 'hidden');
    $.ajax({
        url: 'index.php?route=journal3/popup/get&module_id=' + module_id + '&popup=module',
        success: function (html) {
            var $html = $(html);
            var $popup = $html.siblings('.module-popup');
            var $style = $html.siblings('style');
            var $content = $popup.find('.popup-container');
            $('#popup-style-' + module_id).remove();
            $('head').append($style.attr('id', 'popup-style-' + module_id));
            $('.popup-wrapper').attr('class', $popup.attr('class'));
            $('.popup-container').html($content.html());
            $('.popup-container').css('visibility', 'visible');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
        }
    });
};
window['open_login_popup'] = function () {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    var html = '';
    html += '<div class="popup-wrapper popup-login">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '   <iframe src="index.php?route=account/login&popup=login" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function () {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['open_register_popup'] = function () {
    if ($('html').hasClass('iphone') || $('html').hasClass('ipad')) {
        iNoBounce.enable();
    }
    var html = '';
    html += '<div class="popup-wrapper popup-register">';
    html += ' <div class="popup-container">';
    html += '  <button class="btn popup-close"></button>';
    html += '  <div class="popup-body">';
    html += '  <div class="popup-inner-body">';
    html += '   <div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div>';
    html += '   <iframe src="index.php?route=account/register&popup=register" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
    html += '  </div>';
    html += '  </div>';
    html += ' </div>';
    html += ' <div class="popup-bg popup-bg-closable"></div>';
    html += '</div>';
    $('.popup-wrapper').remove();
    $('body').append(html);
    setTimeout(function () {
        $('html').addClass('popup-open popup-center');
    }, 10);
};
window['show_notification'] = function (opts) {
    opts = $.extend({
        position: 'center',
        className: '',
        title: '',
        image: '',
        message: '',
        buttons: [],
        timeout: Journal.notificationHideAfter
    }, opts);
    if ($('.notification-wrapper-' + opts.position).length === 0) {
        $('body').append('<div class="notification-wrapper notification-wrapper-' + opts.position + '"></div>');
    }
    var html = '';
    var buttons = $.map(opts.buttons, function (button) {
        return '<a class="' + button.className + '" href="' + button.href + '">' + button.name + '</a>';
    });
    html += '<div class="notification ' + opts.className + '">';
    html += ' <button class="btn notification-close"></button>';
    html += ' <div class="notification-content">';
    if (opts.image) {
        html += '  <img src="' + opts.image + '" srcset="' + opts.image + ' 1x, ' + opts.image2x + ' 2x">';
    }
    html += '  <div>';
    html += '   <div class="notification-title">' + opts.title + '</div>';
    html += '   <div class="notification-text">' + opts.message + '</div>';
    html += '  </div>';
    html += ' </div>';
    if (buttons && buttons.length) {
        html += '<div class="notification-buttons">' + buttons.join('\n') + '</div>';
    }
    html += '</div>';
    var $notification = $(html);
    $('.notification-wrapper-' + opts.position).append($notification);
    if (opts.timeout) {
        setTimeout(function () {
            $notification.find('.notification-close').trigger('click');
        }, opts.timeout);
    }
    return $notification;
};
window['loader'] = function (el, status) {
    var $el = $(el);
    if (status) {
        $el.attr('style', 'position: relative');
        $el.append('<div class="journal-loading-overlay"><div class="journal-loading"><i class="fa fa-spinner fa-spin"></i></div></div>');
    } else {
        $el.attr('style', '');
        $el.find('.journal-loading-overlay').remove();
    }
};
window['resize_iframe'] = function (module_id, height) {
    $('.module-popup-' + module_id + ' iframe').height(height);
};

function journal_enable_countdown() {
    $('.countdown').each(function () {
        var $this = $(this);
        if ($this.data('_isEnabled')) {
            return;
        }
        $this.data('_isEnabled', true);
        $this.countdown({
            date: $this.data('date'),
            render: function (data) {
                return $(this.el).html('<div>' + this.leadingZeros(data.days, 2) + ' <span>' + Journal['countdownDay'] + '</span></div>' + '<div>' + this.leadingZeros(data.hours, 2) + ' <span>' + Journal['countdownHour'] + '</span></div>' + '<div>' + this.leadingZeros(data.min, 2) + ' <span>' + Journal['countdownMin'] + '</span></div>' + '<div>' + this.leadingZeros(data.sec, 2) + ' <span>' + Journal['countdownSec'] + '</span></div>');
            }
        });
    });
}

function journal_enable_stepper() {
    $('.stepper').each(function () {
        var $this = $(this);
        if ($this.data('_isEnabled')) {
            return;
        }
        $this.data('_isEnabled', true);
        var $input = $this.find('input[name^="quantity"]');
        var value = $input.val();
        var minimum = parseInt($input.data('minimum')) || 1;
        $this.find('.fa-angle-up').on('click', function () {
            $input.val(parseInt($input.val()) + 1);
            $input.trigger('change');
        });
        $this.find('.fa-angle-down').on('click', function () {
            if (parseInt($input.val()) > minimum) {
                $input.val(parseInt($input.val()) - 1);
                $input.trigger('change');
            }
        });
        $input.on('keypress', function (e) {
            if ((e.which < 48 || e.which > 57) && [8].indexOf(e.which) === -1) {
                e.preventDefault();
            }
        });
        $input.on('keydown', function (e) {
            if (e.which === 38) {
                e.preventDefault();
                $input.val(parseInt($input.val()) + 1);
                $input.trigger('change');
            }
            if (e.which === 40) {
                e.preventDefault();
                if (parseInt($input.val()) > minimum) {
                    $input.val(parseInt($input.val()) - 1);
                    $input.trigger('change');
                }
            }
        });
        $input.on('blur', function () {
            if ($('html').hasClass('firefox')) {}
            if ((parseInt($input.val()) || 0) < minimum) {
                $input.val(value);
                $input.trigger('change');
            }
        });
    });
}
jQuery(function ($) {
    var $html = $('html');
    var $body = $('body');
    var $content = $('#content');
    var $column_left = $('#column-left');
    var $column_right = $('#column-right');
    var $panel_group = $('.panel-group');
    var $main_products = $('.main-products');
    Journal.lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazyload',
        class_loading: 'lazyloading',
        class_loaded: 'lazyloaded'
    });
    $(document).on('show.bs.tooltip', function (e) {
        if ($html.hasClass('touchevents')) {
            e.preventDefault();
        }
        var $target = $(e.target);
        var cls = $target.data('tooltipClass');
        if (cls) {
            $target.data('bs.tooltip').$tip.addClass(cls);
        }
    });
    $(document).on('show.bs.popover', function (e) {
        if ($html.hasClass('touchevents')) {
            e.preventDefault();
        }
        var $target = $(e.target);
        var cls = $target.data('popoverClass');
        if (cls) {
            $target.data('bs.popover').$tip.addClass(cls);
        }
    });
    $(document).on('dp.show', function (e) {
        var $target = $(e.target);
        var cls = $target.data('pickerClass');
        if (cls) {
            $target.data('DateTimePicker').widget.addClass(cls);
        }
    });
    $(document).on('shown.bs.dropdown', function (e) {
        var $target = $(e.target);
        var $toggle = $target.find('> .dropdown-toggle');
        $toggle.addClass('disabled');
        $target.outerWidth();
        $target.addClass('animating');
    });
    $(document).on('hide.bs.dropdown', function (e) {
        var $target = $(e.target);
        var $toggle = $target.find('> .dropdown-toggle');
        $target.removeClass('animating');
        $toggle.removeClass('disabled');
        $('html.search-page').removeClass('search-page-open');
    });
    if ('ontouchstart' in document) {
        $('.main-menu .dropdown .dropdown > .dropdown-toggle, .flyout-menu .dropdown .dropdown > .dropdown-toggle, .mini-search .search-categories-button').on('click', function (e) {
            var $this = $(this);
            var $parent = $this.parent();
            var isOpen = $parent.hasClass('open');
            var isLink = false;
            $parent.parent().find('.open').removeClass('open');
            if (isOpen) {
                if ($this.attr('href')) {
                    isLink = true;
                } else {
                    $parent.removeClass('open').trigger('hide.bs.dropdown');
                }
            } else {
                $parent.addClass('open').trigger('shown.bs.dropdown');
            }
            if (!isLink) {
                return false;
            }
        });
    } else {
        function mouseOver() {
            var $this = $(this);
            var $trigger = $('> .dropdown-toggle', this);
            clearTimeout(this.__timeout);
            $trigger.attr('aria-expanded', 'true').attr('data-toggle', '');
            $this.addClass('open');
            $this.outerWidth();
            $this.addClass('animating');
        }

        function mouseOut() {
            var $this = $(this);
            var $trigger = $('> .dropdown-toggle', this);
            $this.removeClass('animating');
            clearTimeout(this.__timeout);
            this.__timeout = setTimeout(function () {
                $this.removeClass('open');
                $trigger.attr('aria-expanded', 'false');
            }, 300);
        }
        $('.dropdown').each(function () {
            var $this = $(this);
            if ($this.is($('.search-page #search'))) {
                $('> .dropdown-toggle', this).on('click', function () {
                    $('html.search-page').addClass('search-page-open');
                    var $this = $(this);
                    var $parent = $this.parent();
                    var isOpen = $parent.hasClass('open');
                    var isLink = false;
                    $parent.parent().find('.open').removeClass('open');
                    if (isOpen) {
                        if ($this.attr('href')) {
                            isLink = true;
                        } else {
                            $parent.removeClass('open').trigger('hide.bs.dropdown');
                        }
                    } else {
                        $parent.addClass('open').trigger('shown.bs.dropdown');
                    }
                    if (!isLink) {
                        return false;
                    }
                });
            } else if ($this.hasClass('main-menu-item')) {
                $this.hoverIntent(mouseOver, mouseOut);
            } else {
                $this.hover(mouseOver, mouseOut);
            }
        });
    }
    $panel_group.on('show.bs.collapse', function (e) {
        $(e.target).parent().addClass('panel-active');
        $(e.target).parent().removeClass('panel-collapsed');
    });
    $panel_group.on('hide.bs.collapse', function (e) {
        $(e.target).parent().removeClass('panel-active');
        $(e.target).parent().addClass('panel-collapsing');
    });
    $panel_group.on('hidden.bs.collapse', function (e) {
        $(e.target).parent().removeClass('panel-collapsing');
        $(e.target).parent().addClass('panel-collapsed');
    });
    $(document).delegate('.accordion-menu span[data-toggle="collapse"]', 'click', function (e) {
        e.preventDefault();
        $(this).closest('.menu-item').toggleClass('open');
    });
    $(document).delegate('.mobile .accordion-menu li > a', 'click', function (e) {
        var $this = $(this);
        var $trigger = $this.find('.open-menu');
        if (!$trigger.length) {
            return;
        }
        if ($trigger.attr('aria-expanded') === 'true' && $this.attr('href')) {
            return;
        }
        e.preventDefault();
        $($trigger.data('target')).collapse('toggle');
    });
    if (Journal['infiniteScrollStatus'] && $.ias && $main_products.length) {
        Journal.infiniteScrollInstance = $.ias({
            container: '.main-products',
            item: '.product-layout',
            pagination: '.pagination-results',
            next: '.pagination a.next'
        });
        Journal.infiniteScrollInstance.extension(new IASTriggerExtension({
            offset: parseInt(Journal['infiniteScrollOffset'], 10) || Infinity,
            text: Journal['infiniteScrollLoadNext'],
            textPrev: Journal['infiniteScrollLoadPrev'],
            htmlPrev: '<div class="ias-trigger ias-trigger-prev"><a class="btn">{text}</a></div>',
            html: '<div class="ias-trigger ias-trigger-next"><a class="btn">{text}</a></div>'
        }));
        Journal.infiniteScrollInstance.extension(new IASSpinnerExtension({
            html: '<div class="ias-spinner"><i class="fa fa-spinner fa-spin"></i></div>'
        }));
        Journal.infiniteScrollInstance.extension(new IASNoneLeftExtension({
            text: Journal['infiniteScrollNoneLeft']
        }));
        Journal.infiniteScrollInstance.extension(new IASPagingExtension());
        Journal.infiniteScrollInstance.extension(new IASHistoryExtension({
            prev: '.pagination a.prev'
        }));
        Journal.infiniteScrollInstance.on('load', function (event) {
            try {
                var u = new URL(event.url);
                u.host = window.location.host;
                u.hostname = window.location.hostname;
                u.protocol = window.location.protocol;
                event.url = u.toString();
            } catch (e) {}
        });
        Journal.infiniteScrollInstance.on('loaded', function (data) {
            $('.pagination-results').html($(data).find('.pagination-results'));
        });
        Journal.infiniteScrollInstance.on('rendered', function (data) {
            Journal.lazyLoadInstance && Journal.lazyLoadInstance.update();
            journal_enable_countdown();
            journal_enable_stepper();
        });
    }
    $('.revolution').each(function () {
        var $this = $(this);
        var $img = $('>img', this);
        $this.css('height', $img.height());
        var options = $.extend(true, {
            spinner: 'off',
            sliderType: 'standard',
            sliderLayout: 'auto',
            autoHeight: 'on',
            navigation: {
                arrows: {
                    enable: true
                }
            }
        }, $this.data('options'));
        var $slider = $('.rev_slider', this).revolution(options);
        $slider.on('revolution.slide.onloaded', function () {
            $img.remove();
            $this.removeClass('rev_hide_navigation');
            $this.find('.tp-caption-hotspot').popover({
                container: 'body',
                trigger: 'hover',
                html: true,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
            });
        });
        $slider.on('revolution.slide.onchange', function () {
            $this.removeAttr('style');
        });
        $this.data('slider', $slider);
    });
    $('.layerslider').each(function () {
        var $this = $(this);
        var $img = $('>img', this);
        $this.css({
            width: $this.width(),
            height: $this.height()
        });
        var options = $.extend(true, {
            sliderVersion: '6.1.0',
            skin: 'v6',
            maxRatio: 1,
            navStartStop: false,
            showCircleTimer: false,
            tnContainerWidth: '100%',
            skinsPath: 'catalog/view/theme/journal3/lib/layerslider/skins/'
        }, $this.data('options'));
        $this.on('sliderDidLoad', function () {
            $img.remove();
        });
        var $slider = $this.layerSlider(options);
        $slider.on('slideTimelineDidCreate', function () {
            $this.find('.ls-layer-hotspot').each(function () {
                var $this = $(this);
                if (!$this.data('bs.popover')) {
                    $this.popover({
                        container: 'body',
                        trigger: 'hover',
                        html: true,
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
                    });
                }
            });
        });
    });
    $('.master-slider').each(function () {
        var $this = $(this);
        var options = $.extend(true, {
            loop: true,
            mobileBGVideo: true
        }, $this.data('options'));
        var $slider = $this.masterslider(options);
        var $img = $('>img', $(this).parent());
        $slider.masterslider('slider').api.addEventListener(MSSliderEvent.INIT, function () {
            $slider.parent().find('.journal-loading').remove();
            $img.css({
                position: 'absolute',
                'z-index': -1
            });
            setTimeout(function () {
                $img.remove();
                $this.parent().css('background-image', 'none');
            }, 1500);
        });
        $slider.masterslider('slider').api.addEventListener(MSSliderEvent.CHANGE_START, function () {
            $this.find('video').each(function () {
                $(this)[0].pause();
            });
        });
        if ($this.data('parallax')) {
            MSScrollParallax.setup($slider.masterslider('slider'), 0, $this.data('parallax'), false);
        }
    });
    $('.isotope').each(function () {
        var $this = $(this);
        var filter = $this.find('ul .active a').attr('data-filter') || null;
        var $isotope = $this.find('.isotope-grid').isotope({
            itemSelector: '.isotope-item',
            filter: filter
        });
        $this.find('ul a').on('click', function () {
            var $this2 = $(this);
            $this.find('ul li').removeClass('active');
            $this2.closest('li').addClass('active');
            $isotope.isotope({
                filter: $this2.attr('data-filter')
            });
        });
    });
    $('.swiper').each(function () {
        var $this = $(this);
        var c = 'c0';
        if ($content.has($this).length) {
            c = 'c' + window['Journal']['columnsCount'];
        } else if ($column_left.has($this).length || $column_right.has($this).length) {
            c = 'sc';
        }
        var itemsPerRow = $this.data('items-per-row') ? $this.data('items-per-row')[c] : {
            0: {
                items: 1,
                spacing: 0
            }
        };
        var breakpoints = {};
        $.each(itemsPerRow, function (v, k) {
            breakpoints[v] = {
                slidesPerView: parseInt(k.items, 10),
                slidesPerGroup: parseInt(k.items, 10),
                spaceBetween: parseInt(k.spacing, 10)
            }
        });
        var options = $.extend({
            init: false,
            slidesPerView: parseInt(itemsPerRow[0].items, 10),
            slidesPerGroup: parseInt(itemsPerRow[0].items, 10),
            spaceBetween: parseInt(itemsPerRow[0].spacing, 10),
            breakpoints: breakpoints,
            observer: true,
            observeParents: true,
            paginationClickable: true,
            preventClicks: false,
            preventClicksPropagation: false,
            simulateTouch: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            navigation: {
                nextEl: $this.find('.swiper-button-next'),
                prevEl: $this.find('.swiper-button-prev')
            },
            pagination: {
                el: $this.find('.swiper-pagination'),
                type: 'bullets',
                clickable: true
            },
            scrollbar: $this.find('.swiper-scrollbar'),
            scrollbarHide: false,
            scrollbarDraggable: true
        }, $this.data('options'));
        if (options.loop && ($(this).find('.swiper-slide').length < 2)) {
            options.loop = false;
        }
        if (!Journal.isDesktop) {
            options.a11y = false;
        }
        var swiper = new Swiper($('.swiper-container', this), options);

        function checkPages() {
            if ($('.product-image').hasClass('direction-vertical') && $this.hasClass('additional-images')) {
                var height = Journal['isPopup'] ? Journal['quickviewPageStyleAdditionalImagesHeightAdjustment'] : Journal['productPageStyleAdditionalImagesHeightAdjustment'];
                var interval = setInterval(function () {
                    var imageHeight = $('.main-image .swiper-slide-visible img').outerHeight();
                    if (imageHeight) {
                        $this.css('height', imageHeight + (parseInt(height, 10) || 0));
                        swiper.update();
                        clearInterval(interval);
                        $('.product-image').addClass('additional-images-loaded');
                    }
                }, 1000);
            }
            if (swiper.isBeginning && swiper.isEnd) {
                $this.removeClass('swiper-has-pages');
            } else {
                $this.addClass('swiper-has-pages');
            }
        }
        swiper.on('init', checkPages);
        swiper.on('resize', checkPages);
        swiper.init();
        if (options.autoplay) {
            if (options.pauseOnHover) {
                $('.swiper-container', this).hover(function () {
                    swiper.autoplay.stop();
                }, function () {
                    swiper.autoplay.start();
                });
            }
            swiper.on('observerUpdate', function () {
                var visible = $(swiper.$el).is(':visible');
                var running = swiper.autoplay.running;
                if (visible && !running) {
                    swiper.autoplay.start();
                }
                if (!visible && running) {
                    swiper.autoplay.stop();
                }
            });
        }
        swiper.on('observerUpdate', function () {
            Journal.lazyLoadInstance && Journal.lazyLoadInstance.update();
        });
        $this.data('swiper', swiper);
    });
    $(document).delegate('[data-gallery]', 'click', function () {
        var $this = $(this);
        var $gallery = $($this.data('gallery'));
        var index = parseInt($this.data('index'), 10) || 0;
        if ($gallery.data('lightGallery')) {
            $gallery.data('lightGallery').s.index = index;
        }
        $gallery.lightGallery($.extend({
            dynamic: true,
            dynamicEl: $gallery.data('images'),
            index: index,
            download: false,
            loadYoutubeThumbnail: false,
            loadVimeoThumbnail: false,
            share: false,
            pager: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            thumbWidth: 100,
            thumbContHeight: 100,
            thumbMargin: 0,
            showThumbByDefault: true,
            hash: false
        }, $gallery.data('options')));
        $gallery.on('onAfterOpen.lg', function () {
            $('.lg-backdrop').addClass($gallery.data('lightGallery').s.addClass);
        });
        return false;
    });
    $('.module-catalog.image-on-hover .subitem').hover(function () {
        var $this = $(this);
        var $img = $this.closest('.item-content').find('.catalog-image img');
        if ($img.length) {
            $img[0]._src = $img.attr('src');
            $img[0]._srcSet = $img.attr('srcset');
            $img.attr('src', $this.data('image'));
            $img.attr('srcset', $this.data('image2x'));
        }
    }, function () {
        var $this = $(this);
        var $img = $this.closest('.item-content').find('.catalog-image img');
        if ($img.length) {
            $img.attr('src', $img[0]._src);
            $img.attr('srcset', $img[0]._srcSet);
        }
    });
    $('.block-expand').on('click', function () {
        $(this).closest('.expand-block').find('.expand-content').toggleClass('block-expanded');
    });
    $('.search-input').focus(function () {
        $(this).closest('.header-search').addClass('focused');
    }).blur(function () {
        $(this).closest('.header-search').removeClass('focused');
    });
    journal_enable_stepper();
    journal_enable_countdown();
    $('.module-blog_search').each(function () {
        var $this = $(this);
        var $input = $this.find('input');
        var $button = $this.find('button');
        $button.on('click', function () {
            var search = $input.val().trim();
            if (search) {
                parent.window.location = $this.data('url') + encodeURIComponent(search);
            }
        });
        $input.on('keydown', function (e) {
            if (e.keyCode === 13) {
                var search = $input.val().trim();
                if (search) {
                    parent.window.location = $this.data('url') + encodeURIComponent(search);
                }
            }
        });
    });
    $(document).delegate('.module-newsletter .btn-primary', 'click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('form');

        function ajax(unsubscribe) {
            $.ajax({
                url: $form.attr('action') + (unsubscribe ? '&unsubscribe=1' : ''),
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                beforeSend: function () {
                    $this.button('loading');
                },
                complete: function () {
                    $this.button('reset');
                },
                success: function (json) {
                    if (json.status === 'success') {
                        if (json.response.unsubscribe) {
                            if (confirm(json.response.message)) {
                                ajax(true);
                            }
                        } else {
                            alert(json.response.message);
                        }
                    } else {
                        alert(json.response);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
                }
            })
        }
        ajax();
    });
    $('.module-header_notice').each(function () {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'hn-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.slideDown();
        }
        $this.find('.header-notice-close-button button').on('click', function () {
            anime({
                targets: $this[0],
                height: 0,
                duration: parseInt(options['duration']),
                easing: options['ease'],
                complete: function () {
                    $this.remove();
                }
            });
            Cookies.set(cookie, '1', {
                expires: 365
            });
        });
    });
    $('.module-layout_notice').each(function () {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'ln-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.slideDown();
        }
        $this.find('.layout-notice-close-button button').on('click', function () {
            anime({
                targets: $this[0],
                height: 0,
                duration: parseInt(options['duration']),
                easing: options['ease'],
                complete: function () {
                    $this.remove();
                }
            });
            Cookies.set(cookie, '1', {
                expires: 365
            });
        });
    });
    $('.module-notification').each(function () {
        var $this = $(this);
        var options = $this.data('options');
        var cookie = 'n-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            $this.find('.notification-close').on('click', function () {
                Cookies.set(cookie, '1', {
                    expires: 365
                });
            });
        }
    });
    $(document).delegate('.notification-close', 'click', function () {
        var $this = $(this);
        var height = $this.parent().outerHeight();
        $this.parent().next('div').css('margin-top', -height);
        $('.removed').removeClass('removed');
        $this.parent().addClass('fade-out').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function () {
            $(this).next('div').addClass('removed').css('margin-top', '');
            $(this).remove();
        });
    });
    $('.module-popup').each(function () {
        var $this = $(this);
        var options = $.extend({
            message: $this.html(),
            timeout: 0
        }, $this.data('options'));
        var cookie = 'p-' + options['cookie'];
        if (!Cookies.get(cookie)) {
            setTimeout(function () {
                $('html').addClass('popup-open popup-center');
                var $checkbox = $this.find('.popup-dont-show input[type="checkbox"]');
                $checkbox.on('change', function () {
                    if ($(this).is(':checked')) {
                        Cookies.set(cookie, '1', {
                            expires: 365
                        });
                    } else {
                        Cookies.remove(cookie);
                    }
                });
                if ($checkbox.is(':checked')) {
                    Cookies.set(cookie, '1', {
                        expires: 365
                    });
                }
            }, parseInt(options['showAfter'], 10) || 1);
        }
        var hideAfter = parseInt(options['hideAfter'], 10) || 0;
        if (hideAfter) {
            setTimeout(function () {
                $html.removeClass('popup-open popup-center');
                if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
                    iNoBounce.disable();
                }
                $('.popup-wrapper').attr('removing', true);
                setTimeout(function () {
                    if ($('.popup-wrapper').attr('removing')) {
                        $('.popup-wrapper').remove();
                    }
                }, 5000);
            }, hideAfter);
        }
    });
    $(document).delegate('.popup-close, .popup-bg-closable, .btn-popup:not([href])', 'click', function () {
        $html.removeClass('popup-open popup-center');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.disable();
        }
        $('.popup-wrapper').attr('removing', true);
        setTimeout(function () {
            if ($('.popup-wrapper').attr('removing')) {
                $('.popup-wrapper').remove();
            }
        }, 5000);
    });
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
            parent.$('.popup-bg-closable').trigger('click');
        }
    });
    $(document).delegate('html.popup-login .login-form button, html.popup-register .register-form .buttons button', 'click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('form');
        $form.find('.has-error').removeClass('has-error');
        $form.find('.text-danger').remove();
        $this.button('loading');
        $.ajax({
            url: $form.attr('action').replace('https:', location.protocol),
            type: 'post',
            data: $form.serialize(),
            dataType: 'json',
            error: function () {
                $this.button('reset');
            },
            success: function (json) {
                if (json.status === 'success') {
                    if ($form.hasClass('login-form')) {
                        if (parent.$('html').hasClass('route-account-logout')) {
                            parent.window.location = $('base').attr('href');
                        } else {
                            parent.window.location.reload();
                        }
                    } else {
                        if (json.customer) {
                            parent.window.location = $('base').attr('href');
                        } else {
                            parent.window.location = 'index.php?route=account/success';
                        }
                    }
                } else {
                    $this.button('reset');
                    $.each(json.response, function (field, value) {
                        if (field === 'custom_field') {
                            $.each(value, function (key, val) {
                                $('#custom-field' + key).addClass('has-error').find('input').after('<div class="text-danger">' + val + '</div>');
                            });
                        } else {
                            $form.find('[name="' + field + '"]').closest('.form-group').addClass('has-error').after('<div class="text-danger">' + value + '</div>');
                        }
                    });
                    if (json.response.warning) {
                        var $span = $('<span style="display: none !important;"></span>').html(json.response.warning);
                        $span.appendTo($('body'));
                        var msg = $span.html();
                        $span.remove();
                        alert(msg);
                    }
                }
            }
        });
    });
    $('.module-form').each(function () {
        if ($.fn.datetimepicker) {
            $('.date', this).datetimepicker({
                pickTime: false
            });
            $('.datetime', this).datetimepicker({
                pickDate: true,
                pickTime: true
            });
            $('.time', this).datetimepicker({
                pickDate: false
            });
        }
        $('.upload-btn', this).on('click', function () {
            var node = this;
            $('#form-upload').remove();
            $('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');
            $('#form-upload input[name=\'file\']').trigger('click');
            if (typeof timer != 'undefined') {
                clearInterval(timer);
            }
            timer = setInterval(function () {
                if ($('#form-upload input[name=\'file\']').val() != '') {
                    clearInterval(timer);
                    $.ajax({
                        url: 'index.php?route=tool/upload',
                        type: 'post',
                        dataType: 'json',
                        data: new FormData($('#form-upload')[0]),
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            $(node).button('loading');
                        },
                        complete: function () {
                            $(node).button('reset');
                        },
                        success: function (json) {
                            $('.text-danger').remove();
                            if (json['error']) {
                                $(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
                            }
                            if (json['success']) {
                                alert(json['success']);
                                $(node).parent().find('input').val(json['code']);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
                        }
                    });
                }
            }, 500);
        });
    });
    $(document).delegate('.btn-extra', 'click', function () {
        parent.window.__popup_url = $(this).data('product_url') || '';
    });
    $(document).delegate('.module-form .btn-primary', 'click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $form = $this.closest('.module-form').find('form');
        $form.find('.has-error').removeClass('has-error');
        $form.find('.text-danger').remove();
        var data = $form.serializeArray();
        data.push({
            name: 'url',
            value: parent.window.__popup_url || parent.window.location.toString()
        });
        $.ajax({
            url: $form.attr('action'),
            type: 'post',
            data: data,
            dataType: 'json',
            beforeSend: function () {
                $this.button('loading');
            },
            complete: function () {
                $this.button('reset');
            },
            success: function (response) {
                if (response.status === 'success') {
                    alert(response.response.message);
                    $form[0].reset();
                    parent.window.__popup_url = undefined;
                    parent.$('.module-popup-' + Journal['modulePopupId'] + ' .popup-close').trigger('click');
                }
                if (response.status === 'error') {
                    $.each(response.response.errors, function (field, error) {
                        if (field === 'agree') {
                            alert(error);
                        } else if (field === 'captcha') {
                            $form.find('.captcha').addClass('has-error');
                        } else {
                            $form.find('[name^="' + field + '"]').closest('.form-group').addClass('has-error').after('<div class="text-danger">' + error + '</div>');
                        }
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText);
            }
        });
    });
    $(document).delegate('.grid-list .view-btn', 'click', function () {
        var $this = $(this);
        var $products = $('.main-products');
        var view = $this.data('view');
        var current = $products.hasClass('product-grid') ? 'grid' : 'list';
        $this.tooltip('hide');
        if (view !== current) {
            $products.addClass('no-transitions').removeClass('product-' + current).addClass('product-' + view);
            setTimeout(function () {
                $products.removeClass('no-transitions');
            }, 1);
            Cookies.set('view', view, {
                expires: 365
            });
        }
        $('.grid-list .view-btn').removeClass('active');
        $this.addClass('active');
    });
    $('.desktop-main-menu-wrapper #main-menu > .j-menu > .main-menu-item').first().addClass('first-dropdown');
    var $desktop_main_menu_wrapper = $('.desktop-main-menu-wrapper');
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseover', function () {
        $body.addClass('menu-hover');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .menu-item:not(.dropdown)', 'mouseleave', function () {
        $body.removeClass('menu-hover');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu > .j-menu > .dropdown', 'mouseover', function () {
        $body.addClass('menu-open');
    });
    $desktop_main_menu_wrapper.delegate('.main-menu', 'mouseleave', function () {
        $body.removeClass('menu-open');
    });
    if (($html.hasClass('iphone') || $html.hasClass('ipad')) && !$html.hasClass('popup-open')) {
        iNoBounce.disable();
    }
    $(document).delegate('.menu-trigger', 'click', function (e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-main-menu-container-open');
        if ($html.hasClass('mobile-menu-active')) {
            $('[data-is-open]').each(function () {
                $('> a > .open-menu', this).trigger('click');
                $(this).removeAttr('data-is-open');
            });
        }
        var $container = $('.mobile-main-menu-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
    });
    if ($html.hasClass('mobile-header-active')) {
        $('.cart-content > ul').appendTo('.mobile-cart-content-wrapper');
    }
    $(document).delegate('.mobile-header-active .cart-heading', 'click', function (e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-cart-content-container-open');
        var $totals = $('.cart-totals').outerHeight();
        $('.cart-products').css('padding-bottom', $totals - 1);
        var $container = $('.mobile-cart-content-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
        return false;
    });
    if (Journal['isPhone'] || (Journal['isTablet'] && (!Journal['globalPageColumnLeftTabletStatus'] || !Journal['globalPageColumnRightTabletStatus']))) {
        if ($('.module-filter').length) {
            $('.module-filter h3 > *').prependTo('.mobile-filter-container .mobile-wrapper-header');
            $('.module-filter').appendTo('.mobile-filter-wrapper');
            $('<a class="mobile-filter-trigger btn">' + Journal['mobileFilterButtonText'] + '</a>').appendTo('body');
        }
    }
    $(document).delegate('.mobile-header-active .mobile-filter-trigger', 'click', function (e) {
        e.stopPropagation();
        $html.addClass('mobile-overlay mobile-filter-container-open');
        var $container = $('.mobile-filter-container');
        $container.outerWidth();
        $container.addClass('animating');
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.enable();
        }
        return false;
    });
    $(document).delegate('.x, .site-wrapper, .close-filter', 'click', function () {
        $('.mobile-container.animating').removeClass('animating');
        $html.removeClass('mobile-overlay');
        setTimeout(function () {
            $html.removeClass('mobile-main-menu-container-open mobile-cart-content-container-open mobile-filter-container-open');
        }, 300);
        if ($html.hasClass('iphone') || $html.hasClass('ipad')) {
            iNoBounce.disable();
        }
    });
    if ($html.hasClass('route-product-product')) {
        $(document).delegate('.additional-image', 'click', function () {
            $('.additional-image').removeClass('swiper-slide-active');
            $(this).addClass('swiper-slide-active');
            var $s = $('.main-image').data('swiper');
            if ($s.params.loop) {
                $s.slideToLoop($(this).data('index'), 0);
            } else {
                $s.slideTo($(this).data('index'), 0);
            }
        });
        if (!('ontouchstart' in document)) {
            if (Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomStatus'] : Journal['productPageStyleCloudZoomStatus']) {
                $('.main-image img').each(function () {
                    var $this = $(this);
                    $this.ImageZoom({
                        type: Journal['isPopup'] ? Journal['quickviewPageStyleCloudZoomPosition'] : Journal['productPageStyleCloudZoomPosition'],
                        showDescription: false,
                        offset: [0, 0],
                        zoomSize: [$this.width(), $this.height()],
                        bigImageSrc: $this.data('largeimg')
                    });
                });
                $('.product-image').mouseover(function () {
                    $('.zm-viewer').delay(200).queue(function (next) {
                        $(this).css('opacity', '1');
                        next();
                    });
                }).mouseleave(function () {
                    $('.zm-viewer').css('opacity', '0');
                });
            }
        }
        if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'all') {
            $('.product-options .form-group .radio:first-child input, .product-options .form-group .checkbox:first-child input').prop('checked', true);
            $('.product-options .form-group select').each(function () {
                $(this).find('option').eq(1).prop('selected', true);
            });
        }
        if ((Journal['isPopup'] ? Journal['quickviewPageStyleOptionsSelect'] : Journal['productPageStyleOptionsSelect']) === 'required') {
            $('.product-options .form-group.required .radio:first-child input, .product-options .form-group.required .checkbox:first-child input').prop('checked', true);
            $('.product-options .form-group.required select').each(function () {
                $(this).find('option').eq(1).prop('selected', true);
            });
        }
        if (Journal['isPopup'] ? Journal['quickviewPageStylePriceUpdate'] : Journal['productPageStylePriceUpdate']) {
            function autoUpdatePrice() {
                $.ajax({
                    url: 'index.php?route=journal3/price',
                    type: 'post',
                    data: $('#product-id, #product-quantity, #product input[type="radio"]:checked, #product input[type="checkbox"]:checked, #product select'),
                    dataType: 'json',
                    beforeSend: function () {},
                    complete: function () {},
                    success: function (json) {
                        if (json['response']['status'] === 'error') {
                            alert(json['response']['message']);
                        } else {
                            if (json['response']['stock']) {
                                $('.product-stock span').html(json['response']['stock']);
                            }
                            if (json['response']['in_stock']) {
                                $('.product-stock').removeClass('out-of-stock').addClass('in-stock');
                            } else {
                                $('.product-stock').removeClass('in-stock').addClass('out-of-stock');
                            }
                            if (json['response']['tax']) {
                                $('.product-tax').html(json['response']['tax']);
                            }
                            if (json['response']['price']) {
                                if (json['response']['special']) {
                                    $('.product-price-group .product-price-old').html(json['response']['price']);
                                    $('.product-price-group .product-price-new').html(json['response']['special']);
                                } else {
                                    $('.product-price-group .product-price').html(json['response']['price']);
                                }
                            }
                            if (json['response']['discounts']) {
                                $('.product-discount').each(function (index) {
                                    $(this).html(json['response']['discounts'][index]);
                                });
                            }
                            if (json['response']['weight']) {
                                $('.product-stats .product-weight span').html(json['response']['weight']);
                            }
                        }
                    }
                });
            }
            $('.product-options input[type="radio"], .product-options input[type="checkbox"], .product-options select, #product-quantity').on('change', autoUpdatePrice);
            autoUpdatePrice();
        }
    }
    if ($html.hasClass('route-journal3-popup-page')) {
        $(document).on('click', function () {
            parent.resize_iframe(Journal['popupModuleId'], $('.popup-content').height());
        });
    }
    $('.links-menu .module-title').addClass('closed');
    $('.links-menu .module-title').click(function () {
        $(this).toggleClass('closed');
    });
    if (Journal.isPopup) {
        $('a[href]').each(function () {
            var $this = $(this);
            if (!$this.attr('target')) {
                $this.attr('target', '_blank');
            }
            if (Journal.isPhone || Journal.isTablet) {
                $this.removeClass('agree');
            }
        });
    }
});
$(window).on('load', function () {
    var $html = $('html');
    var $body = $('body');
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && (['classic', 'mega', 'default'].includes(Journal['headerType']))) {
        var holder = document.body;
        var headerHeightOffset = $('.desktop-main-menu-wrapper').offset().top + (parseInt(Journal['stickyAt'], 10) || 100);
        var menuHeight = $('.desktop-main-menu-wrapper').outerHeight();

        function enableSticky() {
            if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
                $body.css('padding-top', menuHeight);
            }
        }

        function disableSticky() {
            if (Journal['headerType'] === 'classic' || Journal['headerType'] === 'mega') {
                $body.css('padding-top', '');
            }
        }

        function checkStickyOffset() {
            return headerHeightOffset <= window.scrollY;
        }

        function checkSticky() {
            var old = holder.classList.contains('is-sticky');
            holder.classList.toggle('is-sticky', checkStickyOffset());
            var current = holder.classList.contains('is-sticky');
            if (current !== old) {
                if (current) {
                    enableSticky();
                } else {
                    disableSticky();
                }
            }
        }

        function checkStickyListener() {
            requestAnimationFrame(checkSticky)
        }
        window.addEventListener('scroll', checkStickyListener, false);
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && Journal['topBarStatus'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var compact = $('.mid-bar');
        if (compact.length) {
            $(window).on('scroll', function () {
                var compactOffset = compact.offset().top;
                var scroll = $(this)[0].scrollY
                if (scroll >= compactOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && !Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var site = $('.site-wrapper');
        var header = $('.mid-bar').outerHeight();
        if (site.length) {
            $(window).on('scroll', function () {
                var siteOffset = site.offset().top - header + 1;
                var scroll = $(this)[0].scrollY
                if (scroll >= siteOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal.isPopup && Journal['isDesktop'] && Journal['stickyStatus'] && !Journal['topBarStatus'] && Journal['stickyFullHomePadding'] && (['compact', 'slim'].includes(Journal['headerType']))) {
        var site = $('.site-wrapper');
        var header = $('html:not(.route-common-home) .mid-bar').outerHeight();
        if (site.length) {
            $(window).on('scroll', function () {
                var siteOffset = site.offset().top - header + 1;
                var scroll = $(this)[0].scrollY
                if (scroll >= siteOffset) {
                    $('body').addClass('sticky-compact');
                } else {
                    $('body').removeClass('sticky-compact');
                }
            });
        }
    }
    if (!Journal['isDesktop'] && Journal['headerMobileStickyStatus'] && $html.hasClass('mobile-header-active')) {
        var mobileBar = $('.mobile-header .sticky-bar');
        if (mobileBar.length) {
            var mobileBarSticky = mobileBar.offset().top;
            var mobileBarHeight = mobileBar.outerHeight();
            $(window).on('scroll', function () {
                var scroll = $(this)[0].scrollY
                if (scroll >= mobileBarSticky) {
                    mobileBar.addClass('mobile-bar-sticky');
                    $body.css('padding-top', mobileBarHeight);
                } else {
                    mobileBar.removeClass('mobile-bar-sticky');
                    $body.css('padding-top', '');
                }
            });
        }
    }
    if (Journal['isDesktop'] && (Journal['headerMiniSearchDisplay'] === 'page')) {
        $('.search-trigger, .desktop .search-categories .j-menu > li > a').click(function () {
            $('.header-search input').focus();
        });
    }
    if (Journal['scrollTop']) {
        var scrollTopTimeout;
        $(window).on('scroll', function () {
            clearTimeout(scrollTopTimeout);
            var scroll = $(this)[0].scrollY
            if (scroll > 500) {
                $('.scroll-top').addClass('scroll-top-active');
                scrollTopTimeout = setTimeout(function () {
                    $('.scroll-top').removeClass('scroll-top-active');
                }, 3000);
            } else {
                $('.scroll-top').removeClass('scroll-top-active');
            }
        });
        $('.scroll-top').click(function () {
            anime({
                targets: 'html, body',
                scrollTop: 0,
                duration: 750,
                easing: 'easeInOutQuad'
            });
        });
    }
    if ($html.hasClass('footer-reveal')) {
        var footerHeight = $('.desktop.footer-reveal footer').outerHeight();
        $('.desktop body').css('padding-bottom', footerHeight);
    }
});
$('.block-map iframe').on('load', function () {
    $('.block-map .journal-loading').hide();
});
