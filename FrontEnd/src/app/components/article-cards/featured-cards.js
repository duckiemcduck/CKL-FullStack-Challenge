import React from "react";
import { LilRadio } from "../lilradio/lilradio";
export class FeaturedCards extends React.Component
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
        //console.log("loaded featured card image")
        this.setState({preloadState: 'loaded', preloadImgDisplay:{display:"none"}})
    }
    imageFailed(img)
    {
        this.setState({preloadState: 'failed',  preloadImgDisplay:{display:"none"}})
    }

    render()
    {
                /*console.log("Featured articles:")
                console.log(this.props.articles)*/
                var featuredArticles =  this.props.articles.map(
                (article, index) =>
                {
                    if (typeof(article) == "undefined")
                    {
                      return(         
                                    <div key={-1} className="featured-article">
                                        <div className="featured-article-subject" style={ { color: `${"black"}` } }>
                                            {"ERROR"}
                                        </div>
                                        <div className="featured-article-content">
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

                        var heroBackground =
                        {
                            backgroundImage: `url(${article.hero_image})`, 
                            backgroundPosition: `center`, 
                            backgroundSize: `cover`
                        };
                        var authorBackground =
                        {
                            backgroundImage: `url(${article.author.picture})`, 
                            backgroundPosition: `center`, 
                            backgroundSize: `cover`
                        };
                        return(         
                                        <div key={article.id} className="featured-article">
                                            <LilRadio status={this.state.preloadState}/>
                                            <div className="featured-article-subject" style={subjectStyle}>
                                                {article.subject.name.toUpperCase()}
                                            </div>
                                            <div className="featured-article-content">
                                                <a href={article.slug} target={"_blank"}>
                                                    <div className="featured-article-hero-image" style={ heroBackground }>
                                                        <img src={article.hero_image} onLoad={this.imageLoaded.bind(this)} onError={this.imageFailed.bind(this)} style={this.state.preloadImgDisplay} ></img>
                                                        <div className="featured-article-slugger"><div>Read More</div></div>
                                                    </div>
                                                    <p className="featured-article-title">{article.title}</p>
                                                </a>
                                                <div className="featured-article-author">
                                                    <div className="featured-article-author-image" style={ authorBackground }></div>
                                                    <p className="featured-article-author-name" >by {article.author.name}</p>
                                                </div>
                                                <div className="featured-article-text">
                                                    {article.text} 
                                                </div>
                                            </div>
                                        </div>
                            ) 
                    }
                })
            
            return (
                    <section id="featured-articles">
                        <div id="featured-articles-container">
                            {featuredArticles}
                        </div>
                    </section>
                   );
    }
}