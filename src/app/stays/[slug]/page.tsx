import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import VideoModal from "@/components/VideoModal";
import Amenities from "@/components/Amenities";
import InquiryForm from "@/components/InquiryForm";
import { getPropertyBySlug } from "@/lib/properties";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: property.name,
    description: property.shortDescription,
    openGraph: {
      title: property.name,
      description: property.shortDescription,
      images: [property.media.coverImage],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const hasVideo = property.media.videos.length > 0;
  const whatsappLink = buildWhatsAppLink({ propertyName: property.name });

  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="container-page">
          <p className="text-sm text-ink/50">{property.location}</p>
          <h1 className="mt-1 text-display-sm text-ink">{property.name}</h1>

          <div className="mt-8">
            <ImageGallery images={[property.media.coverImage, ...property.media.images]} propertyName={property.name} />
          </div>

          {hasVideo && (
            <div className="mt-6 max-w-2xl">
              <VideoModal videoUrl={property.media.videos[0]} posterUrl={property.media.coverImage} />
            </div>
          )}

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="space-y-10 md:col-span-2">
              <div>
                <h2 className="font-serif text-2xl text-ink">About this stay</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink/80">{property.description}</p>
              </div>

              <Amenities amenities={property.amenities} />
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-djerba/10 p-6">
                <p className="text-lg font-medium text-ink">
                  {property.price} TND <span className="text-sm font-normal text-ink/50">/ night</span>
                </p>
                <p className="mt-3 text-sm text-ink/60">
                  {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
                </p>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-md border border-djerba/20 px-5 py-3 text-sm font-medium text-djerba transition-colors hover:bg-djerba/5">
                  <MessageCircle size={16} />
                  Contact on WhatsApp
                </a>
              </div>

              <div className="rounded-lg border border-djerba/10 p-6">
                <InquiryForm propertyId={property.id} propertyName={property.name} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}