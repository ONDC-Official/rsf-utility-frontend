# RSF Utility Frontend

> **📚 Complete Documentation**: See the [main repository documentation](../docs/) for comprehensive guides.  
> **🏠 Main Repository**: [RSF Utility](../README.md) - Complete system overview and quick start

## Quick Overview

This is the frontend service for RSF Utility - a React-based dashboard for ONDC network participants to manage settlement and reconciliation operations.

**Technology Stack**: React 17 • TypeScript • Material-UI • React Query • React Hook Form

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
# Create .env file with REACT_APP_BACKEND_URL

# Start development server
npm start

# Run tests
npm test
```

**Development Server**: http://localhost:3000  
**Backend API**: Configure via `REACT_APP_BACKEND_URL`

---

## 📖 Documentation

| Topic | Link |
|-------|------|
| **System Architecture** | [../docs/01-architecture.md](../docs/01-architecture.md) |
| **Component Architecture** | [../docs/02-components.md](../docs/02-components.md) |
| **User Workflows** | [../docs/03-workflows.md](../docs/03-workflows.md) |
| **API Integration** | [../docs/04-apis.md](../docs/04-apis.md) |
| **Deployment Guide** | [../docs/06-deployment.md](../docs/06-deployment.md) |
| **Security Implementation** | [../docs/08-security.md](../docs/08-security.md) |
| **Troubleshooting** | [../docs/09-troubleshooting.md](../docs/09-troubleshooting.md) |
| **Contributing Guidelines** | [../docs/10-contributing.md](../docs/10-contributing.md) |

---

## 🔧 Development

### Available Scripts
```bash
npm start           # Start development server with hot reload
npm run build       # Build for production
npm test            # Run unit tests
npm run lint        # Check code quality with ESLint
npm run lint:fix    # Auto-fix ESLint issues
```

### Environment Variables
```bash
# Frontend Configuration
REACT_APP_BACKEND_URL=http://localhost:3000    # Backend API base URL
REACT_APP_ENV=development                       # Application environment
REACT_APP_API_TIMEOUT=30000                    # API request timeout
```

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components with routing
├── services/      # API integration and HTTP client
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── interfaces/    # TypeScript type definitions
├── utils/         # Utility functions
├── styles/        # Styled components and themes
├── constants/     # Application constants
├── enums/         # TypeScript enums
└── App.tsx        # Application entry point
```

---

## 🏗️ Architecture

**Component Hierarchy**: Layout → Pages → Components → UI Elements  
**State Management**: React Query (server state) + Context API (client state)  
**Authentication**: JWT tokens with automatic refresh  
**HTTP Client**: Axios with request/response interceptors  

For detailed architecture information, see [Component Architecture](../docs/02-components.md).

---

## 📱 Key Features

### User Management
- Network participant configuration
- Provider details management
- User role-based access control

### Order Management
- Order listing with filtering and pagination
- Bulk order operations
- Order status tracking
- Due date management

### Settlement Operations
- Settlement generation and validation
- Counterparty selection workflows
- Settlement status monitoring
- Financial breakdown display

### Reconciliation Workflows
- Reconciliation request generation
- Cross-participant communication
- Status tracking and updates
- Discrepancy resolution

### Dashboard & Analytics
- Real-time order statistics
- Settlement performance metrics
- System health monitoring
- Audit trail visualization

---

## 🎨 UI/UX Design

**Design System**: Material-UI with custom ONDC theming  
**Responsive Design**: Mobile-first approach with breakpoints  
**Accessibility**: WCAG 2.1 AA compliance  
**Internationalization**: i18n support for multiple languages  

### Layout System
```
┌─────────────────────────────────────┐
│           Navigation Bar            │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │      Content Area        │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

---

## 🔗 API Integration

### HTTP Client Configuration
```typescript
// Axios instance with interceptors
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatic JWT token injection
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshAuthToken();
      return apiClient.request(error.config);
    }
    throw error;
  }
);
```

### React Query Integration
```typescript
// Server state management with caching
const { data: orders, isLoading, error } = useQuery(
  ['orders', userId, filters],
  () => orderService.getOrders(userId, filters),
  {
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  }
);
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Automatic Token Refresh**: Seamless session management
- **Request Validation**: Client-side input validation
- **HTTPS Enforcement**: Secure communication protocol
- **CORS Protection**: Cross-origin request security

---

## 🧪 Testing

### Testing Stack
- **Unit Tests**: React Testing Library + Jest
- **Component Tests**: Render testing with user interactions
- **API Tests**: Mock service worker for API mocking
- **E2E Tests**: Cypress for end-to-end testing

### Test Examples
```typescript
// Component test example
test('renders order table with data', () => {
  render(<OrderTable orders={mockOrders} />);
  
  expect(screen.getByText('Order ID')).toBeInTheDocument();
  expect(screen.getByText('ORDER-123')).toBeInTheDocument();
});

// User interaction test
test('handles order selection', async () => {
  const onSelect = jest.fn();
  render(<OrderTable orders={mockOrders} onSelect={onSelect} />);
  
  fireEvent.click(screen.getByText('ORDER-123'));
  
  expect(onSelect).toHaveBeenCalledWith(mockOrders[0]);
});
```

---

## 🔗 Related Services

- **Backend Repository**: [rsf-utility-backend](https://github.com/ONDC-Official/rsf-utility-backend)
- **Parent Repository**: [rsf-utility](https://github.com/ONDC-Official/rsf-utility)

---

## 📋 Code Quality

### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error"
  }
}
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "./**/*.{ts,tsx,json}": [
      "prettier --write",
      "npm run lint"
    ]
  }
}
```

---

## 🆘 Need Help?

- **Troubleshooting**: [../docs/09-troubleshooting.md](../docs/09-troubleshooting.md)
- **Contributing**: [../docs/10-contributing.md](../docs/10-contributing.md)
- **Issues**: Create issues in the [main repository](https://github.com/ONDC-Official/rsf-utility/issues)

---

*This repository is part of the RSF Utility microservice architecture. For complete project documentation, system overview, and setup instructions, please refer to the [main repository README](../README.md).*

*This repository is part of the RSF Utility microservice architecture. For complete project documentation and setup instructions, please refer to the [main repository](https://github.com/ONDC-Official/rsf-utility).*