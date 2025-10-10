import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { orderAPI } from '../api/orderAPI';
import RazorpayCheckout from 'react-native-razorpay';

const CheckoutScreen = ({ navigation }) => {
  const { getCartSummary, clearCart } = useCart();
  const summary = getCartSummary();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode || !shippingAddress.phone) {
      Alert.alert('Error', 'Please fill all shipping address fields');
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        shippingAddress,
        paymentMethod: 'razorpay',
        totalAmount: summary.total
      };

      const response = await orderAPI.createOrder(orderData);

      const options = {
        description: 'Purchase from Sarvin',
        currency: 'INR',
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: response.order.razorpayOrderId ? response.razorpayAmount : summary.total * 100,
        name: 'Sarvin',
        order_id: response.order.razorpayOrderId,
        prefill: {
          name: '',
          contact: shippingAddress.phone
        },
        theme: { color: '#0066cc' }
      };

      RazorpayCheckout.open(options).then(async (data) => {
        try {
          await orderAPI.verifyPayment({
            orderId: response.order._id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_signature: data.razorpay_signature
          });

          await clearCart();
          Alert.alert('Success', 'Order placed successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('OrdersTab') }
          ]);
        } catch (error) {
          Alert.alert('Error', 'Payment verification failed');
        }
      }).catch((error) => {
        Alert.alert('Payment Failed', error.description || 'Payment was cancelled');
      });

    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', error.message || 'Failed to process checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={shippingAddress.street}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, street: text })}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingAddress.city}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, city: text })}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={shippingAddress.state}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, state: text })}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={shippingAddress.pincode}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, pincode: text })}
          keyboardType="numeric"
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={shippingAddress.phone}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, phone: text })}
          keyboardType="phone-pad"
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>₹{summary.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping:</Text>
          <Text style={styles.summaryValue}>
            {summary.shipping === 0 ? 'FREE' : `₹${summary.shipping.toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (GST):</Text>
          <Text style={styles.summaryValue}>₹{summary.tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{summary.total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.checkoutButton, loading && styles.buttonDisabled]}
        onPress={handleCheckout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  checkoutButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
