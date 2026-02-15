import React, { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mwpngaza", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("✅ Message sent successfully!");
      form.reset(); // clear form
    } else {
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div className="Contact" id="contact">
      <h1>Open for Discussion</h1>
      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
          {status && <p>{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
