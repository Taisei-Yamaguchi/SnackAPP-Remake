# post_snack/management/commands/load_toriko_snacks.py
import json
from django.core.management.base import BaseCommand
from ...models import TorikoSnackModel

class Command(BaseCommand):
    help = 'Load data from JSON files into TorikoSnackModel'

    def handle(self, *args, **options):
        # JSON file path
        json_file_paths = [
            'post_snack/seeds/toriko_snacks_r1.json',
            'post_snack/seeds/toriko_snacks_r2.json',
            'post_snack/seeds/toriko_snacks_r3.json',
            'post_snack/seeds/toriko_snacks_r4.json',
            'post_snack/seeds/toriko_snacks_r5.json',
            'post_snack/seeds/toriko_snacks_r6.json',
            'post_snack/seeds/toriko_snacks_r7.json',
            'post_snack/seeds/toriko_snacks_r8.json',
            'post_snack/seeds/toriko_snacks_r9.json',
            'post_snack/seeds/toriko_snacks_r10.json',
            'post_snack/seeds/toriko_snacks_r11.json',
            'post_snack/seeds/toriko_snacks_r12.json',
            'post_snack/seeds/toriko_snacks_r13.json',
            'post_snack/seeds/toriko_snacks_r14.json',
            'post_snack/seeds/toriko_snacks_r15.json',
            'post_snack/seeds/toriko_snacks_r16.json',
            'post_snack/seeds/toriko_snacks_r17.json',
            'post_snack/seeds/toriko_snacks_r18.json',
            'post_snack/seeds/toriko_snacks_r19.json',
            'post_snack/seeds/toriko_snacks_r20.json',
            'post_snack/seeds/toriko_snacks_r21.json',
        ]
        
        for json_file_path in json_file_paths:
            with open(json_file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                items = data['item'] 
                
                for item in items:
                    try:
                        TorikoSnackModel.objects.create(
                            tid=item['id'],
                            name=item['name'],
                            # kana=item['kana',None],
                            maker=item['maker'],
                            price=int(item.get('price')) if item.get('price') and item.get('price').isdigit() else None,  # Converting 'price' to integer if it's a digit
                            type=item['type'],
                            url=item.get('url', None),  # Using .get() to handle missing 'url'
                            image=item.get('image', None),  # Using .get() to handle missing 'image'
                            # comment=item.get('comment', None),  # Using .get() to handle missing 'comment'
                            # regist=item['regist',None]
                        )
                    except Exception as e:
                        print(f"Error occurred while processing data: {e}")
                        continue

            self.stdout.write(self.style.SUCCESS(f'Data from {json_file_path} loaded successfully'))
