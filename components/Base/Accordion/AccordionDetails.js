import PropTypes from 'prop-types';

const AccordionDetails = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

AccordionDetails.propTypes = {
  children: PropTypes.node
};

AccordionDetails.defaultProps = {
  children: null
};

AccordionDetails.componentName = 'AccordionDetails';

export default AccordionDetails;
