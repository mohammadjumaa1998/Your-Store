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
});;
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
window.averta = {};;
(function ($) {
    window.package = function (name) {
        if (!window[name]) window[name] = {};
    };
    var extend = function (target, object) {
        for (var key in object) target[key] = object[key];
    };
    Function.prototype.extend = function (superclass) {
        if (typeof superclass.prototype.constructor === "function") {
            extend(this.prototype, superclass.prototype);
            this.prototype.constructor = this;
        } else {
            this.prototype.extend(superclass);
            this.prototype.constructor = this;
        }
    };
    var trans = {
        'Moz': '-moz-',
        'Webkit': '-webkit-',
        'Khtml': '-khtml-',
        'O': '-o-',
        'ms': '-ms-',
        'Icab': '-icab-'
    };
    window._mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    window._touch = 'ontouchstart' in document;
    $(document).ready(function () {
        window._jcsspfx = getVendorPrefix();
        window._csspfx = trans[window._jcsspfx];
        window._cssanim = true;
        window._css3d = true;
        window._css2d = true;
    });

    function getVendorPrefix() {
        if ('result' in arguments.callee) return arguments.callee.result;
        var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
        var someScript = document.getElementsByTagName('script')[0];
        for (var prop in someScript.style) {
            if (regex.test(prop)) {
                return arguments.callee.result = prop.match(regex)[0];
            }
        }
        if ('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
        if ('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';
        return arguments.callee.result = '';
    }
    window.parseQueryString = function (url) {
        var queryString = {};
        url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
            queryString[$1] = $3;
        });
        return queryString;
    };

    function checkStyleValue(prop) {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = prop;
        if (typeof s[p] == 'string') {
            return true;
        }
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'], p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string') {
                return true;
            }
        }
        return false;
    }

    function supportsTransitions() {
        return checkStyleValue('transition');
    }

    function supportsTransforms() {
        return checkStyleValue('transform');
    }

    function supports3DTransforms() {
        if (!supportsTransforms()) return false;
        var el = document.createElement('i'),
            has3d, transforms = {
                'WebkitTransform': '-webkit-transform',
                'OTransform': '-o-transform',
                'MSTransform': '-ms-transform',
                'msTransform': '-ms-transform',
                'MozTransform': '-moz-transform',
                'Transform': 'transform',
                'transform': 'transform'
            };
        el.style.display = 'block';
        document.body.insertBefore(el, null);
        for (var t in transforms) {
            if (el.style[t] !== undefined) {
                el.style[t] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }
        document.body.removeChild(el);
        return (has3d != null && has3d.length > 0 && has3d !== "none");
    }
    var fps60 = 50 / 3;
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, fps60);
            };
        })();
    }
    if (!window.getComputedStyle) {
        window.getComputedStyle = function (el, pseudo) {
            this.el = el;
            this.getPropertyValue = function (prop) {
                var re = /(\-([a-z]){1})/g;
                if (prop == 'float') prop = 'styleFloat';
                if (re.test(prop)) {
                    prop = prop.replace(re, function () {
                        return arguments[2].toUpperCase();
                    });
                }
                return el.currentStyle[prop] ? el.currentStyle[prop] : null;
            };
            return el.currentStyle;
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
    window.isMSIE = function (version) {
        if (!$.browser.msie) {
            return false;
        } else if (!version) {
            return true;
        }
        var ieVer = $.browser.version.slice(0, $.browser.version.indexOf('.'));
        if (typeof version === 'string') {
            if (version.indexOf('<') !== -1 || version.indexOf('>') !== -1) {
                return eval(ieVer + version);
            } else {
                return eval(version + '==' + ieVer);
            }
        } else {
            return version == ieVer;
        }
    }
    $.removeDataAttrs = function ($target, exclude) {
        var i, attrName, dataAttrsToDelete = [],
            dataAttrs = $target[0].attributes,
            dataAttrsLen = dataAttrs.length;
        exclude = exclude || [];
        for (i = 0; i < dataAttrsLen; i++) {
            attrName = dataAttrs[i].name;
            if ('data-' === attrName.substring(0, 5) && exclude.indexOf(attrName) === -1) {
                dataAttrsToDelete.push(dataAttrs[i].name);
            }
        }
        $.each(dataAttrsToDelete, function (index, attrName) {
            $target.removeAttr(attrName);
        })
    };
    if (jQuery) {
        $.jqLoadFix = function () {
            if (this.complete) {
                var that = this;
                setTimeout(function () {
                    $(that).trigger('load');
                }, 1);
            }
        };
        jQuery.uaMatch = jQuery.uaMatch || function (ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        };
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
        if (isIE11) {
            browser.msie = "true";
            delete browser.mozilla;
        }
        jQuery.browser = browser;
        $.fn.preloadImg = function (src, _event) {
            this.each(function () {
                var $this = $(this);
                var self = this;
                var img = new Image();
                img.onload = function (event) {
                    if (event == null) event = {};
                    $this.attr('src', src);
                    event.width = img.width;
                    event.height = img.height;
                    $this.data('width', img.width);
                    $this.data('height', img.height);
                    setTimeout(function () {
                        _event.call(self, event);
                    }, 50);
                    img = null;
                };
                img.src = src;
            });
            return this;
        };
    }
})(jQuery);;
(function () {
    "use strict";
    averta.EventDispatcher = function () {
        this.listeners = {};
    };
    averta.EventDispatcher.extend = function (_proto) {
        var instance = new averta.EventDispatcher();
        for (var key in instance)
            if (key != 'constructor') _proto[key] = averta.EventDispatcher.prototype[key];
    };
    averta.EventDispatcher.prototype = {
        constructor: averta.EventDispatcher,
        addEventListener: function (event, listener, ref) {
            if (!this.listeners[event]) this.listeners[event] = [];
            this.listeners[event].push({
                listener: listener,
                ref: ref
            });
        },
        removeEventListener: function (event, listener, ref) {
            if (this.listeners[event]) {
                for (var i = 0; i < this.listeners[event].length; ++i) {
                    if (listener === this.listeners[event][i].listener && ref === this.listeners[event][i].ref) {
                        this.listeners[event].splice(i--, 1);
                    }
                }
                if (this.listeners[event].length === 0) {
                    this.listeners[event] = null;
                }
            }
        },
        dispatchEvent: function (event) {
            event.target = this;
            if (this.listeners[event.type]) {
                for (var i = 0, l = this.listeners[event.type].length; i < l; ++i) {
                    this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref, event);
                }
            }
        }
    };
})();;
(function ($) {
    "use strict";
    var isTouch = 'ontouchstart' in document,
        isPointer = window.navigator.pointerEnabled,
        isMSPoiner = !isPointer && window.navigator.msPointerEnabled,
        usePointer = isPointer || isMSPoiner,
        ev_start = (isPointer ? 'pointerdown ' : '') + (isMSPoiner ? 'MSPointerDown ' : '') + (isTouch ? 'touchstart ' : '') + 'mousedown',
        ev_move = (isPointer ? 'pointermove ' : '') + (isMSPoiner ? 'MSPointerMove ' : '') + (isTouch ? 'touchmove ' : '') + 'mousemove',
        ev_end = (isPointer ? 'pointerup ' : '') + (isMSPoiner ? 'MSPointerUp ' : '') + (isTouch ? 'touchend ' : '') + 'mouseup',
        ev_cancel = (isPointer ? 'pointercancel ' : '') + (isMSPoiner ? 'MSPointerCancel ' : '') + 'touchcancel';
    averta.TouchSwipe = function ($element) {
        this.$element = $element;
        this.enabled = true;
        $element.bind(ev_start, {
            target: this
        }, this.__touchStart);
        $element[0].swipe = this;
        this.onSwipe = null;
        this.swipeType = 'horizontal';
        this.noSwipeSelector = 'input, textarea, button, .no-swipe, .ms-no-swipe';
        this.lastStatus = {};
    };
    var p = averta.TouchSwipe.prototype;
    p.getDirection = function (new_x, new_y) {
        switch (this.swipeType) {
            case 'horizontal':
                return new_x <= this.start_x ? 'left' : 'right';
                break;
            case 'vertical':
                return new_y <= this.start_y ? 'up' : 'down';
                break;
            case 'all':
                if (Math.abs(new_x - this.start_x) > Math.abs(new_y - this.start_y))
                    return new_x <= this.start_x ? 'left' : 'right';
                else
                    return new_y <= this.start_y ? 'up' : 'down';
                break;
        }
    };
    p.priventDefultEvent = function (new_x, new_y) {
        var dx = Math.abs(new_x - this.start_x);
        var dy = Math.abs(new_y - this.start_y);
        var horiz = dx > dy;
        return (this.swipeType === 'horizontal' && horiz) || (this.swipeType === 'vertical' && !horiz);
    };
    p.createStatusObject = function (evt) {
        var status_data = {},
            temp_x, temp_y;
        temp_x = this.lastStatus.distanceX || 0;
        temp_y = this.lastStatus.distanceY || 0;
        status_data.distanceX = evt.pageX - this.start_x;
        status_data.distanceY = evt.pageY - this.start_y;
        status_data.moveX = status_data.distanceX - temp_x;
        status_data.moveY = status_data.distanceY - temp_y;
        status_data.distance = parseInt(Math.sqrt(Math.pow(status_data.distanceX, 2) + Math.pow(status_data.distanceY, 2)));
        status_data.duration = new Date().getTime() - this.start_time;
        status_data.direction = this.getDirection(evt.pageX, evt.pageY);
        return status_data;
    };
    p.__reset = function (event, jqevt) {
        this.reset = false;
        this.lastStatus = {};
        this.start_time = new Date().getTime();
        var point = this.__getPoint(event, jqevt);
        this.start_x = point.pageX;
        this.start_y = point.pageY;
    };
    p.__touchStart = function (event) {
        var swipe = event.data.target;
        var jqevt = event;
        if (!swipe.enabled) return;
        if ($(event.target).closest(swipe.noSwipeSelector, swipe.$element).length > 0) {
            return;
        }
        event = event.originalEvent;
        if (usePointer) {
            $(this).css('-ms-touch-action', swipe.swipeType === 'horizontal' ? 'pan-y' : 'pan-x');
        }
        if (!swipe.onSwipe) {
            $.error('Swipe listener is undefined');
            return;
        }
        if (swipe.touchStarted || isTouch && swipe.start_time && event.type === 'mousedown' && new Date().getTime() - swipe.start_time < 600) {
            return;
        }
        var point = swipe.__getPoint(event, jqevt);
        swipe.start_x = point.pageX;
        swipe.start_y = point.pageY;
        swipe.start_time = new Date().getTime();
        $(document).bind(ev_end, {
            target: swipe
        }, swipe.__touchEnd).bind(ev_move, {
            target: swipe
        }, swipe.__touchMove).bind(ev_cancel, {
            target: swipe
        }, swipe.__touchCancel);
        var status = swipe.createStatusObject(point);
        status.phase = 'start';
        swipe.onSwipe.call(null, status);
        if (!isTouch)
            jqevt.preventDefault();
        swipe.lastStatus = status;
        swipe.touchStarted = true;
    };
    p.__touchMove = function (event) {
        var swipe = event.data.target;
        var jqevt = event;
        event = event.originalEvent;
        if (!swipe.touchStarted) return;
        clearTimeout(swipe.timo);
        swipe.timo = setTimeout(function () {
            swipe.__reset(event, jqevt);
        }, 60);
        var point = swipe.__getPoint(event, jqevt);
        var status = swipe.createStatusObject(point);
        if (swipe.priventDefultEvent(point.pageX, point.pageY))
            jqevt.preventDefault();
        status.phase = 'move';
        swipe.lastStatus = status;
        swipe.onSwipe.call(null, status);
    };
    p.__touchEnd = function (event) {
        var swipe = event.data.target;
        var jqevt = event;
        event = event.originalEvent;
        clearTimeout(swipe.timo);
        var status = swipe.lastStatus;
        if (!isTouch)
            jqevt.preventDefault();
        status.phase = 'end';
        swipe.touchStarted = false;
        swipe.priventEvt = null;
        $(document).unbind(ev_end, swipe.__touchEnd).unbind(ev_move, swipe.__touchMove).unbind(ev_cancel, swipe.__touchCancel);
        status.speed = status.distance / status.duration;
        swipe.onSwipe.call(null, status);
    };
    p.__touchCancel = function (event) {
        var swipe = event.data.target;
        swipe.__touchEnd(event);
    };
    p.__getPoint = function (event, jqEvent) {
        if (isTouch && event.type.indexOf('mouse') === -1) {
            return event.touches[0];
        } else if (usePointer) {
            return event;
        } else {
            return jqEvent;
        }
    };
    p.enable = function () {
        if (this.enabled) return;
        this.enabled = true;
    };
    p.disable = function () {
        if (!this.enabled) return;
        this.enabled = false;
    };
})(jQuery);;
(function () {
    "use strict";
    averta.Ticker = function () {};
    var st = averta.Ticker,
        list = [],
        len = 0,
        __stopped = true;
    st.add = function (listener, ref) {
        list.push([listener, ref]);
        if (list.length === 1) st.start();
        len = list.length;
        return len;
    };
    st.remove = function (listener, ref) {
        for (var i = 0, l = list.length; i < l; ++i) {
            if (list[i] && list[i][0] === listener && list[i][1] === ref) {
                list.splice(i, 1);
            }
        }
        len = list.length;
        if (len === 0) {
            st.stop();
        }
    };
    st.start = function () {
        if (!__stopped) return;
        __stopped = false;
        __tick();
    };
    st.stop = function () {
        __stopped = true;
    };
    var __tick = function () {
        if (st.__stopped) return;
        var item;
        for (var i = 0; i !== len; i++) {
            item = list[i];
            item[0].call(item[1]);
        }
        requestAnimationFrame(__tick);
    };
})();;
(function () {
    "use strict";
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }
    averta.Timer = function (delay, autoStart) {
        this.delay = delay;
        this.currentCount = 0;
        this.paused = false;
        this.onTimer = null;
        this.refrence = null;
        if (autoStart) this.start();
    };
    averta.Timer.prototype = {
        constructor: averta.Timer,
        start: function () {
            this.paused = false;
            this.lastTime = Date.now();
            averta.Ticker.add(this.update, this);
        },
        stop: function () {
            this.paused = true;
            averta.Ticker.remove(this.update, this);
        },
        reset: function () {
            this.currentCount = 0;
            this.paused = true;
            this.lastTime = Date.now();
        },
        update: function () {
            if (this.paused || Date.now() - this.lastTime < this.delay) return;
            this.currentCount++;
            this.lastTime = Date.now();
            if (this.onTimer)
                this.onTimer.call(this.refrence, this.getTime());
        },
        getTime: function () {
            return this.delay * this.currentCount;
        }
    };
})();;
(function () {
    "use strict";
    var evt = null;
    window.CSSTween = function (element, duration, delay, ease) {
        this.$element = element;
        this.duration = duration || 1000;
        this.delay = delay || 0;
        this.ease = ease || 'linear';
    };
    var p = CSSTween.prototype;
    p.to = function (callback, target) {
        this.to_cb = callback;
        this.to_cb_target = target;
        return this;
    };
    p.from = function (callback, target) {
        this.fr_cb = callback;
        this.fr_cb_target = target;
        return this;
    };
    p.onComplete = function (callback, target) {
        this.oc_fb = callback;
        this.oc_fb_target = target;
        return this;
    };
    p.chain = function (csstween) {
        this.chained_tween = csstween;
        return this;
    };
    p.reset = function () {
        clearTimeout(this.start_to);
        clearTimeout(this.end_to);
    };
    p.start = function () {
        var element = this.$element[0];
        clearTimeout(this.start_to);
        clearTimeout(this.end_to);
        this.fresh = true;
        if (this.fr_cb) {
            element.style[window._jcsspfx + 'TransitionDuration'] = '0ms';
            this.fr_cb.call(this.fr_cb_target);
        }
        var that = this;
        this.onTransComplete = function (event) {
            if (!that.fresh) return;
            that.reset();
            element.style[window._jcsspfx + 'TransitionDuration'] = '';
            element.style[window._jcsspfx + 'TransitionProperty'] = '';
            element.style[window._jcsspfx + 'TransitionTimingFunction'] = '';
            element.style[window._jcsspfx + 'TransitionDelay'] = '';
            that.fresh = false;
            if (that.chained_tween) that.chained_tween.start();
            if (that.oc_fb) that.oc_fb.call(that.oc_fb_target);
        };
        this.start_to = setTimeout(function () {
            if (!that.$element) return;
            element.style[window._jcsspfx + 'TransitionDuration'] = that.duration + 'ms';
            element.style[window._jcsspfx + 'TransitionProperty'] = that.transProperty || 'all';
            if (that.delay > 0) element.style[window._jcsspfx + 'TransitionDelay'] = that.delay + 'ms';
            else element.style[window._jcsspfx + 'TransitionDelay'] = '';
            element.style[window._jcsspfx + 'TransitionTimingFunction'] = that.ease;
            if (that.to_cb) that.to_cb.call(that.to_cb_target);
            that.end_to = setTimeout(function () {
                that.onTransComplete();
            }, that.duration + (that.delay || 0));
        }, 1);
        return this;
    };
})();;
(function () {
    "use strict";
    var _cssanim = null;
    window.CTween = {};

    function transPos(element, properties) {
        if (properties.x !== undefined || properties.y !== undefined) {
            if (_cssanim) {
                var trans = window._jcsspfx + "Transform";
                if (properties.x !== undefined) {
                    properties[trans] = (properties[trans] || '') + ' translateX(' + properties.x + 'px)';
                    delete properties.x;
                }
                if (properties.y !== undefined) {
                    properties[trans] = (properties[trans] || '') + ' translateY(' + properties.y + 'px)';
                    delete properties.y;
                }
            } else {
                if (properties.x !== undefined) {
                    var posx = element.css('right') !== 'auto' ? 'right' : 'left';
                    properties[posx] = properties.x + 'px';
                    delete properties.x;
                }
                if (properties.y !== undefined) {
                    var posy = element.css('bottom') !== 'auto' ? 'bottom' : 'top';
                    properties[posy] = properties.y + 'px';
                    delete properties.y;
                }
            }
        }
        return properties;
    }
    CTween.setPos = function (element, pos) {
        element.css(transPos(element, pos));
    };
    CTween.animate = function (element, duration, properties, options) {
        if (_cssanim == null) _cssanim = window._cssanim;
        options = options || {};
        transPos(element, properties);
        if (_cssanim) {
            var tween = new CSSTween(element, duration, options.delay, EaseDic[options.ease]);
            if (options.transProperty) {
                tween.transProperty = options.transProperty;
            }
            tween.to(function () {
                element.css(properties);
            });
            if (options.complete) tween.onComplete(options.complete, options.target);
            tween.start();
            tween.stop = tween.reset;
            return tween;
        }
        var onCl;
        if (options.delay) element.delay(options.delay);
        if (options.complete)
            onCl = function () {
                options.complete.call(options.target);
            };
        element.stop(true).animate(properties, duration, options.ease || 'linear', onCl);
        return element;
    };
    CTween.fadeOut = function (target, duration, remove) {
        var options = {};
        if (remove === true) {
            options.complete = function () {
                target.remove();
            };
        } else if (remove === 2) {
            options.complete = function () {
                target.css('display', 'none');
            };
        }
        CTween.animate(target, duration || 1000, {
            opacity: 0
        }, options);
    };
    CTween.fadeIn = function (target, duration, reset) {
        if (reset !== false) {
            target.css('opacity', 0).css('display', '');
        }
        CTween.animate(target, duration || 1000, {
            opacity: 1
        });
    };
})();;
(function () {
    window.EaseDic = {
        'linear': 'linear',
        'ease': 'ease',
        'easeIn': 'ease-in',
        'easeOut': 'ease-out',
        'easeInOut': 'ease-in-out',
        'easeInCubic': 'cubic-bezier(.55,.055,.675,.19)',
        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
    };
})();;
(function () {
    "use strict";
    window.MSAligner = function (type, $container, $img) {
        this.$container = $container;
        this.$img = $img;
        this.type = type || 'stretch';
        this.widthOnly = false;
        this.heightOnly = false;
    };
    var p = MSAligner.prototype;
    p.init = function (w, h) {
        this.baseWidth = w;
        this.baseHeight = h;
        this.imgRatio = w / h;
        this.imgRatio2 = h / w;
        switch (this.type) {
            case 'tile':
                this.$container.css('background-image', 'url(' + this.$img.attr('src') + ')');
                this.$img.remove();
                break;
            case 'center':
                this.$container.css('background-image', 'url(' + this.$img.attr('src') + ')');
                this.$container.css({
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                });
                this.$img.remove();
                break;
            case 'stretch':
                this.$img.css({
                    width: '100%',
                    height: '100%'
                });
                break;
            case 'fill':
            case 'fit':
                this.needAlign = true;
                this.align();
                break;
        }
    };
    p.align = function () {
        if (!this.needAlign) return;
        var cont_w = this.$container[0].offsetWidth;
        var cont_h = this.$container[0].offsetHeight;
        var contRatio = cont_w / cont_h;
        if (this.type == 'fill') {
            if (this.imgRatio < contRatio) {
                this.$img.width(cont_w);
                this.$img.height(cont_w * this.imgRatio2);
            } else {
                this.$img.height(cont_h);
                this.$img.width(cont_h * this.imgRatio);
            }
        } else if (this.type == 'fit') {
            if (this.imgRatio < contRatio) {
                this.$img.height(cont_h);
                this.$img.width(cont_h * this.imgRatio);
            } else {
                this.$img.width(cont_w);
                this.$img.height(cont_w * this.imgRatio2);
            }
        }
        this.setMargin();
    };
    p.setMargin = function () {
        var cont_w = this.$container[0].offsetWidth;
        var cont_h = this.$container[0].offsetHeight;
        this.$img.css('margin-top', (cont_h - this.$img[0].offsetHeight) / 2 + 'px');
        this.$img.css('margin-left', (cont_w - this.$img[0].offsetWidth) / 2 + 'px');
    }
})();
(function ($) {
    var Polyfill = function (userOptions) {
        this.options = $.extend({}, Polyfill.defaultOptions, userOptions);
        this.isEnabled = false;
        if (this.options.forcePolyfill || !this.supportsPointerEvents()) {
            this.registerEvents();
            this.isEnabled = true;
        }
    };
    Polyfill.defaultOptions = {
        forcePolyfill: false,
        selector: '*',
        listenOn: ['click', 'dblclick', 'mousedown', 'mouseup'],
        pointerEventsNoneClass: null,
        pointerEventsAllClass: null,
        eventNamespace: 'pointer-events-polyfill'
    };
    Polyfill.prototype.registerEvents = function () {
        $(document).on(this.getEventNames(), this.options.selector, $.proxy(this.onElementClick, this));
    };
    Polyfill.prototype.getEventNames = function () {
        var eventNamespace = this.options.eventNamespace ? '.' + this.options.eventNamespace : '';
        return this.options.listenOn.join(eventNamespace + ' ') + eventNamespace;
    };
    Polyfill.prototype.supportsPointerEvents = function () {
        var style = document.createElement('a').style;
        style.cssText = 'pointer-events:auto';
        return style.pointerEvents === 'auto';
    };
    Polyfill.prototype.isClickThrough = function ($el) {
        var elPointerEventsCss = $el.css('pointer-events');
        if ($el.length === 0 || elPointerEventsCss === 'all' || $el.is(':root') || $el.hasClass(this.options.pointerEventsAllClass)) {
            return false;
        }
        if (elPointerEventsCss === 'none' || $el.hasClass(this.options.pointerEventsNoneClass) || this.isClickThrough($el.parent())) {
            return true;
        }
        return false;
    };
    Polyfill.prototype.onElementClick = function (e) {
        var $elOrg = $(e.target);
        if (!this.isClickThrough($elOrg)) {
            return true;
        }
        $elOrg.hide();
        var elBelow = document.elementFromPoint(e.clientX, e.clientY);
        e.target = elBelow;
        $(elBelow).trigger(e);
        if (elBelow.tagName === 'A') {
            if (e.which === 2) {
                window.open(elBelow.getAttribute('href'), '_blank');
            } else {
                elBelow.click();
            }
        }
        $elOrg.show();
        return false;
    };
    Polyfill.prototype.destroy = function () {
        $(document).off(this.getEventNames());
        this.isEnabled = false;
    };
    window.pointerEventsPolyfill = function (userOptions) {
        return new Polyfill(userOptions);
    };
})(jQuery);;
(function () {
    "use strict";
    var _options = {
        bouncing: true,
        snapping: false,
        snapsize: null,
        friction: 0.05,
        outFriction: 0.05,
        outAcceleration: 0.09,
        minValidDist: 0.3,
        snappingMinSpeed: 2,
        paging: false,
        endless: false,
        maxSpeed: 160
    };
    var Controller = function (min, max, options) {
        if (max === null || min === null) {
            throw new Error('Max and Min values are required.');
        }
        this.options = options || {};
        for (var key in _options) {
            if (!(key in this.options))
                this.options[key] = _options[key];
        }
        this._max_value = max;
        this._min_value = min;
        this.value = min;
        this.end_loc = min;
        this.current_snap = this.getSnapNum(min);
        this.__extrStep = 0;
        this.__extraMove = 0;
        this.__animID = -1;
    };
    var p = Controller.prototype;
    p.changeTo = function (value, animate, speed, snap_num, dispatch) {
        this.stopped = false;
        this._internalStop();
        value = this._checkLimits(value);
        speed = Math.abs(speed || 0);
        if (this.options.snapping) {
            snap_num = snap_num || this.getSnapNum(value);
            if (dispatch !== false) this._callsnapChange(snap_num);
            this.current_snap = snap_num;
        }
        if (animate) {
            this.animating = true;
            var self = this,
                active_id = ++self.__animID,
                amplitude = value - self.value,
                timeStep = 0,
                targetPosition = value,
                animFrict = 1 - self.options.friction,
                timeconst = animFrict + (speed - 20) * animFrict * 1.3 / self.options.maxSpeed;
            var tick = function () {
                if (active_id !== self.__animID) return;
                var dis = value - self.value;
                if (Math.abs(dis) > self.options.minValidDist && self.animating) {
                    window.requestAnimationFrame(tick);
                } else {
                    if (self.animating) {
                        self.value = value;
                        self._callrenderer();
                    }
                    self.animating = false;
                    if (active_id !== self.__animID) {
                        self.__animID = -1;
                    }
                    self._callonComplete('anim');
                    return;
                }
                self.value = targetPosition - amplitude * Math.exp(- ++timeStep * timeconst);
                self._callrenderer();
            };
            tick();
            return;
        }
        this.value = value;
        this._callrenderer();
    };
    p.drag = function (move) {
        if (this.start_drag) {
            this.drag_start_loc = this.value;
            this.start_drag = false;
        }
        this.animating = false;
        this._deceleration = false;
        this.value -= move;
        if (!this.options.endless && (this.value > this._max_value || this.value < 0)) {
            if (this.options.bouncing) {
                this.__isout = true;
                this.value += move * 0.6;
            } else if (this.value > this._max_value) {
                this.value = this._max_value;
            } else {
                this.value = 0;
            }
        } else if (!this.options.endless && this.options.bouncing) {
            this.__isout = false;
        }
        this._callrenderer();
    };
    p.push = function (speed) {
        this.stopped = false;
        if (this.options.snapping && Math.abs(speed) <= this.options.snappingMinSpeed) {
            this.cancel();
            return;
        }
        this.__speed = speed;
        this.__startSpeed = speed;
        this.end_loc = this._calculateEnd();
        if (this.options.snapping) {
            var snap_loc = this.getSnapNum(this.value),
                end_snap = this.getSnapNum(this.end_loc);
            if (this.options.paging) {
                snap_loc = this.getSnapNum(this.drag_start_loc);
                this.__isout = false;
                if (speed > 0) {
                    this.gotoSnap(snap_loc + 1, true, speed);
                } else {
                    this.gotoSnap(snap_loc - 1, true, speed);
                }
                return;
            } else if (snap_loc === end_snap) {
                this.cancel();
                return;
            }
            this._callsnapChange(end_snap);
            this.current_snap = end_snap;
        }
        this.animating = false;
        this.__needsSnap = this.options.endless || (this.end_loc > this._min_value && this.end_loc < this._max_value);
        if (this.options.snapping && this.__needsSnap)
            this.__extraMove = this._calculateExtraMove(this.end_loc);
        this._startDecelaration();
    };
    p.bounce = function (speed) {
        if (this.animating) return;
        this.stopped = false;
        this.animating = false;
        this.__speed = speed;
        this.__startSpeed = speed;
        this.end_loc = this._calculateEnd();
        this._startDecelaration();
    };
    p.stop = function () {
        this.stopped = true;
        this._internalStop();
    };
    p.cancel = function () {
        this.start_drag = true;
        if (this.__isout) {
            this.__speed = 0.0004;
            this._startDecelaration();
        } else if (this.options.snapping) {
            this.gotoSnap(this.getSnapNum(this.value), true);
        }
    };
    p.renderCallback = function (listener, ref) {
        this.__renderHook = {
            fun: listener,
            ref: ref
        };
    };
    p.snappingCallback = function (listener, ref) {
        this.__snapHook = {
            fun: listener,
            ref: ref
        };
    };
    p.snapCompleteCallback = function (listener, ref) {
        this.__compHook = {
            fun: listener,
            ref: ref
        };
    };
    p.getSnapNum = function (value) {
        return Math.floor((value + this.options.snapsize / 2) / this.options.snapsize);
    };
    p.nextSnap = function () {
        this._internalStop();
        var curr_snap = this.getSnapNum(this.value);
        if (!this.options.endless && (curr_snap + 1) * this.options.snapsize > this._max_value) {
            this.__speed = 8;
            this.__needsSnap = false;
            this._startDecelaration();
        } else {
            this.gotoSnap(curr_snap + 1, true);
        }
    };
    p.prevSnap = function () {
        this._internalStop();
        var curr_snap = this.getSnapNum(this.value);
        if (!this.options.endless && (curr_snap - 1) * this.options.snapsize < this._min_value) {
            this.__speed = -8;
            this.__needsSnap = false;
            this._startDecelaration();
        } else {
            this.gotoSnap(curr_snap - 1, true);
        }
    };
    p.gotoSnap = function (snap_num, animate, speed) {
        this.changeTo(snap_num * this.options.snapsize, animate, speed, snap_num);
    };
    p.destroy = function () {
        this._internalStop();
        this.__renderHook = null;
        this.__snapHook = null;
        this.__compHook = null;
    };
    p._internalStop = function () {
        this.start_drag = true;
        this.animating = false;
        this._deceleration = false;
        this.__extrStep = 0;
    };
    p._calculateExtraMove = function (value) {
        var m = value % this.options.snapsize;
        return m < this.options.snapsize / 2 ? -m : this.options.snapsize - m;
    };
    p._calculateEnd = function (step) {
        var temp_speed = this.__speed;
        var temp_value = this.value;
        var i = 0;
        while (Math.abs(temp_speed) > this.options.minValidDist) {
            temp_value += temp_speed;
            temp_speed *= this.options.friction;
            i++;
        }
        if (step) return i;
        return temp_value;
    };
    p._checkLimits = function (value) {
        if (this.options.endless) return value;
        if (value < this._min_value) return this._min_value;
        if (value > this._max_value) return this._max_value;
        return value;
    };
    p._callrenderer = function () {
        if (this.__renderHook) this.__renderHook.fun.call(this.__renderHook.ref, this, this.value);
    };
    p._callsnapChange = function (targetSnap) {
        if (!this.__snapHook || targetSnap === this.current_snap) return;
        this.__snapHook.fun.call(this.__snapHook.ref, this, targetSnap, targetSnap - this.current_snap);
    };
    p._callonComplete = function (type) {
        if (this.__compHook && !this.stopped) {
            this.__compHook.fun.call(this.__compHook.ref, this, this.current_snap, type);
        }
    };
    p._computeDeceleration = function () {
        if (this.options.snapping && this.__needsSnap) {
            var xtr_move = (this.__startSpeed - this.__speed) / this.__startSpeed * this.__extraMove;
            this.value += this.__speed + xtr_move - this.__extrStep;
            this.__extrStep = xtr_move;
        } else {
            this.value += this.__speed;
        }
        this.__speed *= this.options.friction;
        if (!this.options.endless && !this.options.bouncing) {
            if (this.value <= this._min_value) {
                this.value = this._min_value;
                this.__speed = 0;
            } else if (this.value >= this._max_value) {
                this.value = this._max_value;
                this.__speed = 0;
            }
        }
        this._callrenderer();
        if (!this.options.endless && this.options.bouncing) {
            var out_value = 0;
            if (this.value < this._min_value) {
                out_value = this._min_value - this.value;
            } else if (this.value > this._max_value) {
                out_value = this._max_value - this.value;
            }
            this.__isout = Math.abs(out_value) >= this.options.minValidDist;
            if (this.__isout) {
                if (this.__speed * out_value <= 0) {
                    this.__speed += out_value * this.options.outFriction;
                } else {
                    this.__speed = out_value * this.options.outAcceleration;
                }
            }
        }
    };
    p._startDecelaration = function () {
        if (this._deceleration) return;
        this._deceleration = true;
        var self = this;
        var tick = function () {
            if (!self._deceleration) return;
            self._computeDeceleration();
            if (Math.abs(self.__speed) > self.options.minValidDist || self.__isout) {
                window.requestAnimationFrame(tick);
            } else {
                self._deceleration = false;
                self.__isout = false;
                if (self.__needsSnap && self.options.snapping && !self.options.paging) {
                    self.value = self._checkLimits(self.end_loc + self.__extraMove);
                } else {
                    self.value = Math.round(self.value);
                }
                self._callrenderer();
                self._callonComplete('decel');
            }
        };
        tick();
    };
    window.Controller = Controller;
})();;
(function (window, document, $) {
    window.MSLayerController = function (slide) {
        this.slide = slide;
        this.slider = slide.slider;
        this.layers = [];
        this.layersCount = 0;
        this.preloadCount = 0;
        this.$layers = $('<div></div>').addClass('ms-slide-layers');
        this.$staticLayers = $('<div></div>').addClass('ms-static-layers');
        this.$fixedLayers = $('<div></div>').addClass('ms-fixed-layers');
        this.$animLayers = $('<div></div>').addClass('ms-anim-layers');
    };
    var p = MSLayerController.prototype;
    p.addLayer = function (layer) {
        layer.slide = this.slide;
        layer.controller = this;
        switch (layer.$element.data('position')) {
            case 'static':
                this.hasStaticLayer = true;
                layer.$element.appendTo(this.$staticLayers);
                break;
            case 'fixed':
                this.hasFixedLayer = true;
                layer.$element.appendTo(this.$fixedLayers);
                break;
            default:
                layer.$element.appendTo(this.$animLayers);
                break;
        }
        layer.create();
        this.layers.push(layer);
        this.layersCount++;
        if (layer.parallax) {
            this.hasParallaxLayer = true;
        }
        if (layer.needPreload) {
            this.preloadCount++;
        }
    };
    p.create = function () {
        this.slide.$element.append(this.$layers);
        this.$layers.append(this.$animLayers);
        if (this.hasStaticLayer) {
            this.$layers.append(this.$staticLayers);
        }
        if (this.slider.options.layersMode == 'center') {
            this.$layers.css('max-width', this.slider.options.width + 'px');
            if (this.hasFixedLayer) {
                this.$fixedLayers.css('max-width', this.slider.options.width + 'px');
            }
        }
    };
    p.loadLayers = function (callback) {
        this._onReadyCallback = callback;
        if (this.preloadCount === 0) {
            this._onlayersReady();
            return;
        }
        for (var i = 0; i !== this.layersCount; ++i) {
            if (this.layers[i].needPreload) {
                this.layers[i].loadImage();
            }
        }
    };
    p.prepareToShow = function () {
        if (this.hasParallaxLayer) {
            this._enableParallaxEffect();
        }
        if (this.hasFixedLayer) {
            this.$fixedLayers.prependTo(this.slide.view.$element);
        }
    };
    p.showLayers = function () {
        if (this.layersHideTween) {
            this.layersHideTween.stop(true);
        }
        if (this.fixedLayersHideTween) {
            this.fixedLayersHideTween.stop(true);
        }
        this._resetLayers();
        this.$animLayers.css('opacity', '').css('display', '');
        if (this.hasFixedLayer) {
            this.$fixedLayers.css('opacity', '').css('display', '');
        }
        if (this.ready) {
            this._initLayers();
            this._locateLayers();
            this._startLayers();
        }
    };
    p.hideLayers = function () {
        if (this.slide.selected || this.slider.options.instantStartLayers) {
            var that = this;
            that.layersHideTween = CTween.animate(this.$animLayers, 500, {
                opacity: 0
            }, {
                complete: function () {
                    that._resetLayers();
                }
            });
            if (this.hasFixedLayer) {
                this.fixedLayersHideTween = CTween.animate(this.$fixedLayers, 500, {
                    opacity: 0
                }, {
                    complete: function () {
                        that.$fixedLayers.detach();
                    }
                });
            }
            if (this.hasParallaxLayer) {
                this._disableParallaxEffect();
            }
        }
    };
    p.animHideLayers = function () {
        if (!this.ready) {
            return;
        }
        for (var i = 0; i !== this.layersCount; ++i) {
            this.layers[i].hide();
        }
    };
    p.setSize = function (width, height, hard) {
        if (this.ready && (this.slide.selected || this.hasStaticLayer)) {
            if (hard) {
                this._initLayers(true);
            }
            this._locateLayers(!this.slide.selected);
        }
        if (this.slider.options.autoHeight) {
            this.updateHeight();
        }
        if (this.slider.options.layersMode == 'center') {
            var left = Math.max(0, (width - this.slider.options.width) / 2) + 'px';
            this.$layers[0].style.left = left;
            this.$fixedLayers[0].style.left = left;
        }
    };
    p.updateHeight = function () {};
    p._onlayersReady = function () {
        this.ready = true;
        if (this.hasStaticLayer && !this.slide.isSleeping) {
            this._initLayers(false, true);
        }
        this._onReadyCallback.call(this.slide);
    };
    p.onSlideSleep = function () {};
    p.onSlideWakeup = function () {
        if (this.hasStaticLayer && this.ready) {
            this._initLayers(false, true);
        }
    };
    p.getLayerById = function (layerId) {
        if (!layerId) {
            return null;
        }
        for (var i = 0; i < this.layersCount; ++i) {
            if (this.layers[i].id === layerId) {
                return this.layers[i];
            }
        }
        return null;
    };
    p.destroy = function () {
        if (this.slide.selected && this.hasParallaxLayer) {
            this._disableParallaxEffect();
        }
        for (var i = 0; i < this.layersCount; ++i) {
            this.layers[i].$element.stop(true).remove();
        }
        this.$layers.remove();
        this.$staticLayers.remove();
        this.$fixedLayers.remove();
        this.$animLayers.remove();
    };
    p._startLayers = function () {
        for (var i = 0; i !== this.layersCount; ++i) {
            var layer = this.layers[i];
            if (!layer.waitForAction) {
                layer.start();
            }
        }
    };
    p._initLayers = function (force, onlyStatics) {
        if (this.init && !force || this.slider.init_safemode) {
            return;
        }
        this.init = onlyStatics !== true;
        var i = 0;
        if (onlyStatics && !this.staticsInit) {
            this.staticsInit = true;
            for (; i !== this.layersCount; ++i) {
                if (this.layers[i].staticLayer) {
                    this.layers[i].init();
                }
            }
        } else if (this.staticsInit && !force) {
            for (; i !== this.layersCount; ++i) {
                if (!this.layers[i].staticLayer) {
                    this.layers[i].init();
                }
            }
        } else {
            for (; i !== this.layersCount; ++i) {
                this.layers[i].init();
            }
        }
    };
    p._locateLayers = function (onlyStatics) {
        var i = 0;
        if (onlyStatics) {
            for (; i !== this.layersCount; ++i) {
                if (this.layers[i].staticLayer) {
                    this.layers[i].locate();
                }
            }
        } else {
            for (; i !== this.layersCount; ++i) {
                this.layers[i].locate();
            }
        }
    };
    p._resetLayers = function () {
        this.$animLayers.css('display', 'none').css('opacity', 1);
        for (var i = 0; i !== this.layersCount; ++i) {
            this.layers[i].reset();
        }
    };
    p._applyParallax = function (x, y, fast) {
        for (var i = 0; i !== this.layersCount; ++i) {
            if (this.layers[i].parallax != null) {
                this.layers[i].moveParallax(x, y, fast);
            }
        }
    };
    p._enableParallaxEffect = function () {
        if (this.slider.options.parallaxMode === 'swipe') {
            this.slide.view.addEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this);
        } else {
            this.slide.$element.on('mousemove', {
                that: this
            }, this._mouseParallaxMove).on('mouseleave', {
                that: this
            }, this._resetParalax);
        }
    };
    p._disableParallaxEffect = function () {
        if (this.slider.options.parallaxMode === 'swipe') {
            this.slide.view.removeEventListener(MSViewEvents.SCROLL, this._swipeParallaxMove, this);
        } else {
            this.slide.$element.off('mousemove', this._mouseParallaxMove).off('mouseleave', this._resetParalax);
        }
    };
    p._resetParalax = function (e) {
        var that = e.data.that;
        that._applyParallax(0, 0);
    };
    p._mouseParallaxMove = function (e) {
        var that = e.data.that,
            os = that.slide.$element.offset(),
            slider = that.slider;
        if (slider.options.parallaxMode !== 'mouse:y-only') {
            var x = e.pageX - os.left - that.slide.__width / 2;
        } else {
            var x = 0;
        }
        if (slider.options.parallaxMode !== 'mouse:x-only') {
            var y = e.pageY - os.top - that.slide.__height / 2;
        } else {
            var y = 0;
        }
        that._applyParallax(-x, -y);
    };
    p._swipeParallaxMove = function (e) {
        var value = this.slide.position - this.slide.view.__contPos;
        if (this.slider.options.dir === 'v') {
            this._applyParallax(0, value, true);
        } else {
            this._applyParallax(value, 0, true);
        }
    };
})(window, document, jQuery);;
(function ($, window, document, undefined) {
    "use strict";
    window.MSOverlayLayerController = function (slide) {
        MSLayerController.apply(this, arguments);
    }
    MSOverlayLayerController.extend(MSLayerController);
    var p = MSOverlayLayerController.prototype;
    var _super = MSLayerController.prototype;
    p.addLayer = function (layer) {
        var showOnSlides = layer.$element.data('show-on'),
            hideOnSlides = layer.$element.data('hide-on');
        if (hideOnSlides) {
            layer.hideOnSlides = hideOnSlides.replace(/\s+/g, '').split(',');
        }
        if (showOnSlides) {
            layer.showOnSlides = showOnSlides.replace(/\s+/g, '').split(',');
        }
        _super.addLayer.apply(this, arguments);
    };
    p.create = function () {
        _super.create.apply(this, arguments);
        this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.checkLayers.bind(this));
    };
    p.checkLayers = function () {
        if (!this.ready) {
            return;
        }
        for (var i = 0; i !== this.layersCount; ++i) {
            var layer = this.layers[i];
            if (!layer.waitForAction) {
                if (this._checkForShow(layer)) {
                    layer.start();
                } else {
                    layer.hide();
                }
            }
        }
    };
    p._enableParallaxEffect = function () {
        this.slider.view.$element.on('mousemove', {
            that: this
        }, this._mouseParallaxMove).on('mouseleave', {
            that: this
        }, this._resetParalax);
    };
    p._disableParallaxEffect = function () {
        this.slider.view.$element.off('mousemove', this._mouseParallaxMove).off('mouseleave', this._resetParalax);
    };
    p._startLayers = function () {
        for (var i = 0; i !== this.layersCount; ++i) {
            var layer = this.layers[i];
            if (this._checkForShow(layer) && !layer.waitForAction) {
                layer.start();
            }
        }
    };
    p._checkForShow = function (layer) {
        var slideId = this.slider.api.currentSlide.id,
            layerHideOn = layer.hideOnSlides,
            layerShowOn = layer.showOnSlides;
        if (layerShowOn) {
            return !!slideId && layerShowOn.indexOf(slideId) !== -1;
        }
        return !slideId || !layerHideOn || (layerHideOn.length && layerHideOn.indexOf(slideId) === -1);
    };
})(jQuery, window, document);;
(function ($, window, document, undefined) {
    "use strict";
    window.MSOverlayLayers = function (slider) {
        this.slider = slider;
    };
    var p = MSOverlayLayers.prototype;
    p.setupLayerController = function () {
        this.layerController = new MSOverlayLayerController(this);
        this.slider.api.addEventListener(MSSliderEvent.RESIZE, this.setSize.bind(this));
        this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.setSize.bind(this));
        this.setSize();
    };
    p.setSize = function () {
        this.__width = this.$element.width();
        this.__height = this.$element.height();
        this.layerController.setSize(this.__width, this.__height);
    };
    p.create = function () {
        this.layerController.create();
        this.layerController.loadLayers(this._onLayersLoad);
        this.layerController.prepareToShow();
        if (window.pointerEventsPolyfill) {
            window.pointerEventsPolyfill({
                selector: '#' + this.slider.$element.attr('id') + ' ' + '.ms-overlay-layers',
                forcePolyfill: false
            });
        }
    };
    p.getHeight = function () {
        return this.slider.api.currentSlide.getHeight();
    };
    p.destroy = function () {
        this.layerController.destroy();
    };
    p._onLayersLoad = function () {
        this.ready = true;
        this.selected = true;
        this.layersLoaded = true;
        this.setSize();
        this.layerController.showLayers();
    };
})(jQuery, window, document);;
(function ($) {
    window.MSLayerEffects = {};
    var installed, _fade = {
        opacity: 0
    };
    MSLayerEffects.setup = function () {
        if (installed) return;
        installed = true;
        var st = MSLayerEffects,
            transform_css = window._jcsspfx + 'Transform',
            transform_orig_css = window._jcsspfx + 'TransformOrigin',
            o = $.browser.opera;
        _2d = window._css2d && window._cssanim && !o;
        st.defaultValues = {
            left: 0,
            top: 0,
            opacity: (isMSIE('<=9') ? 1 : ''),
            right: 0,
            bottom: 0
        };
        st.defaultValues[transform_css] = '';
        st.rf = 1;
        st.presetEffParams = {
            random: '30|300',
            long: 300,
            short: 30,
            'false': false,
            'true': true,
            tl: 'top left',
            bl: 'bottom left',
            tr: 'top right',
            br: 'bottom right',
            rt: 'top right',
            lb: 'bottom left',
            lt: 'top left',
            rb: 'bottom right',
            t: 'top',
            b: 'bottom',
            r: 'right',
            l: 'left',
            c: 'center'
        };
        st.fade = function () {
            return _fade;
        };
        st.left = (_2d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'translateX(' + -dist * st.rf + 'px)';
            return r;
        } : function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r.left = -dist * st.rf + 'px';
            return r;
        };
        st.right = (_2d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'translateX(' + dist * st.rf + 'px)';
            return r;
        } : function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r.left = dist * st.rf + 'px';
            return r;
        };
        st.top = (_2d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'translateY(' + -dist * st.rf + 'px)';
            return r;
        } : function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r.top = -dist * st.rf + 'px';
            return r;
        };
        st.bottom = (_2d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'translateY(' + dist * st.rf + 'px)';
            return r;
        } : function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r.top = dist * st.rf + 'px';
            return r;
        };
        st.from = (_2d) ? function (leftdis, topdis, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'translateX(' + leftdis * st.rf + 'px) translateY(' + topdis * st.rf + 'px)';
            return r;
        } : function (leftdis, topdis, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r.top = topdis * st.rf + 'px';
            r.left = leftdis * st.rf + 'px';
            return r;
        };
        st.rotate = (_2d) ? function (deg, orig) {
            var r = {
                opacity: 0
            };
            r[transform_css] = ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, orig) {
            return _fade;
        };
        st.rotateleft = (_2d) ? function (deg, dist, orig, fade) {
            var r = st.left(dist, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return st.left(dist, fade);
        };
        st.rotateright = (_2d) ? function (deg, dist, orig, fade) {
            var r = st.right(dist, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return st.right(dist, fade);
        };
        st.rotatetop = (_2d) ? function (deg, dist, orig, fade) {
            var r = st.top(dist, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return st.top(dist, fade);
        };
        st.rotatebottom = (_2d) ? function (deg, dist, orig, fade) {
            var r = st.bottom(dist, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return st.bottom(dist, fade);
        };
        st.rotatefrom = (_2d) ? function (deg, leftdis, topdis, orig, fade) {
            var r = st.from(leftdis, topdis, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, leftdis, topdis, orig, fade) {
            return st.from(leftdis, topdis, fade);
        };
        st.skewleft = (_2d) ? function (deg, dist, fade) {
            var r = st.left(dist, fade);
            r[transform_css] += ' skewX(' + deg + 'deg)';
            return r;
        } : function (deg, dist, fade) {
            return st.left(dist, fade);
        };
        st.skewright = (_2d) ? function (deg, dist, fade) {
            var r = st.right(dist, fade);
            r[transform_css] += ' skewX(' + -deg + 'deg)';
            return r;
        } : function (deg, dist, fade) {
            return st.right(dist, fade);
        };
        st.skewtop = (_2d) ? function (deg, dist, fade) {
            var r = st.top(dist, fade);
            r[transform_css] += ' skewY(' + deg + 'deg)';
            return r;
        } : function (deg, dist, fade) {
            return st.top(dist, fade);
        };
        st.skewbottom = (_2d) ? function (deg, dist, fade) {
            var r = st.bottom(dist, fade);
            r[transform_css] += ' skewY(' + -deg + 'deg)';
            return r;
        } : function (deg, dist, fade) {
            return st.bottom(dist, fade);
        };
        st.scale = (_2d) ? function (x, y, orig, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, orig, fade) {
            return fade === false ? {} : {
                opacity: 0
            };
        };
        st.scaleleft = (_2d) ? function (x, y, dist, orig, fade) {
            var r = st.left(dist, fade);
            r[transform_css] = ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, dist, orig, fade) {
            return st.left(dist, fade);
        };
        st.scaleright = (_2d) ? function (x, y, dist, orig, fade) {
            var r = st.right(dist, fade);
            r[transform_css] = ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, dist, orig, fade) {
            return st.right(dist, fade);
        };
        st.scaletop = (_2d) ? function (x, y, dist, orig, fade) {
            var r = st.top(dist, fade);
            r[transform_css] = ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, dist, orig, fade) {
            return st.top(dist, fade);
        };
        st.scalebottom = (_2d) ? function (x, y, dist, orig, fade) {
            var r = st.bottom(dist, fade);
            r[transform_css] = ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, dist, orig, fade) {
            return st.bottom(dist, fade);
        };
        st.scalefrom = (_2d) ? function (x, y, leftdis, topdis, orig, fade) {
            var r = st.from(leftdis, topdis, fade);
            r[transform_css] += ' scaleX(' + x + ') scaleY(' + y + ')';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, leftdis, topdis, orig, fade) {
            return st.from(leftdis, topdis, fade);
        };
        st.rotatescale = (_2d) ? function (deg, x, y, orig, fade) {
            var r = st.scale(x, y, orig, fade);
            r[transform_css] += ' rotate(' + deg + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, x, y, orig, fade) {
            return st.scale(x, y, orig, fade);
        };
        st.front = (window._css3d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + dist + 'px ) rotate(0.001deg)';
            return r;
        } : function (dist) {
            return _fade;
        };
        st.back = (window._css3d) ? function (dist, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + -dist + 'px ) rotate(0.001deg)';
            return r;
        } : function (dist) {
            return _fade;
        };
        st.rotatefront = (window._css3d) ? function (deg, dist, orig, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + dist + 'px ) rotate(' + (deg || 0.001) + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return _fade;
        };
        st.rotateback = (window._css3d) ? function (deg, dist, orig, fade) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            r[transform_css] = 'perspective(2000px) translate3d(0 , 0 ,' + -dist + 'px ) rotate(' + (deg || 0.001) + 'deg)';
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (deg, dist, orig, fade) {
            return _fade;
        };
        st.rotate3dleft = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.left(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.left(dist, fade);;
        };
        st.rotate3dright = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.right(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.right(dist, fade);;
        };
        st.rotate3dtop = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.top(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.top(dist, fade);;
        };
        st.rotate3dbottom = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.bottom(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.bottom(dist, fade);
        };
        st.rotate3dfront = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.front(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.front(dist, fade);
        };
        st.rotate3dback = (window._css3d) ? function (x, y, z, dist, orig, fade) {
            var r = st.back(dist, fade);
            r[transform_css] += (x ? ' rotateX(' + x + 'deg)' : ' ') + (y ? ' rotateY(' + y + 'deg)' : '') + (z ? ' rotateZ(' + z + 'deg)' : '');
            if (orig) r[transform_orig_css] = orig;
            return r;
        } : function (x, y, z, dist, orig, fade) {
            return st.back(dist, fade);
        };
        st.t = (window._css3d) ? function (fade, tx, ty, tz, r, rx, ry, rz, scx, scy, skx, sky, ox, oy, oz) {
            var _r = fade === false ? {} : {
                opacity: 0
            };
            var transform = 'perspective(2000px) ';
            tx !== 'n' && (transform += 'translateX(' + tx * st.rf + 'px) ');
            ty !== 'n' && (transform += 'translateY(' + ty * st.rf + 'px) ');
            tz !== 'n' && (transform += 'translateZ(' + tz * st.rf + 'px) ');
            r !== 'n' && (transform += 'rotate(' + r + 'deg) ');
            rx !== 'n' && (transform += 'rotateX(' + rx + 'deg) ');
            ry !== 'n' && (transform += 'rotateY(' + ry + 'deg) ');
            rz !== 'n' && (transform += 'rotateZ(' + rz + 'deg) ');
            skx !== 'n' && (transform += 'skewX(' + skx + 'deg) ');
            sky !== 'n' && (transform += 'skewY(' + sky + 'deg) ');
            scx !== 'n' && (transform += 'scaleX(' + scx + ') ');
            scy !== 'n' && (transform += 'scaleY(' + scy + ')');
            _r[transform_css] = transform;
            var trans_origin = '';
            trans_origin += (ox !== 'n' ? ox + '% ' : '50% ');
            trans_origin += (oy !== 'n' ? oy + '% ' : '50% ');
            trans_origin += (oz !== 'n' ? oz + 'px' : '');
            _r[transform_orig_css] = trans_origin;
            return _r;
        } : function (fade, tx, ty, tz, r, rx, ry, rz, scx, scy, skx, sky, ox, oy, oz) {
            var r = fade === false ? {} : {
                opacity: 0
            };
            tx !== 'n' && (r.left = tx * st.rf + 'px');
            ty !== 'n' && (r.top = ty * st.rf + 'px');
            return r;
        }
    };
})(jQuery);;
(function ($) {
    window.MSLayerElement = function () {
        this.start_anim = {
            name: 'fade',
            duration: 1000,
            ease: 'linear',
            delay: 0
        };
        this.end_anim = {
            duration: 1000,
            ease: 'linear'
        };
        this.type = 'text';
        this.resizable = true;
        this.minWidth = -1;
        this.isVisible = true;
        this.__cssConfig = ['margin-top', 'padding-top', 'margin-bottom', 'padding-left', 'margin-right', 'padding-right', 'margin-left', 'padding-bottom', 'font-size', 'line-height', 'width', 'left', 'right', 'top', 'bottom'];
        this.baseStyle = {};
    };
    var p = MSLayerElement.prototype;
    p.setStartAnim = function (anim) {
        $.extend(this.start_anim, anim);
        $.extend(this.start_anim, this._parseEff(this.start_anim.name));
        this.$element.css('visibility', 'hidden');
    };
    p.setEndAnim = function (anim) {
        $.extend(this.end_anim, anim);
    };
    p.create = function () {
        this.$element.css('display', 'none');
        this.resizable = this.$element.data('resize') !== false;
        this.fixed = this.$element.data('fixed') === true;
        if (this.$element.data('widthlimit') !== undefined) {
            this.minWidth = this.$element.data('widthlimit');
        }
        if (!this.end_anim.name) {
            this.end_anim.name = this.start_anim.name;
        }
        if (this.end_anim.time) {
            this.autoHide = true;
        }
        this.staticLayer = this.$element.data('position') === 'static';
        this.fixedLayer = this.$element.data('position') === 'fixed';
        this.layersCont = this.controller.$layers;
        if (this.staticLayer) {
            this.$element.css('display', '').css('visibility', '');
        }
        if (this.$element.data('action') !== undefined) {
            var slideController = this.slide.slider.slideController;
            this.$element.on(this.$element.data('action-event') || 'click', function (event) {
                slideController.runAction($(this).data('action'));
                event.preventDefault();
            }).addClass('ms-action-layer');
        }
        $.extend(this.end_anim, this._parseEff(this.end_anim.name));
        this.slider = this.slide.slider;
        if (this.masked) {
            this.$mask = $('<div></div>').addClass('ms-layer-mask');
            if (this.link) {
                this.link.wrap(this.$mask);
                this.$mask = this.link.parent();
            } else {
                this.$element.wrap(this.$mask);
                this.$mask = this.$element.parent();
            }
            if (this.maskWidth) {
                this.$mask.width(this.maskWidth);
            }
            if (this.maskHeight) {
                this.$mask.height(this.maskHeight);
                if (this.__cssConfig.indexOf('height') === -1) {
                    this.__cssConfig.push('height');
                }
            }
        }
        var layerOrigin = this.layerOrigin = this.$element.data('origin');
        if (layerOrigin) {
            var vOrigin = layerOrigin.charAt(0),
                hOrigin = layerOrigin.charAt(1),
                offsetX = this.$element.data('offset-x'),
                offsetY = this.$element.data('offset-y'),
                layerEle = this.masked ? this.$mask[0] : this.$element[0];
            if (offsetY === undefined) {
                offsetY = 0;
            }
            switch (vOrigin) {
                case 't':
                    layerEle.style.top = offsetY + 'px';
                    break;
                case 'b':
                    layerEle.style.bottom = offsetY + 'px';
                    break;
                case 'm':
                    layerEle.style.top = offsetY + 'px';
                    this.middleAlign = true;
            }
            if (offsetX === undefined) {
                offsetX = 0;
            }
            switch (hOrigin) {
                case 'l':
                    layerEle.style.left = offsetX + 'px';
                    break;
                case 'r':
                    layerEle.style.right = offsetX + 'px';
                    break;
                case 'c':
                    layerEle.style.left = offsetX + 'px';
                    this.centerAlign = true;
            }
        }
        this.parallax = this.$element.data('parallax')
        if (this.parallax != null) {
            this.parallax /= 100;
            this.$parallaxElement = $('<div></div>').addClass('ms-parallax-layer');
            if (this.masked) {
                this.$mask.wrap(this.$parallaxElement);
                this.$parallaxElement = this.$mask.parent();
            } else if (this.link) {
                this.link.wrap(this.$parallaxElement);
                this.$parallaxElement = this.link.parent();
            } else {
                this.$element.wrap(this.$parallaxElement);
                this.$parallaxElement = this.$element.parent();
            }
            this._lastParaX = 0;
            this._lastParaY = 0;
            this._paraX = 0;
            this._paraY = 0;
            this.alignedToBot = this.layerOrigin && this.layerOrigin.indexOf('b') !== -1;
            if (this.alignedToBot) {
                this.$parallaxElement.css('bottom', 0);
            }
            if (window._css3d) {
                this.parallaxRender = this._parallaxCSS3DRenderer;
            } else if (window._css2d) {
                this.parallaxRender = this._parallaxCSS2DRenderer;
            } else {
                this.parallaxRender = this._parallax2DRenderer;
            }
            if (this.slider.options.parallaxMode !== 'swipe') {
                averta.Ticker.add(this.parallaxRender, this);
            }
        }
        $.removeDataAttrs(this.$element, ['data-src']);
    };
    p.init = function () {
        this.initialized = true;
        var value;
        this.$element.css('visibility', '');
        for (var i = 0, l = this.__cssConfig.length; i < l; i++) {
            var key = this.__cssConfig[i];
            if (this._isPosition(key) && this.masked) {
                value = this.$mask.css(key);
            } else if (this.type === 'text' && key === 'width' && !this.masked && !this.maskWidth) {
                value = this.$element[0].style.width;
            } else {
                value = this.$element.css(key);
                var isSize = key === 'width' || key === 'height';
                if (isSize && this.masked) {
                    if (this.maskWidth && key === 'width') {
                        value = this.maskWidth + 'px';
                    } else if (this.maskHeight && key === 'height') {
                        value = this.maskHeight + 'px';
                    }
                }
                if (isSize && value === '0px') {
                    value = this.$element.data(key) + 'px';
                }
            }
            if (this.layerOrigin && ((key === 'top' && this.layerOrigin.indexOf('t') === -1 && this.layerOrigin.indexOf('m') === -1) || (key === 'bottom' && this.layerOrigin.indexOf('b') === -1) || (key === 'left' && this.layerOrigin.indexOf('l') === -1 && this.layerOrigin.indexOf('c') === -1) || (key === 'right' && this.layerOrigin.indexOf('r') === -1))) {
                continue;
            }
            if (value != 'auto' && value != "" && value != "normal") {
                this.baseStyle[key] = parseInt(value);
            }
        }
        if (this.middleAlign) {
            this.baseHeight = this.$element.outerHeight(false);
        }
        if (this.centerAlign) {
            this.baseWidth = this.$element.outerWidth(false);
        }
    };
    p.locate = function () {
        if (!this.slide.ready) {
            return;
        }
        var width = parseFloat(this.layersCont.css('width')),
            height = parseFloat(this.layersCont.css('height')),
            factor, isPosition, isSize;
        if (!this.staticLayer && this.$element.css('display') === 'none' && this.isVisible) {
            this.$element.css('display', '').css('visibility', 'hidden');
        }
        if (this.staticLayer) {
            this.$element.addClass('ms-hover-active');
        }
        factor = this.resizeFactor = width / this.slide.slider.options.width;
        var $layerEle = this.masked ? this.$mask : this.$element;
        for (var key in this.baseStyle) {
            isPosition = this._isPosition(key);
            isSize = key === 'width' || key === 'height';
            if (this.fixed && isPosition) {
                factor = 1;
            } else {
                factor = this.resizeFactor;
            }
            if (!this.resizable && !isPosition) {
                continue;
            }
            if (key === 'top' && this.middleAlign) {
                $layerEle[0].style.top = '0px';
                this.baseHeight = $layerEle.outerHeight(false);
                $layerEle[0].style.top = this.baseStyle['top'] * factor + (height - this.baseHeight) / 2 + 'px';
            } else if (key === 'left' && this.centerAlign) {
                $layerEle[0].style.left = '0px';
                this.baseWidth = $layerEle.outerWidth(false);
                $layerEle[0].style.left = this.baseStyle['left'] * factor + (width - this.baseWidth) / 2 + 'px';
            } else if (isPosition && this.masked) {
                $layerEle[0].style[key] = this.baseStyle[key] * factor + 'px';
            } else if (isSize && ((key === 'width' && this.maskWidth) || (key === 'height' && this.maskHeight))) {
                $layerEle[0].style[key] = this.baseStyle[key] * factor + 'px';
            } else {
                this.$element.css(key, this.baseStyle[key] * factor + 'px');
            }
        }
        this.visible(this.minWidth < width);
    };
    p.start = function () {
        if (this.isShowing || this.staticLayer) {
            return;
        }
        this.isShowing = true;
        this.$element.removeClass('ms-hover-active');
        var key, base;
        MSLayerEffects.rf = this.resizeFactor;
        var effect_css = MSLayerEffects[this.start_anim.eff_name].apply(null, this._parseEffParams(this.start_anim.eff_params));
        var start_css_eff = {};
        for (key in effect_css) {
            if (this._checkPosKey(key, effect_css)) {
                continue;
            }
            if (MSLayerEffects.defaultValues[key] != null) {
                start_css_eff[key] = MSLayerEffects.defaultValues[key];
            }
            if (key in this.baseStyle) {
                base = this.baseStyle[key];
                if (this.middleAlign && key === 'top') {
                    base += (parseInt(this.layersCont.height()) - this.$element.outerHeight(false)) / 2;
                }
                if (this.centerAlign && key === 'left') {
                    base += (parseInt(this.layersCont.width()) - this.$element.outerWidth(false)) / 2;
                }
                effect_css[key] = base + parseFloat(effect_css[key]) + 'px';
                start_css_eff[key] = base + 'px';
            }
            this.$element.css(key, effect_css[key]);
        }
        var that = this;
        clearTimeout(this.to);
        clearTimeout(this.clHide);
        this.to = setTimeout(function () {
            that.$element.css('visibility', '');
            that._playAnimation(that.start_anim, start_css_eff);
        }, that.start_anim.delay || 0.01);
        this.clTo = setTimeout(function () {
            that.show_cl = true;
            that.$element.addClass('ms-hover-active');
        }, (this.start_anim.delay || 0.01) + this.start_anim.duration + 1);
        if (this.autoHide) {
            clearTimeout(this.hto);
            this.hto = setTimeout(function () {
                that.hide();
            }, that.end_anim.time);
        }
    };
    p.hide = function () {
        if (this.staticLayer) {
            return;
        }
        this.$element.removeClass('ms-hover-active');
        this.isShowing = false;
        var effect_css = MSLayerEffects[this.end_anim.eff_name].apply(null, this._parseEffParams(this.end_anim.eff_params));
        for (key in effect_css) {
            if (this._checkPosKey(key, effect_css)) continue;
            if (key === window._jcsspfx + 'TransformOrigin') {
                this.$element.css(key, effect_css[key]);
            }
            if (key in this.baseStyle) {
                effect_css[key] = this.baseStyle[key] + parseFloat(effect_css[key]) + 'px';
            }
        }
        this._playAnimation(this.end_anim, effect_css);
        clearTimeout(this.clHide);
        if (effect_css.opacity === 0) {
            this.clHide = setTimeout(function () {
                this.$element.css('visibility', 'hidden');
            }.bind(this), this.end_anim.duration + 1);
        }
        clearTimeout(this.to);
        clearTimeout(this.hto);
        clearTimeout(this.clTo);
    };
    p.reset = function () {
        if (this.staticLayer) {
            return;
        }
        this.isShowing = false;
        this.$element[0].style.display = 'none';
        this.$element.css('opacity', '');
        this.$element[0].style['transitionDuration'] = '';
        if (this.show_tween)
            this.show_tween.stop(true);
        clearTimeout(this.to);
        clearTimeout(this.hto);
    };
    p.destroy = function () {
        this.reset();
        this.$element.remove();
    };
    p.visible = function (value) {
        if (this.isVisible == value) return;
        this.isVisible = value;
        this.$element.css('display', (value ? '' : 'none'));
    };
    p.moveParallax = function (x, y, fast) {
        this._paraX = x;
        this._paraY = y;
        if (fast) {
            this._lastParaX = x;
            this._lastParaY = y;
            this.parallaxRender();
        }
    };
    p._playAnimation = function (animation, css) {
        var options = {};
        if (animation.ease) {
            options.ease = animation.ease;
        }
        options.transProperty = window._csspfx + 'transform,opacity';
        if (this.show_tween) {
            this.show_tween.stop(true);
        }
        this.show_tween = CTween.animate(this.$element, animation.duration, css, options);
    };
    p._randomParam = function (value) {
        var min = Number(value.slice(0, value.indexOf('|')));
        var max = Number(value.slice(value.indexOf('|') + 1));
        return min + Math.random() * (max - min);
    };
    p._parseEff = function (eff_name) {
        var eff_params = [];
        if (eff_name.indexOf('(') !== -1) {
            var temp = eff_name.slice(0, eff_name.indexOf('(')).toLowerCase();
            var value;
            eff_params = eff_name.slice(eff_name.indexOf('(') + 1, -1).replace(/\"|\'|\s/g, '').split(',');
            eff_name = temp;
            for (var i = 0, l = eff_params.length; i < l; ++i) {
                value = eff_params[i];
                if (value in MSLayerEffects.presetEffParams) {
                    value = MSLayerEffects.presetEffParams[value];
                }
                eff_params[i] = value;
            }
        }
        return {
            eff_name: eff_name,
            eff_params: eff_params
        };
    };
    p._parseEffParams = function (params) {
        var eff_params = [];
        for (var i = 0, l = params.length; i < l; ++i) {
            var value = params[i];
            if (typeof value === 'string' && value.indexOf('|') !== -1) value = this._randomParam(value);
            eff_params[i] = value;
        }
        return eff_params;
    };
    p._checkPosKey = function (key, style) {
        if (key === 'left' && !(key in this.baseStyle) && 'right' in this.baseStyle) {
            style.right = -parseInt(style.left) + 'px';
            delete style.left;
            return true;
        }
        if (key === 'top' && !(key in this.baseStyle) && 'bottom' in this.baseStyle) {
            style.bottom = -parseInt(style.top) + 'px';
            delete style.top;
            return true;
        }
        return false;
    };
    p._isPosition = function (key) {
        return key === 'top' || key === 'left' || key === 'bottom' || key === 'right';
    };
    p._parallaxCalc = function () {
        var x_def = this._paraX - this._lastParaX,
            y_def = this._paraY - this._lastParaY;
        this._lastParaX += x_def / 12;
        this._lastParaY += y_def / 12;
        if (Math.abs(x_def) < 0.019) {
            this._lastParaX = this._paraX;
        }
        if (Math.abs(y_def) < 0.019) {
            this._lastParaY = this._paraY;
        }
    }
    p._parallaxCSS3DRenderer = function () {
        this._parallaxCalc();
        this.$parallaxElement[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + this._lastParaX * this.parallax + 'px) translateY(' + this._lastParaY * this.parallax + 'px) translateZ(0)';
    };
    p._parallaxCSS2DRenderer = function () {
        this._parallaxCalc();
        this.$parallaxElement[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + this._lastParaX * this.parallax + 'px) translateY(' + this._lastParaY * this.parallax + 'px)';
    };
    p._parallax2DRenderer = function () {
        this._parallaxCalc();
        if (this.alignedToBot) {
            this.$parallaxElement[0].style.bottom = this._lastParaY * this.parallax + 'px';
        } else {
            this.$parallaxElement[0].style.top = this._lastParaY * this.parallax + 'px';
        }
        this.$parallaxElement[0].style.left = this._lastParaX * this.parallax + 'px';
    };
})(jQuery);;
(function ($) {
    window.MSImageLayerElement = function () {
        MSLayerElement.call(this);
        this.needPreload = true;
        this.__cssConfig = ['width', 'height', 'margin-top', 'padding-top', 'margin-bottom', 'padding-left', 'margin-right', 'padding-right', 'margin-left', 'padding-bottom', 'left', 'right', 'top', 'bottom'];
        this.type = 'image';
    };
    MSImageLayerElement.extend(MSLayerElement);
    var p = MSImageLayerElement.prototype;
    var _super = MSLayerElement.prototype;
    p.create = function () {
        if (this.link) {
            var p = this.$element.parent();
            p.append(this.link);
            this.link.append(this.$element);
            this.link.removeClass('ms-layer');
            this.$element.addClass('ms-layer');
            p = null;
        }
        _super.create.call(this);
        if (this.$element.data('src') != undefined) {
            this.img_src = this.$element.data('src');
            this.$element.removeAttr('data-src');
        } else {
            var that = this;
            this.$element.on('load', function (event) {
                that.controller.preloadCount--;
                if (that.controller.preloadCount === 0)
                    that.controller._onlayersReady();
            }).each($.jqLoadFix);
        }
        if ($.browser.msie)
            this.$element.on('dragstart', function (event) {
                event.preventDefault();
            });
    };
    p.loadImage = function () {
        var that = this;
        this.$element.preloadImg(this.img_src, function (event) {
            that.controller.preloadCount--;
            if (that.controller.preloadCount === 0) that.controller._onlayersReady();
        });
    };
})(jQuery);;
(function ($) {
    window.MSVideoLayerElement = function () {
        MSLayerElement.call(this);
        this.__cssConfig.push('height');
        this.type = 'video';
    };
    MSVideoLayerElement.extend(MSLayerElement);
    var p = MSVideoLayerElement.prototype;
    var _super = MSLayerElement.prototype;
    p.__playVideo = function () {
        if (this.img) CTween.fadeOut(this.img, 500, 2);
        CTween.fadeOut(this.video_btn, 500, 2);
        this.video_frame.attr('src', 'about:blank').css('display', 'block');
        if (this.video_url.indexOf('?') == -1) this.video_url += '?';
        this.video_frame.attr('src', this.video_url + '&autoplay=1');
    };
    p.start = function () {
        _super.start.call(this);
        if (this.$element.data('autoplay')) {
            this.__playVideo();
        }
    };
    p.reset = function () {
        _super.reset.call(this);
        if (this.needPreload || this.$element.data('btn')) {
            this.video_btn.css('opacity', 1).css('display', 'block');
            this.video_frame.attr('src', 'about:blank').css('display', 'none');
        }
        if (this.needPreload) {
            this.img.css('opacity', 1).css('display', 'block');
            return;
        }
        this.video_frame.attr('src', this.video_url);
    };
    p.create = function () {
        _super.create.call(this);
        this.video_frame = this.$element.find('iframe').css({
            width: '100%',
            height: '100%'
        });
        this.video_url = this.video_frame.attr('src');
        var has_img = this.$element.has('img').length != 0;
        if (!has_img && !this.$element.data('btn')) return;
        this.video_frame.attr('src', 'about:blank').css('display', 'none');
        var that = this;
        this.video_btn = $('<div></div>').appendTo(this.$element).addClass('ms-video-btn').click(function () {
            that.__playVideo();
        });
        if (!has_img) return;
        this.needPreload = true;
        this.img = this.$element.find('img:first').addClass('ms-video-img');
        if (this.img.data('src') !== undefined) {
            this.img_src = this.img.data('src');
            this.img.removeAttr('data-src');
        } else {
            var that = this;
            this.img.attr('src', this.img_src).on('load', function (event) {
                that.controller.preloadCount--;
                if (that.controller.preloadCount === 0)
                    that.controller._onlayersReady();
            }).each($.jqLoadFix);
        }
        if ($.browser.msie)
            this.img.on('dragstart', function (event) {
                event.preventDefault();
            });
    };
    p.loadImage = function () {
        var that = this;
        this.img.preloadImg(this.img_src, function (event) {
            that.controller.preloadCount--;
            if (that.controller.preloadCount === 0) that.controller._onlayersReady();
        });
    };
})(jQuery);;
(function ($) {
    "use strict";
    window.MSHotspotLayer = function () {
        MSLayerElement.call(this);
        this.__cssConfig = ['margin-top', 'padding-top', 'margin-bottom', 'padding-left', 'margin-right', 'padding-right', 'margin-left', 'padding-bottom', 'left', 'right', 'top', 'bottom'];
        this.ease = 'Expo';
        this.hide_start = true;
        this.type = 'hotspot';
    };
    MSHotspotLayer.extend(MSLayerElement);
    var p = MSHotspotLayer.prototype;
    var _super = MSLayerElement.prototype;
    p._showTT = function () {
        if (!this.show_cl) return;
        clearTimeout(this.hto);
        if (this._tween) this._tween.stop(true);
        if (this.hide_start) {
            this.align = this._orgAlign;
            this._locateTT();
            this.tt.css({
                display: 'block'
            });
            this._tween = CTween.animate(this.tt, 900, this.to, {
                ease: 'easeOut' + this.ease
            });
            this.hide_start = false;
        }
    };
    p._hideTT = function () {
        if (!this.show_cl) return;
        if (this._tween) this._tween.stop(true);
        var that = this;
        clearTimeout(this.hto);
        this.hto = setTimeout(function () {
            that.hide_start = true;
            that._tween = CTween.animate(that.tt, 900, that.from, {
                ease: 'easeOut' + that.ease,
                complete: function () {
                    that.tt.css('display', 'none');
                }
            });
        }, 200);
    };
    p._updateClassName = function (name) {
        if (this._lastClass) this.tt.removeClass(this._lastClass);
        this.tt.addClass(name);
        this._lastClass = name;
    }
    p._alignPolicy = function () {
        var h = this.tt.outerHeight(false),
            w = Math.max(this.tt.outerWidth(false), parseInt(this.tt.css('max-width'))),
            ww = window.innerWidth,
            wh = window.innerHeight;
        switch (this.align) {
            case 'top':
                if (this.base_t < 0)
                    return 'bottom';
                break;
            case 'right':
                if (this.base_l + w > ww || this.base_t < 0)
                    return 'bottom';
                break;
            case 'left':
                if (this.base_l < 0 || this.base_t < 0)
                    return 'bottom';
                break;
        }
        return null;
    };
    p._locateTT = function () {
        var os = this.$element.offset(),
            os2 = this.slide.slider.$element.offset();
        var dist = 50,
            space = 15
        this.pos_x = os.left - os2.left - this.slide.slider.$element.scrollLeft();
        this.pos_y = os.top - os2.top - this.slide.slider.$element.scrollTop();
        this.from = {
            opacity: 0
        };
        this.to = {
            opacity: 1
        };
        this._updateClassName('ms-tooltip-' + this.align);
        this.tt_arrow.css('margin-left', '');
        var arrow_w = 15,
            arrow_h = 15;
        switch (this.align) {
            case 'top':
                var w = Math.min(this.tt.outerWidth(false), parseInt(this.tt.css('max-width')));
                this.base_t = this.pos_y - this.tt.outerHeight(false) - arrow_h - space;
                this.base_l = this.pos_x - w / 2;
                if (this.base_l + w > window.innerWidth) {
                    this.tt_arrow.css('margin-left', -arrow_w / 2 + this.base_l + w - window.innerWidth + 'px');
                    this.base_l = window.innerWidth - w;
                }
                if (this.base_l < 0) {
                    this.base_l = 0;
                    this.tt_arrow.css('margin-left', -arrow_w / 2 + this.pos_x - this.tt.outerWidth(false) / 2 + 'px');
                }
                if (window._css3d) {
                    this.from[window._jcsspfx + 'Transform'] = 'translateY(-' + dist + 'px)';
                    this.to[window._jcsspfx + 'Transform'] = '';
                } else {
                    this.from.top = (this.base_t - dist) + 'px';
                    this.to.top = this.base_t + 'px';
                }
                break;
            case 'bottom':
                var w = Math.min(this.tt.outerWidth(false), parseInt(this.tt.css('max-width')));
                this.base_t = this.pos_y + arrow_h + space;
                this.base_l = this.pos_x - w / 2;
                if (this.base_l + w > window.innerWidth) {
                    this.tt_arrow.css('margin-left', -arrow_w / 2 + this.base_l + w - window.innerWidth + 'px');
                    this.base_l = window.innerWidth - w;
                }
                if (this.base_l < 0) {
                    this.base_l = 0;
                    this.tt_arrow.css('margin-left', -arrow_w / 2 + this.pos_x - this.tt.outerWidth(false) / 2 + 'px');
                }
                if (window._css3d) {
                    this.from[window._jcsspfx + 'Transform'] = 'translateY(' + dist + 'px)';
                    this.to[window._jcsspfx + 'Transform'] = '';
                } else {
                    this.from.top = (this.base_t + dist) + 'px';
                    this.to.top = this.base_t + 'px';
                }
                break;
            case 'right':
                this.base_l = this.pos_x + arrow_w + space;
                this.base_t = this.pos_y - this.tt.outerHeight(false) / 2;
                if (window._css3d) {
                    this.from[window._jcsspfx + 'Transform'] = 'translateX(' + dist + 'px)';
                    this.to[window._jcsspfx + 'Transform'] = '';
                } else {
                    this.from.left = (this.base_l + dist) + 'px';
                    this.to.left = this.base_l + 'px';
                }
                break;
            case 'left':
                this.base_l = this.pos_x - arrow_w - this.tt.outerWidth(false) - space;
                this.base_t = this.pos_y - this.tt.outerHeight(false) / 2;
                if (window._css3d) {
                    this.from[window._jcsspfx + 'Transform'] = 'translateX(-' + dist + 'px)';
                    this.to[window._jcsspfx + 'Transform'] = '';
                } else {
                    this.from.left = (this.base_l - dist) + 'px';
                    this.to.left = this.base_l + 'px';
                }
                break;
        }
        var policyAlign = this._alignPolicy();
        if (policyAlign !== null) {
            this.align = policyAlign;
            this._locateTT();
            return;
        }
        this.tt.css('top', parseInt(this.base_t) + 'px').css('left', parseInt(this.base_l) + 'px');
        this.tt.css(this.from);
    };
    p.start = function () {
        _super.start.call(this);
        this.tt.appendTo(this.slide.slider.$element);
        this.tt.css('display', 'none');
    };
    p.reset = function () {
        _super.reset.call(this);
        this.tt.detach();
    };
    p.create = function () {
        var that = this;
        this._orgAlign = this.align = this.$element.data('align') !== undefined ? this.$element.data('align') : 'top';
        this.data = this.$element.html();
        this.$element.html('').on('mouseenter', function () {
            that._showTT();
        }).on('mouseleave', function () {
            that._hideTT();
        });
        this.point = $('<div><div class="ms-point-center"></div><div class="ms-point-border"></div></div>').addClass('ms-tooltip-point').appendTo(this.$element);
        var link = this.$element.data('link'),
            target = this.$element.data('target');
        if (link) {
            this.point.on('click', function () {
                window.open(link, target || '_self');
            });
        }
        this.tt = $('<div></div>').addClass('ms-tooltip').css('display', 'hidden').css('opacity', 0);
        if (this.$element.data('width') !== undefined) {
            this.tt.css('width', this.$element.data('width')).css('max-width', this.$element.data('width'));
        }
        this.tt_arrow = $('<div></div>').addClass('ms-tooltip-arrow').appendTo(this.tt);
        this._updateClassName('ms-tooltip-' + this.align);
        this.ttcont = $('<div></div>').addClass('ms-tooltip-cont').html(this.data).appendTo(this.tt)
        if (this.$element.data('stay-hover') === true) {
            this.tt.on('mouseenter', function () {
                if (that.hide_start) {
                    return
                }
                clearTimeout(that.hto);
                that._tween.stop(true);
                that._showTT();
            }).on('mouseleave', function () {
                that._hideTT();
            });
        }
        _super.create.call(this);
    };
})(jQuery);
(function ($) {
    window.MSButtonLayer = function () {
        MSLayerElement.call(this);
        this.type = 'button';
    };
    MSButtonLayer.extend(MSLayerElement);
    var p = MSButtonLayer.prototype;
    var _super = MSLayerElement.prototype;
    var positionKies = ['top', 'left', 'bottom', 'right'];
    p.create = function () {
        _super.create.call(this);
        this.$element.wrap('<div class="ms-btn-container"></div>').css('position', 'relative');
        this.$container = this.$element.parent();
    };
    p.locate = function () {
        _super.locate.call(this);
        var key, tempValue;
        for (var i = 0; i < 4; i++) {
            key = positionKies[i];
            if (key in this.baseStyle) {
                tempValue = this.$element.css(key);
                this.$element.css(key, '');
                this.$container.css(key, tempValue);
            }
        }
        this.$container.width(this.$element.outerWidth(true)).height(this.$element.outerHeight(true));
    };
})(jQuery);
window.MSSliderEvent = function (type) {
    this.type = type;
};
MSSliderEvent.CHANGE_START = 'ms_changestart';
MSSliderEvent.CHANGE_END = 'ms_changeend';
MSSliderEvent.WAITING = 'ms_waiting';
MSSliderEvent.AUTOPLAY_CHANGE = 'ms_autoplaychange';
MSSliderEvent.VIDEO_PLAY = 'ms_videoPlay';
MSSliderEvent.VIDEO_CLOSE = 'ms_videoclose';
MSSliderEvent.INIT = 'ms_init';
MSSliderEvent.HARD_UPDATE = 'ms_hard_update';
MSSliderEvent.RESIZE = 'ms_resize';
MSSliderEvent.RESERVED_SPACE_CHANGE = 'ms_rsc';
MSSliderEvent.DESTROY = 'ms_destroy';;
(function (window, document, $) {
    "use strict";
    window.MSSlide = function () {
        this.$element = null;
        this.$loading = $('<div></div>').addClass('ms-slide-loading');
        this.view = null;
        this.index = -1;
        this.__width = 0;
        this.__height = 0;
        this.fillMode = 'fill';
        this.selected = false;
        this.pselected = false;
        this.autoAppend = true;
        this.isSleeping = true;
        this.moz = $.browser.mozilla;
    };
    var p = MSSlide.prototype;
    p.onSwipeStart = function () {
        if (this.link) {
            this.linkdis = true;
        }
        if (this.video) {
            this.videodis = true;
        }
    };
    p.onSwipeMove = function (e) {
        var move = Math.max(Math.abs(e.data.distanceX), Math.abs(e.data.distanceY));
        this.swipeMoved = move > 4;
    };
    p.onSwipeCancel = function (e) {
        if (this.swipeMoved) {
            this.swipeMoved = false;
            return;
        }
        if (this.link) {
            this.linkdis = false;
        }
        if (this.video) {
            this.videodis = false;
        }
    };
    p.setupLayerController = function () {
        this.hasLayers = true;
        this.layerController = new MSLayerController(this);
    };
    p.assetsLoaded = function () {
        this.ready = true;
        this.slider.api._startTimer();
        if (this.selected || (this.pselected && this.slider.options.instantStartLayers)) {
            if (this.hasLayers) {
                this.layerController.showLayers();
            }
            if (this.vinit) {
                this.bgvideo.play();
                if (!this.autoPauseBgVid) {
                    this.bgvideo.currentTime = 0;
                }
            }
        }
        if (!this.isSleeping) {
            this.setupBG();
        }
        CTween.fadeOut(this.$loading, 300, true);
        if ((this.slider.options.preload === 0 || this.slider.options.preload === 'all') && this.index < this.view.slideList.length - 1) {
            this.view.slideList[this.index + 1].loadImages();
        } else if (this.slider.options.preload === 'all' && this.index === this.view.slideList.length - 1) {
            this.slider._removeLoading();
        }
    };
    p.setBG = function (img) {
        this.hasBG = true;
        var that = this;
        this.$imgcont = $('<div></div>').addClass('ms-slide-bgcont');
        this.$element.append(this.$loading).append(this.$imgcont);
        this.$bg_img = $(img).css('visibility', 'hidden');
        this.$imgcont.append(this.$bg_img);
        this.bgAligner = new MSAligner(that.fillMode, that.$imgcont, that.$bg_img);
        this.bgAligner.widthOnly = this.slider.options.autoHeight;
        if (that.slider.options.autoHeight && (that.pselected || that.selected)) {
            that.slider.setHeight(that.slider.options.height);
        }
        if (this.$bg_img.data('src') !== undefined) {
            this.bg_src = this.$bg_img.data('src');
            this.$bg_img.removeAttr('data-src');
        } else {
            this.$bg_img.one('load', function (event) {
                that._onBGLoad(event);
            }).each($.jqLoadFix);
        }
    };
    p.setupBG = function () {
        if (!this.initBG && this.bgLoaded) {
            this.initBG = true;
            this.$bg_img.css('visibility', '');
            this.bgWidth = this.bgNatrualWidth || this.$bg_img.width();
            this.bgHeight = this.bgNatrualHeight || this.$bg_img.height();
            CTween.fadeIn(this.$imgcont, 300);
            if (this.slider.options.autoHeight) {
                this.$imgcont.height(this.bgHeight * this.ratio);
            }
            this.bgAligner.init(this.bgWidth, this.bgHeight);
            this.setSize(this.__width, this.__height);
            if (this.slider.options.autoHeight && (this.pselected || this.selected))
                this.slider.setHeight(this.getHeight());
        }
    };
    p.loadImages = function () {
        if (this.ls) {
            return;
        }
        this.ls = true;
        if (this.bgvideo) {
            this.bgvideo.load();
        }
        if (this.hasBG && this.bg_src) {
            var that = this;
            this.$bg_img.preloadImg(this.bg_src, function (event) {
                that._onBGLoad(event);
            });
        }
        if (this.hasLayers) {
            this.layerController.loadLayers(this._onLayersLoad);
        }
        if (!this.hasBG && !this.hasLayers) {
            this.assetsLoaded();
        }
    };
    p._onLayersLoad = function () {
        this.layersLoaded = true;
        if (!this.hasBG || this.bgLoaded) {
            this.assetsLoaded();
        }
    };
    p._onBGLoad = function (event) {
        this.bgNatrualWidth = event.width;
        this.bgNatrualHeight = event.height;
        this.bgLoaded = true;
        if ($.browser.msie) {
            this.$bg_img.on('dragstart', function (event) {
                event.preventDefault();
            });
        }
        if (!this.hasLayers || this.layerController.ready) {
            this.assetsLoaded();
        }
    };
    p.setBGVideo = function ($video) {
        if (!$video[0].play) {
            return;
        }
        if (window._mobile && !this.slider.options.mobileBGVideo) {
            $video.remove();
            return;
        }
        this.bgvideo = $video[0];
        var that = this;
        $video.addClass('ms-slide-bgvideo');
        if ($video.data('loop') !== false) {
            this.bgvideo.addEventListener('ended', function () {
                that.bgvideo.play();
            });
        }
        if ($video.data('mute') !== false) {
            this.bgvideo.muted = true;
        }
        if ($video.data('autopause') === true) {
            this.autoPauseBgVid = true;
        }
        this.bgvideo_fillmode = $video.data('fill-mode') || 'fill';
        if (this.bgvideo_fillmode !== 'none') {
            this.bgVideoAligner = new MSAligner(this.bgvideo_fillmode, this.$element, $video);
            this.bgvideo.addEventListener('loadedmetadata', function () {
                if (that.vinit) return;
                that.vinit = true;
                that.video_aspect = that.bgVideoAligner.baseHeight / that.bgVideoAligner.baseWidth;
                that.bgVideoAligner.init(that.bgvideo.videoWidth, that.bgvideo.videoHeight);
                that._alignBGVideo();
                CTween.fadeIn($(that.bgvideo), 200);
                if (that.selected) {
                    that.bgvideo.play();
                }
            });
        }
        $video.css('opacity', 0);
        this.$bgvideocont = $('<div></div>').addClass('ms-slide-bgvideocont').append($video);
        if (this.hasBG) {
            this.$imgcont.before(this.$bgvideocont);
        } else {
            this.$bgvideocont.appendTo(this.$element);
        }
    };
    p._alignBGVideo = function () {
        if (!this.bgvideo_fillmode || this.bgvideo_fillmode === 'none') {
            return;
        }
        this.bgVideoAligner.align();
    };
    p.setSize = function (width, height, hard) {
        this.__width = width;
        if (this.slider.options.autoHeight) {
            if (this.bgLoaded) {
                this.ratio = this.__width / this.bgWidth;
                height = Math.floor(this.ratio * this.bgHeight);
                this.$imgcont.height(height);
            } else {
                this.ratio = width / this.slider.options.width;
                height = this.slider.options.height * this.ratio;
            }
        }
        this.__height = height;
        this.$element.width(width).height(height);
        if (this.hasBG && this.bgLoaded) this.bgAligner.align();
        this._alignBGVideo();
        if (this.hasLayers) {
            this.layerController.setSize(width, height, hard);
        }
    };
    p.getHeight = function () {
        if (this.hasBG && this.bgLoaded) {
            return this.bgHeight * this.ratio;
        }
        return Math.max(this.$element[0].clientHeight, this.slider.options.height * this.ratio);
    };
    p.__playVideo = function () {
        if (this.vplayed || this.videodis) {
            return;
        }
        this.vplayed = true;
        if (!this.slider.api.paused) {
            this.slider.api.pause();
            this.roc = true;
        }
        this.vcbtn.css('display', '');
        CTween.fadeOut(this.vpbtn, 500, false);
        CTween.fadeIn(this.vcbtn, 500);
        CTween.fadeIn(this.vframe, 500);
        this.vframe.css('display', 'block').attr('src', this.video + '&autoplay=1');
        this.view.$element.addClass('ms-def-cursor');
        if (this.moz) {
            this.view.$element.css('perspective', 'none');
        }
        if (this.view.swipeControl) {
            this.view.swipeControl.disable();
        }
        this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY));
    };
    p.__closeVideo = function () {
        if (!this.vplayed) {
            return;
        }
        this.vplayed = false;
        if (this.roc) {
            this.slider.api.resume();
        }
        var that = this;
        CTween.fadeIn(this.vpbtn, 500);
        CTween.animate(this.vcbtn, 500, {
            opacity: 0
        }, {
            complete: function () {
                that.vcbtn.css('display', 'none');
            }
        });
        CTween.animate(this.vframe, 500, {
            opacity: 0
        }, {
            complete: function () {
                that.vframe.attr('src', 'about:blank').css('display', 'none');
            }
        });
        if (this.moz) {
            this.view.$element.css('perspective', '');
        }
        if (this.view.swipeControl) {
            this.view.swipeControl.enable();
        }
        this.view.$element.removeClass('ms-def-cursor');
        this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE));
    };
    p.create = function () {
        var that = this;
        if (this.hasLayers) {
            this.layerController.create();
        }
        if (this.link) {
            this.link.addClass('ms-slide-link').html('').click(function (e) {
                if (that.linkdis) {
                    e.preventDefault();
                }
            });
        }
        if (this.video) {
            if (this.video.indexOf('?') === -1) {
                this.video += '?';
            }
            this.vframe = $('<iframe></iframe>').addClass('ms-slide-video').css({
                width: '100%',
                height: '100%',
                display: 'none'
            }).attr('src', 'about:blank').attr('allowfullscreen', 'true').appendTo(this.$element);
            this.vpbtn = $('<div></div>').addClass('ms-slide-vpbtn').click(function () {
                that.__playVideo();
            }).appendTo(this.$element);
            this.vcbtn = $('<div></div>').addClass('ms-slide-vcbtn').click(function () {
                that.__closeVideo();
            }).appendTo(this.$element).css('display', 'none');
            if (window._touch) {
                this.vcbtn.removeClass('ms-slide-vcbtn').addClass('ms-slide-vcbtn-mobile').append('<div class="ms-vcbtn-txt">Close video</div>').appendTo(this.view.$element.parent());
            }
        }
        if (!this.slider.options.autoHeight && this.hasBG) {
            this.$imgcont.css('height', '100%');
            if (this.fillMode === 'center' || this.fillMode === 'stretch') {
                this.fillMode = 'fill';
            }
        }
        if (this.slider.options.autoHeight) {
            this.$element.addClass('ms-slide-auto-height');
        }
        this.sleep(true);
    };
    p.destroy = function () {
        if (this.hasLayers) {
            this.layerController.destroy();
            this.layerController = null;
        }
        this.$element.remove();
        this.$element = null;
    };
    p.prepareToSelect = function () {
        if (this.pselected || this.selected) {
            return;
        }
        this.pselected = true;
        if (this.link || this.video) {
            this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this);
            this.view.addEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this);
            this.view.addEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this);
            this.linkdis = false;
            this.swipeMoved = false;
        }
        this.loadImages();
        if (this.hasLayers) {
            this.layerController.prepareToShow();
        }
        if (this.ready) {
            if (this.bgvideo && this.bgvideo.readyState >= 3) {
                this.bgvideo.play();
            }
            if (this.hasLayers && this.slider.options.instantStartLayers) {
                this.layerController.showLayers();
            }
        }
        if (this.moz) {
            this.$element.css('margin-top', '');
        }
    };
    p.select = function () {
        if (this.selected) {
            return;
        }
        this.selected = true;
        this.pselected = false;
        this.$element.addClass('ms-sl-selected');
        if (this.hasLayers) {
            if (this.slider.options.autoHeight) {
                this.layerController.updateHeight();
            }
            if (!this.slider.options.instantStartLayers) {
                this.layerController.showLayers();
            }
        }
        if (this.ready && this.bgvideo && this.bgvideo.readyState >= 3) {
            this.bgvideo.play();
        }
        if (this.videoAutoPlay) {
            this.videodis = false;
            this.vpbtn.trigger('click');
        }
    };
    p.unselect = function () {
        this.pselected = false;
        if (this.moz) {
            this.$element.css('margin-top', '0.1px');
        }
        if (this.link || this.video) {
            this.view.removeEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this);
            this.view.removeEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this);
            this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this);
        }
        if (this.bgvideo) {
            this.bgvideo.pause();
            if (!this.autoPauseBgVid && this.vinit)
                this.bgvideo.currentTime = 0;
        }
        if (this.hasLayers) {
            this.layerController.hideLayers();
        }
        if (!this.selected) {
            return;
        }
        this.selected = false;
        this.$element.removeClass('ms-sl-selected');
        if (this.video && this.vplayed) {
            this.__closeVideo();
            this.roc = false;
        }
    };
    p.sleep = function (force) {
        if (this.isSleeping && !force) {
            return;
        }
        this.isSleeping = true;
        if (this.autoAppend) {
            this.$element.detach();
        }
        if (this.hasLayers) {
            this.layerController.onSlideSleep();
        }
    };
    p.wakeup = function () {
        if (!this.isSleeping) {
            return;
        }
        this.isSleeping = false;
        if (this.autoAppend) {
            this.view.$slideCont.append(this.$element);
        }
        if (this.moz) {
            this.$element.css('margin-top', '0.1px');
        }
        this.setupBG();
        if (this.hasBG) {
            this.bgAligner.align();
        }
        if (this.hasLayers) {
            this.layerController.onSlideWakeup();
        }
    };
})(window, document, jQuery);;
(function ($) {
    "use strict";
    var SliderViewList = {};
    window.MSSlideController = function (slider) {
        this._delayProgress = 0;
        this._timer = new averta.Timer(100);
        this._timer.onTimer = this.onTimer;
        this._timer.refrence = this;
        this.currentSlide = null;
        this.slider = slider;
        this.so = slider.options;
        averta.EventDispatcher.call(this);
    };
    MSSlideController.registerView = function (name, _class) {
        if (name in SliderViewList) {
            throw new Error(name + ', is already registered.');
            return;
        }
        SliderViewList[name] = _class;
    };
    MSSlideController.SliderControlList = {};
    MSSlideController.registerControl = function (name, _class) {
        if (name in MSSlideController.SliderControlList) {
            throw new Error(name + ', is already registered.');
            return;
        }
        MSSlideController.SliderControlList[name] = _class;
    };
    var p = MSSlideController.prototype;
    p.setupView = function () {
        var that = this;
        this.resize_listener = function () {
            that.__resize();
        };
        var viewOptions = {
            spacing: this.so.space,
            mouseSwipe: this.so.mouse,
            loop: this.so.loop,
            autoHeight: this.so.autoHeight,
            swipe: this.so.swipe,
            speed: this.so.speed,
            dir: this.so.dir,
            viewNum: this.so.inView,
            critMargin: this.so.critMargin
        };
        if (this.so.viewOptions)
            $.extend(viewOptions, this.so.viewOptions);
        if (this.so.autoHeight) this.so.heightLimit = false;
        var viewClass = SliderViewList[this.slider.options.view] || MSBasicView;
        if (viewClass._3dreq && (!window._css3d || $.browser.msie)) viewClass = viewClass._fallback || MSBasicView;
        this.view = new viewClass(viewOptions);
        if (this.so.overPause) {
            var that = this;
            this.slider.$element.mouseenter(function () {
                that.is_over = true;
                that._stopTimer();
            }).mouseleave(function () {
                that.is_over = false;
                that._startTimer();
            });
        }
    };
    p.onChangeStart = function () {
        this.change_started = true;
        if (this.currentSlide) this.currentSlide.unselect();
        this.currentSlide = this.view.currentSlide;
        this.currentSlide.prepareToSelect();
        if (this.so.endPause && this.currentSlide.index === this.slider.slides.length - 1) {
            this.pause();
            this.skipTimer();
        }
        if (this.so.autoHeight) {
            this.slider.setHeight(this.currentSlide.getHeight());
        }
        if (this.so.deepLink) {
            this.__updateWindowHash();
        }
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START));
    };
    p.onChangeEnd = function () {
        this.change_started = false;
        this._startTimer();
        this.currentSlide.select();
        if (this.so.preload > 1) {
            var loc, i, l = this.so.preload - 1,
                slide;
            for (i = 1; i <= l; ++i) {
                loc = this.view.index + i;
                if (loc >= this.view.slideList.length) {
                    if (this.so.loop) {
                        loc = loc - this.view.slideList.length;
                    } else {
                        i = l;
                        continue;
                    }
                }
                slide = this.view.slideList[loc];
                if (slide) {
                    slide.loadImages();
                }
            }
            if (l > this.view.slideList.length / 2)
                l = Math.floor(this.view.slideList.length / 2);
            for (i = 1; i <= l; ++i) {
                loc = this.view.index - i;
                if (loc < 0) {
                    if (this.so.loop) {
                        loc = this.view.slideList.length + loc;
                    } else {
                        i = l;
                        continue;
                    }
                }
                slide = this.view.slideList[loc];
                if (slide) {
                    slide.loadImages();
                }
            }
        }
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END));
    };
    p.onSwipeStart = function () {
        this.skipTimer();
    };
    p.skipTimer = function () {
        this._timer.reset();
        this._delayProgress = 0;
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
    };
    p.onTimer = function (time) {
        if (this._timer.getTime() >= this.view.currentSlide.delay * 1000) {
            this.skipTimer();
            this.view.next();
            this.hideCalled = false;
        }
        this._delayProgress = this._timer.getTime() / (this.view.currentSlide.delay * 10);
        if (this.so.hideLayers && !this.hideCalled && this.view.currentSlide.delay * 1000 - this._timer.getTime() <= 300) {
            var currentSlide = this.view.currentSlide;
            if (currentSlide.hasLayers) {
                currentSlide.layerController.animHideLayers();
            }
            this.hideCalled = true;
        }
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING));
    };
    p._stopTimer = function () {
        if (this._timer)
            this._timer.stop();
    };
    p._startTimer = function () {
        if (!this.paused && !this.is_over && this.currentSlide && this.currentSlide.ready && !this.change_started)
            this._timer.start();
    };
    p.__appendSlides = function () {
        var slide, loc, i = 0,
            l = this.view.slideList.length - 1;
        for (i; i < l; ++i) {
            slide = this.view.slideList[i];
            if (!slide.detached) {
                slide.$element.detach();
                slide.detached = true;
            }
        }
        this.view.appendSlide(this.view.slideList[this.view.index]);
        l = 3;
        for (i = 1; i <= l; ++i) {
            loc = this.view.index + i;
            if (loc >= this.view.slideList.length) {
                if (this.so.loop) {
                    loc = loc - this.view.slideList.length;
                } else {
                    i = l;
                    continue;
                }
            }
            slide = this.view.slideList[loc];
            slide.detached = false;
            this.view.appendSlide(slide);
        }
        if (l > this.view.slideList.length / 2)
            l = Math.floor(this.view.slideList.length / 2);
        for (i = 1; i <= l; ++i) {
            loc = this.view.index - i;
            if (loc < 0) {
                if (this.so.loop) {
                    loc = this.view.slideList.length + loc;
                } else {
                    i = l;
                    continue;
                }
            }
            slide = this.view.slideList[loc];
            slide.detached = false;
            this.view.appendSlide(slide);
        }
    }
    p.__resize = function (hard) {
        if (!this.created) return;
        this.width = this.slider.$element[0].clientWidth || this.so.width;
        if (!this.so.fullwidth) {
            this.width = Math.min(this.width, this.so.width);
        }
        if (this.so.fullheight) {
            this.so.heightLimit = false;
            this.so.autoHeight = false;
            this.height = this.slider.$element[0].clientHeight;
        } else {
            this.height = this.width / this.slider.aspect;
        }
        if (this.so.autoHeight) {
            this.currentSlide.setSize(this.width, null, hard);
            this.view.setSize(this.width, this.currentSlide.getHeight(), hard);
        } else {
            this.view.setSize(this.width, (Math.max(this.so.minHeight, (this.so.heightLimit ? Math.min(this.height, this.so.height) : this.height))), hard);
        }
        if (this.slider.$controlsCont) {
            if (this.so.centerControls && this.so.fullwidth) {
                this.view.$element.css('left', Math.min(0, -(this.slider.$element[0].clientWidth - this.so.width) / 2) + 'px');
            }
        }
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE));
    };
    p.__dispatchInit = function () {
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT));
    };
    p.__updateWindowHash = function () {
        var hash = window.location.hash,
            dl = this.so.deepLink,
            dlt = this.so.deepLinkType,
            eq = dlt === 'path' ? '\/' : '=',
            sep = dlt === 'path' ? '\/' : '&',
            sliderHash = dl + eq + (this.view.index + 1),
            regTest = new RegExp(dl + eq + '[0-9]+', 'g');
        if (hash === '') {
            window.location.hash = sep + sliderHash;
        } else if (regTest.test(hash)) {
            window.location.hash = hash.replace(regTest, sliderHash);
        } else {
            window.location.hash = hash + sep + sliderHash;
        }
    };
    p.__curentSlideInHash = function () {
        var hash = window.location.hash,
            dl = this.so.deepLink,
            dlt = this.so.deepLinkType,
            eq = dlt === 'path' ? '\/' : '=',
            regTest = new RegExp(dl + eq + '[0-9]+', 'g');
        if (regTest.test(hash)) {
            var index = Number(hash.match(regTest)[0].match(/[0-9]+/g).pop());
            if (!isNaN(index)) {
                return index - 1;
            }
        }
        return -1;
    };
    p.__onHashChanged = function () {
        var index = this.__curentSlideInHash();
        if (index !== -1) {
            this.gotoSlide(index);
        }
    };
    p.__findLayerById = function (layerId) {
        if (!this.currentSlide) {
            return null;
        }
        var layer;
        if (this.currentSlide.layerController) {
            layer = this.currentSlide.layerController.getLayerById(layerId);
        }
        if (!layer && this.slider.overlayLayers) {
            return this.slider.overlayLayers.layerController.getLayerById(layerId);
        }
        return layer;
    };
    p.setup = function () {
        this.created = true;
        this.paused = !this.so.autoplay;
        this.view.addEventListener(MSViewEvents.CHANGE_START, this.onChangeStart, this);
        this.view.addEventListener(MSViewEvents.CHANGE_END, this.onChangeEnd, this);
        this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this);
        this.currentSlide = this.view.slideList[this.so.start - 1];
        this.__resize();
        var slideInHash = this.__curentSlideInHash(),
            startSlide = slideInHash !== -1 ? slideInHash : this.so.start - 1;
        this.view.create(startSlide);
        if (this.so.preload === 0) {
            this.view.slideList[0].loadImages();
        }
        this.scroller = this.view.controller;
        if (this.so.wheel) {
            var that = this;
            var last_time = new Date().getTime();
            this.wheellistener = function (event) {
                var e = window.event || event.orginalEvent || event;
                e.preventDefault();
                var current_time = new Date().getTime();
                if (current_time - last_time < 400) return;
                last_time = current_time;
                var delta = Math.abs(e.detail || e.wheelDelta);
                if ($.browser.mozilla) {
                    delta *= 100;
                }
                var scrollThreshold = 15;
                if (e.detail < 0 || e.wheelDelta > 0) {
                    if (delta >= scrollThreshold) {
                        that.previous(true);
                    }
                } else {
                    if (delta >= scrollThreshold) {
                        that.next(true);
                    }
                }
                return false;
            };
            if ($.browser.mozilla) this.slider.$element[0].addEventListener('DOMMouseScroll', this.wheellistener);
            else this.slider.$element.bind('mousewheel', this.wheellistener);
        }
        if (this.slider.$element[0].clientWidth === 0)
            this.slider.init_safemode = true;
        this.__resize();
        var that = this;
        if (this.so.deepLink) {
            $(window).on('hashchange', function () {
                that.__onHashChanged();
            });
        }
    };
    p.index = function () {
        return this.view.index;
    };
    p.count = function () {
        return this.view.slidesCount;
    };
    p.next = function (checkLoop) {
        this.skipTimer();
        this.view.next(checkLoop);
    };
    p.previous = function (checkLoop) {
        this.skipTimer();
        this.view.previous(checkLoop);
    };
    p.gotoSlide = function (index) {
        index = Math.min(index, this.count() - 1);
        this.skipTimer();
        this.view.gotoSlide(index);
    };
    p.destroy = function (reset) {
        this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY));
        this.slider.destroy(reset);
    };
    p._destroy = function () {
        this._timer.reset();
        this._timer = null;
        $(window).unbind('resize', this.resize_listener);
        this.view.destroy();
        this.view = null;
        if (this.so.wheel) {
            if ($.browser.mozilla) this.slider.$element[0].removeEventListener('DOMMouseScroll', this.wheellistener);
            else this.slider.$element.unbind('mousewheel', this.wheellistener);
            this.wheellistener = null;
        }
        this.so = null;
    };
    p.runAction = function (action) {
        var actionParams = [];
        if (action.indexOf('(') !== -1) {
            var temp = action.slice(0, action.indexOf('('));
            actionParams = action.slice(action.indexOf('(') + 1, -1).replace(/\"|\'|\s/g, '').split(',');
            action = temp;
        }
        if (action in this) {
            this[action].apply(this, actionParams);
        } else if (console) {
            console.log('Master Slider Error: Action "' + action + '" not found.');
        }
    };
    p.update = function (hard) {
        if (this.slider.init_safemode && hard)
            this.slider.init_safemode = false;
        this.__resize(hard);
        if (hard) {
            this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE));
        }
    };
    p.locate = function () {
        this.__resize();
    };
    p.resume = function () {
        if (!this.paused) return;
        this.paused = false;
        this._startTimer();
    };
    p.pause = function () {
        if (this.paused) return;
        this.paused = true;
        this._stopTimer();
    };
    p.currentTime = function () {
        return this._delayProgress;
    };
    p.showLayer = function (layerId, delay) {
        var layer = this.__findLayerById(layerId);
        if (layer) {
            if (!delay) {
                layer.start();
            } else {
                clearTimeout(layer.actionTimeout);
                layer.actionTimeout = setTimeout(this.showLayer, delay, layerId, 0);
            }
        }
    };
    p.hideLayer = function (layerId, delay) {
        var layer = this.__findLayerById(layerId);
        if (layer) {
            if (!delay) {
                layer.hide();
            } else {
                clearTimeout(layer.actionTimeout);
                layer.actionTimeout = setTimeout(this.hideLayer, delay, layerId, 0);
            }
        }
    }
    p.toggleLayer = function (layerId, delay) {
        var layer = this.__findLayerById(layerId);
        if (layer) {
            if (!delay) {
                layer.isShowing ? layer.hide() : layer.start();
            } else {
                clearTimeout(layer.actionTimeout);
                layer.actionTimeout = setTimeout(this.toggleLayer, delay, layerId, 0);
            }
        }
    }
    p.showLayers = function (layerIds, delay) {
        var self = this;
        $.each(layerIds.replace(/\s+/g, '').split('|'), function (index, layerId) {
            self.showLayer(layerId, delay);
        });
    };
    p.hideLayers = function (layerIds, delay) {
        var self = this;
        $.each(layerIds.replace(/\s+/g, '').split('|'), function (index, layerId) {
            self.hideLayer(layerId, delay);
        });
    };
    p.toggleLayers = function (layerIds, delay) {
        var self = this;
        $.each(layerIds.replace(/\s+/g, '').split('|'), function (index, layerId) {
            self.toggleLayer(layerId, delay);
        });
    };
    averta.EventDispatcher.extend(p);
})(jQuery);;
(function ($) {
    "use strict";
    var LayerTypes = {
        'image': MSImageLayerElement,
        'text': MSLayerElement,
        'video': MSVideoLayerElement,
        'hotspot': MSHotspotLayer,
        'button': MSButtonLayer
    };
    window.MasterSlider = function () {
        this.options = {
            forceInit: true,
            autoplay: false,
            loop: false,
            mouse: true,
            swipe: true,
            grabCursor: true,
            space: 0,
            fillMode: 'fill',
            start: 1,
            view: 'basic',
            width: 300,
            height: 150,
            inView: 15,
            critMargin: 1,
            mobileBGVideo: false,
            heightLimit: true,
            smoothHeight: true,
            autoHeight: false,
            minHeight: -1,
            fullwidth: false,
            fullheight: false,
            autofill: false,
            layersMode: 'center',
            hideLayers: false,
            endPause: false,
            centerControls: true,
            overPause: true,
            shuffle: false,
            speed: 17,
            dir: 'h',
            preload: 0,
            wheel: false,
            layout: 'boxed',
            autofillTarget: null,
            fullscreenMargin: 0,
            instantStartLayers: false,
            parallaxMode: 'mouse',
            rtl: false,
            deepLink: null,
            deepLinkType: 'path',
            disablePlugins: []
        };
        this.slides = [];
        this.activePlugins = [];
        this.$element = null;
        this.lastMargin = 0;
        this.leftSpace = 0;
        this.topSpace = 0;
        this.rightSpace = 0;
        this.bottomSpace = 0;
        this._holdOn = 0;
        var that = this;
        this.resize_listener = function () {
            that._resize();
        };
        $(window).bind('resize', this.resize_listener);
    };
    MasterSlider.author = 'Averta Ltd. (www.averta.net)';
    MasterSlider.version = '2.51.2';
    MasterSlider.releaseDate = 'Jun 2017';
    MasterSlider._plugins = []
    var MS = MasterSlider;
    MS.registerPlugin = function (plugin) {
        if (MS._plugins.indexOf(plugin) === -1) {
            MS._plugins.push(plugin);
        }
    };
    var p = MasterSlider.prototype;
    p.__setupSlides = function () {
        var that = this,
            new_slide, ind = 0;
        this.$element.children('.ms-slide').each(function (index) {
            var $slide_ele = $(this);
            new_slide = new MSSlide();
            new_slide.$element = $slide_ele;
            new_slide.slider = that;
            new_slide.delay = $slide_ele.data('delay') !== undefined ? $slide_ele.data('delay') : 3;
            new_slide.fillMode = $slide_ele.data('fill-mode') !== undefined ? $slide_ele.data('fill-mode') : that.options.fillMode;
            new_slide.index = ind++;
            new_slide.id = $slide_ele.data('id');
            var slide_img = $slide_ele.children('img:not(.ms-layer)');
            if (slide_img.length > 0) {
                new_slide.setBG(slide_img[0]);
            }
            var slide_video = $slide_ele.children('video');
            if (slide_video.length > 0) new_slide.setBGVideo(slide_video);
            if (that.controls) {
                for (var i = 0, l = that.controls.length; i < l; ++i)
                    that.controls[i].slideAction(new_slide);
            }
            var slide_link = $slide_ele.children('a').each(function (index) {
                var $this = $(this);
                if (this.getAttribute('data-type') === 'video') {
                    new_slide.video = this.getAttribute('href');
                    new_slide.videoAutoPlay = $this.data('autoplay');
                    $this.remove();
                } else if (!$this.hasClass('ms-layer')) {
                    new_slide.link = $(this);
                }
            });
            that.__createSlideLayers(new_slide, $slide_ele.find('.ms-layer'));
            that.slides.push(new_slide);
            that.slideController.view.addSlide(new_slide);
        });
    };
    p._setupOverlayLayers = function () {
        var self = this,
            $ollayers = this.$element.children('.ms-overlay-layers').eq(0);
        if (!$ollayers.length) {
            return;
        }
        var overlayLayers = new MSOverlayLayers(this);
        overlayLayers.$element = $ollayers;
        self.__createSlideLayers(overlayLayers, $ollayers.find('.ms-layer'));
        this.view.$element.prepend($ollayers);
        this.overlayLayers = overlayLayers;
        overlayLayers.create();
    };
    p.__createSlideLayers = function (slide, layers) {
        if (layers.length == 0) return;
        slide.setupLayerController();
        layers.each(function (index, domEle) {
            var $layer_element = $(this),
                $parent_ele;
            if (domEle.nodeName === 'A' && $layer_element.find('>img').data('type') === 'image') {
                $parent_ele = $(this);
                $layer_element = $parent_ele.find('img');
            }
            var layer = new(LayerTypes[$layer_element.data('type') || 'text'])();
            layer.$element = $layer_element;
            layer.link = $parent_ele;
            layer.id = layer.$element.data('id');
            layer.waitForAction = layer.$element.data('wait');
            layer.masked = layer.$element.data('masked');
            layer.maskWidth = layer.$element.data('mask-width');
            layer.maskHeight = layer.$element.data('mask-height');
            var eff_parameters = {},
                end_eff_parameters = {};
            if ($layer_element.data('effect') !== undefined) eff_parameters.name = $layer_element.data('effect');
            if ($layer_element.data('ease') !== undefined) eff_parameters.ease = $layer_element.data('ease');
            if ($layer_element.data('duration') !== undefined) eff_parameters.duration = $layer_element.data('duration');
            if ($layer_element.data('delay') !== undefined) eff_parameters.delay = $layer_element.data('delay');
            if ($layer_element.data('hide-effect')) end_eff_parameters.name = $layer_element.data('hide-effect');
            if ($layer_element.data('hide-ease')) end_eff_parameters.ease = $layer_element.data('hide-ease');
            if ($layer_element.data('hide-duration') !== undefined) end_eff_parameters.duration = $layer_element.data('hide-duration');
            if ($layer_element.data('hide-time') !== undefined) end_eff_parameters.time = $layer_element.data('hide-time');
            layer.setStartAnim(eff_parameters);
            layer.setEndAnim(end_eff_parameters);
            slide.layerController.addLayer(layer);
        });
    };
    p._removeLoading = function () {
        $(window).unbind('resize', this.resize_listener);
        this.$element.removeClass('before-init').css('visibility', 'visible').css('height', '').css('opacity', 0);
        CTween.fadeIn(this.$element);
        this.$loading.remove();
        if (this.slideController)
            this.slideController.__resize();
    };
    p._resize = function (e) {
        if (this.$loading) {
            var h = this.$loading[0].clientWidth / this.aspect;
            h = this.options.heightLimit ? Math.min(h, this.options.height) : h;
            this.$loading.height(h);
            this.$element.height(h);
        }
    };
    p._shuffleSlides = function () {
        var slides = this.$element.children('.ms-slide'),
            r;
        for (var i = 0, l = slides.length; i < l; ++i) {
            r = Math.floor(Math.random() * (l - 1));
            if (i != r) {
                this.$element[0].insertBefore(slides[i], slides[r]);
                slides = this.$element.children('.ms-slide');
            }
        }
    };
    p._setupSliderLayout = function () {
        this._updateSideMargins();
        this.lastMargin = this.leftSpace;
        var lo = this.options.layout;
        if (lo !== 'boxed' && lo !== 'partialview') {
            this.options.fullwidth = true;
        }
        if (lo === 'fullscreen' || lo === 'autofill') {
            this.options.fullheight = true;
            if (lo === 'autofill') {
                this.$autofillTarget = $(this.options.autofillTarget);
                if (this.$autofillTarget.length === 0) {
                    this.$autofillTarget = this.$element.parent();
                }
            }
        }
        if (lo === 'partialview') {
            this.$element.addClass('ms-layout-partialview');
        }
        if (lo === 'fullscreen' || lo === 'fullwidth' || lo === 'autofill') {
            $(window).bind('resize', {
                that: this
            }, this._updateLayout);
            this._updateLayout();
        }
        $(window).bind('resize', this.slideController.resize_listener);
    };
    p._updateLayout = function (event) {
        var that = event ? event.data.that : this,
            lo = that.options.layout,
            $element = that.$element,
            $win = $(window);
        if (lo === 'fullscreen') {
            document.body.style.overflow = 'hidden';
            $element.height($win.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace);
            document.body.style.overflow = '';
        } else if (lo === 'autofill') {
            $element.height(that.$autofillTarget.height() - that.options.fullscreenMargin - that.topSpace - that.bottomSpace).width(that.$autofillTarget.width() - that.leftSpace - that.rightSpace);
            return;
        }
        $element.width($win.width() - that.leftSpace - that.rightSpace);
        var margin = -$element.offset().left + that.leftSpace + that.lastMargin;
        $element.css('margin-left', margin);
        that.lastMargin = margin;
    };
    p._init = function () {
        if (this._holdOn > 0 || !this._docReady) {
            return;
        }
        this.initialized = true;
        if (this.options.preload !== 'all') {
            this._removeLoading();
        }
        if (this.options.shuffle) this._shuffleSlides();
        MSLayerEffects.setup();
        this.slideController.setupView();
        this.view = this.slideController.view;
        this.$controlsCont = $('<div></div>').addClass('ms-inner-controls-cont');
        if (this.options.centerControls) {
            this.$controlsCont.css('max-width', this.options.width + 'px');
        }
        this.$controlsCont.prepend(this.view.$element);
        this.$msContainer = $('<div></div>').addClass('ms-container').prependTo(this.$element).append(this.$controlsCont);
        if (this.controls) {
            for (var i = 0, l = this.controls.length; i < l; ++i) {
                this.controls[i].setup();
            }
        }
        this._setupSliderLayout();
        this.__setupSlides();
        this.slideController.setup();
        this._setupOverlayLayers();
        if (this.controls) {
            for (i = 0, l = this.controls.length; i < l; ++i)
                this.controls[i].create();
        }
        if (this.options.autoHeight) {
            this.slideController.view.$element.height(this.slideController.currentSlide.getHeight());
        }
        if (this.options.swipe && !window._touch && this.options.grabCursor && this.options.mouse) {
            var $view = this.view.$element;
            $view.mousedown(function () {
                $view.removeClass('ms-grab-cursor');
                $view.addClass('ms-grabbing-cursor');
                if ($.browser.msie && window.ms_grabbing_curosr) {
                    $view[0].style.cursor = 'url(' + window.ms_grabbing_curosr + '), move';
                }
            }).addClass('ms-grab-cursor');
            $(document).mouseup(function () {
                $view.removeClass('ms-grabbing-cursor');
                $view.addClass('ms-grab-cursor');
                if ($.browser.msie && window.ms_grab_curosr) {
                    $view[0].style.cursor = 'url(' + window.ms_grab_curosr + '), move';
                }
            });
        }
        this.slideController.__dispatchInit();
    };
    p.setHeight = function (value) {
        if (this.options.smoothHeight) {
            if (this.htween) {
                if (this.htween.reset) this.htween.reset();
                else this.htween.stop(true);
            }
            this.htween = CTween.animate(this.slideController.view.$element, 500, {
                height: value
            }, {
                ease: 'easeOutQuart'
            });
        } else
            this.slideController.view.$element.height(value);
    };
    p.reserveSpace = function (side, space) {
        var sideSpace = side + 'Space',
            pos = this[sideSpace];
        this[sideSpace] += space;
        this._updateSideMargins();
        return pos;
    };
    p._updateSideMargins = function () {
        this.$element.css('margin', this.topSpace + 'px ' + this.rightSpace + 'px ' + this.bottomSpace + 'px ' + this.leftSpace + 'px');
    }
    p._realignControls = function () {
        this.rightSpace = this.leftSpace = this.topSpace = this.bottomSpace = 0;
        this._updateSideMargins();
        this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE));
    };
    p.control = function (control, options) {
        if (!(control in MSSlideController.SliderControlList)) return;
        if (!this.controls) this.controls = [];
        var ins = new MSSlideController.SliderControlList[control](options);
        ins.slider = this;
        this.controls.push(ins);
        return this;
    };
    p.holdOn = function () {
        this._holdOn++;
    };
    p.release = function () {
        this._holdOn--;
        this._init();
    };
    p.setup = function (target, options) {
        if (typeof target === 'string') {
            this.$element = $('#' + target);
        } else {
            this.$element = target.eq(0);
        }
        this.setupMarkup = this.$element.html();
        if (this.$element.length === 0) {
            return;
        }
        this.$element.addClass('master-slider').addClass('before-init');
        if ($.browser.msie) {
            this.$element.addClass('ms-ie').addClass('ms-ie' + $.browser.version.slice(0, $.browser.version.indexOf('.')));
        } else if ($.browser.webkit) {
            this.$element.addClass('ms-wk');
        } else if ($.browser.mozilla) {
            this.$element.addClass('ms-moz');
        }
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1;
        if (isAndroid) {
            this.$element.addClass('ms-android');
        }
        var that = this;
        $.extend(this.options, options);
        this.aspect = this.options.width / this.options.height;
        this.$loading = $('<div></div>').addClass('ms-loading-container').insertBefore(this.$element).append($('<div></div>').addClass('ms-loading'));
        this.$loading.parent().css('position', 'relative');
        if (this.options.autofill) {
            this.options.fullwidth = true;
            this.options.fullheight = true;
        }
        if (this.options.fullheight) {
            this.$element.addClass('ms-fullheight');
        }
        this._resize();
        this.slideController = new MSSlideController(this);
        this.api = this.slideController;
        for (var i = 0, l = MS._plugins.length; i !== l; i++) {
            var plugin = MS._plugins[i];
            if (this.options.disablePlugins.indexOf(plugin.name) === -1) {
                this.activePlugins.push(new plugin(this));
            }
        }
        if (this.options.forceInit) {
            MasterSlider.addJQReadyErrorCheck(this);
        }
        $(document).ready(function () {
            if (!that.initialized) {
                that._docReady = true;
                that._init();
            }
        });
        return this;
    };
    p.destroy = function (insertMarkup) {
        for (var i = 0, l = this.activePlugins.length; i !== l; i++) {
            this.activePlugins[i].destroy();
        }
        if (this.controls) {
            for (i = 0, l = this.controls.length; i !== l; i++)
                this.controls[i].destroy();
        }
        if (this.slideController) this.slideController._destroy();
        if (this.$loading) this.$loading.remove();
        if (insertMarkup) {
            this.$element.html(this.setupMarkup).css('visibility', 'hidden');
        } else {
            this.$element.remove();
        }
        var lo = this.options.layout;
        if (lo === 'fullscreen' || lo === 'fullwidth') {
            $(window).unbind('resize', this._updateLayout);
        }
        this.view = null;
        this.slides = null;
        this.options = null;
        this.slideController = null;
        this.api = null;
        this.resize_listener = null;
        this.activePlugins = null;
    };
})(jQuery);
(function ($, window, document, undefined) {
    var pluginName = "masterslider",
        defaults = {
            controls: {}
        };

    function MasterSliderPlugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    $.extend(MasterSliderPlugin.prototype, {
        init: function () {
            var self = this;
            this._slider = new MasterSlider();
            for (var control in this.settings.controls) {
                this._slider.control(control, this.settings.controls[control]);
            }
            this._slider.setup(this.$element, this.settings);
            var _superDispatch = this._slider.api.dispatchEvent;
            this._slider.api.dispatchEvent = function (event) {
                self.$element.trigger(event.type);
                _superDispatch.call(this, event);
            };
        },
        api: function () {
            return this._slider.api;
        },
        slider: function () {
            return this._slider;
        }
    });
    $.fn[pluginName] = function (options) {
        var args = arguments,
            plugin = 'plugin_' + pluginName;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, plugin)) {
                    $.data(this, plugin, new MasterSliderPlugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function () {
                var instance = $.data(this, plugin);
                if (instance instanceof MasterSliderPlugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                if (instance instanceof MasterSliderPlugin && typeof instance._slider.api[options] === 'function') {
                    returns = instance._slider.api[options].apply(instance._slider.api, Array.prototype.slice.call(args, 1));
                }
                if (options === 'destroy') {
                    $.data(this, plugin, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };
})(jQuery, window, document);;
(function ($, window, document, undefined) {
    "use strict";
    var sliderInstances = [];
    MasterSlider.addJQReadyErrorCheck = function (slider) {
        sliderInstances.push(slider);
    };
    var _ready = $.fn.ready,
        _onerror = window.onerror;
    $.fn.ready = function () {
        window.onerror = function () {
            if (sliderInstances.length !== 0) {
                for (var i = 0, l = sliderInstances.length; i !== l; i++) {
                    var slider = sliderInstances[i];
                    if (!slider.initialized) {
                        slider._docReady = true;
                        slider._init();
                    }
                }
            }
            if (_onerror) {
                return _onerror.apply(this, arguments);
            }
            return false;
        }
        return _ready.apply(this, arguments);
    };
})(jQuery, window, document);
window.MSViewEvents = function (type, data) {
    this.type = type;
    this.data = data;
};
MSViewEvents.SWIPE_START = 'swipeStart';
MSViewEvents.SWIPE_END = 'swipeEnd';
MSViewEvents.SWIPE_MOVE = 'swipeMove';
MSViewEvents.SWIPE_CANCEL = 'swipeCancel';
MSViewEvents.SCROLL = 'scroll';
MSViewEvents.CHANGE_START = 'slideChangeStart';
MSViewEvents.CHANGE_END = 'slideChangeEnd';;
(function ($) {
    "use strict";
    window.MSBasicView = function (options) {
        this.options = {
            loop: false,
            dir: 'h',
            autoHeight: false,
            spacing: 5,
            mouseSwipe: true,
            swipe: true,
            speed: 17,
            minSlideSpeed: 2,
            viewNum: 20,
            critMargin: 1
        };
        $.extend(this.options, options);
        this.dir = this.options.dir;
        this.loop = this.options.loop;
        this.spacing = this.options.spacing;
        this.__width = 0;
        this.__height = 0;
        this.__cssProb = this.dir === 'h' ? 'left' : 'top';
        this.__offset = this.dir === 'h' ? 'offsetLeft' : 'offsetTop';
        this.__dimension = this.dir === 'h' ? '__width' : '__height';
        this.__translate_end = window._css3d ? ' translateZ(0px)' : '';
        this.$slideCont = $('<div></div>').addClass('ms-slide-container');
        this.$element = $('<div></div>').addClass('ms-view').addClass('ms-basic-view').append(this.$slideCont);
        this.currentSlide = null;
        this.index = -1;
        this.slidesCount = 0;
        this.slides = [];
        this.slideList = [];
        this.viewSlidesList = [];
        this.css3 = window._cssanim;
        this.start_buffer = 0;
        this.firstslide_snap = 0;
        this.slideChanged = false;
        this.controller = new Controller(0, 0, {
            snapping: true,
            snapsize: 100,
            paging: true,
            snappingMinSpeed: this.options.minSlideSpeed,
            friction: (100 - this.options.speed * 0.5) / 100,
            endless: this.loop
        });
        this.controller.renderCallback(this.dir === 'h' ? this._horizUpdate : this._vertiUpdate, this);
        this.controller.snappingCallback(this.__snapUpdate, this);
        this.controller.snapCompleteCallback(this.__snapCompelet, this);
        averta.EventDispatcher.call(this);
    };
    var p = MSBasicView.prototype;
    p.__snapCompelet = function (snap, type) {
        if (!this.slideChanged) {
            return;
        }
        this.slideChanged = false;
        this.__locateSlides();
        this.start_buffer = 0;
        this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END));
    };
    p.__snapUpdate = function (controller, snap, change) {
        if (this.loop) {
            var target_index = this.index + change;
            this.updateLoop(target_index);
            if (target_index >= this.slidesCount) target_index = target_index - this.slidesCount;
            if (target_index < 0) target_index = this.slidesCount + target_index;
            this.index = target_index;
        } else {
            if (snap < 0 || snap >= this.slidesCount) return
            this.index = snap;
        }
        this._checkCritMargins();
        if ($.browser.mozilla) {
            this.slideList[this.index].$element[0].style.marginTop = '0.1px';
            if (this.currentSlide) {
                this.currentSlide.$element[0].style.marginTop = '';
            }
        }
        var new_slide = this.slideList[this.index];
        if (new_slide === this.currentSlide) return;
        this.currentSlide = new_slide;
        if (this.autoUpdateZIndex) {
            this.__updateSlidesZindex();
        }
        this.slideChanged = true;
        this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START));
    };
    p._checkCritMargins = function () {
        if (this.normalMode) return;
        var hlf = Math.floor(this.options.viewNum / 2),
            inView = this.viewSlidesList.indexOf(this.slideList[this.index]),
            size = (this[this.__dimension] + this.spacing),
            cm = this.options.critMargin;
        if (this.loop) {
            if (inView <= cm || inView >= this.viewSlidesList.length - cm) {
                size *= (inView - hlf);
                this.__locateSlides(false, size + this.start_buffer);
                this.start_buffer += size;
            }
            return;
        }
        if ((inView < cm && this.index >= cm) || (inView >= this.viewSlidesList.length - cm && this.index < this.slidesCount - cm)) {
            this.__locateSlides(false);
        }
    };
    p._vertiUpdate = function (controller, value) {
        this.__contPos = value;
        this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL));
        if (this.css3) {
            this.$slideCont[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -value + 'px)' + this.__translate_end;
            return;
        }
        this.$slideCont[0].style.top = -value + 'px';
    };
    p._horizUpdate = function (controller, value) {
        this.__contPos = value;
        this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL));
        if (this.css3) {
            this.$slideCont[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + -value + 'px)' + this.__translate_end;
            return;
        }
        this.$slideCont[0].style.left = -value + 'px';
    };
    p.__updateViewList = function () {
        if (this.normalMode) {
            this.viewSlidesList = this.slides;
            return;
        }
        var temp = this.viewSlidesList.slice();
        this.viewSlidesList = [];
        var i = 0,
            hlf = Math.floor(this.options.viewNum / 2),
            l;
        if (this.loop) {
            for (; i !== this.options.viewNum; i++)
                this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
        } else {
            for (i = 0; i !== hlf && this.index - i !== -1; i++)
                this.viewSlidesList.unshift(this.slideList[this.index - i]);
            for (i = 1; i !== hlf && this.index + i !== this.slidesCount; i++)
                this.viewSlidesList.push(this.slideList[this.index + i]);
        }
        for (i = 0, l = temp.length; i !== l; i++)
            if (this.viewSlidesList.indexOf(temp[i]) === -1)
                temp[i].sleep();
        temp = null;
        if (this.currentSlide) {
            this.__updateSlidesZindex();
        }
    };
    p.__locateSlides = function (move, start) {
        this.__updateViewList();
        start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing) : start || 0;
        var l = this.viewSlidesList.length,
            slide;
        for (var i = 0; i !== l; i++) {
            var pos = start + i * (this[this.__dimension] + this.spacing);
            slide = this.viewSlidesList[i];
            slide.wakeup();
            slide.position = pos;
            slide.$element[0].style[this.__cssProb] = pos + 'px';
        }
        if (move !== false) this.controller.changeTo(this.slideList[this.index].position, false, null, null, false);
    };
    p.__createLoopList = function () {
        var return_arr = [];
        var i = 0,
            count = this.slidesCount / 2;
        var before_count = (this.slidesCount % 2 === 0) ? count - 1 : Math.floor(count);
        var after_count = (this.slidesCount % 2 === 0) ? count : Math.floor(count);
        this.currentSlideLoc = before_count;
        for (i = 1; i <= before_count; ++i)
            return_arr.unshift(this.slideList[(this.index - i < 0) ? this.slidesCount - i + this.index : this.index - i]);
        return_arr.push(this.slideList[this.index]);
        for (i = 1; i <= after_count; ++i)
            return_arr.push(this.slideList[(this.index + i >= this.slidesCount) ? this.index + i - this.slidesCount : this.index + i]);
        return return_arr;
    };
    p.__getSteps = function (index, target) {
        var right = (target < index) ? this.slidesCount - index + target : target - index;
        var left = Math.abs(this.slidesCount - right);
        return (right < left) ? right : -left;
    };
    p.__pushEnd = function () {
        var first_slide = this.slides.shift();
        var last_slide = this.slides[this.slidesCount - 2];
        this.slides.push(first_slide);
        if (!this.normalMode) return;
        var pos = last_slide.$element[0][this.__offset] + this.spacing + this[this.__dimension];
        first_slide.$element[0].style[this.__cssProb] = pos + 'px';
        first_slide.position = pos;
    };
    p.__pushStart = function () {
        var last_slide = this.slides.pop();
        var first_slide = this.slides[0];
        this.slides.unshift(last_slide);
        if (!this.normalMode) return;
        var pos = first_slide.$element[0][this.__offset] - this.spacing - this[this.__dimension];
        last_slide.$element[0].style[this.__cssProb] = pos + 'px';
        last_slide.position = pos;
    };
    p.__updateSlidesZindex = function () {
        var slide, l = this.viewSlidesList.length,
            hlf = Math.floor(l / 2);
        if (this.loop) {
            var loc = this.viewSlidesList.indexOf(this.currentSlide);
            for (var i = 0; i !== l; i++) {
                slide = this.viewSlidesList[i];
                this.viewSlidesList[i].$element.css('z-index', i <= loc ? i + 1 : l - i);
            }
        } else {
            var beforeNum = this.currentSlide.index - this.viewSlidesList[0].index,
                afterNum = l - beforeNum,
                diff = beforeNum - afterNum;
            for (var i = 0; i !== l; i++) {
                this.viewSlidesList[i].$element.css('z-index', i <= beforeNum ? i + 1 : l - i);
            }
            this.currentSlide.$element.css('z-index', l);
        }
    };
    p.addSlide = function (slide) {
        slide.view = this;
        this.slides.push(slide);
        this.slideList.push(slide);
        this.slidesCount++;
    };
    p.appendSlide = function (slide) {
        this.$slideCont.append(slide.$element);
    };
    p.updateLoop = function (index) {
        if (this.loop) {
            var steps = this.__getSteps(this.index, index);
            for (var i = 0, l = Math.abs(steps); i < l; ++i) {
                if (steps < 0) this.__pushStart();
                else this.__pushEnd();
            }
        }
    };
    p.gotoSlide = function (index, fast) {
        this.updateLoop(index);
        this.index = index;
        var target_slide = this.slideList[index];
        this._checkCritMargins();
        this.controller.changeTo(target_slide.position, !fast, null, null, false);
        if (target_slide === this.currentSlide) return;
        this.slideChanged = true;
        this.currentSlide = target_slide;
        if (this.autoUpdateZIndex) {
            this.__updateSlidesZindex();
        }
        this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START));
        if (fast) this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END));
    };
    p.next = function (checkLoop) {
        if (checkLoop && !this.loop && this.index + 1 >= this.slidesCount) {
            this.controller.bounce(10);
            return;
        }
        this.gotoSlide((this.index + 1 >= this.slidesCount) ? 0 : this.index + 1);
    };
    p.previous = function (checkLoop) {
        if (checkLoop && !this.loop && this.index - 1 < 0) {
            this.controller.bounce(-10);
            return;
        }
        this.gotoSlide((this.index - 1 < 0) ? this.slidesCount - 1 : this.index - 1);
    };
    p.setupSwipe = function () {
        this.swipeControl = new averta.TouchSwipe(this.$element);
        this.swipeControl.swipeType = this.dir === 'h' ? 'horizontal' : 'vertical';
        var that = this;
        if (this.dir === 'h') {
            this.swipeControl.onSwipe = function (status) {
                that.horizSwipeMove(status);
            };
        } else {
            this.swipeControl.onSwipe = function (status) {
                that.vertSwipeMove(status);
            };
        }
    };
    p.vertSwipeMove = function (status) {
        var phase = status.phase;
        if (phase === 'start') {
            this.controller.stop();
            this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));
        } else if (phase === 'move' && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveY) < this.cont_size / 2)) {
            this.controller.drag(status.moveY);
            this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
        } else if (phase === 'end' || phase === 'cancel') {
            var speed = status.distanceY / status.duration * 50 / 3,
                speedh = Math.abs(status.distanceY / status.duration * 50 / 3);
            if (Math.abs(speed) > 0.1 && Math.abs(speed) >= speedh) {
                this.controller.push(-speed);
                if (speed > this.controller.options.snappingMinSpeed)
                    this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status));
            } else {
                this.controller.cancel();
                this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status));
            }
        }
    };
    p.horizSwipeMove = function (status) {
        var phase = status.phase;
        if (phase === 'start') {
            this.controller.stop();
            this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));
        } else if (phase === 'move' && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveX) < this.cont_size / 2)) {
            this.controller.drag(status.moveX);
            this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
        } else if (phase === 'end' || phase === 'cancel') {
            var speed = status.distanceX / status.duration * 50 / 3,
                speedv = Math.abs(status.distanceY / status.duration * 50 / 3);
            if (Math.abs(speed) > 0.1 && Math.abs(speed) >= speedv) {
                this.controller.push(-speed);
                if (speed > this.controller.options.snappingMinSpeed)
                    this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status));
            } else {
                this.controller.cancel();
                this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status));
            }
        }
    };
    p.setSize = function (width, height, hard) {
        if (this.lastWidth === width && height === this.lastHeight && !hard) return;
        this.$element.width(width).height(height);
        for (var i = 0; i < this.slidesCount; ++i)
            this.slides[i].setSize(width, height, hard);
        this.__width = width;
        this.__height = height;
        if (this.__created) {
            this.__locateSlides();
            this.cont_size = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing);
            if (!this.loop) this.controller._max_value = this.cont_size;
            this.controller.options.snapsize = this[this.__dimension] + this.spacing;
            this.controller.changeTo(this.currentSlide.position, false, null, null, false);
            this.controller.cancel();
            this.lastWidth = width;
            this.lastHeight = height;
        }
    };
    p.create = function (index) {
        this.__created = true;
        this.index = Math.min((index || 0), this.slidesCount - 1);
        this.lastSnap = this.index;
        if (this.loop)
            this.slides = this.__createLoopList();
        this.normalMode = this.slidesCount <= this.options.viewNum;
        for (var i = 0; i < this.slidesCount; ++i)
            this.slides[i].create();
        this.__locateSlides();
        this.controller.options.snapsize = this[this.__dimension] + this.spacing;
        if (!this.loop) this.controller._max_value = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing);
        this.gotoSlide(this.index, true);
        if (this.options.swipe && (window._touch || this.options.mouseSwipe))
            this.setupSwipe();
    };
    p.destroy = function () {
        if (!this.__created) return;
        for (var i = 0; i < this.slidesCount; ++i)
            this.slides[i].destroy();
        this.slides = null;
        this.slideList = null;
        this.$element.remove();
        this.controller.destroy();
        this.controller = null;
    };
    averta.EventDispatcher.extend(p);
    MSSlideController.registerView('basic', MSBasicView);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSWaveView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-wave-view');
        this.$slideCont.css(window._csspfx + 'transform-style', 'preserve-3d');
        this.autoUpdateZIndex = true;
    };
    MSWaveView.extend(MSBasicView);
    MSWaveView._3dreq = true;
    MSWaveView._fallback = MSBasicView;
    var p = MSWaveView.prototype;
    var _super = MSBasicView.prototype;
    p._horizUpdate = function (controller, value) {
        _super._horizUpdate.call(this, controller, value);
        var cont_scroll = -value;
        var slide_pos, slide, distance;
        for (var i = 0; i < this.slidesCount; ++i) {
            slide = this.slideList[i];
            distance = -cont_scroll - slide.position;
            this.__updateSlidesHoriz(slide, distance);
        }
    };
    p._vertiUpdate = function (controller, value) {
        _super._vertiUpdate.call(this, controller, value);
        var cont_scroll = -value;
        var slide_pos, slide, distance;
        for (var i = 0; i < this.slidesCount; ++i) {
            slide = this.slideList[i];
            distance = -cont_scroll - slide.position;
            this.__updateSlidesVertic(slide, distance);
        }
    };
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        slide.$element[0].style[window._csspfx + 'transform'] = 'translateZ(' + -value * 3 + 'px) rotateY(0.01deg)';
    };
    p.__updateSlidesVertic = function (slide, distance) {
        this.__updateSlidesHoriz(slide, distance);
    };
    MSSlideController.registerView('wave', MSWaveView);
})(jQuery);;
(function () {
    window.MSFadeBasicView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-fade-basic-view');
    };
    MSFadeBasicView.extend(MSWaveView);
    var p = MSFadeBasicView.prototype;
    var _super = MSFadeBasicView.prototype;
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 0.6 / this.__width);
        value = 1 - Math.min(value, 0.6);
        slide.$element.css('opacity', value);
    };
    p.__updateSlidesVertic = function (slide, distance) {
        this.__updateSlidesHoriz(slide, distance);
    };
    MSSlideController.registerView('fadeBasic', MSFadeBasicView);
    MSWaveView._fallback = MSFadeBasicView;
})();;
(function () {
    window.MSFadeWaveView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-fade-wave-view');
    };
    MSFadeWaveView.extend(MSWaveView);
    MSFadeWaveView._3dreq = true;
    MSFadeWaveView._fallback = MSFadeBasicView;
    var p = MSFadeWaveView.prototype;
    var _super = MSWaveView.prototype;
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        value = Math.min(value, 100);
        slide.$element.css('opacity', 1 - value / 300);
        slide.$element[0].style[window._jcsspfx + 'Transform'] = 'scale(' + (1 - value / 800) + ') rotateY(0.01deg) ';
    };
    p.__updateSlidesVertic = function (slide, distance) {
        this.__updateSlidesHoriz(slide, distance);
    };
    MSSlideController.registerView('fadeWave', MSFadeWaveView);
})();;
(function ($) {
    "use strict";
    window.MSFlowView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-flow-view');
    };
    MSFlowView.extend(MSWaveView);
    MSFlowView._3dreq = true;
    MSFlowView._fallback = MSFadeBasicView;
    var p = MSFlowView.prototype;
    var _super = MSWaveView.prototype;
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        var rvalue = Math.min(value * 0.3, 30) * (distance < 0 ? -1 : 1);
        var zvalue = value * 1.2;
        slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ(' + -zvalue * 5 + 'px) rotateY(' + rvalue + 'deg) ';
    };
    p.__updateSlidesVertic = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        var rvalue = Math.min(value * 0.3, 30) * (distance < 0 ? -1 : 1);
        var zvalue = value * 1.2;
        slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ(' + -zvalue * 5 + 'px) rotateX(' + -rvalue + 'deg) ';
    };
    MSSlideController.registerView('flow', MSFlowView);
})(jQuery);;
(function () {
    window.MSFadeFlowView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-fade-flow-view');
    };
    MSFadeFlowView.extend(MSWaveView);
    MSFadeFlowView._3dreq = true;
    var p = MSFadeFlowView.prototype;
    var _super = MSWaveView.prototype;
    p.__calculate = function (distance) {
        var value = Math.min(Math.abs(distance * 100 / this.__width), 100);
        var rvalue = Math.min(value * 0.5, 50) * (distance < 0 ? -1 : 1);
        return {
            value: value,
            rvalue: rvalue
        };
    };
    p.__updateSlidesHoriz = function (slide, distance) {
        var clc = this.__calculate(distance);
        slide.$element.css('opacity', 1 - clc.value / 300);
        slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ(' + -clc.value + 'px) rotateY(' + clc.rvalue + 'deg) ';
    };
    p.__updateSlidesVertic = function (slide, distance) {
        var clc = this.__calculate(distance);
        slide.$element.css('opacity', 1 - clc.value / 300);
        slide.$element[0].style[window._jcsspfx + 'Transform'] = 'translateZ(' + -clc.value + 'px) rotateX(' + -clc.rvalue + 'deg) ';
    };
    MSSlideController.registerView('fadeFlow', MSFadeFlowView);
})();;
(function ($) {
    "use strict";
    window.MSMaskView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-mask-view');
    };
    MSMaskView.extend(MSBasicView);
    var p = MSMaskView.prototype;
    var _super = MSBasicView.prototype;
    p.addSlide = function (slide) {
        slide.view = this;
        slide.$frame = $('<div></div>').addClass('ms-mask-frame').append(slide.$element);
        slide.$element[0].style.position = 'relative';
        slide.autoAppend = false;
        this.slides.push(slide);
        this.slideList.push(slide);
        this.slidesCount++;
    };
    p.setSize = function (width, height) {
        var slider = this.slides[0].slider;
        for (var i = 0; i < this.slidesCount; ++i) {
            this.slides[i].$frame[0].style.width = width + 'px';
            if (!slider.options.autoHeight)
                this.slides[i].$frame[0].style.height = height + 'px';
        }
        _super.setSize.call(this, width, height);
    };
    p._horizUpdate = function (controller, value) {
        _super._horizUpdate.call(this, controller, value);
        var i = 0;
        if (this.css3) {
            for (i = 0; i < this.slidesCount; ++i) {
                this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + (value - this.slideList[i].position) + 'px)' + this.__translate_end;
            }
            return;
        }
        for (i = 0; i < this.slidesCount; ++i) {
            this.slideList[i].$element[0].style.left = (value - this.slideList[i].position) + 'px';
        }
    };
    p._vertiUpdate = function (controller, value) {
        _super._vertiUpdate.call(this, controller, value);
        var i = 0;
        if (this.css3) {
            for (i = 0; i < this.slidesCount; ++i) {
                this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + (value - this.slideList[i].position) + 'px)' + this.__translate_end;
            }
            return;
        }
        for (i = 0; i < this.slidesCount; ++i) {
            this.slideList[i].$element[0].style.top = (value - this.slideList[i].position) + 'px';
        }
    };
    p.__pushEnd = function () {
        var first_slide = this.slides.shift();
        var last_slide = this.slides[this.slidesCount - 2];
        this.slides.push(first_slide);
        if (!this.normalMode) return;
        var pos = last_slide.$frame[0][this.__offset] + this.spacing + this[this.__dimension];
        first_slide.$frame[0].style[this.__cssProb] = pos + 'px';
        first_slide.position = pos;
    };
    p.__pushStart = function () {
        var last_slide = this.slides.pop();
        var first_slide = this.slides[0];
        this.slides.unshift(last_slide);
        if (!this.normalMode) return;
        var pos = first_slide.$frame[0][this.__offset] - this.spacing - this[this.__dimension];
        last_slide.$frame[0].style[this.__cssProb] = pos + 'px';
        last_slide.position = pos;
    };
    p.__updateViewList = function () {
        if (this.normalMode) {
            this.viewSlidesList = this.slides;
            return;
        }
        var temp = this.viewSlidesList.slice();
        this.viewSlidesList = [];
        var i = 0,
            hlf = Math.floor(this.options.viewNum / 2),
            l;
        if (this.loop) {
            for (; i !== this.options.viewNum; i++)
                this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
        } else {
            for (i = 0; i !== hlf && this.index - i !== -1; i++)
                this.viewSlidesList.unshift(this.slideList[this.index - i]);
            for (i = 1; i !== hlf && this.index + i !== this.slidesCount; i++)
                this.viewSlidesList.push(this.slideList[this.index + i]);
        }
        for (i = 0, l = temp.length; i !== l; i++) {
            if (this.viewSlidesList.indexOf(temp[i]) === -1) {
                temp[i].sleep();
                temp[i].$frame.detach();
            }
        }
        temp = null;
    };
    p.__locateSlides = function (move, start) {
        this.__updateViewList();
        start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing) : start || 0;
        var l = this.viewSlidesList.length,
            slide;
        for (var i = 0; i !== l; i++) {
            var pos = start + i * (this[this.__dimension] + this.spacing);
            slide = this.viewSlidesList[i];
            this.$slideCont.append(slide.$frame);
            slide.wakeup(false);
            slide.position = pos;
            if (slide.selected && slide.bgvideo) {
                try {
                    slide.bgvideo.play();
                } catch (e) {}
            }
            slide.$frame[0].style[this.__cssProb] = pos + 'px';
        }
        if (move !== false) this.controller.changeTo(this.slideList[this.index].position, false, null, null, false);
    };
    MSSlideController.registerView('mask', MSMaskView);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSParallaxMaskView = function (options) {
        MSMaskView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-parallax-mask-view');
    };
    MSParallaxMaskView.extend(MSMaskView);
    MSParallaxMaskView.parallaxAmount = 0.5;
    var p = MSParallaxMaskView.prototype;
    var _super = MSBasicView.prototype;
    p._horizUpdate = function (controller, value) {
        _super._horizUpdate.call(this, controller, value);
        var i = 0;
        if (this.css3) {
            for (i = 0; i < this.slidesCount; ++i) {
                this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + 'px)' + this.__translate_end;
            }
            return;
        }
        for (i = 0; i < this.slidesCount; ++i) {
            this.slideList[i].$element[0].style.left = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + 'px';
        }
    };
    p._vertiUpdate = function (controller, value) {
        _super._vertiUpdate.call(this, controller, value);
        var i = 0;
        if (this.css3) {
            for (i = 0; i < this.slidesCount; ++i) {
                this.slideList[i].$element[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + 'px)' + this.__translate_end;
            }
            return;
        }
        for (i = 0; i < this.slidesCount; ++i) {
            this.slideList[i].$element[0].style.top = (value - this.slideList[i].position) * MSParallaxMaskView.parallaxAmount + 'px';
        }
    };
    MSSlideController.registerView('parallaxMask', MSParallaxMaskView);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSFadeView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-fade-view');
        this.controller.renderCallback(this.__update, this);
    };
    MSFadeView.extend(MSBasicView);
    var p = MSFadeView.prototype;
    var _super = MSBasicView.prototype;
    p.__update = function (controller, value) {
        var cont_scroll = -value;
        var slide_pos, slide, distance;
        for (var i = 0; i < this.slidesCount; ++i) {
            slide = this.slideList[i];
            distance = -cont_scroll - slide.position;
            this.__updateSlides(slide, distance);
        }
    };
    p.__updateSlides = function (slide, distance) {
        var value = Math.abs(distance / this[this.__dimension]);
        if (1 - value <= 0) {
            slide.$element.fadeTo(0, 0).css('visibility', 'hidden');
        } else {
            slide.$element.fadeTo(0, 1 - value).css('visibility', '');
        }
    };
    p.__locateSlides = function (move, start) {
        this.__updateViewList();
        start = !this.loop ? this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing) : start || 0;
        var l = this.viewSlidesList.length,
            slide;
        for (var i = 0; i !== l; i++) {
            var pos = start + i * this[this.__dimension];
            slide = this.viewSlidesList[i];
            slide.wakeup();
            slide.position = pos;
        }
        if (move !== false) this.controller.changeTo(this.slideList[this.index].position, false, null, null, false);
    };
    p.__pushEnd = function () {
        var first_slide = this.slides.shift();
        var last_slide = this.slides[this.slidesCount - 2];
        this.slides.push(first_slide);
        first_slide.position = last_slide.position + this[this.__dimension];
    };
    p.__pushStart = function () {
        var last_slide = this.slides.pop();
        var first_slide = this.slides[0];
        this.slides.unshift(last_slide);
        last_slide.position = first_slide.position - this[this.__dimension];
    };
    p.create = function (index) {
        _super.create.call(this, index);
        this.spacing = 0;
        this.controller.options.minValidDist = 10;
    };
    MSSlideController.registerView('fade', MSFadeView);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSScaleView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-scale-view');
        this.controller.renderCallback(this.__update, this);
    };
    MSScaleView.extend(MSFadeView);
    var p = MSScaleView.prototype;
    var _super = MSFadeView.prototype;
    p.__updateSlides = function (slide, distance) {
        var value = Math.abs(distance / this[this.__dimension]),
            element = slide.$element[0];
        if (1 - value <= 0) {
            element.style.opacity = 0;
            element.style.visibility = 'hidden';
            element.style[window._jcsspfx + 'Transform'] = '';
        } else {
            element.style.opacity = 1 - value;
            element.style.visibility = '';
            element.style[window._jcsspfx + 'Transform'] = 'perspective(2000px) translateZ(' + (value * (distance < 0 ? -0.5 : 0.5)) * 300 + 'px)';
        }
    };
    p.create = function (index) {
        _super.create.call(this, index);
        this.controller.options.minValidDist = 0.03;
    };
    MSSlideController.registerView('scale', MSScaleView);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSStackView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-stack-view');
        this.controller.renderCallback(this.__update, this);
        this.autoUpdateZIndex = true;
    };
    MSStackView.extend(MSFadeView);
    MSStackView._3dreq = true;
    MSStackView._fallback = MSFadeView;
    var p = MSStackView.prototype;
    var _super = MSFadeView.prototype;
    p.__updateSlidesZindex = function () {
        var slide, l = this.viewSlidesList.length;
        for (var i = 0; i !== l; i++) {
            slide = this.viewSlidesList[i];
            this.viewSlidesList[i].$element.css('z-index', l - i);
        }
    };
    p.__updateSlides = function (slide, distance) {
        var value = Math.abs(distance / this[this.__dimension]),
            element = slide.$element[0];
        if (1 - value <= 0) {
            element.style.opacity = 1;
            element.style.visibility = 'hidden';
            element.style[window._jcsspfx + 'Transform'] = '';
        } else {
            element.style.visibility = '';
            if (distance < 0) {
                element.style[window._jcsspfx + 'Transform'] = 'perspective(2000px) translateZ(' + (value * -300) + 'px)';
            } else {
                element.style[window._jcsspfx + 'Transform'] = this.__translate + '(' + (-value * this[this.__dimension]) + 'px)';
            }
        }
    };
    p.create = function (index) {
        _super.create.call(this, index);
        this.controller.options.minValidDist = 0.03;
        this.__translate = this.dir === 'h' ? 'translateX' : 'translateY';
    };
    MSSlideController.registerView('stack', MSStackView);
})(jQuery);;
(function () {
    'use strict';
    var perspective = 2000;
    window.MSFocusView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-focus-view');
        this.options.centerSpace = this.options.centerSpace || 1;
    };
    MSFocusView.extend(MSWaveView);
    MSFocusView._3dreq = true;
    MSFocusView._fallback = MSFadeBasicView;
    var p = MSFocusView.prototype;
    var _super = MSWaveView.prototype;
    p.__calcview = function (z, w) {
        var a = w / 2 * z / (z + perspective);
        return a * (z + perspective) / perspective;
    };
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        value = -Math.min(value, 100) * 15;
        slide.$element.css(window._csspfx + 'transform', 'translateZ(' + (value + 1) + 'px) rotateY(0.01deg) translateX(' + (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace) + 'px)');
    };
    p.__updateSlidesVertic = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        value = -Math.min(value, 100) * 15;
        slide.$element.css(window._csspfx + 'transform', 'translateZ(' + (value + 1) + 'px) rotateY(0.01deg) translateY(' + (distance < 0 ? 1 : -1) * (-this.__calcview(value, this.__width) * this.options.centerSpace) + 'px)');
    };
    MSSlideController.registerView('focus', MSFocusView);
})();;
(function () {
    window.MSPartialWaveView = function (options) {
        MSWaveView.call(this, options);
        this.$element.removeClass('ms-wave-view').addClass('ms-partial-wave-view');
    };
    MSPartialWaveView.extend(MSWaveView);
    MSPartialWaveView._3dreq = true;
    MSPartialWaveView._fallback = MSFadeBasicView;
    var p = MSPartialWaveView.prototype;
    var _super = MSWaveView.prototype;
    p.__updateSlidesHoriz = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        if (slide.hasBG) {
            slide.$bg_img.css('opacity', (100 - Math.abs(distance * 120 / this.__width / 3)) / 100);
        }
        slide.$element.css(window._csspfx + 'transform', 'translateZ(' + -value * 3 + 'px) rotateY(0.01deg) translateX(' + distance * 0.75 + 'px)');
    };
    p.__updateSlidesVertic = function (slide, distance) {
        var value = Math.abs(distance * 100 / this.__width);
        if (slide.hasBG) {
            slide.$bg_img.css('opacity', (100 - Math.abs(distance * 120 / this.__width / 3)) / 100);
        }
        slide.$element.css(window._csspfx + 'transform', 'translateZ(' + -value * 3 + 'px) rotateY(0.01deg) translateY(' + distance * 0.75 + 'px)');
    };
    MSSlideController.registerView('partialWave', MSPartialWaveView);
})();;
(function ($) {
    "use strict";
    window.MSBoxView = function (options) {
        MSBasicView.call(this, options);
        this.$element.removeClass('ms-basic-view').addClass('ms-box-view');
        this.controller.renderCallback(this.__update, this);
    };
    MSBoxView.extend(MSFadeView);
    MSBoxView._3dreq = true;
    var p = MSBoxView.prototype;
    var _super = MSFadeView.prototype;
    p.__updateSlides = function (slide, distance) {
        var value = Math.abs(distance / this[this.__dimension]),
            element = slide.$element[0];
        if (1 - value <= 0) {
            element.style.visibility = 'hidden';
            element.style[window._jcsspfx + 'Transform'] = '';
        } else {
            element.style.visibility = '';
            element.style[window._jcsspfx + 'Transform'] = 'rotate' + this._rotateDir + '(' + (value * (distance < 0 ? 1 : -1)) * 90 * this._calcFactor + 'deg)';
            element.style[window._jcsspfx + 'TransformOrigin'] = '50% 50% -' + (slide[this.__dimension] / 2) + 'px';
            element.style.zIndex = Math.ceil((1 - value) * 2);
        }
    };
    p.create = function (index) {
        _super.create.call(this, index);
        this.controller.options.minValidDist = 0.03;
        this._rotateDir = this.options.dir === 'h' ? 'Y' : 'X';
        this._calcFactor = this.options.dir === 'h' ? 1 : -1;
    };
    MSSlideController.registerView('box', MSBoxView);
})(jQuery);;
(function ($) {
    "use strict";
    var BaseControl = function () {
        this.options = {
            prefix: 'ms-',
            autohide: true,
            overVideo: true,
            customClass: null
        };
    };
    var p = BaseControl.prototype;
    p.slideAction = function (slide) {};
    p.setup = function () {
        this.cont = this.options.insertTo ? $(this.options.insertTo) : this.slider.$controlsCont;
        if (!this.options.overVideo) this._hideOnvideoStarts();
    };
    p.checkHideUnder = function () {
        if (this.options.hideUnder) {
            this.needsRealign = !this.options.insetTo && (this.options.align === 'left' || this.options.align === 'right') && this.options.inset === false;
            $(window).bind('resize', {
                that: this
            }, this.onResize);
            this.onResize();
        }
    };
    p.onResize = function (event) {
        var that = (event && event.data.that) || this;
        var w = window.innerWidth;
        if (w <= that.options.hideUnder && !that.detached) {
            that.hide(true);
            that.detached = true;
            that.onDetach();
        } else if (w >= that.options.hideUnder && that.detached) {
            that.detached = false;
            that.visible();
            that.onAppend();
        }
    };
    p.create = function () {
        var that = this;
        if (this.options.autohide) {
            this.hide(true);
            this.slider.$controlsCont.mouseenter($.proxy(this._onMouseEnter, this)).mouseleave($.proxy(this._onMouseLeave, this)).mousedown($.proxy(this._onMouseDown, this));
            if (this.$element) {
                this.$element.mouseenter($.proxy(this._onMouseEnter, this)).mouseleave($.proxy(this._onMouseLeave, this)).mousedown($.proxy(this._onMouseDown, this));
            }
            $(document).mouseup($.proxy(this._onMouseUp, this));
        }
        if (this.options.align) {
            this.$element.addClass('ms-align-' + this.options.align);
        }
        if (this.options.customClass && this.$element) {
            this.$element.addClass(this.options.customClass);
        }
    };
    p._onMouseEnter = function () {
        if (!this._disableAH && !this.mdown) {
            this.visible();
        }
        this.mleave = false;
    };
    p._onMouseLeave = function () {
        if (!this.mdown) {
            this.hide();
        }
        this.mleave = true;
    };
    p._onMouseDown = function () {
        this.mdown = true;
    };
    p._onMouseUp = function () {
        if (this.mdown && this.mleave) {
            this.hide();
        }
        this.mdown = false;
    };
    p.onAppend = function () {
        if (this.needsRealign) {
            this.slider._realignControls();
        }
    };
    p.onDetach = function () {
        if (this.needsRealign) {
            this.slider._realignControls();
        }
    };
    p._hideOnvideoStarts = function () {
        var that = this;
        this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY, function () {
            that._disableAH = true;
            that.hide();
        });
        this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE, function () {
            that._disableAH = false;
            that.visible();
        });
    };
    p.hide = function (fast) {
        if (fast) {
            this.$element.css('opacity', 0);
            this.$element.css('display', 'none');
        } else {
            clearTimeout(this.hideTo);
            var $element = this.$element;
            this.hideTo = setTimeout(function () {
                CTween.fadeOut($element, 400, false);
            }, 20);
        }
        this.$element.addClass('ms-ctrl-hide');
    };
    p.visible = function () {
        if (this.detached) return;
        clearTimeout(this.hideTo);
        this.$element.css('display', '');
        CTween.fadeIn(this.$element, 400, false);
        this.$element.removeClass('ms-ctrl-hide');
    };
    p.destroy = function () {
        if (this.options && this.options.hideUnder) {
            $(window).unbind('resize', this.onResize);
        }
    };
    window.BaseControl = BaseControl;
})(jQuery);;
(function ($) {
    "use strict";
    var MSArrows = function (options) {
        BaseControl.call(this);
        $.extend(this.options, options);
    };
    MSArrows.extend(BaseControl);
    var p = MSArrows.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        var that = this;
        this.$next = $('<div></div>').addClass(this.options.prefix + 'nav-next').bind('click', function () {
            that.slider.api.next(true);
        });
        this.$prev = $('<div></div>').addClass(this.options.prefix + 'nav-prev').bind('click', function () {
            that.slider.api.previous(true);
        });
        _super.setup.call(this);
        this.cont.append(this.$next);
        this.cont.append(this.$prev);
        this.checkHideUnder();
    };
    p.hide = function (fast) {
        if (fast) {
            this.$prev.css('opacity', 0).css('display', 'none');
            this.$next.css('opacity', 0).css('display', 'none');
            return;
        }
        CTween.fadeOut(this.$prev, 400, false);
        CTween.fadeOut(this.$next, 400, false);
        this.$prev.addClass('ms-ctrl-hide');
        this.$next.addClass('ms-ctrl-hide');
    };
    p.visible = function () {
        if (this.detached) return;
        CTween.fadeIn(this.$prev, 400);
        CTween.fadeIn(this.$next, 400);
        this.$prev.removeClass('ms-ctrl-hide').css('display', '');
        this.$next.removeClass('ms-ctrl-hide').css('display', '');
    };
    p.destroy = function () {
        _super.destroy();
        this.$next.remove();
        this.$prev.remove();
    };
    window.MSArrows = MSArrows;
    MSSlideController.registerControl('arrows', MSArrows);
})(jQuery);;
(function ($) {
    "use strict";
    var MSThumblist = function (options) {
        BaseControl.call(this);
        this.options.dir = 'h';
        this.options.wheel = options.dir === 'v';
        this.options.arrows = false;
        this.options.speed = 17;
        this.options.align = null;
        this.options.inset = false;
        this.options.margin = 10;
        this.options.space = 10;
        this.options.width = 100;
        this.options.height = 100;
        this.options.type = 'thumbs';
        this.options.hover = false;
        $.extend(this.options, options);
        this.thumbs = [];
        this.index_count = 0;
        this.__dimen = this.options.dir === 'h' ? 'width' : 'height';
        this.__alignsize = this.options.dir === 'h' ? 'height' : 'width';
        this.__jdimen = this.options.dir === 'h' ? 'outerWidth' : 'outerHeight';
        this.__pos = this.options.dir === 'h' ? 'left' : 'top';
        this.click_enable = true;
    };
    MSThumblist.extend(BaseControl);
    var p = MSThumblist.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        this.$element = $('<div></div>').addClass(this.options.prefix + 'thumb-list');
        if (this.options.type === 'tabs') {
            this.$element.addClass(this.options.prefix + 'tabs');
        }
        this.$element.addClass('ms-dir-' + this.options.dir);
        _super.setup.call(this);
        if (this.slider.$controlsCont === this.cont) {
            this.$element.appendTo(this.slider.$element);
        } else {
            this.$element.appendTo(this.cont);
        }
        this.$thumbscont = $('<div></div>').addClass('ms-thumbs-cont').appendTo(this.$element);
        this.$thumbscont.wrap("<div class='ms-thumbs-cont-wrapper'></div>");
        if (this.options.arrows) {
            var that = this;
            this.$fwd = $('<div></div>').addClass('ms-thumblist-fwd').appendTo(this.$element).click(function () {
                that.controller.push(-15);
            });
            this.$bwd = $('<div></div>').addClass('ms-thumblist-bwd').appendTo(this.$element).click(function () {
                that.controller.push(15);
            });
        }
        if (!this.options.insetTo && this.options.align) {
            var align = this.options.align;
            if (this.options.inset) {
                this.$element.css(align, this.options.margin);
            } else if (align === 'top') {
                this.$element.detach().prependTo(this.slider.$element).css({
                    'margin-bottom': this.options.margin,
                    'position': 'relative'
                });
            } else if (align === 'bottom') {
                this.$element.css({
                    'margin-top': this.options.margin,
                    'position': 'relative'
                });
            } else {
                this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
                this.align();
            }
            if (this.options.dir === 'v') {
                this.$element.width(this.options.width);
            } else {
                this.$element.height(this.options.height);
            }
        }
        this.checkHideUnder();
    };
    p.align = function (event) {
        if (this.detached) {
            return;
        }
        var align = this.options.align;
        var pos = this.slider.reserveSpace(align, this.options[this.__alignsize] + this.options.margin * 2);
        this.$element.css(align, -pos - this.options[this.__alignsize] - this.options.margin);
    };
    p.slideAction = function (slide) {
        var thumb_ele = slide.$element.find('.ms-thumb');
        var that = this;
        var thumb_frame = $('<div></div>').addClass('ms-thumb-frame').append(thumb_ele).append($('<div class="ms-thumb-ol"></div>')).bind(this.options.hover ? 'hover' : 'click', function () {
            that.changeSlide(thumb_frame);
        });
        if (this.options.align) {
            thumb_frame.width(this.options.width - (this.options.dir === 'v' && this.options.type === 'tabs' ? 12 : 0)).height(this.options.height).css('margin-' + (this.options.dir === 'v' ? 'bottom' : 'right'), this.options.space);
        }
        thumb_frame[0].index = this.index_count++;
        this.$thumbscont.append(thumb_frame);
        if (this.options.fillMode && thumb_ele.is('img')) {
            var aligner = new window.MSAligner(this.options.fillMode, thumb_frame, thumb_ele);
            thumb_ele[0].aligner = aligner;
            thumb_ele.one('load', function (e) {
                var $this = $(this);
                $this[0].aligner.init($this.width(), $this.height());
                $this[0].aligner.align();
            }).each($.jqLoadFix);
        }
        if ($.browser.msie)
            thumb_ele.on('dragstart', function (event) {
                event.preventDefault();
            });
        this.thumbs.push(thumb_frame);
    };
    p.create = function () {
        _super.create.call(this);
        this.__translate_end = window._css3d ? ' translateZ(0px)' : '';
        this.controller = new Controller(0, 0, {
            snappingMinSpeed: 2,
            friction: (100 - this.options.speed * 0.5) / 100
        });
        this.controller.renderCallback(this.options.dir === 'h' ? this._hMove : this._vMove, this);
        var that = this;
        this.resize_listener = function () {
            that.__resize();
        };
        $(window).bind('resize', this.resize_listener);
        this.thumbSize = this.thumbs[0][this.__jdimen](true);
        this.setupSwipe();
        this.__resize();
        var that = this;
        if (this.options.wheel) {
            this.wheellistener = function (event) {
                var e = window.event || event.orginalEvent || event;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                that.controller.push(-delta * 10);
                return false;
            };
            if ($.browser.mozilla) this.$element[0].addEventListener('DOMMouseScroll', this.wheellistener);
            else this.$element.bind('mousewheel', this.wheellistener);
        }
        this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this);
        this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE, this.realignThumbs, this);
        this.cindex = this.slider.api.index();
        this.select(this.thumbs[this.cindex]);
    };
    p._hMove = function (controller, value) {
        this.__contPos = value;
        if (window._cssanim) {
            this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = 'translateX(' + -value + 'px)' + this.__translate_end;
            return;
        }
        this.$thumbscont[0].style.left = -value + 'px';
    };
    p._vMove = function (controller, value) {
        this.__contPos = value;
        if (window._cssanim) {
            this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -value + 'px)' + this.__translate_end;
            return;
        }
        this.$thumbscont[0].style.top = -value + 'px';
    };
    p.setupSwipe = function () {
        this.swipeControl = new averta.TouchSwipe(this.$element);
        this.swipeControl.swipeType = this.options.dir === 'h' ? 'horizontal' : 'vertical';
        var that = this;
        if (this.options.dir === 'h')
            this.swipeControl.onSwipe = function (status) {
                that.horizSwipeMove(status);
            };
        else
            this.swipeControl.onSwipe = function (status) {
                that.vertSwipeMove(status);
            };
    };
    p.vertSwipeMove = function (status) {
        if (this.dTouch) return;
        var phase = status.phase;
        if (phase === 'start')
            this.controller.stop();
        else if (phase === 'move')
            this.controller.drag(status.moveY);
        else if (phase === 'end' || phase === 'cancel') {
            var speed = Math.abs(status.distanceY / status.duration * 50 / 3);
            if (speed > 0.1) {
                this.controller.push(-status.distanceY / status.duration * 50 / 3);
            } else {
                this.click_enable = true;
                this.controller.cancel();
            }
        }
    };
    p.horizSwipeMove = function (status) {
        if (this.dTouch) return;
        var phase = status.phase;
        if (phase === 'start') {
            this.controller.stop();
            this.click_enable = false;
        } else if (phase === 'move')
            this.controller.drag(status.moveX);
        else if (phase === 'end' || phase === 'cancel') {
            var speed = Math.abs(status.distanceX / status.duration * 50 / 3);
            if (speed > 0.1) {
                this.controller.push(-status.distanceX / status.duration * 50 / 3);
            } else {
                this.click_enable = true;
                this.controller.cancel();
            }
        }
    };
    p.update = function () {
        var nindex = this.slider.api.index();
        if (this.cindex === nindex) return;
        if (this.cindex != null) this.unselect(this.thumbs[this.cindex]);
        this.cindex = nindex;
        this.select(this.thumbs[this.cindex]);
        if (!this.dTouch) this.updateThumbscroll();
    };
    p.realignThumbs = function () {
        this.$element.find('.ms-thumb').each(function (index, thumb) {
            if (thumb.aligner) {
                thumb.aligner.align();
            }
        });
    };
    p.updateThumbscroll = function () {
        var thumb_size;
        var pos = this.thumbSize * this.cindex;
        if (this.controller.value == NaN) this.controller.value = 0;
        if (pos - this.controller.value < 0) {
            this.controller.gotoSnap(this.cindex, true);
            return;
        }
        if (pos + this.thumbSize - this.controller.value > this.$element[this.__dimen]()) {
            var first_snap = this.cindex - Math.floor(this.$element[this.__dimen]() / this.thumbSize) + 1;
            this.controller.gotoSnap(first_snap, true);
            return;
        }
    };
    p.changeSlide = function (thumb) {
        if (!this.click_enable || this.cindex === thumb[0].index) return;
        this.slider.api.gotoSlide(thumb[0].index);
    };
    p.unselect = function (ele) {
        ele.removeClass('ms-thumb-frame-selected');
    };
    p.select = function (ele) {
        ele.addClass('ms-thumb-frame-selected');
    };
    p.__resize = function () {
        var size = this.$element[this.__dimen]();
        if (this.ls === size) return;
        this.ls = size;
        this.thumbSize = this.thumbs[0][this.__jdimen](true);
        var len = this.slider.api.count() * this.thumbSize;
        this.$thumbscont[0].style[this.__dimen] = len + 'px';
        if (len <= size) {
            this.dTouch = true;
            this.controller.stop();
            this.$thumbscont[0].style[this.__pos] = (size - len) * .5 + 'px';
            this.$thumbscont[0].style[window._jcsspfx + 'Transform'] = '';
        } else {
            this.dTouch = false;
            this.click_enable = true;
            this.$thumbscont[0].style[this.__pos] = '';
            this.controller._max_value = len - size;
            this.controller.options.snapsize = this.thumbSize;
            this.updateThumbscroll();
        }
    };
    p.destroy = function () {
        _super.destroy();
        if (this.options.wheel) {
            if ($.browser.mozilla) this.$element[0].removeEventListener('DOMMouseScroll', this.wheellistener);
            else this.$element.unbind('mousewheel', this.wheellistener);
            this.wheellistener = null;
        }
        $(window).unbind('resize', this.resize_listener);
        this.$element.remove();
        this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
        this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this);
    };
    window.MSThumblist = MSThumblist;
    MSSlideController.registerControl('thumblist', MSThumblist);
})(jQuery);;
(function ($) {
    "use strict";
    var MSBulltes = function (options) {
        BaseControl.call(this);
        this.options.dir = 'h';
        this.options.inset = true;
        this.options.margin = 10;
        this.options.space = 10;
        $.extend(this.options, options);
        this.bullets = [];
    };
    MSBulltes.extend(BaseControl);
    var p = MSBulltes.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        _super.setup.call(this);
        this.$element = $('<div></div>').addClass(this.options.prefix + 'bullets').addClass('ms-dir-' + this.options.dir).appendTo(this.cont);
        this.$bullet_cont = $('<div></div>').addClass('ms-bullets-count').appendTo(this.$element);
        if (!this.options.insetTo && this.options.align) {
            var align = this.options.align;
            if (this.options.inset) {
                this.$element.css(align, this.options.margin);
            }
        }
        this.checkHideUnder();
    };
    p.create = function () {
        _super.create.call(this);
        var that = this;
        this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this);
        this.cindex = this.slider.api.index();
        for (var i = 0; i < this.slider.api.count(); ++i) {
            var bullet = $('<div></div>').addClass('ms-bullet');
            bullet[0].index = i;
            bullet.on('click', function () {
                that.changeSlide(this.index);
            });
            this.$bullet_cont.append(bullet);
            this.bullets.push(bullet);
            if (this.options.dir === 'h') {
                bullet.css('margin', this.options.space / 2);
            } else {
                bullet.css('margin', this.options.space);
            }
        }
        if (this.options.dir === 'h') {
            this.$element.width(bullet.outerWidth(true) * this.slider.api.count());
        } else {
            this.$element.css('margin-top', -this.$element.outerHeight(true) / 2);
        }
        this.select(this.bullets[this.cindex]);
    };
    p.update = function () {
        var nindex = this.slider.api.index();
        if (this.cindex === nindex) return;
        if (this.cindex != null) this.unselect(this.bullets[this.cindex]);
        this.cindex = nindex;
        this.select(this.bullets[this.cindex]);
    };
    p.changeSlide = function (index) {
        if (this.cindex === index) return;
        this.slider.api.gotoSlide(index);
    };
    p.unselect = function (ele) {
        ele.removeClass('ms-bullet-selected');
    };
    p.select = function (ele) {
        ele.addClass('ms-bullet-selected');
    };
    p.destroy = function () {
        _super.destroy();
        this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this);
        this.$element.remove();
    };
    window.MSBulltes = MSBulltes;
    MSSlideController.registerControl('bullets', MSBulltes);
})(jQuery);;
(function ($) {
    "use strict";
    var MSScrollbar = function (options) {
        BaseControl.call(this);
        this.options.dir = 'h';
        this.options.autohide = true;
        this.options.width = 4;
        this.options.color = '#3D3D3D';
        this.options.margin = 10;
        $.extend(this.options, options);
        this.__dimen = this.options.dir === 'h' ? 'width' : 'height';
        this.__jdimen = this.options.dir === 'h' ? 'outerWidth' : 'outerHeight';
        this.__pos = this.options.dir === 'h' ? 'left' : 'top';
        this.__translate_end = window._css3d ? ' translateZ(0px)' : '';
        this.__translate_start = this.options.dir === 'h' ? ' translateX(' : 'translateY(';
    };
    MSScrollbar.extend(BaseControl);
    var p = MSScrollbar.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        this.$element = $('<div></div>').addClass(this.options.prefix + 'sbar').addClass('ms-dir-' + this.options.dir);
        _super.setup.call(this);
        if (this.slider.$controlsCont === this.cont) {
            this.$element.appendTo(this.slider.$element);
        } else {
            this.$element.appendTo(this.cont);
        }
        this.$bar = $('<div></div>').addClass(this.options.prefix + 'bar').appendTo(this.$element);
        if (this.slider.options.loop) {
            console.log('WARNING, MSScrollbar cannot work with looped slider.');
            this.disable = true;
            this.$element.remove();
        }
        if (this.options.dir === 'v') {
            this.$bar.width(this.options.width);
        } else {
            this.$bar.height(this.options.width);
        }
        this.$bar.css('background-color', this.options.color);
        if (!this.options.insetTo && this.options.align) {
            if (this.options.dir === 'v') {
                this.$element.css({
                    right: 'auto',
                    left: 'auto'
                });
            } else {
                this.$element.css({
                    top: 'auto',
                    bottom: 'auto'
                });
            }
            var align = this.options.align;
            if (this.options.inset) {
                this.$element.css(align, this.options.margin);
            } else if (align === 'top') {
                this.$element.prependTo(this.slider.$element).css({
                    'margin-bottom': this.options.margin,
                    'position': 'relative'
                });
            } else if (align === 'bottom') {
                this.$element.css({
                    'margin-top': this.options.margin,
                    'position': 'relative'
                });
            } else {
                this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
                this.align();
            }
        }
        this.checkHideUnder();
    };
    p.align = function (event) {
        if (this.detached) {
            return;
        }
        var align = this.options.align;
        var pos = this.slider.reserveSpace(align, this.options.margin * 2 + this.options.width);
        this.$element.css(align, -pos - this.options.margin - this.options.width);
    };
    p.create = function () {
        if (this.disable) return;
        var that = this;
        this.scroller = this.slider.api.scroller;
        this.slider.api.view.addEventListener(MSViewEvents.SCROLL, this._update, this);
        this.slider.api.addEventListener(MSSliderEvent.RESIZE, this._resize, this);
        this._resize();
        if (this.options.autohide) {
            this.$bar.css('opacity', '0');
        }
    };
    p._resize = function () {
        this.vdimen = this.$element[this.__dimen]();
        this.bar_dimen = this.slider.api.view['__' + this.__dimen] * this.vdimen / this.scroller._max_value;
        this.$bar[this.__dimen](this.bar_dimen);
    };
    p._update = function () {
        var value = this.scroller.value * (this.vdimen - this.bar_dimen) / this.scroller._max_value;
        if (this.lvalue === value) return;
        this.lvalue = value;
        if (this.options.autohide) {
            clearTimeout(this.hto);
            this.$bar.css('opacity', '1');
            var that = this;
            this.hto = setTimeout(function () {
                that.$bar.css('opacity', '0');
            }, 150);
        }
        if (value < 0) {
            this.$bar[0].style[this.__dimen] = this.bar_dimen + value + 'px';
            return;
        }
        if (value > this.vdimen - this.bar_dimen)
            this.$bar[0].style[this.__dimen] = this.vdimen - value + 'px';
        if (window._cssanim) {
            this.$bar[0].style[window._jcsspfx + 'Transform'] = this.__translate_start + value + 'px)' + this.__translate_end;
            return;
        }
        this.$bar[0].style[this.__pos] = value + 'px';
    };
    p.destroy = function () {
        _super.destroy();
        this.slider.api.view.removeEventListener(MSViewEvents.SCROLL, this._update, this);
        this.slider.api.removeEventListener(MSSliderEvent.RESIZE, this._resize, this);
        this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
        this.$element.remove();
    };
    window.MSScrollbar = MSScrollbar;
    MSSlideController.registerControl('scrollbar', MSScrollbar);
})(jQuery);;
(function ($) {
    "use strict";
    var MSTimerbar = function (options) {
        BaseControl.call(this);
        this.options.autohide = false;
        this.options.width = 4;
        this.options.color = '#FFFFFF';
        this.options.inset = true;
        this.options.margin = 0;
        $.extend(this.options, options);
    };
    MSTimerbar.extend(BaseControl);
    var p = MSTimerbar.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        var that = this;
        _super.setup.call(this);
        this.$element = $('<div></div>').addClass(this.options.prefix + 'timerbar');
        _super.setup.call(this);
        if (this.slider.$controlsCont === this.cont) {
            this.$element.appendTo(this.slider.$element);
        } else {
            this.$element.appendTo(this.cont);
        }
        this.$bar = $('<div></div>').addClass('ms-time-bar').appendTo(this.$element);
        if (this.options.dir === 'v') {
            this.$bar.width(this.options.width);
            this.$element.width(this.options.width);
        } else {
            this.$bar.height(this.options.width);
            this.$element.height(this.options.width);
        }
        this.$bar.css('background-color', this.options.color);
        if (!this.options.insetTo && this.options.align) {
            this.$element.css({
                top: 'auto',
                bottom: 'auto'
            });
            var align = this.options.align;
            if (this.options.inset) {
                this.$element.css(align, this.options.margin);
            } else if (align === 'top') {
                this.$element.prependTo(this.slider.$element).css({
                    'margin-bottom': this.options.margin,
                    'position': 'relative'
                });
            } else if (align === 'bottom') {
                this.$element.css({
                    'margin-top': this.options.margin,
                    'position': 'relative'
                });
            } else {
                this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
                this.align();
            }
        }
        this.checkHideUnder();
    };
    p.align = function (event) {
        if (this.detached) {
            return;
        }
        var align = this.options.align;
        var pos = this.slider.reserveSpace(align, this.options.margin * 2 + this.options.width);
        this.$element.css(align, -pos - this.options.margin - this.options.width);
    };
    p.create = function () {
        _super.create.call(this);
        this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this);
        this._update();
    };
    p._update = function () {
        this.$bar[0].style.width = this.slider.api._delayProgress + '%';
    };
    p.destroy = function () {
        _super.destroy();
        this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
        this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this);
        this.$element.remove();
    };
    window.MSTimerbar = MSTimerbar;
    MSSlideController.registerControl('timebar', MSTimerbar);
})(jQuery);;
(function ($) {
    "use strict";
    var MSCircleTimer = function (options) {
        BaseControl.call(this);
        this.options.color = '#A2A2A2';
        this.options.stroke = 10;
        this.options.radius = 4;
        this.options.autohide = false;
        $.extend(this.options, options);
    };
    MSCircleTimer.extend(BaseControl);
    var p = MSCircleTimer.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        var that = this;
        _super.setup.call(this);
        this.$element = $('<div></div>').addClass(this.options.prefix + 'ctimer').appendTo(this.cont);
        this.$canvas = $('<canvas></canvas>').addClass('ms-ctimer-canvas').appendTo(this.$element);
        this.$bar = $('<div></div>').addClass('ms-ctimer-bullet').appendTo(this.$element);
        if (!this.$canvas[0].getContext) {
            this.destroy();
            this.disable = true;
            return;
        }
        this.ctx = this.$canvas[0].getContext('2d');
        this.prog = 0;
        this.__w = (this.options.radius + this.options.stroke / 2) * 2;
        this.$canvas[0].width = this.__w;
        this.$canvas[0].height = this.__w;
        this.checkHideUnder();
    };
    p.create = function () {
        if (this.disable) return;
        _super.create.call(this);
        this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this);
        var that = this;
        this.$element.click(function () {
            if (that.slider.api.paused)
                that.slider.api.resume();
            else
                that.slider.api.pause();
        });
        this._update();
    };
    p._update = function () {
        var that = this;
        $(this).stop(true).animate({
            prog: this.slider.api._delayProgress * 0.01
        }, {
            duration: 200,
            step: function () {
                that._draw();
            }
        });
    };
    p._draw = function () {
        this.ctx.clearRect(0, 0, this.__w, this.__w);
        this.ctx.beginPath();
        this.ctx.arc(this.__w * .5, this.__w * .5, this.options.radius, Math.PI * 1.5, Math.PI * 1.5 + 2 * Math.PI * this.prog, false);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.lineWidth = this.options.stroke;
        this.ctx.stroke();
    };
    p.destroy = function () {
        _super.destroy();
        if (this.disable) return;
        $(this).stop(true);
        this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this);
        this.$element.remove();
    };
    window.MSCircleTimer = MSCircleTimer;
    MSSlideController.registerControl('circletimer', MSCircleTimer);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSLightbox = function (options) {
        BaseControl.call(this, options);
        this.options.autohide = false;
        $.extend(this.options, options);
        this.data_list = [];
    };
    MSLightbox.fadeDuratation = 400;
    MSLightbox.extend(BaseControl);
    var p = MSLightbox.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        _super.setup.call(this);
        this.$element = $('<div></div>').addClass(this.options.prefix + 'lightbox-btn').appendTo(this.cont);
        this.checkHideUnder();
    };
    p.slideAction = function (slide) {
        $('<div></div>').addClass(this.options.prefix + 'lightbox-btn').appendTo(slide.$element).append($(slide.$element.find('.ms-lightbox')));
    };
    p.create = function () {
        _super.create.call(this);
    };
    MSSlideController.registerControl('lightbox', MSLightbox);
})(jQuery);;
(function ($) {
    "use strict";
    window.MSSlideInfo = function (options) {
        BaseControl.call(this, options);
        this.options.autohide = false;
        this.options.align = null;
        this.options.inset = false;
        this.options.margin = 10;
        this.options.size = 100;
        this.options.dir = 'h';
        $.extend(this.options, options);
        this.data_list = [];
    };
    MSSlideInfo.fadeDuratation = 400;
    MSSlideInfo.extend(BaseControl);
    var p = MSSlideInfo.prototype;
    var _super = BaseControl.prototype;
    p.setup = function () {
        this.$element = $('<div></div>').addClass(this.options.prefix + 'slide-info').addClass('ms-dir-' + this.options.dir);
        _super.setup.call(this);
        if (this.slider.$controlsCont === this.cont) {
            this.$element.appendTo(this.slider.$element);
        } else {
            this.$element.appendTo(this.cont);
        }
        if (!this.options.insetTo && this.options.align) {
            var align = this.options.align;
            if (this.options.inset) {
                this.$element.css(align, this.options.margin);
            } else if (align === 'top') {
                this.$element.prependTo(this.slider.$element).css({
                    'margin-bottom': this.options.margin,
                    'position': 'relative'
                });
            } else if (align === 'bottom') {
                this.$element.css({
                    'margin-top': this.options.margin,
                    'position': 'relative'
                });
            } else {
                this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
                this.align();
            }
            if (this.options.dir === 'v') {
                this.$element.width(this.options.size);
            } else {
                this.$element.css('min-height', this.options.size);
            }
        }
        this.checkHideUnder();
    };
    p.align = function (event) {
        if (this.detached) {
            return;
        }
        var align = this.options.align;
        var pos = this.slider.reserveSpace(align, this.options.size + this.options.margin * 2);
        this.$element.css(align, -pos - this.options.size - this.options.margin);
    };
    p.slideAction = function (slide) {
        var info_ele = $(slide.$element.find('.ms-info'));
        var that = this;
        info_ele.detach();
        this.data_list[slide.index] = info_ele;
    };
    p.create = function () {
        _super.create.call(this);
        this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this);
        this.cindex = this.slider.api.index();
        this.switchEle(this.data_list[this.cindex]);
    };
    p.update = function () {
        var nindex = this.slider.api.index();
        this.switchEle(this.data_list[nindex]);
        this.cindex = nindex;
    };
    p.switchEle = function (ele) {
        if (this.current_ele) {
            var that = this;
            if (this.current_ele[0].tween) this.current_ele[0].tween.stop(true);
            this.current_ele[0].tween = CTween.animate(this.current_ele, MSSlideInfo.fadeDuratation, {
                opacity: 0
            }, {
                complete: function () {
                    this.detach();
                    this[0].tween = null;
                    ele.css('position', 'relative');
                },
                target: this.current_ele
            });
            ele.css('position', 'absolute');
        }
        this.__show(ele);
    };
    p.__show = function (ele) {
        ele.appendTo(this.$element).css('opacity', '0');
        if (this.current_ele) {
            ele.height(Math.max(ele.height(), this.current_ele.height()));
        }
        clearTimeout(this.tou);
        this.tou = setTimeout(function () {
            CTween.fadeIn(ele, MSSlideInfo.fadeDuratation);
            ele.css('height', '');
        }, MSSlideInfo.fadeDuratation);
        if (ele[0].tween) ele[0].tween.stop(true);
        this.current_ele = ele;
    };
    p.destroy = function () {
        _super.destroy();
        clearTimeout(this.tou);
        if (this.current_ele && this.current_ele[0].tween) {
            this.current_ele[0].tween.stop('true');
        }
        this.$element.remove();
        this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this);
        this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this);
    };
    MSSlideController.registerControl('slideinfo', MSSlideInfo);
})(jQuery);;
(function ($) {
    window.MSGallery = function (id, slider) {
        this.id = id;
        this.slider = slider;
        this.telement = $('#' + id);
        this.botcont = $('<div></div>').addClass('ms-gallery-botcont').appendTo(this.telement);
        this.thumbcont = $('<div></div>').addClass('ms-gal-thumbcont hide-thumbs').appendTo(this.botcont);
        this.playbtn = $('<div></div>').addClass('ms-gal-playbtn').appendTo(this.botcont);
        this.thumbtoggle = $('<div></div>').addClass('ms-gal-thumbtoggle').appendTo(this.botcont);
        slider.control('thumblist', {
            insertTo: this.thumbcont,
            autohide: false,
            dir: 'h'
        });
        slider.control('slidenum', {
            insertTo: this.botcont,
            autohide: false
        });
        slider.control('slideinfo', {
            insertTo: this.botcont,
            autohide: false
        });
        slider.control('timebar', {
            insertTo: this.botcont,
            autohide: false
        });
        slider.control('bullets', {
            insertTo: this.botcont,
            autohide: false
        });
    };
    var p = MSGallery.prototype;
    p._init = function () {
        var that = this;
        if (!this.slider.api.paused)
            this.playbtn.addClass('btn-pause');
        this.playbtn.click(function () {
            if (that.slider.api.paused) {
                that.slider.api.resume();
                that.playbtn.addClass('btn-pause');
            } else {
                that.slider.api.pause();
                that.playbtn.removeClass('btn-pause');
            }
        });
        this.thumbtoggle.click(function () {
            if (that.vthumbs) {
                that.thumbtoggle.removeClass('btn-hide');
                that.vthumbs = false;
                that.thumbcont.addClass('hide-thumbs');
            } else {
                that.thumbtoggle.addClass('btn-hide');
                that.thumbcont.removeClass('hide-thumbs');
                that.vthumbs = true;
            }
        });
    };
    p.setup = function () {
        var that = this;
        $(document).ready(function () {
            that._init();
        });
    };
})(jQuery);;
(function ($) {
    var getPhotosetURL = function (key, id, count) {
        return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + key + '&photoset_id=' + id + '&per_page=' + count + '&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?';
    };
    var getUserPublicURL = function (key, id, count) {
        return 'https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + key + '&user_id=' + id + '&per_page=' + count + '&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?';
    };
    var getImageSource = function (fid, server, id, secret, size, data) {
        if (size === '_o' && data) {
            return data.url_o;
        }
        return 'https://farm' + fid + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
    };
    window.MSFlickrV2 = function (slider, options) {
        var _options = {
            count: 10,
            type: 'photoset',
            thumbSize: 'q',
            imgSize: 'c'
        };
        this.slider = slider;
        this.slider.holdOn();
        if (!options.key) {
            this.errMsg('Flickr API Key required. Please add it in settings.');
            return;
        }
        $.extend(_options, options);
        this.options = _options;
        var that = this;
        if (this.options.type === 'photoset') {
            $.getJSON(getPhotosetURL(this.options.key, this.options.id, this.options.count), function (data) {
                that._photosData(data);
            });
        } else {
            $.getJSON(getUserPublicURL(this.options.key, this.options.id, this.options.count), function (data) {
                that.options.type = 'photos';
                that._photosData(data);
            });
        }
        if (this.options.imgSize !== '' && this.options.imgSize !== '-')
            this.options.imgSize = '_' + this.options.imgSize;
        this.options.thumbSize = '_' + this.options.thumbSize;
        this.slideTemplate = this.slider.$element.find('.ms-slide')[0].outerHTML;
        this.slider.$element.find('.ms-slide').remove();
    };
    var p = MSFlickrV2.prototype;
    p._photosData = function (data) {
        if (data.stat === 'fail') {
            this.errMsg('Flickr API ERROR#' + data.code + ': ' + data.message);
            return;
        }
        var that = this;
        var getInfo = this.options.author || this.options.desc;
        $.each(data[this.options.type].photo, function (i, item) {
            var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function (match) {
                match = match.replace(/{{|}}/g, '');
                if (shortCodes[match]) {
                    return shortCodes[match](item, that);
                } else {
                    return '{{' + match + '}}';
                }
            });
            $(slide_cont).appendTo(that.slider.$element);
        });
        that._initSlider();
    };
    p.errMsg = function (msg) {
        this.slider.$element.css('display', 'block');
        if (!this.errEle)
            this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading);
        this.errEle.html(msg);
    };
    p._initSlider = function () {
        this.slider.release();
    };
    var shortCodes = {
        'image': function (data, that) {
            return getImageSource(data.farm, data.server, data.id, data.secret, that.options.imgSize, data);
        },
        'thumb': function (data, that) {
            return getImageSource(data.farm, data.server, data.id, data.secret, that.options.thumbSize);
        },
        'title': function (data, that) {
            return data.title;
        },
        'owner-name': function (data, that) {
            return data.ownername;
        },
        'date-taken': function (data, that) {
            return data.datetaken;
        },
        'views': function (data, that) {
            return data.views;
        },
        'description': function (data, that) {
            return data.description._content;
        }
    };
})(jQuery);;
(function ($) {
    window.MSFacebookGallery = function (slider, options) {
        var _options = {
            count: 10,
            type: 'photostream',
            thumbSize: '320',
            imgSize: 'orginal',
            https: false,
            token: ''
        };
        this.slider = slider;
        this.slider.holdOn();
        $.extend(_options, options);
        this.options = _options;
        this.graph = 'https://graph.facebook.com';
        var that = this;
        if (this.options.type === 'photostream') {
            $.getJSON(this.graph + '/' + this.options.username + '/photos/uploaded/?fields=source,name,link,images,from&limit=' + this.options.count + '&access_token=' + this.options.token, function (data) {
                that._photosData(data);
            });
        } else {
            $.getJSON(this.graph + '/' + this.options.albumId + '/photos?fields=source,name,link,images,from&limit=' + this.options.count + '&access_token=' + this.options.token, function (data) {
                that._photosData(data);
            });
        }
        this.slideTemplate = this.slider.$element.find('.ms-slide')[0].outerHTML;
        this.slider.$element.find('.ms-slide').remove();
    };
    var p = MSFacebookGallery.prototype;
    p._photosData = function (content) {
        if (content.error) {
            this.errMsg('Facebook API ERROR#' + content.error.code + '(' + content.error.type + ')' + ': ' + content.error.message);
            return;
        }
        var that = this;
        var getInfo = this.options.author || this.options.desc;
        for (var i = 0, l = content.data.length; i !== l; i++) {
            var slide_cont = that.slideTemplate.replace(/{{[\w-]+}}/g, function (match) {
                match = match.replace(/{{|}}/g, '');
                if (shortCodes[match]) {
                    return shortCodes[match](content.data[i], that);
                } else {
                    return '{{' + match + '}}';
                }
            });
            $(slide_cont).appendTo(that.slider.$element);
        }
        that._initSlider();
    };
    p.errMsg = function (msg) {
        this.slider.$element.css('display', 'block');
        if (!this.errEle)
            this.errEle = $('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading);
        this.errEle.html(msg);
    };
    p._initSlider = function () {
        this.slider.release();
    };
    var getImageSource = function (images, size) {
        if (size === 'orginal') {
            return images[0].source;
        }
        for (var i = 0, l = images.length; i !== l; i++) {
            if (images[i].source.indexOf(size + 'x' + size) !== -1)
                return images[i].source;
        }
        return images[0].source;
    };
    var shortCodes = {
        'image': function (data, that) {
            return getImageSource(data.images, that.options.imgSize);
        },
        'thumb': function (data, that) {
            return getImageSource(data.images, that.options.thumbSize);
        },
        'name': function (data, that) {
            return data.name;
        },
        'owner-name': function (data, that) {
            return data.from.name;
        },
        'link': function (data, that) {
            return data.link;
        }
    };
})(jQuery);
(function ($) {
    'use strict';
    window.MSScrollParallax = function (slider, parallax, bgparallax, fade) {
        this.fade = fade;
        this.slider = slider;
        this.parallax = parallax / 100;
        this.bgparallax = bgparallax / 100;
        slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
        slider.api.addEventListener(MSSliderEvent.DESTROY, this.destory, this);
        slider.api.addEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this);
        slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this);
    };
    window.MSScrollParallax.setup = function (slider, parallax, bgparallax, fade) {
        if (window._mobile) {
            return;
        }
        if (parallax == null) {
            parallax = 50;
        }
        if (bgparallax == null) {
            bgparallax = 40;
        }
        return new MSScrollParallax(slider, parallax, bgparallax, fade);
    };
    var p = window.MSScrollParallax.prototype;
    p.init = function (e) {
        this.slider.$element.addClass('ms-scroll-parallax');
        this.sliderOffset = this.slider.$element.offset().top;
        this.updateCurrentSlide();
        var slides = this.slider.api.view.slideList,
            slide;
        for (var i = 0, l = slides.length; i !== l; i++) {
            slide = slides[i];
            if (slide.hasLayers) {
                slide.layerController.$layers.wrap('<div class="ms-scroll-parallax-cont"></div>');
                slide.$scrollParallaxCont = slide.layerController.$layers.parent();
            }
        }
        $(window).on('scroll', {
            that: this
        }, this.moveParallax).trigger('scroll');
    };
    p.resetLayers = function (e) {
        if (!this.lastSlide) {
            return;
        }
        var layers = this.lastSlide.$scrollParallaxCont;
        if (window._css2d) {
            if (layers) {
                layers[0].style[window._jcsspfx + 'Transform'] = '';
            }
            if (this.lastSlide.hasBG) {
                this.lastSlide.$imgcont[0].style[window._jcsspfx + 'Transform'] = '';
            }
        } else {
            if (layers) {
                layers[0].style.top = '';
            }
            if (this.lastSlide.hasBG) {
                this.lastSlide.$imgcont[0].style.top = '0px';
            }
        }
    };
    p.updateCurrentSlide = function (e) {
        this.lastSlide = this.currentSlide;
        this.currentSlide = this.slider.api.currentSlide;
        this.moveParallax({
            data: {
                that: this
            }
        });
    };
    p.moveParallax = function (e) {
        var that = e.data.that,
            slider = that.slider,
            offset = that.sliderOffset,
            scrollTop = $(window).scrollTop(),
            layers = that.currentSlide.$scrollParallaxCont,
            out = offset - scrollTop;
        if (out <= 0) {
            if (layers) {
                if (window._css3d) {
                    layers[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -out * that.parallax + 'px) translateZ(0.4px)';
                } else if (window._css2d) {
                    layers[0].style[window._jcsspfx + 'Transform'] = 'translateY(' + -out * that.parallax + 'px)';
                } else {
                    layers[0].style.top = -out * that.parallax + 'px';
                }
            }
            that.updateSlidesBG(-out * that.bgparallax + 'px', true);
            if (layers && that.fade) {
                layers.css('opacity', (1 - Math.min(1, -out / slider.api.height)));
            }
        } else {
            if (layers) {
                if (window._css2d) {
                    layers[0].style[window._jcsspfx + 'Transform'] = '';
                } else {
                    layers[0].style.top = '';
                }
            }
            that.updateSlidesBG('0px', false);
            if (layers && that.fade) {
                layers.css('opacity', 1);
            }
        }
    };
    p.updateSlidesBG = function (pos, fixed) {
        var slides = this.slider.api.view.slideList,
            position = (fixed && !$.browser.msie && !$.browser.opera ? 'fixed' : '');
        for (var i = 0, l = slides.length; i !== l; i++) {
            if (slides[i].hasBG) {
                slides[i].$imgcont[0].style.position = position;
                slides[i].$imgcont[0].style.top = pos;
            }
            if (slides[i].$bgvideocont) {
                slides[i].$bgvideocont[0].style.position = position;
                slides[i].$bgvideocont[0].style.top = pos;
            }
        }
    };
    p.destory = function () {
        slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
        slider.api.removeEventListener(MSSliderEvent.DESTROY, this.destory, this);
        slider.api.removeEventListener(MSSliderEvent.CHANGE_END, this.resetLayers, this);
        slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.updateCurrentSlide, this);
        $(window).off('scroll', this.moveParallax);
    };
})(jQuery);;
(function ($, document, window) {
    var PId = 0;
    if (!window.MasterSlider) {
        return;
    }
    var KeyboardNav = function (slider) {
        this.slider = slider;
        this.PId = PId++;
        if (this.slider.options.keyboard) {
            slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
        }
    };
    KeyboardNav.name = 'MSKeyboardNav';
    var p = KeyboardNav.prototype;
    p.init = function () {
        var api = this.slider.api;
        $(document).on('keydown.kbnav' + this.PId, function (event) {
            var which = event.which;
            if (which === 37 || which === 40) {
                api.previous(true);
            } else if (which === 38 || which === 39) {
                api.next(true);
            }
        });
    };
    p.destroy = function () {
        $(document).off('keydown.kbnav' + this.PId);
        this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
    };
    MasterSlider.registerPlugin(KeyboardNav);
})(jQuery, document, window);;
(function ($, document, window) {
    var PId = 0,
        $window = $(window),
        $doc = $(document);
    if (!window.MasterSlider) {
        return;
    }
    var StartOnAppear = function (slider) {
        this.PId = PId++;
        this.slider = slider;
        this.$slider = slider.$element;
        if (this.slider.options.startOnAppear) {
            slider.holdOn();
            $doc.ready($.proxy(this.init, this));
        }
    };
    StartOnAppear.name = 'MSStartOnAppear';
    var p = StartOnAppear.prototype;
    p.init = function () {
        var api = this.slider.api;
        $window.on('scroll.soa' + this.PId, $.proxy(this._onScroll, this)).trigger('scroll');
    };
    p._onScroll = function () {
        var vpBottom = $window.scrollTop() + $window.height(),
            top = this.$slider.offset().top;
        if (top < vpBottom) {
            $window.off('scroll.soa' + this.PId);
            this.slider.release();
        }
    };
    p.destroy = function () {};
    MasterSlider.registerPlugin(StartOnAppear);
})(jQuery, document, window);;
(function (document, window, jQuery) {
    var filterUnits = {
            'hue-rotate': 'deg',
            'blur': 'px'
        },
        initialValues = {
            'opacity': 1,
            'contrast': 1,
            'brightness': 1,
            'saturate': 1,
            'hue-rotate': 0,
            'invert': 0,
            'sepia': 0,
            'blur': 0,
            'grayscale': 0
        }
    if (!window.MasterSlider) {
        return;
    }
    var Filters = function (slider) {
        this.slider = slider;
        if (this.slider.options.filters) {
            slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
        }
    };
    Filters.name = 'MSFilters';
    var p = Filters.prototype;
    p.init = function () {
        var api = this.slider.api,
            view = api.view;
        this.filters = this.slider.options.filters;
        this.slideList = view.slideList;
        this.slidesCount = view.slidesCount;
        this.dimension = view[view.__dimension];
        this.target = this.slider.options.filterTarget === 'slide' ? '$element' : '$bg_img';
        this.filterName = $.browser.webkit ? 'WebkitFilter' : 'filter';
        var superFun = view.controller.__renderHook.fun,
            superRef = view.controller.__renderHook.ref;
        view.controller.renderCallback(function (controller, value) {
            superFun.call(superRef, controller, value);
            this.applyEffect(value);
        }, this);
        this.applyEffect(view.controller.value);
    };
    p.applyEffect = function (value) {
        var factor, slide;
        for (var i = 0; i < this.slidesCount; ++i) {
            slide = this.slideList[i];
            factor = Math.min(1, Math.abs(value - slide.position) / this.dimension);
            if (slide[this.target]) {
                if (!$.browser.msie) {
                    slide[this.target][0].style[this.filterName] = this.generateStyle(factor);
                } else if (this.filters.opacity != null) {
                    slide[this.target].opacity(1 - this.filters.opacity * factor);
                }
            }
        }
    };
    p.generateStyle = function (factor) {
        var style = '',
            unit;
        for (var filter in this.filters) {
            unit = filterUnits[filter] || '';
            style += filter + '(' + (initialValues[filter] + (this.filters[filter] - initialValues[filter]) * factor) + ') ';
        }
        return style;
    };
    p.destroy = function () {
        this.slider.api.removeEventListener(MSSliderEvent.INIT, this.init, this);
    };
    MasterSlider.registerPlugin(Filters);
})(document, window, jQuery);;
(function ($, document, window) {
    if (!window.MasterSlider) {
        return;
    }
    var ScrollToAction = function (slider) {
        this.slider = slider;
        slider.api.addEventListener(MSSliderEvent.INIT, this.init, this);
    };
    ScrollToAction.name = 'MSScrollToAction';
    var p = ScrollToAction.prototype;
    p.init = function () {
        var api = this.slider.api;
        api.scrollToEnd = _scrollToEnd;
        api.scrollTo = _scrollTo;
    };
    p.destroy = function () {};
    var _scrollTo = function (target, duration) {
        var sliderEle = this.slider.$element,
            target = $(target).eq(0);
        if (target.length === 0) {
            return;
        }
        console.log(target.offset().top, duration)
        if (duration == null) {
            duration = 1.4;
        }
        $('html, body').animate({
            scrollTop: target.offset().top
        }, duration * 1000, 'easeInOutQuad');
    };
    var _scrollToEnd = function (duration) {
        var sliderEle = this.slider.$element;
        if (duration == null) {
            duration = 1.4;
        }
        $('html, body').animate({
            scrollTop: sliderEle.offset().top + sliderEle.outerHeight(false)
        }, duration * 1000, 'easeInOutQuad');
    }
    MasterSlider.registerPlugin(ScrollToAction);
})(jQuery, document, window);;
(function ($, window, document, undefined) {
    "use strict";
    if (window.MSReady) {
        for (var i = 0, l = MSReady.length; i !== l; i++) {
            MSReady[i].call(null, $);
        }
    }
})(jQuery, window, document);
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
        url: '/cart/' + product_id,
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
                    html += '   <iframe src="/miniProduct&product_id=' + product_id + '&popup=options&product_quantity=' + quantity + '&' + (quick_buy ? 'quick_buy=true' : '') + '" width="100%" height="100%" frameborder="0" onload="this.height = this.contentWindow.document.body.offsetHeight; $(this).prev(\'.journal-loading\').fadeOut();"></iframe>';
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
$('script[type="text/javascript/defer"]').each(function () {
    $(this).after($('<script type="text/javascript"/>').text($(this).clone().text())).remove()
});
