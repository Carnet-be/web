import { Input } from '@/components/ui/input';
import { Tab, Tabs } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import { GaragesTable } from './sections';
const AdminGaragePage = () => {

  return (
    <div className="space-y-8">
      <div>
        <div>
          <h1>Garages</h1>
          <span className="text-sm text-gray-400">
            Manage all the garages in the platform
          </span>
        </div>
      </div>

      <div>
        <FilterBar />
        <GaragesTable />
      </div>
    </div>
  );
};

export default AdminGaragePage;

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search garages..."
        value={searchParams.get('search') || ''}
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set('search', e.target.value);
          } else {
            searchParams.delete('search');
          }
          setSearchParams(searchParams);
        }}
        className="max-w-sm"
      />
      <Tabs
        selectedKey={searchParams.get('status') || ''}
        onSelectionChange={(value) => {
          if (value) {
            searchParams.set('status', value.toString());
          } else {
            searchParams.delete('status');
          }
          setSearchParams(searchParams);
        }}
      >
        <Tab key="all" value="">
          All Statuses
        </Tab>
        <Tab key="active" value="active">
          Active
        </Tab>
        <Tab key="draft" value="draft">
          Draft
        </Tab>
      </Tabs>
    </div>
  );
};
