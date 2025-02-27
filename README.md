# React Project Assignment

## Overview
This is a React-based web application built using **Chakra UI**, **Firebase (Google Authentication)**, and **React TypeScript**. The application consists of multiple functional components, including a counter, a user data form, a rich text editor, and a dashboard for visualization.

## Technologies Used
- **React TypeScript**
- **Chakra UI** (UI Components)
- **React Router** (Navigation)
- **React Spring** (Animations)
- **Firebase Authentication** (Google Sign-In)
- **React Charts (Recharts)** (Data Visualization)
- **Local Storage** (Data Persistence)

## Features

### 1. Dashboard Page
- Displays the **logged-in user's email ID**.
- Shows the **current count** from the counter page.
- Displays the **total number of users added** from the user form page.
- Visualizes user profile trends using **React Charts (Recharts)**.

### 2. Counter Page
- Buttons for **increment**, **decrement**, and **reset**.
- Count value **persists across re-renders**.
- Background color **changes progressively in a linear manner (Bezier curve)** as the count increases.
- **Reset button** sets the count and background level back to **zero**.

### 3. User Form Page
- Form fields for **Name, Address, Email, and Phone Number**.
- **Auto-generates a unique User ID**.
- Saves user data to **local storage**.
- Displays a confirmation **popup when closing the browser** with unsaved changes.
- Users can **delete entries** by clicking a **delete button**.

### 4. Rich Text Editor Page
- Displays **user data** inside a **rich text editor**.
- Supports **bold, italic, underline, and list formatting**.
- Data is **persisted** to retain changes.

### 5. User Authentication (Optional Feature)
- Google **Sign-In and Sign-Up** authentication using **Firebase**.
- Implements **private and public routes** for security.

### 6. Charts and Visualization
- Used **Recharts** to create visual representations of user growth.
- **LineChart** is implemented in the Dashboard to display the total number of users added over time.
- **XAxis, YAxis, Tooltip, CartesianGrid** enhance the chart's readability.
- **ResponsiveContainer** ensures responsiveness across devices.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/neeraj-bn/react-google-auth-dashboard
   cd react-google-auth-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase Authentication:
   - Set up a Firebase project.
   - Enable Google Authentication.
   - Update Firebase configuration in the project.
4. Run the project:
   ```sh
   npm start
   ```

## Deliverables
- **Source Code Repository** with proper commit history.
- **Report on Component Structure & State Management Choices**.

## Live Demo
Deployed URL: [Live Application](https://react-gauth-project.netlify.app/)

---
This project showcases advanced **React development** practices with **Chakra UI, Firebase authentication, animations, and data visualization (Recharts)**, providing a smooth and interactive user experience.
