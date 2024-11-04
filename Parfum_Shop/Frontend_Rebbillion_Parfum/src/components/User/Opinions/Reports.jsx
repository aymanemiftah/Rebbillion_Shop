import React, { useContext, useState } from "react";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

export default function Reports() {
  const { CreateReport } = useContext(DonnerContext);
  const { user } = useContext(AuthContext);
  const [report, setReport] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reports = { user_id: user.id, issue_description: report };
    await CreateReport(reports);
  };

  return (
    <div className="w-full min-h-[400px] bg-gray-100 flex justify-center items-center py-8">
      <div className="w-4/5 max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Send Us a Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Field */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder={user.name}
              disabled
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setReport(e.target.value)}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-950 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Send Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
