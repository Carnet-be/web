import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { formCarSchema } from './carForm';

export const COLORS = ['red', 'blue', 'green', 'yellow', 'black', 'white'];

// Generate an array of years from 1900 to next year
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1899 + 1 }, (_, i) =>
  (currentYear - i + 1).toString(),
);

const Step1 = ({
  form,
  data,
}: {
  form: UseFormReturn<z.infer<ReturnType<typeof formCarSchema>>>;
  data: {
    brands: Brand[];
    models: Model[];
  };
}) => {
  const { t: carFormT } = useTranslation();
  const t = (key: string) => carFormT(`carForm.${key}`);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Controller
        control={form.control}
        name="brandId"
        render={({ field, formState: { errors } }) => (
          <Autocomplete
            isRequired
            label={t('step1.selectBrand')}
            className="md:col-span-2 col-span-4"
            selectedKey={field.value?.toString()}
            onSelectionChange={(e) => {
              field.onChange(e ? parseInt(e.toString()) : null);
              //  form.setValue('modelId', undefined);
            }}
            defaultSelectedKey={field.value}
            defaultItems={data.brands}
            errorMessage={errors.brandId?.message}
            isInvalid={!!errors.brandId}
          >
            {(brand) => (
              <AutocompleteItem key={brand.id} value={brand.id?.toString()}>
                {brand.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      <Controller
        control={form.control}
        name="modelId"
        render={({ field, formState: { errors } }) => (
          <Autocomplete
            isRequired
            label={t('step1.selectModel')}
            className="md:col-span-2 col-span-4"
            isDisabled={!form.watch('brandId')}
            selectedKey={field.value?.toString()}
            onSelectionChange={(e) => {
              field.onChange(e ? parseInt(e.toString()) : null);
            }}
            errorMessage={errors.modelId?.message}
            isInvalid={!!errors.modelId}
          >
            {data.models
              .filter((model) => model.brandId == form.watch('brandId'))
              .map((model) => (
                <AutocompleteItem key={model.id} value={model.id}>
                  {model.name}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        )}
      />
      <div className="col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          control={form.control}
          name="year"
          render={({ field, formState: { errors } }) => (
            <Autocomplete
              isRequired
              label={t('step1.year')}
              selectedKey={field.value?.toString()}
              onSelectionChange={(e) =>
                field.onChange(e ? parseInt(e.toString()) : null)
              }
              errorMessage={errors.year?.message}
              isInvalid={!!errors.year}
            >
              {YEARS.map((year) => (
                <AutocompleteItem key={year} value={year}>
                  {year}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        />
        <Controller
          control={form.control}
          name="doors"
          render={({ field, formState: { errors } }) => (
            <Select
              label={t('step1.numberOfDoors')}
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              errorMessage={errors.doors?.message}
              isInvalid={!!errors.doors}
            >
              {['2', '3', '4', '5', '6', '7', '8'].map((doors) => (
                <SelectItem key={doors} value={doors}>
                  {doors}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={form.control}
          name="isNew"
          render={({ field, fieldState: { error } }) => (
            <Select
              label={t('step1.state')}
              selectedKeys={field.value ? ['new'] : ['used']}
              onSelectionChange={(keys) =>
                field.onChange(Array.from(keys)[0] === 'new')
              }
              errorMessage={error?.message}
              isInvalid={!!error}
            >
              {['new', 'used'].map((state) => (
                <SelectItem key={state} value={state}>
                  {t(`step1.${state}`)}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <Controller
        control={form.control}
        name="fuel"
        render={({ field, formState: { errors } }) => (
          <Select
            isRequired
            label={t('step1.fuelType')}
            className="col-span-2"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            errorMessage={errors.fuel?.message}
            isInvalid={!!errors.fuel}
          >
            {['diesel', 'gasoline', 'electric', 'hybrid'].map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {t(`step1.${fuel}`)}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        control={form.control}
        name="color"
        render={({ field, formState: { errors } }) => (
          <Select
            label={t('step1.color')}
            className="col-span-2"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            errorMessage={errors.color?.message}
            isInvalid={!!errors.color}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${item.textValue}, ${item.textValue}, #fff, ${item.textValue})`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  />
                  {t(`step1.${item.textValue}`)}
                </div>
              ));
            }}
          >
            {COLORS.map((color) => (
              <SelectItem key={color} value={color} textValue={color}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}, #fff, ${color})`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  />
                  {t(`step1.${color}`)}
                </div>
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default Step1;
