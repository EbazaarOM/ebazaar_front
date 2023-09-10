import PropTypes from 'prop-types';

const AccordionSummary = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

AccordionSummary.propTypes = {
  children: PropTypes.node
};

AccordionSummary.defaultProps = {
  children: null
};

AccordionSummary.componentName = 'AccordionSummary';
export default AccordionSummary;
