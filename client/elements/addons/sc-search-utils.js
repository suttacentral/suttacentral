export function getBrowserLanguages() {
  const browserLanguages = [];

  if (navigator.languages && navigator.languages.length > 0) {
    browserLanguages.push(...navigator.languages);
  } else if (navigator.language) {
    browserLanguages.push(navigator.language);
  } else if (navigator.userLanguage) {
    browserLanguages.push(navigator.userLanguage);
  }

  return browserLanguages.map(lang => {
    // Convert 'en-US' to 'en', 'zh-CN' to 'zh', etc.
    const normalizedLang = lang.toLowerCase().split('-')[0];
    return {
      full: lang.toLowerCase(),
      short: normalizedLang
    };
  });
}

export function shouldAutoCheckLanguage(languageItem, browserLanguages, siteLanguage) {
  const langUid = languageItem.uid.toLowerCase();

  if (langUid === siteLanguage?.toLowerCase()) {
    return true;
  }

  if (languageItem.is_root) {
    return true;
  }

  for (const browserLang of browserLanguages) {
    if (langUid === browserLang.short) {
      return true;
    }

    if (browserLang.full.startsWith(langUid + '-')) {
      return true;
    }

    if (isChineseLanguageMatch(langUid, browserLang)) {
      return true;
    }
  }

  return false;
}

function isChineseLanguageMatch(langUid, browserLang) {
  const chineseVariants = ['zh', 'zh-cn', 'zh-tw', 'zh-hk', 'zh-sg'];
  const isLangChinese = chineseVariants.some(variant =>
    langUid.includes('zh') || variant.includes(langUid)
  );
  const isBrowserChinese = chineseVariants.some(variant =>
    browserLang.full.includes('zh') || browserLang.short === 'zh'
  );

  return isLangChinese && isBrowserChinese;
}