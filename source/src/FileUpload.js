import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class FileUpload extends Component {

	constructor(props){
		super(props);

		this.state = {
	      uploadValue: 0
	    }
	}

	render (){
		return(

			<div>				
				<ProgressBar now= {this.props.uploadValue} label={`${this.props.uploadValue}%`} max={100} bsStyle="info" />
				<br/>
				<input type="file" onChange={this.props.onUpload}/>
			</div>
		)
	}
}

export default FileUpload;