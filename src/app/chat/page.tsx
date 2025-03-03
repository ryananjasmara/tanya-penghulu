import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { KNOWLEDGE_QUERY_KEY, fetchKnowledges } from "@/services/queries";
import { ChatClient } from "@/components/chat";

export default async function ChatPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: KNOWLEDGE_QUERY_KEY,
    queryFn: () => fetchKnowledges({ limit: 1000 }),
    staleTime: 3600 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChatClient />
    </HydrationBoundary>
  );
}
