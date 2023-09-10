import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { SocialSet } from '@/components/Layouts/Default/components/Footer/components';
import { CircleIcon } from '@/components/Base/CircleIcon';
import { CallAnswerIcon } from '@/components/Vectors/CallAnswerIcon';
import { SVG } from '@/components/Base/SVG';
import { PinIcon } from '@/components/Vectors/PinIcon';
import { MailIcon } from '@/components/Vectors/MailIcon';
import { getContact } from '@/api/shared';
import { useSocialLinks } from '@/api/shared/swr';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { PageWrapper } from '@/components/Base/PageWrapper';
import { useTranslations } from '@/next-intl/useTranslations';
import { getPageOpenGraphs } from '@/api/content';

// eslint-disable-next-line react/prop-types
const ContactItemRenderer = ({ icon, title }) => {
  return (
    <div className="relative md:pl-7-0 pl-12-0">
      <div className="absolute left-0 top-50-percent transform -translate-y-50-percent">{icon}</div>
      <div className="font-rm">{title}</div>
    </div>
  );
};

const iconSet = {
  phone: (
    <CircleIcon className="md:w-4-8 md:h-4-8 w-9-0 h-9-0 bg-green-100">
      <SVG src={CallAnswerIcon} className="md:w-2-0 w-3-3 text-green" />
    </CircleIcon>
  ),
  email: (
    <CircleIcon className="md:w-4-8 md:h-4-8 w-9-0 h-9-0 bg-lightblue-100">
      <SVG src={MailIcon} className="md:w-2-0 w-3-3 text-blue" />
    </CircleIcon>
  ),
  address: (
    <CircleIcon className="md:w-4-8 md:h-4-8 w-9-0 h-9-0 bg-yellow-100">
      <SVG src={PinIcon} className="md:w-2-0 w-3-3 text-yellow" />
    </CircleIcon>
  )
};

const Contact = ({ contact, ogTags }) => {
  const { data: socialLinks } = useSocialLinks();

  useBreadcrumbDispatcher([{ href: '/contact', title: contact.title }]);

  const t = useTranslations();

  return (
    <>
      <PageWrapper
        ogTags={ogTags}
        title={contact.title}
        description={contact.description}
        className="md:border-b border-grey-200"
      />
      <div className="bg-white">
        <div className="contact-info-container md:px-13-0 md:pt-4-2 md:pb-7-2 pb-9-2 md:text-1-8 text-2-8 md:grid md:grid-cols-3">
          <div className="transform -translate-y-5-0 md:hidden text-3-0 font-md px-5-0 pt-1-0">{t('contactUs')}</div>
          <div className="md:px-0 px-5-0 md:border-0 border-t border-b border-grey-200 md:py-0 pb-5-0 pt-7-0">
            <ContactItemRenderer title={t('phoneNumber')} icon={iconSet.phone} />
            <ul className="mt-3-4 md:pl-7-0 pl-12-0 font-lt">
              {contact.phones?.map((x) => (
                <li key={x} className="md:mb-2-0 mb-3-5 last:mb-0">
                  <a className="hover:text-blue duration-150" href={`tel:${x}`}>
                    {x}
                  </a>
                </li>
              ))}
              <li>{`${t('workingHours')}: ${contact.workingHours}`}</li>
            </ul>
          </div>
          <div className="md:pl-10-0 md:pr-0 px-5-0 md:border-b-0 border-b border-grey-200 md:py-0 pb-5-0 pt-7-0">
            <ContactItemRenderer title={t('email')} icon={iconSet.email} />
            <ul className="mt-3-4 md:pl-7-0 pl-12-0 font-lt text-blue-300">
              {contact.emails?.map((x) => (
                <li key={x} className="md:mb-2-0 mb-3-5 last:mb-0">
                  <a className="hover:text-blue duration-150" href={`mailto:${x}`}>
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:pl-15-0 md:pr-0 px-5-0 md:py-0 pb-5-0 pt-7-0">
            <ContactItemRenderer title={t('address')} icon={iconSet.address} />
            <div className="mt-3-4 md:pl-7-0 pl-12-0 font-lt">{contact.address}</div>
          </div>
          <div className="mt-6-5 md:text-1-8 text-2-8 md:col-span-3 md:px-0 px-5-0">
            <div className="font-md">{t('followUs')}</div>
            <div className="md:mt-1-0 mt-2-5 font-lt">{t('contactCopyText')}</div>
            <SocialSet isContact social={socialLinks} className="mt-4-5" />
          </div>
        </div>
      </div>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.object,
  ogTags: PropTypes.object
};

Contact.defaultProps = {
  contact: {},
  ogTags: {}
};

Contact.getInitialProps = async ({ pathname }) => {
  const fetchData = () => Promise.all([getContact(), getPageOpenGraphs(pathname)]);
  const [contact, ogTags] = await fetchData();

  return {
    contact,
    ogTags
  };
};

Contact.getLayout = PageLayout.getLayout();

export default Contact;
