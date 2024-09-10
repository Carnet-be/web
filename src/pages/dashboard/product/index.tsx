import { TableSectionSkeleton } from '@/components/section/tableSectionSkeletton';

import { useQuery } from '@tanstack/react-query';

const ProductPage = () => {
  const { isLoading } = useQuery({
    queryKey: ['sets'],
    // queryFn: setService.get,
  });

  if (isLoading) return <TableSectionSkeleton />;
};

export default ProductPage;
