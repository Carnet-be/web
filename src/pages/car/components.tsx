/* eslint-disable @typescript-eslint/no-explicit-any */

import RatingStar from '@/components/ui/rating-stars';
import { getImageUrl } from '@/lib/utils';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
export function ContentCarPage({ car }: { car: Car }) {
  const { t: y } = useTranslation();
  const c = (key: string) => y(`common.${key}`);
  const t = (key: string) => y(`car.${key}`);

  const rating = [
    {
      title: t('handling'),
      // list: HANDLING,
      rate: car?.handling,
    },
    {
      title: t('exterior'),
      //list: EXTERIOR,
      rate: car?.exterior,
    },
    {
      title: t('interior'),
      //  list: INTERIOR,
      rate: car?.interior,
    },
    {
      title: t('tires'),
      //list: TIRES,
      rate: car?.tires,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <Card>
        {car.description && (
          <CardHeader>
            <span className="min-w-[100px]">{c('description')} : </span>
          </CardHeader>
        )}
        <CardBody>
          <p className="whitespace-pre-line">{car.description}</p>
          {!car.description && (
            <div className="text-left font-light opacity-50">
              {c('no description')}
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        {car?.options?.length != 0 && (
          <CardHeader>
            <span className="min-w-[100px]">{c('options')} : </span>
          </CardHeader>
        )}
        <CardBody>
          <div className="flex flex-wrap gap-3">
            {car?.options?.map((k, i) => {
              return (
                <div
                  key={i}
                  className="rounded-xl border border-primary p-1 px-2 text-sm text-primary text-opacity-100 opacity-70 transition-all duration-300"
                >
                  {k?.name}
                </div>
              );
            })}
            {car?.options?.length == 0 && (
              <div className="text-center font-light opacity-50">
                {c('no options')}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        {rating.filter((r) => !!r.rate).length != 0 && (
          <CardHeader>
            <span className="min-w-[100px] ">{c('rating')} : </span>
          </CardHeader>
        )}
        <CardBody>
          {rating
            .filter((r) => !!r.rate)
            .map((r, i) => {
              return (
                <div key={i} className="flex flex-row items-center gap-2">
                  <h6 className="min-w-[100px]">{r.title} :</h6>

                  <RatingStar value={r.rate!} />
                </div>
              );
            })}
          {rating.filter((r) => !!r.rate).length == 0 && (
            <div className="text-left font-light opacity-50">
              {c('no rating')}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export const ImagesSection = ({ images }: { images: string[] }) => {
  return (
    <div className="relative">
      {/* <div className="relative flex aspect-[3/2] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border bg-white"> */}
      <ImageGallery
        items={images.map((e) => ({
          original: getImageUrl(e),
          thumbnail: getImageUrl(e),
          orignalHeight: 400,
          originalWidth: 500,
          originalClass: 'min-h-[400px] max-h-[400px] object-cover',
          renderItem: (item) => (
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={item.original}
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
          ),
          thumbnailHeight: 100,
          thumbnailWidth: 100,
        }))}
      />
    </div>
  );
};
