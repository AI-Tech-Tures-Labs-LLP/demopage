import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { bubbleData } from '../data';

const ExpandedBubble = ({ bubbleId, onBack, onSubComponentClick }) => {
  const data = bubbleData[bubbleId];

  const images = {
    sales: '/sales.png',
    erp: '/erp.png',
    analytics: '/analytics.png',
  };

  return (
    <motion.div
      layoutId={`bubble-container-${bubbleId}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: '0px', 
        zIndex: 20,
        background: 'var(--bg-color)',
        border: '8px solid rgba(226, 183, 75, 0.4)', // Keeps the gold border vibe but full screen
        boxShadow: 'inset 0 0 50px rgba(226, 183, 75, 0.2)',
        display: 'flex',
        display: 'flex',
        flexDirection: 'column',
      }}
      exit={{ border: '8px solid rgba(226, 183, 75, 0.4)' }} // Keeps node alive for AnimatePresence without crossfading
      transition={{ layout: { type: 'spring', bounce: 0.1, duration: 0.8 } }}
    >
      {/* Background circles for expanded view */}
      <div className="mesh-bg" />

      {/* Header */}
      <motion.div 
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        style={{ 
          padding: '60px 80px 40px', 
          display: 'flex', 
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <motion.button 
          onClick={onBack}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '56px', 
            height: '56px',
            borderRadius: '50%',
            background: '#fdfbf2',
            border: '2px solid #e2b74b',
            boxShadow: '0 4px 15px rgba(226, 183, 75, 0.2)',
            marginRight: '32px'
          }}
          whileHover={{ scale: 1.05, background: '#fcf4db' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowLeft size={28} color="#8c6a21" />
        </motion.button>
        
        <motion.img 
          layoutId={`icon-${bubbleId}`} 
          src={images[bubbleId]}
          style={{ width: '80px', height: '80px', mixBlendMode: 'multiply', marginRight: '24px' }} 
        />
        
        <motion.h1 
          layoutId={`title-${bubbleId}`}
          style={{ 
            fontSize: '56px', 
            fontWeight: '800', 
            color: 'var(--text-color)', 
            letterSpacing: '-1.5px',
            margin: 0
          }}
        >
          {data.title}
        </motion.h1>
      </motion.div>

      {/* Grid Content */}
      <motion.div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '32px',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 80px',
          zIndex: 10
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
      >
        {data.subComponents.map((sub) => (
          <motion.div
            key={sub.id}
            layoutId={`subcard-container-${sub.id}`}
            onClick={() => onSubComponentClick(sub.id)}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '40px',
              cursor: 'pointer',
              border: '2px solid rgba(226, 183, 75, 0.2)',
              boxShadow: '0 10px 30px rgba(226, 183, 75, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '280px',
              position: 'relative'
            }}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
            }}
            whileHover={{ 
              y: -8, 
              borderColor: '#e2b74b',
              boxShadow: '0 20px 40px rgba(226, 183, 75, 0.15)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h3 
              layoutId={`subtitle-${sub.id}`}
              style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-color)' }}
            >
              {sub.title}
            </motion.h3>
            <motion.p 
              style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', fontWeight: '500' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {sub.description}
            </motion.p>
            
            <div style={{ marginTop: 'auto', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
               <motion.div 
                 style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fdfbf2', border: '1px solid #e2b74b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c6a21' }}
                 whileHover={{ background: '#e2b74b', color: '#fff' }}
               >
                 <ChevronRight size={24} />
               </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ExpandedBubble;
