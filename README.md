# Ecommerce Store README

## Problem Overview

This repository contains a full-stack e-commerce application built with React for the frontend and Node.js with Express for the backend. The application supports functionalities such as item listing, cart management, discount code generation, and an admin order summary feature.

## High-Level Design (HLD)

The high-level architecture of the Ecommerce Store consists of the following components:

- **Frontend:** Built with React.js using component based architecture, providing an interactive user interface.
- **Backend:** A RESTful API developed using Node.js and Express, handling requests and managing business logic.
- **Database:** Sqlite is used to store item,order,discount codes information. This is an embedded and in memory database. For scalability, other relational or non-relational database may be used.
- **Authentication:** There is a dummy login check based on userIds in react client, but we can utilize JWT, Oauth, SSO for authentication.

## Low-Level Design (LLD)

This low-level design includes detailed descriptions of the modules and their interactions:

### Modules

1. **Item Management**

   - **Functions:** Get All items available for purchase and get Item by id for specific details.
   - **Endpoints:**
     - `GET /items`
     - `GET /items/:id`

2. **Cart Management**

   - **Functions:** Add to Cart, View Cart.
   - **Endpoints:**
     - `POST /cart/add` Takes Items and userId as input. The cartId is created based on userId.
     - `GET /cart/:cartId` Gets all the items of a particular cart.

3. **Admin Management**

   - **Functions:** Helps admin to view all the orders summary and generate discount.
   - **Endpoints:**
     - `POST /admin/summary` Based on the userId, only userId with "admin" can view this.
     - `POST /admin/generate-discount` Generates discount based on the nthOrder input.

4. **Checkout Order Management**
   - **Functions:** Checkout for a cart.
   - **Endpoints:**
     - `POST /checkout` Takes cartId, userId, and discount as inputs. Allows user to checkout based on the cart items and applies discount if applicable.

## Database Schema

The following database schema outlines the tables used in the application:

### Items Table

| Column Name | Data Type | Description          |
| ----------- | --------- | -------------------- |
| id          | TEXT      | Primary Key          |
| name        | TEXT      | Name of the item     |
| price       | REAL      | Price of the item    |
| category    | TEXt      | Category of the item |

### Cart Table

| Column Name | Data Type | Description          |
| ----------- | --------- | -------------------- |
| id          | INT       | Primary Key          |
| items       | TEXT      | items in json string |

### Orders Table

| Column Name    | Data Type | Description                                |
| -------------- | --------- | ------------------------------------------ |
| id             | TEXT      | Primary Key                                |
| userId         | TEXT      | UserId whose order this is                 |
| items          | TEXT      | JSON string of items purchased             |
| discountAmount | REAL      | Total amount after applying discount codes |

### DiscountCodes Table

| Column Name | Data Type | Description                             |
| ----------- | --------- | --------------------------------------- |
| id          | TEXT      | Primary Key , Auto Increment            |
| code        | TEXT      | Unique discount code                    |
| status      | TEXT      | if it is available, expired or used     |
| percent     | INTEGER   | discount percent assigned with the code |

# **Project Setup**

### Prerequisites

- Node.js 

### Clone the project

```bash
  git clone https://github.com/poojavirani2209/Ecommerce-store
```

### Navigate to the project directory

```bash
  cd Ecommerce-store
```

### Install dependencies for frontend and backend separately

**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend dependencies

```bash
cd client
npm install
```

Install backend dependencies

```bash
cd server
npm install
```

### Running Development Servers

**Important:**

- **Separate terminals**: Run the commands in separate terminal windows or use `split terminal` to avoid conflicts.

#### Start the backend server

- Navigate to the `server` directory: `cd server`
- Start the server: `npm run start` 
- You should see a message indicating the server is running, usually on port 8887.

#### Start the frontend server:

- Navigate to the `client` directory: `cd client`
- Start the server: `npm start`
- You should see a message indicating the server is running, usually on port 3000.

### Login with demo users

Use the following userId:
- You can use - user1,user2,user3 as customers of ecommerce store 
- You can use - admin for admin functionalities like seeing the order summary.

### Accessing the Application

Once both servers are running, you can access them at the following URL's:

- Client: http://localhost:3000
- Server: http://localhost:8887

## PostMan Collection

## Authors

- [@PoojaVirani](https://github.com/poojavirani2209)
