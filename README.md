# Pizza Shop (Laravel + Vue 3 + Pinia)

Проект интернет-магазина пиццы
Фронтенд: Vue 3
Бэкенд: Laravel

---

## Функционал проекта

- Каталог пицц (название, описание, фото, цена).
- Корзина (добавление, изменение количества, удаление).
- Оформление заказа (ФИО, адрес, телефон, комментарий).
- Валидация данных.
- Сохранение корзины в `localStorage`.

---

## Установка и запуск

### 1. Клонирование проекта
```bash
git clone https://github.com/SlowlyDoor/pizza-shop-laravel-vue.git
cd pizza-shop-laravel-vue
```

### 2. Backend

Установка зависимостей:
```bash
composer install
```

Генерация ключа:
```bash
php artisan key:generate
```

#### Настройка базы данных

В `.env` нужно прописать доступы к MySQL:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pizza_spa
DB_USERNAME=root
DB_PASSWORD=
```

Создать базу данных:
```sql
CREATE DATABASE pizza_spa;
```

#### Миграции и сиды

```bash
php artisan migrate
php artisan db:seed
```

#### Запуск API

```bash
php artisan serve
```

---

### 3. Frontend

Установка зависимостей:
```bash
npm install
```

Запуск dev-сервера:
```bash
npm run dev
```

---

## Структура проекта

```
resources/
  js/
    pages/        # Vue-страницы
    stores/       # Pinia и взаимодействие с позициями в корзине
    utils/
    app.js
  css/
routes/
  api.php
  web.php
app/
  Http/Controllers/Api/
    PizzaController.php
    OrderController.php
database/
  migrations/     # Миграции
  seeders/        # Сидеры
```

