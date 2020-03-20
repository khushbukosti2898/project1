import React from 'react';
import { Button, Row, Col, Card ,Form} from 'react-bootstrap';
import { Input, DropDown, TextArea,Date} from '../CommonInput';
 
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
                            <DropDown
                            title="Sales Person "
                            isRequired="true"
                            
                            />
                        </Col>
                        <Col md="6">
                            <DropDown
                            title="Advertiser "
                            isRequired="true"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input
                            title="Title "
                            isRequired="true"
                            placeholder="Title"
                            />
                        </Col>
                        <Col md="6">
                            <Input
                            title="Preferred Landing Page URL "
                            isRequired="true"
                            placeholder="e.g www.abc.com"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input
                            title="Price "
                            isRequired="true"
                            placeholder="Price"
                            />
                        </Col>
                        <Col md="6">
                        <TextArea 
                        title="Address " 
                        isRequired="true"
                        placeholder="Address"
                        />
                        </Col>
                    </Row>
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>Distribution</h6>
                    <Row>
                        <Col md="6">
                            <DropDown
                            title="Target Market " 
                            isRequired="true"
                            />
                        </Col>
                        <Col md="6">
                        <Input
                        title="Views " 
                        isRequired="true"
                        placeholder="Views"
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                        <Date
                           title="Start Date " 
                           isRequired="true" 
                          />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                        <Date
                           title="End Date " 
                           isRequired="true" 
                          />
                        </Col>
                    </Row>

                </Card>
            </div>
        </div>
        </>)
    }
}
export default campaign;