document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-btn');
  const doorLeft = document.getElementById('door-left');
  const doorRight = document.getElementById('door-right');
  const doorView = document.getElementById('door-view');
  const ganpatiWrapper = document.getElementById('ganpati-wrapper');
  const ganpatiBorder = document.getElementById('ganpati-border');
  const ganpatiInnerFrame = document.getElementById('ganpati-inner-frame');
  const headerMantra = document.getElementById('header-mantra');
  const mantraText = document.getElementById('mantra-text');
  const invitationCard = document.getElementById('invitation-card');
  const mapButton = document.getElementById('map-button');
  const bgGlow = document.getElementById('bg-glow');
  const bgm = document.getElementById('bgm');
  const audioToggle = document.getElementById('audio-toggle');
  
  // Language Elements
  const langBtn = document.getElementById('lang-btn');
  const invitationText = document.getElementById('invitation-text');
  const labelDate = document.getElementById('label-date');
  const labelHost = document.getElementById('label-host');
  const labelAddress = document.getElementById('label-address');
  const btnMap = document.getElementById('btn-map');

  let currentLang = 'mr'; // Default: Marathi
  let isPlaying = false;

  // Language Data Dictionary
  const content = {
    mr: {
      mantra: "॥ श्री गणेशाय नमः ॥",
      btnText: "English",
      invitation: "सालाबादप्रमाणे यंदाही आमच्या घरी आपल्या लाडक्या बाप्पाचे दीड दिवसासाठी आगमन होणार आहे. तरी आपण सर्वांनी सहकुटुंब सहपरिवार येऊन दर्शनाचा लाभ घ्यावा!",
      date: "दिनांक : 14.09.2026",
      host: "निमंत्रक: <span class=\"text-yellow-300\">अदिती तटकरे</span>",
      address: "पत्ता: C-34, 1/6, शिव सह्याद्री सोसायटी, सेक्टर 24, जुईनगर,   नवी मुंबई",
      mapBtn: "📍 Google Maps वर रस्ता पहा"
    },
    en: {
      mantra: "|| Shree Ganeshaya Namah ||",
      btnText: "मराठी",
      invitation: "We are delighted to invite you and your family to join us in celebrating Ganesh Chaturthi at our home. This auspicious occasion holds a special place in our hearts, and we would be honored to have your presence grace our festivities.",
      date: "Monday 14th September & Tuesday 15th September",
      host: " <span class=\"text-yellow-300\">Tatkare Family</span>",
      address: "Address: C-34, 1/6, Shiv Sahyadri CHS, Sector 24, Juinagar, Navi Mumbai",
      mapBtn: "📍 View Location on Google Maps"
    }
  };

  // Door Opening Flow
  openBtn.addEventListener('click', () => {
    doorLeft.classList.add('open');
    doorRight.classList.add('open');

    playAudio();
    triggerFlowerShower();

    // Stage 2: Fullscreen Ganesha
    setTimeout(() => {
      doorView.classList.add('opacity-0', 'pointer-events-none');
      bgGlow.classList.remove('opacity-0');
      audioToggle.classList.remove('hidden');

      ganpatiWrapper.classList.remove('opacity-0');
    }, 800);

    // Stage 3: Circle Image & Card Reveal
    setTimeout(() => {
      ganpatiWrapper.classList.remove('ganpati-fullscreen');
      ganpatiWrapper.classList.add('ganpati-circle-state');
      ganpatiBorder.classList.add('circle-frame');
      ganpatiInnerFrame.classList.add('circle-inner-frame');

      setTimeout(() => {
        headerMantra.classList.remove('opacity-0');
        langBtn.classList.remove('opacity-0');
        invitationCard.classList.remove('opacity-0', 'translate-y-6');
        mapButton.classList.remove('opacity-0');
      }, 1000);

    }, 3800);
  });

  // Language Toggle Switcher with Typography Adjustments
  langBtn.addEventListener('click', () => {
    // Fade out text slightly for smooth transition
    invitationCard.classList.add('opacity-50');

    setTimeout(() => {
      currentLang = (currentLang === 'mr') ? 'en' : 'mr';
      const data = content[currentLang];

      mantraText.innerHTML = data.mantra;
      langBtn.innerText = data.btnText;
      invitationText.innerHTML = data.invitation;
      labelDate.innerHTML = data.date;
      labelHost.innerHTML = data.host;
      labelAddress.innerHTML = data.address;
      btnMap.innerHTML = data.mapBtn;

      // Apply smaller font and Lora typography when switched to English
      if (currentLang === 'en') {
        invitationText.classList.remove('font-rozha', 'text-base', 'sm:text-lg');
        invitationText.classList.add('text-english-body');
        mantraText.classList.remove('font-yatra');
        mantraText.classList.add('text-english-title');
      } else {
        invitationText.classList.add('font-rozha', 'text-base', 'sm:text-lg');
        invitationText.classList.remove('text-english-body');
        mantraText.classList.add('font-yatra');
        mantraText.classList.remove('text-english-title');
      }

      // Restore opacity
      invitationCard.classList.remove('opacity-50');
    }, 200);
  });

  // Audio Handler
  function playAudio() {
    bgm.play().then(() => {
      isPlaying = true;
    }).catch(err => {
      console.log('Autoplay prevented or audio file missing:', err);
      isPlaying = false;
    });
  }

  audioToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgm.pause();
      audioToggle.classList.add('opacity-50');
    } else {
      bgm.play();
      audioToggle.classList.remove('opacity-50');
    }
    isPlaying = !isPlaying;
  });

  // Flower Confetti Effect
  function triggerFlowerShower() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    const colors = ['#f59e0b', '#d97706', '#ef4444', '#fef08a'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
});
