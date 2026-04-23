import { AuraBackground } from "@/components/AuraBackground";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-screen flex-col">
    <AuraBackground />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);
