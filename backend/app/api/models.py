from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.db import models
from django.contrib.auth.models import User
# Create your models here.




class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True,null=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=200, db_index=True, unique=True,null=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True, blank=True,null=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Generate the slug when saving the model
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)
class Volume(models.Model):
    volume_ml = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.volume_ml} ml"

class Product(models.Model):
    category = models.ForeignKey('Category', related_name='products', on_delete=models.CASCADE)
    brand = models.ForeignKey('Brand', related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='media/products/%Y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    volume_option = models.ManyToManyField(Volume,related_name='Объем', null=True, blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Старая цена')
    stock = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    is_on_sale = models.BooleanField(default=False, verbose_name='Распродажа')  # New field for the sale status
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)


    class Meta:
        ordering = ('name',)
        index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/%Y/%m/%d', blank=True)

    def __str__(self):
        return f"Image for {self.product.name}"

class Cart(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='CartItem')

    def __str__(self):
        return f"Cart for {self.user.username}"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.cart.user.username}'s cart"


class FavoriteItem(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product.name} in {self.user.username}'s favorites"




class Work(models.Model):
    name = models.CharField(max_length=100, blank=True)
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    conditions = models.TextField(blank=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.user.username