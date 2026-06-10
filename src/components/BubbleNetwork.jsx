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
    const layout = {
      root: { left: w * 0.15, top: h * 0.5 },
      cats: {
        sales: { left: w * 0.45, top: h * 0.25 },
        erp: { left: w * 0.45, top: h * 0.50 },
        analytics: { left: w * 0.45, top: h * 0.75 }
      },
      subs: {
        'sales-management': { left: w * 0.72, top: h * 0.13 },
        'distributors-portal': { left: w * 0.72, top: h * 0.21 },
        'field-assist': { left: w * 0.72, top: h * 0.29 },
        'ecommerce-portal': { left: w * 0.72, top: h * 0.37 },
        'inventory-management': { left: w * 0.72, top: h * 0.44 },
        'audit-trail': { left: w * 0.72, top: h * 0.50 },
        'sales-forecasting': { left: w * 0.72, top: h * 0.56 },
        'dashboard': { left: w * 0.72, top: h * 0.69 },
        'reports-schedules': { left: w * 0.72, top: h * 0.75 },
        'custom-dashboard': { left: w * 0.72, top: h * 0.81 },
      }
    };

    if (!focusedNode) return layout;

    const focusedType = bubbleData[focusedNode] ? 'cat' : 'sub';

    if (focusedType === 'cat') {
      layout.root = { left: w * 0.05, top: h * 0.35 }; // Pushed further left
      
      Object.keys(bubbleData).forEach((catId) => {
        if (catId === focusedNode) {
          layout.cats[catId] = { left: w * 0.45, top: h * 0.50 }; // Shifted left to make room
          const subs = bubbleData[catId].subComponents;
          const spacing = 0.16; 
          const startTop = 0.5 - ((subs.length - 1) * spacing) / 2;
          subs.forEach((sub, i) => {
            layout.subs[sub.id] = { left: w * 0.88, top: h * (startTop + i * spacing) }; // Safely positioned
          });
        } else {
          // Hide other categories by placing them under the root
          layout.cats[catId] = { left: w * 0.08, top: h * 0.30 };
          bubbleData[catId].subComponents.forEach(sub => {
            layout.subs[sub.id] = { left: w * 0.08, top: h * 0.30 };
          });
        }
      });
    } else {
      const parentCatId = getCatFromSub(focusedNode);

      layout.root = { left: w * 0.03, top: h * 0.20 }; // Push Brain further left
      
      Object.keys(bubbleData).forEach((catId) => {
        if (catId === parentCatId) {
          layout.cats[catId] = { left: w * 0.12, top: h * 0.35 }; // Push parent left to make room
          const subs = bubbleData[catId].subComponents;
          
          subs.forEach(sub => {
            if (sub.id === focusedNode) {
              layout.subs[sub.id] = { left: w * 0.58, top: h * 0.50 }; // Shifted right to stop overlap
            } else {
              // Hide sibling subs under parent
              layout.subs[sub.id] = { left: w * 0.12, top: h * 0.35 }; 
            }
          });
        } else {
          // Hide other categories under root
          layout.cats[catId] = { left: w * 0.05, top: h * 0.15 };
          bubbleData[catId].subComponents.forEach(sub => {
            layout.subs[sub.id] = { left: w * 0.05, top: h * 0.15 };
          });
        }
      });
    }
    return layout;
  };

  const layout = getLayout();

  const getSize = (type, id) => {
    if (!focusedNode) {
      if (type === 'root') return { width: 240, height: 240, scale: 1, opacity: 1, zIndex: 10 };
      if (type === 'cat') return { width: 180, height: 180, scale: 1, opacity: 1, zIndex: 11 };
      if (type === 'sub') return { width: 40, height: 40, scale: 1, opacity: 1, zIndex: 12 };
    }
    
    // Completely hide everything unrelated to the focused path
    const isCatFocused = bubbleData[focusedNode] !== undefined;
    
    if (type === 'root') {
      return { width: 240, height: 240, scale: 0.35, opacity: 0.6, zIndex: 5 };
    }

    if (id === focusedNode) {
       const isCat = bubbleData[id] !== undefined;
       if (isCat) {
         return { width: 1350, height: 750, scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
       } else {
         return { width: 1350, height: 750, scale: 1, opacity: 1, zIndex: 100, borderRadius: '24px' };
       }
    }

    if (type === 'cat') {
      if (!isCatFocused && getCatFromSub(focusedNode) === id) {
        // Parent of focused sub
        return { width: 180, height: 180, scale: 0.7, opacity: 0.8, zIndex: 11 };
      }
      // Unrelated category
      return { width: 180, height: 180, scale: 0.1, opacity: 0, zIndex: 1 };
    }

    if (type === 'sub') {
      if (isCatFocused && getCatFromSub(id) === focusedNode) {
        // Child of focused category
        return { width: 50, height: 50, scale: 1.1, opacity: 1, zIndex: 12 };
      }
      // Unrelated or sibling subcomponent
      return { width: 40, height: 40, scale: 0.1, opacity: 0, zIndex: 1 };
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

      {/* Close Button */}
      <AnimatePresence>
        {focusedNode && (
          <motion.button
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            onClick={() => setFocusedNode(null)}
            style={{
              position: 'absolute', top: '40px', left: '40px', zIndex: 200,
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#fff', border: '2px solid #e89528',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(232, 149, 40, 0.2)', cursor: 'pointer'
            }}
            whileHover={{ scale: 1.1, background: '#fdfbf2' }}
          >
            <X color="#a35b12" size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, ...springConfig }}
        style={{ position: 'absolute', top: '40px', right: '50px', zIndex: 20 }}
      >
        <h1 className="shining-text" style={{ fontSize: '32px', margin: 0 }}>StackLogix DEMO</h1>
      </motion.div>

      {/* SVG Connections with Animated Paths */}
      <svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
        {paths.map((path) => {
          let lineOpacity = 1;
          if (focusedNode) {
            const isCatFocused = bubbleData[focusedNode] !== undefined;
            if (isCatFocused) {
              // Category is focused: only show Root -> Cat line, and Cat -> Subs lines
              if (path.catId === focusedNode) lineOpacity = 1;
              else lineOpacity = 0;
            } else {
              // Subcomponent is focused: only show Root -> Parent line, and Parent -> Sub line
              const parentCatId = getCatFromSub(focusedNode);
              if (path.id === `root-${parentCatId}` || path.subId === focusedNode) lineOpacity = 1;
              else lineOpacity = 0;
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
        className="glass-bubble"
        style={{ position: 'absolute', cursor: focusedNode ? 'pointer' : 'default', borderWidth: `${1 / getSize('root').scale}px` }}
        onClick={() => {
          if (focusedNode) setFocusedNode(null);
        }}
        animate={{ 
          left: layout.root.left, top: layout.root.top, 
          scale: getSize('root').scale, opacity: getSize('root').opacity,
          width: '240px', height: '240px', x: '-50%', y: '-50%', zIndex: getSize('root').zIndex, borderRadius: '50%'
        }}
        transition={springConfig}
      >
        <img src="/center.png" alt="Brain" style={{ width: '90px', height: '90px', mixBlendMode: 'multiply', marginBottom: '8px' }} />
        <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0 }}>StackLogix</h1>
        <h2 style={{ fontSize: '13px', fontWeight: '600', color: '#a35b12', letterSpacing: '2px' }}>BRAIN</h2>
      </motion.div>

      {/* Category Bubbles */}
      {Object.values(bubbleData).map((cat) => {
        const size = getSize('cat', cat.id);
        const focus = focusedNode === cat.id;
        return (
            <motion.div
              key={cat.id} className={`glass-bubble ${focus ? 'expanded' : ''}`} onClick={() => handleNodeClick(cat.id)}
            style={{ position: 'absolute', borderWidth: `${1 / size.scale}px` }}
            animate={{ 
              left: layout.cats[cat.id].left, top: layout.cats[cat.id].top,
              width: `${size.width}px`, height: `${size.height}px`,
              scale: size.scale, opacity: size.opacity, zIndex: size.zIndex,
              x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%', cursor: 'pointer',
              overflow: 'hidden' // prevents text from spilling over during shrink
            }}
            transition={springConfig}
            whileHover={!focus && !focusedNode ? { scale: 1.05, boxShadow: 'inset 0 0 20px #fff, 0 15px 40px rgba(232, 149, 40,0.4)' } : {}}
          >
            {/* Minimal View */}
            <AnimatePresence>
              {!focus && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1, transition: { delay: focusedNode ? 0 : 0.4, duration: 0.2 } }} 
                  exit={{ opacity: 0, transition: { duration: 0.1 } }} 
                  style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <img src={`/${cat.id}.png`} alt={cat.title} style={{ width: '50px', height: '50px', mixBlendMode: 'multiply', marginBottom: '8px' }} />
                  <h2 style={{ fontSize: '16px', fontWeight: '700', textAlign: 'center', margin: '0 10px', color: 'var(--text-color)' }}>{cat.title}</h2>
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
                  style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}
                >
                  <div style={{ flex: '1', padding: '40px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '16px', backgroundImage: 'url(/map-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                  </div>
                  
                  <div style={{ flex: '0 0 45%', padding: '40px 60px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '42px', fontWeight: '800', margin: 0, color: '#e89528', lineHeight: '1.2', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                        {cat.title} <ExternalLink size={28} style={{ marginLeft: '12px' }}/>
                      </h2>
                    </div>
                    <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '40px' }}>Available on both web and mobile platforms, enabling powerful insights and operations tightly coupled with your central logic systems.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' }}>
                       <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                         <Package color="#e89528" size={32} style={{ marginBottom: '12px' }}/>
                         <span style={{ fontWeight: '600', fontSize: '16px', color: '#222' }}>Catalogue</span>
                       </div>
                       <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                         <Clock color="#e89528" size={32} style={{ marginBottom: '12px' }}/>
                         <span style={{ fontWeight: '600', fontSize: '16px', color: '#222' }}>Reminders</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
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
                animate={{ width: `${size.width}px`, height: `${size.height}px`, scale: size.scale, opacity: size.opacity, x: '-50%', y: '-50%', borderRadius: size.borderRadius || '50%' }}
                style={{ position: 'absolute', cursor: 'pointer', transformOrigin: 'center', overflow: 'hidden', borderWidth: `${1 / size.scale}px` }}
                transition={springConfig}
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
                      style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}
                    >
                      <div style={{ flex: '1', padding: '40px' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '16px', backgroundImage: 'url(/map-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                      </div>
                      
                      <div style={{ flex: '0 0 45%', padding: '40px 60px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                          <h3 style={{ fontSize: '42px', fontWeight: '800', color: '#e89528', margin: 0, display: 'flex', alignItems: 'center' }}>
                            {sub.title} <ExternalLink size={28} style={{ marginLeft: '12px' }}/>
                          </h3>
                        </div>
                        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', marginBottom: '40px' }}>{sub.description} Ensures predictive insights, live data streams, and autonomous actions highly specific to your operational workflows.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Package color="#e89528" size={32} style={{ marginBottom: '12px' }}/>
                            <h4 style={{ fontSize: '16px', color: '#222', margin: 0, fontWeight: '600' }}>Catalogue</h4>
                          </div>
                          <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock color="#e89528" size={32} style={{ marginBottom: '12px' }}/>
                            <h4 style={{ fontSize: '16px', color: '#222', margin: 0, fontWeight: '600' }}>Reminders</h4>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {!focus && (
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: size.opacity, x: 0, transition: { delay: focusedNode ? 0 : 0.4 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    onClick={() => handleNodeClick(sub.id)}
                    style={{ position: 'absolute', left: '32px', top: '-12px', fontSize: '18px', fontWeight: '600', color: '#82490e', margin: 0, whiteSpace: 'nowrap', cursor: 'pointer' }}
                    whileHover={!focus && !focusedNode ? { color: '#e89528' } : {}}
                  >
                    {sub.title}
                  </motion.h3>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default BubbleNetwork;
