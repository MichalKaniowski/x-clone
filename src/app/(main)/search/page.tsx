import { SearchResults } from "@/components/search-results";
import { Card, CardHeader, CardTitle } from "@/components/ui/primitives/card";

interface SearchPageProps {
  searchParams: { q: string };
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
  const q = (await searchParams).q;

  return {
    title: `Search results for "${q}"`,
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = (await searchParams).q;

  return (
    <div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-xl">
            Search results for &quot;{q}&quot;
          </CardTitle>
        </CardHeader>
      </Card>

      <SearchResults query={q} />
    </div>
  );
}
