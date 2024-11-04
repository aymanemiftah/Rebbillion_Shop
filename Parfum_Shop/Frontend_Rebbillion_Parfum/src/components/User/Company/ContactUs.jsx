import { FaLinkedin, FaInstagram, FaFacebook, FaGithub, FaWhatsapp } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div className="w-full min-h-[500px] bg-gray-100 flex justify-center items-center py-8">
      <div className="w-4/5 max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Contact Information */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-center" style={{ animation: 'slidein-right 0.5s ease-in-out' }}>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Reach out to us via social media or WhatsApp for inquiries!
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.linkedin.com/in/aymane-miftah-4867aa2b6/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <FaLinkedin size={32} />
            </a>
            <a href="https://www.instagram.com/_aymane_m/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
              <FaInstagram size={32} />
            </a>
            <a href="https://web.facebook.com/ayman.gb.92505" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
              <FaFacebook size={32} />
            </a>
            <a href="https://github.com/aymanemiftah" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
              <FaGithub size={32} />
            </a>
          </div>

          {/* WhatsApp Section */}
          <div className="flex items-center justify-center text-gray-800">
            <FaWhatsapp size={24} className="mr-2 text-green-500" />
            <p className="text-lg font-medium">WhatsApp: +212 656-905436</p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2" style={{ animation: 'slidein-left 0.5s ease-in-out' }}>
          <img
            src="https://www.mesayou.ma/wp-content/uploads/2022/09/contact-1.jpg" // Replace with actual image URL
            alt="Contact Us"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
