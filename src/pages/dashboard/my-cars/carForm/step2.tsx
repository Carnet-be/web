import { cn } from '@/lib/utils';
import {
  Button,
  Image,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step2 = ({
  form,
  data,
}: {
  form: UseFormReturn<z.infer<ReturnType<typeof formCarSchema>>>;
  data: {
    bodies: Bodies[];
  };
}) => {
  const { t: carFormT } = useTranslation();
  const t = (key: string) => carFormT(`carForm.${key}`);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Controller
          control={form.control}
          name="bodyId"
          render={({ field, fieldState: { error } }) => (
            <BodySelection
              bodies={data.bodies}
              selectedBody={field.value}
              onSelect={field.onChange}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={form.control}
          name="transmission"
          render={({ field, fieldState: { error } }) => (
            <Select
              label={t('step2.transmission')}
              placeholder={t('step2.selectTransmission')}
              isRequired
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            >
              <SelectItem key="manual" value="manual">
                {t('step2.manual')}
              </SelectItem>
              <SelectItem key="automatic" value="automatic">
                {t('step2.automatic')}
              </SelectItem>
              <SelectItem key="semi-automatic" value="semi-automatic">
                {t('step2.semiAutomatic')}
              </SelectItem>
            </Select>
          )}
        />

        <Controller
          control={form.control}
          name="kilometrage"
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              label={t('step2.kilometrage')}
              isRequired
              placeholder={t('step2.enterKilometrage')}
              min={0}
              value={field.value?.toString()}
              onChange={(e) => field.onChange(Number(e.target.value))}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              classNames={{
                input: ['placeholder:text-default-700/40'],
              }}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          control={form.control}
          name="cv"
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              label={t('step2.cv')}
              placeholder={t('step2.enterCV')}
              min={0}
              value={field.value?.toString()}
              onChange={(e) => field.onChange(Number(e.target.value))}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              classNames={{
                input: ['placeholder:text-default-700/40'],
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="cc"
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              label={t('step2.cc')}
              placeholder={t('step2.enterCC')}
              min={0}
              value={field.value?.toString()}
              onChange={(e) => field.onChange(Number(e.target.value))}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              classNames={{
                input: ['placeholder:text-default-700/40'],
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="co2"
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              label={t('step2.co2')}
              placeholder={t('step2.enterCO2')}
              min={0}
              value={field.value?.toString()}
              onChange={(e) => field.onChange(Number(e.target.value))}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              classNames={{
                input: ['placeholder:text-default-700/40'],
              }}
            />
          )}
        />
      </div>

      <Controller
        control={form.control}
        name="version"
        render={({ field }) => (
          <Input
            label={t('step2.version')}
            placeholder={t('step2.enterVersion')}
            {...field}
            classNames={{
              input: ['placeholder:text-default-700/40'],
            }}
          />
        )}
      />
    </div>
  );
};

export default Step2;

const BodySelection = ({
  bodies,
  selectedBody,
  onSelect,
  errorMessage,
  isInvalid,
}: {
  bodies: Bodies[];
  selectedBody?: number;
  onSelect: (id: number) => void;
  errorMessage?: string;
  isInvalid?: boolean;
}) => {
  const { t: carFormT } = useTranslation();
  const t = (key: string) => carFormT(`carForm.${key}`);

  const carousel = useRef<HTMLDivElement | null>(null);
  const next = () =>
    (carousel.current as any)?.scrollBy({ left: 300, behavior: 'smooth' });
  const prev = () =>
    (carousel.current as any)?.scrollBy({ left: -300, behavior: 'smooth' });

  //TODO: scroll to the element
  return (
    <div className="w-full col-span-4">
      <span className="px-20">
        {t('step2.selectBody')} <span className="text-red-500">*</span>
      </span>

      <div className="h-3"></div>
      <div className="flex flex-row items-center gap-2">
        <Button variant={'light'} isIconOnly onClick={prev}>
          <ChevronLeft />
        </Button>
        <ScrollShadow
          orientation="horizontal"
          ref={carousel}
          className="flex flex-grow flex-row gap-3 overflow-hidden"
        >
          {bodies.map((b) => {
            const isSelected = selectedBody == b.id;
            return (
              <div
                key={b.id}
                onClick={() => onSelect(b.id)}
                className={cn(
                  'flex min-w-[100px] md:min-w-[140px] cursor-pointer flex-col items-center gap-2 rounded-xl border p-5 transition-all duration-300',
                  isSelected
                    ? 'border-2 border-primary text-primary shadow-2xl'
                    : '',
                )}
              >
                <Image
                  alt={b.name ?? ''}
                  src={b.logo ?? `/body/${b.name}.svg`}
                  width={100}
                  height={70}
                  className="w-[100px] md:w-[140px]"
                />
                <span className="whitespace-nowrap text-sm  text-opacity-70">
                  {b.name}
                </span>
              </div>
            );
          })}
        </ScrollShadow>
        <Button variant={'light'} isIconOnly onClick={next}>
          <ChevronRight />
        </Button>
      </div>
      {isInvalid && errorMessage && (
        <span className="text-red-500 text-sm ml-14">{t(errorMessage)}</span>
      )}
    </div>
  );
};
