import React, { Component } from 'react';
import defaultImage from './news.png'; // Ensure this path is correct

export class NewsItem extends Component {
    constructor() {
        super();
        this.state = {
            imageError: false
        };
    }

    handleImageError = () => {
        this.setState({ imageError: true });
    }

    render() {
        const { title, description, imageUrl, newsURL, author, date, source } = this.props;
        const { imageError } = this.state;

        // Determine which image URL to use
        const imageSrc = imageError || !imageUrl ? defaultImage : imageUrl;

        return (
            <div className='my-4 mx-3'>
                <div className="card" style={{ width: "100%", maxWidth: "18rem", height: "30rem", position: 'relative' }}>
                    {/* Positioned Badge */}
                    <span className="badge rounded-pill bg-danger" style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
                        {source}
                    </span>
                    <img
                        src={imageSrc}
                        onError={this.handleImageError}
                        className="card-img-top"
                        alt="News"
                        style={{ height: '280px', width: "auto", objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                            </small>
                        </p>
                        <a rel="noreferrer" href={newsURL} target='_blank' className="btn btn-sm btn-primary btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
