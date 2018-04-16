import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import sinon from 'sinon';
import chai from 'chai';
import {ProductsDB} from './products.js';

if (Meteor.isServer) {
    describe('Products Client-Server Methods', () => {
    	beforeEach(() => {
            resetDatabase();
            sinon.stub(Meteor, 'userId');
            sinon.stub(Meteor, 'user');
            Meteor.user.returns({
                username: 'fakeUsername'
            });
            Meteor.userId.returns('12345');    
        });

        afterEach(() => {
            Meteor.userId.restore();
            Meteor.user.restore();
            resetDatabase();
        });

        it('Can get products', () => {
            Meteor.call('products.show', (error, product) => {
	            if(error){
	            	console.log("Hubo un error: ");
	            	console.log(error);
	            }
	            chai.assert.equal(product.length, 0);
            });
        });
        /*
        it('can remove',()=>{
            Meteor.call('products.remove', 'idProd',(error) => {
                if(error){
                        console.log("Hubo un error en can remove: ");
                        console.log(error);
                    }
            });

        });
        */
        it('Can add a product', () => {
            Meteor.call('products.insert','fakename','fake description','fakeurl' ,(error) => {
                if(error){
                    console.log("Hubo un error: ");
                    console.log(error);
                }
                Meteor.call('products.show', (error, product) => {
                    if(error){
                        console.log("Hubo un error: ");
                        console.log(error);
                    }
                    chai.assert.equal(product.length, 1);
                });

            });
        });

        it('Can remove a product', () => {
            const id = Meteor.call('products.insert','fakename','fake description','fakeurl');
            Meteor.call('products.remove', id);
            chai.assert.equal(ProductsDB.find().fetch().length, 0);
        });

        it('Can sell a product', () => {
            const id = Meteor.call('products.insert','fakename','fake description','fakeurl');
            Meteor.call('products.sell', id);
            Meteor.call('products.show', (error, product) => {
                if(error){
                    console.log("Hubo un error: ");
                    console.log(error);
                }
                chai.assert.equal(product[0].active, false);
            });
        });

    });
}
