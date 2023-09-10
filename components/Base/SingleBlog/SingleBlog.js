import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslations } from '@/next-intl/useTranslations';
import { CalendarIcon } from '@/components/Vectors/CalendarIcon';
import { Button } from '../Button';
import { RouterLink } from '../RouterLink';
import { SVG } from '../SVG';

const SingleBlog = ({ className, item }) => {
  const t = useTranslations();

  const router = useRouter();

  // mobile only
  const clickHandler = () => {
    if (window.innerWidth <= 768) {
      router.push(`/blogs/${item.slug}`);
    }
  };

  return (
    <div className={clsx(className, 'single-blog')} onClick={clickHandler} aria-hidden>
      <RouterLink href={`/blogs/${item.slug}`}>
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
          alt={item.title}
          width={766}
          height={447}
          objectFit="cover"
          layout="responsive"
        />
      </RouterLink>
      <div className="md:flex items-center justify-between md:mt-3-4 mt-2-8">
        <RouterLink href={`/blogs/${item.slug}`} className="block font-md md:text-2-4 text-3-0 upper">
          {item.title}
        </RouterLink>
        <div className="flex items-center text-grey md:mt-0 mt-2-0">
          <SVG src={CalendarIcon} className="md:w-2-4 w-3-2 md:mr-1-3 mr-2-0" />
          <span className="font-lt md:text-2-0 text-2-6 upper">{dayjs(item.createDate).format('DD.MM.YYYY')}</span>
        </div>
      </div>
      <div className="font-rm md:text-2-0 text-2-6 mt-2-5 w-75-percent">{item.shortDescription}</div>
      <RouterLink href={`/blogs/${item.slug}`} className="md:block hidden">
        <Button className="bg-white mt-3-5 hover:bg-green hover:text-white ml-auto duration-150">{t('seeFull')}</Button>
      </RouterLink>
    </div>
  );
};

SingleBlog.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

SingleBlog.defaultProps = {
  className: '',
  item: {}
};

export default SingleBlog;
