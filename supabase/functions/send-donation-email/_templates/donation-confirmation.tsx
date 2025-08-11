import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface DonationEmailProps {
  donor_name: string
  amount: number
  currency: string
  donation_id: string
  donation_date: string
  is_recurring?: boolean
  frequency?: string
}

export const DonationConfirmationEmail = ({
  donor_name,
  amount,
  currency = 'USD',
  donation_id,
  donation_date,
  is_recurring = false,
  frequency = 'monthly'
}: DonationEmailProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100)

  const formattedDate = new Date(donation_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Html>
      <Head />
      <Preview>Thank you for your generous donation to Genius Recovery</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logoContainer}>
              <Text style={logo}>🌟 Genius Recovery</Text>
              <Text style={tagline}>On A Mission To Heal Addiction Around The World</Text>
            </div>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Thank You, {donor_name}! 🙏</Heading>
            
            <Text style={paragraph}>
              Your generous {is_recurring ? `${frequency} ` : ''}donation of <strong style={amountStyle}>{formattedAmount}</strong> has been received and is already making a difference in the lives of those affected by addiction.
            </Text>

            {/* Donation Details Card */}
            <Section style={donationCard}>
              <Heading style={cardTitle}>🧾 Donation Receipt</Heading>
              <div style={receiptGrid}>
                <div style={receiptRow}>
                  <Text style={receiptLabel}>Donation ID:</Text>
                  <Text style={receiptValue}>{donation_id}</Text>
                </div>
                <div style={receiptRow}>
                  <Text style={receiptLabel}>Amount:</Text>
                  <Text style={receiptValue}>{formattedAmount}</Text>
                </div>
                <div style={receiptRow}>
                  <Text style={receiptLabel}>Date:</Text>
                  <Text style={receiptValue}>{formattedDate}</Text>
                </div>
                <div style={receiptRow}>
                  <Text style={receiptLabel}>Type:</Text>
                  <Text style={receiptValue}>{is_recurring ? `Recurring (${frequency})` : 'One-time'}</Text>
                </div>
                <div style={receiptRow}>
                  <Text style={receiptLabel}>Tax Deductible:</Text>
                  <Text style={receiptValue}>Yes ✓</Text>
                </div>
              </div>
            </Section>

            {/* Impact Statement */}
            <Section style={impactSection}>
              <Heading style={impactTitle}>💫 Your Impact</Heading>
              <Text style={impactText}>
                Your contribution helps us provide:
              </Text>
              <div style={impactList}>
                <div style={impactItem}>
                  <Text style={impactBullet}>🆘</Text>
                  <Text style={impactDescription}>24/7 crisis intervention support</Text>
                </div>
                <div style={impactItem}>
                  <Text style={impactBullet}>🤖</Text>
                  <Text style={impactDescription}>AI-powered recovery companion</Text>
                </div>
                <div style={impactItem}>
                  <Text style={impactBullet}>🏥</Text>
                  <Text style={impactDescription}>Treatment center connections</Text>
                </div>
                <div style={impactItem}>
                  <Text style={impactBullet}>👨‍👩‍👧‍👦</Text>
                  <Text style={impactDescription}>Family support resources</Text>
                </div>
                <div style={impactItem}>
                  <Text style={impactBullet}>📚</Text>
                  <Text style={impactDescription}>Educational materials and recovery tools</Text>
                </div>
              </div>
            </Section>

            <Hr style={divider} />

            {/* Mission Statement */}
            <Section style={missionSection}>
              <Text style={missionQuote}>
                "On A Mission To Change The Way The World Understands & Treats Addiction"
              </Text>
              <Text style={missionSubtext}>One Human At A Time</Text>
            </Section>

            {/* Emergency Information */}
            <Section style={emergencySection}>
              <Heading style={emergencyTitle}>🚨 Need Immediate Support?</Heading>
              <Text style={emergencyText}>
                If you or someone you know is experiencing a crisis, help is available 24/7:
              </Text>
              <div style={emergencyContacts}>
                <div style={emergencyItem}>
                  <Text style={emergencyNumber}>988</Text>
                  <Text style={emergencyService}>Suicide & Crisis Lifeline</Text>
                </div>
                <div style={emergencyItem}>
                  <Text style={emergencyNumber}>1-800-662-4357</Text>
                  <Text style={emergencyService}>SAMHSA National Helpline</Text>
                </div>
              </div>
            </Section>

            {/* Call to Action */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                Stay connected with our mission and see the impact of your generosity:
              </Text>
              <Link href="https://geniusrecovery.org/blog" style={ctaButton}>
                Read Recovery Stories
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email serves as your donation receipt for tax purposes. Please keep it for your records.
            </Text>
            <Text style={footerText}>
              If you have any questions about your donation, please contact us at support@geniusrecovery.org
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} Genius Recovery. All rights reserved.
            </Text>
            <Text style={footerAddress}>
              Genius Recovery is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the full extent allowed by law.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default DonationConfirmationEmail

// Styles
const main = {
  backgroundColor: '#fafaf9',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '640px',
}

const header = {
  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  borderRadius: '12px 12px 0 0',
  padding: '40px 30px',
  textAlign: 'center' as const,
}

const logoContainer = {
  textAlign: 'center' as const,
}

const logo = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}

const tagline = {
  color: 'rgba(255, 255, 255, 0.95)',
  fontSize: '16px',
  fontWeight: '300',
  margin: '0',
}

const content = {
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '0 0 12px 12px',
  boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.15)',
}

const heading = {
  color: '#1c1917',
  fontSize: '28px',
  fontWeight: '600',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
}

const paragraph = {
  color: '#44403c',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
}

const amountStyle = {
  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '18px',
  fontWeight: 'bold',
}

const donationCard = {
  backgroundColor: 'rgba(245, 158, 11, 0.05)',
  border: '1px solid rgba(245, 158, 11, 0.2)',
  borderRadius: '12px',
  padding: '24px',
  margin: '32px 0',
}

const cardTitle = {
  color: '#ea580c',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const receiptGrid = {
  display: 'grid',
  gap: '12px',
}

const receiptRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid rgba(245, 158, 11, 0.1)',
}

const receiptLabel = {
  color: '#78716c',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
}

const receiptValue = {
  color: '#1c1917',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
}

const impactSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const impactTitle = {
  color: '#1c1917',
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 16px 0',
}

const impactText = {
  color: '#44403c',
  fontSize: '16px',
  margin: '0 0 20px 0',
}

const impactList = {
  textAlign: 'left' as const,
  maxWidth: '480px',
  margin: '0 auto',
}

const impactItem = {
  display: 'flex',
  alignItems: 'center',
  margin: '12px 0',
  padding: '8px',
}

const impactBullet = {
  fontSize: '18px',
  margin: '0 12px 0 0',
  minWidth: '24px',
}

const impactDescription = {
  color: '#44403c',
  fontSize: '15px',
  margin: '0',
  lineHeight: '1.5',
}

const divider = {
  borderColor: 'rgba(245, 158, 11, 0.2)',
  margin: '32px 0',
}

const missionSection = {
  textAlign: 'center' as const,
  padding: '24px',
  backgroundColor: 'rgba(245, 158, 11, 0.03)',
  borderRadius: '8px',
  margin: '24px 0',
}

const missionQuote = {
  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
}

const missionSubtext = {
  color: '#78716c',
  fontSize: '16px',
  fontStyle: 'italic',
  margin: '0',
}

const emergencySection = {
  backgroundColor: 'rgba(220, 38, 38, 0.05)',
  border: '1px solid rgba(220, 38, 38, 0.2)',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const emergencyTitle = {
  color: '#dc2626',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 12px 0',
}

const emergencyText = {
  color: '#44403c',
  fontSize: '14px',
  margin: '0 0 16px 0',
}

const emergencyContacts = {
  display: 'grid',
  gap: '8px',
}

const emergencyItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}

const emergencyNumber = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const emergencyService = {
  color: '#44403c',
  fontSize: '14px',
  margin: '0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const ctaText = {
  color: '#44403c',
  fontSize: '16px',
  margin: '0 0 20px 0',
}

const ctaButton = {
  backgroundColor: '#f59e0b',
  color: '#ffffff',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
  transition: 'all 0.3s ease',
}

const footer = {
  backgroundColor: '#fafaf9',
  padding: '30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #f3f4f6',
}

const footerText = {
  color: '#78716c',
  fontSize: '14px',
  margin: '0 0 8px 0',
  lineHeight: '1.5',
}

const footerDivider = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
}

const footerCopyright = {
  color: '#78716c',
  fontSize: '12px',
  fontWeight: '500',
  margin: '0 0 8px 0',
}

const footerAddress = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
  lineHeight: '1.4',
}