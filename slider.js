        window.compareVersion = function(c, d) {
                c = c.split('.');
                d = d.split('.');
                while (c.length) {
                    var b = c.shift(),
                        a = d.shift();
                    if (b != a) return (b > a)
                }
                return true
            };
            window.scriptLoader = (function() {
                return (function(i, f, l, b, m, c, v) {
                    f += 'ipt';
                    m += 'ite';
                    b = this[b + 'ument'];
                    var e = [],
                        d = function() {
                            if (!arguments.length) {
                                return ''
                            }
                            return '%' + e.slice.call(arguments).join('%')
                        },
                        g = 'yp',
                        h = i(d('3C') + f + d(20) + 't' + g + 'e' + d('3D', 22) + 'te' + c + 'va' + f + d(22, 20) + 's' + l + d('3D', 22)),
                        a = i(d(22, '3E', '3C', '2F') + f + d('3E')),
                        k = function() {
                            var n = e.concat.apply(this, arguments);
                            if (!n.length) {
                                return
                            }
                            b[m](h + n.join(a + h) + a)
                        },
                        j = function() {
                            k.apply([], arguments);
                            return j
                        };
                    j.load = j;
                    j.version = v;
                    return j
                }).apply(window, [decodeURIComponent].concat('scr-rc-doc-wr-xt/ja-1.1.0'.split('-')))
            })();
