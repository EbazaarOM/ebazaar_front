import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_DURATION = 0.5;

const Accordion = (props) => {
  const { expanded, children: childrenProp, className, duration } = props;
  const childrenPropToArray = React.Children.toArray(childrenProp);
  const AccordionSummary = childrenPropToArray.find((child) => child.type.componentName === 'AccordionSummary');
  const AccordionDetails = childrenPropToArray.find((child) => child.type.componentName === 'AccordionDetails');

  return (
    <div className={className}>
      {AccordionSummary}

      <AnimatePresence>
        {expanded && (
          <motion.section
            className="overflow-hidden"
            initial={{ height: '0' }}
            animate={{ height: 'auto' }}
            exit={{ height: '0' }}
            transition={{ duration }}
          >
            {AccordionDetails}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

Accordion.propTypes = {
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number
};

Accordion.defaultProps = {
  children: null,
  className: '',
  duration: DEFAULT_DURATION
};

export default Accordion;
