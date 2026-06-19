import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bubbleData } from '../data';
import { Sparkles, X, ChevronRight, BarChart3, Database, ShieldCheck, ExternalLink, Package, Clock } from 'lucide-react';

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
  const springConfig = { type: 'spring', stiffness: 220, damping: 25, mass: 0.5 };
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
                animate={{ d: path.d, opacity: lineOpacity === 1 ? 0.35 : 0 }} transition={springConfig}
                fill="none" stroke="rgba(232, 149, 40, 0.8)" strokeWidth="3"
              />
              <motion.path
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
        style={{ position: 'absolute', cursor: 'pointer', borderWidth: `${1 / getSize('root').scale}px` }}
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
              <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '50px 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                <div style={{ marginBottom: w < 768 ? '24px' : '44px' }}>
                  <h2 style={{ fontSize: w < 768 ? '38px' : '52px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.2' }}>
                    What is StackLogix?
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: w < 768 ? '22px' : '32px', color: '#333', fontSize: w < 768 ? '17px' : '22px', lineHeight: '1.75', fontWeight: '500' }}>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '14px', flexShrink: 0 }} />
                    <p style={{ margin: 0, textAlign: 'justify' }}>
                      StackLogix is a fully customizable business operating system designed to unify and optimize every stage of the business lifecycle. Built to integrate seamlessly with existing ERP, CRM, accounting, manufacturing, and inventory systems, it eliminates data silos and creates a single source of truth across the organization.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '14px', flexShrink: 0 }} />
                    <p style={{ margin: 0, textAlign: 'justify' }}>
                      Purpose-built for the jewellery industry and adaptable to any enterprise workflow, StackLogix combines AI-driven forecasting, inventory planning, procurement, sales enablement, lead management, customer relationship management, and business intelligence into one modular platform. Organizations can choose only the modules they need, ensuring flexibility and cost efficiency.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '14px', flexShrink: 0 }} />
                    <p style={{ margin: 0, textAlign: 'justify' }}>
                      Beyond traditional dashboards and chatbots, StackLogix delivers actionable AI through predictive analytics, automated monitoring, intelligent recommendations, anomaly detection, and executive command centers that provide real-time visibility into operations, performance, risks, and opportunities. The result is a connected, data-driven enterprise where management can make faster, smarter decisions with complete operational transparency.
                    </p>
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
            style={{ position: 'absolute' }}
            animate={{ left: pos.left, top: pos.top, zIndex: size.zIndex }}
            transition={springConfig}
          >
            <motion.div
              className={`glass-bubble ${focus ? 'expanded' : ''}`} onClick={() => handleNodeClick(cat.id)}
              style={{ position: 'absolute', borderWidth: `${1 / size.scale}px` }}
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
                      <div style={{ flex: '1', padding: w < 768 ? '30px 20px' : '30px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: w < 1024 ? 'column' : 'row', gap: w < 1024 ? '30px' : '50px', alignItems: 'stretch' }}>
                          {/* Left Column */}
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '12px' }}>
                              <h2 style={{ fontSize: w < 768 ? '34px' : '46px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.2' }}>
                                Top Management
                              </h2>
                            </div>
                            <p style={{ fontSize: w < 768 ? '16px' : '20px', color: '#333', lineHeight: '1.65', margin: '0 0 16px 0', fontWeight: '500', textAlign: 'justify' }}>
                              The Top Management module provides leadership with a centralized view of the organization, enabling faster and more informed decision-making through AI-driven insights and real-time business intelligence.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '10px', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: '#222', fontWeight: '500' }}>
                                  Advanced AI Monitoring identifies risks, anomalies, and performance drifts before they impact the business.
                                </p>
                              </div>
                              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '10px', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: '#222', fontWeight: '500' }}>
                                  Automated Reports & Dashboards provide real-time visibility into critical KPIs, trends, and operational performance.
                                </p>
                              </div>
                              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e89528', marginTop: '10px', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '17px', lineHeight: '1.6', color: '#222', fontWeight: '500' }}>
                                  Command Center enables executives to monitor alerts, investigate issues, and coordinate resolutions across departments.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Right Column (Case Study Card) */}
                          <div style={{ flex: w < 1024 ? 'none' : '1.25', background: '#fff', padding: w < 768 ? '20px' : '22px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 10px 0', color: '#e89528' }}>
                              Real-World Example
                            </h3>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '16px', lineHeight: '1.6', color: '#444', fontWeight: '500' }}>
                              <p style={{ margin: 0, textAlign: 'justify' }}>
                                A jewellery manufacturer notices that gross profit margins have fallen from 24% to 19% over the last six weeks, despite maintaining monthly sales of approximately ₹8–10 crore.
                              </p>
                              <p style={{ margin: 0, textAlign: 'justify' }}>
                                In many organizations, management would first need to collect reports from Finance, Procurement, Manufacturing, Inventory, and Sales teams. Multiple review meetings would then be conducted to compare data, identify discrepancies, and determine the root cause, often taking several days or even weeks before corrective action can be taken.
                              </p>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '2px 0' }}>
                                <p style={{ margin: 0, textAlign: 'justify' }}>
                                  With StackLogix, AI Monitoring automatically detects the 5% margin decline and flags it as a critical business drift. The Automated Dashboard instantly consolidates data across departments and reveals that:
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '14px' }}>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '15.5px' }}>• Gold procurement costs have increased by 7%</span>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '15.5px' }}>• Manufacturing wastage has risen from 2.8% to 4.1%</span>
                                  <span style={{ fontWeight: '600', color: '#111', fontSize: '15.5px' }}>• Discounts on a high-volume product category have increased by 12%</span>
                                </div>
                              </div>
                              <p style={{ margin: 0, textAlign: 'justify' }}>
                                The Command Center brings all related metrics, alerts, and discussions into a single workspace, enabling management and department heads to quickly investigate the issue and implement corrective actions.
                              </p>
                              <div style={{ background: 'rgba(232, 149, 40, 0.05)', borderLeft: '4px solid #e89528', padding: '10px 14px', borderRadius: '8px', fontWeight: '600', color: '#a35b12', fontSize: '16px', marginTop: '4px', lineHeight: '1.5' }}>
                                Result: Instead of spending days gathering information, leadership identifies the root cause within hours, preventing further margin erosion and potentially saving ₹30–50 lakh per month in avoidable losses.
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
              style={{ position: 'absolute' }}
              animate={{ left: pos.left, top: pos.top, zIndex: size.zIndex }}
              transition={springConfig}
            >
              <motion.div
                className={`glass-bubble ${focus ? 'expanded' : ''}`} onClick={() => handleNodeClick(sub.id)}
                animate={{ width: typeof size.width === 'number' ? `${size.width}px` : size.width, height: typeof size.height === 'number' ? `${size.height}px` : size.height, scale: size.scale, opacity: size.opacity, x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%' }}
                style={{ position: 'absolute', cursor: 'pointer', transformOrigin: 'center', overflow: 'hidden', borderWidth: `${1 / size.scale}px` }}
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
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: w < 768 ? '16px' : '24px' }}>
                          <h3 style={{ fontSize: w < 768 ? '32px' : '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center', whiteSpace: w < 768 ? 'normal' : 'nowrap' }}>
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
