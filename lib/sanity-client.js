import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "e2rrx1ug",
  dataset: "production",
  apiVersion: "2022-03-22",
  token:
    "sko8FRRkzG7uAP2FvQH9FiJilN6mcqWQGhymYX36XoeE4Aw9JTaTUBOj1tLRioMTM2HNZ7DVcCwQlJpPXrrdB3lpRrSKOxA6rcWJva9tnWPnhvecmU6IkLCk84n8372xtbBrUjVc4Y63H6LhKw5uGSJFi6fQj70yYqN4GyXsBLLusByx7uI3",
  useCdn: false,
});
