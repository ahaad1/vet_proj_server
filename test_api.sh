#!/bin/bash

# URL сервера
BASE_URL="http://localhost:3000/api"

# Функция для проверки статуса ответа
check_status() {
  if [ "$1" -ne 200 ] && [ "$1" -ne 201 ]; then
    echo "Test failed: Expected status 200 or 201 but got $1"
    exit 1
  fi
}

# Тестирование создания новой страны
create_country_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/countries" -H "Content-Type: application/json" -d '{"name": "Test Country"}')
check_status $create_country_response
echo "Create country test passed"

# Тестирование получения всех стран
get_countries_response=$(curl -s -w "%{http_code}" "$BASE_URL/countries")
get_countries_status=$(echo $get_countries_response | tail -n1)
get_countries_body=$(echo $get_countries_response | head -n-1)
check_status $get_countries_status
echo "Get countries test passed"

# Проверка, что страна была создана
if ! echo "$get_countries_body" | grep -q "Test Country"; then
  echo "Test failed: Created country not found in the response"
  exit 1
fi

echo "All tests passed"
