"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Filter, MoreVertical, Package, Edit2, Trash2, Eye } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { inventory as seedInventory } from "@/data/inventory";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("menu");
  const [stockState, setStockState] = useState<Record<string, boolean>>(() =>
    seedInventory.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.inStock,
      }),
      {}
    )
  );
  const [prices, setPrices] = useState<Record<string, number>>(() =>
    seedInventory.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.price,
      }),
      {}
    )
  );

  const inventory = useMemo(
    () =>
      seedInventory.map((item) => ({
        ...item,
        price: prices[item.id] ?? item.price,
        inStock: stockState[item.id] ?? item.inStock,
      })),
    [prices, stockState]
  );

  const filteredMenuItems = useMemo(() => {
    if (!searchQuery.trim()) return inventory;
    const q = searchQuery.toLowerCase();
    return inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [inventory, searchQuery]);

  const groupedByCategory = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      items: inventory.filter((item) => item.categoryId === category.id),
    }));
  }, [inventory]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Menu & Inventory</h1>
            <p className="text-sm text-gray-500">
              Manage your products, categories, and stock levels
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>
                    Add a new product to your menu
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Item Name
                    </label>
                    <Input id="name" placeholder="e.g., Organic Tomatoes" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium text-gray-700">
                        Price (₹)
                      </label>
                      <Input id="price" type="number" placeholder="299" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="unit" className="text-sm font-medium text-gray-700">
                      Unit
                    </label>
                    <Input id="unit" placeholder="e.g., 500g, 1kg, 1 piece" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <Input id="description" placeholder="Brief description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Save Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search & Filter */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search items by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-full"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Select>
                  <SelectTrigger className="w-[180px] rounded-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[140px] rounded-full">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="rounded-full bg-gray-100 p-1 w-fit">
            <TabsTrigger value="menu" className="rounded-full px-4 py-2">
              Menu Editor
            </TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-full px-4 py-2">
              Inventory Management
            </TabsTrigger>
            <TabsTrigger value="categories" className="rounded-full px-4 py-2">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Menu Editor Tab */}
          <TabsContent value="menu" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Items</p>
                      <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
                    </div>
                    <Package className="h-10 w-10 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">In Stock</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {inventory.filter(item => item.inStock).length}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {inventory.filter(item => !item.inStock).length}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu Items Grid */}
            <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>
                  Manage and organize your menu items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMenuItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge className="rounded-full text-xs bg-gray-100 text-gray-700 mb-2">
                                {item.category}
                              </Badge>
                              <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.unit}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit Item
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Item
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Switch 
                                  checked={item.inStock}
                                  onCheckedChange={(checked) =>
                                    setStockState((prev) => ({
                                      ...prev,
                                      [item.id]: checked,
                                    }))
                                  }
                                />
                                <span className="text-xs text-gray-500">
                                  {item.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                              </div>
                            </div>
                            
                            <div className={`h-12 w-12 rounded-lg ${
                              item.inStock ? 'bg-emerald-50' : 'bg-gray-100'
                            } flex items-center justify-center`}>
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="h-full w-full rounded-lg object-cover"
                                />
                              ) : (
                                <Package className={`h-6 w-6 ${
                                  item.inStock ? 'text-emerald-600' : 'text-gray-400'
                                }`} />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Management Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Update stock status and prices in bulk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Item</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Stock</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="h-full w-full rounded-lg object-cover"
                                />
                              ) : (
                                <Package className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.unit}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="rounded-full bg-gray-100 text-gray-700">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={prices[item.id]}
                              onChange={(e) =>
                                setPrices((prev) => ({
                                  ...prev,
                                  [item.id]: Number(e.target.value),
                                }))
                              }
                              className="h-8 w-24 text-sm"
                            />
                            <span className="text-sm text-gray-500">₹</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={stockState[item.id]}
                              onCheckedChange={(checked) =>
                                setStockState((prev) => ({
                                  ...prev,
                                  [item.id]: checked,
                                }))
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`rounded-full ${
                            stockState[item.id]
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {stockState[item.id] ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                      Organize your menu items into categories
                    </CardDescription>
                  </div>
                  <Button className="rounded-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {groupedByCategory.map((category) => (
                    <Card 
                      key={category.id}
                      className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-5">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{category.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                            </div>
                            <Badge className="rounded-full bg-gray-100 text-gray-700">
                              {category.items.length} items
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}