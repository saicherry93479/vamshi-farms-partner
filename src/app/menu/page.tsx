"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Clock,
  ArrowRight,
  Filter,
  Trash2,
  Edit2,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { categories as seedCategories, type Category } from "@/data/categories";
import { inventory as seedInventory, type InventoryItem } from "@/data/inventory";

export default function MenuPage() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [inventory, setInventory] = useState<InventoryItem[]>(seedInventory);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || "");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0]?.id || ""]);
  
  // Dialog states
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  // Form states
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");
  const [newItemBrand, setNewItemBrand] = useState("");
  const [newItemDiscount, setNewItemDiscount] = useState("");

  // Computed
  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);
  const categoryItems = inventory.filter((item) => item.categoryId === selectedCategory);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return categoryItems;
    const q = searchQuery.toLowerCase();
    return categoryItems.filter((item) => item.name.toLowerCase().includes(q));
  }, [categoryItems, searchQuery]);

  // Handlers
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItemStock = (itemId: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      title: newCategoryName,
      description: newCategoryDesc,
    };
    setCategories((prev) => [...prev, newCategory]);
    setNewCategoryName("");
    setNewCategoryDesc("");
    setAddCategoryOpen(false);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    setInventory((prev) => prev.filter((item) => item.categoryId !== categoryId));
    if (selectedCategory === categoryId) {
      setSelectedCategory(categories[0]?.id || "");
    }
  };

  const addItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    const newItem: InventoryItem = {
      id: `PROD-${Date.now()}`,
      name: newItemName,
      category: selectedCategoryData?.title || "",
      categoryId: selectedCategory,
      price: parseFloat(newItemPrice),
      unit: newItemUnit || "1 unit",
      inStock: true,
      brand: newItemBrand || undefined,
      discount: newItemDiscount ? parseFloat(newItemDiscount) : undefined,
    };
    setInventory((prev) => [...prev, newItem]);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemUnit("");
    setNewItemBrand("");
    setNewItemDiscount("");
    setAddItemOpen(false);
  };

  const updateItem = () => {
    if (!selectedItem) return;
    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      )
    );
    setEditItemOpen(false);
    setSelectedItem(null);
  };

  const deleteItem = (itemId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
  };

  const duplicateItem = (item: InventoryItem) => {
    const newItem: InventoryItem = {
      ...item,
      id: `INV-${Date.now()}`,
      name: `${item.name} (Copy)`,
    };
    setInventory((prev) => [...prev, newItem]);
  };

  return (
    <AppShell noPadding>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="relative w-[480px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-0 bg-gray-50 rounded-lg text-sm focus-visible:ring-1 focus-visible:ring-gray-300"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 text-sm font-medium border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 text-sm font-medium border-gray-300">
                  Actions
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Bulk edit prices</DropdownMenuItem>
                <DropdownMenuItem>Export menu</DropdownMenuItem>
                <DropdownMenuItem>Import menu</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mark all in stock</DropdownMenuItem>
                <DropdownMenuItem>Mark all out of stock</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="h-10 text-sm font-medium border-gray-300">
              Dining Menu
            </Button>
            <Button className="h-10 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5">
              Submit Changes
            </Button>
          </div>
        </div>

        {/* Main Content - Two Panel Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Categories */}
          <div className="w-[480px] border-r border-gray-100 bg-white flex flex-col">
            {/* Categories Header */}
            <div className="px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Categories ({categories.length})
              </h2>
            </div>

            {/* Add Category */}
            <button
              onClick={() => setAddCategoryOpen(true)}
              className="px-5 py-3 text-left text-sm text-blue-600 font-medium flex items-center gap-2 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </button>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto">
              {categories.map((category) => {
                const itemCount = inventory.filter(
                  (item) => item.categoryId === category.id
                ).length;
                const isExpanded = expandedCategories.includes(category.id);
                const isSelected = selectedCategory === category.id;

                return (
                  <div key={category.id}>
                    {/* Category Item */}
                    <div
                      className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 ${
                        isSelected && !isExpanded ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        if (!isExpanded) toggleCategory(category.id);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {category.title} ({itemCount})
                        </span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="p-1.5 hover:bg-gray-100 rounded"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4 text-gray-400" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Mark Out of Stock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCategory(category.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Category
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category.id);
                          }}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Subcategory (expanded) */}
                    {isExpanded && (
                      <div className="bg-gray-50/50">
                        <div
                          className={`relative pl-10 pr-5 py-3 cursor-pointer hover:bg-gray-100 ${
                            isSelected ? "bg-white" : ""
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {isSelected && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                          )}
                          <span className="text-sm text-gray-700">
                            {category.title} ({itemCount})
                          </span>
                        </div>
                        <button className="pl-10 pr-5 py-3 text-left text-sm text-blue-600 font-medium flex items-center gap-2 hover:bg-gray-100 w-full">
                          <Plus className="h-4 w-4" />
                          Add Subcategory
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Go to Add Ons */}
            <div className="border-t border-gray-100 px-5 py-4">
              <button className="text-sm text-blue-600 font-medium flex items-center justify-between w-full hover:underline">
                Go to Add Ons
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Items */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
            {/* Category Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">
                {selectedCategoryData?.title || "Category"} ({filteredItems.length})
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Category</DropdownMenuItem>
                  <DropdownMenuItem>Mark all items out of stock</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Delete Category</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Add Item Options */}
            <div className="flex items-center gap-8 px-6 py-4 border-b border-gray-100">
              <button
                onClick={() => setAddItemOpen(true)}
                className="text-sm text-blue-600 font-medium flex items-center gap-2 hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add New Item
              </button>
              <button className="text-sm text-blue-600 font-medium flex items-center gap-2 hover:underline">
                <Plus className="h-4 w-4" />
                Map existing item
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-gray-300" />
                  </div>
                  <p className="text-gray-600 font-medium text-lg">No items found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add items to this category to get started
                  </p>
                  <Button
                    onClick={() => setAddItemOpen(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Item
                  </Button>
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 px-6 py-5 bg-white hover:bg-gray-50 cursor-pointer group"
                    onClick={() => {
                      setSelectedItem({ ...item });
                      setEditItemOpen(true);
                    }}
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 shadow-sm relative">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full object-cover ${!item.inStock ? 'opacity-50 grayscale' : ''}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ${!item.inStock ? 'opacity-50 grayscale' : ''}`}>
                          <span className="text-3xl">🌿</span>
                        </div>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      {/* Veg/Non-veg indicator + Badges */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                            item.isVeg !== false
                              ? "border-green-600"
                              : "border-red-600"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg !== false ? "bg-green-600" : "bg-red-600"
                            }`}
                          ></span>
                        </span>
                        {item.organic && (
                          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                            ORGANIC
                          </span>
                        )}
                        {item.bestSeller && (
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            BESTSELLER
                          </span>
                        )}
                        {item.farmFresh && (
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            FARM FRESH
                          </span>
                        )}
                      </div>

                      {/* Item Name */}
                      <h3 className="text-sm font-medium text-gray-900 mb-0.5 line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Unit */}
                      <p className="text-xs text-gray-400 mb-1">
                        {item.unit}
                      </p>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">
                          {item.description}
                        </p>
                      )}

                      {/* Rating */}
                      {item.rating && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                            {item.rating} ★
                          </span>
                          <span className="text-xs text-gray-400">
                            ({item.reviews?.toLocaleString()})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price}
                        </p>
                        {item.discount && (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.price}
                            </span>
                            <span className="text-xs font-semibold text-green-600">
                              {item.discount}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions (visible on hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemStock(item.id);
                        }}
                      >
                        {item.inStock ? (
                          <Eye className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateItem(item);
                        }}
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your menu items
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category Name</label>
              <Input
                placeholder="e.g., Starters, Main Course"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description (Optional)</label>
              <Textarea
                placeholder="Brief description of this category"
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCategory} className="bg-blue-600 hover:bg-blue-700">
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to {selectedCategoryData?.title || "this category"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Name *</label>
              <Input
                placeholder="e.g., iPhone 15 Pro"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (₹) *</label>
                <Input
                  type="number"
                  placeholder="9999"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Unit</label>
                <Input
                  placeholder="1 unit"
                  value={newItemUnit}
                  onChange={(e) => setNewItemUnit(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Brand</label>
                <Input
                  placeholder="e.g., Apple, Nike"
                  value={newItemBrand}
                  onChange={(e) => setNewItemBrand(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newItemDiscount}
                  onChange={(e) => setNewItemDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddItemOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={addItem}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!newItemName.trim() || !newItemPrice}
            >
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Sheet */}
      <Sheet open={editItemOpen} onOpenChange={setEditItemOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Edit Item</SheetTitle>
            <SheetDescription>
              Update item details
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="space-y-6 py-6">
              {/* Image Preview */}
              <div className="w-full h-48 rounded-lg bg-gray-100 overflow-hidden relative">
                {selectedItem.image ? (
                  <>
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        Change Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                    <span className="text-6xl mb-2">🌿</span>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Item Name</label>
                  <Input
                    value={selectedItem.name}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                    <Input
                      type="number"
                      value={selectedItem.price}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Unit</label>
                    <Input
                      value={selectedItem.unit}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, unit: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Select
                    value={selectedItem.categoryId}
                    onValueChange={(value) =>
                      setSelectedItem({
                        ...selectedItem,
                        categoryId: value,
                        category: categories.find((c) => c.id === value)?.title || "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Brand</label>
                    <Input
                      value={selectedItem.brand || ""}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, brand: e.target.value })
                      }
                      placeholder="e.g., Apple, Nike"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                    <Input
                      type="number"
                      value={selectedItem.discount || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          discount: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">In Stock</p>
                    <p className="text-xs text-gray-500">Is this item available?</p>
                  </div>
                  <Switch
                    checked={selectedItem.inStock}
                    onCheckedChange={(checked) =>
                      setSelectedItem({ ...selectedItem, inStock: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    deleteItem(selectedItem.id);
                    setEditItemOpen(false);
                    setSelectedItem(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                  Delete
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={updateItem}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
