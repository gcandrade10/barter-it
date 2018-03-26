import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const ProductsDB = new Mongo.Collection( 'Products');

if(Meteor.isServer){
  Meteor.publish( 'Products' ,function ProductsPublication(){
    return ProductsDB.find({});
  });
}

Meteor.methods({

   'products.insert'(name, description, urlImage) {
    check(name, String);
    check(description, String);
    check(urlImage, String);
 
    // Make sure the user is logged in before inserting a product
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    ProductsDB.insert({
      name,
      description,
      urlImage,
      active:true,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

   'products.remove'(productId) {
    check(productId, String);

    const product = ProductsDB.findOne(productId);
    //Only owner can delete his comment
    if(product.owner!==this.userId){
      throw new Meteor.Error('not-authorized');
    }
 
    ProductsDB.remove(productId);
  },

  'products.show'() {
    return ProductsDB.find({
      owner:this.userId,
    });
  }
   
});