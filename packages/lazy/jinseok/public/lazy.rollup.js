var RMLazy = (function () {
  'use strict';

  var version = "1.0.0";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function of(iteratee, collection) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = collection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        iteratee(item);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var LazyObserver =
  /*#__PURE__*/
  function () {
    function LazyObserver(options) {
      var _this = this;

      _classCallCheck(this, LazyObserver);

      this.subject = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            console.log("enter");
          } else if (entry.target.dataset.rmLazy) {
            console.log("leave");
          } else {
            entry.target.dataset.rmLazy = true;
          }
        });
      }, {
        root: null,
        threshold: 0
      });
      this.elements = [];
      this.root = null;
      this.hooks = {};
      Array.from(document.body.querySelectorAll("img")).forEach(function (item) {
        return _this.subject.observe(item);
      });
    }

    _createClass(LazyObserver, [{
      key: "processEvent",
      value: function processEvent(entries, observer) {
        of(function (entry) {
          console.log(entry.target, entry.isIntersecting);

          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            console.log("enter");
          } else if (entry.target.dataset.rmLazy) {
            console.log("leave");
          } else {
            entry.target.dataset.rmLazy = true;
          }
        }, entries);
      }
    }, {
      key: "observe",
      value: function observe(query) {
        // of(
        //   element => this.subject.observe(element),
        //   this.root.querySelectorAll(query)
        // );
        return this;
      }
    }, {
      key: "subscribe",
      value: function subscribe() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var keys = ["register", "enter", "leave", "error"];

        var _arr = Object.keys(events);

        for (var _i = 0; _i < _arr.length; _i++) {
          var key = _arr[_i];

          if (!keys.includes(key)) {
            this.hooks = {};
            throw new Error("".concat(key, "\uB294 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. [enter, leave, error]\uB9CC \uB4F1\uB85D \uAC00\uB2A5\uD569\uB2C8\uB2E4."));
          }

          this.hooks[key] = events[key];
        }
      }
    }]);

    return LazyObserver;
  }();

  function lazy() {}

  lazy.create = function (options) {
    return new LazyObserver(options);
  };

  lazy.VERSION = version;

  return lazy;

}());
