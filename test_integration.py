import requests
import json

url = "http://localhost:8000/inference/analyze"
payload = {
    "skills": ["python", "pandas"],
    "role_id": "data_scientist",
    "level": "junior",
    "experience_years": 1
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    print(response.text)
except Exception as e:
    print(f"Integration Test Failed: {e}")
