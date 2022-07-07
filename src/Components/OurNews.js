import React, { Component } from 'react';
import MoreNews from './MoreNews';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class OurNews extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = this.props.category;
    }


    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        let pasedData = await data.json();
        // console.log(pasedData);
        this.setState({
            articles: pasedData.articles,
            totalResults: pasedData.totalResults,
            // loading: false,
            
        });
        this.props.setProgress(100);
    }


    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2486ba978f724e87b14264f82367c7c6&page=1&pageSize=${this.props.pagesize}`;
        // let data = await fetch(url);
        // let pasedData = await data.json();
        // console.log(pasedData);
        // this.setState({ articles: pasedData.articles,
        //     totalResults: pasedData.totalResults,
        //     loading: false
        // });
        this.updateNews();
    }




    // prevNewsPage = async () => {
    //     // this.setState({loading: true});
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2486ba978f724e87b14264f82367c7c6&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    //     // let data = await fetch(url);
    //     // let pasedData = await data.json();
    //     // this.setState({ articles: pasedData.articles});
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     loading: false
    //     // })  
    //     this.updateNews();
    //     this.setState({ page: this.state.page - 1 });
    // }

    // nextNewsPage = async () => {
    //     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
    //     //     this.setState({loading: true});
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2486ba978f724e87b14264f82367c7c6&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
    //     //     let data = await fetch(url);
    //     //     let pasedData = await data.json();
    //     //     this.setState({loading: false});
    //     //     this.setState({ articles: pasedData.articles });
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         loading: false
    //     //     })
    //     // }
    //     this.updateNews();
    //     this.setState({ page: this.state.page + 1 });
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        let pasedData = await data.json();
        // console.log(pasedData);
        this.setState({
            articles: this.state.articles.concat(pasedData.articles),
            totalResults: pasedData.totalResults,
            loading: false
        });
    }


    render() {
        return (
            <div className='news'>
                <div className="container">
                    <h1 className='my-4 text-center'>Daily News: Top Head Lines on {this.props.category}</h1>
                    {/* {this.state.loading && <Spinner />} */}

                    {/* // loader={<h4>Loading</h4>}> */}
                    <InfiniteScroll
                        loader={<Spinner />}
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return (
                                        <div key={element.url} className="item my-5 col-md-4">
                                            {/* {console.log(element.url)} */}
                                            <MoreNews title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} publishedAt={element.publishedAt} author={element.author} />
                                        </div>);
                                })}
                            </div>
                            {/* {!this.state.loading && this.state.articles.map((element) => {
                            return (
                                <div key={element.url} className="item my-5 col-md-4">
                                    <MoreNews title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} publishedAt={element.publishedAt} author={element.author} />
                                </div>);
                            })} */}
                            {/* <div className="buttons text-center mb-5">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.prevNewsPage} className="btn btn-dark mx-2">Prev</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" onClick={this.nextNewsPage} className="btn btn-dark mx-2">Next</button>
                    </div> */}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default OurNews
