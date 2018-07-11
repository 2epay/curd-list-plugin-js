var Greeter = (function () {
  'use strict';
  function Greeter(message) {
    this.greeting = message;
    this.d = window.document;
  }
  Greeter.prototype.greet = function () {
    return "Hello, " + this.greeting;
  };
  Greeter.prototype.showMsg = function () {
    this.d.querySelector('[data-message]').innerHTML = this.greeting;
  };
  return Greeter;
}());

// instance
window.addEventListener('DOMContentLoaded', function () {
  var wedding_greet = new Greeter('moi ban den an dam cuoi');
  wedding_greet.showMsg();
});
