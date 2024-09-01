interface WidgetData {
  amount: number;
  growth: number;
}

interface OrderStatus {
  statuses: { status: string; count: number }[];
  table: {
    order: string;
    status: string;
    date: string;
    amount: number;
  }[];
}

interface CustomerActivity {
  count: number;
  label: string;
}

interface ProductInventory {
  quantity: number;
  name: string;
}

interface Notification {
  message: string;
  time: string;
}

interface StaticDataType {
  totalSales: WidgetData;
  revenue: WidgetData;
  orders: WidgetData;
  newCustomers: WidgetData;
  orderStatus: OrderStatus;
  customerActivity: CustomerActivity[];
  productInventory: ProductInventory[];
  notifications: Notification[];
}

const staticData = (timeframe: string): StaticDataType => {
  switch (timeframe) {
    case 'today':
      return {
        totalSales: {
          amount: 1000,
          growth: 10,
        },
        revenue: {
          amount: 500,
          growth: 5,
        },
        orders: {
          amount: 50,
          growth: 20,
        },
        newCustomers: {
          amount: 10,
          growth: 100,
        },
        orderStatus: {
          statuses: [
            { status: 'Pending', count: 10 },
            { status: 'Shipped', count: 20 },
            { status: 'Delivered', count: 30 },
          ],
          table: [
            {
              order: 'Order #1234',
              status: 'Pending',
              date: '2024-08-01',
              amount: 123.45,
            },
            {
              order: 'Order #5678',
              status: 'Shipped',
              date: '2024-08-05',
              amount: 234.56,
            },
            {
              order: 'Order #9101',
              status: 'Delivered',
              date: '2024-08-10',
              amount: 345.67,
            },
          ],
        },
        customerActivity: [
          { label: 'New Registrations', count: 10 },
          { label: 'Active Customers', count: 50 },
          { label: 'Retention Rate', count: 80 },
        ],
        productInventory: [
          { name: 'In Stock', quantity: 100 },
          { name: 'Low Stock', quantity: 20 },
          { name: 'Out of Stock', quantity: 5 },
        ],
        notifications: [
          { message: 'Your order has been shipped', time: '2 hours ago' },
          { message: 'New comment on your post', time: '1 day ago' },
          { message: 'Password changed successfully', time: '3 days ago' },
        ],
      };

    case 'this_week':
      return {
        totalSales: {
          amount: 5000,
          growth: 15,
        },
        revenue: {
          amount: 2000,
          growth: 10,
        },
        orders: {
          amount: 200,
          growth: 25,
        },
        newCustomers: {
          amount: 50,
          growth: 150,
        },
        orderStatus: {
          statuses: [
            { status: 'Pending', count: 50 },
            { status: 'Shipped', count: 100 },
            { status: 'Delivered', count: 150 },
          ],
          table: [
            {
              order: 'Order #1234',
              status: 'Pending',
              date: '2024-08-01',
              amount: 123.45,
            },
            {
              order: 'Order #5678',
              status: 'Shipped',
              date: '2024-08-05',
              amount: 234.56,
            },
            {
              order: 'Order #9101',
              status: 'Delivered',
              date: '2024-08-10',
              amount: 345.67,
            },
          ],
        },
        customerActivity: [
          { label: 'New Registrations', count: 50 },
          { label: 'Active Customers', count: 200 },
          { label: 'Retention Rate', count: 85 },
        ],
        productInventory: [
          { name: 'In Stock', quantity: 500 },
          { name: 'Low Stock', quantity: 50 },
          { name: 'Out of Stock', quantity: 10 },
        ],
        notifications: [
          { message: 'Your order has been shipped', time: '2 hours ago' },
          { message: 'New comment on your post', time: '1 day ago' },
          { message: 'Password changed successfully', time: '3 days ago' },
        ],
      };
    case 'this_month':
      return {
        totalSales: {
          amount: 20000,
          growth: 20,
        },
        revenue: {
          amount: 8000,
          growth: 15,
        },
        orders: {
          amount: 800,
          growth: 30,
        },
        newCustomers: {
          amount: 200,
          growth: 200,
        },
        orderStatus: {
          statuses: [
            { status: 'Pending', count: 200 },
            { status: 'Shipped', count: 400 },
            { status: 'Delivered', count: 600 },
          ],
          table: [
            {
              order: 'Order #1234',
              status: 'Pending',
              date: '2024-08-01',
              amount: 123.45,
            },
            {
              order: 'Order #5678',
              status: 'Shipped',
              date: '2024-08-05',
              amount: 234.56,
            },
            {
              order: 'Order #9101',
              status: 'Delivered',
              date: '2024-08-10',
              amount: 345.67,
            },
          ],
        },
        customerActivity: [
          { label: 'New Registrations', count: 200 },
          { label: 'Active Customers', count: 800 },
          { label: 'Retention Rate', count: 90 },
        ],
        productInventory: [
          { name: 'In Stock', quantity: 2000 },
          { name: 'Low Stock', quantity: 100 },
          { name: 'Out of Stock', quantity: 20 },
        ],
        notifications: [
          { message: 'Your order has been shipped', time: '2 hours ago' },
          { message: 'New comment on your post', time: '1 day ago' },
          { message: 'Password changed successfully', time: '3 days ago' },
        ],
      };
    default:
      return {
        totalSales: {
          amount: 0,
          growth: 0,
        },
        revenue: {
          amount: 0,
          growth: 0,
        },
        orders: {
          amount: 0,
          growth: 0,
        },
        newCustomers: {
          amount: 0,
          growth: 0,
        },
        orderStatus: {
          statuses: [],
          table: [],
        },
        customerActivity: [],
        productInventory: [],
        notifications: [],
      };
  }
};

export default staticData;
