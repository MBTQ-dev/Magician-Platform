import { Router } from 'express';
import { db } from '../database';
import { partnerAgencies, agencyClients, agencyServices, users, vrCounselors } from '../../shared/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();

// ===== Partner Agency Endpoints =====

// Get all partner agencies
router.get('/agencies', async (req, res) => {
  try {
    const { agencyType, isActive } = req.query;
    
    let query = db.select().from(partnerAgencies);
    
    if (agencyType) {
      query = query.where(eq(partnerAgencies.agencyType, agencyType as string)) as any;
    }
    
    if (isActive !== undefined) {
      query = query.where(eq(partnerAgencies.isActive, isActive === 'true')) as any;
    }
    
    const agencies = await query.orderBy(desc(partnerAgencies.partnerSince));
    
    res.json({
      success: true,
      data: agencies
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get single partner agency by ID
router.get('/agencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const agency = await db.select()
      .from(partnerAgencies)
      .where(eq(partnerAgencies.id, parseInt(id)))
      .limit(1);
    
    if (agency.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agency not found'
      });
    }
    
    res.json({
      success: true,
      data: agency[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Register new partner agency
router.post('/agencies', async (req, res) => {
  try {
    const agencyData = req.body;
    
    const newAgency = await db.insert(partnerAgencies)
      .values(agencyData)
      .returning();
    
    res.status(201).json({
      success: true,
      data: newAgency[0],
      message: 'Partner agency registered successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update partner agency
router.put('/agencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedAgency = await db.update(partnerAgencies)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(partnerAgencies.id, parseInt(id)))
      .returning();
    
    if (updatedAgency.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agency not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedAgency[0],
      message: 'Partner agency updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== Agency Client Endpoints =====

// Get all clients for an agency
router.get('/agencies/:agencyId/clients', async (req, res) => {
  try {
    const { agencyId } = req.params;
    const { status } = req.query;
    
    let query = db.select({
      client: agencyClients,
      user: users,
      counselor: vrCounselors
    })
    .from(agencyClients)
    .leftJoin(users, eq(agencyClients.userId, users.id))
    .leftJoin(vrCounselors, eq(agencyClients.assignedCounselorId, vrCounselors.id))
    .where(eq(agencyClients.agencyId, parseInt(agencyId)));
    
    if (status) {
      query = query.where(eq(agencyClients.status, status as string)) as any;
    }
    
    const clients = await query.orderBy(desc(agencyClients.referralDate));
    
    res.json({
      success: true,
      data: clients
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get single client details
router.get('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await db.select({
      client: agencyClients,
      agency: partnerAgencies,
      user: users,
      counselor: vrCounselors
    })
    .from(agencyClients)
    .leftJoin(partnerAgencies, eq(agencyClients.agencyId, partnerAgencies.id))
    .leftJoin(users, eq(agencyClients.userId, users.id))
    .leftJoin(vrCounselors, eq(agencyClients.assignedCounselorId, vrCounselors.id))
    .where(eq(agencyClients.id, parseInt(id)))
    .limit(1);
    
    if (client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      data: client[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new client referral
router.post('/agencies/:agencyId/clients', async (req, res) => {
  try {
    const { agencyId } = req.params;
    const clientData = req.body;
    
    const newClient = await db.insert(agencyClients)
      .values({
        ...clientData,
        agencyId: parseInt(agencyId)
      })
      .returning();
    
    res.status(201).json({
      success: true,
      data: newClient[0],
      message: 'Client referral created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update client information
router.put('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedClient = await db.update(agencyClients)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(agencyClients.id, parseInt(id)))
      .returning();
    
    if (updatedClient.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedClient[0],
      message: 'Client information updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Assign counselor to client
router.post('/clients/:id/assign-counselor', async (req, res) => {
  try {
    const { id } = req.params;
    const { counselorId } = req.body;
    
    const updatedClient = await db.update(agencyClients)
      .set({
        assignedCounselorId: counselorId,
        updatedAt: new Date()
      })
      .where(eq(agencyClients.id, parseInt(id)))
      .returning();
    
    if (updatedClient.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedClient[0],
      message: 'Counselor assigned successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== Agency Service Endpoints =====

// Get all services for a client
router.get('/clients/:clientId/services', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.query;
    
    let query = db.select()
      .from(agencyServices)
      .where(eq(agencyServices.agencyClientId, parseInt(clientId)));
    
    if (status) {
      query = query.where(eq(agencyServices.status, status as string)) as any;
    }
    
    const services = await query.orderBy(desc(agencyServices.createdAt));
    
    res.json({
      success: true,
      data: services
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new service for client
router.post('/clients/:clientId/services', async (req, res) => {
  try {
    const { clientId } = req.params;
    const serviceData = req.body;
    
    const newService = await db.insert(agencyServices)
      .values({
        ...serviceData,
        agencyClientId: parseInt(clientId)
      })
      .returning();
    
    res.status(201).json({
      success: true,
      data: newService[0],
      message: 'Service created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update service status
router.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedService = await db.update(agencyServices)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(agencyServices.id, parseInt(id)))
      .returning();
    
    if (updatedService.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedService[0],
      message: 'Service updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== Dashboard & Analytics Endpoints =====

// Get agency dashboard statistics
router.get('/agencies/:agencyId/dashboard', async (req, res) => {
  try {
    const { agencyId } = req.params;
    
    // Get all clients for the agency
    const clients = await db.select()
      .from(agencyClients)
      .where(eq(agencyClients.agencyId, parseInt(agencyId)));
    
    // Get all services for agency clients
    const clientIds = clients.map(c => c.id);
    const services = clientIds.length > 0 
      ? await db.select()
          .from(agencyServices)
          .where(eq(agencyServices.agencyClientId, clientIds[0]))
      : [];
    
    // Calculate statistics
    const stats = {
      totalClients: clients.length,
      activeClients: clients.filter(c => c.status === 'active').length,
      completedClients: clients.filter(c => c.status === 'completed').length,
      totalServices: services.length,
      pendingServices: services.filter(s => s.status === 'pending').length,
      inProgressServices: services.filter(s => s.status === 'in_progress').length,
      completedServices: services.filter(s => s.status === 'completed').length,
      recentReferrals: clients
        .sort((a, b) => new Date(b.referralDate).getTime() - new Date(a.referralDate).getTime())
        .slice(0, 5)
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get overall platform statistics for all agencies
router.get('/dashboard/statistics', async (req, res) => {
  try {
    const allAgencies = await db.select().from(partnerAgencies);
    const allClients = await db.select().from(agencyClients);
    const allServices = await db.select().from(agencyServices);
    
    const stats = {
      totalPartnerAgencies: allAgencies.length,
      activeAgencies: allAgencies.filter(a => a.isActive).length,
      agenciesByType: {
        lgbtqia: allAgencies.filter(a => a.agencyType === 'lgbtqia').length,
        disability: allAgencies.filter(a => a.agencyType === 'disability').length,
        workforce: allAgencies.filter(a => a.agencyType === 'workforce').length,
        mixed: allAgencies.filter(a => a.agencyType === 'mixed').length,
      },
      totalClients: allClients.length,
      activeClients: allClients.filter(c => c.status === 'active').length,
      totalServices: allServices.length,
      completedServices: allServices.filter(s => s.status === 'completed').length,
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
