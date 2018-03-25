import React, {Component} from 'react';
import classNames from 'classnames';
import "./modal.css";
export default class Modal extends Component
{
  renderFooter(){

    if(this.props.footer){
      return <div className="modal-footer">
      <button  onClick={this.props.onDeal}>{this.props.dealLabel}</button>
      <button  onClick={this.props.onReject}>{this.props.rejectLabel}</button>
      <button  onClick={this.props.onCounteroffer}>{this.props.counterofferLabel}</button>
      </div>
    }
    else{
      return ("");
    }
  }

  render() {
    var modalClassName = classNames({
      "modal": true,
      "show-modal": this.props.showModal
    });
    return <div className={modalClassName}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{this.props.title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </div>
  }
}