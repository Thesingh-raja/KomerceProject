import cartLoading from './JSON/cart-loading.json';
import notfound from './JSON/notfound.json';
import loading from './JSON/loading.json';
import pageLoading from './JSON/pageLoading.json';

export const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: cartLoading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: notfound,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const defaultOptions4 = {
  loop: true,
  autoplay: true,
  animationData: pageLoading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
