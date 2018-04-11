import React, {Component} from 'react';
import classNames from 'classnames';
import "./modal.css";
export default class Modal extends Component
{

  renderProducts=()=>{
    return this.props.trade.offers_products.map((product)=>{
      return(
                <div className="row" key={product}>
                    <div className="col-3"></div>
                    <div className="col-4">
                      {product}
                    </div>
                  </div>
        );
    });
  }
  renderTargets=()=>{
    return this.props.trade.targets.map((product)=>{
      return(
                <div className="row" key={product}>
                    <div className="col-3"></div>
                    <div className="col-4">
                      {product}
                    </div>
                  </div>
        );
    });
  }
  renderFooter(){
    if(this.props.responded)
    {
      return <div className="modal-footer">
      <button  className="btn btn-primary" onClick={this.props.onContact}>{this.props.contactLabel}</button>
      </div>
    }
    else if(this.props.footer){
      return <div className="modal-footer">
      <button  className="btn btn-success" onClick={this.props.onDeal}>{this.props.dealLabel}</button>
      <button  className="btn btn-danger" onClick={this.props.onReject}>{this.props.rejectLabel}</button>
      <button  className="btn btn-primary" onClick={this.props.onCounteroffer}>{this.props.counterofferLabel}</button>
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
                <div className="row">
                  <h2>Offerer: {this.props.trade.usernameFrom}</h2>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-2">
                    Wants:
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  Products:
                  <div className="container">
                    {this.renderTargets()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-2">
                    Offers
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  Products:
                  <div className="container">
                    {this.renderProducts()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-2">Money:</div>
                  <div className="col-1">${this.props.trade.money}</div>
                </div>
                <div className="row">
                  {this.renderFooter()}
                </div>
          </div>
          
        </div>
      </div>
    </div>
  }
}