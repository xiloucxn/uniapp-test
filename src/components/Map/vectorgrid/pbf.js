!(function (t) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).Pbf = t();
  }
})(function () {
  return (function n(o, h, a) {
    function u(i, t) {
      if (!h[i]) {
        if (!o[i]) {
          var e = "function" == typeof require && require;
          if (!t && e) return e(i, !0);
          if (f) return f(i, !0);
          var r = new Error("Cannot find module '" + i + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        var s = (h[i] = { exports: {} });
        o[i][0].call(
          s.exports,
          function (t) {
            return u(o[i][1][t] || t);
          },
          s,
          s.exports,
          n,
          o,
          h,
          a,
        );
      }
      return h[i].exports;
    }
    for (
      var f = "function" == typeof require && require, t = 0;
      t < a.length;
      t++
    )
      u(a[t]);
    return u;
  })(
    {
      1: [
        function (t, i, e) {
          "use strict";
          i.exports = s;
          var r = t("ieee754");
          function s(t) {
            (this.buf =
              ArrayBuffer.isView && ArrayBuffer.isView(t)
                ? t
                : new Uint8Array(t || 0)),
              (this.pos = 0),
              (this.type = 0),
              (this.length = this.buf.length);
          }
          (s.Varint = 0), (s.Fixed64 = 1), (s.Bytes = 2), (s.Fixed32 = 5);
          var n = 4294967296,
            o = 1 / n,
            h =
              "undefined" == typeof TextDecoder
                ? null
                : new TextDecoder("utf8");
          function a(t) {
            return t.type === s.Bytes ? t.readVarint() + t.pos : t.pos + 1;
          }
          function u(t, i, e) {
            return e
              ? 4294967296 * i + (t >>> 0)
              : 4294967296 * (i >>> 0) + (t >>> 0);
          }
          function f(t, i, e) {
            var r =
              i <= 16383
                ? 1
                : i <= 2097151
                ? 2
                : i <= 268435455
                ? 3
                : Math.floor(Math.log(i) / (7 * Math.LN2));
            e.realloc(r);
            for (var s = e.pos - 1; t <= s; s--) e.buf[s + r] = e.buf[s];
          }
          function d(t, i) {
            for (var e = 0; e < t.length; e++) i.writeVarint(t[e]);
          }
          function p(t, i) {
            for (var e = 0; e < t.length; e++) i.writeSVarint(t[e]);
          }
          function l(t, i) {
            for (var e = 0; e < t.length; e++) i.writeFloat(t[e]);
          }
          function c(t, i) {
            for (var e = 0; e < t.length; e++) i.writeDouble(t[e]);
          }
          function w(t, i) {
            for (var e = 0; e < t.length; e++) i.writeBoolean(t[e]);
          }
          function F(t, i) {
            for (var e = 0; e < t.length; e++) i.writeFixed32(t[e]);
          }
          function b(t, i) {
            for (var e = 0; e < t.length; e++) i.writeSFixed32(t[e]);
          }
          function g(t, i) {
            for (var e = 0; e < t.length; e++) i.writeFixed64(t[e]);
          }
          function x(t, i) {
            for (var e = 0; e < t.length; e++) i.writeSFixed64(t[e]);
          }
          function v(t, i) {
            return (
              (t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)) + 16777216 * t[i + 3]
            );
          }
          function y(t, i, e) {
            (t[e] = i),
              (t[e + 1] = i >>> 8),
              (t[e + 2] = i >>> 16),
              (t[e + 3] = i >>> 24);
          }
          function V(t, i) {
            return (
              (t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)) + (t[i + 3] << 24)
            );
          }
          s.prototype = {
            destroy: function () {
              this.buf = null;
            },
            readFields: function (t, i, e) {
              for (e = e || this.length; this.pos < e; ) {
                var r = this.readVarint(),
                  s = r >> 3,
                  n = this.pos;
                (this.type = 7 & r),
                  t(s, i, this),
                  this.pos === n && this.skip(r);
              }
              return i;
            },
            readMessage: function (t, i) {
              return this.readFields(t, i, this.readVarint() + this.pos);
            },
            readFixed32: function () {
              var t = v(this.buf, this.pos);
              return (this.pos += 4), t;
            },
            readSFixed32: function () {
              var t = V(this.buf, this.pos);
              return (this.pos += 4), t;
            },
            readFixed64: function () {
              var t = v(this.buf, this.pos) + v(this.buf, this.pos + 4) * n;
              return (this.pos += 8), t;
            },
            readSFixed64: function () {
              var t = v(this.buf, this.pos) + V(this.buf, this.pos + 4) * n;
              return (this.pos += 8), t;
            },
            readFloat: function () {
              var t = r.read(this.buf, this.pos, !0, 23, 4);
              return (this.pos += 4), t;
            },
            readDouble: function () {
              var t = r.read(this.buf, this.pos, !0, 52, 8);
              return (this.pos += 8), t;
            },
            readVarint: function (t) {
              var i,
                e,
                r = this.buf;
              return (
                (i = 127 & (e = r[this.pos++])),
                e < 128
                  ? i
                  : ((i |= (127 & (e = r[this.pos++])) << 7),
                    e < 128
                      ? i
                      : ((i |= (127 & (e = r[this.pos++])) << 14),
                        e < 128
                          ? i
                          : ((i |= (127 & (e = r[this.pos++])) << 21),
                            e < 128
                              ? i
                              : (function (t, i, e) {
                                  var r,
                                    s,
                                    n = e.buf;
                                  if (
                                    ((s = n[e.pos++]),
                                    (r = (112 & s) >> 4),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  if (
                                    ((s = n[e.pos++]),
                                    (r |= (127 & s) << 3),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  if (
                                    ((s = n[e.pos++]),
                                    (r |= (127 & s) << 10),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  if (
                                    ((s = n[e.pos++]),
                                    (r |= (127 & s) << 17),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  if (
                                    ((s = n[e.pos++]),
                                    (r |= (127 & s) << 24),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  if (
                                    ((s = n[e.pos++]),
                                    (r |= (1 & s) << 31),
                                    s < 128)
                                  )
                                    return u(t, r, i);
                                  throw new Error(
                                    "Expected varint not more than 10 bytes",
                                  );
                                })(
                                  (i |= (15 & (e = r[this.pos])) << 28),
                                  t,
                                  this,
                                ))))
              );
            },
            readVarint64: function () {
              return this.readVarint(!0);
            },
            readSVarint: function () {
              var t = this.readVarint();
              return t % 2 == 1 ? (t + 1) / -2 : t / 2;
            },
            readBoolean: function () {
              return Boolean(this.readVarint());
            },
            readString: function () {
              var t = this.readVarint() + this.pos,
                i = this.pos;
              return 12 <= (this.pos = t) - i && h
                ? (function (t, i, e) {
                    return h.decode(t.subarray(i, e));
                  })(this.buf, i, t)
                : (function (t, i, e) {
                    var r = "",
                      s = i;
                    for (; s < e; ) {
                      var n,
                        o,
                        h,
                        a = t[s],
                        u = null,
                        f = 239 < a ? 4 : 223 < a ? 3 : 191 < a ? 2 : 1;
                      if (e < s + f) break;
                      1 === f
                        ? a < 128 && (u = a)
                        : 2 === f
                        ? 128 == (192 & (n = t[s + 1])) &&
                          (u = ((31 & a) << 6) | (63 & n)) <= 127 &&
                          (u = null)
                        : 3 === f
                        ? ((n = t[s + 1]),
                          (o = t[s + 2]),
                          128 == (192 & n) &&
                            128 == (192 & o) &&
                            ((u =
                              ((15 & a) << 12) | ((63 & n) << 6) | (63 & o)) <=
                              2047 ||
                              (55296 <= u && u <= 57343)) &&
                            (u = null))
                        : 4 === f &&
                          ((n = t[s + 1]),
                          (o = t[s + 2]),
                          (h = t[s + 3]),
                          128 == (192 & n) &&
                            128 == (192 & o) &&
                            128 == (192 & h) &&
                            ((u =
                              ((15 & a) << 18) |
                              ((63 & n) << 12) |
                              ((63 & o) << 6) |
                              (63 & h)) <= 65535 ||
                              1114112 <= u) &&
                            (u = null)),
                        null === u
                          ? ((u = 65533), (f = 1))
                          : 65535 < u &&
                            ((u -= 65536),
                            (r += String.fromCharCode(
                              ((u >>> 10) & 1023) | 55296,
                            )),
                            (u = 56320 | (1023 & u))),
                        (r += String.fromCharCode(u)),
                        (s += f);
                    }
                    return r;
                  })(this.buf, i, t);
            },
            readBytes: function () {
              var t = this.readVarint() + this.pos,
                i = this.buf.subarray(this.pos, t);
              return (this.pos = t), i;
            },
            readPackedVarint: function (t, i) {
              if (this.type !== s.Bytes) return t.push(this.readVarint(i));
              var e = a(this);
              for (t = t || []; this.pos < e; ) t.push(this.readVarint(i));
              return t;
            },
            readPackedSVarint: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readSVarint());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readSVarint());
              return t;
            },
            readPackedBoolean: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readBoolean());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readBoolean());
              return t;
            },
            readPackedFloat: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readFloat());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readFloat());
              return t;
            },
            readPackedDouble: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readDouble());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readDouble());
              return t;
            },
            readPackedFixed32: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readFixed32());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readFixed32());
              return t;
            },
            readPackedSFixed32: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readSFixed32());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readSFixed32());
              return t;
            },
            readPackedFixed64: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readFixed64());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readFixed64());
              return t;
            },
            readPackedSFixed64: function (t) {
              if (this.type !== s.Bytes) return t.push(this.readSFixed64());
              var i = a(this);
              for (t = t || []; this.pos < i; ) t.push(this.readSFixed64());
              return t;
            },
            skip: function (t) {
              var i = 7 & t;
              if (i === s.Varint) for (; 127 < this.buf[this.pos++]; );
              else if (i === s.Bytes) this.pos = this.readVarint() + this.pos;
              else if (i === s.Fixed32) this.pos += 4;
              else {
                if (i !== s.Fixed64)
                  throw new Error("Unimplemented type: " + i);
                this.pos += 8;
              }
            },
            writeTag: function (t, i) {
              this.writeVarint((t << 3) | i);
            },
            realloc: function (t) {
              for (var i = this.length || 16; i < this.pos + t; ) i *= 2;
              if (i !== this.length) {
                var e = new Uint8Array(i);
                e.set(this.buf), (this.buf = e), (this.length = i);
              }
            },
            finish: function () {
              return (
                (this.length = this.pos),
                (this.pos = 0),
                this.buf.subarray(0, this.length)
              );
            },
            writeFixed32: function (t) {
              this.realloc(4), y(this.buf, t, this.pos), (this.pos += 4);
            },
            writeSFixed32: function (t) {
              this.realloc(4), y(this.buf, t, this.pos), (this.pos += 4);
            },
            writeFixed64: function (t) {
              this.realloc(8),
                y(this.buf, -1 & t, this.pos),
                y(this.buf, Math.floor(t * o), this.pos + 4),
                (this.pos += 8);
            },
            writeSFixed64: function (t) {
              this.realloc(8),
                y(this.buf, -1 & t, this.pos),
                y(this.buf, Math.floor(t * o), this.pos + 4),
                (this.pos += 8);
            },
            writeVarint: function (t) {
              268435455 < (t = +t || 0) || t < 0
                ? (function (t, i) {
                    var e, r;
                    0 <= t
                      ? ((e = t % 4294967296 | 0), (r = (t / 4294967296) | 0))
                      : ((r = ~(-t / 4294967296)),
                        4294967295 ^ (e = ~(-t % 4294967296))
                          ? (e = (e + 1) | 0)
                          : (r = (r + 1) | (e = 0)));
                    if (0x10000000000000000 <= t || t < -0x10000000000000000)
                      throw new Error("Given varint doesn't fit into 10 bytes");
                    i.realloc(10),
                      (function (t, i, e) {
                        (e.buf[e.pos++] = (127 & t) | 128),
                          (t >>>= 7),
                          (e.buf[e.pos++] = (127 & t) | 128),
                          (t >>>= 7),
                          (e.buf[e.pos++] = (127 & t) | 128),
                          (t >>>= 7),
                          (e.buf[e.pos++] = (127 & t) | 128),
                          (t >>>= 7),
                          (e.buf[e.pos] = 127 & t);
                      })(e, 0, i),
                      (function (t, i) {
                        var e = (7 & t) << 4;
                        if (
                          ((i.buf[i.pos++] |= e | ((t >>>= 3) ? 128 : 0)), !t)
                        )
                          return;
                        if (
                          ((i.buf[i.pos++] =
                            (127 & t) | ((t >>>= 7) ? 128 : 0)),
                          !t)
                        )
                          return;
                        if (
                          ((i.buf[i.pos++] =
                            (127 & t) | ((t >>>= 7) ? 128 : 0)),
                          !t)
                        )
                          return;
                        if (
                          ((i.buf[i.pos++] =
                            (127 & t) | ((t >>>= 7) ? 128 : 0)),
                          !t)
                        )
                          return;
                        if (
                          ((i.buf[i.pos++] =
                            (127 & t) | ((t >>>= 7) ? 128 : 0)),
                          !t)
                        )
                          return;
                        i.buf[i.pos++] = 127 & t;
                      })(r, i);
                  })(t, this)
                : (this.realloc(4),
                  (this.buf[this.pos++] = (127 & t) | (127 < t ? 128 : 0)),
                  t <= 127 ||
                    ((this.buf[this.pos++] =
                      (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
                    t <= 127 ||
                      ((this.buf[this.pos++] =
                        (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
                      t <= 127 || (this.buf[this.pos++] = (t >>> 7) & 127))));
            },
            writeSVarint: function (t) {
              this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
            },
            writeBoolean: function (t) {
              this.writeVarint(Boolean(t));
            },
            writeString: function (t) {
              (t = String(t)), this.realloc(4 * t.length), this.pos++;
              var i = this.pos;
              this.pos = (function (t, i, e) {
                for (var r, s, n = 0; n < i.length; n++) {
                  if (55295 < (r = i.charCodeAt(n)) && r < 57344) {
                    if (!s) {
                      56319 < r || n + 1 === i.length
                        ? ((t[e++] = 239), (t[e++] = 191), (t[e++] = 189))
                        : (s = r);
                      continue;
                    }
                    if (r < 56320) {
                      (t[e++] = 239), (t[e++] = 191), (t[e++] = 189), (s = r);
                      continue;
                    }
                    (r = ((s - 55296) << 10) | (r - 56320) | 65536), (s = null);
                  } else
                    s &&
                      ((t[e++] = 239),
                      (t[e++] = 191),
                      (t[e++] = 189),
                      (s = null));
                  r < 128
                    ? (t[e++] = r)
                    : (r < 2048
                        ? (t[e++] = (r >> 6) | 192)
                        : (r < 65536
                            ? (t[e++] = (r >> 12) | 224)
                            : ((t[e++] = (r >> 18) | 240),
                              (t[e++] = ((r >> 12) & 63) | 128)),
                          (t[e++] = ((r >> 6) & 63) | 128)),
                      (t[e++] = (63 & r) | 128));
                }
                return e;
              })(this.buf, t, this.pos);
              var e = this.pos - i;
              128 <= e && f(i, e, this),
                (this.pos = i - 1),
                this.writeVarint(e),
                (this.pos += e);
            },
            writeFloat: function (t) {
              this.realloc(4),
                r.write(this.buf, t, this.pos, !0, 23, 4),
                (this.pos += 4);
            },
            writeDouble: function (t) {
              this.realloc(8),
                r.write(this.buf, t, this.pos, !0, 52, 8),
                (this.pos += 8);
            },
            writeBytes: function (t) {
              var i = t.length;
              this.writeVarint(i), this.realloc(i);
              for (var e = 0; e < i; e++) this.buf[this.pos++] = t[e];
            },
            writeRawMessage: function (t, i) {
              this.pos++;
              var e = this.pos;
              t(i, this);
              var r = this.pos - e;
              128 <= r && f(e, r, this),
                (this.pos = e - 1),
                this.writeVarint(r),
                (this.pos += r);
            },
            writeMessage: function (t, i, e) {
              this.writeTag(t, s.Bytes), this.writeRawMessage(i, e);
            },
            writePackedVarint: function (t, i) {
              i.length && this.writeMessage(t, d, i);
            },
            writePackedSVarint: function (t, i) {
              i.length && this.writeMessage(t, p, i);
            },
            writePackedBoolean: function (t, i) {
              i.length && this.writeMessage(t, w, i);
            },
            writePackedFloat: function (t, i) {
              i.length && this.writeMessage(t, l, i);
            },
            writePackedDouble: function (t, i) {
              i.length && this.writeMessage(t, c, i);
            },
            writePackedFixed32: function (t, i) {
              i.length && this.writeMessage(t, F, i);
            },
            writePackedSFixed32: function (t, i) {
              i.length && this.writeMessage(t, b, i);
            },
            writePackedFixed64: function (t, i) {
              i.length && this.writeMessage(t, g, i);
            },
            writePackedSFixed64: function (t, i) {
              i.length && this.writeMessage(t, x, i);
            },
            writeBytesField: function (t, i) {
              this.writeTag(t, s.Bytes), this.writeBytes(i);
            },
            writeFixed32Field: function (t, i) {
              this.writeTag(t, s.Fixed32), this.writeFixed32(i);
            },
            writeSFixed32Field: function (t, i) {
              this.writeTag(t, s.Fixed32), this.writeSFixed32(i);
            },
            writeFixed64Field: function (t, i) {
              this.writeTag(t, s.Fixed64), this.writeFixed64(i);
            },
            writeSFixed64Field: function (t, i) {
              this.writeTag(t, s.Fixed64), this.writeSFixed64(i);
            },
            writeVarintField: function (t, i) {
              this.writeTag(t, s.Varint), this.writeVarint(i);
            },
            writeSVarintField: function (t, i) {
              this.writeTag(t, s.Varint), this.writeSVarint(i);
            },
            writeStringField: function (t, i) {
              this.writeTag(t, s.Bytes), this.writeString(i);
            },
            writeFloatField: function (t, i) {
              this.writeTag(t, s.Fixed32), this.writeFloat(i);
            },
            writeDoubleField: function (t, i) {
              this.writeTag(t, s.Fixed64), this.writeDouble(i);
            },
            writeBooleanField: function (t, i) {
              this.writeVarintField(t, Boolean(i));
            },
          };
        },
        { ieee754: 2 },
      ],
      2: [
        function (t, i, e) {
          (e.read = function (t, i, e, r, s) {
            var n,
              o,
              h = 8 * s - r - 1,
              a = (1 << h) - 1,
              u = a >> 1,
              f = -7,
              d = e ? s - 1 : 0,
              p = e ? -1 : 1,
              l = t[i + d];
            for (
              d += p, n = l & ((1 << -f) - 1), l >>= -f, f += h;
              0 < f;
              n = 256 * n + t[i + d], d += p, f -= 8
            );
            for (
              o = n & ((1 << -f) - 1), n >>= -f, f += r;
              0 < f;
              o = 256 * o + t[i + d], d += p, f -= 8
            );
            if (0 === n) n = 1 - u;
            else {
              if (n === a) return o ? NaN : (1 / 0) * (l ? -1 : 1);
              (o += Math.pow(2, r)), (n -= u);
            }
            return (l ? -1 : 1) * o * Math.pow(2, n - r);
          }),
            (e.write = function (t, i, e, r, s, n) {
              var o,
                h,
                a,
                u = 8 * n - s - 1,
                f = (1 << u) - 1,
                d = f >> 1,
                p = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                l = r ? 0 : n - 1,
                c = r ? 1 : -1,
                w = i < 0 || (0 === i && 1 / i < 0) ? 1 : 0;
              for (
                i = Math.abs(i),
                  isNaN(i) || i === 1 / 0
                    ? ((h = isNaN(i) ? 1 : 0), (o = f))
                    : ((o = Math.floor(Math.log(i) / Math.LN2)),
                      i * (a = Math.pow(2, -o)) < 1 && (o--, (a *= 2)),
                      2 <=
                        (i += 1 <= o + d ? p / a : p * Math.pow(2, 1 - d)) *
                          a && (o++, (a /= 2)),
                      f <= o + d
                        ? ((h = 0), (o = f))
                        : 1 <= o + d
                        ? ((h = (i * a - 1) * Math.pow(2, s)), (o += d))
                        : ((h = i * Math.pow(2, d - 1) * Math.pow(2, s)),
                          (o = 0)));
                8 <= s;
                t[e + l] = 255 & h, l += c, h /= 256, s -= 8
              );
              for (
                o = (o << s) | h, u += s;
                0 < u;
                t[e + l] = 255 & o, l += c, o /= 256, u -= 8
              );
              t[e + l - c] |= 128 * w;
            });
        },
        {},
      ],
    },
    {},
    [1],
  )(1);
});
