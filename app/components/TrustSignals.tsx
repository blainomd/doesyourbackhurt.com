import { siteConfig } from "@/site.config";

export function TrustSignals() {
  return (
    <section className="py-10 border-t border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: siteConfig.primaryColor }}>JE</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Reviewed by Josh Emdur, DO</p>
              <p className="text-xs text-gray-500">Board-certified internal medicine. Licensed in all 50 states.{" "}
                <a href="https://altru.care" className="underline" style={{ color: siteConfig.primaryColor }} target="_blank" rel="noopener noreferrer">altru.care</a>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Last reviewed: April 2025</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "NIH / NIAMS", href: "https://www.niams.nih.gov/health-topics/back-pain" },
              { label: "APTA", href: "https://www.choosept.com/guide/physical-therapy-guide-to-low-back-pain" },
              { label: "AAOS OrthoInfo", href: "https://orthoinfo.aaos.org/en/diseases--conditions/low-back-pain/" },
              { label: "Mayo Clinic", href: "https://www.mayoclinic.org/diseases-conditions/back-pain/symptoms-causes/syc-20369906" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Medical disclaimer:</strong> The information on this website is for general educational purposes only and does not constitute medical advice, diagnosis, or treatment. It does not replace a consultation with a qualified healthcare provider. If you are experiencing a medical emergency, call 911 immediately.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Related resources:</span>
          <a href="https://hippain.help" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-800" style={{ color: siteConfig.primaryColor }}>
            Distinguishing back pain from hip pain
          </a>
          <a href="https://hsaletter.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-800" style={{ color: siteConfig.primaryColor }}>
            Is physical therapy for back pain HSA-eligible?
          </a>
          <a href="https://surgeonvalue.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-800" style={{ color: siteConfig.primaryColor }}>
            Find a spine specialist near you
          </a>
        </div>
      </div>
    </section>
  );
}
