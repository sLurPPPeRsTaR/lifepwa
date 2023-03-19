import { getProductBanner } from '@cp-module/home/homeAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  getProductBannerResponse: state.home.getProductBannerResponse,
});

const mapDispatchToProps = {
  getProductBanner: (payload) => getProductBanner(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
