import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

const customerNames = [
  'Andi', 'Budi', 'Sari', 'Dewi', 'Rian', 'Maya', 'Nina', 'Ahmad', 'Lina', 'Rizki',
  'Tegar', 'Putri', 'Fajar', 'Ayu', 'Bayu',
];

const menuItems = [
  'Iced Latte', 'Cappuccino', 'Cold Brew', 'Espresso', 'Americano', 'Latte',
  'Croissant', 'Chocolate Cake', 'Cheesecake', 'Iced Tea',
];

const statuses = ['Completed', 'Processing', 'Pending', 'Cancelled'];

const statusStyles = {
  Completed: 'bg-green-100 text-green-700',
  Processing: 'bg-orange-100 text-orange-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const generateOrders = (totalOrders) => {
  return Array.from({ length: totalOrders }, (_, index) => {
    const price = 18000 + (index % 8) * 4000 + Math.floor(index / 8) * 3000;

    return {
      id: `#${1234 + index}`,
      customer: customerNames[index % customerNames.length],
      items: menuItems[index % menuItems.length],
      total: `Rp ${price.toLocaleString('id-ID')}`,
      status: statuses[index % statuses.length],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
    };
  });
};

export default function OrdersTable({ orders = [], totalOrders = 20, searchTerm = '', filterStatus = 'all', isLoading = false }) {
  const [sortBy, setSortBy] = useState('date');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    customer: '',
    items: '',
    status: '',
  });

  const ordersToDisplay = orders.length > 0 ? orders : generateOrders(totalOrders);

  // Filter berdasarkan search term dan status
  const filteredOrders = ordersToDisplay.filter((order) => {
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort data
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'total':
        const totalA = parseInt(a.total.replace(/\D/g, ''));
        const totalB = parseInt(b.total.replace(/\D/g, ''));
        return totalB - totalA;
      case 'customer':
        return a.customer.localeCompare(b.customer);
      default:
        return 0;
    }
  });

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditFormData({
      customer: order.customer,
      items: order.items,
      status: order.status,
    });
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting order:', selectedOrder);
    setDeleteDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveEdit = () => {
    console.log('Saving order:', selectedOrder?.id, editFormData);
    setEditDialogOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filter & Sort Bar */}
        <div className="p-4 border-b border-gray-200 flex gap-3 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                📊 Sort: {sortBy === 'date' ? 'Tanggal' : sortBy === 'total' ? 'Total' : 'Pelanggan'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                Tanggal (Terbaru)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('total')}>
                Total (Tertinggi)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('customer')}>
                Nama Pelanggan (A-Z)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-xs text-gray-500 ml-auto self-center">
            Menampilkan {sortedOrders.length} dari {orders.length} pesanan
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Order ID</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Pelanggan</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Barang</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Tanggal</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Total</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Status</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="text-sm text-gray-600">{order.customer}</TableCell>
                <TableCell className="text-sm text-gray-600">{order.items}</TableCell>
                <TableCell className="text-sm text-gray-600">{order.date}</TableCell>
                <TableCell className="text-right font-semibold text-green-600">{order.total}</TableCell>
                <TableCell>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleEditClick(order)}
                          className="cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(order)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sortedOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Tidak ada data pesanan
          </div>
        )}
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pesanan</DialogTitle>
            <DialogDescription>
              Edit detail pesanan {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Order ID</label>
              <Input 
                value={selectedOrder?.id || ''} 
                disabled 
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pelanggan</label>
              <Input 
                value={editFormData.customer} 
                onChange={(e) => setEditFormData({...editFormData, customer: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Barang</label>
              <Input 
                value={editFormData.items} 
                onChange={(e) => setEditFormData({...editFormData, items: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={editFormData.status} onValueChange={(value) => setEditFormData({...editFormData, status: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Hapus Pesanan?"
        description={`Apakah Anda yakin ingin menghapus pesanan ${selectedOrder?.id}? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
