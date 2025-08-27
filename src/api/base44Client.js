import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68a862fb70d59764bc4f890f", 
  requiresAuth: true // Ensure authentication is required for all operations
});
