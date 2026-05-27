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

export default function CustomersTable({ customers }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [customerRows, setCustomerRows] = useState(customers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
  });

  // Filter berdasarkan status
  const filteredCustomers = customerRows.filter((customer) => {
    if (filterStatus === 'all') return true;
    return customer.status === filterStatus;
  });

  // Sort data
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'spent':
        const spentA = parseInt(a.totalSpent.replace(/\D/g, ''));
        const spentB = parseInt(b.totalSpent.replace(/\D/g, ''));
        return spentB - spentA;
      case 'orders':
        return b.totalOrders - a.totalOrders;
      default:
        return 0;
    }
  });

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setEditFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
    });
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setCustomerRows((currentCustomers) =>
      currentCustomers.filter((customer) => customer.id !== selectedCustomer?.id)
    );
    setDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleSaveEdit = () => {
    setCustomerRows((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === selectedCustomer?.id
          ? {
              ...customer,
              name: editFormData.name,
              email: editFormData.email,
              phone: editFormData.phone,
              status: editFormData.status,
            }
          : customer
      )
    );
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filter & Sort Bar */}
        <div className="p-4 border-b border-gray-200 flex gap-3 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                📊 Sort: {sortBy === 'name' ? 'Nama' : sortBy === 'spent' ? 'Pengeluaran' : 'Pesanan'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Nama (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('spent')}>
                Pengeluaran (Tertinggi)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('orders')}>
                Jumlah Pesanan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                🔍 Filter: {filterStatus === 'all' ? 'Semua' : filterStatus === 'active' ? 'Aktif' : 'Tidak Aktif'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                Semua
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                Aktif
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                Tidak Aktif
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-xs text-gray-500 ml-auto self-center">
            Menampilkan {sortedCustomers.length} dari {customerRows.length} pelanggan
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Nama</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Email</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Telepon</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Pesanan</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Total Belanja</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Status</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{customer.avatar}</span>
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{customer.email}</TableCell>
                <TableCell className="text-sm text-gray-600">{customer.phone}</TableCell>
                <TableCell className="text-right font-semibold">{customer.totalOrders}</TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {customer.totalSpent}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {customer.status === 'active' ? '✓ Aktif' : '○ Tidak Aktif'}
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
                          onClick={() => handleEditClick(customer)}
                          className="cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(customer)}
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

        {sortedCustomers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Tidak ada data pelanggan
          </div>
        )}
      </div>

      {/* Edit Customer Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pelanggan</DialogTitle>
            <DialogDescription>
              Edit detail pelanggan {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama</label>
              <Input
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telepon</label>
              <Input
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editFormData.status}
                onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
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
        title="Hapus Pelanggan?"
        description={`Apakah Anda yakin ingin menghapus ${selectedCustomer?.name}? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
