import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Footer from "@/components/Footer";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            We're sorry, but there was an issue processing your donation. Please try again or contact us if the problem persists.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-red-800 mb-2">Common reasons for payment failure:</h3>
            <ul className="text-sm text-red-700 text-left">
              <li>• Insufficient funds</li>
              <li>• Card information was entered incorrectly</li>
              <li>• Your bank declined the transaction</li>
              <li>• Temporary network issue</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donation">
                <Button className="bg-primary hover:bg-primary/90">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at <a href="mailto:support@geniusrecovery.org" className="text-primary hover:underline">support@geniusrecovery.org</a>
            </p>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentFailed;