import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const TradesDB = new Mongo.Collection('trades');


if(Meteor.isServer){
  Meteor.publish('trades',function tradesPublication(){
    return TradesDB.find({});
  });
}

Meteor.methods({
  
  'trades.insert'(id_to,offers_ids,money,target_id) {
    check(id_to, String);
    check(offers_ids, Array);
    check(money, Number);
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    TradesDB.insert({
      id_from:this.userId,
      offers_ids,
      money,
      id_to,
      target_id,
      state:"pending",
      createdAt: new Date(),
      usernameFrom: Meteor.users.findOne(this.userId).username,
      usernameTo:Meteor.users.findOne(id_to).username,
    });
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