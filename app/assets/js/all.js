// var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));


var CurdList = (function () {
  'use strict';
  function CurdList(message) {
    this.greeting = message;
    this.d = window.document;
    var originStore = '{"1": {"name": "Hau"},"2": {"name": "Thy"},"3": {"name": "Toan"}]';
    this.setStore("devlist", originStore);
    this.init();
  }

/*
{
  "1": {"name": "Hau"},
  "2": {"name": "Thy"},
  "3": {"name": "Toan"}
}
*/
  CurdList.prototype.init = function () {
    this.addItem();
    this.removeAllItems();
    this.addRemovingEventForItems();
  }


  CurdList.prototype.getStore = function (storeName) {
    var store = localStorage.getItem(storeName);
    try
    {
      store = JSON.parse(store);
    }
    catch(e)
    {
      store = null;
    }    
    return store;
  }

  CurdList.prototype.setStore = function (storeName, data) {
    localStorage.setItem(storeName, data);
  }

  CurdList.prototype.updateShowList = function () {
    var store = this.getStore('devlist');
    if ( store !== null ) {
      var showListEle = this.d.querySelector('[data-showlist]');
      showListEle.innerHTML = '';
      for( var k in store ) {
        if ( store.hasOwnProperty(k) ) {
          var liEle = this.d.createElement('li');
          liEle.innerHTML = store[k].name;
          liEle.setAttribute('data-id', k);
          var btnEle = this.d.createElement('button');
          btnEle.innerHTML = "delete";
          liEle.appendChild(btnEle);
          showListEle.appendChild(liEle);
        }
      }
    }
  }

  CurdList.prototype.addItem = function () {
    var that = this;
    var addButton = document.querySelector('[data-btn-add]');
    addButton.addEventListener("click", function () {
      var newStore = {};
      var oldStore = that.getStore('devlist');
      
      var devName = that.d.querySelector('[data-name]').value;
      if ( devName.length === 0 ) return false; 
      if ( oldStore === null ) {
        newStore = {"1": {"name": devName}};
      } else {
        var objLength = Object.keys(oldStore).length;
        newStore = oldStore;
        newStore[objLength + 1] = {"name": devName};
      }
      localStorage.setItem("devlist", JSON.stringify(newStore));
      document.querySelector('[data-name]').value = "";
      // 
      that.updateShowList();
    });

  }

  CurdList.prototype.removeAllItems = function () {
    var that = this;
    var removeAllButton = document.querySelector('[data-btn-clearAll]');
    removeAllButton.addEventListener("click", function () {
      localStorage.clear();
    });
  }
  
  CurdList.prototype.addRemovingEventForItems = function () {
    var that = this;
    var removeButton = document.querySelectorAll('[data-remove]');
    this.d.addEventListener("mousedown", function (event) {
      let real_target = event.target;
      let container_target = that.getClosestTargetByAttrName(real_target, 'data-id');
      
      if ( container_target !== null ) {
        console.log(container_target);
        
        var id = container_target.getAttribute('data-id');
        var store = that.getStore("devlist");
        delete store[id];
        that.setStore('devlist', JSON.stringify(store));
        that.updateShowList();
      }
    });

  }

  CurdList.prototype.getClosestTargetByAttrName = function (el, attrName) {
    while ( (el = el.parentElement) && !el.hasAttribute(attrName) );
    return el;
  }

  return CurdList;
}());

// instance
window.addEventListener('DOMContentLoaded', function () {
  var mangageList = new CurdList();
});
