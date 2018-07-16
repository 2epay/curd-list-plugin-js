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
    this.pluginName = 'curd-list';
    this.plugin = this.d.querySelector('[data-' + this.pluginName + ']');

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
    this.addEventRemoveForItems();
    // this.addEventEditForItems();
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
    var showListEle = this.plugin.querySelector('[data-showlist]');
    showListEle.innerHTML = '';
    if ( store !== null ) {
      for( var k in store ) {
        if ( store.hasOwnProperty(k) ) {
          showListEle.appendChild(this.createLiEle(store ,k));
        }
      }
    }
  }

  CurdList.prototype.createLiEle = function(store ,id) {
    var liEle = this.d.createElement('li');
    liEle.innerHTML = store[id].name;
    liEle.setAttribute('data-id', id);
    var btnEle = this.d.createElement('button');
        btnEle.innerHTML = "delete";  
        btnEle.setAttribute('name', "Delete");
    var btnCancelEle = this.d.createElement('button');
        btnCancelEle.innerHTML = "Edit";
        btnCancelEle.setAttribute('name', "Edit");
    liEle.appendChild(btnEle);
    liEle.appendChild(btnCancelEle);
    return liEle;
  }

  CurdList.prototype.getLastItemId = function(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length-1];
  }

  CurdList.prototype.addItem = function () {
    var that = this;
    var addButton = document.querySelector('[data-add-action]');
    
    addButton.addEventListener("click", function () {
      var newStore = {};
      var oldStore = that.getStore('devlist');
      var devName = that.d.querySelector('[data-name]').value;
      if ( devName.length === 0 ) return false; 
      // var randomId = Math.random().toString().substr(2);
      if ( oldStore === null ) {
        newStore = {"1": {"name": devName}};
      } else {
        // var objLength = Object.keys(oldStore).length;
        newStore = oldStore;
        var getLastItemId = that.getLastItemId(newStore);
        newStore[parseInt(getLastItemId) + 1] = {"name": devName};
      }
      localStorage.setItem("devlist", JSON.stringify(newStore));
      document.querySelector('[data-name]').value = "";
      // 
      that.updateShowList();
    });
  }

  CurdList.prototype.addEventRemoveForItems = function () {
    var that = this;

    this.d.addEventListener("mousedown", function (event) {
      let real_target = event.target;
      let container_target = that.getClosestTargetByAttrName(real_target, 'data-id');
      var store = that.getStore("devlist");

      if ( container_target !== null && real_target.getAttribute("name") === "Delete") {
        var id = container_target.getAttribute('data-id');
        delete store[id];
        that.setStore('devlist', JSON.stringify(store));
        that.updateShowList();
      }

      if ( container_target !== null && real_target.getAttribute("name") === "Edit" ) {
        container_target.innerHTML = "";
        var txtEditEle = that.d.createElement('input');
        var btnCancelEle = that.d.createElement('button');
        var btnSmEle = that.d.createElement('button');
        txtEditEle.setAttribute("data-editname", "");
        btnCancelEle.setAttribute("name", "btnCancelEle");
        btnSmEle.setAttribute("name", "btnSmEle");
        btnCancelEle.innerHTML = "Cancel";
        btnSmEle.innerHTML = "Submit";
        container_target.appendChild(txtEditEle);
        container_target.appendChild(btnSmEle);
        container_target.appendChild(btnCancelEle);
      }

      if (container_target !== null && real_target.getAttribute("name") === "btnCancelEle") {
        var id = container_target.getAttribute('data-id');
        container_target.innerHTML = that.createLiEle(store, id).innerHTML;
      }

      if (container_target !== null && real_target.getAttribute("name") === "btnSmEle") {
        var id = container_target.getAttribute('data-id');
        var newName = container_target.querySelector('[data-editname]').value;
        store[id].name = newName;
        that.setStore("devlist", JSON.stringify(store));
        container_target.innerHTML = that.createLiEle(store, id).innerHTML;
      }

    });
  }

  CurdList.prototype.removeAllItems = function () {
    var that = this;
    var removeAllButton = this.d.querySelector('[data-clear-all-action]');

    removeAllButton.addEventListener("click", function () {
      localStorage.clear();
      that.updateShowList();
    });
  }
  

  CurdList.prototype.getClosestTargetByAttrName = function (el, attrName) {
    while ( (el = el.parentElement) && !el.hasAttribute(attrName) );
    return el;
  }

  return CurdList;
}());

window.addEventListener('DOMContentLoaded', function () {
  new CurdList();
});