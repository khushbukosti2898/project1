import React from 'react';
import '../CSS/home.scss';
import Header from '../Components/Header'

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

				<Header></Header>
			<div>
				<h1>home page</h1>

				{/* <input type="button" className="fadeIn fourth"
                    value="Log Out" onClick={this.logOut} /> */}
			</div>

			
			



		</>)
	}
}

export default Home;