import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { bubbleData } from '../data';

const SubComponentDetail = ({ subId, parentBubbleId, onBack }) => {
  const parent = bubbleData[parentBubbleId];
  const subData = parent.subComponents.find(s => s.id === subId);

  return (
    <motion.div
      layoutId={`subcard-container-${subId}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#ffffff',
        borderRadius: '0px', 
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      exit={{ border: '8px solid rgba(226, 183, 75, 0.4)' }}
      transition={{ layout: { type: 'spring', bounce: 0.1, duration: 0.8 } }}
    >
      <div className="mesh-bg" />

      {/* Dynamic Header */}
      <motion.div 
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        style={{ 
          padding: '60px 80px', 
          display: 'flex', 
          alignItems: 'center',
          background: 'rgba(253, 251, 242, 0.9)',
          borderBottom: '1px solid rgba(226, 183, 75, 0.3)',
          boxShadow: '0 4px 20px rgba(226, 183, 75, 0.05)'
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
            background: '#ffffff',
            border: '2px solid #e2b74b',
            boxShadow: '0 4px 15px rgba(226, 183, 75, 0.1)',
            marginRight: '32px'
          }}
          whileHover={{ scale: 1.05, background: '#fcf4db' }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={28} color="#8c6a21" />
        </motion.button>
        <motion.h2 
          layoutId={`subtitle-${subId}`}
          style={{ fontSize: '48px', fontWeight: '800', color: 'var(--text-color)', margin: 0, letterSpacing: '-1px' }}
        >
          {subData.title}
        </motion.h2>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        style={{ 
          display: 'flex', 
          flex: 1,
          padding: '80px',
          gap: '80px',
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          zIndex: 10
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      >
        {/* Left Column: Text & Features */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <p style={{ fontSize: '24px', lineHeight: '1.6', color: '#444', fontWeight: '500' }}>
            {subData.description}
          </p>
          
          <div style={{ 
            background: '#ffffff', 
            borderRadius: '32px', 
            padding: '40px', 
            flex: 1,
            border: '2px solid rgba(226, 183, 75, 0.2)',
            boxShadow: '0 10px 30px rgba(226, 183, 75, 0.05)'
          }}>
             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
               <Sparkles size={28} color="#e2b74b" style={{ marginRight: '16px' }} />
               <h4 style={{ fontSize: '28px', fontWeight: '800', color: '#8c6a21' }}>Key Capabilities</h4>
             </div>
             
             <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
               {[1, 2, 3].map(i => (
                 <motion.li 
                   key={i} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', background: '#fdfbf2', padding: '24px', borderRadius: '20px', border: '1px solid rgba(226, 183, 75, 0.2)' }}
                 >
                   <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e2b74b', marginTop: '6px', boxShadow: '0 0 10px #e2b74b' }} />
                   <div style={{ flex: 1 }}>
                     <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#2b1d0f' }}>Premium Feature Highlight {i}</h5>
                     <span style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>Detailed explanation of this capability, emphasizing its high-end integration and business impact.</span>
                   </div>
                 </motion.li>
               ))}
             </ul>
          </div>
        </div>

        {/* Right Column: High-end Image Placeholder */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            style={{ 
              flex: 1, 
              background: '#fdfbf2', 
              borderRadius: '32px', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8c6a21',
              border: '4px dashed rgba(226, 183, 75, 0.3)',
              position: 'relative'
            }}
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <ImageIcon size={100} style={{ marginBottom: '32px', opacity: 0.5 }} />
              <span style={{ fontSize: '24px', fontWeight: '700' }}>Stunning UI Dashboard Preview</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default SubComponentDetail;
