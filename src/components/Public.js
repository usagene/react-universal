import React from 'react';
import {Link} from 'react-router';

class Public extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			repos: this.props.repos || []
		}
	}

	render(){
		return (
			<div>
				<ul>
					{ this.state.repos.forEach((repo)=>{
						<li><Link to={`/detail/${repo.id}`}>{repo.name}</Link></li>
					})}
				</ul>
			</div>
		);
	}
}

export default Public;
