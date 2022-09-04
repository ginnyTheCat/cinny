import React from 'react';
import PropTypes from 'prop-types';
import './UrlPreview.scss';

import Text from '../../atoms/text/Text';

function UrlPreview({ data }) {
  return (
    <div className="url-preview">
      <Text variant="b2" className="url-preview__title">{data['og:title']}</Text>
      <Text variant="b3">{data['og:description']}</Text>
    </div>
  );
}

UrlPreview.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default UrlPreview;
