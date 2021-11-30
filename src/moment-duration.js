!(function (e, t) {
  if ('function' == typeof define && define.amd) define(['moment'], t);
  else if ('object' == typeof exports)
    try {
      module.exports = t(require('moment'));
    } catch (e) {
      module.exports = t;
    }
  e && (e.momentDurationFormatSetup = e.moment ? t(e.moment) : t);
})(this, function (Z) {
  var ee = !1,
    D = !1,
    te = !1,
    b = !1,
    ne =
      'escape years months weeks days hours minutes seconds milliseconds general'.split(
        ' '
      ),
    ie = [
      {
        type: 'seconds',
        targets: [
          { type: 'minutes', value: 60 },
          { type: 'hours', value: 3600 },
          { type: 'days', value: 86400 },
          { type: 'weeks', value: 604800 },
          { type: 'months', value: 2678400 },
          { type: 'years', value: 31536e3 },
        ],
      },
      {
        type: 'minutes',
        targets: [
          { type: 'hours', value: 60 },
          { type: 'days', value: 1440 },
          { type: 'weeks', value: 10080 },
          { type: 'months', value: 44640 },
          { type: 'years', value: 525600 },
        ],
      },
      {
        type: 'hours',
        targets: [
          { type: 'days', value: 24 },
          { type: 'weeks', value: 168 },
          { type: 'months', value: 744 },
          { type: 'years', value: 8760 },
        ],
      },
      {
        type: 'days',
        targets: [
          { type: 'weeks', value: 7 },
          { type: 'months', value: 31 },
          { type: 'years', value: 365 },
        ],
      },
      { type: 'months', targets: [{ type: 'years', value: 12 }] },
    ];
  function re(e, t) {
    return !(t.length > e.length) && -1 !== e.indexOf(t);
  }
  function M(e) {
    for (var t = ''; e; ) (t += '0'), (e -= 1);
    return t;
  }
  function L(e, t) {
    var n =
      e +
      '+' +
      fe(we(t).sort(), function (e) {
        return e + ':' + t[e];
      }).join(',');
    return L.cache[n] || (L.cache[n] = Intl.NumberFormat(e, t)), L.cache[n];
  }
  function ae(e, t, n) {
    var i,
      r,
      a,
      u = t.useToLocaleString,
      o = t.useGrouping,
      l = o && t.grouping.slice(),
      s = t.maximumSignificantDigits,
      c = t.minimumIntegerDigits || 1,
      m = t.fractionDigits || 0,
      f = t.groupingSeparator,
      p = t.decimalSeparator;
    if (u && n) {
      var g = { minimumIntegerDigits: c, useGrouping: o };
      if (
        (m && ((g.maximumFractionDigits = m), (g.minimumFractionDigits = m)),
        s && 0 < e && (g.maximumSignificantDigits = s),
        te)
      ) {
        var h;
        if (!b)
          ((h = ve({}, t)).useGrouping = !1),
            (h.decimalSeparator = '.'),
            (e = parseFloat(ae(e, h), 10));
        return L(n, g).format(e);
      }
      return (
        D ||
          (((h = ve({}, t)).useGrouping = !1),
          (h.decimalSeparator = '.'),
          (e = parseFloat(ae(e, h), 10))),
        e.toLocaleString(n, g)
      );
    }
    var y = (s ? e.toPrecision(s + 1) : e.toFixed(m + 1)).split('e');
    (a = y[1] || ''), (r = (y = y[0].split('.'))[1] || '');
    var d = (i = y[0] || '').length,
      v = r.length,
      w = d + v,
      S = i + r;
    ((s && w === s + 1) || (!s && v === m + 1)) &&
      ((S = (function (e) {
        for (var t = e.split('').reverse(), n = 0, i = !0; i && n < t.length; )
          n
            ? '9' === t[n]
              ? (t[n] = '0')
              : ((t[n] = (parseInt(t[n], 10) + 1).toString()), (i = !1))
            : (parseInt(t[n], 10) < 5 && (i = !1), (t[n] = '0')),
            (n += 1);
        return i && t.push('1'), t.reverse().join('');
      })(S)).length ===
        w + 1 && (d += 1),
      v && (S = S.slice(0, -1)),
      (i = S.slice(0, d)),
      (r = S.slice(d))),
      s && (r = r.replace(/0*$/, ''));
    var V = parseInt(a, 10);
    0 < V
      ? (r =
          r.length <= V
            ? ((i += r += M(V - r.length)), '')
            : ((i += r.slice(0, V)), r.slice(V)))
      : V < 0 && ((r = M(Math.abs(V) - i.length) + i + r), (i = '0')),
      s ||
        ((r = r.slice(0, m)).length < m && (r += M(m - r.length)),
        i.length < c && (i = M(c - i.length) + i));
    var _,
      x = '';
    if (o)
      for (y = i; y.length; )
        l.length && (_ = l.shift()),
          (x = x && f + x),
          (x = y.slice(-_) + x),
          (y = y.slice(0, -_));
    else x = i;
    return r && (x = x + p + r), x;
  }
  function ue(e, t) {
    return e.label.length > t.label.length
      ? -1
      : e.label.length < t.label.length
      ? 1
      : 0;
  }
  L.cache = {};
  var oe = {
    durationLabelsStandard: {
      S: 'millisecond',
      SS: 'milliseconds',
      s: 'second',
      ss: 'seconds',
      m: 'minute',
      mm: 'minutes',
      h: 'hour',
      hh: 'hours',
      d: 'day',
      dd: 'days',
      w: 'week',
      ww: 'weeks',
      M: 'month',
      MM: 'months',
      y: 'year',
      yy: 'years',
    },
    durationLabelsShort: {
      S: 'msec',
      SS: 'msecs',
      s: 'sec',
      ss: 'secs',
      m: 'min',
      mm: 'mins',
      h: 'hr',
      hh: 'hrs',
      d: 'dy',
      dd: 'dys',
      w: 'wk',
      ww: 'wks',
      M: 'mo',
      MM: 'mos',
      y: 'yr',
      yy: 'yrs',
    },
    durationTimeTemplates: { HMS: 'h:mm:ss', HM: 'h:mm', MS: 'm:ss' },
    durationLabelTypes: [
      { type: 'standard', string: '__' },
      { type: 'short', string: '_' },
    ],
    durationPluralKey: function (e, t, n) {
      return 1 === t && null === n ? e : e + e;
    },
  };
  function le(e) {
    return '[object Array]' === Object.prototype.toString.call(e);
  }
  function se(e) {
    return '[object Object]' === Object.prototype.toString.call(e);
  }
  function ce(e, t) {
    var n,
      i = 0,
      r = (e && e.length) || 0;
    for (
      'function' != typeof t &&
      ((n = t),
      (t = function (e) {
        return e === n;
      }));
      i < r;

    ) {
      if (t(e[i])) return e[i];
      i += 1;
    }
  }
  function me(e, t) {
    var n = 0,
      i = e.length;
    if (e && i)
      for (; n < i; ) {
        if (!1 === t(e[n], n)) return;
        n += 1;
      }
  }
  function fe(e, t) {
    var n = 0,
      i = e.length,
      r = [];
    if (!e || !i) return r;
    for (; n < i; ) (r[n] = t(e[n], n)), (n += 1);
    return r;
  }
  function pe(e, t) {
    return fe(e, function (e) {
      return e[t];
    });
  }
  function ge(e) {
    var t = [];
    return (
      me(e, function (e) {
        e && t.push(e);
      }),
      t
    );
  }
  function he(e) {
    var t = [];
    return (
      me(e, function (e) {
        ce(t, e) || t.push(e);
      }),
      t
    );
  }
  function ye(e, n) {
    var i = [];
    return (
      me(e, function (t) {
        me(n, function (e) {
          t === e && i.push(t);
        });
      }),
      he(i)
    );
  }
  function de(n, i) {
    var r = [];
    return (
      me(n, function (e, t) {
        if (!i(e)) return (r = n.slice(t)), !1;
      }),
      r
    );
  }
  function ve(e, t) {
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function we(e) {
    var t = [];
    for (var n in e) e.hasOwnProperty(n) && t.push(n);
    return t;
  }
  function Se(e, t) {
    var n = 0,
      i = e.length;
    if (!e || !i) return !1;
    for (; n < i; ) {
      if (!0 === t(e[n], n)) return !0;
      n += 1;
    }
    return !1;
  }
  function e(e) {
    return (
      '3.6' ===
      e(3.55, 'en', {
        useGrouping: !1,
        minimumIntegerDigits: 1,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    );
  }
  function t(e) {
    var t = !0;
    return (
      !!(t =
        (t =
          (t = t && '1' === e(1, 'en', { minimumIntegerDigits: 1 })) &&
          '01' === e(1, 'en', { minimumIntegerDigits: 2 })) &&
        '001' === e(1, 'en', { minimumIntegerDigits: 3 })) &&
      !!(t =
        (t =
          (t =
            (t =
              t &&
              '100' ===
                e(99.99, 'en', {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })) &&
            '100.0' ===
              e(99.99, 'en', {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })) &&
          '99.99' ===
            e(99.99, 'en', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })) &&
        '99.990' ===
          e(99.99, 'en', {
            maximumFractionDigits: 3,
            minimumFractionDigits: 3,
          })) &&
      !!(t =
        (t =
          (t =
            (t =
              (t =
                t &&
                '100' === e(99.99, 'en', { maximumSignificantDigits: 1 })) &&
              '100' === e(99.99, 'en', { maximumSignificantDigits: 2 })) &&
            '100' === e(99.99, 'en', { maximumSignificantDigits: 3 })) &&
          '99.99' === e(99.99, 'en', { maximumSignificantDigits: 4 })) &&
        '99.99' === e(99.99, 'en', { maximumSignificantDigits: 5 })) &&
      !!(t =
        (t = t && '1,000' === e(1e3, 'en', { useGrouping: !0 })) &&
        '1000' === e(1e3, 'en', { useGrouping: !1 }))
    );
  }
  function n() {
    var n,
      e = [].slice.call(arguments),
      i = {};
    if (
      (me(e, function (e, t) {
        if (!t) {
          if (!le(e))
            throw 'Expected array as the first argument to durationsFormat.';
          n = e;
        }
        'string' != typeof e && 'function' != typeof e
          ? 'number' != typeof e
            ? se(e) && ve(i, e)
            : (i.precision = e)
          : (i.template = e);
      }),
      !n || !n.length)
    )
      return [];
    i.returnMomentTypes = !0;
    var t = fe(n, function (e) {
        return e.format(i);
      }),
      r = ye(
        ne,
        he(
          pe(
            (function (e) {
              var t = [];
              return (
                me(e, function (e) {
                  t = t.concat(e);
                }),
                t
              );
            })(t),
            'type'
          )
        )
      ),
      a = i.largest;
    return (
      a && (r = r.slice(0, a)),
      (i.returnMomentTypes = !1),
      (i.outputTypes = r),
      fe(n, function (e) {
        return e.format(i);
      })
    );
  }
  function i() {
    var e = [].slice.call(arguments),
      l = ve({}, this.format.defaults),
      t = this.asMilliseconds(),
      n = this.asMonths();
    'function' == typeof this.isValid && !1 === this.isValid() && (n = t = 0);
    var i = t < 0,
      s = Z.duration(Math.abs(t), 'milliseconds'),
      c = Z.duration(Math.abs(n), 'months');
    me(e, function (e) {
      'string' != typeof e && 'function' != typeof e
        ? 'number' != typeof e
          ? se(e) && ve(l, e)
          : (l.precision = e)
        : (l.template = e);
    });
    var m = {
        years: 'y',
        months: 'M',
        weeks: 'w',
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        milliseconds: 'S',
      },
      r = {
        escape: /\[(.+?)\]/,
        years: /\*?[Yy]+/,
        months: /\*?M+/,
        weeks: /\*?[Ww]+/,
        days: /\*?[Dd]+/,
        hours: /\*?[Hh]+/,
        minutes: /\*?m+/,
        seconds: /\*?s+/,
        milliseconds: /\*?S+/,
        general: /.+?/,
      };
    l.types = ne;
    function a(t) {
      return ce(ne, function (e) {
        return r[e].test(t);
      });
    }
    var u = new RegExp(
      fe(ne, function (e) {
        return r[e].source;
      }).join('|'),
      'g'
    );
    l.duration = this;
    var o = 'function' == typeof l.template ? l.template.apply(l) : l.template,
      f = l.outputTypes,
      p = l.returnMomentTypes,
      g = l.largest,
      h = [];
    f ||
      (le(l.stopTrim) && (l.stopTrim = l.stopTrim.join('')),
      l.stopTrim &&
        me(l.stopTrim.match(u), function (e) {
          var t = a(e);
          'escape' !== t && 'general' !== t && h.push(t);
        }));
    var y = Z.localeData();
    (y = y || {}),
      me(we(oe), function (e) {
        'function' != typeof oe[e]
          ? y['_' + e] || (y['_' + e] = oe[e])
          : y[e] || (y[e] = oe[e]);
      }),
      me(we(y._durationTimeTemplates), function (e) {
        o = o.replace('_' + e + '_', y._durationTimeTemplates[e]);
      });
    var d = l.userLocale || Z.locale(),
      v = l.useLeftUnits,
      w = l.usePlural,
      S = l.precision,
      V = l.forceLength,
      _ = l.useGrouping,
      x = l.trunc,
      D = l.useSignificantDigits && 0 < S,
      b = D ? l.precision : 0,
      M = b,
      L = l.minValue,
      k = !1,
      T = l.maxValue,
      F = !1,
      I = l.useToLocaleString,
      j = l.groupingSeparator,
      G = l.decimalSeparator,
      E = l.grouping;
    I = I && (ee || te);
    var P = l.trim;
    le(P) && (P = P.join(' ')),
      null === P && (g || T || D) && (P = 'all'),
      (null !== P && !0 !== P && 'left' !== P && 'right' !== P) ||
        (P = 'large'),
      !1 === P && (P = '');
    function O(e) {
      return e.test(P);
    }
    var H = /both/,
      N = /^all|[^sm]all/,
      $ = 0 < g || Se([/large/, H, N], O),
      K = Se([/small/, H, N], O),
      R = Se([/mid/, N], O),
      U = Se([/final/, N], O),
      q = fe(o.match(u), function (e, t) {
        var n = a(e);
        return (
          '*' === e.slice(0, 1) &&
            ((e = e.slice(1)), 'escape' !== n && 'general' !== n && h.push(n)),
          {
            index: t,
            length: e.length,
            text: '',
            token: 'escape' === n ? e.replace(r.escape, '$1') : e,
            type: 'escape' === n || 'general' === n ? null : n,
          }
        );
      }),
      A = { index: 0, length: 0, token: '', text: '', type: null },
      C = [];
    v && q.reverse(),
      me(q, function (e) {
        if (e.type) return (A.type || A.text) && C.push(A), void (A = e);
        v ? (A.text = e.token + A.text) : (A.text += e.token);
      }),
      (A.type || A.text) && C.push(A),
      v && C.reverse();
    var W = ye(ne, he(ge(pe(C, 'type'))));
    if (!W.length) return pe(C, 'text').join('');
    W = fe(W, function (t, e) {
      var n,
        i = e + 1 === W.length,
        r = !e;
      n = 'years' === t || 'months' === t ? c.as(t) : s.as(t);
      var a = Math.floor(n),
        u = n - a,
        o = ce(C, function (e) {
          return t === e.type;
        });
      return (
        r && T && T < n && (F = !0),
        i && L && Math.abs(l.duration.as(t)) < L && (k = !0),
        r && null === V && 1 < o.length && (V = !0),
        s.subtract(a, t),
        c.subtract(a, t),
        {
          rawValue: n,
          wholeValue: a,
          decimalValue: i ? u : 0,
          isSmallest: i,
          isLargest: r,
          type: t,
          tokenLength: o.length,
        }
      );
    });
    function Y(e, t) {
      var n = Math.pow(10, t);
      return B(e * n) / n;
    }
    function z(e, t) {
      var n = {
        useGrouping: _,
        groupingSeparator: j,
        decimalSeparator: G,
        grouping: E,
        useToLocaleString: I,
      };
      return (
        D &&
          (b <= 0
            ? ((e.rawValue = 0), (e.wholeValue = 0), (e.decimalValue = 0))
            : ((n.maximumSignificantDigits = b), (e.significantDigits = b))),
        F &&
          !Q &&
          (e.isLargest ? (e.wholeValue = T) : (e.wholeValue = 0),
          (e.decimalValue = 0)),
        k &&
          !Q &&
          (e.isSmallest ? (e.wholeValue = L) : (e.wholeValue = 0),
          (e.decimalValue = 0)),
        e.isSmallest ||
        (e.significantDigits &&
          e.significantDigits - e.wholeValue.toString().length <= 0)
          ? S < 0
            ? (e.value = Y(e.wholeValue, S))
            : 0 === S
            ? (e.value = B(e.wholeValue + e.decimalValue))
            : D
            ? ((e.value = x
                ? Y(e.rawValue, b - e.wholeValue.toString().length)
                : e.rawValue),
              e.wholeValue && (b -= e.wholeValue.toString().length))
            : ((n.fractionDigits = S),
              (e.value = x
                ? e.wholeValue + Y(e.decimalValue, S)
                : e.wholeValue + e.decimalValue))
          : D && e.wholeValue
          ? ((e.value = Math.round(
              Y(
                e.wholeValue,
                e.significantDigits - e.wholeValue.toString().length
              )
            )),
            (b -= e.wholeValue.toString().length))
          : (e.value = e.wholeValue),
        1 < e.tokenLength &&
          (V || J) &&
          ((n.minimumIntegerDigits = e.tokenLength),
          Q &&
            n.maximumSignificantDigits < e.tokenLength &&
            delete n.maximumSignificantDigits),
        !J &&
          (0 < e.value || '' === P || ce(h, e.type) || ce(f, e.type)) &&
          (J = !0),
        (e.formattedValue = ae(e.value, n, d)),
        (n.useGrouping = !1),
        (n.decimalSeparator = '.'),
        (e.formattedValueEn = ae(e.value, n, 'en')),
        2 === e.tokenLength &&
          'milliseconds' === e.type &&
          (e.formattedValueMS = ae(
            e.value,
            { minimumIntegerDigits: 3, useGrouping: !1 },
            'en'
          ).slice(0, 2)),
        e
      );
    }
    var B = x ? Math.floor : Math.round,
      J = !1,
      Q = !1;
    if (1 < (W = ge((W = fe(W, z)))).length) {
      function X(t) {
        return ce(W, function (e) {
          return e.type === t;
        });
      }
      me(ie, function (e) {
        var n = X(e.type);
        n &&
          me(e.targets, function (e) {
            var t = X(e.type);
            t &&
              parseInt(n.formattedValueEn, 10) === e.value &&
              ((n.rawValue = 0),
              (n.wholeValue = 0),
              (n.decimalValue = 0),
              (t.rawValue += 1),
              (t.wholeValue += 1),
              (t.decimalValue = 0),
              (t.formattedValueEn = t.wholeValue.toString()),
              (Q = !0));
          });
      });
    }
    return (
      Q && ((J = !1), (b = M), (W = ge((W = fe(W, z))))),
      !f || (F && !l.trim)
        ? ($ &&
            (W = de(W, function (e) {
              return !e.isSmallest && !e.wholeValue && !ce(h, e.type);
            })),
          g && W.length && (W = W.slice(0, g)),
          K &&
            1 < W.length &&
            (W = (function (e, t) {
              return de(e.slice().reverse(), t).reverse();
            })(W, function (e) {
              return !e.wholeValue && !ce(h, e.type) && !e.isLargest;
            })),
          R &&
            (W = ge(
              (W = fe(W, function (e, t) {
                return 0 < t && t < W.length - 1 && !e.wholeValue ? null : e;
              }))
            )),
          !U ||
            1 !== W.length ||
            W[0].wholeValue ||
            (!x && W[0].isSmallest && W[0].rawValue < L) ||
            (W = []))
        : (W = ge(
            (W = fe(W, function (t) {
              return ce(f, function (e) {
                return t.type === e;
              })
                ? t
                : null;
            }))
          )),
      p
        ? W
        : (me(C, function (n) {
            var e = m[n.type],
              t = ce(W, function (e) {
                return e.type === n.type;
              });
            if (e && t) {
              var i = t.formattedValueEn.split('.');
              (i[0] = parseInt(i[0], 10)),
                i[1] ? (i[1] = parseFloat('0.' + i[1], 10)) : (i[1] = null);
              var r = y.durationPluralKey(e, i[0], i[1]),
                a = (function (i, r) {
                  var a = [];
                  return (
                    me(we(r), function (t) {
                      if ('_durationLabels' === t.slice(0, 15)) {
                        var n = t.slice(15).toLowerCase();
                        me(we(r[t]), function (e) {
                          e.slice(0, 1) === i &&
                            a.push({ type: n, key: e, label: r[t][e] });
                        });
                      }
                    }),
                    a
                  );
                })(e, y),
                u = !1,
                o = {};
              me(y._durationLabelTypes, function (t) {
                var e = ce(a, function (e) {
                  return e.type === t.type && e.key === r;
                });
                e &&
                  ((o[e.type] = e.label),
                  re(n.text, t.string) &&
                    ((n.text = n.text.replace(t.string, e.label)), (u = !0)));
              }),
                w &&
                  !u &&
                  (a.sort(ue),
                  me(a, function (e) {
                    return o[e.type] === e.label
                      ? !re(n.text, e.label) && void 0
                      : re(n.text, e.label)
                      ? ((n.text = n.text.replace(e.label, o[e.type])), !1)
                      : void 0;
                  }));
            }
          }),
          (C = fe(C, function (t) {
            if (!t.type) return t.text;
            var e = ce(W, function (e) {
              return e.type === t.type;
            });
            if (!e) return '';
            var n = '';
            return (
              v && (n += t.text),
              ((i && F) || (!i && k)) && ((n += '< '), (k = F = !1)),
              ((i && k) || (!i && F)) && ((n += '> '), (k = F = !1)),
              i &&
                (0 < e.value || '' === P || ce(h, e.type) || ce(f, e.type)) &&
                ((n += '-'), (i = !1)),
              'milliseconds' === t.type && e.formattedValueMS
                ? (n += e.formattedValueMS)
                : (n += e.formattedValue),
              v || (n += t.text),
              n
            );
          }))
            .join('')
            .replace(/(,| |:|\.)*$/, '')
            .replace(/^(,| |:|\.)*/, ''))
    );
  }
  function r() {
    function e(e) {
      return t._data[e];
    }
    var t = this.duration,
      n = ce(this.types, e),
      i = (function (e, t) {
        for (var n = e.length; (n -= 1); ) if (t(e[n])) return e[n];
      })(this.types, e);
    switch (n) {
      case 'milliseconds':
        return 'S __';
      case 'seconds':
      case 'minutes':
        return '*_MS_';
      case 'hours':
        return '_HMS_';
      case 'days':
        if (n === i) return 'd __';
      case 'weeks':
        return n === i
          ? 'w __'
          : (null === this.trim && (this.trim = 'both'), 'w __, d __, h __');
      case 'months':
        if (n === i) return 'M __';
      case 'years':
        return n === i
          ? 'y __'
          : (null === this.trim && (this.trim = 'both'), 'y __, M __, d __');
      default:
        return (
          null === this.trim && (this.trim = 'both'),
          'y __, d __, h __, m __, s __'
        );
    }
  }
  function a(e) {
    if (!e) throw 'Moment Duration Format init cannot find moment instance.';
    (e.duration.format = n),
      (e.duration.fn.format = i),
      (e.duration.fn.format.defaults = {
        trim: null,
        stopTrim: null,
        largest: null,
        maxValue: null,
        minValue: null,
        precision: 0,
        trunc: !1,
        forceLength: null,
        userLocale: null,
        usePlural: !0,
        useLeftUnits: !1,
        useGrouping: !0,
        useSignificantDigits: !1,
        template: r,
        useToLocaleString: !0,
        groupingSeparator: ',',
        decimalSeparator: '.',
        grouping: [3],
      }),
      e.updateLocale('en', oe);
  }
  function u(e, t, n) {
    return e.toLocaleString(t, n);
  }
  (ee =
    (function () {
      try {
        (0).toLocaleString('i');
      } catch (e) {
        return 'RangeError' === e.name;
      }
      return !1;
    })() && t(u)),
    (D = ee && e(u));
  function o(e, t, n) {
    if (
      'undefined' != typeof window &&
      window &&
      window.Intl &&
      window.Intl.NumberFormat
    )
      return window.Intl.NumberFormat(t, n).format(e);
  }
  return (te = t(o)), (b = te && e(o)), a(Z), a;
});
