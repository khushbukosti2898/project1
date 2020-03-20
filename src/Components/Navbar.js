import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTachometerAlt, faFire, faAd } from '@fortawesome/free-solid-svg-icons'
import '../CSS/Navbar.css.scss';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    render() {
        return (<>
            <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto" defaultActiveKey="/dashboard">
                    <span className="text-primary pl-1">
                        <Nav.Link href="/dashboard">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span> dashboard</span>
                        </Nav.Link>
                    </span>
                    <NavDropdown title={<span>
                        <FontAwesomeIcon icon={faFire} />
                        <span className="pl-1">Campaigns</span>
                    </span>} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">Active Campaigns/Orders</NavDropdown.Item>
                        <NavDropdown.Item href="#">Campaigns in Market</NavDropdown.Item>
                        <NavDropdown.Item href="#">Completed Campaigns</NavDropdown.Item>
                    </NavDropdown>
                    <span className="text-primary pl-1">
                        <Nav.Link href="#Advertisers">
                            <FontAwesomeIcon icon={faAd} />
                            <span> Advertisers</span>
                        </Nav.Link>
                    </span>
                </Nav>
                <Nav>
                    <NavDropdown title="Administration" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/client-contact">
                            <span className="text-primary pl-1">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="text-dark">Advertisers</span>
                            </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="/add-campaign">
                            <span className="text-primary pl-1">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="text-dark">Campaigns</span>
                            </span>
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.2">
                            <span className="text-primary pl-1">
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="text-dark">Salesperson</span>
                            </span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </>)
    }
}

export default NavBar;