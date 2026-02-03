import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export type Question = {
    id: number;
    question_text: string;
    options: Array<{
        id: number;
        option_text: string;
        is_correct: boolean;
    }>;
};

export default function LessonExercise({ exercise }: { exercise: any }) {
    const [selected, setSelected] = useState<{ [questionId: number]: number | null }>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelect = (questionId: number, optionId: number) => {
        setSelected((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleSubmit = () => {
        let correct = 0;
        exercise.questions.forEach((q: Question) => {
            const selectedOption = q.options.find((o) => o.id === selected[q.id]);
            if (selectedOption?.is_correct) correct++;
        });
        setScore(correct);
        setSubmitted(true);
    };

    if (!exercise.questions || exercise.questions.length === 0) {
        return <p className="text-muted-foreground">No questions for this exercise.</p>;
    }

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{exercise.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {exercise.questions.map((q: Question, idx: number) => (
                    <div key={q.id} className="mb-6">
                        <div className="font-medium mb-2">
                            {idx + 1}. {q.question_text}
                        </div>
                        <div className="space-y-2">
                            {q.options.map((opt) => (
                                <label key={opt.id} className={`flex items-center gap-2 p-2 rounded cursor-pointer border border-border transition-colors ${selected[q.id] === opt.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'}`}>
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={opt.id}
                                        checked={selected[q.id] === opt.id}
                                        onChange={() => handleSelect(q.id, opt.id)}
                                        disabled={submitted}
                                    />
                                    <span>{opt.option_text}</span>
                                    {submitted && opt.is_correct && (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                    {submitted && selected[q.id] === opt.id && !opt.is_correct && (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                {!submitted ? (
                    <Button onClick={handleSubmit} className="mt-4">Submit</Button>
                ) : (
                    <div className="mt-4 font-semibold text-primary">
                        Score: {score} / {exercise.questions.length}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
