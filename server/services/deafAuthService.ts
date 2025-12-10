/**
 * DeafAUTH Service
 * 
 * Identity verification and authentication service for the Deaf community.
 * Provides secure, accessible authentication with ASL video verification,
 * community validation, and privacy-first identity management.
 */

import { v4 as uuidv4 } from 'uuid';

export interface DeafAuthUser {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  profileType: 'deaf' | 'hard-of-hearing' | 'hearing' | 'deafblind' | 'coda';
  preferredLanguage: 'ASL' | 'BSL' | 'Auslan' | 'LSF' | 'JSL' | 'Other';
  communicationPreferences: {
    videoCall: boolean;
    textChat: boolean;
    email: boolean;
    sms: boolean;
    vrs: boolean;
  };
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  verificationMethod?: 'video-asl' | 'community-vouching' | 'document-upload' | 'third-party';
  verifiedAt?: string;
  communityScore?: number; // 0-100, based on community interactions
  trustedBy?: string[]; // Array of user IDs who trust this user
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata: Record<string, any>;
}

export interface DeafAuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  deviceInfo?: {
    deviceType: string;
    browser: string;
    os: string;
    ipAddress: string;
  };
  createdAt: string;
  lastActivityAt: string;
}

export interface DeafAuthVerificationRequest {
  id: string;
  userId: string;
  verificationType: 'video-asl' | 'community-vouching' | 'document-upload' | 'third-party';
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  submittedData: {
    videoUrl?: string;
    documentUrls?: string[];
    communityVouchers?: string[]; // User IDs
    thirdPartyProvider?: string;
    additionalInfo?: Record<string, any>;
  };
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

class DeafAuthService {
  private apiKey: string;
  private apiBaseUrl: string;
  private mockMode: boolean;
  private sessions: Map<string, DeafAuthSession>;
  private users: Map<string, DeafAuthUser>;
  private verificationRequests: Map<string, DeafAuthVerificationRequest>;

  constructor() {
    this.apiKey = process.env.DEAFAUTH_API_KEY || '';
    this.apiBaseUrl = process.env.DEAFAUTH_API_URL || 'https://api.deafauth.com/v1';
    this.mockMode = !this.apiKey || process.env.NODE_ENV === 'development';
    this.sessions = new Map();
    this.users = new Map();
    this.verificationRequests = new Map();

    if (this.mockMode) {
      console.log('⚠️  DeafAUTH Service running in MOCK mode');
      this.initializeMockData();
    }
  }

  private initializeMockData() {
    // Create a sample verified user
    const sampleUser: DeafAuthUser = {
      id: uuidv4(),
      username: 'deafuser123',
      email: 'user@example.com',
      profileType: 'deaf',
      preferredLanguage: 'ASL',
      communicationPreferences: {
        videoCall: true,
        textChat: true,
        email: true,
        sms: false,
        vrs: true,
      },
      verificationStatus: 'verified',
      verificationMethod: 'video-asl',
      verifiedAt: new Date().toISOString(),
      communityScore: 85,
      trustedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {},
    };

    this.users.set(sampleUser.id, sampleUser);
  }

  /**
   * Register a new user in the DeafAUTH system
   */
  async registerUser(userData: {
    username: string;
    email: string;
    phoneNumber?: string;
    profileType: DeafAuthUser['profileType'];
    preferredLanguage: DeafAuthUser['preferredLanguage'];
    communicationPreferences: DeafAuthUser['communicationPreferences'];
  }): Promise<DeafAuthUser> {
    if (this.mockMode) {
      const newUser: DeafAuthUser = {
        id: uuidv4(),
        ...userData,
        verificationStatus: 'unverified',
        communityScore: 0,
        trustedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {},
      };

      this.users.set(newUser.id, newUser);
      return newUser;
    }

    // Real API call would go here
    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Submit a verification request
   */
  async submitVerificationRequest(
    userId: string,
    verificationType: DeafAuthVerificationRequest['verificationType'],
    submittedData: DeafAuthVerificationRequest['submittedData']
  ): Promise<DeafAuthVerificationRequest> {
    if (this.mockMode) {
      const request: DeafAuthVerificationRequest = {
        id: uuidv4(),
        userId,
        verificationType,
        status: 'pending',
        submittedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.verificationRequests.set(request.id, request);
      return request;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Authenticate user and create session
   */
  async authenticate(
    username: string,
    password: string,
    deviceInfo?: DeafAuthSession['deviceInfo']
  ): Promise<{ user: DeafAuthUser; session: DeafAuthSession }> {
    if (this.mockMode) {
      // Find user by username
      const user = Array.from(this.users.values()).find(u => u.username === username);
      
      if (!user) {
        throw new Error('User not found');
      }

      // Create session
      const session: DeafAuthSession = {
        id: uuidv4(),
        userId: user.id,
        token: `deafauth_${uuidv4()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        deviceInfo,
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
      };

      this.sessions.set(session.id, session);

      // Update last login
      user.lastLoginAt = new Date().toISOString();
      this.users.set(user.id, user);

      return { user, session };
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Validate a session token
   */
  async validateSession(token: string): Promise<DeafAuthUser | null> {
    if (this.mockMode) {
      const session = Array.from(this.sessions.values()).find(s => s.token === token);
      
      if (!session) {
        return null;
      }

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.sessions.delete(session.id);
        return null;
      }

      // Update last activity
      session.lastActivityAt = new Date().toISOString();
      this.sessions.set(session.id, session);

      // Get user
      const user = this.users.get(session.userId);
      return user || null;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Logout and invalidate session
   */
  async logout(token: string): Promise<boolean> {
    if (this.mockMode) {
      const session = Array.from(this.sessions.values()).find(s => s.token === token);
      
      if (session) {
        this.sessions.delete(session.id);
        return true;
      }
      
      return false;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<DeafAuthUser | null> {
    if (this.mockMode) {
      return this.users.get(userId) || null;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: Partial<DeafAuthUser>
  ): Promise<DeafAuthUser> {
    if (this.mockMode) {
      const user = this.users.get(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...user,
        ...updates,
        id: user.id, // Ensure ID doesn't change
        updatedAt: new Date().toISOString(),
      };

      this.users.set(userId, updatedUser);
      return updatedUser;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Add community trust relationship
   */
  async addCommunityTrust(userId: string, trustedByUserId: string): Promise<boolean> {
    if (this.mockMode) {
      const user = this.users.get(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.trustedBy) {
        user.trustedBy = [];
      }

      if (!user.trustedBy.includes(trustedByUserId)) {
        user.trustedBy.push(trustedByUserId);
        
        // Update community score
        user.communityScore = (user.communityScore || 0) + 5;
        user.communityScore = Math.min(user.communityScore, 100);
        
        user.updatedAt = new Date().toISOString();
        this.users.set(userId, user);
      }

      return true;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Get verification request status
   */
  async getVerificationRequest(requestId: string): Promise<DeafAuthVerificationRequest | null> {
    if (this.mockMode) {
      return this.verificationRequests.get(requestId) || null;
    }

    throw new Error('DeafAUTH API not configured');
  }

  /**
   * Check if user is verified
   */
  isUserVerified(user: DeafAuthUser): boolean {
    return user.verificationStatus === 'verified';
  }

  /**
   * Get user's community trust score
   */
  getCommunityScore(user: DeafAuthUser): number {
    return user.communityScore || 0;
  }
}

// Export singleton instance
export const deafAuthService = new DeafAuthService();
