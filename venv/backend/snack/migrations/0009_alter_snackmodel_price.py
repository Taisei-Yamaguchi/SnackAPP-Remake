# Generated by Django 5.0.3 on 2024-03-17 23:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("snack", "0008_alter_snackmodel_account"),
    ]

    operations = [
        migrations.AlterField(
            model_name="snackmodel",
            name="price",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
