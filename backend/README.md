# Farmlink Backend (Express + MySQL)

This backend is built to match your uploaded frontend API file and the SRS requirements.

## Main features
- JWT auth
- Role-based users: farmer, restaurant, industrial, customer, admin
- Product management
- Marketplace search/filter
- Cart and wishlist
- Orders and order status update
- Notifications
- Basic chatbot logging
- Admin stats and user management
- Messages between users

## Run steps
1. Create database in phpMyAdmin or MySQL using `sql/schema.sql`.
2. Copy `.env.example` to `.env` and update DB credentials.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. API will start on `http://localhost:5000`.

## Important note for your current frontend
Your current frontend uses old roles (`buyer`, `consumer`). This backend uses the SRS roles:
- farmer
- restaurant
- industrial
- customer
- admin

You should update the frontend forms and redirects to use these roles.
