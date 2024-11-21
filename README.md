Here’s a detailed **README.md** file for your project in Markdown format:
https://youtu.be/SfWzgurrzi4

```markdown
# Role-Based Buyer Onboarding and Management System

This project is a **Role-Based Buyer Onboarding and Management System** designed to streamline the buyer registration, approval, and verification process. It includes **role-specific dashboards**, backend APIs, and an OTP-based authentication system. The system is built with **React**, **Node.js**, **Express**, and **MongoDB**, with OTP functionality powered by **Twilio**.

---

## 🚀 Features

### 1. **Role-Based Dashboards**
- **Bot Approval Panel**:
  - Used by users with the role "BOT Approval Agent".
  - Displays pending buyer registrations for approval.
  - Includes functionalities like approving buyers, pagination, and dynamic search.

- **Bot Checker Panel**:
  - Used by users with the role "BOT Checker".
  - Displays approved buyer registrations for further checks.
  - Includes features like selecting records and reviewing buyer details.

### 2. **Buyer Onboarding Workflow**
- Simulates the buyer registration workflow.
- Displays buyer information such as name, location, mobile, email, business category, and registration status.
- Includes role-specific actions:
  - Approve buyers (in the Bot Approval Panel).
  - Review and validate approved buyers (in the Bot Checker Panel).

### 3. **OTP-Based Authentication**
- Backend implementation for OTP generation, sending, and verification:
  - **Send OTP**: Generates a 6-digit OTP and sends it via Twilio.
  - **Verify OTP**: Verifies the entered OTP and validates expiration.
- APIs tested via Postman.

### 4. **Dummy Data Management**
- Some panels utilize **frontend-managed dummy data** for testing purposes.
- Simulates buyer records and allows interaction through UI components like buttons and tables.

### 5. **Pagination and Search**
- Pagination for easy navigation through large datasets.
- Search functionality for filtering records dynamically.

### 6. **Tech Stack**
- **Frontend**:
  - React.js
  - Material-UI (for UI components)
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB (for data storage)
- **Third-Party Services**:
  - Twilio (for OTP generation and SMS)
- **Tools**:
  - Postman (API testing)
  - Environment Variables (for secure credentials)

---

## 📂 Project Structure

```
├── backend
│   ├── config
│   ├── controllers
│   │   ├── authController.js
│   │   ├── buyerController.js
│   │   └── ...
│   ├── middleware
│   ├── models
│   │   ├── User.js
│   │   ├── Buyer.js
│   │   └── ...
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── buyerRoutes.js
│   │   └── ...
│   ├── services
│   │   ├── otpService.js
│   │   └── ...
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ...
│   │   ├── pages
│   │   │   ├── BotApprovalPanel.jsx
│   │   │   ├── BotCheckerPanel.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   └── ...
│   │   └── services
│   └── public
│
└── README.md
```

---

## 🛠️ How to Run the Project

### Prerequisites
- Node.js and npm installed.
- MongoDB running locally or on a remote server.
- Twilio account credentials for OTP functionality.

### Backend Setup
1. Clone the repository and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/MERN_TEST
   PORT=5001
   JWT_SECRET=your_jwt_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_SERVICE_SID=your_twilio_service_sid
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

### Testing OTP API with Postman
1. Send a POST request to `/send-otp` with the phone number:
   ```json
   {
     "phoneNumber": "+91XXXXXXXXXX"
   }
   ```
2. Verify OTP using the `/verify-otp` endpoint with the phone number and OTP:
   ```json
   {
     "phoneNumber": "+91XXXXXXXXXX",
     "otp": "123456"
   }
   ```

---

## 🎯 Use Cases
- Streamlined buyer registration and onboarding process.
- Role-based user management system for businesses.
- Secure OTP-based authentication for user verification.

---

## 🚀 Future Enhancements
- Replace dummy data with dynamic MongoDB data for all panels.
- Implement a fully-featured mobile app for buyer onboarding.
- Add real-time notifications and audit logs for admin actions.

---

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📧 Contact
For any queries or suggestions, please reach out to:

- **Email**: rahulg0004@gmail.com
- **LinkedIn**: (https://www.linkedin.com/in/rahul-chauhan-11230a265/)
- **Portfolio**: (https://rahul-chauhan.netlify.app/)

---
