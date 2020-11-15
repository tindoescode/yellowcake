import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import { FacebookProvider, Comments } from 'react-facebook'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'
import { Container, Row, Col } from 'cherry-grid'
import RandomPosts from '../components/RandomPosts'

export const SinglePostTemplate = ({
  randomPosts,
  title,
  date,
  body,
  nextPostURL,
  nextPostTitle,
  prevPostURL,
  prevPostTitle,
  slug,
  categories = []
}) => (
  <main className="SinglePost">
    <Container>
      <Row>
        <Col>
          <Link className="SinglePost--BackButton" to="/blog/">
            <ChevronLeft /> BACK
          </Link>
        </Col>
      </Row>
      <Row>
      <Col md={8} xs={12}>
        <article
          className="section light"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <div className="SinglePost--Content relative">
            <div className="SinglePost--Meta">
              {date && (
                <time
                  className="SinglePost--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {date}
                </time>
              )}
              {categories && (
                <Fragment>
                  <span>|</span>
                  {categories.map((cat, index) => (
                    <span
                      key={cat.category}
                      className="SinglePost--Meta--Category"
                    >
                      {cat.category}
                      {/* Add a comma on all but last category */}
                      {index !== categories.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </Fragment>
              )}
            </div>

            {title && (
              <h1 className="SinglePost--Title" itemProp="title">
                {title}
              </h1>
            )}

            <div className="SinglePost--InnerContent">
              <Content source={body} />
            </div>

            <div className="SinglePost--Pagination">
              {prevPostURL && (
                <Link
                  className="SinglePost--Pagination--Link prev"
                  to={prevPostURL}
                >
                  Bài trước: {prevPostTitle}
                </Link>
              )}
              {nextPostURL && (
                <Link
                  className="SinglePost--Pagination--Link next"
                  to={nextPostURL}
                >
                  Bài sau: {nextPostTitle}
                </Link>
              )}
            </div>
          </div>
        </article>
      </Col>
      <Col md={4} xs={12}>
        <Container>
          <section className="section light">
            <div className="SinglePost--Content">
              <div className="SinglePost--InnerContent">
                {/* {console.log(randomPosts)} */}
                {/* <RandomPosts posts={randomPosts} /> */}
              </div>
            </div>
          </section>
        </Container>
      </Col>
      </Row>
      <Container>
        <Row>
          <Col xs={12} md={12}>
          <section>
            <FacebookProvider appId="379335180155337">
              <Comments width="100%" href={slug} />
            </FacebookProvider>
          </section>
          </Col>
        </Row>
      </Container>
    </Container>

  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const randomPosts = allPosts.edges.map(value => value.node)

  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        randomPosts={randomPosts}
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        nextPostTitle={_get(thisEdge, 'next.frontmatter.title')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
        prevPostTitle={_get(thisEdge, 'previous.frontmatter.title')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
        slug
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
