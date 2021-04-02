import React, { Component } from 'react';
import {connect} from 'react-redux';
import SuggestedPosts from '../../components/SuggestedPosts/SuggestedPosts';
import Loader from '../../components/UI/Loader/Loader';
import {fetchExploreFeed} from '../../store/actions/feed';

class Explore extends Component{

    style = {
        marginTop : "2.3rem",
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        margin : 'auto'
    }

    componentDidMount = () => {
        this.props.fetchFeed(this.props.token);
    }

    render(){
        let Suggestions = <Loader />
        if(!this.props.loading){
            Suggestions = <SuggestedPosts posts={this.props.feed}/>
        }
        return(
            <div style={this.style}>
                {Suggestions}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        feed : state.explore.feed,
        error : state.explore.error,
        loading : state.explore.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        fetchFeed : (token) => dispatch(fetchExploreFeed(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

