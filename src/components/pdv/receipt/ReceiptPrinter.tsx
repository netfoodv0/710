import React from 'react';
import { Printer, Download, Share2, X, Copy, Check } from 'lucide-react';
import { Order } from '../../../types/global/orders';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/badge';

interface ReceiptPrinterProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({
  order,
  isOpen,
  onClose,
  onPrint
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'delivery': return 'Delivery';
      case 'table': return 'Mesa';
      case 'pickup': return 'Retirada';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Pronto';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = async () => {
    try {
      const receiptText = generateReceiptText();
      await navigator.clipboard.writeText(receiptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar para área de transferência:', err);
    }
  };

  const generateReceiptText = () => {
    let text = '';
    text += `=== COMPROVANTE DE PEDIDO ===\n\n`;
    text += `Pedido: #${order.id.slice(-6)}\n`;
    text += `Data: ${formatDate(order.createdAt)}\n`;
    text += `Tipo: ${getTypeLabel(order.type)}\n`;
    text += `Status: ${getStatusLabel(order.status)}\n\n`;
    
    if (order.customerName) {
      text += `Cliente: ${order.customerName}\n`;
    }
    if (order.customerPhone) {
      text += `Telefone: ${order.customerPhone}\n`;
    }
    if (order.deliveryAddress) {
      text += `Endereço: ${order.deliveryAddress}\n`;
    }
    if (order.tableNumber) {
      text += `Mesa: ${order.tableNumber}\n`;
    }
    
    text += `\n=== ITENS ===\n`;
    order.items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
      text += `   ${item.quantity}x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n`;
      if (item.observations) {
        text += `   Obs: ${item.observations}\n`;
      }
    });
    
    text += `\n=== RESUMO ===\n`;
    text += `Subtotal: ${formatPrice(order.subtotal)}\n`;
    if (order.deliveryFee > 0) {
      text += `Taxa de entrega: ${formatPrice(order.deliveryFee)}\n`;
    }
    if (order.serviceCharge > 0) {
      text += `Taxa de serviço: ${formatPrice(order.serviceCharge)}\n`;
    }
    if (order.discount > 0) {
      text += `Desconto: -${formatPrice(order.discount)}\n`;
    }
    text += `TOTAL: ${formatPrice(order.total)}\n\n`;
    
    if (order.paymentMethod) {
      text += `Forma de pagamento: ${order.paymentMethod}\n`;
    }
    if (order.observations) {
      text += `\nObservações gerais: ${order.observations}\n`;
    }
    
    text += `\nObrigado pela preferência!\n`;
    text += `Restaurante Voult\n`;
    text += `www.voult.com.br`;
    
    return text;
  };

  const shareReceipt = async () => {
    try {
      const receiptText = generateReceiptText();
      
      if (navigator.share) {
        await navigator.share({
          title: `Pedido #${order.id.slice(-6)}`,
          text: receiptText,
          url: window.location.href
        });
      } else {
        // Fallback para copiar
        copyToClipboard();
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Comprovante do Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Receipt Header */}
          <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurante Voult</h1>
            <p className="text-gray-600">Sistema de Pedidos</p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
              <Badge variant="secondary">
                {getTypeLabel(order.type)}
              </Badge>
            </div>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Pedido:</span>
              <span className="ml-2 text-gray-900">#{order.id.slice(-6)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Data:</span>
              <span className="ml-2 text-gray-900">{formatDate(order.createdAt)}</span>
            </div>
            {order.customerName && (
              <div className="col-span-2">
                <span className="font-medium text-gray-700">Cliente:</span>
                <span className="ml-2 text-gray-900">{order.customerName}</span>
              </div>
            )}
            {order.customerPhone && (
              <div>
                <span className="font-medium text-gray-700">Telefone:</span>
                <span className="ml-2 text-gray-900">{order.customerPhone}</span>
              </div>
            )}
            {order.deliveryAddress && (
              <div className="col-span-2">
                <span className="font-medium text-gray-700">Endereço:</span>
                <span className="ml-2 text-gray-900">{order.deliveryAddress}</span>
              </div>
            )}
            {order.tableNumber && (
              <div>
                <span className="font-medium text-gray-700">Mesa:</span>
                <span className="ml-2 text-gray-900">{order.tableNumber}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Itens do Pedido
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{index + 1}.</span>
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </div>
                    {item.observations && (
                      <div className="text-xs text-gray-500 ml-6 mt-1">
                        Obs: {item.observations}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {item.quantity}x {formatPrice(item.price)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-gray-900 mb-3">Resumo do Pedido</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de entrega:</span>
                <span className="text-gray-900">{formatPrice(order.deliveryFee)}</span>
              </div>
            )}
            {order.serviceCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de serviço:</span>
                <span className="text-gray-900">{formatPrice(order.serviceCharge)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Desconto:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>TOTAL:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment and Observations */}
          {(order.paymentMethod || order.observations) && (
            <div className="space-y-3">
              {order.paymentMethod && (
                <div>
                  <span className="font-medium text-gray-700">Forma de pagamento:</span>
                  <span className="ml-2 text-gray-900">{order.paymentMethod}</span>
                </div>
              )}
              {order.observations && (
                <div>
                  <span className="font-medium text-gray-700">Observações gerais:</span>
                  <div className="mt-1 p-2 bg-gray-50 rounded text-sm text-gray-700">
                    {order.observations}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
            <p>Obrigado pela preferência!</p>
            <p className="font-medium">Restaurante Voult</p>
            <p>www.voult.com.br</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex flex-wrap gap-3">
          <Button
            onClick={onPrint}
            className="flex-1 flex items-center justify-center space-x-2"
            size="lg"
          >
            <Printer size={20} />
            <span>Imprimir</span>
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex items-center space-x-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </Button>
          
          <Button
            onClick={shareReceipt}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Share2 size={16} />
            <span>Compartilhar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
