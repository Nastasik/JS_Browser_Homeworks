'use strict';

function createElement(node) {
    const element = document.createElement(node.name);
  
     if(node.props instanceof Object) {
       Object.keys(node.props).forEach(el => element.setAttribute(el, node.props[el]));
     } 
     if (typeof node.childs !== 'undefined') {
      (node.childs instanceof Array ? node.childs : [ node.childs ])
       node.childs.forEach(el => element.appendChild(el instanceof Node ? el : createElement(el)));
    }
     if (typeof node !== 'object') {
     return document.createTextNode(node);
     } 
    return element;
  }