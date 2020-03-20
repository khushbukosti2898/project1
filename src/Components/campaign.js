import React from 'react';
import { Button, Row, Col, Card ,Form} from 'react-bootstrap';
import { Input, DropDown, } from './CommonInput';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


class campaign extends React.Component {
    render() {
        return (<><div>
            <div className="container pt-3">
                <Row>
                    <Col>
                        <h5 className="text-primary">Add New Advertiser</h5>
                    </Col>
                </Row>
                <Card style={{ padding: '34px', border: "none" }}>
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>Campaign</h6>
                    <Row>
                        <Col md="6">
                            <DropDown/>
                        </Col>
                        <Col md="6">
                            <DropDown/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input/>
                        </Col>
                        <Col md="6">
                            <Input/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input/>
                        </Col>
                        <Col md="6">
                        <Form.Control as="textarea" rows="3" />
                        </Col>
                    </Row>
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>Distribution</h6>
                    <Row>
                        <Col md="6">
                            <DropDown/>
                        </Col>
                        <Col md="6">
                        <Input/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                        <DatePicker
                            />
                        </Col>
                        <Col md="6">
                        <Input/>
                        </Col>
                    </Row>

                </Card>
            </div>
        </div>
        </>)
    }
}
export default campaign;