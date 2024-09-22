import { Input, Switch, Textarea } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formCarSchema } from './carForm';

const Step6 = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formCarSchema>>;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div id="textarea-wrapper">
          <Textarea
            labelPlacement="outside"
            minRows={6}
            isRequired
            label={'description'}
            classNames={{
              input: ['placeholder:text-default-700/40'],
            }}
          />
        </div>

        <div className="h-2 "></div>
        <Controller
          name="inRange"
          control={form.control}
          render={({ field: { value, onChange } }) => {
            return (
              <Switch isSelected={value ?? undefined} onValueChange={onChange}>
                I want to sell my car in a price range
              </Switch>
            );
          }}
        />
        <div className="space-y-3 pt-2">
          <AnimatePresence>
            {form.watch('inRange') ? (
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                exit={{ opacity: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_20px_auto] items-center gap-1">
                  <Input
                    label="Mininum Price"
                    type="number"
                    isRequired
                    {...form.register('minPrice')}
                    isInvalid={!!form.formState.errors.minPrice}
                    classNames={{
                      input: ['placeholder:text-default-700/40'],
                    }}
                    errorMessage={form.formState.errors.minPrice?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">$</span>
                      </div>
                    }
                  />
                  <div className="md:h-1 h-5 w-1 md:w-5 rounded-md bg-gray-300 mx-auto"></div>
                  <Input
                    label="Maximum Price"
                    type="number"
                    {...form.register('maxPrice')}
                    isInvalid={!!form.formState.errors.maxPrice}
                    errorMessage={form.formState.errors.maxPrice?.message}
                    classNames={{
                      input: ['placeholder:text-default-700/40'],
                    }}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">$</span>
                      </div>
                    }
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                exit={{ opacity: 0.4 }}
              >
                <Input
                  label={'price'}
                  type="number"
                  {...form.register('price')}
                  isInvalid={!!form.formState.errors.price}
                  errorMessage={form.formState.errors.price?.message}
                  classNames={{
                    input: ['placeholder:text-default-700/40'],
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-small text-default-400">$</span>
                    </div>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Step6;
