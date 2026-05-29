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
  const [filterMembership, setFilterMembership] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [customerRows, setCustomerRows] = useState(customers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    membershipLevel: 'Bronze',
    city: '',
  });

  // Get unique cities and membership levels
  const uniqueCities = ['all', ...new Set(customers.map(c => c.city))];
  const uniqueMemberships = ['all', ...new Set(customers.map(c => c.membershipLevel))];

  // Filter berdasarkan status, membership, dan city
  const filteredCustomers = customerRows.filter((customer) => {
    const statusMatch = filterStatus === 'all' || customer.status === filterStatus;
    const membershipMatch = filterMembership === 'all' || customer.membershipLevel === filterMembership;
    const cityMatch = filterCity === 'all' || customer.city === filterCity;
    return statusMatch && membershipMatch && cityMatch;
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
      case 'membership':
        const membershipOrder = { 'Platinum': 0, 'Gold': 1, 'Silver': 2, 'Bronze': 3 };
        return (membershipOrder[a.membershipLevel] || 99) - (membershipOrder[b.membershipLevel] || 99);
      case 'joined':
        return new Date(b.joinDate) - new Date(a.joinDate);
      default:
        return 0;
    }
  });

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setDetailModalOpen(true);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setEditFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      membershipLevel: customer.membershipLevel,
      city: customer.city,
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
              membershipLevel: editFormData.membershipLevel,
              city: editFormData.city,
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
        <div className="p-4 border-b border-gray-200 flex gap-2 flex-wrap items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                📊 Sort: {sortBy === 'name' ? 'Nama' : sortBy === 'spent' ? 'Pengeluaran' : sortBy === 'orders' ? 'Pesanan' : sortBy === 'membership' ? 'Membership' : 'Joined'}
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
              <DropdownMenuItem onClick={() => setSortBy('membership')}>
                Membership Level
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('joined')}>
                Tanggal Bergabung
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                👤 Status: {filterStatus === 'all' ? 'Semua' : filterStatus === 'active' ? 'Aktif' : filterStatus === 'inactive' ? 'Inactive' : 'Suspended'}
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
              <DropdownMenuItem onClick={() => setFilterStatus('suspended')}>
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                💎 Member: {filterMembership === 'all' ? 'Semua' : filterMembership}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {uniqueMemberships.map((membership) => (
                <DropdownMenuItem key={membership} onClick={() => setFilterMembership(membership)}>
                  {membership === 'all' ? 'Semua' : membership}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                📍 Kota: {filterCity === 'all' ? 'Semua' : filterCity}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {uniqueCities.map((city) => (
                <DropdownMenuItem key={city} onClick={() => setFilterCity(city)}>
                  {city === 'all' ? 'Semua' : city}
                </DropdownMenuItem>
              ))}
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
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Username</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Email</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Kota</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Membership</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Pesanan</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Total Belanja</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Joined</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Status</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell className="font-medium cursor-pointer hover:underline" onClick={() => handleViewDetail(customer)}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{customer.avatar}</span>
                    <span className="text-blue-600 font-semibold">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{customer.username}</TableCell>
                <TableCell className="text-sm text-gray-600">{customer.email}</TableCell>
                <TableCell className="text-sm text-gray-600">{customer.city}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      customer.membershipLevel === 'Platinum'
                        ? 'bg-purple-100 text-purple-700'
                        : customer.membershipLevel === 'Gold'
                        ? 'bg-yellow-100 text-yellow-700'
                        : customer.membershipLevel === 'Silver'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {customer.membershipLevel}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold">{customer.totalOrders}</TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {customer.totalSpent}
                </TableCell>
                <TableCell className="text-sm text-gray-600">{customer.joinDate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : customer.status === 'inactive'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {customer.status === 'active' ? '✓ Aktif' : customer.status === 'inactive' ? '○ Inactive' : '⚠ Suspended'}
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
              <label className="text-sm font-medium">Kota</label>
              <Input
                value={editFormData.city}
                onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Membership Level</label>
              <Select
                value={editFormData.membershipLevel}
                onValueChange={(value) => setEditFormData({ ...editFormData, membershipLevel: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="suspended">Suspended</SelectItem>
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

      {/* Customer Detail Modal Dialog */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pelanggan</DialogTitle>
            <DialogDescription>
              Informasi lengkap pelanggan
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Avatar & Header */}
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="text-6xl">{selectedCustomer.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-600 text-sm">ID: #{selectedCustomer.id} | @{selectedCustomer.username}</p>
                  <div className="flex gap-2 mt-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        selectedCustomer.membershipLevel === 'Platinum'
                          ? 'bg-purple-100 text-purple-700'
                          : selectedCustomer.membershipLevel === 'Gold'
                          ? 'bg-yellow-100 text-yellow-700'
                          : selectedCustomer.membershipLevel === 'Silver'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {selectedCustomer.membershipLevel}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        selectedCustomer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : selectedCustomer.status === 'inactive'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {selectedCustomer.status === 'active' ? '✓ Aktif' : selectedCustomer.status === 'inactive' ? '○ Inactive' : '⚠ Suspended'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Identitas */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">📋 Data Identitas</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold">Jenis Kelamin</p>
                    <p className="text-gray-900">{selectedCustomer.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Tanggal Lahir</p>
                    <p className="text-gray-900">{selectedCustomer.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Sumber User</p>
                    <p className="text-gray-900">{selectedCustomer.userSource}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Referral Code</p>
                    <p className="text-gray-900 font-mono">{selectedCustomer.referralCode}</p>
                  </div>
                </div>
              </div>

              {/* Kontak */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">📞 Kontak</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold">Email</p>
                    <p className="text-gray-900 break-all">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Nomor HP</p>
                    <p className="text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 font-semibold">Alamat</p>
                    <p className="text-gray-900">{selectedCustomer.address}</p>
                    <p className="text-gray-700 text-xs">{selectedCustomer.city}, {selectedCustomer.province}</p>
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">💎 Data Membership</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold">Tanggal Bergabung</p>
                    <p className="text-gray-900">{selectedCustomer.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Login Terakhir</p>
                    <p className="text-gray-900">{selectedCustomer.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Email Subscription</p>
                    <p className="text-gray-900">{selectedCustomer.emailSubscription ? '✓ Subscribed' : '○ Not Subscribed'}</p>
                  </div>
                </div>
              </div>

              {/* Transaksi */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">💳 Data Transaksi</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-blue-600 font-semibold text-xs">Total Pesanan</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-green-600 font-semibold text-xs">Total Belanja</p>
                    <p className="text-lg font-bold text-gray-900">{selectedCustomer.totalSpent}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-purple-600 font-semibold text-xs">Transaksi Terakhir</p>
                    <p className="text-sm font-bold text-gray-900">{selectedCustomer.lastOrder}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDetailModalOpen(false);
                handleEditClick(selectedCustomer);
              }}
            >
              Edit
            </Button>
            <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
