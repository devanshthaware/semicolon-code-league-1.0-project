
export interface AnalyzeRequest {
  candidate_id?: string;
  skills?: string[];
  resume_text?: string;
  role_id?: string;
  level?: "intern" | "junior" | "mid" | "senior";
  target_role_skills?: string[];
  experience_years?: number;
}

export interface AnalysisResult {
    // allowing any for now as result structure wasn't explicitly seen, but it returns 'result' from run_analysis
    // Adjust based on actual response
    [key: string]: any; 
}

const ML_BACKEND_URL = process.env.NEXT_PUBLIC_ML_BACKEND_URL || 'http://localhost:8000';

export async function analyzeCareerReadiness(data: AnalyzeRequest): Promise<AnalysisResult> {
  const response = await fetch(`${ML_BACKEND_URL}/inference/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ML Backend Error: ${response.status} ${errorText}`);
  }

  return response.json();
}
