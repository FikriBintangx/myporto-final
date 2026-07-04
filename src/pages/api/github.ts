import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const username = 'FikriBintangx';
    // Get token from Astro environment variables (.env)
    const token = import.meta.env.GITHUB_TOKEN;
    
    // Parse URL parameters
    const url = new URL(request.url);
    const yearParam = url.searchParams.get('year');
    
    // 1. If no token is provided, fallback to the public Deno API (which only supports the last 365 days)
    if (!token) {
        try {
            const fallbackResponse = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
            if (!fallbackResponse.ok) {
                return new Response(JSON.stringify({ error: 'Failed to fetch from fallback API' }), { status: 500 });
            }
            const data = await fallbackResponse.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
        }
    }
    
    // 2. If token IS provided, use GitHub GraphQL API to fetch any year!
    try {
        let fromDate, toDate;
        
        if (yearParam) {
            // Specific year
            fromDate = `${yearParam}-01-01T00:00:00Z`;
            toDate = `${yearParam}-12-31T23:59:59Z`;
        } else {
            // Last 365 days (default)
            const to = new Date();
            const from = new Date();
            from.setFullYear(from.getFullYear() - 1);
            fromDate = from.toISOString();
            toDate = to.toISOString();
        }

        const query = `
            query {
                user(login: "${username}") {
                    contributionsCollection(from: "${fromDate}", to: "${toDate}") {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    date
                                    contributionCount
                                    color
                                }
                            }
                        }
                    }
                }
            }
        `;

        const githubResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });

        const githubData = await githubResponse.json();

        if (githubData.errors) {
            return new Response(JSON.stringify({ error: 'GitHub API Error', details: githubData.errors }), { status: 500 });
        }

        const calendar = githubData.data.user.contributionsCollection.contributionCalendar;
        
        // Map GraphQL format to match the Deno API format so our frontend script.js doesn't break
        const formattedData = {
            totalContributions: calendar.totalContributions,
            contributions: calendar.weeks.map((week: any) => 
                week.contributionDays.map((day: any) => ({
                    date: day.date,
                    contributionCount: day.contributionCount,
                    color: day.color,
                    // The Deno API also provides contributionLevel, but we mainly need count and color for the UI
                    contributionLevel: day.contributionCount === 0 ? "NONE" : 
                                     day.contributionCount <= 3 ? "FIRST_QUARTILE" :
                                     day.contributionCount <= 6 ? "SECOND_QUARTILE" :
                                     day.contributionCount <= 9 ? "THIRD_QUARTILE" : "FOURTH_QUARTILE"
                }))
            )
        };

        return new Response(JSON.stringify(formattedData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error fetching GitHub API:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
