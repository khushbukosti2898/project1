import React from 'react';
import '../CSS/home.scss';
import seedRadioLogo from '../assests/images/seeRadiioLogo..png';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import bellIcon from '../assests/images/bellIcon.png';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

    }
    logOut = () => {
        localStorage.clear()
        this.props.history.replace('/login');
    }

    renderTooltip = (props) => {
        return <Tooltip {...props}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')

        }

        </Tooltip>;
    }


    render() {
        return (<>

            <div className="hedear">
                <div className="leftHedear">
                    <img src={seedRadioLogo} className="img" alt="logo" />
                </div>
                <div className="rigthHedear">
                    <img src={bellIcon} height="30px" width="30px" alt="bell" style={{ margin: "15px" }} />
                    <DropdownButton variant="default" title={<OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}>
                        <div className="profileLogo">
                            {localStorage.getItem('firstName').substr(0, 1) +
                                localStorage.getItem('lastName').substr(0, 1)}
                        </div>
                    </OverlayTrigger>}>
                        <Dropdown.Item href="#"><FontAwesomeIcon icon={faUser} />Profile</Dropdown.Item>
                        <Dropdown.Item href="#"><FontAwesomeIcon icon={faSignOutAlt} />Change Password</Dropdown.Item>
                        <Dropdown.Item onClick={this.logOut}><FontAwesomeIcon icon={faLock} />Sign Out</Dropdown.Item>
                    </DropdownButton>
                    <div className="info">
                        <a href="#">see Radio Administrator</a><br />
                        {localStorage.getItem('email')}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Header;