import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bubbleData } from '../data';
import { Sparkles, X, ChevronRight, BarChart3, Database, ShieldCheck, ExternalLink, Package, Clock, TrendingUp, Layers, ShoppingCart, Briefcase, UserCheck, HeartHandshake, PieChart, BrainCircuit, Activity, Lightbulb, AlertTriangle, Sliders, ArrowRight, Users, Crown, Monitor, Bell, Zap, Shield, Target, ClipboardCheck, Bot, IndianRupee, Truck, Trophy, TrendingDown, CheckCircle2 } from 'lucide-react';

const BubbleNetwork = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [focusedNode, setFocusedNode] = useState(null);

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const w = dimensions.width;
  const h = dimensions.height;

  const handleNodeClick = (id) => {
    setFocusedNode(prev => prev === id ? null : id);
  };

  const getCatFromSub = (subId) => {
    return Object.keys(bubbleData).find(catId =>
      bubbleData[catId].subComponents.some(sub => sub.id === subId)
    );
  };

  // Dynamic Layout Engine
  const getLayout = () => {
    const R = Math.round;
    const layout = {
      root: { left: R(w * 0.16), top: R(h * 0.48) },
      cats: {
        sales: { left: R(w * 0.46), top: R(h * 0.13) },
        topManagement: { left: R(w * 0.46), top: R(h * 0.36) },
        analytics: { left: R(w * 0.46), top: R(h * 0.61) },
        erp: { left: R(w * 0.46), top: R(h * 0.86) }
      },
      subs: {
        // Group 1 (Top Management)
        'advanced-ai-monitoring': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.08) },
        'automated-reports': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.13) },
        'command-center': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.18) },

        // Group 2 (Procurement)
        'order-fulfillment': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.28) },
        'procurement-inventory': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.33) },
        'raw-materials': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.38) },
        'invoicing-vendor-management': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.43) },

        // Group 3 (Sales Enablement)
        'intelligent-dashboard': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.53) },
        'lead-assignments': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.58) },
        'field-sales': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.63) },
        'ai-sales-monitoring': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.68) },

        // Group 4 (Analyst)
        'analyst-automated-reports': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.78) },
        'analyst-audit-trails': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.83) },
        'analyst-command-center': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.88) },
        'analyst-ai-monitoring': { left: w < 768 ? R(w * 0.71) : R(w * 0.73), top: R(h * 0.93) },
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

    if (type === 'root') {
      if (focusedNode === 'root') {
        return { width: Math.min(1350, w < 768 ? w * 0.65 : w * 0.68), height: w < 768 ? 380 : Math.min(750, h * 0.9), scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
      }
      return { width: 240 * rs, height: 240 * rs, scale: 0.35, opacity: 0.6, zIndex: 5 };
    }

    if (nodeId === focusedNode) {
      const isCat = bubbleData[nodeId] !== undefined;
      if (isCat) {
        return { width: Math.min(1350, w < 768 ? w * 0.65 : w * 0.68), height: w < 768 ? 380 : Math.min(750, h * 0.9), scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
      } else {
        return { width: Math.min(1350, w < 768 ? w * 0.9 : w * 0.9), height: w < 768 ? 380 : Math.min(750, h * 0.9), scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
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
  const cleanTransform = ({ x, y, scale }) => `translate(${x}, ${y}) scale(${scale})`;

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
      onClick={(e) => {
        if (e.target === e.currentTarget && focusedNode) {
          setFocusedNode(null);
        }
      }}
    >
      <div className="mesh-bg" />

      <AnimatePresence>
        {focusedNode && (
          <motion.button
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            onClick={() => setFocusedNode(null)}
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
                animate={{ d: path.d, opacity: lineOpacity === 1 ? 0.35 : 0 }} transition={springConfig}
                fill="none" stroke="rgba(232, 149, 40, 0.8)" strokeWidth="3"
              />
              <motion.path
                style={{ willChange: 'opacity' }}
                animate={{ d: path.d, opacity: lineOpacity === 1 ? 0.6 : 0 }} transition={springConfig}
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
          borderWidth: `${1 / getSize('root').scale}px`,
          willChange: 'left, top, transform, opacity, width, height, border-radius'
        }}
        onClick={() => {
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
        transition={springConfig}
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
                width: w < 768 ? `${w * 0.65}px` : `${Math.min(1350, w * 0.68)}px`, 
                height: w < 768 ? '380px' : `${Math.min(750, h * 0.9)}px`, 
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
            transition={springConfig}
          >
            <motion.div
              className={`glass-bubble ${focus ? 'expanded' : ''}`} onClick={() => handleNodeClick(cat.id)}
              style={{ 
                position: 'absolute', 
                borderWidth: `${1 / size.scale}px`,
                willChange: 'transform, opacity, width, height, border-radius'
              }}
              animate={{
                width: typeof size.width === 'number' ? `${size.width}px` : size.width,
                height: typeof size.height === 'number' ? `${size.height}px` : size.height,
                scale: size.scale, opacity: size.opacity,
                x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%', cursor: 'pointer',
                overflow: 'hidden' // prevents text from spilling over during shrink
              }}
              transition={springConfig}
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
                      width: w < 768 ? `${w * 0.65}px` : `${Math.min(1350, w * 0.68)}px`, 
                      height: w < 768 ? '380px' : `${Math.min(750, h * 0.9)}px`, 
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
                                <Crown size={w < 768 ? 20 : 28} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '28px' : '36px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Top Management
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '13px' : '15px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  AI-Powered Executive Intelligence
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '13px' : '15px', color: '#444', lineHeight: '1.45', margin: '6px 0 12px 0', fontWeight: '500', textAlign: 'left' }}>
                              One unified view of the business for faster, smarter decision-making.
                            </p>

                            {/* Timeline List */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: w < 768 ? '10px' : '14px', paddingLeft: '4px' }}>
                              {/* Connector Line */}
                              <div style={{
                                position: 'absolute',
                                left: w < 768 ? '18px' : '27px',
                                top: w < 768 ? '14px' : '23px',
                                bottom: w < 768 ? '14px' : '23px',
                                width: '2px',
                                background: 'linear-gradient(to bottom, rgba(232, 149, 40, 0.4) 0%, rgba(232, 149, 40, 0.1) 100%)',
                                zIndex: 0
                              }} />

                              {[
                                {
                                  title: 'Executive Visibility',
                                  desc: 'Monitor sales, finance, inventory, production, and operations from a single workspace.',
                                  icon: Monitor
                                },
                                {
                                  title: 'Advanced AI Monitoring',
                                  desc: 'Identify risks, anomalies, and performance drifts before they impact business outcomes.',
                                  icon: BrainCircuit
                                },
                                {
                                  title: 'Real-Time Insights',
                                  desc: 'Track critical KPIs, trends, profitability, and operational performance as they happen.',
                                  icon: TrendingUp
                                },
                                {
                                  title: 'Command Center',
                                  desc: 'Investigate alerts, collaborate across teams, and accelerate issue resolution.',
                                  icon: Bell
                                },
                                {
                                  title: 'AI Recommendations',
                                  desc: 'Receive intelligent suggestions and corrective actions based on performance.',
                                  icon: Lightbulb
                                }
                              ].map((item, index) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                      width: w < 768 ? '28px' : '46px',
                                      height: w < 768 ? '28px' : '46px',
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
                                      <ItemIcon size={w < 768 ? 14 : 22} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <h4 style={{ fontSize: w < 768 ? '13px' : '16.5px', fontWeight: '700', color: '#d68022', margin: 0 }}>
                                        {item.title}
                                      </h4>
                                      <p style={{ fontSize: w < 768 ? '11px' : '13.5px', color: '#555', margin: '1px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
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
                              margin: w < 768 ? '12px 0 8px 0' : '14px 0 10px 0'
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
                                    padding: w < 768 ? '6px 2px' : '10px 4px',
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
                            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 10px 0', color: '#e89528' }}>
                              Real-World Example
                            </h3>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '16px', lineHeight: '1.6', color: '#444', fontWeight: '500' }}>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                A jewellery manufacturer notices that gross profit margins have fallen from 24% to 19% over the last six weeks, despite maintaining monthly sales of approximately ₹8–10 crore.
                              </p>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                In many organizations, management would first need to collect reports from Finance, Procurement, Manufacturing, Inventory, and Sales teams. Multiple review meetings would then be conducted to compare data, identify discrepancies, and determine the root cause, often taking several days or even weeks before corrective action can be taken.
                              </p>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '2px 0' }}>
                                <p style={{ margin: 0, textAlign: 'left' }}>
                                  With StackLogix, AI Monitoring automatically detects the 5% margin decline and flags it as a critical business drift. The Automated Dashboard instantly consolidates data across departments and reveals that:
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '14px' }}>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '18px' }}>• Gold procurement costs have increased by 7%</span>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '18px' }}>• Manufacturing wastage has risen from 2.8% to 4.1%</span>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '18px' }}>• Discounts on a high-volume product category have increased by 12%</span>
                                </div>
                              </div>
                              <p style={{ margin: 0, textAlign: 'left' }}>
                                The Command Center brings all related metrics, alerts, and discussions into a single workspace, enabling management and department heads to quickly investigate the issue and implement corrective actions.
                              </p>
                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '10px 14px', borderRadius: '8px', fontWeight: '600', color: '#a35b12', fontSize: '16px', marginTop: '4px', lineHeight: '1.5' }}>
                                Result: Instead of spending days gathering information, leadership identifies the root cause within hours, preventing further margin erosion and potentially saving ₹30–50 lakh per month in avoidable losses.
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
                                <ShoppingCart size={w < 768 ? 20 : 28} />
                              </div>
                              <div>
                                <h2 style={{ fontSize: w < 768 ? '28px' : '38px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.1' }}>
                                  Procurement
                                </h2>
                                <h3 style={{ fontSize: w < 768 ? '13px' : '16px', fontWeight: '600', color: '#666', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                                  Intelligent Procurement & Inventory Control
                                </h3>
                              </div>
                            </div>

                            <p style={{ fontSize: w < 768 ? '13px' : '16px', color: '#444', lineHeight: '1.45', margin: '6px 0 14px 0', fontWeight: '500', textAlign: 'left' }}>
                              Ensure the right materials are available at the right time while optimizing inventory, procurement costs, and fulfilment efficiency.
                            </p>

                            {/* Timeline List */}
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: w < 768 ? '10px' : '15px', paddingLeft: '4px' }}>
                              {/* Connector Line */}
                              <div style={{
                                position: 'absolute',
                                left: w < 768 ? '18px' : '26px',
                                top: w < 768 ? '14px' : '22px',
                                bottom: w < 768 ? '14px' : '22px',
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
                                      width: w < 768 ? '28px' : '44px',
                                      height: w < 768 ? '28px' : '44px',
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
                                      <ItemIcon size={w < 768 ? 14 : 21} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <h4 style={{ fontSize: w < 768 ? '13px' : '16.5px', fontWeight: '700', color: '#d68022', margin: 0 }}>
                                        {item.title}
                                      </h4>
                                      <p style={{ fontSize: w < 768 ? '11px' : '13.5px', color: '#555', margin: '1px 0 0 0', lineHeight: '1.4', fontWeight: '500' }}>
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
                              margin: w < 768 ? '12px 0 8px 0' : '16px 0 12px 0'
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
                                    padding: w < 768 ? '6px 2px' : '11px 5px',
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
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                      <CheckCircle2 size={16} color="#e89528" style={{ marginTop: '2px', flexShrink: 0 }} />
                                      <span style={{ fontSize: '14.5px', lineHeight: '1.35', color: '#333', fontWeight: '600' }}>{text}</span>
                                    </div>
                                  ))}
                                </div>

                                <div style={{ flex: '1', width: '100%', background: '#f8f9fa', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '12px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#222', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Procurement Dashboard</span>
                                  </div>
                                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '4px 0' }} />
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                      <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>Stock Overview</span>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2.5px solid #f0f0f0', borderTopColor: '#e89528', borderLeftColor: '#e89528', flexShrink: 0 }} />
                                        <span style={{ fontSize: '12px', color: '#222', fontWeight: '700', lineHeight: '1.1' }}>68% stock</span>
                                      </div>
                                    </div>
                                    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                      <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>Purchase Orders</span>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '12px', color: '#222', fontWeight: '700' }}>32 Open POs</span>
                                        <ClipboardCheck size={16} color="#a3a8b3" />
                                      </div>
                                    </div>
                                    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                      <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>Deliveries</span>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '12px', color: '#222', fontWeight: '700' }}>12 In Transit</span>
                                        <Truck size={16} color="#e89528" />
                                      </div>
                                    </div>
                                    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                      <span style={{ fontSize: '10px', color: '#777', fontWeight: '600', textTransform: 'uppercase' }}>Shortage Risk</span>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '12px', color: '#d9381e', fontWeight: '800' }}>5 At Risk</span>
                                        <AlertTriangle size={16} color="#d9381e" />
                                      </div>
                                    </div>
                                  </div>
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
              transition={springConfig}
            >
              <motion.div
                className={`glass-bubble ${focus ? 'expanded' : ''}`} onClick={() => handleNodeClick(sub.id)}
                animate={{ width: typeof size.width === 'number' ? `${size.width}px` : size.width, height: typeof size.height === 'number' ? `${size.height}px` : size.height, scale: size.scale, opacity: size.opacity, x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%' }}
                style={{ 
                  position: 'absolute', 
                  cursor: 'pointer', 
                  transformOrigin: 'center', 
                  overflow: 'hidden', 
                  borderWidth: `${1 / size.scale}px`,
                  willChange: 'transform, opacity, width, height, border-radius'
                }}
                transition={springConfig}
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
                        width: w < 768 ? `${w * 0.9}px` : `${Math.min(1350, w * 0.9)}px`, 
                        height: w < 768 ? '380px' : `${Math.min(750, h * 0.9)}px`, 
                        zIndex: 1, 
                        display: 'flex', 
                        flexDirection: w < 768 ? 'column' : 'row' 
                      }}
                    >
                      {w >= 768 && (
                        <div style={{ flex: '1', padding: '40px' }}>
                          <div style={{ width: '100%', height: '100%', borderRadius: '16px', backgroundImage: 'url(/map-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        </div>
                      )}

                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '40px 60px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        {sub.id === 'advanced-ai-monitoring' ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '12px' : '16px' }}>
                              <h3 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal' }}>
                                <a href={sub.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                  AI Monitoring <ExternalLink size={w < 768 ? 24 : 28} style={{ marginLeft: '12px' }} />
                                </a>
                              </h3>
                            </div>
                            <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#444', lineHeight: '1.6', marginBottom: '18px', textAlign: 'left', fontWeight: '500' }}>
                              AI Monitoring continuously analyzes business operations across sales, inventory, procurement, manufacturing, finance, and customer management to identify risks, anomalies, and performance drifts in real time. When unusual patterns are detected, the system automatically raises flags, prioritizes their severity, and provides AI-generated recommendations to help management take corrective action before issues impact profitability or operational efficiency.
                            </p>
                            <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#e89528', margin: '0 0 12px 0' }}>
                              Key Features
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : '1fr 1fr', gap: w < 768 ? '10px' : '14px' }}>
                              {[
                                "Real-Time Drift & Anomaly Detection",
                                "Intelligent Flagging & Alert Management",
                                "AI-Powered Recommendations",
                                "Predictive Risk Monitoring",
                                "Cross-Functional Performance Visibility",
                                "Root Cause & Trend Analysis"
                              ].map((feat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid rgba(232, 149, 40, 0.15)', borderLeft: '4.5px solid #e89528', padding: w < 768 ? '12px 16px' : '18px 22px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <span style={{ fontSize: w < 768 ? '15px' : '18px', fontWeight: '500', color: '#222', lineHeight: '1.3' }}>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : sub.id === 'automated-reports' ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '12px' : '16px' }}>
                              <h3 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal' }}>
                                <a href={sub.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                  Automated Dashboards & Reports <ExternalLink size={w < 768 ? 24 : 28} style={{ marginLeft: '12px' }} />
                                </a>
                              </h3>
                            </div>
                            <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#444', lineHeight: '1.6', marginBottom: '18px', textAlign: 'left', fontWeight: '500' }}>
                              Automated Dashboards and Reports provide a centralized view of business performance by consolidating data from multiple systems into a single source of truth. Interactive charts, graphs, and visual analytics make it easier to identify problem areas, track company growth, monitor profitability, and evaluate operational performance without relying on manually prepared reports.
                            </p>
                            <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#e89528', margin: '0 0 12px 0' }}>
                              Key Features
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : '1fr 1fr', gap: w < 768 ? '10px' : '14px' }}>
                              {[
                                "Real-Time Business Performance Monitoring",
                                "Interactive Dashboards & Visual Analytics",
                                "Automated Reporting & Distribution",
                                "Executive & Departmental Insights",
                                "Trend, Variance & Growth Analysis",
                                "Unified Business Intelligence Platform"
                              ].map((feat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid rgba(232, 149, 40, 0.15)', borderLeft: '4.5px solid #e89528', padding: w < 768 ? '12px 16px' : '18px 22px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <span style={{ fontSize: w < 768 ? '15px' : '18px', fontWeight: '500', color: '#222', lineHeight: '1.3' }}>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : sub.id === 'command-center' ? (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '12px' : '16px' }}>
                              <h3 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal' }}>
                                <a href={sub.link || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                  Command Center <ExternalLink size={w < 768 ? 24 : 28} style={{ marginLeft: '12px' }} />
                                </a>
                              </h3>
                            </div>
                            <p style={{ fontSize: w < 768 ? '15px' : '18px', color: '#444', lineHeight: '1.6', marginBottom: '18px', textAlign: 'left', fontWeight: '500' }}>
                              The Command Center acts as the central hub for managing business drifts, critical alerts, investigations, and resolutions. When a flag is raised, all relevant stakeholders can collaborate within a dedicated War Room, where departments can discuss the issue, provide context, identify root causes, and coordinate corrective actions. This ensures complete visibility, accountability, and faster resolution of business-critical problems.
                            </p>
                            <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#e89528', margin: '0 0 12px 0' }}>
                              Key Features
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: w < 768 ? '1fr' : '1fr 1fr', gap: w < 768 ? '10px' : '14px' }}>
                              {[
                                "Centralized Drift & Alert Management",
                                "AI-Powered Resolution Recommendations",
                                "War Rooms & Cross-Functional Collaboration",
                                "Root Cause Analysis & Documentation",
                                "Action Plan & Resolution Tracking",
                                "Governance, Visibility & Audit Trail"
                              ].map((feat, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid rgba(232, 149, 40, 0.15)', borderLeft: '4.5px solid #e89528', padding: w < 768 ? '12px 16px' : '18px 22px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                  <span style={{ fontSize: w < 768 ? '15px' : '18px', fontWeight: '500', color: '#222', lineHeight: '1.3' }}>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
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
  );
};

export default BubbleNetwork;
