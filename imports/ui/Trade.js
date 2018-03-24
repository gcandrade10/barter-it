import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

import Modal from './Modal.js';

export default class Trade extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			showModal:false
		};
	}

	toggleModal(){
  		this.setState({showModal: !this.state.showModal});
  	}


	render(){
		return( 
			<div>

			<Modal
			    showModal={this.state.showModal}
			    title="Confirm"
			    onCancel={this.toggleModal.bind(this)}
			    cancelLabel="Cancel"
			    onConfirm={this.deleteItem}
			    confirmLabel="Delete"
  				> 	
  				</Modal>
				
				<span>
					{JSON.stringify(this.props.date)}
				</span>
				<button type="button"  onClick={this.toggleModal.bind(this)}>detail</button>
			</div>
			);
	}
}
