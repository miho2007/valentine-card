import { useEffect, useState } from "react";
import CardPage from "../../components/CardPage";

export default function SlugPage({ slug }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      const res = await fetch(`/api/get-card?slug=${slug}`);
      const data = await res.json();
      setCard(data);
      setLoading(false);
    }
    fetchCard();
  }, [slug]);

  if (loading) return <p>Loading card...</p>;
  if (!card?.id) return <p>Card not found 😢</p>;

  return (
    <CardPage
      senderName={card.sender_name}
      questionText={card.question_text}
      revealText={card.reveal_text}
      imageUrls={card.image_urls || []}
    />
  );
}

export async function getServerSideProps(context) {
  return { props: { slug: context.params.slug } };
}
