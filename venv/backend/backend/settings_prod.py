import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

DEBUG = False

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = [os.getenv("ALLOWED_HOSTS")]

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
