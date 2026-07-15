import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Paths for persistent JSON databases
const DATA_DIR = path.join(process.cwd(), 'data');
const CHURCH_DATA_PATH = path.join(DATA_DIR, 'church_data.json');
const SUBMISSIONS_PATH = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure submissions file exists for contact form + admin inbox
if (!fs.existsSync(SUBMISSIONS_PATH)) {
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify([], null, 2));
}

function readSubmissions(): any[] {
  try {
    if (!fs.existsSync(SUBMISSIONS_PATH)) return [];
    const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSubmissions(submissions: any[]): void {
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2));
}

// Lazy load Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// CMS Data Endpoints
// -----------------------------------------------------------------------------

// Load initial data from memory if files don't exist
const getInitialDefaultState = () => {
  // Rather than importing ts files directly in server (which might trigger ESM/CJS transpilation issues in esbuild),
  // we define a simple backup structure here.
  return {
    info: {
      aboutText: "Trinity Christian Church is a Prophetic Ministry under Prophet Israel Mukama as the Vision bearer and Pastor Omoding Jacob as the church pastor. The Ministry began with the call of Prophet Israel on the 28th November 1993. The church is the body of Christ, the habitation of God through the Spirit with Divine appointments for the fulfillment of her great commission.",
      historyText: "The Ministry began with the call of Prophet Israel Mukama on the 28th November 1993. The church began in his house when he was still staying along Rashid Khamis Road. It later moved along Rubaga Road under a mango tree. The church now has a permanent home along Rubaga Road after Tosha Petrol Station, a few meters (approximately 10 meters) off the main road.",
      visionText: "To bring people to know and understand the one True God who has revealed Himself as eternally self-existent: \"I AM\" the Creator of Heaven and Earth and the Redeemer of mankind (Jeremiah 1:16-19; Deuteronomy 6:4; Isaiah 43:10-13). \"I am the God of your father, the God of Abraham, the God of Isaac, and the God of Jacob\" (Exodus 3:6).",
      missionText: "To collectively depend on our relationship with Christ and take his love and power to everyone in our communities and the world as a whole: Winning the lost Christians; Building them in faith; Equipping them to minister or serve and multiply to maturity for leadership (Ephesians 1:20-23, Matthew 28:19-20, 2 Timothy 2:2, Ephesians 5:18).",
      aimsText: [
        "To conduct religious services, namely church services including marriage ceremonies, funeral services, baptism services, gospel crusades, conferences and conventions, seminars, dedication and ordination services, and holy communion services, among others (Ephesians 1:22, Matthew 28:19-20, 2 Timothy 2:2).",
        "To establish churches that are self-governing, self-propagating, and self-supporting bodies known as local churches, all under the supervision of the headquarters of Trinity Christian Church.",
        "To promote evangelism to fulfill Christ's command: Go ye into all the world and preach the Gospel to every creature (Mark 16:15; Matthew 28:19).",
        "To establish and maintain programs, schemes, or projects which will contribute to the evangelism of the population of Uganda and beyond.",
        "To initiate, support, and sustain activities that are particularly designed to bear Christian witness to all people through newsletters, periodicals, sound broadcasting, films, and other means.",
        "To undertake and execute any charitable agencies which may seem directly or indirectly conducive to the objects of the Church.",
        "To operate institutions of charity such as orphanages, old age homes, guest houses, secular schools, Bible schools, health centers, literacy programs, primary health care, and vocational schools, among others.",
        "To provide for the spiritual growth and fellowship of the children, the youth, and the flock at large through seminars, classes, and conferences."
      ],
      brigadeBoysText: "The Boys' Brigade (TCC Company) is a pillar of our youth ministry. It focuses on anchoring young boys in the Christian faith while developing physical strength, moral character, and outstanding leadership skills. Through brass band ensembles, camping expeditions, guard-of-honor drills, and peer discipleship, we raise strong, responsible Christian men.",
      brigadeGirlsText: "The Girls' Brigade at TCC is dedicated to helping girls discover their full potential in Christ. Combining physical fitness, craft training, musical activities, and deep spiritual mentoring, the Brigade grooms young girls into virtuous, confident, and influential women of integrity who serve both the church and the nation."
    },
    events: [
      {
        id: "evt-1",
        title: "Annual Youth & Brigade Camp 2026",
        date: "2026-08-15",
        time: "08:00 AM - 05:00 PM",
        location: "TCC Mukono Branch Grounds",
        description: "An immersive 7-day camp featuring brass band training, physical drills, Bible quizzes, talent nights, and impactful worship sessions. Open to all youth and brigade members across all branches.",
        category: "Brigade",
        isFeatured: true
      },
      {
        id: "evt-2",
        title: "Friday Breakthrough Overnight",
        date: "2026-07-24",
        time: "10:00 PM - 05:00 AM",
        location: "Main Sanctuary, Rubaga Kampala",
        description: "A powerful night of intercession, spontaneous worship, and raw deliverance. Come expecting instant miracles, healing, and prophetic direction as we cry out to God for our families.",
        category: "Prayer",
        isFeatured: true
      },
      {
        id: "evt-3",
        title: "Sisters of Grace Annual Seminar",
        date: "2026-09-05",
        time: "09:00 AM - 03:00 PM",
        location: "Kampala Headquarters",
        description: "A special assembly of all women, focusing on family building, Christian entrepreneurship, mental health, and spiritual grooming.",
        category: "Community"
      },
      {
        id: "evt-4",
        title: "Mukono Branch Thanksgiving Crusade",
        date: "2026-08-02",
        time: "04:00 PM - 07:30 PM",
        location: "Mukono Town Hall Square",
        description: "A community open-air crusade celebrating 5 years of the Mukono Branch. Expect powerful gospel messages, praise explosion, and healing prayers for the sick.",
        category: "Outreach"
      }
    ],
    branches: [
      {
        id: "br-1",
        name: "Kampala Headquarters (Main Branch)",
        location: "Rubaga Road - Kampala, P.O.Box 14055 Mengo - Kampala - Uganda",
        pastor: "Prophet Israel Mukama (Vision Bearer) & Pastor Omoding Jacob",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "Trinity Christian Church aims to establish churches that are self-governing, self-propagating, and self-supporting bodies known as local churches, all under the supervision of Trinity Christian Church's main branch.",
        isHeadquarters: true
      },
      {
        id: "br-2",
        name: "Namiyembe Branch",
        location: "Namiyembe Trading Centre, Kanginima Sub County, Butebo District, Eastern Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "The church has a permanent structure, built on church-owned land. It has a school, Namiyembe Primary School, with about 120 pupils from Nursery to Primary Six."
      },
      {
        id: "br-3",
        name: "Mijinje Branch",
        location: "Mijinje Parish, Semuto Sub-County, Nakaseke District, Central Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "The church is currently operating in a temporary structure because the land is still being rented."
      },
      {
        id: "br-4",
        name: "Iganga Branch",
        location: "Bugumba, a few meters off Kaliro Road, Northern Division, Iganga Municipality, Busoga Sub Region, Eastern Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "The church is currently operating in a temporary structure because the land is still being rented."
      },
      {
        id: "br-5",
        name: "Kyegegwa Branch",
        location: "Kyegegwa District, Toro Sub Region, Western Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "The church is currently operating in a temporary structure built on church-owned land. Construction of a permanent structure is starting soon."
      },
      {
        id: "br-6",
        name: "Nansanga Branch",
        location: "Main Mbale Road, Nansanga Village, Nansanga Sub County, Budaka District, Eastern Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "The permanent church structure is in the finishing stage. It has been constructed on church-owned land."
      },
      {
        id: "br-7",
        name: "Kitagwenda Branch",
        location: "Kitagwenda District, Western Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "Currently using a temporary structure on church-owned land. Construction of a permanent church structure is starting soon, with some materials already on site."
      },
      {
        id: "br-8",
        name: "Kasanda Branch",
        location: "Kasanda District, Central Uganda",
        pastor: "Contact Headquarters",
        phone: "+256 776 955 255",
        email: "info@trinitychristianchurch.org.ug",
        description: "Seated on land owned by the church."
      }
    ],
    programs: [
      {
        id: "prg-1",
        name: "Main Worship Service",
        day: "Sunday",
        time: "6:30 AM onwards",
        description: "A powerful worship experience filled with heartfelt praise and worship, fervent prayer, inspiring testimonies, life-transforming biblical teaching, and fellowship with believers. Come expecting God's presence, healing, restoration, and spiritual renewal.",
        location: "Main Sanctuary, Rubaga Road"
      },
      {
        id: "prg-2",
        name: "Radio TCC Programmes",
        day: "Monday",
        time: "Throughout the day",
        description: "Inspiring messages, biblical teachings, worship music, prayer sessions, and encouraging discussions on Radio TCC. Tune in and be spiritually refreshed.",
        location: "Radio TCC / radio.tccug.org"
      },
      {
        id: "prg-3",
        name: "Women's Fellowship",
        day: "Tuesday",
        time: "9:00 AM – 2:00 PM",
        description: "A special fellowship for women providing worship, prayer, Bible study, mentorship, counseling, and spiritual empowerment. Grow in faith, strengthen family values, and support one another in Christian living.",
        location: "Main Sanctuary, Rubaga Road"
      },
      {
        id: "prg-4",
        name: "Radio TCC Programmes",
        day: "Wednesday",
        time: "Throughout the day",
        description: "Midweek encouragement through God's Word, worship, testimonies, inspirational teachings, and gospel music designed to strengthen your faith and keep you connected to Christ.",
        location: "Radio TCC / radio.tccug.org"
      },
      {
        id: "prg-5",
        name: "Men's Fellowship",
        day: "Thursday",
        time: "4:00 PM – 5:00 PM",
        description: "Men gather for prayer, Bible study, mentorship, leadership development, and encouragement to become faithful Christian leaders in their homes, workplaces, communities, and the Church.",
        location: "Main Sanctuary, Rubaga Road"
      },
      {
        id: "prg-6",
        name: "Youth Service",
        day: "Thursday",
        time: "5:00 PM – 8:00 PM",
        description: "An energetic, Spirit-filled service for young people — vibrant praise and worship, biblical teaching, prayer, fellowship, mentorship, and activities that inspire youth to live boldly for Christ.",
        location: "Main Sanctuary, Rubaga Road"
      },
      {
        id: "prg-7",
        name: "Breaking Yokes Prayer Service",
        day: "Friday",
        time: "12:00 PM – 2:00 PM",
        description: "A powerful intercessory prayer service where burdens are lifted, chains are broken, and believers experience God's deliverance, healing, restoration, and breakthrough.",
        location: "Main Sanctuary, Rubaga Road"
      },
      {
        id: "prg-8",
        name: "Radio TCC Live Programmes",
        day: "Friday",
        time: "4:00 PM – 11:00 PM",
        description: "Inspirational preaching, gospel music, live discussions, testimonies, prayer sessions, interviews, and special broadcasts on Radio TCC as we prepare our hearts for the weekend.",
        location: "Radio TCC / radio.tccug.org"
      },
      {
        id: "prg-9",
        name: "Children's Service",
        day: "Saturday",
        time: "12:00 PM",
        description: "A special service nurturing children in the love, knowledge, and fear of the Lord through Bible lessons, worship, songs, games, and interactive activities.",
        location: "Main Sanctuary, Rubaga Road"
      }
    ],
    gallery: [
      {
        id: "gal-1",
        url: "/media/01.png",
        title: "Ministry leaders sharing at the Sunday service",
        category: "Worship",
        date: "2026-06-08"
      },
      {
        id: "gal-2",
        url: "/media/02.png",
        title: "The Word proclaimed from the Rubaga Road pulpit",
        category: "Worship",
        date: "2026-06-15"
      },
      {
        id: "gal-3",
        url: "/media/03.png",
        title: "Sisters in ministry leading with passion",
        category: "Worship",
        date: "2026-06-22"
      },
      {
        id: "gal-4",
        url: "/media/04.png",
        title: "Worship and teaching at Trinity Christian Church",
        category: "Worship",
        date: "2026-06-29"
      },
      {
        id: "gal-5",
        url: "/media/05.png",
        title: "Pastoral leadership declaring the Word of God",
        category: "Worship",
        date: "2026-07-01"
      },
      {
        id: "gal-6",
        url: "/media/06.png",
        title: "A Spirit-filled moment during the main service",
        category: "Worship",
        date: "2026-07-05"
      },
      {
        id: "gal-7",
        url: "/media/07.png",
        title: "Praise & worship before the cross pulpit",
        category: "Worship",
        date: "2026-07-06"
      },
      {
        id: "gal-8",
        url: "/media/08.png",
        title: "Congregation gathered in the presence of God",
        category: "Community",
        date: "2026-07-07"
      },
      {
        id: "gal-9",
        url: "/media/09.png",
        title: "Fellowship and faith in action",
        category: "Community",
        date: "2026-07-08"
      },
      {
        id: "gal-10",
        url: "/media/10.png",
        title: "Worship broadcast from TCC Rubaga Road",
        category: "Media",
        date: "2026-07-09"
      },
      {
        id: "gal-11",
        url: "/media/11.png",
        title: "Sunday celebration captured live",
        category: "Worship",
        date: "2026-07-10"
      },
      {
        id: "gal-12",
        url: "/media/12.png",
        title: "The Great Banquet — Live on Radio TCC",
        category: "Media",
        date: "2026-07-11"
      },
      {
        id: "gal-13",
        url: "/media/13.png",
        title: "Radio TCC Voices of the Gospel studio session",
        category: "Media",
        date: "2026-07-12"
      },
      {
        id: "gal-14",
        url: "/media/14.png",
        title: "Ekondere Live on Radio TCC — Rubaga Road",
        category: "Media",
        date: "2026-07-13"
      }
    ],
    liveStream: {
      videoUrl: "https://www.youtube.com/embed/videoseries?list=UUQ-P0L_ApCxXLd2oobIBnYA",
      radioUrl: "http://stream.radiojar.com/3xdv7d8gmbpwv",
      radioSiteUrl: "https://radio.tccug.org/",
      isLiveVideo: true,
      isLiveRadio: true,
      videoTitle: "TV TCC — Trinity Christian Church",
      radioTitle: "Radio TCC - Voice of the Gospel 24/7",
      activeSpeaker: "Prophet Israel Mukama"
    }
  };
};

// GET all church data (Supports both /api/church-data and /api/church-info)
const getChurchDataHandler = (req: express.Request, res: express.Response) => {
  try {
    if (fs.existsSync(CHURCH_DATA_PATH)) {
      const fileData = fs.readFileSync(CHURCH_DATA_PATH, 'utf-8');
      return res.json(JSON.parse(fileData));
    } else {
      // Create with default state
      const defaultState = getInitialDefaultState();
      fs.writeFileSync(CHURCH_DATA_PATH, JSON.stringify(defaultState, null, 2));
      return res.json(defaultState);
    }
  } catch (error) {
    console.error('Error reading church data:', error);
    res.status(500).json({ error: 'Failed to retrieve church data' });
  }
};

app.get('/api/church-data', getChurchDataHandler);
app.get('/api/church-info', getChurchDataHandler);

// POST/PUT to update church data (Supports both /api/church-data and /api/church-info)
const updateChurchDataHandler = (req: express.Request, res: express.Response) => {
  try {
    const updatedData = req.body;
    fs.writeFileSync(CHURCH_DATA_PATH, JSON.stringify(updatedData, null, 2));
    res.json({ success: true, message: 'Church content updated successfully' });
  } catch (error) {
    console.error('Error updating church data:', error);
    res.status(500).json({ error: 'Failed to update church data' });
  }
};

app.post('/api/church-data', updateChurchDataHandler);
app.put('/api/church-info', updateChurchDataHandler);

// GET all form submissions (For admin)
app.get('/api/submissions', (req, res) => {
  try {
    return res.json(readSubmissions());
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

// POST a new submission from /contact → data/submissions.json
app.post('/api/submissions', (req, res) => {
  try {
    const { fullName, phone, email, message, interestArea } = req.body || {};

    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Full name and phone are required' });
    }

    const saved = {
      id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: String(fullName).trim(),
      email: email ? String(email).trim() : '',
      phone: String(phone).trim(),
      interestArea: interestArea ? String(interestArea).trim() : 'Just Joining as Member',
      message: message ? String(message).trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'New' as const,
    };

    const submissions = readSubmissions();
    submissions.unshift(saved);
    writeSubmissions(submissions);

    res.json({
      success: true,
      submission: saved,
      message: 'Thank you for joining our family! Our leaders will contact you shortly.',
    });
  } catch (error) {
    console.error('Error writing submission:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

// POST to sync all submissions (admin status updates / deletes)
app.post('/api/submissions/sync', (req, res) => {
  try {
    const submissions = Array.isArray(req.body) ? req.body : [];
    writeSubmissions(submissions);
    res.json({ success: true, message: 'Submissions synced successfully' });
  } catch (error) {
    console.error('Error syncing submissions:', error);
    res.status(500).json({ error: 'Failed to sync submissions' });
  }
});

// POST to reset data to initial defaults
app.post('/api/reset', (req, res) => {
  try {
    const defaultState = getInitialDefaultState();
    fs.writeFileSync(CHURCH_DATA_PATH, JSON.stringify(defaultState, null, 2));
    if (fs.existsSync(SUBMISSIONS_PATH)) {
      fs.unlinkSync(SUBMISSIONS_PATH);
    }
    res.json({ success: true, message: 'System state reset to defaults successfully' });
  } catch (error) {
    console.error('Error resetting system state:', error);
    res.status(500).json({ error: 'Failed to reset system data' });
  }
});

// -----------------------------------------------------------------------------
// Gemini AI Devotion Generator
// -----------------------------------------------------------------------------
app.post('/api/gemini/devotion', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const client = getAiClient();
    if (!client) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        title: `Grace & Healing in times of ${topic}`,
        scripture: "Philippians 4:6-7",
        content: `Beloved, when we look for guidance about "${topic}", the scriptures remind us to be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God. As members of the Trinity Christian Church family, let us lift up our hearts. Whatever battle or joy "${topic}" represents in your life today, remember that the Voice of the Gospel is a call of absolute victory. Speak to your local branch leaders or prayer altars if you need laying of hands. God bless you!`,
        author: "TCC Pastoral Team (AI Sandbox Mode)",
        isAiGenerated: true,
        isDemoFallback: true
      });
    }

    const prompt = `Write a short, powerful, inspiring daily devotion for a Christian church website. 
    The topic is: "${topic}".
    The style should be loving, compassionate, authoritative, Pentecostal African preacher, but intellectual.
    Format your response STRICTLY as a JSON object with the following properties:
    - title: A catchy and spiritual title for the devotion.
    - scripture: A relevant bible verse, written out (e.g., "John 14:27 - Peace I leave with you...").
    - content: The devotion text. Keep it between 3 to 4 short paragraphs. Include practical spiritual advice.
    - author: Provide a pastoral pseudonym (e.g., "Bishop John Mukisa" or "Reverend Sarah Mukisa").
    
    Return ONLY raw valid JSON. Do not include markdown codeblock tags around it.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsedResponse = JSON.parse(response.text.trim());
    return res.json({
      ...parsedResponse,
      isAiGenerated: true
    });
  } catch (error) {
    console.error('Gemini devotion generator error:', error);
    // Fallback if API crashes or rates limits
    return res.json({
      title: `Finding God in ${topic}`,
      scripture: "Isaiah 41:10",
      content: `In exploring "${topic}", know that God is with you. Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand. Let the altar fire continue to burn in your spirit today. Engage in weekly programs at Trinity Christian Church to nurture this strength.`,
      author: "Bishop John Mukisa (Apostolic Guide)",
      isAiGenerated: true,
      isErrorFallback: true
    });
  }
});

// -----------------------------------------------------------------------------
// Vite Dev Server / Static Assets
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Running in DEVELOPMENT mode via Vite middleware.');
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Running in PRODUCTION mode, serving static files.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
