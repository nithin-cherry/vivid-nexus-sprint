export const LINKS = {
  instagram:
    import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/vividnexus.in/",
  email: import.meta.env.VITE_CONTACT_EMAIL || "work@vividnexus.in",
};

export const instagramHref = LINKS.instagram;
export const emailHref = `mailto:${LINKS.email}`;