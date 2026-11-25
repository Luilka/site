import FooterCells from "@/components/layout/footer/footer-cells.tsx";
import Container from "@/shared/ui/container.tsx";

export default function FooterMain() {
  return (
    <footer>
      <Container className="foot">
        <FooterCells />
      </Container>
    </footer>
  );
}
