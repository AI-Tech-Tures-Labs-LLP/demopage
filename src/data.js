export const bubbleData = {
  sales: {
    id: 'sales',
    title: 'Top Management',
    color: '#e8a83d',
    link: import.meta.env.VITE_LINK_SALES,
    subComponents: [
      { id: 'advanced-ai-monitoring', title: 'Advanced AI Monitoring', description: 'Real-time AI-powered operational surveillance.', link: import.meta.env.VITE_LINK_ADVANCED_AI_MONITORING },
      { id: 'automated-reports', title: 'Automated Reports & Dashboards', description: 'Self-generating data visualizations and insights.', link: import.meta.env.VITE_LINK_AUTOMATED_REPORTS },
      { id: 'command-center', title: 'Command Center', description: 'Centralized control room for enterprise management.', link: import.meta.env.VITE_LINK_COMMAND_CENTER }
    ]
  },
  erp: {
    id: 'erp',
    title: 'Analytics',
    color: '#4a90e2',
    link: import.meta.env.VITE_LINK_ERP,
    subComponents: [
      { id: 'analyst-automated-reports', title: 'Business Intelligence', description: 'Schedule and auto-generate detailed performance reports.', link: import.meta.env.VITE_LINK_ANALYST_AUTOMATED_REPORTS },
      { id: 'analyst-audit-trails', title: 'Audit Trails', description: 'Comprehensive tracking of all system activities and changes.', link: import.meta.env.VITE_LINK_ANALYST_AUDIT_TRAILS },
      { id: 'analyst-command-center', title: 'Root Cause Analysis', description: 'Unified overview of system health and metrics.', link: import.meta.env.VITE_LINK_ANALYST_COMMAND_CENTER },
      { id: 'analyst-ai-monitoring', title: 'AI Insights Engine', description: 'Intelligent alerts and real-time anomaly detection.', link: import.meta.env.VITE_LINK_ANALYST_AI_MONITORING }
    ]
  },
  topManagement: {
    id: 'topManagement',
    title: 'Procurement',
    color: '#e74c3c',
    link: import.meta.env.VITE_LINK_TOP_MANAGEMENT,
    subComponents: [
      { id: 'order-fulfillment', title: 'Order Fulfillment', description: 'Streamlined tracking from order placement to delivery.', link: import.meta.env.VITE_LINK_ORDER_FULFILLMENT },
      { id: 'procurement-inventory', title: 'Inventory Management', description: 'Smart stock optimization and supply chain visibility.', link: import.meta.env.VITE_LINK_PROCUREMENT_INVENTORY },
      { id: 'raw-materials', title: 'Procurement of Raw Materials', description: 'Automated reordering and supplier tracking.', link: import.meta.env.VITE_LINK_RAW_MATERIALS },
      { id: 'invoicing-vendor-management', title: 'Invoicing and Vendor Management', description: 'Centralized invoice processing and vendor portal.', link: import.meta.env.VITE_LINK_INVOICING_VENDOR_MANAGEMENT }
    ]
  },
  analytics: {
    id: 'analytics',
    title: 'Sales Enablement',
    color: '#9b59b6',
    link: import.meta.env.VITE_LINK_ANALYTICS,
    subComponents: [
      { id: 'intelligent-dashboard', title: 'Intelligent Lead Assignment', description: 'Smart allocation of leads to representatives based on geography and workload.', link: import.meta.env.VITE_LINK_INTELLIGENT_DASHBOARD },
      { id: 'lead-assignments', title: 'Field Sales Management', description: 'Operational workspace for hunters to manage leads, meetings, and visits.', link: import.meta.env.VITE_LINK_LEAD_ASSIGNMENTS },
      { id: 'field-sales', title: 'AI Sales Monitoring', description: 'Continuous analysis of sales activities, conversion rates, and pipeline health.', link: import.meta.env.VITE_LINK_FIELD_SALES },
      { id: 'ai-sales-monitoring', title: 'Feedback and Collaboration', description: 'Seamless communication and visit feedback tracking between managers and hunters.', link: import.meta.env.VITE_LINK_AI_SALES_MONITORING }
    ]
  }
};
