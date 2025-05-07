import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface ConsentLog {
  consent: { necessary: boolean; analytics: boolean; marketing: boolean };
  timestamp: string;
  ip?: string;
}

export async function POST(req: Request) {
    try{
        const { consent, timestamp, ip } = await req.json() as ConsentLog;

        if (!consent || !timestamp) {
            return new NextResponse('Invalid request', {status: 400}) 
        }

        await prismadb.cookieConsent.create({
            data: {
                necessary: consent.necessary,
                analytics: consent.analytics,
                marketing: consent.marketing,
                timestamp: new Date(timestamp),
                ip: ip || null, // Store null if no IP provided
            },
        });
        return new NextResponse('Consent logged', {status: 200})
    } catch (error) {
        console.error('Failed to log consent:', error);
        return new NextResponse('Server error', {status: 500})
    }
//     const { consent, timestamp, ip } = req.body as ConsentLog;

//     // Validate input
//     if (!consent || !timestamp) {
//       return res.status(400).json({ message: 'Invalid request' });
//     }

//     try {
//       await prismadb.cookieConsent.create({
//         data: {
//           necessary: consent.necessary,
//           analytics: consent.analytics,
//           marketing: consent.marketing,
//           timestamp: new Date(timestamp),
//           ip: ip || null, // Store null if no IP provided
//         },
//       });
//       return res.status(200).json({ message: 'Consent logged' });
//     } catch (error) {
//       console.error('Failed to log consent:', error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
}