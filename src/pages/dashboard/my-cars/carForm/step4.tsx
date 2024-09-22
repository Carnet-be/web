import RatingStar from '@/components/ui/rating-stars';
import { Divider } from '@nextui-org/react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step4 = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formCarSchema>>;
}) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <Controller
        control={form.control}
        render={({ field: { value, onChange } }) => (
          <div className="grid w-full grid-cols-[80px_3px_auto] md:grid-cols-[300px_3px_auto] items-center gap-3">
            <span className="text-end font-semibold">Handling</span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('handling.1'),
                t('handling.2'),
                t('handling.3'),
                t('handling.4'),
                t('handling.5'),
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
            <span className="text-end font-semibold">Exterion</span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('exterior.1'),
                t('exterior.2'),
                t('exterior.3'),
                t('exterior.4'),
                t('exterior.5'),
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
            <span className="text-end font-semibold">Interior</span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('interior.1'),
                t('interior.2'),
                t('interior.3'),
                t('interior.4'),
                t('interior.5'),
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
            <span className="text-end font-semibold">Tires</span>
            <Divider orientation="vertical" />
            <RatingStar
              value={value ?? undefined}
              onChange={onChange}
              tooltips={[
                t('tires.1'),
                t('tires.2'),
                t('tires.3'),
                t('tires.4'),
                t('tires.5'),
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
