import PropTypes from 'prop-types';
import Image from 'next/image';

const SingleTeamMember = (props) => {
  const { className, item } = props;

  return (
    <div className={className}>
      <Image
        src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
        alt={item.title}
        width={410}
        height={457}
        loading="eager"
      />
      <div className="mt-2-0 md:text-2-0 text-3-0 font-md upper">{`${item.firstName} ${item.lastName}`}</div>
      <div className="mt-1-5 md:text-1-8 text-2-6 font-rm">{item.position}</div>
    </div>
  );
};

SingleTeamMember.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
};

SingleTeamMember.defaultProps = {
  className: '',
  item: {}
};

export default SingleTeamMember;
