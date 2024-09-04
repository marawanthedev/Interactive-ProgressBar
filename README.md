
---

# Interactive Progress Bar Tutorial

Welcome to the Interactive Progress Bar Tutorial repository! This project is designed to help you set up a dynamic progress bar that accurately reflects the state of form submission or data retrieval in your React application. Whether you're building a form or handling multiple API requests, this tutorial will guide you through creating a progress bar that provides real-time feedback to users.

## Overview

This tutorial is divided into four main areas:

1. **Form Component:** The starting point of our tutorial, where users submit data. This form mimics a complaint submission process, giving you a practical example of form handling.

2. **Interactive Progress Bar:** A React component that expects several props:
   - `loadingState`: Boolean indicating whether the form is loading.
   - `loadingMessage`: A message to display while loading.
   - `apiRequestsDone`: The number of completed API requests.
   - `apiRequestsCount`: The total number of API requests expected.

   The progress bar calculates the percentage of completion based on these props and updates its visual state accordingly.

3. **Utility Function:** A helper function that counts the number of awaited requests inside the handle submit function. This function is crucial for setting the `apiRequestsCount` that the progress bar depends on.

4. **Node.js Express Server:** A simple backend server to simulate lengthy requests. This helps you see the progress bar in action with real-world delays.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/interactive-progress-bar-tutorial.git
   cd interactive-progress-bar-tutorial
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Backend Server:**
   In one terminal window, run:
   ```bash
   npm run start:server
   ```
   This will start the Node.js Express server, which simulates lengthy API requests.

4. **Start the React Application:**
   In another terminal window, run:
   ```bash
   npm run start
   ```
   This will start the React application, where you can interact with the form and see the progress bar in action.

## How It Works

- **Form Component:** Users can fill out the form and submit it. The form triggers API requests to the backend server, and the progress bar updates based on the completion of these requests.

- **Progress Bar:** As the form submits requests, the progress bar calculates and displays the percentage of completion. It updates dynamically based on the `apiRequestsDone` and `apiRequestsCount` props.

- **Utility Function:** This function counts the number of awaited API requests in the handle submit function, providing the necessary data for the progress bar to function correctly.

## Example Usage

```jsx
// Example of how to use the Progress Bar component
<ProgressBar
  loadingState={loading}
  loadingMessage="Submitting your complaint..."
  apiRequestsDone={completedRequests}
  apiRequestsCount={totalRequests}
/>
```



Happy coding!

---

Let me know if you'd like any changes or additional details!
