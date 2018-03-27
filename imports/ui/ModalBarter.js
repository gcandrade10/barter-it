import React, {Component} from 'react';
import classNames from 'classnames';
import "./modalBarter.css";

import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class ModalBarter extends Component
{

  constructor(props)
  {
    super(props);
    this.state={
      removeSelected: true,
      disabled: false,
      crazy: false,
      stayOpen: false,
      value: [],
      rtl: false,

    };
  }

    handleSelectChange =(value)=> {
    console.log('You\'ve selected:', value);
    this.setState({ value });
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
                <button  onClick={this.props.onSend}>{this.props.sendLabel}</button>
              </div>
        );
  }

  render() {



    const { crazy, disabled, stayOpen, value } = this.state;

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
          <h5>Choose your offer product(s)</h5>
              <Select
                closeOnSelect={!stayOpen}
                disabled={disabled}
                multi
                onChange={this.handleSelectChange}
                placeholder="Select your favourite(s)"
                removeSelected={this.state.removeSelected}
                rtl={this.state.rtl}
                simpleValue
                value={value}
                //options={options}
                options={this.getOptions()}
              />
          <h5>Choose your money offer</h5>
          
                        
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </div>
  }
}