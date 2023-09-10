import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import clsx from 'clsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary } from '../Accordion';
import { DynamicContent } from '../DynamicContent';
import { IconButton } from '../IconButton';
import { SVG } from '../SVG';

const dateFormatter = (date) => dayjs(date).format('DD.MM.YYYY');

const SingleVacancy = (props) => {
  const { className, item, buttonText, email } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion expanded={expanded} className={clsx(className, 'border border-grey-200')}>
      <AccordionSummary
        className="flex md:flex-row flex-col md:items-center pl-11-5 md:pr-4-0 pr-4-8 md:py-3-0 py-4-0 w-full relative hover:bg-body-bg group duration-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="absolute left-4-0 top-4-0 md:top-50-percent transform md:-translate-y-50-percent">
          <IconButton
            className="bg-body-bg md:w-3-0 md:h-3-0 w-4-8 h-4-8 group-hover:bg-grey-200 duration-150"
            onClick={() => setExpanded(!expanded)}
          >
            <SVG
              src={ArrowDownIcon}
              className={clsx({ 'rotate-180': expanded }, 'transform md:w-1-0 w-1-3 duration-200')}
            />
          </IconButton>
        </div>
        <div className="md:flex-1 font-rm md:mr-3-0">
          <div className="md:text-2-0 text-2-6">{item.title}</div>
          <div className="md:text-1-8 text-2-6 mt-1-0 text-grey">
            {`${dateFormatter(item.validFrom)} - ${dateFormatter(item.validTill)}`}{' '}
          </div>
        </div>
        <a
          onClick={(e) => e.stopPropagation()}
          href={`mailto:${email}`}
          target="_blank"
          className="bg-lightblue-100 hover:bg-white border border-lightblue-100 md:ml-auto duration-150 rounded-40-0 flex items-center justify-center font-rm md:text-1-8 text-2-8 md:h-6-0 h-8-0 px-4-0 md:mt-0 mt-5-0"
          rel="noreferrer"
        >
          {buttonText}
        </a>
      </AccordionSummary>
      <AccordionDetails className="border-grey-200 pl-11-5 pr-4-0 pt-3-8 pb-6-0 border-t">
        <DynamicContent description={item.description} />
      </AccordionDetails>
    </Accordion>
  );
};

SingleVacancy.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  buttonText: PropTypes.string,
  email: PropTypes.string
};

SingleVacancy.defaultProps = {
  className: '',
  item: {},
  buttonText: '',
  email: ''
};

export default SingleVacancy;
