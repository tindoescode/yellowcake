import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby';

const SimilarPost = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SimilarPost {
        posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {template: {eq: "SinglePost"}, status: {eq: "Published"}}}, limit: 10) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date
                excerpt
                categories {
                  category
                }
                featuredImage
              }
            }
          }
        }
      }
    `}
    render={data => (<div>
      {
        data.posts.edges.map((value) => {
          return (<div class="SimilarPost--Item"><Link to={value.node.fields.slug}>{value.node.frontmatter.title}</Link></div>)
        })
      }
    </div>)}
  />
)
export default SimilarPost;