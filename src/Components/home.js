import React from 'react';
import '../CSS/home.scss';
import ClientContract from './ClientContract'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	render() {
		return (<>
		<ClientContract/>		
		</>)
	}
}

export default Home;