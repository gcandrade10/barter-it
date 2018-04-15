import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const ProductsDB = new Mongo.Collection( 'Products');



if(Meteor.isServer){
  ProductsDB._ensureIndex({"name": "text","description":"text"});
}


if(Meteor.isServer){
  Meteor.publish( 'Products' ,function ProductsPublication(){
    return ProductsDB.find({});
  });
    Meteor.publish('allUsers',function usersPublication(){
    return Meteor.users.find({});
  });
}

if (Meteor.isServer) {
  DDPRateLimiter.setErrorMessage(({ timeToReset }) => {
    const time = Math.ceil(timeToReset / 1000)
    return 'Try again after ' + time + ' seconds.'
  })

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'products.insert',
    connectionId () {
      return true
    },
    numRequests: 5,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'products.remove',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'products.show',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'products.sell',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  })
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
      username: Meteor.users.findOne(this.userId).profile.name,
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
  },

  'products.sell'(productId) {
    const product = ProductsDB.findOne(productId);
    ProductsDB.update(productId, { $set: { active: false } });
  },

   
});