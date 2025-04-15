import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: 4,
  addBank: false,
  showLoginModal: false,
  showRegisterModal: false,
  showForgotPasswordModal: false,
  selectedCategory: "ALL",
  showLanguageModal: false,
  showNotification: true,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setAddBank: (state, action) => {
      state.addBank = action.payload;
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload;
    },
    setShowForgotPasswordModal: (state, action) => {
      state.showForgotPasswordModal = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setShowLanguageModal: (state, action) => {
      state.showLanguageModal = action.payload;
    },
    setShowNotification: (state, action) => {
      state.showNotification = action.payload;
    },
  },
});

export const {
  setGroup,
  setAddBank,
  setShowLoginModal,
  setShowForgotPasswordModal,
  setShowRegisterModal,
  setSelectedCategory,
  setShowLanguageModal,
  setShowNotification,
} = stateSlice.actions;

export default stateSlice.reducer;
