import './style.css';

import { Component, useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePost = (page + postsPerPage) >= allPosts.length;

  const filteredPosts = !! searchValue ? 
  allPosts.filter(post => {
    return post.title.toUpperCase().includes(searchValue.toUpperCase());
  }) :
  posts;

  const  handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();   

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (evt) => {
    const {value} = evt.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1>Busca: {searchValue}</h1>
        )} 
        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )} 
      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )} 
      {!searchValue && (
        <div className="button-container">
          <Button 
            text="Carrega"
            onClick={loadMorePosts} // Não é o evento e sim um atributo sendo passado
            disabled={noMorePost}
          />
        </div>
      )}
    </section>
  );
}

/* class Home2 extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10, 
    searchValue: ""
  };

  async componentDidMount() {
     await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();   
    this.setState({
       posts: postsAndPhotos.slice(page, postsPerPage), 
       allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts, 
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  handleChange = (evt) => {
    const {value} = evt.target;
    this.setState({searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePost = (page + postsPerPage) >= allPosts.length;

    const filteredPosts = !!searchValue ? 
                            allPosts.filter(post => {
                              return post.title.toUpperCase().includes(searchValue.toUpperCase());
                            }) : 
                            posts;
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Busca: {searchValue}</h1>
          )} 
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )} 
        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )} 
        {!searchValue && (
          <div className="button-container">
            <Button 
              text="Carrega"
              onClick={this.loadMorePosts} // Não é o evento e sim um atributo sendo passado
              disabled={noMorePost}
            />
          </div>
        )}
      </section>
    );
  }
}
 */
export default Home;