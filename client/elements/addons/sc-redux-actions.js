import { store } from '../../redux-store';

export class reduxActions {
  static setShowHighlighting(showHighlighting) {
    store.dispatch({
      type: 'SET_SHOW_HIGHLIGHTING',
      showHighlighting,
    });
  }

  static setReferenceDisplayType(displayedReferences) {
    store.dispatch({
      type: 'SET_REFERENCE_DISPLAY_TYPE_ARRAY',
      displayedReferences,
    });
  }

  static setNoteDisplayType(noteDisplayType) {
    store.dispatch({
      type: 'SET_NOTE_DISPLAY_TYPE',
      noteDisplayType,
    });
  }

  static chooseSegmentedSuttaTextView(view) {
    store.dispatch({
      type: 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW',
      view,
    });
  }

  static choosePaliTextScript(script) {
    store.dispatch({
      type: 'CHOOSE_PALI_TEXT_SCRIPT',
      script,
    });
  }

  static changeToolbarPosition(toolbarPosition) {
    store.dispatch({
      type: 'CHANGE_TOOLBAR_POSITION',
      toolbarPosition,
    });
  }

  static changeLanguage(language, fullName) {
    store.dispatch({
      type: 'CHANGE_SITE_LANGUAGE',
      language,
      fullName,
    });
  }

  static changeToolbarTitle(title) {
    store.dispatch({
      type: 'CHANGE_TOOLBAR_TITLE',
      title,
    });
  }

  static changeCurrentEditionId(currentEditionId) {
    store.dispatch({
      type: 'CHANGE_CURRENT_EDITION_ID',
      currentEditionId,
    });
  }

  static changeCurrentEditionHomeInfo(currentEditionHomeInfo) {
    store.dispatch({
      type: 'CHANGE_CURRENT_EDITION_HOME_INFO',
      currentEditionHomeInfo,
    });
  }

  static changeDisplaySearchOptionsButtonState(displaySearchOptionsButton) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_SEARCH_OPTIONS_BUTTON_STATE',
      displaySearchOptionsButton,
    });
  }

  static setSearchDisplayLanguage(displayedLanguages) {
    store.dispatch({
      type: 'SET_SEARCH_DISPLAY_LANGUAGES_ARRAY',
      displayedLanguages,
    });
  }

  static setSearchMatchType(matchPartial) {
    store.dispatch({
      type: 'SET_SEARCH_MATCH_TYPE',
      matchPartial,
    });
  }

  static changeLinearProgressActiveState(active) {
    store.dispatch({
      type: 'CHANGE_LINEAR_PROGRESS_ACTIVE_STATE',
      linearProgressActive: active,
    });
  }

  static setInstantSearchLastUpdatedDate(lastUpdatedDate) {
    store.dispatch({
      type: 'SET_INSTANT_SEARCH_DATA_LAST_UPDATED_DATE',
      lastUpdatedDate,
    });
  }

  static setInstantSearchData(instantSearchData) {
    store.dispatch({
      type: 'SET_INSTANT_SEARCH_DATA',
      instantSearchData,
    });
  }

  static setInstantSearchDataLanguage(language) {
    store.dispatch({
      type: 'SET_INSTANT_SEARCH_DATA_LANGUAGE',
      language,
    });
  }

  static changeLanguageMenuVisibility(visibility) {
    store.dispatch({
      type: 'CHANGE_LANGUAGE_MENU_VISIBILITY_STATE',
      languageMenuVisibility: visibility,
    });
  }

  static changeDonationBannerDisplayState(displayDonationBanner) {
    store.dispatch({
      type: 'CHANGE_DONATION_BANNER_STATE',
      displayDonationBanner: displayDonationBanner,
    });
  }

  static changeTemporarySiteLanguage(temporarySiteLanguage) {
    store.dispatch({
      type: 'CHANGE_TEMPORARY_SITE_LANGUAGE',
      temporarySiteLanguage,
    });
  }

  static changeFirstLoadState(firstLoad) {
    store.dispatch({
      type: 'CHANGE_FIRST_LOAD_STATE',
      firstLoad,
    });
  }

  static toggleSuttaplexDisplay(suttaplexdisplay) {
    store.dispatch({
      type: 'SUTTPLEX_LIST_DISPLAY',
      suttaplexdisplay,
    });
  }

  static changeDisplaySettingMenuState(display) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
      displaySettingMenu: display,
    });
  }

  static changeDisplaySuttaParallelsState(displayState) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_SUTTA_PARALLELS_STATE',
      displaySuttaParallels: displayState,
    });
  }

  static changeDisplaySuttaToCState(displayState) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_SUTTA_TOC_STATE',
      displaySuttaToC: displayState,
    });
  }

  static showToc(tableOfContents) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_TOC_BUTTON_STATE',
      payload: {
        tableOfContents,
        disableToCListStyle: false,
      },
    });
  }

  static changeDisplaySuttaInfoState(displayState) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_SUTTA_INFO_STATE',
      displaySuttaInfo: displayState,
    });
  }

  static changeDisplayParallelTableViewState(displayState) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_PARALLEL_TABLE_VIEW_STATE',
      displayParallelTableView: displayState,
    });
  }

  static setOnlineStatus(isOnline) {
    store.dispatch({
      type: 'SET_ONLINE_STATUS',
      isOnline,
    });
  }

  static setNavigation(navArray) {
    store.dispatch({
      type: 'SET_NAVIGATION',
      navigationArray: navArray,
    });
  }

  static initiateSearch(params) {
    store.dispatch({
      type: 'INITIATE_SEARCH',
      params,
    });
  }

  static changeDisplayChineseConverterState(displayChineseConverterButton) {
    store.dispatch({
      type: 'CHANGE_DISPLAY_CHINESE_CONVERTER_BUTTON_STATE',
      displayChineseConverterButton,
    });
  }

  static changeShowIllustrationsState(showIllustrations) {
    store.dispatch({
      type: 'SET_SHOW_ILLUSTRATIONS',
      showIllustrations,
    });
  }
}
