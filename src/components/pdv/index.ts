// Core Components
export { PDVModal } from './core/PDVModal';
export { PDVLayout } from './core/PDVLayout';
export { PDVHeader } from './core/PDVHeader';
export { PDVActionBar } from './core/PDVActionBar';
export { PDVValuesDisplay } from './core/PDVValuesDisplay';

// Product Components
export { ProductGrid } from './products/ProductGrid';
export { ProductCard } from './products/ProductCard';
export { ProductModal } from './products/ProductModal';
export { ProductDetailsModal } from './products/ProductDetailsModal';
export { CategoryTabs } from './products/CategoryTabs';
export { ProductSearch } from './products/ProductSearch';

// Order Components
export { OrderSummary } from './orders/OrderSummary';
export { OrderItem } from './orders/OrderItem';
export { OrderActions } from './orders/OrderActions';
export { OrderTypeSelector } from './orders/OrderTypeSelector';
export { OrderHistory } from './orders/OrderHistory';
export { OrderNavigation } from './orders/OrderNavigation';

// Customer Components
export { CustomerSelector } from './customers/CustomerSelector';
export { CustomerForm } from './customers/CustomerForm';
export { AddressForm } from './customers/AddressForm';
export { DeliverySelector } from './customers/DeliverySelector';
export { CustomerInfo } from './customers/CustomerInfo';

// Payment Components
export * from './payments';

// Receipt Components
export { ReceiptPrinter } from './receipt/ReceiptPrinter';

// UX Components (ETAPA 7)
export * from './ux';

// Hook
export { usePDV } from '../../hooks/usePDV';
