const btn=document.querySelector("#themeCheckbox"),prefersDarkScheme=window.matchMedia("(prefers-color-scheme: dark)"),currentTheme=localStorage.getItem("theme");"dark"==currentTheme?(document.body.classList.toggle("dark-theme"),btn.checked=!0):"light"==currentTheme&&(document.body.classList.toggle("light-theme"),btn.checked=!1),btn.addEventListener("click",(function(){if(prefersDarkScheme.matches){document.body.classList.toggle("light-theme");var e=document.body.classList.contains("light-theme")?"light":"dark"}else{document.body.classList.toggle("dark-theme");e=document.body.classList.contains("dark-theme")?"dark":"light"}localStorage.setItem("theme",e)})),btn.checked="dark"==currentTheme;
