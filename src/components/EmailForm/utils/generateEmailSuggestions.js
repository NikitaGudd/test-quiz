export const generateEmailSuggestions = (email, domains) => {
  if (!email || email.includes("@")) {
    return [];
  }

  return domains.map((domain) => `${email}${domain}`);
};
