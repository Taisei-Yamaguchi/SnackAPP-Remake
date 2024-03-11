# toriko_api.py

import requests

# endpoint
url = "https://sysbird.jp/toriko/api/"
    
def get_toriko_data():
    # param
    params = {
        "apikey": "guest",
        "format": "json"
    }
    
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print("API error: ", response.status_code)
            return None
    except Exception as e:
        print("Error: ", e)
        return None

def get_toriko_data_filter(type=None, maker=None, keyword=None, sort=None, order=None):
    # param
    params = {
        "apikey": "guest",
        "format": "json",
        "max": 100,
    }
    
    if type is not None:
        params["type"] = type
    if maker is not None:
        params["maker"] = maker
    if keyword is not None:
        params["keyword"] = keyword
    if sort is not None:
        params["sort"] = sort
    if order is not None:
        params["order"] = order
    
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print("API error: ", response.status_code)
            return None
    except Exception as e:
        print("Error: ", e)
        return None