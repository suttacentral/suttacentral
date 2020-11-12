/*
 This element creates and describes the redux store.
 ---
 Redux introduction: http://redux.js.org/docs/introduction/
 Polymer-redux docs: https://tur-nr.github.io/polymer-redux/
 */
import { compose, createStore } from "redux";
import PolymerRedux from "polymer-redux";

const initialState = {
  currentRoute: {
    name: 'HOME',
    path: '/',
    prefix: '',
    __queryParams: {}
  },
  dialog: undefined,
  siteLanguage: 'en',
  fullSiteLanguageName: 'English',
  toolbarOptions: {
    title: '',
  },
  searchParams: {},
  searchQuery: '',
  suttaText: {},
  suttaMetaText: '',
  textOptions: {
    paragraphsEnabled: false,
    paragraphDescriptions: [],
    segmentedSuttaTextView: 'plain',
    script: 'latin',
    paliLookupActivated: false,
    paliLookupTargetDictRepr: 'None',
    paliLookupTargetLanguage: '',
    chineseLookupActivated: false,
    chineseLookupTargetDictRepr: 'None',
    chineseLookupTargetLanguage: '',
    referenceDisplayType: 'none',
    noteDisplayType: 'asterisk',
    showHighlighting: false
  },
  colorTheme: 'light',
  selectedNavigationMenuItemId: '',
  donationSuccessData: {},
  downloadedUrls: {},
  downloadedPWASettings: {
    languages: {},
    lookups: {
      pali: {},
      chinese: {}
    }
  },
  suttaplexListDisplay: false,
  isOnline: true,
  showedLanguagePrompt: false,
  toolbarTitle: '',
  navigationArray: [
    {
      title: 'Home',
      url: '/',
      type: 'home',
      position: 0,
      navigationArrayLength: 1
    },
  ],
  currentNavPosition: 1,
  displaySettingMenu: false,
  displayToolButton: false,
  displayInfoButton: false,
  displayViewModeButton: true,
  staticPagesToolbarDisplayState: {
    displayFirstToolbar: true,
    displaySecondToolbar: false,
    displayTipitakaToolbar: false,
    displayAcademicToolbar: false,
    displayOrganizationalToolbar: false,
    displayGuidesToolbar: false
  }
};

// The reducer accepts the current state and an action and returns a new state object
// (note that the old state object is unmodified).
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return Object.assign({}, state, { currentRoute: action.route });
    case 'CHANGE_SITE_LANGUAGE':
      return Object.assign({}, state, { siteLanguage: action.language, fullSiteLanguageName: action.fullName });
    case 'CHANGE_TOOLBAR_TITLE':
      return Object.assign({}, state,
        { toolbarOptions: Object.assign({}, state.toolbarOptions, { title: action.title }) });
    case 'SAVE_TOOLBAR_TITLE':
      return Object.assign({}, state, { toolbarTitle: action.toolbarTitle });
    case 'INITIATE_SEARCH':
      return Object.assign({}, state, { searchParams: action.params });
    case 'CHANGE_SEARCH_QUERY':
      return Object.assign({}, state, { searchQuery: action.searchKeyword });
    case 'DOWNLOAD_SUTTA_TEXT':
      return Object.assign({}, state, { suttaText: action.text });
    case 'CHANGE_SUTTA_META_TEXT':
      return Object.assign({}, state, { suttaMetaText: action.metaText });
    case 'DOWNLOAD_PARAGRAPH_DESCRIPTIONS':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { paragraphDescriptions: action.descriptions }) });
    case 'TOGGLE_TEXTUAL_INFORMATION_ENABLED':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { paragraphsEnabled: action.enabled }) });
    case 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { segmentedSuttaTextView: action.view }) });
    case 'CHOOSE_PALI_TEXT_SCRIPT':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { script: action.script }) });
    case 'ACTIVATE_PALI_LOOKUP':
      return Object.assign({}, state, {
        textOptions: Object.assign({}, state.textOptions, {
          paliLookupActivated: action.paliLookupActivated,
          paliLookupTargetLanguage: action.paliLookupTargetLanguage,
          paliLookupTargetDictRepr: action.paliLookupTargetDictRepr
        })
      });
    case 'ACTIVATE_CHINESE_LOOKUP':
      return Object.assign({}, state, {
        textOptions: Object.assign({}, state.textOptions, {
          chineseLookupActivated: action.chineseLookupActivated,
          chineseLookupTargetLanguage: action.chineseLookupTargetLanguage,
          chineseLookupTargetDictRepr: action.chineseLookupTargetDictRepr
        })
      });
    case 'SELECT_NAVIGATION_MENU_ITEM':
      return Object.assign({}, state, { selectedNavigationMenuItemId: action.id });
    case 'CHANGE_COLOR_THEME':
      return Object.assign({}, state, { colorTheme: action.theme });
    case 'CHANGE_DONATION_SUCCESS':
      return Object.assign({}, state, { donationSuccessData: action.donationSuccessData });
    case 'SAVE_DOWNLOADED_URLS':
      return Object.assign({}, state, { downloadedUrls: action.downloadedUrls });
    case 'SAVE_DOWNLOADED_PWA_SETTINGS':
      return Object.assign({}, state, { downloadedPWASettings: action.downloadedPWASettings });
    case 'SUTTPLEX_LIST_DISPLAY':
      return Object.assign({}, state, { suttaplexListDisplay: action.suttaplexdisplay });
    case 'SET_ONLINE_STATUS':
      return Object.assign({}, state, { isOnline: action.isOnline });
    case 'SET_SHOWED_LANGUAGE_PROMPT':
      return Object.assign({}, state, { showedLanguagePrompt: action.showedLanguagePrompt });
    case 'SET_REFERENCE_DISPLAY_TYPE':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { referenceDisplayType: action.referenceDisplayType }) });
    case 'SET_NOTE_DISPLAY_TYPE':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { noteDisplayType: action.noteDisplayType }) });
    case 'SET_SHOW_HIGHLIGHTING':
      return Object.assign({}, state,
        { textOptions: Object.assign({}, state.textOptions, { showHighlighting: action.showHighlighting }) });
    case 'SET_NAVIGATION':
      return Object.assign({}, state, { navigationArray: action.navigationArray });
    case 'CHANGE_DISPLAY_SETTING_MENU_STATE':
      return Object.assign({}, state, { displaySettingMenu: action.displaySettingMenu });
    case 'CHANGE_DISPLAY_TOOL_BUTTON_STATE':
      return Object.assign({}, state, { displayToolButton: action.displayToolButton });
    case 'CHANGE_DISPLAY_INFO_BUTTON_STATE':
      return Object.assign({}, state, { displayInfoButton: action.displayInfoButton });
    case 'CHANGE_DISPLAY_VIEW_MODE_BUTTON_STATE':
      return Object.assign({}, state, { displayViewModeButton: action.displayViewModeButton });
    case 'CHANGE_CURRENT_NAV_POSITION_STATE':
      return Object.assign({}, state, { currentNavPosition: action.currentNavPosition });
    case 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE':
      return Object.assign({}, state, { staticPagesToolbarDisplayState: action.staticPagesToolbarDisplayState });
    default:
      return state;
  }
};

// Before creating the store, check if it's saved in LocalStorage:
const persistedState = localStorage.getItem('reduxState');
const state = persistedState ? parsePersistedState(persistedState) : initialState;

export const store = createStore(
  reducer,
  state,
  // Enable redux dev tools extension:
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : v => v)
);

// Persist the store in localStorage:
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// Helper function
function parsePersistedState(state) {
  const parsedState = JSON.parse(state);
  // Reset some state variables:
  parsedState.selectedNavigationMenuItemId = initialState.selectedNavigationMenuItemId;
  parsedState.toolbarOptions = initialState.toolbarOptions;
  parsedState.donationSuccessData = initialState.donationSuccessData;
  return parsedState;
}

export const ReduxMixin = PolymerRedux(store);
