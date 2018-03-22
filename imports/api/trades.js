import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const TradesDB = new Mongo.Collection('trades');


if(Meteor.isServer){
  Meteor.publish('trades',function tradesPublication(){
    return TradesDB.find({});
  });
}