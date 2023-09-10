import { Card, CardContent, CardHeader } from '@/components/Base/Card';
import { DynamicContent } from '@/components/Base/DynamicContent';
import { FarmerReviews } from '@/components/Base/FarmerReviews';
import { SVG } from '@/components/Base/SVG';
import { FileIcon } from '@/components/Vectors/FileIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CertificateSection } from './components/CertificateSection';

const FarmerProfile = ({ className, info }) => {
  const t = useTranslations();

  return (
    <div className={clsx(className, '')}>
      {info.text && (
        <Card>
          <CardHeader className="border-b border-grey-200" title={t('aboutFarmer')} />
          <CardContent className="py-4-1">{info.text && <DynamicContent description={info.text} />}</CardContent>
        </Card>
      )}
      {info.certificates && info.certificates.length > 0 && (
        <>
          <Card className="mt-1-3">
            <CardHeader
              className="border-b border-grey-200"
              title={t('certificates')}
              icon={
                <SVG
                  src={FileIcon}
                  className="w-2-0"
                  style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
                />
              }
            />
            <CardContent px="px-0">
              {info.certificates.map((x) => (
                <CertificateSection item={x} key={x.id} className="last:border-b-0 border-b border-grey-200" />
              ))}
            </CardContent>
          </Card>
        </>
      )}
      <FarmerReviews className="mt-4-0" farmerId={info.id} />
    </div>
  );
};

FarmerProfile.propTypes = {
  className: PropTypes.string,
  info: PropTypes.object
};

FarmerProfile.defaultProps = {
  className: '',
  info: {}
};

export default FarmerProfile;
