import React, { Component } from 'react';
import {connect} from 'react-redux';
import Feed from '../../components/Feed/Feed';
import Suggestions from '../../components/Suggestions/Suggestions';
import Loader from '../../components/UI/Loader/Loader';
import * as actionCreators from '../../store/actions/feed';

class HomePage extends Component {
   
    style = {
        width : "100%",
        height : "100%",
        display : 'flex',
        alginItems : 'center',
        justifyContent : 'center',
        marginTop : '2.3rem'
    }

    componentDidMount = () => {
        this.props.getFeed(this.props.token);
        this.props.getSuggestions(this.props.token);
    }
    
    render(){
        let feed = <Loader />;
        if(this.props.feed && this.props.suggestions){
            feed = (
                <>
                <Feed data={this.props.feed} />
                <Suggestions />
                </>
            )
        }
        return(
            <div style={this.style}>
                {feed}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token,
        feed : state.homepage.feed,
        suggestions : state.homepage.suggestions
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        getFeed : (token) => dispatch(actionCreators.fetchFeed(token)),
        getSuggestions : (token) => dispatch(actionCreators.fetchSuggestions(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);