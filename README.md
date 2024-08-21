# Frontend Project Documentation

## Overview

This project is a React-based frontend application that uses Vite as a build tool and includes a variety of components and routes. It is set up with a modern JavaScript stack, incorporating packages for UI components, and routing.

## Project Structure

- **`src/`**: Contains the source code for the application.
  - **`components/`**: Contains React components.
    - `Login.jsx`
    - `Register.jsx`
    - `Transactions.jsx`
    - `Home.jsx`
  - **`App.jsx`**: Main application component that sets up routing.
- **`public/`**: Contains public assets.
- **`index.html`**: Main HTML file.
- **`vite.config.js`**: Configuration file for Vite.

## Installation

To get started with the project, clone the repository and run:

```bash
npm install
```

## Scripts

- **`dev`**: Starts the development server with Vite.
  ```bash
  npm run dev
  ```

- **`build`**: Builds the application for production.
  ```bash
  npm run build
  ```

- **`lint`**: Lints the codebase using ESLint.
  ```bash
  npm run lint
  ```

- **`preview`**: Previews the built application.
  ```bash
  npm run preview
  ```

## Dependencies

- **`@emotion/react`** and **`@emotion/styled`**: For styled components.
- **`@mui/material`** and **`@mui/icons-material`**: Material-UI components and icons.
- **`axios`**: HTTP client for making API requests.
- **`react`** and **`react-dom`**: Core React libraries.
- **`react-router-dom`**: Routing library for React.
- **`recharts`**: Charting library for React.

## Routing

The application uses `react-router-dom` for routing. The routes are defined as follows:

- **`/login`**: Renders the `Login` component.
- **`/register`**: Renders the `Register` component.
- **`/transactions`**: Renders the `Transactions` component.
- **`/`**: Renders the `Home` component.

## Development

- **Starting the Development Server**: Run `npm run dev` to start the development server and view the application at `http://localhost:3000` (default port).
- **Building for Production**: Run `npm run build` to generate the production build in the `dist/` directory.
- **Linting**: Run `npm run lint` to check code quality.

## Contribution

For contributing to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them.
4. Submit a pull request with a clear description of the changes.



# Backend API Documentation

## Overview

This document provides details about the backend API for the financial transactions system. The API is built using Express.js and MongoDB, and it includes endpoints for user authentication, transaction management, and statistical data retrieval.

## Base URL

The base URL for all endpoints is: 

```
https://hsbc-server.onrender.com/api
```

## Authentication Routes

### Register User

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **Success:** 
    ```json
    {
      "token": "string"
    }
    ```
  - **Error:** 
    ```json
    {
      "msg": "User already exists"
    }
    ```

### Login User

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate a user and return a JWT token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **Success:** 
    ```json
    {
      "token": "string"
    }
    ```
  - **Error:** 
    ```json
    {
      "msg": "Invalid credentials"
    }
    ```

## Transaction Routes

### Get All Transactions

- **Endpoint:** `GET /api/transactions`
- **Description:** Retrieve a paginated list of all transactions.
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Number of transactions per page (default: 10)
- **Response:**
  - **Success:**
    ```json
    {
      "success": true,
      "count": "number",
      "data": {
        "next": {
          "page": "number",
          "limit": "number"
        },
        "previous": {
          "page": "number",
          "limit": "number"
        },
        "results": [
          {
            "step": "number",
            "customer": "string",
            "age": "number",
            "gender": "string",
            "zipcodeOri": "string",
            "merchant": "string",
            "zipMerchant": "string",
            "category": "string",
            "amount": "number",
            "fraud": "boolean"
          }
        ]
      }
    }
    ```

### Get Transaction By ID

- **Endpoint:** `GET /api/transactions/:id`
- **Description:** Retrieve a specific transaction by ID.
- **Response:**
  - **Success:**
    ```json
    {
      "success": true,
      "data": {
        "step": "number",
        "customer": "string",
        "age": "number",
        "gender": "string",
        "zipcodeOri": "string",
        "merchant": "string",
        "zipMerchant": "string",
        "category": "string",
        "amount": "number",
        "fraud": "boolean"
      }
    }
    ```
  - **Error:**
    ```json
    {
      "error": "Transaction not found"
    }
    ```

### Add Transaction

- **Endpoint:** `POST /api/transactions`
- **Description:** Add a new transaction.
- **Request Body:**
  ```json
  {
    "step": "number",
    "customer": "string",
    "age": "number",
    "gender": "string",
    "zipcodeOri": "string",
    "merchant": "string",
    "zipMerchant": "string",
    "category": "string",
    "amount": "number",
    "fraud": "boolean"
  }
  ```
- **Response:**
  - **Success:**
    ```json
    {
      "success": true,
      "data": {
        "step": "number",
        "customer": "string",
        "age": "number",
        "gender": "string",
        "zipcodeOri": "string",
        "merchant": "string",
        "zipMerchant": "string",
        "category": "string",
        "amount": "number",
        "fraud": "boolean"
      }
    }
    ```
  - **Error:**
    ```json
    {
      "error": "Server error"
    }
    ```

### Get Transactions By Filter

- **Endpoint:** `POST /api/transactions/filter`
- **Description:** Retrieve transactions based on specified filters.
- **Request Body:**
  ```json
  {
    "step": "number",
    "customer": "string",
    "ageRange": [ "number", "number" ],
    "gender": "string",
    "zipcodeOri": "string",
    "merchant": "string",
    "zipMerchant": "string",
    "category": "string",
    "amountRange": [ "number", "number" ],
    "fraud": "boolean"
  }
  ```
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Number of transactions per page (default: 10)
- **Response:**
  - **Success:**
    ```json
    {
      "success": true,
      "count": "number",
      "data": {
        "next": {
          "page": "number",
          "limit": "number"
        },
        "previous": {
          "page": "number",
          "limit": "number"
        },
        "results": [
          {
            "step": "number",
            "customer": "string",
            "age": "number",
            "gender": "string",
            "zipcodeOri": "string",
            "merchant": "string",
            "zipMerchant": "string",
            "category": "string",
            "amount": "number",
            "fraud": "boolean"
          }
        ]
      }
    }
    ```

## Statistics Routes

### Get Age Statistics

- **Endpoint:** `GET /api/stats/age`
- **Description:** Retrieve statistics grouped by age.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "number",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number"
      }
    ]
    ```

### Get Amount Statistics

- **Endpoint:** `GET /api/stats/amount`
- **Description:** Retrieve statistics grouped by amount ranges.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "string",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number",
        "amountRange": {
          "start": "number",
          "end": "number"
        }
      }
    ]
    ```

### Get Category Statistics

- **Endpoint:** `GET /api/stats/category`
- **Description:** Retrieve statistics grouped by category.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "string",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number"
      }
    ]
    ```

### Get Merchant Statistics

- **Endpoint:** `GET /api/stats/merchant`
- **Description:** Retrieve statistics grouped by merchant.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "string",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number"
      }
    ]
    ```

### Get Gender Statistics

- **Endpoint:** `GET /api/stats/gender`
- **Description:** Retrieve statistics grouped by gender.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "string",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number"
      }
    ]
    ```

### Get Fraud Statistics

- **Endpoint:** `GET /api/stats/fraud`
- **Description:** Retrieve statistics grouped by fraud status.
- **Response:**
  - **Success:**
    ```json
    [
      {
        "_id": "number",
        "totalAmount": "number",
        "totalTransactions": "number",
        "averageAmount": "number",
        "totalFraud": "number",
        "totalNonFraud": "number"
      }
    ]
    ```
