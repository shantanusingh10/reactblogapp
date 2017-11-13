import React,{Component } from 'react';
import { Link } from 'react-router-dom';
import {Field,reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

	renderField(field){

		const className = `form-group ${field.meta.touched && field.meta.error ? "has-danger": ''}`;

		return (
			<div className={className}>
			<div><label>{field.label}</label></div>
				<input
					{...field.input}
				/>
				<div className="text-help">{field.meta.touched ? field.meta.error: ''}</div>
			</div>
		)
	}

	onSubmit(values){
		
		this.props.createPost(values, () => {
			this.props.history.push("/");	
		});
	}

	render(){
		const {handleSubmit} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
				label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button className="btn btn-primary" type="submit">Create</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}


function validate(values){
	const errors = {};

	if(!values.title){
		errors.title = "Please enter a title!";
	}
	if(!values.categories){
		errors.categories = "Please enter some categories!";
	}
	if(!values.content){
		errors.content = "Please enter some content!";
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null,{createPost})(PostsNew)
);