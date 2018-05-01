// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Didact = importFromBelow();

var Counter = function (_Didact$Component) {
  _inherits(Counter, _Didact$Component);

  function Counter(props) {
    _classCallCheck(this, Counter);

    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

    _this.state = {
      value: 0
    };
    return _this;
  }

  _createClass(Counter, [{
    key: "increment",
    value: function increment() {
      this.setState({ value: this.state.value + 1 });
    }
  }, {
    key: "decrement",
    value: function decrement() {
      this.setState({ value: this.state.value - 1 });
    }
  }, {
    key: "render",
    value: function render() {
      return Didact.createElement("div", {}, Didact.createElement("button", { onClick: this.increment.bind(this) }, "+"), Didact.createElement("h2", {}, "Counter " + this.state.value), Didact.createElement("button", { onClick: this.decrement.bind(this) }, "-"));
    }
  }]);

  return Counter;
}(Didact.Component);

var App = function (_Didact$Component2) {
  _inherits(App, _Didact$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return Didact.createElement("div", {}, Didact.createElement(Counter, {}));
    }
  }]);

  return App;
}(Didact.Component);

Didact.render(Didact.createElement(App, {}), document.getElementById("didact"));

function importFromBelow() {
  //#region element.js
  var TEXT_ELEMENT = "TEXT ELEMENT";

  function createElement(type, config) {
    var _ref;

    var props = Object.assign({}, config);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var hasChildren = args.length > 0;
    var rawChildren = hasChildren ? (_ref = []).concat.apply(_ref, args) : [];
    props.children = rawChildren.filter(function (c) {
      return c != null && c !== false;
    }).map(function (c) {
      return c instanceof Object ? c : createTextElement(c);
    });
    return { type: type, props: props };
  }

  function createTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value });
  }
  //#endregion
  //#region dom-utils.js
  var isEvent = function isEvent(name) {
    return name.startsWith("on");
  };
  var isAttribute = function isAttribute(name) {
    return !isEvent(name) && name != "children" && name != "style";
  };
  var isNew = function isNew(prev, next) {
    return function (key) {
      return prev[key] !== next[key];
    };
  };
  var isGone = function isGone(prev, next) {
    return function (key) {
      return !(key in next);
    };
  };

  function updateDomProperties(dom, prevProps, nextProps) {
    // Remove event listeners
    Object.keys(prevProps).filter(isEvent).filter(function (key) {
      return !(key in nextProps) || isNew(prevProps, nextProps)(key);
    }).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

    // Remove attributes
    Object.keys(prevProps).filter(isAttribute).filter(isGone(prevProps, nextProps)).forEach(function (name) {
      dom[name] = null;
    });

    // Set attributes
    Object.keys(nextProps).filter(isAttribute).filter(isNew(prevProps, nextProps)).forEach(function (name) {
      dom[name] = nextProps[name];
    });

    // Set style
    prevProps.style = prevProps.style || {};
    nextProps.style = nextProps.style || {};
    Object.keys(nextProps.style).filter(isNew(prevProps.style, nextProps.style)).forEach(function (key) {
      dom.style[key] = nextProps.style[key];
    });
    Object.keys(prevProps.style).filter(isGone(prevProps.style, nextProps.style)).forEach(function (key) {
      dom.style[key] = "";
    });

    // Add event listeners
    Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
  }

  function createDomElement(fiber) {
    var isTextElement = fiber.type === TEXT_ELEMENT;
    var dom = isTextElement ? document.createTextNode("") : document.createElement(fiber.type);
    updateDomProperties(dom, [], fiber.props);
    return dom;
  }
  //#endregion
  //#region component.js

  var Component = function () {
    function Component(props) {
      _classCallCheck(this, Component);

      this.props = props || {};
      this.state = this.state || {};
    }

    _createClass(Component, [{
      key: "setState",
      value: function setState(partialState) {
        scheduleUpdate(this, partialState);
      }
    }]);

    return Component;
  }();

  function createInstance(fiber) {
    var instance = new fiber.type(fiber.props);
    instance.__fiber = fiber;
    return instance;
  }
  //#endregion
  //#region reconciler.js
  // Fiber tags
  var HOST_COMPONENT = "host";
  var CLASS_COMPONENT = "class";
  var HOST_ROOT = "root";

  // Effect tags
  var PLACEMENT = "PLACEMENT";
  var DELETION = "DELETION";
  var UPDATE = "UPDATE";

  var ENOUGH_TIME = 1;

  // Global state
  var updateQueue = [];
  var nextUnitOfWork = null;
  var pendingCommit = null;

  function render(elements, containerDom) {
    updateQueue.push({
      from: HOST_ROOT,
      dom: containerDom,
      newProps: { children: elements }
    });
    requestIdleCallback(performWork);
  }

  function scheduleUpdate(instance, partialState) {
    updateQueue.push({
      from: CLASS_COMPONENT,
      instance: instance,
      partialState: partialState
    });
    requestIdleCallback(performWork);
  }

  function performWork(deadline) {
    workLoop(deadline);
    if (nextUnitOfWork || updateQueue.length > 0) {
      console.log("New work to do after work loop");
      requestIdleCallback(performWork);
    }
  }

  function workLoop(deadline) {
    console.group("Perfoming work");
    if (!nextUnitOfWork) {
      resetNextUnitOfWork();
    }
    while (nextUnitOfWork) {
      console.groupCollapsed("Next unit of work " + nextUnitOfWork.tag);
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      console.groupEnd();
    }
    if (pendingCommit) {
      console.groupCollapsed("Commit all work on " + pendingCommit.tag);
      commitAllWork(pendingCommit);
      console.groupEnd();
    }
    console.groupEnd();
  }

  function resetNextUnitOfWork() {
    var update = updateQueue.shift();
    if (!update) {
      return;
    }

    // Copy the setState parameter from the update payload to the corresponding fiber
    if (update.partialState) {
      update.instance.__fiber.partialState = update.partialState;
    }

    var root = update.from == HOST_ROOT ? update.dom._rootContainerFiber : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
      tag: HOST_ROOT,
      stateNode: update.dom || root.stateNode,
      props: update.newProps || root.props,
      alternate: root
    };
  }

  function getRoot(fiber) {
    console.groupCollapsed("Getting to root");
    var node = fiber;
    while (node.parent) {
      console.log(node);
      node = node.parent;
    }
    console.log(node);
    console.groupEnd();
    return node;
  }

  function performUnitOfWork(wipFiber) {
    console.groupCollapsed("Perfoming unit of work " + wipFiber.tag);
    beginWork(wipFiber);
    if (wipFiber.child) {
      console.log("It has child, returning his child");
      console.groupEnd();
      return wipFiber.child;
    }

    console.log("It does not have a child, looking for sibiling");
    // No child, we call completeWork until we find a sibling
    var uow = wipFiber;
    while (uow) {
      completeWork(uow);
      if (uow.sibling) {
        // Sibling needs to beginWork
        console.log("Sibling found, returning to perfom unit of work on him");
        console.groupEnd();
        return uow.sibling;
      }
      uow = uow.parent;
    }

    return null;
  }

  function beginWork(wipFiber) {
    if (wipFiber.tag == CLASS_COMPONENT) {
      updateClassComponent(wipFiber);
    } else {
      updateHostComponent(wipFiber);
    }
  }

  function updateHostComponent(wipFiber) {
    if (!wipFiber.stateNode) {
      wipFiber.stateNode = createDomElement(wipFiber);
    }

    var newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
  }

  function updateClassComponent(wipFiber) {
    var instance = wipFiber.stateNode;
    if (instance == null) {
      // Call class constructor
      instance = wipFiber.stateNode = createInstance(wipFiber);
    } else if (wipFiber.props == instance.props && !wipFiber.partialState) {
      // No need to render, clone children from last time
      console.log("Cloning fibers");
      cloneChildFibers(wipFiber);
      return;
    }

    instance.props = wipFiber.props;
    instance.state = Object.assign({}, instance.state, wipFiber.partialState);
    wipFiber.partialState = null;

    var newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
  }

  function arrify(val) {
    return val == null ? [] : Array.isArray(val) ? val : [val];
  }

  function reconcileChildrenArray(wipFiber, newChildElements) {
    console.groupCollapsed("Reconcile children of ", wipFiber.tag);
    var elements = arrify(newChildElements);

    var index = 0;
    var oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    var newFiber = null;
    while (index < elements.length || oldFiber != null) {
      var prevFiber = newFiber;
      var element = index < elements.length && elements[index];
      var sameType = oldFiber && element && element.type == oldFiber.type;

      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          tag: oldFiber.tag,
          stateNode: oldFiber.stateNode,
          props: element.props,
          parent: wipFiber,
          alternate: oldFiber,
          partialState: oldFiber.partialState,
          effectTag: UPDATE
        };
      }

      if (element && !sameType) {
        newFiber = {
          type: element.type,
          tag: typeof element.type === "string" ? HOST_COMPONENT : CLASS_COMPONENT,
          props: element.props,
          parent: wipFiber,
          effectTag: PLACEMENT
        };
      }

      if (oldFiber && !sameType) {
        oldFiber.effectTag = DELETION;
        wipFiber.effects = wipFiber.effects || [];
        wipFiber.effects.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index == 0) {
        wipFiber.child = newFiber;
      } else if (prevFiber && element) {
        prevFiber.sibling = newFiber;
      }
      console.log(newFiber);

      index++;
    }
    console.groupEnd();
  }

  function cloneChildFibers(parentFiber) {
    var oldFiber = parentFiber.alternate;
    if (!oldFiber.child) {
      return;
    }

    var oldChild = oldFiber.child;
    var prevChild = null;
    while (oldChild) {
      var newChild = {
        type: oldChild.type,
        tag: oldChild.tag,
        stateNode: oldChild.stateNode,
        props: oldChild.props,
        partialState: oldChild.partialState,
        alternate: oldChild,
        parent: parentFiber
      };
      if (prevChild) {
        prevChild.sibling = newChild;
      } else {
        parentFiber.child = newChild;
      }
      prevChild = newChild;
      oldChild = oldChild.sibling;
    }
  }

  function completeWork(fiber) {
    console.groupCollapsed("Completing work on " + fiber.tag);
    if (fiber.tag == CLASS_COMPONENT) {
      fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
      console.log("Fiber has a parent, passing effects to it's parent");
      var childEffects = fiber.effects || [];
      var thisEffect = fiber.effectTag != null ? [fiber] : [];
      var parentEffects = fiber.parent.effects || [];
      fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
      console.groupCollapsed("Effects");
      fiber.parent.effects.forEach(console.log);
      console.groupEnd();
    } else {
      console.log("Fiber is root, ready to commit");
      pendingCommit = fiber;
    }
    console.groupEnd();
  }

  function commitAllWork(fiber) {
    fiber.effects.forEach(function (f) {
      commitWork(f);
    });
    fiber.stateNode._rootContainerFiber = fiber;
    nextUnitOfWork = null;
    pendingCommit = null;
  }

  function commitWork(fiber) {
    if (fiber.tag == HOST_ROOT) {
      return;
    }

    var domParentFiber = fiber.parent;
    while (domParentFiber.tag == CLASS_COMPONENT) {
      domParentFiber = domParentFiber.parent;
    }
    var domParent = domParentFiber.stateNode;

    if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
      domParent.appendChild(fiber.stateNode);
    } else if (fiber.effectTag == UPDATE) {
      updateDomProperties(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag == DELETION) {
      commitDeletion(fiber, domParent);
    }
  }

  function commitDeletion(fiber, domParent) {
    var node = fiber;
    while (true) {
      if (node.tag == CLASS_COMPONENT) {
        node = node.child;
        continue;
      }
      domParent.removeChild(node.stateNode);
      while (node != fiber && !node.sibling) {
        node = node.parent;
      }
      if (node == fiber) {
        return;
      }
      node = node.sibling;
    }
  }
  //#endregion
  return {
    createElement: createElement,
    render: render,
    Component: Component
  };
}
},{}],31:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58794' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[31,3])
//# sourceMappingURL=/didact.5612cb9a.map