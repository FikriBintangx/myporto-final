import type { APIRoute } from 'astro';
import lintreeData from '../../data/lintree.json';

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(lintreeData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60'
        }
    });
};
