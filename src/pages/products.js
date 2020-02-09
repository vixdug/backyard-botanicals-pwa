import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import Img from 'gatsby-image'

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Product = styled.article `
border: 1px solid #e5e5e5;
padding: 1rem;
text-align: center;

&:not(:first-of-type) {
  margin-top: 1rem;
}
}
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
const StyledImg = styled(Img)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
  height: auto;
`

// const Img = styled.img`
//   margin: 0;
// `
const Wrapper = styled.div`
  @media screen and (min-width: 600px) {
    padding-left: 1.5rem;
  }
`

const Title = styled.h2 `
  font-size: 1.5rem;
  margin: 0 0 0.25rem 0;
`
const Price = styled.h3 `
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
`

const Description = styled.p`
  @media screen and (min-width: 600px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

const ProductsPage = ({ data }) => (
  <Layout>
    <h1>Products</h1>
    <ul>
      {data.allShopifyProduct.edges.map(({ node }) => (
        <Container>
          <Product key={node.shopifyId}>
          {node.images.map(image => (
              <StyledImg
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={node.title}
              />
            ))}
            <Wrapper>
              <StyledLink to={`/product/${node.handle}`}>
                <Title>{node.title}</Title>
                <Price>{"$"}{node.priceRange.minVariantPrice.amount}</Price>
              </StyledLink>
              <Description>{node.description}</Description>
            </Wrapper>
          </Product>
        {/* <li key={node.shopifyId}>
          <h3>
            <Link to={`/product/${node.handle}`}>{node.title}</Link>
            {" - "}${node.priceRange.minVariantPrice.amount}
          </h3>
          <p>{node.description}</p>
        </li> */}
        </Container>
      ))}
    </ul>
  </Layout>
)
export default ProductsPage
export const query = graphql`
  {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          title
          shopifyId
          description
          handle
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 290) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`