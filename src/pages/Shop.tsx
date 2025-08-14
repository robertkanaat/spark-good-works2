import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart, Truck, Shield, RotateCcw, Search, Filter, Sparkles, Gift, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import shopHeroBg from "@/assets/shop-hero-bg.jpg";
import hoodieImg from "@/assets/hoodie.jpg";
import backpackImg from "@/assets/backpack.jpg";
import mugImg from "@/assets/mug.jpg";

const Shop = () => {
  // SEO configuration for this page
  const seoData = {
    title: "Recovery Shop - Meaningful Products Supporting Your Journey | Genius Recovery",
    description: "Shop meaningful recovery products including recovery kits, apparel, and accessories. Every purchase supports addiction recovery programs and resources worldwide.",
    keywords: "recovery shop, addiction recovery products, recovery kits, recovery apparel, sober merchandise, recovery gifts, addiction support products",
    ogImage: "https://yoursite.com/images/shop-og-image.jpg", // Update with actual image URL
    canonicalUrl: "https://geniusrecovery.org/shop",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Genius Recovery Shop",
      "description": "Shop meaningful recovery products that support addiction recovery journeys",
      "url": "https://geniusrecovery.org/shop",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "14.99",
        "highPrice": "79.99"
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const categories = ["All", "Recovery Kits", "Apparel", "Accessories", "Books"];
  
  const products = [
    {
      id: 1,
      name: "Genius Recovery Kit",
      description: "A thoughtfully curated collection of tools and resources designed to support individuals on their recovery journey. Packed with practical items, educational materials, and inspiration.",
      price: 24.99,
      originalPrice: 34.99,
      category: "Recovery Kits",
      image: "/lovable-uploads/3e7570fb-81cb-420b-9f97-79f46edfba7b.png",
      rating: 4.9,
      reviews: 127,
      badge: "Best Seller",
      inStock: 93,
      features: [
        "Practical recovery tools & resources",
        "Educational materials & workbooks", 
        "Inspirational content & quotes",
        "Guidance for recovery journey"
      ],
      colors: ["White/Gray"],
      isNew: false,
      discount: 29
    },
    {
      id: 2,
      name: "Genius Recovery Hoodie",
      description: "Comfortable, premium-quality hoodie with inspiring recovery messaging. Perfect for daily wear and showing your support for the recovery community.",
      price: 49.99,
      category: "Apparel",
      image: hoodieImg,
      rating: 4.8,
      reviews: 89,
      badge: "New",
      inStock: 156,
      features: [
        "Premium cotton blend fabric",
        "Unisex sizing available",
        "Inspiring recovery design",
        "Comfortable relaxed fit"
      ],
      colors: ["Black", "Navy", "Gray", "Orange"],
      isNew: true,
      discount: 0
    },
    {
      id: 3,
      name: "Recovery Support Backpack",
      description: "Durable, stylish backpack perfect for carrying recovery resources, meeting materials, or daily essentials. Built for the recovery journey.",
      price: 39.99,
      category: "Accessories",
      image: backpackImg,
      rating: 4.7,
      reviews: 64,
      inStock: 78,
      features: [
        "Multiple organized compartments",
        "Durable water-resistant materials",
        "Padded laptop sleeve included",
        "Ergonomic comfort design"
      ],
      colors: ["Black", "Navy", "Olive"],
      isNew: false,
      discount: 0
    },
    {
      id: 4,
      name: "\"One Day at a Time\" Mug",
      description: "Start your day with inspiration. This beautiful ceramic mug features motivational recovery messaging to keep you focused on your journey.",
      price: 16.99,
      category: "Accessories",
      image: mugImg,
      rating: 4.9,
      reviews: 203,
      badge: "Popular",
      inStock: 245,
      features: [
        "Premium 11oz ceramic construction",
        "Dishwasher & microwave safe",
        "Comfortable ergonomic handle",
        "Inspirational recovery design"
      ],
      colors: ["White", "Black", "Orange"],
      isNew: false,
      discount: 0
    },
    {
      id: 5,
      name: "Recovery Journal & Workbook Set",
      description: "Complete set including a guided recovery journal and comprehensive workbook with exercises, reflections, and expert insights for your journey.",
      price: 29.99,
      category: "Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 91,
      inStock: 67,
      features: [
        "Guided daily exercises",
        "Reflection prompts & tracking",
        "Progress milestone celebrations",
        "Expert recovery insights"
      ],
      colors: ["Blue", "Purple"],
      isNew: false,
      discount: 0
    },
    {
      id: 6,
      name: "Support Team T-Shirt",
      description: "Show your support with this comfortable t-shirt featuring the Genius Recovery community message. Perfect for events and everyday wear.",
      price: 24.99,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 45,
      inStock: 189,
      features: [
        "100% premium cotton",
        "Multiple color options",
        "Comfortable regular fit",
        "Recovery community message"
      ],
      colors: ["White", "Black", "Navy", "Orange"],
      isNew: false,
      discount: 0
    }
  ];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProduct = products[0]; // Recovery Kit

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      
      {/* Hero Section with Background */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${shopHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium">Recovery Support Shop</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                Products That <span className="text-primary">Heal & Inspire</span>
              </h1>
              <p className="text-2xl text-white/90 mb-12 leading-relaxed">
                Quality products and resources designed to support your recovery journey and celebrate your commitment to healing
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg group">
                  <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg">
                  <Gift className="w-6 h-6 mr-3" />
                  Gift Cards
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 blur-3xl transform rotate-12"></div>
              <Card className="relative bg-white/95 backdrop-blur-sm p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <img 
                    src={featuredProduct.image} 
                    alt={featuredProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                    loading="eager"
                    decoding="async"
                  />
                  <Badge className="bg-red-500 text-white mb-4">
                    {featuredProduct.badge}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{featuredProduct.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary">${featuredProduct.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${featuredProduct.originalPrice}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Save ${((featuredProduct.originalPrice! - featuredProduct.price)).toFixed(2)}
                    </Badge>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-bounce"></div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">On orders over $50 anywhere in the US</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-blue-50 to-sky-50">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
            <p className="text-muted-foreground">100% secure SSL encrypted payments</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-purple-50 to-violet-50">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
            <p className="text-muted-foreground">30-day hassle-free return policy</p>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-8 py-4 font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-xl scale-110" 
                    : "hover:scale-105 hover:shadow-lg hover:bg-primary/5"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-gray-50/30 to-white cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Overlay Effects */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.badge && (
                    <Badge className={`${
                      product.badge === "New" ? "bg-blue-500" :
                      product.badge === "Popular" ? "bg-green-500" :
                      "bg-red-500"
                    } text-white shadow-lg`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-orange-500 text-white shadow-lg">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <Button variant="secondary" size="sm" className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Color Options */}
                <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex gap-2 justify-center">
                    {product.colors.slice(0, 4).map((color, colorIndex) => (
                      <div 
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                      </div>
                    ))}
                    {product.colors.length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold">
                        +{product.colors.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                <ul className="mb-6 space-y-1">
                  {product.features.slice(0, 2).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    {product.inStock} in stock
                  </span>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 group">
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Support Message */}
        <Card className="p-16 text-center bg-gradient-to-br from-primary/10 via-background to-orange-500/10 border-0 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Supporting Recovery Together</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Every purchase directly supports our mission to reduce suffering and save lives. 
              100% of profits go to recovery support programs, emergency resources, and community outreach.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">$125,000+</div>
                <div className="text-muted-foreground">Raised for Recovery Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Lives Directly Impacted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Recovery Centers Supported</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Learn About Our Mission
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
