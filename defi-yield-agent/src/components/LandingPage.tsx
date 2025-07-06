import { Wallet, TrendingUp, Shield, Zap, ChevronRight, BarChart3, Target, Play, Calculator, Users, Award, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletConnectionModal } from '@/components/WalletConnectionModal';

interface LandingPageProps {
  onConnection?: (address: string) => void;
}

export const LandingPage = ({ onConnection }: LandingPageProps) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [yieldAmount, setYieldAmount] = useState(10000);
  const [projectedYield, setProjectedYield] = useState(1230);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleYieldCalculation = (amount: number) => {
    setYieldAmount(amount);
    setProjectedYield(Math.round(amount * 0.123)); // 12.3% APY calculation
  };

  const handleWalletConnection = (address: string) => {
    if (onConnection) {
      onConnection(address);
    }
  };

  return (
    <div className="container-responsive py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-secondary/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16 relative z-10">
        {/* Enhanced Status Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass border-primary/30 hover:border-primary/50 transition-all duration-300">
          <BarChart3 className="h-4 w-4 mr-2 text-secondary animate-pulse" />
          <span className="text-responsive-xs text-foreground/90">🔥 Trusted by 2,500+ DeFi Users</span>
        </div>
        
        {/* Enhanced Hero Section */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent block animate-gradient">
              DeFi Yield
            </span>
            <span className="text-foreground block">Agent</span>
          </h1>
          
          <p className="text-responsive-base text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            The first AI-powered agent that automatically optimizes your yield across DeFi protocols 
            while keeping your MetaMask Card funded. <strong className="text-secondary">Set it once, earn forever.</strong>
          </p>

          {/* Primary CTA - Wallet Connection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button 
              size="lg" 
              onClick={() => setShowWalletModal(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-white/20"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet & Start Earning
            </Button>
            
            {/* Secondary CTAs */}
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/50 backdrop-blur-sm px-6 py-3 rounded-xl">
                <Play className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/50 backdrop-blur-sm px-6 py-3 rounded-xl">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </Button>
            </div>
          </div>

          {/* Quick Stats for Social Proof */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span>Withdraw anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span>Audited contracts</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats with Trust Indicators */}
        <div className="grid-responsive-4 max-w-4xl mx-auto">
          <StatCard value="12.3%" label="Avg APY" color="text-secondary" subtitle="Last 30 days" />
          <StatCard value="$2.4M" label="Total Value" color="text-primary" subtitle="Locked" />
          <StatCard value="15+" label="Protocols" color="text-info" subtitle="Integrated" />
          <StatCard value="2,500+" label="Active Users" color="text-warning" subtitle="Earning" />
        </div>

        {/* Yield Calculator Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="glass-card hover-lift border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-responsive-lg flex items-center justify-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Yield Calculator
              </CardTitle>
              <CardDescription>See how much you could earn with automated optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Investment Amount ($)</label>
                <div className="flex gap-2">
                  {[1000, 5000, 10000, 25000].map((amount) => (
                    <Button
                      key={amount}
                      variant={yieldAmount === amount ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleYieldCalculation(amount)}
                      className="flex-1"
                    >
                      ${amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-foreground">
                  ${projectedYield.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Annual yield projection</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on current 12.3% average APY
                </div>
                <Button 
                  onClick={() => setShowWalletModal(true)}
                  className="mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  Start Earning This Amount
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid-responsive-4 mt-12 sm:mt-16 lg:mt-20">
          <FeatureCard 
            icon={<TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Auto Yield Optimization"
            description="AI continuously monitors and moves funds to highest-yielding protocols"
            isActive={activeFeature === 0}
            onClick={() => setActiveFeature(activeFeature === 0 ? null : 0)}
          />
          <FeatureCard 
            icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Cross-Chain Rebalancing"
            description="Automatically finds the best yields across multiple chains with seamless bridging"
            isActive={activeFeature === 1}
            onClick={() => setActiveFeature(activeFeature === 1 ? null : 1)}
          />
          <FeatureCard 
            icon={<Wallet className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Card Auto Top-Up"
            description="Keeps your MetaMask Card funded for seamless real-world spending"
            isActive={activeFeature === 2}
            onClick={() => setActiveFeature(activeFeature === 2 ? null : 2)}
          />
          <FeatureCard 
            icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6" />}
            title="Smart Risk Management"
            description="Maintains emergency buffers with built-in safety mechanisms and insurance"
            isActive={activeFeature === 3}
            onClick={() => setActiveFeature(activeFeature === 3 ? null : 3)}
          />
        </div>

        {/* Trust Section */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-responsive-xl font-bold text-foreground mb-8">Trusted & Secure</h2>
          <div className="grid-responsive-3 max-w-4xl mx-auto">
            <TrustCard 
              icon={<Shield className="h-8 w-8" />}
              title="Audited Smart Contracts"
              description="All contracts audited by leading security firms"
            />
            <TrustCard 
              icon={<Users className="h-8 w-8" />}
              title="2,500+ Active Users"
              description="Growing community of satisfied DeFi users"
            />
            <TrustCard 
              icon={<Award className="h-8 w-8" />}
              title="Insurance Coverage"
              description="Up to $1M coverage through leading DeFi insurers"
            />
          </div>
        </div>

        {/* Enhanced How It Works */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-responsive-xl font-bold text-foreground mb-8 lg:mb-12">How It Works</h2>
          <div className="grid-responsive-3 max-w-5xl mx-auto">
            <ProcessStep 
              step="1"
              title="Connect & Configure"
              description="Link your wallet and set your risk preferences with our guided setup"
              detail="✓ One-click wallet connection ✓ Risk assessment ✓ Goal setting"
            />
            <ProcessStep 
              step="2"
              title="AI Monitors Markets"
              description="Our agent continuously scans 15+ DeFi protocols for optimal yields"
              detail="✓ Real-time monitoring ✓ Gas optimization ✓ Risk analysis"
            />
            <ProcessStep 
              step="3"
              title="Automatic Optimization"
              description="Funds are moved to optimal protocols while maintaining your liquidity needs"
              detail="✓ Automated rebalancing ✓ Card top-ups ✓ Emergency reserves"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
          <h2 className="text-responsive-xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <FAQItem 
              question="How safe is my money?"
              answer="Your funds are secured by audited smart contracts and never leave the blockchain. We use leading security practices and offer insurance coverage up to $1M."
            />
            <FAQItem 
              question="What's the minimum investment?"
              answer="You can start with as little as $100. Our gas optimization ensures even small amounts remain profitable."
            />
            <FAQItem 
              question="Can I withdraw anytime?"
              answer="Yes, you maintain full control. Withdraw your funds instantly or set up scheduled withdrawals."
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-responsive-lg font-bold text-foreground mb-4">Ready to Start Earning?</h3>
          <p className="text-muted-foreground mb-6">Join 2,500+ users already earning optimized DeFi yields</p>
          <Button 
            size="lg" 
            onClick={() => setShowWalletModal(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Connect Wallet to Start
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal 
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        onConnection={handleWalletConnection}
      />
    </div>
  );
};

const StatCard = ({ value, label, color, subtitle }: { value: string; label: string; color: string; subtitle?: string }) => (
  <div className="glass-card card-responsive hover-lift group cursor-pointer">
    <div className={`text-responsive-lg font-bold ${color} group-hover:scale-110 transition-transform`}>{value}</div>
    <div className="text-responsive-xs text-muted-foreground">{label}</div>
    {subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{subtitle}</div>}
  </div>
);

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  isActive,
  onClick
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <div 
    className={`glass-card card-responsive hover-lift group cursor-pointer transition-all duration-300 ${
      isActive ? 'border-primary/50 bg-primary/5' : ''
    }`}
    onClick={onClick}
  >
    <div className={`mb-3 sm:mb-4 group-hover:scale-110 transition-transform ${
      isActive ? 'text-primary scale-110' : 'text-primary'
    }`}>
      {icon}
    </div>
    <h3 className="text-foreground font-semibold mb-2 text-responsive-sm">{title}</h3>
    <p className="text-muted-foreground text-responsive-xs leading-relaxed mb-3">{description}</p>
    <div className="flex items-center text-primary group-hover:text-secondary transition-colors">
      <span className="text-responsive-xs">Learn more</span>
      <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const ProcessStep = ({ step, title, description, detail }: { step: string; title: string; description: string; detail?: string }) => (
  <div className="text-center space-y-4">
    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-responsive-sm shadow-lg">
      {step}
    </div>
    <h3 className="text-responsive-base font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-responsive-xs leading-relaxed">{description}</p>
    {detail && (
      <div className="text-xs text-muted-foreground/80 leading-relaxed bg-muted/20 rounded-lg p-3">
        {detail}
      </div>
    )}
  </div>
);

const TrustCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="glass-card card-responsive text-center hover-lift">
    <div className="text-primary mb-4 flex justify-center">{icon}</div>
    <h3 className="text-responsive-sm font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-responsive-xs text-muted-foreground">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="glass-card p-4 rounded-lg hover-lift">
    <div className="flex items-start gap-3">
      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-foreground mb-2">{question}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  </div>
);
