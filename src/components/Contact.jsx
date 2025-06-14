import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const CustomAnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.5,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="title-font flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              style={{ fontFamily: '"HVD", cursive' }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

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
          style={{ color: '#fff' }}
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
  const quickMessageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    quickMessage: "",
    quickEmail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    emailjs.init("7E85Be-mzfn5NmnlF");
  }, []);

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
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus("error_empty");
      setTimeout(() => setSubmitStatus(""), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error_invalid_email");
      setTimeout(() => setSubmitStatus(""), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending main form with:", {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      });

      await emailjs.send(
        "service_bqzf4o6",
        "template_u8gou5r",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        }
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", quickMessage: "", quickEmail: "" });
    } catch (error) {
      console.error("EmailJS error:", error.text || error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  const handleQuickMessageSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quickMessage.trim()) {
      setSubmitStatus("error_empty");
      setTimeout(() => setSubmitStatus(""), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const quickEmail = formData.quickEmail.trim();
    if (quickEmail && !emailRegex.test(quickEmail)) {
      setSubmitStatus("error_invalid_email");
      setTimeout(() => setSubmitStatus(""), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending quick message with:", {
        from_name: "Anonymous",
        from_email: "ashishproject78782@gmail.com",
        subject: "Quick Message from Website",
        message: formData.quickMessage,
        quick_email: quickEmail || "Not provided",
        reply_to: quickEmail || "ashishproject78782@gmail.com",
      });

      await emailjs.send(
        "service_bqzf4o6",
        "template_u8gou5r",
        {
          from_name: "Anonymous",
          from_email: "ashishproject78782@gmail.com",
          subject: "Quick Message from Website",
          message: formData.quickMessage,
          quick_email: quickEmail || "Not provided",
          reply_to: quickEmail || "ashishproject78782@gmail.com",
        }
      );
      setSubmitStatus("success_quick");
      setFormData(prev => ({ ...prev, quickMessage: "", quickEmail: "" }));
    } catch (error) {
      console.error("EmailJS Quick Message error:", error.text || error);
      setSubmitStatus("error_quick");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 3000);
    }
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
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="title-font relative mb-8 flex flex-col items-center gap-5">
          <CustomAnimatedTitle
            title="Let's Catch Up? 🍵"
            containerClass="text-center title-font"
            style={{ marginTop: "-30px", fontFamily: 'HVD' }}
          />
        </div>

        <motion.div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="max-w-6xl mx-auto relative"
          style={{ position: "relative" }}
        >
          <div 
            className="relative p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-lg border"
            style={{
              backgroundColor: "#2c2c2c",
              borderColor: "#007BFF"
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <motion.div
                  variants={inputVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  <p className="text-lg leading-relaxed" style={{ color: '#aaa' }}>
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
                      className="flex items-center space-x-4 p-4 rounded-xl border"
                      style={{
                        backgroundColor: "#1C1C1C",
                        borderColor: "#444",
                        color: '#fff'
                      }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} style={{ color: "#00E6E6" }} className="hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          <p style={{ color: "#aaa" }}>{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6"
                >
                  <motion.div
                    variants={inputVariants}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium mb-2 text-white">
                      Feeling lazy? Drop a quick message!
                    </label>
                    <form ref={quickMessageRef} onSubmit={handleQuickMessageSubmit}>
                      <div className="space-y-4">
                        <input
                          type="email"
                          name="quickEmail"
                          value={formData.quickEmail}
                          onChange={handleInputChange}
                          placeholder="Your email (optional)"
                          className="w-full px-4 py-3 rounded-xl border bg-[#1C1C1C] border-[#444] text-white"
                        />
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            name="quickMessage"
                            value={formData.quickMessage}
                            onChange={handleInputChange}
                            placeholder="Quick message..."
                            className="w-full px-4 py-3 rounded-xl border bg-[#1C1C1C] border-[#444] text-white"
                          />
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            variants={inputVariants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-3 rounded-xl border bg-[#1C1C1C] border-[#444] text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </form>
                    {submitStatus === "error_empty" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C] mt-4"
                      >
                        Please enter a message before sending!
                      </motion.div>
                    )}
                    {submitStatus === "error_invalid_email" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C] mt-4"
                      >
                        Please enter a valid email address!
                      </motion.div>
                    )}
                    {submitStatus === "success_quick" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl text-center font-medium text-[#00E6E6] border border-[#00E6E6] bg-[#1C1C1C] mt-4"
                      >
                        Quick message sent successfully!
                      </motion.div>
                    )}
                    {submitStatus === "error_quick" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C] mt-4"
                      >
                        Failed to send quick message. Please try again.
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>

              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
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
                      <label className="block text-sm font-medium mb-2 text-white">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl border bg-[#1C1C1C] border-[#444] text-white"
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    variants={inputVariants}
                    custom={7}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-xl border bg-[#1C1C1C] border-[#444] text-white resize-none"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    variants={inputVariants}
                    custom={8}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 animated-gradient"
                    style={{ 
                      backgroundImage: 'linear-gradient(135deg, #FF4C29, #00E6E6)',
                     }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 rounded-full animate-spin border-white border-t-transparent" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <span>Let’s Catch Up?</span>
                    )}
                  </motion.button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center font-medium text-[#00E6E6] border border-[#00E6E6] bg-[#1C1C1C]"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C]"
                    >
                      Failed to send message. Please try again later.
                    </motion.div>
                  )}
                  {submitStatus === "error_empty" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C]"
                    >
                      Please fill out all required fields!
                    </motion.div>
                  )}
                  {submitStatus === "error_invalid_email" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center font-medium text-[#FF4C29] border border-[#FF4C29] bg-[#1C1C1C]"
                    >
                      Please enter a valid email address!
                    </motion.div>
                  )}
                </div>
              </motion.form>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
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
                className="px-6 py-3 rounded-full font-medium border"
                style={{
                  backgroundColor: "#2c2c2c",
                  borderColor: "#444",
                  color: "#fff"
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