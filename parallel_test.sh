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

# Функция для создания новой страны
create_country() {
  local country_name="Test Country $(uuidgen)"
  local response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/countries" -H "Content-Type: application/json" -d "{\"name\": \"$country_name\"}")
  echo "Response: $response"
  check_status $response
}

# Функция для получения всех стран
get_countries() {
  local response=$(curl -s -w "%{http_code}" "$BASE_URL/countries")
  local status=$(echo $response | tail -n1)
  echo "Response: $status"
  check_status $status
}

# Экспорт функций для использования в xargs
export -f create_country
export -f get_countries
export -f check_status

# Проверка, работает ли сервер
echo "Checking if the server is running..."
curl -s "$BASE_URL" > /dev/null
if [ $? -ne 0 ]; then
  echo "Server is not running. Please start the server and try again."
  exit 1
fi

# Запуск тестов создания стран параллельно
echo "Running parallel tests for creating countries..."
seq 1 500 | xargs -n1 -P100 bash -c 'create_country'

# Запуск тестов получения стран параллельно
echo "Running parallel tests for getting countries..."
seq 1 500 | xargs -n1 -P100 bash -c 'get_countries'

echo "All parallel tests passed"
