import React from 'react';
import { PropTypes } from 'prop-types';
import { Form } from 'react-bootstrap';
import '../CSS/login.css.scss';


export function Input(props) {
  const { title, isRequired, className, name, type, value, style, placeholder,
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
    />{error && <span className="error">{`${error} `}</span>}
  </Form.Group>
  </>)
}

Input.defaultProps = {
  type: "text",
  style: {
    margin: "10px",
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
