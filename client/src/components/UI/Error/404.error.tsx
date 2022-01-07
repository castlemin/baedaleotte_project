import React from 'react';
import { ReactComponent as ERROR_IMG } from '../../../assets/images/takeout_boxes.svg';
import { ErrorTitle, NoneExistsContainer } from './404.error.styles';
import { HOME_IMG_CONFIG } from '../../../assets/data/homeImgConfig';
const Error404: React.FC = () => {
  return (
    <NoneExistsContainer>
      <ErrorTitle>존재하지 않는 페이지입니다.</ErrorTitle>
      <ERROR_IMG style={HOME_IMG_CONFIG} />
    </NoneExistsContainer>
  );
};

export default Error404;
