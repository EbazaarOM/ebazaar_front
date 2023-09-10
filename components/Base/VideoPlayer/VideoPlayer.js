import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const VideoPlayer = (props) => {
  const { className, url, controls, ...rest } = props;

  return (
    <div className={className}>
      <div className="player-wrapper">
        <ReactPlayer className="react-player" height="100%" width="100%" url={url} controls={controls} {...rest} />
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  controls: PropTypes.bool
};

VideoPlayer.defaultProps = {
  url: '',
  className: '',
  controls: true
};

export default VideoPlayer;
