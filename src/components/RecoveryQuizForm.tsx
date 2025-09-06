import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecoveryGame } from './RecoveryGame/RecoveryGame';

interface QuizAnswer {
  questionId: string;
  value: string | number;
}

interface QuizQuestion {
  id: string;
  type: 'radio' | 'scale' | 'textarea' | 'multiple';
  title: string;
  subtitle?: string;
  options?: { value: string; label: string; description?: string }[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  required?: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'recovery-stage',
    type: 'radio',
    title: 'Where are you currently in your recovery journey?',
    subtitle: 'This helps us understand your current situation',
    options: [
      { value: 'pre-contemplation', label: 'Not yet ready to change', description: 'Still exploring the idea of recovery' },
      { value: 'contemplation', label: 'Thinking about recovery', description: 'Considering making changes in the next 6 months' },
      { value: 'preparation', label: 'Planning to start recovery', description: 'Ready to make changes in the next month' },
      { value: 'early-recovery', label: 'Early recovery (0-1 year)', description: 'Actively working on recovery' },
      { value: 'sustained-recovery', label: 'Sustained recovery (1+ years)', description: 'Maintaining long-term recovery' },
      { value: 'supporting-others', label: 'Supporting someone else', description: 'Here to help a loved one' }
    ],
    required: true
  },
  {
    id: 'primary-concern',
    type: 'radio',
    title: 'What is your primary concern or focus area?',
    subtitle: 'Select the area that resonates most with your current situation',
    options: [
      { value: 'substance-use', label: 'Substance use', description: 'Alcohol, drugs, or other substances' },
      { value: 'behavioral-addictions', label: 'Behavioral addictions', description: 'Gaming, shopping, gambling, etc.' },
      { value: 'mental-health', label: 'Mental health support', description: 'Depression, anxiety, trauma' },
      { value: 'relationships', label: 'Relationship issues', description: 'Family, romantic, or social relationships' },
      { value: 'life-skills', label: 'Life skills & structure', description: 'Daily routines, employment, housing' },
      { value: 'spiritual-growth', label: 'Spiritual growth', description: 'Finding meaning and purpose' }
    ],
    required: true
  },
  {
    id: 'motivation-level',
    type: 'scale',
    title: 'How motivated are you to make positive changes?',
    subtitle: 'Rate your current motivation level',
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: 'Not motivated at all', max: 'Extremely motivated' },
    required: true
  },
  {
    id: 'support-system',
    type: 'radio',
    title: 'How would you describe your current support system?',
    options: [
      { value: 'strong', label: 'Strong support system', description: 'Family and friends are very supportive' },
      { value: 'moderate', label: 'Some support', description: 'Have some people I can count on' },
      { value: 'limited', label: 'Limited support', description: 'Few people to turn to for help' },
      { value: 'isolated', label: 'Feeling isolated', description: 'Don\'t have much support right now' },
      { value: 'toxic', label: 'Negative influences', description: 'Surrounded by unhelpful relationships' }
    ],
    required: true
  },
  {
    id: 'biggest-challenge',
    type: 'radio',
    title: 'What is your biggest challenge right now?',
    options: [
      { value: 'cravings', label: 'Managing cravings/urges' },
      { value: 'triggers', label: 'Avoiding triggers and temptations' },
      { value: 'emotions', label: 'Dealing with difficult emotions' },
      { value: 'relationships', label: 'Rebuilding relationships' },
      { value: 'routine', label: 'Creating healthy routines' },
      { value: 'purpose', label: 'Finding meaning and purpose' },
      { value: 'shame', label: 'Overcoming shame and guilt' },
      { value: 'relapse', label: 'Fear of relapse' }
    ],
    required: true
  },
  {
    id: 'confidence-level',
    type: 'scale',
    title: 'How confident are you in your ability to maintain recovery?',
    subtitle: 'Rate your confidence level',
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: 'Not confident at all', max: 'Very confident' },
    required: true
  },
  {
    id: 'preferred-resources',
    type: 'multiple',
    title: 'What types of resources interest you most?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'one-on-one', label: 'One-on-one counseling' },
      { value: 'group-therapy', label: 'Group therapy sessions' },
      { value: 'peer-support', label: 'Peer support meetings' },
      { value: 'online-resources', label: 'Online tools and apps' },
      { value: 'books-materials', label: 'Books and educational materials' },
      { value: 'spiritual-practices', label: 'Spiritual/meditation practices' },
      { value: 'physical-wellness', label: 'Exercise and wellness programs' },
      { value: 'family-support', label: 'Family therapy and support' }
    ]
  },
  {
    id: 'additional-thoughts',
    type: 'textarea',
    title: 'Is there anything else you\'d like us to know?',
    subtitle: 'Share any additional thoughts, concerns, or goals (optional)'
  }
];

const RecoveryQuizForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [multipleSelections, setMultipleSelections] = useState<string[]>([]);

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: string | number) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({ questionId, value });
    setAnswers(newAnswers);
  };

  const handleMultipleSelection = (value: string) => {
    const newSelections = multipleSelections.includes(value)
      ? multipleSelections.filter(s => s !== value)
      : [...multipleSelections, value];
    setMultipleSelections(newSelections);
    handleAnswer(currentQuestion.id, newSelections.join(','));
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value || '';
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    const answer = getCurrentAnswer(currentQuestion.id);
    return answer !== '' && answer !== undefined;
  };

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setMultipleSelections([]);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setMultipleSelections([]);
    }
  };

  const getResults = () => {
    const recoveryStage = answers.find(a => a.questionId === 'recovery-stage')?.value;
    const primaryConcern = answers.find(a => a.questionId === 'primary-concern')?.value;
    const motivationLevel = answers.find(a => a.questionId === 'motivation-level')?.value as number;
    const confidenceLevel = answers.find(a => a.questionId === 'confidence-level')?.value as number;

    // Calculate overall score
    const overallScore = Math.round(((motivationLevel + confidenceLevel) / 20) * 100);
    
    // Determine badge based on overall score
    const getBadge = (score: number) => {
      if (score >= 80) return { name: 'Champion', color: 'from-yellow-500 to-orange-500', emoji: '🏆' };
      if (score >= 60) return { name: 'Achiever', color: 'from-green-500 to-emerald-500', emoji: '⭐' };
      if (score >= 40) return { name: 'Builder', color: 'from-blue-500 to-cyan-500', emoji: '🚀' };
      return { name: 'Starter', color: 'from-purple-500 to-pink-500', emoji: '🌱' };
    };

    const badge = getBadge(overallScore);

    // Generate personalized recommendations based on answers
    const recommendations = [];
    
    if (motivationLevel >= 8) {
      recommendations.push("Your high motivation is a tremendous asset. Consider structured programs to maintain this momentum.");
    }
    
    if (confidenceLevel < 5) {
      recommendations.push("Building confidence through small, achievable goals can help strengthen your recovery foundation.");
    }

    if (recoveryStage === 'early-recovery') {
      recommendations.push("Focus on building daily routines and connecting with support groups during this crucial phase.");
    }

    if (overallScore >= 70) {
      recommendations.push("You're showing strong readiness for recovery. Consider taking on leadership roles in support groups.");
    }

    return { recoveryStage, primaryConcern, motivationLevel, confidenceLevel, overallScore, badge, recommendations };
  };

  if (showResults) {
    const results = getResults();
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-secondary/10">
          <CardHeader className="text-center pb-8">
            <div className={cn(
              "w-24 h-24 bg-gradient-to-r rounded-full flex flex-col items-center justify-center mx-auto mb-6 shadow-lg",
              results.badge.color
            )}>
              <span className="text-2xl mb-1">{results.badge.emoji}</span>
              <span className="text-white text-xs font-bold">{results.overallScore}%</span>
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold mb-6 bg-gradient-to-r",
              results.badge.color
            )}>
              <span>{results.badge.name}</span>
              <span className="text-sm opacity-90">({results.overallScore}% Overall Score)</span>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Recovery Assessment Results
            </CardTitle>
            <p className="text-muted-foreground text-lg mt-4">
              Based on your responses, here are your personalized insights and recommendations
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50">
                <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                  Recovery Stage
                </h3>
                <p className="text-blue-800 dark:text-blue-200 capitalize">
                  {String(results.recoveryStage).replace('-', ' ')}
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="font-semibold text-lg mb-3 text-purple-900 dark:text-purple-100">
                  Primary Focus
                </h3>
                <p className="text-purple-800 dark:text-purple-200 capitalize">
                  {String(results.primaryConcern).replace('-', ' ')}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/50">
                <h3 className="font-semibold text-lg mb-3 text-green-900 dark:text-green-100">
                  Motivation Level
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < results.motivationLevel 
                              ? "text-yellow-500 fill-current" 
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-green-800 dark:text-green-200 font-medium">
                      {results.motivationLevel}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-green-200/50 dark:bg-green-800/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(results.motivationLevel / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">
                      {Math.round((results.motivationLevel / 10) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-800/50">
                <h3 className="font-semibold text-lg mb-3 text-orange-900 dark:text-orange-100">
                  Confidence Level
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < results.confidenceLevel 
                              ? "text-yellow-500 fill-current" 
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-orange-800 dark:text-orange-200 font-medium">
                      {results.confidenceLevel}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-orange-200/50 dark:bg-orange-800/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(results.confidenceLevel / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                      {Math.round((results.confidenceLevel / 10) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
              <h3 className="font-semibold text-xl mb-4">Personalized Recommendations</h3>
              <div className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery Game Integration */}
            <div className="mt-8">
              <RecoveryGame />
            </div>

            <div className="text-center pt-6 border-t border-border">
              <p className="text-muted-foreground mb-6">
                Ready to take the next step in your recovery journey?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Explore Resources
                </Button>
                <Button variant="outline" size="lg">
                  Retake Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentStep + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-secondary/5">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
            {currentQuestion.title}
          </CardTitle>
          {currentQuestion.subtitle && (
            <p className="text-muted-foreground text-lg mt-2">
              {currentQuestion.subtitle}
            </p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentQuestion.type === 'radio' && (
            <RadioGroup
              value={String(getCurrentAnswer(currentQuestion.id))}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              className="space-y-4"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentQuestion.scaleLabels?.min}</span>
                <span>{currentQuestion.scaleLabels?.max}</span>
              </div>
              <div className="flex justify-between items-center">
                {Array.from({ length: currentQuestion.scaleMax! - currentQuestion.scaleMin! + 1 }, (_, i) => {
                  const value = currentQuestion.scaleMin! + i;
                  const isSelected = getCurrentAnswer(currentQuestion.id) === value;
                  return (
                    <button
                      key={value}
                      onClick={() => handleAnswer(currentQuestion.id, value)}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 font-bold transition-all duration-200 hover:scale-110",
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div className="space-y-4">
              {currentQuestion.options?.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleMultipleSelection(option.value)}
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-200",
                    multipleSelections.includes(option.value)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/30 hover:bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    multipleSelections.includes(option.value)
                      ? "border-primary bg-primary"
                      : "border-border"
                  )}>
                    {multipleSelections.includes(option.value) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <Label className="text-base font-medium cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'textarea' && (
            <Textarea
              placeholder="Share your thoughts here..."
              value={String(getCurrentAnswer(currentQuestion.id))}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="min-h-[120px] text-base"
            />
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={nextStep}
          disabled={!canProceed()}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          {currentStep === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecoveryQuizForm;