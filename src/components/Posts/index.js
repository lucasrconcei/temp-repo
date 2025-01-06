import './style.css';

import { PostCard } from '../PostCard';

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map(post => (
        <PostCard 
            key={post.id} 
            cover={post.cover}
            id={post.id}
            title={post.title}
            body={post.body}
        />
        ))}
    </div>
);