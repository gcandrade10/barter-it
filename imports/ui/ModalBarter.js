import React, {Component} from 'react';
import classNames from 'classnames';
import "./modalBarter.css";
export default class ModalBarter extends Component
{
  renderFooter(){
    if(this.props.responded)
    {
      return <div className="modal-footer">
      <button  onClick={this.props.onContact}>{this.props.contactLabel}</button>
      </div>
    }
    else if(this.props.footer){
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
                        <div className="container">
              <div className="row">
                <div className="col-2">
                  Otro
                </div>
              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                  Quiere:
                </div>
                <div className="col-2">
                  target
                </div>
              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                  Ofrece:
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                Productos:
                <div className="container">
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col-2">
                      Producto1
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col-2">
                      Producto1
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-2">Dinero:</div>
                <div className="col-1">$0</div>
              </div>
            </div>
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </div>
  }
}