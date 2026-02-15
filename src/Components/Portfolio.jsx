import React from 'react'

const Portfolio = () => {
  return (
    <div className="Portfolio" id='portfolio'>
      <h1>Portfolio</h1>
      <div className="portfolio-grid">
        
        <div className="card">
          <img src="/Assets/portfolio1.png" alt="Project Image" />
          <div className="card-content">
            <h3>Global IT Solution</h3>
            <p>Global IT Solution is a modern React-based portfolio website showcasing innovative digital services and IT expertise.</p>
            <a href="https://global-it-nine.vercel.app" target="_blank" className="btn">View</a>
          </div>
        </div>

        <div className="card">
          <img src="/Assets/crud.png" alt="Project Image" />
          <div className="card-content">
            <h3>CRUD App</h3>
            <p>A simple CRUD application with Firebase integration to create, read, update, and delete data in real-time.</p>
            <a href="https://crud-chi-inky.vercel.app" target="_blank" className="btn">View</a>
          </div>
        </div>

        <div className="card">
          <img src="your-image.jpg" alt="Project Image" />
          <div className="card-content">
            <h3>Project Title</h3>
            <p>Short description about the project goes here. Keep it brief and clear.</p>
            <a href="#" className="btn">View</a>
          </div>
        </div>

        <div className="card">
          <img src="your-image.jpg" alt="Project Image" />
          <div className="card-content">
            <h3>Project Title</h3>
            <p>Short description about the project goes here. Keep it brief and clear.</p>
            <a href="#" className="btn">View</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Portfolio
