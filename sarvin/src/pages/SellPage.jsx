import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Smartphone, CircleCheck as CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const SellPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    problemDescription: '',
    accessories: '',
    purchaseYear: '',
    expectedPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit sell request');
      }

      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting sell request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your sell request. Our team will review your device details and contact you within 24-48 hours.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-4">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Device</h1>
          <p className="text-gray-600">Get instant cash for your old electronics. Fill in the details below.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                />
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Your complete address"
                />
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select device type</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Input
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Apple, Samsung, etc."
                />
                <Input
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="e.g., iPhone 12, Galaxy S21"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent - Like new</option>
                    <option value="good">Good - Minor signs of use</option>
                    <option value="fair">Fair - Visible wear and tear</option>
                    <option value="poor">Poor - Significant damage</option>
                  </select>
                </div>
                <Input
                  label="Purchase Year"
                  name="purchaseYear"
                  type="number"
                  value={formData.purchaseYear}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2022"
                  min="2000"
                  max={new Date().getFullYear()}
                />
                <Input
                  label="Expected Price (₹)"
                  name="expectedPrice"
                  type="number"
                  value={formData.expectedPrice}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Problem Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="problemDescription"
                    value={formData.problemDescription}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe any issues or problems with the device..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accessories Included
                  </label>
                  <textarea
                    name="accessories"
                    value={formData.accessories}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Original box, charger, earphones, case..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
