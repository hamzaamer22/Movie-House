// pages/help/[...slug].js
import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Help Page</h1>
      {slug && slug.length > 0 ? <p>Section: {slug.join('/')}</p> : <p>General Help</p>}
    </div>
  );
}
