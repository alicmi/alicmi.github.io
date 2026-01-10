import { Project, ConnectionMap } from './types';

export const PROJECTS: Project[] = [
    { 
        id: "p1", 
        label: "Refin(d)ing KISD", 
        img: "https://picsum.photos/seed/kisd/800/600", 
        text: "Every group of people needs a moment to step back and reflect on their ways of working. This project facilitated a structured reflection process for the Köln International School of Design, enabling students and faculty to rediscover their shared values." 
    },
    { 
        id: "p2", 
        label: "Real Life Quest", 
        img: "https://picsum.photos/seed/quest/800/600", 
        text: "A socio-effective concept brought to life in an everyday app. Real Life Quest gamifies daily social interactions to encourage users to step out of their digital bubbles and engage with their physical community in meaningful ways." 
    },
    { 
        id: "p3", 
        label: "Chaos Postcards", 
        img: "https://picsum.photos/seed/chaos/800/600", 
        text: "A set of postcards to bring awareness to landscape manipulation. Using generative design techniques, these postcards visualize the subtle yet profound impact of human intervention on natural landscapes." 
    },
    { 
        id: "p4", 
        label: "New Years Stage Design", 
        img: "https://picsum.photos/seed/stage/800/600", 
        text: "The entire suburban culture scene of Cologne has been facing huge financial cuttings. This stage design project utilized recycled materials and projection mapping to create an immersive experience on a near-zero budget." 
    },
    { 
        id: "p5", 
        label: "Co-Heat Wuppertal", 
        img: "https://picsum.photos/seed/heat/800/600", 
        text: "Product-service system for sustainable shared energy. Co-Heat connects neighbors with excess thermal energy to those in need, fostering a local micro-grid of warmth and community resilience." 
    },
    { 
        id: "p6", 
        label: "Lebendiges Köln", 
        img: "https://picsum.photos/seed/koln/800/600", 
        text: "A wilderness city map inviting you to discover shared habitats. This interactive map highlights the often-overlooked urban flora and fauna, encouraging citizens to view their city as a shared ecosystem." 
    },
    { 
        id: "p7", 
        label: "Masculine Desire in Fashion", 
        img: "https://picsum.photos/seed/fashion/800/600", 
        text: "What is sexy on a masculine body? Exploring tenderness and sensuality. This textile and fashion research project challenges traditional norms of masculinity through soft fabrics, fluid silhouettes, and vulnerable imagery." 
    }
];

export const CONNECTIONS: ConnectionMap = {
    "p1": ["Social Design", "Community Building", "InDesign", "Event Planning"],
    "p2": ["UX/UI Design", "Resonance", "Figma", "Perspective Change"],
    "p3": ["Awareness", "Communication", "Nature"],
    "p4": ["Event Design", "Stage Design", "Spatial Design"],
    "p5": ["Sustainability", "Communication", "Future of Living"],
    "p6": ["UX/UI Design", "Nature Connection", "Perspective Change"],
    "p7": ["Gender Design", "Feminism", "Textile Making"]
};

export const TOPICS = [
    "Social Design", "UX/UI Design", "Sustainability", "Community Building", 
    "Resonance", "Perspective Change", "Feminism", "Event Planning", 
    "InDesign", "Figma", "Textile Making", "Stage Design", "Nature", 
    "Communication", "Awareness", "Future of Living", "Event Design", 
    "Spatial Design", "Gender Design", "Nature Connection"
];
