# Generated by Django 4.2.4 on 2023-11-19 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cart_userprofile_productimage_favoriteitem_cartitem_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100)),
                ('responsibilities', models.TextField(blank=True)),
                ('requirements', models.TextField(blank=True)),
                ('conditions', models.TextField(blank=True)),
            ],
        ),
    ]
