import { Accordion, AccordionDetails, AccordionSummary } from '@/components/Base/Accordion';
import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import useResize from '@/hooks/useResize';
import { useTranslations } from '@/next-intl/useTranslations';
import { pageCategories } from '@/utils/constants/pageCategories';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const List = ({ pages, className }) => (
  <ul className={clsx(className, 'font-rm')}>
    {pages &&
      pages.map((x) => (
        <li className="mb-1-5 w-mc max-w-full" key={x.id}>
          <RouterLink
            className="text-grey-600 hover:text-black duration-200 cursor-pointer block"
            href={x.localPath ? x.localPath : `/page/${encodeURIComponent(x.slug)}`}
          >
            {x.title}
          </RouterLink>
        </li>
      ))}
  </ul>
);

List.propTypes = {
  pages: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string
};

List.defaultProps = {
  className: ''
};

const Line = () => (
  <div
    style={{ width: 'calc(100% + 10rem)' }}
    className="md:hidden absolute h-0-1 bg-grey-200 left-0 bottom-0 transform -translate-x-5-0"
  />
);

const Navigation = ({ pages, className }) => {
  const informational = pages.filter((x) => x.pageCategory === pageCategories.INFORMATION);
  const company = pages.filter((x) => x.pageCategory === pageCategories.COMPANY);

  const [companyExpanded, setCompanyExpanded] = React.useState(false);
  const [informationalExpanded, setInformationalExpanded] = React.useState(false);
  const t = useTranslations();

  const { width } = useResize();

  const isDesktop = width === 0 || width > 768;

  return (
    <div className={clsx(className, 'md:grid md:grid-cols-3 gap-x-5-0 font-md md:text-1-6 text-3-0 footer-navigation')}>
      <Accordion className="relative" expanded={isDesktop || companyExpanded}>
        <AccordionSummary onClick={() => setCompanyExpanded(!companyExpanded)}>
          <div className="md:pb-3-0 pb-4-6 flex justify-between items-center">
            {t('company')}
            <SVG
              src={ArrowDownIcon}
              className={clsx({ 'rotate-180': companyExpanded }, 'w-2-1 md:hidden transform duration-200')}
            />
          </div>
          <Line />
        </AccordionSummary>
        <AccordionDetails>
          <List pages={company} />
        </AccordionDetails>
      </Accordion>
      <Accordion className="md:col-span-2 md:mt-0 mt-4-6 relative" expanded={isDesktop || informationalExpanded}>
        <AccordionSummary onClick={() => setInformationalExpanded(!informationalExpanded)}>
          <div className="md:pb-3-0 pb-4-6 flex justify-between items-center">
            {t('information')}
            <SVG
              src={ArrowDownIcon}
              className={clsx({ 'rotate-180': informationalExpanded }, 'w-2-1 md:hidden transform duration-200')}
            />
          </div>
          <Line />
        </AccordionSummary>
        <AccordionDetails>
          <List className="grid md:grid-cols-2 gap-x-5-0" pages={informational} />
        </AccordionDetails>
      </Accordion>
      <style jsx global>{`
        @media only screen and (min-width: 769px) {
          .footer-navigation section {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

Navigation.propTypes = {
  pages: PropTypes.instanceOf(Array),
  className: PropTypes.string
};

Navigation.defaultProps = {
  pages: [],
  className: ''
};

export default Navigation;
