import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const StaggeredText = ({ title, containerClass }) => {
  const titleRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  return (
    <motion.div
      ref={titleRef}
      className={containerClass}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {title.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
        >
          {word} 
        </motion.span>
      ))}
    </motion.div>
  );
};

const Contact = () => {
  const frameRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -5;
    const rotateY = ((xPos - centerX) / centerX) * 5;

    // Using CSS transforms instead of GSAP for React compatibility
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.transition = "transform 0.3s ease-out";
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      element.style.transition = "transform 0.3s ease-out";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    }, 2000);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div 
      id="contact"
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #000000 0%, #1C1C1C 50%, #000000 100%)`
      }}
    >

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, #007BFF 0%, transparent 70%)`,
            top: '10%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, #00E6E6 0%, transparent 70%)`,
            top: '60%',
            right: '10%',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, #FF4C29 0%, transparent 70%)`,
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 7s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <StaggeredText
          title="Let's Catch Up?"
          containerClass="text-6xl md:text-8xl font-bold text-center mb-16 bg-gradient-to-r from-black via-blue-500 to-black bg-clip-text text-transparent"
          style={{ color: '#fff' }}
        />

          {/* Contact Form Container */}
          <motion.div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="max-w-6xl mx-auto relative"
          >
            <div 
              className="relative p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-lg border border-opacity-20"
              style={{
                background: `linear-gradient(135deg, rgba(28, 28, 28, 0.9) 0%, rgba(0, 123, 255, 0.1) 50%, rgba(0, 230, 230, 0.1) 100%)`,
                borderColor: '#007BFF'
              }}
            >

              {/* Decorative Elements */}
              <div 
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-60 blur-sm"
                style={{ background: `linear-gradient(45deg, #007BFF, #00E6E6)` }}
              />
              
              <div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-40 blur-sm"
                style={{ background: `linear-gradient(45deg, #FF4C29, #007BFF)` }}
              />
              
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, #00E6E6 0%, transparent 70%)` }}
              />

              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >

                {/* Left Side - Contact Info */}
                <div className="space-y-8">
                  <motion.div
                    variants={inputVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                  >
                    
                    <StaggeredText
                      title="Get in Touch"
                      containerClass="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 text-transparent bg-clip-text"
                    />
                    
                    <p 
                      className="text-lg leading-relaxed"
                      style={{ color: '#6C757D' }}
                    >
                      Ready to transform your story into something extraordinary? Let's create magic together.
                    </p>
                    
                  </motion.div>

                  <div className="space-y-6">
                  {[
                    { icon: "📧", label: "Email", value: "devarshi@devkadose.com" },
                    { icon: "📱", label: "Phone", value: "+91 9978440857" },
                    {
                      icon: "🌍",
                      label: "LinkedIn",
                      value: "Devarshi Patel (DEVkaDOSE)",
                      href: "https://www.linkedin.com/in/devarshi-patel-devkadose/", 
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={inputVariants}
                      custom={index + 1}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: `linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 230, 230, 0.1) 100%)`,
                        border: `1px solid rgba(0, 123, 255, 0.2)`
                      }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p 
                          className="font-semibold"
                          style={{ color: '#fff' }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className="hover:underline transition-colors duration-300"
                            style={{ color: '#00E6E6' }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p style={{ color: '#6C757D' }}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                </div>

                {/* Right Side - Form */}
                <div className="space-y-6">
                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { name: "subject", label: "Subject", type: "text", placeholder: "Let's collaborate!" },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      variants={inputVariants}
                      custom={index + 4}
                      initial="hidden"
                      animate="visible"
                    >
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: '#fff' }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105"
                        style={{
                          background: `linear-gradient(135deg, rgba(28, 28, 28, 0.8) 0%, rgba(0, 123, 255, 0.1) 100%)`,
                          borderColor: '#007BFF',
                          color: '#fff'
                        }}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    variants={inputVariants}
                    custom={7}
                    initial="hidden"
                    animate="visible"
                  >
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: '#fff' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-105 resize-none"
                      style={{
                        background: `linear-gradient(135deg, rgba(28, 28, 28, 0.8) 0%, rgba(0, 123, 255, 0.1) 100%)`,
                        borderColor: '#007BFF',
                        color: '#fff'
                      }}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    variants={inputVariants}
                    custom={8}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, #007BFF 0%, #00E6E6 50%, #FF4C29 100%)`,
                      color: '#fff'
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div 
                          className="w-5 h-5 border-2 rounded-full animate-spin"
                          style={{ 
                            borderColor: '#fff',
                            borderTopColor: 'transparent'
                          }}
                        />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center font-medium"
                      style={{
                        background: `linear-gradient(135deg, rgba(0, 230, 230, 0.2) 0%, rgba(0, 123, 255, 0.2) 100%)`,
                        color: '#00E6E6',
                        border: `1px solid #00E6E6`
                      }}
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </div>
              </motion.form>

            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-16"
          >
            <h3 
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: '#fff' }}
            >
              Ready to turn your story into something extraordinary?
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {["Speaking", "Consulting", "Storytelling", "Brand Strategy"].map((service, index) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 123, 255, 0.2) 0%, rgba(0, 230, 230, 0.2) 100%)`,
                    border: `1px solid #007BFF`,
                    color: '#fff'
                  }}
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

    </div>
  );
};

export default Contact;