import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import sinon from 'sinon';
import chai from 'chai';
import ProductsDB from './products.js';

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
                    const idProd=product[0]._id
                    console.log("id Prod "+idProd);
                    console.log("owner "+product[0].owner);
                    Meteor.call('products.remove', idProd,(error, product) => {
                    if(error){
                        console.log("Hubo un error: ");
                        console.log(error);
                    }
                    chai.assert.equal(product.length, 0);
                });
                });

            });
        });

    });
}
