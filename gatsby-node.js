const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions


    if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        console.log(`\n`, fileNode.relativePath)
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
          node,
          name: `slug`,
          value: slug,
        })
    }
}


exports.createPages = ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    
    const { createPage } = actions

    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(JSON.stringify(result, null, 4))
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
    })
  }

//   In this part of the tutorial, you’ve learned the foundations of building with Gatsby’s data layer. You’ve learned how to source and transform data using plugins, how to use GraphQL to map data to pages, and then how to build page template components where you query for data for each page.