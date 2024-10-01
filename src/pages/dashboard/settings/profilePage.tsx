import BackButton from '@/components/backButton';
import AlertError from '@/components/section/alertError';
import LoadingSection from '@/components/section/loadingSection';
import {
  Form,
  FormControl,
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
import validator from '@/lib/validator';
import dataService from '@/services/data.service';
import userService from '@/services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FileWithPath } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

const formSchema = (t: (key: string) => string) =>
  z.object({
    firstName: validator.stringMinMax,
    lastName: validator.stringMinMax,
    username: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: validator.phoneNumber,
    countryId: z.number({
      message: t('profilePage.validation.countryRequired'),
    }),
    cityId: z.number({
      message: t('profilePage.validation.cityRequired'),
    }),
    zipCode: z.string().optional(),
    avatar: z.string().or(z.instanceof(File)).optional(),
  });

const ProfilePage = () => {
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.me(),
  });

  if (isPending) return <LoadingSection className="h-full" />;

  if (isError) return <AlertError refetch={refetch} />;
  return <ProfileForm user={user} />;
};

export default ProfilePage;

export function ProfileForm({
  user,
  onSuccess,
}: {
  user: User;
  onSuccess?: () => void;
}) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      // Populate with user's current data
      countryId: user.countryId, // Default to Morocco
      cityId: user.cityId,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      username: user.username ?? undefined,
      address: user.address ?? undefined,
      zipCode: user.zipCode ?? undefined,
      phoneNumber: user.phoneNumber ?? undefined,
      avatar: user.avatar ?? undefined,
    },
  });

  const { data: cities, isPending } = useQuery({
    queryKey: ['cities', form.watch('countryId')],
    queryFn: () => dataService.getCities(form.watch('countryId')),
    enabled: !!form.watch('countryId'),
  });

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      toast({ title: t('profilePage.toast.success') });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: t('profilePage.toast.error.title'),
        description: t('profilePage.toast.error.description'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (values: z.infer<ReturnType<typeof formSchema>>) => {
    const { avatar, ...rest } = values;
    updateUser({ user: rest, id: user.id, avatar });
  };

  return (
    <div>
      <BackButton />
      <div className="w-full max-w-xl mx-auto p-4 space-y-6 bg-card/80 backdrop-blur-sm rounded-lg">
        <h1 className="text-2xl font-bold">{t('profilePage.title')}</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profilePage.form.avatar')}</FormLabel>
                  <FormControl>
                    <Uploader
                      accept={{ 'image/*': [] }}
                      aspect={1}
                      className="size-[110px]"
                      selectedFile={
                        typeof field.value === 'string'
                          ? null
                          : (field.value as FileWithPath)
                      }
                      defaultPreview={user.avatar}
                      setSelectedFile={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profilePage.form.firstName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profilePage.form.lastName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>{t('profilePage.form.email')}</FormLabel>
              <FormControl>
                <Input value={user.email} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profilePage.form.username')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profilePage.form.address')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
                  <FormLabel>{t('profilePage.form.phoneNumber')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profilePage.form.country')}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('profilePage.form.selectCountry')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Belgium</SelectItem>
                            {/* Add more countries as needed */}
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
                    <FormLabel>{t('profilePage.form.city')}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('profilePage.form.selectCity')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {cities?.map((city) => (
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-5"></div>
            <Button
              fullWidth
              className="mt-4"
              type="submit"
              color="primary"
              isLoading={isLoading}
            >
              {t('profilePage.form.updateButton')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
