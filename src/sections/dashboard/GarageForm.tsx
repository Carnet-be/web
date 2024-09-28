import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Uploader from '@/components/ui/uploader';
import { useToast } from '@/components/ui/use-toast';
import query from '@/lib/query';
import validator from '@/lib/validator';
import {
  default as garageService,
  default as shopService,
} from '@/services/garage.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { Check, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export default function CreateGarage({
  data,
  user,
  onSuccess,
}: {
  user: User;
  onSuccess?: () => void;
  data: {
    countries: Country[];
    cities: City[];
  };
}) {
  const { t: tCommon } = useTranslation();
  const t = (key: string) => tCommon('createGarage.' + key);

  const formSchema = z.object({
    name: validator.stringMinMax,
    slug: validator.stringMinMax.transform((val) =>
      val
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/-/g, '_')
        .replace(/[^a-z0-9_]/g, ''),
    ),
    description: z.string().optional(),
    logo: z.instanceof(File).optional(),
    cover: z.instanceof(File).optional(),
    countryId: z.number({
      message: t('garage.countryRequired'),
    }),
    cityId: z.number({
      message: t('garage.cityRequired'),
    }),
    address: z.string().optional(),
    zipCode: z.string().optional(),
    phoneNumber: validator.phoneNumber,
  });

  const [step, setStep] = useState(1);

  const [slugAvailability, setSlugAvailability] = useState<
    'available' | 'unavailable' | 'checking' | null
  >(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryId: 1,
      phoneNumber: user.phoneNumber,
    },
  });
  // const { data: cities, isPending } = useQuery({
  //   queryKey: ['cities', form.watch('countryId')],
  //   queryFn: () => dataService.getCities(form.watch('countryId')),
  //   enabled: !!form.watch('countryId'),
  // });
  const createShopMutation = useMutation({
    mutationFn: garageService.createShop,
    onSuccess: () => {
      toast({ title: t('garage.createSuccess') });
      onSuccess?.();
      query.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => {
      toast({
        title: t('garage.createError'),
        description: t('garage.createErrorDescription'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    createShopMutation.mutate({ ...values });
  };

  const nextStep = async () => {
    if (step === 1) {
      const result = await form.trigger(['name', 'slug', 'description']);
      if (!result) return;
      if (slugAvailability !== 'available') {
        toast({
          title: t('garage.slugUnavailable'),
          description: t('garage.createErrorDescription'),
          variant: 'destructive',
        });
        return;
      }
    } else if (step === 2) {
      const result = await form.trigger(['logo', 'cover']);
      if (!result) return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const checkSlugAvailability = useCallback(
    debounce(async (slug: string) => {
      if (slug.length < 3) return;
      setSlugAvailability('checking');
      try {
        const isAvailable = await shopService.checkSlugAvailability(slug);
        setSlugAvailability(
          isAvailable.isAvailable ? 'available' : 'unavailable',
        );
      } catch (error) {
        console.error('Error checking slug availability:', error);
        setSlugAvailability(null);
      }
    }, 500),
    [],
  );

  return (
    <div className="w-full max-w-xl p-4 space-y-3 bg-card/80 backdrop-blur-sm rounded-lg">
      <div className="py-5">
        <h1 className="text-2xl font-bold text-center">
          {t('garage.createTitle')}
        </h1>
        <p className="text-sm text-center">{t('garage.createDescription')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.slug')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            onChange={(e) => {
                              const formattedSlug = e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, '_')
                                .replace(/-/g, '_')
                                .replace(/[^a-z0-9_]/g, '');
                              field.onChange(formattedSlug);
                              checkSlugAvailability(formattedSlug);
                            }}
                          />
                          {slugAvailability && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              {slugAvailability === 'available' && (
                                <Check className="w-5 h-5 text-green-500" />
                              )}
                              {slugAvailability === 'unavailable' && (
                                <X className="w-5 h-5 text-red-500" />
                              )}
                              {slugAvailability === 'checking' && (
                                <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      {slugAvailability && (
                        <p
                          className={`text-sm ${
                            slugAvailability === 'available'
                              ? 'text-green-600'
                              : slugAvailability === 'unavailable'
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }`}
                        >
                          {slugAvailability === 'available' &&
                            t('garage.slugAvailable')}
                          {slugAvailability === 'unavailable' &&
                            t('garage.slugUnavailable')}
                          {slugAvailability === 'checking' &&
                            t('garage.slugChecking')}
                        </p>
                      )}
                      <FormDescription>
                        {t('garage.slugDescription')}
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.description')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.cover')}</FormLabel>
                      <FormControl>
                        <Uploader
                          accept={{
                            'image/*': [],
                          }}
                          aspect={16 / 9}
                          selectedFile={field.value || null}
                          className="aspect-video w-[300px]"
                          setSelectedFile={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.logo')}</FormLabel>
                      <FormControl>
                        <Uploader
                          accept={{
                            'image/*': [],
                          }}
                          aspect={1 / 1}
                          className="size-[110px]"
                          selectedFile={field.value || null}
                          setSelectedFile={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('garage.country')}</FormLabel>
                        <FormControl>
                          <Select
                            required
                            value={field.value?.toString()}
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('garage.selectCountry')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {data.countries.map((country) => (
                                  <SelectItem
                                    key={country.id}
                                    value={country.id.toString()}
                                  >
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cityId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('garage.city')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t('garage.selectCity')}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {data.cities
                                    .filter(
                                      (city) =>
                                        city.countryId ===
                                        form.watch('countryId'),
                                    )
                                    .map((city) => (
                                      <SelectItem
                                        key={city.id}
                                        value={city.id.toString()}
                                      >
                                        {city.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.address')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.zipCode')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('garage.phoneNumber')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^0-9+]/g, '');
                            if (value && !value.startsWith('+')) {
                              value = '+' + value;
                            }
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between py-6 gap-2">
            <Button type="button" variant="light" onClick={() => onSuccess?.()}>
              {tCommon('common.cancel')}
            </Button>
            <div className="grow"></div>
            {step > 1 && (
              <Button type="button" variant="ghost" onClick={prevStep}>
                {tCommon('common.previous')}
              </Button>
            )}
            {step < 3 ? (
              <>
                <Button
                  isDisabled={slugAvailability !== 'available'}
                  type="button"
                  color="primary"
                  onClick={nextStep}
                >
                  {tCommon('common.next')}
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                color="primary"
                isLoading={createShopMutation.isPending}
              >
                {t('garage.create')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
