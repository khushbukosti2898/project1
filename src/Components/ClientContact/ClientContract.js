import React from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { Input, DropDown, CheckBox } from '../CommonInput';
import axios from 'axios'
import { getPhoneFormat } from './Helper'
import { payloadFun } from './adervetiserPayload'

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
        billaddress: '',
        billaddress2: '',
        billcity: '',
        billcountry: '',
        billstateProviance: '',
        billpostal: ''
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
          return 0;
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
          return 0;
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


    if (objname = "bussinessAddress")
      if (this.state.copyCheck === true) {
        this.setState({ billingAddress: this.state.businessAddress },
         /*  () => this.validateField(name, value) */)
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
    /* else {
      this.setState({ [objname]: { ...this.state[objname], [b]: '' } })
    } */
    if (b === "billcountry") {
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
    /*  else {
       this.setState({ [objname]: { ...this.state[objname], [b]: '' } })
     } */
  }
  validateField(fieldName, value) {
    let { companyName, webAdd, industryCategory, SalesPerson } = this.state.company
    let { firstName, lastName, email, phone } = this.state.primaryContact;
    let { address, city, country, stateProviance, postal } = this.state.businessAddress;
    let { billaddress, billcity, billcountry, billstateProviance, billpostal } = this.state.billingAddress;

    let { error } = this.state;
    switch (fieldName) {
      case 'companyName':
        if (companyName === '')
          error.companyName = "Please enter company name."
        else error.companyName = ""
        break;
      case 'webAdd':
        if (webAdd === '')
          error.webAdd = "Please enter company web address."
        else
          error.webAdd = webAdd.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Web address is invalid';

        break;
      case 'industryCategory':
        if (industryCategory === '')
          error.industryCategory = "Please enter industry."
        else error.industryCategory = ""
        break;
      case 'SalesPerson':
        if (SalesPerson === '')
          error.SalesPerson = "Please enter sales person."
        else error.SalesPerson = ""
        break;
      case 'firstName':
        if (firstName === '')
          error.firstName = "Please enter first name."
        else error.firstName = ""
        break;
      case 'lastName':
        if (lastName === '')
          error.lastName = "Please enter last name."
        else error.lastName = ""
        break;
      case 'email':
        if (email === '')
          error.email = "Please enter email."
        else
          error.email = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Email is invalid';
        break;
      case 'phone':
        if (phone === '')
          error.phone = "Please enter phone."
        else error.phone = ""
        break;
      case 'address':
        if (address === '')
          error.address = "Please enter address."
        else error.address = ""
        break;
      case 'billaddress':
        if (billaddress === '')
          error.billaddress = "Please enter address."
        else error.billaddress = ""
        break;

      case 'city':
        if (city === '')
          error.city = "Please enter city."
        else error.city = ""
        break;
      case 'billcity':
        if (billcity === '')
          error.billcity = "Please enter city."
        else error.billcity = ""
        break;


      case 'country':
        if (country === '')
          error.country = "Please enter country."
        else error.country = "";
        break;
      case 'billcountry':
        if (billcountry === '')
          error.billcountry = "Please enter country."
        else error.billcountry = ""
        break;

      case 'postal':
        if (postal === '')
          error.postal = "Please enter postal."
        else {
          let result = postal.match(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g)
          error.postal = result ? '' : 'Postal is invalid';
        }
        break;

      case 'billpostal':
        if (billpostal === '')
          error.billpostal = "Please enter postal."
        else {
          error.billpostal = ""
          // error.billpostal = billpostal.match(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g) ? '' : 'Postal is invalid';
          // let result = billpostal.match(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/g)
          // error.billpostal = result ? '' : 'Postal is invalid';
        }
        break;
      case 'stateProviance':
        if (stateProviance === '')
          error.stateProviance = "Please enter state."
        else error.stateProviance = ""
        break;

      case 'billstateProviance':
        if (billstateProviance === '')
          error.billstateProviance = "Please enter state."
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
      let finalData = payloadFun(this.state)
      console.log(finalData)
      axios.get("http://localhost:3005/api/company/client", {
        headers: {
          'x-token': localStorage.token
        }, finalData
      }).then(response => response)
        .then(response => {
          alert("data send success")
        })
        .catch(error => error)
    }
  }


  handleCopy = (e) => {
    let obj = {
      billaddress: '',
      billaddress2: '',
      billcity: '',
      billcountry: '',
      billstateProviance: '',
      billpostal: ''
    };
    // let { businessAddress,billingAddress } = this.state;
    // let { billaddress, billaddress2, billcity, billcountry, billstateProviance, billpostal } = this.state.billingAddress;
    if (e.target.checked) {
      this.setState({
        billingAddress: this.state.businessAddress,
        copyCheck: true
      });
    }
    else {
      this.setState({
        billingAddress: obj,
        copyCheck: false
      });
    }
  }
  render() {
    let { error, businessAddress_list, billingAddress_list } = this.state
    let { SalesPerson, industryCategory, selectedCountry, /* isDisabled, selectedOption, */ copyCheck } = this.state
    let { billaddress, billaddress2, billpostal, billcity, billcountry, billstateProviance } = this.state.billingAddress
    let { address, address2, city, postal, country, stateProviance } = this.state.businessAddress;
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
            <Col md="3"></Col>
          </Row>

          <Row>
            <Col>
              <h5 className="text-primary">Add New Advertiser</h5>
            </Col>
          </Row>
          <Card style={{ padding: '34px', border: "none" }}>
            <Row>
              <Col md="6">
                <Input title="Company Name "
                  isRequired="true"
                  placeholder="Company Name"
                  onChange={(e) => this.handleChange(e, "company")}
                  name="companyName"
                  error={error.companyName}
                />
              </Col>
              <Col md="6">
                <Input
                  title="Company Website Address "
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
                  title="Sales Person "
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
                  title="Industry Category "
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
                  <Input title="First Name "
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
                    title="Last Name "
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
                  <Input title="Email "
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
                    title="Phone "
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
                  <Input title="First Name "
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => this.handleChange(e, "secondaryContact")}
                  // error={e_secondaryContact.firstName}
                  >
                  </Input>
                </Col>
                <Col md="6">
                  <Input
                    title="Last Name "
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => this.handleChange(e, "secondaryContact")}
                  // error={e_secondaryContact.lastName}
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Input title="Email "
                    placeholder="Email"
                    name="email"
                    onChange={(e) => this.handleChange(e, "secondaryContact")}
                  // error={e_secondaryContact.email}
                  >
                  </Input>
                </Col>
                <Col md="6">
                  <Input
                    title="Phone "
                    placeholder="Phone"
                    name="phone"
                    value={this.state.secondaryContact.phone}
                    onChange={(e) => this.handleChange(e, "secondaryContact")}
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
                  <Input title="Address "
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
                    title="Address line 2 "
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
                    title="Country "
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
                    title={(country === "") ? "State/Province " :
                      (country.value === 'US') ? "State " : "Province "
                    }
                    isRequired="true"
                    placeholder="State"
                    isClearable="true"
                    isDisabled={!country}
                    options={businessAddress_list}
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
                <h6>
                  Billing Address</h6>

                <CheckBox label="Same as Business Address"
                  onChange={this.handleCopy}
                />
              </Row>

              <Row>
                <Col md="6">
                  <Input title="Address "
                    isRequired="true"
                    placeholder="Address"
                    name="billaddress"
                    error={copyCheck ? "" : error.billaddress}
                    onChange={(e) => this.handleChange(e, "billingAddress")}
                    value={copyCheck ? address : billaddress}
                    disabled={copyCheck ? true : false}
                  >
                  </Input>
                </Col>
                <Col md="6">
                  <Input
                    title="Address line 2 "
                    placeholder="Address"
                    name="billaddress2"
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
                    name="billcity"
                    error={copyCheck ? "" : error.billcity}
                    onChange={(e) => this.handleChange(e, "billingAddress")}
                    value={copyCheck ? city : billcity}
                    disabled={copyCheck ? true : false}
                  >
                  </Input>
                </Col>
                <Col md="6">
                  <DropDown
                    name="billcountry"
                    title="Country "
                    isRequired="true"
                    isClearable="true"
                    options={this.state.country}
                    onChange={(e) => this.handleCheckChange(e, "billingAddress", "billcountry")}
                    error={copyCheck ? "" : error.billcountry}
                    value={copyCheck ? country : billcountry}
                    isDisabled={copyCheck ? true : false}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6">

                  <DropDown
                    name="billstateProviance"
                    title={copyCheck ? ((country === "") ? "State/Province " :
                      (country.value === 'US') ? "State" : "Province")
                      : (billcountry === "") ? "State/Province " :
                        (billcountry.value === 'US') ? "State " : "Province "
                    }
                    isRequired="true"
                    placeholder="State"
                    isClearable="true"
                    isDisabled={!billcountry}
                    options={billingAddress_list}
                    onChange={(e) => this.handleCheckChange(e, "billingAddress", "billstateProviance")}
                    error={(!this.state.billingAddress.billcountry) ? "" : error.billstateProviance}
                    value={copyCheck ? stateProviance : billstateProviance}
                  />
                </Col>
                <Col md="6">
                  <Input title="Postal "
                    isRequired="true"
                    placeholder="Postal"
                    name="billpostal"
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
          </Card>
        </div>
      </div>
    </>)
  }
}
export default ClientContract;