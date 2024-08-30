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

const staticData: StaticDataType = {
  totalSales: {
    amount: 145231.89,   
    growth: 20.1,        
  },
  revenue: {
    amount: 45231.89,    
    growth: 15.3,        
  },
  orders: {
    amount: 12234,       
    growth: 19,          
  },
  newCustomers: {
    amount: 2350,        
    growth: 180.1,       
  },
  orderStatus: {
    statuses: [
      { status: "Pending", count: 4567 },    
      { status: "Shipped", count: 3456 },    
      { status: "Delivered", count: 2345 },  
    ],
    table: [
      { order: "Order #1234", status: "Pending", date: "2024-08-01", amount: 123.45 },  
      { order: "Order #5678", status: "Shipped", date: "2024-08-05", amount: 234.56 },  
      { order: "Order #9101", status: "Delivered", date: "2024-08-10", amount: 345.67 }, 
    ],
  },
  customerActivity: [
    { label: "New Registrations", count: 2350 },
    { label: "Active Customers", count: 15678 },
    { label: "Retention Rate", count: 82 },
  ],
  productInventory: [
    { name: "In Stock", quantity: 1234 },
    { name: "Low Stock", quantity: 78 },
    { name: "Out of Stock", quantity: 12 },
  ],
  notifications: [
    { message: "Your order has been shipped", time: "2 hours ago" },
    { message: "New comment on your post", time: "1 day ago" },
    { message: "Password changed successfully", time: "3 days ago" },
  ],
};

export default staticData;
