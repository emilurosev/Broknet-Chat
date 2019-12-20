import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Button from '@material-ui/core/Button';

class News extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        articles: [], 
        showAll: false,
        article: {}
      };
      this.showAll = this.showAll.bind(this);
    }
  
    componentDidMount() {
      fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9a8d3875e245467fadd7638114c4395f")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              articles: result.articles,
              showAll: true,
              article: {}
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error, 
            });
          }
        )
    }

    handleClick(a) {
      console.log(a);
      this.setState(prevState => (
        {
          articles: prevState.articles,
          showAll: !prevState.showAll, 
          article: a
        }
      ));
    }

    showAll() {
      this.setState(prevState => (
        {
          articles: prevState.articles,
          showAll: !prevState.showAll,
          article: {}
        }
      ));
    }

    

    content() {
      if(this.state.showAll) {
        return this.state.articles.map(article => (
          <div key={article.id} onClick={() => this.handleClick(article)}>
            <NewsCard item={article}/>
          </div>
        ));
      }
      else {
        return <NewsCard item={this.state.article} />
      }
    }

    showButton() {
      if(!this.state.showAll) {
        return <Button variant="contained" color="secondary" onClick={this.showAll}>
          Prikazi sve
        </Button>
      } 
    }
  
    render() {
      const { error, isLoaded } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (  
          <div>
            {this.showButton()}
            {this.content()}  
          </div>   
        );
      }
    }
  }
  
  export default News;