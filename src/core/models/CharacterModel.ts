export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string, extension: string };
    comics: { available: number, collectionURI: string, items: object, returned: number };
    series: { available: number, collectionURI: string, items: object, returned: number };
    stories: { available: number, collectionURI: string, items: object, returned: number };
    events: { available: number, collectionURI: string, items: object, returned: number };
    urls: object;
}