import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const ProductsDB = new Mongo.Collection( 'Products' );

if ( Meteor.isServer ) {
  ProductsDB._ensureIndex( { name: 1, description: 1, ownerName: 1} );
}

ProductsDB.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ProductsDB.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ProductsSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'The name of the product'
  },
  'description': {
    type: String,
    label: 'The description of the product'
  },
  'urlImage': {
    type: String,
    label: 'url of the image of the product'
  },
  'owner': {
    type: String,
    label: 'id of the user who created the product'
  },
  'ownerName': {
    type: String,
    label: 'name of the user who created the product'
  }

});

ProductsDB.attachSchema( ProductsSchema );