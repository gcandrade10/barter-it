import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProductsDB } from '../api/products.js';
 
export const TradesDB = new Mongo.Collection('trades');


if(Meteor.isServer){
  Meteor.publish('trades',function tradesPublication(){
    return TradesDB.find({});
  });
}

Meteor.methods({
  
  'trades.insert'(usernameTo,id_to,offers_ids,money,target_id) {
    check(id_to, String);
    check(offers_ids, Array);
    check(money, Number);
    // Make sure the user is logged in before inserting a task

    offers_products=[];
    for (let s of offers_ids) {
      offers_products.push(ProductsDB.findOne(s).name);
    } 
    target=ProductsDB.findOne(target_id).name;

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    TradesDB.insert({
      id_from:this.userId,
      offers_ids,
      offers_products,
      money,
      id_to,
      target_id,
      target,
      state:"pending",
      createdAt: new Date(),
      usernameFrom: Meteor.users.findOne(this.userId).username,
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

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    TradesDB.update(tradeId, { $set: { offers_ids: offers_ids } });
    TradesDB.update(tradeId, { $set: { offers_products: offers_products } });
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