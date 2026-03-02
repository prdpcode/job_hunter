import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Jobs API called');
  
  const { searchParams } = new URL(request.url);
  
  const keywords = searchParams.get('keywords') || 'angular frontend developer';
  const location = searchParams.get('location') || 'bangalore';
  const resultsPerPage = searchParams.get('results_per_page') || '20';
  
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  
  console.log('Adzuna credentials exist:', !!appId, !!appKey);
  
  if (!appId || !appKey) {
    console.error('Adzuna API credentials not configured');
    return NextResponse.json(
      { error: 'Adzuna API credentials not configured' },
      { status: 500 }
    );
  }
  
  try {
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(keywords)}&where=${encodeURIComponent(location)}&content-type=application/json`;
    
    console.log('Fetching jobs from Adzuna...');
    
    const response = await fetch(apiUrl);
    
    console.log('Adzuna API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adzuna API error:', response.status, errorText);
      throw new Error(`Adzuna API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Adzuna API response - total jobs found:', data.count);
    
    // Filter jobs to only include those posted within last 90 days
    if (data.results) {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      
      const filteredJobs = data.results.filter((job: any) => {
        const createdDate = new Date(job.created);
        return createdDate >= ninetyDaysAgo;
      });
      
      console.log(`Filtered to ${filteredJobs.length} jobs from last 90 days (original: ${data.results.length})`);
      
      // Update the results with filtered jobs
      data.results = filteredJobs;
      data.count = filteredJobs.length;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
