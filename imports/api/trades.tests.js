import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import sinon from 'sinon';
import chai from 'chai';
import ProductsDB from './products.js';
import {TradesDB} from './trades.js';
let idUser;
if (Meteor.isServer) {
    describe('Trades Client-Server Methods', () => {
    	beforeEach(() => {
            resetDatabase();
            let idMeteorUser = Accounts.createUser({
                email: "fakemail",
                password: "fakePass",
                profile: { name: "fakeUsername"}
              });
            sinon.stub(Meteor, 'userId');
            sinon.stub(Meteor, 'user');
            Meteor.user.returns({
                username: 'fakeUsername'
            });
            Meteor.userId.returns(idMeteorUser);

            idUser = Accounts.createUser({
                email: "someemail",
                password: "somepassword",
                profile: { name: "someusername"}
              });


        });

        afterEach(() => {
            Meteor.userId.restore();
            Meteor.user.restore();
            resetDatabase();
        });
        
        it('Can add a trade', () => {
            const idProd1 = Meteor.call('products.insert','fakename1','fake descriptio1n','fakeurl1');
            const idProd2 = Meteor.call('products.insert','fakename2','fake description2','fakeurl2');
            console.log("user new "+idUser+ " idProd1: "+idProd1+ " idProd2: "+idProd2);

            let offers_ids = [idProd1];
            let targets_ids = [idProd2];
            let money=0;
            
            Meteor.call('trades.insert','usernameTo', idUser,offers_ids,money,targets_ids, (error) => {
                if(error){
                    console.log("Hubo un error: ");
                    console.log(error);
                }
            });
            chai.assert.equal(TradesDB.find().fetch().length, 1);
        });

         it('Can remove a trade', () => {
            const idProd1 = Meteor.call('products.insert','fakename1','fake descriptio1n','fakeurl1');
            const idProd2 = Meteor.call('products.insert','fakename2','fake description2','fakeurl2');
            console.log("user new "+idUser+ " idProd1: "+idProd1+ " idProd2: "+idProd2);

            let offers_ids = [idProd1];
            let targets_ids = [idProd2];
            let money=0;
            const id = Meteor.call('trades.insert','usernameTo', idUser,offers_ids,money,targets_ids);
            Meteor.call('trades.remove', id);
            chai.assert.equal(TradesDB.find().fetch().length, 0);
        });

         it('Can accept the trade', () => {
            const idProd1 = Meteor.call('products.insert','fakename1','fake descriptio1n','fakeurl1');
            const idProd2 = Meteor.call('products.insert','fakename2','fake description2','fakeurl2');
            console.log("user new "+idUser+ " idProd1: "+idProd1+ " idProd2: "+idProd2);

            let offers_ids = [idProd1];
            let targets_ids = [idProd2];
            let money=0;
            const id = Meteor.call('trades.insert','usernameTo', idUser,offers_ids,money,targets_ids);
            Meteor.call('trades.changeState', id,'accepted');
            chai.assert.equal(TradesDB.find().fetch()[0].state,'accepted');
        });

         it('Can reject the trade', () => {
            const idProd1 = Meteor.call('products.insert','fakename1','fake descriptio1n','fakeurl1');
            const idProd2 = Meteor.call('products.insert','fakename2','fake description2','fakeurl2');
            console.log("user new "+idUser+ " idProd1: "+idProd1+ " idProd2: "+idProd2);

            let offers_ids = [idProd1];
            let targets_ids = [idProd2];
            let money=0;
            const id = Meteor.call('trades.insert','usernameTo', idUser,offers_ids,money,targets_ids);
            Meteor.call('trades.changeState', id,'rejected');
            chai.assert.equal(TradesDB.find().fetch()[0].state,'rejected');
        });


    });
}
