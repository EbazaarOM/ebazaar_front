import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary } from '../Accordion';
import { SVG } from '../SVG';

const SingleFaq = (props) => {
  const { className, item } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion expanded={expanded} className={clsx(className, 'border border-grey-200')}>
      <AccordionSummary
        className="flex items-center justify-between md:px-4-0 px-5-0 py-2-8 hover:bg-body-bg group duration-150 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="md:text-1-8 text-2-8 font-rm flex-1 mr-3-0">{item.question}</div>
        <div className="bg-body-bg md:w-3-0 md:h-3-0 w-4-8 h-4-8 rounded-full group-hover:bg-grey-200 duration-150 flex items-center justify-center">
          <SVG
            src={ArrowDownIcon}
            className={clsx({ 'rotate-180': expanded }, 'transform md:w-1-0 w-1-3 duration-200')}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className="border-grey-200 px-4-0 py-3-0 border-t font-lt md:text-1-8 text-2-8">
        {item.answer}
      </AccordionDetails>
    </Accordion>
  );
};

SingleFaq.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

SingleFaq.defaultProps = {
  className: '',
  item: {}
};

export default SingleFaq;
