Here’s a clean, well-structured **README.md** you can use for your project. I’ve kept it clear, technical, and suitable for a Next.js + service-layer architecture.

---

# Project Architecture & API Usage Guide

This project follows a **clean service-based architecture** to separate concerns between routing, business logic, validation, and API communication.

---

## 📁 Folder Structure Overview

```
src/
├── service/
│   ├── api_endpoints.ts
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── ...
├── utils/
│   ├── yup.ts/
├──lib
│   ├── fetchClient.ts
│   └── fetchServer.ts
└── ...
```

---

## 🔗 API Endpoints

* **All API route endpoints are defined inside the `service` folder**.
* Endpoints must be accessed using the `getApiUrl` helper function.

### Example

```ts
import { getApiUrl } from "@/service/api_endpoints";

const LOGIN_URL = getApiUrl("LOGIN");
```

This ensures:

* Centralized endpoint management
* Easy updates across the application
* No hardcoded URLs in components or pages

---

## 🧠 Business Logic & API Calls

* **All business logic and API calls live inside the `service` folder**.
* UI components/pages should **only call service functions**, not APIs directly.
* This keeps components clean and focused on rendering.

### Example

```ts
// service/auth.service.ts
export async function login(payload: LoginPayload) {
  const url = getApiUrl("LOGIN");
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

---

## 🖥️ Backend API Calls (Next.js BE)

* All API requests are made **from the Next.js Backend (API routes / server actions)**.
* This helps with:

  * Secure token handling
  * Better control over authentication
  * Server-side validation and error handling

---

## ✅ Validation

* **All validations are handled using `yup`**
* Validation schemas are located in:

```
utils/validations/
```

* Each feature has its own validation file to keep rules isolated and reusable.

### Example

```ts
// utils/validations/login.yup.ts
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
```

---

## 🌐 API Fetch Utilities

To standardize API communication, two fetch utilities are provided:

### 1. `fetchClient`

* Used for **client-side API calls**
* Automatically handles headers, tokens, and errors

### 2. `fetchServer`

* Used for **server-side API calls**
* Suitable for API routes, server actions, and SSR

This ensures:

* Consistent API handling
* Centralized error and auth logic
* Less duplicated code

---

## 🧩 Key Benefits of This Architecture

* ✅ Centralized API endpoints
* ✅ Clear separation of concerns
* ✅ Reusable validation logic
* ✅ Secure backend-driven API calls
* ✅ Scalable and maintainable structure
