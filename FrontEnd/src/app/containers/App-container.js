import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions/Action-index.js'
import { LilRadio } from "../components/lilradio/lilradio"
import { HeadlineCard } from "../components/article-cards/headline-card.js"
import { FeaturedCards } from "../components/article-cards/featured-cards.js"
import { DefaultCards } from "../components/article-cards/default-cards.js"
import Navbar from '../components/navbar/navbar'
import configureStore from '../store/configureStore'


const store = configureStore()

class App extends React.Component
{
    componentDidMount()
    {
        //console.log("app mounted")
        this.props.actions.fetchSubjects()
        this.props.actions.fetchArticles()
    }
    render()
    {
        return (
                <div id="page_content">
                <section id="page_content">
                      <Navbar subjects={this.props.subjects} changeSubject={this.props.actions.changeSubject}/>
                    <div id="main-container">
                        <div id="first-row">
                            <HeadlineCard articles={[this.props.articles[0]]}/> 
                            <FeaturedCards articles={this.props.articles.slice(1,3)}/> 
                        </div>
                         <div id="second-row">
                            <DefaultCards articles={this.props.articles.slice(3,6)}/> 
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


function mapStateToProps(state)
{
    return{
        articles: state.articles.data,
        subjects: state.subjects.data,
        page: state.page
    };
}

function mapDispatchToProps(dispatch)
{
    return{
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);