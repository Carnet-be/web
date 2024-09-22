/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Autocomplete, SelectItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import CarCard from '@/components/carCard';
import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import carService from '@/services/car.service';
import { useQuery } from '@tanstack/react-query';

export const SearchSection = ({
  data,
}: {
  data: {
    bodies: Bodies[];
    brands: Brand[];
    models: Model[];
  };
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const bodies = data?.bodies ?? [];
  const brands = data?.brands ?? [];
  const models = data?.models ?? [];

  // Use state to manage search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to update search params
  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
    localStorage.setItem('search', newParams.toString());
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 2 }, (_, i) =>
    (currentYear + 1 - i).toString(),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-end gap-6">
      <Autocomplete
        label={t('body')}
        placeholder={t('placeholderBody')}
        variant="underlined"
        onSelectionChange={(k) =>
          updateSearchParams('body', k?.toString() ?? null)
        }
        selectedKey={searchParams.get('body')}
        labelPlacement="outside"
        className="w-full md:w-60"
        classNames={{
          selectorButton: ['placeholder:text-default-700/40'],
        }}
      >
        {bodies.map((b) => (
          <SelectItem key={b.id} value={b.name!}>
            {b.name}
          </SelectItem>
        ))}
      </Autocomplete>
      <Autocomplete
        label={t('brand')}
        placeholder={t('placeholderBrand')}
        variant="underlined"
        className="w-full md:w-60"
        selectedKey={searchParams.get('brand')}
        onSelectionChange={(k) =>
          updateSearchParams('brand', k?.toString() ?? null)
        }
        labelPlacement="outside"
        classNames={{
          selectorButton: ['placeholder:text-default-700/40'],
        }}
      >
        {brands.map((b) => (
          <SelectItem key={b.id} value={b.name}>
            {b.name}
          </SelectItem>
        ))}
      </Autocomplete>

      <Autocomplete
        label={t('model')}
        placeholder={t('placeholderModel')}
        variant="underlined"
        selectedKey={searchParams.get('model')}
        labelPlacement="outside"
        className="w-full md:w-60"
        isDisabled={!searchParams.get('brand')}
        onSelectionChange={(k) =>
          updateSearchParams('model', k?.toString() ?? null)
        }
        classNames={{
          selectorButton: ['placeholder:text-default-700/40'],
        }}
      >
        {models
          .filter((m) => {
            //if (!searchParams.get("brandId")) return true;
            return m.brandId.toString() == searchParams.get('brand');
          })
          .map((b) => (
            <SelectItem key={b.id} value={b.name}>
              {b.name}
            </SelectItem>
          ))}
      </Autocomplete>
      <Autocomplete
        label={t('year')}
        placeholder={t('placeholderYear')}
        variant="underlined"
        onSelectionChange={(k) =>
          updateSearchParams('year', k?.toString() ?? null)
        }
        selectedKey={searchParams.get('year')?.toString()}
        labelPlacement="outside"
        className="w-full md:w-60"
        classNames={{
          selectorButton: ['placeholder:text-default-700/40'],
        }}
      >
        {years.map((b) => (
          <SelectItem key={b?.toString()} value={b.toString()}>
            {b}
          </SelectItem>
        ))}
      </Autocomplete>
      {/* {searchParams.get('body') ??
      searchParams.get('brand') ??
      searchParams.get('model') ? (
        <Button
          onClick={() => {
            setSearchParams({});
          }}
          color="danger"
          variant="flat"
        >
          {t('clear')}
        </Button>
      ) : null} */}
    </div>
  );
};

export const CarsSections = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['cars', searchParams?.toString()],
    queryFn: () =>
      carService.search({
        brandId: searchParams.get('brand') ?? undefined,
        modelId: searchParams.get('model') ?? undefined,
        bodyId: searchParams.get('body') ?? undefined,
        query: searchParams.get('search') ?? undefined,
        year: searchParams.get('year') ?? undefined,
      }),
  });

  if (isPending) return <LoadingSection className="h-[500px]" />;
  if (isError) return <AlertError refetch={refetch} />;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {/* {data?.pages?.map((car) => (
          <CarCard key={car.id}>{car as any}</CarCard>
        ))} */}
        {data?.data.map((car) => (
          <CarCard link={`${car.uid}`} key={car.id}>
            {car as any}
          </CarCard>
        ))}
      </div>
      {data?.data.length === 0 && (
        <div className="h-[400px] flex items-center justify-center w-full p-4 text-center">
          No car found, please adjust your search
        </div>
      )}
    </div>
  );
};
