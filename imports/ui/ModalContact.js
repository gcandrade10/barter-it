import React, {Component} from 'react';
import "./modalContact.css";
import classNames from 'classnames';

export default class ModalContact extends Component
{
  render() {
    var modalClassName = classNames({
      "modal": true,
      "show-modal": this.props.showModal
    });
    return <div className={modalClassName}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Contact</h4>
            <button className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="modal-body justify-content-center">
            <h5>{this.props.name}</h5>
            <h5>{this.props.email}</h5>
            <h5>{this.props.phone}</h5>
          </div>
        </div>
      </div>
    </div>
  }
}