import { getImageUrl } from '@/lib/utils';
import {
  Autocomplete,
  AutocompleteItem,
  Image,
  Input,
  Textarea,
} from '@nextui-org/react';
import { ImagePlus, Trash2 } from 'lucide-react';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step5 = ({
  form,
  data,
}: {
  form: UseFormReturn<z.infer<typeof formCarSchema>>;
  data: {
    countries: Country[];
    cities: City[];
  };
}) => {
  return (
    <div className="space-y-4">
      <Controller
        control={form.control}
        name="images"
        render={({ field, fieldState: { error } }) => (
          <Uploader
            value={field.value}
            onChange={field.onChange}
            errorMessage={error?.message}
            isInvalid={!!error?.message}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="countryId"
          render={({ field, formState: { errors } }) => (
            <Autocomplete
              isRequired
              label="Select a country"
              selectedKey={field.value?.toString()}
              onSelectionChange={(e) =>
                field.onChange(e ? parseInt(e.toString()) : null)
              }
              errorMessage={errors.countryId?.message}
              isInvalid={!!errors.countryId}
            >
              {data.countries.map((country) => (
                <AutocompleteItem key={country.id} value={country.id}>
                  {country.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        />

        <Controller
          control={form.control}
          name="cityId"
          render={({ field, formState: { errors } }) => (
            <Autocomplete
              isRequired
              label="Select a city"
              isDisabled={!form.watch('countryId')}
              selectedKey={field.value?.toString()}
              onSelectionChange={(e) =>
                field.onChange(e ? parseInt(e.toString()) : null)
              }
              errorMessage={errors.cityId?.message}
              isInvalid={!!errors.cityId}
            >
              {data.cities
                .filter((city) => city.countryId == form.watch('countryId'))
                .map((city) => (
                  <AutocompleteItem key={city.id} value={city.id}>
                    {city.name}
                  </AutocompleteItem>
                ))}
            </Autocomplete>
          )}
        />
      </div>

      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field, formState: { errors } }) => (
          <Input
            {...field}
            type="tel"
            label="Phone Number"
            isRequired
            placeholder="Enter your phone number"
            className="col-span-4"
            classNames={{
              input: ['placeholder:text-default-700/40'],
            }}
            errorMessage={errors.phoneNumber?.message}
            isInvalid={!!errors.phoneNumber}
          />
        )}
      />

      <Controller
        control={form.control}
        name="address"
        render={({ field, formState: { errors } }) => (
          <Textarea
            {...field}
            label="Address"
            placeholder="Enter your address"
            className="col-span-4"
            classNames={{
              input: ['placeholder:text-default-700/40'],
            }}
            errorMessage={errors.address?.message}
            isInvalid={!!errors.address}
          />
        )}
      />
      <Controller
        control={form.control}
        name="zipCode"
        render={({ field, formState: { errors } }) => (
          <Input
            {...field}
            type="text"
            label="Zip Code"
            placeholder="Enter your zip code"
            className="col-span-4"
            classNames={{
              input: ['placeholder:text-default-700/40'],
            }}
            errorMessage={errors.zipCode?.message}
            isInvalid={!!errors.zipCode}
          />
        )}
      />
    </div>
  );
};

export default Step5;

const Uploader = ({
  value = [],
  onChange,
  errorMessage,
}: {
  value?: Array<File | string>;
  onChange?: (file: Array<File | string>) => void;
  errorMessage?: string;
  isInvalid?: boolean;
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const previewUrl = (file: File | string): string =>
    typeof file === 'string' ? getImageUrl(file) : URL.createObjectURL(file);
  return (
    <div>
      <div>
        <input
          multiple
          //accept only image
          accept="image/*"
          type="file"
          onChange={(e) => {
            const newfiles = Array.from(
              (e.target as any).files ?? [],
            ) as File[];
            onChange?.([...value, ...newfiles]);
          }}
          ref={inputRef}
          className="hidden"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
          {value.map((f, i) => {
            const url = previewUrl(f);
            return (
              <div
                key={url}
                className="group relative aspect-[3/2] overflow-hidden rounded-md border"
              >
                <Image
                  alt="image"
                  src={url}
                  radius="md"
                  className="w-full h-full object-cover"
                />
                <div
                  onClick={() => {
                    const newfiles = [...value];
                    newfiles.splice(i, 1);
                    onChange?.(newfiles);
                  }}
                  className="absolute z-10 left-0 top-0 hidden h-full w-full cursor-pointer  items-center justify-center bg-white/50 text-red-500 backdrop-blur-sm transition-all group-hover:flex"
                >
                  <div className="rounded-full bg-white p-2">
                    <Trash2 size={17} />
                  </div>
                </div>
              </div>
            );
          })}
          <div
            key={'button'}
            onClick={() => (inputRef.current as any)?.click()}
            className="center aspect-[3/2] cursor-pointer rounded-md border w-full flex items-center justify-center"
          >
            <ImagePlus size={20} />
          </div>
        </div>
      </div>
      <span className="my-2 text-red-500 text-xs ml-1">{errorMessage}</span>
    </div>
  );
};
