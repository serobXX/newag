type Option = { value: string | null; label: string | null; type?: string };

export type TQuizList = { question: string; options: Option[]; type?: string, id: number };
export type TQuizValue = { question: string, value: string | string[], type?: string, answer?: string }