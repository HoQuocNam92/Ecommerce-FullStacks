export default function AboutStory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Text */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2015, Exclusive is South Asia’s premier online shopping
          marketplace with an active presence in Bangladesh. Supported by a wide
          range of tailored marketing, data, and service solutions, Exclusive
          has 10,500 sellers and 300 brands and serves 3 million customers
          across the region.
        </p>
        <p className="text-gray-700">
          Exclusive has more than 1 million products to offer, growing at a very
          fast rate. We offer a diverse assortment in categories ranging from
          consumer...
        </p>
      </div>

      {/* Image */}
      <img
        src="/images/portrait.png"
        alt="Our Story"
        className="rounded-lg shadow-lg w-full object-cover"
      />
    </div>
  );
}
