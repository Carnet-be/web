import CarCard from '@/components/carCard';
import Logo from '@/components/ui/logo';
import { TERMS_AND_CONDITIONS } from '@/config/data';
import carService from '@/services/car.service';
import { Button, Card, Image, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const ContentText = () => {
  const { t: useT } = useTranslation();
  const t = (key: string) => useT('pages.landing.sections.message.' + key);
  return (
    <Card className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20 mb-5">
      <div className="flex max-w-screen-sm flex-col items-start sm:mx-auto md:flex-row">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide ">
            {t('tag')}
          </p>
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
            {t('title')}
          </h2>
          <p className="text-base  md:text-lg">{t('description')}</p>
        </div>
      </div>
    </Card>
  );
};

export const ContentGarage = () => {
  const { t: useT } = useTranslation();
  const t = (key: string) => useT('pages.landing.sections.garage.' + key);
  return (
    <div
      id="garages"
      className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20"
    >
      <div className="row-gap-8 grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="mb-6 max-w-xl">
            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none">
              {t('title')}
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              {t('description')}
            </p>
          </div>
          <div className="row-gap-8 grid gap-5 sm:grid-cols-2">
            <Card className="">
              <div className="h-full rounded-r  p-5">
                <h6 className="mb-2 font-semibold leading-5">{t('1.title')}</h6>
                <p className="text-sm ">{t('1.description')}</p>
              </div>
            </Card>
            <Card className="">
              <div className="h-full rounded-r  p-5">
                <h6 className="mb-2 font-semibold leading-5">{t('2.title')}</h6>
                <p className="text-sm">{t('2.description')}</p>
              </div>
            </Card>
            <Card className="">
              <div className="h-full rounded-r  p-5">
                <h6 className="mb-2 font-semibold leading-5">{t('3.title')}</h6>
                <p className="text-sm text-gray-900">{t('3.description')}</p>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <img
            className="h-56 w-full rounded object-cover shadow-lg sm:h-96"
            src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const Step = ({ type }: { type: 'buyer' | 'seller' }) => {
  const { t: useT } = useTranslation();
  const t = (key: string) =>
    useT('pages.landing.sections.howItWorks.' + type + '.' + key);
  return (
    <div className="mx-auto px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <div className="mx-auto grid max-w-2xl">
        <div className="flex">
          <div className="mr-6 flex flex-col items-center">
            <div className="h-10 w-px opacity-0 sm:h-full" />
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium">
                1
              </div>
            </div>
            <div className="h-full w-px bg-gray-300" />
          </div>
          <div className="flex flex-col pb-6 sm:flex-row sm:items-center sm:pb-0">
            <div>
              <p className="text-xl font-semibold  sm:text-base">
                {t('1.title')}:
              </p>
              <p className="pb-4 text-xl  sm:text-base">{t('1.description')}</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-6 flex flex-col items-center">
            <div className="h-10 w-px bg-gray-300 sm:h-full" />
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium">
                2
              </div>
            </div>
            <div className="h-full w-px bg-gray-300" />
          </div>
          <div className="flex flex-col pb-6 sm:flex-row sm:items-center sm:pb-0">
            <div>
              <p className="text-xl font-semibold  sm:text-base">
                {t('2.title')}:
              </p>
              <p className="pb-4 text-xl  sm:text-base">{t('2.description')}</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-6 flex flex-col items-center">
            <div className="h-10 w-px bg-gray-300 sm:h-full" />
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium">
                3
              </div>
            </div>
            <div className="h-full w-px opacity-0" />
          </div>
          <div className="flex flex-col pb-6 sm:flex-row sm:items-center sm:pb-0">
            <div>
              <p className="text-xl font-semibold  sm:text-base">
                {t('3.title')}:
              </p>
              <p className="pb-4 text-xl  sm:text-base">{t('3.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Feature = () => {
  const { t: useT } = useTranslation();
  const t = (key: string) => useT('pages.landing.sections.howItWorks.' + key);

  return (
    <div
      id="howItWorks"
      className="mx-auto px-4 py-3 md:py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20"
    >
      <div className="mb-0 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
        <h2 className="mb-0 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
          <span className="relative inline-block"> {t('title')}</span>
        </h2>
      </div>
      <div className="mx-auto grid max-w-screen-lg space-y-6 pt-5 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        <div className="space-y-6 sm:px-16">
          <div className="flex flex-col items-center gap-2">
            <Image
              alt="seller"
              src={'/icons/seller.png'}
              width={150}
              height={150}
            />
            <h3 className="text-2xl font-bold">{t('seller.title')}</h3>
          </div>
          <div className="space-y-2">
            <Step type="seller" />
          </div>
        </div>
        <div className="space-y-6 sm:px-16">
          <div className="flex flex-col items-center gap-2">
            <Image
              alt="seller"
              src={'/icons/buyer.png'}
              width={150}
              height={150}
            />
            <h3 className="text-2xl font-bold">{t('buyer.title')}</h3>
          </div>
          <div className="space-y-2">
            <Step type="buyer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HowItWorks = async () => {
  const { t } = useTranslation('pages.landing.sections.howItWorks');

  return (
    <section
      id="how-it-works"
      className="overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{t('title')}</h2>
        </div>
        <div className="flex items-center  justify-around gap-5 py-10">
          <Image
            src="/images/how_it_works.png"
            alt="How it works"
            width={350}
            height={350}
          />
          <div>
            <p className="pb-4">{t('description1')} :</p>

            <ol className="relative border-s border-gray-200">
              <li className="mb-10 ms-4">
                <div className="absolute -start-3 mt-1.5 h-6 w-6 rounded-full border border-white bg-gray-200"></div>
                {/* <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time> */}
                <p className="text-lg ">{t('item1')} </p>
                {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p> */}
              </li>
              <li className="mb-10 ms-4">
                <div className="absolute -start-3 mt-1.5 h-6 w-6 rounded-full border border-white bg-gray-200"></div>
                {/* <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time> */}
                <p className="text-lg ">{t('item2')}</p>
                {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p> */}
              </li>
              <li className="mb-10 ms-4">
                <div className="absolute -start-3 mt-1.5 h-6 w-6 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                {/* <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time> */}
                <p className="text-lg ">{t('item3')}</p>
                {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p> */}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export const About = async () => {
  const { t } = useTranslation('pages.landing.sections.about');
  return (
    <section
      id="about"
      className="dark:bg-dark overflow-hidden bg-white pb-12 pt-20 lg:pb-[40px] lg:pt-[60px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center justify-between">
          <div className="w-full px-4 lg:w-6/12">
            <div className="-mx-3 flex items-center sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <Image
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width={200}
                    height={400}
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <Image
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width={200}
                    height={400}
                    className="w-full rounded-2xl"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <Image
                    src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    width={200}
                    height={400}
                    className="w-full rounded-2xl"
                  />
                  {/* <div>ICI</div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              <h2 className="text-dark mb-5 text-3xl font-bold text-primary dark:text-white sm:text-[40px]/[48px]">
                {t('title')}
              </h2>
              <p className="text-body-color dark:text-dark-6 mb-5 text-base">
                {t('description')}
              </p>

              <a
                href="/auth/sign-up"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-7 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
              >
                {t('button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { t: useT } = useTranslation();
  const c = (key: string) => useT('common.' + key);

  return (
    <footer className="dark:bg-black relative z-10  pb-5 pt-10 bg-primary text-white dark:text-black">
      <div className="container mx-auto flex items-center justify-center flex-col gap-5">
        <Logo />
        <span>Copyright © 2024 Carnet. All rights reserved.</span>
        <Button variant="light" className="text-white dark:text-black">
          <a href={TERMS_AND_CONDITIONS} target="_blank">
            {c('privacyPolicy')}
          </a>
        </Button>
      </div>
    </footer>
  );
};

export const Pricing = () => {
  const { t } = useTranslation('pages.landing.sections.pricing');
  return (
    <section
      id="pricing"
      className="dark:bg-dark relative z-10 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="text-dark mb-3  text-3xl font-bold leading-[1.208] text-primary dark:text-white sm:text-4xl md:text-[40px]">
                {t('title')}
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                {t('description')}
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="border-stroke shadow-pricing dark:border-dark-3 dark:bg-dark-2 relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 bg-white px-8 py-10 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
              <span className="mb-3 block text-lg font-semibold text-primary">
                {t('1.title')}
              </span>
              <h2 className="text-dark mb-5 text-[42px] font-bold dark:text-white">
                <span>{t('1.price')}</span>
                <span className="text-body-color dark:text-dark-6 text-base font-medium">
                  / month
                </span>
              </h2>
              <p className="border-stroke text-body-color dark:border-dark-3 dark:text-dark-6 mb-8 border-b pb-8 text-base">
                {t('1.description')}
              </p>
              <div className="mb-9 flex flex-col gap-[14px]">
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('1.feature1')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('1.feature2')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('1.feature3')}
                </p>
              </div>
              <a
                href="/auth/sign-up"
                className="border-stroke dark:border-dark-3 block w-full rounded-md border bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
              >
                {t('button')}
              </a>

              <div>
                <span className="absolute right-0 top-7 z-[-1]">
                  <svg
                    width="77"
                    height="172"
                    viewBox="0 0 77 172"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="86"
                        y1="0"
                        x2="86"
                        y2="172"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#3056D3" stop-opacity="0.09" />
                        <stop
                          offset="1"
                          stop-color="#C4C4C4"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="absolute right-4 top-4 z-[-1]">
                  <svg
                    width="41"
                    height="89"
                    viewBox="0 0 41 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="38.9138"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 38.9138 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 38.9138 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 38.9138 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 38.9138 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 38.9138 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 38.9138 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 38.9138 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="1.42021"
                      r="1.42021"
                      transform="rotate(180 38.9138 1.42021)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 26.4157 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 26.4157 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 26.4157 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 26.4157 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 26.4157 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 26.4157 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 26.4157 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 26.4157 1.4202)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 13.9177 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 13.9177 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 13.9177 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 13.9177 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 13.9177 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 13.9177 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 13.9177 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="1.42019"
                      r="1.42021"
                      transform="rotate(180 13.9177 1.42019)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 1.41963 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 1.41963 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 1.41963 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 1.41963 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 1.41963 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 1.41963 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 1.41963 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 1.41963 1.4202)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="border-stroke shadow-pricing dark:border-dark-3 dark:bg-dark-2 relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 bg-white px-8 py-10 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
              <span className="mb-3 block text-lg font-semibold text-primary">
                {t('2.title')}
              </span>
              <h2 className="text-dark mb-5 text-[42px] font-bold dark:text-white">
                <span>{t('2.price')}</span>
                <span className="text-body-color dark:text-dark-6 text-base font-medium">
                  / month
                </span>
              </h2>
              <p className="border-stroke text-body-color dark:border-dark-3 dark:text-dark-6 mb-8 border-b pb-8 text-base">
                {t('2.description')}
              </p>
              <div className="mb-9 flex flex-col gap-[14px]">
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('2.feature1')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('2.feature2')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('2.feature3')}
                </p>
              </div>
              <a className="block w-full rounded-md border p-3 text-center text-base font-medium text-primary transition hover:bg-opacity-90">
                {t('button')}
              </a>

              <div>
                <span className="absolute right-0 top-7 z-[-1]">
                  <svg
                    width="77"
                    height="172"
                    viewBox="0 0 77 172"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="86"
                        y1="0"
                        x2="86"
                        y2="172"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#3056D3" stop-opacity="0.09" />
                        <stop
                          offset="1"
                          stop-color="#C4C4C4"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="absolute right-4 top-4 z-[-1]">
                  <svg
                    width="41"
                    height="89"
                    viewBox="0 0 41 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="38.9138"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 38.9138 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 38.9138 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 38.9138 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 38.9138 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 38.9138 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 38.9138 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 38.9138 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="1.42021"
                      r="1.42021"
                      transform="rotate(180 38.9138 1.42021)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 26.4157 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 26.4157 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 26.4157 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 26.4157 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 26.4157 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 26.4157 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 26.4157 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 26.4157 1.4202)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 13.9177 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 13.9177 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 13.9177 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 13.9177 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 13.9177 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 13.9177 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 13.9177 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="1.42019"
                      r="1.42021"
                      transform="rotate(180 13.9177 1.42019)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 1.41963 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 1.41963 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 1.41963 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 1.41963 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 1.41963 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 1.41963 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 1.41963 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 1.41963 1.4202)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="border-stroke shadow-pricing dark:border-dark-3 dark:bg-dark-2 relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 bg-white px-8 py-10 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
              <span className="mb-3 block text-lg font-semibold text-primary">
                {t('3.title')}
              </span>
              <h2 className="text-dark mb-5 text-[42px] font-bold dark:text-white">
                <span>{t('3.price')}</span>
                <span className="text-body-color dark:text-dark-6 text-base font-medium">
                  / month
                </span>
              </h2>
              <p className="border-stroke text-body-color dark:border-dark-3 dark:text-dark-6 mb-8 border-b pb-8 text-base">
                {t('3.description')}
              </p>
              <div className="mb-9 flex flex-col gap-[14px]">
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('3.feature1')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('3.feature2')}
                </p>
                <p className="text-body-color dark:text-dark-6 text-base">
                  {t('3.feature3')}
                </p>
              </div>
              <a className="border-stroke dark:border-dark-3 block w-full rounded-md border bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white">
                {t('button')}
              </a>

              <div>
                <span className="absolute right-0 top-7 z-[-1]">
                  <svg
                    width="77"
                    height="172"
                    viewBox="0 0 77 172"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="86"
                        y1="0"
                        x2="86"
                        y2="172"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#3056D3" stop-opacity="0.09" />
                        <stop
                          offset="1"
                          stop-color="#C4C4C4"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="absolute right-4 top-4 z-[-1]">
                  <svg
                    width="41"
                    height="89"
                    viewBox="0 0 41 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="38.9138"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 38.9138 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 38.9138 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 38.9138 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 38.9138 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 38.9138 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 38.9138 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 38.9138 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.9138"
                      cy="1.42021"
                      r="1.42021"
                      transform="rotate(180 38.9138 1.42021)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 26.4157 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 26.4157 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 26.4157 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 26.4157 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 26.4157 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 26.4157 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 26.4157 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.4157"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 26.4157 1.4202)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 13.9177 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 13.9177 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 13.9177 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 13.9177 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 13.9177 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 13.9177 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 13.9177 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.9177"
                      cy="1.42019"
                      r="1.42021"
                      transform="rotate(180 13.9177 1.42019)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="87.4849"
                      r="1.42021"
                      transform="rotate(180 1.41963 87.4849)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="74.9871"
                      r="1.42021"
                      transform="rotate(180 1.41963 74.9871)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="62.4892"
                      r="1.42021"
                      transform="rotate(180 1.41963 62.4892)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="38.3457"
                      r="1.42021"
                      transform="rotate(180 1.41963 38.3457)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="13.634"
                      r="1.42021"
                      transform="rotate(180 1.41963 13.634)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="50.2754"
                      r="1.42021"
                      transform="rotate(180 1.41963 50.2754)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="26.1319"
                      r="1.42021"
                      transform="rotate(180 1.41963 26.1319)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.41963"
                      cy="1.4202"
                      r="1.42021"
                      transform="rotate(180 1.41963 1.4202)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const { t: useT } = useTranslation();
  const t = (key: string) => useT('pages.landing.sections.contact.' + key);
  const form = (key: string) => useT('form.' + key);

  return (
    <section
      id="contact"
      className="dark:bg-dark relative z-10 overflow-hidden py-20 lg:py-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap lg:justify-between">
          <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
            <div className="mb-12 max-w-[570px] lg:mb-0">
              <h2 className="text-dark mb-6 text-[32px] font-bold uppercase dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                {t('title')}
              </h2>
              <p className="text-body-color dark:text-dark-6 mb-9 text-base leading-relaxed">
                {t('description')}
              </p>

              <div className="mb-8 flex w-full max-w-[370px]">
                <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <p className="text-body-color dark:text-dark-6 text-base">
                    99 S.t Park Pekanbaru 28292. Belgium
                  </p>
                </div>
              </div>

              <div className="mb-8 flex w-full max-w-[370px]">
                <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_941_17577)">
                      <path
                        d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499ZM3.79997 5.54994C2.84997 6.59994 2.89997 8.74994 3.99997 11.4999C5.24997 14.6499 7.64997 18.0999 10.8 21.2499C13.9 24.3499 17.4 26.7499 20.5 27.9999C23.2 29.0999 25.35 29.1499 26.45 28.1999L28.85 24.0999C28.85 24.0499 28.85 24.0499 28.85 23.9999L24.45 21.0499C24.45 21.0499 24.35 21.0999 24.25 21.2499L23.15 22.8499C22.45 23.8499 21.1 24.1499 20.1 23.4999C13.8 19.5999 9.89997 14.1499 8.49997 11.9499C7.84997 10.8999 8.09997 9.54994 9.09997 8.84994L10.9 7.59994V7.54994L7.94997 3.14994C7.94997 3.09994 7.89997 3.09994 7.84997 3.14994L3.79997 5.54994Z"
                        fill="currentColor"
                      />
                      <path
                        d="M29.3 14.25C28.7 14.25 28.25 13.8 28.2 13.2C27.8 8.15003 23.65 4.10003 18.55 3.75003C17.95 3.70003 17.45 3.20003 17.5 2.55003C17.55 1.95003 18.05 1.45003 18.7 1.50003C24.9 1.90003 29.95 6.80003 30.45 13C30.5 13.6 30.05 14.15 29.4 14.2C29.4 14.25 29.35 14.25 29.3 14.25Z"
                        fill="currentColor"
                      />
                      <path
                        d="M24.35 14.7002C23.8 14.7002 23.3 14.3002 23.25 13.7002C22.95 11.0002 20.85 8.90018 18.15 8.55018C17.55 8.50018 17.1 7.90018 17.15 7.30018C17.2 6.70018 17.8 6.25018 18.4 6.30018C22.15 6.75018 25.05 9.65018 25.5 13.4002C25.55 14.0002 25.15 14.5502 24.5 14.6502C24.4 14.7002 24.35 14.7002 24.35 14.7002Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_941_17577">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="w-full">
                  <p className="text-body-color dark:text-dark-6 text-base">
                    (+62)81 414 257 9980
                  </p>
                </div>
              </div>

              <div className="mb-8 flex w-full max-w-[370px]">
                <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="text-dark mb-1 text-xl font-bold dark:text-white"></h4>
                  <p className="text-body-color dark:text-dark-6 text-base">
                    info@carnet.be
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="dark:bg-dark-2 relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
              <form>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder={t('form.name')}
                    className="border-stroke text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 w-full rounded border px-[14px] py-3 text-base outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder={form('email')}
                    className="border-stroke text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 w-full rounded border px-[14px] py-3 text-base outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder={form('phone')}
                    className="border-stroke text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 w-full rounded border px-[14px] py-3 text-base outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    rows={6}
                    placeholder={form('message')}
                    className="border-stroke text-body-color dark:border-dark-3 dark:bg-dark dark:text-dark-6 w-full resize-none rounded border px-[14px] py-3 text-base outline-none focus:border-primary"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                  >
                    {t('form.phone')}
                  </button>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Blog = () => {
  return (
    <section
      id="blogs"
      className="dark:bg-dark bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <h2 className="text-dark mb-4 text-3xl font-bold text-primary dark:text-white sm:text-4xl md:text-[40px]">
                Our Recent News
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                Those are the latest news from our blog. You can either read it
                or subscribe to our newsletter to get the latest news.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-10 w-full">
              <div className="mb-8 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="image"
                  width={400}
                  height={300}
                  className="w-full"
                />
              </div>
              <div>
                <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  Dec 22, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="text-dark mb-4 inline-block text-xl font-semibold hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    Meet AutoManage, the best AI management tools for your work
                  </a>
                </h3>
                <p className="text-body-color dark:text-dark-6 text-base">
                  Use the best AI management tools for your work in your
                  business. Get the best AI management tools
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-10 w-full">
              <div className="mb-8 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="image"
                  width={400}
                  height={300}
                  className="w-full"
                />
              </div>
              <div>
                <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  Mar 15, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="text-dark mb-4 inline-block text-xl font-semibold hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    How to earn more money as a garagist ?
                  </a>
                </h3>
                <p className="text-body-color dark:text-dark-6 text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-10 w-full">
              <div className="mb-8 overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="image"
                  width={400}
                  height={300}
                  className="w-full"
                />
              </div>
              <div>
                <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  Jan 05, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="text-dark mb-4 inline-block text-xl font-semibold hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    The no-fuss guide to upselling and cross selling
                  </a>
                </h3>
                <p className="text-body-color dark:text-dark-6 text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarSection = () => {
  const { t: useT } = useTranslation();
  const t = (key: string) => useT('pages.landing.sections.carsSection.' + key);
  const { data, isPending } = useQuery({
    queryKey: ['cars'],
    queryFn: () =>
      carService.search({
        limit: 10,
      }),
  });

  return (
    <section
      id="cars"
      x-data="
    {
      showCards: 'all',
      activeClasses: 'bg-primary text-white',
      inactiveClasses: 'text-body-color dark:text-dark-6 hover:bg-primary hover:text-white',
    }
  "
      className="dark:bg-dark pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="text-dark mb-3 text-3xl font-bold leading-[1.208] text-primary sm:text-4xl md:text-[40px]">
                {t('title')}
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5">
          {data?.data?.map((car) => (
            <CarCard key={car.id} className="bg-white">
              {{ ...car }}
            </CarCard>
          ))}
        </div>
        <div className="flex justify-center items-center">
          {isPending && <Spinner />}
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  const { t } = useTranslation('pages.landing.sections.services');
  const services = [
    {
      title: t('1.title'),
      description: t('1.description'),
      image: '/images/services/1.png',
    },
    {
      title: t('2.title'),
      description: t('2.description'),
      image: '/images/services/2.png',
    },
    {
      title: t('3.title'),
      description: t('3.description'),
      image: '/images/services/3.png',
    },
    {
      title: t('4.title'),
      description: t('4.description'),
      image: '/images/services/4.png',
    },
    {
      title: t('5.title'),
      description: t('5.description'),
      image: '/images/services/5.png',
    },
    {
      title: t('6.title'),
      description: t('6.description'),
      image: '/images/services/6.png',
    },
  ];
  return (
    <section
      id="services"
      className="dark:bg-dark pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="text-dark mb-3 text-3xl font-bold leading-[1.2] text-primary dark:text-white sm:text-4xl md:text-[40px]">
                {t('title')}
              </h2>
              <p className="text-body-color dark:text-dark-6 text-base">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          {services.map((s, i) => {
            return (
              <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="shadow-2 dark:bg-dark-2 mb-9 rounded-[20px] bg-white p-10 hover:shadow-lg md:px-7 xl:px-10">
                  <div className="mb-2 flex h-[150px] w-[150px] items-center justify-center rounded-2xl">
                    <Image
                      src={s.image}
                      alt="image"
                      width={400}
                      height={300}
                      className="w-full"
                    />
                  </div>
                  <h4 className="text-dark mb-[14px] text-2xl font-semibold dark:text-white">
                    {s.title}
                  </h4>
                  <p className="text-body-color dark:text-dark-6">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
