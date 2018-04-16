import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProductsDB } from '../api/products.js';
 
export const TradesDB = new Mongo.Collection('trades');


if(Meteor.isServer){
  Meteor.publish('trades',function tradesPublication(){
    return TradesDB.find({});
  });
  Meteor.publish('users',function usersPublication(){
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
    name: 'trades.insert',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'trades.update',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'trades.changeState',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'trades.remove',
    connectionId () {
      return true
    },
    numRequests: 1,
    timeInterval: 1000
  });
}

Meteor.methods({
  
  'trades.insert'(usernameTo,id_to,offers_ids,money,targets_ids) {
    check(id_to, String);
    check(offers_ids, Array);
    check(money, Number);
    // Make sure the user is logged in before inserting a task

    offers_products=[];
    for (let s of offers_ids) {
      offers_products.push(ProductsDB.findOne(s).name);
    }

    targets=[];
    for (let s of targets_ids) {
      targets.push(ProductsDB.findOne(s).name);
    } 

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    return TradesDB.insert({
      id_from:Meteor.userId(),
      offers_ids,
      offers_products,
      money,
      id_to,
      targets_ids,
      targets,
      state:"pending",
      createdAt: new Date(),
      usernameFrom: Meteor.users.findOne(Meteor.userId()).profile.name,
      usernameTo,
    });
  },

  'trades.update'(tradeId,offers_ids,money) {
    check(offers_ids, Array);
    check(money, Number);
    // Make sure the user is logged in before inserting a task

    offers_products=[];
    for (let s of offers_ids) {
      offers_products.push(ProductsDB.findOne(s).name);
    }


    old=TradesDB.findOne(tradeId);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    TradesDB.update(tradeId, { $set: { targets_ids: offers_ids } });
    TradesDB.update(tradeId, { $set: { targets: offers_products } });
    TradesDB.update(tradeId, { $set: { offers_ids: old.targets_ids } });
    TradesDB.update(tradeId, { $set: { offers_products: old.targets } });
    TradesDB.update(tradeId, { $set: { money: money } });
    TradesDB.update(tradeId, { $set: { id_from: old.id_to } });
    TradesDB.update(tradeId, { $set: { id_to: old.id_from } });
    TradesDB.update(tradeId, { $set: { usernameFrom: old.usernameTo } });
    TradesDB.update(tradeId, { $set: { usernameTo: old.usernameFrom } });
    TradesDB.update(tradeId, { $set: { counter: true } });
  },
  
  'trades.changeState'(tradeId, state) {
    check(tradeId, String);
    check(state, String);
 
    TradesDB.update(tradeId, { $set: { state: state } });
    TradesDB.update(tradeId, { $set: { responded: true } });
  },
  'trades.remove'(tradeId){
    check(tradeId,String);
    TradesDB.remove(tradeId);
  }
});