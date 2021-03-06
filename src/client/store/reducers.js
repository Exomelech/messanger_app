import actions from './actions';
import locales from '../localizations/localization';
import { NativeModules, Platform } from 'react-native';
import { createReducer } from '@reduxjs/toolkit';

//const initialLocale = Platform.OS === 'android' ? NativeModules.I18nManager.localeIdentifier.split('_')[1] : NativeModules.SettingsManager.settings.AppleLocale.split('_')[1];
const initialLocale = 'RU';

const state = {
  user: {},
  locale_state: initialLocale,
  localization: locales[initialLocale],
  backendurl: '192.168.0.104:3000'
};

const reducer = createReducer(state, {
  "USER_LOGIN": (state, action) => {
    const { name, login, id } = action.payload;
    state.user = {
      name,
      login,
      id
    };
  }
});

export default reducer;