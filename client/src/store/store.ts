import { atom, selector } from 'recoil';

export const selectedDeliveryCategory = atom({
  key: 'selectedDeliveryCategory',
  default: [],
});

export const selectedEatOutCategory = atom({
  key: 'selectedEatOutCategory',
  default: [],
});

export const itemsPerPage = atom({
  key: 'itemsPerPage',
  default: 5,
});

export const userLocation = atom({
  key: 'userLocation',
  default: {},
});

export const userGu = atom({
  key: 'userGu',
  default: '',
});

export const RegionName = atom({
  key: 'regionName',
  default: '',
});

export const CoronicNumberByGu = atom({
  key: 'coronicNum',
  default: [],
});

export const ThreatScore = atom({
  key: 'threatScore',
  default: '',
});

export const ThreatScoreDetail = atom({
  key: 'threatScoreDetail',
  default: [],
});
