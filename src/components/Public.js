import React from 'react';
import {Link} from 'react-router';

class Public extends React.Component{
	constructor(props){
		super(props);
		
		if(__SERVER__){
			console.log('Public component instantiation');
			
			console.log(this.props);
		}
	}

	render(){
		return (
			<div>
				<ul>
					{ this.props.repos.map((repo)=>{
						return <li key={repo.id}><Link to={`/detail/${repo.id}`}>{repo.name}</Link></li>;
					})}
				</ul>
			</div>
		);
	}
}

export default Public;
