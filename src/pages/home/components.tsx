import dataService from '@/services/data.service';
import useAuthStore from '@/state/auth';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Input,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const SearchButton = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  return (
    <div className="flex w-full items-center gap-3">
      <Input
        size="lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="w-[300px] grow"
      />
      <Button
        onClick={() => {
          if (search) {
            navigate(`/dashboard/marketplace?search=${search}` as never);
          }
        }}
        size="lg"
        color="primary"
      >
        Search
      </Button>
    </div>
  );
};

export const FUEL = ['gasoline', 'diesel', 'electric', 'hybrid'];

export const InteractCard = () => {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: () => dataService.getAllData(),
  });
  const { token } = useAuthStore();
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [modelId, setModelId] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [fuel, setFuel] = useState<string | undefined>(undefined);
  const router = useNavigate();

  const [loadin] = useState(false);

  const { t: useT } = useTranslation();
  const c = (key: string) => useT('common.' + key);
  const t = (key: string) => useT('pages.landing.form.' + key);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 2 }, (_, i) =>
    (currentYear + 1 - i).toString(),
  );
  //get years from
  return (
    <Card className="w-full">
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key as 'buy' | 'sell')}
        classNames={{
          tabList:
            'gap-2 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-primary text-white',
          tab: 'max-w-fit px-8 h-12',
          tabContent: 'group-data-[selected=true]:text-white',
        }}
      >
        <Tab key="buy" title={c('buy')} />
        <Tab key="sell" title={c('sell')} />
      </Tabs>
      <div className="backdrop-shadow-md flex w-full flex-col gap-2 rounded-md rounded-tl-none px-5 py-10">
        <div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Autocomplete
              label={c('brand')}
              placeholder={t('placeholderBrand')}
              isLoading={isLoading}
              selectedKey={brandId}
              onSelectionChange={(value) => {
                setBrandId(value?.toString());
                setModelId(undefined);
              }}
              // inputProps={{
              //   classNames: {
              //     inputWrapper: ' bg-white',
              //   },
              // }}
              labelPlacement="outside"
              // className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
            >
              {data?.brands?.map((animal) => (
                <AutocompleteItem key={animal.id} value={animal.id}>
                  {animal.name}
                </AutocompleteItem>
              )) ?? []}
            </Autocomplete>
            <Autocomplete
              label={c('model')}
              isLoading={isLoading}
              isDisabled={!brandId}
              // inputProps={{
              //   classNames: {
              //     inputWrapper: ' bg-white',
              //   },
              // }}
              placeholder={t('placeholderModel')}
              labelPlacement="outside"
              // className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKey={modelId?.toString()}
              onSelectionChange={(value) => {
                setModelId(value?.toString());
                if (!brandId) {
                  setBrandId(
                    data?.models
                      ?.find((m) => m.id?.toString() == value?.toString())
                      ?.brandId?.toString(),
                  );
                }
              }}
            >
              {data?.models
                ?.filter((m) =>
                  brandId ? m.brandId?.toString() == brandId : true,
                )
                ?.map((animal) => (
                  <AutocompleteItem key={animal.id} value={animal.id}>
                    {animal.name}
                  </AutocompleteItem>
                )) ?? []}
            </Autocomplete>

            <Autocomplete
              label={c('year')}
              placeholder={t('placeholderYear')}
              // inputProps={{
              //   classNames: {
              //     inputWrapper: ' bg-white',
              //   },
              // }}
              labelPlacement="outside"
              // className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKey={year}
              value={year}
              onSelectionChange={(value) => {
                setYear(value?.toString());
              }}
            >
              {years.map((animal) => (
                <AutocompleteItem key={animal} value={animal.toString()}>
                  {animal.toString()}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Autocomplete
              label={c('fuel')}
              placeholder={t('placeholderFuel')}
              // inputProps={{
              //   classNames: {
              //     inputWrapper: ' bg-white',
              //   },
              // }}
              labelPlacement="outside"
              // className="max-w-xs"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKey={fuel}
              onSelectionChange={(value) => {
                setFuel(value?.toString());
              }}
            >
              {FUEL.map((animal) => (
                <AutocompleteItem
                  key={animal.toLowerCase()}
                  value={animal.toLowerCase()}
                >
                  {c(animal)}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex w-full justify-end pt-4">
            {tab === 'buy' && (
              <Button
                onClick={() => {
                  const query = new URLSearchParams();

                  if (brandId) query.append('brand', brandId.toString());
                  if (modelId) query.append('model', modelId.toString());
                  if (year) query.append('year', year.toString());
                  if (fuel) query.append('fuel', fuel);
                  //set in localstorage
                  const redirect = `/dashboard/marketplace?${query.toString()}`;
                  if (token?.token) {
                    router(redirect);
                  } else {
                    localStorage.setItem('redirect', redirect);
                    router('/auth/login');
                  }
                }}
                color="primary"
                startContent={<Search className="size-4" />}
              >
                {t('searchCarButton')}
              </Button>
            )}
            {tab === 'sell' && (
              <Button
                isLoading={loadin}
                onClick={() => {
                  // setLoading(true);
                  // const exist = await utils.profile.existProfile.fetch();
                  // setLoading(false);
                  // if (!exist) {
                  //   onOpen();
                  //   return;
                  // }
                  const query = new URLSearchParams();
                  if (brandId) query.append('brand', brandId.toString());
                  if (modelId) query.append('model', modelId.toString());
                  if (year) query.append('year', year.toString());
                  if (fuel) query.append('fuel', fuel);
                  const redirect = `/dashboard/my-cars/add?${query.toString()}`;
                  if (token?.token) {
                    router(redirect);
                  } else {
                    localStorage.setItem('redirect', redirect);
                    router('/auth/login');
                  }
                }}
                color="primary"
                startContent={<Plus />}
              >
                {t('sellCarButton')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

<span className="absolute -bottom-7 -right-7 z-[-1]">
  <svg
    width="134"
    height="106"
    viewBox="0 0 134 106"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="1.66667"
      cy="104"
      r="1.66667"
      transform="rotate(-90 1.66667 104)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="104"
      r="1.66667"
      transform="rotate(-90 16.3333 104)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="104"
      r="1.66667"
      transform="rotate(-90 31 104)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="104"
      r="1.66667"
      transform="rotate(-90 45.6667 104)"
      fill="#3056D3"
    />
    <circle
      cx="60.3334"
      cy="104"
      r="1.66667"
      transform="rotate(-90 60.3334 104)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="104"
      r="1.66667"
      transform="rotate(-90 88.6667 104)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="104"
      r="1.66667"
      transform="rotate(-90 117.667 104)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="104"
      r="1.66667"
      transform="rotate(-90 74.6667 104)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="104"
      r="1.66667"
      transform="rotate(-90 103 104)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="104"
      r="1.66667"
      transform="rotate(-90 132 104)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="89.3333"
      r="1.66667"
      transform="rotate(-90 1.66667 89.3333)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="89.3333"
      r="1.66667"
      transform="rotate(-90 16.3333 89.3333)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="89.3333"
      r="1.66667"
      transform="rotate(-90 31 89.3333)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="89.3333"
      r="1.66667"
      transform="rotate(-90 45.6667 89.3333)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 60.3333 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 88.6667 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 117.667 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 74.6667 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 103 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="89.3338"
      r="1.66667"
      transform="rotate(-90 132 89.3338)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="74.6673"
      r="1.66667"
      transform="rotate(-90 1.66667 74.6673)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="31.0003"
      r="1.66667"
      transform="rotate(-90 1.66667 31.0003)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 16.3333 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="31.0003"
      r="1.66667"
      transform="rotate(-90 16.3333 31.0003)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 31 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="31.0003"
      r="1.66667"
      transform="rotate(-90 31 31.0003)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 45.6667 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="31.0003"
      r="1.66667"
      transform="rotate(-90 45.6667 31.0003)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 60.3333 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 60.3333 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 88.6667 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 88.6667 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 117.667 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 117.667 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 74.6667 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 74.6667 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 103 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 103 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="74.6668"
      r="1.66667"
      transform="rotate(-90 132 74.6668)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="30.9998"
      r="1.66667"
      transform="rotate(-90 132 30.9998)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 1.66667 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 1.66667 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 16.3333 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 16.3333 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 31 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 31 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 45.6667 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 45.6667 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 60.3333 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 60.3333 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 88.6667 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 88.6667 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 117.667 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 117.667 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 74.6667 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 74.6667 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 103 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 103 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="60.0003"
      r="1.66667"
      transform="rotate(-90 132 60.0003)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="16.3333"
      r="1.66667"
      transform="rotate(-90 132 16.3333)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="45.3333"
      r="1.66667"
      transform="rotate(-90 1.66667 45.3333)"
      fill="#3056D3"
    />
    <circle
      cx="1.66667"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 1.66667 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="45.3333"
      r="1.66667"
      transform="rotate(-90 16.3333 45.3333)"
      fill="#3056D3"
    />
    <circle
      cx="16.3333"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 16.3333 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="45.3333"
      r="1.66667"
      transform="rotate(-90 31 45.3333)"
      fill="#3056D3"
    />
    <circle
      cx="31"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 31 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="45.3333"
      r="1.66667"
      transform="rotate(-90 45.6667 45.3333)"
      fill="#3056D3"
    />
    <circle
      cx="45.6667"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 45.6667 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 60.3333 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="60.3333"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 60.3333 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 88.6667 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="88.6667"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 88.6667 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 117.667 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="117.667"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 117.667 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 74.6667 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="74.6667"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 74.6667 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 103 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="103"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 103 1.66683)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="45.3338"
      r="1.66667"
      transform="rotate(-90 132 45.3338)"
      fill="#3056D3"
    />
    <circle
      cx="132"
      cy="1.66683"
      r="1.66667"
      transform="rotate(-90 132 1.66683)"
      fill="#3056D3"
    />
  </svg>
</span>;
