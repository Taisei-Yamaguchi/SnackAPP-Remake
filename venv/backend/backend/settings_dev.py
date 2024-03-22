DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-*_#09*d+m=6o^bn@*^^p$d5(xd(a&4%k2jco^6g2_d!^+-w#21"

ALLOWED_HOSTS = []

CORS_ALLOW_ALL_ORIGINS = True  # allow all origin

# LOGGING Settings
LOGGING = {
    'version':1,
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['console'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # snack
        'snack': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
        # like
        'like': {
            'handlers':['console'],
            'level': 'DEBUG',
        },
    },
    
    # handlers
    'handlers': {
        "console": {
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter':'dev'
        },
    },
    
    # formatter
    'formatters':{
        'dev':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}
