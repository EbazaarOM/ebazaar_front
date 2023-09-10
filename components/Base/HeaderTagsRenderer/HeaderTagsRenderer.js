import Head from 'next/head';
import PropTypes from 'prop-types';
import useSiteUrl from '@/hooks/useSiteUrl';

const HeaderTagsRenderer = (props) => {
  const { title, metaTitle, description, image, children } = props;

  const siteUrl = useSiteUrl();

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" key="descr" content={description} />}
      {(title || metaTitle) && <meta key="ogTytle" property="og:title" content={metaTitle || title} />}
      {description && <meta key="ogDescr" property="og:description" content={description} />}

      {image && (
        <>
          <meta property="og:image:width" key="ogImageWidth" content="1200" />
          <meta property="og:image:height" key="ogImageHeight" content="630" />
          <meta property="og:image" key="ogImage" content={image} />
        </>
      )}
      <meta property="og:url" key="ogUrl" content={siteUrl} />

      {title && <meta name="twitter:title" key="twitterTitle" content={title} />}
      {description && <meta name="twitter:description" key="twitterDescr" content={description} />}

      {image && <meta name="twitter:image" key="twitterImage" content={image} />}
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0" />

      <link rel="icon" type="image/png" href="/favicon.png" />
      {children}
    </Head>
  );
};

HeaderTagsRenderer.propTypes = {
  title: PropTypes.string,
  metaTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node
};

HeaderTagsRenderer.defaultProps = {
  title: '',
  metaTitle: '',
  description: '',
  image: '',
  children: null
};

export default HeaderTagsRenderer;
