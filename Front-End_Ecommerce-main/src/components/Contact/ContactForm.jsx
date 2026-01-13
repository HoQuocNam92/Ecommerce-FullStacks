export default function ContactForm() {
  return (
    <form className="bg-white p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Your Name *"
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="email"
          placeholder="Your Email *"
          className=" p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="tel"
          placeholder="Your Phone *"
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <textarea
        rows="6"
        placeholder="Your Message"
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 transition text-white px-6 py-3 rounded"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
