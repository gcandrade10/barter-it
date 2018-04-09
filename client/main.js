import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/startup/accounts-config.js'
import AppContainer from '../imports/ui/AppContainer.js';
import { HashRouter  } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(()=>{
	render(
		(<HashRouter>
    		<AppContainer />
  		</HashRouter>),
		document.getElementById('render-target'			
			));
});
Accounts.config({
    forbidClientAccountCreation: true
});