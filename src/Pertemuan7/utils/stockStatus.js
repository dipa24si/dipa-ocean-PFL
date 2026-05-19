import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export function getStockStatus(stock, minStock) {
  if (stock <= minStock) {
    return { status: 'Critical', color: 'text-red-600', bg: 'bg-red-50', icon: FiAlertTriangle };
  }

  if (stock <= minStock * 1.5) {
    return { status: 'Warning', color: 'text-orange-600', bg: 'bg-orange-50', icon: FiAlertTriangle };
  }

  return { status: 'Safe', color: 'text-green-600', bg: 'bg-green-50', icon: FiCheckCircle };
}
