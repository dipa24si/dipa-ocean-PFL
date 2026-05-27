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
  DropdownMenuSeparator,
  DropdownMenuLabel,
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
import { MoreVertical, Edit2, Trash2, Package } from 'lucide-react';

const productData = [
  { name: 'Espresso', category: 'Coffee', price: 15000, description: 'Kopi espresso klasik dengan rasa kuat dan kaya' },
  { name: 'Cappuccino', category: 'Coffee', price: 25000, description: 'Espresso dengan susu steamed dan foam yang sempurna' },
  { name: 'Latte', category: 'Coffee', price: 28000, description: 'Kopi dengan susu lembut dan sedikit busa' },
  { name: 'Americano', category: 'Coffee', price: 22000, description: 'Espresso panjang dengan air panas untuk rasa ringan' },
  { name: 'Croissant', category: 'Pastry', price: 18000, description: 'Croissant butter yang renyah dan lembut' },
  { name: 'Muffin Blueberry', category: 'Pastry', price: 20000, description: 'Muffin manis dengan potongan blueberry segar' },
  { name: 'Chocolate Cake', category: 'Dessert', price: 35000, description: 'Kue coklat dengan frosting krim yang lezat' },
  { name: 'Cheesecake', category: 'Dessert', price: 37000, description: 'Cheesecake lembut dengan lapisan keju krim' },
  { name: 'Iced Latte', category: 'Cold Drinks', price: 28000, description: 'Latte dingin dengan es yang menyegarkan' },
  { name: 'Iced Tea', category: 'Cold Drinks', price: 18000, description: 'Teh dingin manis dengan aroma lemon segar' },
];

const generateProducts = () => {
  return Array.from({ length: 30 }, (_, index) => {
    const base = productData[index % productData.length];
    const additional = Math.floor(index / productData.length) * 1000;
    const price = base.price + additional;
    return {
      id: index + 1,
      name: `${base.name}${index >= productData.length ? ` ${Math.floor(index / productData.length)}` : ''}`,
      category: base.category,
      price: price,
      description: base.description,
      stock: Math.floor(Math.random() * 50) + 5,
      available: index % 7 !== 0,
    };
  });
};

export default function ProductsTable() {
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [products, setProducts] = useState(() => generateProducts());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    available: 'true',
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter berdasarkan kategori
  const filteredProducts = products.filter((product) => {
    if (filterCategory === 'all') return true;
    return product.category === filterCategory;
  });

  // Sort data
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description,
      available: String(product.available),
    });
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== selectedProduct?.id)
    );
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = () => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProduct?.id
          ? {
              ...product,
              name: editFormData.name,
              category: editFormData.category,
              price: Number(editFormData.price),
              stock: Number(editFormData.stock),
              description: editFormData.description,
              available: editFormData.available === 'true',
            }
          : product
      )
    );
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filter & Sort Bar */}
        <div className="p-4 border-b border-gray-200 flex gap-3 flex-wrap items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                📊 Sort: {sortBy === 'name' ? 'Nama' : sortBy === 'price' ? 'Harga' : 'Stok'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Nama (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('price')}>
                Harga (Tertinggi)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('stock')}>
                Stok (Terbanyak)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                🏷️ Kategori: {filterCategory === 'all' ? 'Semua' : filterCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className="cursor-pointer"
                >
                  {category === 'all' ? '✓ Semua Kategori' : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-xs text-gray-500 ml-auto">
            Menampilkan {sortedProducts.length} dari {products.length} produk
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Produk</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Kategori</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-right">Harga</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-center">Stok</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase">Status</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 uppercase text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  Rp {product.price.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded font-medium text-sm">
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      product.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {product.available ? '✓ Tersedia' : '✗ Habis'}
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
                          onClick={() => handleEditClick(product)}
                          className="cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(product)}
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

        {sortedProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Tidak ada data produk
          </div>
        )}
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
            <DialogDescription>
              Edit detail produk {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nama Produk</label>
              <Input
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Kategori</label>
              <Input
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Harga</label>
                <Input
                  type="number"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stok</label>
                <Input
                  type="number"
                  value={editFormData.stock}
                  onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Deskripsi</label>
              <Input
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editFormData.available}
                onValueChange={(value) => setEditFormData({ ...editFormData, available: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Tersedia</SelectItem>
                  <SelectItem value="false">Habis</SelectItem>
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
        title="Hapus Produk?"
        description={`Apakah Anda yakin ingin menghapus "${selectedProduct?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
