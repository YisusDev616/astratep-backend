import { IAfiliateMap } from '../interface/Afiliate';

export const convertAfiliateToFormData = (afiliate: IAfiliateMap): FormData => {
  const formData = new FormData();

  if (afiliate.name) {
    formData.append('name', afiliate.name);
  }

  if (afiliate.lastName) {
    formData.append('lastName', afiliate.lastName);
  }

  if (afiliate.grade) {
    formData.append('grade', afiliate.grade);
  }

  if (afiliate.email) {
    formData.append('email', afiliate.email);
  }

  if (afiliate.numberPhone) {
    formData.append('numberPhone', afiliate.numberPhone);
  }

  if (afiliate.address) {
    formData.append('address', afiliate.address);
  }

  if (afiliate.imageUrl) {
    formData.append('imageUrl', afiliate.imageUrl);
  }

  if (afiliate.jobAddress) {
    formData.append('jobAddress', afiliate.jobAddress);
  }

  if (afiliate.position) {
    formData.append('position', afiliate.position);
  }

  if (afiliate.antiquity) {
    formData.append('antiquity', afiliate.antiquity);
  }

  return formData;
};
