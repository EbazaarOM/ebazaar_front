import { Checkbox } from '@/components/Base/Checkbox';
import PropTypes from 'prop-types';

const Specifications = ({ specifications, className, onSelect, selectedSpecs }) => {
  const selectHandler = (id) => {
    if (selectedSpecs.indexOf(id) > -1) {
      onSelect(selectedSpecs.filter((x) => x !== id));
    } else {
      onSelect([...selectedSpecs, id]);
    }
  };

  return (
    <div className={className}>
      {specifications?.map((item) => (
        <div className="md:text-1-8 text-3-0 md:mb-3-0 mb-6-0 last:mb-0" key={item.id}>
          <div className="font-md">{item.title}</div>
          <ul className="font-lt mt-2-0 grid md:grid-cols-1 gap-y-1-0 grid-cols-2 gap-4-0">
            {item.specifications?.map((x) => (
              <li
                className="flex items-center cursor-pointer"
                key={x.id}
                aria-hidden
                onClick={() => selectHandler(x.id)}
              >
                <Checkbox size="sm" className="md:mr-1-2 mr-2-0" value={selectedSpecs.indexOf(x.id) > -1} />
                {x.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

Specifications.propTypes = {
  className: PropTypes.string,
  onSelect: PropTypes.func,
  selectedSpecs: PropTypes.array,
  specifications: PropTypes.array
};

Specifications.defaultProps = {
  className: '',
  onSelect: () => {},
  selectedSpecs: [],
  specifications: []
};

export default Specifications;
