import { useContent } from "@/shared/i18n";

export default function NewsletterIntro() {
  const { footer } = useContent();
  return (
    <>
      <h4>{footer.newsletterTitle}</h4>
      <p>{footer.newsletterText}</p>
    </>
  );
}
