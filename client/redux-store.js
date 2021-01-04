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
    __queryParams: {},
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
    showHighlighting: false,
  },
  colorTheme: 'light',
  selectedNavigationMenuItemId: '',
  donationSuccessData: {},
  downloadedUrls: {},
  downloadedPWASettings: {
    languages: {},
    lookups: {
      pali: {},
      chinese: {},
    },
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
      navigationArrayLength: 1,
    },
  ],
  currentNavPosition: 1,
  displaySettingMenu: false,
  displayToolButton: false,
  displayInfoButton: false,
  displayViewModeButton: true,
  displaySuttaParallels: false,
  displaySuttaInfo: false,
  tableOfContents: {
    items: [],
    disableToCListStyle: false,
  },
  alwaysShowUniversalToolbar: false,
  staticPagesToolbarDisplayState: {
    displayFirstToolbar: true,
    displaySecondToolbar: false,
    displayTipitakaToolbar: false,
    displayAcademicToolbar: false,
    displayOrganizationalToolbar: false,
    displayGuidesToolbar: false,
  },
  navDataCache: {},
};

// The reducer accepts the current state and an action and returns a new state object
// (note that the old state object is unmodified).
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return ({ ...state, currentRoute: action.route });
    case 'CHANGE_SITE_LANGUAGE':
      return ({ ...state, siteLanguage: action.language, fullSiteLanguageName: action.fullName });
    case 'CHANGE_TOOLBAR_TITLE':
      return ({ ...state,  toolbarOptions: ({...state.toolbarOptions, title: action.title }) });
    case 'SAVE_TOOLBAR_TITLE':
      return ({ ...state, toolbarTitle: action.toolbarTitle });
    case 'INITIATE_SEARCH':
      return ({ ...state, searchParams: action.params });
    case 'CHANGE_SEARCH_QUERY':
      return ({ ...state, searchQuery: action.searchKeyword });
    case 'DOWNLOAD_SUTTA_TEXT':
      return ({ ...state, suttaText: action.text });
    case 'CHANGE_SUTTA_META_TEXT':
      return ({ ...state, suttaMetaText: action.metaText });
    case 'DOWNLOAD_PARAGRAPH_DESCRIPTIONS':
      return ({ ...state,  textOptions: ({ ...state.textOptions, paragraphDescriptions: action.descriptions }) });
    case 'TOGGLE_TEXTUAL_INFORMATION_ENABLED':
      return ({ ...state,  textOptions: ({ ...state.textOptions, paragraphsEnabled: action.enabled }) });
    case 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW':
      return ({ ...state,  textOptions: ({ ...state.textOptions, segmentedSuttaTextView: action.view }) });
    case 'CHOOSE_PALI_TEXT_SCRIPT':
      return ({ ...state,  textOptions: ({ ...state.textOptions, script: action.script }) });
    case 'ACTIVATE_PALI_LOOKUP':
      return ({ ...state,
        textOptions: ({
          ...state.textOptions,
          paliLookupActivated: action.paliLookupActivated,
          paliLookupTargetLanguage: action.paliLookupTargetLanguage,
          paliLookupTargetDictRepr: action.paliLookupTargetDictRepr
        })
      });
    case 'ACTIVATE_CHINESE_LOOKUP':
      return ({ ...state,
        textOptions: ({
          ...state.textOptions,
          chineseLookupActivated: action.chineseLookupActivated,
          chineseLookupTargetLanguage: action.chineseLookupTargetLanguage,
          chineseLookupTargetDictRepr: action.chineseLookupTargetDictRepr
        })
      });
    case 'SELECT_NAVIGATION_MENU_ITEM':
      return ({ ...state, selectedNavigationMenuItemId: action.id });
    case 'CHANGE_COLOR_THEME':
      return ({ ...state, colorTheme: action.theme });
    case 'CHANGE_DONATION_SUCCESS':
      return ({ ...state, donationSuccessData: action.donationSuccessData });
    case 'SAVE_DOWNLOADED_URLS':
      return ({ ...state, downloadedUrls: action.downloadedUrls });
    case 'SAVE_DOWNLOADED_PWA_SETTINGS':
      return ({ ...state, downloadedPWASettings: action.downloadedPWASettings });
    case 'SUTTPLEX_LIST_DISPLAY':
      return ({ ...state, suttaplexListDisplay: action.suttaplexdisplay });
    case 'SET_ONLINE_STATUS':
      return ({ ...state, isOnline: action.isOnline });
    case 'SET_SHOWED_LANGUAGE_PROMPT':
      return ({ ...state, showedLanguagePrompt: action.showedLanguagePrompt });
    case 'SET_REFERENCE_DISPLAY_TYPE':
      return ({ ...state,  textOptions: ({ ...state.textOptions, referenceDisplayType: action.referenceDisplayType }) });
    case 'SET_NOTE_DISPLAY_TYPE':
      return ({ ...state,  textOptions: ({ ...state.textOptions, noteDisplayType: action.noteDisplayType }) });
    case 'SET_SHOW_HIGHLIGHTING':
      return ({ ...state,  textOptions: ({ ...state.textOptions, showHighlighting: action.showHighlighting }) });
    case 'SET_NAVIGATION':
      return ({ ...state, navigationArray: action.navigationArray });
    case 'CHANGE_DISPLAY_SETTING_MENU_STATE':
      return ({ ...state, displaySettingMenu: action.displaySettingMenu });
    case 'CHANGE_DISPLAY_TOOL_BUTTON_STATE':
      return ({ ...state, displayToolButton: action.displayToolButton });
    case 'CHANGE_DISPLAY_INFO_BUTTON_STATE':
      return ({ ...state, displayInfoButton: action.displayInfoButton });
    case 'CHANGE_DISPLAY_TOC_BUTTON_STATE':
      return {
        ...state,
        tableOfContents: {
          items: action.payload.tableOfContents,
          disableToCListStyle: action.payload.disableToCListStyle
        }
      };
    case 'CHANGE_DISPLAY_VIEW_MODE_BUTTON_STATE':
      return ({ ...state, displayViewModeButton: action.displayViewModeButton });
    case 'CHANGE_DISPLAY_SUTTA_PARALLELS_STATE':
      return ({ ...state, displaySuttaParallels: action.displaySuttaParallels });
    case 'CHANGE_DISPLAY_SUTTA_TOC_STATE':
      return {...state, displaySuttaToC: action.displaySuttaToC };
    case 'CHANGE_DISPLAY_SUTTA_INFO_STATE':
      return ({ ...state, displaySuttaInfo: action.displaySuttaInfo });
    case 'CHANGE_CURRENT_NAV_POSITION_STATE':
      return ({ ...state, currentNavPosition: action.currentNavPosition });
    case 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE':
      return ({ ...state, staticPagesToolbarDisplayState: action.staticPagesToolbarDisplayState });
    case 'UPDATE_NAV_DATA_CACHE':
      return ({ ...state, navDataCache: action.navDataCache });
    case 'CHANGE_ALWAYS_SHOW_UNIVERSAL_TOOLBAR_STATE':
      return ({ ...state, alwaysShowUniversalToolbar: action.alwaysShowUniversalToolbar });
      case 'CHANGE_LANGUAGE_MENU_VISIBILITY_STATE':
      return Object.assign({}, state, { languageMenuVisibility: action.languageMenuVisibility });
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
  const {selectedNavigationMenuItemId, toolbarOptions, donationSuccessData, tableOfContents} = initialState;

  return {
    ...initialState,
    ...parsedState,
    // Reset some state variables:
    selectedNavigationMenuItemId,
    toolbarOptions,
    donationSuccessData,
    tableOfContents
  };
}

export const ReduxMixin = PolymerRedux(store);
