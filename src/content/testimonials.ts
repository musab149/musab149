/**
 * testimonials.ts — client testimonials published on pixelpk.com, with the
 * attribution Pixelpk gives. Wording is unchanged; only stray spaces before
 * punctuation and one all-caps phrase were normalised. They are about working with
 * Pixelpk (the company), and are labelled that way on the site.
 * Switch off with flags.testimonials in site.ts.
 */

export const testimonials = [
  {
    quote:
      "I hired Pixelpk Technologies to develop both my company’s website and mobile application, and I am thoroughly impressed with the results. From start to finish, their team was the epitome of professionalism. They listened to my vision, provided expert guidance, and delivered a product that is both stunning and highly functional.",
    name: "Phares Abed",
    role: "CEO, Ai Tube",
  },
  {
    quote:
      "Pixelpk delivered great work. On time, always helpful and really professional. I’ve done more than 100 projects with Team Pixelpk. All are success deliveries and deployed and live.",
    name: "Alae Amraoui",
    role: "CEO, Empire Marketing",
  },
  {
    quote:
      "It has been a great pleasure working with Team Pixelpk on numerous projects. Quality of work & speed is what I like. I highly recommend his expertise in UI UX, Android & iOS, and other web developments.",
    name: "Mark Javed",
    role: "Founder, Redpanda Network",
  },
  {
    quote:
      "Working with Pixelpk was undoubtedly a great experience. Its team’s enthusiasm and diligence are commendable. In particular, their creativity is perfect, which is rarely found in anyone. I would also recommend other organizations to work with them.",
    name: "Abdullah Mudassir",
    role: "Director, Ummah College",
  },
] as const;

export const testimonialsSource = "https://pixelpk.com/";
