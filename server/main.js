import { Meteor } from 'meteor/meteor';
import { Inject } from "meteor/meteorhacks:inject-initial"

import '../imports/api/tasks.js';
import '../imports/api/trades.js';
import '../imports/api/products.js';
Meteor.startup(() => {
	//Sacado de https://forums.meteor.com/t/can-i-edit-html-tag-in-meteor/5867/6
	Inject.rawModHtml("addLanguage", function(html) {
    return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
  });
  // code to run on server at startup
});
