import { SVG } from '@/components/Base/SVG';
import { FileIcon } from '@/components/Vectors/FileIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CertificateSection = ({ className, item }) => {
  return (
    <div className={clsx(className, 'md:pt-4-6 pb-2-0 md:px-5-0 p-4-0')}>
      <div className="relative flex items-center">
        <div className="md:w-4-8 md:h-4-8 w-8-7 h-8-7 relative mr-3-0">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
            alt="Gallery"
            loading="eager"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="font-md md:text-1-8 text-3-0 md:ml-0 ml-2-0">{item.title}</div>
      </div>
      <ul className="flex-1 flex flex-wrap font-lt md:text-1-6 text-3-0 mt-4-0">
        {item.certificates?.map((x) => (
          <li className="mr-5-0 mb-2-0" key={x.id}>
            <a
              href={process.env.STATIC_RESOURCES_URL.concat(x.file)}
              target="_blank"
              className="flex items-center group"
              rel="noreferrer"
            >
              <SVG
                className="md:w-1-5 w-2-4 md:mr-1-3 mr-2-0 text-grey-200 group-hover:text-black duration-200"
                src={FileIcon}
              />
              <span className="flex-1">{x.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

CertificateSection.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

CertificateSection.defaultProps = {
  className: '',
  item: {}
};

export default CertificateSection;
