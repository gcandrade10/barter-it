import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
export default class Task extends Component{

	toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }
 
  deleteThisTask() {
     Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

	render(){
		const taskClassName = this.props.task.checked ? 'checked' : '';
		return (
      <li className={taskClassName}>
      {
      //Only allow to delete if its the owner
      }
      {
        this.props.showPrivateButton?(
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
          ):''
      }
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
 
        <span className="text">
        <strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
      </li>
    );
	}
}