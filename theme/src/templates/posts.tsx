import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Card } from "../components/card"
import { Container, Grid } from "../components/common"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SidebarContent from "../components/sidebar-content"
import Theme from "../styles/theme"
import { Post } from "../utils/models"

interface PostsPageProps {
  pathContext: {
    posts: Post[]
    postsPerPage: number
  }
  location: Location
}

const HomeContainer = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 0.25fr;
  grid-column-gap: 30px;

  @media (max-width: ${Theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`

const PostsContainer = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "latest latest" ". .";
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: -30px;

  @media (max-width: ${Theme.breakpoints.sm}) {
    display: block;
    padding: 0;

    article {
      margin-bottom: 30px;
    }
  }
`

const Sidebar = styled.aside`
  width: 315px;
  padding-top: 30px;

  @media (max-width: ${Theme.breakpoints.xl}) {
    margin: 30px auto;
    border-top: 2px #e5eff5 solid;
    padding: 20px;
    width: 100%;
  }
`

const ArchiveLinkWrapper = styled.div`
  grid-column: 1 / -1;
  text-align: center;
`

const ArchiveLink = styled(Link)`
  font-size: 0.8em;
  padding: 10px;
  border-radius: 0.3em;
  transition: background-color 0.5s;
  background-color: #f2f2f2;

  &:hover {
    background-color: #e6e6e6;
  }
`

const PostsPage: FunctionComponent<PostsPageProps> = ({
  pathContext,
  location,
}) => {
  const posts = pathContext.posts.slice(0, pathContext.postsPerPage)

  return (
    <Layout>
      <SEO location={location} type={`WebSite`} />
      <HomeContainer>
        <PostsContainer>
          {posts.map((post, index) => (
            <Card
              title={post.frontmatter.title}
              path={post.frontmatter.path}
              featuredImage={
                post.frontmatter.featuredImage
                  ? post.frontmatter.featuredImage.childImageSharp
                  : null
              }
              content={post.frontmatter.excerpt}
              key={index}
              meta={{
                time: post.frontmatter.created,
                timePretty: post.frontmatter.createdPretty,
                tag:
                  post.frontmatter.tags.length > 0
                    ? post.frontmatter.tags[0]
                    : null,
              }}
              style={{ gridArea: index === 0 ? "latest" : undefined }}
              halfImage={index === 0}
            />
          ))}
          <ArchiveLinkWrapper>
            <ArchiveLink to={`/archive`}>More posts</ArchiveLink>
          </ArchiveLinkWrapper>
        </PostsContainer>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
      </HomeContainer>
      {/* <TagList /> */}
    </Layout>
  )
}

export default PostsPage
