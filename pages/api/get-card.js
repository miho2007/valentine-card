// pages/api/get-card.js
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return res.status(404).json({ error: "Card not found" });

  const expired = data.expires_at && new Date(data.expires_at) < new Date();

  res.status(200).json({ ...data, expired });
}
