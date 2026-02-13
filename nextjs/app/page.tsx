'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ───────── SVG ICON COMPONENTS ───────── */
/* Exact SVGs from the original HTML */

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g clipPath="url(#clip0_2245_315)">
        <path d="M46.2527 -0.40655H2.56059C1.56925 -0.416319 0.614388 -0.0449078 -0.0944669 0.626186C-0.803321 1.29728 -1.20827 2.21324 -1.22046 3.17308V45.6487C-1.20607 46.6071 -0.800148 47.521 -0.0915339 48.1903C0.617081 48.8597 1.57068 49.23 2.56059 49.2202H46.2527C47.2441 49.2278 48.1983 48.8551 48.9068 48.1836C49.6153 47.5121 50.0205 46.5964 50.0338 45.6365V3.16088C50.0161 2.20385 49.609 1.29226 48.901 0.624245C48.193 -0.0437685 47.2413 -0.414207 46.2527 -0.40655Z" fill="#0076B2" />
        <path d="M9.83706 17.413H15.8845V36.8711H9.83706V17.413ZM12.8625 7.729C13.5561 7.729 14.2341 7.93473 14.8108 8.32015C15.3875 8.70557 15.8369 9.25337 16.1022 9.89425C16.3674 10.5351 16.4367 11.2403 16.3011 11.9205C16.1656 12.6008 15.8313 13.2255 15.3406 13.7158C14.8499 14.206 14.2248 14.5397 13.5445 14.6746C12.8641 14.8095 12.159 14.7396 11.5184 14.4737C10.8777 14.2078 10.3304 13.7579 9.94549 13.1808C9.56062 12.6038 9.35554 11.9255 9.3562 11.2319C9.35709 10.3026 9.72689 9.41162 10.3843 8.75479C11.0418 8.09795 11.9331 7.729 12.8625 7.729ZM19.678 17.413H25.475V20.0844H25.5552C26.3633 18.555 28.3335 16.9421 31.2754 16.9421C37.3997 16.9288 38.535 20.9593 38.535 26.1853V36.8711H32.4876V27.4042C32.4876 25.1502 32.4475 22.2483 29.3453 22.2483C26.2431 22.2483 25.7154 24.706 25.7154 27.2573V36.8711H19.678V17.413Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_2245_315">
          <rect width="48" height="48" rx="5.21739" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TourIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect x="0.44" y="0.44" width="45.12" height="45.12" rx="7.56" fill="url(#paint0_linear_831_1095)" />
      <rect x="0.44" y="0.44" width="45.12" height="45.12" rx="7.56" fill="url(#paint1_linear_831_1095)" fillOpacity="0.4" style={{ mixBlendMode: 'soft-light' }} />
      <rect x="0.44" y="0.44" width="45.12" height="45.12" rx="7.56" fill="url(#paint2_radial_831_1095)" fillOpacity="0.2" style={{ mixBlendMode: 'overlay' }} />
      <rect x="0.44" y="0.44" width="45.12" height="45.12" rx="7.56" fill="url(#paint3_radial_831_1095)" fillOpacity="0.7" style={{ mixBlendMode: 'overlay' }} />
      <rect x="0.44" y="0.44" width="45.12" height="45.12" rx="7.56" stroke="url(#paint4_linear_831_1095)" strokeWidth="0.88" style={{ mixBlendMode: 'soft-light' }} />
      <path d="M27.9336 9.44008C30.9702 9.44018 33.9824 9.45327 36.9944 9.43168C37.7855 9.42601 38.7456 10.0455 38.7455 11.2024C38.7449 17.9269 38.7453 24.6513 38.7444 31.3758C38.7443 32.4161 37.9994 33.1962 36.9596 33.2056C35.3478 33.2201 33.7358 33.2119 32.1239 33.2067C31.6831 33.2053 31.3829 32.9701 31.3391 32.6222C31.2799 32.1529 31.5758 31.8148 32.0567 31.8141C33.636 31.812 35.2154 31.8139 36.7947 31.8133C37.2223 31.8132 37.3441 31.6905 37.3442 31.2621C37.3444 26.2798 37.3444 21.2975 37.3442 16.3152C37.3442 15.9759 37.3435 15.9754 37.0094 15.9753C27.6228 15.9751 18.2363 15.975 8.84974 15.9749C8.4963 15.9749 8.49507 15.9755 8.49501 16.3155C8.49422 21.2896 8.49363 26.2638 8.49402 31.2379C8.49403 31.3669 8.46921 31.5033 8.53757 31.6213C8.63544 31.7902 8.79862 31.8161 8.98035 31.8158C10.7062 31.8128 12.4321 31.8142 14.158 31.8142C15.9572 31.8141 17.7563 31.815 19.5555 31.8128C19.8304 31.8125 20.0493 31.9083 20.1865 32.1516C20.3275 32.4013 20.3071 32.653 20.1578 32.8912C19.9968 33.1481 19.7381 33.2085 19.4587 33.2093C18.8237 33.2113 18.1887 33.2096 17.5537 33.2095C14.7043 33.2093 11.855 33.2097 9.00566 33.2086C8.03439 33.2083 7.36689 32.7178 7.13646 31.8465C7.10865 31.7413 7.10743 31.6376 7.10743 31.5323C7.10696 24.7183 7.10657 17.9043 7.10749 11.0903C7.10761 10.2044 7.87115 9.44196 8.76177 9.44172C15.1442 9.44004 21.5267 9.4404 27.9336 9.44008ZM10.7633 14.667C19.5136 14.6673 28.2639 14.6676 37.0142 14.6677C37.343 14.6677 37.3439 14.6667 37.3441 14.3493C37.3446 13.3399 37.345 12.3306 37.344 11.3213C37.3436 10.9125 37.2279 10.7941 36.8268 10.7941C27.5393 10.7937 18.2518 10.7937 8.9643 10.7942C8.60582 10.7942 8.49683 10.8982 8.49567 11.2581C8.49227 12.3082 8.49816 13.3582 8.49055 14.4082C8.48907 14.6125 8.56209 14.6744 8.76095 14.6714C9.41199 14.6616 10.0633 14.6672 10.7633 14.667Z" fill="white" />
      <path d="M29.7152 18.2679C30.504 17.8393 31.3292 17.6174 32.2097 17.6532C34.5411 17.7478 36.2703 19.3851 36.6464 21.4738C36.8716 22.725 36.5319 23.8713 35.9851 24.9743C35.2111 26.5356 34.1315 27.8749 32.9354 29.1275C32.8511 29.2157 32.7696 29.3066 32.6849 29.3944C32.2891 29.8049 31.9852 29.8142 31.5799 29.4176C31.3707 29.2129 31.1708 28.9984 30.9717 28.7837C29.7605 27.4779 28.6683 26.0891 27.9408 24.4448C27.6122 23.7021 27.3707 22.9316 27.3958 22.1158C27.436 20.8109 27.9555 19.7102 28.9273 18.8303C29.1634 18.6165 29.4253 18.4379 29.7152 18.2679ZM34.7052 21.6638C34.6883 21.6011 34.6758 21.5368 34.6539 21.4759C34.2758 20.4277 33.5357 19.7752 32.4406 19.6122C31.4501 19.4648 30.5893 19.7962 29.942 20.5793C29.0465 21.6628 29.1099 23.1815 30.1063 24.2533C30.6489 24.8369 31.2299 25.3852 31.801 25.9417C32.027 26.162 32.1974 26.1673 32.4163 25.952C32.9729 25.4043 33.5659 24.8879 34.0513 24.2753C34.646 23.5249 34.9384 22.676 34.7052 21.6638Z" fill="white" />
      <path d="M17.6572 18.0674C17.9725 17.914 18.2829 17.9612 18.5459 18.1826C18.8878 18.4706 19.2126 18.7793 19.542 19.082C20.8359 20.2711 22.1282 21.4632 23.4238 22.6504C23.7113 22.914 23.8497 23.2188 23.7402 23.6074C23.685 23.8035 23.5453 23.9453 23.4014 24.0771C21.866 25.4839 20.327 26.8867 18.793 28.2949C18.6047 28.4678 18.4215 28.6407 18.1543 28.6689C17.621 28.7252 17.2835 28.4248 17.2754 27.877C17.2678 27.3563 17.2646 26.8348 17.2793 26.3145C17.2856 26.0902 17.2137 26.0216 16.9893 26.0225C15.1098 26.0304 13.23 26.029 11.3506 26.0273C10.9019 26.027 10.6634 25.8694 10.5527 25.5244C10.5219 25.4281 10.5274 25.3314 10.5273 25.2344C10.5266 23.9733 10.5264 22.7122 10.5264 21.4512C10.5263 20.7923 10.7392 20.5812 11.4082 20.5811C13.2471 20.5807 15.0859 20.5814 16.9248 20.5811C17.2354 20.581 17.2599 20.5594 17.2637 20.2529C17.2682 19.8869 17.2646 19.5203 17.2646 19.1299C17.2647 19.0001 17.2711 18.8941 17.2637 18.7891C17.2406 18.4632 17.3623 18.211 17.6572 18.0674Z" fill="white" />
      <path d="M22.3373 33.7124C22.4003 33.6468 22.4463 33.5884 22.5023 33.542C22.6265 33.4393 22.6417 33.3364 22.5749 33.1814C22.342 32.6408 22.3492 32.6377 21.7541 32.6303C21.3972 32.6259 21.1913 32.4343 21.1793 32.0782C21.1702 31.81 21.1699 31.5409 21.1793 31.2727C21.1912 30.9376 21.3966 30.7023 21.7175 30.7499C22.2296 30.8258 22.4782 30.6152 22.5933 30.1425C22.626 30.0083 22.6409 29.9148 22.5328 29.8181C22.4298 29.726 22.3327 29.6267 22.2399 29.5243C22.0127 29.2736 22.0008 28.9806 22.2237 28.7341C22.4144 28.5231 22.6167 28.3211 22.8274 28.1301C23.0851 27.8964 23.3807 27.9114 23.6345 28.1512C23.6463 28.1624 23.6571 28.1746 23.6687 28.186C24.0968 28.6072 24.131 28.6107 24.6667 28.3377C24.7729 28.2836 24.7875 28.1997 24.7911 28.0963C24.7972 27.9186 24.7689 27.7396 24.825 27.5633C24.9118 27.2902 25.0491 27.179 25.3406 27.1747C25.6091 27.1709 25.8778 27.171 26.1463 27.1747C26.4696 27.1793 26.707 27.3672 26.6672 27.6847C26.6072 28.1641 26.815 28.3732 27.2413 28.4882C27.3963 28.53 27.498 28.5379 27.6057 28.4168C27.692 28.3198 27.788 28.2306 27.8858 28.1449C28.1274 27.933 28.4675 27.9323 28.7026 28.1497C28.8937 28.3264 29.0809 28.5082 29.2576 28.6991C29.4859 28.9458 29.5133 29.3062 29.2572 29.5051C28.8578 29.8153 28.8358 30.1375 29.0649 30.5483C29.133 30.6704 29.1871 30.7468 29.3323 30.7403C29.4785 30.7337 29.6253 30.7367 29.7717 30.7398C30.0957 30.7467 30.2727 30.9089 30.2862 31.2321C30.2976 31.5083 30.2952 31.7855 30.2872 32.062C30.277 32.4161 30.071 32.659 29.7192 32.6167C29.247 32.5599 29.0326 32.7495 28.9189 33.1792C28.8757 33.3421 28.8713 33.4374 28.9941 33.56C29.5658 34.131 29.5619 34.2738 28.9904 34.8497C28.8758 34.9651 28.7656 35.0864 28.6408 35.1898C28.4099 35.3813 28.1409 35.3737 27.9083 35.1834C27.8768 35.1576 27.8382 35.1359 27.8168 35.1033C27.5748 34.7335 27.274 34.7338 26.9112 34.924C26.7564 35.0052 26.6754 35.0741 26.6758 35.2627C26.6776 36.0796 26.5732 36.1779 25.7672 36.1774C24.8618 36.1769 24.8072 36.129 24.7949 35.2354C24.7925 35.0662 24.7172 35.0048 24.5814 34.9307C24.2097 34.7279 23.9336 34.7693 23.6541 35.1174C23.4067 35.4257 23.0707 35.4025 22.7799 35.1306C22.6196 34.9806 22.4642 34.8249 22.3134 34.6655C22.0082 34.3429 22.0137 34.0629 22.3373 33.7124ZM26.9856 30.3121C26.6232 29.9787 26.1919 29.7877 25.7037 29.8049C24.5417 29.8457 23.6961 30.9642 23.9478 32.0968C24.1619 33.0603 25.1865 33.7105 26.1133 33.4958C27.4595 33.1838 28.1483 31.4878 26.9856 30.3121Z" fill="white" />
      <path d="M14.5192 12.5364C14.6282 12.9951 14.3951 13.4068 13.9615 13.5473C13.5345 13.6856 13.0567 13.4644 12.8972 13.0548C12.7343 12.6361 12.911 12.1823 13.3126 11.9881C13.7271 11.7877 14.214 11.9295 14.4306 12.3164C14.4659 12.3794 14.4877 12.4498 14.5192 12.5364Z" fill="white" />
      <path d="M17.4947 12.8176C17.4253 13.2307 17.2064 13.4901 16.8115 13.57C16.4409 13.6451 16.1033 13.4972 15.9223 13.2049C15.7432 12.9157 15.7549 12.5054 15.9497 12.2392C16.1467 11.97 16.4994 11.8456 16.8348 11.927C17.2128 12.0188 17.4369 12.2646 17.4918 12.6506C17.4986 12.6985 17.4945 12.7479 17.4947 12.8176Z" fill="white" />
      <path d="M11.583 12.4499C11.7208 12.9314 11.5391 13.3526 11.1347 13.5223C10.7465 13.6853 10.2786 13.5358 10.0695 13.1821C9.85113 12.8125 9.93178 12.3476 10.2599 12.0847C10.7065 11.727 11.2892 11.8801 11.583 12.4499Z" fill="white" />
      <path d="M32.7859 23.4577C32.0519 23.8912 31.1426 23.5931 30.8414 22.869C30.5839 22.2502 30.8112 21.5405 31.3738 21.2159C31.9384 20.8902 32.7044 21.0325 33.0882 21.5344C33.5076 22.0829 33.4583 22.8299 32.9695 23.3079C32.9175 23.3588 32.8574 23.4013 32.7859 23.4577Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_831_1095" x1="0" y1="23" x2="46" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#295CA7" /><stop offset="1" stopColor="#2A92CF" />
        </linearGradient>
        <linearGradient id="paint1_linear_831_1095" x1="46" y1="23" x2="0" y2="23" gradientUnits="userSpaceOnUse">
          <stop /><stop offset="0.5" stopOpacity="0" /><stop offset="1" />
        </linearGradient>
        <radialGradient id="paint2_radial_831_1095" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23 10.0625) rotate(-90) scale(14.8542)">
          <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="paint3_radial_831_1095" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.816 46) rotate(-90) scale(10.5417 24.472)">
          <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="paint4_linear_831_1095" x1="23" y1="0" x2="23" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MenuOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none">
      <ellipse cx="23.3966" cy="23" rx="23.3966" ry="23" fill="#D9D9D9" />
      <ellipse cx="23.3966" cy="23" rx="23.3966" ry="23" fill="url(#paint0_linear_1_12)" />
      <ellipse cx="23.3966" cy="23" rx="23.3966" ry="23" fill="white" fillOpacity="0.07" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5659 22.0367L25.2305 14.3721L27.1463 16.2879L20.4396 22.9946L27.1463 29.7013L25.2305 31.6171L17.5659 23.9525C17.3119 23.6984 17.1692 23.3538 17.1692 22.9946C17.1692 22.6353 17.3119 22.2908 17.5659 22.0367Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_1_12" x1="0" y1="23" x2="46.7931" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#294E9D" /><stop offset="1" stopColor="#2A9ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MenuCloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="46" viewBox="0 0 47 46" fill="none">
      <ellipse cx="23.3966" cy="23" rx="23.3966" ry="23" fill="#546E7A" /> {/* Solid slate blue-grey background */}
      <path d="M17.0549 15.2425L23.3966 21.5942L29.7384 15.2425L31.1543 16.6584L24.8026 23.0002L31.1543 29.3419L29.7384 30.7578L23.3966 24.4061L17.0549 30.7478L15.649 29.3419L21.9907 23.0002L15.649 16.6584L17.0549 15.2425Z" fill="white" />
    </svg>
  );
}

/* ───────── TEXT SLIDER ───────── */
const SLIDER_TEXTS = [
  '✨ On the experience tab, we share stories of seminal moments that forged our last-mile strategy',
  '🔥 Our expertise section gives you insights to run your last-mile operation with precision and profit',
  '🚀  On our execution page, see how we turned our last-mile playbook into software that walks the walk',
];
const SLIDER_TIMES = [9000, 10000, 9000];

function TextSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDER_TEXTS.length);
    }, SLIDER_TIMES[activeIndex]);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <div className="text-slider-section">
      <div className="text-slider-widget">
        <div className="text-slider">
          {SLIDER_TEXTS.map((text, i) => (
            <div key={i} className={`slide ${i === activeIndex ? 'active' : ''}`}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── POPUP ───────── */
interface PopupProps {
  title: string;
  videoSrc: string;
  onClose: () => void;
}

function VideoPopup({ title, videoSrc, onClose }: PopupProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close popup">✕</button>
        <h2 className="popup-title">{title}</h2>
        <video
          className="popup-video"
          src={videoSrc}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [tourPopup, setTourPopup] = useState(false);
  const [dspPopup, setDspPopup] = useState(false);

  // Tooltip visibility
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  // Timeout refs
  const hideTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltip1Class = showTooltip1 ? 'tooltip-show' : 'tooltip-hide';
  const tooltip2Class = showTooltip2 ? 'tooltip-show' : 'tooltip-hide';

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 520);
    } else {
      setMenuOpen(true);
    }
  }, [menuOpen]);

  // Show tooltip helper — close other tooltip first
  const showTooltip = useCallback(
    (which: 1 | 2) => {
      if (which === 1) {
        if (hideTimeout1.current) clearTimeout(hideTimeout1.current);
        setShowTooltip2(false);
        setShowTooltip1(true);
      } else {
        if (hideTimeout2.current) clearTimeout(hideTimeout2.current);
        setShowTooltip1(false);
        setShowTooltip2(true);
      }
    },
    []
  );

  // Bland AI widget
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as unknown as Record<string, boolean>).blandLoaded) {
      (window as unknown as Record<string, Record<string, string>>).blandSettings = {
        widget_id: '07d1da03-04df-4b4d-b214-690d5f452b30',
      };
      const script = document.createElement('script');
      script.src = 'https://widget.bland.ai/loader.js';
      script.defer = true;
      document.body.appendChild(script);
      (window as unknown as Record<string, boolean>).blandLoaded = true;
    }
  }, []);

  // Scroll lock (desktop)
  useEffect(() => {
    function handleScrollLock() {
      const isDesktop = window.innerWidth >= 1024;
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (isDesktop) {
        document.body.style.overflow = contentHeight > windowHeight ? 'auto' : 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    handleScrollLock();
    window.addEventListener('resize', handleScrollLock);
    return () => window.removeEventListener('resize', handleScrollLock);
  }, []);

  return (
    <>
      {/* ═══ MAIN CONTAINER ═══ */}
      <div id="homecss">

        {/* ═══ LEFT COLUMN (content-left) ═══ */}
        <div className="content-left">

          {/* ── img-wrapper: LinkedIn box + Tour tooltip + Globe image ── */}
          <div className="img-wrapper">

            {/* LinkedIn "Connect with Us" (desktop only — hidden on tablet/mobile via CSS) */}
            <div className="linkedin-box">
              <a
                href="https://www.linkedin.com/in/jim-royce/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Us"
              >
                <span className="icon-box-title">Connect with Us</span>
                <LinkedInIcon />
              </a>
            </div>

            {/* Globe image (img-1) & Tooltip */}
            <div
              className="img-1"
              style={{ position: 'relative' }} /* Ensure relative positioning for tooltip */
              onMouseEnter={() => showTooltip(1)}
              onMouseLeave={() => {
                hideTimeout1.current = setTimeout(() => setShowTooltip1(false), 400);
              }}
            >
              <Image
                src="/images/Group-1321314714-1.png"
                alt="LastMile Globe"
                width={378}
                height={342}
                priority
              />

              {/* tooltip-1: Take Virtual Tour */}
              <div
                className={`tooltip-1 ${tooltip1Class}`}
                onMouseEnter={() => {
                  if (hideTimeout1.current) clearTimeout(hideTimeout1.current);
                }}
                onMouseLeave={() => {
                  hideTimeout1.current = setTimeout(() => setShowTooltip1(false), 400);
                }}
              >
                <div
                  className="tooltip-1-inner"
                  onClick={() => setTourPopup(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setTourPopup(true); }}
                >
                  <TourIcon />
                  <span className="icon-box-title">
                    <a href="#" onClick={(e) => { e.preventDefault(); setTourPopup(true); }}>
                      Take Virtual <br />Tour
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Jim section ── */}
          <div className="jim-container">
            <div
              className="jim-wrapper"
              onMouseEnter={() => showTooltip(2)}
              onMouseLeave={() => {
                hideTimeout2.current = setTimeout(() => setShowTooltip2(false), 400);
              }}
            >
              {/* Jim Royce Image */}
              <div className="jim">
                <Image
                  src="/images/Group-1321315409-e1756292294312.png"
                  alt="Jim Royce"
                  width={560}
                  height={600}
                />
              </div>

              {/* tooltip-2: DSP Lifestyle */}
              <div
                className={`tooltip-2 ${tooltip2Class}`}
                onMouseEnter={() => {
                  if (hideTimeout2.current) clearTimeout(hideTimeout2.current);
                }}
                onMouseLeave={() => {
                  hideTimeout2.current = setTimeout(() => setShowTooltip2(false), 200);
                }}
              >
                <button className="dsp-btn" onClick={() => setDspPopup(true)} aria-label="The DSP Lifestyle">
                  <Image
                    src="/images/Group-1321315414-e1756371262949.png"
                    alt="The DSP Lifestyle"
                    width={162}
                    height={141}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN (#vdeobg) ═══ */}
        <div id="vdeobg">

          {/* LinkedIn box (mobile only — hidden on desktop via CSS) */}
          <div className="linkedin-box-mobile">
            <a
              href="https://www.linkedin.com/in/jim-royce/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Us"
            >
              <LinkedInIcon />
              <span className="icon-box-title">Connect with Us</span>
            </a>
          </div>

          {/* ── Header / Menu ── */}
          <div className="headmenu">

            {/* Mega menu widget */}
            <div className="menu-widget" id="pushmenu">
              <button
                className={`menu-toggle-btn ${menuOpen ? 'is-open' : ''}`}
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="Menu Toggle"
              >
                <span className="icon-open"><MenuOpenIcon /></span>
                <span className="icon-close"><MenuCloseIcon /></span>
              </button>

              <nav
                className={`dropdown-menu ${menuOpen ? 'is-open' : ''} ${menuClosing ? 'is-closing' : ''}`}
                aria-label="Menu"
              >
                <ul className="menu-list">
                  <li className="menu-item">
                    <Link href="/experience" className="menu-link">Experience</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/outlook" className="menu-link">Expertise</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/execution" className="menu-link">Execution</Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logo-2.png"
                alt="LastMile NYC"
                width={174}
                height={114}
                className="logo-img"
                priority
              />
            </Link>
          </div>

          {/* ── Video (desktop — hidden on mobile via CSS) ── */}
          <div className="video-container">
            <div className="homevideo">
              <video
                src="/images/NEW-2.webm"
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload"
              />
            </div>
          </div>

          {/* ── Text Slider ── */}
          <TextSlider />
        </div>
      </div>

      {/* ═══ MOBILE VIDEO SECTION (shown only on mobile via CSS) ═══ */}
      <div className="mobile-video-section">
        <div className="homevideo">
          <video
            src="/images/NEW-2.webm"
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload"
          />
        </div>
      </div>

      {/* ═══ POPUPS ═══ */}
      {tourPopup && (
        <VideoPopup
          title="Website Tour"
          videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Website_Tour_High_Res_Mp4.mp4"
          onClose={() => setTourPopup(false)}
        />
      )}
      {dspPopup && (
        <VideoPopup
          title="The DSP Lifestyle"
          videoSrc="https://clientblob1.blob.core.windows.net/websitecontent/Fitness_Video_Full_2.mp4"
          onClose={() => setDspPopup(false)}
        />
      )}

      {/* Bland AI root */}
      <div id="bland-root"></div>
    </>
  );
}
