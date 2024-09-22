import Logo from '@/components/ui/logo';
import UserButton from '@/components/userButton';
import { LanguageToggle } from '@/sections/dashboard/languageSwitcher';
import { Image } from '@nextui-org/react';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InteractCard } from './components';
import {
  CarSection,
  Contact,
  ContentGarage,
  ContentText,
  Feature,
  Footer,
} from './sections';

export default function Page() {
  const { t } = useTranslation('pages.landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Suspense>
      <div className="relative">
        <div className="sticky left-0 top-0 z-[100] w-full bg-white/60 backdrop-blur-lg">
          <div className="container mx-auto">
            <div className="relative -mx-4 flex items-center justify-between">
              <div className="w-60 max-w-full px-4">
                <Logo />
              </div>
              <div className="flex w-full items-center px-4">
                <div>
                  <button
                    className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                    <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                    <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                  </button>
                  <nav
                    className={`dark:bg-dark-2 absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow transition-all lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none xl:ml-11 ${
                      isMenuOpen ? 'block' : 'hidden lg:block'
                    }`}
                  >
                    <ul className="block text-sm lg:flex">
                      <li>
                        <a
                          href="/"
                          className="text-dark flex py-2 text-base font-medium hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                        >
                          {t('home')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#howItWorks"
                          className="text-dark flex py-2 text-base font-medium hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                        >
                          {t('howItWorks')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#cars"
                          className="text-dark flex py-2 text-base font-medium hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                        >
                          {t('cars')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#garages"
                          className="text-dark flex py-2 text-base font-medium hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                        >
                          {t('garages')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          className="text-dark flex py-2 text-base font-medium hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                        >
                          {t('contact')}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="grow"></div>
                <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                  <UserButton />
                </div>
                <div className="px-3"></div>
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="dark:bg-dark relative bg-white pb-[110px] pt-[30px] lg:pt-[50px]">
            <div className="container mx-auto">
              <div className="-mx-4 flex flex-col lg:flex-row items-center gap-10">
                <div className="w-full lg:w-1/2">
                  <div className="hero-content w-full max-w-[750px]">
                    <h1 className="text-dark mb-5 text-3xl font-bold !leading-[1.208] dark:text-white sm:text-[32px] lg:text-[36px] xl:text-[40px]">
                      {t('heroTitle1')} <br />
                      {t('heroTitle2')} <br />
                      {t('heroTitle3')}
                    </h1>
                    <p className="text-body-color dark:text-dark-6 mb-8 max-w-[750px] text-base">
                      {t('heroDescription')}
                    </p>
                    <ul className="flex w-full flex-wrap items-center">
                      <li className="w-full">
                        <InteractCard />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="lg:ml-auto lg:text-right">
                    <div className="relative z-10 inline-block pt-11 lg:pt-0">
                      <Image
                        src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="hero"
                        width={500}
                        height={200}
                        className="max-w-full w-full rounded-lg lg:ml-auto"
                      />
                      <span className="absolute -bottom-8 -left-8 z-[-1]">
                        <svg
                          width="93"
                          height="93"
                          viewBox="0 0 93 93"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Feature />
        <CarSection />
        <ContentGarage />

        <ContentText />
        <Contact />
        <Footer />
      </div>
    </Suspense>
  );
}
