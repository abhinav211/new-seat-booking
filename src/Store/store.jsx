// src/Store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const initialState = {
  selectedCountry: null,
  selectedLocation: null,
  selectedFloor: null,
  selectedRoom: null,
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  bookedSeats: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.selectedLocation = null;
      state.selectedFloor = null;
      state.selectedRoom = null;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
      state.selectedFloor = null;
      state.selectedRoom = null;
    },
    setSelectedFloor: (state, action) => {
      state.selectedFloor = action.payload;
      state.selectedRoom = null;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload ? format(new Date(action.payload), 'yyyy-MM-dd') : null;
    },
    setBookedSeats: (state, action) => {
      state.bookedSeats = action.payload;
    },
  },
});

export const {
  setSelectedCountry,
  setSelectedLocation,
  setSelectedFloor,
  setSelectedRoom,
  setSelectedDate,
  setBookedSeats,
} = bookingSlice.actions;

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, bookingSlice.reducer);

const store = configureStore({
  reducer: {
    booking: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
