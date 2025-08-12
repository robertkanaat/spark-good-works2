-- Create payments table to log all payment attempts and successes
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inchek_session_id TEXT,
  donor_email TEXT NOT NULL,
  donor_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL, -- 'pending', 'completed', 'failed', 'cancelled'
  inchek_payment_id TEXT,
  inchek_customer_id TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payment recording
CREATE POLICY "Allow payment recording" 
ON public.payments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow payment updates" 
ON public.payments 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can view payments" 
ON public.payments 
FOR SELECT 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();