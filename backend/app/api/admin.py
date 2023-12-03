from django.contrib import admin
from .models import Category, Product, ProductImage, Cart, CartItem, FavoriteItem,Work,Brand,Volume,Profile

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category, CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'stock', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'stock', 'available']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Product, ProductAdmin)

class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image']
admin.site.register(ProductImage, ProductImageAdmin)

class CartAdmin(admin.ModelAdmin):
    list_display = ['user']
admin.site.register(Cart, CartAdmin)

class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity']
admin.site.register(CartItem, CartItemAdmin)

class FavoriteItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'product']
admin.site.register(FavoriteItem, FavoriteItemAdmin)



class WorkAdmin(admin.ModelAdmin):
    list_display = ['name','responsibilities', 'requirements', 'conditions']
admin.site.register(Work, WorkAdmin)


class BrandAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(Brand, BrandAdmin)

class VolumeAdmin(admin.ModelAdmin):
    list_display = ['volume_ml']
admin.site.register(Volume, VolumeAdmin)
admin.site.register(Profile)