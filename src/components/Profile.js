import React, { Component } from 'react';


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			newTag: "",
			viewMore: false
		};
	}

	tagHandle = (e) => {
		this.setState({newTag: e.target.value});
	}

	viewMoreHandle = (e) => {
		this.setState({viewMore: !this.state.viewMore});
	}

	render() {
		const {
			firstName,
			lastName,
			company,
			average,
			grades,
			email,
			skill,
			pic,
			tag,
			id
		} = this.props.student;

		const {
			newTag,
			viewMore
		} = this.state;

		return(
			<div className="studentProfile">
				<div className="expand-btn-div">
					{
						viewMore ?
							<button className="expand-btn" onClick={this.viewMoreHandle}>
								<i className="fas fa-minus"></i>
							</button> : 
							<button className="expand-btn" onClick={this.viewMoreHandle}>
								<i className="fas fa-plus"></i>
							</button>
					}
				</div>
				<img className="avatar" src={pic} alt="Robot Avatar"/>
				<div>
					<p className="studentName">{firstName} {lastName}</p>
					<div className="studentDetail">
						<p>Email: {email}</p>
						<p>Company: {company}</p>
						<p>Skill: {skill}</p>
						<p>Average: {average}%</p>
						{
							viewMore &&
							<div>
								<div className="gradeList">
									{
										grades.map((data, index) => {
											return(
											<p key={index}>Test {index + 1}: <span className="grade">{data}</span>%</p>
											);
										})
									}
								</div>

								{
									tag !== undefined &&
									<div>
										{tag.map((data, index) => {
											return(<p className="tag" key={index}>{data}</p>);
										})}
									</div>
								}

								<form 
									id="createNewTag"
									onSubmit={
										e => {
											this.props.tagAdd(e, newTag, id);
											this.setState({newTag: ""});
										}
									}
								>
									<input 
										className="add-tag-input" 
										placeholder="Add a tag"
										type="text" 
										value={newTag} 
										onChange={this.tagHandle}
									></input>	
								</form>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
};

export default Profile;