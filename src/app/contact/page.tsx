import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Djerba Stays about a property or a stay.",
};

export default function ContactPage() {
  const whatsappLink = buildWhatsAppLink({ propertyName: "a stay" });
  const linkClasses = "flex items-center gap-3 rounded-md border border-djerba/15 px-5 py-4 text-sm font-medium text-ink hover:bg-sand";

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <section className="container-page max-w-xl">
          <p className="hand-annotation">say hello</p>
          <h1 className="mt-2 text-display-sm text-ink">Get in touch</h1>
          <p className="mt-4 text-base text-ink/70">
            Have a question about a property, or looking for something specific? Reach out directly and we&apos;ll get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <MessageCircle size={18} className="text-djerba" />
              Message us on WhatsApp
            </a>
            <a href="mailto:hello@djerbastays.com" className={linkClasses}>
              <Mail size={18} className="text-djerba" />
              hello@djerbastays.com
            </a>
            <a href="tel:+21600000000" className={linkClasses}>
              <Phone size={18} className="text-djerba" />
              +216 00 000 000
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}