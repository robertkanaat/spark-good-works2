import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart, Truck, Shield, RotateCcw, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import recoveryKitImg from "@/assets/recovery-kit.jpg";
import hoodieImg from "@/assets/hoodie.jpg";
import backpackImg from "@/assets/backpack.jpg";
import mugImg from "@/assets/mug.jpg";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Recovery Kits", "Apparel", "Accessories", "Books"];
  
  const products = [
    {
      id: 1,
      name: "Genius Recovery Kit",
      description: "A thoughtfully curated collection of tools and resources designed to support individuals on their recovery journey.",
      price: 24.99,
      originalPrice: 34.99,
      category: "Recovery Kits",
      image: recoveryKitImg,
      rating: 4.9,
      reviews: 127,
      badge: "Best Seller",
      inStock: 93,
      features: [
        "Practical recovery tools",
        "Educational materials", 
        "Inspirational resources",
        "Guidance workbook"
      ]
    },
    {
      id: 2,
      name: "Genius Recovery Hoodie",
      description: "Comfortable, high-quality hoodie with inspiring recovery messaging. Perfect for daily wear and showing your support.",
      price: 49.99,
      category: "Apparel",
      image: hoodieImg,
      rating: 4.8,
      reviews: 89,
      badge: "New",
      inStock: 156,
      features: [
        "Premium cotton blend",
        "Unisex sizing",
        "Inspiring design",
        "Comfortable fit"
      ]
    },
    {
      id: 3,
      name: "Recovery Support Backpack",
      description: "Durable backpack perfect for carrying recovery resources, perfect for meetings, workshops, or daily use.",
      price: 39.99,
      category: "Accessories",
      image: backpackImg,
      rating: 4.7,
      reviews: 64,
      inStock: 78,
      features: [
        "Multiple compartments",
        "Durable materials",
        "Laptop sleeve included",
        "Water-resistant"
      ]
    },
    {
      id: 4,
      name: "\"One Day at a Time\" Mug",
      description: "Start your day with inspiration. This beautiful ceramic mug features motivational recovery messaging.",
      price: 16.99,
      category: "Accessories",
      image: mugImg,
      rating: 4.9,
      reviews: 203,
      badge: "Popular",
      inStock: 245,
      features: [
        "11oz ceramic",
        "Dishwasher safe",
        "Microwave safe",
        "Inspirational design"
      ]
    },
    {
      id: 5,
      name: "Recovery Journal & Workbook Set",
      description: "Complete set including a guided recovery journal and comprehensive workbook with exercises and reflections.",
      price: 29.99,
      category: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 91,
      inStock: 67,
      features: [
        "Guided exercises",
        "Daily reflections",
        "Progress tracking",
        "Expert insights"
      ]
    },
    {
      id: 6,
      name: "Support Team T-Shirt",
      description: "Show your support with this comfortable t-shirt featuring the Genius Recovery community message.",
      price: 24.99,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 45,
      inStock: 189,
      features: [
        "100% cotton",
        "Multiple colors",
        "Comfortable fit",
        "Community message"
      ]
    }
  ];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProduct = products[0]; // Recovery Kit

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-orange-500/10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Recovery <span className="text-primary">Support Shop</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Quality products and resources to support your recovery journey and show your commitment to healing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Search className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                View Wishlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Product */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="text-primary">Featured Product</Badge>
            <h2 className="text-3xl font-bold mt-4">Genius Recovery Kit</h2>
          </div>
          <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-orange-500/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">
                    {featuredProduct.badge}
                  </Badge>
                </div>
                {featuredProduct.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Save ${(featuredProduct.originalPrice - featuredProduct.price).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {featuredProduct.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {featuredProduct.rating} ({featuredProduct.reviews} reviews)
                  </span>
                </div>
                <p className="text-muted-foreground text-lg mb-6">
                  {featuredProduct.description}
                </p>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      ${featuredProduct.price}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${featuredProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-green-600">
                    {featuredProduct.inStock} in stock
                  </p>
                </div>
                <ul className="mb-6 space-y-2">
                  {featuredProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${featuredProduct.price}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">100% secure payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
            <RotateCcw className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.slice(1).map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      product.badge === "New" ? "bg-blue-500" :
                      product.badge === "Popular" ? "bg-green-500" :
                      "bg-red-500"
                    } text-white`}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-green-600">
                    {product.inStock} in stock
                  </span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Support Message */}
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-orange-500/10">
          <h2 className="text-3xl font-bold mb-4">Supporting Recovery Together</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every purchase supports our mission to reduce suffering and save lives. 
            100% of profits go directly to recovery support programs and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Heart className="w-5 h-5 mr-2" />
              Learn About Our Mission
            </Button>
            <Button size="lg" variant="outline">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;