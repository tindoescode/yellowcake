import { Link } from 'gatsby'
import React from 'react'
import './RandomPosts.scss'

const RandomPosts = ({posts}) => {
    return (<div className="RandomPosts">
        {posts.map(post => <div className="RandomPosts--Item">
            {/* <div className="RandomPosts--Thumbnail"> */}
                {/* <Image 
                    src={post.frontmatter.featuredImage}
                    alt={post.frontmatter.title}
                /> */}
            {/* </div> */}
            <div className="RandomPosts--ItemInfo">
                <Link to={post.fields.slug}>
                    {post.frontmatter.title}
                </Link>
            </div>
        </div>)}
    </div>)
}

export default RandomPosts;