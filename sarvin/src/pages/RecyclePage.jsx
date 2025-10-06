import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, CircleCheck as CheckCircle, User, Building2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import serviceRequestAPI from '../api/serviceRequestAPI';
import { useToast } from '../contexts/ToastContext';

const RecyclePage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    ewasteItems: '',
    pickupDate: '',
    companyName: '',
    gstNumber: '',
    estimatedQuantity: ''
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
      const result = await serviceRequestAPI.recycle.create({ ...formData, userType });

      if (result.success) {
        showToast('Recycle request submitted successfully! We will schedule a pickup soon.', 'success');
        setSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit recycle request');
      }
    } catch (error) {
      console.error('Error submitting recycle request:', error);
      showToast(error.response?.data?.message || 'Failed to submit request. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recycle Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for choosing to recycle responsibly. Our team will contact you to schedule a pickup.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-4">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Recycle E-Waste</h1>
            <p className="text-gray-600">Choose your recycling category to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType('individual')}
              className="group relative overflow-hidden rounded-xl bg-white p-8 text-left shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-gray-200 hover:border-green-500"
            >
              <div className="mb-6 inline-block rounded-full bg-green-100 p-4">
                <User className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Individual</h3>
              <p className="text-gray-600 mb-4">
                For personal e-waste disposal. Schedule a pickup for your old electronics.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">✓</span>
                  Free pickup service
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">✓</span>
                  Certified disposal
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-600">✓</span>
                  Environmental contribution
                </li>
              </ul>
            </button>

            <button
              onClick={() => setUserType('corporate')}
              className="group relative overflow-hidden rounded-xl bg-white p-8 text-left shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-gray-200 hover:border-blue-500"
            >
              <div className="mb-6 inline-block rounded-full bg-blue-100 p-4">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Corporate</h3>
              <p className="text-gray-600 mb-4">
                For businesses and organizations. Bulk e-waste management solutions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2 text-blue-600">✓</span>
                  Bulk pickup service
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-blue-600">✓</span>
                  Compliance certificates
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-blue-600">✓</span>
                  Data destruction services
                </li>
              </ul>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-4">
            <Recycle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'individual' ? 'Individual' : 'Corporate'} E-Waste Recycling
          </h1>
          <p className="text-gray-600">Schedule a pickup for responsible e-waste disposal</p>
          <button
            onClick={() => setUserType('')}
            className="mt-2 text-sm text-green-600 hover:text-green-700"
          >
            ← Change category
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {userType === 'corporate' ? 'Organization' : 'Contact'} Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userType === 'corporate' && (
                  <>
                    <Input
                      label="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Enter company name"
                    />
                    <Input
                      label="GST Number"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </>
                )}
                <Input
                  label={userType === 'corporate' ? 'Contact Person Name' : 'Full Name'}
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
                {userType === 'corporate' && (
                  <Input
                    label="Estimated Quantity"
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    placeholder="e.g., 50 items, 100 kg"
                  />
                )}
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter complete pickup address with landmark..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-Waste Items <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="ewasteItems"
                    value={formData.ewasteItems}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="List the items you want to dispose (e.g., 2 old laptops, 3 mobile phones, 1 printer...)"
                  ></textarea>
                </div>
                <Input
                  label="Preferred Pickup Date"
                  name="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Why Recycle with Us?</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Certified and environmentally responsible disposal</li>
                <li>• Free pickup service at your doorstep</li>
                <li>• Contribution to a cleaner environment</li>
                {userType === 'corporate' && <li>• Compliance certificates for your organization</li>}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUserType('')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Schedule Pickup'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecyclePage;
