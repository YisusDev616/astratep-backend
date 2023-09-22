import { createSlice } from '@reduxjs/toolkit';
import { IAfiliate } from '../../interface/Afiliate';

const initialValue = {
  name: '',
  lastName: '',
  grade: '',
  email: '',
  numberPhone: '',
  address: '',
  jobAddress: '',
  position: '',
  antiquity: '',
  preview: '',
};

export const afiliateSlice = createSlice({
  name: 'form',
  initialState: initialValue,
  reducers: {
    updateField: (state, action) => {
      const { field } = action.payload;
      state[field as keyof IAfiliate] = action.payload.value;
    },
    resetForm: (state) => {
      state.name = '';
      state.lastName = '';
      state.grade = '';
      state.email = '';
      state.numberPhone = '';
      state.address = '';
      state.jobAddress = '';
      state.position = '';
      state.antiquity = '';
      state.preview = '';
    },
  },
});

export const { updateField, resetForm } = afiliateSlice.actions;

export default afiliateSlice.reducer;
