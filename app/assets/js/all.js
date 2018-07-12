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
  }

/*
{
  "1": {"name": "Hau"},
  "2": {"name": "Thy"},
  "3": {"name": "Toan"}
}
*/

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
    });
  }

  return CurdList;
}());



// instance
window.addEventListener('DOMContentLoaded', function () {
  
  var add_name = new CurdList("hello word");
  add_name.addItem();
});
