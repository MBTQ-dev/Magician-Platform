/**
 * Property Management Service
 * 
 * Deaf-first smart property management platform service.
 * Handles property listings, tenant management, maintenance requests,
 * payments, and community features with full ASL accessibility.
 */

import { v4 as uuidv4 } from 'uuid';

export interface Property {
  id: string;
  landlordId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'studio';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rent: number;
  deposit: number;
  deafAccessible: boolean;
  accessibilityFeatures: {
    visualDoorbell: boolean;
    strobeAlarms: boolean;
    videoIntercom: boolean;
    openFloorPlan: boolean;
    captionedAlerts: boolean;
    vibrationAlerts: boolean;
  };
  amenities: string[];
  photos: string[];
  aslTourVideoUrl?: string;
  status: 'available' | 'occupied' | 'maintenance' | 'unlisted';
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface Tenant {
  id: string;
  userId: string; // Links to DeafAUTH user
  propertyId: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  deposit: number;
  paymentMethod: 'auto-pay' | 'manual' | 'check';
  communicationPreference: 'ASL-video' | 'text' | 'email' | 'VRS';
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    preferredContact: string;
  }>;
  leaseAgreementUrl?: string;
  videoSignatureUrl?: string;
  status: 'active' | 'pending' | 'ended' | 'evicted';
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'pest' | 'other';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'submitted' | 'in-review' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  submissionMethod: 'asl-video' | 'photo' | 'text' | 'phone';
  aslVideoUrl?: string;
  photos: string[];
  assignedContractorId?: string;
  scheduledDate?: string;
  completedDate?: string;
  estimatedCost?: number;
  actualCost?: number;
  tenantRating?: number; // 1-5
  tenantFeedback?: string;
  timeline: Array<{
    timestamp: string;
    event: string;
    description: string;
    updatedBy: string;
  }>;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  type: 'rent' | 'deposit' | 'utilities' | 'late-fee' | 'repair' | 'other';
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'credit-card' | 'debit-card' | 'ach' | 'check' | 'cash';
  confirmationNumber?: string;
  aslExplanationVideoUrl?: string; // Video explaining charges
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface CommunityEvent {
  id: string;
  propertyId: string;
  organizerId: string;
  title: string;
  description: string;
  aslDescriptionVideoUrl?: string;
  eventDate: string;
  eventTime: string;
  location: string;
  maxAttendees?: number;
  attendees: string[]; // Array of user IDs
  tags: string[];
  interpreterProvided: boolean;
  captioningProvided: boolean;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface VisualAlert {
  id: string;
  propertyId: string;
  tenantId: string;
  type: 'doorbell' | 'fire-alarm' | 'package-delivery' | 'maintenance-visit' | 'emergency' | 'announcement';
  title: string;
  message: string;
  visualIndicator: 'flash' | 'strobe' | 'light-pattern' | 'screen-notification';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  delivered: boolean;
  acknowledged: boolean;
  acknowledgedAt?: string;
  expiresAt?: string;
  createdAt: string;
  metadata: Record<string, any>;
}

class PropertyManagementService {
  private mockMode: boolean;
  private properties: Map<string, Property>;
  private tenants: Map<string, Tenant>;
  private maintenanceRequests: Map<string, MaintenanceRequest>;
  private payments: Map<string, Payment>;
  private communityEvents: Map<string, CommunityEvent>;
  private visualAlerts: Map<string, VisualAlert>;

  constructor() {
    this.mockMode = process.env.NODE_ENV === 'development';
    this.properties = new Map();
    this.tenants = new Map();
    this.maintenanceRequests = new Map();
    this.payments = new Map();
    this.communityEvents = new Map();
    this.visualAlerts = new Map();

    if (this.mockMode) {
      console.log('🏠 Property Management Service running in MOCK mode');
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    // Create sample property
    const sampleProperty: Property = {
      id: uuidv4(),
      landlordId: 'landlord-123',
      address: {
        street: '123 Deaf-Friendly Lane',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
      },
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 950,
      rent: 1800,
      deposit: 1800,
      deafAccessible: true,
      accessibilityFeatures: {
        visualDoorbell: true,
        strobeAlarms: true,
        videoIntercom: true,
        openFloorPlan: true,
        captionedAlerts: true,
        vibrationAlerts: true,
      },
      amenities: ['In-unit laundry', 'Pet-friendly', 'Parking', 'Gym access', 'Community room'],
      photos: [],
      aslTourVideoUrl: '/videos/property-tour-asl.mp4',
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {},
    };

    this.properties.set(sampleProperty.id, sampleProperty);
  }

  /**
   * Property Management Methods
   */
  async createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const property: Property = {
      ...propertyData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.properties.set(property.id, property);
    return property;
  }

  async getProperty(propertyId: string): Promise<Property | null> {
    return this.properties.get(propertyId) || null;
  }

  async listProperties(filters?: {
    deafAccessible?: boolean;
    minBedrooms?: number;
    maxRent?: number;
    city?: string;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (filters) {
      if (filters.deafAccessible !== undefined) {
        properties = properties.filter(p => p.deafAccessible === filters.deafAccessible);
      }
      if (filters.minBedrooms) {
        properties = properties.filter(p => p.bedrooms >= filters.minBedrooms);
      }
      if (filters.maxRent) {
        properties = properties.filter(p => p.rent <= filters.maxRent);
      }
      if (filters.city) {
        properties = properties.filter(p => p.address.city.toLowerCase() === filters.city?.toLowerCase());
      }
    }

    return properties;
  }

  /**
   * Tenant Management Methods
   */
  async createTenant(tenantData: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant> {
    const tenant: Tenant = {
      ...tenantData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tenants.set(tenant.id, tenant);
    return tenant;
  }

  async getTenant(tenantId: string): Promise<Tenant | null> {
    return this.tenants.get(tenantId) || null;
  }

  /**
   * Maintenance Request Methods
   */
  async createMaintenanceRequest(
    requestData: Omit<MaintenanceRequest, 'id' | 'timeline' | 'createdAt' | 'updatedAt'>
  ): Promise<MaintenanceRequest> {
    const request: MaintenanceRequest = {
      ...requestData,
      id: uuidv4(),
      timeline: [{
        timestamp: new Date().toISOString(),
        event: 'Request Submitted',
        description: 'Maintenance request submitted by tenant',
        updatedBy: requestData.tenantId,
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.maintenanceRequests.set(request.id, request);
    return request;
  }

  async getMaintenanceRequest(requestId: string): Promise<MaintenanceRequest | null> {
    return this.maintenanceRequests.get(requestId) || null;
  }

  async updateMaintenanceRequestStatus(
    requestId: string,
    status: MaintenanceRequest['status'],
    updatedBy: string,
    notes?: string
  ): Promise<MaintenanceRequest> {
    const request = this.maintenanceRequests.get(requestId);
    
    if (!request) {
      throw new Error('Maintenance request not found');
    }

    request.status = status;
    request.timeline.push({
      timestamp: new Date().toISOString(),
      event: `Status changed to ${status}`,
      description: notes || `Maintenance request status updated`,
      updatedBy,
    });
    request.updatedAt = new Date().toISOString();

    this.maintenanceRequests.set(requestId, request);
    return request;
  }

  /**
   * Payment Methods
   */
  async createPayment(paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const payment: Payment = {
      ...paymentData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.payments.set(payment.id, payment);
    return payment;
  }

  async getPayment(paymentId: string): Promise<Payment | null> {
    return this.payments.get(paymentId) || null;
  }

  async listPaymentsByTenant(tenantId: string): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(p => p.tenantId === tenantId);
  }

  /**
   * Community Event Methods
   */
  async createCommunityEvent(
    eventData: Omit<CommunityEvent, 'id' | 'attendees' | 'createdAt' | 'updatedAt'>
  ): Promise<CommunityEvent> {
    const event: CommunityEvent = {
      ...eventData,
      id: uuidv4(),
      attendees: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.communityEvents.set(event.id, event);
    return event;
  }

  async getCommunityEvent(eventId: string): Promise<CommunityEvent | null> {
    return this.communityEvents.get(eventId) || null;
  }

  async listCommunityEvents(propertyId?: string): Promise<CommunityEvent[]> {
    let events = Array.from(this.communityEvents.values());
    
    if (propertyId) {
      events = events.filter(e => e.propertyId === propertyId);
    }

    return events.filter(e => e.status !== 'cancelled');
  }

  /**
   * Visual Alert Methods
   */
  async sendVisualAlert(alertData: Omit<VisualAlert, 'id' | 'delivered' | 'acknowledged' | 'createdAt'>): Promise<VisualAlert> {
    const alert: VisualAlert = {
      ...alertData,
      id: uuidv4(),
      delivered: true, // Simulate immediate delivery
      acknowledged: false,
      createdAt: new Date().toISOString(),
    };

    this.visualAlerts.set(alert.id, alert);
    return alert;
  }

  async acknowledgeAlert(alertId: string): Promise<VisualAlert> {
    const alert = this.visualAlerts.get(alertId);
    
    if (!alert) {
      throw new Error('Alert not found');
    }

    alert.acknowledged = true;
    alert.acknowledgedAt = new Date().toISOString();
    this.visualAlerts.set(alertId, alert);

    return alert;
  }

  async getUnacknowledgedAlerts(tenantId: string): Promise<VisualAlert[]> {
    return Array.from(this.visualAlerts.values())
      .filter(a => a.tenantId === tenantId && !a.acknowledged);
  }
}

// Export singleton instance
export const propertyManagementService = new PropertyManagementService();
