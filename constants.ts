import { Project, ConnectionMap, TopicConnection } from './types';

// Points to public/images/ for fallback
const IMG_PATH = "images/";

export const PROJECTS: Project[] = [
    { 
        id: "p1", 
        label: "Refin(d)ing KISD", 
        metaInfo: "Self Initiated Project, 1 Year, Lead Team of 3 people + 5 helpers for workshop",
        img: "https://drive.google.com/file/d/1mbBe24qtWYByFhv4dyuR9157Xc4oF4SW/view?usp=sharing",
        gallery: [
            {
                url: "https://drive.google.com/file/d/1leuX4mz6wHOU133up2gAlhmCIMMruUPk/view?usp=sharing",
                caption: "Visualisation of the surveys outcome"
            },
            {
                url: "https://drive.google.com/file/d/14tGXb9mMftnbFNGXUqQ3CQD2pgt7LSwl/view?usp=sharing",
                caption: "One of our workshop participants \"designer doll\", built to reflect on designer personality, needs and dreams"
            }
        ],
        text: "Every organized form of a group of people once in a while needs a moment in time to step back and reflect on their ways of working, their goals and structures. Same goes for a university, especially when there is so little structure from top to bottom like there is at KISD.\nThis Project started with the will to shape the place we care for and the feeling that there was a need for conversation. People were feeling less responsible for the place because they are lacking community, feedback and the feeling of impact and Self-efficacy. I find this very interesting because to me my university has always felt a bit like a small testing ground for societal phenomena since we can see a similar sense learned helplessness.\nTherefore we started a survey first asking people how they feel towards their design education right now, what they love about KISD and what they would like to change. We visualized the answers because of the frequent feedback of how much just talking about it had helped with the frustration that had been rising.\nTo establish a reoccurring event we partnered with an existing working group who would facilitate a yearly questionnaire and an event that works as a discussion forum where ideas, needs and wishes can be formulated. We followed the ideas of playful learning, eye level discussions and diverse design methods for the final iteration process." 
    },
    { 
        id: "p2", 
        label: "Real Life Quest", 
        metaInfo: "Start-Up Project, 1/2 Year, Team with Daniel Hinrichs",
        img: "https://drive.google.com/file/d/1FMQWAydFG1Pd7ExURSlcjWnTSorJbxRX/view?usp=sharing",
        gallery: [
            {
                url: "https://drive.google.com/file/d/1EBFeXjLffoExdi5AJb9CI-b-lV3zkTgs/view?usp=sharing",
                caption: "Examples for Quests according to the 4 categories"
            }
        ],
        videos: [
            { 
                url: "https://drive.google.com/file/d/1wSIhuUx7triVKNjWQg5VQeakODMEQGsI/view?usp=sharing",
                caption: "App prototype showing start scree, chronic and multiplayer mode"
            },
            { 
                url: "https://drive.google.com/file/d/1SJUwoXyRoDZDbyuITe4gpuTrvNXKulfZ/view?usp=sharing",
                caption: "App prototype showing the steps of recieving and fulfilling a Real Life Quest"
            }
        ],
        videoAspectRatio: "aspect-[9/16]",
        text: "With Real Life Quest, we have designed a socio-effective concept that is brought to life in the form of an everyday app. Because we are becoming increasingly alienated from our \"Umwelt\" and less happy due to a lack of interaction, we want to promote resonance and sharpen our awareness of details and microcosms.\nOur app provides its users with playful micro-adventures in the form of spontaneous, funny, social, and educational everyday quests. We chose the symbolic image of a soap bubble for the design because it embodies the lightheartedness associated with childhood, as well as the bubbles in which we move.\nOur design is intuitive and minimalistic because we promote real time rather than screen time. The app can be operated with just a few gestures and the user interface consists of only three different screens. In addition to receiving and collecting personal quests, you can also do analog group quests with friends, create own quests and create memories together." 
    },
    { 
        id: "p3", 
        label: "Chaos Postcards", 
        metaInfo: "Course, 1/2 Year",
        img: "https://drive.google.com/file/d/1ytEBCK91hn2dcTGH_5QgXUCteQMd2ECz/view?usp=sharing",
        gallery: [
            {
                url: "https://drive.google.com/file/d/1sXSOjy16EQ9LLfWZr6ZDG4pP5D-YUi45/view?usp=sharing",
                caption: "Back-side of Postcard for World Earth Day"
            },
            "https://drive.google.com/file/d/1KxlhA1katqfikZJT9tuDWSdGECS4hQ4P/view?usp=sharing",
            "https://drive.google.com/file/d/1zgeEWWBQl02ytmbFkyNYGPnKyrWHnSzn/view?usp=sharing"
        ],
        text: "With this set of postcards I want to bring awareness to the topic of landscape manipulation and its consequences for the ecosystem.\nThe seemingly pretty patterns we see on earths surface often mean chaos and destruction for animals and other non human life." 
    },
    { 
        id: "p4", 
        label: "New Years Stage Design", 
        metaInfo: "Self Initiated Project, 4 Months, Team of three people",
        img: "https://drive.google.com/file/d/13emwuLJ1zZtZUCb7rr-Mcpzh_XsfRinI/view?usp=sharing",
        gallery: [
            {
                url: "https://drive.google.com/file/d/1adN5wmzo7l1WioXOrCmLv7rz3XypYCDC/view?usp=sharing",
                caption: "Stage with revealed art pieces"
            },
            {
                url: "https://drive.google.com/file/d/1xOrCxMKA9Balfov2LuoaT0nWCfCdJ-Dd/view?usp=sharing",
                caption: "Night of the party with projection mapping on our mapping piece"
            }
        ],
        videos: [
            { 
                url: "https://drive.google.com/file/d/1Wy32GcaOdsNThG4UiFONAuFdxJRBaWXs/view?usp=sharing",
                caption: "Documentation of our demolition performance, bringing the arts back to live"
            }
        ],
        text: "The entire suburban culture scene of Cologne has been facing huge financial cuttings. Multiple venues have shut down due to money struggles and gentrification. The Halls of the Artist Community  “Kolbhalle” will be torn down in 2026 and they are forced out of their homes and ateliers. They need every event to be a call for help, money and awareness to their situation in order to afford to keep their community living.\nTo help with that we partnered with the “freiraum” (free space) collective Cologne in order to create an interactive stage design.  We developed a performance which turned the main floor, decorated to look like a construction site back into a space for art and culture, resisting the threat of demolition. Our centerpiece was a huge demolition ball, which revealed the mapping piece we made for the stage." 
    },
    { 
        id: "p5", 
        label: "Co-Heat Wuppertal", 
        metaInfo: "Summer school, 2 Weeks, Team of 5 People",
        img: "https://drive.google.com/file/d/1h1BfTt7agzs8M1GqfK9dtVxpiQEZkbVc/view?usp=sharing",
        gallery: [],
        text: "With our product–service system Co-Heat, we offer an approach to addressing the future of sustainable, shared energy resources in multi-party residential buildings. Following the Transition Design Guide developed by the Wuppertal Institute, we mapped out our user journey, future megatrends, and the Sustainable Development Goals our project addresses.\nIn addition to an information board and an online platform for user support, maintenance, and individual settings, we developed, based on my initial draft, a new kind of thermostat. This thermostat allows users to select a limited base temperature while still enabling additional heating through a timer-controlled function.\nOur product–service system therefore enables housing communities to collectively manage their energy consumption, encourages low energy and water use by rewarding sustainable habits, and supports property owners in meeting political climate-protection regulations." 
    },
    { 
        id: "p6", 
        label: "Living Cologne", 
        metaInfo: "City Project, 1/2 Year",
        img: "https://drive.google.com/file/d/1USL_DTgVbk6ooK-mzYpuBfjbhPCwfh7S/view?usp=sharing",
        gallery: [
            {
                url: "https://drive.google.com/file/d/1RdFLIzCEGkxPVc9vpZ65sH3XAXDzvpbh/view?usp=sharing",
                caption: "Website Prototype showing site for observer spots, marked with QR-Codes"
            },
            {
                url: "https://drive.google.com/file/d/1OwuZGBijTN9iuNBAID4a_6kZ1Y4HobXa/view?usp=sharing",
                caption: "Site showing the Explorer Tours through the city, scouting for animal habitats"
            }
        ],
        videos: [
            {
                url: "https://drive.google.com/file/d/1WbvmDhkuZGe6BaT3F5xm4Gy7B9m6Ad43/view?usp=sharing",
                caption: "Scroll video of prototype showing a specific animal selected"
            }
        ],
        headerImagePosition: "object-top",
        text: "The wilderness city map Living Cologne invites you to discover the city’s shared habitat from a non-human perspective, offering an introduction to a post-anthropocentric worldview. Exploration routes and benches lead to seemingly familiar places, which can be experienced in entirely new ways through the animal stories on the website.\nHere, you can not only learn, but also share your own observations and help animals become more visible and better understood.\nI believe that recognition is the first step toward collective well-being. Paying attention to more-than-human life in our human-made cities reminds us that we are never separate from nature. We share spaces we are responsible for—and with sharing comes caring." 
    },
    { 
        id: "p7", 
        label: "Masculine Desire in Fashion", 
        metaInfo: "Self Initiated Project, 1/2 Year, Lead team with Lovis Köpcke + 5 Participants",
        img: "https://drive.google.com/file/d/1qHojY7vTZGJm53laoMwRdH4GeHbpxS2p/view?usp=sharing",
        imageSequence: [
            "https://drive.google.com/file/d/16uHOAOWV0CSGKrTaMp-IntZZ_fy8rl18/view?usp=sharing",
            "https://drive.google.com/file/d/14d1q1pN7ovVZywMw_ZmqNhH2EiKlSlHr/view?usp=sharing",
            "https://drive.google.com/file/d/1lh6XiBGVaRVi8FcjT5QSUogxWlMWGKJg/view?usp=sharing",
            "https://drive.google.com/file/d/1TPouaVQ4--wrs4rZj9mKka3ztYUzsk_a/view?usp=sharing",
            "https://drive.google.com/file/d/18vVZMRoOUnWYYUDTtEsVHJBPfTNG_ZNX/view?usp=sharing",
            "https://drive.google.com/file/d/1gtZ3QTYqrSV02tchj6wbg-voFuaCMmx2/view?usp=sharing",
            "https://drive.google.com/file/d/1JRtX4XFdG2XLftPWanOr8GDoayDRpS17/view?usp=sharing",
            "https://drive.google.com/file/d/1C0pEh2z94J8VZIy9o8jVr6cVF8TdZcAL/view?usp=sharing",
            "https://drive.google.com/file/d/1JnoD5kZIEg-0dclwri7Dq8Ah_-AZxogB/view?usp=sharing",
            "https://drive.google.com/file/d/1UqQxWVI9sitZ6ooBiO9Rw88Ys-Srr9pN/view?usp=sharing",
            "https://drive.google.com/file/d/1_6ziP2da_6U4EWlT2d7x332FFc_E3LYw/view?usp=sharing",
            "https://drive.google.com/file/d/1WajfySR7KOeGRERijFnqRrLxCUgu8eS-/view?usp=sharing",
            "https://drive.google.com/file/d/1t0v1dQwXlxlDaksKchMMrUANwhrBYX03/view?usp=sharing",
            "https://drive.google.com/file/d/18gpRY9ZR-waGS2HWLNARJpSqUWhb5QTZ/view?usp=sharing",
            "https://drive.google.com/file/d/1VYUrFr6xXmbmQR4hTzYIuGgEleI0Qerc/view?usp=sharing",
            "https://drive.google.com/file/d/19KKw6rc_ouI62OXZE1Wt4-pv0J9HWNwF/view?usp=sharing",
            "https://drive.google.com/file/d/1eHgFyYgl8bvYE8qyg2pVdHLVTVswaCAg/view?usp=sharing",
            "https://drive.google.com/file/d/1IaiuRIy5idb79bjdBGEU8TwBv01TI8_z/view?usp=sharing",
            "https://drive.google.com/file/d/1sj3BFLwvt6bVz7ypwd2Xm-y2yb-BXbp8/view?usp=sharing",
            "https://drive.google.com/file/d/1V_uh08FS7aZvnUelZRfr0hZSwqRlDwfl/view?usp=sharing",
            "https://drive.google.com/file/d/1bIKeMhXWK2CaitlX19H-71VQyJ3J2tQr/view?usp=sharing"
        ],
        gallery: [
            `${IMG_PATH}p7_2_Masculine_Desire_Detail.jpg`
        ],
        text: "What is considered sexy on a masculine body?\nRealizing that I could hardly imagine anything beyond the all-too-familiar boxer shorts, this question stayed with me and pushed me to dive deeper. While there is a wide and diverse imagery of sexualized female bodies, men are often lacking a sense of being desirable.\nThe experimental goal of this project was to create fashion pieces that serve as a low-barrier invitation—and a door opener—for a variety of cisgender heterosexual male body types to embrace their own tenderness and sensuality without having to give up their identity as straight men.\nBased on a survey and an in-depth exploration of this topic, we developed clothing and accessories that function as additions to existing wardrobes. These pieces allow men to explore everyday sexiness through confidence—by accentuating attractive body parts, working with familiar comfort garments, and gently extending their comfort zones.\nWorking toward a post-dominant future, we believe that feminism opposes the suppression of all genders and strives for a world in which everyone can see themselves as desirable." 
    },
    {
        id: "p8",
        label: "MEDES",
        metaInfo: "Master of European Design Studies, 2 Years, one study, three countries",
        img: "", 
        gallery: [],
        videos: [], 
        text: "I love asking myself which aspects of me reflect my 'German' heritage and which express my sense of being both European and global citizen. I don't think there has been a long time in my life when I had seen myself as 'German'. Pretty early on, when I started learning about, and questioning the concept of nationality, I found that I related to a European identity much more.\nMy stubbornness, honesty and ambition may stem from my 'German' upbringing, or they may simply be a result of my parents' influence. My strong sense of democracy, political involvement, freedom and self-efficacy may have come from growing up in a peaceful and confident Europe, or perhaps just from my friends and community.\nTo foster my European spirit, I have always looked out for opportunities to connect with people, which were apparently separated from me by borders on a map. I have always wanted to study outside my home country. I loved moving to a different city in 'Germany' and learning more about my own cultural background, but despite my connection to the beautiful people who are now my closest friends, I feel that it is time to move on. Therefore, joining the Master of European Design wasn't much of a question, but an opportunity which I shall gladly take.\nWith MEDES, I would love to experience two very different years, travelling from north to south and learning about the cultural and {{Nature Connection|natural wisdom}} of these countries. In my {{Design Education|design education}}, I will follow my understanding of using design thinking as a method to connect the dots in complex concepts while staying adaptable, creative and future-oriented. This will deepen my ways of thinking and understanding the matters in my environment and hopefully lead me to a socially centred {{Transformative Design|design practice}} that transcends European boundaries eventually.\nAs you can tell from my portfolio, I believe that many things are explained through connections, and this obviously applies to my personal life as well. I love meeting people and other living beings because I can always learn something from every interaction, whether it's challenging or funny. I am driven by my strong social instincts and stubborn optimism which leaves me grateful for many things which I therfore want to share with those around me. A {{Community Building|community}} of like-minded people coming together for a study program like this is a beautiful chance {{Perspective Change|to see beyond bubbles and stereotypes}}.\nI am excited and full of anticipation about the opportunities that will arise from this step in my life, and I can't wait to see how it will affect my journey."
    }
];

// Project -> Topics
export const CONNECTIONS: ConnectionMap = {
    "p1": ["2025", "Social Design", "Community Building", "Adobe InDesign", "Event Planning", "Communication Design", "Spatial Design", "Service Design", "Organisation", "Transformative Design", "Design Education", "Project Lead", "Conceptual Thinking"],
    "p2": ["2024", "UX/UI Design", "Resonance", "Figma", "Perspective Change", "Awareness", "Business Model Canvas", "Mental Health", "Blender", "Social Design", "Social Change"],
    "p3": ["2023", "Awareness", "Communication Design", "Nature Connection", "Sustainability"],
    "p4": ["2024", "Event Planning", "Stage Design", "Spatial Design", "Social Design", "Organisation", "Conceptual Thinking"],
    "p5": ["2023", "Sustainability", "Communication Design", "Future of Living", "Social Design", "Service Design", "Cooperation", "Business Model Canvas", "Social Change", "Conceptual Thinking"],
    "p6": ["2023", "UX/UI Design", "Nature Connection", "Perspective Change", "Canva", "More-than-human Design"],
    "p7": ["2026", "Gender Design", "Feminism", "Fashion Design", "Textile Making", "Organisation", "Project Lead", "Magazine Making", "Adobe InDesign", "Exhibition Design", "Transformative Design", "Social Change"],
    "p8": ["2027", "Conceptual Thinking", "Transformative Design", "Project Lead", "Drawing", "Design Thinking"]
};

// Map of Topic Name -> Size/Weight (2=Large Topic, 3=Medium, 4=Small)
// Project Labels are considered Size 1 (Biggest) implicitly in the Graph logic.
export const TOPIC_WEIGHTS: {[key: string]: number} = {
    // Years
    "2023": 3,
    "2024": 3,
    "2025": 3,
    "2026": 3,
    "2027": 3,

    "Social Design": 2,
    "Community Building": 3,
    "Adobe InDesign": 4,
    "Event Planning": 3,
    "Communication Design": 2,
    "Spatial Design": 2,
    "Service Design": 2,
    "Organisation": 3,
    "Transformative Design": 2,
    "Design Education": 3,
    "UX/UI Design": 4,
    "Resonance": 3,
    "Figma": 4,
    "Perspective Change": 3,
    "Awareness": 3,
    "Business Model Canvas": 4,
    "Mental Health": 3,
    "Blender": 4,
    "Social Change": 3,
    "Nature Connection": 3,
    "Sustainability": 3,
    "Stage Design": 2,
    "Future of Living": 3,
    "Cooperation": 3,
    "Canva": 4,
    "More-than-human Design": 2,
    "Gender Design": 2,
    "Feminism": 3,
    "Fashion Design": 2,
    "Textile Making": 4,
    "Project Lead": 4,
    "Magazine Making": 4,
    "Exhibition Design": 2,
    "Innovation": 3,
    "Conceptual Thinking": 2,
    "Drawing": 3,
    "Design Thinking": 2
};

export const TOPICS = Object.keys(TOPIC_WEIGHTS);

export const TOPIC_DESCRIPTIONS: {[key: string]: string} = {
    "Community Building": "I believe that a lot of people in our Western society lack the feeling of belonging. In a community, there is more social security, and due to more self-efficacy, a higher sense of political power. I don’t want to romanticize the idea of community either, I am aware that they often form out of necessity and collective struggle rather than happy hippy communal living projects. There lies a lot of democratic power in people that unite, and I believe that design can support and foster structures that let people feel a small bit of that power and unity.",
    "Event Planning": "I love to bring people together – be it through my design work or privately. Creating an event that becomes a collective memory through a setting where people can be free, themselves, learn, connect, share and reflect is an honour to me.",
    "Transformative Design": "This new and not so clear term might need a personal definition to grasp. For me, with my political and social norms, history, upbringing and current orientation, it is clear that things need to change. Our global wealth system is built upon colonial exploitation. We are creating value from artificial stock money flowing from rich to rich, while our resources, which create the real world value, are not endless and lives are being taken. With the current political uprising of the fascists worldwide, it seems to me that a system which can no longer support itself is coming to an end, which it is fearing. Following Vanessa Machado de Oliveiras Book: Hospicing Modernity and Antonio Gramsci's rephrased quote: “The old world is dying, and the new world struggles to be born: now is the time of monsters.” I believe that we are always in multiple transition phases, bigger ones and smaller ones. In these times, we need support, people to go through transition without feeling lost and overwhelmed by utopian storytelling, and practicing small, improved forms of co-living.",
    "Design Education": "In my years at KISD, I got to experience a quite unique form of design education, which thrives through freedom, independence and engagement. Through being the head of our student council and diverse projects like “Refinding KISD”, I learned that with freedom comes the responsibility to show up and care individually. A system like KISD can only live when people actively contribute to the system and don’t just take or expect things to be sorted for them. To co create and constantly reintegrate such a living system is highly interesting to me, because so much of how it works can be translated to societal movements. Our design education system teaches us to search for and build what we want to see ourselves, how to follow our interests and values, and how to form teams of people with similar needs.",
    "Perspective Change": "I try to be aware of my limited view on the world and its needs and struggles. Therefore, I love it when a project challenges me to change my perspective. There are so many realities I could be designing for, and I don't want to design only for my own.",
    "Nature Connection": "I am a nature person. I love the vibrant social life in cities, but I hate how much they make us disconnect from everything non human and ourselves. I believe that humans are not made to thrive in artificial spaces. When not just observing and studying nature, but seeing ourselves as part of it, we can follow its wisdom and symbiosis.",
    "More-than-human Design": "Mainly inspired by the book Sand Talk from Tyson Jung Karpota, I started learning about indigenous ways of designing in co-creation and different views on time, space and our human responsibility on planet Earth.",
    "Feminism": "In her book, “The patriarchy in things”, Rebekka Endler taught me that in our world, everything is designed for and from men, and in this world I can literally not survive without fighting for a feminist future. It is my firm belief that no one is free until we are all free, and I will try to use my white privileges to stand up for other marginalised groups. Changing the ways we speak, treat and design are crucial in order to create the equality we deserve.",
    "Project Lead": "I enjoy the challenge that comes with being a good project lead. I keep on practicing democratic leadership with no hierarchy and equal shared responsible task distribution. I still think a project needs someone to feel most responsible, even though that person can change within one project. I enjoy being the one pulling together the different work and aligning it to the common goal. Team discussions, self reflection and good communication are key, but also clear bids, constructive feedback, efficient work and honest closing sessions."
};

export const TOPIC_GALLERIES: {[key: string]: string[]} = {
    "Drawing": [
        "https://drive.google.com/file/d/1-b8lhma3HTEy1S_y2b3LeIobkcx79qFd/view?usp=sharing",
        "https://drive.google.com/file/d/1BJsvffq1DEsncmjuU3WVJw6wzsG_Gw1E/view?usp=sharing",
        "https://drive.google.com/file/d/1cvgxxYDUIh1RO_bRhiisPfMVTeBa9WoP/view?usp=sharing",
        "https://drive.google.com/file/d/1XFfOJSP0eWbfRN0O_1xfWihmGZvU3nvi/view?usp=sharing",
        "https://drive.google.com/file/d/1SlUjK7p_zRHbGZo8JSyj-tpzOxUUKCqX/view?usp=sharing",
        "https://drive.google.com/file/d/19ZV-7gViQan8wa-foRmYU0XZfrI6lDNa/view?usp=sharing",
        "https://drive.google.com/file/d/1Ue4fbJEPpFOKY0QOL4lE71U90mqn7ash/view?usp=sharing",
        "https://drive.google.com/file/d/1171y4If2hpdGYlVqPS8GTswgVoD0kYPd/view?usp=sharing",
        "https://drive.google.com/file/d/1rHljaw3jW1nfmLbfEnTx7ZW8Zxx5SPrk/view?usp=sharing"
    ]
};

export const TOPIC_VIDEOS: {[key: string]: string[]} = {};

// Topic <-> Topic (Direct connections between concepts)
export const TOPIC_CONNECTIONS: TopicConnection[] = [
    // Social Design connections
    { source: "Social Design", target: "Community Building" },
    { source: "Social Design", target: "Sustainability" },
    { source: "Social Design", target: "Mental Health" },
    { source: "Social Design", target: "Awareness" },
    { source: "Social Design", target: "Social Change" },
    
    // Sustainability connections
    { source: "Sustainability", target: "Nature Connection" },
    { source: "Sustainability", target: "Social Design" }, 
    { source: "Sustainability", target: "Cooperation" },
    { source: "Sustainability", target: "Community Building" },
    { source: "Sustainability", target: "Awareness" },
    { source: "Sustainability", target: "More-than-human Design" },
    { source: "Sustainability", target: "Social Change" },

    // Nature Connection connections
    { source: "Nature Connection", target: "Awareness" },
    { source: "Nature Connection", target: "More-than-human Design" },
    { source: "Nature Connection", target: "Sustainability" },

    // Tool connections
    { source: "Figma", target: "UX/UI Design" },
    { source: "Adobe InDesign", target: "Communication Design" },

    // Gender Design connections
    { source: "Gender Design", target: "Feminism" },
    { source: "Gender Design", target: "Social Design" },

    // Stage/Event Design connections
    { source: "Stage Design", target: "Spatial Design" },
    { source: "Stage Design", target: "Event Planning" },
    
    // Event planning connections
    { source: "Event Planning", target: "Social Change" },
    { source: "Event Planning", target: "Social Design" },
    { source: "Event Planning", target: "Service Design" },
    { source: "Event Planning", target: "Organisation" },

    // Conceptual Thinking connections
    { source: "Conceptual Thinking", target: "Event Planning" },
    { source: "Conceptual Thinking", target: "Design Education" },
    { source: "Conceptual Thinking", target: "Social Design" },
    { source: "Conceptual Thinking", target: "Transformative Design" },
    { source: "Conceptual Thinking", target: "Gender Design" },

    // Design Thinking connections
    { source: "Design Thinking", target: "Nature Connection" },
    { source: "Design Thinking", target: "Social Change" },
    { source: "Design Thinking", target: "Cooperation" },
    { source: "Design Thinking", target: "Perspective Change" },
    { source: "Design Thinking", target: "Organisation" }
];