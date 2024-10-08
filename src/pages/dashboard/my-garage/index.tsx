import BackButton from '@/components/backButton';
import ErrorSection from '@/components/section/errorSection';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Uploader from '@/components/ui/uploader';
import { useToast } from '@/components/ui/use-toast';
import validator from '@/lib/validator';
import dataService from '@/services/data.service';
import garageService from '@/services/garage.service';
import userService from '@/services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

const GarageProfilePage = () => {
  const { t } = useTranslation();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.me(),
  });
  const nav = useNavigate();
  if (!user?.garage) {
    return <ErrorSection />;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-row gap-2 container justify-end ">
        <BackButton />
        <div className="flex-1" />
        <Button
          onClick={() => {
            nav('/' + user.garage?.slug);
          }}
        >
          {t('garage.visit')}
        </Button>
      </div>
      <UpdateGarageForm garage={user.garage} />
    </div>
  );
};

export default GarageProfilePage;

const formSchema = z.object({
  name: validator.stringMinMax,
  description: z.string().optional(),
  logo: z.any(),
  cover: z.any(),
  countryId: z.number({
    message: 'Country is required',
  }),
  cityId: z.number({
    message: 'City is required',
  }),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: validator.phoneNumber,
  state: z.enum(['active', 'draft']).optional(),
});

function UpdateGarageForm({
  garage,
  onSuccess,
}: {
  garage: Garage;
  onSuccess?: () => void;
}) {
  const { t: c } = useTranslation();
  const t = (key: string) => c('garage.form.' + key);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: garage.name,
      description: garage.description ?? undefined,

      countryId: garage.countryId,
      cityId: garage.cityId,
      address: garage.address,
      zipCode: garage.zipCode,
      phoneNumber: garage.phoneNumber,
      state: garage.state,
    },
  });

  const { data: cities, isPending } = useQuery({
    queryKey: ['cities', form.watch('countryId')],
    queryFn: () => dataService.getCities(form.watch('countryId')),
    enabled: !!form.watch('countryId'),
  });

  const updateGarageMutation = useMutation({
    mutationFn: garageService.updateGarage,
    onSuccess: () => {
      toast({ title: t('garage.update_success') });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: t('garage.update_error'),
        description: t('garage.update_error_description'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateGarageMutation.mutate({
      ...values,
      id: garage.id,
      slug: garage.slug,
      state: values.state ?? 'active',
    });
  };

  return (
    <div className="w-full max-w-xl p-4 space-y-3 bg-card/80 backdrop-blur-sm rounded-lg">
      <div className="py-5">
        <h1 className="text-2xl font-bold text-center">
          {t('garage.update_title')}
        </h1>
        <p className="text-sm text-center">{t('garage.update_description')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>{t('garage.state')}</FormLabel>
                <FormControl>
                  <Tabs
                    aria-label="Tabs sizes"
                    selectedKey={field.value}
                    onSelectionChange={field.onChange}
                  >
                    <Tab key="active" title={t('garage.state_active')} />
                    <Tab key="draft" title={t('garage.state_draft')} />
                  </Tabs>
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
                    accept={{ 'image/*': [] }}
                    aspect={1 / 1}
                    className="size-[110px]"
                    selectedFile={field.value || null}
                    setSelectedFile={field.onChange}
                    defaultPreview={garage.logo}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('garage.cover')}</FormLabel>
                <FormControl>
                  <Uploader
                    accept={{ 'image/*': [] }}
                    aspect={16 / 9}
                    selectedFile={field.value || null}
                    className="w-full aspect-video"
                    setSelectedFile={field.onChange}
                    defaultPreview={garage.cover}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label={t('garage.name')} {...field} isRequired />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input
            label={t('garage.slug')}
            value={garage.slug}
            isReadOnly
            isRequired
            isDisabled
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    label={t('garage.phone_number')}
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea label={t('garage.description')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      label={t('garage.select_country')}
                      isRequired
                      selectedKeys={[field.value?.toString()]}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    >
                      <SelectItem key={1} value="1">
                        {t('garage.country_belgium')}
                      </SelectItem>
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
                  <FormControl>
                    <div className="relative">
                      <Select
                        isRequired
                        label={t('garage.select_city')}
                        selectedKeys={[field.value?.toString()]}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        isDisabled={isPending}
                      >
                        {(cities ?? []).map((city) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </Select>
                      {isPending && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                        </div>
                      )}
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
                <FormControl>
                  <Textarea {...field} label={t('garage.address')} />
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
                <FormControl>
                  <Input {...field} label={t('garage.zip_code')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row md:justify-end justify-center py-6 gap-2">
            <Button
              type="submit"
              color="primary"
              isLoading={updateGarageMutation.isPending}
            >
              {t('garage.update_button')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
