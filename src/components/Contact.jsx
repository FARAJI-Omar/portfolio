import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    emailjs.sendForm(
      'service_864247p', // Replace with your EmailJS service ID
      'template_2e53bbn', // Replace with your EmailJS template ID
      formRef.current,
      'oVBYDbz8Kv9ZA9HG1' // Your public key
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text)
      setStatus('success')
      setLoading(false)
      formRef.current.reset()
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(''), 3000)
    })
    .catch((error) => {
      console.error('Email sending failed:', error.text)
      setStatus('error')
      setLoading(false)
      
      // Clear error message after 3 seconds
      setTimeout(() => setStatus(''), 3000)
    })
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-left">
        <h2>Do you need a web developer?</h2>
        <p>Looking to build a web/mobile app?</p>
        <p>Want to collaborate on a project?</p>
        <p>Need a professional website?</p>
        
        <p className="contact-cta">Let's turn your idea into reality — contact me.</p>
        
        <a href="mailto:farajomar99@gmail.com" className="contact-email">
          <span className="email-icon">✉</span>
          farajomar99@gmail.com
        </a>
      </div>
      
      <div className="contact-right">
        <h3>Get in Touch</h3>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="" name='name' required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="" name='email' required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="" name='subject' required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="" name='message' required></textarea>
          </div>
          
          {status === 'success' && (
            <div className="status-message success">
              ✓ Message sent successfully! I'll contact you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="status-message error">
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}
          
          <button type="submit" className="btn-send" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
