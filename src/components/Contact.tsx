// Contact.tsx

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { toast } = useToast();

  // Form state (+ honeypot)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot (should stay empty)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Vite envs
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  // Validation (explicit + trimmed)
  const nameOK  = formData.name.trim().length >= 2;
  const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const msgOK   = formData.message.trim().length >= 20;
  const isFormValid = nameOK && emailOK && msgOK;

  const validateForm = () => {
    const next = { name: "", email: "", message: "" as string };
    if (!nameOK) next.name = "Name is required (min 2 characters)";
    if (!emailOK) next.email = "Please enter a valid email";
    if (!msgOK) next.message = "Message must be at least 20 characters long";
    setErrors(next);
    return !(next.name || next.email || next.message);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors && errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot (bots tend to fill hidden fields)
    if (formData.website) return;

    if (!validateForm()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast({
        title: "Email service misconfigured",
        description:
          "Missing EmailJS keys. Add VITE_EMAILJS_* to .env and restart the dev server.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          date: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY }
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/humera-naaz14/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/humera314",
      label: "GitHub",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },

  ];

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Get in Touch</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Ready to build something amazing together? Let&apos;s start a conversation.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="card-minimal space-y-6 relative z-10">
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white/10 border-white/20 focus:border-accent"
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/10 border-white/20 focus:border-accent"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message * (min 20 characters)
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-white/10 border-white/20 focus:border-accent min-h-[120px]"
                  placeholder="Tell me about your project or just say hello..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
                  <p className="text-xs text-foreground/60 ml-auto">
                    {formData.message.trim().length}/20
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              

              {/* Debug for env presence (don’t show keys) */}
              <p className="text-xs text-white/40">
                Email service: {SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY ? "ready" : "missing keys"}
              </p>
            </form>
          </motion.div>

          {/* Right column: contact info + socials + meme */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="card-minimal">
              <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-foreground/70">(425) 219-2592</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-foreground/70">nhumera43@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-minimal">
              <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Meme panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, scale: 1.05, filter: "blur(0px)" } : { opacity: 0 }}
              transition={{ duration: 6, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-md"
            >
              {/* subtle float loop */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* <img
                
                  src="public\images\certification.png" 
                  width={20}
                  height={30}

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <img
                  src="/meme01.jpeg"  // place the file under /public/meme01.jpeg

                  alt="Funny LinkedIn meme"
                  className="w-full h-auto object-cover"
                  draggable={false}
                /> */}
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;