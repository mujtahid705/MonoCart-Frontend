"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { createOrder } from "@/redux/slices/ordersSlice";
import Image from "next/image";
import { toast } from "sonner";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  sameAsBilling: boolean;
  saveInfo: boolean;
}
export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cartItems,
    totalAmount,
    totalItems,
  } = useSelector((state: RootState) => state.cart);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    sameAsBilling: true,
    saveInfo: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/products");
      toast.error("Your cart is empty", {
        description: "Add some items to your cart before checkout.",
      });
    }
  }, [cartItems.length, router]);
  const shipping = 5.99;
  const tax = totalAmount * 0.05; // 5% tax
  const total = totalAmount + shipping + tax;
  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return !!(
          formData.address &&
          formData.city &&
          formData.state &&
          formData.zipCode
        );
      case 3:
        return !!(
          formData.cardNumber &&
          formData.expiryDate &&
          formData.cvv &&
          formData.cardholderName
        );
      default:
        return false;
    }
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsProcessing(true);
    try {
      const orderData = {
        totalAmount: total,
        order_items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      };
      const result = await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success("Order placed successfully!", {
        description: "You will receive a confirmation email shortly.",
      });
      router.push("/order-success");
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Order placement failed", {
        description: typeof error === "string" ? error : "Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shopping
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
          <div className="flex items-center space-x-4">
            {[
              { step: 1, label: "Customer Info", icon: User },
              { step: 2, label: "Shipping", icon: Truck },
              { step: 3, label: "Payment", icon: CreditCard },
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? "text-orange-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      currentStep > step ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Customer Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+880 1234 567890"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={nextStep}>
                        Continue to Shipping
                      </Button>
                    </div>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Shipping Address
                    </h2>
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="Dhaka"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Division *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          placeholder="Dhaka Division"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">Postal Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          placeholder="1000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          placeholder="Bangladesh"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        Continue to Payment
                      </Button>
                    </div>
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Payment Information
                    </h2>
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name *</Label>
                      <Input
                        id="cardholderName"
                        value={formData.cardholderName}
                        onChange={(e) =>
                          handleInputChange("cardholderName", e.target.value)
                        }
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            formatCardNumber(e.target.value)
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "expiryDate",
                              formatExpiryDate(e.target.value)
                            )
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveInfo"
                          checked={formData.saveInfo}
                          onCheckedChange={(checked) =>
                            handleInputChange("saveInfo", checked as boolean)
                          }
                        />
                        <Label htmlFor="saveInfo" className="text-sm">
                          Save my information for faster checkout
                        </Label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Place Order (৳{total.toFixed(2)})
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.size && `Size: ${item.size}`}{" "}
                        {item.color && `• Color: ${item.color}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>৳{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>৳{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>৳{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 text-xs text-gray-500">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="w-3 h-3" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3 h-3" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
