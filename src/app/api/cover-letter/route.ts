import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    console.log('Cover letter API called');
    console.log('GROQ key exists:', !!process.env.GROQ_API_KEY);

    const { jobTitle, company, description } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    console.log('Generating cover letter for:', jobTitle, company);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are an expert career coach writing cover letters for Pradeep C H, a Frontend Engineer with 3+ years experience in Angular v20, Next.js, TypeScript and AI-native development using Windsurf and Cursor. He built Future Fit (wearfuturefit.com) — a complete D2C e-commerce platform. He works at BXP Support and Solutions, Bangalore. Write confident, concise, human cover letters. Max 3 short paragraphs. No corporate fluff.`
        },
        {
          role: "user",
          content: `Write a cover letter for:
          Job Title: ${jobTitle}
          Company: ${company}
          Job Description: ${description?.slice(0, 500)}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const coverLetter = completion.choices[0]?.message?.content || '';

    if (!coverLetter) {
      console.error('No cover letter generated from Groq');
      return NextResponse.json(
        { error: 'No cover letter generated' },
        { status: 500 }
      );
    }

    console.log('Cover letter generated successfully');
    return NextResponse.json({ coverLetter });

  } catch (error: any) {
    console.error('Cover letter error:', error);
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}
