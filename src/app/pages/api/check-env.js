export default function handler(req, res) {
    res.status(200).json({
      AUTH0_SECRET: process.env.AUTH0_SECRET,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    });
  }
  