"use client";

import { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, message } = form;
    const mailto = `mailto:ivanna.socarras@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <span className="contact__label">CONTACT</span>
        <h2 className="contact__title">Get in Touch</h2>
        <div className="contact__grid">

          {/* ── Left column ── */}
          <div className="contact__left">

            {/* Location */}
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <p className="contact__info-label">Location</p>
                <p className="contact__info-value">Orlando, FL</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <p className="contact__info-label">Email</p>
                <a href="mailto:ivanna.socarras@gmail.com" className="contact__info-value contact__info-link">
                  ivanna.socarras@gmail.com
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="contact__info-card">
              <div className="contact__social-block">
                <p className="contact__social-heading">Connect With Me</p>
                <div className="contact__socials">
                  <a href="https://linkedin.com/in/ivannasocarras" target="_blank" rel="noreferrer"
                    aria-label="LinkedIn" className="contact__social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/ivannasocarras" target="_blank" rel="noreferrer"
                    aria-label="GitHub" className="contact__social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                  <a href="mailto:ivanna.socarras@gmail.com"
                    aria-label="Email" className="contact__social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick response */}
            <div className="contact__info-card contact__info-card--accent">
              <span className="contact__response-emoji">💡</span>
              <div>
                <p className="contact__info-label" style={{ color: "var(--highlight)" }}>Quick Response</p>
                <p className="contact__info-value">
                  I typically respond within 24 hours. Let&apos;s build something great together!
                </p>
              </div>
            </div>

          </div>

          {/* ── Right column: form ── */}
          <div className="contact__form-card">
            <h3 className="contact__form-title">Send Me a Message</h3>
            <p className="contact__form-sub">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__field-label">Full Name <span>*</span></label>
                <input
                  type="text"
                  required
                  className="contact__input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="contact__field">
                <label className="contact__field-label">Email <span>*</span></label>
                <input
                  type="email"
                  required
                  className="contact__input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="contact__field">
                <label className="contact__field-label">Message <span>*</span></label>
                <textarea
                  required
                  rows={6}
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="contact__submit">
                {sent ? "Opening email client…" : "Send Message"}
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
