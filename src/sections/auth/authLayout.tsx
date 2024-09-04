import React from 'react';
import { ModeToggle } from '@/sections/dashboard/themeSwitcher';

interface AuthLayoutProps {
  children: React.ReactNode;
  pageType: 'login' | 'register' | 'forget-password';
}

export default function AuthLayout({ children, pageType }: AuthLayoutProps) {
  return (
    <div>
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div
        className={`absolute z-10 w-16 ${
          pageType === 'login'
            ? 'lg:top-20 lg:right-[40%] md:top-12 md:right-[85%] sm:top-6 sm:right-[85%] top-4 right-[82%]'
            : pageType === 'register'
            ? 'lg:top-14 lg:right-[91%] md:top-12 md:right-[85%] sm:top-6 sm:right-[85%] top-4 right-[82%]'
            : 'lg:top-20 lg:right-[90%] md:top-12 md:right-[85%] sm:top-6 sm:right-[85%] top-4 right-[82%]'
        }`}
      >
        <svg width="100%" height="100%" viewBox="0 0 392 157" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M144.179 34.933H122.25L100.875 73.6938V0.221619H80.0424V130.388H100.875V88.7347L122.257 130.388H144.179L117.862 80.6356L144.179 34.933Z"
            fill="currentColor" />
          <path
            d="M171.601 34.933H191.336C204.495 34.933 211.075 41.2964 211.075 54.0234V88.7347H171.601V108.405C171.447 109.855 171.841 111.31 172.698 112.455C174 113.335 175.54 113.742 177.082 113.612H185.321C186.694 113.776 188.074 113.36 189.158 112.455C189.924 111.263 190.309 109.844 190.255 108.405V101.464H210.541V111.297C210.541 124.023 203.962 130.388 190.255 130.388H171.066C157.909 130.388 150.781 124.023 150.781 111.297V54.0234C151.315 41.2973 157.896 34.933 171.601 34.933ZM171.601 74.8513H190.789V56.3382C190.944 54.8885 190.55 53.433 189.692 52.2886C188.563 51.4801 187.218 51.0745 185.855 51.1312H177.082C175.709 50.9677 174.329 51.3837 173.245 52.2886C172.479 53.4802 172.094 54.8994 172.148 56.3382V74.8513H171.601Z"
            fill="currentColor" />
          <path
            d="M239.585 157H226.975V140.222H236.295C241.777 140.222 245.066 137.908 246.164 133.28C247.079 129.258 246.89 125.044 245.617 121.131L241.232 107.82L217.117 34.9247H238.499L254.397 89.3065L263.169 34.9247H284.002L263.716 136.164C261.51 150.058 253.292 157 239.585 157Z"
            fill="currentColor" />
          <path
            d="M313.052 34.933H333.884C347.042 34.933 353.62 41.2964 353.62 54.0234V111.297C353.62 124.024 347.042 130.388 333.884 130.388H313.052C299.893 130.388 293.313 124.024 293.313 111.297V54.0234C293.313 41.2964 299.893 34.933 313.052 34.933ZM332.788 108.983V56.9265C332.942 55.4769 332.548 54.0215 331.691 52.8769C330.388 51.9966 328.848 51.5901 327.306 51.7195H319.081C317.547 51.6805 316.032 52.0804 314.696 52.8769C313.93 54.0686 313.546 55.4877 313.599 56.9265V108.993C313.445 110.443 313.839 111.898 314.696 113.043C315.999 113.924 317.538 114.33 319.081 114.2H327.306C328.84 114.239 330.355 113.84 331.691 113.043C332.459 111.848 332.843 110.425 332.788 108.983Z"
            fill="currentColor" />
          <path
            d="M21.3823 26.2565H43.8615C58.1233 26.2565 64.6941 33.1982 64.6941 47.0817V108.405C64.6941 122.289 57.5658 129.233 43.8615 129.233H21.3823C7.12745 129.233 0 122.29 0 108.405V47.0817C0 33.1982 7.12745 26.2565 21.3823 26.2565ZM42.7647 105.513V49.3965C42.802 47.778 42.423 46.179 41.6678 44.7696C40.3654 43.8884 38.8252 43.4818 37.283 43.6122H27.9609C26.4187 43.4818 24.8785 43.8884 23.5761 44.7696C22.7413 46.1441 22.356 47.7692 22.4792 49.3965V105.513C22.4423 107.132 22.8213 108.73 23.5761 110.14C24.8788 111.02 26.4188 111.427 27.9609 111.297H37.2804C38.8225 111.427 40.3625 111.02 41.6652 110.14C42.4995 108.765 42.8873 107.14 42.7647 105.513Z"
            fill="currentColor" />
          <path
            d="M387.065 103.198H370.618C369.256 103.327 367.99 103.995 367.076 105.068C366.162 106.141 365.667 107.54 365.691 108.983V124.032C365.633 124.758 365.717 125.489 365.936 126.179C366.156 126.87 366.508 127.506 366.969 128.048C367.431 128.59 367.993 129.027 368.62 129.332C369.247 129.636 369.927 129.802 370.618 129.819H387.065C388.428 129.69 389.694 129.022 390.608 127.948C391.522 126.874 392.017 125.475 391.992 124.032V108.983C392.016 107.54 391.521 106.141 390.607 105.068C389.693 103.995 388.427 103.327 387.065 103.198Z"
            fill="#E44136" />
          <path
            d="M383.775 116.502L376.099 111.875C375.552 111.875 375.003 111.875 375.003 112.455V121.711C375.003 122.291 375.55 122.291 376.099 122.291L383.775 117.664C384.322 117.082 384.322 116.502 383.775 116.502Z"
            fill="#F7F5F5" />
          <path
            d="M46.2653 21.3095C45.9054 21.3095 45.549 21.2346 45.2164 21.0893C44.8839 20.9439 44.5818 20.7309 44.3272 20.4623C44.0727 20.1938 43.8708 19.8749 43.7331 19.524C43.5954 19.1731 43.5245 18.7971 43.5245 18.4173C43.5904 16.7785 43.3414 15.1426 42.7926 13.608C42.2437 12.0734 41.4063 10.6718 40.3307 9.48766C39.2551 8.30349 37.9636 7.36114 36.5338 6.7174C35.1041 6.07367 33.5657 5.74185 32.0113 5.74185C30.4568 5.74185 28.9185 6.07367 27.4887 6.7174C26.059 7.36114 24.7675 8.30349 23.6919 9.48766C22.6163 10.6718 21.7789 12.0734 21.23 13.608C20.6811 15.1426 20.4322 16.7785 20.4981 18.4173C20.4981 19.1843 20.2094 19.9199 19.6953 20.4623C19.1813 21.0047 18.4842 21.3095 17.7573 21.3095C17.0303 21.3095 16.3332 21.0047 15.8192 20.4623C15.3052 19.9199 15.0164 19.1843 15.0164 18.4173C14.9537 16.0204 15.3469 13.6346 16.1728 11.4009C16.9987 9.16708 18.2406 7.13066 19.825 5.41193C21.4095 3.69321 23.3043 2.32701 25.3977 1.39415C27.491 0.461293 29.7403 -0.0192871 32.0126 -0.0192871C34.2849 -0.0192871 36.5342 0.461293 38.6275 1.39415C40.7208 2.32701 42.6157 3.69321 44.2001 5.41193C45.7846 7.13066 47.0265 9.16708 47.8524 11.4009C48.6783 13.6346 49.0715 16.0204 49.0088 18.4173C49.0091 18.7974 48.9384 19.1739 48.8006 19.5251C48.6628 19.8763 48.4607 20.1954 48.2058 20.4641C47.951 20.7327 47.6484 20.9457 47.3154 21.0908C46.9824 21.2358 46.6256 21.3102 46.2653 21.3095Z"
            fill="#E44136" />
        </svg>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
