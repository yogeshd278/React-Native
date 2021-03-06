import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}> */}
                    <header className="site-head">
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        <span className="site-banner-title">{site.title}</span>
                                        {/* {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        } */}
                                    </Link>
                                </div>
                                {/* <div className="site-mast-right">
                                    { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                                    { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
                                </div> */}

                                <nav className="site-nav">
                                    <div className="site-nav-left">
                                        <Navigation data={site.navigation} navClass="site-nav-item" />
                                        {/* <Link className="site-nav-button" to="/">Home</Link>
                                        <Link className="site-nav-button" to="/tag/getting-started">Tag</Link>
                                        <Link className="site-nav-button" to="/author/ghost">Author</Link> */}
                                    </div>
                                    <div className="site-nav-right">
                                        <Link className="site-nav-button" to="/about">About</Link>
                                    </div>
                                </nav>

                            </div>
                            
                        </div>
                    </header>

                    <main className="site-main">
                        {/* { isHome ?
                            <div className="site-banner" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
                                <h1 className="site-banner-title">{site.title}</h1>
                                <p className="site-banner-desc">{site.description}</p>
                            </div> :
                            null
                        } */}

                        {/* All the main content gets inserted here, index.js, post.js */}
                        <div style={{ paddingTop:"20px" }}>
                            {children}
                        </div>
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> ?? 2021 &mdash; Published with <a className="site-foot-nav-item" href="https://revermonk.in" target="_blank" rel="noopener noreferrer">ReverMonk.in</a>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
