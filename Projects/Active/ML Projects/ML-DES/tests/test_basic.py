import requests


def test_ping():
    r = requests.get('http://127.0.0.1:8000/api/ping')
    assert r.status_code == 200
    j = r.json()
    assert j.get('status') == 'ok'

