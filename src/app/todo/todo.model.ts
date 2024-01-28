export interface Todo {
    id: string;
    content: string;
    progress: 'active' | 'completed' | 'postponed';
}