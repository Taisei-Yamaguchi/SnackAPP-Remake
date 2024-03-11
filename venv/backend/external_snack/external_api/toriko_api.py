# toriko_api.py

import requests

def get_toriko_data():
    # endpoint
    url = "https://sysbird.jp/toriko/api/"
    
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
