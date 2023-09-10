import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Image from 'next/image';

const AnimatedImage = ({ className, src, itemKey }) => {
  return (
    <div className={clsx(className, 'h-full relative overflow-hidden')}>
      <AnimatePresence>
        <motion.div
          className="print:hidden absolute inset-0 overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          key={itemKey}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ x: '-100%', scale: 1.3 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: '100%', scale: 1.3 }}
            transition={{ duration: 1 }}
            className="w-full h-full rounded-base relative"
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={src}
              alt=""
              className="absolute w-full h-full"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

AnimatedImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

AnimatedImage.defaultProps = {
  className: '',
  src: '',
  itemKey: -1
};

export default AnimatedImage;
