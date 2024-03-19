import { TailSpin } from 'react-loader-spinner';

const loaderStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const Loader = () => {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="rgba(200, 134, 255, 0.66)"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={loaderStyle}
    />
  );
};
