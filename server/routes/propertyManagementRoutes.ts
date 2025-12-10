/**
 * Property Management Routes
 * 
 * API routes for deaf-first smart property management platform
 */

import { Router } from 'express';
import { propertyManagementService } from '../services/propertyManagementService';
import { deafAuthService } from '../services/deafAuthService';

const router = Router();

// Simple in-memory rate limiter for auth routes
const authAttempts = new Map<string, { count: number; resetAt: number }>();

function authRateLimiter(req: any, res: any, next: any) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const key = `auth_${ip}`;
  
  const attempt = authAttempts.get(key);
  
  if (attempt && attempt.resetAt > now) {
    if (attempt.count >= 5) {
      return res.status(429).json({ 
        success: false, 
        error: 'Too many authentication attempts. Please try again in 15 minutes.' 
      });
    }
    attempt.count++;
  } else {
    authAttempts.set(key, {
      count: 1,
      resetAt: now + 15 * 60 * 1000 // 15 minutes
    });
  }
  
  next();
}

/**
 * Properties Routes
 */

// List all properties with optional filters
router.get('/properties', async (req, res) => {
  try {
    const filters = {
      deafAccessible: req.query.deafAccessible === 'true' ? true : req.query.deafAccessible === 'false' ? false : undefined,
      minBedrooms: req.query.minBedrooms ? parseInt(req.query.minBedrooms as string) : undefined,
      maxRent: req.query.maxRent ? parseFloat(req.query.maxRent as string) : undefined,
      city: req.query.city as string | undefined,
    };

    const properties = await propertyManagementService.listProperties(filters);
    res.json({ success: true, data: properties });
  } catch (error) {
    console.error('Error listing properties:', error);
    res.status(500).json({ success: false, error: 'Failed to list properties' });
  }
});

// Get single property
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await propertyManagementService.getProperty(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Error getting property:', error);
    res.status(500).json({ success: false, error: 'Failed to get property' });
  }
});

// Create new property
router.post('/properties', async (req, res) => {
  try {
    // TODO: Add authentication check to verify user is authorized to create properties
    // TODO: Add input validation for property data structure
    
    const property = await propertyManagementService.createProperty(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, error: 'Failed to create property' });
  }
});

/**
 * Maintenance Request Routes
 */

// Create maintenance request
router.post('/maintenance-requests', async (req, res) => {
  try {
    const request = await propertyManagementService.createMaintenanceRequest(req.body);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    res.status(500).json({ success: false, error: 'Failed to create maintenance request' });
  }
});

// Get maintenance request
router.get('/maintenance-requests/:id', async (req, res) => {
  try {
    const request = await propertyManagementService.getMaintenanceRequest(req.params.id);
    
    if (!request) {
      return res.status(404).json({ success: false, error: 'Maintenance request not found' });
    }

    res.json({ success: true, data: request });
  } catch (error) {
    console.error('Error getting maintenance request:', error);
    res.status(500).json({ success: false, error: 'Failed to get maintenance request' });
  }
});

// Update maintenance request status
router.patch('/maintenance-requests/:id/status', async (req, res) => {
  try {
    const { status, updatedBy, notes } = req.body;
    const request = await propertyManagementService.updateMaintenanceRequestStatus(
      req.params.id,
      status,
      updatedBy,
      notes
    );
    
    res.json({ success: true, data: request });
  } catch (error) {
    console.error('Error updating maintenance request status:', error);
    res.status(500).json({ success: false, error: 'Failed to update maintenance request status' });
  }
});

/**
 * Payment Routes
 */

// Create payment
router.post('/payments', async (req, res) => {
  try {
    const payment = await propertyManagementService.createPayment(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment' });
  }
});

// Get payment
router.get('/payments/:id', async (req, res) => {
  try {
    const payment = await propertyManagementService.getPayment(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error getting payment:', error);
    res.status(500).json({ success: false, error: 'Failed to get payment' });
  }
});

// List payments by tenant
router.get('/tenants/:tenantId/payments', async (req, res) => {
  try {
    const payments = await propertyManagementService.listPaymentsByTenant(req.params.tenantId);
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error('Error listing payments:', error);
    res.status(500).json({ success: false, error: 'Failed to list payments' });
  }
});

/**
 * Community Event Routes
 */

// List community events
router.get('/community-events', async (req, res) => {
  try {
    const propertyId = req.query.propertyId as string | undefined;
    const events = await propertyManagementService.listCommunityEvents(propertyId);
    res.json({ success: true, data: events });
  } catch (error) {
    console.error('Error listing community events:', error);
    res.status(500).json({ success: false, error: 'Failed to list community events' });
  }
});

// Create community event
router.post('/community-events', async (req, res) => {
  try {
    const event = await propertyManagementService.createCommunityEvent(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    console.error('Error creating community event:', error);
    res.status(500).json({ success: false, error: 'Failed to create community event' });
  }
});

// Get community event
router.get('/community-events/:id', async (req, res) => {
  try {
    const event = await propertyManagementService.getCommunityEvent(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, error: 'Community event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Error getting community event:', error);
    res.status(500).json({ success: false, error: 'Failed to get community event' });
  }
});

/**
 * Visual Alert Routes
 */

// Send visual alert
router.post('/visual-alerts', async (req, res) => {
  try {
    const alert = await propertyManagementService.sendVisualAlert(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (error) {
    console.error('Error sending visual alert:', error);
    res.status(500).json({ success: false, error: 'Failed to send visual alert' });
  }
});

// Acknowledge alert
router.post('/visual-alerts/:id/acknowledge', async (req, res) => {
  try {
    const alert = await propertyManagementService.acknowledgeAlert(req.params.id);
    res.json({ success: true, data: alert });
  } catch (error) {
    console.error('Error acknowledging alert:', error);
    res.status(500).json({ success: false, error: 'Failed to acknowledge alert' });
  }
});

// Get unacknowledged alerts
router.get('/tenants/:tenantId/alerts/unacknowledged', async (req, res) => {
  try {
    const alerts = await propertyManagementService.getUnacknowledgedAlerts(req.params.tenantId);
    res.json({ success: true, data: alerts });
  } catch (error) {
    console.error('Error getting unacknowledged alerts:', error);
    res.status(500).json({ success: false, error: 'Failed to get unacknowledged alerts' });
  }
});

/**
 * Tenant Routes
 */

// Create tenant
router.post('/tenants', async (req, res) => {
  try {
    // TODO: Add authentication and authorization checks
    // Verify that only authorized landlords or property managers can create tenant records
    // TODO: Add input validation for tenant data structure
    
    const tenant = await propertyManagementService.createTenant(req.body);
    res.status(201).json({ success: true, data: tenant });
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ success: false, error: 'Failed to create tenant' });
  }
});

// Get tenant
router.get('/tenants/:id', async (req, res) => {
  try {
    const tenant = await propertyManagementService.getTenant(req.params.id);
    
    if (!tenant) {
      return res.status(404).json({ success: false, error: 'Tenant not found' });
    }

    res.json({ success: true, data: tenant });
  } catch (error) {
    console.error('Error getting tenant:', error);
    res.status(500).json({ success: false, error: 'Failed to get tenant' });
  }
});

/**
 * DeafAUTH Integration Routes
 */

// Register user with DeafAUTH
router.post('/auth/register', async (req, res) => {
  try {
    const user = await deafAuthService.registerUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
});

// Authenticate user
router.post('/auth/login', authRateLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Input validation
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ success: false, error: 'Username is required and must be a string' });
    }
    
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Password is required and must be a string' });
    }
    
    const { user, session } = await deafAuthService.authenticate(username, password);
    res.json({ success: true, data: { user, session } });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
});

// Validate session
router.get('/auth/validate', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const user = await deafAuthService.validateSession(token);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error validating session:', error);
    res.status(500).json({ success: false, error: 'Failed to validate session' });
  }
});

// Logout
router.post('/auth/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    await deafAuthService.logout(token);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ success: false, error: 'Failed to logout' });
  }
});

// Submit verification request
router.post('/auth/verify', async (req, res) => {
  try {
    const { userId, verificationType, submittedData } = req.body;
    
    // Input validation
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ success: false, error: 'userId is required and must be a string' });
    }
    
    if (!verificationType || typeof verificationType !== 'string') {
      return res.status(400).json({ success: false, error: 'verificationType is required and must be a string' });
    }
    
    const validTypes = ['video-asl', 'community-vouching', 'document-upload', 'third-party'];
    if (!validTypes.includes(verificationType)) {
      return res.status(400).json({ 
        success: false, 
        error: `verificationType must be one of: ${validTypes.join(', ')}` 
      });
    }
    
    if (!submittedData || typeof submittedData !== 'object') {
      return res.status(400).json({ success: false, error: 'submittedData is required and must be an object' });
    }
    
    const request = await deafAuthService.submitVerificationRequest(userId, verificationType, submittedData);
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Error submitting verification request:', error);
    res.status(500).json({ success: false, error: 'Failed to submit verification request' });
  }
});

export default router;
