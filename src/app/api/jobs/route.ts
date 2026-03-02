import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const keywords = searchParams.get('keywords') || 'angular frontend developer';
  const location = searchParams.get('location') || 'bangalore';
  const resultsPerPage = searchParams.get('results_per_page') || '20';
  
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  
  if (!appId || !appKey) {
    return NextResponse.json(
      { error: 'Adzuna API credentials not configured' },
      { status: 500 }
    );
  }
  
  try {
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(keywords)}&where=${encodeURIComponent(location)}&content-type=application/json`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
