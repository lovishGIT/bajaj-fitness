import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import {
    ArrowRight,
    Calculator,
    Activity,
    Brain,
    BookOpen,
} from 'lucide-react';

export default function Home() {
    return (
        <>
            <section className="text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Transform Your Fitness Journey
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Advanced calculators, AI-powered tracking, and
                    expert guidance - all in one place
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/auth">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/calculators/body-composition">
                        <Button size="lg" variant="outline">
                            Try Calculators
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Body Composition
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Calculate BMI, body fat percentage, and
                            lean body mass
                        </p>
                        <Link href="/calculators/body-composition">
                            <Button
                                variant="ghost"
                                className="w-full"
                            >
                                Try Now{' '}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            Diet Planning
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Calculate calories, macros, BMR, and water
                            intake
                        </p>
                        <Link href="/calculators/diet">
                            <Button
                                variant="ghost"
                                className="w-full"
                            >
                                Try Now{' '}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            AI Exercise Tracking
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Track pushups and pullups with AI-powered
                            counting
                        </p>
                        <Link href="/activity-ai">
                            <Button
                                variant="ghost"
                                className="w-full"
                            >
                                Try Now{' '}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Health Blogs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Expert advice and latest fitness research
                        </p>
                        <Link href="/blogs">
                            <Button
                                variant="ghost"
                                className="w-full"
                            >
                                Read More{' '}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}
