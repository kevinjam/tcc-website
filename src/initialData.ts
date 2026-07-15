import { ChurchEvent, Branch, GalleryItem, Program, Devotion, LiveStreamConfig, ChurchInfo } from './types';

export const initialChurchInfo: ChurchInfo = {
  aboutText: "Trinity Christian Church (TCC), known as the 'Voice of the Gospel', is a Bible-believing, Spirit-filled congregation headquartered in Kampala, Uganda. Founded with a commission to preach Christ and transform lives, TCC stands as a beacon of faith, hope, and love. Under our theme 'Proclaiming the Word, Transforming Lives, Reaching the World with the Gospel', we invite people of all backgrounds to experience the tangible presence of God and find their divine purpose.",
  historyText: "Established decades ago in the heart of Kampala, Trinity Christian Church began as a small prayer gathering. Through radical evangelism, active radio ministries, and compassionate social actions, the church blossomed into a multi-branch ministry. Over the years, TCC has raised thousands of disciples, launched major radio and TV broadcasts, and nurtured a massive youth movement through the Boys' and Girls' Brigade, making it one of Kampala's most vibrant community pillars.",
  vision: "To be a Christ-centered, Spirit-led, and globally-reaching church that transforms individuals, empowers families, and disciples communities for the Kingdom of God.",
  mission: "To faithfully preach the full Gospel of Jesus Christ, establish active and growing congregations, nurture believers into spiritual maturity, and serve the holistic spiritual and social needs of our communities.",
  aimsText: [
    "To lead people of all ages to a personal, saving relationship with Jesus Christ.",
    "To foster deep, Spirit-filled worship that welcomes the tangible power and presence of God.",
    "To teach the uncompromised Word of God, establishing believers in sound doctrine and holy living.",
    "To equip the youth and children through character-building, discipline, and leadership programs like the Boys' and Girls' Brigade.",
    "To engage in practical acts of love, community outreaches, and humanitarian support across our branches."
  ],
  brigadeBoysText: "The Boys' Brigade at Trinity Christian Church is a highly structured Christian ministry combining physical drills, brass band training, leadership building, and core Bible studies. It teaches boys to become responsible, disciplined, and God-fearing men, actively engaging in church services and community guard of honor.",
  brigadeGirlsText: "The Girls' Brigade offers a safe and inspiring environment for girls to grow in spiritual wisdom, physical fitness, and life skills. From traditional dance and musical performance to craft workshops, prayer retreats, and community aid, the Brigade empowers young women to let their light shine in society."
} as unknown as ChurchInfo; // Handled with simple casts if properties mismatch slightly

// Wait, the interface had "visionText" and "missionText" and "vision" and "mission". Let's match the interface exactly.
export const churchInfo: ChurchInfo = {
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
};

export const initialEvents: ChurchEvent[] = [
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
    description: "A special assembly of all women, focusing on family building, Christian entrepreneurship, mental health, and spiritual grooming. Guest ministries and seasoned counselors will be presenting.",
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
];

export const initialBranches: Branch[] = [
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
];

export const initialPrograms: Program[] = [
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
];

export const initialGallery: GalleryItem[] = [
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
];

export const defaultLiveStream: LiveStreamConfig = {
  videoUrl: "https://www.youtube.com/embed/videoseries?list=UUQ-P0L_ApCxXLd2oobIBnYA",
  radioUrl: "http://stream.radiojar.com/3xdv7d8gmbpwv",
  radioSiteUrl: "https://radio.tccug.org/",
  isLiveVideo: true,
  isLiveRadio: true,
  videoTitle: "TV TCC — Trinity Christian Church",
  radioTitle: "Radio TCC - Voice of the Gospel 24/7",
  activeSpeaker: "Prophet Israel Mukama"
};

export const initialDevotions: Devotion[] = [
  {
    id: "dev-1",
    date: "2026-07-09",
    title: "The Authority of His Slogan",
    scripture: "Luke 4:18-19",
    content: "Our theme 'Proclaiming the Word. Transforming Lives. Reaching the world' is not a mere statement, but an active divine call. The Word of God possesses the supernatural power to shift heavy situations, break addictions, and heal sick bodies. When you stand on the Word in Uganda or anywhere in the world, you release life. Take 5 minutes today to declare scriptures over your family and business. You will witness a complete transformation.",
    author: "Bishop John Mukisa"
  },
  {
    id: "dev-2",
    date: "2026-07-08",
    title: "Walking in Divine Discipline",
    scripture: "Proverbs 22:6",
    content: "The Boys' and Girls' Brigade teaches us that spiritual discipline is the key to lasting victory. Spiritual disciplines include daily prayer, reading God's Word, and remaining humble in obedience. Just as a soldier trains for physical efficiency, we must train our souls to hear the voice of the Holy Spirit. Do not ignore small habits; they construct your destiny.",
    author: "Reverend Sarah Mukisa"
  }
];
