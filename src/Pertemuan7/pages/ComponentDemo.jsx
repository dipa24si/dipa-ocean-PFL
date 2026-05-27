import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CustomersTable from '../components/CustomersTable';
import customers from '../data/customers.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings, ChevronDown } from 'lucide-react';

/**
 * ComponentDemo Page
 * Menampilkan contoh penggunaan 3 komponen Shadcn UI:
 * 1. Table - Menampilkan data terstruktur dengan sort & filter
 * 2. Dialog - Konfirmasi aksi destruktif
 * 3. Dropdown Menu - Filter, sort, dan bulk actions
 */
export default function ComponentDemo() {
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [dropdownDialogOpen, setDropdownDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('table');

  return (
    <>
      <PageHeader
        title="Shadcn UI Components Demo"
        breadcrumb="Component Examples"
      />

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">📊 Table Component</h3>
          <p className="text-sm text-blue-700">
            Menampilkan data terstruktur dengan kolom, sorting, filtering, dan pagination.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-bold text-purple-900 mb-2">🔲 Dialog Component</h3>
          <p className="text-sm text-purple-700">
            Konfirmasi aksi penting seperti delete, edit, atau submit form.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-bold text-green-900 mb-2">🎯 Dropdown Menu</h3>
          <p className="text-sm text-green-700">
            Filter, sort, dan bulk actions dalam menu yang elegan.
          </p>
        </div>
      </div>

      {/* Main Demo Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Customers Table dengan Filter & Sort</h2>
          <Button onClick={() => setTableDialogOpen(true)} variant="outline">
            Lihat Info
          </Button>
        </div>
        <CustomersTable customers={customers} />
      </div>

      {/* Dialog Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Dialog Example */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span>🔲 Dialog Example</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Gunakan untuk konfirmasi aksi penting atau menampilkan detail informasi.
          </p>
          <Button onClick={() => setTableDialogOpen(true)} variant="outline">
            Buka Dialog
          </Button>
        </div>

        {/* Dropdown Menu Example */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span>🎯 Dropdown Menu Example</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Gunakan untuk aksi kontekstual, filter, dan sorting options.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Buka Menu
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>View Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Grid View</DropdownMenuItem>
              <DropdownMenuItem>List View</DropdownMenuItem>
              <DropdownMenuItem>Compact View</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Component Code Examples */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold mb-4">📝 Component Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-2">Import Table</h4>
            <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block overflow-x-auto">
{`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'`}
            </code>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-2">Import Dialog</h4>
            <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block overflow-x-auto">
{`import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'`}
            </code>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-2">Import Dropdown</h4>
            <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block overflow-x-auto">
{`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'`}
            </code>
          </div>
        </div>
      </div>

      {/* Table Info Dialog */}
      <Dialog open={tableDialogOpen} onOpenChange={setTableDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>📊 Table Component</DialogTitle>
            <DialogDescription>
              Komponen Table yang powerful untuk menampilkan data terstruktur
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Fitur Utama:</h4>
              <ul className="text-sm space-y-2">
                <li>✅ Responsive design (mobile, tablet, desktop)</li>
                <li>✅ Built-in sorting & filtering</li>
                <li>✅ Pagination support</li>
                <li>✅ Row selection & bulk actions</li>
                <li>✅ Custom column rendering</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Use Cases dalam CRM:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Halaman</TableHead>
                    <TableHead>Penggunaan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Customers</TableCell>
                    <TableCell>List pelanggan dengan sort by nama/pengeluaran</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Products</TableCell>
                    <TableCell>List produk dengan kategori & stock status</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Staff</TableCell>
                    <TableCell>List staff dengan shift & role</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Orders</TableCell>
                    <TableCell>List order dengan status & total</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setTableDialogOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
