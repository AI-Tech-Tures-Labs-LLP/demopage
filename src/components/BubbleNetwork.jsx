import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bubbleData } from '../data';
import { Sparkles, X, ChevronRight, BarChart3, Database, ShieldCheck, ExternalLink, Package, Clock, TrendingUp, Layers, ShoppingCart, Briefcase, UserCheck, HeartHandshake, PieChart, BrainCircuit, Activity, Lightbulb, AlertTriangle, Sliders, ArrowRight, Users, Crown, Monitor, Bell, Zap, Shield, Target, ClipboardCheck, Bot, IndianRupee, Truck, Trophy, TrendingDown, CheckCircle2, MessageSquare, MapPin, Calendar } from 'lucide-react';

const subComponentContent = {
  'advanced-ai-monitoring': {
    title: 'AI Monitoring',
    intro: 'AI Monitoring continuously analyzes business operations in real-time to identify risks, anomalies, and performance drifts.',
    bullets: [
      'Automatically flags and prioritizes operational anomalies across all departments.',
      'Generates intelligent, actionable recommendations to resolve issues quickly.',
      'Prevents performance declines before they impact enterprise profitability.'
    ],
    features: [
      "Real-Time Drift & Anomaly Detection",
      "Intelligent Flagging & Alert Management",
      "AI-Powered Recommendations",
      "Predictive Risk Monitoring",
      "Cross-Functional Performance Visibility",
      "Root Cause & Trend Analysis"
    ]
  },
  'automated-reports': {
    title: 'Automated Dashboards & Reports',
    intro: 'Automated Dashboards and Reports provide a centralized, real-time view of business performance across multiple systems.',
    bullets: [
      'Consolidates operational data into a single, reliable source of truth.',
      'Features interactive charts and visual analytics to track company growth.',
      'Eliminates the need for manual reporting and Excel spreadsheet compilation.'
    ],
    features: [
      "Real-Time Business Performance Monitoring",
      "Interactive Dashboards & Visual Analytics",
      "Automated Reporting & Distribution",
      "Executive & Departmental Insights",
      "Trend, Variance & Growth Analysis",
      "Unified Business Intelligence Platform"
    ]
  },
  'command-center': {
    title: 'Command Center',
    intro: 'The Command Center acts as the central hub for managing business drifts, critical alerts, and resolutions.',
    bullets: [
      'Facilitates dedicated War Rooms for cross-functional collaboration and alignment.',
      'Ensures complete visibility and accountability for all raised flags.',
      'Accelerates the investigation and resolution of business-critical issues.'
    ],
    features: [
      "Centralized Drift & Alert Management",
      "AI-Powered Resolution Recommendations",
      "War Rooms & Cross-Functional Collaboration",
      "Root Cause Analysis & Documentation",
      "Action Plan & Resolution Tracking",
      "Governance, Visibility & Audit Trail"
    ]
  },
  'order-fulfillment': {
    title: 'Sales Order Fulfilment',
    intro: 'Sales Order Fulfilment manages the end-to-end journey of customer orders from confirmation to delivery.',
    bullets: [
      'Optimizes inventory allocation and production planning for each order.',
      'Streamlines dispatch scheduling and logistics coordination.',
      'Ensures accurate, on-time deliveries to maximize customer satisfaction.'
    ],
    features: [
      "End-to-End Order Tracking",
      "Inventory Allocation & Control",
      "Production & Dispatch Coordination",
      "Real-Time Order Visibility",
      "Exception & Delay Management",
      "Fulfilment Performance Monitoring"
    ]
  },
  'raw-materials': {
    title: 'Procurement of Raw Materials',
    intro: 'The Raw Material Procurement module streamlines the purchasing process for metals, diamonds, and gemstones.',
    bullets: [
      'Simplifies vendor communication and delivery schedule tracking.',
      'Coordinates material purchasing with real-time manufacturing demands.',
      'Minimizes inventory shortages to maintain uninterrupted production.'
    ],
    features: [
      "Purchase Requisition & Order Management",
      "Vendor Performance Management",
      "Material Requirement Planning",
      "Procurement Approval Workflows",
      "Quotation & Price Comparison",
      "Delivery Tracking, Analytics & Cost Optimization"
    ]
  },
  'procurement-inventory': {
    title: 'Inventory Management',
    intro: 'Inventory Management provides complete visibility and control over stock items across all warehouse locations.',
    bullets: [
      'Monitors raw materials, work-in-progress, and finished goods in real time.',
      'Reduces carrying costs by optimizing stock levels dynamically.',
      'Prevents costly stockouts and shortages for sales and production teams.'
    ],
    features: [
      "Real-Time Inventory Visibility",
      "Multi-Location Inventory Tracking",
      "Raw Material, WIP & Finished Goods Monitoring",
      "Stock Alerts & Exception Management",
      "Stock Movement & Batch Traceability",
      "Inventory Valuation, Reporting & Dead Stock Analysis"
    ]
  },
  'invoicing-vendor-management': {
    title: 'Invoicing',
    intro: 'The Invoicing module automates invoice generation and financial documentation for billing operations.',
    bullets: [
      'Integrates directly with sales orders and costing components.',
      'Automatically updates gold, diamond, and labour rates dynamically.',
      'Ensures complete tax compliance and accurate invoice history.'
    ],
    features: [
      "Automated Invoice Generation",
      "Sales Order & Billing Integration",
      "Dynamic Pricing & Rate Management",
      "Tax & Compliance Management",
      "Cost Component Management (Gold, Diamond, Labour & Certification)",
      "Payment Tracking, Invoice History & Audit Trail"
    ]
  },
  'intelligent-dashboard': {
    title: 'Intelligent Lead Assignment',
    intro: 'The Intelligent Lead Assignment module automatically allocates sales opportunities to the best field representatives.',
    bullets: [
      'Uses geographical data and proximity mapping for optimal routing.',
      'Balances workloads based on agent expertise and current capacity.',
      'Improves response times and increases lead conversion rates.'
    ],
    features: [
      "Map-Based Lead Allocation",
      "Territory & Region Management",
      "Intelligent Workload Balancing",
      "Nearest Representative Assignment",
      "Lead Ownership & Reassignment Control",
      "Geographic Coverage & Lead Visibility Analytics"
    ]
  },
  'lead-assignments': {
    title: 'Field Sales Management',
    intro: 'The Field Sales Management module serves as the mobile-friendly workspace for active sales representatives.',
    bullets: [
      'Tracks assigned leads, customer interactions, and meetings.',
      'Enables direct order placement and follow-up logging from the field.',
      'Keeps sales managers aligned with real-time updates and activity logs.'
    ],
    features: [
      "Mobile & Web Sales Workspace",
      "Meeting, Reminder & Follow-Up Management",
      "Customer Visit & Interaction Tracking",
      "Order Placement & Submission",
      "Manager Guidance & Sales Recommendations",
      "Activity Monitoring, Route Planning & Real-Time Updates"
    ]
  },
  'field-sales': {
    title: 'AI Sales Monitoring',
    intro: 'AI Sales Monitoring continuously tracks sales pipelines, follow-ups, and representative performance.',
    bullets: [
      'Identifies missed opportunities, delayed follow-ups, and inactive leads.',
      'Provides predictive performance insights and conversion metrics.',
      'Generates actionable recommendations to maximize team effectiveness.'
    ],
    features: [
      "Lead Aging & Follow-Up Monitoring",
      "Sales Performance & Conversion Analytics",
      "Sales Pipeline Health Tracking",
      "Automated Drift & Risk Detection",
      "AI-Powered Recommendations & Opportunity Identification",
      "Team Productivity & Predictive Sales Insights"
    ]
  },
  'ai-sales-monitoring': {
    title: 'Feedback & Collaboration Hub',
    intro: 'The Feedback & Collaboration Hub facilitates seamless communication between sales managers and field teams.',
    bullets: [
      'Records visit feedback, meeting outcomes, and customer responses.',
      'Enables managers to provide timely direction and monitor commitments.',
      'Ensures complete transparency and team accountability.'
    ],
    features: [
      "Post-Visit Feedback & Customer Records",
      "Manager–Hunter Communication Hub",
      "Activity, Progress & Performance Tracking",
      "Task, Deadline & Follow-Up Management",
      "Escalation & Action Item Tracking",
      "Sales Audit Trail & Accountability Monitoring"
    ]
  },
  'analyst-automated-reports': {
    title: 'Business Intelligence',
    intro: 'Transforms large volumes of operational data into meaningful insights and performance indicators.',
    bullets: [
      'Consolidates business metrics to track performance trends.',
      'Helps teams understand real-time operations across departments.',
      'Generates growth analytics and key performance visualizations.'
    ],
    features: [
      "KPI Analysis",
      "Trend Monitoring",
      "Performance Benchmarking",
      "Custom Reports",
      "Growth Analysis",
      "Data Visualization"
    ]
  },
  'analyst-audit-trails': {
    title: 'Audit Trails',
    intro: 'Provides complete transparency into every transaction, approval, and system activity.',
    bullets: [
      'Allows analysts to validate and verify critical operations.',
      'Traces anomalies and system issues back to their exact origin.',
      'Monitors modifications for complete security and compliance.'
    ],
    features: [
      "Activity Tracking",
      "Change History",
      "Transaction Traceability",
      "Approval Logs",
      "Data Validation",
      "Compliance Monitoring"
    ]
  },
  'analyst-command-center': {
    title: 'Root Cause Analysis',
    intro: 'Enables analysts to investigate flagged anomalies and identify performance drifts.',
    bullets: [
      'Identifies the core factors contributing to business inefficiencies.',
      'Performs exception analysis to isolate critical errors.',
      'Provides root cause insights to prevent future performance declines.'
    ],
    features: [
      "Anomaly Investigation",
      "Cause Identification",
      "Exception Analysis",
      "Cross-Department Correlation",
      "Issue Documentation",
      "Resolution Recommendations"
    ]
  },
  'analyst-ai-monitoring': {
    title: 'AI Insights Engine',
    intro: 'Continuously analyzes business data to uncover opportunities, risks, and predictive insights.',
    bullets: [
      'Detects unusual patterns not visible through traditional reporting.',
      'Uncovers hidden revenue opportunities and emerging risks.',
      'Applies predictive analytics to forecast future trends.'
    ],
    features: [
      "Predictive Analytics",
      "Anomaly Detection",
      "Risk Identification",
      "Opportunity Discovery",
      "AI Recommendations",
      "Pattern Recognition"
    ]
  }
};

const BubbleNetwork = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [focusedNode, setFocusedNode] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredProcureIdx, setHoveredProcureIdx] = useState(null);
  const [hoveredSalesIdx, setHoveredSalesIdx] = useState(null);
  const [hoveredAnalyticsIdx, setHoveredAnalyticsIdx] = useState(null);
  const [hoveredTopMgmtIdx, setHoveredTopMgmtIdx] = useState(null);
  const [procureFilter, setProcureFilter] = useState('All');
  const [hoveredWidgetIdx, setHoveredWidgetIdx] = useState(null);
  const [salesFilter, setSalesFilter] = useState('All');
  const [analyticsFilter, setAnalyticsFilter] = useState('All');
  const [hoveredSalesWidgetIdx, setHoveredSalesWidgetIdx] = useState(null);
  const [hoveredAnalyticsWidgetIdx, setHoveredAnalyticsWidgetIdx] = useState(null);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      setIsResizing(true);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Design-space: always layout at 1920×945, then zoom to fit any viewport
  const DESIGN_W = 1920;
  const DESIGN_H = 945;
  const pageZoom = Math.min(dimensions.width / DESIGN_W, dimensions.height / DESIGN_H);
  const w = DESIGN_W;
  const h = DESIGN_H;

  // Animation-safe click handler with cooldown to prevent rapid-fire glitches
  const isAnimating = useRef(false);
  const animationCooldown = useRef(null);

  const handleNodeClick = useCallback((id) => {
    if (isAnimating.current) return; // Block clicks during animation
    isAnimating.current = true;
    
    setFocusedNode(prev => prev === id ? null : id);
    
    // Clear any existing cooldown
    if (animationCooldown.current) clearTimeout(animationCooldown.current);
    
    // Lock clicks for 400ms (spring animation settle time)
    animationCooldown.current = setTimeout(() => {
      isAnimating.current = false;
    }, 400);
  }, []);

  // Cleanup cooldown on unmount
  useEffect(() => {
    return () => {
      if (animationCooldown.current) clearTimeout(animationCooldown.current);
    };
  }, []);

  const getCatFromSub = (subId) => {
    return Object.keys(bubbleData).find(catId =>
      bubbleData[catId].subComponents.some(sub => sub.id === subId)
    );
  };

  // Dynamic Layout Engine
  const getLayout = () => {
    const R = Math.round;

    // Dynamic factors based on screen size (keeps desktop exactly the same)
    let rootPct = 0.16;
    let catPct = 0.46;
    let subPct = 0.73;

    if (w < 768) {
      rootPct = 0.12;
      catPct = 0.36;
      subPct = 0.60;
    } else if (w < 1024) {
      rootPct = 0.14;
      catPct = 0.41;
      subPct = 0.66;
    }

    const layout = {
      root: { left: R(w * rootPct), top: R(h * 0.48) },
      cats: {
        sales: { left: R(w * catPct), top: R(h * 0.14) },
        topManagement: { left: R(w * catPct), top: R(h * 0.38) },
        analytics: { left: R(w * catPct), top: R(h * 0.62) },
        erp: { left: R(w * catPct), top: R(h * 0.86) }
      },
      subs: {
        // Group 1 (Top Management)
        'advanced-ai-monitoring': { left: R(w * subPct), top: R(h * 0.09) },
        'automated-reports': { left: R(w * subPct), top: R(h * 0.14) },
        'command-center': { left: R(w * subPct), top: R(h * 0.19) },

        // Group 2 (Procurement)
        'order-fulfillment': { left: R(w * subPct), top: R(h * 0.29) },
        'procurement-inventory': { left: R(w * subPct), top: R(h * 0.34) },
        'raw-materials': { left: R(w * subPct), top: R(h * 0.39) },
        'invoicing-vendor-management': { left: R(w * subPct), top: R(h * 0.44) },

        // Group 3 (Sales Enablement)
        'intelligent-dashboard': { left: R(w * subPct), top: R(h * 0.53) },
        'lead-assignments': { left: R(w * subPct), top: R(h * 0.58) },
        'field-sales': { left: R(w * subPct), top: R(h * 0.63) },
        'ai-sales-monitoring': { left: R(w * subPct), top: R(h * 0.68) },

        // Group 4 (Analyst)
        'analyst-automated-reports': { left: R(w * subPct), top: R(h * 0.77) },
        'analyst-audit-trails': { left: R(w * subPct), top: R(h * 0.82) },
        'analyst-command-center': { left: R(w * subPct), top: R(h * 0.87) },
        'analyst-ai-monitoring': { left: R(w * subPct), top: R(h * 0.92) },
      }
    };

    if (!focusedNode) return layout;

    const focusedType = focusedNode === 'root' ? 'root' : (bubbleData[focusedNode] ? 'cat' : 'sub');

    if (focusedType === 'root') {
      layout.root = { left: w < 768 ? R(w * 0.32) : R(w * 0.46), top: R(h * 0.50) };
      const catOrder = ['sales', 'topManagement', 'analytics', 'erp'];
      const spacing = w < 768 ? 0.10 : 0.16;
      const startTop = 0.5 - ((catOrder.length - 1) * spacing) / 2;
      catOrder.forEach((catId, i) => {
        layout.cats[catId] = { left: w < 768 ? R(w * 0.82) : R(w * 0.87), top: R(h * (startTop + i * spacing)) };
        bubbleData[catId].subComponents.forEach(sub => {
          layout.subs[sub.id] = { left: w < 768 ? R(w * 0.82) : R(w * 0.87), top: R(h * (startTop + i * spacing)) };
        });
      });
    } else if (focusedType === 'cat') {
      layout.root = { left: w < 768 ? R(w * -0.2) : R(w * 0.06), top: R(h * 0.35) }; // Pushed further left

      Object.keys(bubbleData).forEach((catId) => {
        if (catId === focusedNode) {
          layout.cats[catId] = { left: w < 768 ? R(w * 0.32) : R(w * 0.46), top: R(h * 0.50) }; // Shifted left to make room
          const subs = bubbleData[catId].subComponents;
          const spacing = w < 768 ? 0.10 : 0.16;
          const startTop = 0.5 - ((subs.length - 1) * spacing) / 2;
          subs.forEach((sub, i) => {
            layout.subs[sub.id] = { left: w < 768 ? R(w * 0.82) : R(w * 0.87), top: R(h * (startTop + i * spacing)) }; // Safely positioned
          });
        } else {
          // Hide other categories by placing them under the root
          layout.cats[catId] = { left: R(w * 0.06), top: R(h * 0.35) };
          bubbleData[catId].subComponents.forEach(sub => {
            layout.subs[sub.id] = { left: R(w * 0.06), top: R(h * 0.35) };
          });
        }
      });
    } else {
      const parentCatId = getCatFromSub(focusedNode);

      layout.root = { left: w < 768 ? R(w * -0.2) : R(w * 0.03), top: R(h * 0.20) }; // Push Brain further left

      Object.keys(bubbleData).forEach((catId) => {
        if (catId === parentCatId) {
          layout.cats[catId] = { left: w < 768 ? R(w * -0.2) : R(w * 0.12), top: R(h * 0.35) }; // Hide parent on mobile
          const subs = bubbleData[catId].subComponents;

          subs.forEach(sub => {
            if (sub.id === focusedNode) {
              layout.subs[sub.id] = { left: w < 768 ? R(w * 0.50) : R(w * 0.58), top: R(h * 0.50) }; // Center perfectly
            } else {
              // Hide sibling subs under parent
              layout.subs[sub.id] = { left: R(w * 0.12), top: R(h * 0.35) };
            }
          });
        } else {
          // Hide other categories under root
          layout.cats[catId] = { left: R(w * 0.05), top: R(h * 0.15) };
          bubbleData[catId].subComponents.forEach(sub => {
            layout.subs[sub.id] = { left: R(w * 0.05), top: R(h * 0.15) };
          });
        }
      });
    }
    return layout;
  };

  const layout = getLayout();

  const rs = w < 600 ? 0.4 : w < 1024 ? 0.7 : 1;

  const getSize = (type, id) => {
    const nodeId = id || (type === 'root' ? 'root' : null);
    if (!focusedNode) {
      if (type === 'root') return { width: 240 * rs, height: 240 * rs, scale: 1, opacity: 1, zIndex: 10 };
      if (type === 'cat') return { width: 180 * rs, height: 180 * rs, scale: 1, opacity: 1, zIndex: 11 };
      if (type === 'sub') return { width: 40 * rs, height: 40 * rs, scale: 1, opacity: 1, zIndex: 12 };
    }

    // Completely hide everything unrelated to the focused path
    const isCatFocused = bubbleData[focusedNode] !== undefined;
    const R = Math.round;

    if (type === 'root') {
      if (focusedNode === 'root') {
        const width = w < 768 ? R(w * 0.90) : w < 1024 ? R(w * 0.80) : R(Math.min(1350, w * 0.73));
        const height = w < 768 ? R(Math.min(580, h * 0.85)) : w < 1024 ? R(Math.min(680, h * 0.88)) : R(Math.min(750, h * 0.93));
        return { width, height, scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
      }
      return { width: 240 * rs, height: 240 * rs, scale: 0.35, opacity: 0.6, zIndex: 5 };
    }

    if (nodeId === focusedNode) {
      const isCat = bubbleData[nodeId] !== undefined;
      if (isCat) {
        const width = w < 768 ? R(w * 0.90) : w < 1024 ? R(w * 0.80) : R(Math.min(1350, w * 0.73));
        const height = w < 768 ? R(Math.min(580, h * 0.85)) : w < 1024 ? R(Math.min(680, h * 0.88)) : R(Math.min(750, h * 0.93));
        return { width, height, scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
      } else {
        const width = w < 768 ? R(w * 0.92) : w < 1024 ? R(w * 0.85) : R(Math.min(1350, w * 0.9));
        const height = w < 768 ? R(Math.min(580, h * 0.85)) : w < 1024 ? R(Math.min(680, h * 0.88)) : R(Math.min(750, h * 0.93));
        return { width, height, scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
      }
    }

    if (type === 'cat') {
      if (focusedNode === 'root') {
        return { width: 50 * rs, height: 50 * rs, scale: 1.1, opacity: 1, zIndex: 12 };
      }
      if (!isCatFocused && getCatFromSub(focusedNode) === id) {
        // Parent of focused sub
        return { width: 180 * rs, height: 180 * rs, scale: 0.7, opacity: 0.8, zIndex: 11 };
      }
      // Unrelated category
      return { width: 180 * rs, height: 180 * rs, scale: 0.1, opacity: 0, zIndex: 1 };
    }

    if (type === 'sub') {
      if (focusedNode === 'root') {
        return { width: 40 * rs, height: 40 * rs, scale: 0.1, opacity: 0, zIndex: 1 };
      }
      if (isCatFocused && getCatFromSub(id) === focusedNode) {
        // Child of focused category
        return { width: 50 * rs, height: 50 * rs, scale: 1.1, opacity: 1, zIndex: 12 };
      }
      // Unrelated or sibling subcomponent
      return { width: 40 * rs, height: 40 * rs, scale: 0.1, opacity: 0, zIndex: 1 };
    }
  };

  const createBezierCurve = (start, end, rStart, rEnd) => {
    const startX = start.left + rStart;
    const endX = end.left - rEnd;
    const cx1 = startX + (endX - startX) / 2;
    const cx2 = startX + (endX - startX) / 2;
    return `M ${startX} ${start.top} C ${cx1} ${start.top}, ${cx2} ${end.top}, ${endX} ${end.top}`;
  };

  const paths = [];
  Object.keys(layout.cats).forEach(catId => {
    const rootSize = getSize('root', 'root');
    const catSize = getSize('cat', catId);
    const rStart = (rootSize.width / 2) * rootSize.scale;
    const rEnd = (catSize.width / 2) * catSize.scale;
    paths.push({ id: `root-${catId}`, d: createBezierCurve(layout.root, layout.cats[catId], rStart, rEnd), catId });
  });
  Object.keys(bubbleData).forEach(catId => {
    bubbleData[catId].subComponents.forEach(sub => {
      const catSize = getSize('cat', catId);
      const subSize = getSize('sub', sub.id);
      const rStart = (catSize.width / 2) * catSize.scale;
      const rEnd = (subSize.width / 2) * subSize.scale;
      paths.push({ id: `${catId}-${sub.id}`, d: createBezierCurve(layout.cats[catId], layout.subs[sub.id], rStart, rEnd), catId, subId: sub.id });
    });
  });
  const springConfig = { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 };
  const activeTransition = isResizing ? { type: 'tween', duration: 0 } : springConfig;
  const cleanTransform = ({ x, y, scale }) => `translate(${x}, ${y}) scale(${scale})`;

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => {
        if (focusedNode && !isAnimating.current) {
          isAnimating.current = true;
          setFocusedNode(null);
          if (animationCooldown.current) clearTimeout(animationCooldown.current);
          animationCooldown.current = setTimeout(() => { isAnimating.current = false; }, 400);
        }
      }}
    >
      <div className="mesh-bg" />

      <div style={{ width: `${DESIGN_W}px`, height: `${DESIGN_H}px`, zoom: pageZoom, position: 'relative', overflow: 'hidden' }}>

      <AnimatePresence>
        {focusedNode && (
          <motion.button
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              if (isAnimating.current) return;
              isAnimating.current = true;
              setFocusedNode(null);
              if (animationCooldown.current) clearTimeout(animationCooldown.current);
              animationCooldown.current = setTimeout(() => { isAnimating.current = false; }, 400);
            }}
            style={{
              position: 'absolute', top: w < 768 ? '20px' : '40px', right: w < 768 ? '20px' : '40px', zIndex: 200,
              width: w < 768 ? '40px' : '56px', height: w < 768 ? '40px' : '56px', borderRadius: '50%',
              background: '#fff', border: '2px solid #e89528',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(232, 149, 40, 0.2)', cursor: 'pointer'
            }}
            whileHover={{ scale: 1.1, background: '#fdfbf2' }}
          >
            <X color="#a35b12" size={w < 768 ? 20 : 28} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, ...springConfig }}
        style={{ position: 'absolute', top: w < 768 ? '20px' : '40px', left: w < 768 ? '20px' : '50px', zIndex: 20 }}
      >
        <h1 className="shining-text" style={{ fontSize: w < 768 ? '16px' : '32px', margin: 0, display: w < 768 && focusedNode ? 'none' : 'block' }}>StackLogix DEMO</h1>
      </motion.div>

      {/* SVG Connections with Animated Paths */}
      <svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
        {paths.map((path) => {
          let lineOpacity = 1;
          if (focusedNode) {
            if (focusedNode === 'root') {
              if (w < 768) {
                lineOpacity = 0; // Hide lines when modal is full screen
              } else {
                // Only show root -> cat lines
                if (path.id.startsWith('root-')) lineOpacity = 1;
                else lineOpacity = 0;
              }
            } else {
              const isCatFocused = bubbleData[focusedNode] !== undefined;
              if (isCatFocused) {
                // Category is focused: only show Root -> Cat line, and Cat -> Subs lines
                if (path.catId === focusedNode) lineOpacity = 1;
                else lineOpacity = 0;
              } else {
                // Subcomponent is focused: only show Root -> Parent line, and Parent -> Sub line
                const parentCatId = getCatFromSub(focusedNode);
                if (w < 768) {
                  lineOpacity = 0; // Hide lines when subcomponent modal is full screen
                } else {
                  if (path.id === `root-${parentCatId}` || path.subId === focusedNode) lineOpacity = 1;
                  else lineOpacity = 0;
                }
              }
            }
          }
          return (
            <g key={path.id}>
              <motion.path
                style={{ willChange: 'opacity' }}
                animate={{ d: path.d, opacity: lineOpacity === 1 ? 0.35 : 0 }} transition={activeTransition}
                fill="none" stroke="rgba(232, 149, 40, 0.8)" strokeWidth="3"
              />
              <motion.path
                style={{ willChange: 'opacity' }}
                animate={{ d: path.d, opacity: lineOpacity === 1 ? 0.6 : 0 }} transition={activeTransition}
                fill="none" stroke="#f2ac49" strokeWidth="1.5"
              />
            </g>
          );
        })}
      </svg>

      {/* Root Bubble */}
      <motion.div
        className={`glass-bubble ${focusedNode === 'root' ? 'expanded' : ''}`}
        style={{ 
          position: 'absolute', 
          cursor: 'pointer', 
          borderWidth: `${Math.min(1.5, 1 / getSize('root').scale)}px`,
          willChange: 'left, top, transform, opacity, width, height, border-radius'
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (focusedNode === 'root') return;
          handleNodeClick('root');
        }}
        animate={{
          left: layout.root.left, top: layout.root.top,
          scale: getSize('root').scale, opacity: getSize('root').opacity,
          width: `${getSize('root').width}px`, height: `${getSize('root').height}px`,
          x: '-50%', y: '-50%', zIndex: getSize('root').zIndex,
          borderRadius: focusedNode === 'root' ? '24px' : '50%',
          overflow: 'hidden'
        }}
        transition={activeTransition}
        transformTemplate={cleanTransform}
        whileHover={focusedNode !== 'root' && !focusedNode ? { scale: 1.05, boxShadow: 'inset 0 0 20px #fff, 0 15px 40px rgba(232, 149, 40,0.4)' } : {}}
      >
        {/* Minimal View */}
        <AnimatePresence>
          {focusedNode !== 'root' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: focusedNode ? 0 : 0.4, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h1 style={{ fontSize: `${26 * rs}px`, fontWeight: '800', margin: 0 }}>StackLogix</h1>
              <h2 style={{ fontSize: `${13 * rs}px`, fontWeight: '600', color: '#a35b12', letterSpacing: '2px', marginTop: '4px' }}>BRAIN</h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rich Content View */}
        <AnimatePresence>
          {focusedNode === 'root' && (
            <motion.div key="bg-root"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#f4f6f8', borderRadius: 'inherit', zIndex: 0 }}
            />
          )}
          {focusedNode === 'root' && (
            <motion.div key="content-root"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: `${getSize('root').width}px`, 
                height: `${getSize('root').height}px`,
                zIndex: 1, 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >
              <div style={{ flex: '1', padding: w < 768 ? '16px 12px' : '32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflowY: w < 768 ? 'auto' : 'hidden', gap: w < 768 ? '16px' : '24px' }}>
                {/* Title & Introduction */}
                <div style={{ marginBottom: w < 768 ? '12px' : '0px' }}>
                  <h2 style={{ fontSize: w < 768 ? '26px' : '44px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                    What is StackLogix?
                  </h2>
                  <p style={{ fontSize: w < 768 ? '13px' : '17px', color: '#444', lineHeight: '1.5', marginTop: '8px', fontWeight: '500', textAlign: 'left', margin: '8px 0 0 0' }}>
                    A fully customizable platform that unifies and optimizes every stage of the business lifecycle — eliminating data silos and creating a single source of truth across the organization.
                  </p>
                </div>

                {/* Section 1: One system, every source of truth */}
                <div style={{ background: '#fff', borderLeft: '5px solid #e89528', padding: w < 768 ? '12px 14px' : '22px 28px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', borderLeftWidth: '5px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontSize: w < 768 ? '15px' : '19px', fontWeight: '800', color: '#111', margin: 0 }}>
                    One system, every source of truth
                  </h3>
                  <p style={{ fontSize: w < 768 ? '11px' : '14px', color: '#555', margin: '0 0 12px 0', fontWeight: '500' }}>
                    Integrates seamlessly with the tools you already run, then connects them into a single layer.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: w < 768 ? '6px' : '12px', flexWrap: 'wrap' }}>
                    {['ERP', 'CRM', 'Accounting', 'Manufacturing', 'Inventory'].map((source, index) => (
                      <React.Fragment key={source}>
                        <div style={{ background: '#fdfbf2', border: '1px solid rgba(232, 149, 40, 0.35)', color: '#a35b12', padding: w < 768 ? '4px 8px' : '6px 14px', borderRadius: '20px', fontSize: w < 768 ? '10px' : '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 2px 5px rgba(232,149,40,0.04)', flexShrink: 0 }}>
                          {source === 'ERP' && <Database size={w < 768 ? 11 : 13} />}
                          {source === 'CRM' && <Users size={w < 768 ? 11 : 13} />}
                          {source === 'Accounting' && <BarChart3 size={w < 768 ? 11 : 13} />}
                          {source === 'Manufacturing' && <Package size={w < 768 ? 11 : 13} />}
                          {source === 'Inventory' && <Layers size={w < 768 ? 11 : 13} />}
                          {source}
                        </div>
                        {index < 5 && <ArrowRight size={w < 768 ? 12 : 16} color="#d68022" style={{ flexShrink: 0 }} />}
                      </React.Fragment>
                    ))}
                    <div style={{ background: '#d68022', color: '#fff', padding: w < 768 ? '5px 10px' : '7px 16px', borderRadius: '20px', fontSize: w < 768 ? '10px' : '13px', fontWeight: '700', boxShadow: '0 4px 12px rgba(214, 128, 34, 0.25)', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                      <ShieldCheck size={w < 768 ? 11 : 13} />
                      Single source of truth
                    </div>
                  </div>
                </div>

                {/* Section 2: Modular by design */}
                <div style={{ background: '#fff', borderLeft: '5px solid #e89528', padding: w < 768 ? '12px 14px' : '22px 28px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', borderLeftWidth: '5px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontSize: w < 768 ? '15px' : '19px', fontWeight: '800', color: '#111', margin: 0 }}>
                    Modular by design
                  </h3>
                  <p style={{ fontSize: w < 768 ? '11px' : '14px', color: '#555', margin: '0 0 12px 0', fontWeight: '500' }}>
                    Purpose-built for the jewellery industry, adaptable to any enterprise workflow. Choose only the modules you need.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                      { title: 'AI-driven forecasting', icon: TrendingUp },
                      { title: 'Inventory planning', icon: Layers },
                      { title: 'Procurement', icon: ShoppingCart },
                      { title: 'Sales enablement', icon: Briefcase },
                      { title: 'Lead management', icon: UserCheck },
                      { title: 'Customer relationship', icon: HeartHandshake },
                      { title: 'Business intelligence', icon: PieChart }
                    ].map((mod, i) => {
                      const IconComponent = mod.icon;
                      return (
                        <div key={i} style={{ background: '#f8f9fa', border: '1px solid #f0f1f3', padding: w < 768 ? '8px 10px' : '14px 18px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ background: 'rgba(232, 149, 40, 0.08)', padding: '6px', borderRadius: '6px', color: '#e89528', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconComponent size={w < 768 ? 14 : 18} />
                          </div>
                          <span style={{ fontSize: w < 768 ? '11px' : '14px', fontWeight: '600', color: '#222', lineHeight: '1.2' }}>{mod.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Beyond dashboards and chatbots */}
                <div style={{ background: '#fff', borderLeft: '5px solid #e89528', padding: w < 768 ? '12px 14px' : '22px 28px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', borderLeftWidth: '5px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: w < 768 ? '0px' : '-16px' }}>
                  <h3 style={{ fontSize: w < 768 ? '15px' : '19px', fontWeight: '800', color: '#111', margin: 0 }}>
                    Beyond dashboards and chatbots
                  </h3>
                  <p style={{ fontSize: w < 768 ? '11px' : '14px', color: '#555', margin: '0 0 12px 0', fontWeight: '500' }}>
                    Actionable AI that gives management real-time visibility into operations, performance, risks, and opportunities.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : 'repeat(5, 1fr)', gap: '10px' }}>
                    {[
                      { title: 'Predictive analytics', icon: BrainCircuit },
                      { title: 'Automated monitoring', icon: Activity },
                      { title: 'Intelligent recommendations', icon: Lightbulb },
                      { title: 'Anomaly detection', icon: AlertTriangle },
                      { title: 'Executive command centers', icon: Sliders }
                    ].map((feat, i) => {
                      const IconComponent = feat.icon;
                      return (
                        <div key={i} style={{ background: '#f8f9fa', border: '1px solid #f0f1f3', padding: w < 768 ? '8px 10px' : '14px 18px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ background: 'rgba(232, 149, 40, 0.08)', padding: '6px', borderRadius: '6px', color: '#e89528', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconComponent size={w < 768 ? 14 : 18} />
                          </div>
                          <span style={{ fontSize: w < 768 ? '11px' : '14px', fontWeight: '600', color: '#222', lineHeight: '1.2' }}>{feat.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Bubbles */}
      {Object.values(bubbleData).map((cat) => {
        const size = getSize('cat', cat.id);
        const focus = focusedNode === cat.id;
        const pos = layout.cats[cat.id];
        return (
          <motion.div
            key={cat.id}
            style={{ position: 'absolute', willChange: 'left, top' }}
            animate={{ left: pos.left, top: pos.top, zIndex: size.zIndex }}
            transition={activeTransition}
          >
            <motion.div
              className={`glass-bubble ${focus ? 'expanded' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (focus) return;
                handleNodeClick(cat.id);
              }}
              style={{ 
                position: 'absolute', 
                left: 0,
                top: 0,
                borderWidth: `${Math.min(1.5, 1 / size.scale)}px`,
                willChange: 'transform, opacity, width, height, border-radius'
              }}
              animate={{
                width: typeof size.width === 'number' ? `${size.width}px` : size.width,
                height: typeof size.height === 'number' ? `${size.height}px` : size.height,
                scale: size.scale, opacity: size.opacity,
                x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%', cursor: 'pointer',
                overflow: 'hidden' // prevents text from spilling over during shrink
              }}
              transition={activeTransition}
              transformTemplate={cleanTransform}
              whileHover={!focus && !focusedNode ? { scale: 1.05, boxShadow: 'inset 0 0 20px #fff, 0 15px 40px rgba(232, 149, 40,0.4)' } : {}}
            >
              {/* Minimal View */}
              <AnimatePresence>
                {!focus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: focusedNode ? 0 : 0.4, duration: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {focusedNode === 'root' ? (
                      null
                    ) : (
                      <h2 style={{ fontSize: `${16 * rs}px`, fontWeight: '700', textAlign: 'center', margin: '0 10px', color: 'var(--text-color)' }}>{cat.title}</h2>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rich Content View */}
              <AnimatePresence>
                {focus && (
                  <motion.div key={`bg-${cat.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#f4f6f8', borderRadius: 'inherit', zIndex: 0 }}
                  />
                )}
                {focus && (
                  <motion.div key={`content-${cat.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.4 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: `${size.width}px`, 
                      height: `${size.height}px`,
                      zIndex: 1, 
                      display: 'flex', 
                      flexDirection: 'column' 
                    }}
                  >
                    {cat.id === 'sales' ? (
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '20px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: w < 1024 ? 'column' : 'row', gap: w < 1024 ? '30px' : '40px', alignItems: 'stretch' }}>
                          {/* Left Column (Timeline & Infographic) */}
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: w < 1024 ? '0px' : '10px' }}>
                            {/* Header Section */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <div style={{
                                width: w < 768 ? '44px' : '56px',
                                height: w < 768 ? '44px' : '56px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(232, 149, 40, 0.3)',
                                background: 'rgba(232, 149, 40, 0.04)',
                                color: '#e89528',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                flexShrink: 0
                              }}>
                                <Crown size={w < 768 ? 20 : 30} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '28px' : '40px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Top Management
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '13px' : '17px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  AI-Powered Executive Intelligence
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '13px' : '17px', color: '#444', lineHeight: '1.45', margin: '8px 0 16px 0', fontWeight: '500', textAlign: 'left' }}>
                              One unified view of the entire business for faster, smarter decision-making across all departments and operations.
                            </p>

                            {/* Timeline List */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: w < 768 ? '10px' : '17px', paddingLeft: '4px' }}>
                              {/* Connector Line */}
                              <div style={{
                                position: 'absolute',
                                left: w < 768 ? '18px' : '28px',
                                top: w < 768 ? '14px' : '24px',
                                bottom: w < 768 ? '14px' : '24px',
                                width: '2px',
                                background: 'linear-gradient(to bottom, rgba(232, 149, 40, 0.4) 0%, rgba(232, 149, 40, 0.1) 100%)',
                                zIndex: 0
                              }} />

                              {[
                                {
                                  title: '1. Executive Visibility',
                                  desc: 'Monitor sales, finance, inventory, production, and operations from a single, unified executive workspace.',
                                  icon: Monitor
                                },
                                {
                                  title: '2. Advanced AI Monitoring',
                                  desc: 'Identify risks, anomalies, and performance drifts before they impact business outcomes and profitability.',
                                  icon: BrainCircuit
                                },
                                {
                                  title: '3. Real-Time Insights',
                                  desc: 'Track critical KPIs, trends, profitability, and operational performance as they happen across departments.',
                                  icon: TrendingUp
                                },
                                {
                                  title: '4. Command Center',
                                  desc: 'Investigate alerts, collaborate across teams, and accelerate issue resolution through dedicated war rooms.',
                                  icon: Bell
                                },
                                {
                                  title: '5. AI Recommendations',
                                  desc: 'Receive intelligent suggestions and corrective actions based on real-time performance data and historical trends.',
                                  icon: Lightbulb
                                }
                              ].map((item, index) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                      width: w < 768 ? '28px' : '48px',
                                      height: w < 768 ? '28px' : '48px',
                                      borderRadius: '50%',
                                      border: '1.5px solid rgba(232, 149, 40, 0.25)',
                                      background: '#fff',
                                      color: '#e89528',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginRight: w < 768 ? '10px' : '14px',
                                      boxShadow: '0 3px 6px rgba(0,0,0,0.03)',
                                      flexShrink: 0
                                    }}>
                                      <ItemIcon size={w < 768 ? 14 : 23} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <h4 style={{ fontSize: w < 768 ? '13px' : '17.5px', fontWeight: '700', color: '#d68022', margin: 0 }}>
                                        {item.title}
                                      </h4>
                                      <p style={{ fontSize: w < 768 ? '11px' : '14.5px', color: '#555', margin: '1px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Divider Line */}
                            <div style={{
                              height: '1px',
                              background: 'linear-gradient(to right, rgba(232, 149, 40, 0.25), rgba(232, 149, 40, 0.02))',
                              margin: w < 768 ? '12px 0 8px 0' : '18px 0 14px 0'
                            }} />

                            {/* Bottom Badge Row */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                              {[
                                { text: 'Faster\nDecisions', icon: Zap },
                                { text: 'Reduced\nRisks', icon: Shield },
                                { text: 'Higher\nProfitability', icon: TrendingUp },
                                { text: 'Better\nGovernance', icon: Target }
                              ].map((badge, idx) => {
                                const BadgeIcon = badge.icon;
                                return (
                                  <div key={idx} style={{
                                    flex: 1,
                                    background: 'rgba(232, 149, 40, 0.03)',
                                    border: '1.2px solid rgba(232, 149, 40, 0.12)',
                                    padding: w < 768 ? '6px 2px' : '12px 6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}>
                                    <BadgeIcon size={w < 768 ? 14 : 20} color="#e89528" style={{ strokeWidth: 2.2 }} />
                                    <span style={{
                                      fontSize: w < 768 ? '9px' : '13px',
                                      fontWeight: '700',
                                      color: '#555',
                                      textAlign: 'center',
                                      lineHeight: '1.25',
                                      whiteSpace: 'pre-line'
                                    }}>
                                      {badge.text}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>


                          {/* Right Column (Case Study Card) */}
                          <div style={{ flex: w < 1024 ? 'none' : '1.25', background: '#fff', padding: w < 768 ? '20px' : '22px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                              <Lightbulb size={26} color="#e89528" style={{ marginRight: '10px' }} />
                              <h3 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#e89528' }}>
                                Real-World Example
                              </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: w < 768 ? '14px' : '16px', lineHeight: '1.5', color: '#444', fontWeight: '500' }}>
                              <p style={{ margin: 0, textAlign: 'left', fontWeight: '700', color: '#111' }}>
                                A jewellery manufacturer notices that gross profit margins have fallen from 24% to 19% over the last six weeks, despite monthly sales of approximately ₹8–10 crore.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                Without StackLogix, management would need to collect reports from Finance, Procurement, Manufacturing, and Sales teams. This often takes several days or weeks before corrective action can begin.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                With StackLogix, AI Monitoring automatically detects the 5% margin decline and flags it as a critical business drift. The dashboard instantly consolidates data and reveals:
                              </p>

                              {/* Two-Column Checklist & Dashboard Widget layout */}
                              <div style={{ display: 'flex', flexDirection: w < 768 ? 'column' : 'row', gap: '20px', alignItems: 'center', margin: '6px 0' }}>
                                <div style={{ flex: '1.25', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                  {[
                                    "Gold procurement costs increased by 7%",
                                    "Manufacturing wastage risen from 2.8% to 4.1%",
                                    "Discounts on a high-volume category up by 12%",
                                    "Departmental cost allocations misaligned",
                                    "Production scheduling delays across units"
                                  ].map((text, i) => (
                                    <div 
                                      key={i} 
                                      onMouseEnter={() => setHoveredTopMgmtIdx(i)}
                                      onMouseLeave={() => setHoveredTopMgmtIdx(null)}
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '10px',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        background: hoveredTopMgmtIdx === i ? 'rgba(232, 149, 40, 0.05)' : 'transparent',
                                        border: '1px solid ' + (hoveredTopMgmtIdx === i ? 'rgba(232, 149, 40, 0.15)' : 'transparent'),
                                        transform: hoveredTopMgmtIdx === i ? 'translateX(4px)' : 'none',
                                        boxShadow: hoveredTopMgmtIdx === i ? '0 4px 12px rgba(232, 149, 40, 0.04)' : 'none',
                                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        margin: '0 -10px'
                                      }}
                                    >
                                      <CheckCircle2 
                                        size={16} 
                                        color="#e89528" 
                                        style={{ 
                                          marginTop: '2px', 
                                          flexShrink: 0, 
                                          transform: hoveredTopMgmtIdx === i ? 'scale(1.15)' : 'none', 
                                          transition: 'transform 0.2s ease' 
                                        }} 
                                      />
                                      <span style={{ 
                                        fontSize: '14.5px', 
                                        lineHeight: '1.35', 
                                        color: hoveredTopMgmtIdx === i ? '#e89528' : '#333', 
                                        fontWeight: '600',
                                        transition: 'color 0.2s ease'
                                      }}>{text}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Interactive Margin Dashboard Widget */}
                                <div style={{ flex: '1', width: '100%', background: '#f8f9fa', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '850', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Margin Analysis</span>
                                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
                                      {['All', 'Q1', 'Q2'].map((filt) => (
                                        <button
                                          key={filt}
                                          onClick={() => setProcureFilter(filt === 'All' ? 'All' : filt === 'Q1' ? 'Metals' : 'Gemstones')}
                                          style={{
                                            border: 'none',
                                            background: (filt === 'All' && procureFilter === 'All') || (filt === 'Q1' && procureFilter === 'Metals') || (filt === 'Q2' && procureFilter === 'Gemstones') ? '#e89528' : 'transparent',
                                            color: (filt === 'All' && procureFilter === 'All') || (filt === 'Q1' && procureFilter === 'Metals') || (filt === 'Q2' && procureFilter === 'Gemstones') ? '#fff' : '#666',
                                            fontSize: '9.5px',
                                            fontWeight: '700',
                                            padding: '3px 8px',
                                            borderRadius: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: (filt === 'All' && procureFilter === 'All') || (filt === 'Q1' && procureFilter === 'Metals') || (filt === 'Q2' && procureFilter === 'Gemstones') ? '0 2px 6px rgba(232, 149, 40, 0.25)' : 'none'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (!((filt === 'All' && procureFilter === 'All') || (filt === 'Q1' && procureFilter === 'Metals') || (filt === 'Q2' && procureFilter === 'Gemstones'))) e.target.style.color = '#e89528';
                                          }}
                                          onMouseLeave={(e) => {
                                            if (!((filt === 'All' && procureFilter === 'All') || (filt === 'Q1' && procureFilter === 'Metals') || (filt === 'Q2' && procureFilter === 'Gemstones'))) e.target.style.color = '#666';
                                          }}
                                        >
                                          {filt}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '4px 0' }} />
                                  {(() => {
                                    const marginData = {
                                      All: [
                                        { title: 'Gross Margin', value: '19%', icon: TrendingDown, type: 'risk' },
                                        { title: 'Procurement', value: '+7% cost', icon: ShoppingCart, type: 'warn' },
                                        { title: 'Wastage', value: '4.1%', icon: AlertTriangle, type: 'risk' },
                                        { title: 'Discounts', value: '+12%', icon: Target, type: 'warn' }
                                      ],
                                      Metals: [
                                        { title: 'Gross Margin', value: '21%', icon: TrendingDown, type: 'ok' },
                                        { title: 'Procurement', value: '+9% cost', icon: ShoppingCart, type: 'risk' },
                                        { title: 'Wastage', value: '3.6%', icon: AlertTriangle, type: 'warn' },
                                        { title: 'Discounts', value: '+5%', icon: Target, type: 'ok' }
                                      ],
                                      Gemstones: [
                                        { title: 'Gross Margin', value: '16%', icon: TrendingDown, type: 'risk' },
                                        { title: 'Procurement', value: '+4% cost', icon: ShoppingCart, type: 'ok' },
                                        { title: 'Wastage', value: '5.2%', icon: AlertTriangle, type: 'risk' },
                                        { title: 'Discounts', value: '+18%', icon: Target, type: 'risk' }
                                      ]
                                    };

                                    const currentData = marginData[procureFilter];

                                    return (
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {currentData.map((item, idx) => {
                                          const isHovered = hoveredWidgetIdx === idx + 100;
                                          const ItemIcon = item.icon;
                                          return (
                                            <div 
                                              key={item.title}
                                              onMouseEnter={() => setHoveredWidgetIdx(idx + 100)}
                                              onMouseLeave={() => setHoveredWidgetIdx(null)}
                                              style={{ 
                                                background: '#fff', 
                                                border: '1px solid ' + (isHovered ? '#e89528' : 'rgba(0,0,0,0.04)'), 
                                                borderRadius: '8px', 
                                                padding: '9px 11px', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                gap: '4px', 
                                                boxShadow: isHovered ? '0 4px 12px rgba(232, 149, 40, 0.08)' : '0 2px 4px rgba(0,0,0,0.01)',
                                                transform: isHovered ? 'translateY(-2px)' : 'none',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer'
                                              }}
                                            >
                                              <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</span>
                                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <span style={{ 
                                                  fontSize: '12px', 
                                                  color: item.type === 'risk' ? '#d9381e' : item.type === 'warn' ? '#e89528' : '#222', 
                                                  fontWeight: '800' 
                                                }}>
                                                  {item.value}
                                                </span>
                                                <ItemIcon size={16} color={item.type === 'risk' ? '#d9381e' : item.type === 'warn' ? '#e89528' : '#a3a8b3'} style={{ transition: 'transform 0.2s ease', transform: isHovered ? 'scale(1.15)' : 'none' }} />
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>

                              <p style={{ margin: 0, textAlign: 'left' }}>
                                The Command Center brings all related metrics, alerts, and discussions into a single workspace, enabling management to quickly investigate and implement corrective actions.
                              </p>
                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                <Trophy size={22} color="#e89528" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '15.5px', fontWeight: '600', color: '#a35b12', lineHeight: '1.4', textAlign: 'left' }}>
                                  Result: Leadership identifies root cause within hours, preventing further margin erosion and saving ₹30–50 lakh per month in avoidable losses.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : cat.id === 'topManagement' ? (
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '20px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: w < 1024 ? 'column' : 'row', gap: w < 1024 ? '30px' : '40px', alignItems: 'stretch' }}>
                          {/* Left Column (Timeline & Infographic) */}
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: w < 1024 ? '0px' : '10px' }}>
                            {/* Header Section */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <div style={{
                                width: w < 768 ? '44px' : '60px',
                                height: w < 768 ? '44px' : '60px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(232, 149, 40, 0.3)',
                                background: 'rgba(232, 149, 40, 0.04)',
                                color: '#e89528',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                flexShrink: 0
                              }}>
                                <ShoppingCart size={w < 768 ? 20 : 30} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '28px' : '40px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Procurement
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '13px' : '17px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  Intelligent Procurement & Inventory Control
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '13px' : '17px', color: '#444', lineHeight: '1.45', margin: '8px 0 16px 0', fontWeight: '500', textAlign: 'left' }}>
                              Ensure the right materials are available at the right time while optimizing inventory, procurement costs, and fulfilment efficiency.
                            </p>

                            {/* Timeline List */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: w < 768 ? '10px' : '17px', paddingLeft: '4px' }}>
                              {/* Connector Line */}
                              <div style={{
                                position: 'absolute',
                                left: w < 768 ? '18px' : '28px',
                                top: w < 768 ? '14px' : '24px',
                                bottom: w < 768 ? '14px' : '24px',
                                width: '2px',
                                background: 'linear-gradient(to bottom, rgba(232, 149, 40, 0.4) 0%, rgba(232, 149, 40, 0.1) 100%)',
                                zIndex: 0
                              }} />

                              {[
                                {
                                  title: '1. Procurement Planning',
                                  desc: 'Manage procurement of raw materials, finished goods, and stock replenishment based on business demand and inventory requirements.',
                                  icon: Package
                                },
                                {
                                  title: '2. Inventory Visibility',
                                  desc: 'Monitor stock levels, material consumption, inventory ageing, and warehouse availability in real time.',
                                  icon: TrendingUp
                                },
                                {
                                  title: '3. Order Fulfilment Management',
                                  desc: 'Track sales order commitments, inventory allocation, fulfilment status, and delivery readiness across locations.',
                                  icon: ClipboardCheck
                                },
                                {
                                  title: '4. AI-Powered Purchase Recommendations',
                                  desc: 'Receive intelligent suggestions on what to buy, when to buy, and how much to procure based on demand forecasts and inventory trends.',
                                  icon: Bot
                                },
                                {
                                  title: '5. Cost & Supplier Optimization',
                                  desc: 'Control procurement costs, evaluate supplier performance, and improve purchasing efficiency through data-driven decisions.',
                                  icon: IndianRupee
                                }
                              ].map((item, index) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                      width: w < 768 ? '28px' : '48px',
                                      height: w < 768 ? '28px' : '48px',
                                      borderRadius: '50%',
                                      border: '1.5px solid rgba(232, 149, 40, 0.25)',
                                      background: '#fff',
                                      color: '#e89528',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginRight: w < 768 ? '10px' : '14px',
                                      boxShadow: '0 3px 6px rgba(0,0,0,0.03)',
                                      flexShrink: 0
                                    }}>
                                      <ItemIcon size={w < 768 ? 14 : 23} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <h4 style={{ fontSize: w < 768 ? '13px' : '17.5px', fontWeight: '700', color: '#d68022', margin: 0 }}>
                                        {item.title}
                                      </h4>
                                      <p style={{ fontSize: w < 768 ? '11px' : '14.5px', color: '#555', margin: '1px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Divider Line */}
                            <div style={{
                              height: '1px',
                              background: 'linear-gradient(to right, rgba(232, 149, 40, 0.25), rgba(232, 149, 40, 0.02))',
                              margin: w < 768 ? '12px 0 8px 0' : '18px 0 14px 0'
                            }} />

                            {/* Bottom Badge Row */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                              {[
                                { text: 'Faster\nProcurement', icon: Zap },
                                { text: 'Optimized\nInventory', icon: Package },
                                { text: 'Better\nFulfilment', icon: Truck },
                                { text: 'Lower\nCosts', icon: TrendingDown }
                              ].map((badge, idx) => {
                                const BadgeIcon = badge.icon;
                                return (
                                  <div key={idx} style={{
                                    flex: 1,
                                    background: 'rgba(232, 149, 40, 0.03)',
                                    border: '1.2px solid rgba(232, 149, 40, 0.12)',
                                    padding: w < 768 ? '6px 2px' : '12px 6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}>
                                    <BadgeIcon size={w < 768 ? 14 : 20} color="#e89528" style={{ strokeWidth: 2.2 }} />
                                    <span style={{
                                      fontSize: w < 768 ? '9px' : '13px',
                                      fontWeight: '700',
                                      color: '#555',
                                      textAlign: 'center',
                                      lineHeight: '1.25',
                                      whiteSpace: 'pre-line'
                                    }}>
                                      {badge.text}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right Column (Case Study Card) */}
                          <div style={{ flex: w < 1024 ? 'none' : '1.25', background: '#fff', padding: w < 768 ? '20px' : '22px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                              <Lightbulb size={26} color="#e89528" style={{ marginRight: '10px' }} />
                              <h3 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#e89528' }}>
                                Real-World Example
                              </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: w < 768 ? '14px' : '16px', lineHeight: '1.5', color: '#444', fontWeight: '500' }}>
                              <p style={{ margin: 0, textAlign: 'left', fontWeight: '700', color: '#111' }}>
                                A jewellery manufacturer receives a sudden increase in customer orders for a fast-moving product category.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                Without a centralized procurement system, teams manually review inventory reports, pending purchase orders, supplier commitments, and production requirements. This often leads to delayed purchasing decisions, stock shortages, or excess inventory.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                With StackLogix Procurement, the system automatically identifies the shortage risk and provides real-time visibility into:
                              </p>

                              {/* Two-Column Checklist & Dashboard Widget layout */}
                              <div style={{ display: 'flex', flexDirection: w < 768 ? 'column' : 'row', gap: '20px', alignItems: 'center', margin: '6px 0' }}>
                                <div style={{ flex: '1.25', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                  {[
                                    "Current raw material stock levels",
                                    "Pending supplier deliveries",
                                    "Open sales order commitments",
                                    "Projected material consumption based on demand forecasts",
                                    "Recommended purchase quantities and reorder timelines"
                                  ].map((text, i) => (
                                    <div 
                                      key={i} 
                                      onMouseEnter={() => setHoveredProcureIdx(i)}
                                      onMouseLeave={() => setHoveredProcureIdx(null)}
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '10px',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        background: hoveredProcureIdx === i ? 'rgba(232, 149, 40, 0.05)' : 'transparent',
                                        border: '1px solid ' + (hoveredProcureIdx === i ? 'rgba(232, 149, 40, 0.15)' : 'transparent'),
                                        transform: hoveredProcureIdx === i ? 'translateX(4px)' : 'none',
                                        boxShadow: hoveredProcureIdx === i ? '0 4px 12px rgba(232, 149, 40, 0.04)' : 'none',
                                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        margin: '0 -10px'
                                      }}
                                    >
                                      <CheckCircle2 
                                        size={16} 
                                        color="#e89528" 
                                        style={{ 
                                          marginTop: '2px', 
                                          flexShrink: 0, 
                                          transform: hoveredProcureIdx === i ? 'scale(1.15)' : 'none', 
                                          transition: 'transform 0.2s ease' 
                                        }} 
                                      />
                                      <span style={{ 
                                        fontSize: '14.5px', 
                                        lineHeight: '1.35', 
                                        color: hoveredProcureIdx === i ? '#e89528' : '#333', 
                                        fontWeight: '600',
                                        transition: 'color 0.2s ease'
                                      }}>{text}</span>
                                    </div>
                                  ))}
                                </div>

                                <div style={{ flex: '1', width: '100%', background: '#f8f9fa', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '850', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Procurement Dashboard</span>
                                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
                                      {['All', 'Metals', 'Gemstones'].map((filt) => (
                                        <button
                                          key={filt}
                                          onClick={() => setProcureFilter(filt)}
                                          style={{
                                            border: 'none',
                                            background: procureFilter === filt ? '#e89528' : 'transparent',
                                            color: procureFilter === filt ? '#fff' : '#666',
                                            fontSize: '9.5px',
                                            fontWeight: '700',
                                            padding: '3px 8px',
                                            borderRadius: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: procureFilter === filt ? '0 2px 6px rgba(232, 149, 40, 0.25)' : 'none'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (procureFilter !== filt) e.target.style.color = '#e89528';
                                          }}
                                          onMouseLeave={(e) => {
                                            if (procureFilter !== filt) e.target.style.color = '#666';
                                          }}
                                        >
                                          {filt}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '4px 0' }} />
                                  {(() => {
                                    const dashboardData = {
                                      All: [
                                        { title: 'Stock Overview', value: '68% stock', pct: 68 },
                                        { title: 'Purchase Orders', value: '32 Open POs', type: 'po' },
                                        { title: 'Deliveries', value: '12 In Transit', type: 'del' },
                                        { title: 'Shortage Risk', value: '5 At Risk', type: 'risk' }
                                      ],
                                      Metals: [
                                        { title: 'Stock Overview', value: '74% stock', pct: 74 },
                                        { title: 'Purchase Orders', value: '14 Open POs', type: 'po' },
                                        { title: 'Deliveries', value: '5 In Transit', type: 'del' },
                                        { title: 'Shortage Risk', value: '1 At Risk', type: 'risk' }
                                      ],
                                      Gemstones: [
                                        { title: 'Stock Overview', value: '45% stock', pct: 45 },
                                        { title: 'Purchase Orders', value: '18 Open POs', type: 'po' },
                                        { title: 'Deliveries', value: '7 In Transit', type: 'del' },
                                        { title: 'Shortage Risk', value: '4 At Risk', type: 'risk' }
                                      ]
                                    };

                                    const currentData = dashboardData[procureFilter];

                                    return (
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {currentData.map((item, idx) => {
                                          const isHovered = hoveredWidgetIdx === idx;
                                          return (
                                            <div 
                                              key={item.title}
                                              onMouseEnter={() => setHoveredWidgetIdx(idx)}
                                              onMouseLeave={() => setHoveredWidgetIdx(null)}
                                              style={{ 
                                                background: '#fff', 
                                                border: '1px solid ' + (isHovered ? '#e89528' : 'rgba(0,0,0,0.04)'), 
                                                borderRadius: '8px', 
                                                padding: '9px 11px', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                gap: '4px', 
                                                boxShadow: isHovered ? '0 4px 12px rgba(232, 149, 40, 0.08)' : '0 2px 4px rgba(0,0,0,0.01)',
                                                transform: isHovered ? 'translateY(-2px)' : 'none',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer'
                                              }}
                                            >
                                              <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</span>
                                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                {item.pct !== undefined ? (
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                                                    <div style={{ 
                                                      width: '20px', 
                                                      height: '20px', 
                                                      borderRadius: '50%', 
                                                      border: '2.5px solid #f0f0f0', 
                                                      borderTopColor: '#e89528', 
                                                      borderLeftColor: '#e89528', 
                                                      borderRightColor: item.pct >= 68 ? '#e89528' : '#f0f0f0',
                                                      flexShrink: 0,
                                                      transform: isHovered ? 'rotate(45deg)' : 'none',
                                                      transition: 'transform 0.4s ease'
                                                    }} />
                                                    <span style={{ fontSize: '12px', color: '#222', fontWeight: '700', lineHeight: '1.1' }}>{item.value}</span>
                                                  </div>
                                                ) : (
                                                  <>
                                                    <span style={{ 
                                                      fontSize: '12px', 
                                                      color: item.type === 'risk' ? (item.value.startsWith('1') ? '#e89528' : '#d9381e') : '#222', 
                                                      fontWeight: item.type === 'risk' ? '800' : '700' 
                                                    }}>
                                                      {item.value}
                                                    </span>
                                                    {item.type === 'po' && <ClipboardCheck size={16} color={isHovered ? '#e89528' : '#a3a8b3'} style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: isHovered ? 'scale(1.15)' : 'none' }} />}
                                                    {item.type === 'del' && <Truck size={16} color="#e89528" style={{ transition: 'transform 0.2s ease', transform: isHovered ? 'translateX(2px)' : 'none' }} />}
                                                    {item.type === 'risk' && <AlertTriangle size={16} color={item.value.startsWith('1') ? '#e89528' : '#d9381e'} style={{ transition: 'transform 0.2s ease', transform: isHovered ? 'scale(1.15) rotate(10deg)' : 'none' }} />}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>

                              <p style={{ margin: 0, textAlign: 'left' }}>
                                The procurement team can instantly raise purchase orders, reserve inventory for confirmed orders, and coordinate with suppliers before shortages occur.
                              </p>
                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                <Trophy size={22} color="#e89528" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '15.5px', fontWeight: '600', color: '#a35b12', lineHeight: '1.4', textAlign: 'left' }}>
                                  Result: Improved inventory availability, faster order fulfilment, reduced procurement costs, and fewer production disruptions.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : cat.id === 'analytics' ? (
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '20px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: w < 1024 ? 'column' : 'row', gap: w < 1024 ? '30px' : '40px', alignItems: 'stretch' }}>
                          {/* Left Column (Timeline & Infographic) */}
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: w < 1024 ? '0px' : '10px' }}>
                            {/* Header Section */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <div style={{
                                width: w < 768 ? '44px' : '56px',
                                height: w < 768 ? '44px' : '56px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(232, 149, 40, 0.3)',
                                background: 'rgba(232, 149, 40, 0.04)',
                                color: '#e89528',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                flexShrink: 0
                              }}>
                                <Target size={w < 768 ? 20 : 28} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '28px' : '38px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Sales Enablement
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '13px' : '17px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  Empower Teams. Manage Sales. Drive Growth.
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '13px' : '16.5px', color: '#444', lineHeight: '1.45', margin: '8px 0 16px 0', fontWeight: '500', textAlign: 'left' }}>
                              Equip your sales teams with the right tools to manage leads, engagements, activities, and approvals—efficiently.
                            </p>

                            {/* Sales Process Flow Section Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                              <span style={{ fontSize: '14px', fontWeight: '700', color: '#d68022', padding: '0 15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sales Process Flow</span>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                            </div>

                            {/* Horizontal Process Flow */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px', marginBottom: '16px' }}>
                              {[
                                { title: 'Leads', desc: 'Assign & qualify\nthe right leads', icon: UserCheck },
                                { title: 'Engage', desc: 'Connect & nurture\nwith purpose', icon: MessageSquare },
                                { title: 'Convert', desc: 'Track activities\n& win deals', icon: Target },
                                { title: 'Fulfil', desc: 'Approve orders\n& build trust', icon: ShoppingCart }
                              ].map((step, idx, arr) => {
                                const StepIcon = step.icon;
                                return (
                                  <React.Fragment key={idx}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%' }}>
                                      <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        border: '1.5px solid rgba(232, 149, 40, 0.25)',
                                        background: '#fff',
                                        color: '#e89528',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 3px 6px rgba(0,0,0,0.03)',
                                        marginBottom: '8px'
                                      }}>
                                        <StepIcon size={20} />
                                      </div>
                                      <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#222', textTransform: 'uppercase', marginBottom: '2px' }}>{step.title}</span>
                                      <span style={{ fontSize: '11.5px', color: '#666', textAlign: 'center', lineHeight: '1.2', whiteSpace: 'pre-line', fontWeight: '500' }}>{step.desc}</span>
                                    </div>
                                    {idx < arr.length - 1 && (
                                      <ArrowRight size={16} color="rgba(232, 149, 40, 0.4)" style={{ flexShrink: 0, marginTop: '-28px' }} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>

                            {/* Role-Based Columns */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                              {/* Managers Column */}
                              <div style={{ flex: 1, background: 'rgba(232, 149, 40, 0.02)', border: '1px solid rgba(232, 149, 40, 0.1)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                  <Crown size={18} color="#e89528" />
                                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#d68022' }}>For Sales Managers</span>
                                </div>
                                {[
                                  { title: 'Lead Allocation', icon: Users },
                                  { title: 'Order Approvals', icon: CheckCircle2 },
                                  { title: 'Pricing & Discount Control', icon: Sliders },
                                  { title: 'Performance Monitoring', icon: BarChart3 }
                                ].map((feat, i) => {
                                  const FeatIcon = feat.icon;
                                  return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <FeatIcon size={15} color="#e89528" style={{ flexShrink: 0 }} />
                                      <span style={{ fontSize: '13.5px', color: '#444', fontWeight: '600' }}>{feat.title}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Hunters Column */}
                              <div style={{ flex: 1, background: 'rgba(232, 149, 40, 0.02)', border: '1px solid rgba(232, 149, 40, 0.1)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                  <Briefcase size={18} color="#e89528" />
                                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#d68022' }}>For Hunters (Field Teams)</span>
                                </div>
                                {[
                                  { title: 'Manage Leads', icon: UserCheck },
                                  { title: 'Plan & Record Visits', icon: MapPin },
                                  { title: 'Track Activities', icon: Clock },
                                  { title: 'Raise Orders', icon: ShoppingCart }
                                ].map((feat, i) => {
                                  const FeatIcon = feat.icon;
                                  return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <FeatIcon size={15} color="#e89528" style={{ flexShrink: 0 }} />
                                      <span style={{ fontSize: '13.5px', color: '#444', fontWeight: '600' }}>{feat.title}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Divider Line & Impact Badges */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0 12px 0' }}>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                              <span style={{ fontSize: '12px', fontWeight: '700', color: '#d68022', padding: '0 15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Impact</span>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                            </div>

                            {/* Bottom Badge Row */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                              {[
                                { text: 'Higher\nConversions', icon: Target },
                                { text: 'Faster\nApprovals', icon: Zap },
                                { text: 'Better Field\nProductivity', icon: Briefcase },
                                { text: 'Stronger Customer\nRelationships', icon: HeartHandshake }
                              ].map((badge, idx) => {
                                const BadgeIcon = badge.icon;
                                return (
                                  <div key={idx} style={{
                                    flex: 1,
                                    background: 'rgba(232, 149, 40, 0.03)',
                                    border: '1.2px solid rgba(232, 149, 40, 0.12)',
                                    padding: w < 768 ? '6px 2px' : '12px 6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}>
                                    <BadgeIcon size={w < 768 ? 14 : 20} color="#e89528" style={{ strokeWidth: 2.2 }} />
                                    <span style={{
                                      fontSize: w < 768 ? '9px' : '12px',
                                      fontWeight: '700',
                                      color: '#555',
                                      textAlign: 'center',
                                      lineHeight: '1.25',
                                      whiteSpace: 'pre-line'
                                    }}>
                                      {badge.text}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right Column (Case Study Card) */}
                          <div style={{ flex: w < 1024 ? 'none' : '1.25', background: '#fff', padding: w < 768 ? '20px' : '22px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                              <Lightbulb size={26} color="#e89528" style={{ marginRight: '10px' }} />
                              <h3 style={{ fontSize: '25px', fontWeight: '700', margin: 0, color: '#e89528' }}>
                                Real-World Example
                              </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', fontSize: w < 768 ? '14px' : '16.5px', lineHeight: '1.5', color: '#444', fontWeight: '500' }}>
                              <p style={{ margin: 0, textAlign: 'left', fontWeight: '700', color: '#111' }}>
                                A consumer goods company wants to improve field sales efficiency and increase lead conversions.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                Leads were not distributed effectively, activities were inconsistent, and order approvals took too long—resulting in lost opportunities and lower sales productivity.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                With StackLogix Sales Enablement, the company can now:
                              </p>

                              {/* Two-Column Checklist & Dashboard Widget layout */}
                              <div style={{ display: 'flex', flexDirection: w < 768 ? 'column' : 'row', gap: '20px', alignItems: 'center', margin: '8px 0' }}>
                                <div style={{ flex: '1.25', display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                                  {[
                                    "Assign and track leads across regions",
                                    "Plan and record visits, calls, and follow-ups",
                                    "Capture visit outcomes and customer insights",
                                    "Raise orders with pricing and discount controls",
                                    "Approve orders quickly and maintain full visibility"
                                  ].map((text, i) => (
                                    <div 
                                      key={i} 
                                      onMouseEnter={() => setHoveredSalesIdx(i)}
                                      onMouseLeave={() => setHoveredSalesIdx(null)}
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '10px',
                                        padding: '2px 8px',
                                        borderRadius: '8px',
                                        background: hoveredSalesIdx === i ? 'rgba(232, 149, 40, 0.05)' : 'transparent',
                                        border: '1px solid ' + (hoveredSalesIdx === i ? 'rgba(232, 149, 40, 0.15)' : 'transparent'),
                                        transform: hoveredSalesIdx === i ? 'translateX(4px)' : 'none',
                                        boxShadow: hoveredSalesIdx === i ? '0 4px 12px rgba(232, 149, 40, 0.04)' : 'none',
                                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        margin: '0 -8px'
                                      }}
                                    >
                                      <CheckCircle2 
                                        size={16} 
                                        color="#e89528" 
                                        style={{ 
                                          marginTop: '2px', 
                                          flexShrink: 0, 
                                          transform: hoveredSalesIdx === i ? 'scale(1.15)' : 'none', 
                                          transition: 'transform 0.2s ease' 
                                        }} 
                                      />
                                      <span style={{ 
                                        fontSize: '15px', 
                                        lineHeight: '1.35', 
                                        color: hoveredSalesIdx === i ? '#e89528' : '#333', 
                                        fontWeight: '600',
                                        transition: 'color 0.2s ease',
                                        textAlign: 'left'
                                      }}>{text}</span>
                                    </div>
                                  ))}
                                </div>

                                <div style={{ flex: '1', width: '100%', background: '#f8f9fa', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                     <span style={{ fontSize: '11.5px', fontWeight: '850', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sales Overview</span>
                                     <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
                                       {['All', 'B2B', 'Retail'].map((filt) => (
                                         <button
                                           key={filt}
                                           onClick={() => setSalesFilter(filt)}
                                           style={{
                                             border: 'none',
                                             background: salesFilter === filt ? '#e89528' : 'transparent',
                                             color: salesFilter === filt ? '#fff' : '#666',
                                             fontSize: '9.5px',
                                             fontWeight: '700',
                                             padding: '3px 8px',
                                             borderRadius: '15px',
                                             cursor: 'pointer',
                                             transition: 'all 0.2s ease',
                                             boxShadow: salesFilter === filt ? '0 2px 6px rgba(232, 149, 40, 0.25)' : 'none'
                                           }}
                                           onMouseEnter={(e) => {
                                             if (salesFilter !== filt) e.target.style.color = '#e89528';
                                           }}
                                           onMouseLeave={(e) => {
                                             if (salesFilter !== filt) e.target.style.color = '#666';
                                           }}
                                         >
                                           {filt}
                                         </button>
                                       ))}
                                     </div>
                                   </div>
                                   <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '2px 0' }} />
                                   {(() => {
                                     const salesData = {
                                       All: { leads: '128 Leads', pending: '24 Orders', visits: '18 Visits', rate: '23%' },
                                       B2B: { leads: '42 Leads', pending: '9 Orders', visits: '5 Visits', rate: '18%' },
                                       Retail: { leads: '86 Leads', pending: '15 Orders', visits: '13 Visits', rate: '25%' }
                                     };
                                     const currentData = salesData[salesFilter];
                                     const items = [
                                       { title: 'Leads Assigned', value: currentData.leads, icon: Users, color: '#e89528' },
                                       { title: 'Pending Approval', value: currentData.pending, icon: ShoppingCart, color: '#a3a8b3' },
                                       { title: 'Visits Today', value: currentData.visits, icon: Calendar, color: '#e89528' },
                                       { title: 'Conversion Rate', value: currentData.rate, icon: TrendingUp, color: '#e89528', isRate: true }
                                     ];
                                     return (
                                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
                                         {items.map((item, idx) => {
                                           const Icon = item.icon;
                                           const isHovered = hoveredSalesWidgetIdx === idx;
                                           return (
                                             <div 
                                               key={item.title}
                                               onMouseEnter={() => setHoveredSalesWidgetIdx(idx)}
                                               onMouseLeave={() => setHoveredSalesWidgetIdx(null)}
                                               style={{ 
                                                 background: '#fff', 
                                                 border: '1.5px solid ' + (isHovered ? '#e89528' : 'rgba(0,0,0,0.04)'), 
                                                 borderRadius: '8px', 
                                                 padding: '8px 10px', 
                                                 display: 'flex', 
                                                 flexDirection: 'column', 
                                                 gap: '2px', 
                                                 boxShadow: isHovered ? '0 4px 12px rgba(232, 149, 40, 0.08)' : '0 2px 4px rgba(0,0,0,0.01)',
                                                 transform: isHovered ? 'translateY(-2px)' : 'none',
                                                 transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                 cursor: 'pointer'
                                               }}
                                             >
                                               <span style={{ fontSize: '9.5px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</span>
                                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                                 <span style={{ fontSize: '11.5px', color: item.isRate ? '#e89528' : '#222', fontWeight: item.isRate ? '800' : '700' }}>{item.value}</span>
                                                 <Icon size={14} color={isHovered ? '#e89528' : item.color} style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: isHovered ? 'scale(1.15)' : 'none' }} />
                                               </div>
                                             </div>
                                           );
                                         })}
                                       </div>
                                     );
                                   })()}
                                 </div>
                              </div>

                              <p style={{ margin: 0, textAlign: 'left' }}>
                                Sales representatives can quickly log visit details, capture customer needs, check lead priorities, and send orders for approval instantly from the field.
                              </p>
                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '14px 18px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                                <Trophy size={24} color="#e89528" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '16px', fontWeight: '600', color: '#a35b12', lineHeight: '1.4', textAlign: 'left' }}>
                                  Result: Better lead conversion, faster order approvals, improved productivity, and stronger customer relationships.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : cat.id === 'erp' ? (
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '20px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: w < 1024 ? 'column' : 'row', gap: w < 1024 ? '30px' : '40px', alignItems: 'stretch' }}>
                          {/* Left Column (Timeline & Infographic) */}
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: w < 1024 ? '0px' : '10px' }}>
                            {/* Header Section */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                              <div style={{
                                width: w < 768 ? '44px' : '56px',
                                height: w < 768 ? '44px' : '56px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(232, 149, 40, 0.3)',
                                background: 'rgba(232, 149, 40, 0.04)',
                                color: '#e89528',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                flexShrink: 0
                              }}>
                                <Activity size={w < 768 ? 20 : 28} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Analytics
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '15px' : '19px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  Turn Data Into Actionable Intelligence
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '14px' : '17.5px', color: '#444', lineHeight: '1.45', margin: '8px 0 14px 0', fontWeight: '500', textAlign: 'left' }}>
                              Transform business data into actionable intelligence. Uncover trends, investigate anomalies, validate information, and identify opportunities for improvement with AI-powered analytics.
                            </p>

                            {/* Insight Discovery Flow Section Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                              <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#d68022', padding: '0 15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Insight Discovery Flow</span>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                            </div>

                            {/* Horizontal Process Flow */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px', marginBottom: '14px' }}>
                              {[
                                { title: 'Monitor', desc: 'Track KPIs, trends\n& performance changes', icon: Monitor },
                                { title: 'Analyze', desc: 'Identify patterns\n& correlations', icon: TrendingUp },
                                { title: 'Investigate', desc: 'Perform root-cause\n& data validation', icon: Sliders },
                                { title: 'Recommend', desc: 'Generate data-backed\ninsights & suggestions', icon: Lightbulb }
                              ].map((step, idx, arr) => {
                                const StepIcon = step.icon;
                                return (
                                  <React.Fragment key={idx}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%' }}>
                                      <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        border: '1.5px solid rgba(232, 149, 40, 0.25)',
                                        background: '#fff',
                                        color: '#e89528',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 3px 6px rgba(0,0,0,0.03)',
                                        marginBottom: '6px'
                                      }}>
                                        <StepIcon size={20} />
                                      </div>
                                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#222', textTransform: 'uppercase', marginBottom: '2px' }}>{step.title}</span>
                                      <span style={{ fontSize: '12px', color: '#666', textAlign: 'center', lineHeight: '1.25', whiteSpace: 'pre-line', fontWeight: '500' }}>{step.desc}</span>
                                    </div>
                                    {idx < arr.length - 1 && (
                                      <ArrowRight size={14} color="rgba(232, 149, 40, 0.4)" style={{ flexShrink: 0, marginTop: '-24px' }} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>

                            {/* Capabilities Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                              {[
                                { title: 'Trend & Pattern Recognition', icon: Activity },
                                { title: 'Root Cause Investigation', icon: Sliders },
                                { title: 'KPI & Risk Monitoring', icon: AlertTriangle },
                                { title: 'Predictive Insights & Forecasting', icon: BrainCircuit },
                                { title: 'Data Validation & Audit Tracking', icon: ClipboardCheck },
                                { title: 'Cross-Functional Data Analysis', icon: Database }
                              ].map((feat, i) => {
                                const FeatIcon = feat.icon;
                                return (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(232, 149, 40, 0.02)', border: '1px solid rgba(232, 149, 40, 0.08)', borderRadius: '8px', padding: '10px 14px' }}>
                                    <FeatIcon size={14} color="#e89528" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '14.5px', color: '#444', fontWeight: '600' }}>{feat.title}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Divider Line & Impact Badges */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0 10px 0' }}>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                              <span style={{ fontSize: '13px', fontWeight: '700', color: '#d68022', padding: '0 15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Impact</span>
                              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(232, 149, 40, 0.02), rgba(232, 149, 40, 0.25))' }} />
                            </div>

                            {/* Bottom Badge Row */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                              {[
                                { text: 'Faster\nInvestigations', icon: Zap },
                                { text: 'Better\nDecisions', icon: CheckCircle2 },
                                { text: 'Reduced\nBusiness Risks', icon: Shield },
                                { text: 'Improved\nPerformance', icon: Trophy }
                              ].map((badge, idx) => {
                                const BadgeIcon = badge.icon;
                                return (
                                  <div key={idx} style={{
                                    flex: 1,
                                    background: 'rgba(232, 149, 40, 0.03)',
                                    border: '1.2px solid rgba(232, 149, 40, 0.12)',
                                    padding: w < 768 ? '6px 2px' : '12px 6px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}>
                                    <BadgeIcon size={w < 768 ? 14 : 20} color="#e89528" style={{ strokeWidth: 2.2 }} />
                                    <span style={{
                                      fontSize: w < 768 ? '9px' : '13px',
                                      fontWeight: '700',
                                      color: '#555',
                                      textAlign: 'center',
                                      lineHeight: '1.25',
                                      whiteSpace: 'pre-line'
                                    }}>
                                      {badge.text}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right Column (Case Study Card) */}
                          <div style={{ flex: w < 1024 ? 'none' : '1.25', background: '#fff', padding: w < 768 ? '20px' : '22px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                              <Lightbulb size={26} color="#e89528" style={{ marginRight: '10px' }} />
                              <h3 style={{ fontSize: '26px', fontWeight: '700', margin: 0, color: '#e89528' }}>
                                Real-World Example
                              </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: w < 768 ? '14px' : '16.5px', lineHeight: '1.5', color: '#444', fontWeight: '500' }}>
                              <div>
                                <p style={{ margin: '0 0 4px 0', textAlign: 'left', fontWeight: '700', color: '#111', fontSize: '17px' }}>
                                  The Challenge:
                                </p>
                                <p style={{ margin: 0, textAlign: 'left' }}>
                                  A jewellery company noticed website traffic grew by 18% and online engagement rose by 22%, but sales conversions dropped by 12%. Manually collecting, cleaning, and comparing data across CRM, website analytics, and sales sheets was too slow, delaying corrective business actions.
                                </p>
                              </div>

                              <div>
                                <p style={{ margin: '0 0 4px 0', textAlign: 'left', fontWeight: '700', color: '#111', fontSize: '17px' }}>
                                  How StackLogix Helped:
                                </p>
                                <p style={{ margin: '0 0 8px 0', textAlign: 'left' }}>
                                  AI Monitoring automatically flagged the conversion drop. Analysts used cross-functional data investigation to drill down and discovered that:
                                </p>
                                
                                {/* Two-Column Checklist & Dashboard Widget layout */}
                                <div style={{ display: 'flex', flexDirection: w < 768 ? 'column' : 'row', gap: '20px', alignItems: 'center', margin: '8px 0' }}>
                                  <div style={{ flex: '1.25', display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                                    {[
                                      "A newly launched category had high traffic but low conversions",
                                      "Pricing was set higher than competing market alternatives",
                                      "Follow-ups on potential online leads were significantly delayed"
                                    ].map((text, i) => (
                                      <div 
                                        key={i} 
                                        onMouseEnter={() => setHoveredAnalyticsIdx(i)}
                                        onMouseLeave={() => setHoveredAnalyticsIdx(null)}
                                        style={{ 
                                          display: 'flex', 
                                          alignItems: 'flex-start', 
                                          gap: '10px',
                                          padding: '2px 8px',
                                          borderRadius: '8px',
                                          background: hoveredAnalyticsIdx === i ? 'rgba(232, 149, 40, 0.05)' : 'transparent',
                                          border: '1px solid ' + (hoveredAnalyticsIdx === i ? 'rgba(232, 149, 40, 0.15)' : 'transparent'),
                                          transform: hoveredAnalyticsIdx === i ? 'translateX(4px)' : 'none',
                                          boxShadow: hoveredAnalyticsIdx === i ? '0 4px 12px rgba(232, 149, 40, 0.04)' : 'none',
                                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                          cursor: 'pointer',
                                          margin: '0 -8px'
                                        }}
                                      >
                                        <CheckCircle2 
                                          size={16} 
                                          color="#e89528" 
                                          style={{ 
                                            marginTop: '2px', 
                                            flexShrink: 0, 
                                            transform: hoveredAnalyticsIdx === i ? 'scale(1.15)' : 'none', 
                                            transition: 'transform 0.2s ease' 
                                          }} 
                                        />
                                        <span style={{ 
                                          fontSize: '15px', 
                                          lineHeight: '1.35', 
                                          color: hoveredAnalyticsIdx === i ? '#e89528' : '#333', 
                                          fontWeight: '600',
                                          transition: 'color 0.2s ease',
                                          textAlign: 'left'
                                        }}>{text}</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div style={{ flex: '1', width: '100%', background: '#f8f9fa', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                      <span style={{ fontSize: '11.5px', fontWeight: '850', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Analytics & Drifts</span>
                                      <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)' }}>
                                        {['All', 'Online', 'In-Store'].map((filt) => (
                                          <button
                                            key={filt}
                                            onClick={() => setAnalyticsFilter(filt)}
                                            style={{
                                              border: 'none',
                                              background: analyticsFilter === filt ? '#e89528' : 'transparent',
                                              color: analyticsFilter === filt ? '#fff' : '#666',
                                              fontSize: '9.5px',
                                              fontWeight: '700',
                                              padding: '3px 8px',
                                              borderRadius: '15px',
                                              cursor: 'pointer',
                                              transition: 'all 0.2s ease',
                                              boxShadow: analyticsFilter === filt ? '0 2px 6px rgba(232, 149, 40, 0.25)' : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                              if (analyticsFilter !== filt) e.target.style.color = '#e89528';
                                            }}
                                            onMouseLeave={(e) => {
                                              if (analyticsFilter !== filt) e.target.style.color = '#666';
                                            }}
                                          >
                                            {filt}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '2px 0' }} />
                                    {(() => {
                                      const analyticsData = {
                                        All: { drifts: '1 Active', quality: '99.8%', reports: '14 Active', accuracy: '94.5%', isDrift: true },
                                        Online: { drifts: '1 Active', quality: '99.7%', reports: '8 Active', accuracy: '95.2%', isDrift: true },
                                        'In-Store': { drifts: '0 Active', quality: '99.9%', reports: '6 Active', accuracy: '93.8%', isDrift: false }
                                      };
                                      const currentData = analyticsData[analyticsFilter];
                                      const items = [
                                         { title: 'Drifts Detected', value: currentData.drifts, isDriftVal: true },
                                         { title: 'Data Quality', value: currentData.quality, icon: ShieldCheck, color: '#e89528' },
                                         { title: 'Auto Reports', value: currentData.reports, icon: ClipboardCheck, color: '#a3a8b3' },
                                         { title: 'Insight Accuracy', value: currentData.accuracy, icon: TrendingUp, color: '#e89528', isRate: true }
                                       ];
                                       return (
                                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
                                           {items.map((item, idx) => {
                                             const isHovered = hoveredAnalyticsWidgetIdx === idx;
                                             return (
                                               <div 
                                                 key={item.title}
                                                 onMouseEnter={() => setHoveredAnalyticsWidgetIdx(idx)}
                                                 onMouseLeave={() => setHoveredAnalyticsWidgetIdx(null)}
                                                 style={{ 
                                                   background: '#fff', 
                                                   border: '1.5px solid ' + (isHovered ? '#e89528' : 'rgba(0,0,0,0.04)'), 
                                                   borderRadius: '8px', 
                                                   padding: '8px 10px', 
                                                   display: 'flex', 
                                                   flexDirection: 'column', 
                                                   gap: '2px', 
                                                   boxShadow: isHovered ? '0 4px 12px rgba(232, 149, 40, 0.08)' : '0 2px 4px rgba(0,0,0,0.01)',
                                                   transform: isHovered ? 'translateY(-2px)' : 'none',
                                                   transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                   cursor: 'pointer'
                                                 }}
                                               >
                                                 <span style={{ fontSize: '9.5px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</span>
                                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                                   <span style={{ 
                                                     fontSize: '11.5px', 
                                                     color: item.isDriftVal ? (currentData.isDrift ? '#d9381e' : '#2e7d32') : (item.isRate ? '#e89528' : '#222'), 
                                                     fontWeight: (item.isDriftVal || item.isRate) ? '800' : '700' 
                                                   }}>{item.value}</span>
                                                   {item.isDriftVal ? (
                                                     currentData.isDrift ? (
                                                       <AlertTriangle size={14} color={isHovered ? '#e89528' : '#d9381e'} style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: isHovered ? 'scale(1.15) rotate(10deg)' : 'none' }} />
                                                     ) : (
                                                       <CheckCircle2 size={14} color={isHovered ? '#e89528' : '#2e7d32'} style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: isHovered ? 'scale(1.15)' : 'none' }} />
                                                     )
                                                   ) : (() => {
                                                     const Icon = item.icon;
                                                     return <Icon size={14} color={isHovered ? '#e89528' : item.color} style={{ transition: 'color 0.2s ease, transform 0.2s ease', transform: isHovered ? 'scale(1.15)' : 'none' }} />;
                                                   })()}
                                                 </div>
                                               </div>
                                             );
                                           })}
                                         </div>
                                       );
                                    })()}
                                  </div>
                                </div>
                              </div>

                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '16px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                                <Trophy size={26} color="#e89528" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '16.5px', fontWeight: '600', color: '#a35b12', lineHeight: '1.4', textAlign: 'left' }}>
                                  Result: Anomaly resolved in hours instead of days. By adjusting pricing and accelerating team follow-ups, the company avoided conversion loss and made smarter, data-driven decisions.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '40px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '16px' : '24px' }}>
                          <h2 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.2', whiteSpace: w < 768 ? 'normal' : 'nowrap', display: 'flex', alignItems: 'center' }}>
                            <a href={cat.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                              {cat.title} <ExternalLink size={w < 768 ? 24 : 28} style={{ marginLeft: '12px' }} />
                            </a>
                          </h2>
                        </div>
                        <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#555', lineHeight: '1.6', marginBottom: w < 768 ? '30px' : '40px' }}>Available on both web and mobile platforms, enabling powerful insights and operations tightly coupled with your central logic systems.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: w < 768 ? '12px' : '20px', width: '100%' }}>
                          <div style={{ background: '#fff', padding: w < 768 ? '20px 10px' : '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                            <Package color="#e89528" size={w < 768 ? 28 : 32} style={{ marginBottom: w < 768 ? '8px' : '12px' }} />
                            <span style={{ fontWeight: '600', fontSize: w < 768 ? '14px' : '16px', color: '#222' }}>Catalogue</span>
                          </div>
                          <div style={{ background: '#fff', padding: w < 768 ? '20px 10px' : '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                            <Clock color="#e89528" size={w < 768 ? 28 : 32} style={{ marginBottom: w < 768 ? '8px' : '12px' }} />
                            <span style={{ fontWeight: '600', fontSize: w < 768 ? '14px' : '16px', color: '#222' }}>Reminders</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* External label for category when root is focused */}
            <AnimatePresence>
              {focusedNode === 'root' && (
                <div style={{
                  position: 'absolute',
                  left: `${(typeof size.width === 'number' ? size.width : 50) / 2 + 12}px`,
                  top: 0,
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: size.opacity, x: 0, transition: { delay: 0.4 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    onClick={() => handleNodeClick(cat.id)}
                    style={{
                      fontSize: w < 768 ? '11px' : `${18 * rs}px`,
                      fontWeight: '600',
                      color: '#82490e',
                      margin: 0,
                      whiteSpace: 'normal',
                      width: w < 768 ? '75px' : `${160 * rs}px`,
                      textAlign: 'left',
                      lineHeight: '1.2',
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    whileHover={{ color: '#e89528' }}
                  >
                    {cat.title}
                  </motion.h3>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Subcomponent Bubbles */}
      {Object.values(bubbleData).flatMap(cat =>
        cat.subComponents.map((sub) => {
          const size = getSize('sub', sub.id);
          const focus = focusedNode === sub.id;
          const pos = layout.subs[sub.id];

          return (
            <motion.div
              key={sub.id}
              style={{ position: 'absolute', willChange: 'left, top' }}
              animate={{ left: pos.left, top: pos.top, zIndex: size.zIndex }}
              transition={activeTransition}
            >
              <motion.div
                className={`glass-bubble ${focus ? 'expanded' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (focus) return;
                  handleNodeClick(sub.id);
                }}
                animate={{ width: typeof size.width === 'number' ? `${size.width}px` : size.width, height: typeof size.height === 'number' ? `${size.height}px` : size.height, scale: size.scale, opacity: size.opacity, x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%' }}
                style={{ 
                  position: 'absolute', 
                  left: 0,
                  top: 0,
                  cursor: 'pointer', 
                  transformOrigin: 'center', 
                  overflow: 'hidden', 
                  borderWidth: `${Math.min(1.5, 1 / size.scale)}px`,
                  willChange: 'transform, opacity, width, height, border-radius'
                }}
                transition={activeTransition}
                transformTemplate={cleanTransform}
                whileHover={!focus && !focusedNode ? { scale: 1.2, boxShadow: 'inset 0 0 10px #fff, 0 10px 20px rgba(232, 149, 40,0.4)' } : {}}
              >
                {/* Rich Content View inside Subcomponent */}
                <AnimatePresence>
                  {focus && (
                    <motion.div key={`bg-${sub.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#f4f6f8', borderRadius: 'inherit', zIndex: 0 }}
                    />
                  )}
                  {focus && (
                    <motion.div key={`content-${sub.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.4 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: `${size.width}px`, 
                        height: `${size.height}px`,
                        zIndex: 1, 
                        display: 'flex', 
                        flexDirection: w < 768 ? 'column' : 'row' 
                      }}
                    >
                      {w >= 768 && (() => {
                        const imageConfig = {
                          'intelligent-dashboard': { src: '/intelligent_lead_assignment.png', aspect: '1635 / 1519' },
                          'lead-assignments': { src: '/field_sales_managment_corrc.png', aspect: '1718 / 1544' },
                          'field-sales': { src: '/ai_sales_monitoring.png', aspect: '1607 / 1414' },
                          'ai-sales-monitoring': { src: '/collaboration_and_feedback_corrct.png', aspect: '1769 / 1502' },
                          'order-fulfillment': { src: '/order_fulfillment.png', aspect: '1984 / 1448' },
                          'procurement-inventory': { src: '/procurement_inventory.png', aspect: '1994 / 1396' },
                          'raw-materials': { src: '/raw_materials.png', aspect: '1936 / 1406' },
                          'invoicing-vendor-management': { src: '/invoicing_vendor_management.png', aspect: '815 / 720' },
                          'advanced-ai-monitoring': { src: '/advanced_ai_monitoring.png', aspect: '1203 / 859' },
                          'command-center': { src: '/command_center.png', aspect: '1203 / 910' },
                          'automated-reports': { src: '/automated_reports_and_dashboards.png', aspect: '1425 / 889' },
                          'analyst-audit-trails': { src: '/audit_trail.png', aspect: '1203 / 929' },
                          'analyst-command-center': { src: '/root_cause_analysis.png', aspect: '1203 / 1008' },
                          'analyst-ai-monitoring': { src: '/ai_insight_engine.png', aspect: '1203 / 1019' },
                          'analyst-automated-reports': { src: '/business_intelligence.png', aspect: '1203 / 768' }
                        };
                        const config = imageConfig[sub.id];
                        const isContained = !!config;
                        const imageSrc = config ? config.src : '/map-bg.png';
                        const aspect = config ? config.aspect : 'auto';

                        return (
                          <div style={{ flex: '1', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ 
                              width: '100%', 
                              height: isContained ? 'auto' : '100%',
                              aspectRatio: aspect,
                              maxHeight: '100%',
                              borderRadius: '16px', 
                              backgroundImage: `url(${imageSrc})`, 
                              backgroundSize: isContained ? 'contain' : 'cover', 
                              backgroundPosition: 'center', 
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: isContained ? '#fff' : 'transparent',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
                            }} />
                          </div>
                        );
                      })()}

                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '40px 60px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        {subComponentContent[sub.id] ? (() => {
                          const content = subComponentContent[sub.id];
                          return (
                            <>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '10px' : '14px' }}>
                                <h3 style={{ fontSize: sub.id === 'automated-reports' ? (w < 768 ? '26px' : '36px') : (w < 768 ? '32px' : '42px'), fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal', lineHeight: '1.15' }}>
                                  <a href={sub.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                    {content.title} <ExternalLink size={w < 768 ? 20 : 24} style={{ marginLeft: '10px' }} />
                                  </a>
                                </h3>
                              </div>
                              <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#444', lineHeight: '1.6', marginBottom: '14px', textAlign: 'left', fontWeight: '500' }}>
                                {content.intro}
                              </p>
                              
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                {content.bullets.map((bullet, idx) => (
                                  <div key={idx} style={{ 
                                    border: '1px solid rgba(232, 149, 40, 0.12)', 
                                    background: 'rgba(232, 149, 40, 0.02)', 
                                    padding: '10px 14px', 
                                    borderRadius: '8px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
                                  }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e89528', flexShrink: 0 }} />
                                    <span style={{ fontSize: w < 768 ? '14px' : '15px', color: '#555', fontWeight: '500', textAlign: 'left', lineHeight: '1.4' }}>{bullet}</span>
                                  </div>
                                ))}
                              </div>

                              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#e89528', margin: '0 0 12px 0' }}>
                                Key Features
                              </h4>
                              <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : '1fr 1fr', gap: w < 768 ? '10px' : '14px' }}>
                                {content.features.map((feat, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid rgba(232, 149, 40, 0.15)', borderLeft: '4.5px solid #e89528', padding: w < 768 ? '12px 16px' : '18px 22px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                    <span style={{ fontSize: w < 768 ? '15px' : '18px', fontWeight: '500', color: '#222', lineHeight: '1.3' }}>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        })() : (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '16px' : '24px' }}>
                              <h3 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal' }}>
                                <a href={sub.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                  {sub.title} <ExternalLink size={w < 768 ? 24 : 28} style={{ marginLeft: '12px' }} />
                                </a>
                              </h3>
                            </div>
                            <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#555', lineHeight: '1.6', marginBottom: w < 768 ? '30px' : '40px' }}>{sub.description} Ensures predictive insights, live data streams, and autonomous actions highly specific to your operational workflows.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: w < 768 ? '12px' : '20px' }}>
                              <div style={{ background: '#fff', padding: w < 768 ? '20px 10px' : '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Package color="#e89528" size={w < 768 ? 28 : 32} style={{ marginBottom: w < 768 ? '8px' : '12px' }} />
                                <h4 style={{ fontSize: w < 768 ? '14px' : '16px', color: '#222', margin: 0, fontWeight: '600' }}>Catalogue</h4>
                              </div>
                              <div style={{ background: '#fff', padding: w < 768 ? '20px 10px' : '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Clock color="#e89528" size={w < 768 ? 28 : 32} style={{ marginBottom: w < 768 ? '8px' : '12px' }} />
                                <h4 style={{ fontSize: w < 768 ? '14px' : '16px', color: '#222', margin: 0, fontWeight: '600' }}>Reminders</h4>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {!focus && (() => {
                  const parentCatId = getCatFromSub(sub.id);
                  const isCatFocused = focusedNode === parentCatId;
                  const parentTop = layout.cats[parentCatId]?.top || h / 2;
                  const isAbove = pos.top < parentTop;

                  let textLeft = `${(typeof size.width === 'number' ? size.width : 40) / 2 + 8}px`;
                  let textTop = '50%';
                  let textBottom = 'auto';
                  let textTransform = 'translateY(-50%)';
                  let textAlign = 'left';

                  if (w < 768) {
                    if (isCatFocused) {
                      textLeft = '50%';
                      textTransform = 'translateX(-50%)';
                      textAlign = 'center';
                      if (isAbove) {
                        textBottom = `${(typeof size.height === 'number' ? size.height : 40) / 2 + 8}px`;
                        textTop = 'auto';
                      } else {
                        textTop = `${(typeof size.height === 'number' ? size.height : 40) / 2 + 8}px`;
                        textBottom = 'auto';
                      }
                    } else {
                      textLeft = `${(typeof size.width === 'number' ? size.width : 40) / 2 + 8}px`;
                      textTop = '50%';
                      textTransform = 'translateY(-50%)';
                      textAlign = 'left';
                    }
                  } else {
                    if (focusedNode) {
                      textLeft = `${(typeof size.width === 'number' ? size.width : 40) / 2 + 12}px`;
                      textTop = '0px';
                      textTransform = 'translateY(-50%)';
                    } else {
                      textLeft = `${(typeof size.width === 'number' ? size.width : 40) / 2 + 8}px`;
                      textTop = `-${12 * rs}px`;
                      textTransform = 'none';
                    }
                  }

                  return (
                    <div style={{
                      position: 'absolute',
                      left: textLeft,
                      top: textTop === '0px' ? 0 : textTop,
                      bottom: textBottom,
                      transform: textTransform === 'translateY(-50%)' ? 'translateY(-50%)' : textTransform,
                      pointerEvents: 'none'
                    }}>
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: size.opacity, x: 0, transition: { delay: focusedNode ? 0 : 0.4 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        onClick={() => handleNodeClick(sub.id)}
                        style={{
                          fontSize: w < 768 ? '11px' : `${18 * rs}px`,
                          fontWeight: '600',
                          color: '#82490e',
                          margin: 0,
                          whiteSpace: focusedNode ? 'normal' : (w < 768 ? 'normal' : 'nowrap'),
                          width: w < 768 ? (isCatFocused ? '80px' : '75px') : (focusedNode ? `${160 * rs}px` : 'auto'),
                          textAlign: textAlign,
                          lineHeight: '1.2',
                          cursor: 'pointer',
                          pointerEvents: 'auto'
                        }}
                        whileHover={!focus && !focusedNode ? { color: '#e89528' } : {}}
                      >
                        {sub.title}
                      </motion.h3>
                    </div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
      </div>
    </div>
  );
};

export default BubbleNetwork;
