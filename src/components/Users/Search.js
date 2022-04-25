import React from 'react';
import './Search.css';
import PropTypes from 'prop-types';


class Search extends React.Component {
    state = {
        text: ''
    }; 

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter a user you want to search', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: ''});
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    render() {
        const {showClear, clearUsers} = this.props;
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type="text" 
                    name='text' 
                    placeholder='Search Users...' 
                    className='searchBar' 
                    value={this.state.text} 
                    onChange={this.onChange}/>

                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {showClear && (
                    <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                )}
            </div>
        )
    }
}

export default Search
