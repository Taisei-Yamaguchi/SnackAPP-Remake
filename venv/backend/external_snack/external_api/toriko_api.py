# toriko_api.py

import requests
import urllib.parse

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

def get_toriko_data_filter(type=None, maker=None, keyword=None, sort=None, order='r', max=10):
    # param
    params = {
        "apikey": "guest",
        "format": "json",
        "max": max,
        # "offset":2, # 10をセットすると11から取得。
    }
    
    if type is not None:
        params["type"] = type
    if maker is not None:
        encoded_maker = urllib.parse.quote(maker, safe='')
        params["maker"] = encoded_maker
    if keyword is not None:
        encoded_keyword = urllib.parse.quote(keyword, safe='')
        params["keyword"] = encoded_keyword
    if sort is not None:
        params["sort"] = sort
    if order is not None:
        params["order"] = order
    
    print(params)
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 100:
            data = response.json()
            return data
        else:
            print("API error: ", response.status_code)
            return None
    except Exception as e:
        print("Error: ", e)
        return None