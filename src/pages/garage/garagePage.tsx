import Share from '@/components/share';
import { getImageUrl } from '@/lib/utils';
import { Divider } from '@nextui-org/react';
import { Map, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../home';

const GaragePageView = ({ children }: { children: Garage }) => {
  const garage = children;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{children.name}</title>
        <meta name="description" content={children.description} />
        <link rel="canonical" href={`https://carnet.be/${children.slug}`} />
        <link rel="icon" href={children.logo} type="image/png" />
        <meta property="og:title" content={children.name} />
        <meta property="og:description" content={children.description} />
        <meta property="og:image" content={children.logo} />
        <meta
          property="og:url"
          content={`https://carnet.be/${children.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={children.name} />
        <meta name="twitter:description" content={children.description} />
        <meta name="twitter:image" content={children.logo} />
      </Helmet>
      <NavBar home={false} />
      <div className="relative h-[300px] w-full ">
        <img
          src={getImageUrl(garage.cover)}
          alt={`Cover - ${garage.name}`}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="h-[300px] w-full object-cover"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col px-4">
        <div className="absolute right-3 top-6 z-10">
          <Share link={`/${garage.slug}`} />
        </div>
        <div className="w-full -translate-y-[60px] space-y-3">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-green-300 ring-4 ring-white ring-offset-0">
            <img
              src={getImageUrl(garage.logo)}
              alt={`Logo - ${name}`}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          <h1 className="text-2xl text-black">{garage.name}</h1>

          <p className="max-w-[600px] whitespace-pre-line">
            {garage.description}
          </p>

          <div className="max-w-[500px] space-y-1 rounded-md bg-white/80 p-4">
            <div className="flex items-center space-x-2">
              <Phone className="text-primary" />
              <span className="text-sm text-gray-500">
                {garage.phoneNumber ?? '---'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Map className="text-primary" />
              <span className="text-sm text-gray-500">
                {garage.address ?? '---'}
              </span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="py-2"></div>
        <Outlet />
        <div className="py-10"></div>
      </div>
    </div>
  );
};

export default GaragePageView;
