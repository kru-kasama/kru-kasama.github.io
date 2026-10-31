/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SAVED PREFERENCES =====*/
const getPreference = key =>{
    try{
        return localStorage.getItem(key)
    }catch(e){
        return null
    }
}

const setPreference = (key, value) =>{
    try{
        localStorage.setItem(key, value)
    }catch(e){}
}

/*===== LANGUAGE =====*/
// Thai is written in the HTML, English comes from the data-en* attributes
const textItems = document.querySelectorAll('[data-en]'),
      labelItems = document.querySelectorAll('[data-en-label]')

textItems.forEach(item => item.dataset.th = item.textContent)
labelItems.forEach(item => item.dataset.thLabel = item.getAttribute('aria-label'))

const setLanguage = lang =>{
    const isEnglish = lang === 'en'

    document.documentElement.lang = lang
    textItems.forEach(item => item.textContent = isEnglish ? item.dataset.en : item.dataset.th)
    labelItems.forEach(item => item.setAttribute('aria-label', isEnglish ? item.dataset.enLabel : item.dataset.thLabel))
}

document.getElementById('lang-toggle').addEventListener('click', () =>{
    const lang = document.documentElement.lang === 'en' ? 'th' : 'en'

    setLanguage(lang)
    setPreference('lang', lang)
})

if(getPreference('lang') === 'en'){
    setLanguage('en')
}

/*===== FONT SIZE =====*/
const fontScales = [90, 100, 110, 125, 140],
      fontDecrease = document.getElementById('font-decrease'),
      fontIncrease = document.getElementById('font-increase')

let fontScale = fontScales.indexOf(Number(getPreference('fontScale')))
if(fontScale === -1) fontScale = fontScales.indexOf(125)

const applyFontScale = () =>{
    // Percentages keep the size the visitor chose in their browser as the base
    document.documentElement.style.fontSize = fontScales[fontScale] + '%'
    fontDecrease.disabled = fontScale === 0
    fontIncrease.disabled = fontScale === fontScales.length - 1
}

const changeFontScale = step =>{
    fontScale += step
    applyFontScale()
    setPreference('fontScale', fontScales[fontScale])
}

fontDecrease.addEventListener('click', () => changeFontScale(-1))
fontIncrease.addEventListener('click', () => changeFontScale(1))
applyFontScale()

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__empty, .contact__text, .contact__email',{interval: 200}); 
