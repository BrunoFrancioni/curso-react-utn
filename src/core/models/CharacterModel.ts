export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string, extension: string };
    comics: { available: number, collectionURI: string, items: any, returned: number };
    series: { available: number, collectionURI: string, items: any, returned: number };
    stories: { available: number, collectionURI: string, items: any, returned: number };
    events: { available: number, collectionURI: string, items: any, returned: number };
    urls: any;
}