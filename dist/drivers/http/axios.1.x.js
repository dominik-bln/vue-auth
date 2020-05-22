"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  init: function init() {
    if (!this.Vue.axios) {
      return 'axios.js : Vue.axios must be set.';
    }
  },
  interceptor: function interceptor(req, res) {
    var _this = this;

    if (req) {
      this.Vue.axios.interceptors.request.use(function (request) {
        req.call(_this, request);
        return request;
      }, function (error) {
        req.call(_this, error.request);
        return Promise.reject(error);
      });
    }

    if (res) {
      this.Vue.axios.interceptors.response.use(function (response) {
        res.call(_this, response);
        return response;
      }, function (error) {
        if (error && error.response) {
          res.call(_this, error.response);
        }

        return Promise.reject(error);
      });
    }
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
    var http = this.Vue.axios(data);
    http.then(data.success, data.error);
    return http;
  },
  getHeaders: function getHeaders(res) {
    return res.headers;
  },
  setHeaders: function setHeaders(req, headers) {
    req.headers.common = Object.assign({}, req.headers.common, headers);
  }
};
exports["default"] = _default;