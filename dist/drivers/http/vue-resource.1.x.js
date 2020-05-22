"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  init: function init() {
    if (!this.Vue.http) {
      return 'vue-resource.1.x.js : Vue.http must be set.';
    }
  },
  interceptor: function interceptor(req, res) {
    var _this = this;

    this.Vue.http.interceptors.push(function (request, next) {
      if (req) {
        req.call(_this, request);
      }

      next(function (response) {
        if (res) {
          res.call(_this, response, request);
        }
      });
    });
  },
  invalidToken: function invalidToken(res) {
    if (res.status === 401) {
      return true;
    }
  },
  httpData: function httpData(res) {
    return res.data || {};
  },
  http: function http(data) {
    return this.Vue.http(data);
  },
  getHeaders: function getHeaders(res) {
    var i,
        data = {},
        headers = res.headers.map;

    for (i in headers) {
      data[i] = headers[i][0];
    }

    return data;
  },
  setHeaders: function setHeaders(req, headers) {
    var i;

    for (i in headers) {
      req.headers.set(i, headers[i]);
    }
  }
};
exports["default"] = _default;