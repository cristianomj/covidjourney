import React, { forwardRef, useMemo } from "react";
import PropTypes from 'prop-types';
import MuiLink from '@material-ui/core/Link';
import { Link as LinkDom } from 'react-router-dom';

function Link(props) {
  const { href, children } = props;

  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => (
          <LinkDom ref={ref} to={href} {...linkProps} />
      )),
    [href],
  );

  return (
      <MuiLink {...props} component={CustomLink}>{children}</MuiLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
