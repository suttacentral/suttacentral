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
}
