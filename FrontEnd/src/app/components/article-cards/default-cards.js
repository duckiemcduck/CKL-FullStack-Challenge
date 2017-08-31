import React from "react";
import { LilRadio } from "../lilradio/lilradio";
export class DefaultCards extends React.Component
{
    constructor(props) 
    {
      super(props);
      this.state = {preloadState: 'loading', articles: [{id:-1, title: "LOADING", slug: "#", author: { name: "LOADING", picture: "#"}, subject: { name: "LOADING", color: "grey" }, hero_image: "#", publish_date: "0/0/0000", text: "LOADING"}],
                    preloadImgDisplay:{visibility:"hidden", width:1, height:1}};
    }
    componentDidMount()
    {
	   this.setState({articles:[{id:-1, title: "LOADING", slug: "#", author: { name: "LOADING", picture: "#"}, subject: { name: "LOADING", color: "grey" }, hero_image: "#", publish_date: "0/0/0000", text: "LOADING"}]});     
       if (this.props.articles)
            this.setState({articles:this.props.articles});  
    };
    
    componentWillReceiveProps(nextProps) {
        this.setState({articles:this.props.articles}); 
    }
    imageLoaded(img)
    {
        //console.log("loaded author image")
        this.setState({preloadState: 'loaded', preloadImgDisplay:{display:"none"}})
    }
    imageFailed(img)
    {
        this.setState({preloadState: 'failed',  preloadImgDisplay:{display:"none"}})
    }
    render()
    {
                /*console.log("Default articles:")
                console.log(this.props.articles)*/
                var defaultArticles =  this.props.articles.map(
                (article, index) =>
                {
                    if (typeof(article) == "undefined")
                    {
                      return(         
                                    <div key={-1} className="default-article">
                                        <div className="default-article-subject" style={ { color: `${"black"}` } }>
                                            {"ERROR"}
                                        </div>
                                        <div className="default-article-content">
                                            {"No Articles Found!"}
                                            {" Please try again in a few moments..."}
                                        </div>
                                    </div>
                        ) 
                    } 
                    else
                    {
                        var subjectStyle = 
                        { 
                            color: `${article.subject.color}` 
                        };
                        var authorBackground =
                        {
                            backgroundImage: `url(${article.author.picture})`, 
                            backgroundPosition: `center`, 
                            backgroundSize: `cover`
                        };
                        return(         
                                        <div key={article.id} className="default-article">
                                            <LilRadio status={this.state.preloadState}/>
                                            <div className="default-article-subject" style={subjectStyle}>
                                                {article.subject.name.toUpperCase()}
                                            </div>
                                            <div className="default-article-content">
                                                <a href={article.slug} target={"_blank"}>
                                                    <p className="default-article-title">{article.title}</p>
                                                </a>
                                                <div className="default-article-author">
                                                    <div className="default-article-author-image" style={ authorBackground }></div>
                                                     <img src={article.author.picture} onLoad={this.imageLoaded.bind(this)} onError={this.imageFailed.bind(this)} style={this.state.preloadImgDisplay} ></img>
                                                    <p className="default-article-author-name" >by {article.author.name}</p>
                                                </div>
                                                <div className="default-article-text">
                                                    {article.text} 
                                                </div>
                                            </div>
                                        </div>
                            ) 
                    }
                })
            
            return (
                    <section id="default-articles">
                        <div id="default-articles-container">
                            {defaultArticles}
                        </div>
                    </section>
                   );
    }
}