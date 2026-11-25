import FooterCells from "@/components/layout/footer/footer-cells.layout.tsx";
import Container from "@/shared/ui/container.ui.tsx";

export default function FooterMain() {
  return (
    <footer>
      <Container className="foot">
        <FooterCells />
      </Container>
    </footer>
  );
}
