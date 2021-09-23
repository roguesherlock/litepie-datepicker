'use strict';var dayjs=require('dayjs'),localeData=require('dayjs/plugin/localeData'),localizedFormat=require('dayjs/plugin/localizedFormat'),customParseFormat=require('dayjs/plugin/customParseFormat'),isToday=require('dayjs/plugin/isToday'),isBetween=require('dayjs/plugin/isBetween'),duration=require('dayjs/plugin/duration'),vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var dayjs__default=/*#__PURE__*/_interopDefaultLegacy(dayjs);var localeData__default=/*#__PURE__*/_interopDefaultLegacy(localeData);var localizedFormat__default=/*#__PURE__*/_interopDefaultLegacy(localizedFormat);var customParseFormat__default=/*#__PURE__*/_interopDefaultLegacy(customParseFormat);var isToday__default=/*#__PURE__*/_interopDefaultLegacy(isToday);var isBetween__default=/*#__PURE__*/_interopDefaultLegacy(isBetween);var duration__default=/*#__PURE__*/_interopDefaultLegacy(duration);function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var usePreviousDate = function usePreviousDate(date) {
  var display = [];

  for (var i = 0; i <= date.date(0).day(); i++) {
    display.push(date.date(0).subtract(i, 'day'));
  }

  return display.sort(function (a, b) {
    return a.date() - b.date();
  });
};
var useCurrentDate = function useCurrentDate(date) {
  return Array.from({
    length: date.daysInMonth()
  }, function (v, k) {
    return date.date(k + 1);
  });
};
var useNextDate = function useNextDate(date) {
  var display = [];

  for (var i = 1; i <= 42 - (usePreviousDate(date).length + date.daysInMonth()); i++) {
    display.push(date.date(i).month(date.month()).add(1, 'month'));
  }

  return display;
};
var useDisableDate = function useDisableDate(date, _ref) {
  var disableDate = _ref.disableDate;

  if (typeof disableDate === 'function') {
    return disableDate(date.toDate());
  } else {
    return false;
  }
};
var useBetweenRange = function useBetweenRange(date, _ref2) {
  var previous = _ref2.previous,
      next = _ref2.next;
  var pattern;

  if (previous.isAfter(next, 'date')) {
    pattern = '(]';
  } else {
    pattern = '[)';
  }

  return !!(date.isBetween(previous, next, 'date', pattern) && !date.off);
};
var useToValueFromString = function useToValueFromString(date, _ref3) {
  var formatter = _ref3.formatter;
  return date.format(formatter.date);
};
var useToValueFromArray = function useToValueFromArray(_ref4, _ref5) {
  var previous = _ref4.previous,
      next = _ref4.next;
  var formatter = _ref5.formatter,
      separator = _ref5.separator;
  return "".concat(previous.format(formatter.date)).concat(separator).concat(next.format(formatter.date));
};
var useDirective = function useDirective(binding) {
  var instance = binding.instance,
      arg = binding.arg,
      value = binding.value;
  document.body.addEventListener('click', function ($event) {
    if ($event.target.classList.contains('litepie-datepicker-overlay')) {
      return instance.isShow = false;
    } else {
      if (instance.LitepieDatepickerRef) {
        var autoApply = instance.autoApply,
            previous = instance.previous,
            next = instance.next;
        var target = $event.target.classList.contains('litepie-datepicker-date');

        if (target && autoApply && !previous && !next) {
          return instance.isShow = false;
        }

        if (!autoApply && $event.target.classList.contains("".concat(arg, "-apply-picker")) && instance.value !== '') {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains("".concat(arg, "-cancel-picker"))) {
          return instance.isShow = false;
        }

        if ($event.target.classList.contains("litepie-shortcuts") && autoApply) {
          return instance.isShow = false;
        }

        return instance.isShow = instance.LitepieDatepickerRef.contains($event.target) || document.getElementById(value) === $event.target || value === $event.target;
      }

      return instance.isShow = true;
    }
  });
};
var useVisibleViewport = function useVisibleViewport(el) {
  var _el$getBoundingClient = el.getBoundingClientRect(),
      right = _el$getBoundingClient.right;

  var vWidth = window.innerWidth || document.documentElement.clientWidth;
  return right < vWidth;
};var script = vue.defineComponent({
  name: 'LitepieHeader',
  props: {
    asPrevOrNext: Boolean,
    panel: Object,
    calendar: Object
  },
  inheritAttrs: false
});var _hoisted_1 = {
  class: "flex justify-between items-center px-2 py-0.5 rounded-md border border-black border-opacity-10 dark:border-litepie-secondary-700 dark:border-opacity-100"
};
var _hoisted_2 = {
  class: "flex-shrink-0"
};
var _hoisted_3 = {
  class: "inline-flex rounded-full"
};
var _hoisted_4 = {
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var _hoisted_5 = {
  class: "px-1.5 space-x-1.5 flex flex-1"
};
var _hoisted_6 = {
  class: "flex-1 flex rounded-md"
};
var _hoisted_7 = {
  class: "flex-1 flex rounded-md"
};
var _hoisted_8 = {
  class: "flex-shrink-0"
};
var _hoisted_9 = {
  class: "inline-flex rounded-full"
};
var _hoisted_10 = {
  class: "w-4 h-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [vue.createVNode("div", _hoisted_2, [vue.withDirectives(vue.createVNode("span", _hoisted_3, [vue.createVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.panel.calendar ? _ctx.calendar.onPrevious() : _ctx.calendar.onPreviousYear();
    })
  }, [(vue.openBlock(), vue.createBlock("svg", _hoisted_4, [vue.createVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? "M15 19l-7-7 7-7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
  }, null, 8, ["d"])]))])], 512), [[vue.vShow, _ctx.panel.calendar || _ctx.panel.year]])]), vue.createVNode("div", _hoisted_5, [vue.createVNode("span", _hoisted_6, [vue.createVNode("button", {
    type: "button",
    class: "px-3 py-[3px] block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: vue.toDisplayString(_ctx.calendar.month),
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.calendar.openMonth();
    })
  }, null, 8, ["textContent"])]), vue.createVNode("span", _hoisted_7, [vue.createVNode("button", {
    type: "button",
    class: "px-3 py-[3px] block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    textContent: vue.toDisplayString(_ctx.calendar.year),
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return _ctx.calendar.openYear();
    })
  }, null, 8, ["textContent"])])]), vue.createVNode("div", _hoisted_8, [vue.withDirectives(vue.createVNode("span", _hoisted_9, [vue.createVNode("button", {
    type: "button",
    class: "p-1.5 rounded-full bg-white text-litepie-secondary-600 transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:text-litepie-secondary-300 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-secondary-300 dark:focus:bg-litepie-secondary-600 dark:focus:text-litepie-secondary-100 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-25 dark:focus:bg-opacity-50",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return _ctx.panel.calendar ? _ctx.calendar.onNext() : _ctx.calendar.onNextYear();
    })
  }, [(vue.openBlock(), vue.createBlock("svg", _hoisted_10, [vue.createVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: _ctx.panel.calendar ? "M9 5l7 7-7 7" : "M13 5l7 7-7 7M5 5l7 7-7 7"
  }, null, 8, ["d"])]))])], 512), [[vue.vShow, _ctx.panel.calendar || _ctx.panel.year]])])]);
}script.render = render;var script$1 = vue.defineComponent({
  name: 'LitepieMonth',
  props: {
    months: Array
  },
  inheritAttrs: false,
  emits: ['update:month']
});var _hoisted_1$1 = {
  class: "flex flex-wrap mt-1.5"
};
var _hoisted_2$1 = {
  class: "flex rounded-md mt-1.5"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.months, function (month, key) {
    return vue.openBlock(), vue.createBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [vue.createVNode("span", _hoisted_2$1, [vue.createVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: vue.toDisplayString(month),
      onClick: function onClick($event) {
        return _ctx.$emit('update:month', key);
      }
    }, null, 8, ["textContent", "onClick"])])]);
  }), 128))]);
}script$1.render = render$1;var script$2 = vue.defineComponent({
  name: 'LitepieWeek',
  props: {
    weeks: Array
  },
  inheritAttrs: false
});var _hoisted_1$2 = {
  class: "grid grid-cols-7 py-2 mt-0.5 border-b border-black border-opacity-10 dark:border-litepie-secondary-700 dark:border-opacity-100"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.weeks, function (day, keyDay) {
    return vue.openBlock(), vue.createBlock("div", {
      key: keyDay,
      class: "text-litepie-secondary-500 text-xs 2xl:text-sm tracking-wide font-medium text-center cursor-default dark:text-litepie-secondary-400"
    }, [vue.createVNode("span", {
      textContent: vue.toDisplayString(day)
    }, null, 8, ["textContent"])]);
  }), 128))]);
}script$2.render = render$2;var script$3 = vue.defineComponent({
  name: 'LitepieYear',
  props: {
    asPrevOrNext: Boolean,
    years: Array
  },
  inheritAttrs: false,
  emits: ['update:year']
});var _hoisted_1$3 = {
  class: "flex flex-wrap"
};
var _hoisted_2$2 = {
  class: "flex rounded-md mt-1.5"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.years, function (year, key) {
    return vue.openBlock(), vue.createBlock("div", {
      key: key,
      class: "w-1/2 px-0.5"
    }, [vue.createVNode("span", _hoisted_2$2, [vue.createVNode("button", {
      type: "button",
      class: "px-3 py-2 block w-full leading-6 rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-litepie-secondary-600 font-medium transition-colors border border-transparent hover:bg-litepie-secondary-100 hover:text-litepie-secondary-900 focus:bg-litepie-primary-50 focus:text-litepie-secondary-900 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none uppercase dark:bg-litepie-secondary-800 dark:hover:bg-litepie-secondary-700 dark:text-litepie-secondary-300 dark:hover:text-litepie-secondary-100 dark:focus:bg-litepie-secondary-700",
      textContent: vue.toDisplayString(year),
      onClick: function onClick($event) {
        return _ctx.$emit('update:year', year, _ctx.asPrevOrNext);
      }
    }, null, 8, ["textContent", "onClick"])])]);
  }), 128))]);
}script$3.render = render$3;var script$4 = vue.defineComponent({
  name: 'LitepieCalendar',
  props: {
    asPrevOrNext: Boolean,
    calendar: Object,
    weeks: Array,
    asRange: Boolean
  },
  inheritAttrs: false,
  emits: ['update:date'],
  setup: function setup() {
    var isBetweenRange = vue.inject('isBetweenRange');
    var betweenRangeClasses = vue.inject('betweenRangeClasses');
    var datepickerClasses = vue.inject('datepickerClasses');
    var atMouseOver = vue.inject('atMouseOver');
    return {
      isBetweenRange: isBetweenRange,
      betweenRangeClasses: betweenRangeClasses,
      datepickerClasses: datepickerClasses,
      atMouseOver: atMouseOver
    };
  }
});var _hoisted_1$4 = {
  class: "grid grid-cols-7 gap-y-0.5 my-1"
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$4, [vue.createVNode(vue.TransitionGroup, {
    "enter-from-class": "opacity-0",
    "enter-to-class": "opacity-100",
    "enter-active-class": "transition-opacity ease-out duration-300",
    "leave-active-class": "transition-opacity ease-in duration-200",
    "leave-from-class": "opacity-100",
    "leave-to-class": "opacity-0"
  }, {
    default: vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.calendar.date(), function (date, keyDate) {
        return vue.openBlock(), vue.createBlock("div", {
          key: keyDate,
          class: ["relative", {
            'litepie-tooltip': _ctx.asRange && date.duration()
          }],
          "data-tooltip": "".concat(date.duration())
        }, [vue.createVNode(vue.Transition, {
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "enter-active-class": "transition-opacity ease-out duration-200",
          "leave-active-class": "transition-opacity ease-in duration-150",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: vue.withCtx(function () {
            return [_ctx.isBetweenRange(date) || date.hovered() ? (vue.openBlock(), vue.createBlock("span", {
              key: 0,
              class: ["absolute bg-litepie-primary-100 bg-opacity-60 dark:bg-litepie-secondary-700 dark:bg-opacity-50", _ctx.betweenRangeClasses(date)]
            }, null, 2)) : vue.createCommentVNode("", true)];
          }),
          _: 2
        }, 1024), vue.createVNode("button", {
          type: "button",
          class: ["litepie-datepicker-date relative w-12 h-12 lg:w-8 lg:h-8 flex justify-center items-center text-xs 2xl:text-sm focus:outline-none", [_ctx.datepickerClasses(date), _ctx.asRange ? 'transition-all' : 'transition-colors']],
          disabled: date.disabled || date.inRange(),
          onClick: function onClick($event) {
            return _ctx.$emit('update:date', date, _ctx.asPrevOrNext);
          },
          onMouseenter: function onMouseenter($event) {
            return _ctx.atMouseOver(date);
          },
          onFocusin: function onFocusin($event) {
            return _ctx.atMouseOver(date);
          },
          textContent: vue.toDisplayString(date.date()),
          "data-date": date.toDate()
        }, null, 42, ["disabled", "onClick", "onMouseenter", "onFocusin", "textContent", "data-date"])], 10, ["data-tooltip"]);
      }), 128))];
    }),
    _: 1
  })]);
}script$4.render = render$4;var script$5 = vue.defineComponent({
  name: 'LitepieShortcut',
  props: {
    shortcuts: [Boolean, Function],
    asRange: Boolean,
    asSingle: Boolean,
    i18n: Object
  },
  inheritAttrs: false,
  setup: function setup(props) {
    var setToToday = vue.inject('setToToday');
    var setToYesterday = vue.inject('setToYesterday');
    var setToLastDay = vue.inject('setToLastDay');
    var setToThisMonth = vue.inject('setToThisMonth');
    var setToLastMonth = vue.inject('setToLastMonth');
    var setToCustomShortcut = vue.inject('setToCustomShortcut');

    var withShortcut = function withShortcut() {
      if (typeof props.shortcuts === 'function') {
        return props.shortcuts();
      } else {
        return false;
      }
    };

    console.log('lalala', withShortcut());
    return {
      setToToday: setToToday,
      setToYesterday: setToYesterday,
      setToLastDay: setToLastDay,
      setToThisMonth: setToThisMonth,
      setToLastMonth: setToLastMonth,
      setToCustomShortcut: setToCustomShortcut,
      withShortcut: withShortcut
    };
  }
});var _hoisted_1$5 = {
  key: 0,
  class: "relative w-full border-t border-b-0 sm:border-t-0 sm:border-b lg:border-b-0 lg:border-r border-black border-opacity-10 order-last sm:order-none dark:border-litepie-secondary-700 dark:border-opacity-100 sm:mt-1 lg:mr-1 sm:mb-1 lg:mb-0 sm:mx-1 lg:mx-0"
};
var _hoisted_2$3 = {
  key: 0,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
var _hoisted_3$1 = {
  key: 0,
  class: "block border-t border-gray-200 my-1"
};
var _hoisted_4$1 = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-3 gap-1 lg:block w-full pr-0 sm:pr-1 mt-1.5 sm:mt-0 sm:mb-1.5 lg:mb-0"
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.shortcuts ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [_ctx.withShortcut() ? (vue.openBlock(), vue.createBlock("ol", _hoisted_2$3, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.withShortcut(), function (item, i) {
    return vue.openBlock(), vue.createBlock(vue.Fragment, {
      key: i
    }, [item.divide ? (vue.openBlock(), vue.createBlock("li", _hoisted_3$1)) : vue.createCommentVNode("", true), vue.createVNode("li", null, [vue.createVNode("a", {
      href: "#",
      class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
      onClick: vue.withModifiers(function ($event) {
        return _ctx.setToCustomShortcut(item);
      }, ["prevent"])
    }, [vue.renderSlot(_ctx.$slots, "shortcut-label", {
      item: item
    }, function () {
      return [vue.createTextVNode(vue.toDisplayString(item.label), 1)];
    })], 8, ["onClick"])])], 64);
  }), 128))])) : (vue.openBlock(), vue.createBlock("ol", _hoisted_4$1, [vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(function () {
      return _ctx.setToToday && _ctx.setToToday.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.today), 1)]), vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[2] || (_cache[2] = vue.withModifiers(function () {
      return _ctx.setToYesterday && _ctx.setToYesterday.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.yesterday), 1)]), vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[3] || (_cache[3] = vue.withModifiers(function ($event) {
      return _ctx.setToLastDay(7);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.past(7)), 1)]), vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[4] || (_cache[4] = vue.withModifiers(function ($event) {
      return _ctx.setToLastDay(30);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.past(30)), 1)]), vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[5] || (_cache[5] = vue.withModifiers(function () {
      return _ctx.setToThisMonth && _ctx.setToThisMonth.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.currentMonth), 1)]), vue.createVNode("li", null, [vue.createVNode("a", {
    href: "#",
    class: "litepie-shortcuts block text-sm lg:text-xs px-2 py-2 sm:leading-4 whitespace-nowrap font-medium rounded text-litepie-primary-600 hover:text-litepie-primary-700 transition-colors hover:bg-litepie-secondary-100 focus:bg-litepie-secondary-100 focus:text-litepie-primary-600 dark:hover:bg-litepie-secondary-700 dark:hover:text-litepie-primary-300 dark:text-litepie-primary-400 dark:focus:bg-litepie-secondary-700 dark:focus:text-litepie-primary-300",
    onClick: _cache[6] || (_cache[6] = vue.withModifiers(function () {
      return _ctx.setToLastMonth && _ctx.setToLastMonth.apply(_ctx, arguments);
    }, ["prevent"]))
  }, vue.toDisplayString(_ctx.i18n.pastMonth), 1)])]))])) : vue.createCommentVNode("", true);
}script$5.render = render$5;function __variableDynamicImportRuntime0__(path) {
   switch (path) {
     case './locale/af.js': return Promise.resolve().then(function(){return af});
     case './locale/am.js': return Promise.resolve().then(function(){return am});
     case './locale/ar-dz.js': return Promise.resolve().then(function(){return arDz});
     case './locale/ar-kw.js': return Promise.resolve().then(function(){return arKw});
     case './locale/ar-ly.js': return Promise.resolve().then(function(){return arLy});
     case './locale/ar-ma.js': return Promise.resolve().then(function(){return arMa});
     case './locale/ar-sa.js': return Promise.resolve().then(function(){return arSa});
     case './locale/ar-tn.js': return Promise.resolve().then(function(){return arTn});
     case './locale/ar.js': return Promise.resolve().then(function(){return ar});
     case './locale/az.js': return Promise.resolve().then(function(){return az});
     case './locale/be.js': return Promise.resolve().then(function(){return be});
     case './locale/bg.js': return Promise.resolve().then(function(){return bg});
     case './locale/bi.js': return Promise.resolve().then(function(){return bi});
     case './locale/bm.js': return Promise.resolve().then(function(){return bm});
     case './locale/bn.js': return Promise.resolve().then(function(){return bn});
     case './locale/bo.js': return Promise.resolve().then(function(){return bo});
     case './locale/br.js': return Promise.resolve().then(function(){return br});
     case './locale/bs.js': return Promise.resolve().then(function(){return bs});
     case './locale/ca.js': return Promise.resolve().then(function(){return ca});
     case './locale/cs.js': return Promise.resolve().then(function(){return cs});
     case './locale/cv.js': return Promise.resolve().then(function(){return cv});
     case './locale/cy.js': return Promise.resolve().then(function(){return cy});
     case './locale/da.js': return Promise.resolve().then(function(){return da});
     case './locale/de-at.js': return Promise.resolve().then(function(){return deAt});
     case './locale/de-ch.js': return Promise.resolve().then(function(){return deCh});
     case './locale/de.js': return Promise.resolve().then(function(){return de});
     case './locale/dv.js': return Promise.resolve().then(function(){return dv});
     case './locale/el.js': return Promise.resolve().then(function(){return el});
     case './locale/en-au.js': return Promise.resolve().then(function(){return enAu});
     case './locale/en-ca.js': return Promise.resolve().then(function(){return enCa});
     case './locale/en-gb.js': return Promise.resolve().then(function(){return enGb});
     case './locale/en-ie.js': return Promise.resolve().then(function(){return enIe});
     case './locale/en-il.js': return Promise.resolve().then(function(){return enIl});
     case './locale/en-in.js': return Promise.resolve().then(function(){return enIn});
     case './locale/en-nz.js': return Promise.resolve().then(function(){return enNz});
     case './locale/en-sg.js': return Promise.resolve().then(function(){return enSg});
     case './locale/en-tt.js': return Promise.resolve().then(function(){return enTt});
     case './locale/en.js': return Promise.resolve().then(function(){return en$1});
     case './locale/eo.js': return Promise.resolve().then(function(){return eo});
     case './locale/es-do.js': return Promise.resolve().then(function(){return esDo});
     case './locale/es-pr.js': return Promise.resolve().then(function(){return esPr});
     case './locale/es-us.js': return Promise.resolve().then(function(){return esUs});
     case './locale/es.js': return Promise.resolve().then(function(){return es});
     case './locale/et.js': return Promise.resolve().then(function(){return et});
     case './locale/eu.js': return Promise.resolve().then(function(){return eu});
     case './locale/fa.js': return Promise.resolve().then(function(){return fa});
     case './locale/fi.js': return Promise.resolve().then(function(){return fi});
     case './locale/fo.js': return Promise.resolve().then(function(){return fo});
     case './locale/fr-ca.js': return Promise.resolve().then(function(){return frCa});
     case './locale/fr-ch.js': return Promise.resolve().then(function(){return frCh});
     case './locale/fr.js': return Promise.resolve().then(function(){return fr});
     case './locale/fy.js': return Promise.resolve().then(function(){return fy});
     case './locale/ga.js': return Promise.resolve().then(function(){return ga});
     case './locale/gd.js': return Promise.resolve().then(function(){return gd});
     case './locale/gl.js': return Promise.resolve().then(function(){return gl});
     case './locale/gom-latn.js': return Promise.resolve().then(function(){return gomLatn});
     case './locale/gu.js': return Promise.resolve().then(function(){return gu});
     case './locale/he.js': return Promise.resolve().then(function(){return he});
     case './locale/hi.js': return Promise.resolve().then(function(){return hi});
     case './locale/hr.js': return Promise.resolve().then(function(){return hr});
     case './locale/ht.js': return Promise.resolve().then(function(){return ht});
     case './locale/hu.js': return Promise.resolve().then(function(){return hu});
     case './locale/hy-am.js': return Promise.resolve().then(function(){return hyAm});
     case './locale/id.js': return Promise.resolve().then(function(){return id});
     case './locale/is.js': return Promise.resolve().then(function(){return is});
     case './locale/it-ch.js': return Promise.resolve().then(function(){return itCh});
     case './locale/it.js': return Promise.resolve().then(function(){return it});
     case './locale/ja.js': return Promise.resolve().then(function(){return ja});
     case './locale/jv.js': return Promise.resolve().then(function(){return jv});
     case './locale/ka.js': return Promise.resolve().then(function(){return ka});
     case './locale/kk.js': return Promise.resolve().then(function(){return kk});
     case './locale/km.js': return Promise.resolve().then(function(){return km});
     case './locale/kn.js': return Promise.resolve().then(function(){return kn});
     case './locale/ko.js': return Promise.resolve().then(function(){return ko});
     case './locale/ku.js': return Promise.resolve().then(function(){return ku});
     case './locale/ky.js': return Promise.resolve().then(function(){return ky});
     case './locale/lb.js': return Promise.resolve().then(function(){return lb});
     case './locale/lo.js': return Promise.resolve().then(function(){return lo});
     case './locale/lt.js': return Promise.resolve().then(function(){return lt});
     case './locale/lv.js': return Promise.resolve().then(function(){return lv});
     case './locale/me.js': return Promise.resolve().then(function(){return me});
     case './locale/mi.js': return Promise.resolve().then(function(){return mi});
     case './locale/mk.js': return Promise.resolve().then(function(){return mk});
     case './locale/ml.js': return Promise.resolve().then(function(){return ml});
     case './locale/mn.js': return Promise.resolve().then(function(){return mn});
     case './locale/mr.js': return Promise.resolve().then(function(){return mr});
     case './locale/ms-my.js': return Promise.resolve().then(function(){return msMy});
     case './locale/ms.js': return Promise.resolve().then(function(){return ms});
     case './locale/mt.js': return Promise.resolve().then(function(){return mt});
     case './locale/my.js': return Promise.resolve().then(function(){return my});
     case './locale/nb.js': return Promise.resolve().then(function(){return nb});
     case './locale/ne.js': return Promise.resolve().then(function(){return ne});
     case './locale/nl-be.js': return Promise.resolve().then(function(){return nlBe});
     case './locale/nl.js': return Promise.resolve().then(function(){return nl});
     case './locale/nn.js': return Promise.resolve().then(function(){return nn});
     case './locale/oc-lnc.js': return Promise.resolve().then(function(){return ocLnc});
     case './locale/pa-in.js': return Promise.resolve().then(function(){return paIn});
     case './locale/pl.js': return Promise.resolve().then(function(){return pl});
     case './locale/pt-br.js': return Promise.resolve().then(function(){return ptBr});
     case './locale/pt.js': return Promise.resolve().then(function(){return pt});
     case './locale/ro.js': return Promise.resolve().then(function(){return ro});
     case './locale/ru.js': return Promise.resolve().then(function(){return ru});
     case './locale/rw.js': return Promise.resolve().then(function(){return rw});
     case './locale/sd.js': return Promise.resolve().then(function(){return sd});
     case './locale/se.js': return Promise.resolve().then(function(){return se});
     case './locale/si.js': return Promise.resolve().then(function(){return si});
     case './locale/sk.js': return Promise.resolve().then(function(){return sk});
     case './locale/sl.js': return Promise.resolve().then(function(){return sl});
     case './locale/sq.js': return Promise.resolve().then(function(){return sq});
     case './locale/sr-cyrl.js': return Promise.resolve().then(function(){return srCyrl});
     case './locale/sr.js': return Promise.resolve().then(function(){return sr});
     case './locale/ss.js': return Promise.resolve().then(function(){return ss});
     case './locale/sv.js': return Promise.resolve().then(function(){return sv});
     case './locale/sw.js': return Promise.resolve().then(function(){return sw});
     case './locale/ta.js': return Promise.resolve().then(function(){return ta});
     case './locale/te.js': return Promise.resolve().then(function(){return te});
     case './locale/tet.js': return Promise.resolve().then(function(){return tet});
     case './locale/tg.js': return Promise.resolve().then(function(){return tg});
     case './locale/th.js': return Promise.resolve().then(function(){return th});
     case './locale/tk.js': return Promise.resolve().then(function(){return tk});
     case './locale/tl-ph.js': return Promise.resolve().then(function(){return tlPh});
     case './locale/tlh.js': return Promise.resolve().then(function(){return tlh});
     case './locale/tr.js': return Promise.resolve().then(function(){return tr});
     case './locale/tzl.js': return Promise.resolve().then(function(){return tzl});
     case './locale/tzm-latn.js': return Promise.resolve().then(function(){return tzmLatn});
     case './locale/tzm.js': return Promise.resolve().then(function(){return tzm});
     case './locale/ug-cn.js': return Promise.resolve().then(function(){return ugCn});
     case './locale/uk.js': return Promise.resolve().then(function(){return uk});
     case './locale/ur.js': return Promise.resolve().then(function(){return ur});
     case './locale/uz-latn.js': return Promise.resolve().then(function(){return uzLatn});
     case './locale/uz.js': return Promise.resolve().then(function(){return uz});
     case './locale/vi.js': return Promise.resolve().then(function(){return vi});
     case './locale/x-pseudo.js': return Promise.resolve().then(function(){return xPseudo});
     case './locale/yo.js': return Promise.resolve().then(function(){return yo});
     case './locale/zh-cn.js': return Promise.resolve().then(function(){return zhCn});
     case './locale/zh-hk.js': return Promise.resolve().then(function(){return zhHk});
     case './locale/zh-tw.js': return Promise.resolve().then(function(){return zhTw});
     case './locale/zh.js': return Promise.resolve().then(function(){return zh});
     default: return Promise.reject(new Error("Unknown variable dynamic import: " + path));
   }
 }
dayjs__default['default'].extend(localeData__default['default']);
dayjs__default['default'].extend(localizedFormat__default['default']);
dayjs__default['default'].extend(customParseFormat__default['default']);
dayjs__default['default'].extend(isToday__default['default']);
dayjs__default['default'].extend(isBetween__default['default']);
dayjs__default['default'].extend(duration__default['default']);
var script$6 = /*#__PURE__*/vue.defineComponent({
  name: 'LitepieDatepicker',
  // vue component name
  components: {
    LitepieHeader: script,
    LitepieMonth: script$1,
    LitepieWeek: script$2,
    LitepieYear: script$3,
    LitepieCalendar: script$4,
    LitepieShortcut: script$5
  },
  directives: {
    litepie: {
      mounted: function mounted(el, binding) {
        useDirective(binding);
      },
      updated: function updated(el, binding) {
        useDirective(binding);
      }
    }
  },
  props: {
    overlay: Boolean,
    asSingle: Boolean,
    useRange: Boolean,
    placeholder: {
      type: [Boolean, String],
      default: false
    },
    i18n: {
      type: String,
      default: 'en'
    },
    disableDate: {
      type: [Boolean, Array, Function],
      default: false
    },
    disableInRange: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: null
    },
    autoApply: {
      type: Boolean,
      default: true
    },
    shortcuts: {
      type: [Boolean, Function],
      default: true
    },
    separator: {
      type: String,
      default: ' ~ '
    },
    formatter: {
      type: Object,
      default: function _default() {
        return {
          date: 'YYYY-MM-DD HH:mm:ss',
          month: 'MMM'
        };
      }
    },
    modelValue: {
      type: [Array, Object, String],
      default: []
    },
    startFrom: {
      type: [Object, String],
      default: function _default() {
        return new Date();
      }
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          shortcuts: {
            today: 'Today',
            yesterday: 'Yesterday',
            past: function past(period) {
              return "Last ".concat(period, " Days");
            },
            currentMonth: 'This Month',
            pastMonth: 'Last Month'
          },
          footer: {
            apply: 'Apply',
            cancel: 'Cancel'
          }
        };
      }
    }
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var LitepieRef = vue.ref(null);
    var LitepieDatepickerRef = vue.ref(null);
    var LitepieInputRef = vue.ref(null);
    var isShow = vue.ref(false);
    var placement = vue.ref(true);
    var givenPlaceholder = vue.ref('');
    var selection = vue.ref(null);
    var pickerValue = vue.ref('');
    var hoverValue = vue.ref([]);
    var applyValue = vue.ref([]);
    var previous = vue.ref(null);
    var next = vue.ref(null);
    var panel = vue.reactive({
      previous: {
        calendar: true,
        month: false,
        year: false
      },
      next: {
        calendar: true,
        month: false,
        year: false
      }
    });
    var datepicker = vue.ref({
      previous: dayjs__default['default'](),
      next: dayjs__default['default']().add(1, 'month'),
      year: {
        previous: dayjs__default['default']().year(),
        next: dayjs__default['default']().year()
      },
      weeks: dayjs__default['default'].weekdaysShort(),
      months: props.formatter.month === 'MMM' ? dayjs__default['default'].monthsShort() : dayjs__default['default'].months()
    });
    var weeks = vue.computed(function () {
      return datepicker.value.weeks;
    });
    var months = vue.computed(function () {
      return datepicker.value.months;
    });
    var calendar = vue.computed(function () {
      var _unref = vue.unref(datepicker),
          previous = _unref.previous,
          next = _unref.next,
          year = _unref.year;

      return {
        previous: {
          date: function date() {
            return usePreviousDate(previous).concat(useCurrentDate(previous)).concat(useNextDate(previous)).map(function (v) {
              v.today = v.isToday();
              v.active = previous.month() === v.month();
              v.off = previous.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = function () {
                if (props.asSingle && !props.useRange) {
                  return previous.month() !== v.month();
                }
              };

              v.hovered = function () {
                if (!asRange()) return false;

                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && previous.month() === v.month();
                }

                return false;
              };

              v.duration = function () {
                return false;
              };

              return v;
            });
          },
          month: previous && previous.format(props.formatter.month),
          year: previous && previous.year(),
          years: function years() {
            return Array.from({
              length: 12
            }, function (v, k) {
              return year.previous + k;
            });
          },
          onPrevious: function onPrevious() {
            datepicker.value.previous = previous.subtract(1, 'month');
          },
          onNext: function onNext() {
            datepicker.value.previous = previous.add(1, 'month');

            if (previous.diff(next, 'month') === -1) {
              datepicker.value.next = next.add(1, 'month');
            }
          },
          onPreviousYear: function onPreviousYear() {
            datepicker.value.year.previous = datepicker.value.year.previous - 12;
          },
          onNextYear: function onNextYear() {
            datepicker.value.year.previous = datepicker.value.year.previous + 12;
          },
          openMonth: function openMonth() {
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
          },
          setMount: function setMount($event) {
            datepicker.value.previous = previous.month($event);
            panel.previous.month = !panel.previous.month;
            panel.previous.year = false;
            panel.previous.calendar = !panel.previous.month;
            vue.nextTick(function () {
              if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
                datepicker.value.next = datepicker.value.previous.add(1, 'month');
              }

              datepicker.value.year.next = datepicker.value.next.year();
            });
          },
          openYear: function openYear() {
            panel.previous.year = !panel.previous.year;
            panel.previous.month = false;
            panel.previous.calendar = !panel.previous.year;
          },
          setYear: function setYear($event, asNext) {
            if (!asNext) {
              datepicker.value.previous = previous.year($event);
              panel.previous.year = !panel.previous.year;
              panel.previous.calendar = !panel.previous.year;
              vue.nextTick(function () {
                if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
                  datepicker.value.next = datepicker.value.previous.add(1, 'month');
                }

                datepicker.value.year.previous = datepicker.value.previous.year();
                datepicker.value.year.next = datepicker.value.next.year();
              });
            }
          }
        },
        next: {
          date: function date() {
            return usePreviousDate(next).concat(useCurrentDate(next)).concat(useNextDate(next)).map(function (v) {
              v.today = v.isToday();
              v.active = next.month() === v.month();
              v.off = next.month() !== v.month();
              v.sunday = v.day() === 0;
              v.disabled = useDisableDate(v, props) && !inRangeDate(v);

              v.inRange = function () {
                if (props.asSingle && !props.useRange) {
                  return next.month() !== v.month();
                }
              };

              v.hovered = function () {
                if (hoverValue.value.length > 1) {
                  return (v.isBetween(hoverValue.value[0], hoverValue.value[1], 'date', '()') || v.isBetween(hoverValue.value[1], hoverValue.value[0], 'date', '()')) && next.month() === v.month();
                }

                return false;
              };

              v.duration = function () {
                return false;
              };

              return v;
            });
          },
          month: next && next.format(props.formatter.month),
          year: next && next.year(),
          years: function years() {
            return Array.from({
              length: 12
            }, function (v, k) {
              return year.next + k;
            });
          },
          onPrevious: function onPrevious() {
            datepicker.value.next = next.subtract(1, 'month');

            if (next.diff(previous, 'month') === 1) {
              datepicker.value.previous = previous.subtract(1, 'month');
            }
          },
          onNext: function onNext() {
            datepicker.value.next = next.add(1, 'month');
          },
          onPreviousYear: function onPreviousYear() {
            datepicker.value.year.next = datepicker.value.year.next - 12;
          },
          onNextYear: function onNextYear() {
            datepicker.value.year.next = datepicker.value.year.next + 12;
          },
          openMonth: function openMonth() {
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
          },
          setMount: function setMount($event) {
            datepicker.value.next = next.month($event);
            panel.next.month = !panel.next.month;
            panel.next.year = false;
            panel.next.calendar = !panel.next.month;
            vue.nextTick(function () {
              if (datepicker.value.previous.isSame(datepicker.value.next, 'month') || datepicker.value.previous.isAfter(datepicker.value.next)) {
                datepicker.value.previous = datepicker.value.next.subtract(1, 'month');
              }

              datepicker.value.year.previous = datepicker.value.previous.year();
            });
          },
          openYear: function openYear() {
            panel.next.year = !panel.next.year;
            panel.next.month = false;
            panel.next.calendar = !panel.next.year;
          },
          setYear: function setYear($event, asNext) {
            if (asNext) {
              datepicker.value.next = next.year($event);
              panel.next.year = !panel.next.year;
              panel.next.month = false;
              panel.next.calendar = !panel.next.year;
              vue.nextTick(function () {
                if (datepicker.value.previous.isSame(datepicker.value.next, 'month') || datepicker.value.previous.isAfter(datepicker.value.next)) {
                  datepicker.value.previous = datepicker.value.next.subtract(1, 'month');
                }

                datepicker.value.year.previous = datepicker.value.previous.year();
                datepicker.value.year.next = datepicker.value.next.year();
              });
            }
          }
        }
      };
    });

    var useArray = function useArray() {
      return Array.isArray(props.modelValue);
    };

    var useObject = function useObject() {
      return _typeof(props.modelValue) === 'object';
    };

    var asRange = function asRange() {
      if (!props.useRange && !props.asSingle) {
        return true;
      } else if (!props.useRange && props.asSingle) {
        return false;
      } else if (props.useRange && !props.asSingle) {
        return true;
      } else return !!(props.useRange && props.asSingle);
    };

    var inRangeDate = function inRangeDate(date) {
      if (props.disableInRange) return false;
      if (pickerValue.value === '') return false;
      var s, e;

      if (useArray()) {
        var _props$modelValue = _slicedToArray(props.modelValue, 2),
            start = _props$modelValue[0],
            end = _props$modelValue[1];

        s = start;
        e = end;
      } else if (useObject()) {
        if (props.modelValue) {
          var _Object$values = Object.values(props.modelValue),
              _Object$values2 = _slicedToArray(_Object$values, 2),
              _start = _Object$values2[0],
              _end = _Object$values2[1];

          s = _start;
          e = _end;
        }
      } else {
        var _props$modelValue$spl = props.modelValue.split(props.separator),
            _props$modelValue$spl2 = _slicedToArray(_props$modelValue$spl, 2),
            _start2 = _props$modelValue$spl2[0],
            _end2 = _props$modelValue$spl2[1];

        s = _start2;
        e = _end2;
      }

      return date.isBetween(dayjs__default['default'](s, props.formatter.date, true), dayjs__default['default'](e, props.formatter.date, true), 'date', '[]');
    };

    var show = function show() {
      isShow.value = true;
    };

    var hide = function hide() {
      isShow.value = false;
    };

    var force = function force() {
      previous.value = null;
      next.value = null;
      hoverValue.value = [];
      selection.value = null;
    };

    var clearPicker = function clearPicker() {
      pickerValue.value = '';

      if (useArray()) {
        emit('update:modelValue', []);
      } else if (useObject()) {
        var obj = {};

        var _Object$keys = Object.keys(props.modelValue),
            _Object$keys2 = _slicedToArray(_Object$keys, 2),
            start = _Object$keys2[0],
            end = _Object$keys2[1];

        obj[start] = '';
        obj[end] = '';
        emit('update:modelValue', obj);
      } else {
        emit('update:modelValue', '');
      }

      applyValue.value = [];
      LitepieInputRef.value && LitepieInputRef.value.focus();
    };
    /**
     * keyUp event
     * @since v1.0.5
     */


    var keyUp = function keyUp() {
      if (asRange()) {
        var _pickerValue$value$sp = pickerValue.value.split(props.separator),
            _pickerValue$value$sp2 = _slicedToArray(_pickerValue$value$sp, 2),
            s = _pickerValue$value$sp2[0],
            e = _pickerValue$value$sp2[1];

        var _ref2 = [dayjs__default['default'](s, props.formatter.date, true), dayjs__default['default'](e, props.formatter.date, true)],
            sd = _ref2[0],
            ed = _ref2[1];

        if (sd.isValid() && ed.isValid()) {
          setDate(sd);
          setDate(ed);

          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            var obj = {};

            var _Object$keys3 = Object.keys(props.modelValue),
                _Object$keys4 = _slicedToArray(_Object$keys3, 2),
                start = _Object$keys4[0],
                end = _Object$keys4[1];

            obj[start] = s;
            obj[end] = e;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', useToValueFromArray({
              previous: sd,
              next: ed
            }, props));
          }
        }
      } else {
        var d = dayjs__default['default'](pickerValue.value, props.formatter.date, true);

        if (d.isValid()) {
          setDate(d);

          if (useArray()) {
            emit('update:modelValue', [pickerValue.value]);
          } else if (useObject()) {
            var _obj = {};

            var _Object$keys5 = Object.keys(props.modelValue),
                _Object$keys6 = _slicedToArray(_Object$keys5, 1),
                _start3 = _Object$keys6[0];

            _obj[_start3] = pickerValue.value;
            emit('update:modelValue', _obj);
          } else {
            emit('update:modelValue', pickerValue.value);
          }
        }
      }
    };

    var setDate = function setDate(date, asNext) {
      if (asRange()) {
        if (previous.value) {
          next.value = date;

          if (props.autoApply) {
            if (date.isBefore(previous.value)) {
              pickerValue.value = useToValueFromArray({
                previous: date,
                next: previous.value
              }, props);
            } else {
              pickerValue.value = useToValueFromArray({
                previous: previous.value,
                next: date
              }, props);
            }

            var _pickerValue$value$sp3 = pickerValue.value.split(props.separator),
                _pickerValue$value$sp4 = _slicedToArray(_pickerValue$value$sp3, 2),
                s = _pickerValue$value$sp4[0],
                e = _pickerValue$value$sp4[1];

            if (useArray()) {
              emit('update:modelValue', [dayjs__default['default'](s, props.formatter.date, true).format(props.formatter.date), dayjs__default['default'](e, props.formatter.date, true).format(props.formatter.date)]);
            } else if (useObject()) {
              var obj = {};

              var _Object$keys7 = Object.keys(props.modelValue),
                  _Object$keys8 = _slicedToArray(_Object$keys7, 2),
                  start = _Object$keys8[0],
                  end = _Object$keys8[1];

              obj[start] = s;
              obj[end] = e;
              emit('update:modelValue', obj);
            } else {
              emit('update:modelValue', useToValueFromArray({
                previous: dayjs__default['default'](s, props.formatter.date, true),
                next: dayjs__default['default'](e, props.formatter.date, true)
              }, props));
            }

            isShow.value = false;
            applyValue.value = [];

            if (!dayjs__default['default'](s, props.formatter.date, true).isSame(dayjs__default['default'](e, props.formatter.date, true), 'month')) {
              datepicker.value.previous = dayjs__default['default'](s, props.formatter.date, true);
              datepicker.value.next = dayjs__default['default'](e, props.formatter.date, true);
            }

            force();
          } else {
            if (previous.value.isAfter(date, 'month')) {
              applyValue.value = [date, previous.value];
            } else {
              applyValue.value = [previous.value, date];
            }

            var _applyValue$value = _slicedToArray(applyValue.value, 2),
                _s = _applyValue$value[0],
                _e = _applyValue$value[1];

            if (!_s.isSame(_e, 'month')) {
              datepicker.value.previous = _s;
              datepicker.value.next = _e;
            }

            force();
          }
        } else {
          applyValue.value = [];
          previous.value = date;
          selection.value = date;
          hoverValue.value.push(date);
          applyValue.value.push(date);

          if (asNext) {
            datepicker.value.next = date;

            if (datepicker.value.previous.isSame(date, 'month')) {
              datepicker.value.next = date.add(1, 'month');
            }
          } else {
            datepicker.value.previous = date;

            if (datepicker.value.next.isSame(date, 'month')) {
              datepicker.value.previous = datepicker.value.next;
              datepicker.value.next = date.add(1, 'month');
            }
          }
        }
      } else {
        if (props.autoApply) {
          pickerValue.value = useToValueFromString(date, props);

          if (useArray()) {
            emit('update:modelValue', [pickerValue.value]);
          } else if (useObject()) {
            var _obj2 = {};

            var _Object$keys9 = Object.keys(props.modelValue),
                _Object$keys10 = _slicedToArray(_Object$keys9, 1),
                _start4 = _Object$keys10[0];

            _obj2[_start4] = pickerValue.value;
            emit('update:modelValue', _obj2);
          } else {
            emit('update:modelValue', pickerValue.value);
          }

          isShow.value = false;
          applyValue.value = [];
          force();
        } else {
          applyValue.value = [date];
          force();
        }
      }
    }; // TODO: Working with date time


    var setHours = function setHours() {
    };

    var setMinutes = function setMinutes() {
    };

    var setSeconds = function setSeconds() {
    };

    var applyDate = function applyDate() {
      if (applyValue.value.length < 1) return false;
      var date;

      if (asRange()) {
        var _applyValue$value2 = _slicedToArray(applyValue.value, 2),
            s = _applyValue$value2[0],
            e = _applyValue$value2[1];

        if (e.isBefore(s)) {
          date = useToValueFromArray({
            previous: e,
            next: s
          }, props);
        } else {
          date = useToValueFromArray({
            previous: s,
            next: e
          }, props);
        }
      } else {
        var _applyValue$value3 = _slicedToArray(applyValue.value, 1),
            _s2 = _applyValue$value3[0];

        date = _s2;
      }

      if (asRange()) {
        var _date$split = date.split(props.separator),
            _date$split2 = _slicedToArray(_date$split, 2),
            _s3 = _date$split2[0],
            _e2 = _date$split2[1];

        if (useArray()) {
          emit('update:modelValue', [dayjs__default['default'](_s3, props.formatter.date, true).format(props.formatter.date), dayjs__default['default'](_e2, props.formatter.date, true).format(props.formatter.date)]);
        } else if (useObject()) {
          var obj = {};

          var _Object$keys11 = Object.keys(props.modelValue),
              _Object$keys12 = _slicedToArray(_Object$keys11, 2),
              start = _Object$keys12[0],
              end = _Object$keys12[1];

          obj[start] = _s3;
          obj[end] = _e2;
          emit('update:modelValue', obj);
        } else {
          emit('update:modelValue', useToValueFromArray({
            previous: dayjs__default['default'](_s3, props.formatter.date, true),
            next: dayjs__default['default'](_e2, props.formatter.date, true)
          }, props));
        }

        pickerValue.value = date;
      } else {
        pickerValue.value = date.format(props.formatter.date);

        if (useArray()) {
          emit('update:modelValue', [pickerValue.value]);
        } else if (useObject()) {
          var _obj3 = {};

          var _Object$keys13 = Object.keys(props.modelValue),
              _Object$keys14 = _slicedToArray(_Object$keys13, 1),
              _start5 = _Object$keys14[0];

          _obj3[_start5] = pickerValue.value;
          emit('update:modelValue', _obj3);
        } else {
          emit('update:modelValue', pickerValue.value);
        }
      }
    };

    var atMouseOver = function atMouseOver(date) {
      if (!asRange()) return false;

      if (previous.value) {
        hoverValue.value = [previous.value, date];
      } else {
        hoverValue.value = [];
        return false;
      }
    };

    var isBetweenRange = function isBetweenRange(date) {
      if (previous.value && props.autoApply) return false;
      var s, e;

      if (hoverValue.value.length > 1) {
        var _hoverValue$value = _slicedToArray(hoverValue.value, 2),
            start = _hoverValue$value[0],
            end = _hoverValue$value[1];

        s = dayjs__default['default'](start, props.formatter.date, true);
        e = dayjs__default['default'](end, props.formatter.date, true);
      } else {
        if (useArray()) {
          if (props.autoApply) {
            var _props$modelValue2 = _slicedToArray(props.modelValue, 2),
                _start6 = _props$modelValue2[0],
                _end3 = _props$modelValue2[1];

            s = _start6 && dayjs__default['default'](_start6, props.formatter.date, true);
            e = _end3 && dayjs__default['default'](_end3, props.formatter.date, true);
          } else {
            var _applyValue$value4 = _slicedToArray(applyValue.value, 2),
                _start7 = _applyValue$value4[0],
                _end4 = _applyValue$value4[1];

            s = dayjs__default['default'](_start7, props.formatter.date, true);
            e = dayjs__default['default'](_end4, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values3 = Object.values(props.modelValue),
                  _Object$values4 = _slicedToArray(_Object$values3, 2),
                  _start8 = _Object$values4[0],
                  _end5 = _Object$values4[1];

              s = _start8 && dayjs__default['default'](_start8, props.formatter.date, true);
              e = _end5 && dayjs__default['default'](_end5, props.formatter.date, true);
            }
          } else {
            var _applyValue$value5 = _slicedToArray(applyValue.value, 2),
                _start9 = _applyValue$value5[0],
                _end6 = _applyValue$value5[1];

            s = dayjs__default['default'](_start9, props.formatter.date, true);
            e = dayjs__default['default'](_end6, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            var _ref3 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                _ref4 = _slicedToArray(_ref3, 2),
                _start10 = _ref4[0],
                _end7 = _ref4[1];

            s = _start10 && dayjs__default['default'](_start10, props.formatter.date, true);
            e = _end7 && dayjs__default['default'](_end7, props.formatter.date, true);
          } else {
            var _applyValue$value6 = _slicedToArray(applyValue.value, 2),
                _start11 = _applyValue$value6[0],
                _end8 = _applyValue$value6[1];

            s = dayjs__default['default'](_start11, props.formatter.date, true);
            e = dayjs__default['default'](_end8, props.formatter.date, true);
          }
        }
      }

      if (s && e) {
        return useBetweenRange(date, {
          previous: s,
          next: e
        });
      }

      return false;
    };

    var datepickerClasses = function datepickerClasses(date) {
      var today = date.today,
          active = date.active,
          off = date.off,
          disabled = date.disabled;
      var classes, s, e;

      if (asRange()) {
        if (useArray()) {
          if (selection.value) {
            var _hoverValue$value2 = _slicedToArray(hoverValue.value, 2),
                start = _hoverValue$value2[0],
                end = _hoverValue$value2[1];

            s = start && dayjs__default['default'](start, props.formatter.date, true);
            e = end && dayjs__default['default'](end, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _props$modelValue3 = _slicedToArray(props.modelValue, 2),
                  _start12 = _props$modelValue3[0],
                  _end9 = _props$modelValue3[1];

              s = _start12 && dayjs__default['default'](_start12, props.formatter.date, true);
              e = _end9 && dayjs__default['default'](_end9, props.formatter.date, true);
            } else {
              var _applyValue$value7 = _slicedToArray(applyValue.value, 2),
                  _start13 = _applyValue$value7[0],
                  _end10 = _applyValue$value7[1];

              s = _start13 && dayjs__default['default'](_start13, props.formatter.date, true);
              e = _end10 && dayjs__default['default'](_end10, props.formatter.date, true);
            }
          }
        } else if (useObject()) {
          if (selection.value) {
            var _hoverValue$value3 = _slicedToArray(hoverValue.value, 2),
                _start14 = _hoverValue$value3[0],
                _end11 = _hoverValue$value3[1];

            s = _start14 && dayjs__default['default'](_start14, props.formatter.date, true);
            e = _end11 && dayjs__default['default'](_end11, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _ref5 = props.modelValue ? Object.values(props.modelValue) : [false, false],
                  _ref6 = _slicedToArray(_ref5, 2),
                  _start15 = _ref6[0],
                  _end12 = _ref6[1];

              s = _start15 && dayjs__default['default'](_start15, props.formatter.date, true);
              e = _end12 && dayjs__default['default'](_end12, props.formatter.date, true);
            } else {
              var _applyValue$value8 = _slicedToArray(applyValue.value, 2),
                  _start16 = _applyValue$value8[0],
                  _end13 = _applyValue$value8[1];

              s = _start16 && dayjs__default['default'](_start16, props.formatter.date, true);
              e = _end13 && dayjs__default['default'](_end13, props.formatter.date, true);
            }
          }
        } else {
          if (selection.value) {
            var _hoverValue$value4 = _slicedToArray(hoverValue.value, 2),
                _start17 = _hoverValue$value4[0],
                _end14 = _hoverValue$value4[1];

            s = _start17 && dayjs__default['default'](_start17, props.formatter.date, true);
            e = _end14 && dayjs__default['default'](_end14, props.formatter.date, true);
          } else {
            if (props.autoApply) {
              var _ref7 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                  _ref8 = _slicedToArray(_ref7, 2),
                  _start18 = _ref8[0],
                  _end15 = _ref8[1];

              s = _start18 && dayjs__default['default'](_start18, props.formatter.date, true);
              e = _end15 && dayjs__default['default'](_end15, props.formatter.date, true);
            } else {
              var _applyValue$value9 = _slicedToArray(applyValue.value, 2),
                  _start19 = _applyValue$value9[0],
                  _end16 = _applyValue$value9[1];

              s = _start19 && dayjs__default['default'](_start19, props.formatter.date, true);
              e = _end16 && dayjs__default['default'](_end16, props.formatter.date, true);
            }
          }
        }
      } else {
        if (useArray()) {
          if (props.autoApply) {
            if (props.modelValue.length > 0) {
              var _props$modelValue4 = _slicedToArray(props.modelValue, 1),
                  _start20 = _props$modelValue4[0];

              s = dayjs__default['default'](_start20, props.formatter.date, true);
            }
          } else {
            var _applyValue$value10 = _slicedToArray(applyValue.value, 1),
                _start21 = _applyValue$value10[0];

            s = _start21 && dayjs__default['default'](_start21, props.formatter.date, true);
          }
        } else if (useObject()) {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values5 = Object.values(props.modelValue),
                  _Object$values6 = _slicedToArray(_Object$values5, 1),
                  _start22 = _Object$values6[0];

              s = dayjs__default['default'](_start22, props.formatter.date, true);
            }
          } else {
            var _applyValue$value11 = _slicedToArray(applyValue.value, 1),
                _start23 = _applyValue$value11[0];

            s = _start23 && dayjs__default['default'](_start23, props.formatter.date, true);
          }
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              var _props$modelValue$spl3 = props.modelValue.split(props.separator),
                  _props$modelValue$spl4 = _slicedToArray(_props$modelValue$spl3, 1),
                  _start24 = _props$modelValue$spl4[0];

              s = dayjs__default['default'](_start24, props.formatter.date, true);
            }
          } else {
            var _applyValue$value12 = _slicedToArray(applyValue.value, 1),
                _start25 = _applyValue$value12[0];

            s = _start25 && dayjs__default['default'](_start25, props.formatter.date, true);
          }
        }
      }

      if (active) {
        classes = today ? "text-litepie-primary-500 font-semibold dark:text-litepie-primary-400 rounded-full" : disabled ? "text-litepie-secondary-600 font-normal disabled:text-litepie-secondary-500 disabled:cursor-not-allowed rounded-full" : date.isBetween(s, e, 'date', '()') ? "text-litepie-secondary-700 font-medium dark:text-litepie-secondary-100 rounded-full" : "text-litepie-secondary-600 font-medium dark:text-litepie-secondary-200 rounded-full";
      }

      if (off) {
        classes = "text-litepie-secondary-400 font-light disabled:cursor-not-allowed";
      }

      if (s && e && !off) {
        if (date.isSame(s, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
          }
        }

        if (date.isSame(e, 'date')) {
          classes = e.isAfter(s, 'date') ? 'bg-litepie-primary-500 text-white font-bold rounded-r-full disabled:cursor-not-allowed' : 'bg-litepie-primary-500 text-white font-bold rounded-l-full disabled:cursor-not-allowed';

          if (s.isSame(e, 'date')) {
            classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
          }
        }
      } else if (s) {
        if (date.isSame(s, 'date') && !off) {
          classes = "bg-litepie-primary-500 text-white font-bold rounded-full disabled:cursor-not-allowed";
        }
      }

      return classes;
    };

    var betweenRangeClasses = function betweenRangeClasses(date) {
      var classes, s, e;
      classes = '';
      if (!asRange()) return classes;

      if (useArray()) {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value5 = _slicedToArray(hoverValue.value, 2),
              start = _hoverValue$value5[0],
              end = _hoverValue$value5[1];

          s = start && dayjs__default['default'](start, props.formatter.date, true);
          e = end && dayjs__default['default'](end, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            var _props$modelValue5 = _slicedToArray(props.modelValue, 2),
                _start26 = _props$modelValue5[0],
                _end17 = _props$modelValue5[1];

            s = _start26 && dayjs__default['default'](_start26, props.formatter.date, true);
            e = _end17 && dayjs__default['default'](_end17, props.formatter.date, true);
          } else {
            var _applyValue$value13 = _slicedToArray(applyValue.value, 2),
                _start27 = _applyValue$value13[0],
                _end18 = _applyValue$value13[1];

            s = _start27 && dayjs__default['default'](_start27, props.formatter.date, true);
            e = _end18 && dayjs__default['default'](_end18, props.formatter.date, true);
          }
        }
      } else if (useObject()) {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value6 = _slicedToArray(hoverValue.value, 2),
              _start28 = _hoverValue$value6[0],
              _end19 = _hoverValue$value6[1];

          s = _start28 && dayjs__default['default'](_start28, props.formatter.date, true);
          e = _end19 && dayjs__default['default'](_end19, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            if (props.modelValue) {
              var _Object$values7 = Object.values(props.modelValue),
                  _Object$values8 = _slicedToArray(_Object$values7, 2),
                  _start29 = _Object$values8[0],
                  _end20 = _Object$values8[1];

              s = _start29 && dayjs__default['default'](_start29, props.formatter.date, true);
              e = _end20 && dayjs__default['default'](_end20, props.formatter.date, true);
            }
          } else {
            var _applyValue$value14 = _slicedToArray(applyValue.value, 2),
                _start30 = _applyValue$value14[0],
                _end21 = _applyValue$value14[1];

            s = _start30 && dayjs__default['default'](_start30, props.formatter.date, true);
            e = _end21 && dayjs__default['default'](_end21, props.formatter.date, true);
          }
        }
      } else {
        if (hoverValue.value.length > 1) {
          var _hoverValue$value7 = _slicedToArray(hoverValue.value, 2),
              _start31 = _hoverValue$value7[0],
              _end22 = _hoverValue$value7[1];

          s = _start31 && dayjs__default['default'](_start31, props.formatter.date, true);
          e = _end22 && dayjs__default['default'](_end22, props.formatter.date, true);
        } else {
          if (props.autoApply) {
            var _ref9 = props.modelValue ? props.modelValue.split(props.separator) : [false, false],
                _ref10 = _slicedToArray(_ref9, 2),
                _start32 = _ref10[0],
                _end23 = _ref10[1];

            s = _start32 && dayjs__default['default'](_start32, props.formatter.date, true);
            e = _end23 && dayjs__default['default'](_end23, props.formatter.date, true);
          } else {
            var _applyValue$value15 = _slicedToArray(applyValue.value, 2),
                _start33 = _applyValue$value15[0],
                _end24 = _applyValue$value15[1];

            s = _start33 && dayjs__default['default'](_start33, props.formatter.date, true);
            e = _end24 && dayjs__default['default'](_end24, props.formatter.date, true);
          }
        }
      }

      if (s && e) {
        if (date.isSame(s, 'date')) {
          if (e.isBefore(s)) {
            classes += " rounded-r-full inset-0";
          }

          if (s.isBefore(e)) {
            classes += " rounded-l-full inset-0";
          }
        } else if (date.isSame(e, 'date')) {
          if (e.isBefore(s)) {
            classes += " rounded-l-full inset-0";
          }

          if (s.isBefore(e)) {
            classes += " rounded-r-full inset-0";
          }
        } else {
          classes += " inset-0";
        }
      }

      return classes;
    };

    var forceEmit = function forceEmit(s, e) {
      datepicker.value.previous = dayjs__default['default'](s, props.formatter.date, true);
      datepicker.value.next = dayjs__default['default'](e, props.formatter.date, true);

      if (dayjs__default['default'].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 2 || dayjs__default['default'].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.months === 1 && dayjs__default['default'].duration(datepicker.value.next.diff(datepicker.value.previous)).$d.days === 7) {
        datepicker.value.next = datepicker.value.next.subtract(1, 'month');
      }

      if (datepicker.value.next.isSame(datepicker.value.previous, 'month') || datepicker.value.next.isBefore(datepicker.value.previous)) {
        datepicker.value.next = datepicker.value.previous.add(1, 'month');
      }
    };

    var emitShortcut = function emitShortcut(s, e) {
      if (asRange()) {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s, e]);
          } else if (useObject()) {
            var obj = {};

            var _Object$keys15 = Object.keys(props.modelValue),
                _Object$keys16 = _slicedToArray(_Object$keys15, 2),
                start = _Object$keys16[0],
                end = _Object$keys16[1];

            obj[start] = s;
            obj[end] = e;
            emit('update:modelValue', obj);
          } else {
            emit('update:modelValue', useToValueFromArray({
              previous: s,
              next: e
            }, props));
          }

          pickerValue.value = "".concat(s).concat(props.separator).concat(e);
        } else {
          applyValue.value = [dayjs__default['default'](s, props.formatter.date, true), dayjs__default['default'](e, props.formatter.date, true)];
        }
      } else {
        if (props.autoApply) {
          if (useArray()) {
            emit('update:modelValue', [s]);
          } else if (useObject()) {
            var _obj4 = {};

            var _Object$keys17 = Object.keys(props.modelValue),
                _Object$keys18 = _slicedToArray(_Object$keys17, 1),
                _start34 = _Object$keys18[0];

            _obj4[_start34] = s;
            emit('update:modelValue', _obj4);
          } else {
            emit('update:modelValue', s);
          }

          pickerValue.value = s;
        } else {
          applyValue.value = [dayjs__default['default'](s, props.formatter.date, true), dayjs__default['default'](e, props.formatter.date, true)];
        }
      }

      forceEmit(s, e);
    };

    var setToToday = function setToToday() {
      var s = dayjs__default['default']().format(props.formatter.date);
      var e = dayjs__default['default']().format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToYesterday = function setToYesterday() {
      var s = dayjs__default['default']().subtract(1, 'day').format(props.formatter.date);
      var e = dayjs__default['default']().subtract(1, 'day').format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToLastDay = function setToLastDay(day) {
      var s = dayjs__default['default']().subtract(day - 1, 'day').format(props.formatter.date);
      var e = dayjs__default['default']().format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToThisMonth = function setToThisMonth() {
      var s = dayjs__default['default']().date(1).format(props.formatter.date);
      var e = dayjs__default['default']().date(dayjs__default['default']().daysInMonth()).format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToLastMonth = function setToLastMonth() {
      var s = dayjs__default['default']().date(1).subtract(1, 'month').format(props.formatter.date);
      var e = dayjs__default['default']().date(0).format(props.formatter.date);
      emitShortcut(s, e);
    };

    var setToCustomShortcut = function setToCustomShortcut(item) {
      var s, e;

      var _item$atClick = item.atClick(),
          _item$atClick2 = _slicedToArray(_item$atClick, 2),
          d = _item$atClick2[0],
          dd = _item$atClick2[1];

      s = dayjs__default['default'](d).format(props.formatter.date);
      e = dayjs__default['default'](dd).format(props.formatter.date);
      emitShortcut(s, e);
    };

    vue.watch(function () {
      return isShow.value;
    }, function () {
      vue.nextTick(function () {
        placement.value = useVisibleViewport(LitepieRef.value);
      });
    });
    vue.watch(function () {
      return applyValue.value;
    }, function (newValue) {
      if (newValue.length > 0) {
        panel.previous.calendar = true;
        panel.previous.month = false;
        panel.previous.year = false;
        panel.next.calendar = true;
        panel.next.month = false;
        panel.next.year = false;
      }
    });
    vue.watchEffect(function () {
      if (!props.placeholder) {
        if (asRange()) {
          givenPlaceholder.value = "".concat(props.formatter.date).concat(props.separator).concat(props.formatter.date);
        } else {
          givenPlaceholder.value = props.formatter.date;
        }
      } else {
        givenPlaceholder.value = props.placeholder;
      }
    });
    vue.watchEffect(function () {
      var locale = props.i18n;
      vue.nextTick(function () {
        __variableDynamicImportRuntime0__("./locale/".concat(locale, ".js")).then(function () {
          dayjs__default['default'].locale(locale);
          var s, e;

          if (asRange()) {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                var _props$modelValue6 = _slicedToArray(props.modelValue, 2),
                    start = _props$modelValue6[0],
                    end = _props$modelValue6[1];

                s = dayjs__default['default'](start, props.formatter.date, true);
                e = dayjs__default['default'](end, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (!vue.isProxy(props.modelValue)) {
                try {
                  console.log(Object.keys(props.modelValue));
                } catch (e) {
                  console.warn('[Litepie Datepicker]: It looks like you want to use Object as the argument %cv-model', 'font-style: italic; color: #42b883;', ', but you pass it undefined or null.');
                  console.warn("[Litepie Datepicker]: We has replace with %c{ startDate: '', endDate: '' }", 'font-style: italic; color: #42b883;', ', but you can replace manually.');
                  emit('update:modelValue', {
                    startDate: '',
                    endDate: ''
                  });
                }
              }

              if (props.modelValue) {
                var _Object$values9 = Object.values(props.modelValue),
                    _Object$values10 = _slicedToArray(_Object$values9, 2),
                    _start35 = _Object$values10[0],
                    _end25 = _Object$values10[1];

                s = _start35 && dayjs__default['default'](_start35, props.formatter.date, true);
                e = _end25 && dayjs__default['default'](_end25, props.formatter.date, true);
              }
            } else {
              if (props.modelValue) {
                var _props$modelValue$spl5 = props.modelValue.split(props.separator),
                    _props$modelValue$spl6 = _slicedToArray(_props$modelValue$spl5, 2),
                    _start36 = _props$modelValue$spl6[0],
                    _end26 = _props$modelValue$spl6[1];

                s = dayjs__default['default'](_start36, props.formatter.date, true);
                e = dayjs__default['default'](_end26, props.formatter.date, true);
              }
            }

            if (s && e) {
              pickerValue.value = useToValueFromArray({
                previous: s,
                next: e
              }, props);

              if (e.isBefore(s, 'month')) {
                datepicker.value.previous = e;
                datepicker.value.next = s;
                datepicker.value.year.previous = e.year();
                datepicker.value.year.next = s.year();
              } else if (e.isSame(s, 'month')) {
                datepicker.value.previous = s;
                datepicker.value.next = e.add(1, 'month');
                datepicker.value.year.previous = s.year();
                datepicker.value.year.next = s.add(1, 'year').year();
              } else {
                datepicker.value.previous = s;
                datepicker.value.next = e;
                datepicker.value.year.previous = s.year();
                datepicker.value.year.next = e.year();
              }

              if (!props.autoApply) {
                applyValue.value = [s, e];
              }
            } else {
              datepicker.value.previous = dayjs__default['default'](props.startFrom);
              datepicker.value.next = dayjs__default['default'](props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          } else {
            if (useArray()) {
              if (props.modelValue.length > 0) {
                var _props$modelValue7 = _slicedToArray(props.modelValue, 1),
                    _start37 = _props$modelValue7[0];

                s = dayjs__default['default'](_start37, props.formatter.date, true);
              }
            } else if (useObject()) {
              if (props.modelValue) {
                var _Object$values11 = Object.values(props.modelValue),
                    _Object$values12 = _slicedToArray(_Object$values11, 1),
                    _start38 = _Object$values12[0];

                s = dayjs__default['default'](_start38, props.formatter.date, true);
              }
            } else {
              if (props.modelValue.length) {
                var _props$modelValue$spl7 = props.modelValue.split(props.separator),
                    _props$modelValue$spl8 = _slicedToArray(_props$modelValue$spl7, 1),
                    _start39 = _props$modelValue$spl8[0];

                s = dayjs__default['default'](_start39, props.formatter.date, true);
              }
            }

            if (s && s.isValid()) {
              pickerValue.value = useToValueFromString(s, props);
              datepicker.value.previous = s;
              datepicker.value.next = s.add(1, 'month');
              datepicker.value.year.previous = s.year();
              datepicker.value.year.next = s.add(1, 'year').year();

              if (!props.autoApply) {
                applyValue.value = [s];
              }
            } else {
              datepicker.value.previous = dayjs__default['default'](props.startFrom);
              datepicker.value.next = dayjs__default['default'](props.startFrom).add(1, 'month');
              datepicker.value.year.previous = datepicker.value.previous.year();
              datepicker.value.year.next = datepicker.value.next.year();
            }
          }

          datepicker.value.weeks = dayjs__default['default'].weekdaysShort();
          datepicker.value.months = props.formatter.month === 'MMM' ? dayjs__default['default'].monthsShort() : dayjs__default['default'].months();
        }).catch(function () {
          console.warn("[Litepie Datepicker]: List of supported locales https://github.com/iamkun/dayjs/tree/dev/src/locale");
        });
      });
    });
    vue.provide('isBetweenRange', isBetweenRange);
    vue.provide('betweenRangeClasses', betweenRangeClasses);
    vue.provide('datepickerClasses', datepickerClasses);
    vue.provide('atMouseOver', atMouseOver);
    vue.provide('setToToday', setToToday);
    vue.provide('setToYesterday', setToYesterday);
    vue.provide('setToLastDay', setToLastDay);
    vue.provide('setToThisMonth', setToThisMonth);
    vue.provide('setToLastMonth', setToLastMonth);
    vue.provide('setToCustomShortcut', setToCustomShortcut);
    return {
      LitepieRef: LitepieRef,
      LitepieDatepickerRef: LitepieDatepickerRef,
      LitepieInputRef: LitepieInputRef,
      isShow: isShow,
      placement: placement,
      givenPlaceholder: givenPlaceholder,
      previous: previous,
      next: next,
      panel: panel,
      pickerValue: pickerValue,
      hoverValue: hoverValue,
      applyValue: applyValue,
      datepicker: datepicker,
      calendar: calendar,
      weeks: weeks,
      months: months,
      asRange: asRange,
      show: show,
      hide: hide,
      keyUp: keyUp,
      setDate: setDate,
      setHours: setHours,
      setMinutes: setMinutes,
      setSeconds: setSeconds,
      applyDate: applyDate,
      clearPicker: clearPicker
    };
  }
});var _hoisted_1$6 = {
  class: "relative block"
};
var _hoisted_2$4 = {
  class: "absolute inset-y-0 right-0 inline-flex items-center rounded-md overflow-hidden"
};
var _hoisted_3$2 = {
  class: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
var _hoisted_4$2 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M6 18L18 6M6 6l12 12"
};
var _hoisted_5$1 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "1.5",
  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
};
var _hoisted_6$1 = {
  class: "fixed inset-0 z-50 overflow-y-auto sm:overflow-visible sm:static sm:z-auto bg-white dark:bg-litepie-secondary-800 sm:rounded-lg shadow-sm"
};
var _hoisted_7$1 = {
  class: "flex flex-wrap lg:flex-nowrap"
};
var _hoisted_8$1 = {
  class: "relative flex flex-wrap sm:flex-nowrap p-1"
};
var _hoisted_9$1 = {
  key: 0,
  class: "hidden absolute inset-0 sm:flex justify-center items-center"
};

var _hoisted_10$1 = /*#__PURE__*/vue.createVNode("div", {
  class: "w-8 sm:w-1 h-1 sm:h-8 bg-litepie-primary-500 rounded-xl shadow-inner"
}, null, -1);

var _hoisted_11 = {
  class: "px-0.5 sm:px-2"
};
var _hoisted_12 = {
  key: 1,
  class: "relative w-full sm:w-80 overflow-hidden mt-3 sm:mt-0 sm:ml-2"
};
var _hoisted_13 = {
  class: "px-0.5 sm:px-2"
};
var _hoisted_14 = {
  key: 0
};
var _hoisted_15 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black border-opacity-10 dark:border-litepie-secondary-700 dark:border-opacity-100"
};
var _hoisted_16 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
var _hoisted_17 = {
  key: 1,
  class: "sm:hidden"
};
var _hoisted_18 = {
  class: "mt-2 mx-2 py-1.5 border-t border-black border-opacity-10 dark:border-litepie-secondary-700 dark:border-opacity-100"
};
var _hoisted_19 = {
  class: "mt-1.5 sm:flex sm:flex-row-reverse"
};
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_litepie_shortcut = vue.resolveComponent("litepie-shortcut");

  var _component_litepie_header = vue.resolveComponent("litepie-header");

  var _component_litepie_month = vue.resolveComponent("litepie-month");

  var _component_litepie_year = vue.resolveComponent("litepie-year");

  var _component_litepie_week = vue.resolveComponent("litepie-week");

  var _component_litepie_calendar = vue.resolveComponent("litepie-calendar");

  var _directive_litepie = vue.resolveDirective("litepie");

  return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
    id: "litepie",
    ref: "LitepieDatepickerRef",
    class: ["relative w-full", [{
      'litepie-datepicker-overlay': _ctx.overlay
    }, {
      open: _ctx.isShow && _ctx.overlay
    }]]
  }, [vue.renderSlot(_ctx.$slots, "default", {
    value: _ctx.pickerValue,
    placeholder: _ctx.givenPlaceholder,
    clear: _ctx.clearPicker
  }, function () {
    return [vue.createVNode("label", _hoisted_1$6, [vue.withDirectives(vue.createVNode("input", vue.mergeProps({
      ref: "LitepieInputRef",
      type: "text",
      class: "relative block w-full pl-3 pr-12 py-2.5 rounded-lg overflow-hidden text-sm text-litepie-secondary-700 placeholder-litepie-secondary-400 transition-colors bg-white border border-litepie-secondary-300 focus:border-litepie-primary-300 focus:ring focus:ring-litepie-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:text-litepie-secondary-100 dark:placeholder-litepie-secondary-500 dark:focus:border-litepie-primary-500 dark:focus:ring-opacity-20"
    }, _ctx.$attrs, {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
        return _ctx.pickerValue = $event;
      }),
      placeholder: _ctx.givenPlaceholder,
      onKeyup: _cache[2] || (_cache[2] = function () {
        return _ctx.keyUp && _ctx.keyUp.apply(_ctx, arguments);
      })
    }), null, 16, ["placeholder"]), [[vue.vModelText, _ctx.pickerValue]]), vue.createVNode("span", _hoisted_2$4, [vue.createVNode("button", {
      type: "button",
      class: "px-2 py-1 mr-1 focus:outline-none text-litepie-secondary-400 dark:text-opacity-70 rounded-md",
      onClick: _cache[3] || (_cache[3] = function ($event) {
        return _ctx.pickerValue ? _ctx.clearPicker() : _ctx.$refs.LitepieInputRef.focus();
      })
    }, [(vue.openBlock(), vue.createBlock("svg", _hoisted_3$2, [_ctx.pickerValue ? (vue.openBlock(), vue.createBlock("path", _hoisted_4$2)) : (vue.openBlock(), vue.createBlock("path", _hoisted_5$1))]))])])])];
  }), vue.createVNode(vue.Transition, {
    "enter-from-class": "opacity-0 translate-y-3",
    "enter-to-class": "opacity-100 translate-y-0",
    "enter-active-class": "transform transition ease-out duration-200",
    "leave-active-class": "transform transition ease-in duration-150",
    "leave-from-class": "opacity-100 translate-y-0",
    "leave-to-class": "opacity-0 translate-y-3"
  }, {
    default: vue.withCtx(function () {
      return [vue.withDirectives(vue.createVNode("div", {
        ref: "LitepieRef",
        class: ["absolute z-50 top-full sm:mt-2.5", _ctx.placement ? 'left-0 right-auto' : 'left-auto right-0']
      }, [vue.createVNode("div", _hoisted_6$1, [vue.createVNode("div", {
        class: ["litepie-datepicker static sm:relative w-full bg-white sm:rounded-lg sm:shadow-sm border-0 sm:border border-black border-opacity-10 px-3 py-3 sm:px-1 sm:py-1.5 dark:bg-litepie-secondary-800 dark:border-litepie-secondary-700 dark:border-opacity-100", _ctx.placement ? 'place-left' : 'place-right']
      }, [vue.createVNode("div", _hoisted_7$1, [_ctx.shortcuts ? (vue.openBlock(), vue.createBlock(_component_litepie_shortcut, {
        key: 0,
        shortcuts: _ctx.shortcuts,
        "as-range": _ctx.asRange(),
        "as-single": _ctx.asSingle,
        i18n: _ctx.options.shortcuts
      }, vue.createSlots({
        _: 2
      }, [vue.renderList(_ctx.$slots, function (_, name) {
        return {
          name: name,
          fn: vue.withCtx(function (slotData) {
            return [vue.renderSlot(_ctx.$slots, name, slotData)];
          })
        };
      })]), 1032, ["shortcuts", "as-range", "as-single", "i18n"])) : vue.createCommentVNode("", true), vue.createVNode("div", _hoisted_8$1, [_ctx.asRange() && !_ctx.asSingle ? (vue.openBlock(), vue.createBlock("div", _hoisted_9$1, [_hoisted_10$1])) : vue.createCommentVNode("", true), vue.createVNode("div", {
        class: ["relative w-full sm:w-80", {
          'mb-3 sm:mb-0 sm:mr-2': _ctx.asRange() && !_ctx.asSingle
        }]
      }, [vue.createVNode(_component_litepie_header, {
        panel: _ctx.panel.previous,
        calendar: _ctx.calendar.previous
      }, null, 8, ["panel", "calendar"]), vue.createVNode("div", _hoisted_11, [vue.withDirectives(vue.createVNode(_component_litepie_month, {
        months: _ctx.months,
        "onUpdate:month": _ctx.calendar.previous.setMount
      }, null, 8, ["months", "onUpdate:month"]), [[vue.vShow, _ctx.panel.previous.month]]), vue.withDirectives(vue.createVNode(_component_litepie_year, {
        years: _ctx.calendar.previous.years(),
        "onUpdate:year": _ctx.calendar.previous.setYear
      }, null, 8, ["years", "onUpdate:year"]), [[vue.vShow, _ctx.panel.previous.year]]), vue.withDirectives(vue.createVNode("div", null, [vue.createVNode(_component_litepie_week, {
        weeks: _ctx.weeks
      }, null, 8, ["weeks"]), vue.createVNode(_component_litepie_calendar, {
        calendar: _ctx.calendar.previous,
        weeks: _ctx.weeks,
        "as-range": _ctx.asRange(),
        "onUpdate:date": _ctx.setDate
      }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vue.vShow, _ctx.panel.previous.calendar]])])], 2), _ctx.asRange() && !_ctx.asSingle ? (vue.openBlock(), vue.createBlock("div", _hoisted_12, [vue.createVNode(_component_litepie_header, {
        "as-prev-or-next": "",
        panel: _ctx.panel.next,
        calendar: _ctx.calendar.next
      }, null, 8, ["panel", "calendar"]), vue.createVNode("div", _hoisted_13, [vue.withDirectives(vue.createVNode(_component_litepie_month, {
        months: _ctx.months,
        "onUpdate:month": _ctx.calendar.next.setMount
      }, null, 8, ["months", "onUpdate:month"]), [[vue.vShow, _ctx.panel.next.month]]), vue.withDirectives(vue.createVNode(_component_litepie_year, {
        "as-prev-or-next": "",
        years: _ctx.calendar.next.years(),
        "onUpdate:year": _ctx.calendar.next.setYear
      }, null, 8, ["years", "onUpdate:year"]), [[vue.vShow, _ctx.panel.next.year]]), vue.withDirectives(vue.createVNode("div", null, [vue.createVNode(_component_litepie_week, {
        weeks: _ctx.weeks
      }, null, 8, ["weeks"]), vue.createVNode(_component_litepie_calendar, {
        "as-prev-or-next": "",
        calendar: _ctx.calendar.next,
        weeks: _ctx.weeks,
        "as-range": _ctx.asRange(),
        "onUpdate:date": _ctx.setDate
      }, null, 8, ["calendar", "weeks", "as-range", "onUpdate:date"])], 512), [[vue.vShow, _ctx.panel.next.calendar]])])])) : vue.createCommentVNode("", true)])]), !_ctx.autoApply ? (vue.openBlock(), vue.createBlock("div", _hoisted_14, [vue.createVNode("div", _hoisted_15, [vue.createVNode("div", _hoisted_16, [vue.createVNode("button", {
        type: "button",
        class: "away-apply-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-litepie-primary-600 text-base font-medium text-white hover:bg-litepie-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800 disabled:cursor-not-allowed",
        disabled: _ctx.asSingle ? _ctx.applyValue.length < 1 : _ctx.applyValue.length < 2,
        onClick: _cache[4] || (_cache[4] = function () {
          return _ctx.applyDate && _ctx.applyDate.apply(_ctx, arguments);
        }),
        textContent: vue.toDisplayString(_ctx.options.footer.apply)
      }, null, 8, ["disabled", "textContent"]), vue.createVNode("button", {
        type: "button",
        class: "mt-3 away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
        textContent: vue.toDisplayString(_ctx.options.footer.cancel)
      }, null, 8, ["textContent"])])])])) : (vue.openBlock(), vue.createBlock("div", _hoisted_17, [vue.createVNode("div", _hoisted_18, [vue.createVNode("div", _hoisted_19, [vue.createVNode("button", {
        type: "button",
        class: "away-cancel-picker w-full transition ease-out duration-300 inline-flex justify-center rounded-md border border-litepie-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-litepie-secondary-700 hover:bg-litepie-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-litepie-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:ring-offset-litepie-secondary-800",
        textContent: vue.toDisplayString(_ctx.options.footer.cancel)
      }, null, 8, ["textContent"])])])]))], 2)])], 2), [[vue.vShow, _ctx.isShow]])];
    }),
    _: 1
  })], 2)), [[_directive_litepie, _ctx.trigger, "away"]]);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "/* purgecss start ignore */\n\n.litepie-datepicker-overlay::before {\n  content: '';\n  position: fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  display: none;\n  --tw-bg-opacity: 1;\n  background-color: rgba(0, 0, 0, var(--tw-bg-opacity));\n  opacity: 0;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n  transition-duration: 200ms;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n.litepie-datepicker-overlay.open::before {\n  display: block;\n  opacity: 0.5;\n}\n\n.litepie-datepicker::before {\n  --litepie-datepicker: 0px;\n  content: '';\n  position: absolute;\n  top: 0px;\n  height: 1rem;\n  width: 1rem;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgba(0, 0, 0, var(--tw-border-opacity));\n}\n\n.dark .litepie-datepicker::before {\n  --tw-border-opacity: 1;\n  border-color: rgba(55, 65, 81, var(--tw-border-opacity));\n}\n\n.litepie-datepicker::before {\n  --tw-border-opacity: 0.1;\n}\n\n.dark .litepie-datepicker::before {\n  --tw-border-opacity: 1;\n}\n\n.litepie-datepicker::before {\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}\n\n.dark .litepie-datepicker::before {\n  --tw-bg-opacity: 1;\n  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));\n}\n\n.litepie-datepicker::before {\n  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  transform: translate(50%, -50%) rotate(-45deg);\n  -webkit-clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n          clip-path: polygon(\n    calc(var(--litepie-datepicker) * -1) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker)) calc(var(--litepie-datepicker) * -1),\n    calc(100% + var(--litepie-datepicker))\n      calc(100% + var(--litepie-datepicker))\n  );\n}\n\n.litepie-datepicker.place-left::before {\n  left: 0.25rem;\n}\n\n.litepie-datepicker.place-right::before {\n  right: 1.25rem;\n}\n\n/* purgecss end ignore */\n";
styleInject(css_248z);script$6.render = render$6;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script$6; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('LitepieDatepicker', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});// Afrikaans [af]
var locale = {
  name: 'af',
  weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
  months: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
  weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'oor %s',
    past: '%s gelede',
    s: "'n paar sekondes",
    m: "'n minuut",
    mm: '%d minute',
    h: "'n uur",
    hh: '%d ure',
    d: "'n dag",
    dd: '%d dae',
    M: "'n maand",
    MM: '%d maande',
    y: "'n jaar",
    yy: '%d jaar'
  }
};
dayjs__default['default'].locale(locale, null, true);var af=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale});// Amharic [am]
var locale$1 = {
  name: 'am',
  weekdays: 'እሑድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'),
  weekdaysShort: 'እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'),
  weekdaysMin: 'እሑ_ሰኞ_ማክ_ረቡ_ሐሙ_አር_ቅዳ'.split('_'),
  months: 'ጃንዋሪ_ፌብሯሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር'.split('_'),
  monthsShort: 'ጃንዋ_ፌብሯ_ማርች_ኤፕሪ_ሜይ_ጁን_ጁላይ_ኦገስ_ሴፕቴ_ኦክቶ_ኖቬም_ዲሴም'.split('_'),
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'በ%s',
    past: '%s በፊት',
    s: 'ጥቂት ሰከንዶች',
    m: 'አንድ ደቂቃ',
    mm: '%d ደቂቃዎች',
    h: 'አንድ ሰዓት',
    hh: '%d ሰዓታት',
    d: 'አንድ ቀን',
    dd: '%d ቀናት',
    M: 'አንድ ወር',
    MM: '%d ወራት',
    y: 'አንድ ዓመት',
    yy: '%d ዓመታት'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'MMMM D ፣ YYYY',
    LLL: 'MMMM D ፣ YYYY HH:mm',
    LLLL: 'dddd ፣ MMMM D ፣ YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    return n + "\u129B";
  }
};
dayjs__default['default'].locale(locale$1, null, true);var am=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1});// Arabic (Algeria) [ar-dz]
var locale$2 = {
  name: 'ar-dz',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysMin: 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوان',
    m: 'دقيقة',
    mm: '%d دقائق',
    h: 'ساعة',
    hh: '%d ساعات',
    d: 'يوم',
    dd: '%d أيام',
    M: 'شهر',
    MM: '%d أشهر',
    y: 'سنة',
    yy: '%d سنوات'
  }
};
dayjs__default['default'].locale(locale$2, null, true);var arDz=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$2});// Arabic (Kuwait) [ar-kw]
var locale$3 = {
  name: 'ar-kw',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
  weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوان',
    m: 'دقيقة',
    mm: '%d دقائق',
    h: 'ساعة',
    hh: '%d ساعات',
    d: 'يوم',
    dd: '%d أيام',
    M: 'شهر',
    MM: '%d أشهر',
    y: 'سنة',
    yy: '%d سنوات'
  }
};
dayjs__default['default'].locale(locale$3, null, true);var arKw=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$3});// Arabic (Lybia) [ar-ly]
var locale$4 = {
  name: 'ar-ly',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekStart: 6,
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/‏M/‏YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$4, null, true);var arLy=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$4});// Arabic (Morocco) [ar-ma]
var locale$5 = {
  name: 'ar-ma',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
  weekStart: 6,
  weekdaysShort: 'احد_إثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوان',
    m: 'دقيقة',
    mm: '%d دقائق',
    h: 'ساعة',
    hh: '%d ساعات',
    d: 'يوم',
    dd: '%d أيام',
    M: 'شهر',
    MM: '%d أشهر',
    y: 'سنة',
    yy: '%d سنوات'
  }
};
dayjs__default['default'].locale(locale$5, null, true);var arMa=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$5});// Arabic (Saudi Arabia) [ar-sa]
var locale$6 = {
  name: 'ar-sa',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوان',
    m: 'دقيقة',
    mm: '%d دقائق',
    h: 'ساعة',
    hh: '%d ساعات',
    d: 'يوم',
    dd: '%d أيام',
    M: 'شهر',
    MM: '%d أشهر',
    y: 'سنة',
    yy: '%d سنوات'
  }
};
dayjs__default['default'].locale(locale$6, null, true);var arSa=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$6});//  Arabic (Tunisia) [ar-tn]
var locale$7 = {
  name: 'ar-tn',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekStart: 1,
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوان',
    m: 'دقيقة',
    mm: '%d دقائق',
    h: 'ساعة',
    hh: '%d ساعات',
    d: 'يوم',
    dd: '%d أيام',
    M: 'شهر',
    MM: '%d أشهر',
    y: 'سنة',
    yy: '%d سنوات'
  }
};
dayjs__default['default'].locale(locale$7, null, true);var arTn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$7});// Arabic [ar]
var months = 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_');
var symbolMap = {
  1: '١',
  2: '٢',
  3: '٣',
  4: '٤',
  5: '٥',
  6: '٦',
  7: '٧',
  8: '٨',
  9: '٩',
  0: '٠'
};
var numberMap = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0'
};
var locale$8 = {
  name: 'ar',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  months: months,
  monthsShort: months,
  weekStart: 6,
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: 'ثانية واحدة',
    m: 'دقيقة واحدة',
    mm: '%d دقائق',
    h: 'ساعة واحدة',
    hh: '%d ساعات',
    d: 'يوم واحد',
    dd: '%d أيام',
    M: 'شهر واحد',
    MM: '%d أشهر',
    y: 'عام واحد',
    yy: '%d أعوام'
  },
  preparse: function preparse(string) {
    return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
      return numberMap[match];
    }).replace(/،/g, ',');
  },
  postformat: function postformat(string) {
    return string.replace(/\d/g, function (match) {
      return symbolMap[match];
    }).replace(/,/g, '،');
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/‏M/‏YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$8, null, true);var ar=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$8});// Azerbaijani [az]
var locale$9 = {
  name: 'az',
  weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
  weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
  weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
  months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
  monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., H:mm',
    LLLL: 'dddd, D MMMM YYYY г., H:mm'
  },
  relativeTime: {
    future: '%s sonra',
    past: '%s əvvəl',
    s: 'bir neçə saniyə',
    m: 'bir dəqiqə',
    mm: '%d dəqiqə',
    h: 'bir saat',
    hh: '%d saat',
    d: 'bir gün',
    dd: '%d gün',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir il',
    yy: '%d il'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs__default['default'].locale(locale$9, null, true);var az=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$9});// Belarusian [be]
var locale$a = {
  name: 'be',
  weekdays: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
  months: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
  weekStart: 1,
  weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
  monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
  weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., HH:mm',
    LLLL: 'dddd, D MMMM YYYY г., HH:mm'
  }
};
dayjs__default['default'].locale(locale$a, null, true);var be=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$a});// Bulgarian [bg]
var locale$b = {
  name: 'bg',
  weekdays: 'Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота'.split('_'),
  weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
  weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  months: 'Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември'.split('_'),
  monthsShort: 'Янр_Фев_Мар_Апр_Май_Юни_Юли_Авг_Сеп_Окт_Ное_Дек'.split('_'),
  weekStart: 1,
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'след %s',
    past: 'преди %s',
    s: 'няколко секунди',
    m: 'минута',
    mm: '%d минути',
    h: 'час',
    hh: '%d часа',
    d: 'ден',
    dd: '%d дни',
    M: 'месец',
    MM: '%d месеца',
    y: 'година',
    yy: '%d години'
  }
};
dayjs__default['default'].locale(locale$b, null, true);var bg=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$b});// Bislama [bi]
var locale$c = {
  name: 'bi',
  weekdays: 'Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade'.split('_'),
  months: 'Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba'.split('_'),
  weekStart: 1,
  weekdaysShort: 'San_Man_Tus_Wen_Tos_Frae_Sar'.split('_'),
  monthsShort: 'Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis'.split('_'),
  weekdaysMin: 'San_Ma_Tu_We_To_Fr_Sar'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'lo %s',
    past: '%s bifo',
    s: 'sam seken',
    m: 'wan minit',
    mm: '%d minit',
    h: 'wan haoa',
    hh: '%d haoa',
    d: 'wan dei',
    dd: '%d dei',
    M: 'wan manis',
    MM: '%d manis',
    y: 'wan yia',
    yy: '%d yia'
  }
};
dayjs__default['default'].locale(locale$c, null, true);var bi=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$c});// Bambara [bm]
var locale$d = {
  name: 'bm',
  weekdays: 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
  months: 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
  monthsShort: 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
  weekdaysMin: 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'MMMM [tile] D [san] YYYY',
    LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
    LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
  },
  relativeTime: {
    future: '%s kɔnɔ',
    past: 'a bɛ %s bɔ',
    s: 'sanga dama dama',
    m: 'miniti kelen',
    mm: 'miniti %d',
    h: 'lɛrɛ kelen',
    hh: 'lɛrɛ %d',
    d: 'tile kelen',
    dd: 'tile %d',
    M: 'kalo kelen',
    MM: 'kalo %d',
    y: 'san kelen',
    yy: 'san %d'
  }
};
dayjs__default['default'].locale(locale$d, null, true);var bm=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$d});// Bengali [bn]
var symbolMap$1 = {
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯',
  0: '০'
};
var numberMap$1 = {
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
  '০': '0'
};
var locale$e = {
  name: 'bn',
  weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
  months: 'জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
  weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
  monthsShort: 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
  weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
  preparse: function preparse(string) {
    return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
      return numberMap$1[match];
    });
  },
  postformat: function postformat(string) {
    return string.replace(/\d/g, function (match) {
      return symbolMap$1[match];
    });
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm সময়',
    LTS: 'A h:mm:ss সময়',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm সময়',
    LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
  },
  relativeTime: {
    future: '%s পরে',
    past: '%s আগে',
    s: 'কয়েক সেকেন্ড',
    m: 'এক মিনিট',
    mm: '%d মিনিট',
    h: 'এক ঘন্টা',
    hh: '%d ঘন্টা',
    d: 'এক দিন',
    dd: '%d দিন',
    M: 'এক মাস',
    MM: '%d মাস',
    y: 'এক বছর',
    yy: '%d বছর'
  }
};
dayjs__default['default'].locale(locale$e, null, true);var bn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$e});// Tibetan [bo]
var locale$f = {
  name: 'bo',
  weekdays: 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
  months: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
  weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
  monthsShort: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
  weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  relativeTime: {
    future: '%s ལ་',
    past: '%s སྔན་ལ',
    s: 'ལམ་སང',
    m: 'སྐར་མ་གཅིག',
    mm: '%d སྐར་མ',
    h: 'ཆུ་ཚོད་གཅིག',
    hh: '%d ཆུ་ཚོད',
    d: 'ཉིན་གཅིག',
    dd: '%d ཉིན་',
    M: 'ཟླ་བ་གཅིག',
    MM: '%d ཟླ་བ',
    y: 'ལོ་གཅིག',
    yy: '%d ལོ'
  }
};
dayjs__default['default'].locale(locale$f, null, true);var bo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$f});// Breton [br]

function lastNumber(number) {
  if (number > 9) {
    return lastNumber(number % 10);
  }

  return number;
}

function softMutation(text) {
  var mutationTable = {
    m: 'v',
    b: 'v',
    d: 'z'
  };
  return mutationTable[text.charAt(0)] + text.substring(1);
}

function mutation(text, number) {
  if (number === 2) {
    return softMutation(text);
  }

  return text;
}

function relativeTimeWithMutation(number, withoutSuffix, key) {
  var format = {
    mm: 'munutenn',
    MM: 'miz',
    dd: 'devezh'
  };
  return number + " " + mutation(format[key], number);
}

function specialMutationForYears(number) {
  switch (lastNumber(number)) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 9:
      return number + " bloaz";

    default:
      return number + " vloaz";
  }
}

var locale$g = {
  name: 'br',
  weekdays: 'Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn'.split('_'),
  months: 'Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
  monthsShort: 'Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
  weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h[e]mm A',
    LTS: 'h[e]mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D [a viz] MMMM YYYY',
    LLL: 'D [a viz] MMMM YYYY h[e]mm A',
    LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
  },
  relativeTime: {
    future: 'a-benn %s',
    past: '%s ʼzo',
    s: 'un nebeud segondennoù',
    m: 'ur vunutenn',
    mm: relativeTimeWithMutation,
    h: 'un eur',
    hh: '%d eur',
    d: 'un devezh',
    dd: relativeTimeWithMutation,
    M: 'ur miz',
    MM: relativeTimeWithMutation,
    y: 'ur bloaz',
    yy: specialMutationForYears
  },
  meridiem: function meridiem(hour) {
    return hour < 12 ? 'a.m.' : 'g.m.';
  } // a-raok merenn | goude merenn

};
dayjs__default['default'].locale(locale$g, null, true);var br=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$g});// Bosnian [bs]
var locale$h = {
  name: 'bs',
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  }
};
dayjs__default['default'].locale(locale$h, null, true);var bs=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$h});// Catalan [ca]
var locale$i = {
  name: 'ca',
  weekdays: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split('_'),
  weekdaysShort: 'Dg._Dl._Dt._Dc._Dj._Dv._Ds.'.split('_'),
  weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
  months: 'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split('_'),
  monthsShort: 'Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [de] YYYY',
    LLL: 'D MMMM [de] YYYY [a les] H:mm',
    LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY, H:mm',
    llll: 'ddd D MMM YYYY, H:mm'
  },
  relativeTime: {
    future: 'd\'aquí %s',
    past: 'fa %s',
    s: 'uns segons',
    m: 'un minut',
    mm: '%d minuts',
    h: 'una hora',
    hh: '%d hores',
    d: 'un dia',
    dd: '%d dies',
    M: 'un mes',
    MM: '%d mesos',
    y: 'un any',
    yy: '%d anys'
  },
  ordinal: function ordinal(n) {
    var ord;
    if (n === 1 || n === 3) ord = 'r';else if (n === 2) ord = 'n';else if (n === 4) ord = 't';else ord = 'è';
    return "" + n + ord;
  }
};
dayjs__default['default'].locale(locale$i, null, true);var ca=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$i});// Czech [cs]

function plural(n) {
  return n > 1 && n < 5 && ~~(n / 10) !== 1; // eslint-disable-line
}
/* eslint-disable */


function translate(number, withoutSuffix, key, isFuture) {
  var result = number + " ";

  switch (key) {
    case 's':
      // a few seconds / in a few seconds / a few seconds ago
      return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami';

    case 'm':
      // a minute / in a minute / a minute ago
      return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou';

    case 'mm':
      // 9 minutes / in 9 minutes / 9 minutes ago
      if (withoutSuffix || isFuture) {
        return result + (plural(number) ? 'minuty' : 'minut');
      }

      return result + "minutami";

    case 'h':
      // an hour / in an hour / an hour ago
      return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';

    case 'hh':
      // 9 hours / in 9 hours / 9 hours ago
      if (withoutSuffix || isFuture) {
        return result + (plural(number) ? 'hodiny' : 'hodin');
      }

      return result + "hodinami";

    case 'd':
      // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'den' : 'dnem';

    case 'dd':
      // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (plural(number) ? 'dny' : 'dní');
      }

      return result + "dny";

    case 'M':
      // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'měsíc' : 'měsícem';

    case 'MM':
      // 9 months / in 9 months / 9 months ago
      if (withoutSuffix || isFuture) {
        return result + (plural(number) ? 'měsíce' : 'měsíců');
      }

      return result + "m\u011Bs\xEDci";

    case 'y':
      // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'rok' : 'rokem';

    case 'yy':
      // 9 years / in 9 years / 9 years ago
      if (withoutSuffix || isFuture) {
        return result + (plural(number) ? 'roky' : 'let');
      }

      return result + "lety";
  }
}
/* eslint-enable */


var locale$j = {
  name: 'cs',
  weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
  weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
  weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
  months: 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
  monthsShort: 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_'),
  weekStart: 1,
  yearStart: 4,
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm',
    l: 'D. M. YYYY'
  },
  relativeTime: {
    future: 'za %s',
    past: 'před %s',
    s: translate,
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: translate,
    dd: translate,
    M: translate,
    MM: translate,
    y: translate,
    yy: translate
  }
};
dayjs__default['default'].locale(locale$j, null, true);var cs=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$j});// Chuvash [cv]
var locale$k = {
  name: 'cv',
  weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
  months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
  weekStart: 1,
  weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
  monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
  weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
    LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
    LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
  }
};
dayjs__default['default'].locale(locale$k, null, true);var cv=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$k});// Welsh [cy]
var locale$l = {
  name: 'cy',
  weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
  months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
  monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
  weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'mewn %s',
    past: '%s yn ôl',
    s: 'ychydig eiliadau',
    m: 'munud',
    mm: '%d munud',
    h: 'awr',
    hh: '%d awr',
    d: 'diwrnod',
    dd: '%d diwrnod',
    M: 'mis',
    MM: '%d mis',
    y: 'blwyddyn',
    yy: '%d flynedd'
  }
};
dayjs__default['default'].locale(locale$l, null, true);var cy=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$l});// Danish [da]
var locale$m = {
  name: 'da',
  weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
  weekdaysShort: 'søn._man._tirs._ons._tors._fre._lør.'.split('_'),
  weekdaysMin: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
  months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.'.split('_'),
  weekStart: 1,
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'få sekunder',
    m: 'et minut',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dage',
    M: 'en måned',
    MM: '%d måneder',
    y: 'et år',
    yy: '%d år'
  }
};
dayjs__default['default'].locale(locale$m, null, true);var da=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$m});// German (Austria) [de-at]
var locale$n = {
  name: 'de-at',
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  months: 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  formats: {
    LTS: 'HH:mm:ss',
    LT: 'HH:mm',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'in %s',
    past: 'vor %s',
    s: 'ein paar Sekunden',
    m: 'einer Minute',
    mm: '%d Minuten',
    h: 'einer Stunde',
    hh: '%d Stunden',
    d: 'einem Tag',
    dd: '%d Tagen',
    M: 'einem Monat',
    MM: '%d Monaten',
    y: 'einem Jahr',
    yy: '%d Jahren'
  }
};
dayjs__default['default'].locale(locale$n, null, true);var deAt=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$n});// German (Switzerland) [de-ch]
var locale$o = {
  name: 'de-ch',
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$o, null, true);var deCh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$o});// German [de]
var texts = {
  s: 'ein paar Sekunden',
  m: ['eine Minute', 'einer Minute'],
  mm: '%d Minuten',
  h: ['eine Stunde', 'einer Stunde'],
  hh: '%d Stunden',
  d: ['ein Tag', 'einem Tag'],
  dd: ['%d Tage', '%d Tagen'],
  M: ['ein Monat', 'einem Monat'],
  MM: ['%d Monate', '%d Monaten'],
  y: ['ein Jahr', 'einem Jahr'],
  yy: ['%d Jahre', '%d Jahren']
};

function relativeTimeFormatter(number, withoutSuffix, key) {
  var l = texts[key];

  if (Array.isArray(l)) {
    l = l[withoutSuffix ? 0 : 1];
  }

  return l.replace('%d', number);
}

var locale$p = {
  name: 'de',
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
  weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jan_Feb_März_Apr_Mai_Juni_Juli_Aug_Sept_Okt_Nov_Dez'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LTS: 'HH:mm:ss',
    LT: 'HH:mm',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'in %s',
    past: 'vor %s',
    s: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  }
};
dayjs__default['default'].locale(locale$p, null, true);var de=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$p});// Maldivian [dv]
var locale$q = {
  name: 'dv',
  weekdays: 'އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު'.split('_'),
  months: 'ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު'.split('_'),
  weekStart: 7,
  weekdaysShort: 'އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު'.split('_'),
  monthsShort: 'ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު'.split('_'),
  weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/M/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'ތެރޭގައި %s',
    past: 'ކުރިން %s',
    s: 'ސިކުންތުކޮޅެއް',
    m: 'މިނިޓެއް',
    mm: 'މިނިޓު %d',
    h: 'ގަޑިއިރެއް',
    hh: 'ގަޑިއިރު %d',
    d: 'ދުވަހެއް',
    dd: 'ދުވަސް %d',
    M: 'މަހެއް',
    MM: 'މަސް %d',
    y: 'އަހަރެއް',
    yy: 'އަހަރު %d'
  }
};
dayjs__default['default'].locale(locale$q, null, true);var dv=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$q});// Greek [el]
var locale$r = {
  name: 'el',
  weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
  weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
  weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
  months: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
  monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  weekStart: 1,
  relativeTime: {
    future: 'σε %s',
    past: 'πριν %s',
    s: 'μερικά δευτερόλεπτα',
    m: 'ένα λεπτό',
    mm: '%d λεπτά',
    h: 'μία ώρα',
    hh: '%d ώρες',
    d: 'μία μέρα',
    dd: '%d μέρες',
    M: 'ένα μήνα',
    MM: '%d μήνες',
    y: 'ένα χρόνο',
    yy: '%d χρόνια'
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  }
};
dayjs__default['default'].locale(locale$r, null, true);var el=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$r});// English (Australia) [en-au]
var locale$s = {
  name: 'en-au',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$s, null, true);var enAu=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$s});// English (Canada) [en-ca]
var locale$t = {
  name: 'en-ca',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'YYYY-MM-DD',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$t, null, true);var enCa=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$t});// English (United Kingdom) [en-gb]
var locale$u = {
  name: 'en-gb',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};
dayjs__default['default'].locale(locale$u, null, true);var enGb=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$u});// English (Ireland) [en-ie]
var locale$v = {
  name: 'en-ie',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$v, null, true);var enIe=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$v});// English (Israel) [en-il]
var locale$w = {
  name: 'en-il',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$w, null, true);var enIl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$w});// English (India) [en-in]
var locale$x = {
  name: 'en-in',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};
dayjs__default['default'].locale(locale$x, null, true);var enIn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$x});// English (New Zealand) [en-nz]
var locale$y = {
  name: 'en-nz',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$y, null, true);var enNz=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$y});// English (Singapore) [en-sg]
var locale$z = {
  name: 'en-sg',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs__default['default'].locale(locale$z, null, true);var enSg=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$z});// English (Trinidad & Tobago) [en-tt]
var locale$A = {
  name: 'en-tt',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};
dayjs__default['default'].locale(locale$A, null, true);var enTt=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$A});// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
var en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
};var en$1=/*#__PURE__*/Object.freeze({__proto__:null,'default': en});// Esperanto [eo]
var locale$B = {
  name: 'eo',
  weekdays: 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
  months: 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
  weekStart: 1,
  weekdaysShort: 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
  monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
  weekdaysMin: 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D[-a de] MMMM, YYYY',
    LLL: 'D[-a de] MMMM, YYYY HH:mm',
    LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
  },
  relativeTime: {
    future: 'post %s',
    past: 'antaŭ %s',
    s: 'sekundoj',
    m: 'minuto',
    mm: '%d minutoj',
    h: 'horo',
    hh: '%d horoj',
    d: 'tago',
    dd: '%d tagoj',
    M: 'monato',
    MM: '%d monatoj',
    y: 'jaro',
    yy: '%d jaroj'
  }
};
dayjs__default['default'].locale(locale$B, null, true);var eo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$B});// Spanish (Dominican Republic) [es-do]
var locale$C = {
  name: 'es-do',
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY h:mm A',
    LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
  }
};
dayjs__default['default'].locale(locale$C, null, true);var esDo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$C});// Spanish (Puerto Rico) [es-PR]
var locale$D = {
  name: 'es-pr',
  monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY h:mm A',
    LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  }
};
dayjs__default['default'].locale(locale$D, null, true);var esPr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$D});// Spanish (United States) [es-us]
var locale$E = {
  name: 'es-us',
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY h:mm A',
    LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
  }
};
dayjs__default['default'].locale(locale$E, null, true);var esUs=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$E});// Spanish [es]
var locale$F = {
  name: 'es',
  monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  }
};
dayjs__default['default'].locale(locale$F, null, true);var es=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$F});// Estonian [et]

function relativeTimeWithTense(number, withoutSuffix, key, isFuture) {
  var format = {
    s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
    m: ['ühe minuti', 'üks minut'],
    mm: ['%d minuti', '%d minutit'],
    h: ['ühe tunni', 'tund aega', 'üks tund'],
    hh: ['%d tunni', '%d tundi'],
    d: ['ühe päeva', 'üks päev'],
    M: ['kuu aja', 'kuu aega', 'üks kuu'],
    MM: ['%d kuu', '%d kuud'],
    y: ['ühe aasta', 'aasta', 'üks aasta'],
    yy: ['%d aasta', '%d aastat']
  };

  if (withoutSuffix) {
    return (format[key][2] ? format[key][2] : format[key][1]).replace('%d', number);
  }

  return (isFuture ? format[key][0] : format[key][1]).replace('%d', number);
}

var locale$G = {
  name: 'et',
  // Estonian
  weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
  // Note weekdays are not capitalized in Estonian
  weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
  // There is no short form of weekdays in Estonian except this 1 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
  months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
  // Note month names are not capitalized in Estonian
  monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: '%s pärast',
    past: '%s tagasi',
    s: relativeTimeWithTense,
    m: relativeTimeWithTense,
    mm: relativeTimeWithTense,
    h: relativeTimeWithTense,
    hh: relativeTimeWithTense,
    d: relativeTimeWithTense,
    dd: '%d päeva',
    M: relativeTimeWithTense,
    MM: relativeTimeWithTense,
    y: relativeTimeWithTense,
    yy: relativeTimeWithTense
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  }
};
dayjs__default['default'].locale(locale$G, null, true);var et=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$G});// Basque [eu]
var locale$H = {
  name: 'eu',
  weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
  months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
  monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
  weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY[ko] MMMM[ren] D[a]',
    LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
    LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
    l: 'YYYY-M-D',
    ll: 'YYYY[ko] MMM D[a]',
    lll: 'YYYY[ko] MMM D[a] HH:mm',
    llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
  },
  relativeTime: {
    future: '%s barru',
    past: 'duela %s',
    s: 'segundo batzuk',
    m: 'minutu bat',
    mm: '%d minutu',
    h: 'ordu bat',
    hh: '%d ordu',
    d: 'egun bat',
    dd: '%d egun',
    M: 'hilabete bat',
    MM: '%d hilabete',
    y: 'urte bat',
    yy: '%d urte'
  }
};
dayjs__default['default'].locale(locale$H, null, true);var eu=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$H});// Persian [fa]
var locale$I = {
  name: 'fa',
  weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
  weekdaysShort: "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split('_'),
  weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
  weekStart: 6,
  months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
  monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'در %s',
    past: '%s پیش',
    s: 'چند ثانیه',
    m: 'یک دقیقه',
    mm: '%d دقیقه',
    h: 'یک ساعت',
    hh: '%d ساعت',
    d: 'یک روز',
    dd: '%d روز',
    M: 'یک ماه',
    MM: '%d ماه',
    y: 'یک سال',
    yy: '%d سال'
  }
};
dayjs__default['default'].locale(locale$I, null, true);var fa=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$I});// Finnish [fi]

function relativeTimeFormatter$1(number, withoutSuffix, key, isFuture) {
  var past = {
    s: 'muutama sekunti',
    m: 'minuutti',
    mm: '%d minuuttia',
    h: 'tunti',
    hh: '%d tuntia',
    d: 'päivä',
    dd: '%d päivää',
    M: 'kuukausi',
    MM: '%d kuukautta',
    y: 'vuosi',
    yy: '%d vuotta',
    numbers: 'nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän'.split('_')
  };
  var future = {
    s: 'muutaman sekunnin',
    m: 'minuutin',
    mm: '%d minuutin',
    h: 'tunnin',
    hh: '%d tunnin',
    d: 'päivän',
    dd: '%d päivän',
    M: 'kuukauden',
    MM: '%d kuukauden',
    y: 'vuoden',
    yy: '%d vuoden',
    numbers: 'nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän'.split('_')
  };
  var words = isFuture && !withoutSuffix ? future : past;
  var result = words[key];

  if (number < 10) {
    return result.replace('%d', words.numbers[number]);
  }

  return result.replace('%d', number);
}

var locale$J = {
  name: 'fi',
  // Finnish
  weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
  // Note weekdays are not capitalized in Finnish
  weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
  // There is no short form of weekdays in Finnish except this 2 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
  months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
  // Note month names are not capitalized in Finnish
  monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: '%s päästä',
    past: '%s sitten',
    s: relativeTimeFormatter$1,
    m: relativeTimeFormatter$1,
    mm: relativeTimeFormatter$1,
    h: relativeTimeFormatter$1,
    hh: relativeTimeFormatter$1,
    d: relativeTimeFormatter$1,
    dd: relativeTimeFormatter$1,
    M: relativeTimeFormatter$1,
    MM: relativeTimeFormatter$1,
    y: relativeTimeFormatter$1,
    yy: relativeTimeFormatter$1
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM[ta] YYYY',
    LLL: 'D. MMMM[ta] YYYY, [klo] HH.mm',
    LLLL: 'dddd, D. MMMM[ta] YYYY, [klo] HH.mm',
    l: 'D.M.YYYY',
    ll: 'D. MMM YYYY',
    lll: 'D. MMM YYYY, [klo] HH.mm',
    llll: 'ddd, D. MMM YYYY, [klo] HH.mm'
  }
};
dayjs__default['default'].locale(locale$J, null, true);var fi=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$J});// Faroese [fo]
var locale$K = {
  name: 'fo',
  weekdays: 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
  months: 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
  monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
  weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D. MMMM, YYYY HH:mm'
  },
  relativeTime: {
    future: 'um %s',
    past: '%s síðani',
    s: 'fá sekund',
    m: 'ein minuttur',
    mm: '%d minuttir',
    h: 'ein tími',
    hh: '%d tímar',
    d: 'ein dagur',
    dd: '%d dagar',
    M: 'ein mánaður',
    MM: '%d mánaðir',
    y: 'eitt ár',
    yy: '%d ár'
  }
};
dayjs__default['default'].locale(locale$K, null, true);var fo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$K});// French (Canada) [fr-ca]
var locale$L = {
  name: 'fr-ca',
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  }
};
dayjs__default['default'].locale(locale$L, null, true);var frCa=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$L});// French (Switzerland) [fr-ch]
var locale$M = {
  name: 'fr-ch',
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  weekStart: 1,
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  }
};
dayjs__default['default'].locale(locale$M, null, true);var frCh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$M});// French [fr]
var locale$N = {
  name: 'fr',
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  },
  ordinal: function ordinal(n) {
    var o = n === 1 ? 'er' : '';
    return "" + n + o;
  }
};
dayjs__default['default'].locale(locale$N, null, true);var fr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$N});// Frisian [fy]
var locale$O = {
  name: 'fy',
  weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
  months: 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
  monthsShort: 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
  weekStart: 1,
  weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
  weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'oer %s',
    past: '%s lyn',
    s: 'in pear sekonden',
    m: 'ien minút',
    mm: '%d minuten',
    h: 'ien oere',
    hh: '%d oeren',
    d: 'ien dei',
    dd: '%d dagen',
    M: 'ien moanne',
    MM: '%d moannen',
    y: 'ien jier',
    yy: '%d jierren'
  }
};
dayjs__default['default'].locale(locale$O, null, true);var fy=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$O});// Irish or Irish Gaelic [ga]
var locale$P = {
  name: 'ga',
  weekdays: 'Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Satharn'.split('_'),
  months: 'Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Méitheamh_Iúil_Lúnasa_Meán Fómhair_Deaireadh Fómhair_Samhain_Nollaig'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Dom_Lua_Mái_Céa_Déa_hAo_Sat'.split('_'),
  monthsShort: 'Eaná_Feab_Márt_Aibr_Beal_Méit_Iúil_Lúna_Meán_Deai_Samh_Noll'.split('_'),
  weekdaysMin: 'Do_Lu_Má_Ce_Dé_hA_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'i %s',
    past: '%s ó shin',
    s: 'cúpla soicind',
    m: 'nóiméad',
    mm: '%d nóiméad',
    h: 'uair an chloig',
    hh: '%d uair an chloig',
    d: 'lá',
    dd: '%d lá',
    M: 'mí',
    MM: '%d mí',
    y: 'bliain',
    yy: '%d bliain'
  }
};
dayjs__default['default'].locale(locale$P, null, true);var ga=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$P});// Scottish Gaelic [gd]
var locale$Q = {
  name: 'gd',
  weekdays: 'Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne'.split('_'),
  months: 'Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Did_Dil_Dim_Dic_Dia_Dih_Dis'.split('_'),
  monthsShort: 'Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh'.split('_'),
  weekdaysMin: 'Dò_Lu_Mà_Ci_Ar_Ha_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'ann an %s',
    past: 'bho chionn %s',
    s: 'beagan diogan',
    m: 'mionaid',
    mm: '%d mionaidean',
    h: 'uair',
    hh: '%d uairean',
    d: 'latha',
    dd: '%d latha',
    M: 'mìos',
    MM: '%d mìosan',
    y: 'bliadhna',
    yy: '%d bliadhna'
  }
};
dayjs__default['default'].locale(locale$Q, null, true);var gd=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$Q});// Galician [gl]
var locale$R = {
  name: 'gl',
  weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
  months: 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
  weekStart: 1,
  weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
  monthsShort: 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
  weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
  }
};
dayjs__default['default'].locale(locale$R, null, true);var gl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$R});// Konkani Latin script [gom-latn]
var locale$S = {
  name: 'gom-latn',
  weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split('_'),
  months: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
  monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
  weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm [vazta]',
    LTS: 'A h:mm:ss [vazta]',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY A h:mm [vazta]',
    LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
    llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
  }
};
dayjs__default['default'].locale(locale$S, null, true);var gomLatn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$S});// Gujarati [gu]
var locale$T = {
  name: 'gu',
  weekdays: 'રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર'.split('_'),
  months: 'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર'.split('_'),
  weekdaysShort: 'રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ'.split('_'),
  monthsShort: 'જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.'.split('_'),
  weekdaysMin: 'ર_સો_મં_બુ_ગુ_શુ_શ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm વાગ્યે',
    LTS: 'A h:mm:ss વાગ્યે',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
    LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે'
  },
  relativeTime: {
    future: '%s મા',
    past: '%s પેહલા',
    s: 'અમુક પળો',
    m: 'એક મિનિટ',
    mm: '%d મિનિટ',
    h: 'એક કલાક',
    hh: '%d કલાક',
    d: 'એક દિવસ',
    dd: '%d દિવસ',
    M: 'એક મહિનો',
    MM: '%d મહિનો',
    y: 'એક વર્ષ',
    yy: '%d વર્ષ'
  }
};
dayjs__default['default'].locale(locale$T, null, true);var gu=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$T});// Hebrew [he]
var texts$1 = {
  s: 'מספר שניות',
  ss: '%d שניות',
  m: 'דקה',
  mm: '%d דקות',
  h: 'שעה',
  hh: '%d שעות',
  hh2: 'שעתיים',
  d: 'יום',
  dd: '%d ימים',
  dd2: 'יומיים',
  M: 'חודש',
  MM: '%d חודשים',
  MM2: 'חודשיים',
  y: 'שנה',
  yy: '%d שנים',
  yy2: 'שנתיים'
};

function relativeTimeFormatter$2(number, withoutSuffix, key) {
  var text = texts$1[key + (number === 2 ? '2' : '')] || texts$1[key];
  return text.replace('%d', number);
}

var locale$U = {
  name: 'he',
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳'.split('_'),
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
  monthsShort: 'ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ'.split('_'),
  relativeTime: {
    future: 'בעוד %s',
    past: 'לפני %s',
    s: relativeTimeFormatter$2,
    m: relativeTimeFormatter$2,
    mm: relativeTimeFormatter$2,
    h: relativeTimeFormatter$2,
    hh: relativeTimeFormatter$2,
    d: relativeTimeFormatter$2,
    dd: relativeTimeFormatter$2,
    M: relativeTimeFormatter$2,
    MM: relativeTimeFormatter$2,
    y: relativeTimeFormatter$2,
    yy: relativeTimeFormatter$2
  },
  ordinal: function ordinal(n) {
    return n;
  },
  format: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$U, null, true);var he=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$U});// Hindi [hi]
var locale$V = {
  name: 'hi',
  weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
  months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
  weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
  monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
  weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm बजे',
    LTS: 'A h:mm:ss बजे',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm बजे',
    LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
  },
  relativeTime: {
    future: '%s में',
    past: '%s पहले',
    s: 'कुछ ही क्षण',
    m: 'एक मिनट',
    mm: '%d मिनट',
    h: 'एक घंटा',
    hh: '%d घंटे',
    d: 'एक दिन',
    dd: '%d दिन',
    M: 'एक महीने',
    MM: '%d महीने',
    y: 'एक वर्ष',
    yy: '%d वर्ष'
  }
};
dayjs__default['default'].locale(locale$V, null, true);var hi=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$V});// Croatian [hr]
var monthFormat = 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_');
var monthStandalone = 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_');
var MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

var months$1 = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }

  return monthStandalone[dayjsInstance.month()];
};

months$1.s = monthStandalone;
months$1.f = monthFormat;
var locale$W = {
  name: 'hr',
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  months: months$1,
  monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'sekunda',
    m: 'minuta',
    mm: '%d minuta',
    h: 'sat',
    hh: '%d sati',
    d: 'dan',
    dd: '%d dana',
    M: 'mjesec',
    MM: '%d mjeseci',
    y: 'godina',
    yy: '%d godine'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$W, null, true);var hr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$W});// Haitian Creole (Haiti) [ht]
var locale$X = {
  name: 'ht',
  weekdays: 'dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi'.split('_'),
  months: 'janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm'.split('_'),
  weekdaysShort: 'dim._len._mad._mèk._jed._van._sam.'.split('_'),
  monthsShort: 'jan._fev._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.'.split('_'),
  weekdaysMin: 'di_le_ma_mè_je_va_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'nan %s',
    past: 'sa gen %s',
    s: 'kèk segond',
    m: 'yon minit',
    mm: '%d minit',
    h: 'inèdtan',
    hh: '%d zè',
    d: 'yon jou',
    dd: '%d jou',
    M: 'yon mwa',
    MM: '%d mwa',
    y: 'yon ane',
    yy: '%d ane'
  }
};
dayjs__default['default'].locale(locale$X, null, true);var ht=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$X});// Hungarian [hu]
var locale$Y = {
  name: 'hu',
  weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
  weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
  weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
  months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
  monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: '%s múlva',
    past: '%s',
    s: function s(_, _s, ___, isFuture) {
      return "n\xE9h\xE1ny m\xE1sodperc" + (isFuture || _s ? '' : 'e');
    },
    m: function m(_, s, ___, isFuture) {
      return "egy perc" + (isFuture || s ? '' : 'e');
    },
    mm: function mm(n, s, ___, isFuture) {
      return n + " perc" + (isFuture || s ? '' : 'e');
    },
    h: function h(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'óra' : 'órája');
    },
    hh: function hh(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'óra' : 'órája');
    },
    d: function d(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'nap' : 'napja');
    },
    dd: function dd(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'nap' : 'napja');
    },
    M: function M(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'hónap' : 'hónapja');
    },
    MM: function MM(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'hónap' : 'hónapja');
    },
    y: function y(_, s, ___, isFuture) {
      return "egy " + (isFuture || s ? 'év' : 'éve');
    },
    yy: function yy(n, s, ___, isFuture) {
      return n + " " + (isFuture || s ? 'év' : 'éve');
    }
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY. MMMM D.',
    LLL: 'YYYY. MMMM D. H:mm',
    LLLL: 'YYYY. MMMM D., dddd H:mm'
  }
};
dayjs__default['default'].locale(locale$Y, null, true);var hu=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$Y});// Armenian [hy-am]
var locale$Z = {
  name: 'hy-am',
  weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
  months: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
  weekStart: 1,
  weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
  monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
  weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY թ.',
    LLL: 'D MMMM YYYY թ., HH:mm',
    LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
  },
  relativeTime: {
    future: '%s հետո',
    past: '%s առաջ',
    s: 'մի քանի վայրկյան',
    m: 'րոպե',
    mm: '%d րոպե',
    h: 'ժամ',
    hh: '%d ժամ',
    d: 'օր',
    dd: '%d օր',
    M: 'ամիս',
    MM: '%d ամիս',
    y: 'տարի',
    yy: '%d տարի'
  }
};
dayjs__default['default'].locale(locale$Z, null, true);var hyAm=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$Z});// Indonesian [id]
var locale$_ = {
  name: 'id',
  weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
  months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
  weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
  weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lalu',
    s: 'beberapa detik',
    m: 'semenit',
    mm: '%d menit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$_, null, true);var id=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$_});// Icelandic [is]
var locale$$ = {
  name: 'is',
  weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
  months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
  monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
  weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] H:mm',
    LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
  }
};
dayjs__default['default'].locale(locale$$, null, true);var is=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$$});// Italian (Switzerland) [it-ch]
var locale$10 = {
  name: 'it-ch',
  weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
  months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
  weekStart: 1,
  weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
  monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
  weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$10, null, true);var itCh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$10});// Italian [it]
var locale$11 = {
  name: 'it',
  weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
  weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
  weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
  months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
  weekStart: 1,
  monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'tra %s',
    past: '%s fa',
    s: 'qualche secondo',
    m: 'un minuto',
    mm: '%d minuti',
    h: 'un\' ora',
    hh: '%d ore',
    d: 'un giorno',
    dd: '%d giorni',
    M: 'un mese',
    MM: '%d mesi',
    y: 'un anno',
    yy: '%d anni'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  }
};
dayjs__default['default'].locale(locale$11, null, true);var it=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$11});// Japanese [ja]
var locale$12 = {
  name: 'ja',
  weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
  weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
  weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\u65E5";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日 dddd HH:mm',
    l: 'YYYY/MM/DD',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日(ddd) HH:mm'
  },
  meridiem: function meridiem(hour) {
    return hour < 12 ? '午前' : '午後';
  },
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '数秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年'
  }
};
dayjs__default['default'].locale(locale$12, null, true);var ja=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$12});// Javanese [jv]
var locale$13 = {
  name: 'jv',
  weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
  months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
  weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  relativeTime: {
    future: 'wonten ing %s',
    past: '%s ingkang kepengker',
    s: 'sawetawis detik',
    m: 'setunggal menit',
    mm: '%d menit',
    h: 'setunggal jam',
    hh: '%d jam',
    d: 'sedinten',
    dd: '%d dinten',
    M: 'sewulan',
    MM: '%d wulan',
    y: 'setaun',
    yy: '%d taun'
  }
};
dayjs__default['default'].locale(locale$13, null, true);var jv=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$13});// Georgian [ka]
var locale$14 = {
  name: 'ka',
  weekdays: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
  weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
  weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
  months: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
  monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: '%s შემდეგ',
    past: '%s წინ',
    s: 'წამი',
    m: 'წუთი',
    mm: '%d წუთი',
    h: 'საათი',
    hh: '%d საათის',
    d: 'დღეს',
    dd: '%d დღის განმავლობაში',
    M: 'თვის',
    MM: '%d თვის',
    y: 'წელი',
    yy: '%d წლის'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs__default['default'].locale(locale$14, null, true);var ka=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$14});// Kazakh [kk]
var locale$15 = {
  name: 'kk',
  weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
  weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
  weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
  months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
  monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: '%s ішінде',
    past: '%s бұрын',
    s: 'бірнеше секунд',
    m: 'бір минут',
    mm: '%d минут',
    h: 'бір сағат',
    hh: '%d сағат',
    d: 'бір күн',
    dd: '%d күн',
    M: 'бір ай',
    MM: '%d ай',
    y: 'бір жыл',
    yy: '%d жыл'
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$15, null, true);var kk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$15});// Cambodian [km]
var locale$16 = {
  name: 'km',
  weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
  months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
  weekStart: 1,
  weekdaysShort: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
  monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
  weekdaysMin: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%sទៀត',
    past: '%sមុន',
    s: 'ប៉ុន្មានវិនាទី',
    m: 'មួយនាទី',
    mm: '%d នាទី',
    h: 'មួយម៉ោង',
    hh: '%d ម៉ោង',
    d: 'មួយថ្ងៃ',
    dd: '%d ថ្ងៃ',
    M: 'មួយខែ',
    MM: '%d ខែ',
    y: 'មួយឆ្នាំ',
    yy: '%d ឆ្នាំ'
  }
};
dayjs__default['default'].locale(locale$16, null, true);var km=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$16});// Kannada [kn]
var locale$17 = {
  name: 'kn',
  weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
  months: 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
  weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
  monthsShort: 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ'.split('_'),
  weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  relativeTime: {
    future: '%s ನಂತರ',
    past: '%s ಹಿಂದೆ',
    s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
    m: 'ಒಂದು ನಿಮಿಷ',
    mm: '%d ನಿಮಿಷ',
    h: 'ಒಂದು ಗಂಟೆ',
    hh: '%d ಗಂಟೆ',
    d: 'ಒಂದು ದಿನ',
    dd: '%d ದಿನ',
    M: 'ಒಂದು ತಿಂಗಳು',
    MM: '%d ತಿಂಗಳು',
    y: 'ಒಂದು ವರ್ಷ',
    yy: '%d ವರ್ಷ'
  }
};
dayjs__default['default'].locale(locale$17, null, true);var kn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$17});// Korean [ko]
var locale$18 = {
  name: 'ko',
  weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
  months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY년 MMMM D일',
    LLL: 'YYYY년 MMMM D일 A h:mm',
    LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
    l: 'YYYY.MM.DD.',
    ll: 'YYYY년 MMMM D일',
    lll: 'YYYY년 MMMM D일 A h:mm',
    llll: 'YYYY년 MMMM D일 dddd A h:mm'
  },
  meridiem: function meridiem(hour) {
    return hour < 12 ? '오전' : '오후';
  },
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초',
    m: '1분',
    mm: '%d분',
    h: '한 시간',
    hh: '%d시간',
    d: '하루',
    dd: '%d일',
    M: '한 달',
    MM: '%d달',
    y: '일 년',
    yy: '%d년'
  }
};
dayjs__default['default'].locale(locale$18, null, true);var ko=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$18});// Kurdish [ku]
var locale$19 = {
  name: 'ku',
  weekdays: 'یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌'.split('_'),
  months: 'کانونی دووەم_شوبات_ئازار_نیسان_ئایار_حوزەیران_تەمموز_ئاب_ئەیلوول_تشرینی یەكەم_تشرینی دووەم_كانونی یەکەم'.split('_'),
  weekStart: 6,
  weekdaysShort: 'یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌'.split('_'),
  monthsShort: 'کانونی دووەم_شوبات_ئازار_نیسان_ئایار_حوزەیران_تەمموز_ئاب_ئەیلوول_تشرینی یەكەم_تشرینی دووەم_كانونی یەکەم'.split('_'),
  weekdaysMin: 'ی_د_س_چ_پ_ه_ش'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'له‌ %s',
    past: '%s',
    s: 'چه‌ند چركه‌یه‌ك',
    m: 'یه‌ك خوله‌ك',
    mm: '%d خوله‌ك',
    h: 'یه‌ك كاتژمێر',
    hh: '%d كاتژمێر',
    d: 'یه‌ك ڕۆژ',
    dd: '%d ڕۆژ',
    M: 'یه‌ك مانگ',
    MM: '%d مانگ',
    y: 'یه‌ك ساڵ',
    yy: '%d ساڵ'
  }
};
dayjs__default['default'].locale(locale$19, null, true);var ku=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$19});// Kyrgyz [ky]
var locale$1a = {
  name: 'ky',
  weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
  months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
  monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
  weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s ичинде',
    past: '%s мурун',
    s: 'бирнече секунд',
    m: 'бир мүнөт',
    mm: '%d мүнөт',
    h: 'бир саат',
    hh: '%d саат',
    d: 'бир күн',
    dd: '%d күн',
    M: 'бир ай',
    MM: '%d ай',
    y: 'бир жыл',
    yy: '%d жыл'
  }
};
dayjs__default['default'].locale(locale$1a, null, true);var ky=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1a});// Luxembourgish [lb]
var locale$1b = {
  name: 'lb',
  weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
  months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
  monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
  weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm [Auer]',
    LTS: 'H:mm:ss [Auer]',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm [Auer]',
    LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
  }
};
dayjs__default['default'].locale(locale$1b, null, true);var lb=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1b});// Lao [lo]
var locale$1c = {
  name: 'lo',
  weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
  months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
  weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
  monthsShort: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
  weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'ອີກ %s',
    past: '%sຜ່ານມາ',
    s: 'ບໍ່ເທົ່າໃດວິນາທີ',
    m: '1 ນາທີ',
    mm: '%d ນາທີ',
    h: '1 ຊົ່ວໂມງ',
    hh: '%d ຊົ່ວໂມງ',
    d: '1 ມື້',
    dd: '%d ມື້',
    M: '1 ເດືອນ',
    MM: '%d ເດືອນ',
    y: '1 ປີ',
    yy: '%d ປີ'
  }
};
dayjs__default['default'].locale(locale$1c, null, true);var lo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1c});// Lithuanian [lt]
var monthFormat$1 = 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_');
var monthStandalone$1 = 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'); // eslint-disable-next-line no-useless-escape

var MONTHS_IN_FORMAT$1 = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/;

var months$2 = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT$1.test(format)) {
    return monthFormat$1[dayjsInstance.month()];
  }

  return monthStandalone$1[dayjsInstance.month()];
};

months$2.s = monthStandalone$1;
months$2.f = monthFormat$1;
var locale$1d = {
  name: 'lt',
  weekdays: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
  weekdaysShort: 'sek_pir_ant_tre_ket_pen_šeš'.split('_'),
  weekdaysMin: 's_p_a_t_k_pn_š'.split('_'),
  months: months$2,
  monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: 'už %s',
    past: 'prieš %s',
    s: 'kelias sekundes',
    m: 'minutę',
    mm: '%d minutes',
    h: 'valandą',
    hh: '%d valandas',
    d: 'dieną',
    dd: '%d dienas',
    M: 'menesį',
    MM: '%d mėnesius',
    y: 'metus',
    yy: '%d metus'
  },
  format: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY [m.] MMMM D [d.]',
    LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
    l: 'YYYY-MM-DD',
    ll: 'YYYY [m.] MMMM D [d.]',
    lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY [m.] MMMM D [d.]',
    LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
    l: 'YYYY-MM-DD',
    ll: 'YYYY [m.] MMMM D [d.]',
    lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
    llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
  }
};
dayjs__default['default'].locale(locale$1d, null, true);var lt=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1d});// Latvian [lv]
var locale$1e = {
  name: 'lv',
  weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
  months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
  monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
  weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY.',
    LL: 'YYYY. [gada] D. MMMM',
    LLL: 'YYYY. [gada] D. MMMM, HH:mm',
    LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
  },
  relativeTime: {
    future: 'pēc %s',
    past: 'pirms %s',
    s: 'dažām sekundēm',
    m: 'minūtes',
    mm: '%d minūtēm',
    h: 'stundas',
    hh: '%d stundām',
    d: 'dienas',
    dd: '%d dienām',
    M: 'mēneša',
    MM: '%d mēnešiem',
    y: 'gada',
    yy: '%d gadiem'
  }
};
dayjs__default['default'].locale(locale$1e, null, true);var lv=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1e});// Montenegrin [me]
var locale$1f = {
  name: 'me',
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  }
};
dayjs__default['default'].locale(locale$1f, null, true);var me=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1f});// Maori [mi]
var locale$1g = {
  name: 'mi',
  weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
  months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
  monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
  weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [i] HH:mm',
    LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
  },
  relativeTime: {
    future: 'i roto i %s',
    past: '%s i mua',
    s: 'te hēkona ruarua',
    m: 'he meneti',
    mm: '%d meneti',
    h: 'te haora',
    hh: '%d haora',
    d: 'he ra',
    dd: '%d ra',
    M: 'he marama',
    MM: '%d marama',
    y: 'he tau',
    yy: '%d tau'
  }
};
dayjs__default['default'].locale(locale$1g, null, true);var mi=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1g});// Macedonian [mk]
var locale$1h = {
  name: 'mk',
  weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
  months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
  weekStart: 1,
  weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
  monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
  weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'после %s',
    past: 'пред %s',
    s: 'неколку секунди',
    m: 'минута',
    mm: '%d минути',
    h: 'час',
    hh: '%d часа',
    d: 'ден',
    dd: '%d дена',
    M: 'месец',
    MM: '%d месеци',
    y: 'година',
    yy: '%d години'
  }
};
dayjs__default['default'].locale(locale$1h, null, true);var mk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1h});// Malayalam [ml]
var locale$1i = {
  name: 'ml',
  weekdays: 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
  months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
  weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
  monthsShort: 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
  weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm -നു',
    LTS: 'A h:mm:ss -നു',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm -നു',
    LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
  },
  relativeTime: {
    future: '%s കഴിഞ്ഞ്',
    past: '%s മുൻപ്',
    s: 'അൽപ നിമിഷങ്ങൾ',
    m: 'ഒരു മിനിറ്റ്',
    mm: '%d മിനിറ്റ്',
    h: 'ഒരു മണിക്കൂർ',
    hh: '%d മണിക്കൂർ',
    d: 'ഒരു ദിവസം',
    dd: '%d ദിവസം',
    M: 'ഒരു മാസം',
    MM: '%d മാസം',
    y: 'ഒരു വർഷം',
    yy: '%d വർഷം'
  }
};
dayjs__default['default'].locale(locale$1i, null, true);var ml=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1i});// Mongolian [mn]
var locale$1j = {
  name: 'mn',
  weekdays: 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
  months: 'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split('_'),
  weekdaysShort: 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
  monthsShort: '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
  weekdaysMin: 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY оны MMMMын D',
    LLL: 'YYYY оны MMMMын D HH:mm',
    LLLL: 'dddd, YYYY оны MMMMын D HH:mm'
  },
  relativeTime: {
    future: '%s',
    past: '%s',
    s: 'саяхан',
    m: 'м',
    mm: '%dм',
    h: '1ц',
    hh: '%dц',
    d: '1ө',
    dd: '%dө',
    M: '1с',
    MM: '%dс',
    y: '1ж',
    yy: '%dж'
  }
};
dayjs__default['default'].locale(locale$1j, null, true);var mn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1j});// Marathi [mr]
var locale$1k = {
  name: 'mr',
  weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
  months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
  weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
  monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
  weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm वाजता',
    LTS: 'A h:mm:ss वाजता',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm वाजता',
    LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
  }
};
dayjs__default['default'].locale(locale$1k, null, true);var mr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1k});// Malay [ms-my]
var locale$1l = {
  name: 'ms-my',
  weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
  months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
  monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
  weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [pukul] HH.mm',
    LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lepas',
    s: 'beberapa saat',
    m: 'seminit',
    mm: '%d minit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun'
  }
};
dayjs__default['default'].locale(locale$1l, null, true);var msMy=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1l});// Malay [ms]
var locale$1m = {
  name: 'ms',
  weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
  weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
  weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
  months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
  monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH.mm',
    LLLL: 'dddd, D MMMM YYYY HH.mm'
  },
  relativeTime: {
    future: 'dalam %s',
    past: '%s yang lepas',
    s: 'beberapa saat',
    m: 'seminit',
    mm: '%d minit',
    h: 'sejam',
    hh: '%d jam',
    d: 'sehari',
    dd: '%d hari',
    M: 'sebulan',
    MM: '%d bulan',
    y: 'setahun',
    yy: '%d tahun'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$1m, null, true);var ms=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1m});// Maltese (Malta) [mt]
var locale$1n = {
  name: 'mt',
  weekdays: 'Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt'.split('_'),
  months: 'Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib'.split('_'),
  monthsShort: 'Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ'.split('_'),
  weekdaysMin: 'Ħa_Tn_Tl_Er_Ħa_Ġi_Si'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'f’ %s',
    past: '%s ilu',
    s: 'ftit sekondi',
    m: 'minuta',
    mm: '%d minuti',
    h: 'siegħa',
    hh: '%d siegħat',
    d: 'ġurnata',
    dd: '%d ġranet',
    M: 'xahar',
    MM: '%d xhur',
    y: 'sena',
    yy: '%d sni'
  }
};
dayjs__default['default'].locale(locale$1n, null, true);var mt=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1n});// Burmese [my]
var locale$1o = {
  name: 'my',
  weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
  months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
  weekStart: 1,
  weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
  monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
  weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'လာမည့် %s မှာ',
    past: 'လွန်ခဲ့သော %s က',
    s: 'စက္ကန်.အနည်းငယ်',
    m: 'တစ်မိနစ်',
    mm: '%d မိနစ်',
    h: 'တစ်နာရီ',
    hh: '%d နာရီ',
    d: 'တစ်ရက်',
    dd: '%d ရက်',
    M: 'တစ်လ',
    MM: '%d လ',
    y: 'တစ်နှစ်',
    yy: '%d နှစ်'
  }
};
dayjs__default['default'].locale(locale$1o, null, true);var my=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1o});// Norwegian Bokmål [nb]
var locale$1p = {
  name: 'nb',
  weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
  weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
  weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
  months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
  },
  relativeTime: {
    future: 'om %s',
    past: '%s siden',
    s: 'noen sekunder',
    m: 'ett minutt',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dager',
    M: 'en måned',
    MM: '%d måneder',
    y: 'ett år',
    yy: '%d år'
  }
};
dayjs__default['default'].locale(locale$1p, null, true);var nb=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1p});// Nepalese [ne]
var locale$1q = {
  name: 'ne',
  weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
  weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
  weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
  months: 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
  monthsShort: 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
  relativeTime: {
    future: '%s पछि',
    past: '%s अघि',
    s: 'सेकेन्ड',
    m: 'एक मिनेट',
    mm: '%d मिनेट',
    h: 'घन्टा',
    hh: '%d घन्टा',
    d: 'एक दिन',
    dd: '%d दिन',
    M: 'एक महिना',
    MM: '%d महिना',
    y: 'एक वर्ष',
    yy: '%d वर्ष'
  },
  ordinal: function ordinal(n) {
    return ("" + n).replace(/\d/g, function (i) {
      return '०१२३४५६७८९'[i];
    });
  },
  formats: {
    LT: 'Aको h:mm बजे',
    LTS: 'Aको h:mm:ss बजे',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, Aको h:mm बजे',
    LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
  }
};
dayjs__default['default'].locale(locale$1q, null, true);var ne=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1q});// Dutch (Belgium) [nl-be]
var locale$1r = {
  name: 'nl-be',
  weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
  months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
  monthsShort: 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
  weekStart: 1,
  weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
  weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    m: 'één minuut',
    mm: '%d minuten',
    h: 'één uur',
    hh: '%d uur',
    d: 'één dag',
    dd: '%d dagen',
    M: 'één maand',
    MM: '%d maanden',
    y: 'één jaar',
    yy: '%d jaar'
  }
};
dayjs__default['default'].locale(locale$1r, null, true);var nlBe=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1r});// Dutch [nl]
var locale$1s = {
  name: 'nl',
  weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
  weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
  weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
  months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
  monthsShort: 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    m: 'een minuut',
    mm: '%d minuten',
    h: 'een uur',
    hh: '%d uur',
    d: 'een dag',
    dd: '%d dagen',
    M: 'een maand',
    MM: '%d maanden',
    y: 'een jaar',
    yy: '%d jaar'
  }
};
dayjs__default['default'].locale(locale$1s, null, true);var nl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1s});// Nynorsk [nn]
var locale$1t = {
  name: 'nn',
  weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
  weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
  weekdaysMin: 'su_må_ty_on_to_fr_la'.split('_'),
  months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  relativeTime: {
    future: 'om %s',
    past: 'for %s sidan',
    s: 'nokre sekund',
    m: 'eitt minutt',
    mm: '%d minutt',
    h: 'ein time',
    hh: '%d timar',
    d: 'ein dag',
    dd: '%d dagar',
    M: 'ein månad',
    MM: '%d månadar',
    y: 'eitt år',
    yy: '%d år'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY [kl.] H:mm',
    LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
  }
};
dayjs__default['default'].locale(locale$1t, null, true);var nn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1t});// Occitan, lengadocian dialecte [oc-lnc]
var locale$1u = {
  name: 'oc-lnc',
  weekdays: 'dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte'.split('_'),
  weekdaysShort: 'Dg_Dl_Dm_Dc_Dj_Dv_Ds'.split('_'),
  weekdaysMin: 'dg_dl_dm_dc_dj_dv_ds'.split('_'),
  months: 'genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre'.split('_'),
  monthsShort: 'gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [de] YYYY',
    LLL: 'D MMMM [de] YYYY [a] H:mm',
    LLLL: 'dddd D MMMM [de] YYYY [a] H:mm'
  },
  relativeTime: {
    future: 'd\'aquí %s',
    past: 'fa %s',
    s: 'unas segondas',
    m: 'una minuta',
    mm: '%d minutas',
    h: 'una ora',
    hh: '%d oras',
    d: 'un jorn',
    dd: '%d jorns',
    M: 'un mes',
    MM: '%d meses',
    y: 'un an',
    yy: '%d ans'
  },
  ordinal: function ordinal(n) {
    return n + "\xBA";
  }
};
dayjs__default['default'].locale(locale$1u, null, true);var ocLnc=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1u});// Punjabi (India) [pa-in]
var locale$1v = {
  name: 'pa-in',
  weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
  months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
  weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
  monthsShort: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
  weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm ਵਜੇ',
    LTS: 'A h:mm:ss ਵਜੇ',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
    LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
  },
  relativeTime: {
    future: '%s ਵਿੱਚ',
    past: '%s ਪਿਛਲੇ',
    s: 'ਕੁਝ ਸਕਿੰਟ',
    m: 'ਇਕ ਮਿੰਟ',
    mm: '%d ਮਿੰਟ',
    h: 'ਇੱਕ ਘੰਟਾ',
    hh: '%d ਘੰਟੇ',
    d: 'ਇੱਕ ਦਿਨ',
    dd: '%d ਦਿਨ',
    M: 'ਇੱਕ ਮਹੀਨਾ',
    MM: '%d ਮਹੀਨੇ',
    y: 'ਇੱਕ ਸਾਲ',
    yy: '%d ਸਾਲ'
  }
};
dayjs__default['default'].locale(locale$1v, null, true);var paIn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1v});// Polish [pl]

function plural$1(n) {
  return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1; // eslint-disable-line
}
/* eslint-disable */


function translate$1(number, withoutSuffix, key) {
  var result = number + " ";

  switch (key) {
    case 'm':
      return withoutSuffix ? 'minuta' : 'minutę';

    case 'mm':
      return result + (plural$1(number) ? 'minuty' : 'minut');

    case 'h':
      return withoutSuffix ? 'godzina' : 'godzinę';

    case 'hh':
      return result + (plural$1(number) ? 'godziny' : 'godzin');

    case 'MM':
      return result + (plural$1(number) ? 'miesiące' : 'miesięcy');

    case 'yy':
      return result + (plural$1(number) ? 'lata' : 'lat');
  }
}
/* eslint-enable */


var monthFormat$2 = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
var monthStandalone$2 = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
var MONTHS_IN_FORMAT$2 = /D MMMM/;

var months$3 = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT$2.test(format)) {
    return monthFormat$2[dayjsInstance.month()];
  }

  return monthStandalone$2[dayjsInstance.month()];
};

months$3.s = monthStandalone$2;
months$3.f = monthFormat$2;
var locale$1w = {
  name: 'pl',
  weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
  weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
  weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
  months: months$3,
  monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'za %s',
    past: '%s temu',
    s: 'kilka sekund',
    m: translate$1,
    mm: translate$1,
    h: translate$1,
    hh: translate$1,
    d: '1 dzień',
    dd: '%d dni',
    M: 'miesiąc',
    MM: translate$1,
    y: 'rok',
    yy: translate$1
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$1w, null, true);var pl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1w});// Portuguese (Brazil) [pt-br]
var locale$1x = {
  name: 'pt-br',
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\xBA";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
};
dayjs__default['default'].locale(locale$1x, null, true);var ptBr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1x});// Portuguese [pt]
var locale$1y = {
  name: 'pt',
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sa'.split('_'),
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\xBA";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'alguns segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
};
dayjs__default['default'].locale(locale$1y, null, true);var pt=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1y});// Romanian [ro]
var locale$1z = {
  name: 'ro',
  weekdays: 'Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
  weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'peste %s',
    past: 'acum %s',
    s: 'câteva secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o oră',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zile',
    M: 'o lună',
    MM: '%d luni',
    y: 'un an',
    yy: '%d ani'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs__default['default'].locale(locale$1z, null, true);var ro=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1z});// Russian [ru]
var monthFormat$3 = 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_');
var monthStandalone$3 = 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_');
var monthShortFormat = 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_');
var monthShortStandalone = 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_');
var MONTHS_IN_FORMAT$3 = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

function plural$2(word, num) {
  var forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]; // eslint-disable-line
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
  var format = {
    mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
    hh: 'час_часа_часов',
    dd: 'день_дня_дней',
    MM: 'месяц_месяца_месяцев',
    yy: 'год_года_лет'
  };

  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  }

  return number + " " + plural$2(format[key], +number);
}

var months$4 = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT$3.test(format)) {
    return monthFormat$3[dayjsInstance.month()];
  }

  return monthStandalone$3[dayjsInstance.month()];
};

months$4.s = monthStandalone$3;
months$4.f = monthFormat$3;

var monthsShort = function monthsShort(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT$3.test(format)) {
    return monthShortFormat[dayjsInstance.month()];
  }

  return monthShortStandalone[dayjsInstance.month()];
};

monthsShort.s = monthShortStandalone;
monthsShort.f = monthShortFormat;
var locale$1A = {
  name: 'ru',
  weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
  weekdaysShort: 'вск_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
  months: months$4,
  monthsShort: monthsShort,
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., H:mm',
    LLLL: 'dddd, D MMMM YYYY г., H:mm'
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'несколько секунд',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'час',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'месяц',
    MM: relativeTimeWithPlural,
    y: 'год',
    yy: relativeTimeWithPlural
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs__default['default'].locale(locale$1A, null, true);var ru=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1A});// Kinyarwanda (Rwanda) [rw]
var locale$1B = {
  name: 'rw',
  weekdays: 'Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu'.split('_'),
  months: 'Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza'.split('_'),
  relativeTime: {
    future: 'mu %s',
    past: '%s',
    s: 'amasegonda',
    m: 'Umunota',
    mm: '%d iminota',
    h: 'isaha',
    hh: '%d amasaha',
    d: 'Umunsi',
    dd: '%d iminsi',
    M: 'ukwezi',
    MM: '%d amezi',
    y: 'umwaka',
    yy: '%d imyaka'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs__default['default'].locale(locale$1B, null, true);var rw=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1B});// Sindhi [sd]
var locale$1C = {
  name: 'sd',
  weekdays: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
  months: 'جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر'.split('_'),
  weekStart: 1,
  weekdaysShort: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
  monthsShort: 'جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر'.split('_'),
  weekdaysMin: 'آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd، D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s پوء',
    past: '%s اڳ',
    s: 'چند سيڪنڊ',
    m: 'هڪ منٽ',
    mm: '%d منٽ',
    h: 'هڪ ڪلاڪ',
    hh: '%d ڪلاڪ',
    d: 'هڪ ڏينهن',
    dd: '%d ڏينهن',
    M: 'هڪ مهينو',
    MM: '%d مهينا',
    y: 'هڪ سال',
    yy: '%d سال'
  }
};
dayjs__default['default'].locale(locale$1C, null, true);var sd=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1C});// Northern Sami [se]
var locale$1D = {
  name: 'se',
  weekdays: 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
  months: 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
  weekStart: 1,
  weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
  monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
  weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'MMMM D. [b.] YYYY',
    LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
    LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
  },
  relativeTime: {
    future: '%s geažes',
    past: 'maŋit %s',
    s: 'moadde sekunddat',
    m: 'okta minuhta',
    mm: '%d minuhtat',
    h: 'okta diimmu',
    hh: '%d diimmut',
    d: 'okta beaivi',
    dd: '%d beaivvit',
    M: 'okta mánnu',
    MM: '%d mánut',
    y: 'okta jahki',
    yy: '%d jagit'
  }
};
dayjs__default['default'].locale(locale$1D, null, true);var se=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1D});// Sinhalese [si]
var locale$1E = {
  name: 'si',
  weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
  months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
  weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
  monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
  weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'a h:mm',
    LTS: 'a h:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY MMMM D',
    LLL: 'YYYY MMMM D, a h:mm',
    LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
  },
  relativeTime: {
    future: '%sකින්',
    past: '%sකට පෙර',
    s: 'තත්පර කිහිපය',
    m: 'මිනිත්තුව',
    mm: 'මිනිත්තු %d',
    h: 'පැය',
    hh: 'පැය %d',
    d: 'දිනය',
    dd: 'දින %d',
    M: 'මාසය',
    MM: 'මාස %d',
    y: 'වසර',
    yy: 'වසර %d'
  }
};
dayjs__default['default'].locale(locale$1E, null, true);var si=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1E});// Slovak [sk]

function plural$3(n) {
  return n > 1 && n < 5 && ~~(n / 10) !== 1; // eslint-disable-line
}
/* eslint-disable */


function translate$2(number, withoutSuffix, key, isFuture) {
  var result = number + " ";

  switch (key) {
    case 's':
      // a few seconds / in a few seconds / a few seconds ago
      return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';

    case 'm':
      // a minute / in a minute / a minute ago
      return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';

    case 'mm':
      // 9 minutes / in 9 minutes / 9 minutes ago
      if (withoutSuffix || isFuture) {
        return result + (plural$3(number) ? 'minúty' : 'minút');
      }

      return result + "min\xFAtami";

    case 'h':
      // an hour / in an hour / an hour ago
      return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';

    case 'hh':
      // 9 hours / in 9 hours / 9 hours ago
      if (withoutSuffix || isFuture) {
        return result + (plural$3(number) ? 'hodiny' : 'hodín');
      }

      return result + "hodinami";

    case 'd':
      // a day / in a day / a day ago
      return withoutSuffix || isFuture ? 'deň' : 'dňom';

    case 'dd':
      // 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (plural$3(number) ? 'dni' : 'dní');
      }

      return result + "d\u0148ami";

    case 'M':
      // a month / in a month / a month ago
      return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';

    case 'MM':
      // 9 months / in 9 months / 9 months ago
      if (withoutSuffix || isFuture) {
        return result + (plural$3(number) ? 'mesiace' : 'mesiacov');
      }

      return result + "mesiacmi";

    case 'y':
      // a year / in a year / a year ago
      return withoutSuffix || isFuture ? 'rok' : 'rokom';

    case 'yy':
      // 9 years / in 9 years / 9 years ago
      if (withoutSuffix || isFuture) {
        return result + (plural$3(number) ? 'roky' : 'rokov');
      }

      return result + "rokmi";
  }
}
/* eslint-enable */


var locale$1F = {
  name: 'sk',
  weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
  weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
  weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
  months: 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
  monthsShort: 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_'),
  weekStart: 1,
  yearStart: 4,
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm',
    l: 'D. M. YYYY'
  },
  relativeTime: {
    future: 'za %s',
    // Should be `o %s` (change when moment/moment#5408 is fixed)
    past: 'pred %s',
    s: translate$2,
    m: translate$2,
    mm: translate$2,
    h: translate$2,
    hh: translate$2,
    d: translate$2,
    dd: translate$2,
    M: translate$2,
    MM: translate$2,
    y: translate$2,
    yy: translate$2
  }
};
dayjs__default['default'].locale(locale$1F, null, true);var sk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1F});// Slovenian [sl]
var locale$1G = {
  name: 'sl',
  weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
  months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
  weekStart: 1,
  weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
  weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'čez %s',
    past: 'pred %s',
    s: 'nekaj sekund',
    m: 'minuta',
    mm: '%d minut',
    h: 'ura',
    hh: '%d ur',
    d: 'dan',
    dd: '%d dni',
    M: 'mesec',
    MM: '%d mesecev',
    y: 'leto',
    yy: '%d let'
  }
};
dayjs__default['default'].locale(locale$1G, null, true);var sl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1G});// Albanian [sq]
var locale$1H = {
  name: 'sq',
  weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
  months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
  monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
  weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'në %s',
    past: '%s më parë',
    s: 'disa sekonda',
    m: 'një minutë',
    mm: '%d minuta',
    h: 'një orë',
    hh: '%d orë',
    d: 'një ditë',
    dd: '%d ditë',
    M: 'një muaj',
    MM: '%d muaj',
    y: 'një vit',
    yy: '%d vite'
  }
};
dayjs__default['default'].locale(locale$1H, null, true);var sq=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1H});// Serbian Cyrillic [sr-cyrl]
var translator = {
  words: {
    m: ['један минут', 'једног минута'],
    mm: ['%d минут', '%d минута', '%d минута'],
    h: ['један сат', 'једног сата'],
    hh: ['%d сат', '%d сата', '%d сати'],
    d: ['један дан', 'једног дана'],
    dd: ['%d дан', '%d дана', '%d дана'],
    M: ['један месец', 'једног месеца'],
    MM: ['%d месец', '%d месеца', '%d месеци'],
    y: ['једну годину', 'једне године'],
    yy: ['%d годину', '%d године', '%d година']
  },
  correctGrammarCase: function correctGrammarCase(number, wordKey) {
    if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return number % 10 === 1 ? wordKey[0] : wordKey[1];
    }

    return wordKey[2];
  },
  relativeTimeFormatter: function relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
    var wordKey = translator.words[key];

    if (key.length === 1) {
      // Nominativ
      if (key === 'y' && withoutSuffix) return 'једна година';
      return isFuture || withoutSuffix ? wordKey[0] : wordKey[1];
    }

    var word = translator.correctGrammarCase(number, wordKey); // Nominativ

    if (key === 'yy' && withoutSuffix && word === '%d годину') return number + " \u0433\u043E\u0434\u0438\u043D\u0430";
    return word.replace('%d', number);
  }
};
var locale$1I = {
  name: 'sr-cyrl',
  weekdays: 'Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота'.split('_'),
  weekdaysShort: 'Нед._Пон._Уто._Сре._Чет._Пет._Суб.'.split('_'),
  weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
  months: 'Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар'.split('_'),
  monthsShort: 'Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'за %s',
    past: 'пре %s',
    s: 'неколико секунди',
    m: translator.relativeTimeFormatter,
    mm: translator.relativeTimeFormatter,
    h: translator.relativeTimeFormatter,
    hh: translator.relativeTimeFormatter,
    d: translator.relativeTimeFormatter,
    dd: translator.relativeTimeFormatter,
    M: translator.relativeTimeFormatter,
    MM: translator.relativeTimeFormatter,
    y: translator.relativeTimeFormatter,
    yy: translator.relativeTimeFormatter
  },
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D. M. YYYY.',
    LL: 'D. MMMM YYYY.',
    LLL: 'D. MMMM YYYY. H:mm',
    LLLL: 'dddd, D. MMMM YYYY. H:mm'
  }
};
dayjs__default['default'].locale(locale$1I, null, true);var srCyrl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1I});// Serbian [sr]
var translator$1 = {
  words: {
    m: ['jedan minut', 'jednog minuta'],
    mm: ['%d minut', '%d minuta', '%d minuta'],
    h: ['jedan sat', 'jednog sata'],
    hh: ['%d sat', '%d sata', '%d sati'],
    d: ['jedan dan', 'jednog dana'],
    dd: ['%d dan', '%d dana', '%d dana'],
    M: ['jedan mesec', 'jednog meseca'],
    MM: ['%d mesec', '%d meseca', '%d meseci'],
    y: ['jednu godinu', 'jedne godine'],
    yy: ['%d godinu', '%d godine', '%d godina']
  },
  correctGrammarCase: function correctGrammarCase(number, wordKey) {
    if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return number % 10 === 1 ? wordKey[0] : wordKey[1];
    }

    return wordKey[2];
  },
  relativeTimeFormatter: function relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
    var wordKey = translator$1.words[key];

    if (key.length === 1) {
      // Nominativ
      if (key === 'y' && withoutSuffix) return 'jedna godina';
      return isFuture || withoutSuffix ? wordKey[0] : wordKey[1];
    }

    var word = translator$1.correctGrammarCase(number, wordKey); // Nominativ

    if (key === 'yy' && withoutSuffix && word === '%d godinu') return number + " godina";
    return word.replace('%d', number);
  }
};
var locale$1J = {
  name: 'sr',
  weekdays: 'Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota'.split('_'),
  weekdaysShort: 'Ned._Pon._Uto._Sre._Čet._Pet._Sub.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  months: 'Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar'.split('_'),
  monthsShort: 'Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'za %s',
    past: 'pre %s',
    s: 'nekoliko sekundi',
    m: translator$1.relativeTimeFormatter,
    mm: translator$1.relativeTimeFormatter,
    h: translator$1.relativeTimeFormatter,
    hh: translator$1.relativeTimeFormatter,
    d: translator$1.relativeTimeFormatter,
    dd: translator$1.relativeTimeFormatter,
    M: translator$1.relativeTimeFormatter,
    MM: translator$1.relativeTimeFormatter,
    y: translator$1.relativeTimeFormatter,
    yy: translator$1.relativeTimeFormatter
  },
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D. M. YYYY.',
    LL: 'D. MMMM YYYY.',
    LLL: 'D. MMMM YYYY. H:mm',
    LLLL: 'dddd, D. MMMM YYYY. H:mm'
  }
};
dayjs__default['default'].locale(locale$1J, null, true);var sr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1J});// siSwati [ss]
var locale$1K = {
  name: 'ss',
  weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
  months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
  weekStart: 1,
  weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
  monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
  weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'nga %s',
    past: 'wenteka nga %s',
    s: 'emizuzwana lomcane',
    m: 'umzuzu',
    mm: '%d emizuzu',
    h: 'lihora',
    hh: '%d emahora',
    d: 'lilanga',
    dd: '%d emalanga',
    M: 'inyanga',
    MM: '%d tinyanga',
    y: 'umnyaka',
    yy: '%d iminyaka'
  }
};
dayjs__default['default'].locale(locale$1K, null, true);var ss=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1K});// Swedish [sv]
var locale$1L = {
  name: 'sv',
  weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
  weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
  weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
  months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
  monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
  weekStart: 1,
  ordinal: function ordinal(n) {
    var b = n % 10;
    var o = b === 1 || b === 2 ? 'a' : 'e';
    return "[" + n + o + "]";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY [kl.] HH:mm',
    LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd D MMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'om %s',
    past: 'för %s sedan',
    s: 'några sekunder',
    m: 'en minut',
    mm: '%d minuter',
    h: 'en timme',
    hh: '%d timmar',
    d: 'en dag',
    dd: '%d dagar',
    M: 'en månad',
    MM: '%d månader',
    y: 'ett år',
    yy: '%d år'
  }
};
dayjs__default['default'].locale(locale$1L, null, true);var sv=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1L});// Swahili [sw]
var locale$1M = {
  name: 'sw',
  weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
  weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
  weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
  months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
  monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
  weekStart: 1,
  ordinal: function ordinal(n) {
    return n;
  },
  relativeTime: {
    future: '%s baadaye',
    past: 'tokea %s',
    s: 'hivi punde',
    m: 'dakika moja',
    mm: 'dakika %d',
    h: 'saa limoja',
    hh: 'masaa %d',
    d: 'siku moja',
    dd: 'masiku %d',
    M: 'mwezi mmoja',
    MM: 'miezi %d',
    y: 'mwaka mmoja',
    yy: 'miaka %d'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$1M, null, true);var sw=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1M});// Tamil [ta]
var locale$1N = {
  name: 'ta',
  weekdays: 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
  months: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
  weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
  monthsShort: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
  weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, HH:mm',
    LLLL: 'dddd, D MMMM YYYY, HH:mm'
  },
  relativeTime: {
    future: '%s இல்',
    past: '%s முன்',
    s: 'ஒரு சில விநாடிகள்',
    m: 'ஒரு நிமிடம்',
    mm: '%d நிமிடங்கள்',
    h: 'ஒரு மணி நேரம்',
    hh: '%d மணி நேரம்',
    d: 'ஒரு நாள்',
    dd: '%d நாட்கள்',
    M: 'ஒரு மாதம்',
    MM: '%d மாதங்கள்',
    y: 'ஒரு வருடம்',
    yy: '%d ஆண்டுகள்'
  }
};
dayjs__default['default'].locale(locale$1N, null, true);var ta=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1N});// Telugu [te]
var locale$1O = {
  name: 'te',
  weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
  months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
  weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
  monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
  weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  relativeTime: {
    future: '%s లో',
    past: '%s క్రితం',
    s: 'కొన్ని క్షణాలు',
    m: 'ఒక నిమిషం',
    mm: '%d నిమిషాలు',
    h: 'ఒక గంట',
    hh: '%d గంటలు',
    d: 'ఒక రోజు',
    dd: '%d రోజులు',
    M: 'ఒక నెల',
    MM: '%d నెలలు',
    y: 'ఒక సంవత్సరం',
    yy: '%d సంవత్సరాలు'
  }
};
dayjs__default['default'].locale(locale$1O, null, true);var te=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1O});// Tetun Dili (East Timor) [tet]
var locale$1P = {
  name: 'tet',
  weekdays: 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu'.split('_'),
  months: 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Dom_Seg_Ters_Kua_Kint_Sest_Sab'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdaysMin: 'Do_Seg_Te_Ku_Ki_Ses_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'iha %s',
    past: '%s liuba',
    s: 'minutu balun',
    m: 'minutu ida',
    mm: 'minutu %d',
    h: 'oras ida',
    hh: 'oras %d',
    d: 'loron ida',
    dd: 'loron %d',
    M: 'fulan ida',
    MM: 'fulan %d',
    y: 'tinan ida',
    yy: 'tinan %d'
  }
};
dayjs__default['default'].locale(locale$1P, null, true);var tet=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1P});// Tajik [tg]
var locale$1Q = {
  name: 'tg',
  weekdays: 'якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе'.split('_'),
  months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
  weekStart: 1,
  weekdaysShort: 'яшб_дшб_сшб_чшб_пшб_ҷум_шнб'.split('_'),
  monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
  weekdaysMin: 'яш_дш_сш_чш_пш_ҷм_шб'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'баъди %s',
    past: '%s пеш',
    s: 'якчанд сония',
    m: 'як дақиқа',
    mm: '%d дақиқа',
    h: 'як соат',
    hh: '%d соат',
    d: 'як рӯз',
    dd: '%d рӯз',
    M: 'як моҳ',
    MM: '%d моҳ',
    y: 'як сол',
    yy: '%d сол'
  }
};
dayjs__default['default'].locale(locale$1Q, null, true);var tg=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1Q});// Thai [th]
var locale$1R = {
  name: 'th',
  weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
  weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'),
  weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
  months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
  monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY เวลา H:mm',
    LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
  },
  relativeTime: {
    future: 'อีก %s',
    past: '%sที่แล้ว',
    s: 'ไม่กี่วินาที',
    m: '1 นาที',
    mm: '%d นาที',
    h: '1 ชั่วโมง',
    hh: '%d ชั่วโมง',
    d: '1 วัน',
    dd: '%d วัน',
    M: '1 เดือน',
    MM: '%d เดือน',
    y: '1 ปี',
    yy: '%d ปี'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$1R, null, true);var th=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1R});// Turkmen [tk]
var locale$1S = {
  name: 'tk',
  weekdays: 'Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe'.split('_'),
  weekdaysShort: 'Ýek_Duş_Siş_Çar_Pen_Ann_Şen'.split('_'),
  weekdaysMin: 'Ýk_Dş_Sş_Çr_Pn_An_Şn'.split('_'),
  months: 'Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr'.split('_'),
  monthsShort: 'Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s soň',
    past: '%s öň',
    s: 'birnäçe sekunt',
    m: 'bir minut',
    mm: '%d minut',
    h: 'bir sagat',
    hh: '%d sagat',
    d: 'bir gün',
    dd: '%d gün',
    M: 'bir aý',
    MM: '%d aý',
    y: 'bir ýyl',
    yy: '%d ýyl'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$1S, null, true);var tk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1S});// Tagalog (Philippines) [tl-ph]
var locale$1T = {
  name: 'tl-ph',
  weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
  months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
  monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
  weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'MM/D/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY HH:mm',
    LLLL: 'dddd, MMMM DD, YYYY HH:mm'
  },
  relativeTime: {
    future: 'sa loob ng %s',
    past: '%s ang nakalipas',
    s: 'ilang segundo',
    m: 'isang minuto',
    mm: '%d minuto',
    h: 'isang oras',
    hh: '%d oras',
    d: 'isang araw',
    dd: '%d araw',
    M: 'isang buwan',
    MM: '%d buwan',
    y: 'isang taon',
    yy: '%d taon'
  }
};
dayjs__default['default'].locale(locale$1T, null, true);var tlPh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1T});// Klingon [tlh]
var locale$1U = {
  name: 'tlh',
  weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
  months: 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
  weekStart: 1,
  weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
  monthsShort: 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
  weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
};
dayjs__default['default'].locale(locale$1U, null, true);var tlh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1U});// Turkish [tr]
var locale$1V = {
  name: 'tr',
  weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
  weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
  weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
  months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
  monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s sonra',
    past: '%s önce',
    s: 'birkaç saniye',
    m: 'bir dakika',
    mm: '%d dakika',
    h: 'bir saat',
    hh: '%d saat',
    d: 'bir gün',
    dd: '%d gün',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir yıl',
    yy: '%d yıl'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs__default['default'].locale(locale$1V, null, true);var tr=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1V});// Talossan [tzl]
var locale$1W = {
  name: 'tzl',
  weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
  months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
  weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM [dallas] YYYY',
    LLL: 'D. MMMM [dallas] YYYY HH.mm',
    LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
  }
};
dayjs__default['default'].locale(locale$1W, null, true);var tzl=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1W});// Central Atlas Tamazight Latin [tzm-latn]
var locale$1X = {
  name: 'tzm-latn',
  weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
  months: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
  weekStart: 6,
  weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
  monthsShort: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
  weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'dadkh s yan %s',
    past: 'yan %s',
    s: 'imik',
    m: 'minuḍ',
    mm: '%d minuḍ',
    h: 'saɛa',
    hh: '%d tassaɛin',
    d: 'ass',
    dd: '%d ossan',
    M: 'ayowr',
    MM: '%d iyyirn',
    y: 'asgas',
    yy: '%d isgasn'
  }
};
dayjs__default['default'].locale(locale$1X, null, true);var tzmLatn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1X});// Central Atlas Tamazight [tzm]
var locale$1Y = {
  name: 'tzm',
  weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
  months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
  weekStart: 6,
  weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
  monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
  weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
    past: 'ⵢⴰⵏ %s',
    s: 'ⵉⵎⵉⴽ',
    m: 'ⵎⵉⵏⵓⴺ',
    mm: '%d ⵎⵉⵏⵓⴺ',
    h: 'ⵙⴰⵄⴰ',
    hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
    d: 'ⴰⵙⵙ',
    dd: '%d oⵙⵙⴰⵏ',
    M: 'ⴰⵢoⵓⵔ',
    MM: '%d ⵉⵢⵢⵉⵔⵏ',
    y: 'ⴰⵙⴳⴰⵙ',
    yy: '%d ⵉⵙⴳⴰⵙⵏ'
  }
};
dayjs__default['default'].locale(locale$1Y, null, true);var tzm=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1Y});// Uyghur (China) [ug-cn]
var locale$1Z = {
  name: 'ug-cn',
  weekdays: 'يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە'.split('_'),
  months: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
  weekStart: 1,
  weekdaysShort: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
  monthsShort: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
  weekdaysMin: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY-يىلىM-ئاينىڭD-كۈنى',
    LLL: 'YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm',
    LLLL: 'dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm'
  },
  relativeTime: {
    future: '%s كېيىن',
    past: '%s بۇرۇن',
    s: 'نەچچە سېكونت',
    m: 'بىر مىنۇت',
    mm: '%d مىنۇت',
    h: 'بىر سائەت',
    hh: '%d سائەت',
    d: 'بىر كۈن',
    dd: '%d كۈن',
    M: 'بىر ئاي',
    MM: '%d ئاي',
    y: 'بىر يىل',
    yy: '%d يىل'
  }
};
dayjs__default['default'].locale(locale$1Z, null, true);var ugCn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1Z});// Ukrainian [uk]
var monthFormat$4 = 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_');
var monthStandalone$4 = 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_');
var MONTHS_IN_FORMAT$4 = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

function plural$4(word, num) {
  var forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]; // eslint-disable-line
}

function relativeTimeWithPlural$1(number, withoutSuffix, key) {
  var format = {
    ss: withoutSuffix ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
    mm: withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
    hh: withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
    dd: 'день_дні_днів',
    MM: 'місяць_місяці_місяців',
    yy: 'рік_роки_років'
  };

  if (key === 'm') {
    return withoutSuffix ? 'хвилина' : 'хвилину';
  } else if (key === 'h') {
    return withoutSuffix ? 'година' : 'годину';
  }

  return number + " " + plural$4(format[key], +number);
}

var months$5 = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT$4.test(format)) {
    return monthFormat$4[dayjsInstance.month()];
  }

  return monthStandalone$4[dayjsInstance.month()];
};

months$5.s = monthStandalone$4;
months$5.f = monthFormat$4;
var locale$1_ = {
  name: 'uk',
  weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
  weekdaysShort: 'ндл_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  months: months$5,
  monthsShort: 'січ_лют_бер_квiт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'за %s',
    past: '%s тому',
    s: 'декілька секунд',
    m: relativeTimeWithPlural$1,
    mm: relativeTimeWithPlural$1,
    h: relativeTimeWithPlural$1,
    hh: relativeTimeWithPlural$1,
    d: 'день',
    dd: relativeTimeWithPlural$1,
    M: 'місяць',
    MM: relativeTimeWithPlural$1,
    y: 'рік',
    yy: relativeTimeWithPlural$1
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY р.',
    LLL: 'D MMMM YYYY р., HH:mm',
    LLLL: 'dddd, D MMMM YYYY р., HH:mm'
  }
};
dayjs__default['default'].locale(locale$1_, null, true);var uk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1_});// Urdu [ur]
var locale$1$ = {
  name: 'ur',
  weekdays: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
  months: 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
  weekStart: 1,
  weekdaysShort: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
  monthsShort: 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
  weekdaysMin: 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd، D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s بعد',
    past: '%s قبل',
    s: 'چند سیکنڈ',
    m: 'ایک منٹ',
    mm: '%d منٹ',
    h: 'ایک گھنٹہ',
    hh: '%d گھنٹے',
    d: 'ایک دن',
    dd: '%d دن',
    M: 'ایک ماہ',
    MM: '%d ماہ',
    y: 'ایک سال',
    yy: '%d سال'
  }
};
dayjs__default['default'].locale(locale$1$, null, true);var ur=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$1$});// Uzbek Latin [uz-latn]
var locale$20 = {
  name: 'uz-latn',
  weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
  months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
  monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
  weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'D MMMM YYYY, dddd HH:mm'
  },
  relativeTime: {
    future: 'Yaqin %s ichida',
    past: 'Bir necha %s oldin',
    s: 'soniya',
    m: 'bir daqiqa',
    mm: '%d daqiqa',
    h: 'bir soat',
    hh: '%d soat',
    d: 'bir kun',
    dd: '%d kun',
    M: 'bir oy',
    MM: '%d oy',
    y: 'bir yil',
    yy: '%d yil'
  }
};
dayjs__default['default'].locale(locale$20, null, true);var uzLatn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$20});// Uzbek [uz]
var locale$21 = {
  name: 'uz',
  weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
  months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
  monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
  weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'D MMMM YYYY, dddd HH:mm'
  },
  relativeTime: {
    future: 'Якин %s ичида',
    past: 'Бир неча %s олдин',
    s: 'фурсат',
    m: 'бир дакика',
    mm: '%d дакика',
    h: 'бир соат',
    hh: '%d соат',
    d: 'бир кун',
    dd: '%d кун',
    M: 'бир ой',
    MM: '%d ой',
    y: 'бир йил',
    yy: '%d йил'
  }
};
dayjs__default['default'].locale(locale$21, null, true);var uz=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$21});// Vietnamese [vi]
var locale$22 = {
  name: 'vi',
  weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
  months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
  weekStart: 1,
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [năm] YYYY',
    LLL: 'D MMMM [năm] YYYY HH:mm',
    LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
    l: 'DD/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: 'vài giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d giờ',
    d: 'một ngày',
    dd: '%d ngày',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm'
  }
};
dayjs__default['default'].locale(locale$22, null, true);var vi=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$22});// Pseudo [x-pseudo]
var locale$23 = {
  name: 'x-pseudo',
  weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
  months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
  weekStart: 1,
  weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
  monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
  weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'í~ñ %s',
    past: '%s á~gó',
    s: 'á ~féw ~sécó~ñds',
    m: 'á ~míñ~úté',
    mm: '%d m~íñú~tés',
    h: 'á~ñ hó~úr',
    hh: '%d h~óúrs',
    d: 'á ~dáý',
    dd: '%d d~áýs',
    M: 'á ~móñ~th',
    MM: '%d m~óñt~hs',
    y: 'á ~ýéár',
    yy: '%d ý~éárs'
  }
};
dayjs__default['default'].locale(locale$23, null, true);var xPseudo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$23});// Yoruba Nigeria [yo]
var locale$24 = {
  name: 'yo',
  weekdays: 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
  months: 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
  monthsShort: 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
  weekdaysMin: 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'ní %s',
    past: '%s kọjá',
    s: 'ìsẹjú aayá die',
    m: 'ìsẹjú kan',
    mm: 'ìsẹjú %d',
    h: 'wákati kan',
    hh: 'wákati %d',
    d: 'ọjọ́ kan',
    dd: 'ọjọ́ %d',
    M: 'osù kan',
    MM: 'osù %d',
    y: 'ọdún kan',
    yy: 'ọdún %d'
  }
};
dayjs__default['default'].locale(locale$24, null, true);var yo=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$24});// Chinese (China) [zh-cn]
var locale$25 = {
  name: 'zh-cn',
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  ordinal: function ordinal(number, period) {
    switch (period) {
      case 'W':
        return number + "\u5468";

      default:
        return number + "\u65E5";
    }
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  meridiem: function meridiem(hour, minute) {
    var hm = hour * 100 + minute;

    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1100) {
      return '上午';
    } else if (hm < 1300) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    }

    return '晚上';
  }
};
dayjs__default['default'].locale(locale$25, null, true);var zhCn=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$25});// Chinese (Hong Kong) [zh-hk]
var locale$26 = {
  name: 'zh-hk',
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\u65E5";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日dddd HH:mm'
  },
  relativeTime: {
    future: '%s內',
    past: '%s前',
    s: '幾秒',
    m: '一分鐘',
    mm: '%d 分鐘',
    h: '一小時',
    hh: '%d 小時',
    d: '一天',
    dd: '%d 天',
    M: '一個月',
    MM: '%d 個月',
    y: '一年',
    yy: '%d 年'
  }
};
dayjs__default['default'].locale(locale$26, null, true);var zhHk=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$26});// Chinese (Taiwan) [zh-tw]
var locale$27 = {
  name: 'zh-tw',
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\u65E5";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日dddd HH:mm',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  relativeTime: {
    future: '%s內',
    past: '%s前',
    s: '幾秒',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '1 個月',
    MM: '%d 個月',
    y: '1 年',
    yy: '%d 年'
  }
};
dayjs__default['default'].locale(locale$27, null, true);var zhTw=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$27});// Chinese [zh]
var locale$28 = {
  name: 'zh',
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  ordinal: function ordinal(number, period) {
    switch (period) {
      case 'W':
        return number + "\u5468";

      default:
        return number + "\u65E5";
    }
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  meridiem: function meridiem(hour, minute) {
    var hm = hour * 100 + minute;

    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1100) {
      return '上午';
    } else if (hm < 1300) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    }

    return '晚上';
  }
};
dayjs__default['default'].locale(locale$28, null, true);var zh=/*#__PURE__*/Object.freeze({__proto__:null,'default': locale$28});module.exports=component;