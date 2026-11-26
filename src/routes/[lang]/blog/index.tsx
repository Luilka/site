import { PageFrame } from "@/components/patterns.tsx";
import { InfoSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Blog() {
  const { pages, section, posts } = useContent();
  return (
    <PageFrame page="blog">
      <InfoSection title={pages.blog.title} description={section} items={posts} detail="blog" />
    </PageFrame>
  );
}
