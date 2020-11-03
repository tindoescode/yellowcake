import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Bản quyền bởi mCoaching {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  </div>
)
