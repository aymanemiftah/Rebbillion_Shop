export default function AboutUs() {
    return (
      <div className="w-full min-h-[600px] bg-gray-100 flex justify-center items-center py-12">
        <div className="w-4/5 max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Section: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://th.bing.com/th/id/OIP.Ji_dtIgzBpIznRBinsQQAwHaE8?rs=1&pid=ImgDetMain" // Replace with actual image URL
              alt="Rebbillion Perfumes"
              className="object-cover w-full h-full"
              style={{ animation: 'slidein-right 0.5s ease-in-out' }}
            />
          </div>
          
          {/* Right Section: Content */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center"  style={{ animation: 'slidein-left 0.5s ease-in-out' }}>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">About Rebbillion Perfumes</h2>
            <p className="text-gray-600 mb-6">
              Welcome to <strong>RebbillionPerfumes</strong>, your ultimate destination for luxury beauty products.
              We specialize in offering a wide range of exclusive perfumes, high-quality makeup, and beauty treatments 
              that cater to all your self-care needs.
            </p>
            <p className="text-gray-600 mb-6">
              Our collection includes top-tier <strong>perfumes</strong>, premium <strong>makeup</strong>, and specialized 
              <strong>Horses & Body</strong> and <strong>Facial Treatments</strong> designed to bring out your best self.
              Whether you're searching for your next signature scent or looking for the perfect skincare routine, we have you covered.
            </p>
            <p className="text-gray-600 mb-6">
              At RebbillionPerfumes, we believe in beauty beyond boundaries—experience elegance, confidence, and empowerment with every product we offer.
            </p>
          </div>
        </div>
      </div>
    );
  }
  