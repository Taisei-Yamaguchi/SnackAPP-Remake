# Generated by Django 5.0.3 on 2024-03-14 09:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("snack", "0004_rename_postsnack_postsnackmodel"),
    ]

    operations = [
        migrations.AddField(
            model_name="torikosnackmodel",
            name="like_count",
            field=models.IntegerField(default=0),
        ),
    ]
