import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sender_name, question_text, reveal_text, image_url, expires_at } = req.body;

    if (!sender_name || !question_text || !reveal_text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const slug = Math.random().toString(36).substring(2, 10);

    const { data, error } = await supabase.from("cards").insert([
      { slug, sender_name, question_text, reveal_text, image_url, expires_at }
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ url: `${process.env.BASE_URL}/v/${slug}` });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
}
