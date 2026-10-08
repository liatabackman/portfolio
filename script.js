const projects = [
  {
    page: 2,
    title: 'The Refinery29 Lookbook',
    brand: 'Refinery29 Lookbook',
    role: 'Creative direction, filming (iPhone), edit',
    clips: ['Beauty in conversation', 'An eye for the details', 'Behind the look']
  },
  {
    page: 3,
    title: 'In the room. On the feed.',
    brand: 'Social video · Refinery29',
    role: 'Creative direction, filming (iPhone), edit',
    clips: ['On-location conversation', 'Talent interview', 'On the red carpet']
  },
  {
    page: 4,
    title: 'Stories with personality.',
    brand: 'Social video · Refinery29',
    role: 'Creative direction, edit',
    clips: ['Leave it or keep it', 'A moment with the talent', 'Red-carpet storytelling']
  },
  {
    page: 5,
    title: 'Out in the Depop community.',
    brand: 'Social video · Depop',
    role: 'Creative concept, videography (iPhone), edit',
    clips: ['How to Depop', 'Seller stories', 'Festival style']
  },
  {
    page: 6,
    title: 'A fresh take for TikTok.',
    brand: 'TikTok strategy · Playboy',
    role: 'Video edit, SEO optimization',
    clips: ['The unboxing', 'Behind the shots', 'Product storytelling']
  },
  {
    page: 7,
    title: 'The right people. The right ideas.',
    brand: 'Talent partnerships · Refinery29',
    role: 'Talent selection, creative direction',
    clips: ['Creator-led beauty', 'A closer look at style', 'Beauty in practice']
  }
];

// Links are listed from left to right within each section.
const postLinks = {
  2: [
    'https://www.instagram.com/p/DOvzUifDk4M/',
    'https://www.instagram.com/reels/DSoIT2OCdX4/',
    'https://www.instagram.com/reels/DOn_AG5DiY6/'
  ],
  3: [
    'https://www.tiktok.com/@refinery29/video/7561465344485788983?lang=en',
    'https://www.tiktok.com/@refinery29/video/7616053287061572878?lang=en',
    'https://www.instagram.com/reels/DRJEoVQgLhp/'
  ],
  4: [
    'https://www.instagram.com/reels/DTqooRUCSKU/',
    'https://www.instagram.com/reel/DV8jwAkiaFS/?hl=en',
    'https://www.instagram.com/reel/DV1BOyjjtAo/'
  ],
  5: [
    'https://www.instagram.com/p/DZa05xZjrXw/?hl=en',
    'https://www.instagram.com/p/Daik2wCEipx/?hl=en',
    'https://www.instagram.com/p/DcwoQLhiV_R/?hl=en'
  ],
  6: [
    'https://www.tiktok.com/@playboy/video/7605679017294925070?lang=en',
    'https://www.tiktok.com/@playboy/video/7616947394294402318?lang=en',
    'https://www.tiktok.com/@playboy/video/7619886764785716493?lang=en'
  ],
  7: [
    'https://www.instagram.com/reel/DQ9mdCpke5D/?hl=en',
    'https://www.instagram.com/reel/DSaX27fiUNG/?hl=en',
    'https://www.tiktok.com/@refinery29/video/7494403711234624799?lang=en'
  ]
};

const linkStyles = document.createElement('style');
linkStyles.textContent = `
  .tile .clip-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    cursor: pointer;
  }
  .tile .clip-link:focus-visible {
    outline: 3px solid #b63046;
    outline-offset: -5px;
    box-shadow: inset 0 0 0 7px white;
  }
  .tile figcaption {
    z-index: 2;
    pointer-events: none;
  }
  .tile:focus-within figcaption {
    opacity: 1;
  }
  .tile .clip-play {
    z-index: 3;
    top: auto;
    bottom: 10px;
    transform: translateX(-50%);
  }
`;
document.head.append(linkStyles);

const root = document.querySelector('#projects');

projects.forEach((p, i) => {
  const el = document.createElement('section');
  el.className = 'project';
  el.setAttribute('aria-labelledby', `project-${p.page}`);

  el.innerHTML = `
    <div class="project-head">
      <h3 id="project-${p.page}">${p.title}</h3>
      <span class="index">0${i + 1}</span>
    </div>
    <div class="gallery">
      ${p.clips.map((c, j) => `
        <figure class="tile">
          <a
            class="clip-link"
            href="${postLinks[p.page][j]}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch ${c} — ${p.brand} (opens in a new tab)"
          >
            <img
              class="clip-poster"
              src="${p.page}-${j + 1}.jpg"
              alt=""
              loading="lazy"
              width="480"
              height="854"
            >
            <video
              width="480"
              height="854"
              muted autoplay loop playsinline webkit-playsinline
              preload="none"
              poster="${p.page}-${j + 1}.jpg"
              data-src="${p.page}-${j + 1}.mp4"
              aria-label="${c} — ${p.brand}; silent visual portfolio excerpt"
            ></video>
          </a>
          <button
            class="clip-play"
            type="button"
            aria-label="Play preview: ${c}"
          >Play preview</button>
          <figcaption>${c}</figcaption>
        </figure>
      `).join('')}
    </div>
    <div class="meta">
      <p><strong>Project:</strong> ${p.brand}</p>
      <p><strong>Role:</strong> ${p.role}</p>
    </div>
  `;

  root.append(el);
});

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduce.matches;
const btn = document.querySelector('#motion');
const videos = [...document.querySelectorAll('video')];

function play(v) {
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;

  if (!v.getAttribute('src')) {
    v.src = v.dataset.src;
    v.load();
  }

  const attempt = v.play();

  if (attempt && attempt.catch) {
    attempt.catch(() => {
      if (!v.paused || v.dataset.visible !== 'true') return;
      v.closest('.tile').classList.add('needs-play');
    });
  }
}

function refresh() {
  document.body.classList.toggle('paused', paused);
  btn.textContent = paused ? 'Play motion' : 'Pause motion';
  btn.setAttribute('aria-pressed', String(paused));

  videos.forEach(v => {
    if (paused || document.hidden || v.dataset.visible !== 'true') {
      v.pause();
    } else {
      play(v);
    }
  });
}

videos.forEach(v => {
  const tile = v.closest('.tile');
  const button = tile.querySelector('.clip-play');

  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;

  v.addEventListener('playing', () => {
    tile.classList.add('has-frame');
    tile.classList.remove('needs-play');

    if (paused || document.hidden || v.dataset.visible !== 'true') {
      v.pause();
    }
  });

  v.addEventListener('error', () => {
    tile.classList.remove('has-frame');
    tile.classList.add('needs-play');
    button.textContent = 'Retry preview';
  });

  button.addEventListener('click', () => {
    paused = false;
    refresh();
    play(v);
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      v.dataset.visible = String(e.isIntersecting);

      if (e.isIntersecting && !paused && !document.hidden) {
        play(v);
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.05 });

  videos.forEach(v => observer.observe(v));
} else {
  videos.forEach(v => v.dataset.visible = 'true');
}

btn.addEventListener('click', () => {
  paused = !paused;
  refresh();
});

document.addEventListener('visibilitychange', refresh);

function motionChanged(e) {
  paused = e.matches;
  refresh();
}

if (reduce.addEventListener) {
  reduce.addEventListener('change', motionChanged);
} else {
  reduce.addListener(motionChanged);
}

refresh();
