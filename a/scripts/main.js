(function(){
  'use strict';
  window.App = window.App || {};
/****************************************
    Model/Collection
****************************************/
var PostModel = Backbone.Model.extend({
  idAttributes: 'objectId',
  defaults: {
    title: '',
    body: ''
  }
});

var PostsCollection = Backbone.Collection.extend({
  url: "https://api.parse.com/1/classes/blog",
  parse: function(response){
    return response.results;
  }
});

/****************************************
    Views
****************************************/
var PostView = Backbone.View.extend({
  el: '.js-post-form',
  initialize: function(){

  },
  events: {
    "submit": "sendPost"
  },
  sendPost: function(e){
    e.preventDefault();
    console.log('sendPost fired');
    var title = $('.js-post-title').val();
    var body = $('.js-post-body').val();
    this.collection.create({title: title, body: body});

  }
});

/*****************************************
    Router
******************************************/
var AppRouter = Backbone.Router.extend({
  routes: {
    "": 'index'
  },
  initialize: function(){
    this.postsCollection = new PostsCollection();
    this.postView = new PostView({collection: this.postsCollection});

    // this.post = new PostView({collection: this.postsCollection});
  },
  index: function(){
    
  }
});

$.ajaxSetup({
  headers: {
    "X-Parse-Application-Id": "Cg7ixMBSyHJ7SsGTqXxUkE27s6PwNevbovd1RaG1",
    "X-Parse-REST-API-Key": "JzKJm6qSleHdYUXIiAMetmC6ruZYHoqsiHrm4Z8y"
  }
}); 

/*********************************************
  Glue Code
  *******************************************/
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
  });

})();