from ..models import SnackModel
from random import sample
from random import shuffle
from django.db.models import Count
from like.models import LikeModel

def format_snack_data(snack):
    return {
        'id': snack.id,
        'tid': snack.tid,
        'name': snack.name,
        'type': snack.type,
        'maker': snack.maker,
        'country': snack.country,
        'price': snack.price,
        'image': snack.image,
        'url': snack.url,
        'like_count': snack.like_count,
        'liked': False,
        'account': {
            'id': str(snack.account.id),
            'username': snack.account.username 
        } if snack.account else None
    }

def get_popular(snacks_with_highest_likes):
    # Shuffle snacks with the same like count to ensure random order
    random_snacks = []
    current_like_count = None
    for snack in snacks_with_highest_likes:
        if snack.like_count != current_like_count:
            current_like_count = snack.like_count
            shuffle(random_snacks)  # Shuffle snacks with the same like count
        random_snacks.append(format_snack_data(snack))
    # Return up to 5 random snacks from the top 20 snacks
    if len(random_snacks) > 5:
        selected_snacks = sample(random_snacks[:20], min(5, len(random_snacks)))
    else:
        selected_snacks = random_snacks
    return selected_snacks

def get_snacks_by_rule(rule,login_user):
    if login_user is not None:
        if rule == "type_you_like":
            ## Get the most liked snack "type" by the user
            most_liked_snack_type = LikeModel.objects.filter(account_id=login_user).values('snack_id__type') \
                .annotate(count=Count('snack_id__type')).order_by('-count').first()
            
            # print(most_liked_snack_type["snack_id__type"])
            if most_liked_snack_type is None:
                return []
            snacks_with_highest_likes = list(SnackModel.objects.filter(type=most_liked_snack_type["snack_id__type"]).order_by('-like_count'))
            data = get_popular(snacks_with_highest_likes)
            return {"type":most_liked_snack_type,"items":data}
        elif rule == "country_you_like":
            ## Get the most liked snack "country" by the user
            most_liked_snack_country = LikeModel.objects.filter(account_id=login_user).values('snack_id__country') \
                .annotate(count=Count('snack_id__country')).order_by('-count').first()
            if most_liked_snack_country is None:
                return []
            snacks_with_highest_likes = list(SnackModel.objects.filter(country=most_liked_snack_country["snack_id__country"]).order_by('-like_count'))
            data = get_popular(snacks_with_highest_likes)
            return {"country":most_liked_snack_country,"items":data}
        elif rule == "maker_you_like":
            ## Get the most liked snack "maker" by the user
            most_liked_snack_maker = LikeModel.objects.filter(account_id=login_user).values('snack_id__maker') \
                .annotate(count=Count('snack_id__maker')).order_by('-count').first()
            if most_liked_snack_maker is None:
                return []
            snacks_with_highest_likes = list(SnackModel.objects.filter(maker=most_liked_snack_maker["snack_id__maker"]).order_by('-like_count'))
            data = get_popular(snacks_with_highest_likes) 
            return {"maker":most_liked_snack_maker,"items":data}
        else:  # "random_popularity"
            snacks_with_highest_likes = list(SnackModel.objects.order_by('-like_count'))
            data = get_popular(snacks_with_highest_likes)
            return {"items":data}
    else:
        # "random_popularity"
        snacks_with_highest_likes = list(SnackModel.objects.order_by('-like_count'))
        data = get_popular(snacks_with_highest_likes)
        return {"items":data}