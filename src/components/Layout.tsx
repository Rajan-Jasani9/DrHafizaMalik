import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScientificBackground } from "@/components/ScientificBackground";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-screen flex-col">
    <ScientificBackground />
    <Header />
    <main className="relative z-10 flex-1">{children}</main>
    <div className="relative z-10">
      <Footer />
    </div>
  </div>
);
