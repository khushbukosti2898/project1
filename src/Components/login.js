import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Input } from '../Components/CommonInput';
import '../CSS/login.css.scss';
import axios from 'axios';
import seedRadioLogo from '../assests/images/seeRadiioLogo..png';
import swal from 'sweetalert';

// import get from '../interception/ApiCall'

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            data: '',
            error: {
                email: '',
                password: ''
            }
        }
    }

    componentWillMount(){
        if (localStorage.getItem("email"))
            this.props.history.push('/dashboard');
    }

    handleSubmit = (name) => {
        let { email, password, error } = this.state;
        switch (name) {
            case 'email':
                if (email === '')
                    error.email = "Email is required"
                else
                    error.email = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' :
                        "Email is invalid";
                break;

            case 'password':
                if (password === '') error.password = "Password is required"
                else error.password = password.match(/^[0-9]{2,}/i) ? '' :
                    "Password is invalid";
                break;

            default:
                console.log("error")
        }
        this.setState({ error: error })

    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        }, () => this.handleSubmit(name, value))
    }

    handleClick = () => {
        let { error, email, password } = this.state
        for (let key in error) {
            if (error.hasOwnProperty(key)) {
                this.handleSubmit(key, error[key])
            }
        };
        if (error.email === '' && error.password === '') {
            axios.post('http://localhost:3005/pub/login', {
                email: email,
                password: password
            })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        data: response.data.data,
                        firsName: response.data.data.personData.firstName,
                        lastName: response.data.data.personData.lastName,
                        errorMessage: '',

                    })
                    console.log(response.data.data.personData.firstName)
                    swal({
                        title: "Login Success",
                        icon: "success",
                        timer: 1000,
                        buttons:false,
                    })
                    if (email !== '' && password !== '') {
                        localStorage.setItem('email', email);
                        localStorage.setItem('password', password);
                        localStorage.setItem('firstName', this.state.firsName)
                        localStorage.setItem('lastName', this.state.lastName)
                        this.props.history.push('/dashboard');
                    }
                })
                .catch(err => {
                    this.setState({ errorMessage: err.response.data.errorMessage });
                    swal({
                        title: this.state.errorMessage,
                        icon: "warning",
                    })
                });
        }
    }


    render() {
        let { email, password } = this.state.error
        return (<>

            <div className="formParent">
                <div className="form">
                    <div className="App responsive">
                        <img src={seedRadioLogo} alt="logo" className="img"/*  style={{ marginTop: "90px" }}  */ />
                    </div><br />
                    <Row>
                        <Col>
                            <Input
                                title="Email"
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={email}
                                isRequired={true}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                title="Password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={password}
                                isRequired={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Button variant="primary" size="lg" block onClick={this.handleClick}>Submit</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
        )
    }
}
export default Login;