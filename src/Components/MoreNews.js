import React, { Component } from 'react';
import nullImage from "../null-image.jpg";

export class MoreNews extends Component {
    render() {
        let {title, description, imgurl, newsurl, publishedAt, author} = this.props;
        return (
            <>
                <div className="card bg-dark" style={{width: "100%"}}>
                    <img src={imgurl?imgurl:nullImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">{publishedAt}</p>
                            <p className="card-text">{author}</p>
                            <a href={newsurl} target="blank" className="btn btn-dark">Full News</a>
                        </div>
                </div>
            </>
        )
    }
}

export default MoreNews
