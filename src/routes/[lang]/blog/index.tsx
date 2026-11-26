import { PageFrame } from "@/components/patterns.tsx";
import { InfoSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Blog() {
  const { posts } = useContent();
  return (
    <PageFrame page="blog">
      <InfoSection items={posts} detail="blog" />
    </PageFrame>
  );
}
