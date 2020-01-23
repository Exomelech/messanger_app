import actions from './actions';
import locales from '../localizations/localization';
import { NativeModules, Platform } from 'react-native';

let initialLocale = Platform.OS === 'android' ? NativeModules.I18nManager.localeIdentifier.split('_')[1] : NativeModules.SettingsManager.settings.AppleLocale.split('_')[1];

const initialState = {
  login: false,
  locale_state: initialLocale,
  localization: locales[initialLocale],
  backendurl: '31.31.108.255',
  backendport: '3000'
};

function reducer(state = initialState, action) {
  return state;
};

export default reducer;