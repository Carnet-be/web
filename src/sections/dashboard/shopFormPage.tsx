import { Button } from '@/components/ui/button';
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
import { LoaderButton } from '@/components/ui/loader-button';
import { PhoneInput } from '@/components/ui/phone-input';
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
import dataService from '@/services/data.service';
import shopService from '@/services/shop.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { Check, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(255, { message: 'Name must be at most 255 characters' }),
  slug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters' })
    .max(255, { message: 'Slug must be at most 255 characters' })
    .transform((val) =>
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
    message: 'Country is required',
  }),
  cityId: z.number({
    message: 'City is required',
  }),
  address: z.string().optional(),
  zipCode: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const cleaned = val.replace(/\s/g, '');
      const pattern = /^\d{5}$/;
      return pattern.test(cleaned);
    }, 'Zip code must be a 5-digit number'),
  phoneNumber: z.string(),
});

export default function CreateShop({
  user,
  onSuccess,
}: {
  user: Seller;
  onSuccess?: () => void;
}) {
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
  const { data: cities, isPending } = useQuery({
    queryKey: ['cities', form.watch('countryId')],
    queryFn: () => dataService.getCities(form.watch('countryId')),
    enabled: !!form.watch('countryId'),
  });
  const createShopMutation = useMutation({
    mutationFn: shopService.createShop,
    onSuccess: (shop) => {
      toast({ title: 'Shop created successfully' });
      query.setQueryData(['seller-me'], (data: Seller) => {
        return {
          ...data,
          selectedShop: shop,
          shops: [...data.shops, shop],
        };
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: 'Error creating shop',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createShopMutation.mutate({ ...values });
  };

  const nextStep = async () => {
    if (step === 1) {
      const result = await form.trigger(['name', 'slug', 'description']);
      if (!result) return;
      if (slugAvailability !== 'available') {
        toast({
          title: 'Slug is not available',
          description: 'Please choose a different slug',
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
        <h1 className="text-2xl font-bold text-center">Create Your Shop</h1>
        <p className="text-sm text-center">
          Please fill in the following information to create your shop.
        </p>
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
                      <FormLabel>Shop Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your shop that will be displayed to
                        the public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
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
                            'Slug is available'}
                          {slugAvailability === 'unavailable' &&
                            'Slug is not available'}
                          {slugAvailability === 'checking' &&
                            'Checking availability...'}
                        </p>
                      )}
                      <FormDescription>
                        This is the slug of your shop that will be used in the
                        URL. It should be lowercase, with spaces and dashes
                        replaced by underscores. Once you create your shop, you
                        will not be able to change it.
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the description of your shop that will be
                        displayed to the public. Be creative and write a
                        description that will attract the attention of your
                        customers.
                      </FormDescription>
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
                      <FormLabel>Cover</FormLabel>
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
                      <FormDescription>
                        This is the cover of your shop. Make sure it has a good
                        resolution and good quality.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
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
                      <FormDescription>
                        This is the logo of your shop that will be displayed
                        almost everywhere. Make sure to have a good logo that
                        represents your shop.
                      </FormDescription>
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
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select
                            required
                            value={field.value?.toString()}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="1">Morocco</SelectItem>
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
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              disabled={isPending}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a city" />
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
                      <FormLabel>Address</FormLabel>
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
                      <FormLabel>Zip Code</FormLabel>
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the phone number of your shop that will be
                        displayed to the public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between py-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <>
                <div className="grow"></div>
                <Button
                  disabled={slugAvailability !== 'available'}
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </Button>
              </>
            ) : (
              <LoaderButton
                type="submit"
                isLoading={createShopMutation.isPending}
              >
                Create Shop
              </LoaderButton>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
