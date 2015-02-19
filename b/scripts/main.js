(function(){
	'use strict';
	window.App = window.App || {};

  var UserModel = Backbone.Model.extend({
  idAttributes: 'objectId',
    defaults: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',

  }
});

var UsersCollection = Backbone.Collection.extend({
  url: "https://api.parse.com/1/classes/Person",
  parse: function(response){
    return response.results;
  }
});
/*********************
    Views
************************/
var UserView = Backbone.View.extend({
  el: '.js-user-form',
  events: {
    "submit": "submitUser"
  },
  submitUser: function(e){
    e.preventDefault();
    var firstName = $('.js-first-name').val();
    var lastName = $('.js-last-name').val();
    var phone = $('.js-phone').val();
    var address = $('.js-address').val();
    this.collection.create({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address});
    console.log('submitUser fired');
  }

});


/*********************
    Router
    *******************/
var AppRouter = Backbone.Router.extend({
  defaults: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',

  },
  routes: {
    "": "index"
  },
  index: function(){
      this.usersCollection = new UsersCollection();
      this.userView = new UserView({collection: this.usersCollection})


  }
});

$.ajaxSetup({
  headers: {
    "X-Parse-Application-Id": "Cg7ixMBSyHJ7SsGTqXxUkE27s6PwNevbovd1RaG1",
    "X-Parse-REST-API-Key": "JzKJm6qSleHdYUXIiAMetmC6ruZYHoqsiHrm4Z8y"
  }
});

$(document).ready(function(){
	window.router = new AppRouter();
  Backbone.history.start();
	});

})();
