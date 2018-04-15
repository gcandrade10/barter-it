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
	            console.log(product.length);
	            chai.assert.equal(product.length, 0);
            });
        });
    });
}
