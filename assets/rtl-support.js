document.addEventListener("DOMContentLoaded", function() {
    const userLang = navigator.language || navigator.userLanguage;
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  
    if (rtlLanguages.includes(userLang.split('-')[0])) {
      document.body.setAttribute('dir', 'rtl');
    }
  });
  