import os
from pathlib import Path

DEBUG = False

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-*_#09*d+m=6o^bn@*^^p$d5(xd(a&4%k2jco^6g2_d!^+-w#21"

ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [  
    'http://example.com',
    'https://example.com',
]

# LOGGING Settings
LOGGING = {
    'version':1,
    "disable_existing_loggers":False,
    
    # LOGGER
    'loggers':{
        # django
        'django': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # accounts
        'accounts': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # snack
        'snack': {
            'handlers':['file'],
            'level': 'INFO',
        },
        # like
        'like': {
            'handlers':['file'],
            'level': 'INFO',
        },
    },
    
    # handlers
    'handlers': {
        "file": {
            'level':'INFO',
            'class':'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR,'logs/django.log'),
            'formatter':'prod',
            'when':'D',
            'interval':1,
            'backupCOunt':7,
        },
    },
    
    # formatter
    'formatters':{
        'prod':{
            'format': '\t'.join([
                '%(asctime)s',
                '[%(levelname)s]',
                '%(pathname)s(Line:%(lineno)d)',
                '%(message)s'
            ])
        },
    }
}
