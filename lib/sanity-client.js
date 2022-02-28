import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "e2rrx1ug",
  dataset: "production",
  apiVersion: "2022-03-22",
  token: process.env.NEXT_PUBLIC_SANITY_CLIENT_TOKEN,
  useCdn: false,
});
