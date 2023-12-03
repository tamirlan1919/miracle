# api/views.py
from rest_framework import generics
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.views import View
import json
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'  # Указываем, что используем slug вместо pk

    def get(self, request, slug, *args, **kwargs):
        category = self.get_object()
        products = Product.objects.filter(category=category)
        product_serializer = ProductSerializer(products, many=True)
        category_serializer = self.get_serializer(category)
        return Response({'category': category_serializer.data, 'products': product_serializer.data})

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductImageListCreateView(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ProductImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class CartItemListCreateView(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class FavoriteItemListCreateView(generics.ListCreateAPIView):
    queryset = FavoriteItem.objects.all()
    serializer_class = FavoriteItemSerializer

class FavoriteItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FavoriteItem.objects.all()
    serializer_class = FavoriteItemSerializer



class WorkDetailView(generics.ListCreateAPIView):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

class UserRegistrationView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        # Обработка регистрации пользователя, создание профиля и др.

class UserLoginView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})
        
class CustomPagination(PageNumberPagination):
    page_size = 2  # Set your desired page size here
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductSearchView(APIView):
    # Set the pagination class to None to handle lists without pagination
    pagination_class = None

    def get(self, request, format=None):
        query = request.GET.get('q', '')

        # Search for products
        products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        product_suggestions = [{'type': 'product', 'id': product.id, 'name': product.name, 'image': product.image.url, 'slug': product.slug} for product in products]

        # Search for brands
        brands = Brand.objects.filter(name__icontains=query)
        brand_suggestions = [{'type': 'brand', 'id': brand.id, 'name': brand.name, 'image': '', 'slug': brand.slug} for brand in brands]

        suggestions = product_suggestions + brand_suggestions

        # Return the list of suggestions directly without pagination
        return Response(suggestions, status=status.HTTP_200_OK)
    



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)