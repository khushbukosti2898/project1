import React from 'react';
import { PropTypes } from 'prop-types';
import { Form } from 'react-bootstrap';
import '../CSS/login.css.scss';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function Input(props) {
  const { title, isRequired, disabled, className, name, type, value, style, placeholder,
    onChange, onBlur, required, error } = props;
  return (<><Form.Group>
    <b>{title}</b>{isRequired && <span className="error">*</span>}
    <Form.Control
      className={className}
      name={name}
      type={type}
      value={value}
      style={style}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
    />{error && <span className="error">{`${error} `}</span>}
  </Form.Group>
  </>)
}

export class DropDown extends React.Component {
  render() {
    let { title, value, isClearable, isDisabled, error, onChange, options, isRequired } = this.props
    return (<><Form.Group>
      <b>{title}</b>{isRequired && <span style={{ color: "red" }}>*</span>}
      <Select
        options={options}
        isClearable={isClearable}
        isRequired={isRequired}
        onChange={onChange}
        value={value}
        isDisabled={isDisabled}
      />
      {error && <span className="error">{`${error} `}</span>}
    </Form.Group> </>)
  }
}

export class CheckBox extends React.Component {
  render() {
    let { label, onChange } = this.props
    return (<>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label={label}
          onChange={onChange}
        />
      </Form.Group>
    </>)
  }
}

export class TextArea extends React.Component {
  render() {
    let { title, isRequired } = this.props
    return (<>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <b>{title}</b>{isRequired && <span style={{ color: "red" }}>*</span>}
        <Form.Control as="textarea" rows="3" />
      </Form.Group>
    </>)
  }
}


export class Date extends React.Component {
  render() {
    let { title,dateFormat, isRequired ,selected} = this.props
    return (<>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <b>{title}</b>{isRequired && <span style={{ color: "red" }}>*</span>}
        <DatePicker
        isRequired={isRequired}
          selected={selected}
          dateFormat={dateFormat}
          // onSelect={this.handleSelect} //when day is clicked
          // onChange={this.handleChange} //only when value has changed
        />
      </Form.Group>
    </>)
  }
}
Input.defaultProps = {
  type: "text",
  style: {
    margin: "10px 10px 10px 0",
  },
  isRequired: false,
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string
}
