import * as z from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
// routes
import { useNavigate } from 'react-router-dom';
// form
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// @ui
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

// Translation
import { useTranslation } from 'react-i18next';

export const newShopSchema = z.object({
    shopName: z.string().min(1, 'Shop name is required'),
    shopDescription: z.string().min(1, 'Description is required'),
    shopLogo: z.instanceof(File).optional(),
    shopEmail: z.string().email('Invalid email address'),
    shopPhoneNumber: z.string().min(1, 'Phone number is required'),
    shopAdress: z.string().min(1, 'Address is required'),
});

const ShopForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [image, setImage] = useState<string | null>(null);
    const methods = useForm({
        resolver: zodResolver(newShopSchema),
    });

    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = methods;

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            toast.success('Shop created successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create shop.');
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setValue('shopLogo', file);
        }
    };

    return (
        <FormProvider {...methods}>
            <Card>
                <CardHeader>
                    <CardTitle>{t('shopSection.createShop')}</CardTitle>
                    <CardDescription className="text-xs md:text-base lg:text-lg">
                        {t('shopSection.createShopDescription')}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="p-4 md:p-5 max-w-full md:max-w-fit w-full flex flex-col md:flex-row items-center">
                            <Avatar className="mb-4 md:mb-0 md:mr-4 h-[60px] w-[60px] bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                                <AvatarImage
                                    src={image || `https://avatar.vercel.sh/${'selectedTeam.value'}.png`}
                                    alt={'alt'}
                                    className="object-cover h-full w-full"
                                />
                                <AvatarFallback className="text-sm">SC</AvatarFallback>
                            </Avatar>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="
                                dark:file:text-white 
                                w-full md:w-auto text-sm px-2 py-1 file:mr-0 md:file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1.5">
                            <div className="col-span-1 md:col-span-2 p-2">
                                <Label htmlFor="shopName">{t('shopSection.shopName')}</Label>
                                <Input
                                    className='rounded-sm'
                                    id="shopName"
                                    placeholder={t('shopSection.enterShopName')}
                                    type="text"
                                    {...register('shopName')}
                                />
                                {errors.shopName && (
                                    <p className="text-red-500 text-sm">
                                        {t('shopSection.errors.shopNameRequired')}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-1 w-full p-1">
                                <Label htmlFor="shopDescription">{t('shopSection.description')}</Label>
                                <Textarea
                                    cols={30}
                                    id='shopDescription'
                                    placeholder={t('shopSection.enterShopDescription')}
                                    {...register('shopDescription')}
                                    className="resize-none border rounded-sm w-full p-2"
                                />
                                {errors.shopDescription
                                    && (
                                        <p className="text-red-500 text-sm">
                                            {t('shopSection.errors.descriptionRequired')}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="col-span-1 w-full p-1">
                                <div className="">
                                    <Label htmlFor="shopEmail">{t('shopSection.emailShop')}</Label>
                                    <Input
                                        id='shopEmail'
                                        placeholder={t('shopSection.enterEmailShop')}
                                        {...register('shopEmail')}
                                    />
                                    {errors.shopEmail
                                        && (
                                            <p className="text-red-500 text-sm">
                                                {t('shopSection.errors.invalidEmail')}
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="">
                                    <Label htmlFor="shopPhoneNumber">{t('shopSection.shopPhoneNumber')}</Label>
                                    <Input
                                        id='shopPhoneNumber'
                                        placeholder={t('shopSection.enterShopPhoneNumber')}
                                        {...register('shopPhoneNumber')}
                                    />
                                    {errors.shopPhoneNumber
                                        && (
                                            <p className="text-red-500 text-sm">
                                                {t('shopSection.errors.phoneNumberRequired')}
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="">
                                    <Label htmlFor="shopAdress">{t('shopSection.shopAddress')}</Label>
                                    <Input
                                        id='shopAdress'
                                        placeholder={t('shopSection.enterShopAddress')}
                                        {...register('shopAdress')}
                                    />
                                    {errors.shopAdress
                                        && (
                                            <p className="text-red-500 text-sm">
                                                {t('shopSection.errors.addressRequired')}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <div className="flex w-full justify-end">
                            <Button type="submit"
                                className='p-5'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('shopSection.Submitting') : t('shopSection.submit')}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </FormProvider>
    );
};

export default ShopForm;
