import { useNavigationPages } from '@/api/content/swr';
import { useContact, useSocialLinks } from '@/api/shared/swr';
import { Logo } from '@/components/Base/Logo';
import { SVG } from '@/components/Base/SVG';
import { LeavingstoneIcon } from '@/components/Vectors/LeavingstoneIcon';
import { LeftLeafIcon } from '@/components/Vectors/LeftLeafIcon';
import { RightLeafIcon } from '@/components/Vectors/RightLeafIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { ContactInfo, Navigation, SocialSet } from './components';

const Footer = () => {
  const { data: contactInfo } = useContact();
  const { data: socialLinks } = useSocialLinks();
  const { data: pages } = useNavigationPages();

  const t = useTranslations();

  return (
    <footer className="bg-white relative">
      <div className="container z-1 relative">
        <div className="md:h-10-0 h-15-0 flex items-center">
          <Logo className="md:w-20-0 w-23-2" />
        </div>
        <div className="grid md:grid-cols-4 md:gap-4-0 md:pt-5-0 md:pb-2-5 pb-8-2 md:justify-between">
          <Navigation pages={pages} className="md:col-span-3" />
          <div>
            <div className="font-md md:text-1-6 text-3-0 md:mt-0 mt-4-6">{t('contact')}</div>
            <ContactInfo contactInfo={contactInfo} className="md:mt-3-0 mt-4-0" />
          </div>
          <SocialSet social={socialLinks} className="md:col-span-3 md:row-start-auto row-start-3 md:mt-0 mt-4-0" />
        </div>
        <div className="flex justify-between h-10-0 items-center text-grey font-rm md:text-1-6 text-2-6">
          <span>2021. All rights reserved</span>
          <div className="flex items-center">
            <a
              href="https://www.leavingstone.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-grey hover:text-black duration-200"
            >
              <SVG src={LeavingstoneIcon} className="md:w-6-0 w-10-0 md:mr-1-4" />
              <span className="md:inline hidden">Created by Leavingstone</span>
            </a>
            <span className="pl-4-0 md:inline hidden">2021</span>
          </div>
        </div>
      </div>
      <div className="container relative z-0 md:block hidden">
        <div className="absolute left-0 bottom-0 flex items-end text-body-bg">
          <SVG src={LeftLeafIcon} className="w-26-0 mr-3-6" />
          <SVG src={RightLeafIcon} className="w-36-3" />
        </div>
      </div>
      <span className="absolute top-10-0 left-0 w-full h-0-1 bg-grey-200 z-1 md:inline hidden" />
      <span className="absolute bottom-10-0 left-0 w-full h-0-1 bg-grey-200 z-1" />
    </footer>
  );
};

export default Footer;
