import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import carService from '@/services/car.service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as z from 'zod';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';

export const formCarSchema = (t: any) =>
  z.object({
    brandId: z.coerce.number({
      message: t('carForm.validation.brandRequired'),
    }),
    modelId: z.coerce.number({
      message: t('carForm.validation.modelRequired'),
    }),
    bodyId: z.coerce.number({
      message: t('carForm.validation.bodyRequired'),
    }),
    description: z.string().optional(),
    year: z.coerce
      .number({
        message: t('carForm.validation.yearRequired'),
      })
      .min(1900)
      .max(new Date().getFullYear() + 1),
    color: z.string().optional(),
    fuel: z.enum(['diesel', 'gasoline', 'electric', 'hybrid']),
    isNew: z.boolean().default(false),
    price: z.coerce
      .number()
      .positive(t('carForm.validation.pricePositive'))
      .optional(),
    countryId: z.coerce.number({
      message: t('carForm.validation.countryRequired'),
    }),
    cityId: z.coerce.number({
      message: t('carForm.validation.cityRequired'),
    }),
    address: z.string().optional(),
    phoneNumber: z.string({
      message: t('carForm.validation.phoneRequired'),
    }),
    zipCode: z.string().optional(),
    handling: z.coerce.number().min(0).max(10).optional(),
    tires: z.coerce.number().min(0).max(10).optional(),
    exterior: z.coerce.number().min(0).max(10).optional(),
    interior: z.coerce.number().min(0).max(10).optional(),
    transmission: z.enum(['manual', 'automatic', 'semi-automatic'], {
      message: t('carForm.validation.transmissionRequired'),
    }),
    inRange: z.boolean().default(false),
    doors: z.enum(['2', '3', '4', '5', '6', '7', '8']).optional(),
    cv: z.coerce.number().positive().optional(),
    cc: z.coerce.number().positive().optional(),
    co2: z.coerce.number().nonnegative().optional(),
    kilometrage: z.coerce.number({
      message: t('carForm.validation.kilometrageRequired'),
    }),
    version: z.string().optional(),
    images: z
      .array(z.string().or(z.instanceof(File)))
      .min(2, {
        message: t('carForm.validation.minImagesRequired'),
      })
      .default([]),
    isAuction: z.boolean().default(false),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    options: z.array(z.number()).optional(),
  });

export default function CreateCar({
  car,
  data,
  onSuccess,
}: {
  car?: Car;
  onSuccess?: () => void;
  data: {
    brands: Brand[];
    models: Model[];
    bodies: Bodies[];
    carOptions: CarOption[];
    countries: Country[];
    cities: City[];
  };
}) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [publishSuccess, setPublishSuccess] = useState(false);
  const form = useForm<z.infer<ReturnType<typeof formCarSchema>>>({
    resolver: zodResolver(formCarSchema(t)),
    defaultValues: {
      countryId: car?.countryId,
      cityId: car?.cityId,
      address: car?.address,
      phoneNumber: car?.phoneNumber,
      zipCode: car?.zipCode,
      handling: car?.handling,
      tires: car?.tires,
      exterior: car?.exterior,
      interior: car?.interior,
      transmission: car?.transmission,
      inRange: car?.inRange ?? false,
      doors: car?.doors,
      cv: car?.cv,
      cc: car?.cc,
      co2: car?.co2,
      kilometrage: car?.kilometrage,
      version: car?.version,
      images: car?.images,
      isAuction: car?.isAuction,
      minPrice: car?.minPrice,
      maxPrice: car?.maxPrice,
      options: car?.options?.map((option) => option.id),
      isNew: car?.isNew ?? false,
      price: car?.price,
      description: car?.description,
      brandId: car?.brandId ?? Number(searchParams.get('brand')) ?? undefined,
      modelId: car?.modelId ?? Number(searchParams.get('model')) ?? undefined,
      bodyId: car?.bodyId ?? Number(searchParams.get('body')) ?? undefined,
      fuel: car?.fuel ?? (searchParams.get('fuel') as Car['fuel']) ?? undefined,
      year: car?.year ?? Number(searchParams.get('year')) ?? undefined,
      color: car?.color,

      // phoneNumber: user.phoneNumber,
    },
  });

  console.log(car);
  const { mutate, isPending: isCreatingCar } = useMutation({
    mutationFn: carService.createCar,
    onSuccess: () => {
      toast({ title: t('carForm.toast.carAddedSuccess') });
      setPublishSuccess(true);
      onSuccess?.();
    },
    onError: (err) => {
      console.log(err);
      setPublishSuccess(false);
      toast({
        title: t('carForm.toast.errorAddingCar'),
        description: t('carForm.toast.somethingWentWrong'),
        variant: 'destructive',
      });
    },
  });

  const { mutate: mutateUpdate, isPending: isUpdatingCar } = useMutation({
    mutationFn: carService.updateCar,
    onSuccess: () => {
      toast({ title: t('carForm.toast.carUpdatedSuccess') });
      onSuccess?.();
      nav(-1);
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: t('carForm.toast.errorUpdatingCar'),
        description: t('carForm.toast.somethingWentWrong'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: z.infer<ReturnType<typeof formCarSchema>>) => {
    const { images, ...data } = values;
    if (car) {
      mutateUpdate({ data: data as any, images, id: car.id });
    } else {
      mutate({ data: data as any, images });
    }
    //  createShopMutation.mutate({ ...values });
  };

  const nextStep = async () => {
    if (step === 1) {
      const result = await form.trigger(['brandId', 'modelId', 'year', 'fuel']);
      if (!result) return;
      //   if (slugAvailability !== 'available') {
      //     toast({
      //       title: 'Slug is not available',
      //       description: 'Please choose a different slug',
      //       variant: 'destructive',
      //     });
      //     return;
      //   }
    }
    if (step === 2) {
      const result = await form.trigger([
        'bodyId',
        'transmission',
        'kilometrage',
      ]);
      if (!result) return;
    }
    if (step === 5) {
      const result = await form.trigger([
        'countryId',
        'cityId',
        'images',
        'phoneNumber',
      ]);
      if (!result) return;
    }
    if (step === 6) {
      const result = await form.trigger(['description']);
      if (!result) return;
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };
  const nav = useNavigate();

  const steps = [
    t('carForm.steps.carDetails'),
    t('carForm.steps.specifications'),
    t('carForm.steps.features'),
    t('carForm.steps.condition'),
    t('carForm.steps.location'),
    t('carForm.steps.description'),
  ];

  return (
    <>
      <Modal
        isOpen={isCreatingCar || isUpdatingCar || publishSuccess}
        closeButton={false}
        hideCloseButton={true}
      >
        <ModalContent>
          {() => (
            <>
              {isCreatingCar || isUpdatingCar ? (
                <ModalBody className="flex flex-col gap-5 text-center justify-center items-center py-20">
                  {isUpdatingCar ? (
                    <p>{t('carForm.modal.updatingCar')}</p>
                  ) : (
                    <p>{t('carForm.modal.publishingCar')}</p>
                  )}
                  <Spinner />
                </ModalBody>
              ) : (
                <>
                  <ModalBody className="flex flex-col gap-5 text-center justify-center items-center py-10">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                    <p>{t('carForm.modal.carPublished')}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        setPublishSuccess(false);
                        form.reset();
                        setStep(1);
                      }}
                    >
                      {t('carForm.modal.publishAnother')}
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => nav(`/dashboard/my-cars`)}
                    >
                      {t('carForm.modal.viewCars')}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full max-w-3xl p-4 space-y-3 bg-card/80 backdrop-blur-sm rounded-lg mx-auto">
        <div className="pt-5 pb-10">
          <h1 className="text-2xl font-bold text-center">
            {t('carForm.title')}
          </h1>
          <p className="text-sm text-center">{t('carForm.subtitle')}</p>
        </div>

        {/* Updated stepper component */}
        <div className="flex flex-wrap justify-between pb-14 relative">
          {steps.map((stepName, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-1/3 sm:w-auto mb-4 sm:mb-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step > index + 1
                    ? 'bg-primary text-primary-foreground'
                    : step === index + 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > index + 1 ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 text-center">{stepName}</span>
            </div>
          ))}
          {/* Line connecting steps */}
          <div className="absolute top-4 left-0 w-full h-[2px] bg-muted -z-10 hidden sm:block" />
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
                  <Step1
                    form={form}
                    data={{
                      brands: data?.brands ?? [],
                      models: data?.models ?? [],
                    }}
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
                  <Step2
                    form={form}
                    data={{
                      bodies: data?.bodies ?? [],
                    }}
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
                  <Step3
                    form={form}
                    data={{
                      options: data?.carOptions ?? [],
                    }}
                  />
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Step4 form={form} />
                </motion.div>
              )}
              {step === 5 && (
                <motion.div
                  key="step5"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Step5
                    form={form}
                    data={{
                      countries: data?.countries ?? [],
                      cities: data?.cities ?? [],
                    }}
                  />
                </motion.div>
              )}
              {step === 6 && (
                <motion.div
                  key="step6"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Step6 form={form} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between py-8 gap-5">
              <div className="grow"></div>
              {step > 1 && (
                <Button type="button" variant="ghost" onClick={prevStep}>
                  {t('carForm.buttons.previous')}
                </Button>
              )}
              {step < 6 ? (
                <>
                  <Button type="button" color="primary" onClick={nextStep}>
                    {t('carForm.buttons.next')}
                  </Button>
                </>
              ) : (
                <Button type="submit" color="primary" isLoading={isCreatingCar}>
                  {car
                    ? t('carForm.buttons.updateCar')
                    : t('carForm.buttons.publishCar')}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
