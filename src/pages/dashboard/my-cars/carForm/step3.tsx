import { cn } from '@/lib/utils';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step3 = ({
  form,
  data: { options },
}: {
  form: UseFormReturn<z.infer<ReturnType<typeof formCarSchema>>>;
  data: {
    options: CarOption[];
  };
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
      {options.map((o) => {
        return (
          <Controller
            key={o.id}
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <div
                onClick={() => {
                  if (value?.includes(o.id)) {
                    const newList = value || [];
                    newList.splice(newList.indexOf(o.id), 1);
                    onChange(newList);
                  } else {
                    const newList = value ?? [];
                    newList.push(o.id);
                    onChange(newList);
                  }
                }}
                className={cn(
                  'cursor-pointer rounded-xl border md:p-3 p-2 md:text-sm text-xs opacity-70 transition-all duration-300',
                  value?.includes(o.id)
                    ? ' border-primary text-primary text-opacity-100 shadow-2xl'
                    : '',
                )}
              >
                {t(`carForm.step3.options.${o.name}`, { defaultValue: o.name })}
              </div>
            )}
            name={'options'}
          />
        );
      })}
    </div>
  );
};

export default Step3;
