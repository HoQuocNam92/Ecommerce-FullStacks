import { Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-8">
      {/* Call To Us */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-700 text-white p-3 rounded-full">
            <Phone size={20} />
          </div>
          <h3 className="font-semibold text-lg">Call To Us</h3>
        </div>
        <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
        <p className="mt-2 text-gray-800 font-medium">Phone: +8801611112222</p>
      </div>

      <hr className="border-gray-300" />

      {/* Write To Us */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-700 text-white p-3 rounded-full">
            <Mail size={20} />
          </div>
          <h3 className="font-semibold text-lg">Write To Us</h3>
        </div>
        <p className="text-gray-600">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="mt-2 text-gray-800">Emails: customer@exclusive.com</p>
        <p className="text-gray-800">Emails: support@exclusive.com</p>
      </div>
    </div>
  );
}
