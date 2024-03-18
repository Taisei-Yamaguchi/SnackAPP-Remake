from random import choice

def define_recommend_snack_logic(login_user):
    if login_user:
        return choice(["random_popularity", "type_you_like", "country_you_like", "maker_you_like"])
    else:
        return "random_popularity"
