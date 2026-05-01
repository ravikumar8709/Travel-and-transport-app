// Edit this file to customize the business info across the entire site.
export const site = {
  name: "KALADHAR ROADWAYS",
  tagline: "Travel & Transport Services",
  description:
    "शहर और शहर के बाहर कैब बुकिंग और माल परिवहन सेवाएं। सुरक्षित ड्राइवर, अच्छी तरह से मेंटेन की गई गाड़ियां, पारदर्शी कीमतें और 24/7 सपोर्ट।",
  phone: "+91 9835497913",
  phoneRaw: "+919835497913",
  whatsapp: "919835497913", // no + sign for wa.me link
  email: "sangitakumarikaladhar@gmail.com",
  address: "AALU MANDI, BORING ROAD, TAJPUR, SAMASTIPUR 848130",
  hours: "24/7 — every day",
  mapEmbed:
    "https://maps.app.goo.gl/zXXETCY8XxDrnAnw8?g_st=ac",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  apiBaseUrl:
    (typeof window !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
    (import.meta as any).env?.VITE_API_BASE_URL ||
    "http://localhost:5000/api",
};
