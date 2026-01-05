// src/components/Shared/FloatingContactWidget.jsx

import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaFacebookMessenger, FaComments, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  const contact = {
    phone: '+8801777678707', 
    whatsapp: '8801777678707', 
    messengerPage: 'abdur.rahman.36807', 
    
    // Professional welcome messages
    whatsappWelcome: 'Hello! 👋 Welcome to ScholarStream.\nI need help with scholarship applications and guidance. Please assist me.',
    messengerWelcome: 'Hi there! 👋 I am interested in scholarships on ScholarStream. Can you guide me?',
  };

  // Secure URL builders
  const openWhatsApp = () => {
    const message = encodeURIComponent(contact.whatsappWelcome);
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const openCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const openMessenger = () => {
    window.open(`https://m.me/${contact.messengerPage}?text=${encodeURIComponent(contact.messengerWelcome)}`, '_blank', 'noopener,noreferrer');
  };

  const channels = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-2xl" />,
      action: openWhatsApp,
      colors: 'from-green-500 to-emerald-600',
      hover: 'hover:from-green-600 hover:to-emerald-700',
      shadow: 'shadow-green-500/40',
      glow: 'from-green-400/60',
    },
    {
      name: 'Call Directly',
      icon: <FaPhoneAlt className="text-2xl" />,
      action: openCall,
      colors: 'from-blue-500 to-cyan-600',
      hover: 'hover:from-blue-600 hover:to-cyan-700',
      shadow: 'shadow-blue-500/40',
      glow: 'from-blue-400/60',
    },
    {
      name: 'Facebook Messenger',
      icon: <FaFacebookMessenger className="text-2xl" />,
      action: openMessenger,
      colors: 'from-indigo-500 to-purple-600',
      hover: 'hover:from-indigo-600 hover:to-purple-700',
      shadow: 'shadow-indigo-500/40',
      glow: 'from-indigo-400/60',
    },
  ];

  return (
    <>
      {/* Floating Widget - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Contact Buttons - Animated Slide Up */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
              className="flex flex-col-reverse gap-4"
            >
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Tooltip */}
                  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300">
                    <div className="bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap shadow-2xl border border-gray-800">
                      {channel.name}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1">
                        <div className="w-0 h-0 border-8 border-transparent border-l-gray-900"></div>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={channel.action}
                    aria-label={`Contact via ${channel.name}`}
                    className={`
                      relative w-16 h-16 rounded-3xl
                      bg-gradient-to-br ${channel.colors} ${channel.hover}
                      text-white shadow-2xl ${channel.shadow}
                      flex items-center justify-center
                      transition-all duration-500 ease-out
                      hover:scale-110 hover:rotate-3 active:scale-95
                      overflow-hidden
                    `}
                  >
                    {/* Inner Glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${channel.glow} blur-xl opacity-60 group-hover:opacity-90 transition-opacity`}></div>

                    {/* Icon */}
                    <span className="relative z-10 drop-shadow-md">{channel.icon}</span>

                    {/* Ripple Pulse */}
                    <span className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-ping opacity-75"></span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          className={`
            relative w-20 h-20 rounded-full
            bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
            text-white shadow-2xl shadow-purple-500/50
            flex items-center justify-center
            transition-all duration-500
            hover:shadow-purple-600/70
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
          aria-label="Open contact options"
        >
          {/* Premium Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/70 via-purple-500/70 to-pink-500/70 blur-2xl animate-pulse"></div>

          {/* Icon */}
          <span className="relative z-10 text-3xl drop-shadow-lg">
            {isOpen ? <FaTimes /> : <FaComments />}
          </span>

          {/* Live Notification Badge */}
          {!isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce"
            >
              3
            </motion.span>
          )}

          {/* Subtle Ripple */}
          <span className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></span>
        </motion.button>

        {/* Optional Help Text (appears briefly) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-24 right-0 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap shadow-2xl pointer-events-none"
          >
            Need help? We're here! 💬
            <div className="absolute bottom-0 right-8 translate-y-full">
              <div className="w-0 h-0 border-8 border-transparent border-t-gray-900"></div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FloatingContactWidget;