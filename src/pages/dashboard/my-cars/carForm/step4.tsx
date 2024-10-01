import RatingStar from '@/components/ui/rating-stars';
import { Divider } from '@nextui-org/react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step4 = ({
  form,
}: {
  form: UseFormReturn<z.infer<ReturnType<typeof formCarSchema>>>;
}) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <Controller
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <div className="grid w-full grid-cols-[80px_3px_auto] md:grid-cols-[300px_3px_auto] items-center gap-3">
            <span className="text-end font-semibold">
              {t('carForm.step4.handling.label')}
            </span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('carForm.step4.handling.options.1'),
                t('carForm.step4.handling.options.2'),
                t('carForm.step4.handling.options.3'),
                t('carForm.step4.handling.options.4'),
                t('carForm.step4.handling.options.5'),
              ]}
            />
          </div>
        )}
        name="handling"
      />
      <Controller
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <div className="grid w-full grid-cols-[80px_3px_auto] md:grid-cols-[300px_3px_auto] items-center gap-3">
            <span className="text-end font-semibold">
              {t('carForm.step4.exterior.label')}
            </span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('carForm.step4.exterior.options.1'),
                t('carForm.step4.exterior.options.2'),
                t('carForm.step4.exterior.options.3'),
                t('carForm.step4.exterior.options.4'),
                t('carForm.step4.exterior.options.5'),
              ]}
            />
          </div>
        )}
        name="exterior"
      />
      <Controller
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <div className="grid w-full grid-cols-[80px_3px_auto] md:grid-cols-[300px_3px_auto] items-center gap-3">
            <span className="text-end font-semibold">
              {t('carForm.step4.interior.label')}
            </span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('carForm.step4.interior.options.1'),
                t('carForm.step4.interior.options.2'),
                t('carForm.step4.interior.options.3'),
                t('carForm.step4.interior.options.4'),
                t('carForm.step4.interior.options.5'),
              ]}
            />
          </div>
        )}
        name="interior"
      />
      <Controller
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <div className="grid w-full grid-cols-[80px_3px_auto] md:grid-cols-[300px_3px_auto] items-center gap-3">
            <span className="text-end font-semibold">
              {t('carForm.step4.tires.label')}
            </span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('carForm.step4.tires.options.1'),
                t('carForm.step4.tires.options.2'),
                t('carForm.step4.tires.options.3'),
                t('carForm.step4.tires.options.4'),
                t('carForm.step4.tires.options.5'),
              ]}
            />
          </div>
        )}
        name="tires"
      />
    </div>
  );
};

export default Step4;
