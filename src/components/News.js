import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

   capitalFirst = (string) => {
     return string.charAt(0).toUpperCase () + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1, // Initialize page state
      totalArticles: 0 // Initialize totalArticles state
    };
    document.title= `${ this.capitalFirst(this.props.category)} - Newsmon `
  }

  async updateNews(){
    console.log("componentDidMount");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=92904ac344e84218a9d51777d9349954`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults
    });
  }

  async componentDidMount() {
    // console.log("componentDidMount");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}&apiKey=92904ac344e84218a9d51777d9349954`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalArticles: parsedData.totalResults
    // });
    this.updateNews();
  }

  handleNextClick = async () => {
    // console.log("Next");
    // const { page, totalArticles } = this.state;
    // const totalPages = Math.ceil(totalArticles / this.props.pageSize);

    // if (page < totalPages) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${page + 1}&pageSize=${this.props.pageSize}&apiKey=92904ac344e84218a9d51777d9349954`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: page + 1,
    //     articles: parsedData.articles
    //   });
    // }
    this.setState({page: this.state.page + 1});
      this.updateNews();
    
  }

  handlePrevClick = async () => {
    // const { page } = this.state;
    // if (page > 1) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${page - 1}&pageSize=${this.props.pageSize}&apiKey=92904ac344e84218a9d51777d9349954`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: page - 1,
    //     articles: parsedData.articles
    //   });
    // }
    this.setState({page: this.state.page - 1});
      this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '35px 0' }}>Newsmon - Top Headlines from { this.capitalFirst(this.props.category)} </h1>
        <div className="row">
          {this.state.articles && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ''}
                imageUrl={element.urlToImage}
                newsURL={element.url}
                author= {element.author}
                date= {element.publishedAt}
                source= {element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
