"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("./views/Home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import HighChart from './charts/HighChart.vue'
_vue.default.use(_vueRouter.default);

var _default = new _vueRouter.default({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: _Home.default
  }, {
    path: '/Chart',
    name: 'Chart',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Chart.vue'));
      });
    }
  }, {
    path: '/HighChart',
    name: 'HighChart',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./charts/HighChart.vue'));
      });
    }
  }, {
    path: '/ForceChart',
    name: 'ForceChart',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./charts/ForceChart.vue'));
      });
    }
  }, {
    path: '/CircleChart',
    name: 'CircleChart',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./charts/CircleChart.vue'));
      });
    }
  }, {
    path: '/ForceBar',
    name: 'ForceBar',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./charts/ForceBar.vue'));
      });
    }
  }]
});

exports.default = _default;