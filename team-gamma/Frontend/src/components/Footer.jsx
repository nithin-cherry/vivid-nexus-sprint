import React from "react";
import { Link } from "react-router-dom";
import { emailHref, LINKS } from "../config/links";

export default function Footer() {
  return (
    <footer className="vn-footer">
      <div className="vn-footer__inner">
        <Link to="/" className="vn-logo vn-logo--footer">
          Vivid<span>Nexus</span>
        </Link>

        <div className="vn-footer__links">
          <Link to="/">Home</Link>
          <a href="/#services">Services</a>
          <a href="/#rules">Terms</a>
          <a href={emailHref}>{LINKS.email}</a>
        </div>
      </div>

      <div className="vn-footer__bottom">
        © 2026 Vivid Nexus. All rights reserved.
      </div>
    </footer>
  );
}