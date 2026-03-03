export interface MediaItem {
    url: string;
    caption?: string;
}

export interface Project {
    id: string;
    label: string;
    img: string | MediaItem;
    text: string;
    fullText?: string;
    gallery?: (string | MediaItem)[];
    videos?: MediaItem[];
    videoAspectRatio?: string; // e.g. "aspect-video", "aspect-[9/16]"
    headerImagePosition?: string; // e.g. "object-top", "object-center", "object-bottom"
    metaInfo?: string;
    imageSequence?: string[];
    // Keeping for backward compatibility if needed, though we use gallery now
    secondaryImg?: string;
}

export interface ConnectionMap {
    [key: string]: string[];
}

export interface TopicConnection {
    source: string;
    target: string;
}

export interface NodeData {
    id: string;
    label: string;
    type: 'anchor' | 'project' | 'topic';
}