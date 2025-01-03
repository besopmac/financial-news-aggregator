import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <Header />
      <NewsFeed />
    </main>
  );
}
