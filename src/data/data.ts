interface WidgetData {
    amount: string;
    growth: string;
  }
  
  interface OrderStatus {
    statuses: { status: string; count: string }[];
    table: {
      order: string;
      status: string;
      date: string;
      amount: string;
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
      amount: "$145,231.89",
      growth: "+20.1% from last month",
    },
    revenue: {
      amount: "$45,231.89",
      growth: "+15.3% from last month",
    },
    orders: {
      amount: "12,234",
      growth: "+19% from last month",
    },
    newCustomers: {
      amount: "2,350",
      growth: "+180.1% from last month",
    },
    orderStatus: {
      statuses: [
        { status: "Pending", count: "4,567" },
        { status: "Shipped", count: "3,456" },
        { status: "Delivered", count: "2,345" },
      ],
      table: [
        { order: "Order #1234", status: "Pending", date: "2024-08-01", amount: "$123.45" },
        { order: "Order #5678", status: "Shipped", date: "2024-08-05", amount: "$234.56" },
        { order: "Order #9101", status: "Delivered", date: "2024-08-10", amount: "$345.67" },
      ],
    },
    customerActivity: [
      { count: 1234, label: "Active" },
      { count: 567, label: "Inactive" },
    ],
    productInventory: [
      { quantity: 1234, name: "Items" },
    ],
    notifications: [
      { message: "New comment on your post", time: "2024-08-01T12:00:00Z" },
      { message: "Order #1234 has been shipped", time: "2024-08-02T14:30:00Z" },
    ],
  };
  
  export default staticData;
  