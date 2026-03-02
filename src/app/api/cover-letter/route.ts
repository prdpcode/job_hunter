import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Cover letter API called');
  
  try {
    const { jobTitle, company, jobDescription } = await request.json();
    
    const apiKey = process.env.GROQ_API_KEY;
    console.log('Key exists:', !!apiKey);
    
    if (!apiKey) {
      console.error('Groq API key not configured');
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }
    
    const systemPrompt = "You are an expert career coach writing cover letters for Pradeep C H, a Frontend Engineer with 3+ years experience in Angular, Next.js, and AI-native development. He built Future Fit (wearfuturefit.com) — a complete D2C e-commerce platform. He works at BXP Support and Solutions. He is based in Bangalore. Write confident, concise, human cover letters — not corporate and not too long. Max 3 paragraphs.";
    
    const userPrompt = `Write a cover letter for this job:
Title: ${jobTitle}
Company: ${company}
Description: ${jobDescription}`;
    
    console.log('Making Groq API call...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
    
    console.log('Groq API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Groq API response data:', data);
    
    const coverLetter = data.choices?.[0]?.message?.content || '';
    
    if (!coverLetter) {
      console.error('No cover letter generated');
      return NextResponse.json(
        { error: 'No cover letter generated' },
        { status: 500 }
      );
    }
    
    console.log('Cover letter generated successfully');
    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
