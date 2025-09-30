import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaEye, FaEyeSlash, FaExpand, FaCompress } from 'react-icons/fa';
import './ResumeViewer.css';

const ResumeViewer = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const iframeRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Daivik_Purani_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="resume-viewer-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={`resume-viewer-modal ${isFullscreen ? 'fullscreen' : ''}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="resume-viewer-header">
              <div className="resume-viewer-title">
                <h3>Daivik Purani - Resume</h3>
                <span className="resume-viewer-subtitle">Software Engineer @ AWS</span>
              </div>
              
              <div className="resume-viewer-controls">
                <motion.button
                  className="control-btn"
                  onClick={() => setShowControls(!showControls)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={showControls ? "Hide Controls" : "Show Controls"}
                >
                  {showControls ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
                
                <motion.button
                  className="control-btn"
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </motion.button>
                
                <motion.button
                  className="control-btn download-btn"
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Download Resume"
                >
                  <FaDownload />
                </motion.button>
                
                <motion.button
                  className="control-btn close-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <FaTimes />
                </motion.button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="resume-viewer-content">
              <iframe
                ref={iframeRef}
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                className="resume-pdf-iframe"
                title="Resume PDF Viewer"
                onLoad={() => {
                  // Hide PDF toolbar for cleaner look
                  const iframe = iframeRef.current;
                  if (iframe) {
                    iframe.contentWindow.postMessage({
                      type: 'hide-toolbar'
                    }, '*');
                  }
                }}
              />
            </div>

            {/* Footer Controls */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  className="resume-viewer-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="resume-viewer-info">
                    <span>📄 PDF Resume</span>
                    <span>•</span>
                    <span>Last Updated: {new Date().toLocaleDateString()}</span>
                  </div>
                  
                  <div className="resume-viewer-actions">
                    <motion.button
                      className="action-btn secondary"
                      onClick={handleDownload}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaDownload />
                      Download PDF
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeViewer;



