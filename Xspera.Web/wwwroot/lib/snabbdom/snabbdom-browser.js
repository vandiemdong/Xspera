var snabbdom = (function (exports,eventemitter2) {
  'use strict';

  function vnode(sel, data, children, text, elm) {
      var key = data === undefined ? undefined : data.key;
      return {
          sel: sel,
          data: data,
          children: children,
          text: text,
          elm: elm,
          key: key,
      };
  }

  var array = Array.isArray;
  function primitive(s) {
      return typeof s === 'string' || typeof s === 'number';
  }

  function createElement(tagName) {
      return document.createElement(tagName);
  }
  function createElementNS(namespaceURI, qualifiedName) {
      return document.createElementNS(namespaceURI, qualifiedName);
  }
  function createTextNode(text) {
      return document.createTextNode(text);
  }
  function createComment(text) {
      return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode;
  }
  function nextSibling(node) {
      return node.nextSibling;
  }
  function tagName(elm) {
      return elm.tagName;
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function getTextContent(node) {
      return node.textContent;
  }
  function isElement(node) {
      return node.nodeType === 1;
  }
  function isText(node) {
      return node.nodeType === 3;
  }
  function isComment(node) {
      return node.nodeType === 8;
  }
  var htmlDomApi = {
      createElement: createElement,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      getTextContent: getTextContent,
      isElement: isElement,
      isText: isText,
      isComment: isComment,
  };

  function addNS(data, children, sel) {
      data.ns = 'http://www.w3.org/2000/svg';
      if (sel !== 'foreignObject' && children !== undefined) {
          for (var i = 0; i < children.length; ++i) {
              var childData = children[i].data;
              if (childData !== undefined) {
                  addNS(childData, children[i].children, children[i].sel);
              }
          }
      }
  }
  function h(sel, b, c) {
      var data = {};
      var children;
      var text;
      var i;
      if (c !== undefined) {
          data = b;
          if (array(c)) {
              children = c;
          }
          else if (primitive(c)) {
              text = c;
          }
          else if (c && c.sel) {
              children = [c];
          }
      }
      else if (b !== undefined) {
          if (array(b)) {
              children = b;
          }
          else if (primitive(b)) {
              text = b;
          }
          else if (b && b.sel) {
              children = [b];
          }
          else {
              data = b;
          }
      }
      if (children !== undefined) {
          for (i = 0; i < children.length; ++i) {
              if (primitive(children[i]))
                  children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
          }
      }
      if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
          addNS(data, children, sel);
      }
      return vnode(sel, data, children, text, undefined);
  }

  function isUndef(s) {
      return s === undefined;
  }
  function isDef(s) {
      return s !== undefined;
  }
  var emptyNode = vnode('', {}, [], undefined, undefined);
  function sameVnode(vnode1, vnode2) {
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }
  function isVnode(vnode$$1) {
      return vnode$$1.sel !== undefined;
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i;
      var map = {};
      var key;
      var ch;
      for (i = beginIdx; i <= endIdx; ++i) {
          ch = children[i];
          if (ch != null) {
              key = ch.key;
              if (key !== undefined)
                  map[key] = i;
          }
      }
      return map;
  }
  var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
  function init$1(modules, domApi) {
      var i;
      var j;
      var cbs = {};
      var api = domApi !== undefined ? domApi : htmlDomApi;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              var hook = modules[j][hooks[i]];
              if (hook !== undefined) {
                  cbs[hooks[i]].push(hook);
              }
          }
      }
      function emptyNodeAt(elm) {
          var id = elm.id ? "#" + elm.id : '';
          var c = elm.className ? "." + elm.className.split(' ').join('.') : '';
          return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }
      function createRmCb(childElm, listeners) {
          return function rmCb() {
              if (--listeners === 0) {
                  var parent_1 = api.parentNode(childElm);
                  api.removeChild(parent_1, childElm);
              }
          };
      }
      function createElm(vnode$$1, insertedVnodeQueue) {
          var i;
          var data = vnode$$1.data;
          if (data !== undefined) {
              if (isDef((i = data.hook)) && isDef((i = i.init))) {
                  i(vnode$$1);
                  data = vnode$$1.data;
              }
          }
          var children = vnode$$1.children;
          var sel = vnode$$1.sel;
          if (sel === '!') {
              if (isUndef(vnode$$1.text)) {
                  vnode$$1.text = '';
              }
              vnode$$1.elm = api.createComment(vnode$$1.text);
          }
          else if (sel !== undefined) {
              // Parse selector
              var hashIdx = sel.indexOf('#');
              var dotIdx = sel.indexOf('.', hashIdx);
              var hash = hashIdx > 0 ? hashIdx : sel.length;
              var dot = dotIdx > 0 ? dotIdx : sel.length;
              var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
              var elm = (vnode$$1.elm = isDef(data) && isDef((i = data.ns)) ? api.createElementNS(i, tag) : api.createElement(tag));
              if (hash < dot)
                  elm.setAttribute('id', sel.slice(hash + 1, dot));
              if (dotIdx > 0)
                  elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
              for (i = 0; i < cbs.create.length; ++i)
                  cbs.create[i](emptyNode, vnode$$1);
              if (array(children)) {
                  for (i = 0; i < children.length; ++i) {
                      var ch = children[i];
                      if (ch != null) {
                          api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                      }
                  }
              }
              else if (primitive(vnode$$1.text)) {
                  api.appendChild(elm, api.createTextNode(vnode$$1.text));
              }
              i = vnode$$1.data.hook; // Reuse variable
              if (isDef(i)) {
                  if (i.create)
                      i.create(emptyNode, vnode$$1);
                  if (i.insert)
                      insertedVnodeQueue.push(vnode$$1);
              }
          }
          else {
              vnode$$1.elm = api.createTextNode(vnode$$1.text);
          }
          return vnode$$1.elm;
      }
      function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              var ch = vnodes[startIdx];
              if (ch != null) {
                  api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
              }
          }
      }
      function invokeDestroyHook(vnode$$1) {
          var i;
          var j;
          var data = vnode$$1.data;
          if (data !== undefined) {
              if (isDef((i = data.hook)) && isDef((i = i.destroy)))
                  i(vnode$$1);
              for (i = 0; i < cbs.destroy.length; ++i)
                  cbs.destroy[i](vnode$$1);
              if (vnode$$1.children !== undefined) {
                  for (j = 0; j < vnode$$1.children.length; ++j) {
                      i = vnode$$1.children[j];
                      if (i != null && typeof i !== 'string') {
                          invokeDestroyHook(i);
                      }
                  }
              }
          }
      }
      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
              var i_1 = void 0;
              var listeners = void 0;
              var rm = void 0;
              var ch = vnodes[startIdx];
              if (ch != null) {
                  if (isDef(ch.sel)) {
                      invokeDestroyHook(ch);
                      listeners = cbs.remove.length + 1;
                      rm = createRmCb(ch.elm, listeners);
                      for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                          cbs.remove[i_1](ch, rm);
                      if (isDef((i_1 = ch.data)) && isDef((i_1 = i_1.hook)) && isDef((i_1 = i_1.remove))) {
                          i_1(ch, rm);
                      }
                      else {
                          rm();
                      }
                  }
                  else {
                      // Text node
                      api.removeChild(parentElm, ch.elm);
                  }
              }
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx;
          var idxInOld;
          var elmToMove;
          var before;
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (oldStartVnode == null) {
                  oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
              }
              else if (oldEndVnode == null) {
                  oldEndVnode = oldCh[--oldEndIdx];
              }
              else if (newStartVnode == null) {
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (newEndVnode == null) {
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newEndVnode)) {
                  // Vnode moved right
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) {
                  // Vnode moved left
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                  api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else {
                  if (oldKeyToIdx === undefined) {
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  }
                  idxInOld = oldKeyToIdx[newStartVnode.key];
                  if (isUndef(idxInOld)) {
                      // New element
                      api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                      newStartVnode = newCh[++newStartIdx];
                  }
                  else {
                      elmToMove = oldCh[idxInOld];
                      if (elmToMove.sel !== newStartVnode.sel) {
                          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                      }
                      else {
                          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                          oldCh[idxInOld] = undefined;
                          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                      }
                      newStartVnode = newCh[++newStartIdx];
                  }
              }
          }
          if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
              if (oldStartIdx > oldEndIdx) {
                  before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                  addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
              }
              else {
                  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
              }
          }
      }
      function patchVnode(oldVnode, vnode$$1, insertedVnodeQueue) {
          var i;
          var hook;
          if (isDef((i = vnode$$1.data)) && isDef((hook = i.hook)) && isDef((i = hook.prepatch))) {
              i(oldVnode, vnode$$1);
          }
          var elm = (vnode$$1.elm = oldVnode.elm);
          var oldCh = oldVnode.children;
          var ch = vnode$$1.children;
          if (oldVnode === vnode$$1)
              return;
          if (vnode$$1.data !== undefined) {
              for (i = 0; i < cbs.update.length; ++i)
                  cbs.update[i](oldVnode, vnode$$1);
              i = vnode$$1.data.hook;
              if (isDef(i) && isDef((i = i.update)))
                  i(oldVnode, vnode$$1);
          }
          if (isUndef(vnode$$1.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch)
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue);
              }
              else if (isDef(ch)) {
                  if (isDef(oldVnode.text))
                      api.setTextContent(elm, '');
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  api.setTextContent(elm, '');
              }
          }
          else if (oldVnode.text !== vnode$$1.text) {
              api.setTextContent(elm, vnode$$1.text);
          }
          if (isDef(hook) && isDef((i = hook.postpatch))) {
              i(oldVnode, vnode$$1);
          }
      }
      return function patch(oldVnode, vnode$$1) {
          var i;
          var elm;
          var parent;
          var insertedVnodeQueue = [];
          for (i = 0; i < cbs.pre.length; ++i)
              cbs.pre[i]();
          if (!isVnode(oldVnode)) {
              oldVnode = emptyNodeAt(oldVnode);
          }
          if (sameVnode(oldVnode, vnode$$1)) {
              patchVnode(oldVnode, vnode$$1, insertedVnodeQueue);
          }
          else {
              elm = oldVnode.elm;
              parent = api.parentNode(elm);
              createElm(vnode$$1, insertedVnodeQueue);
              if (parent !== null) {
                  api.insertBefore(parent, vnode$$1.elm, api.nextSibling(elm));
                  removeVnodes(parent, [oldVnode], 0, 0);
              }
          }
          for (i = 0; i < insertedVnodeQueue.length; ++i) {
              insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
          for (i = 0; i < cbs.post.length; ++i)
              cbs.post[i]();
          return vnode$$1;
      };
  }

  function updateClass(oldVnode, vnode) {
      var cur;
      var name;
      var elm = vnode.elm;
      var oldClass = oldVnode.data.class;
      var klass = vnode.data.class;
      if (!oldClass && !klass)
          return;
      if (oldClass === klass)
          return;
      oldClass = oldClass || {};
      klass = klass || {};
      for (name in oldClass) {
          if (!klass[name]) {
              elm.classList.remove(name);
          }
      }
      for (name in klass) {
          cur = klass[name];
          if (cur !== oldClass[name]) {
              elm.classList[cur ? 'add' : 'remove'](name);
          }
      }
  }
  var classModule = { create: updateClass, update: updateClass };

  function updateProps(oldVnode, vnode) {
      var key;
      var cur;
      var old;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.props;
      var props = vnode.data.props;
      if (!oldProps && !props)
          return;
      if (oldProps === props)
          return;
      oldProps = oldProps || {};
      props = props || {};
      for (key in oldProps) {
          if (!props[key]) {
              delete elm[key];
          }
      }
      for (key in props) {
          cur = props[key];
          old = oldProps[key];
          if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
              elm[key] = cur;
          }
      }
  }
  var propsModule = { create: updateProps, update: updateProps };

  var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
  var nextFrame = function (fn) {
      raf(function () {
          raf(fn);
      });
  };
  function setNextFrame(obj, prop, val) {
      nextFrame(function () {
          obj[prop] = val;
      });
  }
  function updateStyle(oldVnode, vnode) {
      var cur;
      var name;
      var elm = vnode.elm;
      var oldStyle = oldVnode.data.style;
      var style = vnode.data.style;
      if (!oldStyle && !style)
          return;
      if (oldStyle === style)
          return;
      oldStyle = oldStyle || {};
      style = style || {};
      var oldHasDel = 'delayed' in oldStyle;
      for (name in oldStyle) {
          if (!style[name]) {
              if (name[0] === '-' && name[1] === '-') {
                  elm.style.removeProperty(name);
              }
              else {
                  elm.style[name] = '';
              }
          }
      }
      for (name in style) {
          cur = style[name];
          if (name === 'delayed' && style.delayed) {
              for (var name2 in style.delayed) {
                  cur = style.delayed[name2];
                  if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                      setNextFrame(elm.style, name2, cur);
                  }
              }
          }
          else if (name !== 'remove' && cur !== oldStyle[name]) {
              if (name[0] === '-' && name[1] === '-') {
                  elm.style.setProperty(name, cur);
              }
              else {
                  elm.style[name] = cur;
              }
          }
      }
  }
  function applyDestroyStyle(vnode) {
      var style;
      var name;
      var elm = vnode.elm;
      var s = vnode.data.style;
      if (!s || !(style = s.destroy))
          return;
      for (name in style) {
          elm.style[name] = style[name];
      }
  }
  function applyRemoveStyle(vnode, rm) {
      var s = vnode.data.style;
      if (!s || !s.remove) {
          rm();
          return;
      }
      var name;
      var elm = vnode.elm;
      var i = 0;
      var compStyle;
      var style = s.remove;
      var amount = 0;
      var applied = [];
      for (name in style) {
          applied.push(name);
          elm.style[name] = style[name];
      }
      compStyle = getComputedStyle(elm);
      var props = compStyle['transition-property'].split(', ');
      for (; i < props.length; ++i) {
          if (applied.indexOf(props[i]) !== -1)
              amount++;
      }
      elm.addEventListener('transitionend', function (ev) {
          if (ev.target === elm)
              --amount;
          if (amount === 0)
              rm();
      });
  }
  var styleModule = {
      create: updateStyle,
      update: updateStyle,
      destroy: applyDestroyStyle,
      remove: applyRemoveStyle,
  };

  function invokeHandler(handler, vnode, event) {
      if (typeof handler === 'function') {
          // call function handler
          handler.call(vnode, event, vnode);
      }
      else if (typeof handler === 'object') {
          // call handler with arguments
          if (typeof handler[0] === 'function') {
              // special case for single argument for performance
              if (handler.length === 2) {
                  handler[0].call(vnode, handler[1], event, vnode);
              }
              else {
                  var args = handler.slice(1);
                  args.push(event);
                  args.push(vnode);
                  handler[0].apply(vnode, args);
              }
          }
          else {
              // call multiple handlers
              for (var i = 0; i < handler.length; i++) {
                  invokeHandler(handler[i]);
              }
          }
      }
  }
  function handleEvent(event, vnode) {
      var name = event.type;
      var on = vnode.data.on;
      // call event handler(s) if exists
      if (on && on[name]) {
          invokeHandler(on[name], vnode, event);
      }
  }
  function createListener() {
      return function handler(event) {
          handleEvent(event, handler.vnode);
      };
  }
  function updateEventListeners(oldVnode, vnode) {
      var oldOn = oldVnode.data.on;
      var oldListener = oldVnode.listener;
      var oldElm = oldVnode.elm;
      var on = vnode && vnode.data.on;
      var elm = (vnode && vnode.elm);
      var name;
      // optimization for reused immutable handlers
      if (oldOn === on) {
          return;
      }
      // remove existing listeners which no longer used
      if (oldOn && oldListener) {
          // if element changed or deleted we remove all existing listeners unconditionally
          if (!on) {
              for (name in oldOn) {
                  // remove listener if element was changed or existing listeners removed
                  oldElm.removeEventListener(name, oldListener, false);
              }
          }
          else {
              for (name in oldOn) {
                  // remove listener if existing listener removed
                  if (!on[name]) {
                      oldElm.removeEventListener(name, oldListener, false);
                  }
              }
          }
      }
      // add new listeners which has not already attached
      if (on) {
          // reuse existing listener or create new
          var listener = (vnode.listener = oldVnode.listener || createListener());
          // update vnode for listener
          listener.vnode = vnode;
          // if element changed or added we add all needed listeners unconditionally
          if (!oldOn) {
              for (name in on) {
                  // add listener if element was changed or new listeners added
                  elm.addEventListener(name, listener, false);
              }
          }
          else {
              for (name in on) {
                  // add listener if new listener added
                  if (!oldOn[name]) {
                      elm.addEventListener(name, listener, false);
                  }
              }
          }
      }
  }
  var eventListenersModule = {
      create: updateEventListeners,
      update: updateEventListeners,
      destroy: updateEventListeners,
  };

  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var xmlNS = 'http://www.w3.org/XML/1998/namespace';
  var colonChar = 58;
  var xChar = 120;
  function updateAttrs(oldVnode, vnode) {
      var key;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs;
      var attrs = vnode.data.attrs;
      if (!oldAttrs && !attrs)
          return;
      if (oldAttrs === attrs)
          return;
      oldAttrs = oldAttrs || {};
      attrs = attrs || {};
      // update modified attributes, add new attributes
      for (key in attrs) {
          var cur = attrs[key];
          var old = oldAttrs[key];
          if (old !== cur) {
              if (cur === true) {
                  elm.setAttribute(key, '');
              }
              else if (cur === false) {
                  elm.removeAttribute(key);
              }
              else {
                  if (key.charCodeAt(0) !== xChar) {
                      elm.setAttribute(key, cur);
                  }
                  else if (key.charCodeAt(3) === colonChar) {
                      // Assume xml namespace
                      elm.setAttributeNS(xmlNS, key, cur);
                  }
                  else if (key.charCodeAt(5) === colonChar) {
                      // Assume xlink namespace
                      elm.setAttributeNS(xlinkNS, key, cur);
                  }
                  else {
                      elm.setAttribute(key, cur);
                  }
              }
          }
      }
      // remove removed attributes
      // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
      // the other option is to remove all attributes with value == undefined
      for (key in oldAttrs) {
          if (!(key in attrs)) {
              elm.removeAttribute(key);
          }
      }
  }
  var attributesModule = { create: updateAttrs, update: updateAttrs };

  function updateInnerHtml(oldVNode, vNode) {
      var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
      var _b = vNode.data, data = _b === void 0 ? {} : _b, elm = vNode.elm;
      var html = data.innerHtml || false;
      if (!html)
          return;
      if (html && oldData !== html) {
          elm.innerHTML = html;
      }
  }
  var innerHtmlModule = { update: updateInnerHtml, create: updateInnerHtml };

  function curry2(select) {
      return function selector(sel, vNode) {
          switch (arguments.length) {
              case 0:
                  return select;
              case 1:
                  return function (_vNode) { return select(sel, _vNode); };
              default:
                  return select(sel, vNode);
          }
      };
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  var IDENT = '[\\w-]+';
  var SPACE = '[ \t]*';
  var VALUE = '[^\\]]+';
  var CLASS = "(?:\\." + IDENT + ")";
  var ID = "(?:#" + IDENT + ")";
  var OP = '(?:=|\\$=|\\^=|\\*=|~=|\\|=)';
  var ATTR = "(?:\\[" + SPACE + IDENT + SPACE + "(?:" + OP + SPACE + VALUE + SPACE + ")?\\])";
  var SUBTREE = '(?:[ \t]+)';
  var CHILD = "(?:" + SPACE + "(>)" + SPACE + ")";
  var NEXT_SIBLING = "(?:" + SPACE + "(\\+)" + SPACE + ")";
  var SIBLING = "(?:" + SPACE + "(~)" + SPACE + ")";
  var COMBINATOR = "(?:" + SUBTREE + "|" + CHILD + "|" + NEXT_SIBLING + "|" + SIBLING + ")";
  var CONTAINS = 'contains\\("[^"]*"\\)';
  var FORMULA = '(?:even|odd|\\d*(?:-?n(?:\\+\\d+)?)?)';
  var NTH_CHILD = "nth-child\\(" + FORMULA + "\\)";
  var PSEUDO = ":(?:first-child|last-child|" + NTH_CHILD + "|empty|root|" + CONTAINS + ")";
  var TAG = "(:?" + IDENT + ")?";
  var TOKENS = CLASS + "|" + ID + "|" + ATTR + "|" + PSEUDO + "|" + COMBINATOR;
  var combinatorRegex = new RegExp("^" + COMBINATOR + "$");
  /**
   * Parses a css selector into a normalized object.
   * Expects a selector for a single element only, no `>` or the like!
   */
  function parseSelector(selector) {
      var sel = selector.trim();
      var tagRegex = new RegExp(TAG, 'y');
      var tag = tagRegex.exec(sel)[0];
      var regex = new RegExp(TOKENS, 'y');
      regex.lastIndex = tagRegex.lastIndex;
      var matches = [];
      var nextSelector = undefined;
      var lastCombinator = undefined;
      var index = -1;
      while (regex.lastIndex < sel.length) {
          var match = regex.exec(sel);
          if (!match && lastCombinator === undefined) {
              throw new Error('Parse error, invalid selector');
          }
          else if (match && combinatorRegex.test(match[0])) {
              var comb = combinatorRegex.exec(match[0])[0];
              lastCombinator = comb;
              index = regex.lastIndex;
          }
          else {
              if (lastCombinator !== undefined) {
                  nextSelector = [getCombinator(lastCombinator), parseSelector(sel.substring(index))];
                  break;
              }
              matches.push(match[0]);
          }
      }
      var classList = matches
          .filter(function (s) {
          return s.startsWith('.');
      })
          .map(function (s) {
          return s.substring(1);
      });
      var ids = matches
          .filter(function (s) {
          return s.startsWith('#');
      })
          .map(function (s) {
          return s.substring(1);
      });
      if (ids.length > 1) {
          throw new Error('Invalid selector, only one id is allowed');
      }
      var postprocessRegex = new RegExp("(" + IDENT + ")" + SPACE + "(" + OP + ")?" + SPACE + "(" + VALUE + ")?");
      var attrs = matches
          .filter(function (s) {
          return s.startsWith('[');
      })
          .map(function (s) {
          return postprocessRegex.exec(s).slice(1, 4);
      })
          .map(function (_a) {
          var attr = _a[0], op = _a[1], val = _a[2];
          var _b;
          return _b = {},
              _b[attr] = [getOp(op), val ? parseAttrValue(val) : val],
              _b;
      })
          .reduce(function (acc, curr) { return (__assign({}, acc, curr)); }, {});
      var pseudos = matches
          .filter(function (s) {
          return s.startsWith(':');
      })
          .map(function (s) {
          return postProcessPseudos(s.substring(1));
      });
      return {
          tag: tag,
          classList: classList,
          nextSelector: nextSelector,
          pseudos: pseudos,
          id: ids[0] || '',
          attributes: attrs,
      };
  }
  function parseAttrValue(v) {
      if (v.startsWith('"')) {
          return v.slice(1, -1);
      }
      if (v === 'true') {
          return true;
      }
      if (v === 'false') {
          return false;
      }
      return parseFloat(v);
  }
  function postProcessPseudos(sel) {
      if (sel === 'first-child' || sel === 'last-child' || sel === 'root' || sel === 'empty') {
          return [sel, undefined];
      }
      if (sel.startsWith('contains')) {
          var text = sel.slice(10, -2);
          return ['contains', text];
      }
      var content = sel.slice(10, -1);
      if (content === 'even') {
          content = '2n';
      }
      if (content === 'odd') {
          content = '2n+1';
      }
      return ['nth-child', content];
  }
  function getOp(op) {
      switch (op) {
          case '=':
              return 'exact';
          case '^=':
              return 'startsWith';
          case '$=':
              return 'endsWith';
          case '*=':
              return 'contains';
          case '~=':
              return 'whitespace';
          case '|=':
              return 'dash';
          default:
              return 'truthy';
      }
  }
  function getCombinator(comb) {
      switch (comb.trim()) {
          case '>':
              return 'child';
          case '+':
              return 'nextSibling';
          case '~':
              return 'sibling';
          default:
              return 'subtree';
      }
  }

  function createMatches(opts) {
      return function matches(selector, node) {
          var _a = typeof selector === 'object' ? selector : parseSelector(selector), tag = _a.tag, id = _a.id, classList = _a.classList, attributes = _a.attributes, nextSelector = _a.nextSelector, pseudos = _a.pseudos;
          if (nextSelector !== undefined) {
              throw new Error('matches can only process selectors that target a single element');
          }
          if (tag && tag.toLowerCase() !== opts.tag(node).toLowerCase()) {
              return false;
          }
          if (id && id !== opts.id(node)) {
              return false;
          }
          var classes = opts.className(node).split(' ');
          for (var i = 0; i < classList.length; i++) {
              if (classes.indexOf(classList[i]) === -1) {
                  return false;
              }
          }
          for (var key in attributes) {
              var attr = opts.attr(node, key);
              var t = attributes[key][0];
              var v = attributes[key][1];
              if (!attr) {
                  return false;
              }
              if (t === 'exact' && attr !== v) {
                  return false;
              }
              if (t !== 'exact') {
                  if (typeof v !== 'string') {
                      throw new Error('All non-string values have to be an exact match');
                  }
                  if (t === 'startsWith' && !attr.startsWith(v)) {
                      return false;
                  }
                  if (t === 'endsWith' && !attr.endsWith(v)) {
                      return false;
                  }
                  if (t === 'contains' && attr.indexOf(v) === -1) {
                      return false;
                  }
                  if (t === 'whitespace' && attr.split(' ').indexOf(v) === -1) {
                      return false;
                  }
                  if (t === 'dash' && attr.split('-').indexOf(v) === -1) {
                      return false;
                  }
              }
          }
          for (var i = 0; i < pseudos.length; i++) {
              var _b = pseudos[i], t = _b[0], data = _b[1];
              if (t === 'contains' && data !== opts.contents(node)) {
                  return false;
              }
              if (t === 'empty' && (opts.contents(node) || opts.children(node).length !== 0)) {
                  return false;
              }
              if (t === 'root' && opts.parent(node) !== undefined) {
                  return false;
              }
              if (t.indexOf('child') !== -1) {
                  if (!opts.parent(node)) {
                      return false;
                  }
                  var siblings = opts.children(opts.parent(node));
                  if (t === 'first-child' && siblings.indexOf(node) !== 0) {
                      return false;
                  }
                  if (t === 'last-child' && siblings.indexOf(node) !== siblings.length - 1) {
                      return false;
                  }
                  if (t === 'nth-child') {
                      var regex = /([\+-]?)(\d*)(n?)(\+\d+)?/;
                      var parseResult = regex.exec(data).slice(1);
                      var index = siblings.indexOf(node);
                      if (!parseResult[0]) {
                          parseResult[0] = '+';
                      }
                      var factor = parseResult[1] ? parseInt(parseResult[0] + parseResult[1], 10) : undefined;
                      var add = parseInt(parseResult[3] || '0', 10);
                      if (factor && parseResult[2] === 'n' && index % factor !== add) {
                          return false;
                      }
                      if (!factor && parseResult[2] && ((parseResult[0] === '+' && index - add < 0) || (parseResult[0] === '-' && index - add >= 0))) {
                          return false;
                      }
                      if (!parseResult[2] && factor && index !== factor - 1) {
                          return false;
                      }
                  }
              }
          }
          return true;
      };
  }

  function createQuerySelector(options, matches) {
      var _matches = matches || createMatches(options);
      function findSubtree(selector, depth, node) {
          var n = _matches(selector, node);
          var matched = n ? (typeof n === 'object' ? [n] : [node]) : [];
          if (depth === 0) {
              return matched;
          }
          var childMatched = options
              .children(node)
              .filter(function (c) {
              return typeof c !== 'string';
          })
              .map(function (c) {
              return findSubtree(selector, depth - 1, c);
          })
              .reduce(function (acc, curr) { return acc.concat(curr); }, []);
          return matched.concat(childMatched);
      }
      function findSibling(selector, next, node) {
          if (options.parent(node) === undefined) {
              return [];
          }
          var results = [];
          var siblings = options.children(options.parent(node));
          for (var i = siblings.indexOf(node) + 1; i < siblings.length; i++) {
              if (typeof siblings[i] === 'string') {
                  continue;
              }
              var n = _matches(selector, siblings[i]);
              if (n) {
                  if (typeof n === 'object') {
                      results.push(n);
                  }
                  else {
                      results.push(siblings[i]);
                  }
              }
              if (next) {
                  break;
              }
          }
          return results;
      }
      return function querySelector(selector, node) {
          var sel = typeof selector === 'object' ? selector : parseSelector(selector);
          var results = [node];
          var currentSelector = sel;
          var currentCombinator = 'subtree';
          var tail = undefined;
          var _loop_1 = function () {
              tail = currentSelector.nextSelector;
              currentSelector.nextSelector = undefined;
              if (currentCombinator === 'subtree' || currentCombinator === 'child') {
                  var depth_1 = currentCombinator === 'subtree' ? Infinity : 1;
                  var reduceFunc = function (acc, curr) {
                      return acc.concat(curr);
                  };
                  results = results
                      .map(function (n) {
                      return findSubtree(currentSelector, depth_1, n);
                  })
                      .reduce(reduceFunc, []);
              }
              else {
                  var next_1 = currentCombinator === 'nextSibling';
                  results = results
                      .map(function (n) {
                      return findSibling(currentSelector, next_1, n);
                  })
                      .reduce(function (acc, curr) { return acc.concat(curr); }, []);
              }
              if (tail) {
                  currentSelector = tail[1];
                  currentCombinator = tail[0];
              }
          };
          do {
              _loop_1();
          } while (tail !== undefined);
          return results;
      };
  }

  function selectorParser(node) {
      if (!node.sel) {
          return {
              tagName: '',
              id: '',
              className: '',
          };
      }
      var sel = node.sel;
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tagName = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      var id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
      var className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;
      return {
          tagName: tagName,
          id: id,
          className: className,
      };
  }

  function classNameFromVNode(vNode) {
      var _a = selectorParser(vNode).className, cn = _a === void 0 ? '' : _a;
      if (!vNode.data) {
          return cn;
      }
      var _b = vNode.data, dataClass = _b.class, props = _b.props;
      if (dataClass) {
          var c = Object.keys(dataClass).filter(function (cl) { return dataClass[cl]; });
          cn += " " + c.join(' ');
      }
      if (props && props.className) {
          cn += " " + props.className;
      }
      return cn && cn.trim();
  }

  var root;
  if (typeof self !== 'undefined') {
      root = self;
  }
  else if (typeof window !== 'undefined') {
      root = window;
  }
  else if (typeof global !== 'undefined') {
      root = global;
  }
  else {
      root = Function('return this')();
  }
  var Symbol$1 = root.Symbol;
  var parentSymbol;
  if (typeof Symbol$1 === 'function') {
      parentSymbol = Symbol$1('parent');
  }
  else {
      parentSymbol = '@@snabbdom-selector-parent';
  }
  var parentSymbol$1 = parentSymbol;

  var options = {
      tag: function (vNode) { return selectorParser(vNode).tagName; },
      className: function (vNode) { return classNameFromVNode(vNode); },
      id: function (vNode) { return selectorParser(vNode).id || ''; },
      children: function (vNode) { return vNode.children || []; },
      parent: function (vNode) { return vNode.data[parentSymbol$1] || vNode; },
      contents: function (vNode) { return vNode.text || ''; },
      attr: function (vNode, attr) {
          if (vNode.data) {
              var _a = vNode.data, _b = _a.attrs, attrs = _b === void 0 ? {} : _b, _c = _a.props, props = _c === void 0 ? {} : _c;
              if (attrs[attr]) {
                  return attrs[attr];
              }
              if (props[attr]) {
                  return props[attr];
              }
          }
      },
  };
  var matches = createMatches(options);
  function customMatches(sel, vnode) {
      var data = vnode.data;
      var selector = matches.bind(null, sel);
      if (data && data.fn) {
          var n = void 0;
          if (Array.isArray(data.args)) {
              n = data.fn.apply(null, data.args);
          }
          else if (data.args) {
              n = data.fn.call(null, data.args);
          }
          else {
              n = data.fn();
          }
          return selector(n) ? n : false;
      }
      return selector(vnode);
  }
  var querySelector = createQuerySelector(options, customMatches);

  function findMatches(cssSelector, vNode) {
      traverseVNode(vNode, addParent); // add mapping to the parent selectorParser
      return querySelector(cssSelector, vNode);
  }
  function traverseVNode(vNode, f) {
      function recurse(currentNode, isParent, parentVNode) {
          var length = (currentNode.children && currentNode.children.length) || 0;
          for (var i = 0; i < length; ++i) {
              var children = currentNode.children;
              if (children && children[i] && typeof children[i] !== 'string') {
                  var child = children[i];
                  recurse(child, false, currentNode);
              }
          }
          f(currentNode, isParent, isParent ? void 0 : parentVNode);
      }
      recurse(vNode, true);
  }
  function addParent(vNode, isParent, parent) {
      if (isParent) {
          return void 0;
      }
      if (!vNode.data) {
          vNode.data = {};
      }
      if (!vNode.data[parentSymbol$1]) {
          Object.defineProperty(vNode.data, parentSymbol$1, {
              value: parent,
          });
      }
  }

  var select = curry2(findMatches);

  var snabbmitt = 'snabbmitt';

  function copyRefs(vnode, nextvnode) {
      vnode.elm = nextvnode.elm;
      vnode.data = nextvnode.data;
      vnode.children = nextvnode.children;
      vnode.text = nextvnode.text;
      vnode.sel = nextvnode.sel;
  }

  var noop = function () { };
  var hooks$1 = ['pre', 'init', 'create', 'insert', 'prepatch', 'update', 'postpatch', 'destroy', 'remove', 'post'];
  function applyHook(vnode) {
      vnode.data.hook = vnode.data.hook || {};
      var componentHooks = {
          create: function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var vnode = args[args.length - 1];
              if (vnode.data[snabbmitt]) {
                  vnode.data[snabbmitt].cvnode.elm = vnode.elm;
              }
          },
          postpatch: function (oldVnode, vnode) {
              if (oldVnode.data[snabbmitt]) {
                  var rvnode = oldVnode.data[snabbmitt].rvnode;
                  copyRefs(rvnode, vnode);
                  vnode.data[snabbmitt] = oldVnode.data[snabbmitt];
              }
          },
      };
      var _loop_1 = function (hook) {
          if (!vnode.data.hook[hook] && !componentHooks[hook]) {
              return "continue";
          }
          var cb = vnode.data.hook[hook] || noop;
          var componentCb = componentHooks[hook] || noop;
          vnode.data.hook[hook] = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              componentCb.apply(void 0, args);
              cb.apply(void 0, args);
          };
      };
      for (var _i = 0, hooks_1 = hooks$1; _i < hooks_1.length; _i++) {
          var hook = hooks_1[_i];
          _loop_1(hook);
      }
      return vnode;
  }

  function createRenderer(patch, container) {
      var vnode = container;
      function render(_a) {
          var usePatch = _a.usePatch, view = _a.view, state = _a.state, props = _a.props, children = _a.children;
          if (usePatch && vnode && (vnode.elm || vnode.parentNode)) {
              vnode = patch(vnode, view({ state: state, props: props, children: children }));
          }
          else {
              vnode = view({ state: state, props: props, children: children });
          }
          return vnode;
      }
      return render;
  }

  function instanceComponent(patch, container, factory, userProps) {
      if (userProps === void 0) { userProps = {}; }
      var render = createRenderer(patch, container);
      var props = userProps;
      var children = [];
      var userView;
      var store;
      var emitter = new eventemitter2.EventEmitter2();
      emitter.on('render', function () {
          render({ usePatch: true, view: view, state: state, props: props, children: children });
      });
      var instance = factory({ emitter: emitter, props: props });
      if (typeof instance === 'function') {
          userView = instance;
      }
      else {
          userView = instance.view;
          store = instance.store;
      }
      var view = function (_a) {
          var state = _a.state, props = _a.props, children = _a.children;
          return applyHook(userView({ state: state, props: props, children: children }));
      };
      var state = typeof store === 'function' ? store() : {};
      if (typeof state !== 'object')
          throw new Error('Store function in your components should return an state object');
      return {
          render: function (_a) {
              var _b = _a.usePatch, usePatch = _b === void 0 ? false : _b, _c = _a.props, userProps = _c === void 0 ? {} : _c, _d = _a.children, userChildren = _d === void 0 ? [] : _d;
              props = userProps;
              children = userChildren;
              return render({ usePatch: usePatch, view: view, state: state, props: props, children: children });
          },
          state: state,
          props: props,
          emitter: emitter,
      };
  }

  function component(patch, factory, props, children) {
      if (props === void 0) { props = {}; }
      if (children === void 0) { children = []; }
      if (!factory.sel) {
          factory.sel = 'component';
      }
      return {
          sel: factory.sel,
          key: props.key,
          children: [],
          elm: null,
          text: '',
          data: {
              hook: {
                  init: function (vnode) {
                      var instance = instanceComponent(patch, null, factory, props);
                      var cvnode = instance.render({ props: props, children: children });
                      if (factory.sel === 'component') {
                          // from now we know the indentity of this type of components
                          factory.sel = cvnode.sel;
                      }
                      cvnode.data[snabbmitt] = {
                          instance: instance,
                          factory: factory,
                          cvnode: cvnode,
                          rvnode: vnode,
                      };
                      copyRefs(vnode, cvnode);
                  },
                  prepatch: function (oldVnode, vnode) {
                      var cvnode = oldVnode.data[snabbmitt].instance.render({ props: props, children: children });
                      cvnode.data[snabbmitt] = oldVnode.data[snabbmitt];
                      cvnode.data[snabbmitt].rvnode = vnode;
                      cvnode.elm = oldVnode.elm;
                      copyRefs(vnode, cvnode);
                  },
              },
          },
      };
  }

  var defaultPatch;
  function defineArgs(args) {
      var props = {};
      var children = [];
      if (args.length === 2) {
          props = args[0], children = args[1];
      }
      else if (args.length === 1) {
          if (Array.isArray(args[0])) {
              children = args[0];
          }
          else {
              props = args[0];
          }
      }
      return [props, children];
  }
  function snabbmitt$1() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var patch;
      if (typeof args[0] === 'function') {
          patch = args[0];
      }
      else if (args.length === 0 && defaultPatch) {
          patch = defaultPatch;
      }
      else {
          if (args.length === 0) {
              patch = init$1([]);
          }
          else {
              patch = init$1(args);
          }
      }
      if (!defaultPatch) {
          defaultPatch = patch;
      }
      return {
          run: function (container, factory, props) {
              if (props === void 0) { props = {}; }
              var instance = instanceComponent(patch, container, factory, props);
              return instance.render({ usePatch: true, props: props });
          },
          component: function (factory) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              return component.apply(void 0, [patch, factory].concat(defineArgs(args)));
          },
      };
  }
  function componentExport(factory) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
      }
      return component.apply(void 0, [defaultPatch, factory].concat(defineArgs(args)));
  }

  // import { h } from '../snabbdom-browser';
  var patch = init$1([classModule, propsModule, styleModule, eventListenersModule, attributesModule, innerHtmlModule]);

  exports.patch = patch;
  exports.select = select;
  exports.h = h;
  exports.component = componentExport;
  exports.mitt = snabbmitt$1;

  return exports;

}({},EventEmitter2));
