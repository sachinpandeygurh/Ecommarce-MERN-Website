# Ecommarce-MERN-Website


## current work in ``` Ecommerce Backend ```

This repository contains the backend and frontend code for an Ecommerce application. It is built using the MERN stack (MongoDB, Express, React, and Node.js).

## Table of Contents

- [Getting Started](##getting-started)
  - [Prerequisites](###prerequisites)
  - [Installation](###installation)
- [Usage](##usage)
  - [API Endpoints](###api-endpoints)
- [Configuration](##configuration)
  - [Environment Variables](##environment-variables)
  - [SMTP Configuration](##smtp-configuration)
- [Project Structure](##project-structure)
- [Contributing](##contributing)
- [License](##license)


*** In this reposistery good MVC arcture try to build ***
##### ECOMMERCE backend file structure
```
ECOMMERCE/backend/
├── config/
│   └── config.env
│   └── database.js
├── controllers/
│   ├── orderController.js
│   ├── paymentController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── catchAsyncErrors.js
│   └── error.js
├── models/
│   ├── orderModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── orderRoute.js
│   ├── paymentRoute.js
│   ├── productRoute.js
│   └── userRoute.js
├── utils/
│   ├── apifeatures.js
│   ├── errorhandler.js
│   ├── jwtToken.js
│   └── sendEmail.js
├── app.js
└── server.js
```
##### ECOMMERCE frontend file structure
```
ECOMMERCE/frontend/
.
.
.
├── components/
│   └── ...
├── pages/
│   └── ...
├── services/
│   ├── orderService.js
│   ├── paymentService.js
│   └── productService.js
├── App.js
└── index.html
```
## Getting Started

Follow these instructions to get your development environment set up.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB database

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/sachinpandeygurh/Ecommarce-MERN-Website.git
   ```

2. Navigate to the project directory:

   ```sh
   cd ecommerce
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file and configure your environment variables (see [Environment Variables](#environment-variables)).

5. Start the server:

   ```sh
   npm start
   ```

The server should be up and running on `http://localhost:4000`.

## Usage

### API Endpoints

- Register a User: `POST /api/v1/register`
- Login User: `POST /api/v1/login`
- Logout User: `GET /api/v1/logout`
- Forgot Password: `POST /api/v1/password/forgot`
- Reset Password: `PUT /api/v1/password/reset/:token`
  
Note: Additional API endpoints are available, but are currently not listed for security reasons.

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT = 4000
MONGODB_URI = your-mongodb-connection-string
& more SMTP env variable but currently i am not showing due to some security reason
It will avilable soon....
```

### SMTP Configuration

For the SMTP configuration, you can use an SMTP service like Gmail. Ensure that you have the correct SMTP settings in your `.env` file.

## Project Structure

The project follows this structure:

- `controller`: Contains controller functions for different routes.
- `middleware`: Custom middleware functions.
- `model`: Mongoose models for the application.
- `routes`: Route definitions.
- `utils`: Utility functions.
- `app.js`: Main application file.

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [MIT LICENSE]([LICENSE](https://github.com/facebook/react/blob/main/LICENSE)https://github.com/facebook/react/blob/main/LICENSE) file for details.
