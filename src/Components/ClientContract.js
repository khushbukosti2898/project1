import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Input, DropDown, CheckBox } from './CommonInput';
import axios from 'axios'
import { getPhoneFormat } from './Helper'

class ClientContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {
                companyName: '',
                webAdd: '',
                industryCategory: '',
                SalesPerson: ''
            },
            primaryContact:
            {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            secondaryContact:
            {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            businessAddress: {
                address: '',
                address2: '',
                city: '',
                country: '',
                stateProviance: '',
                postal: ''
            },
            billingAddress: {
                address: '',
                address2: '',
                city: '',
                country: '',
                stateProviance: '',
                postal: ''
            },
            error: {
                companyName: '',
                webAdd: '',
                industryCategory: '',
                SalesPerson: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                country: '',
                stateProviance: '',
                postal: '',
                billaddress: '',
                billcity: '',
                billcountry: '',
                billstateProviance: '',
                billpostal: ''
            },
            SalesPerson: [],
            industryCategory: [],
            country: [
                { label: 'US', value: 'US' },
                { label: 'CANADA', value: 'CA' }
            ],
            selectedOption: [
                { label: '', value: '' }
            ],
            businessAddress_list: "",
            billingAddress_list: "",
            stateOptions: null,
            isDisabled: true,
            copyCheckbox: '',
            copyCheck: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3005/api/company/persons', {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        })
            .then(response => {
                let data = response.data.data;
                data.map((data, i) => {
                    let options = {
                        name: "SalesPerson",
                        value: data.Person.firstName + " " + data.Person.lastName + "- " + data.Person.email,
                        label: data.Person.firstName + " " + data.Person.lastName + "- " + data.Person.email
                    }
                    this.setState({
                        SalesPerson: [
                            ...this.state.SalesPerson,
                            options,
                        ]
                    })
                })

            })
            .catch(function (error) {
                console.log(error);
            });
        //Industry

        axios.get('http://localhost:3005/api/wholesalepricing/getIndustries', {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        })
            .then(response => {
                let data = response.data.data;
                data.map((data) => {
                    let options = {
                        name: "industryCategory",
                        label: data.name,
                        value: data.name
                    }
                    this.setState({
                        industryCategory: [
                            ...this.state.industryCategory,
                            options
                        ]
                    })
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange = (e, objname) => {
        let { name, value } = e.target
        if (name === "phone") {
            this.setState({ [objname]: { ...this.state[objname], [name]: getPhoneFormat(value) } },
                () => this.validateField(name, value))
        }
        else if (name === "postal") {
            this.setState({ [objname]: { ...this.state[objname], [name]: value } },
                () => this.validateField(name, value))
        }
        else {
            this.setState({ [objname]: { ...this.state[objname], [name]: value } },
                () => this.validateField(name, value));
        }

    }
    handleCheckChange = (e, objname, b) => {

        if (e) {
            this.setState({ [objname]: { ...this.state[objname], [b]: e }, },
                () => this.validateField(b, objname[b]))
            if (b === "country") {
                axios.get(`http://localhost:3005/pub/states/${e.value}`, {
                    headers: {
                        'x-token': localStorage.getItem('token'),
                    }
                })
                    .then(response => {
                        let data = response.data.data;
                        let options = data.map((data) => {
                            return {
                                label: data.name,
                                value: data.id
                            }
                        })
                        this.setState({ [objname + "_list"]: options })
                    })
                    .catch(error => error)
            }
        }
        else {
            this.setState({ [objname]: { ...this.state[objname], [b]: '' } })
        }

    }


    validateField(fieldName, value) {
        let { companyName, webAdd, industryCategory, SalesPerson } = this.state.company
        let { firstName, lastName, email, phone } = this.state.primaryContact;
        let { /* address, city, country,stateProviance, */postal } = this.state.businessAddress;
        let { error } = this.state;
        switch (fieldName) {
            case 'companyName':
                if (companyName === '')
                    error.companyName = "Company Name is required"
                else error.companyName = ""
                break;
            case 'webAdd':
                if (webAdd === '')
                    error.webAdd = "webAdd is required"
                else
                    error.webAdd = webAdd.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Web address is invalid';

                break;
            case 'industryCategory':
                if (industryCategory === '')
                    error.industryCategory = "industryCategory is required"
                else error.industryCategory = ""
                break;
            case 'SalesPerson':
                if (SalesPerson === '')
                    error.SalesPerson = "SalesPerson is required"
                else error.SalesPerson = ""
                break;
            case 'firstName':
                if (firstName === '')
                    error.firstName = "First name is required"
                else error.firstName = ""
                break;
            case 'lastName':
                if (lastName === '')
                    error.lastName = "Last name is required"
                else error.lastName = ""
                break;
            case 'email':
                if (email === '')
                    error.email = "Email is required"
                else
                    error.email = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Email is invalid';
                break;
            case 'phone':
                if (phone === '')
                    error.phone = "Phone is required"
                else error.phone = ""
                break;
            case 'address':
                if (this.state.businessAddress.address === '')
                    error.address = "Address is required"
                else error.address = ""

                if (this.state.billingAddress.address === '')
                    error.billaddress = "Address is required"
                else error.billaddress = ""
                break;
            case 'city':
                if (this.state.businessAddress.city === '')
                    error.city = "City is required"
                else error.city = ""

                if (this.state.billingAddress.city === '')
                    error.billcity = "City is required"
                else error.billcity = ""
                break;
            case 'country':
                if (this.state.businessAddress.country === '')
                    error.country = "Country is required"
                else error.country = ""

                if (this.state.billingAddress.country === '')
                    error.billcountry = "Country is required"
                else error.billcountry = ""
                break;
            case 'postal':
                if (this.state.businessAddress.postal === '')
                    error.postal = "Postal is required"
                else
                    error.postal = postal.match(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g) ? '' : 'Postal is invalid';

                if (this.state.billingAddress.postal === '')
                    error.billpostal = "Postal is required"
                else
                    error.billpostal = this.state.billingAddress.postal.match(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g) ? '' : 'Postal is invalid';
                break;
            case 'stateProviance':
                if (this.state.businessAddress.stateProviance === '')
                    error.stateProviance = "stateProviance is required"
                else error.stateProviance = ""

                if (this.state.billingAddress.stateProviance === '')
                    error.billstateProviance = "stateProviance is required"
                else error.billstateProviance = ""
                break;
            default:
                break;
        }
        this.setState({ error: error });
    }
    handleSubmit = () => {
        var flag = false;
        let { error } = this.state;
        for (var key in error) {
            if (error.hasOwnProperty(key)) {
                this.validateField(key, error[key])
                if (error[key] === '') {
                    flag = true
                }
                else {
                    flag = false
                }
            }
        }
        if (flag === true) {
            this.payloadFun()
        }
    }

    payloadFun = () => {

        let { companyName, webAdd, industryCategory, SalesPerson } = this.state.company
        let { primaryContact } = this.state;
        let { secondaryContact } = this.state;
        let { businessAddress } = this.state;
        let { billingAddress } = this.state;

        const payloadData = {
            companyName: companyName,
            companyWebsite: webAdd,
            personID: localStorage.userId,
            sosID: this.state.SalesPerson.value,
            companyType: localStorage.companyType,
            firstName: primaryContact.firstname,
            lastName: primaryContact.lastname,
            email: primaryContact.email,
            phone: primaryContact.phone,
            secondaryContact: {
                firstName: secondaryContact.firstName,
                lastName: secondaryContact.lastName,
                email: secondaryContact.email,
                phone:secondaryContact.phone,
            },
            contactAddress: {
                business: {
                    address: businessAddress.address,
                    address2: businessAddress.address2,
                    city: businessAddress.city,
                    postal: businessAddress.postal,
                    country:businessAddress.country.value,
                    state: businessAddress.state.value,
                    provinceID: businessAddress.stateProviance.value,
                },
                billing: {
                    address: billingAddress.address,
                    address2: billingAddress.address2,
                    city: billingAddress.city,
                    postal: billingAddress.postal,
                    country:billingAddress.country.value,
                    state: billingAddress.state.value,
                    provinceID: billingAddress.stateProviance.value,
                }
            },
            addressType: this.state.copyCheck ? "businessaddress" : "",
            useSame: this.state.copyCheck,
            roleCode: localStorage.roll,
            createdByPerson: localStorage.createdByPerson,
        };
        console.log(payloadData)
        // return payloadData;
    
}
handleCopy = (e) => {
    if (e.target.checked) {
        let { address, address2, city, country, stateProviance, postal } = this.state.businessAddress;
        let obj;
        this.setState({
            billingAddress: obj = {
                address: address,
                address2: address2,
                city: city,
                country: country,
                stateProviance: stateProviance,
                postal: postal
            },
            copyCheck: true
        });

    }
    else {
        let obj;
        this.setState({
            billingAddress: obj = {
                address: '',
                address2: '',
                city: '',
                country: '',
                stateProviance: '',
                postal: ''
            },
            copyCheck: false
        });
    }
}
render() {
    let { error } = this.state
    let { SalesPerson, industryCategory, selectedCountry, isDisabled, selectedOption, copyCheck } = this.state
    let { billaddress, billaddress2, billpostal, billcity, } = this.state.billingAddress
    let { address, address2, city, postal, } = this.state.businessAddress;
    return (<>
        <div>
            <div className="container pt-3">
                <Row>
                    <Col md="3">

                    </Col>
                    <Col md="6">
                        <Button variant="secondary" className="ml-3" active>Step 1</Button>
                        <Button variant="secondary" className="ml-3" disabled>Step 2</Button>
                        <Button variant="secondary" className="ml-3" disabled>Step 3</Button>
                    </Col>
                    <Col md="3">
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="text-primary">
                            Add New Advertiser
                        </h5>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <Input title="Company Name"
                            isRequired="true"
                            placeholder="Company Name"
                            onChange={(e) => this.handleChange(e, "company")}
                            name="companyName"
                            error={error.companyName}
                        >
                        </Input>

                    </Col>
                    <Col md="6">
                        <Input
                            title="Company Website Address"
                            isRequired="true"
                            placeholder="e.g www.abc.com"
                            name="webAdd"
                            onChange={(e) => this.handleChange(e, "company")}
                            error={error.webAdd}
                        ></Input>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <DropDown
                            options={SalesPerson}
                            title="SalesPerson"
                            isRequired="true"
                            isClearable="true"
                            name="SalesPerson"
                            onChange={(selectedOption) => this.handleCheckChange(selectedOption, "company", "SalesPerson")}
                            error={error.SalesPerson}
                        />
                    </Col>
                    <Col md="6">
                        <DropDown
                            options={industryCategory}
                            title="industryCategory"
                            isRequired="true"
                            isClearable="true"
                            name="industryCategory"
                            error={error.industryCategory}
                            onChange={(selectedOption) => this.handleCheckChange(selectedOption, "company", "industryCategory")}
                        />
                    </Col>
                </Row>

                <div className="primaryContact">
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>
                        Primary Contact
                    </h6>
                    <Row>
                        <Col md="6">
                            <Input title="First Name"
                                isRequired="true"
                                placeholder="First Name"
                                name="firstName"
                                onChange={(e) => this.handleChange(e, "primaryContact")}
                                error={error.firstName}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Last Name"
                                isRequired="true"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={(e) => this.handleChange(e, "primaryContact")}
                                error={error.lastName}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input title="Email"
                                isRequired="true"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => this.handleChange(e, "primaryContact")}
                                error={error.email}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Phone"
                                isRequired="true"
                                placeholder="Phone"
                                name="phone"
                                value={this.state.primaryContact.phone}
                                onChange={(e) => this.handleChange(e, "primaryContact")}
                                error={error.phone}
                            ></Input>
                        </Col>
                    </Row>
                </div>

                <div className="secondaryContact">
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>
                        Secondary Contact(Billing - Optional)
                    </h6>
                    <Row>
                        <Col md="6">
                            <Input title="First Name"
                                placeholder="First Name"
                                name="firstName"
                                onChange={(e) => this.handleChange(e, "secondaryContact")}
                            // error={e_secondaryContact.firstName}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Last Name"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={(e) => this.handleChange(e, "secondaryContact")}
                            // error={e_secondaryContact.lastName}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input title="Email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => this.handleChange(e, "secondaryContact")}
                            // error={e_secondaryContact.email}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Phone"
                                placeholder="Phone"
                                name="phone"
                                value={this.state.secondaryContact.phone}
                                onChange={(e) => this.handleChange(e, "secondaryContact")}
                            // error={e_secondaryContact.phone}
                            ></Input>
                        </Col>
                    </Row>
                </div>


                <div className="BusinessAddress">
                    <h6 style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>
                        Business Address
                    </h6>
                    <Row>
                        <Col md="6">
                            <Input title="Address"
                                isRequired="true"
                                placeholder="Address"
                                name="address"
                                error={error.address}
                                onChange={(e) => this.handleChange(e, "businessAddress")}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Address line 2"
                                placeholder="Address"
                                name="address2"
                                onChange={(e) => this.handleChange(e, "businessAddress")}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input title="City "
                                isRequired="true"
                                placeholder="City "
                                name="city"
                                error={error.city}
                                onChange={(e) => this.handleChange(e, "businessAddress")}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <DropDown
                                title="Country"
                                isRequired="true"
                                isClearable="true"
                                options={this.state.country}
                                onChange={(e) => this.handleCheckChange(e, "businessAddress", "country")}
                                value={selectedCountry}
                                error={error.country}
                                name="country"
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col md="6">
                            <DropDown
                                name="stateProviance"
                                title={(/* isDisabled === true || */
                                    this.state.businessAddress.country === "") ? "State/Province" :
                                    (this.state.businessAddress.country.value === 'US') ? "State" : "Province"
                                }
                                isRequired="true"
                                placeholder="State"
                                isClearable="true"
                                isDisabled={!this.state.businessAddress.country}
                                options={this.state.businessAddress_list}
                                onChange={(e) => this.handleCheckChange(e, "businessAddress", "stateProviance")}
                                error={(!this.state.businessAddress.country) ? "" : error.stateProviance}
                            />

                        </Col>
                        <Col md="6">
                            <Input title="Postal "
                                isRequired="true"
                                placeholder="Postal"
                                name="postal"
                                error={error.postal}
                                onChange={(e) => this.handleChange(e, "businessAddress", "postal")}
                            >
                            </Input>
                        </Col>
                    </Row>
                </div>

                <div className="BillingAddress">
                    <Row style={{ backgroundColor: "lightgrey", padding: "5px", height: "30px" }}>
                        <Col md="2">
                            <h6 >
                                Billing Address</h6>
                        </Col>
                        <Col md="3">
                            <CheckBox label="Same as Business Address"
                                onChange={this.handleCopy}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Input title="Address"
                                isRequired="true"
                                placeholder="Address"
                                name="address"
                                error={copyCheck ? "" : error.billaddress}
                                onChange={(e) => this.handleChange(e, "billingAddress")}
                                value={copyCheck ? address : billaddress}
                                disabled={copyCheck ? true : false}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <Input
                                title="Address line 2"
                                placeholder="Address"
                                name="address2"
                                onChange={(e) => this.handleChange(e, "billingAddress")}
                                value={copyCheck ? address2 : billaddress2}
                                disabled={copyCheck ? true : false}
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Input title="City "
                                isRequired="true"
                                placeholder="City "
                                name="city"
                                error={copyCheck ? "" : error.billcity}
                                onChange={(e) => this.handleChange(e, "billingAddress")}
                                value={copyCheck ? city : billcity}
                                disabled={copyCheck ? true : false}
                            >
                            </Input>
                        </Col>
                        <Col md="6">
                            <DropDown
                                name="country"
                                title="Country"
                                isRequired="true"
                                isClearable="true"
                                options={this.state.country}
                                onChange={(e) => this.handleCheckChange(e, "billingAddress", "country")}
                                error={copyCheck ? "" : error.billcountry}
                                value={copyCheck ? this.state.businessAddress.country : this.state.billingAddress.country}
                                isDisabled={copyCheck ? true : false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">

                            <DropDown
                                name="stateProviance"
                                title={copyCheck ? ((this.state.businessAddress.country === "") ? "State/Province" :
                                    (this.state.businessAddress.country.value === 'US') ? "State" : "Province")
                                    : (this.state.billingAddress.country === "") ? "State/Province" :
                                        (this.state.billingAddress.country.value === 'US') ? "State" : "Province"
                                }
                                isRequired="true"
                                placeholder="State"
                                isClearable="true"
                                isDisabled={!this.state.billingAddress.country}
                                options={this.state.billingAddress_list}
                                onChange={(e) => this.handleCheckChange(e, "billingAddress", "stateProviance")}
                                // error={(!this.state.billingAddress.country) ? "" : error.billstateProviance}
                                error={copyCheck ? "" : error.billcountry}
                                value={copyCheck ? this.state.businessAddress.stateProviance : this.state.billingAddress.stateProviance}
                            />
                        </Col>
                        <Col md="6">
                            <Input title="Postal "
                                isRequired="true"
                                placeholder="Postal"
                                name="postal"
                                error={copyCheck ? "" : error.billpostal}
                                onChange={(e) => this.handleChange(e, "billingAddress", "postal")}
                                value={copyCheck ? postal : billpostal}
                                disabled={copyCheck ? true : false}
                            >
                            </Input>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md="8"></Col>
                        <Col md="4" >
                            <Button variant="outline-secondary" style={{ marginRight: "20px" }}>Cancel</Button>
                            <Button variant="primary" value="Next" onClick={this.handleSubmit}>Next</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </>)
}
}
export default ClientContract;