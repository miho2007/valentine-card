// pages/api/envtest.js
export default function handler(req, res) {
  res.status(200).json({
    supabaseKeyLoaded: !!process.env.SUPABASE_SERVICE_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL
  });
}
