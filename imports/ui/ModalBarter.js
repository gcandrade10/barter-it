import React, {Component} from 'react';
import classNames from 'classnames';
import "./modalBarter.css";

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CurrencyInput from 'react-currency-input';

export default class ModalBarter extends Component
{

  constructor(props)
  {
    super(props);
    this.state={
      crazy: false,
      disabled: false,
      stayOpen: false,
      removeSelected: true,
      rtl: false,
      

    };
  }

  getOptions()
  {
    var arrOptions=[];

    this.props.products.forEach(function(item){
            arrOptions.push({
                value:item._id,
                label:item.name
              });
           });
    return arrOptions;
  }

  renderFooter(){
    
      return(
              <div className="modal-footer">
                <button className="btn btn-success" onClick={this.props.onSend}>{this.props.sendLabel}</button>
              </div>
        );
  }

  render() {



    const { crazy, disabled, stayOpen} = this.state;

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
              <Select
                closeOnSelect={!stayOpen}
                disabled={disabled}
                multi
                onChange={this.props.handleSelectChange}
                placeholder="Select the products to barter"
                removeSelected={this.state.removeSelected}
                rtl={this.state.rtl}
                simpleValue
                value={this.props.value}
                //options={options}
                options={this.getOptions()}
              />
          <h5>Money offer</h5>
          <CurrencyInput value={this.props.amount} onChangeEvent={this.props.handleChange}/>

                        
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </div>
  }
}