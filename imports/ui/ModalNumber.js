import React, {Component} from 'react';
import classNames from 'classnames';
import "./modalNumber.css";
import ReactPhoneInput  from 'react-phone-input-2'
export default class ModalNumber extends Component
{

    constructor(props)
    {
    super(props);
    this.state={
      phone:"+57"
    };
  }

  renderFooter(){ 
      return(
              <div className="modal-footer">
                <button  onClick={this.props.onSend}>{this.props.sendLabel}</button>
              </div>
        );
  }

  handleOnChange=(value) =>{
   this.setState({
      phone: value
   });
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
            <h4 className="modal-title">{this.props.title}</h4>
            <button className="close" onClick={this.props.onClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="modal-body justify-content-center">
          <h5>Product(s) offer</h5>

            <ReactPhoneInput defaultCountry={'co'} onChange={this.handleOnChange}/>

                        
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </div>
  }

  
}